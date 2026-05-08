import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { PageSettingsModel, SelectionSettingsModel, SortSettingsModel, ToolbarItems, TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { MenuItem, TreeNode } from 'primeng/api';
import { TaskCommonService } from 'src/app/components/task-management/services/task.common.service';
import { TaskService } from 'src/app/components/task-management/services/task.service';
import { TaskCommentComponent } from '../../../service-provider/task-comment/task-comment.component';
import { TaskDetailInfoComponent } from '../task-detail-info/task-detail-info.component';
import { TaskSubmissionCreateComponent } from '../task-submission-create/task-submission-create.component';
import { environment } from 'src/environments/environment';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { CommonFiles } from 'src/app/components/merchandising/models/common-files.model';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-task-submission-list',
  templateUrl: './task-submission-list.component.html',
  styleUrls: ['./task-submission-list.component.scss']
})
export class TaskSubmissionListComponent implements OnInit {
  Items: any[];
  bsModalRef: BsModalRef;
  spinnerName = "listSpinner";
  modalRef?: BsModalRef;
  private updateSubscription: Subscription;
  @ViewChild('taskcreate') child: TaskSubmissionCreateComponent;

  items: MenuItem[];

  constructor(private modalService: BsModalService, public taskService: TaskService,
    private toaster: ToastrService, public taskCommonService: TaskCommonService, public commonService: CommonServiceService) { }

  ngOnInit(): void {
    this.LoadTaskData();
    this.cmds;

    // this.updateSubscription = interval(10000).subscribe(
    //   (val) => {
    //     this.taskCommonService.GetTaskList();
    //   });

  }

  cmds(row) {
    this.items = [
      {
        label: 'Details', icon: 'pi pi-info', command: () => {
          this.DetailsInfo(row);
        }
      },
      {
        label: 'Edit', icon: 'pi pi-user-edit', command: () => {
          this.EditItem(row);
        }
      },
      {
        label: 'Comments-' + row.numberOfComments, icon: 'pi pi-comments', command: () => {
          this.AddComment(row);
        }
      },
    ];
    return this.items;
  }

  EditItem(model: any) {
    this.taskCommonService.GetDepartmentCompanyWise();
    this.taskCommonService.GetSectionsByDepartment(model.departmentName);
    this.child.model = model;
    this.child.CreateForm();
    this.child.saveButtonTitle = "Update";
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
    this.taskCommonService.GetTaskList();
  }

  AddComment(model: any) {
    //console.log(model);
    this.taskCommonService.selectedTaskId = 0;
    this.taskCommonService.taskCommentList = [];
    this.taskCommonService.selectedTaskId = model.id;

    this.taskCommonService.GetTaskCommentByTaskId(this.taskCommonService.selectedTaskId);
    this.bsModalRef = this.modalService.show(TaskCommentComponent, {
      initialState: {
        title: "User Comments for-" + model.title,
      },
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg",
    });
  }

  LoadTaskData() {
    this.taskCommonService.GetTaskList();
  }

  url = environment.fileUrl;
  images: any[];
  ShowFile(obj: any) {
    
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


  getColor(value: string): any {

    if (value == 'PENDING') {
      return 'RGBA(231, 1, 18, 0.91)';
    }
    else if (value == 'DONE') {
      return 'rgb(5, 228, 72)';

      // return { 'background-color':'rgb(5, 228, 72)' }
    }

  }

  DoneTaskVerify(rowData: any) {

    
    if (rowData.taskVerified == "Y") {
      this.toaster.warning("Task " + rowData.title + "  is  already Verified.");
    }
    var obj = {
      id: parseInt(rowData.id)
    }


    this.taskService.DoneTaskVerifyByUser(obj).subscribe(
      (res: any) => {
        if (res.message == "TASK is Not Done!!") {
          this.toaster.error("Task " + rowData.title + "  is  " + res.message);
        }
        else if (res.message == "SUCCESSFULLY VERIFIED!!") {
          this.toaster.success("Task " + rowData.title + "  is  " + res.message);
        }

      },
      (error) => {
        this.toaster.error("Failed to verifiy!");
      }
    );
  }

}
