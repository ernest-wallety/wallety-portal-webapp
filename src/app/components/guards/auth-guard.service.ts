import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthenticationHelper } from "../helpers/authentication_helper";
// import { TokenExpPopupComponent } from "../styles/standalone/app-popups/token-expiration/token-expiration-popup.component";
// import { MatDialog } from "@angular/material/dialog";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  private isSessionExpiredPopupShown = false; // Flag to prevent multiple popups

  constructor(
    private router: Router,
    // private dialog: MatDialog,
    private jwtHelper: JwtHelperService,
    @Inject(PLATFORM_ID) private platformId: object, // Inject PLATFORM_ID
  ) {}

  canActivate(): boolean {
    const token = AuthenticationHelper.get_user_detail(
      this.platformId,
    ).SessionToken;

    // Check if the token is expired or not and if token is expired, redirect to login page and return false
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.isSessionExpiredPopupShown = false; // Reset flag if user logs in again
      return true;
    }

    if (!this.isSessionExpiredPopupShown) {
      this.isSessionExpiredPopupShown = true; // Set flag to prevent multiple popups
      this.show_session_expired_dialog();
    }

    return false;
  }

  private async log_out() {
    AuthenticationHelper.clear_user_localstorage(this.platformId);
    this.router.navigate(["auth/login"]);
  }

  private show_session_expired_dialog() {
    // const dialogRef = this.dialog.open(TokenExpPopupComponent, {
    //  width: "400px",
    // });

    // dialogRef.afterClosed().subscribe(() => {
    this.log_out();
    // });
  }
}
