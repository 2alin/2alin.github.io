var sectionBtns = document.querySelectorAll('nav ul a');

/* 
  Update style in nav bar depending of position
*/
window.addEventListener('scroll', scrollAnalizeViewPort);
// breakpoint function
function scrollAnalizeViewPort(){
  if (window.matchMedia("(max-width: 760px)").matches){
    scrollUpdate([670, 2750 ]);
    navBarUpdate();
  } else if (window.matchMedia("(max-width: 1000px)").matches){
    navBar.className = ''; //in case resized when nav bar was hidden
    scrollUpdate([600, 2560 ]);
  } else {
    navBar.className = ''; //in case resized when nav bar was hidden
    scrollUpdate([400,1270]);
  }
  
}

//change nav buttons class depending of scroll position
function scrollUpdate(sectionPositions){
  var pos = document.scrollingElement.scrollTop;
  if (pos < sectionPositions[0]){
    clearSectionBtns();
    sectionBtns[0].className = 'active'
  } else if(pos < sectionPositions[1]) {
    clearSectionBtns(); 
    sectionBtns[1].className = 'active'
  } else {
    clearSectionBtns();
    sectionBtns[2].className = 'active'
  }

}

//clear classes nav buttons
function clearSectionBtns(){
  for  (var k = 0; k < sectionBtns.length; k++){
    sectionBtns[k].className = '';
  }
}


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
  nav bar buttons, smooth scroll effect 
*/

// add event listeners to every button of the section nav bar
for (var k = 0; k < sectionBtns.length; k++){
  var button = sectionBtns[k];
  button.addEventListener('click', scrollSection);
}

// assigns proper classes to section nav buttons
// and scrolls to the respective section
function scrollSection(e) {
  //prever default click action on anchors
  e.preventDefault();
  //scroll smoothly
  var targetId = e.target.getAttribute('href');
  if(targetId === '#top'){
    window.scroll({top:0, left:0, behavior:'smooth'});
  } else {
    var targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({behavior:'smooth'})
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


