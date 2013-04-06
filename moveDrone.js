var arDrone = require("ar-drone");
//var drone = arDrone.createClient();

var takeOffWait = 10000;
var step = 2000;
var wait = 2000;
var landingWait = 2000;
var speed = 0.1;
var rotSpeed = 0.2;
var maxObjectWidth = 400;
var maxObjectHeight = 400; 
var maxImageWidth = 640;
var maxImageHeight = 360; 
var isDroneReady = true;
var drone;

var stateDesc = ['-1 rotate', 'movement', '-1 hover'];
var rotateState = 0;
var moveState = 1;
var hoverState = 2;
var hoverCtr;
var maxHoverCtr = 5;
//var currState;
var prevState;
//var nextState;


exports.isDroneReady = isDroneReady;

exports.takeoff = function(client) {
	isDroneReady = false;
	console.log("takeoff");
	drone = client;
	drone.takeoff();
	setTimeout(function(){
			isDroneReady = true;
			hoverCtr = 0;
			prevState = rotateState;
		}, takeOffWait);
}

exports.move = function(targetRect) {
	isDroneReady = false;
	console.log("Move Command Received");
	//update the parameters
	// distIndicator
	// fieldOfViewIndicator
	var di = targetRect[2] / maxObjectWidth; //distance Indicator
	var fovi = 0.5 - (targetRect[0]/maxImageWidth); //field of view Indicator
	console.log("di~1", di);
	console.log("fovi~0", fovi);
	
	console.log("x", targetRect[0]);
	console.log("width", targetRect[2]);	
	
	if (targetRect[0] == -1) {
		if(prevState == rotateState) {
			moveClock();
		}
		else if (prevState == moveState) {
			prevState = hoverState;
			hoverCtr=1;			
		}
		else if (prevState == hoverState) {
			if(hoverCtr > maxHoverCtr) {
				prevState = rotateState
				moveClock();
				hoverCtr = 0;
			}
			else {
				hoverCtr++;
			}
		}	
	}	
	else if (di > 0.8) {
	    //stop drone
	} else {
		prevState = moveState;
		hoverCtr = 0;
	    if (fovi>-0.2 && fovi<0.2) {
		// go straight
		moveFront();
	    } else if (fovi > 0.2) {
		// go clockwise
		moveCounterClock();
	    } else if (fovi < -0.2) {
		// go counter clockwisze
		moveClock();
	    }
	}

	setTimeout(hoverDrone, step);
	setTimeout(function(){
			isDroneReady = true;
			console.log("drone is ready");
		}, step+wait);

};
function moveFront() {
    console.log("front");
    drone.front(speed);
}
function moveBack() {
    console.log("back");
    drone.back(speed);
}
function moveClock() {
    console.log("clock");
    drone.clockwise(rotSpeed);
}
function moveCounterClock() {
    console.log("counter clock");
    drone.counterClockwise(rotSpeed);
}
function hoverDrone() {
    console.log("hovering");
    drone.stop();
}
function pause(time) {
    console.log("paused");
    drone.after(time, function() {
	    console.log("pause over");
	});
}