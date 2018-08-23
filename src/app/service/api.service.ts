import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import {Observable} from "rxjs";
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
 
@Injectable({
	providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://apitest.net/api';
  private userData = 'http://apitest.net/api/user';

  constructor(
    private http: HttpClient,

    ) { }

  login(data){
    return this.http.post(`${this.baseUrl}/login`, data);
  }
  signUp(data){
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  getInfoUser(data){
    return this.http.post(`${this.baseUrl}/getMyInfo`, data);
  }

  getMyInfo(){
    return this.http.get(`${this.userData}/me`);
  }
  getListSuggestFriends(){
    return this.http.get(`${this.userData}/getListSuggestFriends`);
  }

  makeFriend(user_id){
    return this.http.post(`${this.userData}/makefriend`,{'user_id':user_id});
  }

  getMyPost(){
    return this.http.get(`${this.userData}/getMyPost`);
  }
  getPostByUid(uid_user){
    return this.http.post(`${this.userData}/getPostByUid`,{'uid_user':uid_user});
  }

  getUserByUid(uid_user){
    return this.http.post(`${this.userData}/getUserByUid`,{'uid_user':uid_user});
  }

  getDataUserByUid(uid_user){
    return this.http.post(`${this.userData}/getDataUserByUid`,{'uid_user':uid_user});
  }

  doComfirmFriend(user_id){
    return this.http.post(`${this.userData}/confirmFriend`,{'user_id':user_id});
  }

  deleteRequestFriend(user_id){
    return this.http.post(`${this.userData}/deleteRequestFriend`,{'user_id':user_id});
  }

  upLoadImage(FileTest, post_id, sizeObject){

    let file: File = FileTest;
    let formData = new FormData();
    
    for (var i = 0; i < sizeObject; ++i) {
      formData.append('upload[]', FileTest[i]);
    }
    formData.append('post_id', post_id);
    
    return this.http.post(`${this.userData}/uploadImage`, formData);

  }

  postComment(comment, post_id){
    return this.http.post(`${this.userData}/addCommentToPost`, {'comment':comment, 'post_id':post_id});
  }

  searchUser(data){
    return this.http.post(`${this.userData}/searchUser`, data);
  }

  getRequestFriend(){
    return this.http.get(`${this.userData}/getRequestFriend`);
  }

  appendFriends(data){
    return this.http.post(`${this.userData}/appendFriends`, data);
  }
  miunusFriends(data){
    return this.http.post(`${this.userData}/miunusFriends`, data);
  }
  deleteFriends(data){
    // xóa bạn bè
    return this.http.post(`${this.userData}/deleteFriends`, data);
  }
  cancelFriends(data){
    // hủy gửi lời mời
    return this.http.post(`${this.userData}/cancelFriends`, data);
  }
  getListFriends(){
    return this.http.get(`${this.userData}/getListFriends`);
  }

  changeMyInfo(data){
    return this.http.post(`${this.userData}/changeMyInfo`, data);
  }
  getMetaMyInfo(){
    return this.http.get(`${this.userData}/getMetaMyInfo`);
  }
  changePassword(data){
    return this.http.post(`${this.userData}/changePassword`, data);
  }
  changeAvatar(FileTest, type_upload){

    let file: File = FileTest;
    let formData = new FormData();
    formData.append('upload', FileTest);
    formData.append('type', type_upload);
    return this.http.post(`${this.userData}/changeAvatar`, formData);
  }
  deleteComment(comment_id){
    return this.http.post(`${this.userData}/deleteComment`, {comment_id:comment_id});
  }
  getMoreComment(data){
    return this.http.post(`${this.userData}/getMoreComment`, data);
  }
  addMessages(data){
    return this.http.post(`${this.userData}/addMessages`, data);
  }
  getMessages(data){
    return this.http.post(`${this.userData}/getMessages`, data);
  }

}
