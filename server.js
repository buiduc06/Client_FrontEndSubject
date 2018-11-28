var fs = require( 'fs' );
var app = require('express')();
var https        = require('https');
var server = https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/social.ducpanda.info/privkey.pem'), 
	cert: fs.readFileSync('/etc/letsencrypt/live/social.ducpanda.info/cert.pem'), 
	ca: fs.readFileSync('/etc/letsencrypt/live/social.ducpanda.info/chain.pem'), 
    requestCert: false,
    rejectUnauthorized: false
},app);
server.listen(8080);

var io = require('socket.io').listen(server);
io.on('connection', function(socket){ 
	console.log('connect');

	socket.on('changeOnline', function(data){
		io.emit('sendStatusUser', data.uid_user)
	})

	// socket.on('changeOffline', function(data){
	// 	console.log('offline'+data)
	// 	io.emit('sendStatusUser', data.uid_user)
	// })


	socket.on('sendChatToServer', function(data){
		dataSend = {
			user:data.user,
			message:data.message, 
			channel: parseInt(data.uid_user)+parseInt(data.user.uid_user),
		}
		// console.log(dataSend);
		socket.broadcast.emit('serverChatToClient_'+data.uid_user, dataSend)
	})

	// sử lý comment realtime
	socket.on('commentPostEvent', function(data){
		console.log(data)
		socket.broadcast.emit('sendcommenttoclient', data.comment)
	})

	// sử lý kết bạn realtime
	socket.on('addFriendRealtime', function(data){
		console.log(data)
		socket.broadcast.emit('sendFriendToCl_'+data.user_id, data.dataSend)
	})

	socket.on('disconnect', function(socket){
		console.log('thoat')
		console.log(socket);
	})
})
