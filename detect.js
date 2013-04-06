var cv = require('opencv');

var lower_threshold = [170, 160, 60]; //HSV RED
var upper_threshold = [180, 256, 256];//HSV RED
//var lower_threshold = [20, 100, 100];
//var upper_threshold = [30, 255, 255];

var GREEN = [0, 255, 0]; //B, G, R
var WHITE = [255, 255, 255]; //B, G, R

var cannyLowThresh = 0;
var cannyHighThresh = 100;
var nIters = 4;
var minArea = 400;

exports.detectAndRender = function (matrix, frameToRender) {
	var currTargetX; // x coord of current target
	var currTargetY; // y coord of current target
	var currWidth;  // width of the bounding box
	var currHeight;

	matrix.convertHSVscale();
    matrix.inRange(lower_threshold, upper_threshold);
    matrix.dilate(nIters);
    matrix.erode(nIters);
    matrix.gaussianBlur();
    matrix.canny(cannyLowThresh, cannyHighThresh);
    //matrix.dilate(nIters);
            
    contours = matrix.findContours();
    
    var maxArea = 0;
    var maxIndex = -1;
	for(i = 0; i < contours.size(); i++) {
		if(contours.area(i) < minArea) continue;
		if(contours.area(i) > maxArea) {
			maxArea = contours.area(i);
			maxIndex = i;
		}
	}
	
	if(maxIndex === -1) { // no object detected in this frame
		currTargetX = -1;
		currTargetY = -1;
		currWidth = -1;
		currHeight = -1;			
	}
	else {
		var currRect = contours.boundingRect(maxIndex, 0);
		frameToRender.rectangle([currRect.x, currRect.y], [currRect.x + currRect.width, currRect.y + currRect.height], GREEN, 2);
		
		currTargetX = currRect.x + Math.round(currRect.width/2);
		currTargetY = currRect.y + Math.round(currRect.height/2);
		currWidth = currRect.width;
		currHeight = currRect.height;
	}
	var targetRect = new Array();
	targetRect[0] = currTargetX;
	targetRect[1] = currTargetY;
	targetRect[2] = currWidth;
	targetRect[3] = currHeight;
	return targetRect;
}