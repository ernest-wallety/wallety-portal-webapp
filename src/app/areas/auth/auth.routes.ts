import { Routes } from '@angular/router';

import { AuthComponent } from './auth.component';

export const routes: Routes = [
   {
      path: '', component: AuthComponent, children: [
         {
            path: '',
            loadComponent: () => import(`./login/login.component`)
               .then(mod => mod.LoginComponent),
            data: { animation: 'LoginPage' }
         },
         {
            path: 'login',
            loadComponent: () => import(`./login/login.component`)
               .then(mod => mod.LoginComponent),
            data: { animation: 'LoginPage' }
         },
         {
            path: 'forgot-password',
            loadComponent: () => import(`./forgot-password/forgot-password.component`)
               .then(mod => mod.ForgotPasswordComponent),
            data: { animation: 'ForgotPasswordPage' }
         },

         // {
         //    path: '**',
         //    loadComponent: () => import(`./experience/experience.component`)
         //       .then(mod => mod.ExperienceComponent)
         // },
      ]
   },
];