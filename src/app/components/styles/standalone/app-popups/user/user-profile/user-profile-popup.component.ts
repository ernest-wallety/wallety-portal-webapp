import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  HostListener,
  Output,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModalOptions, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticatedBaseComponent } from "../../../../../base/authenticated_base.component";
import { AvatarComponent } from "../../../avatar/avatar.component";
import { SelectSingleLookupComponent } from "../../../select-single-lookup/select-single-lookup.component";

@Component({
  selector: "app-user-profile-popup",
  templateUrl: "./user-profile-popup.component.html",
  styleUrls: ["./user-profile-popup.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AvatarComponent,
    SelectSingleLookupComponent,
  ],
})
export class UserProfilePopupComponent extends AuthenticatedBaseComponent {
  @ViewChild("userProfileTemplate") userProfileTemplate!: TemplateRef<any>;

  public modalDialog!: NgbModalRef;

  @Output() OnSave: EventEmitter<BigInteger> = new EventEmitter<BigInteger>();
  @Output() OnCancel: EventEmitter<any> = new EventEmitter<any>();

  @HostListener("document:keydown.escape", ["$event"]) onKeydownHandler(
    event: KeyboardEvent,
  ) {
    console.log(event);

    if (this.modalDialog != null) {
      this.modalDialog.close();
    }
  }

  showDialog() {
    const option: NgbModalOptions = {
      windowClass: "modal-standard-height",
      size: "lg",
      centered: true,
      animation: true,
    };
    this.modalDialog = this.ngbModalService.open(
      this.userProfileTemplate,
      option,
    );

    this.refresh();
  }

  refresh(): void {
    this.ViewModel.Name = this.LoggedInUser.user.firstName;
    this.ViewModel.Surname = this.LoggedInUser.user.surname;
    this.ViewModel.Email = this.LoggedInUser.user.email;
    this.ViewModel.PhoneNumber = this.LoggedInUser.user.phoneNumber;
    this.ViewModel.Role = this.Role?.roleName;
    this.ViewModel.Code = this.Role?.roleCode;
  }

  async save() {
    const response = await this.post_sync_call(
      "/Auth/UserRoleChange",
      this.ViewModel,
    );

    if (!response.isError) {
      this.OnSave.emit(response.data);
      this.modalDialog.close();
    }
  }

  public updateRoles(event: any, field: string) {
    console.log(event, field);

    if (event != null) {
      this.ViewModel.RoleCode = event.Id;
    }
  }
}
