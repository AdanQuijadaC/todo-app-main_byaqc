const themeLight = document.querySelector(".theme-light");
const themeDark = document.querySelector(".theme-dark");

if (
  localStorage.theme === "dark" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  document.documentElement.classList.add("dark");
  localStorage.theme = "dark";
  themeLight.classList.add("hidden");
  themeDark.classList.remove("hidden");
} else {
  document.documentElement.classList.add("light");
  localStorage.theme = "light";
  themeLight.classList.remove("hidden");
  themeDark.classList.add("hidden");
}

themeLight.addEventListener("click", () => {
  themeLight.classList.add("hidden");
  themeDark.classList.remove("hidden");

  if (localStorage.theme === "light") {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
    localStorage.theme = "dark";
  }
});

themeDark.addEventListener("click", () => {
  themeLight.classList.remove("hidden");
  themeDark.classList.add("hidden");

  if (localStorage.theme === "dark") {
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }
});
