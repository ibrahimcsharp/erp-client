import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { UserDataPermission } from "../../Model/user-data-permission";
import { RoleService } from "../../Services/role.service";

@Component({
  selector: "app-user-data-permission-list",
  templateUrl: "./user-data-permission-list.component.html",
  styleUrls: ["./user-data-permission-list.component.scss"],
})
export class UserDataPermissionListComponent implements OnInit {
  UserDataPermissionList: UserDataPermission[] = [];

  constructor(
    private roleService: RoleService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.GetUserPermissionData();
  }

  GetUserPermissionData() {
    this.roleService.GetUserDataPermissionList().subscribe(
      (res: UserDataPermission[]) => {
        this.UserDataPermissionList = res;
      },
      (error) => {
        this.toastr.warning("Can't fetch User Permisson Data");
      }
    );
  }
}
