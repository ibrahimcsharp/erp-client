import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, Message } from 'primeng/api';
import { Role } from '../../Model/role.model';
import { RoleService } from '../../Services/role.service';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.scss']
})
export class RoleCreateComponent implements OnInit {
  role: Role;
  roleForm: FormGroup;
  saveButtonTitle = "Save";
  position: string;
  msgs: Message[] = [];

  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    public roleService: RoleService,
    private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.createRoleForm();
  }
  //create form
  createRoleForm() {
    if (this.role) {
      this.roleForm = this.fb.group({
        id: [this.role.id],
        roleName: [this.role.roleName, Validators.required],
      });
    } else {
      this.onClear();
    }
  }
  //reset form
  onClear() {
    this.roleForm = this.fb.group({
      id: [0],
      roleName: [null, Validators.required],
    });
  }

  //save or update
  onSubmit() {
    this.position = "top";
    this.confirmationService.confirm({
      message: "Are you sure that you want to perform this action?",
      header: "Save Role",
      icon: "pi pi-info-circle",
      accept: () => {

        this.roleService.SaveRole(this.roleForm.value).subscribe(
          res => {
            this.role = null;
            this.roleService.GetRoleList();
            this.onClear();
            this.toaster.success("Saved Successfully", "Role Information");
            this.saveButtonTitle = "SAVE";
          }, err => {
            this.role = null;
            this.onClear();
            this.toaster.error(err.error.error);
            this.saveButtonTitle = "SAVE";
            //this.SupplierToCreate.emit();
          }
        )
      },
      reject: () => {
        this.msgs = [
          {
            severity: "info",
            summary: "error",
            detail: "Something is wrong!",
          },
        ];
      },
      key: "positionDialog",
    });
  }


  BtnClear() {
    this.role = null;
    this.createRoleForm();
    this.saveButtonTitle = "SAVE";
  }

}
