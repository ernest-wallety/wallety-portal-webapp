import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthenticatedBaseComponent } from '../../../components/base/authenticated_base.component';
import { AuthenticationHelper } from '../../../components/helpers/authentication_helper';
import { MenuHelper } from '../../../components/helpers/menu_helper';
import { LoginResultModel } from '../../../components/models/login_result';
import { MenuModel } from '../../../components/models/menu_model';
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

export class LoginComponent extends AuthenticatedBaseComponent implements OnInit {
   ngOnInit(): void {
      this.ViewModel = { Email: '', Password: '' };
   }
   public show_password = false;
   public year: number = Utils.get_current_year();

   public login = async () => {

      const response = await this.post_sync_call('/Portal/Login', this.ViewModel);

      if (!response.IsError) {

         const login_result: LoginResultModel = {
            ResponseMessage: response.Data.ResponseMessage,
            SessionToken: response.Data.SessionToken,
            RoleCodes: response.Data.RoleCodes,
            Email: this.ViewModel.Email,
            Success: true
         }

         AuthenticationHelper.set_user_localstorage(login_result);

         await this.menu();

         if (this.is_admin) {
            this.router.navigate(['/system/admin/customer-verification']);
         } else if (this.is_service_agent) {
            this.router.navigate(['/system/admin/customer-verification']);
         } else {
            this.router.navigate(['/system/merchants']);
         }

      } else {
         response.ErrorList.forEach(error => {
            this.toastr.error(error);
         });
      }
   }

   private menu = async () => {
      const response = await this.get_async_call_no_params('/Portal/MenuStructure');

      if (!response.IsError) {
         const menu_result: MenuModel = response.Data.MenuAccess
         MenuHelper.set_menu_localstorage(menu_result);
      }
   }
}
