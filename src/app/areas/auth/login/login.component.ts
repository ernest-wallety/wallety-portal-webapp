import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BaseComponent } from '../../../components/base/base.component';
import { AuthenticationHelper } from '../../../components/helpers/authentication_helper';
import { MenuHelper } from '../../../components/helpers/menu_helper';
import { LoginResultModel } from '../../../components/models/login_result';
import { MenuListModel } from '../../../components/models/menu_model';
import { UserDetailsModel } from '../../../components/models/user_detail_model';
import { Utils } from '../../../components/utils';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss'],
   standalone: true,
   imports: [
      FormsModule,
      RouterModule,
   ]
})

export class LoginComponent extends BaseComponent implements OnInit {
   UserDetails?: UserDetailsModel;

   public show_password = false;
   public year: number = Utils.get_current_year();

   ngOnInit(): void {
      this.ViewModel = { Email: '', Password: '' };
   }

   public login = async (): Promise<void> => {

      const response = await this.post_sync_call('/Portal/Login', this.ViewModel);

      if (!response.IsError) {
         const login_result: LoginResultModel = {
            ResponseMessage: response.Data.ResponseMessage,
            SessionToken: response.Data.SessionToken,
            RoleCodes: response.Data.RoleCodes,
            User: undefined,
            Success: true
         }

         AuthenticationHelper.set_user_localstorage(login_result);

         await this.menu();
      }

      this.cd.detectChanges();
   }

   private menu = async (): Promise<void> => {
      const response = await this.get_async_call_no_params('/Portal/MenuStructure');

      if (!response.IsError) {
         const menu_result: MenuListModel = response.Data

         MenuHelper.set_menu_localstorage(menu_result);

         await this.user_details();

         if (AuthenticationHelper.get_user_detail().User == undefined) {

            const login_result: LoginResultModel = {
               ResponseMessage: AuthenticationHelper.get_user_detail().ResponseMessage,
               SessionToken: AuthenticationHelper.get_user_detail().SessionToken,
               RoleCodes: AuthenticationHelper.get_user_detail().RoleCodes,
               User: this.UserDetails,
               Success: true
            }

            AuthenticationHelper.set_user_localstorage(login_result);

         }

         this.router.navigate(['/system/dashboard']);
      }

      this.cd.detectChanges();
   }

   togglePassword() {
      this.show_password = !this.show_password;
   }

   private user_details = async (): Promise<void> => {
      const response = await this.get_async_call_no_params('/Portal/UserDetails');

      if (!response.IsError) {
         this.UserDetails = response.Data
      }

      this.cd.detectChanges();
   }
}