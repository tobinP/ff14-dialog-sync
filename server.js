import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
console.log("starting server. listening on 8080")

wss.on('connection', function connection(ws) {
	console.log("server: connected!")
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
    wss.clients.forEach(function each(client) {
      if (client !== ws) {
        client.send("mouse clicked");
      }
    });
    // ws.send('mouse button clicked');
  });

  // ws.send('something');
});