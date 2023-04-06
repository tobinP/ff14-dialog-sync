// const { keyboard, Key, mouse, Button } = require("@nut-tree/nut-js");

var delayInMilliseconds = 1000; //1 second

// let isDown = false
// setInterval(function () {
// 	if (isDown) {
// 		console.log("mouse is down")
// 		mouse.pressButton(Button.LEFT)
// 	} else {
// 		console.log("mouse is up")
// 		mouse.releaseButton(Button.LEFT)
// 	}

// 	isDown = !isDown

// }, delayInMilliseconds);

// var mouselistener = require('win-mouse')()

// mouselistener.on('left-down', function (x, y) {
// 	console.log(x, y)
// })

import WebSocket from 'ws';
const ws = new WebSocket('ws://localhost:8080');
ws.on('error', console.error);

ws.on('open', function open() {
	console.log("client: connected!")
	ws.send('something');
});

ws.on('message', function message(data) {
	console.log('received: %s', data);
});