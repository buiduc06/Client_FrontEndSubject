import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
@Component({
  selector: 'app-box-friend-suggestions',
  templateUrl: './box-friend-suggestions.component.html',
  styleUrls: ['./box-friend-suggestions.component.css']
})
export class BoxFriendSuggestionsComponent implements OnInit {

  constructor(
  	private api:ApiService
  	) { }

  ngOnInit() {
  	this.api.getListSuggestFriends({'test':1}).subscribe(
  		data=>{
  			console.log(data);
  		},Error=>{
  			console.log(Error);
  		}
  		);
  }

}
