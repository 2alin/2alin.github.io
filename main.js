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
    injectProjects(pythonDisplay, resumeJson.python);
    injectProjects(miscDisplay, resumeJson.misc);
  });

// selectors
frontEndDisplay = document.querySelector("#front-end-display");
reactjsDisplay = document.querySelector("#reactjs-display");
pythonDisplay = document.querySelector("#python-display");
miscDisplay = document.querySelector("#misc-display");

function injectProjects(sectionDOMElement, data) {
  //receives a DOM element (section) and injects new elements in there using json data

  let projectsContainer = document.createElement('div');
  projectsContainer.classList.add('projects-container');

  for (let project of data) {
    // console.log(project.projectName);
    let main = document.createElement("main");
    let projectName = document.createElement("h1");
    let timePeriod = document.createElement("p");
    let description = document.createElement("p");
    let technologies = document.createElement("p");
    let pictureContainer = document.createElement("picture");
    let picture = document.createElement("img");
    let footer = document.createElement("footer");
    let sourceCode = document.createElement("a");
    let tryLive = document.createElement("a");
    let projectArticle = document.createElement("article");

    //adding classes and properties
    timePeriod.classList.add("period");
    projectArticle.classList.add("project");
    // if (project.id === 1) projectArticle.classList.add("active");
    technologies.classList.add('technologies');
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
    // picture.src = 'https://raw.githubusercontent.com/2alin/2alin.github.io/master/' + project.projectName.toLowerCase().replace(/\s/g,'_') + '.png'

    //adding elements to the DOM
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
  
  sectionDOMElement.appendChild(projectsContainer);
  

  //adding control bar elements to section container
  let navControls = document.createElement("nav");
  let previousButton = document.createElement("span");
  let nextButton = document.createElement("span");

  previousButton.textContent = "prev";
  nextButton.textContent = "next";

  previousButton.classList.add("previous", "button");
  nextButton.classList.add("next", "button");
  navControls.classList.add("controls");

  navControls.appendChild(previousButton);
  navControls.appendChild(nextButton);
  // append navControls only if the number of projects is 2 or more
  if(data.length > 1) sectionDOMElement.appendChild(navControls);

  //handle control actions
  let projectsList = document.querySelectorAll(
    "#" + sectionDOMElement.id + " .project"
  );
  let currentProjectIndex = 0;
  projectsList[currentProjectIndex].classList.add('active');

  nextButton.addEventListener("click", () => {
    projectsList[currentProjectIndex].classList.remove("active");
    if (currentProjectIndex === projectsList.length - 1) {
      currentProjectIndex = 0;
    } else {
      currentProjectIndex++;
    }
    projectsList[currentProjectIndex].classList.add("active");
    console.log(currentProjectIndex);
  });

  previousButton.addEventListener("click", () => {
    projectsList[currentProjectIndex].classList.remove("active");
    if (currentProjectIndex === 0) {
      currentProjectIndex = projectsList.length - 1;
    } else {
      currentProjectIndex--;
    }
    projectsList[currentProjectIndex].classList.add("active");
    console.log(currentProjectIndex);
  });
}
