import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MenuItem } from "primeng/api";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { Actions } from "../Model/actions";
import { MenuAction } from "../Model/menu-action";
import { Menu } from "../Model/Menu.Model";

@Injectable({
  providedIn: "root",
})
export class MenuService {
  baseUrl = environment.apiUrl;
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
  menuList: Menu[] = [];
  items: MenuItem[];
  reArrangeMenuList: any[] = [];
  menuPermissionForCheckList: any[] = [];
  constructor(private http: HttpClient, private token: TokenService) {}

  GetMenuList() {
    return this.http.get<Menu[]>(this.baseUrl_ + "RoleManage/GetMenuList", {
      headers: this.token.headerToken(),
    });
  }

  //For menu
  treeify(list, idAttr, parentAttr, childrenAttr) {
    if (!idAttr) idAttr = "id";
    if (!parentAttr) parentAttr = "parent";
    if (!childrenAttr) childrenAttr = "items";

    var treeList = [];
    var lookup = {};
    list.forEach(function (obj) {
      lookup[obj[idAttr]] = obj;
      obj[childrenAttr] = [];
    });
    list.forEach(function (obj) {
      if (obj[parentAttr] != null) {
        if (lookup[obj[parentAttr]] !== undefined) {
          lookup[obj[parentAttr]][childrenAttr].push(obj);
        } else {
          //console.log('Missing Parent Data: ' + obj[parentAttr]);
          treeList.push(obj);
        }
      } else {
        treeList.push(obj);
      }
    });
    return treeList;
  }
  //for menu permission
  treeiftForChildren(list, idAttr, parentAttr, childrenAttr) {
    if (!idAttr) idAttr = "id";
    if (!parentAttr) parentAttr = "parent";
    if (!childrenAttr) childrenAttr = "children";

    var treeList = [];
    var lookup = {};
    list.forEach(function (obj) {
      lookup[obj[idAttr]] = obj;
      obj[childrenAttr] = [];
    });
    list.forEach(function (obj) {
      if (obj[parentAttr] != null) {
        if (lookup[obj[parentAttr]] !== undefined) {
          lookup[obj[parentAttr]][childrenAttr].push(obj);
        } else {
          //console.log('Missing Parent Data: ' + obj[parentAttr]);
          treeList.push(obj);
        }
      } else {
        treeList.push(obj);
      }
    });
    //console.log(JSON.stringify(treeList));
    return treeList;
  }

  // MakeJsonTree(menuList: Menu[]) {
  //   const result = {};

  //   menuList.forEach((o) => {
  //     Object.keys(o).reduce((r, e, i, arr) => {
  //       const key = o[e];
  //       if (o[e] == null) return r;
  //       if (o[arr[i + 1]] == null) r[key] = null;
  //       else if (!r[key]) r[key] = {};
  //       return r[key];
  //     }, result);
  //   });

  //   function build(input) {
  //     for (let key in input) {
  //       if (input[key] && Object.keys(input[key]).length) build(input[key]);
  //       input[key] = [input[key]];
  //     }
  //   }

  //   build(result);

  //   console.log(result);
  // }

  ReArrangeMenuData(menuList: Menu[]) {
    if (menuList) {
      let MenuMain = menuList.filter((e) => e.parentId == 0);
      console.log(MenuMain);
      if (MenuMain.length > 0) {
        MenuMain.forEach((element) => {
          // var obj = {
          //   label: element.menuName,
          // };
          var MenuSub = this.menuList.filter((e) => e.parentId == element.id);
          console.log(MenuSub);
          MenuSub.forEach((element) => {
            var MenuSubSub = this.menuList.filter(
              (e) => e.parentId == element.id
            );
            console.log(MenuSubSub);
            MenuSubSub.forEach((element) => {
              var MenuSubSubSub = this.menuList.filter(
                (e) => e.parentId == element.id
              );
              console.log(MenuSubSubSub);
            });
          });
          //this.reArrangeMenuList.push(obj);
        });
        //this.items = this.reArrangeMenuList;
      }
    }
  }

  PostMenu(menu: Menu) {
    return this.http.post(this.baseUrl_ + "RoleManage/InsertMenu", menu, {
      headers: this.token.headerToken(),
    });
  }
  obj: any;
  MenuPermissionByUserId(userId: number, list: any[], actionList: any[]) {
    this.obj = {};
    this.obj.userId = userId;
    var body = {
      ...this.obj,
      list: list,
      actionList: actionList,
    };
    console.log(body);

    return this.http.post(
      this.baseUrl_ + "RoleManage/CreateMenuPermissionByUserId",
      body,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  onNodeSelect(event: any) {
    console.log('Selected Node:', event.node);
    // Handle selected node
  }

  onNodeUnselect(event: any) {
    console.log('Unselected Node:', event.node);
    // Handle unselected node
  }

  GetActions() {
    return this.http.get<Actions[]>(
      this.baseUrl_ + "RoleManage/GetActionsList",
      {
        headers: this.token.headerToken(),
      }
    );
  }

  PostMenuActionSetup(menuAction: MenuAction) {
    return this.http.post(
      this.baseUrl_ + "RoleManage/CreateMenuActionSetUp",
      menuAction,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  GetMenuActions() {
    return this.http.get(this.baseUrl_ + "RoleManage/GetMenuActionSetUpList", {
      headers: this.token.headerToken(),
    });
  }
  
  GetMenusByUserId(id: number) {
    //console.log(id);
    return this.http.get<any[]>(
      this.baseUrl_ + "RoleManage/GetMenusByUserId?UserId=" + id,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  
  GetMenusByAdminUserId(id: number) {
    //console.log(id);
    return this.http.get<any[]>(
      this.baseUrl_ + "RoleManage/GetMenusByAdminUserId?UserId=" + id,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetMenusByUserIdDynamically() {
    return this.http.get<any[]>(
      this.baseUrl_ + "RoleManage/GetMenusByUserIdDynamically",
      {
        headers: this.token.headerToken(),
      }
    );
  }
  async GetMenusByUserIdDynamicallyToPromise() {
    return this.http
      .get<any[]>(this.baseUrl_ + "RoleManage/GetMenusByUserIdDynamically", {
        headers: this.token.headerToken(),
      })
      .toPromise();
  }
}
