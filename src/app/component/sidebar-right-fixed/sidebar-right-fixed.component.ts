import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
declare var jquery:any;
declare var $ :any;
@Component({
	selector: 'app-sidebar-right-fixed',
	templateUrl: './sidebar-right-fixed.component.html',
	styleUrls: ['./sidebar-right-fixed.component.css']
})
export class SidebarRightFixedComponent implements OnInit {
	public dataFriend;

	constructor(
		private Api: ApiService,
		) {
		this.Api.getListFriends().subscribe(data=>{
			this.dataFriend = data;
		});
	}

	ngOnInit() {

	}




	openChat(uid_user){
		$('.chatRealtime').removeClass('open-chat');
		// this.datauserchat = uid_user;
		$('#chatRealtime_'+uid_user).addClass('open-chat');
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
