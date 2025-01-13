import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticatedBaseComponent } from '../../../components/base/authenticated_base.component';
// import { LoginResultModel } from '../../../components/models/login_result';
// import { AuthenticationHelper } from '../../../components/helpers/authentication_helper';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss'],
   standalone: true,
   imports: [
      FormsModule,

   ]
})
export class LoginComponent extends AuthenticatedBaseComponent {
   showPassword: boolean = false;

   public async try_login() {
      // var response = await this.post_sync_call('Auth/Login', this.ViewModel);

      // var login_result: LoginResultModel = response.data;

      // if (login_result.success) {
      //    AuthenticationHelper.set_user_localstorage(login_result);

      //    this.router.navigate(['/system/home']);
      // } else {
      //    window.alert(this.ViewModel.loginMessage); //TODO: Replace this with toastr or something even fancier ;)
      // }
   }

   public getCurrentYear(): number {
      return new Date().getFullYear();
   }
}
