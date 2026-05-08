import { Component, OnInit, ViewChild } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
//import { ChartOfAccountService } from "src/app/components/accounting/chart-of-account/service/chart-of-account.service";
import { AppUser } from "../../Model/app-user";
import { RoleService } from "../../Services/role.service";
import { BranchUsersPermissionComponent } from "../branch-users-permission/branch-users-permission.component";
import { BuyersUsersPermissionComponent } from "../buyers-users-permission/buyers-users-permission.component";
import { ChangePasswordComponent } from "../change-password/change-password.component";
import { LocationUserPerimissionComponent } from "../location-user-perimission/location-user-perimission.component";
import { UserMenuPermissionComponent } from "../user-menu-permission/user-menu-permission.component";
import { CommonServiceService } from "src/app/components/merchandising/Common-Services/common-service.service";

@Component({
  selector: 'app-super-admin-users-info',
  templateUrl: './super-admin-users-info.component.html',
  styleUrls: ['./super-admin-users-info.component.scss']
})
export class SuperAdminUsersInfoComponent implements OnInit {

  constructor(
    private roleService: RoleService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    public commonService: CommonServiceService,
    //private accountingService: ChartOfAccountService
  ) { }
  appUsers: AppUser[] = [];
  display: boolean;
  display1: boolean;
  display2: boolean;
  display3: boolean;
  @ViewChild("id") child: BuyersUsersPermissionComponent;
  @ViewChild("id1") child1: UserMenuPermissionComponent;
  @ViewChild("id2") child2: ChangePasswordComponent;
  @ViewChild("branchUserId") branchUserId: BranchUsersPermissionComponent;
  bsModalRef: BsModalRef;

  ngOnInit(): void {
    this.GetAppUsers();
  }

  GetAppUsers() {
    this.roleService.GetAppUserList().subscribe(
      (res: AppUser[]) => {
        this.appUsers = res;
      },
      (error) => {
        this.toastr.error("Can not fetch", "App Users Info");
      }
    );
  }

  DisplayBuyersUsers(userId: number) {
    debugger;
    this.display = true;
    this.child.GetBuyersUsers(userId);
    this.child.userId = userId;
  }
  DisplayBranchUsers(userId: number) {
    debugger;
    this.branchUserId.GetBranchUsers(userId);
    this.branchUserId.userId = userId;
    this.display3 = true;
  }
  DisplayUserMenus(userId: number) {
    debugger;
    this.display1 = true;
    this.child1.GetMenuList(userId);
    this.child.userId = userId;
  }
  changePassword(userId: number) {
    this.display2 = true;
    this.child2.customForm.patchValue({
      id: userId,
    });
  }

  DisplayLocations(userId: number) {
    this.commonService.GetLocationsByUserId(userId).subscribe(
      (res: any[]) => {
        this.bsModalRef = this.modalService.show(
          LocationUserPerimissionComponent,
          {
            initialState: {
              title: "Locations List",
              res,
              userId: userId,
            },
            backdrop: true,
            ignoreBackdropClick: true,
            class: "modal-lg",
          }
        );
      },
      (error) => { }
    );
  }

  DataPermission(userId: number) { }
}

