import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../service/token.service';
import { NewsfeedService } from '../../service/newsfeed.service';
import { ApiService } from '../../service/api.service';


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
  	) { }

public dataUser;
  ngOnInit() {
   
  	// console.log(this.ApiService.getInfoUser());
  }
 
  logout(){
  	this.token.logout();
  	this.router.navigateByUrl('/login');
  }


}
