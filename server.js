const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);

const io = new Server({
	cors: {
		origin: "*",
	},
});

io.attach(server);

//Load css file in /public folder
app.use(express.static(__dirname+'/public'));
//faver icon
app.use('/favicon.ico', express.static('images/favicon.ico'));

//var PORT=3000;
app.get('/',function(req,res){
	res.render('index.ejs');

});
app.get('/demo',function(req,res){
	res.render('demo.ejs');

});
io.on('connection', (socket) => {
	//use connected
	console.log('a user connected');
	//user disconnect
	socket.on('disconnect', () => {
	  console.log('user disconnected');
	});
	//user on chat
	socket.on('ready', (msg) => {
		console.log('ready: ' + msg);
		socket.emit('announce','{"message":"hello"}');
	  });
  });
  
server.listen(3000, () => {
console.log('server running at http://localhost:3000');
});

