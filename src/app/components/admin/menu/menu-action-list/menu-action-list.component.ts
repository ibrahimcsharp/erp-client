import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { MenuAction } from "../../Model/menu-action";
import { MenuService } from "../../Services/menu.service";

@Component({
  selector: "app-menu-action-list",
  templateUrl: "./menu-action-list.component.html",
  styleUrls: ["./menu-action-list.component.scss"],
})
export class MenuActionListComponent implements OnInit {
  MenuActionList: MenuAction[] = [];

  constructor(private toastr: ToastrService, public menuService: MenuService) {}

  ngOnInit() {
    this.GetMenuActionsList();
  }

  GetMenuActionsList() {
    this.menuService.GetMenuActions().subscribe(
      (res: MenuAction[]) => {
        this.MenuActionList = res;
      },
      (error) => {
        this.MenuActionList = [];
        this.toastr.error("Failed to load data!!");
      }
    );
  }
}
