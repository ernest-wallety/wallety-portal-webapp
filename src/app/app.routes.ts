import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "auth/login",
    pathMatch: "full",
  },
  {
    path: "auth",
    loadChildren: () =>
      import(`./areas/auth/auth.routes`).then((routes) => routes.routes),
  },
  {
    path: "system",
    loadChildren: () =>
      import(`./areas/system/system.routes`).then((routes) => routes.routes),
  },
];
