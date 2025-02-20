import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthenticationHelper } from "../helpers/authentication_helper";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object, // Inject PLATFORM_ID
  ) {}

  canActivate(): boolean {
    const token = AuthenticationHelper.get_user_detail(
      this.platformId,
    ).SessionToken;

    // Check if the token is expired or not and if token is expired, redirect to login page and return false
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    this.log_out();

    return false;
  }

  private async log_out() {
    AuthenticationHelper.clear_user_localstorage(this.platformId);
    this.router.navigate(["auth/login"]);
  }
}
