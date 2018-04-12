/* nav bar buttons, just in case*/
var navButtons = document.querySelectorAll('nav ul a');
var sections = document.querySelectorAll('section');
var posBreakPoints = [];

/* set listeners to each nav button */
setNavListeners();
function setNavListeners(){
  for(let button of navButtons){
    button.addEventListener('click', (e) => {
      e.preventDefault();
      let targetID = document.querySelector(e.target.attributes.href.textContent);
      console.log(e.target.id + ' selected');
      smoothScroll(targetID);
    });
  }
}

/* change navbar button status*/
function setActive(selectedBtn){
  for(let button of navButtons) {
    if (button === selectedBtn){
      button.className = 'active';
      console.log(button.id + ' set active');
  } else {
      button.className = '';
  }
  }
}
  
/* scrolling smoothly to an element position */
function smoothScroll(targetElement){
  // calculate top position of the target Element
  let posElement = targetElement.getBoundingClientRect().y + window.scrollY;
  // consider the height of the nav bar
  if (window.getComputedStyle(document.querySelector('nav')).position === 'sticky'){
    posElement -= document.querySelector('nav').getBoundingClientRect().height;
  }
  console.log("I'm scrolling to " + posElement);
  window.scroll({top: posElement, behavior:'smooth'});
}

/* update position break poinnts when window size changes*/
window.addEventListener('resize', updateBreakPoints);
function updateBreakPoints(){
  posBreakPoints = [];
  for (let section of sections){
    let posSection = section.getBoundingClientRect().y + window.scrollY;
    posBreakPoints.push(posSection)
  }
  console.log('position break points updated: ' + posBreakPoints);
  //update nav bar buttons because of rezising
  updateBtnsOnScroll();
  }

/* update nav button status depnding on scroll position */
window.addEventListener('scroll', updateBtnsOnScroll);
function updateBtnsOnScroll(){
  let currentPos = window.scrollY;
  // consider the height of the nav bar
  if (window.getComputedStyle(document.querySelector('nav')).position === 'sticky') {
    currentPos += document.querySelector('nav').getBoundingClientRect().height;
  }
  // set position to 30% of window height
  currentPos += 0.3*window.innerHeight;
  console.log("current position: " + currentPos);
  if (currentPos < (posBreakPoints[1])){
    setActive(navButtons[0]);
  } else if (currentPos < (posBreakPoints[2])){
    setActive(navButtons[1]);
  } else{
    setActive(navButtons[2]);
}
  //considering the case where the scroll has reached 
  //bottom but the last article can't reach the right height
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    setActive(navButtons[2]);
    console.log("bottom reached");
  }
}

/* code executed right after document loads */
updateBreakPoints();
updateBtnsOnScroll();


//hide navbar
var navBar = document.querySelector('nav')
//change nav class
function navBarUpdate(){
  var pos = document.scrollingElement.scrollTop;
  if (pos > 4) {
    navBar.className = 'hide';
    
  } else {
    navBar.className = '';
    
  }
}



/* 
  social network buttons, hovering effect 
*/

var socialBtns = document.querySelectorAll('#links-wrapper a')

// add event listeners to social network buttons
for (var k = 0; k < socialBtns.length; k++){
  var button = socialBtns[k]
  button.addEventListener('mouseenter', hovered);
  button.addEventListener('mouseleave',notHovered);
}
// marks button as hovered
function hovered(e){
  //clean class on every button
  for (var k = 0; k < socialBtns.length; k++){
    socialBtns[k].className = '';
  }
  //assign class
  e.target.className = 'hovered';
}
// mark buton as not hovered
function notHovered(e){
  e.target.className = '';
}


/* 
  Go Top button scroll effect and style
*/
//smooth effect
var goTop = document.querySelector('#go-top a');
goTop.addEventListener('click', function(e){
  e.preventDefault();
  window.scroll({top:0, left:0, behavior:'smooth'});
});
//hover style, change class
goTop.addEventListener('mouseenter', function(){
  goTop.className = 'hovered';
  
});
goTop.addEventListener('mouseleave',function(){
  goTop.className = '';

});


