import { Component, OnInit } from '@angular/core';
import {ActivatedRoute}	from "@angular/router";
import { Router } from '@angular/router';
import { HostListener} from "@angular/core";
declare var jquery:any;
declare var $ :any;

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	public params:number;
	constructor(
		private route:ActivatedRoute,
		private router: Router,
		) {
		this.route.params.subscribe(params=>
		{
			this.params = params['id'];
		}
		);

	}

	ngOnInit() {
	}


}
