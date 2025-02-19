import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthenticatedBaseComponent } from "../../../base/authenticated_base.component";
import { AuthenticationHelper } from "../../../helpers/authentication_helper";
import { ExtensionMethods } from "../../../helpers/extension_methods";
import { LoginResultModel, RoleCodeModel } from "../../../models/login_result";
import { AvatarComponent } from "../avatar/avatar.component";
import { UserProfilePopupComponent } from "../popups/user-profile/user-profile-popup.component";


@Component({
   selector: 'app-navbar',
   standalone: true,
   imports: [CommonModule, RouterModule, AvatarComponent, UserProfilePopupComponent],
   templateUrl: './navbar.component.html',
   styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent extends AuthenticatedBaseComponent implements OnInit {
   // User related
   public ImageUrl = '';
   public FullName = '';
   public Colour = '';
   public Role?: RoleCodeModel;

   UnreadNotifications = 0; // Add counter for notifications

   @ViewChild('userProfilePopupComponent') userProfilePopupComponent!: UserProfilePopupComponent;

   ngOnInit(): void {
      this.initialize_navbar();
   }

   open_notifications(): void {
      // Handle opening notifications
      console.log('Opening notifications');
   }

   public async user_profile(): Promise<void> {
      this.userProfilePopupComponent.showDialog();
   }

   private async initialize_navbar() {

      if (AuthenticationHelper.is_user_detail_stored(this.platformId)) {
         const success = await this.user_details();

         if (success) {
            const login_result: LoginResultModel = {
               ResponseMessage: this.LoggedInUser.ResponseMessage,
               SessionToken: this.LoggedInUser.SessionToken,
               RoleCodes: this.LoggedInUser.RoleCodes,
               User: this.LoggedInUser.User,
               Success: true
            }

            AuthenticationHelper.set_user_localstorage(login_result, this.platformId);
         }
      }

      // User related
      this.ImageUrl = ExtensionMethods.to_base_64_image(this.LoggedInUser.User?.IdentityImage || '');
      this.FullName = `${this.LoggedInUser.User.Name} ${this.LoggedInUser.User.Surname}`;
      this.Role = this.LoggedInUser.RoleCodes?.find(role => role.IsDefault === true);


      this.titleService.getTitleObservable().subscribe(title => {
         this.PageTitle = title;
      });

      // Simulate some notifications (replace with actual notification service)
      this.UnreadNotifications = 3;
   }

   private user_details = async (): Promise<boolean> => {
      const response = await this.get_async_call_no_params('/Portal/UserDetails');

      if (!response.IsError) {
         this.LoggedInUser.User = response.Data
         return true;
      }

      this.cd.detectChanges();

      return false;
   }
}