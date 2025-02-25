import { Routes } from "@angular/router";

import { AuthGuard } from "../../components/guards/auth-guard.service";
import { SystemComponent } from "./system.component";

export const routes: Routes = [
  {
    path: "",
    component: SystemComponent,
    children: [
      {
        path: "",
        loadComponent: () =>
          import(`./home/home.component`).then((mod) => mod.HomeComponent),
        data: { animation: "HomePage" },
      },
      {
        path: "home",
        loadComponent: () =>
          import(`./home/home.component`).then((mod) => mod.HomeComponent),
        data: { animation: "HomePage" },
        canActivate: [AuthGuard],
      },
      {
        path: "merchants",
        loadComponent: () =>
          import(`./merchants/merchants.component`).then(
            (mod) => mod.MerchantsComponent,
          ),
        data: { animation: "MerchantsPage" },
        canActivate: [AuthGuard],
      },
      {
        path: "customer-verification",
        loadComponent: () =>
          import(
            `./customer-verification/customer-verification-list.component`
          ).then((mod) => mod.CustomerVerificationListComponent),
        data: { animation: "VerificationPage" },
        canActivate: [AuthGuard],
      },
      {
        path: "transaction-history",
        loadComponent: () =>
          import(`./transaction-history/transaction-history.component`).then(
            (mod) => mod.TransactionHistoryComponent,
          ),
        data: { animation: "TransactionHistoryPage" },
        canActivate: [AuthGuard],
      },
      {
        path: "admin",
        loadChildren: () =>
          import(`./admin/admin.routes`).then((routes) => routes.routes),
      },
    ],
  },
];
