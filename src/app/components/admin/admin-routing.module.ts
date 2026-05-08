import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DepartmentListComponent } from "./department/department-list/department-list.component";
import { MenuActionListComponent } from "./menu/menu-action-list/menu-action-list.component";
import { MenuListComponent } from "./menu/menu-list/menu-list.component";
import { UserDataPermissionListComponent } from "./permission/user-data-permission-list/user-data-permission-list.component";
import { UsersInfoComponent } from "./permission/users-info/users-info.component";
import { RoleListComponent } from "./role/role-list/role-list.component";
import { SuperAdminUsersInfoComponent } from "./permission/super-admin-users-info/super-admin-users-info.component";
import { BuyerWiseUiListPermissionComponent } from "./permission/buyer-wise-ui-list-permission/buyer-wise-ui-list-permission.component";
import { ErrorLogComponent } from "./error-log/error-log.component";

const routes: Routes = [
  {
    path: "menu-list",
    component: MenuListComponent,
    data: {
      title: "",
      breadcrumb: "menu-list",
    },
  },
  {
    path: "error-log",
    component: ErrorLogComponent,
    data: {
      title: "",
      breadcrumb: "error-log",
    },
  },
  {
    path: "role-list",
    component: RoleListComponent,
    data: {
      title: "",
      breadcrumb: "role-list",
    },
  },
  {
    path: "department-list",
    component: DepartmentListComponent,
    data: {
      title: "",
      breadcrumb: "department-list",
    },
  },
  {
    path: "menu-action-list",
    component: MenuActionListComponent,
    data: {
      title: "",
      breadcrumb: "menu-action-list",
    },
  },
  {
    path: "data-permission-list",
    component: UserDataPermissionListComponent,
    data: {
      title: "",
      breadcrumb: "data-permission",
    },
  },
  {
    path: "users-info",
    component: UsersInfoComponent,
    data: {
      title: "",
      breadcrumb: "users-info",
    },
  },
  {
    path: "buyer-wise-ui-list-permission",
    component: BuyerWiseUiListPermissionComponent,
    data: {
      title: "Buyer Wise UI List Permission",
      breadcrumb: "buyer-wise-ui-list-permission",
    },
  },
  {
    path: "super-admin-users-info",
    component: SuperAdminUsersInfoComponent,
    data: {
      title: "User Information",
      breadcrumb: "super-admin-users-info",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
