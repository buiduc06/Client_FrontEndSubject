import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
	selector: 'app-profile-change-persion-info',
	templateUrl: './profile-change-persion-info.component.html',
	styleUrls: ['./profile-change-persion-info.component.css']
})
export class ProfileChangePersionInfoComponent implements OnInit {
	public form = {
		firstname: null,
		lastname: null,
		gender: null,
		phone: null,
		website: null,
		description: null,
		country: null,
		province: null,
		city: null,
	};
	public myData;

	constructor(
		private ApiService: ApiService,
		) { }

	ngOnInit() {
		this.ApiService.getMetaMyInfo().subscribe(data=>{
			this.form.firstname = data['firstname'];
			this.form.lastname = data['lastname'];
			this.form.phone = data['phone'];
			this.form.website = data['website'];
			this.form.description = data['description'];
		}
		)
	}

	changeInfo(){
		this.ApiService.changeMyInfo(this.form)
		.subscribe(
			data => {
				alert('cập nhật thông tin tài khoản thành công');
			},
			error => {
				console.log(error);
				alert('cập nhật thông tin tài khoản thất bại');
			}
			);
	}
}
