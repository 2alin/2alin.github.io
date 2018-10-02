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
  var isMenuVisible = (companySection.style.display === "flex");
  var isButtonActivated = menuButton.classList.contains("opened");
  if (width >= 540) {
    menuButton.classList.remove("opened");
    companySection.style.display = "flex";
  } else if (isMenuVisible && !isButtonActivated) {
    companySection.style.display = "none";
  }
});

// --------------------------------------
// G A L L E R Y   C O N T R O L S
// ---------------------------------------

var backButton = document.querySelector("#previous");
var nextButton = document.querySelector("#next");

var currentIndex = 0;
var productsList = document.querySelectorAll(".popular-product");
var pageIndicators = document.querySelectorAll(".page-indicator");

function goNext() {
  if (currentIndex === 2) {
    var nextIndex = 0;
  } else {
    var nextIndex = currentIndex + 1 ;
  }
  productsList[currentIndex].classList.add("hidden");
  productsList[nextIndex].classList.remove("hidden");
  pageIndicators[currentIndex].classList.remove("current");
  pageIndicators[nextIndex].classList.add("current");
  currentIndex = nextIndex;
}

function goBack() {
  if (currentIndex === 0) {
    var backIndex = 2;
  } else {
    var backIndex = currentIndex - 1;
  }
  productsList[currentIndex].classList.add("hidden");
  productsList[backIndex].classList.remove("hidden");
  pageIndicators[currentIndex].classList.remove("current");
  pageIndicators[backIndex].classList.add("current");
  currentIndex = backIndex;
}

backButton.addEventListener("click", () => {
  goBack();
});

nextButton.addEventListener("click", () => {
  goNext();
});

/* automatic transition */
window.setInterval(goNext, 5000)
