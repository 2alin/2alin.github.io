var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');

var btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

/* Looping through images */
for (var k = 1; k <= 5; k++){
  var newImage = document.createElement('img');
  newImage.setAttribute('src', 'images/pic' + k + '.jpg');
  thumbBar.appendChild(newImage);

  // assign a click event to every thumbnail
  newImage.addEventListener('click', setImage);

}

function setImage(e){
  // get the file path of the thumbnail picture 
  var imgPath = e.target.getAttribute('src');

  // set thumbnail as the picture displayed 
  displayedImage.setAttribute('src', imgPath);
}


/* Wiring up the Darken/Lighten button */

// assign a click event to our button element
btn.addEventListener('click', switchBrightness);

function switchBrightness(){
  // get the state (class) of the button 
  var btnState = btn.getAttribute('class');

  if (btnState === 'dark'){
    // switch to light state
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)'

  } else {
    // swtich to dark state
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)'
  }
}


