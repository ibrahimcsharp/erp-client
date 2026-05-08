import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { TaskCommonService } from '../../../services/task.common.service';
import { TaskService } from '../../../services/task.service';
import { TaskDetailInfoComponent } from '../../employee-section/task-submission/task-detail-info/task-detail-info.component';
import { TaskSubmissionCreateComponent } from '../../employee-section/task-submission/task-submission-create/task-submission-create.component';
import { TaskCommentComponent } from '../task-comment/task-comment.component';
import { TaskProgressUpdateComponent } from '../task-progress-update/task-progress-update.component';
import { environment } from 'src/environments/environment';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { CommonFiles } from 'src/app/components/merchandising/models/common-files.model';
import { TaskSubmissionCreatePopupComponent } from '../../employee-section/task-submission/task-submission-create-popup/task-submission-create-popup.component';
import { Subscription, interval } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth.service';
import * as signalR from '@microsoft/signalr';
import { EVoteService } from 'src/app/components/e-vote/services/e-vote.service';

@Component({
  selector: 'app-sp-home',
  templateUrl: './sp-home.component.html',
  styleUrls: ['./sp-home.component.scss']
})
export class SpHomeComponent implements OnInit {

  bsModalRef: BsModalRef;
  spinnerName = "listSpinner";
  modalRef?: BsModalRef;
  items: MenuItem[];
  private updateSubscription: Subscription;
  isBusy = 0;
  serviceProviderAllTaskArray = [];
  currentUserUserName: any;
  employeeInfo = [];
  allTaskCommentsList: any[] = [];
  private isDestroyed: boolean = false;
  private subscription: Subscription;

  constructor(private modalService: BsModalService,
    public taskService: TaskService,
    private toaster: ToastrService,
    public taskCommonService: TaskCommonService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    public evote: EVoteService,
    public commonService: CommonServiceService) {
    this.subscription = new Subscription();
  }



  async ngOnInit(): Promise<void> {
    this.spinner.show();
    this.currentUserUserName = this.authService.decodedToken?.unique_name;
    this.taskCommonService.GetPendingTaskList();
    this.taskCommonService.GetToDoTaskList();
    this.taskCommonService.GettaskSPForwardedList();
    this.taskCommonService.GetDoneTaskList();

    this.employeeInfo = await this.evote.GetEmployeeInfoPromise();

    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl("http://localhost:5000/taskList")
      // .withUrl("http://192.168.2.246:5000/taskList")
      .withAutomaticReconnect()
      .build();

    connection.start().then(function () {
      console.log('SignalR Connected for service provider task!');
    }).catch(function (err) {
      return console.error(err.toString());
    });

    connection.on("BroadcastMessage", (data: any, flag: any, errorMsg: any) => {
      if (!this.isDestroyed) {
        this.cdr.detectChanges();
        if (flag === 'service_prov_task_list') {
          this.serviceProviderAllTaskArray = data;
          this.LoadServProvPendingDataSignalR();
          this.LoadServProvToDoDataSignalR();
          this.LoadServProvForwardedDataSignalR();
          this.LoadServProvDoneDataSignalR();
        } else if (flag === 'task_comments_list') {
          this.allTaskCommentsList = data;
        }
      }
    });
    this.spinner.hide();

    // if (this.isBusy == 1) {

    // }
    // else {
    // this.updateSubscription = interval(10000).subscribe(
    //   (val) => {   

    //     this.taskCommonService.GetPendingTaskList();
    //     this.taskCommonService.GetToDoTaskList();
    //     this.taskCommonService.GettaskSPForwardedList();
    //     this.taskCommonService.GetDoneTaskList();
    //   });
    //}


    // this.updateSubscription = interval(10000).subscribe(
    //   (val) => {

    //     this.taskCommonService.GetPendingTaskList();
    //     this.taskCommonService.GetToDoTaskList1();
    //     //this.taskCommonService.GettaskSPForwardedList();
    //     //this.taskCommonService.GetDoneTaskList();
    //   });


    // interval(30000).subscribe(x => {

    //   console.log("Test");
    // });
  }

  ngOnDestroy() {
    this.isDestroyed = true;
    this.subscription.unsubscribe();
  }

  LoadServProvPendingDataSignalR() {
    this.taskCommonService.taskPendingList = this.serviceProviderAllTaskArray.filter(x => x.taskForwarded == 0 && x.serviceProviderAccept == 0 && x.responsibleDeptName === this.employeeInfo[0].department && x.responsibleSectionName === this.employeeInfo[0].section);
  }

