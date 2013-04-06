var shoe = require('shoe');
var emitStream = require('emit-stream');
var MuxDemux = require('mux-demux');
var dnode = require('dnode');

var img = document.querySelector('#viewer');
var coords = document.querySelector('#currTargetCoords');
var control = require('./browser/control');

var mdm = MuxDemux();
mdm.on('connection', function (c) {
    if (c.meta === 'emit') {
        var emitter = emitStream(c);
        
        emitter.on('image', function (data) {
            img.setAttribute('src', 'data:image/png;base64,' + data);
        });
        
        emitter.on('coords', function (data) {
        	var text = document.createTextNode(''+data);
        	coords.innerHTML = ''; // clear existing
			coords.appendChild(text);
        });
        
        emitter.on('red', function () {
            
        });
    }
    else if (c.meta === 'dnode') {
        var d = dnode();
        d.on('remote', control);
        c.pipe(d).pipe(c);
    }
});
mdm.pipe(shoe('/sock')).pipe(mdm);
