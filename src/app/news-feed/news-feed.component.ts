import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { NewsfeedService } from '../service/newsfeed.service';
import { TokenService } from '../service/token.service';
import { FunctionService } from '../service/function.service';
import { Router } from '@angular/router';
import { HostListener} from "@angular/core";
@Component({
	selector: 'app-news-feed',
	templateUrl: './news-feed.component.html',
	styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {

	constructor(
		private NewsFeed: NewsfeedService,
		private router: Router,
		private Token: TokenService,
		private functions: FunctionService,
		) {

		if (!this.Token.isValid()) {
			this.router.navigateByUrl('/login');
		}
	}

	public listPost;
	public error:null;
	public user_id;
	public autoload;
	public paginate = 0;
	public issetData =true;
	public postNews = {
		user_id:1,
		summary:null,
		content:null,
		user_tag_id:null,
		location:null,
		type:null,
		status:null,
	};

	ngOnInit() {
	//lấy data
	this.NewsFeed.getNewsFeed(this.postNews.user_id).subscribe(
		data => this.getData(data),
		Error => {
			alert("có lỗi trong quá trình lấy dữ liệu");
		}
		);

// sau 3000 ms sẽ load dữ liệu
	this.autoload = setInterval(() => {
    this.getMorePost(); 
  }, 3000);

}

postNewsFeed(){
	this.NewsFeed.postNewsFeed(this.postNews).subscribe(
		data => {
			console.log(data);
			this.listPost.unshift(data);
		},Error => {
			alert("tạo bài viết thất bại")
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

// xoa bai viet
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



// ============link
linkRedirectProfile(id: number){
	return this.router.navigateByUrl('/u/'+id);
}

 

// @HostListener("window:scroll", [])
// onWindowScroll() {
// alert('msg');
// }

}



