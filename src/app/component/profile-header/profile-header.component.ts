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
changeAvatar(event){
	const file = event.target.files[0];
	this.Api.changeAvatar(file, 'avatar').subscribe(data=>{
		alert('Cập nhật ảnh đại diện thành công');
		$('#main_avatar').attr('src', data);
	},Error=>{
		alert('Lỗi ! định dạng file không hợp lệ hoặc có lỗi ');
	});
}

changeCover(event){
	const file = event.target.files[0];
	this.Api.changeAvatar(file, 'banner').subscribe(data=>{
		alert('Cập nhật ảnh bìa diện thành công');
		$('#main_avatar').attr('src', data);
	},Error=>{
		alert('Lỗi ! định dạng file không hợp lệ hoặc có lỗi ');
	});
}
makeFriend(){
	this.Api.makeFriend(this.DataUser.id).subscribe(
		data =>{
			alert('gửi lời mời kết bạn thành công');
			location.reload();
		},Error=>{
			console.log(Error);
		}
		);
}

AppendFriends(){

	this.Api.appendFriends({user_id:this.DataUser.id}).subscribe(
		data=>{
			alert('chấp nhận kết bạn thành công');
			location.reload();
		},Error=>{
			console.log(Error);
		}
		);

}
deleteFriend(){
	this.Api.deleteFriends({user_id:this.DataUser.id}).subscribe(
		data=>{
			alert('Hủy kết bạn thành công');
			location.reload();
		},
		error=>{
			console.log(error);
			console.log('lỗi hủy kết bạn');
		});
}

cancelFriend(){
	this.Api.cancelFriends({user_id:this.DataUser.id}).subscribe(
		data=>{
			alert('cancle lời mời kết bạn thành công');
			location.reload();
		},
		error=>{
			console.log(error);
			console.log('lỗi hủy kết bạn');
		});
}

}
