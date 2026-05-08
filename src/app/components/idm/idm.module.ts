import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdmRoutingModule } from './idm-routing.module';
import { TrainingEntryComponent } from './component/setting/training-entry/training-entry.component';
import { JobDesEntryComponent } from './component/setting/job-des-entry/job-des-entry.component';
import { DashBoardComponent } from './component/dash-board/dash-board.component';
import { IdmService } from './service/idm.service';
import { MerchandisingModule } from '../merchandising/merchandising.module';
import { VisionMissionComponent } from './component/vision-mission/vision-mission.component';
import { VisionMissionListComponent } from './component/vision-mission-list/vision-mission-list.component';
import { MissionApproveComponent } from './component/mission-approve/mission-approve.component';
import { TrainingRequisitionComponent } from './component/training-requisition/training-requisition.component';
import { TrainingScheduleComponent } from './component/training-schedule/training-schedule.component';
import { TrainingApproveComponent } from './component/training-approve/training-approve.component';
import { TrainingFeedbackComponent } from './component/training-feedback/training-feedback.component';
import { PleasureDispleasureComponent } from './component/pleasure-displeasure/pleasure-displeasure.component';
import { PleasureDispleasureCmtComponent } from './component/pleasure-displeasure-cmt/pleasure-displeasure-cmt.component';
import { IndividualMeetingComponent } from './component/individual-meeting/individual-meeting.component';
import { SkillPlanComponent } from './component/skill-plan/skill-plan.component';
import { SkillPlanCourseComponent } from './component/skill-plan-course/skill-plan-course.component';
import { KpiEntryComponent } from './component/kpi/kpi-entry/kpi-entry.component';
import { IdmPermissionGroupComponent } from './component/idm-permission-group/idm-permission-group.component';
import { TeamLeadManagementComponent } from './component/team-lead-management/team-lead-management.component';
import { KpiAssignComponent } from './component/kpi/kpi-assign/kpi-assign.component';
import { ChartModule } from 'primeng/chart';
import { EmployeeWizeManagementComponent } from './component/employee-wize-management/employee-wize-management.component';
import { AddTraineeComponent } from './component/add-trainee/add-trainee.component';
import { KpiDetailsEntryComponent } from './component/kpi/kpi-details-entry/kpi-details-entry.component';
import { TrainingFileUploadComponent } from './component/training-file-upload/training-file-upload.component';

@NgModule({
  declarations: [TrainingEntryComponent, JobDesEntryComponent, DashBoardComponent, VisionMissionComponent, VisionMissionListComponent, MissionApproveComponent, TrainingRequisitionComponent, TrainingScheduleComponent, TrainingApproveComponent, TrainingFeedbackComponent, PleasureDispleasureComponent, PleasureDispleasureCmtComponent, IndividualMeetingComponent, SkillPlanComponent, SkillPlanCourseComponent, KpiEntryComponent, IdmPermissionGroupComponent, TeamLeadManagementComponent, KpiAssignComponent, EmployeeWizeManagementComponent, AddTraineeComponent, KpiDetailsEntryComponent, TrainingFileUploadComponent],
  imports: [
    CommonModule,
    IdmRoutingModule,
    MerchandisingModule,
    ChartModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [IdmService],
})
export class IdmModule { }
