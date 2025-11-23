
// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

var settings = {
  "language": "en",
  "sizeRandom": false,
  "sizeValue": 56,
  "complexRandom": false,
  "complexValue": 4  
}

var langTags = {
  "en":
    {
      "settings": "Settings",
      "random": "Random",
      "size": "Size",
      "complexity": "Complexity",
      "value": "Value",
      "clear": "Clear canvas",
      "startText" : "Welcome to Weird Shapes, an app that allows you to draw nice forms every time you click/tap over the screen. Also, you can adjust some properties after activating the menu at the top-right corner.",
      "start": "Start"
    },
  "sp":
    {
      "settings": "Configuración",
      "random": "Aleatorio",
      "size": "Tamaño",
      "complexity": "Complejidad",
      "value": "Valor",
      "clear": "Limpiar lienzo",
      "startText" : "Bienvenido a Weird Shapes, una app que te permite dibujar figuras raras cada vez que haces click sobre la pantalla. Ademas puedes ajustar algunas propiedades al activar el menú en la esquina superior derecha.",
      "start" : "Empezar"
    }
}

var settingsButton = document.querySelector('#show-settings');
var settingsBox = document.querySelector('#settings-box');

//reset form elements in settings box in every page's reload
window.addEventListener('load', resetForm);
function resetForm(){
  settingsBox.reset();
}


/*  opening popup window and PRESTART mode ACTIVATED */

var disablingContainer = document.querySelector("#disabling-container");
var openingPopup = document.querySelector("#opening-popup");
var paraStart = document.querySelector("#opening-popup p ");
var buttonStart = document.querySelector("#opening-popup button ");
function fillPopup() {
  paraStart.textContent = langTags[settings.language].startText;
  buttonStart.textContent = langTags[settings.language].start;
}

fillPopup();

var spSelect = document.querySelector('#opening-popup .sp-select');
var enSelect = document.querySelector('#opening-popup .en-select');
// select language at popup
spSelect.addEventListener('click', spSelected);
function spSelected() {
  if (settings['language'] != 'sp'){
    spSelect.style.border = "2px solid #888";
    enSelect.style.border = "none";
    settings['language'] = 'sp';
    fillPopup();
  }
}
enSelect.addEventListener('click', enSelected);
function enSelected() {
  if (settings['language'] != 'en'){
    enSelect.style.border = "2px solid #888";
    spSelect.style.border = "none";
    settings['language'] = 'en';
    fillPopup();
  }
}

buttonStart.addEventListener('click', quitStartMode);
function quitStartMode(){
  disablingContainer.style.display = "none";
  openingPopup.style.display = "none";

}




// if settings button is clicked, show drawSettings
settingsButton.addEventListener('click', drawSettings);
// draw settings box
function drawSettings() {

  var spSelect = document.querySelector('#settings-box .sp-select');
  var enSelect = document.querySelector('#settings-box .en-select');
  var hideSettings = document.querySelector('#hide-settings');

  var settingsTag = document.querySelector('#settings-tag');
  var sizeTag = document.querySelector('#size-tag');
  var complexityTag = document.querySelector('#complexity-tag');
  var valueTags = document.querySelectorAll('.value-tags');
  var randomTags = document.querySelectorAll('.random-tags');

  var clearButton = document.querySelector('#clear-button');
  
  // hide settings button and show  settings box
  settingsBox.style.display = "block";
  settingsBox.style.top = 0;
  settingsBox.style.right = 0;

  // put all texts in every element using the right language
  fillTags();

  function fillTags() {
    var lang = settings['language'];
    settingsTag.textContent = langTags[lang]['settings'];
    sizeTag.textContent = langTags[lang]['size'];
    complexityTag.textContent = langTags[lang]['complexity'];
    for (k = 0; k < valueTags.length; k++) {
      valueTags[k].textContent = langTags[lang]['value'];
    }
    for (k = 0; k < randomTags.length; k++) {
      randomTags[k].textContent = langTags[lang]['random'];
    }
    clearButton.textContent = langTags[lang]['clear']
  }

  // set initial language icon border
  if (settings['language'] === 'en'){
    enSelect.style.border = "2px solid #888"; 
  } else {
    spSelect.style.border = "2px solid #888"; 
  }

  // select language
  spSelect.addEventListener('click', spSelected);
  function spSelected() {
    if (settings['language'] != 'sp'){
      spSelect.style.border = "2px solid #888";
      enSelect.style.border = "none";
      settings['language'] = 'sp';
      fillTags();
    }
  }
  enSelect.addEventListener('click', enSelected);
  function enSelected() {
    if (settings['language'] != 'en'){
      enSelect.style.border = "2px solid #888";
      spSelect.style.border = "none";
      settings['language'] = 'en';
      fillTags();
    }
  }

  // select size value
  var sizeSlider = document.querySelector('#size-slider');
  var sizeValue = document.querySelector('#size-value');
  sizeSlider.value = settings["sizeValue"];
  sizeValue.textContent = sizeSlider.value;
  sizeSlider.oninput = function() {
    sizeValue.textContent = sizeSlider.value;
    settings["sizeValue"] = sizeSlider.value;
    adjustComplex();
  }
  var sizeRandomCheck = document.querySelector('#size-random-check');
  sizeRandomCheck.onchange = function() {
    if (sizeRandomCheck.checked) {
      settings["sizeRandom"] = true;
      sizeSlider.disabled = true;
      sizeValue.hidden = true;
    } else {
      settings["sizeRandom"] = false;
      sizeSlider.disabled = false;
      sizeValue.hidden = false;
    }
  }
  
  // select complexity value
  var complexSlider = document.querySelector('#complex-slider');
  var complexValue = document.querySelector('#complex-value');
  complexSlider.value = settings["complexValue"];
  complexValue.textContent = complexSlider.value;
  complexSlider.oninput = function() {
    complexValue.textContent = complexSlider.value;
    settings["complexValue"] = complexSlider.value;
  }
  var complexSliderCheck = document.querySelector('#complex-random-check');
  complexSliderCheck.onchange = function(){
    if (complexSliderCheck.checked){
      settings["complexRandom"] = true;
      complexSlider.disabled = true;
      complexValue.hidden = true;
    } else {
      settings["complexRandom"] = false;
      complexSlider.disabled = false;
      complexValue.hidden = false;
    }
  }
  
  //adjust complex slider limits and values over size value 
  function adjustComplex(){
    if (settings["sizeValue"] < 16){
      complexSlider.max = 4;
    } else if (settings["sizeValue"] < 32){
      complexSlider.max = 5;
    } else{
      complexSlider.max = 6;
    }
    complexValue.textContent = complexSlider.value;
    settings["complexValue"] = complexSlider.value;
  }

  //clear canvas
  clearButton.addEventListener('click', clearCanvas);
  function clearCanvas() {
    ctx.clearRect(0, 0, width, height);
  }

  // hide settings box
  hideSettings.addEventListener('click', quitSettings);
  function quitSettings(){
    settingsBox.style.display = "none";
  }

}



