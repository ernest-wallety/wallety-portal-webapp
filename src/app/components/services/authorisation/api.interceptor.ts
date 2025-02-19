import {
   HttpEvent,
   HttpHandler,
   HttpInterceptor,
   HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationHelper } from '../../helpers/authentication_helper';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
   constructor(@Inject(PLATFORM_ID) private platformId: object) { }

   intercept(
      request: HttpRequest<any>,
      next: HttpHandler,
   ): Observable<HttpEvent<any>> {
      const logged_in_user = AuthenticationHelper.get_user_detail(this.platformId);

      // Intercept and add the AuthToken to the request headers if the user is logged in
      if (logged_in_user && logged_in_user.SessionToken) {
         request = request.clone({
            setHeaders: {
               Authorization: `bearer ${logged_in_user.SessionToken}`,
            },
         });
      }

      return next.handle(request);
   }
}
