import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';
@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(
		private TokenService : TokenService,
		private routerService: Router
		){}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		if(this.TokenService.check() && this.TokenService.isValid()){
			return true;
		}else{
			this.routerService.navigate(['login']);
			return false;
		}
	}
}
