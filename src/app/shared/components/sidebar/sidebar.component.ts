import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { MenuService } from "src/app/components/admin/Services/menu.service";
import { CommonServiceService } from "src/app/components/merchandising/Common-Services/common-service.service";
import { AuthService } from "../../service/auth.service";
import { Menu, NavService } from "../../service/nav.service";
import { SpinnerService } from "../../service/spinner.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit {
  public menuItems: Menu[];
  public url: any;
  public fileurl: any;
  spinnerName = "listSpinner";

  constructor(
    private router: Router,
    public navServices: NavService,
    public authService: AuthService,
    private menuService: MenuService,
    private commonService: CommonServiceService,
    private spinner: SpinnerService
  ) {}

  ngOnInit() {
    //this.LoadMenu_02();
    this.LoadMenu();
    this.navServices.items.subscribe((menuItems) => {
      this.menuItems = menuItems;
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          menuItems.filter((items) => {
            if (items.path === event.url) this.setNavActive(items);
            if (!items.children) return false;

            items.children.filter((subItems) => {
              if (subItems.path === event.url) this.setNavActive(subItems);
              if (!subItems.children) return false;

              subItems.children.filter((subSubItems) => {
                if (subSubItems.path === event.url)
                  this.setNavActive(subSubItems);
                if (!subSubItems.children) return false;

                subSubItems.children.filter((subSubSubItems) => {
                  if (subSubSubItems.path === event.url)
                    this.setNavActive(subSubSubItems);
                });
              });
            });
          });
        }
      });
    });
  }

  // Active Nave state
  setNavActive(item) {
    this.menuItems.filter((menuItem) => {
      if (menuItem !== item) menuItem.active = false;
      if (menuItem.children && menuItem.children.includes(item))
        menuItem.active = true;

      if (menuItem.children) {
        menuItem.children.filter((submenuItems) => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = true;

            if (submenuItems.children) {
              submenuItems.children.filter((subSubmenuItems) => {
                if (
                  subSubmenuItems.children &&
                  subSubmenuItems.children.includes(item)
                ) {
                  menuItem.active = true;
                  submenuItems.active = true;
                  subSubmenuItems.active = true;
                }
              });
            }
          }
        });
      }
    });
  }

  // Click Toggle menu
  toggletNavActive(item) {
    if (!item.active) {
      this.menuItems.forEach((a) => {
        if (this.menuItems.includes(item)) a.active = false;
        if (!a.children) return false;
        a.children.forEach((b) => {
          if (a.children.includes(item)) {
            b.active = false;
          }

          if (!b.children) return false;
          b.children.forEach((c) => {
            if (b.children.includes(item)) {
              c.active = false;
            }
          });
        });
      });
    }
    item.active = !item.active;
  }

  // Fileupload
  readUrl(event: any) {
    if (event.target.files.length === 0) return;
    // Image upload validation
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    // Image upload
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    };
  }

  //Load Menu
  LoadMenu() {
    this.menuService.GetMenusByUserIdDynamically().subscribe(
      (res: any) => {
        if (res) {
          //console.log(res);
          this.navServices.items.next(
            this.menuService.treeiftForChildren(
              res,
              "id",
              "parentId",
              "children"
            )
          );
          //this.spinner.hideSpinner();
        }
      },
      (error) => {
        //this.spinner.hideSpinner();
      }
    );
    //this.spinner.showSpinner();
    // setTimeout(() => {

    // }, 3000);
  }
  // async LoadMenu_02() {
  //   await this.menuService
  //     .GetMenusByUserIdDynamicallyToPromise()
  //     .then((res) => {
  //       if (res) {
  //         //console.log(res);
  //         this.navServices.items.next(
  //           this.menuService.treeiftForChildren(
  //             res,
  //             "id",
  //             "parentId",
  //             "children"
  //           )
  //         );
  //         //this.spinner.hideSpinner();
  //       }
  //     })
  //     .catch((error) => {});
  // }
}
