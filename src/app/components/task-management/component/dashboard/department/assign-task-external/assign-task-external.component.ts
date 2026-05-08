import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { TaskCommonService } from 'src/app/components/task-management/services/task.common.service';
import { TaskService } from 'src/app/components/task-management/services/task.service';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-assign-task-external',
  templateUrl: './assign-task-external.component.html',
  styleUrls: ['./assign-task-external.component.scss']
})
export class AssignTaskExternalComponent implements OnInit {
  model: any = null;
  reactiveForm: FormGroup;
  title: string;
  constructor(public taskCommonService: TaskCommonService,
    public fb: FormBuilder,
    public bsModalRef: BsModalRef,
    public commonService: CommonServiceService,
    public authService: AuthService,
    public taskService: TaskService) { }

  ngOnInit(): void {
    //this.GetAllTaskSupervisors();
    this.taskCommonService.GetDepartmentCompanyWise();
    this.CreateForm();
  }
  supervisors: any[] = [];
  GetAllTaskSupervisors() {
    this.taskService.GetAllTaskSupervisors().subscribe((res: any[]) => {
      this.supervisors=res;
    }, error => {
      this.supervisors=[];

    })
  }

  CreateForm() {
    if (this.model != null) {
      this.reactiveForm = this.fb.group({
        id: [this.model.id],        
        //supervisorId: ["", Validators.required],
        //supervisorName: ["", Validators.required],
        responsibleDeptName: ["", [Validators.required]],
        responsibleSectionName: ["", [Validators.required]],
      });
    }
  }

  empNoResult = false;
  empNoResults(event: boolean): void {
    this.empNoResult = event;
    if (this.empNoResult == true) {
      this.reactiveForm.patchValue({
        supervisorId: "",
        supervisorName: "",
      });
      const control = this.reactiveForm.get("supervisorName");
      control.markAsTouched({ onlySelf: true });
    }
  }
  OnSelectEmployee(event: TypeaheadMatch): void {
    this.reactiveForm.patchValue({
      supervisorId: event.item.supervisorId,
      supervisorName: event.item.supervisorName,
    });    
  }

  onSubmit() {
    if (this.reactiveForm.valid) {
      this.taskCommonService.CreateTaskAssignAnotherDept(this.reactiveForm.value);
      this.bsModalRef?.hide();
    } else {
      this.commonService.ValidationShow(this.reactiveForm);
    }
  }

  OnSelectDepartment(event: TypeaheadMatch): void {
    this.reactiveForm.patchValue({
      responsibleDeptName: event.item.departmentName,
    });
    this.taskCommonService.GetSectionsByDepartment(event.item.departmentName);
  }

  noResult = false;
  DepartmentSelectNoResults(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.reactiveForm.patchValue({
        responsibleDeptName: "",
      });
      const control = this.reactiveForm.get("responsibleDeptName");
      control.markAsTouched({ onlySelf: true });
    }
  }

  OnSelectSection(event: TypeaheadMatch): void {
    this.reactiveForm.patchValue({
      responsibleSectionName: event.item.sectionName,
    });
  }

  noResultSection = false;
  SectionSelectNoResults(event: boolean): void {
    this.noResultSection = event;
    if (this.noResultSection == true) {
      this.reactiveForm.patchValue({
        responsibleSectionName: "",
      });
      const control = this.reactiveForm.get("responsibleSectionName");
      control.markAsTouched({ onlySelf: true });
    }
  }

}
