import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from "@angular/common/http";
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from "@angular/core";
import {
  provideClientHydration,
  withEventReplay,
} from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";
import { provideToastr } from "ngx-toastr";
import { routes } from "./app.routes";
import { AuthGuard } from "./components/guards/auth-guard.service";
import { ApiInterceptor } from "./components/services/authorisation/api.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(NgxDaterangepickerMd.forRoot()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideToastr({
      timeOut: 5000, // Customize your toastr settings
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
    }),
    // Provide JWT_OPTIONS
    { provide: JWT_OPTIONS, useValue: {} },
    // Provide JwtHelperService
    JwtHelperService, // This sets up the JwtHelperService globally
    // Register the ApiInterceptor as an HTTP interceptor
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
  ],
};
