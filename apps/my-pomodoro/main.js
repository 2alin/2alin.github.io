const tasksElement = document.querySelector("textarea");
const startButton = document.querySelector("#start-button");
const customTimer = document.querySelector("custom-timer");
const alarm = document.querySelector("audio");
const input = document.querySelector("input");

const pausedFaviconPath = "./icon-paused-32x32.png";
const runningFaviconPath = "./icon-running-32x32.png";

// list
let tasks = localStorage.getItem("tasks");

if (!tasks) {
  localStorage.setItem("tasks", tasksElement.value);
} else {
  tasksElement.value = tasks;
}

tasksElement.addEventListener("input", () => {
  localStorage.setItem("tasks", tasksElement.value);
});

// timer

customTimer.setAttribute("time", input.value);

input.addEventListener("change", () => {
  customTimer.setAttribute("time", input.value);
});

startButton.addEventListener("click", () => {
  customTimer.start();
});

customTimer.addEventListener("timer-started", () => {
  setFavicon(runningFaviconPath);
  input.toggleAttribute("disabled", true);
  startButton.toggleAttribute("disabled", true);
});

customTimer.addEventListener("timer-finished", () => {
  input.toggleAttribute("disabled", false);
  startButton.toggleAttribute("disabled", false);
  alarm.play();
  setFavicon(pausedFaviconPath);
});

function setFavicon(iconPath) {
  const linkElement = document.querySelector("link[rel*='icon']");
  linkElement.href = iconPath;
}
