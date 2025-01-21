import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './admin.routes';

export const authConfig: ApplicationConfig = {
   providers: [provideRouter(routes)]
};
