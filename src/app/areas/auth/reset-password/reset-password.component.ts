import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BaseComponent } from '../../../components/base/base.component';
import { Utils } from '../../../components/utils';

@Component({
   selector: 'app-reset-password',
   templateUrl: './reset-password.component.html',
   styleUrls: ['./reset-password.component.scss'],
   standalone: true,
   imports: [FormsModule, CommonModule, RouterModule]
})
export class ResetPasswordComponent extends BaseComponent implements OnInit {
   public step = 1;
   public invalid_email = false;
   public response?: object;
   public email_sent = false;
   public year: number = Utils.get_current_year();

   ngOnInit(): void {
      this.ViewModel = { Email: '' };
   }

   public search = async (form: NgForm) => {
      const email = form.value.email_address.trim();

      const response = await this.get_async_call('/Auth/GetUserByEmail', new HttpParams().set('email', email));

      if (!response.IsError && response.Data.IsSuccess) {
         this.response = response.Data;
         this.invalid_email = false;
         this.step = 2;
      } else {
         this.invalid_email = true;
      }

      this.cd.detectChanges();
   };

   public reset = async (form: NgForm) => {
      const email = form.value.email_address;

      const response = await this.post_sync_call_non_object('/Auth/ResetPassword', `"${email}"`);

      if (!response.IsError) {
         this.email_sent = true;
         this.router.navigate(['/auth/login']);
      } else {
         this.email_sent = false;
      }

      this.cd.detectChanges();
   };
}
