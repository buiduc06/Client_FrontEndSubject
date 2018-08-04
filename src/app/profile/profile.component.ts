import { Component, OnInit } from '@angular/core';
import {ActivatedRoute}	from "@angular/router";
import { ApiService } from '../service/api.service';
import { NewsfeedService } from '../service/newsfeed.service';
import { Router } from '@angular/router';
@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


	public listPost;
	public error:null;
	public user_id;
	public autoload;
	public paginate = 0;
	public issetData =true;
	constructor(
		private route:ActivatedRoute,
		private Api: ApiService,
		private NewsFeed: NewsfeedService,
		private router: Router,
		) {
		this.route.params.subscribe(params=>
		{
			this.Api.getPostByUid(params.id).subscribe(
				data=>{
					this.getData(data)
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


handleError(error){
	this.error = error.error.error;
}



// ============link
// linkRedirectProfile(id: number){
// 	return this.router.navigateByUrl('/u/'+id);
// }


}
