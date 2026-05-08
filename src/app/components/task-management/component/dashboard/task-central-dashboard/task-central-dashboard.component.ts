import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { TaskCommonService } from '../../../services/task.common.service';
import { TaskService } from '../../../services/task.service';
import { TaskDetailInfoComponent } from '../../employee-section/task-submission/task-detail-info/task-detail-info.component';
import { TaskCommentComponent } from '../../service-provider/task-comment/task-comment.component';

@Component({
  selector: 'app-task-central-dashboard',
  templateUrl: './task-central-dashboard.component.html',
  styleUrls: ['./task-central-dashboard.component.scss']
})
export class TaskCentralDashboardComponent implements OnInit {

  constructor(private modalService: BsModalService, public taskService: TaskService,
    private toaster: ToastrService, public taskCommonService: TaskCommonService) { }

  currentDate = new Date();
  modalRef?: BsModalRef;
  bsModalRef: BsModalRef;
  ngOnInit(): void {
    this.taskCommonService.GetAllTaskList();
    
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

  

}
