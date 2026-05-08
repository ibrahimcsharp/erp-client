import {CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAndActionRoutingModule } from './time-and-action-routing.module';
import { TaskEntryComponent } from './component/task-entry/task-entry.component';
import { TaskTemplateComponent } from './component/task-template/task-template.component';
import { TaskEntryListComponent } from './component/task-entry-list/task-entry-list.component';
import { TaskTemplateListComponent } from './component/task-template-list/task-template-list.component';
import { MerchandisingModule } from '../merchandising/merchandising.module';
import { TimeAndActionService } from './service/time-and-action.service';
import { CreateTnaJobComponent } from './component/create-tna-job/create-tna-job.component';
import { TnaJobListComponent } from './component/tna-job-list/tna-job-list.component';
import { TnaManualProcessComponent } from './component/tna-manual-process/tna-manual-process.component';
import { TnaProcessListComponent } from './component/tna-process-list/tna-process-list.component';
import { MaterialTnaComponent } from './component/material-tna/material-tna.component';
import { CalendarModule } from 'primeng/calendar';
import { TnaDashboardComponent } from './component/tna-dashboard/tna-dashboard.component';


@NgModule({
  declarations: [TaskEntryComponent, TaskTemplateComponent, TaskEntryListComponent, TaskTemplateListComponent, CreateTnaJobComponent, TnaJobListComponent, TnaManualProcessComponent, TnaProcessListComponent, MaterialTnaComponent, TnaDashboardComponent],
  imports: [
    CommonModule,
    MerchandisingModule,
    TimeAndActionRoutingModule,
    CalendarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [TimeAndActionService],
})
export class TimeAndActionModule { }
