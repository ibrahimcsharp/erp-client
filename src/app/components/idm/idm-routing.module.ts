import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashBoardComponent } from './component/dash-board/dash-board.component';
import { IndividualMeetingComponent } from './component/individual-meeting/individual-meeting.component';
import { MissionApproveComponent } from './component/mission-approve/mission-approve.component';
import { PleasureDispleasureCmtComponent } from './component/pleasure-displeasure-cmt/pleasure-displeasure-cmt.component';
import { PleasureDispleasureComponent } from './component/pleasure-displeasure/pleasure-displeasure.component';
import { JobDesEntryComponent } from './component/setting/job-des-entry/job-des-entry.component';
import { TrainingEntryComponent } from './component/setting/training-entry/training-entry.component';
import { SkillPlanCourseComponent } from './component/skill-plan-course/skill-plan-course.component';
import { SkillPlanComponent } from './component/skill-plan/skill-plan.component';
import { TrainingApproveComponent } from './component/training-approve/training-approve.component';
import { TrainingFeedbackComponent } from './component/training-feedback/training-feedback.component';
import { TrainingRequisitionComponent } from './component/training-requisition/training-requisition.component';
import { TrainingScheduleComponent } from './component/training-schedule/training-schedule.component';
import { VisionMissionListComponent } from './component/vision-mission-list/vision-mission-list.component';
import { VisionMissionComponent } from './component/vision-mission/vision-mission.component';
import { KpiEntryComponent } from './component/kpi/kpi-entry/kpi-entry.component';
import { IdmPermissionGroupComponent } from './component/idm-permission-group/idm-permission-group.component';
import { TeamLeadManagementComponent } from './component/team-lead-management/team-lead-management.component';
import { KpiAssignComponent } from './component/kpi/kpi-assign/kpi-assign.component';
import { EmployeeWizeManagementComponent } from './component/employee-wize-management/employee-wize-management.component';
import { AddTraineeComponent } from './component/add-trainee/add-trainee.component';
import { KpiDetailsEntryComponent } from './component/kpi/kpi-details-entry/kpi-details-entry.component';
import { TrainingFileUploadComponent } from './component/training-file-upload/training-file-upload.component';


const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "training-entry",
        component: TrainingEntryComponent,
        data: {
          title: "Training Entry",
          breadcrumb: "training-entry",
        },
      },
      {
        path: "job-description-entry",
        component: JobDesEntryComponent,
        data: {
          title: "Job Description",
          breadcrumb: "job-description-entry",
        },
      },
      {
        path: "idm-dashboard",
        component: DashBoardComponent,
        data: {
          title: "Idm Dashboard",
          breadcrumb: "idm-dashboard",
        },
      },
      {
        path: "idm-vission-mission",
        component: VisionMissionComponent,
        data: {
          title: "Vission Mission",
          breadcrumb: "idm-vission-mission",
        },
      },
      {
        path: "idm-vission-mission-list",
        component: VisionMissionListComponent,
        data: {
          title: "Vission List",
          breadcrumb: "idm-vission-mission-list",
        },
      },
      {
        path: "mission-approve",
        component: MissionApproveComponent,
        data: {
          title: "Mission Approve",
          breadcrumb: "mission-approve",
        },
      },
      {
        path: "training-requisition",
        component: TrainingRequisitionComponent,
        data: {
          title: "Training Requisition",
          breadcrumb: "training-requisition",
        },
      },

      {
        path: "training-requisition-schedule",
        component: TrainingScheduleComponent,
        data: {
          title: "Training Schedule",
          breadcrumb: "training-requisition-schedule",
        },
      },
      {
        path: "training-approve",
        component: TrainingApproveComponent,
        data: {
          title: "Training Approve",
          breadcrumb: "training-approve",
        },
      },
      {
        path: "training-feedback",
        component: TrainingFeedbackComponent,
        data: {
          title: "Training Feedback",
          breadcrumb: "training-feedback",
        },
      },
      {
        path: "pleasure-displasure",
        component: PleasureDispleasureComponent,
        data: {
          title: "Pleasure & Displeasure",
          breadcrumb: "pleasure-displasure",
        },
      },
      {
        path: "pleasure-displasure-cmt",
        component: PleasureDispleasureCmtComponent,
        data: {
          title: "Manager Comment",
          breadcrumb: "pleasure-displasure-cmt",
        },
      },
      {
        path: "individual-meeting",
        component: IndividualMeetingComponent,
        data: {
          title: "Idm Meeting",
          breadcrumb: "individual-meeting",
        },
      },
      {
        path: "skill-plan",
        component: SkillPlanComponent,
        data: {
          title: "Skill Plan",
          breadcrumb: "skill-plan",
        },
      },
      
      {
        path: "skill-plan-training",
        component: SkillPlanCourseComponent,
        data: {
          title: "Skill Plan Training",
          breadcrumb: "skill-plan-training",
        },
      },

      {
        path: "kpi-entry",
        component: KpiEntryComponent,
        data: {
          title: "KPI Entry",
          breadcrumb: "kpi-entry",
        },
      },
      
      {
        path: "kpi-assign",
        component: KpiAssignComponent,
        data: {
          title: "KPI-Assign",
          breadcrumb: "kpi-assign",
        },
      },
      
      {
        path: "idm-permission-group",
        component: IdmPermissionGroupComponent,
        data: {
          title: "IDM-Permission-Group",
          breadcrumb: "idm-permission-group",
        },
      },

      {
        path: "idm-team-lead",
        component: TeamLeadManagementComponent,
        data: {
          title: "IDM-Team-Lead",
          breadcrumb: "idm-team-lead",
        },
      },

      {
        path: "employee-wize-management",
        component: EmployeeWizeManagementComponent,
        data: {
          title: "Employee-Wize-Management",
          breadcrumb: "employee-wize-management",
        },
      },

      {
        path: "add-trainee",
        component: AddTraineeComponent,
        data: {
          title: "Add Trainee",
          breadcrumb: "add-trainee",
        },
      },
      {
        path: "kpi-details-entry",
        component: KpiDetailsEntryComponent,
        data: {
          title: "Kpi-Details-Entry",
          breadcrumb: "kpi-details-entry",
        },
      },
      {
        path: "training-file-upload",
        component: TrainingFileUploadComponent,
        data: {
          title: "training-file-upload",
          breadcrumb: "training-file-upload",
        },
      },
  
    ]
      },
    ]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdmRoutingModule { }
