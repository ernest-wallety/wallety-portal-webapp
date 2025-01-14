import { Routes } from '@angular/router';

import { SystemComponent } from './system.component';

export const routes: Routes = [
   {
      path: '', component: SystemComponent, children: [
         {
            path: '',
            loadComponent: () => import(`./home/home.component`)
               .then(mod => mod.HomeComponent),
            data: { animation: 'HomePage' }
         },
         {
            path: 'home',
            loadComponent: () => import(`./home/home.component`)
               .then(mod => mod.HomeComponent),
            data: { animation: 'HomePage' }
         }
      ]
   },
];