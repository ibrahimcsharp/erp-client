import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TaskCommonService } from 'src/app/components/task-management/services/task.common.service';
import { TaskService } from 'src/app/components/task-management/services/task.service';
import { TaskDetailInfoComponent } from '../../../employee-section/task-submission/task-detail-info/task-detail-info.component';
import { TaskCommentComponent } from '../../../service-provider/task-comment/task-comment.component';
import { AssignTaskComponent } from '../assign-task/assign-task.component';
import { AuthService } from 'src/app/shared/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { AssignTaskExternalComponent } from '../assign-task-external/assign-task-external.component';
import { environment } from 'src/environments/environment';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { CommonFiles } from 'src/app/components/merchandising/models/common-files.model';
import { Subscription, interval } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import * as signalR from '@microsoft/signalr';
import { EVoteService } from 'src/app/components/e-vote/services/e-vote.service';

@Component({
  selector: 'app-department-task-home',
  templateUrl: './department-task-home.component.html',
  styleUrls: ['./department-task-home.component.scss']
})
export class DepartmentTaskHomeComponent implements OnInit {
  bsModalRef: BsModalRef;
  spinnerName = "listSpinner";
  modalRef?: BsModalRef;
  departmentAllTaskArray = [];
  currentUserUserName: string;
  serviceProviderAllTaskArray = [];
  isSearchClicked: boolean = false;

  connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Information)
    .withUrl("http://localhost:5000/taskList")
    // .withUrl("http://192.168.2.246:5000/taskList")
    .withAutomaticReconnect()
    .build();

  allTaskCommentsList: any[] = [];
  private isDestroyed: boolean = false;
  private subscription: Subscription;

  constructor(private modalService: BsModalService,
    public taskService: TaskService,
    private toaster: ToastrService,
    public taskCommonService: TaskCommonService,
    private spinner: NgxSpinnerService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef,
    public fb: FormBuilder,
    public evoteService: EVoteService,
    public commonService: CommonServiceService) {
    this.subscription = new Subscription();
  }


  ngOnInit(): void {
    this.spinner.show();
    this.CreateForm();
    this.GetEmployeeListBySuppervisor();
    this.currentUserUserName = this.authService.decodedToken?.unique_name;

    this.LoadDepartmentPendingData();
    this.taskCommonService.GetDepartmentOnGoingTaskInfo();
    this.taskCommonService.GetDepartmentDoneTaskInfo();
    this.taskCommonService.GetDepartmentForwardedTaskInfo();

    //if (!this.isSearchClicked) {


    this.connection.start().then(function () {
      console.log('SignalR Connected for team leader task!');
    }).catch(function (err) {
      return console.error(err.toString());
    });

    this.connection.on("BroadcastMessage", (data: any, flag: any, errorMsg: any) => {
      if (!this.isDestroyed) {
        this.cdr.detectChanges();
        if (flag === 'dept_task_list') {
          this.departmentAllTaskArray = data;
          this.LoadDepartmentPendingDataSignalR();
          this.LoadDepartmentOnGoingDataSignalR();
          this.LoadDepartmentDoneDataSignalR();
          this.LoadDepartmentForwardingDataSignalR();
        } else if (flag === 'service_prov_task_list') {
          this.serviceProviderAllTaskArray = data;
        } else if (flag === 'task_comments_list') {
          this.allTaskCommentsList = data;
        }
      }
    });
    //}

    this.spinner.hide();

    // interval(30000).subscribe(x => {
    //  // this.refresh();

    //  this.LoadDepartmentPendingData();
    //  this.taskCommonService.GetDepartmentOnGoingTaskInfo1();
    //  this.taskCommonService.GetDepartmentDoneTaskInfo1();
    //  this.taskCommonService.GetDepartmentForwardedTaskInfo();
    //   console.log("Test");
    // });

  }

  ngOnDestroy() {
    this.isDestroyed = true;
    this.subscription.unsubscribe();
  }

  LoadDepartmentPendingDataSignalR() {
    this.taskCommonService.departmentPendingTaskArray = this.departmentAllTaskArray.filter(x => x.tlAccept == 0 && x.taskForwarded == 0 && x.serviceProviderAccept == 0 && x.supervisorId === this.currentUserUserName);
  }
  LoadDepartmentOnGoingDataSignalR() {
    this.taskCommonService.departmentOnGoingTaskArray = this.departmentAllTaskArray.filter(x => x.taskStatus == 0 && x.taskForwarded == 0 && x.serviceProviderAccept == 1 && x.supervisorId === this.currentUserUserName);
  }
  LoadDepartmentDoneDataSignalR() {
    this.taskCommonService.departmentDoneTaskArray = this.departmentAllTaskArray.filter(x => x.taskStatus == 1 && x.supervisorId === this.currentUserUserName);
  }
  LoadDepartmentForwardingDataSignalR() {
    this.taskCommonService.departmentForwardedTaskArray = this.departmentAllTaskArray.filter(x => x.taskForwarded == 1 && x.supervisorId === this.currentUserUserName);
  }

  drop(event: CdkDragDrop<any[]>) {
    console.log("From department task home: drop feature::: " + event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      if (event.container.id == "cdk-drop-list-0") {
        //alert("to do");
        //console.log(event.container.data[event.currentIndex]);
        //debugger
        this.RemoveFromToDoList(event.container.data[event.currentIndex]);
      }
      else if (event.container.id == "cdk-drop-list-1") {
        //alert("in progress");
        //console.log(event.container.data[event.currentIndex]);
        this.AddToDoList(event.container.data[event.currentIndex]);
      }
      else if (event.container.id == "cdk-drop-list-2") {
        //alert("done");
        //console.log(event.container.data[event.currentIndex]);
        this.UpdateTaskStatus(event.container.data[event.currentIndex])
      }
    }
  }

  RemoveFromToDoList(model: any) {
    this.taskCommonService.RemoveFromToDoList(model);
  }

  AddToDoList(model: any) {
    model.toAssignServiceProvider = this.reactiveForm.value.employeeId ?  this.reactiveForm.value.employeeId : this.currentUserUserName;
    this.taskCommonService.AddToDoList(model);
  }

  UpdateTaskStatus(model: any) {
    this.taskCommonService.UpdateTaskStatus(model);
  }


  LoadDepartmentPendingData() {
    this.taskCommonService.GetDepartmentPendingTaskInfo();
  }

  DetailsInfo(model: any) {
    this.bsModalRef = this.modalService.show(TaskDetailInfoComponent, {
      initialState: {
        title: "Details Task Info",
        model,
      },
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg",
    });
  }

  AddComment(model: any) {
    this.taskCommonService.selectedTaskId = 0;
    this.taskCommonService.taskCommentList = [];
    this.taskCommonService.selectedTaskId = model.id;
    //alert(model.id);
    this.bsModalRef = this.modalService.show(TaskCommentComponent, {
      initialState: {
        title: "User Comments for-" + model.title,
      },
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg",
    });
  }

  TaskAssign(model: any) {
    this.bsModalRef = this.modalService.show(AssignTaskComponent, {
      initialState: {
        title: "Asign Task for-" + model.title,
        model
      },
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg",
    });
  }
  TaskAssignAnotherDept(model: any) {
    this.bsModalRef = this.modalService.show(AssignTaskExternalComponent, {
      initialState: {
        title: "Asign Task for-" + model.title,
        model
      },
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg",
    });
  }

  getComments(panelOpenState: boolean, id: number) {
    if (id > 0 && panelOpenState == true) {
      this.taskCommonService.selectedTaskId = id;
      //alert(this.taskCommonService.selectedTaskId);
      //this.taskCommonService.GetTaskCommentByTaskId(this.taskCommonService.selectedTaskId);
      this.taskCommonService.taskCommentList = this.allTaskCommentsList.filter(x => x.taskId == this.taskCommonService.selectedTaskId);
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
  reactiveForm: FormGroup;
  CreateForm() {
    this.reactiveForm = this.fb.group({
      employeeId: ["", Validators.required],
      employeeName: [""],
    });
  }

  empNoResult = false;
  empNoResults(event: boolean): void {
    this.empNoResult = event;
    if (this.empNoResult == true) {
      this.reactiveForm.patchValue({
        employeeId: "",
        employeeName: "",
      });
      //debugger
      const control = this.reactiveForm.get("tlTaskAssign");
      if (control != null) {
        control.markAsTouched({ onlySelf: true });
      }
    }
  }
  OnSelectEmployee(event: TypeaheadMatch): void {
    this.reactiveForm.patchValue({
      employeeName: event.item.employeeName,
      employeeId: event.item.employeeId,
    });
    //this.GetSpCurrentStatusById(event.item.employeeId);
  }

  spCurrentStatus: any;
  GetSpCurrentStatusById(employeeId: string) {
    console.log(employeeId);
    if (employeeId.length > 0) {
      this.taskService.GetSpCurrentStatusById(employeeId).subscribe(async (res: any) => {
        this.spCurrentStatus = res;
        this.taskCommonService.departmentPendingTaskArray = res.pendingTaskList;
        this.taskCommonService.departmentOnGoingTaskArray = res.inProgressTaskList;
        this.taskCommonService.departmentDoneTaskArray = res.doneTaskList;
        this.taskCommonService.departmentForwardedTaskArray = [];

        var tasksPendingList = await this.taskService.GetPendingTaskListPromise();
        if (tasksPendingList.length > 0) {
          tasksPendingList.forEach(element => {
            if (!this.taskCommonService.departmentPendingTaskArray.includes(element)) {
              this.taskCommonService.departmentPendingTaskArray.push(element);
            }
          });

        }

      }, error => {
        this.spCurrentStatus = null;
        this.taskCommonService.departmentPendingTaskArray = [];
        this.taskCommonService.departmentOnGoingTaskArray = [];
        this.taskCommonService.departmentDoneTaskArray = [];
        this.taskCommonService.departmentForwardedTaskArray = [];

      })
    } else {
      this.LoadDepartmentPendingData();
      this.taskCommonService.GetDepartmentOnGoingTaskInfo();
      this.taskCommonService.GetDepartmentDoneTaskInfo();
      this.taskCommonService.GetDepartmentForwardedTaskInfo();
    }
  }

  async onSearch() {
    this.spinner.show();
    this.connection.stop();

    //this.GetSpCurrentStatusById(this.reactiveForm.value.employeeId);
    if (this.serviceProviderAllTaskArray.length > 0) {
      this.taskCommonService.departmentPendingTaskArray = this.serviceProviderAllTaskArray.filter(x => x.taskForwarded == 0 && x.serviceProviderAccept == 0 && x.tlTaskAssign === this.reactiveForm.value.employeeId);
      this.taskCommonService.departmentOnGoingTaskArray = this.departmentAllTaskArray.filter(x => x.taskStatus == 0 && x.serviceProviderAccept == 1 && x.serviceProvider === this.reactiveForm.value.employeeId);
      this.taskCommonService.departmentDoneTaskArray = this.serviceProviderAllTaskArray.filter(x => x.taskStatus == 1 && x.serviceProvider === this.reactiveForm.value.employeeId);
      this.taskCommonService.departmentForwardedTaskArray = [];

      var taskToDOsList = this.serviceProviderAllTaskArray.filter(x => x.taskForwarded == 0 && x.serviceProviderAccept == 1 && x.taskStatus == 0 && x.serviceProvider === this.reactiveForm.value.employeeId);
      if (taskToDOsList.length > 0) {
        taskToDOsList.forEach(sElement => {
          if (!this.taskCommonService.departmentOnGoingTaskArray.includes(sElement)) {
            this.taskCommonService.departmentOnGoingTaskArray.push(sElement);
          }
        });
      }

      var tasksPendingList = await this.taskService.GetPendingTaskListPromise();
      if (tasksPendingList.length > 0) {
        tasksPendingList.forEach(element => {
          if (!this.taskCommonService.departmentPendingTaskArray.includes(element)) {
            this.taskCommonService.departmentPendingTaskArray.push(element);
          }
        });
      }
    }
    this.spinner.hide();
  }
  refresh() {
    this.connection.start();
    this.reactiveForm.patchValue({
      employeeId: "",
      employeeName: "",
    });
    this.LoadDepartmentPendingData();
    this.taskCommonService.GetDepartmentOnGoingTaskInfo();
    this.taskCommonService.GetDepartmentDoneTaskInfo();
    this.taskCommonService.GetDepartmentForwardedTaskInfo();
    window.location.reload();
  }

  url = environment.fileUrl;
  images: any[];
  ShowFile(obj: any, template: TemplateRef<any>) {
    //this.modalRef = this.modalService.show(template);
    this.images = new Array();
    //console.log(obj);
    let fileObjectId = 129;
    var id = obj.id;
    this.commonService
      .GetStyleImageByRefId(id, fileObjectId)
      .subscribe((data: CommonFiles[]) => {
        for (var i = 0; i < data.length; i++) {
          window.open(
            this.url + data[i].location,
            '_blank',
          );

          // var ob = {
          //   previewImageSrc: this.url + data[i].location,
          //   thumbnailImageSrc: this.url + data[i].location,
          //   alt: "Description for Image " + i + 1,
          //   title: "Title " + i + 1,
          // };
          // this.images.push(ob);
        }

      });
  }

  GetNewRecord() {
    this.taskCommonService.GetDepartmentOnGoingTaskInfo();
  }

  GetDoneNewRecord() {
    this.taskCommonService.GetDepartmentDoneTaskInfo();
  }


}

