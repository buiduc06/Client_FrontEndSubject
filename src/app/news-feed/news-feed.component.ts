import { Component, OnInit } from '@angular/core';
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
	selector: 'app-news-feed',
	templateUrl: './news-feed.component.html',
	styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
	public myInfo;


	constructor(
		private NewsFeed: NewsfeedService,
		private router: Router,
		private Token: TokenService,
		private functions: FunctionService,
		private Api: ApiService,
		private http: HttpClient
		) {

		// lấy thông tin của user
		this.Api.getMyInfo().subscribe(data=>{this.myInfo = data});
		console.log(this.myInfo);
	}
	public listPost;
	public error:null;
	public user_id;
	public autoload;
	public paginate = 0;
	public issetData =true;
	public postNews = {
		summary:null,
		content:null,
		user_tag_id:null,
		location:null,
		type:null,
		status:null,

	};

	public editPost = {
		content:null,
		post_id:null,
	};

	public comment ={
		content:null,
	}
	public ContentCM:string;

	FileTest:File;
	sizeObject:number;
	ngOnInit() {
	//lấy data
	this.NewsFeed.getNewsFeed().subscribe(
		data => this.getData(data),
		Error => {
			alert("có lỗi trong quá trình lấy dữ liệu");
		}
		);

	this.autoload = setInterval(() => {
	// sau 3000 ms sẽ load dữ liệu
	this.getMorePost(); 
}, 3000);


}

postNewsFeed(){

	this.NewsFeed.postNewsFeed(this.postNews).subscribe(
		maindata => {
			if (this.FileTest !=null) {
				this.Api.upLoadImage(this.FileTest, maindata['post_id'],this.sizeObject).subscribe(
					data => {
						$('.show_img_beforeupload').empty();
						$('#clean_inp').val('');
						$('#clean_inp').text('');
						$('#img_pop_upload').val('');
						this.FileTest =null;
						maindata['listImage'] = data;
						this.listPost.unshift(maindata);
					},Error => {
						alert("thêm ảnh thất bại");
					});
			}else{
				$('.show_img_beforeupload').empty();
				$('#clean_inp').val('');
				$('#img_pop_upload').empty();

				this.listPost.unshift(maindata);
			}


		},Error => {
			alert("tạo bài viết thất bại");
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

commentF(id){

	alert('msg');
}

linkRedirectProfile(id: number){
	return this.router.navigateByUrl('/u/'+id);
}



toggleComment(post_id){
    $('#show_list_comment_'+post_id).slideToggle(); //
}

changeUpoadImage(event){

	$('.show_img_beforeupload').empty();
	const file = event.target.files;
	var ckUnit ='';
	for (var i = 0; i < file.length; ++i) {
		ckUnit += `<img src="${URL.createObjectURL(event.target.files[i])}">`;
	}
	$('.show_img_beforeupload').append(ckUnit);
	this.FileTest = event.target.files;
	this.sizeObject = file.length;
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



editMyPost(post_id){
	var idObject2 = this.functions.findIndexInObject(this.listPost, post_id);
	this.editPost.post_id = post_id;
	$('#clean_inp2').val(this.listPost[idObject2].content);
	$('#modal-edit-post').modal('show');
}

postEditMyPost(){
	var post_id = this.editPost.post_id;
	var idObject2 = this.functions.findIndexInObject(this.listPost, post_id);
	this.listPost[idObject2].content = this.editPost.content;
	console.log(post_id);
	this.NewsFeed.updatePost(this.editPost).subscribe(data=>{
		console.log(data);
	},Error=>{
		console.log('cập nhật bài viết bị lỗi');
	}
	);
	
	$('#modal-edit-post').modal('hide');
}
}