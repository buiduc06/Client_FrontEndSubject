import { Component, OnInit } from '@angular/core';
import {ActivatedRoute}	from "@angular/router";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NewsfeedService } from '../../service/newsfeed.service';
import { TokenService } from '../../service/token.service';
import { ApiService } from '../../service/api.service';
import { FunctionService } from '../../service/function.service';
import { Router } from '@angular/router';
import { HostListener} from "@angular/core";

declare var jquery:any;
declare var $ :any;
@Component({
	selector: 'app-profile-home',
	templateUrl: './profile-home.component.html',
	styleUrls: ['./profile-home.component.css']
})
export class ProfileHomeComponent implements OnInit {

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
	public editPost = {
		content:null,
		post_id:null,
	};
	public ContentCM:string;
	public DataUser;
	public countFriends = 0;
	public isMyProfile:boolean;
	public skipcomment:number = 0;
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
				if (this.DataUser.isMyProfile) {
					this.isMyProfile = true;
				}else{
					this.isMyProfile = false;
				}
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

deletePost(post_id){ 
	if (!confirm('ban có muốn xóa bài viết này ?')) {
		return false;
	}
	this.NewsFeed.deletePost(post_id).subscribe(
		data=>{
			var idObject = this.functions.findIndexInObject(this.listPost, data);
			this.listPost.splice([idObject], 1);
		},Error=>{
			alert('có lỗi xảy ra trong quá trình xóa');
		});
}

getData(data){
	this.listPost = data;
};
getMorePost(){
	// tự động lấy bài viết
	this.paginate +=5;
	this.NewsFeed.getNewsFeedMore2(this.paginate, this.params.id).subscribe(
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
				data['created_at']='vừa xong';
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

getMoreComment(post_id){
	
	var skip = this.skipcomment+=3;
	this.Api.getMoreComment({post_id:post_id,skip:skip}).subscribe(
		data=>{
			var indexP = this.functions.findIndexInObject(this.listPost, post_id);
			var listcomment = this.listPost[indexP].listcomment.concat(data);
			this.listPost[indexP].listcomment = listcomment;
		},Error=>{
			console.log(Error);
			$('#more_comment_'+post_id).hide();
		}
		);

}

editMyPost(post_id){
	var idObject2 = this.functions.findIndexInObject(this.listPost, post_id);
	this.editPost.post_id = post_id;
	this.editPost.content = this.listPost[idObject2].content;
	$('#clean_inp2').val(this.listPost[idObject2].content);
	$('#modal-edit-post').modal('show');
}

postEditMyPost(){
	var post_id = this.editPost.post_id;
	var idObject2 = this.functions.findIndexInObject(this.listPost, post_id);
	this.listPost[idObject2].content = this.editPost.content;
	// console.log(post_id);
	
	this.NewsFeed.updatePost(this.editPost).subscribe(data=>{
		// console.log(data);
	},Error=>{
		console.log('cập nhật bài viết bị lỗi');
	}
	);
	
	$('#modal-edit-post').modal('hide');
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
deleteComment(comment_id, post_id){
	if (confirm('bạn có chắc chắn muốn xóa bình luận này?')) {
		this.Api.deleteComment(comment_id).subscribe(
			data=>{
				var indexP = this.functions.findIndexInObject(this.listPost, post_id);
				var indexC =  this.functions.findIndexInObjectByComment(this.listPost[indexP].listcomment, comment_id);
				this.listPost[indexP].listcomment.splice([indexC], 1);
				this.listPost[indexP].action_with_post.awp_comment -=1;
				alert('xóa bình luận thành công');
			},
			error=>console.log(error),
			);
	}else{
		
	}

}

}
