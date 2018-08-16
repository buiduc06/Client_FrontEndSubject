var io = require('socket.io')(9999)
console.log('connected port 9999')
var datat =[]
io.on('connection', function(socket){

	console.log('Connected')
	// console.log(socket)
	  if (datat ==null ) {
	  	datat = [socket.id]
	  }else{
	  	datat.push(socket.id)
	  }
 
	socket.on('sendChatToServer', function(message){
		console.log(message)
		message['data']=datat
		console.log(datat)
		io.sockets.emit('serverChatToClient', message)
	})
	socket.on('disconnect', function(socket){

		console.log('thoat')

	})
})