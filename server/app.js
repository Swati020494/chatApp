var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var users={};

server.listen(3000);

app.get('/', function (req, res) {
  res.sendFile("/home/swati/chatapp/client/src" + '/index.html');
});

io.on('connection', function (socket) {
  socket.on('new user', function (data,callback) {
    if(data in users){
    	callback(false);
    }
    else{
    	callback(true);
    	socket.uName=data;
		users[socket.uName]=socket;
    	updateUNames();
    }
  });
   function updateUNames(){
    	io.sockets.emit('usernames',Object.keys(users));
   
   }

  socket.on('send message', function (data,callback) {
  	var msg=data.trim();
  	if(msg.substr(0,3)==='/w '){
  		msg=msg.substr(3);
  		var ind=msg.indexOf(' ');
  			if(ind!==-1){
  				var name=msg.substring(0,ind);
  				var msg=msg.substring(ind+1);
  				if(name in users){
  					users[name].emit('new message',{msg:msg,uNme:socket.uName});
  				  	console.log('whisper');
  				}
  				else{
  					callback('Error! Enter a valid one');
  				}

   }
  			 else{
  			 	callback('Error! Please enter a message to ur whisper.')
  			 }
  		}
  	else
      io.emit('new message',{msg:data,uNme:socket.uName});
  	});
  socket.on('disconnect', function(data){
  	if(!socket.uName)
  		return;
  	delete users[socket.uName]
  	updateUNames();
  }); 
});