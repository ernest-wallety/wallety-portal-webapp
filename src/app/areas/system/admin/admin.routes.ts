import { Routes } from '@angular/router';

import { AdminComponent } from './admin.component';

export const routes: Routes = [
   {
      path: '', component: AdminComponent, children: [
         {
            path: 'users',
            loadChildren: () =>
               import(`./users/users.routes`).then((routes) => routes.routes),
         },
         {
            path: 'lookups',
            loadComponent: () => import(`./lookups/lookups.component`)
               .then(mod => mod.LookupComponent),
            data: { animation: 'LookupPage' }
         },
         {
            path: 'tickets',
            loadComponent: () => import(`./tickets/tickets.component`)
               .then(mod => mod.TicketComponent),
            data: { animation: 'TicketsPage' }
         }
      ]
   },
];