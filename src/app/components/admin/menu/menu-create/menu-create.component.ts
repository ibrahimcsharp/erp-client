import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Menu } from "../../Model/Menu.Model";
import { MenuService } from "../../Services/menu.service";

@Component({
  selector: "app-menu-create",
  templateUrl: "./menu-create.component.html",
  styleUrls: ["./menu-create.component.scss"],
})
export class MenuCreateComponent implements OnInit {
  customForm: FormGroup;
  model: Menu;
  saveButtonTitle = "Save";
  @Output() ToCreate = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public menuService: MenuService
  ) {}
  // getItems(parentChildObj) {
  //   let itemsArray = [];
  //   parentChildObj.forEach((set) => {
  //     itemsArray.push(new TreeviewItem(set));
  //   });
  //   return itemsArray;
  // }

  ngOnInit(): void {
    this.CreateForm();
  }

  CreateForm() {
    if (this.model) {
      this.customForm = this.fb.group({
        id: [this.model.id],
        menuName: [this.model.menuName, Validators.required],
        parentId: [this.model.parentId],
        activeStatus: [this.model.activeStatus, Validators.required],
        sortOrder: [this.model.sortOrder, Validators.required],
        url: [this.model.path],
        remarks: [this.model.remarks],
        icon: [this.model.icon, Validators.required],
        type: [this.model.type, Validators.required],
      });
    } else {
      this.OnClear();
    }
  }

  OnClear() {
    this.customForm = this.fb.group({
      id: [0],
      menuName: ["", Validators.required],
      parentId: [0],
      activeStatus: [1, Validators.required],
      sortOrder: [0, Validators.required],
      url: [""],
      remarks: [""],
      icon: ["", Validators.required],
      type: ["", Validators.required],
    });
  }

  OnSubmit() {
    console.log(this.customForm.value);
    this.menuService.PostMenu(this.customForm.value).subscribe(
      (res) => {
        this.OnClear();
        this.toastr.success("Menu Info", "Saved Successfully!!");
        this.ToCreate.emit();
      },
      (error) => {
        this.toastr.error("Menu Info", "Failed to save");
      }
    );
  }
}
