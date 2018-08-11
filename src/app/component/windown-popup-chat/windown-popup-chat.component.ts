import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;
// import { ChatService } from '../../service/chat.service';

@Component({
	selector: 'app-windown-popup-chat',
	templateUrl: './windown-popup-chat.component.html',
	styleUrls: ['./windown-popup-chat.component.css']
})
export class WindownPopupChatComponent implements OnInit {
	msgInput: string = 'lorem ipsum';
	constructor(
		// private chatService: ChatService,
		) { }

	ngOnInit() {
		// this.chatService.onNewMessage().subscribe(msg => {
		// 	console.log('got a msg: ' + msg);
		// });
	}

	// sendButtonClick() {
	// 	this.chatService.sendMessage(this.msgInput);
	// }

	// openChat(user_id){
	// 	$('#chatRealtime').toggleClass('open-chat');
	// }
}
