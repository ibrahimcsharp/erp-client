import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { MerchandisingModule } from "../merchandising/merchandising.module";
import { VoteDtlResultComponent } from "./componants/vote-dtl-result/vote-dtl-result.component";
import { VoteGiveComponent } from "./componants/vote-give/vote-give.component";
import { VoteIssueOptionsComponent } from "./componants/vote-issue-options/vote-issue-options.component";
import { VoteIssuesComponent } from "./componants/vote-issues/vote-issues.component";
import { VoteListByUserComponent } from "./componants/vote-list-by-user/vote-list-by-user.component";
import { VoteLiveDashboardComponent } from "./componants/vote-live-dashboard/vote-live-dashboard.component";
import { VoteResultsComponent } from "./componants/vote-results/vote-results.component";
import { EVoteRoutingModule } from "./e-vote-routing.module";
import { EVoteService } from "./services/e-vote.service";
import { SignalrService } from "./services/signalr.service";
import { VoteReportComponent } from './componants/vote-report/vote-report.component';
import { CarouselModule } from 'primeng/carousel';
import { EmployeeSurveyComponent } from './componants/employee-survey/employee-survey.component';
import { EmployeeSurveyListComponent } from './componants/employee-survey-list/employee-survey-list.component';
import { EmployeeSurveyVoterListComponent } from './componants/employee-survey-voter-list/employee-survey-voter-list.component';
@NgModule({
  declarations: [
    VoteIssuesComponent,
    VoteIssueOptionsComponent,
    VoteListByUserComponent,
    VoteGiveComponent,
    VoteResultsComponent,
    VoteLiveDashboardComponent,
    VoteDtlResultComponent,
    VoteReportComponent,
    EmployeeSurveyComponent,
    EmployeeSurveyListComponent,
    EmployeeSurveyVoterListComponent,
  ],
  imports: [
    CommonModule,
    MerchandisingModule,
    EVoteRoutingModule,
    CarouselModule
    //ConfirmDialogModule,
    //PaginatorModule
  ],
  entryComponents: [VoteDtlResultComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [EVoteService, ConfirmationService, SignalrService],
})
export class EVoteModule {}
