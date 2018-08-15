import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../service/token.service';
import { NewsfeedService } from '../../service/newsfeed.service';
import { ApiService } from '../../service/api.service';
import { FunctionService } from '../../service/function.service';


declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-header-bp',
  templateUrl: './header-bp.component.html',
  styleUrls: ['./header-bp.component.css']
})
export class HeaderBpComponent implements OnInit {

  constructor(
  	private token:TokenService,
  	private router:Router,
    private ApiService:ApiService,
    private functions:FunctionService,
    ) { }

  public dataUser;
  public dataRequestFriend;
  public lenghtRQfriends:number;
  public sUserName ={
    user_name:null
  };
  ngOnInit() {
    this.ApiService.getMyInfo().subscribe(
      data=>{
        this.dataUser = data;
      },Error=>{
        alert(' có lỗi trong quá tring lấy user data');
      }
      );

    this.ApiService.getRequestFriend().subscribe(
      data=>{
        this.dataRequestFriend = data;
        if (this.dataRequestFriend.lenght != 0) {
          this.lenghtRQfriends = this.dataRequestFriend.length;
        }else{
           this.lenghtRQfriends = 0;
        }

      },Error=>{
        console.log(Error);
      }
      );


  	// console.log(this.ApiService.getInfoUser());
  }

  logout(){
  	this.token.logout();
  	this.router.navigateByUrl('/login');
  }



  FindFriends(e) {
    var ckUnit ='';
    $('#Appent-friends').empty();
    $('#Appent-friends').show();
    $('.notification-list').mouseleave(function(event) {
      $('#Appent-friends').hide();
    });
    this.ApiService.searchUser({user_name:e.target.value}).subscribe(
      data=>{
        $.each( data, function( key, value ) {
          ckUnit += `
          <a href="/u/${value.uid_user}">
          <div class="inline-items" data-selectable="" data-value="${value.name}">
          <div class="author-thumb">
          <img src="${value.avatar}" alt="avatar" width="45px">
          </div>
          <div class="notification-event">
          <span class="h6 notification-friend">${value.name}</span>
          </div>
          <span class="notification-icon">
          <svg class="olymp-happy-face-icon">
          <use xlink:href="#olymp-happy-face-icon"></use>
          </svg>
          </span>
          </div>
          </a>
          `;
        });
        $('#Appent-friends').empty();
        $('#Appent-friends').append(ckUnit).show();
      },Error=>{
        console.log(Error);
      }
      );
  }

  AppendFriends(user_id){

    this.ApiService.appendFriends({user_id:user_id}).subscribe(
      data=>{
        var findIndex = this.functions.findIndexInObjectById(this.dataRequestFriend, user_id);
        this.dataRequestFriend.splice([findIndex], 1);
        this.lenghtRQfriends -=1;
      },Error=>{
        console.log(Error);
      }
      );

  }
  miunusFriends(user_id2){

    this.ApiService.miunusFriends({user_id:user_id2}).subscribe(
      data=>{
        var findIndex = this.functions.findIndexInObjectById(this.dataRequestFriend, user_id2);
        this.dataRequestFriend.splice([findIndex], 1);
        this.lenghtRQfriends -=1;
      },Error=>{
        console.log(Error);
      }
      );

  }

}
