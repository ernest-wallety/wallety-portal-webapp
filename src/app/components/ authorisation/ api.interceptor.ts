import {
   HttpEvent,
   HttpHandler,
   HttpInterceptor,
   HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationHelper } from '../helpers/authentication_helper';

//Extend from the HttpInterceptor and add the AuthToken and whatever else we need to the headers.
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
   intercept(
      request: HttpRequest<any>,
      next: HttpHandler,
   ): Observable<HttpEvent<any>> {
      const logged_in_user = AuthenticationHelper.get_user_detail();

      //Intercept and shove the Auth in with our user details from above.
      if (logged_in_user) {
         request = request.clone({
            setHeaders: {
               Authorization: `bearer ${logged_in_user.SessionToken}`,
            },
         });
      }

      return next.handle(request);
   }
}
