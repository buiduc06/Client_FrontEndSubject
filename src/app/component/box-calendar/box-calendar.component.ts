import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-box-calendar',
  templateUrl: './box-calendar.component.html',
  styleUrls: ['./box-calendar.component.css']
})
export class BoxCalendarComponent implements OnInit {
public fulldate;
  constructor() { }

  ngOnInit() {
  	var d = new Date();
  	var date = d.getDate();
  	var month = d.getMonth()+1;
  	var year = d.getFullYear();
  	this.fulldate = date+'/'+month+'/'+year;
 
  }

}
