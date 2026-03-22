const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const themeNavbar = document.getElementById("themeNavbar");

function applyTheme(theme) {
    body.setAttribute("data-theme", theme);

    if (themeToggle) {
        themeToggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
        themeToggle.classList.toggle("btn-outline-light", theme === "dark");
        themeToggle.classList.toggle("btn-outline-dark", theme === "light");
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
