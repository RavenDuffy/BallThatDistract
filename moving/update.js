canvas = document.getElementById("mCanvas");
context = canvas.getContext("2d");

const MAX_FPS = 60.0;
var lastFrameTime = 0;

var ballColour =  'rgba(25, 100, 255, 0.9)'
var ball = new Ball(5, canvas.width / 2, canvas.height / 2, 0, 1, ballColour);

var backgroundBalls = [];

var counter = 0;

function mainLoop(timestamp) {
  if (timestamp < lastFrameTime + (1000 / MAX_FPS)) {
    requestAnimationFrame(mainLoop);
    return;
  }
  lastFrameTime = timestamp;

  draw();
  update();
  requestAnimationFrame(mainLoop);
}

function draw() {
  drawBackground();
  drawBackgroundBalls();
  drawLine();
  drawBall();
}

function drawBackground() {
  //context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'rgba(255, 255, 255, 0.1)'
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBackgroundBalls() {
  context.lineWidth = 10;
  for (var b = 0; b < backgroundBalls.length; b++) {
    context.strokeStyle = backgroundBalls[b].colour;
    context.beginPath();
    context.moveTo(backgroundBalls[b].x, backgroundBalls[b].y);
    context.arc(backgroundBalls[b].x, backgroundBalls[b].y,
                backgroundBalls[b].radius, 0, 2 * Math.PI);
    context.stroke();
  }
}

function drawLine() {
  context.lineWidth = 5;
  context.strokeStyle = "red";
  context.beginPath();
  context.moveTo(canvas.width / 2, canvas.height / 2 - 50);
  context.lineTo(canvas.width / 2, canvas.height / 2 + 50);
  context.stroke();
}

function drawBall() {
  context.lineWidth = 10;
  context.strokeStyle = ball.colour;
  context.beginPath();
  context.moveTo(ball.x, ball.y);
  context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
  context.stroke();
}

function update() {
  updateBackgroundBalls();
  updateBall();
  updateBounceText();
}

function updateBackgroundBalls() {
  while (backgroundBalls.length < Math.floor(counter / 100)) {
    var tempBall = genBall();
    backgroundBalls.push(tempBall);
  }
  for (var b = 0; b < backgroundBalls.length; b++) {
    backgroundBalls[b].update();
    if (backgroundBalls[b].y > canvas.height) {
      backgroundBalls.splice(b, 1);
      backgroundBalls.push(genBall());
    }
  }
}

function updateBounceText() {
  document.getElementById("centerSub").innerHTML = `Times Bounced: ${counter}`;
  document.getElementById("centerVel").innerHTML =
  `Current Velocity: ${Math.abs(ball.dy).toFixed(3)}`;
}

function updateBall() {
  if (ball.y > canvas.height / 2 + 50 || ball.y < canvas.height / 2 - 50) {
    ball.dy *= -1.0001;
    counter += 1;
  }
  ball.update();
}

function genBall() {
  var rolloverG = 400 % counter;
  var rolloverB = 600 % counter;
  var colour = `rgba(${200 % counter}, ${rolloverG}, ${rolloverB}, 0.9)`;
  var tempBall = new Ball(3, Math.random() * canvas.width, -3, 0, (Math.random() * 2.5) + 0.5, colour);
  return tempBall;
}

requestAnimationFrame(mainLoop);
