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
public dataFriends;
	constructor(
		private Api: ApiService,
		) { }

	ngOnInit() {
		this.Api.getListFriends().subscribe(data=>{
			this.dataFriends = data;
		});
	}




	openChat(user_id){
		$('#chatRealtime').toggleClass('open-chat');
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
