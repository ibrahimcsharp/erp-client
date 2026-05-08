import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TypeaheadMatch } from "ngx-bootstrap/typeahead";
import { ToastrService } from "ngx-toastr";
import { CommonServiceService } from "src/app/components/merchandising/Common-Services/common-service.service";
import { Actions } from "../../Model/actions";
import { MenuAction } from "../../Model/menu-action";
import { Menu } from "../../Model/Menu.Model";
import { MenuService } from "../../Services/menu.service";

@Component({
  selector: "app-menu-action-create",
  templateUrl: "./menu-action-create.component.html",
  styleUrls: ["./menu-action-create.component.scss"],
})
export class MenuActionCreateComponent implements OnInit {
  customForm: FormGroup;
  model: MenuAction;
  menuList: Menu[] = [];
  actionsList: Actions[] = [];
  noResult = false;
  @Output() DataToCreate = new EventEmitter();
  saveButtonTitle = "Save";
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public menuService: MenuService,
    private commonService: CommonServiceService
  ) {}

  ngOnInit() {
    this.CreateForm();
    this.GetMenusList();
    this.GetActionList();
  }

  CreateForm() {
    if (this.model) {
      this.customForm = this.fb.group({
        id: [this.model.id],
        menuId: [this.model.menuId, Validators.required],
        roleId: [this.model.roleId, Validators.required],
        roleName: [this.model.roleName, Validators.required],
        actionName: [this.model.actionName, Validators.required],
        remarks: [this.model.remarks],
      });
    } else {
      this.OnClear();
    }
  }

  GetMenusList() {
    this.menuService.GetMenuList().subscribe(
      (res: Menu[]) => {
        if (res) {
          // console.log(res);
          this.menuList = res.filter((e) => e.path != null);
          console.log(this.menuList);
        }
      },
      (error) => {}
    );
  }
  GetActionList() {
    this.menuService.GetActions().subscribe(
      (res: Actions[]) => {
        if (res) {
          this.actionsList = res;
        }
      },
      (error) => {}
    );
  }

  OnClear() {
    this.customForm = this.fb.group({
      id: [0],
      menuId: ["", Validators.required],
      title: ["", Validators.required],
      roleId: ["", Validators.required],
      roleName: ["", Validators.required],
      actionName: ["", Validators.required],
      remarks: [""],
    });
  }

  onSelectCustomer(event: TypeaheadMatch): void {
    this.customForm.patchValue({
      menuId: event.item.id,
      title: event.item.title,
    });
  }
  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.customForm.patchValue({
        menuId: "",
        title: "",
      });
      const control = this.customForm.get("title"); // {2}
      control.markAsTouched({ onlySelf: true }); // {3}
    }
  }
  onSelectAction(event: TypeaheadMatch): void {
    this.customForm.patchValue({
      roleId: event.item.id,
      roleName: event.item.actionName,
    });
  }
  typeaheadNoResultsForAction(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.customForm.patchValue({
        roleId: "",
        roleName: "",
      });
      const control = this.customForm.get("roleName"); // {2}
      control.markAsTouched({ onlySelf: true }); // {3}
    }
  }

  OnSubmit() {
    //console.log(this.customForm.value);
    if (this.customForm.valid) {
      console.log(this.customForm.value);
      this.menuService
        .PostMenuActionSetup(this.customForm.value)
        .subscribe((res: any) => {
          //console.log(res.message);
          this.toastr.success(res.message, "Menu Action");
          this.OnClear();
          this.DataToCreate.emit();
          this.GetActionList();
        });
    } else {
      this.commonService.ValidationShow(this.customForm);
    }
  }
}
