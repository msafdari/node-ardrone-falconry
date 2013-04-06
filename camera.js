// Run this to receive a png image stream from your drone.

var arDrone = require('ar-drone');
var cv = require('opencv');
var http    = require('http');

console.log('Connecting png stream ...');

var lower_threshold = [20, 100, 100];
var upper_threshold = [30, 255, 255];

var lastPng;

var s = new cv.ImageStream()

    s.on('data', function(matrix){
        matrix.convertHSVscale();
        matrix.inRange(lower_threshold, upper_threshold);
        lastPng = matrix.toBuffer();
});

var pngStream = arDrone.createPngStream().pipe(s);

pngStream
  .on('error', console.log);
  //.on('data', function(pngBuffer) {
  //  lastPng = pngBuffer;
  //});

var server = http.createServer(function(req, res) {
  if (!lastPng) {
    res.writeHead(503);
    res.end('Did not receive any png data yet.');
    return;
  }

  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(lastPng);
});

server.listen(8080, function() {
  console.log('Serving latest png on port 8080 ...');
});