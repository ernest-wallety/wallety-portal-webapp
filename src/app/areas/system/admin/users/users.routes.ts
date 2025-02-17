import { Routes } from '@angular/router';

import { UserComponent } from './users.component';

export const routes: Routes = [
   {
      path: '', component: UserComponent, children: [
         {
            path: '',
            loadComponent: () => import(`./user-parent/user-parent.component`)
               .then(mod => mod.UserParentComponent),
            data: { animation: 'UserParentPage' }
         },
         // {
         //    path: ':page',
         //    loadComponent: () => import(`./user-parent/user-parent.component`)
         //       .then(mod => mod.UserParentComponent),
         //    canActivate: [AuthGuard],
         // }
      ]
   },
];