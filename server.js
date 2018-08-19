var io = require('socket.io')(9999)
console.log('connected port 9999')
var datat =[]
var objMsg = {}
io.on('connection', function(socket){ 
	console.log('connect');
	socket.on('sendChatToServer', function(data){
		dataSend = {
			user:data.user,
			message:data.message, 
			channel: parseInt(data.uid_user)+parseInt(data.user.uid_user),
		}
		console.log(dataSend);
		io.emit('serverChatToClient_'+data.uid_user, dataSend)
	})

	socket.on('disconnect', function(socket){
		console.log('thoat')
	})
})