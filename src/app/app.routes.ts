import { Routes } from '@angular/router';

export const routes: Routes = [
   {
      path: '',
      redirectTo: 'auth/login',
      pathMatch: 'full'
   },
   {
      path: 'auth',
      loadChildren: () => import(`./areas/auth/auth.routes`)
         .then(routes => routes.routes)
   },
];
