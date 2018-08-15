import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
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
	public Msg ={
		friend_id:22,
		messages:null,

	};
	public autoload;
	constructor(
		private Api: ApiService,
		) { }

	ngOnInit() {
		// this.autoload = setInterval(() => {
		// 	this.getMoreMessages(); 
		// }, 3000);
	}
	getMoreMessages(){
		this.Api.addMessages(this.Msg).subscribe(
			data=>console.log(data),
			Error=>console.log(Error)
			);
	}
	sendMessages(){
		this.Api.addMessages(this.Msg).subscribe(
			data=>console.log(data),
			Error=>console.log(Error)
			);
	}

	changeCommentTextera(event){
	this.Msg.messages = event.target.value;
}
	openChat(){
		$('#chatRealtime').toggleClass('open-chat');
	}
}
