const root = document.documentElement;
const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const themeNavbar = document.getElementById("themeNavbar");
const themeToggleIcon = themeToggle?.querySelector(".theme-toggle-icon");

function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    body.setAttribute("data-theme", theme);

    if (themeToggle) {
        const nextLabel = theme === "dark"
            ? "Switch to light mode"
            : "Switch to dark mode";

        themeToggle.setAttribute("aria-label", nextLabel);
        themeToggle.setAttribute("title", nextLabel);
    }

    if (themeToggleIcon) {
        themeToggleIcon.innerHTML = theme === "dark"
            ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4.75a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V5.5a.75.75 0 0 1 .75-.75Zm0 12.75a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V18.25a.75.75 0 0 1 .75-.75ZM6.52 6.52a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 0 1-1.06 1.06L6.52 7.58a.75.75 0 0 1 0-1.06Zm8.84 8.84a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 0 1-1.06 1.06l-1.06-1.06a.75.75 0 0 1 0-1.06ZM4.75 12a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H5.5a.75.75 0 0 1-.75-.75Zm12.25 0a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 17 12Zm-9.42 3.36a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 0 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0Zm8.84-8.84a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 1 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0ZM12 8.25A3.75 3.75 0 1 1 8.25 12 3.75 3.75 0 0 1 12 8.25Z"/></svg>'
            : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11.84 3.01a.75.75 0 0 1 .8.97A7.25 7.25 0 1 0 20.02 11.36a.75.75 0 0 1 .97.8 8.75 8.75 0 1 1-9.15-9.15Z"/></svg>';
    }

    if (themeNavbar) {
        themeNavbar.classList.toggle("navbar-dark", theme === "dark");
        themeNavbar.classList.toggle("navbar-light", theme === "light");
    }

    localStorage.setItem("theme", theme);
}

applyTheme(localStorage.getItem("theme") || "light");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const nextTheme = body.getAttribute("data-theme") === "light" ? "dark" : "light";
        applyTheme(nextTheme);
    });
}
