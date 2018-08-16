import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { ApiService } from '../../service/api.service';
@Injectable({
	providedIn: 'root'
})
export class ChatService {
	private socket: SocketIOClient.Socket;
	protected dataUser={
		id:null,
		name:null,
		avatar:null
	} ;



	constructor(
		private Api:ApiService,
		) { 
		this.socket = io('http://localhost:9999');
		this.Api.getMyInfo().subscribe(
			data=>{
				this.dataUser.id = data['id'];
				this.dataUser.name = data['name'];
				this.dataUser.avatar = data['avatar'];
			},Error=>{
				// alert(' có lỗi trong quá tring lấy user data');
				console.log(Error);
			}
			);
	}

  // EMITTER
  sendMessage(msg: string) {
  	this.socket.emit('sendChatToServer', { user: this.dataUser, message:[{message: msg}]});
  }

  // HANDLER
  onNewMessage() {
  	return Observable.create(observer => {
  		this.socket.on('serverChatToClient', msg => {
  			observer.next(msg);
  		});
  	});
  }

}
