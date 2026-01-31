/* 
------------------
HANDLE NAV ACTIONS
------------------
*/

navButtons = document.querySelectorAll(".nav-btn");
displayContainer = document.querySelector("#display-container");

// menu button action on click
navButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    target = e.target;
    displayContainer.classList.remove("opened");
    setTimeout(() => setActive(target), 0);
    setTimeout(() => displayContainer.classList.add("opened"), 600);
  });
});

function setActive(chosenBtn) {
  /* clears and sets the 'active' class on the nav buttons
  and on the display sections*/
  navButtons.forEach((button) => {
    let sectionID =
      button.textContent.toLowerCase().replace(/\s/g, "-") + "-display";
    if (chosenBtn === button) {
      button.classList.add("active");
      setTimeout(
        () => document.getElementById(sectionID).classList.add("active"),
        500,
      );
    } else {
      button.classList.remove("active");
      setTimeout(
        () => document.getElementById(sectionID).classList.remove("active"),
        500,
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
fetch("./data/resume.json")
  .then((response) => response.json())
  .then((resumeJson) => {
    // inject data in DOM
    appendProjects(webAppsDisplay, resumeJson.webApps);
    appendProjects(extensionsDisplay, resumeJson.extensions);
  });

// selectors
webAppsDisplay = document.getElementById("web-apps-display");
extensionsDisplay = document.getElementById("extensions-display");

/**
 * Create and append project elements in the given selction element
 *
 * @param {*} sectionElement
 * @param {*} data
 */
function appendProjects(sectionElement, data) {
  const projectsContainer = document.createElement("div");
  projectsContainer.classList.add("projects-container");

  for (const project of data) {
    const main = document.createElement("main");
    const projectName = document.createElement("h1");
    const timePeriod = document.createElement("p");
    const description = document.createElement("p");
    const technologies = document.createElement("p");
    const pictureContainer = document.createElement("picture");
    const picture = document.createElement("img");
    const footer = document.createElement("footer");
    const sourceCode = document.createElement("a");
    const tryLive = document.createElement("a");
    const projectArticle = document.createElement("article");

    //adding classes and properties
    timePeriod.classList.add("period");
    projectArticle.classList.add("project");
    technologies.classList.add("technologies");
    sourceCode.href = project.sourceCodeUrl;
    tryLive.href = project.liveVersionUrl;
    sourceCode.target = "_blank";
    tryLive.target = "_blank";

    //filling data in html elements
    projectName.textContent = project.projectName;
    timePeriod.textContent = project.datePeriod;
    description.textContent = project.description;
    technologies.textContent = project.technologies.join(", ") + ".";
    sourceCode.textContent = "source code";
    tryLive.textContent = "try it";
    picture.src =
      "./assets/" +
      project.projectName.toLowerCase().replace(/\s/g, "_") +
      ".png";

    // adding icons
    const iconExternal = document.createElement("i");
    iconExternal.classList.add("fa-solid", "fa-up-right-from-square");
    tryLive.prepend(iconExternal.cloneNode(true));
    sourceCode.prepend(iconExternal.cloneNode(true));

    // structuring elements
    main.appendChild(timePeriod);
    main.appendChild(projectName);
    main.appendChild(description);
    main.appendChild(technologies);
    footer.appendChild(tryLive);
    footer.appendChild(sourceCode);
    main.appendChild(footer);
    pictureContainer.appendChild(picture);
    projectArticle.appendChild(main);
    projectArticle.appendChild(pictureContainer);

    projectsContainer.appendChild(projectArticle);
  }

  sectionElement.appendChild(projectsContainer);

  // initializing active project
  if (data.length > 0) {
    const activeProjectIdx = 0;
    sectionElement.dataset.activeProjectIdx = activeProjectIdx;

    const projectsList = sectionElement.querySelectorAll(".project");
    projectsList[activeProjectIdx].classList.add("active");
  }

  //adding control bar elements to section container
  const navControls = document.createElement("nav");
  const previousButton = document.createElement("span");
  const nextButton = document.createElement("span");

  previousButton.textContent = "prev";
  nextButton.textContent = "next";

  previousButton.classList.add("previous", "button");
  nextButton.classList.add("next", "button");
  navControls.classList.add("controls");

  previousButton.dataset.direction = -1;
  nextButton.dataset.direction = 1;

  nextButton.addEventListener("click", handleNavigateProject);
  previousButton.addEventListener("click", handleNavigateProject);

  navControls.appendChild(previousButton);
  navControls.appendChild(nextButton);

  // append navControls only if the number of projects is 2 or more
  if (data.length > 1) {
    sectionElement.appendChild(navControls);
  }
}

/**
 * Handles project navigation in a section
 *
 * @param {PointerEvent} event Event triggered after user clicks navigation button
 * @returns when navigation is not possible
 */
function handleNavigateProject(event) {
  const { target } = event;

  const direction = Number(target.dataset.direction);

  if (Number.isNaN(direction)) {
    console.error("no direction set in navigate button attribute");
    return;
  }

  const section = target.closest(".display-section");

  if (!section) {
    console.error("No section found");
    return;
  }

  const projectsList = section.querySelectorAll(".project");

  if (!projectsList) {
    console.error("No projects found");
    return;
  }

  let activeProjectIdx = Number(section.dataset.activeProjectIdx);

  if (Number.isNaN(activeProjectIdx)) {
    console.error("Incorrect format for 'active-project-idx' attribute");
    return;
  }

  projectsList[activeProjectIdx].classList.remove("active");

  // we are using modulo operation to stay in the desired range when
  // moving back or forth, but for modulo to work we need to stay out
  // of negative values, that's why move the interval ahead by its same length
  activeProjectIdx =
    (projectsList.length + activeProjectIdx + direction) % projectsList.length;
  projectsList[activeProjectIdx].classList.add("active");
  section.dataset.activeProjectIdx = activeProjectIdx;
}
