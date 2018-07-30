import { Injectable } from '@angular/core';

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

}
