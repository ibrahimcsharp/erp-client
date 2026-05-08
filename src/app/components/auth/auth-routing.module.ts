import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UnauthorizedComponent } from "./errors/unauthorized/unauthorized.component";
import { LogOutComponent } from "./log-out/log-out.component";
import { LoginComponent } from "./login/login.component";
import { SigninFromSaraComponent } from "./signin-from-sara/signin-from-sara.component";
import { SingleLoginComponent } from "./single-login/single-login.component";
import { SingleLoginEternallyComponent } from "./single-login-eternally/single-login-eternally.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "auth/login-out",
    component: LogOutComponent,
  },
  {
    path: "unauthorized-401",
    component: UnauthorizedComponent,
  },
  {
    path: "single-login",
    children: [
      {
        path: "another-app/:token",
        component: SingleLoginComponent,
      },
    ],
    data: {
      breadcrumb: "single-login",
    },
  },

  {
    path: "single-login-eternally",
    children: [
      {
        path: "eternal-app/:token",
        component: SingleLoginEternallyComponent,
      },
    ],
    data: {
      breadcrumb: "single-login-eternally",
    },
  },
  {
    path: "signin-from-sara",
    children: [
      {
        path: "another-app/:employeeId",
        component: SigninFromSaraComponent,
      },
      {
        path: "sara-sso/:sessionId",
        component: SigninFromSaraComponent,
      },
    ],
    data: {
      breadcrumb: "signin-from-sara",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
