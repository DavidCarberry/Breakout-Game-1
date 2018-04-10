//setup the canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;

//setup starting point 
var x = canvas.width/2;
var y = canvas.height-30;

var dx = 2;
var dy = -2;


function draw () {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
	}

	setInterval(draw, 10);