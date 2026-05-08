import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConferenceMeetingListComponent } from './component/conference-meeting-list/conference-meeting-list.component';
import { ConferenceReportComponent } from './component/conference-report/conference-report.component';
import { ConferenceRequitionListComponent } from './component/conference-requition-list/conference-requition-list.component';
import { ConferenceRequitionComponent } from './component/conference-requition/conference-requition.component';
import { MeetingCalendarComponent } from './component/meeting-calendar/meeting-calendar.component';


const routes: Routes = [
  {
    path: "conference-requisition",
    component: ConferenceRequitionComponent,
    data: {
      title: "",
      breadcrumb: "conference-requisition",
    },
  },
  {
    path: "conference-requisition-list",
    component: ConferenceRequitionListComponent,
    data: {
      title: "",
      breadcrumb: "conference-requisition-list",
    },
  },
  {
    path: "meeting-calendar",
    component: MeetingCalendarComponent,
    data: {
      title: "",
      breadcrumb: "meeting-calendar",
    },
  },
  {
    path: "meeting-list",
    component: ConferenceMeetingListComponent,
    data: {
      title: "",
      breadcrumb: "meeting-list",
    },
  },
  {
    path: "conference-report",
    component: ConferenceReportComponent,
    data: {
      title: "",
      breadcrumb: "conference-report",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConferrenceRoutingModule { }
