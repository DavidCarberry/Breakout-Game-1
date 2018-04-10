//setup the canvas
var canvas = document.getElementById("myCanvas");

//ctx var 2d content
var ctx = canvas.getContext("2d");

//other for ball sizwe and position
var ballRadius = 10;
var ballColour = "#0095DD"
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

//defining the paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false; 


//function draws ball on canvas 
function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = ballColour;
	ctx.fill();
	ctx.closePath();
}

//function draw the paddle
function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function draw () {
	//clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	//draw the ball 
	drawBall();
	
	//draw paddle
	drawPaddle();
	
	//bounce off the walls
	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
		dx = -dx;
	}
	
	if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
		dy = -dy;
	}
	
	if(rightPressed && paddleX < canvas.width-paddleWidth) {
		paddleX += 7;
	}
	else if(leftPressed &&  paddleX > 0) {
		paddleX -= 7;
	}
	
	
	x += dx;
	y += dy;
}


//define functions to handle key up and key down 
 function keyDownHandler(e) {
 	if(e.keyCode == 39) {
 		rightPressed = true;
 	}
 	else if(e.keyCode == 37) {
 		leftPressed = true;
 	}
 }
 
 function keyUpHandler(e) {
 	if(e.keyCode == 39) {
 		rightPressed = false;
 	}
 	else if(e.keyCode == 37) {
 		leftPressed = false;
 	}
 }

//events that move the paddle 
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
	


	setInterval(draw, 10);