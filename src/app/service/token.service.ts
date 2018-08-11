import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class TokenService {
	private iss = {
		login: 'http://apitest.net/api/login',
		signup: 'http://apitest.net/api/signup',
		logout: 'http://apitest.net/api/logout',
	};
	constructor() { }

	handle(data){
		this.set(data);
	}
 
	set(data){
		localStorage.setItem('token', data.token);
		localStorage.setItem('user', window.btoa(unescape(encodeURIComponent(JSON.stringify(data.user)))));
	}

	get() {
		return localStorage.getItem('token');
	}
	remove() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
	}

	isValid() {
		const token = this.get();
		if (token) {
			const payload = this.payload(token);
			if (payload) {
				return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
			}
		}
		return false;
	}

	check() : boolean {
		return localStorage.getItem('token') ? true : false;
	}

	payload(token) {
		const payload = token.split('.')[1];
		return this.decode(payload);
	}

	decode(payload) {
		return JSON.parse(atob(payload));
	}

	loggedIn() {
		return this.isValid();
	}
	logout(){
		this.iss.logout
		this.remove();
	}


}
