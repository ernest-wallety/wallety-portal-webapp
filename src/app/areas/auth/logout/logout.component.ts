import { Component, OnInit } from '@angular/core';
import { AuthenticatedBaseComponent } from '../../../components/base/authenticated_base.component';
import { AuthenticationHelper } from '../../../components/helpers/authentication_helper';


@Component({
   selector: 'app-logout',
   template: '<div></div>',
})

export class LogoutComponent extends AuthenticatedBaseComponent implements OnInit {

   ngOnInit(): void {
      this.log_out();
   }

   public async log_out() {
      const response = await this.post_sync_call('/Portal/Logout');

      console.log(response);

      if (!response.IsError) {
         AuthenticationHelper.clear_user_localstorage();

         this.router.navigate(['auth/login']);
      }
   }
}
