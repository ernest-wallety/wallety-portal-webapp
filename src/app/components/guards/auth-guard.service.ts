import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationHelper } from '../helpers/authentication_helper';

@Injectable({
   providedIn: 'root',
})
export class AuthGuard implements CanActivate {

   token?: string = AuthenticationHelper.get_user_detail().SessionToken;

   constructor(
      private jwtHelper: JwtHelperService,
      private router: Router,
   ) { }

   canActivate() {
      // Check if the token is expired or not and if token is expired then redirect to login page and return false
      if (this.token && !this.jwtHelper.isTokenExpired(this.token)) {
         return true;
      }

      this.router.navigate(['auth/logout']);

      return false;
   }
}