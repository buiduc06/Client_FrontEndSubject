import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ApiService } from '../../service/api.service';
import { TokenService } from '../../service/token.service';
import { Register } from '../../models/register';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


	public form = {
		firstname:null,
		lastname:null,
		email:null,
		password:null,
		datetimepicker:null,
		gender:null
	};

	public error = null;

	constructor(
		private ApiService: ApiService,
		private router: Router,
		private Token: TokenService
		) { }

	ngOnInit() {
	}

	onLogin(){

		this.ApiService.login(this.form)
		.subscribe(
			data => {
				this.handleReponse(data);
					return this.router.navigateByUrl('/');
			 
			},Error => {

				alert("Tên tài khoản hoặc mật khẩu không chính xác");
				this.router.navigateByUrl('/login');
			}
			);

	};
	onRegister(){
		this.ApiService.signUp(this.form)
		.subscribe(
			data 	=> {
				alert('tạo tài khoản thành công, mời bạn đăng nhập');
				return this.router.navigateByUrl('/login');
			},
			error 	=> {
				this.handleError(error),
				alert('đăng kí không thành công , địa chỉ email bị trùng hoặc điều thiếu các trường');
			}
			);
	}

 handleReponse(data){
 	console.log(data);
this.Token.handle(data.access_token);
 }


handleError(error){
	this.error = error.error.error;
}
}
