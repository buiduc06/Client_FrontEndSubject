import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
private baseUrl = 'http://apitest.net/api';
private userData = 'http://apitest.net/api/user';

  constructor(private http: HttpClient) { }
 
  login(data){
    return this.http.post(`${this.baseUrl}/login`, data);
  }
  signUp(data){
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  getInfoUser(data){
		return this.http.post(`${this.baseUrl}/getMyInfo`, data);
	}

  getListSuggestFriends(data){
    return this.http.post(`${this.baseUrl}/getMyInfo`,data);
  }

}
