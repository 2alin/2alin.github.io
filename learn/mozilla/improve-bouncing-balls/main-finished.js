// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// change the speed of all evil circles
var speedEvils = 7;

// score paragraph selector
var scorePara = document.querySelector('p');

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}



/*
  CONSTRUCTORS
*/

function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}

function Ball(x, y, velX, velY, color, size, exists){
  Shape.call(this, x, y, velX, velY, exists);

  this.color = color;
  this.size = size;
}

function EvilCircle(x, y, color, controlKeys, exists) {
  Shape.call(this, x, y, speedEvils, speedEvils, exists);
  this.color = color;
  this.size = 10;
  this.controlKeys = controlKeys; // list of 4 items, indicating the keys set for left, right, down, up movement in that order
  this.ctrlKeysPressed = []; // list with the valid keys that are being pressed at the moment
  this.score = 0; // balls eaten
}


/*
  EVIL CIRCLE METHODS
*/

//define evil circle draw method

EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
};

// define evil circle check bounds method

EvilCircle.prototype.checkBounds = function() {
  if((this.x + this.size) >= width) {
    this.x = width - this.size;
  }

  if((this.x - this.size) <= 0) {
    this.x = this.size;
  }

  if((this.y + this.size) >= height) {
    this.y = height - this.size;
  }

  if((this.y - this.size) <= 0) {
    this.y = this.size;
  }

};

// define evil circle position update method

EvilCircle.prototype.update = function(){
  for ( var k = 0; k < this.ctrlKeysPressed.length; k++){
    var key = this.ctrlKeysPressed[k];
    // moves left, right, down or up, in that order
    if (key === this.controlKeys[0]) {
      this.x -= this.velX;
    } else if (key === this.controlKeys[1]) {
      this.x += this.velX;
    } else if (key === this.controlKeys[2]) {
      this.y -= this.velY;
    } else {
      this.y += this.velY;
    }
  }
};

// define evil circle collision detect

EvilCircle.prototype.collisionDetect = function() {
  for(var j = 0; j < balls.length; j++) {
    if(balls[j].exists) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
        this.score++; // increase the score per instance
      }
    }
  }
}


/*
  BALL METHODS
*/

// define ball draw method

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// define ball update method

Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

// define ball collision detection

Ball.prototype.collisionDetect = function() {
  for(var j = 0; j < balls.length; j++) {
    if(!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
      }
    }
  }
};






// create first and second evil object instances

var evilCircle1 = new EvilCircle(
  random(0, width), 
  random(0, height), 
  'red', 
  [65,68,87,83],
  true  
);

var evilCircle2 = new EvilCircle(
  random(0, width), 
  random(0, height),
  'green',  
  [37,39,38,40],
  true  
);


// keep a list of control keys (both players) being pressed at the moment
// using a couple of event listeners

var allCtrlKeys = evilCircle1.controlKeys.concat(evilCircle2.controlKeys);
var allCtrlKeysPressed = [];
// add valid keys to the list when they are pressed
document.addEventListener('keydown', pressed);
function pressed(e) {
  var key = e.keyCode;
  if (allCtrlKeys.includes(key) && !(allCtrlKeysPressed.includes(key))){
    allCtrlKeysPressed.push(key);
  }
}
// remove valid keys when they are released
document.addEventListener('keyup', released);
function released(e) {
  var key = e.keyCode;
  
  if (allCtrlKeysPressed.includes(key)) {
    allCtrlKeysPressed = allCtrlKeysPressed.filter(item => item != key);
  }
  
}





// define array to store balls

var balls = [];

// define loop that keeps drawing the scene constantly

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);

  while(balls.length < 25) {
    var ball = new Ball(
      random(0,width),
      random(0,height),
      random(-7,7),
      random(-7,7),
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      random(10,20), 
      true
    );
    balls.push(ball);
  }

  for(var i = 0; i < balls.length; i++) {
    if (balls[i].exists) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  }

  evilCircle1.draw();
  evilCircle1.checkBounds();
  evilCircle1.collisionDetect();
  evilCircle2.draw();
  evilCircle2.checkBounds();
  evilCircle2.collisionDetect();

  if ( allCtrlKeysPressed.length > 0) {
    // dummy lists to separate the keys pressed in two sets
    // one to use for evilCircle1 and other for evilCircle2
    var list1 = [];
    var list2 = [];
    for (var k = 0; k < allCtrlKeysPressed.length; k++) {
      var key = allCtrlKeysPressed[k];
      if (evilCircle1.controlKeys.includes(key)){
        list1.push(key);
      } else {
        list2.push(key);
      }
    }
    // apply the specific movements in every evilCircle
    evilCircle1.ctrlKeysPressed = list1;
    evilCircle1.update();
    evilCircle2.ctrlKeysPressed = list2;
    evilCircle2.update();
  }

  // update score text 
  scorePara.innerHTML = "Player 1: " + evilCircle1.score + "<br>Player 2: " + evilCircle2.score;  

  requestAnimationFrame(loop);
}

loop();
