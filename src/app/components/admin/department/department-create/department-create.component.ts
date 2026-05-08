import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, Message } from 'primeng/api';
import { Department } from '../../Model/department.model';
import { DepartmentService } from '../../Services/department.service';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.scss']
})

export class DepartmentCreateComponent implements OnInit {

  department: Department;
  departmentForm: FormGroup;
  saveButtonTitle = "Save";
  position: string;
  msgs: Message[] = [];
  @Output() ToCreate = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    public departmentService: DepartmentService,
    private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.CreateDepartment();
  }
  //Initiate form data to model
  CreateDepartment() {
     if (this.department) {
      this.departmentForm = this.fb.group({
        id: [this.department.id],
        departmentName: [this.department.departmentName, Validators.required],
      });
    } else {
      this.onClear();
    }
  }


//save or update
onSubmit() {
  this.position = "top";
  this.confirmationService.confirm({
    message: "Are you sure that you want to perform this action?",
    header: "Save Department",
    icon: "pi pi-info-circle",
    accept: () => {

      this.departmentService.SaveDepartment(this.departmentForm.value).subscribe(
        res => {
          this.department = null;
          this.departmentService.GetDepartmentList();
          this.onClear();
          this.toaster.success("Saved Successfully", "Department Information");
          this.saveButtonTitle = "SAVE";
          this.ToCreate.emit();
        }, err => {
          this.department = null;
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

  //reset form
   onClear() {
    this.departmentForm = this.fb.group({
      id: [0],
      departmentName: [null, Validators.required],
    });
  }

  BtnClear() {
    this.department = null;
    this.CreateDepartment();
    this.saveButtonTitle = "SAVE";
  }

}
