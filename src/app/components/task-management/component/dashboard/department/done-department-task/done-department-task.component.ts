import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { TaskCommonService } from 'src/app/components/task-management/services/task.common.service';
import { TaskService } from 'src/app/components/task-management/services/task.service';
import { TaskDetailInfoComponent } from '../../../employee-section/task-submission/task-detail-info/task-detail-info.component';
import { TaskCommentComponent } from '../../../service-provider/task-comment/task-comment.component';
import { AssignTaskComponent } from '../assign-task/assign-task.component';

@Component({
  selector: 'app-done-department-task',
  templateUrl: './done-department-task.component.html',
  styleUrls: ['./done-department-task.component.scss']
})
export class DoneDepartmentTaskComponent implements OnInit {
  Items: any[];
  bsModalRef: BsModalRef;
  spinnerName = "listSpinner";
  modalRef?: BsModalRef;
  items: MenuItem[];
  constructor(private modalService: BsModalService, public taskService: TaskService,
    private toaster: ToastrService, public taskCommonService: TaskCommonService) { }

  ngOnInit(): void {
    this.LoadDepartmentPendingData();
    this.cmds;
  }

  LoadDepartmentPendingData() {
    this.taskCommonService.GetDepartmentDoneTaskInfo();
  }
  cmds(row) {
    this.items = [
      {
        label: 'Details', icon: 'pi pi-info', command: () => {
          this.DetailsInfo(row);
        }
      },
      {
        label: 'Assign', icon: 'pi pi-tag', command: () => {
          this.TaskAssign(row);
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

}
