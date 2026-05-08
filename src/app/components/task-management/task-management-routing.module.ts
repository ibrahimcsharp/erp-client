import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DepartmentDashboardComponent } from "./component/dashboard/department/department-dashboard/department-dashboard.component";
import { DoneDepartmentTaskComponent } from "./component/dashboard/department/done-department-task/done-department-task.component";
import { OngoingDepartmentTaskComponent } from "./component/dashboard/department/ongoing-department-task/ongoing-department-task.component";
import { PendingDepartmentTaskComponent } from "./component/dashboard/department/pending-department-task/pending-department-task.component";
import { TaskCentralDashboardComponent } from "./component/dashboard/task-central-dashboard/task-central-dashboard.component";
import { TaskSubmissionListComponent } from "./component/employee-section/task-submission/task-submission-list/task-submission-list.component";
import { ServiceProviderDashboardComponent } from "./component/service-provider/service-provider-dashboard/service-provider-dashboard.component";
import { SpHomeComponent } from "./component/service-provider/sp-home/sp-home.component";
import { TaskDoneListComponent } from "./component/service-provider/task-done-list/task-done-list.component";
import { TaskPendingListComponent } from "./component/service-provider/task-pending-list/task-pending-list.component";
import { TaskToDoListComponent } from "./component/service-provider/task-to-do-list/task-to-do-list.component";
import { DepartmentTaskHomeComponent } from "./component/dashboard/department/department-task-home/department-task-home.component";
import { TaskReportComponent } from "./component/report/task-report/task-report.component";
import { TeamSetupComponent } from "./component/team-setup/team-setup.component";

const routes: Routes = [
    {
      path: "",
      children: [
        {
          path: "task-central-dashboard",
          component: TaskCentralDashboardComponent,
          data: {
            breadcrumb: "task-central-dashboard",
          },
        },  
        {
          path: "task-submission",
          component: TaskSubmissionListComponent,
          data: {
            breadcrumb: "task-submission",
          },
        },  
        {
          path: "sp-dashboard",
          component: ServiceProviderDashboardComponent,
          data: {
            breadcrumb: "service-provider-dashboard",
          },
        },  
        {
          path: "task-department-dashboard",
          component: DepartmentDashboardComponent,
          data: {
            breadcrumb: "task-department-dashboard",
          },
        },  
        {
          path: "sp-pending-task",
          component: TaskPendingListComponent,
          data: {
            breadcrumb: "sp-pending-task",
          },
        },  
        {
          path: "sp-to-do-task",
          component: TaskToDoListComponent,
          data: {
            breadcrumb: "sp-to-do-task",
          },
        },  
        {
          path: "sp-done-task",
          component: TaskDoneListComponent,
          data: {
            breadcrumb: "sp-done-task",
          },
        },  
        {
          path: "department-pending-task",
          component:PendingDepartmentTaskComponent,
          data: {
            breadcrumb: "department-pending-task",
          },
        },  
        {
          path: "department-ongoing-task",
          component: OngoingDepartmentTaskComponent,
          data: {
            breadcrumb: "department-ongoing-task",
          },
        },  
        {
          path: "department-done-task",
          component: DoneDepartmentTaskComponent,
          data: {
            breadcrumb: "department-done-task",
          },
        },  
        {
          path: "service-provider-home",
          component: SpHomeComponent,
          data: {
            breadcrumb: "service-provider-home",
          },
        },  
        {
          path: "department-task-home",
          component: DepartmentTaskHomeComponent,
          data: {
            breadcrumb: "department-task-home",
          },
        },  
        {
          path: "task-report",
          component: TaskReportComponent,
          data: {
            breadcrumb: "task-report",
          },
        },  


        {
          path: "team-setup",
          component: TeamSetupComponent,
          data: {
            breadcrumb: "team-setup",
          },
        }, 
      ],
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class TaskManagementRoutingModule {}