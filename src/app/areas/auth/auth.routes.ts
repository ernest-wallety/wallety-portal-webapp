import { Routes } from "@angular/router";

import { AuthComponent } from "./auth.component";

export const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      {
        path: "",
        loadComponent: () =>
          import(`./login/login.component`).then((mod) => mod.LoginComponent),
        data: { animation: "LoginPage" },
      },
      {
        path: "login",
        loadComponent: () =>
          import(`./login/login.component`).then((mod) => mod.LoginComponent),
        data: { animation: "LoginPage" },
      },
      {
        path: "forgot-password",
        loadComponent: () =>
          import(`./reset-password/reset-password.component`).then(
            (mod) => mod.ResetPasswordComponent,
          ),
        data: { animation: "ForgotPasswordPage" },
      },
    ],
  },
];
