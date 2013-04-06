var arDrone = require("ar-drone");
var drone = arDrone.createClient();

var takeOffWait = 10000;
var step = 2000;
var wait = 2000;
var landingWait = 2000;
var speed = 0.1;
var rotSpeed = 0.2;

console.log("takeoff");
drone.takeoff();

setTimeout(function() {
	setInterval(function() {
		//update the parameters
		// distIndicator
		// fieldOfViewIndicator
		var di; //distance Indicator
		var fovi; //field of view Indicator
		console.log("di~1", di);
		console.log("fovi~0", fovi);
		
		/*
		if (di > 0.8) {
		    //stop drone
		} else {
		    if (fovi>-0.2 && fovi<0.2) {
			// go straight
			move(moveFront);
		    } else if (fovi > 0.2) {
			// go clockwise
			move(moveClock);
		    } else if (fovi < -0.2) {
			// go counter clockwisze
			move(moveCounterClock);
		    }
		}
		*/
		
		// pause
		//pause(1000);

		setTimeout(moveFront, 0);
		setTimeout(hoverDrone, 0+step);
		setTimeout(moveBack, 0+step+wait);
		setTimeout(hoverDrone, 0+step+wait+step);
		

	    }, 0+step+wait+step+wait);
    }, takeOffWait);

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

/*
setTimeout(moveFront, takeOffWait);
setTimeout(hoverDrone, takeOffWait+step);
setTimeout(function() {
	console.log("landing");
	drone.land();
    }, takeOffWait+step+wait);
*/

//pause(takeOffWait);

/*
setTimeout(function() {
	setInterval(function() {
		//update the parameters
		// distIndicator
		// fieldOfViewIndicator
		var di; //distance Indicator
		var fovi; //field of view Indicator
		console.log("di~1", di);
		console.log("fovi~0", fovi);
		
		if (di > 0.8) {
		    //stop drone
		} else {
		    if (fovi>-0.2 && fovi<0.2) {
			// go straight
			move(moveFront);
		    } else if (fovi > 0.2) {
			// go clockwise
			move(moveClock);
		    } else if (fovi < -0.2) {
			// go counter clockwisze
			move(moveCounterClock);
		    }
		}
		
		// pause
		pause(1000);

	    }, 1000);
    }, takeOffWait);
*/

/*
console.log("wait-1");
drone.after(2000, function() {
	console.log("over-1");
	console.log("wait-2");
	drone.after(0, function() {
		console.log("over-2");
		console.log("wait-3");
		drone.after(0, function() {
			console.log("over-3");
		    });
	    });
    });
*/
/*
var flag=1;
setInterval(theLoop, 100);
function theLoop() {
    console.log("loop");
    if(flag==0) return;
    flag=0;
    console.log("wait-1");
    drone.after(1000, function() {
	    console.log("over-1");
	});
    console.log("wait-2");
    drone.after(1000, function() {
	    console.log("over-2");
	});
    drone.after(0, function() {
	    console.log("flag set");
	    flag=1;
	});
    //    setTimeout(theLoop,2000);
}
*/

function move(direction) {
    drone.after(0, direction);
    drone.after(step, function() {
	    console.log("stop");
	    drone.stop();
	});
}
function safeLand() {
    drone.after(0, function() {
	    console.log("land");
	    drone.land();
	});
}

//drone.after(5000, stepForward());
//drone.after(5000, stepMove(drone.front));
/*drone.config('general:navdata_demo', 'FALSE');
drone.on('navdata', function(navdata) {
	console.log();
	console.log(navdata);
    });
*/


/*
move(moveFront);
pause(wait);
move(moveBack);
pause(wait);
move(moveClock);
pause(wait);
move(moveCounterClock);
*/
/*
setInterval(function() {
	move(moveFront);
	pause(wait);
	move(moveBack);
	pause(wait);
	//move(moveClock);
	//pause(wait);
	//move(moveCounterClock);
    }, 10000);


setInterval(function() {

	//update the parameters
	// distIndicator
	// fieldOfViewIndicator
	var di; //distance Indicator
	var fovi; //field of view Indicator

	if (di > 0.8) {
	    //stop drone
	} else {
	    if (fovi>-0.2 && fovi<0.2) {
		// go straight
	    } else if (fovi > 0.2) {
		// go clockwise
	    } else if (fovi < -0.2) {
		// go counter clockwisze
	    }
	}
	    
	// pause

	//move(moveFront);
	//pause(wait);
	//move(moveBack);
	//pause(wait);
	//move(moveClock);
	//pause(wait);
	//move(moveCounterClock);
    }, 4500);
*/

//pause(landingWait);
//safeLand();

/*
function moveBack(offset) {
    drone.after(, function() {
	    console.log("back");
	    drone.back(speed);
	});
    drone.after(step, function() {
	    console.log("stop");
	    drone.stop();
	});
    drone.after(wait, function() {
	    console.log("land");
	    drone.land();
	});
}
*/
/*
function move() {
    drone.after(takeOffWait, function() {
	    console.log("front");
	    drone.front(speed);
	});
    drone.after(step, function() {
	    console.log("stop");
	    drone.stop();
	});
    drone.after(wait, function() {
	    console.log("land");
	    drone.land();
	});
}
*/

/*
// Works

function move() {
drone.after(takeOffWait, function() {
	console.log("front");
	drone.front(speed);
    });
drone.after(step, function() {
	console.log("stop");
	drone.stop();
    });
drone.after(wait, function() {
	console.log("land");
	drone.land();
    });
}

function pause(time) {
    drone.after(time, function() {
	    console.log("pause over");
	});
}
*/
/*
//Works
drone.takeoff();
drone.after(takeOffWait, function() {
	drone.front(speed);
    });
drone.after(step, function() {
	drone.stop();
    });
drone.after(wait, function() {
	drone.land();
    });
*/

/*
drone.takeoff();
move();
drone.land();

function move() {
    drone.front(takeOffWait, speed);
    drone.after(step, function() {
	    console.log("stopped");
	    this.stop();
	});
    drone.after(wait, function() {
	    drone.stop();
	});
}
*/
/*
function pause(time) {
    console.log(time);
    console.log("inside pause");
    drone.after(time, function() {
	    drone.stop()
	});
}
*/
/*
drone.after(1000, function() {
	    this.stop();
	})
    .after(2000, function() {
	    this.land();
	});
}
*/
/*drone
    .after(5000, function() {
	    this.front(speed);
	})
    .after(1000, function() {
	    this.stop();
	})
    .after(2000, function() {
	    this.land();
	});
*/
//drone.after(0, drone.land);



// Every function starts hovering and stops hovering
/*function stepForward() {
    drone.front(speed);
    drone.after(step, function() {
	    this.stop();
	});
    drone.after(wait, function() {
	    this.stop();
	});
}*/
/*
function stepMove(move) {
    move();
    drone.after(step, drone.stop);
    drone.after(wait, drone.stop);
}
*/
/*
  drone.takeoff();

  drone.after(5000, function() {
    return this.stop();
  }).after(1000, function() {
    return this.land();
  });
*/