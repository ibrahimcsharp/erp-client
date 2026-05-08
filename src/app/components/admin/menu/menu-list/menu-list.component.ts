import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { MenuItem } from "primeng/api";
import { MenuService } from "../../Services/menu.service";
import { MenuCreateComponent } from "../menu-create/menu-create.component";

@Component({
  selector: "app-menu-list",
  templateUrl: "./menu-list.component.html",
  styleUrls: ["./menu-list.component.scss"],
})
export class MenuListComponent implements OnInit {
  items: MenuItem[];
  @ViewChild("id") child: MenuCreateComponent;
  menuList: any[] = [];
  constructor(
    public menuService: MenuService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.GetMenuList();
  }

  GetMenuList() {
    this.menuService.GetMenuList().subscribe(
      (res: any[]) => {
        if (res) {
          this.menuList = res;
          this.menuService.menuPermissionForCheckList = res;
          console.log(this.menuService.menuPermissionForCheckList);
          
          this.menuService.menuList = this.menuService.treeiftForChildren(
            res.filter((e) => e.path == null),
            "id",
            "parentId",
            "children"
          );
          //console.log(res);
          // this.menuService.ReArrangeMenuData(res);
          // this.menuService.MakeJsonTree(res);
          //this.items = this.menuService.treeify(res, "id", "parentId", "items");

          //console.log(JSON.stringify(this.items));
        }
      },
      (error) => {
        this.menuList = [];
      }
    );
  }
  Edit(obj: any) {
    this.child.customForm.patchValue({
      id: obj.id,
      menuName: obj.title,
      parentId: obj.parentId,
      activeStatus: 1,
      sortOrder: obj.sortOrder,
      url: obj.path,
      remarks: obj.remarks,
      icon: obj.icon,
      type: obj.type,
    });
  }
}
