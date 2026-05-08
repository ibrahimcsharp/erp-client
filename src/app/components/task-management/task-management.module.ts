import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ModalModule } from "ngx-bootstrap/modal";
import { SharedModule } from "primeng/api";
import { MerchandisingModule } from "../merchandising/merchandising.module";
import { TaskManagementRoutingModule } from "./task-management-routing.module";
import { TaskCentralDashboardComponent } from './component/dashboard/task-central-dashboard/task-central-dashboard.component';
import { TaskSubmissionCreateComponent } from './component/employee-section/task-submission/task-submission-create/task-submission-create.component';
import { TaskSubmissionListComponent } from './component/employee-section/task-submission/task-submission-list/task-submission-list.component';
import { TreeGridModule } from "@syncfusion/ej2-angular-treegrid";
import { TaskDetailInfoComponent } from './component/employee-section/task-submission/task-detail-info/task-detail-info.component';
import { TaskPendingListComponent } from './component/service-provider/task-pending-list/task-pending-list.component';
import { TaskToDoListComponent } from './component/service-provider/task-to-do-list/task-to-do-list.component';
import { ServiceProviderDashboardComponent } from './component/service-provider/service-provider-dashboard/service-provider-dashboard.component';
import { TaskProgressUpdateComponent } from './component/service-provider/task-progress-update/task-progress-update.component';
import { TaskCommentCreateComponent } from './component/service-provider/task-comment-create/task-comment-create.component';
import { TaskCommentListComponent } from './component/service-provider/task-comment-list/task-comment-list.component';
import { TaskCommentComponent } from './component/service-provider/task-comment/task-comment.component';
import { TaskDoneListComponent } from './component/service-provider/task-done-list/task-done-list.component';
import { TreeviewModule } from 'ngx-treeview';
import {TreeTableModule} from 'primeng/treetable';
import { PendingDepartmentTaskComponent } from './component/dashboard/department/pending-department-task/pending-department-task.component';
import { OngoingDepartmentTaskComponent } from './component/dashboard/department/ongoing-department-task/ongoing-department-task.component';
import { DoneDepartmentTaskComponent } from './component/dashboard/department/done-department-task/done-department-task.component';
import { DepartmentDashboardComponent } from './component/dashboard/department/department-dashboard/department-dashboard.component';
import { AssignTaskComponent } from './component/dashboard/department/assign-task/assign-task.component';
import { SpHomeComponent } from './component/service-provider/sp-home/sp-home.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { DepartmentTaskHomeComponent } from './component/dashboard/department/department-task-home/department-task-home.component'; 
import {MatExpansionModule} from '@angular/material/expansion';
import { SpCurrentStatusComponent } from './component/service-provider/sp-current-status/sp-current-status.component'; 
import { TabsetConfig } from 'ngx-bootstrap/tabs';
import { AssignTaskExternalComponent } from './component/dashboard/department/assign-task-external/assign-task-external.component';
import { FormsModule } from "@angular/forms";
import { GalleriaModule } from "primeng/galleria";
import { TaskSubmissionCreatePopupComponent } from './component/employee-section/task-submission/task-submission-create-popup/task-submission-create-popup.component';
import { TaskReportComponent } from './component/report/task-report/task-report.component';
import { TeamSetupComponent } from './component/team-setup/team-setup.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ModalModule.forRoot(),
        TaskManagementRoutingModule,
        MerchandisingModule,
        TreeGridModule,
        TreeTableModule,
        TreeviewModule.forRoot(),
        DragDropModule,
        MatExpansionModule,
        FormsModule,
        GalleriaModule
      
    ],
    declarations: [
        TaskCentralDashboardComponent,
        TaskSubmissionCreateComponent,
        TaskSubmissionListComponent,
        TaskDetailInfoComponent,
        TaskPendingListComponent,
        TaskToDoListComponent,
        ServiceProviderDashboardComponent,
        TaskProgressUpdateComponent,
        TaskCommentCreateComponent,
        TaskCommentListComponent,
        TaskCommentComponent,
        TaskDoneListComponent,
        PendingDepartmentTaskComponent,
        OngoingDepartmentTaskComponent,
        DoneDepartmentTaskComponent,
        DepartmentDashboardComponent,
        AssignTaskComponent,
        SpHomeComponent,
        DepartmentTaskHomeComponent,
        SpCurrentStatusComponent,
        AssignTaskExternalComponent,
        TaskSubmissionCreatePopupComponent,
        TaskReportComponent,
        TeamSetupComponent
    ],
    entryComponents: [        
        TaskDetailInfoComponent,
        TaskProgressUpdateComponent,
        TaskCommentComponent,
        TaskCommentCreateComponent,
        TaskCommentListComponent,
        AssignTaskComponent,
        TaskSubmissionCreateComponent,
        AssignTaskExternalComponent,
        TaskSubmissionCreatePopupComponent
    ],
})
export class TaskManagementModule { }