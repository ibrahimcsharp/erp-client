import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcamModule } from 'ngx-webcam';
import { VisitorManageRoutingModule } from './visitor-manage-routing.module';
import { MerchandisingModule } from '../merchandising/merchandising.module';
import { VisitorManageService } from './services/visitor-manage.service';
import { VisitorInfoComponent } from './component/visitor-info/visitor-info.component';
import { VisitorInfoPictureComponent } from './component/visitor-info-picture/visitor-info-picture.component';
import { VisitorInfoCardNoComponent } from './component/visitor-info-card-no/visitor-info-card-no.component';
import { VisitorInfoConfirmComponent } from './component/visitor-info-confirm/visitor-info-confirm.component';
import { VisitorInfoListComponent } from './component/visitor-info-list/visitor-info-list.component';
import { VisitorIndividualInfoListComponent } from './component/visitor-individual-info-list/visitor-individual-info-list.component';
import { VisitorDashboardComponent } from './component/visitor-dashboard/visitor-dashboard.component';
import { VisitorBarChartComponent } from './component/visitor-bar-chart/visitor-bar-chart.component';
import { VisitorFrequentComponent } from './component/visitor-frequent/visitor-frequent.component';
import { VisitorReportComponent } from './component/visitor-report/visitor-report.component';
import { VisitorReportAllComponent } from './component/visitor-report-all/visitor-report-all.component';
import { VisitorWebcamComponent } from './component/visitor-webcam/visitor-webcam.component';
import { VisitorWebcamUpdateComponent } from './component/visitor-webcam-update/visitor-webcam-update.component';
import { HttpClientModule } from '@angular/common/http';
import { VisitorWelcomeComponent } from './component/visitor-welcome/visitor-welcome.component';



@NgModule({
  declarations: [VisitorInfoComponent,    
    VisitorInfoPictureComponent, 
    VisitorInfoCardNoComponent,    
    VisitorInfoConfirmComponent, 
    VisitorInfoListComponent, 
    VisitorIndividualInfoListComponent, 
    VisitorDashboardComponent, 
    VisitorBarChartComponent, 
    VisitorFrequentComponent, 
    VisitorReportComponent, 
    VisitorReportAllComponent,
    VisitorWebcamComponent,
    VisitorWebcamUpdateComponent,
    VisitorWelcomeComponent,
    ],
  imports: [
    CommonModule,
    MerchandisingModule,
    VisitorManageRoutingModule,
    HttpClientModule,
    WebcamModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [VisitorManageService],
})
export class VisitorManageModule { }
