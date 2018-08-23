import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ChatService } from '../../service/chat/chat.service';
import { FunctionService } from '../../service/function.service';
import * as io from 'socket.io-client';
import {Howl} from 'howler';
declare var jquery: any;
declare var $: any;
import { environment } from '../../../environments/environment';
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
		private functionMain: FunctionService,
		) {
		this.socket = io(environment.chat_socket);
		this.Api.getListFriends().subscribe(data => {
			this.dataFriends = data;
			this.socket.on('sendStatusUser', data => {
				$('#change_online_'+data).removeClass('offline');
				$('#change_online_'+data).addClass('online');

			});
		});
	}

	ngOnInit() {
		this.Api.getMyInfo().subscribe(
			data => {
				this.socket.on('serverChatToClient_' + data['uid_user'], msg => {
					if (this.dataMessage !=[''] && this.dataMessage != null) {
						var lenghtObj = this.dataMessage.length;
						if (lenghtObj >=1 && this.dataMessage[lenghtObj - 1].user.id === msg.user.id) {
							this.dataMessage[lenghtObj - 1].message.push(msg.message[0]);
						} else {
							this.dataMessage.push(msg);
						}
					} else {
						this.dataMessage = [msg];
					}
					// mở cửa số nếu có tin nhắn đến
					if ($('#chatRealtime_'+msg.user.uid_user).is(':hidden')) {
						$('.chatRealtime').hide();
						$('#chatRealtime_'+msg.user.uid_user).show();
					}

					$('#status_on_'+msg.user.uid_user).show();

					// scoll to bottom msg
					$('#style-4').animate({scrollTop: $('#style-4')[0].scrollHeight}, 500);
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
		this.onDeleteCountMsg(uid_user);
		$('#style-4').animate({scrollTop: $('#style-4')[0].scrollHeight}, 500);

		// $('.chat-message-field').animate({scrollTop: $('.chat-message-field').innerHeight()});
		$('.box_chat_clear').val('');
		$('.box_chat_clear').text('');
		$('.box_chat_clear').empty();
		if (this.msgInput != '' && this.msgInput.length > 0) {
			this.Chat.sendMessageWithUser(uid_user, this.msgInput);
			var data = {
				user: this.myInfo,
				message: [{ message: this.msgInput }],
				uid_user:uid_user,
				channel:parseInt(uid_user)+parseInt(this.myInfo.uid_user),
			};

			if (this.dataMessage != null) {
				let lenghtObj = this.dataMessage.length;
				if (lenghtObj >=1 && this.dataMessage[lenghtObj - 1].channel == data.channel  && this.dataMessage[lenghtObj - 1].user.id === this.myInfo.id) {
					this.dataMessage[lenghtObj - 1].message.push(data.message[0]);
				} else {
					this.dataMessage.push(data);
				}
			} else {
				this.dataMessage = [data];
			}
		} else {
			console.log('nhap gi di');
		}
	}

	closeMsg(){
		$('.chatRealtime').hide();
	// $('.chatRealtime').removeClass('open-chat');
}
onScrollGetMsg(event){
	if (event.target.scrollTop <1) {
		console.log('loading.......');
	}
}

changeUploadImage(event){
	var checkfile=true;
	$('.show_img_before_upload').empty();
	const file = event.target.files;
	var ckUnit ='';
	for (var i = 0; i < file.length; ++i) {
		if (file[i].type == "image/png" || file[i].type == "image/jpeg") {
			ckUnit += `<img style="width:100%;height: 60px !important;object-fit: cover;" src="${URL.createObjectURL(event.target.files[i])}">`;
		}else{
			checkfile=false;
			break;
		}
	}
	if (checkfile) {
		$('.show_img_before_upload').append(ckUnit);
	}else{
		alert('định dạng file ko đúng');
	}

}
onDeleteCountMsg(uid_user){
	$('#status_on_'+uid_user).hide();
}

}
