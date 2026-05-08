import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { MerchandisingModule } from "../merchandising/merchandising.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { DepartmentCreateComponent } from "./department/department-create/department-create.component";
import { DepartmentListComponent } from "./department/department-list/department-list.component";
import { MenuActionCreateComponent } from "./menu/menu-action-create/menu-action-create.component";
import { MenuActionListComponent } from "./menu/menu-action-list/menu-action-list.component";
import { MenuCreateComponent } from "./menu/menu-create/menu-create.component";
import { MenuListComponent } from "./menu/menu-list/menu-list.component";
import { BranchUsersPermissionComponent } from "./permission/branch-users-permission/branch-users-permission.component";
import { BuyersUsersPermissionComponent } from "./permission/buyers-users-permission/buyers-users-permission.component";
import { ChangePasswordComponent } from "./permission/change-password/change-password.component";
import { LocationUserPerimissionComponent } from "./permission/location-user-perimission/location-user-perimission.component";
import { UserDataPermissionListComponent } from "./permission/user-data-permission-list/user-data-permission-list.component";
import { UserDataPermissionComponent } from "./permission/user-data-permission/user-data-permission.component";
import { UserMenuPermissionComponent } from "./permission/user-menu-permission/user-menu-permission.component";
import { UsersInfoComponent } from "./permission/users-info/users-info.component";
import { RoleCreateComponent } from "./role/role-create/role-create.component";
import { RoleListComponent } from "./role/role-list/role-list.component";
import { AllMenuListComponent } from "./Set Menu/all-menu-list/all-menu-list.component";
import { CreateMainMenuComponent } from "./Set Menu/create-main-menu/create-main-menu.component";
import { CreateMenuSubSubComponent } from "./Set Menu/create-menu-sub-sub/create-menu-sub-sub.component";
import { CreateMenuSubComponent } from "./Set Menu/create-menu-sub/create-menu-sub.component";
import { SuperAdminUsersInfoComponent } from "./permission/super-admin-users-info/super-admin-users-info.component";
import { AdminUserMenuPermissionComponent } from "./permission/admin-user-menu-permission/admin-user-menu-permission.component";
import { BuyerWiseUiListPermissionComponent } from './permission/buyer-wise-ui-list-permission/buyer-wise-ui-list-permission.component';
import { ErrorLogComponent } from "./error-log/error-log.component";

@NgModule({
  declarations: [
    RoleCreateComponent,
    RoleListComponent,
    DepartmentCreateComponent,
    DepartmentListComponent,
    CreateMainMenuComponent,
    CreateMenuSubComponent,
    CreateMenuSubSubComponent,
    AllMenuListComponent,
    MenuCreateComponent,
    MenuListComponent,
    MenuActionListComponent,
    MenuActionCreateComponent,
    UserDataPermissionListComponent,
    UserDataPermissionComponent,
    UserMenuPermissionComponent,
    AdminUserMenuPermissionComponent,
    UsersInfoComponent,
    SuperAdminUsersInfoComponent,
    BuyersUsersPermissionComponent,
    ErrorLogComponent,
    ChangePasswordComponent,
    BranchUsersPermissionComponent,
    LocationUserPerimissionComponent,
    BuyerWiseUiListPermissionComponent,
  ],
  entryComponents: [LocationUserPerimissionComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MerchandisingModule,

    //PaginatorModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {}
