/* 
------------------
HANDLE NAV ACTIONS
------------------
*/


navButtons = document.querySelectorAll(".nav-btn");
displayContainer = document.querySelector("#display-container");

// menu button action on click
navButtons.forEach(button => {
  button.addEventListener("click", e => {
    target = e.target;
    displayContainer.classList.remove("opened");
    setTimeout(() => setActive(target), 0);
    setTimeout(() => displayContainer.classList.add("opened"), 600);
  });
});

function setActive(chosenBtn) {
  /* clears and sets the 'active' class on the nav buttons
  and on the display sections*/
  navButtons.forEach(button => {
    let sectionID =
      button.textContent.toLowerCase().replace(/\s/g, "-") + "-display";
    // console.log(sectionID);
    if (chosenBtn === button) {
      button.classList.add("active");
      setTimeout(
        () => document.getElementById(sectionID).classList.add("active"),
        500
      );
    } else {
      button.classList.remove("active");
      setTimeout(
        () => document.getElementById(sectionID).classList.remove("active"),
        500
      );
    }
  });
}



/* 
---------------------
FETCH AND INJECT DATA
---------------------
*/

// Fetching resume data
fetch("./src/resume.json")
  .then(response => response.json())
  .then(resumeJson => {
    // inject data in DOM
    injectProjects(frontEndDisplay, resumeJson.frontEnd);
    injectProjects(reactjsDisplay, resumeJson.reactjs);
  });

// selectors
frontEndDisplay = document.querySelector("#front-end-display");
reactjsDisplay = document.querySelector("#reactjs-display");

function injectProjects(sectionDOMElement, data) {
  //receives a DOM element (section) and injects new elements in there using json data
  for (let project of data) {
    // console.log(project.projectName);
    let projectName = document.createElement("h1");
    let description = document.createElement("p");
    let projectContainer = document.createElement("article");
    projectContainer.classList.add('project')
    if (project.id === 1) projectContainer.classList.add('active');

    projectName.textContent = project.projectName;
    description.textContent = project.description;

    projectContainer.appendChild(projectName);
    projectContainer.appendChild(description);

    sectionDOMElement.appendChild(projectContainer);
  }
}


