import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { RoleService } from "../../Services/role.service";

@Component({
  selector: "app-buyers-users-permission",
  templateUrl: "./buyers-users-permission.component.html",
  styleUrls: ["./buyers-users-permission.component.scss"],
})
export class BuyersUsersPermissionComponent implements OnInit {
  userId = 0;
  constructor(
    private roleService: RoleService,
    private toastr: ToastrService
  ) {}
  buyersUsers: any[] = [];
  id = 0;

  ngOnInit() {}

  GetBuyersUsers(id: number) {
    this.roleService.GetBuyersUsersByUserId(id).subscribe(
      (res: any[]) => {
        this.buyersUsers = res;
      },
      (error) => {}
    );
  }

  SaveChanges() {
    this.roleService.PostBuyersUsers(this.userId, this.buyersUsers).subscribe(
      (res) => {
        this.toastr.success("Saved Successfully", "Buyers Users Info");
      },
      (error) => {
        console.log(error);
        this.toastr.error("Failed to save", "Buyers Users Info");
      }
    );
  }
  CheckAll(event) {
    if (event.target.checked) {
      for (var i = 0; i < this.buyersUsers.length; i++) {
        this.buyersUsers[i].isSelected = true;
      }
      //alert("true");
    } else {
      for (var i = 0; i < this.buyersUsers.length; i++) {
        this.buyersUsers[i].isSelected = false;
      }
    }
    //console.log(event);
  }
}
