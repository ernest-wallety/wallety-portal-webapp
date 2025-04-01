import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthenticatedBaseComponent } from "../../../base/authenticated_base.component";
import { AuthenticationHelper } from "../../../helpers/authentication_helper";
import { LoginResultModel, RoleCodeModel } from "../../../models/login_result";
import { UserProfilePopupComponent } from "../app-popups/user/user-profile/user-profile-popup.component";
import { AvatarComponent } from "../avatar/avatar.component";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AvatarComponent,
    UserProfilePopupComponent,
  ],
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  animations: [
    trigger("expandCollapse", [
      state(
        "collapsed",
        style({ height: "0px", opacity: 0 }), // Remove 'overflow' here
      ),
      state("expanded", style({ height: "*", opacity: 1 })),
      transition("collapsed <=> expanded", [animate("300ms ease-in-out")]),
    ]),
  ],
})
export class NavbarComponent
  extends AuthenticatedBaseComponent
  implements OnInit
{
  UnreadNotifications = 0; // Add counter for notifications
  IsProfilePopupVisible = false;
  ShowRoles = false;

  @Output() OnSave: EventEmitter<BigInteger> = new EventEmitter<BigInteger>();

  @ViewChild("userProfilePopupComponent")
  userProfilePopupComponent!: UserProfilePopupComponent;

  ngOnInit(): void {
    this.titleService.getTitleObservable().subscribe((title) => {
      this.PageTitle = title;
    });

    // Simulate some notifications (replace with actual notification service)
    this.UnreadNotifications = 3;

    this.ViewModel.Name = this.LoggedInUser.User.FirstName;
    this.ViewModel.Surname = this.LoggedInUser.User.Surname;
    this.ViewModel.Email = this.LoggedInUser.User.Email;
    this.ViewModel.PhoneNumber = this.LoggedInUser.User.PhoneNumber;
  }

  public open_notifications(): void {
    // Handle opening notifications
    console.log("Opening notifications");
  }

  // public async user_profile(): Promise<void> {
  //   this.userProfilePopupComponent.showDialog();
  // }

  public toggle_profile_popup(event: Event) {
    event.stopPropagation();
    this.IsProfilePopupVisible = !this.IsProfilePopupVisible;
  }

  public async log_out() {
    const response = await this.post_sync_call("/Portal/Logout");

    if (!response.IsError) {
      AuthenticationHelper.clear_user_localstorage(this.platformId);
      this.router.navigate(["auth/login"]);
    }
  }

  public async select_role(event: Event, role: RoleCodeModel) {
    event.stopPropagation();
    this.ViewModel.RoleCode = role?.Code;
    await this.save();
  }

  public get_initial(role: string | undefined): string {
    return role ? role.charAt(0).toUpperCase() : "?";
  }

  public toggle_roles(event: Event) {
    event.stopPropagation(); // Prevents closing the popup
    this.ShowRoles = !this.ShowRoles;
  }

  public async save() {
    const response = await this.post_sync_call(
      "/Auth/UserRoleChange",
      this.ViewModel,
    );

    if (!response.IsError) {
      this.OnSave.emit(response.Data);
      await this.store_menu();
      await this.refresh_user();
    }
  }

  public async refresh_user() {
    const response = await this.get_async_call_no_params("/Portal/UserDetails");

    if (!response.IsError) {
      const refresh_result: LoginResultModel = {
        ResponseMessage: response.ResponseMessage,
        SessionToken: response.Data.SessionToken,
        RoleCodes: response.Data.RoleCodes,
        User: response.Data.UserDetails,
        Success: true,
      };

      AuthenticationHelper.set_user_localstorage(
        refresh_result,
        this.platformId,
      );

      this.router.navigate(["/system/home"]).then(() => {
        window.location.reload();
      });
    }
  }

  get NonDefaultRoles() {
    return this.LoggedInUser?.RoleCodes?.filter(
      (role: RoleCodeModel) => !role.IsDefault,
    );
  }
}
