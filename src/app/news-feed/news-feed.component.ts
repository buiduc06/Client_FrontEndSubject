import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NewsfeedService } from '../service/newsfeed.service';
import { TokenService } from '../service/token.service';
import { ApiService } from '../service/api.service';
import { FunctionService } from '../service/function.service';
import { ChatService } from '../service/chat/chat.service';
import { Router } from '@angular/router';
import { HostListener} from "@angular/core";
import { environment } from '../../environments/environment';
import * as io from 'socket.io-client';
declare var jquery:any;
declare var $ :any;


@Component({
	selector: 'app-news-feed',
	templateUrl: './news-feed.component.html',
	styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
	public myInfo;
	public socket;
	constructor(
		private NewsFeed: NewsfeedService,
		private router: Router,
		private Token: TokenService,
		private functions: FunctionService,
		private Api: ApiService,
		private http: HttpClient,
		private chat: ChatService
		) {
		this.socket = io(environment.chat_socket);
	}
	public listPost;
	public error:null;
	public user_id;
	public autoload;
	public paginate = 0;
	public lostContent;
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
	public skipcomment:number = 0;
	FileTest:File;
	sizeObject:number;
	ngOnInit() {
		// lay thong tin user
		this.Api.getMyInfo().subscribe(data=>{this.myInfo = data;
			// sử lý comment realtime
			this.socket.on('sendcommenttoclient', data => {
				if (data.user_data.id != this.myInfo.id) {
					var indexP = this.functions.findIndexInObject(this.listPost, data['post_id']);
					if (this.listPost[indexP].listcomment === null) {
						this.listPost[indexP].listcomment= [data];

					}else{
						this.listPost[indexP].listcomment.push(data);
					}
					this.listPost[indexP].action_with_post.awp_comment +=1;
				}
			})
		});
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
}, 5000);



}
public isDisabled = false;
changestatus(){
	this.isDisabled = true;

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
						this.isDisabled = false;
					},Error => {
						alert("thêm ảnh thất bại");
					});
			}else{
				$('.show_img_beforeupload').empty();
				$('#clean_inp').val('');
				$('#img_pop_upload').empty();
				this.listPost.unshift(maindata);
				this.isDisabled = false;
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
			if (data !='' && data !='undefined') {
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

changeUpoadImage(event){
	var checkfile=true;
	$('.show_img_beforeupload').empty();
	const file = event.target.files;
	var ckUnit ='';
	for (var i = 0; i < file.length; ++i) {
		if (file[i].type == "image/png" || file[i].type == "image/jpeg") {
			ckUnit += `<img src="${URL.createObjectURL(event.target.files[i])}">`;
		}else{
			checkfile=false;
			break;
		}
	}
	if (checkfile) {
		$('.show_img_beforeupload').append(ckUnit);
		this.FileTest = event.target.files;
		this.sizeObject = file.length;
	}else{
		alert('định dạng file ko đúng');
	}
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

				this.chat.sendCommentToPost({
					comment:{
						comment_id:data['comment_id'],
						content:data['content'],
						created_at:"vừa xong",
						image:"",
						isMyComment:"false",
						post_id: data['post_id'],
						user_data:this.myInfo
					}
				});
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
	this.lostContent = this.listPost[idObject2].content;
	$('#clean_inp2').val(this.listPost[idObject2].content);
	$('#modal-edit-post').modal('show');
}

postEditMyPost(){
	var content = this.editPost.content.trim();
	if (content === null || content ===' ' ||content.lenght<=0) {
		alert('nhập gì đi bạn');
		return false;
	}else{
		var post_id = this.editPost.post_id;
		var idObject2 = this.functions.findIndexInObject(this.listPost, post_id);
		this.listPost[idObject2].content = this.editPost.content;
	// console.log(post_id);
	
	this.NewsFeed.updatePost(this.editPost).subscribe(data=>{
		// console.log(data);
	},Error=>{
		this.listPost[idObject2].content = this.lostContent;
		console.log('cập nhật bài viết bị lỗi');
		alert('cập nhật bài viết bị lỗi');
	}
	);
	
	$('#modal-edit-post').modal('hide');
}
}

openImg(link){
	// window.location.href = link;
	// $('#change_img_ch').attr('src', link);
	// $('#show_img').modal('show');
	$('.js-zoom-gallery').each(function () {
		$(this).magnificPopup({
			delegate: 'a',
			type: 'image',
			gallery: {
				enabled: true
			},
			removalDelay: 500, //delay removal by X to allow out-animation
			callbacks: {
				beforeOpen: function () {
					// just a hack that adds mfp-anim class to markup
					this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
					this.st.mainClass = 'mfp-zoom-in';
				}
			},
			closeOnContentClick: true,
			midClick: true
		});
	});
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
seemore(post_id){
	$("#seemore_"+post_id).css('max-height', '100%');;
	$("#button_see_more_"+post_id).hide();
}

}
