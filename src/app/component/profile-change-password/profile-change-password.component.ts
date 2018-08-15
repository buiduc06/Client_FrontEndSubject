import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
@Component({
	selector: 'app-profile-change-password',
	templateUrl: './profile-change-password.component.html',
	styleUrls: ['./profile-change-password.component.css']
})
export class ProfileChangePasswordComponent implements OnInit {
	protected form ={
		current_password:null,
		password:null,
		re_password:null,
	};
	constructor(
		private ApiService: ApiService,
		) { }

	ngOnInit() {
	}

	changePassword(){
		if (this.form.password == this.form.re_password) {
			this.ApiService.changePassword(this.form)
			.subscribe(
				data => {
					alert('cập nhật mật khẩu thành công');
				},
				error => {
					alert('Mật khẩu cũ không chính xác .. hoặc gặp lỗi');
				}
				);
		}else{
			alert('nhập lại mật khẩu ko chính xác');

		}
	}

}
