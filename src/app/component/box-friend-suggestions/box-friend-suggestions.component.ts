import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ChatService } from '../../service/chat/chat.service';
import { FunctionService } from '../../service/function.service';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-box-friend-suggestions',
  templateUrl: './box-friend-suggestions.component.html',
  styleUrls: ['./box-friend-suggestions.component.css']
})
export class BoxFriendSuggestionsComponent implements OnInit {
  public socket;
  constructor(
    private api:ApiService,
    private chat:ChatService,
    private fcData:FunctionService,
    ) {
    this.socket = io(environment.chat_socket);
  }
  public listFriend;

  ngOnInit() {
  	this.api.getListSuggestFriends().subscribe(
  		data=>{
  			this.listFriend = data;
      },Error=>{
        console.log(Error);
      }
      );
  }

  makeFriend(user_id){
    this.api.makeFriend(user_id).subscribe(
      data =>{
        var indexD = this.fcData.findIndexInObjectById(this.listFriend, data);
        this.listFriend.splice(indexD,1);
        this.chat.addFriendRealtime(user_id);
      },Error=>{
        console.log(Error);
      }
      );
  }

}
