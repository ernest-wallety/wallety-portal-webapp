import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
      RouterModule
   ]
})
export class LoginComponent extends AuthenticatedBaseComponent {
   show_password: boolean = false;

   public login = (form: NgForm) => {
      // var response = await this.post_sync_call('Auth/Login', this.ViewModel);

      // var login_result: LoginResultModel = response.data;

      // if (login_result.success) {
      //    AuthenticationHelper.set_user_localstorage(login_result);

      //    this.router.navigate(['/system/home']);
      // } else {
      //    window.alert(this.ViewModel.loginMessage); //TODO: Replace this with toastr or something even fancier ;)
      // }
   }
}
