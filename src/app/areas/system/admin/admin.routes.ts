import { Routes } from '@angular/router';

import { AuthGuard } from '../../../components/guards/auth-guard.service';
import { AdminComponent } from './admin.component';

export const routes: Routes = [
   {
      path: '', component: AdminComponent, children: [
         {
            path: '',
            loadComponent: () => import(`./admin-parent/admin-parent.component`)
               .then(mod => mod.AdminParentComponent),
            data: { animation: 'AdminParentPage' }
         },
         {
            path: ':page',
            loadComponent: () => import(`./admin-parent/admin-parent.component`)
               .then(mod => mod.AdminParentComponent),
            canActivate: [AuthGuard],
         }
      ]
   },
];