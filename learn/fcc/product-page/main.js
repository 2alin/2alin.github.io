var menuButton = document.querySelector("#menu-section a");
var companySection = document.querySelector("#company-section");


menuButton.addEventListener("click", (e) => {
  e.preventDefault();
  if(menuButton.classList.contains("opened")) {
    menuButton.classList.remove("opened");
    companySection.style.display = "none";
  }  else {
    menuButton.classList.add("opened");
    companySection.style.display = "flex";
  }
});

window.addEventListener("resize", () => {
  var width = window.innerWidth;
  if (width >= 540) {
    menuButton.classList.remove("opened");
    companySection.style.display = "flex";
  } else {
    companySection.style.display = "none";
  }
});