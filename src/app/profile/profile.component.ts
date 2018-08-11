import { Component, OnInit } from '@angular/core';
import {ActivatedRoute}	from "@angular/router";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NewsfeedService } from '../service/newsfeed.service';
import { TokenService } from '../service/token.service';
import { ApiService } from '../service/api.service';
import { FunctionService } from '../service/function.service';
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

	public myInfo;
	public listPost;
	public error:null;
	public user_id;
	public autoload;
	public paginate = 0;
	public issetData =true;
	public params;
	public comment ={
		content:null,
	}
	public ContentCM:string;
	public DataUser;
	public countFriends = 0;
	public isMyProfile:boolean;
	constructor(
		private route:ActivatedRoute,
		private NewsFeed: NewsfeedService,
		private router: Router,
		private Token: TokenService,
		private functions: FunctionService,
		private Api: ApiService,
		private http: HttpClient
		) {
		this.route.params.subscribe(params=>
		{
			this.params = params;
			this.Api.getPostByUid(params.id).subscribe(
				data=>{
					this.getData(data);
					this.Api.getMyInfo().subscribe(data=>{this.myInfo = data});
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
		this.autoload = setInterval(() => {
	// sau 3000 ms sẽ load dữ liệu
	this.getMorePost(); 
}, 3000);


		this.Api.getDataUserByUid(this.params).subscribe(
			data=>{
				this.DataUser = data;
				console.log(data);
				if (this.DataUser.isMyProfile) {
					this.isMyProfile = true;
				}else{
					this.isMyProfile = false;
				}
				console.log(this.isMyProfile);
				if (this.DataUser.listFriends.length >0) {
					this.countFriends = this.DataUser.listFriends.length;
				}else{
					this.countFriends = 0;
				}
			},
			Error=>{
				console.log(Error);
			});

	}


	updateActionStatus(idPost, type){
	//type : like
	//type : comment
	//type : share

	this.NewsFeed.updateActionStatus({'idPost':idPost ,'type':type}).subscribe(
		data => {
			for(var i = 0; i < this.listPost.length; i++)
			{
				if(this.listPost[i].post_id == idPost)
				{
					if (data['column'] == 'awp_like') {
						this.listPost[i].action_with_post['isMyLiked'] == true ? this.listPost[i].action_with_post['isMyLiked'] = false : this.listPost[i].action_with_post['isMyLiked'] =true;
					}
					return this.listPost[i].action_with_post[data['column']] = data['quantity'];
				}
			}
			
		},Error => {
			alert("cập nhật hành động bị lỗi")
		});
}
getData(data){
	console.log(data);
	this.listPost = data;
};
getMorePost(){
	// tự động lấy bài viết
	this.paginate +=5;
	this.NewsFeed.getNewsFeedMore(this.paginate).subscribe(
		data=>{
			if (data !='') {
				var listddt = this.listPost.concat(data);
				this.listPost = listddt;
			}else{
				this.issetData = false;
				clearInterval(this.autoload);
			}
		},Error=>{
			console.log(Error);
		}
		);
}


handleError(error){
	this.error = error.error.error;
}

linkRedirectProfile(id: number){
	return this.router.navigateByUrl('/u/'+id);
}



toggleComment(post_id){
    $('#show_list_comment_'+post_id).slideToggle(); //
}

pushCommentStatus(post_id){
	if (this.ContentCM == '' || this.ContentCM.length <0) {
		alert('Vui lòng điền comment');
	}else{
		$('.box_comment_d').val('');
		$('.box_comment_d').text('');
		$('.box_comment_d').empty();
		return this.Api.postComment(this.ContentCM, post_id).subscribe(
			data=>{
				var indexP = this.functions.findIndexInObject(this.listPost, post_id);
				if (this.listPost[indexP].listcomment === null) {
					this.listPost[indexP].listcomment=[data];
					this.ContentCM ='';
				}else{
					this.listPost[indexP].listcomment.push(data);
					this.ContentCM ='';
				}
				this.listPost[indexP].action_with_post.awp_comment +=1;
			},
			Error=>{alert('comment lỗi');}
			);
	}
}
changeCommentTextera(event){
	this.ContentCM = event.target.value;
}

getMoreComment(){
	$('.more-comments').on('click', function() {
		$(this).children('.fa-spinner').toggle('fast');

	});

}

openImg(link){
	// window.location.href = link;
	$('#change_img_ch').attr('src', link);
	$('#show_img').modal('show');
}


// ============link
// linkRedirectProfile(id: number){
// 	return this.router.navigateByUrl('/u/'+id);
// }
backToTop(){
	$(window).scrollTop(0).animate('slow');
}

}
