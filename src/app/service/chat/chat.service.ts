import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { ApiService } from '../../service/api.service';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ChatService {
	private socket: SocketIOClient.Socket;
	protected dataUser={
		id:null,
		name:null,
		avatar:null,
		uid_user:null,
	} ;



	constructor(
		private Api:ApiService,
		) { 
		this.socket = io(environment.chat_socket);
		this.Api.getMyInfo().subscribe(
			data=>{

				this.dataUser.id = data['id'];
				this.dataUser.name = data['name'];
				this.dataUser.avatar = data['avatar'];
				this.dataUser.uid_user = data['uid_user'];
        this.changeStatus();
			},Error=>{
				// alert(' có lỗi trong quá tring lấy user data');
				console.log(Error);
			}
			);

  }

  changeStatus(){
    this.socket.emit('changeOnline', { uid_user:this.dataUser.uid_user});
  }
  changeOffline(){
    this.socket.emit('changeOffline', { uid_user:this.dataUser.uid_user});
  }
  // EMITTER
  // sendMessage(msg: string) {
  // 	this.socket.emit('sendChatToServer', { user: this.dataUser, message:[{message: msg}]});
  // }
  sendMessageWithUser(uid_user,msg: string) {
  	this.socket.emit('sendChatToServer', { uid_user:uid_user,user: this.dataUser, message:[{message: msg}]});
  }

  sendCommentToPost(data) {
  	this.socket.emit('commentPostEvent', data);
  }

  addFriendRealtime(user_id) {
    this.socket.emit('addFriendRealtime', {user_id:user_id, dataSend:this.dataUser});
  }


  // HANDLER
  // onNewMessage() {
  // 	return Observable.create(observer => {
  // 		this.socket.on('serverChatToClient', msg => {
  // 			observer.next(msg);
  // 		});
  // 	});
  // }

  // onNewMessage2() {
  // 	return Observable.create(observer => {
  // 		this.socket.on('serverChatToClient_'+this.dataUser.uid_user, msg => {
  // 			observer.next(msg);
  // 		});
  // 	});
  // }
  // sendcommenttoclient(){
  // 	return Observable.create(observer => {
  // 		this.socket.on('sendcommenttoclient', data => {
  // 			observer.next(data);
  // 		});
  // 	});
  // }

}
