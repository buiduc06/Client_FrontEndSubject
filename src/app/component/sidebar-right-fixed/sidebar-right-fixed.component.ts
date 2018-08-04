import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;
@Component({
	selector: 'app-sidebar-right-fixed',
	templateUrl: './sidebar-right-fixed.component.html',
	styleUrls: ['./sidebar-right-fixed.component.css']
})
export class SidebarRightFixedComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}




	openChat(user_id){
		$('#chatRealtime').toggleClass('open-chat');
	}
}
