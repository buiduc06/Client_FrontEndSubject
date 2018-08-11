import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { FunctionService } from '../../service/function.service';
@Component({
  selector: 'app-box-friend-suggestions',
  templateUrl: './box-friend-suggestions.component.html',
  styleUrls: ['./box-friend-suggestions.component.css']
})
export class BoxFriendSuggestionsComponent implements OnInit {

  constructor(
    private api:ApiService,
    private fcData:FunctionService,
    ) { }
  public listFriend;

  ngOnInit() {
  	this.api.getListSuggestFriends().subscribe(
  		data=>{
  			this.listFriend = data;
        // console.log(data);
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
      },Error=>{
        console.log(Error);
      }
      );
  }

}
