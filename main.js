projectButtons = document.querySelectorAll(".projects-nav-btn");
projectsContainer = document.querySelector("#projects-container");


projectButtons.forEach(button => {
  button.addEventListener("click", e => {
    target = e.target;
    projectsContainer.classList.remove("opened");
    setTimeout(() => setActive(target), 400);
    setTimeout(() => projectsContainer.classList.add("opened"), 800);
  });
});

function setActive(chosenBtn) {
  projectButtons.forEach(button => {
    chosenBtn === button
      ? button.classList.add("active")
      : button.classList.remove("active");
  });
}
