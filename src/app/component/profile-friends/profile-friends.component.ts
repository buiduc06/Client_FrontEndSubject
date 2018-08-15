import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../service/api.service';
import {ActivatedRoute}	from "@angular/router";
import { Router } from '@angular/router';
import { HostListener} from "@angular/core";
declare var jquery:any;
declare var $ :any;
@Component({
	selector: 'app-profile-friends',
	templateUrl: './profile-friends.component.html',
	styleUrls: ['./profile-friends.component.css']
})
export class ProfileFriendsComponent implements OnInit {

	public params:number;
	public aboutInfo;
	constructor(
		private route:ActivatedRoute,
		private router: Router,
		private Api: ApiService,
		) {
		this.route.params.subscribe(params=>
		{
			this.Api.getDataUserByUid(params.id).subscribe(
				data=>{
					this.aboutInfo = data;
				},
				Error=>{
					alert('có lỗi có thể không tìm thấy người dùng yêu cầu');
					return this.router.navigateByUrl('/');
				}
				);
		}
		);
	}

	ngOnInit() {
	}

}
