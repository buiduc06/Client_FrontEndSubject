import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ChatService } from '../../service/chat/chat.service';
import * as io from 'socket.io-client';
declare var jquery: any;
declare var $: any;
// import { ChatService } from '../../service/chat.service';
import { Observable } from 'rxjs';
@Component({
	selector: 'app-windown-popup-chat',
	templateUrl: './windown-popup-chat.component.html',
	styleUrls: ['./windown-popup-chat.component.css']
})
export class WindownPopupChatComponent implements OnInit {
	public myInfo;
	public socket;
	public dataFriends;
	msgInput: string;

	// public dataMessage = [{
	// 	user: { id: 21, name: 'ducpanda' },
	// 	message: [{ message: 'xin chào các bạn' }]
	// }
	// ];
	public dataMessage = [];


	constructor(
		private Api: ApiService,
		private Chat: ChatService,
		) {
		this.socket = io('http://localhost:9999');
		this.Api.getListFriends().subscribe(data => {
			this.dataFriends = data;
			console.log(data);
		});
	}

	ngOnInit() {
		this.Api.getMyInfo().subscribe(
			data => {
				console.log(data);
				this.socket.on('serverChatToClient_' + data['uid_user'], msg => {
					console.log(msg);
					if (this.dataMessage !== [] && this.dataMessage !== null) {
						var lenghtObj = this.dataMessage.length;
						if (lenghtObj >1 && this.dataMessage[lenghtObj - 1].user.id === msg.user.id) {
							this.dataMessage[lenghtObj - 1].message.push(msg.message[0]);
						} else {
							this.dataMessage.push(msg);
						}
					} else {
						this.dataMessage = [msg];
					}
				});
				this.myInfo = data;
			},
			error => { console.log(error) }
			);
	}





	// form

	changeCommentTextera(event) {
		let value = event.target.value;
		let lastStr = event.target.value;
		let msg = value.replace(/\s/g, '');
		if (msg != '' && msg.length > 0) {
			this.msgInput = lastStr;
		} else {
			this.msgInput = msg;
		}
	}

	sendMsg(uid_user) {

		if (this.msgInput != '' && this.msgInput.length > 0) {
			this.Chat.sendMessageWithUser(uid_user, this.msgInput);
			var data = {
				user: this.myInfo,
				message: [{ message: this.msgInput }],
				uid_user:uid_user,
				channel:parseInt(uid_user)+parseInt(this.myInfo.uid_user),
			};

			if (this.dataMessage != null) {
				console.log(this.dataMessage);

				let lenghtObj = this.dataMessage.length;
				if (lenghtObj >=1 && this.dataMessage[lenghtObj - 1].channel == data.channel  && this.dataMessage[lenghtObj - 1].user.id === this.myInfo.id) {
					this.dataMessage[lenghtObj - 1].message.push(data.message[0]);
				} else {
					this.dataMessage.push(data);
				}
				$('.box_chat_clear').val('');
				$('.box_chat_clear').text('');
				$('.box_chat_clear').empty();
			} else {
				this.dataMessage = [data];
				console.log(this.dataMessage);
				$('.box_chat_clear').val('');
				$('.box_chat_clear').text('');
				$('.box_chat_clear').empty();
			}
		} else {
			console.log('nhap gi di');
			$('.box_chat_clear').val('');
			$('.box_chat_clear').text('');
			$('.box_chat_clear').empty();
		}
	}



}
