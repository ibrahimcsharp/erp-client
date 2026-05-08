import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { PageSettingsModel, SelectionSettingsModel, SortSettingsModel, ToolbarItems, TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { TaskCommonService } from '../../../services/task.common.service';
import { TaskService } from '../../../services/task.service';
import { TaskDetailInfoComponent } from '../../employee-section/task-submission/task-detail-info/task-detail-info.component';
import { TaskSubmissionCreateComponent } from '../../employee-section/task-submission/task-submission-create/task-submission-create.component';
import { TaskCommentComponent } from '../task-comment/task-comment.component';
import { TaskProgressUpdateComponent } from '../task-progress-update/task-progress-update.component';

@Component({
  selector: 'app-task-to-do-list',
  templateUrl: './task-to-do-list.component.html',
  styleUrls: ['./task-to-do-list.component.scss']
})
export class TaskToDoListComponent implements OnInit {
  bsModalRef: BsModalRef;
  spinnerName = "listSpinner";
  modalRef?: BsModalRef;
  items: MenuItem[];
  constructor(private modalService: BsModalService, public taskService: TaskService,
    private toaster: ToastrService, public taskCommonService: TaskCommonService) { }

  ngOnInit(): void {
    this.taskCommonService.GetToDoTaskList();
    this.cmds;
    
  }

  Refresh() {
    this.taskCommonService.GetToDoTaskList();
  }
  cmds(row) {
    this.items = [
      {
        label: 'Details', icon: 'pi pi-info-circle', command: () => {
          this.DetailsInfo(row);
        }
      },
      {
        label: 'Remove', icon: 'pi pi-user-minus', command: () => {
          this.RemoveFromToDoList(row);
        }
      },
      {
        label: 'Add Child', icon: 'pi pi-sitemap', command: () => {
          this.AddChildTast(row);
        }
      },
      {
        label: 'Update Progress', icon: 'pi pi-sort-amount-up', command: () => {
          this.AddTaskProgress(row);
        }
      },
      {
        label: 'Mark as Done', icon: 'pi pi-check', command: () => {
          this.UpdateTaskStatus(row);
        }
      },
      {
        label: 'Comments-'+row.numberOfComments, icon: 'pi pi-comments', command: () => {
          this.AddComment(row);
        }
      },
    ];
    return this.items;
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

  RemoveFromToDoList(model: any) {
    this.taskCommonService.RemoveFromToDoList(model);
  }
  tempModel: any;
  AddChildTast(model: any) {
    this.tempModel = model;
    this.bsModalRef = this.modalService.show(TaskSubmissionCreateComponent, {
      initialState: {
        title: "Create  New Task",
      },
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg",
    });
    this.SaveData();
  }

  SaveData() {
    this.bsModalRef.content.ToCreate.subscribe((model: any) => {
      const ToCreate = model;
      if (ToCreate) {
        ToCreate.parentId = this.tempModel.id;
        this.taskService.SaveTaskSubmission(ToCreate).subscribe(
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

  UpdateTaskStatus(model:any){
    this.taskCommonService.UpdateTaskStatus(model);
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

  AddComment(model:any){
    this.taskCommonService.selectedTaskId=model.id;
    this.bsModalRef = this.modalService.show(TaskCommentComponent, {
      initialState: {
        title: "User Comments for-"+model.title,        
      },
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg",
    });
  }

}
