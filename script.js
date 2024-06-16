var canvas = document.getElementById("pong");
var ctx = canvas.getContext("2d");

function drawCircle(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x+radius, y+radius, radius, 0, 2*Math.PI);
  ctx.stroke();
  // ctx.fill();
}

function drawRect(x, y, width, height) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x + width, y + height);
  ctx.lineTo(x, y + height);
  ctx.lineTo(x, y);
  ctx.stroke();
  // ctx.fill();
}

function keyDownHandler(e) {
  if (e.key == "a") {
    downLeft = true;
  }
  if (e.key == "d") {
    downRight = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "a") {
      downLeft = false;
  }
  if (e.key == "d") {
    downRight = false;
  }
}

function keyDownHandler(e) {
  if (e.key == "w") {
    downUp = true;
  }
  if (e.key == "s") {
    downDown = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "w") {
      downUp = false;
  }
  if (e.key == "s") {
    downDown = false;
  }
}

function updateMovement() {
  // if (!downLeft && !downRight) {
  //   dx = 0;
  //   dy = 0;
  // }
  if (downLeft) {
    dx = -5;
  // } else {
  //   dx = 0;
  }
  if (downRight) {
    dx = 5;
  }
}

function updateMovementpaddle() {
  if (!downUp && !downDown) {
    paddledy = 0;
  }
  if (downUp) {
    paddledy = -3;
  }
  if (downDown) {
    paddledy = 3;
  }
}

function collisionHandlerpaddle() {
  if (paddley <= 0) {
    paddley = 0;
  }
  if (paddley + paddleHeight >= canvas.height) {
    paddley = canvas.height - paddleHeight;
  }
}

function collisionHandlerpaddle2() {
  if (paddle2y <= 0) {
    paddle2y = 0;
  }
  if (paddle2y + paddleHeight >= canvas.height) {
    paddle2y = canvas.height - paddleHeight;
  }
}

function play() {
  if (y + 2*r >= paddley && y <= paddley + paddleHeight) {
    if (x <= paddleWidth) {
      dx *= -1;
    }
  }
}

function play2() {
  if (y + 2*r >= paddle2y && y + 2*r <= paddle2y + paddleHeight) {
    if (x  >= canvas.width - canvas.width/20 - paddleWidth) {
      dx *= -1;
    }
  }
}

function impossible_AI_play() {
  paddle2y = y - 4*r;
  if (paddle2y <= 0) {
    paddle2y = 0;
  }
  if (paddle2y + paddleHeight >= canvas.height) {
    paddle2y = canvas.height - paddleHeight;
  }
}

function hard_AI_play() {
  if (y > paddle2y) {
    paddle2dy = 3.5;
  }
  if (y < paddle2y) {
    paddle2dy = -3.5;
  }
   if (paddle2y <= 0) {
    paddle2y = 0;
  }
  if (paddle2y + paddleHeight >= canvas.height) {
    paddle2y = canvas.height - paddleHeight;
  }
}

function medium_AI_play() {
  if (y > paddle2y) {
    paddle2dy = 2;
  }
  if (y < paddle2y) {
    paddle2dy = -2;
  }
   if (paddle2y <= 0) {
    paddle2y = 0;
  }
  if (paddle2y + paddleHeight >= canvas.height) {
    paddle2y = canvas.height - paddleHeight;
  }
}

function easy_AI_play() {
  if (y > paddle2y) {
    paddle2dy = 1;
  }
  if (y < paddle2y) {
    paddle2dy = -1;
  }
   if (paddle2y <= 0) {
    paddle2y = 0;
  }
  if (paddle2y + paddleHeight >= canvas.height) {
    paddle2y = canvas.height - paddleHeight;
  }
}

function one_point() {
  if (x <= 0) {
    x = canvas.width/2 - canvas.width/20;
    y = canvas.height/2;
  }
  if (x >= canvas.width - canvas.width/20) {
    y = canvas.height/2;
    x = canvas.width/2; 
  }
}

function collisionHandler() {
  if (y <= 0) {
    dy *= -1;
  }
  if (y+2*r >= canvas.height) {
    dy *= -1;
  }
  if (x+2*r >= canvas.width) {
    dx *= -1;
  }
  if (x <= 0) {
    dx *= -1;
  }
}

var x = 50;
var y = 50;
var r = 10;
var dx = 2;
var dy = 2;
var downUp = false;
var downDown = false;
var downRight = false;
var downLeft = false;
var paddledy = 0;
var paddleWidth = canvas.width/20;
var paddleHeight = canvas.height/3;
var paddlex = 0;
var paddley = 15;
var paddle2x = canvas.width - canvas.width/20;
var paddle2y = 15;
var paddle2dy = 0;
var score1  = 0; 
var score2 = 0;

function scoreboard() {
  ctx.font = "18px Comic Sans MS";
  ctx.fillStyle = "blue";
  ctx.textAlign = "center";
  ctx.fillText("Player 1" + ": " + score1, canvas.width/6, canvas.height - canvas.height + 20);
  ctx.font = "18px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText("CPU" + ": " + score2 , canvas.width - 35, canvas.height - canvas.height + 20)
  if (x <= 0) {
    score2 = score2 + 1;
  }
  if (x >= canvas.width - canvas.width/20) {
    score1 = score1 + 1;
  }
}
 


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle(x, y, r);
  drawRect(0, 0, canvas.width, canvas.height);
  updateMovement();
  updateMovementpaddle();
  collisionHandler();
  collisionHandlerpaddle();
  collisionHandlerpaddle2();
  play();
  play2();
  scoreboard();
  impossible_AI_play();
  // easy_AI_play();
  // medium_AI_play();
  //hard_AI_play();
  one_point();
  drawRect(paddlex, paddley, canvas.width/20, canvas.height/3)
  drawRect(paddle2x, paddle2y, canvas.width/20, canvas.height/3)
  x = x + dx;
  y = y + dy;
  paddley = paddley + paddledy;
  paddle2y = paddle2y + paddle2dy;
  window.setTimeout(draw, 10);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

draw();