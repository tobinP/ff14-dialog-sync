import { mouse, Button } from '@nut-tree/nut-js';
import WinMouse from 'win-mouse';
import WebSocket from 'ws';
import * as readline from 'node:readline';
import keypress from 'keypress';

console.log('ip:', process.env.IP)
let serverIP = process.env.IP
// socket client
const ws = new WebSocket(`ws://${serverIP}:8080`);
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
const winMouse = WinMouse();
winMouse.on('left-down', function (x, y) {
	console.log(paused);
	if (!paused && ws.readyState === WebSocket.OPEN) {
		ws.send('mouse was clicked');
	} else {
		console.log('event not sent');
	}
});
