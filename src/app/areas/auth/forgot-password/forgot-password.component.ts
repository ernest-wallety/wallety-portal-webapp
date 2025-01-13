import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthenticatedBaseComponent } from '../../../components/base/authenticated_base.component';
// import { LoginResultModel } from '../../../components/models/login_result';
// import { AuthenticationHelper } from '../../../components/helpers/authentication_helper';

@Component({
   selector: 'app-forgot-password',
   templateUrl: './forgot-password.component.html',
   styleUrls: ['./forgot-password.component.scss'],
   standalone: true,
   imports: [
      FormsModule,
      CommonModule,
      RouterModule
   ]
})
export class ForgotPasswordComponent extends AuthenticatedBaseComponent {
   invalid_email?: boolean;
   response?: object;
   email_sent?: boolean;

   public search = (form: NgForm) => {
      if (this.response != null && this.invalid_email == false) {
         this.post_forgot_password(form.value)
      } else {
         this.get_user_by_email(form.value.email);
      }
   }

   private get_user_by_email = (email: string) => {

   }

   private post_forgot_password = (model: any) => {

   }
}
