/**
 * Updates the active status for the section aund its corresponding nav button
 *
 * @param {string} sectionToActivate
 */
function setActiveSection(sectionToActivate) {
  const mainNavButtons = document.querySelectorAll(".nav-btn");

  mainNavButtons.forEach((button) => {
    const { section } = button.dataset;

    if (!section) {
      console.error("No section data attribute in navigation button");
      return;
    }

    const sectionId = `${section}-section`;

    if (sectionToActivate === section) {
      button.classList.add("active");
      setTimeout(
        () => document.getElementById(sectionId).classList.add("active"),
        500,
      );
    } else {
      button.classList.remove("active");
      setTimeout(
        () => document.getElementById(sectionId).classList.remove("active"),
        500,
      );
    }
  });
}

/**
 * Create and append project elements in the given selection element
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
  const previousButton = document.createElement("button");
  const nextButton = document.createElement("button");

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

  const section = target.closest("section");

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

/**
 * Initializes page
 */
function initialize() {
  const sectionContainer = document.getElementById("section-container");
  const webAppsSection = document.getElementById("web-apps-section");
  const extensionsSection = document.getElementById("extensions-section");
  const mainNavButtons = document.querySelectorAll(".nav-btn");

  fetch("./data/projects.json")
    .then((response) => response.json())
    .then((resumeJson) => {
      // inject data in DOM
      appendProjects(webAppsSection, resumeJson.webApps);
      appendProjects(extensionsSection, resumeJson.extensions);
    });

  mainNavButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const { section } = event.target.dataset;

      if (!section) {
        console.error("No section data attribute found in nanvigation button");
        return;
      }

      sectionContainer.classList.remove("opened");
      setActiveSection(section);
      setTimeout(() => sectionContainer.classList.add("opened"), 600);
    });
  });
}

initialize();
