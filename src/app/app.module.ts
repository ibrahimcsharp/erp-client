import { DatePipe, DecimalPipe } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { JwtModule } from "@auth0/angular-jwt";
import { PdfExportService } from "@syncfusion/ej2-angular-treegrid";
import { DataTablesModule } from "angular-datatables";
import { ModalModule } from "ngx-bootstrap/modal";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { ToastrModule } from "ngx-toastr";
import { WebcamModule } from "ngx-webcam"; 
import { ConfirmationService, MessageService } from "primeng/api";
import { DialogService, DynamicDialogConfig } from "primeng/dynamicdialog";
import { PanelModule } from "primeng/panel";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
//import { AccountingModule } from "./components/accounting/accounting.module";
import { AuthModule } from "./components/auth/auth.module";
import { MeetingCalendarComponent } from "./components/conferrence-room/component/meeting-calendar/meeting-calendar.component";
import { ConferrenceModule } from "./components/conferrence-room/conferrence.module";
import { EVoteModule } from "./components/e-vote/e-vote.module";
// import { UnitLookupService } from './components/lookup/hrm/unit/unit-lookup.service';
// import { DepartmentLookupService } from './components/lookup/hrm/department/department-lookup.service';
// import { SectionLookupService } from './components/lookup/hrm/section/section-lookup.service';
import { MerchandisingModule } from "./components/merchandising/merchandising.module";
import { MmsModule } from "./components/mms/mms.module";
import { SettingModule } from "./components/setting/setting.module";
import { TmsModule } from "./components/tms/tms.module";
//import { TmsModule } from "./components/tms/tms.module";
import { MaterialModule } from "./material/material.module";
import { TwoDigitDecimalDirective } from "./shared/directives/two-digit-decimal.directive";
import { SpinnerService } from "./shared/service/spinner.service";
import { SharedModule } from "./shared/shared.module";
import { TreeModule } from "primeng/tree";
import { CheckboxModule } from "primeng/checkbox";



export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [AppComponent, TwoDigitDecimalDirective],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    AppRoutingModule,
    SharedModule,
    MaterialModule,
    PanelModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    MerchandisingModule,
    AuthModule,
    // LookupModule,
    DataTablesModule,
    FormsModule,
    HttpClientModule,
    EVoteModule,
    //AccountingModule,
    MmsModule,
    TmsModule,
    SettingModule,
    WebcamModule,
    TreeModule,
    CheckboxModule,
   
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ["localhost:50297"],
        blacklistedRoutes: ["localhost:50297/api/auth"],
      },
    }),
  ],
  providers: [
    SpinnerService,
    DialogService,
    DynamicDialogConfig,
    // UnitLookupService,
    // DepartmentLookupService,
    // SectionLookupService,
    PdfExportService,
    DatePipe,
    MessageService,
    ConfirmationService,
    DecimalPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
