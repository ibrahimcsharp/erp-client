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
import { BuyerWiseUiListPermissionComponent } from "../buyer-wise-ui-list-permission/buyer-wise-ui-list-permission.component";

@Component({
  selector: "app-users-info",
  templateUrl: "./users-info.component.html",
  styleUrls: ["./users-info.component.scss"],
})
export class UsersInfoComponent implements OnInit {
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
  display4: boolean;
  @ViewChild("id") child: BuyersUsersPermissionComponent;
  @ViewChild("id1") child1: UserMenuPermissionComponent;
  @ViewChild("id2") child2: ChangePasswordComponent;
  @ViewChild("branchUserId") branchUserId: BranchUsersPermissionComponent;
  @ViewChild("id3") child3: BuyerWiseUiListPermissionComponent;
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
  DisplayBuyerWiseUiPermission(obj: any){
    debugger
    this.display4 = true;
    this.child3.GetBuyerWiseUIListPermissionByUserId(obj.id, obj.userName);
    this.child3.userId = obj.id;
    this.child3.userName = obj.userName;
  }
  cancel() {
    this.child3.buyersWisePermissionList = [];
    this.child3.filteredList =[];
    this.child3.selectedBuyerList = [];
    this.child3.filteredText = "";
  }
  DisplayBranchUsers(userId: number) {
    debugger;
    this.branchUserId.GetBranchUsers(userId);
    this.branchUserId.userId = userId;
    this.display3 = true;
  }
  DisplayUserMenus(userId: number) {
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
