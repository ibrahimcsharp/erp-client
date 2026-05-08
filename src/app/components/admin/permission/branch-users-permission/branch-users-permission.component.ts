import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { RoleService } from "../../Services/role.service";

@Component({
  selector: "app-branch-users-permission",
  templateUrl: "./branch-users-permission.component.html",
  styleUrls: ["./branch-users-permission.component.css"],
})
export class BranchUsersPermissionComponent implements OnInit {
  userId = 0;
  constructor(
    private roleService: RoleService,
    private toastr: ToastrService
  ) {}
  branchUsers: any[] = [];
  id = 0;

  ngOnInit() {}

  GetBranchUsers(id: number) {
    this.roleService.GetBranchUsersByUserId(id).subscribe(
      (res: any[]) => {
        this.branchUsers = res;
      },
      (error) => {}
    );
  }

  SaveChanges() {
    this.roleService.PostBranchUsers(this.userId, this.branchUsers).subscribe(
      (res) => {
        this.toastr.success("Saved Successfully", "Branch Users Info");
      },
      (error) => {
        console.log(error);
        this.toastr.error("Failed to save", "Branch Users Info");
      }
    );
  }
  CheckAll(event) {
    if (event.target.checked) {
      for (var i = 0; i < this.branchUsers.length; i++) {
        this.branchUsers[i].isSelected = true;
      }
      //alert("true");
    } else {
      for (var i = 0; i < this.branchUsers.length; i++) {
        this.branchUsers[i].isSelected = false;
      }
    }
    //console.log(event);
  }
}
