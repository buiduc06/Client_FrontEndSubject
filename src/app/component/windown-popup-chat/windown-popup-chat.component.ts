import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ChatService } from '../../service/chat/chat.service';
import * as io from 'socket.io-client';
declare var jquery:any;
declare var $ :any;
// import { ChatService } from '../../service/chat.service';

@Component({
	selector: 'app-windown-popup-chat',
	templateUrl: './windown-popup-chat.component.html',
	styleUrls: ['./windown-popup-chat.component.css']
})
export class WindownPopupChatComponent implements OnInit {
	msgInput: string;
	private socket: SocketIOClient.Socket;
	// public dataMessage = [{
	// 	user:{id:22,name:'ducpanda'},
	// 	message:[{message:'xin chào các bạn'}]
	// }];
	public dataMessage:any;
	public myId;
	public autoload;
	constructor(
		private Api: ApiService,
		private Chat: ChatService,
		) { 
		this.getMydata();
		this.socket = io('http://localhost:9999');
	}

	ngOnInit() {
		this.Chat.onNewMessage().subscribe(msg => {
			// this.dataMessage.push(datams);
			this.getMydata();
			if (this.dataMessage !=null) {

				var lenghtObj = this.dataMessage.length;
			// check xem đây có phải là tin nhắn vừa gửi mà thằng kia chưa rep k
			if (msg.user.id == this.myId && this.dataMessage[lenghtObj-1].user.id == this.myId) {
				this.dataMessage[lenghtObj-1].message.push(msg.message[0]);
			}else{
				this.dataMessage.push(msg);
			}
		}else{
			this.dataMessage=[msg];
		}

		console.log(msg);
		console.log(this.dataMessage);
	});

		// this.socket.on('serverChatToClient', function(message){
		// 	console.log(message);
		// });
	}

	sendButtonClick() {
		this.Chat.sendMessage(this.msgInput);
		$('#box_chat').val('');
		$('#box_chat').text('');
	}




	// getMoreMessages(){
	// 	this.Api.addMessages(this.Msg).subscribe(
	// 		data=>console.log(data),
	// 		Error=>console.log(Error)
	// 		);
	// }
	// sendMessages(){
	// 	this.Api.addMessages(this.Msg).subscribe(
	// 		data=>console.log(data),
	// 		Error=>console.log(Error)
	// 		);
	// }

	changeCommentTextera(event){
		this.msgInput = event.target.value;
		if(event.keyCode == 13) {
			alert('msg');
			this.sendButtonClick();
		}
	}
	sendMsgbyKeyEnter(event){
		this.Chat.sendMessage(event.target.value);
		$('#box_chat').val('');
		$('#box_chat').text('');
	}
	openChat(){
		$('#chatRealtime').toggleClass('open-chat');
	}
	getMydata(){
		this.Api.getMyInfo().subscribe(
			data=>{
				this.myId = data['id'];
			},Error=>{
				console.log(Error);
			}
			);
	}
}
