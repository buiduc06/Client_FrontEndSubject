import { Injectable } from '@angular/core';
declare var jquery: any;
declare var $: any;
@Injectable({
	providedIn: 'root'
})
export class FunctionService {

	constructor() { }


	findIndexInObject(object ,post_id) {
		for(var i = 0; i < object.length; i++)
		{
			if(object[i].post_id == post_id)
			{
				return i;
			}
		}
	}

	findIndexInObjectById(object ,p_id) {
		for(var i = 0; i < object.length; i++)
		{
			if(object[i].id == p_id)
			{
				return i;
			}
		}
	}
	findIndexInObjectByComment(object ,p_id) {
		for(var i = 0; i < object.length; i++)
		{
			if(object[i].comment_id == p_id)
			{
				return i;
			}
		}
	}

	hasWhiteSpace(s)
	{


		var reWhiteSpace = new RegExp(/^\s+$/);


     // Check for white space
     if (reWhiteSpace.test(s)) {
     	alert("Please Check Your Fields For Spaces");
     	return false;
     }
     return true;
 }

 encodeImagetoBase64(element) {
 	var file = element;
 	var reader = new FileReader();
 	reader.onloadend = function() {
 		$('.show_img_before_upload').append(`<img style="width:100%;height: 60px !important;object-fit: cover;" src="${reader.result}"`);
 	}
 	reader.readAsDataURL(file);
 	
}
}
