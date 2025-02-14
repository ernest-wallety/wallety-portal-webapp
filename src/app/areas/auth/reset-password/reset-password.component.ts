import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthenticatedBaseComponent } from '../../../components/base/authenticated_base.component';
import { Utils } from '../../../components/utils';

@Component({
   selector: 'app-reset-password',
   templateUrl: './reset-password.component.html',
   styleUrls: ['./reset-password.component.scss'],
   standalone: true,
   imports: [FormsModule, CommonModule, RouterModule]
})
export class ResetPasswordComponent extends AuthenticatedBaseComponent implements OnInit {
   public step = 1;
   public invalid_email = false;
   public response?: object;
   public email_sent = false;
   public year: number = Utils.get_current_year();

   ngOnInit(): void {
      this.ViewModel = { Email: '' };
   }

   public search = async (form: NgForm) => {
      this.IsLoading = true;
      const email = form.value.email_address.trim();

      try {
         const response = await this.get_async_call('/Auth/GetUserByEmail', new HttpParams().set('email', email));

         if (!response.IsError && response.Data.IsSuccess) {
            this.response = response.Data;
            this.invalid_email = false;
            this.step = 2; // Move to the reset password step
         } else {
            this.invalid_email = true;
         }
      } catch (error) {
         console.error("Error fetching user:", error);
      } finally {
         this.IsLoading = false;
         this.cd.detectChanges(); // Ensure UI updates
      }
   };

   public reset = async (form: NgForm) => {
      this.IsLoading = true;
      const email = form.value.email_address;

      try {
         const response = await this.post_sync_call_non_object('/Auth/ResetPassword', email);

         if (!response.IsError) {
            this.email_sent = true;
            this.router.navigate(['/login']);
         } else {
            this.email_sent = false;
         }
      } catch (error) {
         console.error("Error resetting password:", error);
      } finally {
         this.IsLoading = false;
         this.cd.detectChanges();
      }
   };
}
