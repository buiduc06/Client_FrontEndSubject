import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import * as io from 'socket.io-client';
declare var jquery:any;
declare var $ :any;
import { ChatService } from '../../service/chat/chat.service';
@Component({
	selector: 'app-sidebar-right-fixed',
	templateUrl: './sidebar-right-fixed.component.html',
	styleUrls: ['./sidebar-right-fixed.component.css']
})
export class SidebarRightFixedComponent implements OnInit {
	public dataFriend;
	public socket;
	constructor(
		private Api: ApiService,
		private Chat: ChatService,
		) {
		this.Api.getListFriends().subscribe(data=>{
			this.dataFriend = data;
		});
	}

	ngOnInit() {

	}




	openChat(uid_user){
		$('.chatRealtime').hide();
		// this.datauserchat = uid_user;
		$('#chatRealtime_'+uid_user).show();
	}
	openBar(){
		var ck = $('.fixed-sidebar');
		if (ck.is('.open')) {
			$('.fixed-sidebar').removeClass('open');
		}else{
			$('.fixed-sidebar').addClass('open');
		}
	}

}
