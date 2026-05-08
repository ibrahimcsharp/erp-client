import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TypeaheadMatch } from "ngx-bootstrap/typeahead";
import { ToastrService } from "ngx-toastr";
import { CommonServiceService } from "src/app/components/merchandising/Common-Services/common-service.service";
import { AppUser } from "../../Model/app-user";
import { UserDataPermission } from "../../Model/user-data-permission";
import { MenuService } from "../../Services/menu.service";
import { RoleService } from "../../Services/role.service";

@Component({
  selector: "app-user-data-permission",
  templateUrl: "./user-data-permission.component.html",
  styleUrls: ["./user-data-permission.component.scss"],
})
export class UserDataPermissionComponent implements OnInit {
  MenuActionList: UserDataPermission[] = [];
  selectedActions: UserDataPermission[] = [];
  appUserList: AppUser[] = [];
  customForm: FormGroup;
  constructor(
    private toastr: ToastrService,
    public menuService: MenuService,
    private roleService: RoleService,
    private fb: FormBuilder,
    private commonService: CommonServiceService
  ) {}

  ngOnInit(): void {
    this.CreateForm();
    this.GetApplicationUserList();
    this.GetMenuActionsList();
  }
  GetMenuActionsList() {
    this.menuService.GetMenuActions().subscribe(
      (res: UserDataPermission[]) => {
        this.MenuActionList = res;
        //console.log(res);
      },
      (error) => {
        this.MenuActionList = [];
        this.toastr.error("Failed to load data!!");
      }
    );
  }

  CreateForm() {
    this.customForm = this.fb.group({
      userId: ["", Validators.required],
      userName: ["", Validators.required],
    });
  }

  GetApplicationUserList() {
    this.roleService.GetAppUserList().subscribe(
      (res: AppUser[]) => {
        this.appUserList = res;
      },
      (error) => {
        this.appUserList = [];
        this.toastr.warning("Can't not fetch User data");
      }
    );
  }

  onSelectGMTItem(event: TypeaheadMatch): void {
    //console.log(event);
    this.customForm.patchValue({
      userId: event.item.id,
      userName: event.item.userName,
    });
    //console.log(this.customForm.value);
  }

  noResult = false;
  gmtItemNoResults(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.customForm.patchValue({
        userId: "",
        userName: "",
      });
      const control = this.customForm.get("userId");
      control.markAsTouched({ onlySelf: true });
    }
  }

  Search() {
    if (this.customForm.valid) {
      this.GetMenuActionsList();
      // console.log(this.customForm.value);
      this.roleService
        .GetUserDataPermissionListById(this.customForm.value.userId)
        .subscribe(
          (res: UserDataPermission[]) => {
            if (res) {
              this.selectedActions = res;
              console.log(this.selectedActions);
            }
            //console.log(res);
          },
          (error) => {}
        );
    } else {
      this.commonService.ValidationShow(this.customForm);
    }
    //console.log(this.customForm.value);
  }

  SaveCreateUserRole() {
    if (this.selectedActions.length > 0) {
      this.roleService
        .CreateUserRole(this.customForm.value, this.selectedActions)
        .subscribe(
          (res) => {
            this.toastr.success("Saved Successfully", "User Role Info");
          },
          (error) => {
            this.toastr.error("Failed to save", "User Role Info");
          }
        );
    }
  }
}
