import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitorBarChartComponent } from './component/visitor-bar-chart/visitor-bar-chart.component';
import { VisitorDashboardComponent } from './component/visitor-dashboard/visitor-dashboard.component';
import { VisitorFrequentComponent } from './component/visitor-frequent/visitor-frequent.component';
import { VisitorIndividualInfoListComponent } from './component/visitor-individual-info-list/visitor-individual-info-list.component';
import { VisitorInfoCardNoComponent } from './component/visitor-info-card-no/visitor-info-card-no.component';
import { VisitorInfoConfirmComponent } from './component/visitor-info-confirm/visitor-info-confirm.component';
import { VisitorInfoListComponent } from './component/visitor-info-list/visitor-info-list.component';
import { VisitorInfoPictureComponent } from './component/visitor-info-picture/visitor-info-picture.component';
import { VisitorInfoComponent } from './component/visitor-info/visitor-info.component';
import { VisitorReportAllComponent } from './component/visitor-report-all/visitor-report-all.component';
import { VisitorReportComponent } from './component/visitor-report/visitor-report.component';
import { VisitorWebcamUpdateComponent } from './component/visitor-webcam-update/visitor-webcam-update.component';
import { VisitorWebcamComponent } from './component/visitor-webcam/visitor-webcam.component';
import { VisitorWelcomeComponent } from './component/visitor-welcome/visitor-welcome.component';


const routes: Routes = [
  {
    path: "visitor-info",
    component: VisitorInfoComponent,
    data: {
      title: "",
      breadcrumb: "visitor-info",
    },
  },
  {
    path: "visitor-info-card-no/:id",
    component: VisitorInfoCardNoComponent,
    data: {
      title: "",
      breadcrumb: "visitor-info-card-no",
    },
  },
  {
    path: "app-visitor-info-confirm",
    component: VisitorInfoConfirmComponent,
    data: {
      title: "",
      breadcrumb: "app-visitor-info-confirm",
    },
  },
  {
    path: "visitor-info-list",
    component: VisitorInfoListComponent,
    data: {
      title: "",
      breadcrumb: "visitor-info-list",
    },
  },
  {
    path: "visitor-individual-info-list",
    component: VisitorIndividualInfoListComponent,
    data: {
      title: "",
      breadcrumb: "visitor-individual-info-list",
    },
  },
  {
    path: "visitor-dashboard",
    component: VisitorDashboardComponent,
    data: {
      title: "",
      breadcrumb: "visitor-dashboard",
    },
  },
  {
    path: "visitor-barchart",
    component: VisitorBarChartComponent,
    data: {
      title: "",
      breadcrumb: "visitor-barchart",
    },
  },
  {
    path: "visitor-frequent",
    component: VisitorFrequentComponent,
    data: {
      title: "",
      breadcrumb: "visitor-frequent",
    },
  },
  {
    path: "visitor-report",
    component: VisitorReportComponent,
    data: {
      title: "",
      breadcrumb: "visitor-report",
    },
  },
  {
    path: "all-visitor-report",
    component: VisitorReportAllComponent,
    data: {
      title: "",
      breadcrumb: "all-visitor-report",
    },
  },
  {
    path: "visitor-webcam",
    component:   VisitorWebcamComponent
    ,
    data: {
      title: "",
      breadcrumb: "all-visitor-report",
    },
  },
  {
    path: "visitor-picture",
    component:   VisitorInfoPictureComponent
    ,
    data: {
      title: "",
      breadcrumb: "visitor-picture",
    },
  },  
  {
    path: "visitor-webcam-update",
    component:   VisitorWebcamUpdateComponent
    ,
    data: {
      title: "",
      breadcrumb: "visitor-webcam-update",
    },
  }, 
  {
    path: "visitor-welcome",
    component:   VisitorWelcomeComponent
    ,
    data: {
      title: "",
      breadcrumb: "visitor-welcome",
    },
  },  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorManageRoutingModule { }
