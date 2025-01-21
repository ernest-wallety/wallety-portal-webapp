import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { ApiInterceptor } from './components/ authorisation/ api.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideToastr({
      timeOut: 3000, // Customize your toastr settings
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    // Provide JWT_OPTIONS
    { provide: JWT_OPTIONS, useValue: {} },
    // Provide JwtHelperService
    JwtHelperService, // This sets up the JwtHelperService globally
    // Register the ApiInterceptor as an HTTP interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    provideHttpClient(withFetch(), withInterceptorsFromDi())
  ]
};


