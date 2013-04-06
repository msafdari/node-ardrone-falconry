/**
 * AR Drone initialization
 */
var drone = require('ar-drone');
var client = drone.createClient();

var droneController = require('./moveDrone');

var cv = require('opencv');

/**
 * Code for initializing modules dealing with event transmission
 */
var shoe = require('shoe');
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter;

var http = require('http');
var ecstatic = require('ecstatic');
var emitStream = require('emit-stream');

var server = http.createServer(ecstatic(__dirname + '/static'));
server.listen(8000);

var MuxDemux = require('mux-demux');
var dnode = require('dnode');
var methods = [
    'after', 'disableEmergency', 'takeoff', 'land', 'stop', 'animate',
    'animateLeds', 'up', 'down', 'left', 'right', 'front', 'back',
    'clockwise', 'counterClockwise',
];

var sock = shoe(function (stream) {
    var mdm = MuxDemux();
    mdm.pipe(stream).pipe(mdm);
    
    var d = dnode(methods.reduce(function (acc, key) {
        acc[key] = client[key].bind(client);
        return methods;
    }, {
        setRedMode : function (x) { redMode = x }
    }));
    d.pipe(mdm.createStream('dnode')).pipe(d);
    
    emitStream(emitter)
        .pipe(mdm.createWriteStream('emit'))
    ;
});

sock.install(server, '/sock');

var detect = require('./detect');

var lastPng;

var opencvImageStream = new cv.ImageStream()
var targetRect; // coordinates of the target, width, height
opencvImageStream.on('data', function(matrix){
	if (Date.now() - last.frame < 100){
		return;
	}
	var frameToRender = matrix.copy();
	targetRect = detect.detectAndRender(matrix, frameToRender);
	lastPng = frameToRender.toBuffer();
});


var png = drone.createPngStream().pipe(opencvImageStream);
	png.on('error', function (err) {
    console.error('caught error ' + err);
});

var last = { frame : 0, actionFrame : 0 };
var detected = false;
var started = false;

setTimeout(function() {
  droneController.takeoff(client);
}, 1000);

png.on('data', function (buf) {

    if (Date.now() - last.frame >= 100) {
        emitter.emit('image', lastPng.toString('base64'));
        emitter.emit('coordsWeb', targetRect[0] + " " + targetRect[1]);
        console.log("Drone ready", droneController.isDroneReady);
        console.log("Time Constr", (Date.now() - last.actionFrame >= 1000));
        if (Date.now() - last.actionFrame >= 1000 && droneController.isDroneReady) {
    		droneController.move(targetRect);
    		last.actionFrame = Date.now();
    	}
        last.frame = Date.now();
    }   
    /*
    if (detect(640, 360, buf)) {
        detected = true;
        emitter.emit('red');
        
        console.log(Date.now());
        client.front(1);
        client.animateLeds('fire', 5, 1000);
        
        setTimeout(function () {
            client.front(0);
            client.animateLeds('standard', 1, 1000);
            
            emitter.emit('unred');
            detected = false;
        }, 1000);
    }
    */
});