// draw one shape per click/tap
canvas.addEventListener('click', generateShape);
function generateShape(e) {
  var posX = e.clientX;
  var posY = e.clientY;
  //console.log(posX,posY);

  // color that whole shape will take (transparency 0.5 fixed)
  var color = randomColor();

  // size of the original parent
  var size;
  if (settings['sizeRandom']) {
    size = random(8, 100);
  } else {
    size = settings['sizeValue'];
  }

  // angles the children will be separated from parent's original axis
  var angles = randomAngles();

  // number of generations that the shape will generate (nRec)
  var nRec;
  if (settings['complexRandom']) {
    // takes into consideration <size> to limit <nRec>
    nRec = random(1, 1 + Math.floor(Math.log(size) / Math.log(2)));
  } else {
    nRec = settings['complexValue'];
  }

  //generate and draw the shape
  var myShape = new WeirdShape(posX, posY, color, size, angles[0], angles[1], nRec);
  myShape.draw();
}




function randomColor() {
  //return a string with a random color and 0.5 of transparency
  return 'rgba(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ',0.5)';
}

// return two random angles, separated at least by 15° = 0.2618rad
function randomAngles() {
  // first angle between 0 and pi radians
  var angle1 = Math.random() * Math.PI;
  // second angle separated from first by 15°
  var angle2;
  if (angle1 < 0.2618) {
    angle2 = (2 * Math.PI - 2 * 0.2618) * Math.random() + angle1 + 0.2618;
  } else {
    angle2 = (2 * Math.PI - angle1 - 0.2618) * Math.random() + angle1 + 0.2618;
  }

  return [angle1, angle2];
}

// function to generate random number
function random(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}


function WeirdShape(x, y, color, size, angle1, angle2, nRec) {
  // avoid high values of recursivity
  if (nRec > 10) {
    alert("You can't go that deep! Try nRec <= 10");
    return;
  }
  this.x = x;
  this.y = y;
  this.color = color;
  this.size = size;
  this.angle1 = angle1;
  this.angle2 = angle2;
  this.nRec = nRec;
}

WeirdShape.prototype.draw = function () {
  // draw parent shape
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();

  // generate children shapes; nRec indicates how deep the recursivity is
  if (this.nRec > 1) {
    // create child 1
    var x1 = this.x + (5 * this.size / 4) * Math.cos(this.angle1);
    var y1 = this.y - (5 * this.size / 4) * Math.sin(this.angle1);
    var child1 = new WeirdShape(x1, y1, this.color, this.size / 2, 2 * this.angle1, this.angle1 + this.angle2, this.nRec - 1);
    // create child 2
    var x2 = this.x + (5 * this.size / 4) * Math.cos(this.angle2);
    var y2 = this.y - (5 * this.size / 4) * Math.sin(this.angle2);
    var child2 = new WeirdShape(x2, y2, this.color, this.size / 2, this.angle2 + this.angle1, 2 * this.angle2, this.nRec - 1);

    // draw children
    child1.draw();
    child2.draw();
  }
}