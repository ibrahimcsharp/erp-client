import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { PageSettingsModel, SelectionSettingsModel, SortSettingsModel, ToolbarItems, TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { TaskCommonService } from '../../../services/task.common.service';
import { TaskService } from '../../../services/task.service';
import { TaskDetailInfoComponent } from '../../employee-section/task-submission/task-detail-info/task-detail-info.component';
import { TaskCommentComponent } from '../task-comment/task-comment.component';

@Component({
  selector: 'app-task-done-list',
  templateUrl: './task-done-list.component.html',
  styleUrls: ['./task-done-list.component.scss']
})
export class TaskDoneListComponent implements OnInit {
  bsModalRef: BsModalRef;
  spinnerName = "listSpinner";
  modalRef?: BsModalRef;
  items: MenuItem[];
  constructor(private modalService: BsModalService, public taskService: TaskService,
    private toaster: ToastrService, public taskCommonService: TaskCommonService) { }

  ngOnInit(): void {
    this.taskCommonService.GetDoneTaskList();
    this.cmds;
    
  }
  cmds(row) {
    this.items = [
      {
        label: 'Details', icon: 'pi pi-info-circle', command: () => {
          this.DetailsInfo(row);
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

  Refresh() {
    this.taskCommonService.GetDoneTaskList();
  }
  AddComment(model: any) {
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

}
