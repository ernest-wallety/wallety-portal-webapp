import { CommonModule } from "@angular/common";
import { Component, EventEmitter, HostListener, Output, TemplateRef, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModalOptions, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticatedBaseComponent } from "../../../../base/authenticated_base.component";
import { AuthenticationHelper } from "../../../../helpers/authentication_helper";
import { ExtensionMethods } from "../../../../helpers/extension_methods";
import { AvatarComponent } from "../../avatar/avatar.component";

@Component({
   selector: 'app-user-profile-popup',
   templateUrl: './user-profile-popup.component.html',
   styleUrls: ['./user-profile-popup.component.scss'],
   standalone: true,
   imports: [
      CommonModule,
      FormsModule,
      RouterModule,
      AvatarComponent
   ],
})

export class UserProfilePopupComponent extends AuthenticatedBaseComponent {
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
      const identityImage = AuthenticationHelper.get_user_detail().User?.IdentityImage || '';
      this.ImageUrl = ExtensionMethods.to_base_64_image(identityImage);

      this.ViewModel.Name = AuthenticationHelper.get_user_detail().User?.Name
      this.ViewModel.Surname = AuthenticationHelper.get_user_detail().User?.Surname
      this.ViewModel.Email = AuthenticationHelper.get_user_detail().User?.Email
      this.ViewModel.PhoneNumber = AuthenticationHelper.get_user_detail().User?.PhoneNumber
   }

   async save() {

      console.log(this.ViewModel);

      // const response = await this.post_sync_call('/CustomerServiceAgent/Register', this.ViewModel);

      // console.log(response);

      // if (!response.IsError) {
      //    this.OnSave.emit(response.Data);
      //    this.modalDialog.close();
      // }
   }

}  