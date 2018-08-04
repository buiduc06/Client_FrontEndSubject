import { Component, OnInit } from '@angular/core';
import {ActivatedRoute}	from "@angular/router";
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
@Component({
	selector: 'app-profile-header',
	templateUrl: './profile-header.component.html',
	styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {
	protected DataUser;

	constructor(
		private route:ActivatedRoute,
		private Api: ApiService,
		private router: Router,
		) { 

		this.route.params.subscribe(params=>
		{
			this.Api.getUserByUid(params).subscribe(
				data=>{
					this.DataUser = data;
					console.log(data);
				},
				Error=>{
					console.log('có lỗi');
				});
		});

	}

	ngOnInit() {

	}

}
