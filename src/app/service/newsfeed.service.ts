import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class NewsfeedService {
	private baseUrl = 'https://apipanda.ducpanda.info/api/Feed';
	constructor(private http: HttpClient) {}

	getNewsFeed(){
		return this.http.get(`${this.baseUrl}/getNewsFeed`);
	}

	getNewsFeedMore(paginate){
		return this.http.post(`${this.baseUrl}/getNewsFeed`, {'page':paginate});
	} 
	getNewsFeedMore2(paginate, uid_user){
		return this.http.post(`${this.baseUrl}/getNewsFeedByUidUser`, {'page':paginate, uid_user:uid_user});
	} 
	postNewsFeed(data){
		return this.http.post(`${this.baseUrl}/postNewsFeed`, data);
	}
	updateActionStatus(data){
		return this.http.post(`${this.baseUrl}/updateActionStatus`, data);
	}
	deletePost(post_id){
		return this.http.post(`${this.baseUrl}/deletePost`, {'id':post_id});
	}
	updatePost(data){
		return this.http.post(`${this.baseUrl}/updatePost`, data);
	}
	

}
