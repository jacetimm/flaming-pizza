document.addEventListener("DOMContentLoaded", () => {
  const THEME_KEY = "flamin-theme";

  const body = document.body;
  const themeToggle = document.getElementById("theme-toggle");
  const themeLabel = themeToggle ? themeToggle.querySelector(".theme-label") : null;
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  const savedTheme = localStorage.getItem(THEME_KEY);
  const initialTheme =
    savedTheme === "light" || savedTheme === "dark"
      ? savedTheme
      : prefersDark
      ? "dark"
      : "light";

  function applyTheme(theme) {
    const nextTheme = theme === "light" ? "light" : "dark";
    body.setAttribute("data-theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
    if (themeLabel) {
      themeLabel.textContent = nextTheme === "light" ? "Light" : "Dark";
    }
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", nextTheme === "dark");
    }
  }

  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = body.getAttribute("data-theme") === "light" ? "light" : "dark";
      const target = current === "light" ? "dark" : "light";
      applyTheme(target);
    });
  }

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