  LoadServProvToDoDataSignalR() {
    this.taskCommonService.taskToDOList = this.serviceProviderAllTaskArray.filter(x => x.taskForwarded == 0 && x.serviceProviderAccept == 1 && x.taskStatus == 0 && x.serviceProvider === this.currentUserUserName);
  }

  LoadServProvForwardedDataSignalR() {
    this.taskCommonService.taskSPForwardedList = this.serviceProviderAllTaskArray.filter(x => x.taskForwarded == 1 && x.serviceProvider === this.currentUserUserName);
  }

  LoadServProvDoneDataSignalR() {
    this.taskCommonService.taskDoneList = this.serviceProviderAllTaskArray.filter(x => x.taskStatus == 1 && x.serviceProvider === this.currentUserUserName);
  }

  drop(event: CdkDragDrop<any[]>) {
    console.log(event);
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

  Refresh() {
    this.taskCommonService.GetPendingTaskList();
    this.taskCommonService.GetToDoTaskList();
    this.taskCommonService.GetDoneTaskList();
    this.taskCommonService.GettaskSPForwardedList();
  }

  AddToDoList(model: any) {
    model.toAssignServiceProvider = this.authService.decodedToken?.unique_name;
    this.taskCommonService.AddToDoList(model);
  }

  AddComment(model: any) {
    this.taskCommonService.selectedTaskId = 0;
    this.taskCommonService.taskCommentList = [];
    this.taskCommonService.selectedTaskId = model.id;
    this.bsModalRef = this.modalService.show(TaskCommentComponent, {
      initialState: {
        title: "User Comments for-" + model.title,
      },
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg",
    });
  }

  ReturnTask(model: any) {
    this.taskCommonService.ReturnTaskToTeamLeader(model);
  }

  RemoveFromToDoList(model: any) {
    this.taskCommonService.RemoveFromToDoList(model);
  }

  tempModel: any;
  AddChildTast(model: any) {
    console.log(model);
    this.tempModel = model;
    this.tempModel.parentId = model.id;
    this.bsModalRef = this.modalService.show(TaskSubmissionCreatePopupComponent, {
      initialState: {
        title: "Create  New Task",
        model
      },
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg",
    });
    this.SaveData();
  }
  SaveData() {
    this.bsModalRef.content.ToCreate.subscribe((model: any) => {
      if (this.tempModel) {
        console.log(this.tempModel);
        this.taskService.SaveTaskSubmission(this.tempModel).subscribe(
          () => {
            this.taskCommonService.GetToDoTaskList();
            this.toaster.success("Saved successfully", "Task Submission");
          },
          (error) => {
            this.taskCommonService.GetToDoTaskList();
            this.toaster.error("Failed to create!", "Task Submission");
          }
        );
      }
    });
  }

  AddTaskProgress(model: any) {
    this.bsModalRef = this.modalService.show(TaskProgressUpdateComponent, {
      initialState: {
        title: "Update Task Progress",
        model,
      },
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg",
    });
    this.SaveTaskProgressData();
  }

  SaveTaskProgressData() {
    this.bsModalRef.content.ToCreate.subscribe((model: any) => {
      const ToCreate = model;
      console.log(model);
      if (ToCreate) {
        this.taskService.SaveTaskSubmission(ToCreate).subscribe(
          () => {
            this.taskCommonService.GetToDoTaskList();
            this.toaster.success("Saved successfully", "Task Progress");
          },
          (error) => {
            this.taskCommonService.GetToDoTaskList();
            this.toaster.error("Failed to Update!", "Task Progress");
          }
        );
      }
    });
  }

  UpdateTaskStatus(model: any) {
    this.taskCommonService.UpdateTaskStatus(model);
  }

  getComments(panelOpenState: boolean, id: number) {
    //this.isBusy = 1;  
    if (id > 0 && panelOpenState == true) {

      this.taskCommonService.selectedTaskId = id;
      //alert(this.taskCommonService.selectedTaskId);
      // this.taskCommonService.GetTaskCommentByTaskId(this.taskCommonService.selectedTaskId);
      this.taskCommonService.taskCommentList = this.allTaskCommentsList.filter(x => x.taskId == this.taskCommonService.selectedTaskId);
    }
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

  refresh() {
    this.taskCommonService.GetPendingTaskList();
    this.taskCommonService.GetToDoTaskList();
    this.taskCommonService.GettaskSPForwardedList();
    this.taskCommonService.GetDoneTaskList();
  }

  GetNewRecord() {
    this.taskCommonService.GetToDoTaskList();
  }

}
