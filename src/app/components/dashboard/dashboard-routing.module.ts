import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewsfeedComponent } from "./component/newsfeed/newsfeed.component";
import { DashboardComponent } from "./dashboard.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "default",
        component: DashboardComponent,
        data: {
          breadcrumb: "Dashboard",
        },
      },
      {
        path: "newsfeed",
        component: NewsfeedComponent,
        data: {
          breadcrumb: "newsfeed",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
