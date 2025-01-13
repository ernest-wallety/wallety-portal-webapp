import { Routes } from '@angular/router';

import { AuthComponent } from './auth.component';

export const routes: Routes = [
   {
      path: '', component: AuthComponent, children: [
         {
            path: '',
            loadComponent: () => import(`./login/login.component`)
               .then(mod => mod.LoginComponent)
         },
         {
            path: 'login',
            loadComponent: () => import(`./login/login.component`)
               .then(mod => mod.LoginComponent)
         },
         // {
         //    path: 'skill',
         //    loadComponent: () => import(`./skill/skill.component`)
         //       .then(mod => mod.SkillComponent)
         // },

         // {
         //    path: '**',
         //    loadComponent: () => import(`./experience/experience.component`)
         //       .then(mod => mod.ExperienceComponent)
         // },
      ]
   },
];