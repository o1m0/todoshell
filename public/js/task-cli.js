(() => {
    const taskDataElement = document.getElementById("taskAppData");
    const terminalScreen = document.getElementById("terminalScreen");
    const terminalForm = document.getElementById("terminalForm");
    const terminalInput = document.getElementById("terminalInput");

    if (!taskDataElement || !terminalScreen || !terminalForm || !terminalInput) {
        return;
    }

    const appData = JSON.parse(taskDataElement.textContent || "{}");
    const tasks = Array.isArray(appData.tasks) ? [...appData.tasks] : [];
    const username = appData.username || "guest";
    const promptText = `${username}@todoshell:~/tasks$`;

    const renderEntry = (command, lines) => {
        const entry = document.createElement("div");
        entry.className = "terminal-entry";

        const commandLine = document.createElement("p");
        commandLine.className = "terminal-line mb-2";

        const prompt = document.createElement("span");
        prompt.className = "terminal-prompt";
        prompt.textContent = promptText;

        const commandText = document.createElement("span");
        commandText.className = "terminal-command";
        commandText.textContent = ` ${command}`;

        commandLine.append(prompt, commandText);
        entry.appendChild(commandLine);

        lines.forEach((line) => {
            const output = document.createElement("p");
            output.className = `terminal-output mb-1 ${line.className || ""}`.trim();
            output.textContent = line.text;
            entry.appendChild(output);
        });

        terminalScreen.appendChild(entry);
        terminalScreen.scrollTop = terminalScreen.scrollHeight;
    };

    const listTasks = (filter) => {
        const filteredTasks = tasks.filter((task) => {
            if (filter === "pending") {
                return !task.completed;
            }

            if (filter === "completed") {
                return task.completed;
            }

            return true;
        });

        if (filteredTasks.length === 0) {
            return [{ text: "No tasks found.", className: "terminal-muted" }];
        }

        return filteredTasks.map((task, index) => ({
            text: `${String(index + 1).padStart(2, "0")}. [${task.completed ? "done" : "todo"}] ${task.title}`
        }));
    };

    const extractTaskTitle = (command) => {
        const match = command.match(/^tasks add\s+["'](.+)["']$/);
        if (match) {
            return match[1].trim();
        }

        const plainMatch = command.match(/^tasks add\s+(.+)$/);
        return plainMatch ? plainMatch[1].trim() : "";
    };

    const createTask = async (title) => {
        const response = await fetch("/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title }),
        });

        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(payload.message || "Failed to create task.");
        }

        if (payload.task) {
            tasks.unshift(payload.task);
        }

        return payload.task;
    };

    const runCommand = async (rawCommand) => {
        const command = rawCommand.trim();

        if (!command) {
            return [{ text: "Enter a command.", className: "terminal-muted" }];
        }

        if (command === "help") {
            return [
                { text: "Available commands:" },
                { text: "help" },
                { text: "tasks --list" },
                { text: "tasks add \"Buy coffee\"" },
                { text: "tasks --filter pending" },
                { text: "tasks --filter completed" },
                { text: "clear" }
            ];
        }

        if (command === "clear") {
            terminalScreen.innerHTML = "";
            return [];
        }

        if (command === "tasks --list") {
            return listTasks();
        }

        if (command === "tasks --filter pending") {
            return listTasks("pending");
        }

        if (command === "tasks --filter completed") {
            return listTasks("completed");
        }

        if (command.startsWith("tasks add ")) {
            const title = extractTaskTitle(command);

            if (!title) {
                return [{ text: "Task title is required.", className: "terminal-error" }];
            }

            const task = await createTask(title);

            return [
                { text: `Added task: ${task.title}` },
                { text: `Total tasks: ${tasks.length}`, className: "terminal-muted" }
            ];
        }

        return [
            { text: `Command not found: ${command}`, className: "terminal-error" },
            { text: "Run help to see available commands.", className: "terminal-muted" }
        ];
    };

    terminalForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const command = terminalInput.value;
        terminalInput.value = "";

        try {
            const lines = await runCommand(command);

            if (command.trim() !== "clear") {
                renderEntry(command, lines);
            }
        } catch (error) {
            renderEntry(command, [
                { text: error.message, className: "terminal-error" }
            ]);
        }
    });

    terminalScreen.addEventListener("click", () => {
        terminalInput.focus();
    });

    terminalInput.focus();
})();
