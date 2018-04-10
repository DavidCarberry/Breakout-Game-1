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

//score 
var score = 0;

// game sounds
var WINNING_SOUND = new Audio('sounds/woohoo.wav');
var SCORE_SOUND = new Audio('sounds/success.wav');
var GAMEOVER_SOUND = new Audio('sounds/gameover.wav');

//setup some bricks
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

//hold the bricks
var bricks = [];
for(c=0; c<brickColumnCount; c++) {
	bricks[c] = [];
	for(r=0; r<brickRowCount; r++) {
		bricks[c][r] = { x: 0, y: 0, status: 1 };
	}
}

//function draws the bricks
function drawBricks() {
 	for(c=0; c<brickColumnCount; c++) {
 		for(r=0; r<brickRowCount; r++) {
		if(bricks[c][r].status == 1){
			var brickX = (c*(brickWidth+brickPadding)) + brickOffsetLeft;
 			var brickY = (r*(brickHeight+brickPadding)) + brickOffsetTop;
 			bricks[c][r].x = brickX;
 			bricks[c][r].y = brickY;
 			ctx.beginPath();
 			ctx.rect(brickX, brickY, brickWidth, brickHeight);
			ctx.fillStyle = "#0095DD";
			ctx.fill();
		    ctx.closePath; 
			}
		}
	}
}

//collision Dector
function collisionDection() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			var b = bricks[c][r];
			if(b.status == 1) {
			if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
				dy = -dy;
				b.status = 0;
                score++;
				SCORE_SOUND.play();
                if(score == brickRowCount*brickColumnCount) {
					WINNING_SOUND.play();
					alert("YOU WIN, CONGRADULATIONS!");
					document.location.reload();
				}				
			    }
			}
		}
	}
}

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: "+score, 8, 20);
	document.getElementById("gamescore").innerHTML = "Score; " + score;
}



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
 	
	//collision detection
	collisionDection();
	
	//draw the bricks
	drawBricks();
	
 	//draw the ball 
 	drawBall();
 	
	//draw paddle
	drawPaddle();
	
	//draw score
	drawScore();
	
 	//bounce off the three walls - game over
 	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
 		dx = -dx;
 	}
 	
 	if(y + dy < ballRadius) {
 		dy = -dy;
 	} else if(y + dy > canvas.height-ballRadius) {
		//check if the ball is hitting the paddle 
		if(x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy
		}
		else {
			GAMEOVER_SOUND.play();
			alert("GAME OVER");
			document.location.reload();
		}
	}
 	
	if(rightPressed && paddleX < canvas.width-paddleWidth) {
		paddleX += 7;
	}
	else if(leftPressed &&  paddleX > 0) {
		paddleX -= 7;
	}
 	
	x +=dx;
	y +=dy;
	
	x += dx;
	y += dy;
 }
 
 //function move mouse 
 function mouseMoveHandler(e) {
	 var relativeX = e.clientX - canvas.offsetLeft;
	 if(relativeX > 0 && relativeX < canvas.width) {
		 paddleX = relativeX - paddleWidth/2;
	 }
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
document.addEventListener("mousemove", mouseMoveHandler, false);

 	setInterval(draw, 10);