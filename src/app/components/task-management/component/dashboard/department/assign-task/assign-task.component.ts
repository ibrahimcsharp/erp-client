import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { EVoteService } from 'src/app/components/e-vote/services/e-vote.service';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { TaskCommonService } from 'src/app/components/task-management/services/task.common.service';
import { TaskService } from 'src/app/components/task-management/services/task.service';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.scss']
})
export class AssignTaskComponent implements OnInit {
  reactiveForm: FormGroup;
  title: string;
  spinnerName = "createSpinner";
  @Output() ToCreate = new EventEmitter();
  model: any = null;
  constructor(public taskCommonService: TaskCommonService,
    public fb: FormBuilder,
    public bsModalRef: BsModalRef,
    public commonService: CommonServiceService,
    public authService: AuthService,
    public taskService: TaskService,
    public evoteService: EVoteService
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    //this.taskCommonService.GetEmployeeInfo();
    this.GetEmployeeListBySuppervisor();
  }

  CreateForm() {
    if (this.model != null) {
      this.reactiveForm = this.fb.group({
        id: [this.model.id],
        tlTaskAssign: ["", Validators.required],
        employeeId: ["", Validators.required],
        employeeName: ["", Validators.required],
      });
    }
  }

  empNoResult = false;
  empNoResults(event: boolean): void {
    this.empNoResult = event;
    if (this.empNoResult == true) {
      this.reactiveForm.patchValue({
        tlTaskAssign: "",
      });
      const control = this.reactiveForm.get("tlTaskAssign");
      control.markAsTouched({ onlySelf: true });
    }
  }
  OnSelectEmployee(event: TypeaheadMatch): void {
    this.reactiveForm.patchValue({
      tlTaskAssign: event.item.employeeId,
      employeeId: event.item.employeeId,
    });
    this.GetSpCurrentStatusById(event.item.employeeId);
  }

  onSubmit() {
    if (this.reactiveForm.valid) {
      this.taskCommonService.CreateTaskAssign(this.reactiveForm.value);
      this.bsModalRef?.hide();
    } else {
      this.commonService.ValidationShow(this.reactiveForm);
    }
  }

  employeeList: any[] = [];
  GetEmployeeListBySuppervisor() {
    var superVisorId = this.authService.decodedToken?.unique_name;
    if (superVisorId != null) {
      this.evoteService.GatePassListBySupervisor(superVisorId).subscribe((res: any[]) => {
        this.employeeList = res;
      }, error => {
        this.employeeList = [];
      })
    }
  }
  spCurrentStatus: any;
  GetSpCurrentStatusById(employeeId: string) {
    this.taskService.GetSpCurrentStatusById(employeeId).subscribe((res: any) => {
      this.spCurrentStatus = res;
      this.taskCommonService.spPendingTaskList = res.pendingTaskList;
      this.taskCommonService.spInProgressTaskList = res.inProgressTaskList;
      this.taskCommonService.spDoneTaskList = res.doneTaskList;
    }, error => {
      this.spCurrentStatus = null;
      this.taskCommonService.spPendingTaskList = [];
      this.taskCommonService.spInProgressTaskList = [];
      this.taskCommonService.spDoneTaskList = [];

    })
  }
}
