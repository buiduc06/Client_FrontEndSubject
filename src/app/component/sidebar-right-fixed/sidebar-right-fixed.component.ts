import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-right-fixed',
  templateUrl: './sidebar-right-fixed.component.html',
  styleUrls: ['./sidebar-right-fixed.component.css']
})
export class SidebarRightFixedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

test(){
	alert('test mở');
}
}
