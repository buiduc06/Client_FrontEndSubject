import { Component, OnInit } from '@angular/core';

declare var jquery:any;
declare var $ :any;

@Component({
	selector: 'app-windown-popup',
	templateUrl: './windown-popup.component.html',
	styleUrls: ['./windown-popup.component.css']
})
export class WindownPopupComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

	testChange(event){

  	$('#update-header-photo').modal('hide');//ẩn ảnh
  	$('.show_img_beforeupload').empty();
  	const file = event.target.files;
  	var ckUnit ='';
  	for (var i = 0; i < file.length; ++i) {
  		ckUnit += `<img src="${URL.createObjectURL(event.target.files[i])}">`;
  	}
  	$('.show_img_beforeupload').append(ckUnit);
  }
  
}
