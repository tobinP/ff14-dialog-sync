// const { keyboard, Key, mouse, Button } = require("@nut-tree/nut-js");
import { keyboard, Key, mouse, Button } from "@nut-tree/nut-js"
import { mainFunc } from './node_modules/win-mouse/index.js';
import WebSocket from 'ws';

// socket client
const ws = new WebSocket('ws://localhost:8080');
ws.on('error', console.error);
ws.on('open', function open() {
	console.log("client: connected!")
	ws.send('something');
});
ws.on('message', function message(data) {
	console.log('received: %s', data);
});

// mouse click simulator
// var delayInMilliseconds = 1000;
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

// mouse click listener
const eventEmitter = mainFunc();
eventEmitter.on('left-down', function (x, y) {
	console.log(x, y)
	ws.send('mouse was clicked');
});
