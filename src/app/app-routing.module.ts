import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./shared/guards/auth.guard";
import { ContentLayoutComponent } from "./shared/layout/content-layout/content-layout.component";
const routes: Routes = [
  {
    path: "",
    redirectTo: "auth/login",
    pathMatch: "full",
  },
  {
    path: "",
    component: ContentLayoutComponent,
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./components/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      // {
      //   path: "accounting",
      //   loadChildren: () =>
      //     import("./components/accounting/accounting.module").then(
      //       (m) => m.AccountingModule
      //     ),
      // },
      {
        path: "merchandising",
        loadChildren: () =>
          import("./components/merchandising/merchandising.module").then(
            (m) => m.MerchandisingModule
          ),
      },
      {
        path: "admin",
        loadChildren: () =>
          import("./components/admin/admin.module").then((m) => m.AdminModule),
      },

      {
        path: "e-vote",
        loadChildren: () =>
          import("./components/e-vote/e-vote.module").then(
            (m) => m.EVoteModule
          ),
      },
      
      {
        path: "conference-room",
        loadChildren: () =>
          import("./components/conferrence-room/conferrence.module").then(
            (m) => m.ConferrenceModule
          ),
      },
      {
        path: "visitor-manage",
        loadChildren: () =>
          import("./components/vms/visitor-manage.module").then(
            (m) => m.VisitorManageModule
          ),
      },

      {
        path: "tms",
        loadChildren: () =>
          import("./components/tms/tms.module").then((m) => m.TmsModule),
      },
      {
        path: "time-and-action",
        loadChildren: () =>
          import("./components/time-and-action/time-and-action.module").then(
            (m) => m.TimeAndActionModule
          ),
      },

      {
        path: "task-ms",
        loadChildren: () =>
          import("./components/task-management/task-management.module").then((m) => m.TaskManagementModule),
      },
      
      {
        path: "mms",
        loadChildren: () =>
          import("./components/mms/mms.module").then((m) => m.MmsModule),
      },
      
      {
        path: "settings",
        loadChildren: () =>
          import("./components/setting/setting.module").then(
            (m) => m.SettingModule
          ),
      },
      {
        path: "idm",
        loadChildren: () =>
          import("./components/idm/idm.module").then((m) => m.IdmModule),
      },
    ],
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./components/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "**",
    redirectTo: "auth/login",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      initialNavigation: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
