import { Component, OnInit } from '@angular/core';
import {ActivatedRoute}	from "@angular/router";
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

declare var jquery:any;
declare var $ :any;


@Component({
	selector: 'app-profile-header',
	templateUrl: './profile-header.component.html',
	styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {
	protected DataUser;
	protected params;
	protected isMydata:boolean;

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
					this.isMydata = data['isMydata'];
					console.log(this.DataUser);
				},
				Error=>{
					console.log(Error);
				});
		});

	}

	ngOnInit() {

	}

	  openImg(link){
	// window.location.href = link;
	$('#change_img_ch').attr('src', link);
	$('#show_img').modal('show');
}


}
