import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../service/api.service';
import { TokenService } from '../../service/token.service';
import { Register } from '../../models/register';
import { Router } from '@angular/router';

declare var jquery: any;
declare var $: any;

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


	public form = {
		firstname: null,
		lastname: null,
		email: null,
		password: null,
		datetimepicker: null,
		gender: null
	};

	public error = null;

	constructor(
		private ApiService: ApiService,
		private router: Router,
		private Token: TokenService
		) { }

	ngOnInit() {
	}

	onLogin() {
		if (this.form.email !=null && this.form.password !=null) {
			$('.pd_loading').show();
			this.ApiService.login(this.form)
			.subscribe(
				data => {
					this.handleReponse(data);
					$('.pd_loading').hide();
					return this.router.navigateByUrl('/');
				}, Error => {
					$('.pd_loading').hide();
					alert("Tên tài khoản hoặc mật khẩu không chính xác");
					this.router.navigateByUrl('/login');
				}
				);
		}else{
			alert('bạn quên nhập địa chỉ email hoặc mật khẩu rồi kìa');
		}
	};
	onRegister() {
		$('.pd_loading').show();
		this.ApiService.signUp(this.form)
		.subscribe(
			data => {
				$('.pd_loading').hide();
				alert('tạo tài khoản thành công, mời bạn đăng nhập');
				this.router.navigateByUrl('/login');
				location.reload();
			},
			error => {
				$('.pd_loading').hide();
				this.handleError(error),
				alert('đăng kí không thành công , địa chỉ email bị trùng hoặc điều thiếu các trường');
			}
			);
	}

	handleReponse(data) {
		this.Token.handle(data);
	}


	handleError(error) {
		this.error = error.error.error;
	}

	 onClickRegister(){
	 	 $('.nav-tabs a[href="#home"]').tab('show');
	 }
}

