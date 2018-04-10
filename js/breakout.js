//setup the canvas
var canvas = document.getElementById("myCanvas");

//ctx var 2d content
var ctx = canvas.getContext("2d");

//other for ball sizwe and position
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function draw () {
	//clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	//draw the ball 
	drawBall();
	
	//bounce off the walls
	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
		dx = -dx;
	}
	
	if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
		dy = -dy;
	}
	
	
	x +=dx;
	y +=dy;
}

	setInterval(draw, 10);