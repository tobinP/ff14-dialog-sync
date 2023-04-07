// const { keyboard, Key, mouse, Button } = require("@nut-tree/nut-js");
import { keyboard, Key, mouse, Button } from '@nut-tree/nut-js';
import { mainFunc } from './node_modules/win-mouse/index.js';
import WebSocket from 'ws';
import * as readline from 'node:readline';
import keypress from 'keypress';

// socket client
const ws = new WebSocket('ws://localhost:8080');
ws.on('error', console.error);
ws.on('open', function open() {
	console.log('client: connected!');
	ws.send('something');
});
ws.on('message', function message(data) {
	console.log('received: %s', data);
	mouse.pressButton(Button.LEFT);
	mouse.releaseButton(Button.LEFT);
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

// keyboard event listener
let paused = true;
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// listen to keypress
keypress(process.stdin);
process.stdin.on('keypress', (ch, key) => {
	console.log(key.name);
	if (key && key.name == 'f12') {
		paused = !paused;
		console.log(paused);
	}
});

// mouse click listener
const eventEmitter = mainFunc();
eventEmitter.on('left-down', function (x, y) {
	console.log(paused);
	if (!paused && ws.readyState === WebSocket.OPEN) {
		ws.send('mouse was clicked');
	} else {
		ws.send('event not sent');
	}
});
