import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthenticatedBaseComponent } from '../../../components/base/authenticated_base.component';
import { AuthenticationHelper } from '../../../components/helpers/authentication_helper';
import { LoginResultModel } from '../../../components/models/login_result';
import { Utils } from '../../../components/utils';
// import { LoginResultModel } from '../../../components/models/login_result';
// import { AuthenticationHelper } from '../../../components/helpers/authentication_helper';

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

export class LoginComponent extends AuthenticatedBaseComponent {
   public show_password: boolean = false;
   public year: number = Utils.get_current_year();

   public login = async (form: NgForm) => {

      var response = await this.post_sync_call('/Portal/Login', this.ViewModel);

      if (!response.IsError) {

         let login_result: LoginResultModel = {
            ResponseMessage: response.Data.ResponseMessage,
            SessionToken: response.Data.SessionToken,
            RoleCodes: response.Data.RoleCodes,
            Email: this.ViewModel.Email,
            Success: true
         }

         AuthenticationHelper.set_user_localstorage(login_result);

         // this.router.navigate(['/system/home']);
      }

      // var login_result: LoginResultModel = response.data;

      // if (login_result.success) {
      //    AuthenticationHelper.set_user_localstorage(login_result);

      //    this.router.navigate(['/system/home']);
      // } else {
      //    window.alert(this.ViewModel.loginMessage); //TODO: Replace this with toastr or something even fancier ;)
      // }
   }
}
