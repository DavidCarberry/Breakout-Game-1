//setup the canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//set the starting point
var x = canvas.with/2;
var y = canvas.height-30;

//draw the ball
function draw() {
ctx.beginpath();
ctx.arc(x, y, 10, 0, Math.PI*2);
ctx.fillstyle = "#0095DD";
ctx.fill();
ctx.closepath();
}

setInterval(draw, 10);