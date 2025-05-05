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
import {
  LoginResultModel,
  RoleCodeModel,
} from "../../../models/login_result_model";
import { UserProfilePopupComponent } from "../app-popups/user/user-profile/user-profile-popup.component";
import { AvatarComponent } from "../avatar/avatar.component";
import { CreditWalletPopupComponent } from "../app-popups/credit-wallet/credit-wallet-popup.component";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AvatarComponent,
    UserProfilePopupComponent,
    CreditWalletPopupComponent,
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

  @ViewChild("creditWalletPopupComponent")
  creditWalletPopupComponent!: CreditWalletPopupComponent;

  ngOnInit(): void {
    this.titleService.getTitleObservable().subscribe((title) => {
      this.PageTitle = title;
    });

    // Simulate some notifications (replace with actual notification service)
    this.UnreadNotifications = 3;

    this.ViewModel.Name = this.LoggedInUser.user.firstName;
    this.ViewModel.Surname = this.LoggedInUser.user.surname;
    this.ViewModel.Email = this.LoggedInUser.user.email;
    this.ViewModel.PhoneNumber = this.LoggedInUser.user.phoneNumber;
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
    // const response = await this.post_sync_call("/Portal/Logout");

    // if (!response.IsError) {
    AuthenticationHelper.clear_user_localstorage(this.platformId);
    this.router.navigate(["auth/login"]);
    // }
  }

  public async select_role(event: Event, role: RoleCodeModel) {
    event.stopPropagation();
    this.ViewModel.RoleCode = role?.roleCode;
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
      "User/UserRoleUpdate",
      this.ViewModel,
    );

    if (!response.isError) {
      this.OnSave.emit(response.data);
      await this.store_menu();
      await this.refresh_user();
    }
  }

  public async refresh_user() {
    const response = await this.get_async_call_no_params("Auth/RefreshUser");

    if (!response.isError) {
      const refresh_result: LoginResultModel = {
        responseMessage: response.responseMessage,
        sessionToken: response.data.sessionToken,
        roleCodes: response.data.roleCodes,
        user: response.data.user,
        success: true,
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

  public credit_wallet() {
    this.creditWalletPopupComponent.showDialog();
  }

  get NonDefaultRoles() {
    return this.LoggedInUser?.roleCodes?.filter(
      (role: RoleCodeModel) => !role.isDefault,
    );
  }
}
