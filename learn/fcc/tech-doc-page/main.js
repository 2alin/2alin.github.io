var body = document.querySelector("body");

var button = document.querySelector("header .button");
var popupMenu = document.querySelector("#navbar ul");

var indexItems = document.querySelectorAll("#navbar ul a");


button.addEventListener("click", () => {
  toggleMenu();
});

function toggleMenu() {
  if (popupMenu.classList.contains("visible")) {
    hideMenu();
  } else {
    showMenu();
  }
}

function hideMenu() {
  button.classList.remove("activated");
  popupMenu.classList.remove("visible");
  body.classList.remove("fixed");
}

function showMenu() {
  button.classList.add("activated");
  popupMenu.classList.add("visible");
  body.classList.add("fixed");
}

// reset status on start
hideMenu();

//reset status on resize
window.addEventListener("resize", () => {
  hideMenu();
});

// hide menu on index item (link) click
// and fix scroll position because of sticky bar
for( var i = 0; i < indexItems.length; i++) {
  indexItems[i].addEventListener("click", (e) => {
    hideMenu();
    e.preventDefault();
    var section = document.querySelector(e.target.attributes["href"].value);
    var posSection = section.getBoundingClientRect().top + window.scrollY;
    if (window.innerWidth <= 780) {
      window.scrollTo(0, posSection - 48);
    } else {
      window.scrollTo(0, posSection);
    }
  });
}