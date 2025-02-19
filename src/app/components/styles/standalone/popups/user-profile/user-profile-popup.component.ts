import { CommonModule } from "@angular/common";
import { Component, EventEmitter, HostListener, Output, TemplateRef, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModalOptions, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticatedBaseComponent } from "../../../../base/authenticated_base.component";
import { ExtensionMethods } from "../../../../helpers/extension_methods";
import { Utils } from "../../../../utils";
import { AvatarComponent } from "../../avatar/avatar.component";
import { SelectSingleLookupComponent } from "../../select-single-lookup/select-single-lookup.component";

@Component({
   selector: 'app-user-profile-popup',
   templateUrl: './user-profile-popup.component.html',
   styleUrls: ['./user-profile-popup.component.scss'],
   standalone: true,
   imports: [
      CommonModule,
      FormsModule,
      RouterModule,
      AvatarComponent,
      SelectSingleLookupComponent
   ],
})

export class UserProfilePopupComponent extends AuthenticatedBaseComponent {
   public ImageUrl = '';
   public UserRoles = Utils.lookup_converter(this.LoggedInUser.RoleCodes!, 'Code', 'Role')

   @ViewChild('userProfileTemplate') userProfileTemplate!: TemplateRef<any>;

   public modalDialog!: NgbModalRef;

   @Output() OnSave: EventEmitter<BigInteger> = new EventEmitter<BigInteger>();
   @Output() OnCancel: EventEmitter<any> = new EventEmitter<any>();

   @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
      console.log(event)

      if (this.modalDialog != null) {
         this.modalDialog.close();
      }
   }

   showDialog() {
      const option: NgbModalOptions = { windowClass: 'modal-standard-height', size: 'lg' };
      this.modalDialog = this.ngbModalService.open(this.userProfileTemplate, option);

      this.refresh();
   }

   refresh(): void {
      this.ImageUrl = ExtensionMethods.to_base_64_image(this.LoggedInUser.User?.IdentityImage || '');
      this.ViewModel.Name = this.LoggedInUser.User.Name
      this.ViewModel.Surname = this.LoggedInUser.User.Surname
      this.ViewModel.Email = this.LoggedInUser.User.Email
      this.ViewModel.PhoneNumber = this.LoggedInUser.User.PhoneNumber
      this.ViewModel.Role = this.LoggedInUser.RoleCodes?.find(role => role.IsDefault === true);
   }

   async save() {

      const response = await this.post_sync_call('/Portal/UserRoleChange', this.ViewModel);

      if (!response.IsError) {
         this.OnSave.emit(response.Data);
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