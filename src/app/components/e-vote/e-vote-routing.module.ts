import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VoteGiveComponent } from "./componants/vote-give/vote-give.component";
import { VoteIssueOptionsComponent } from "./componants/vote-issue-options/vote-issue-options.component";
import { VoteIssuesComponent } from "./componants/vote-issues/vote-issues.component";
import { VoteListByUserComponent } from "./componants/vote-list-by-user/vote-list-by-user.component";
import { VoteLiveDashboardComponent } from "./componants/vote-live-dashboard/vote-live-dashboard.component";
import { VoteReportComponent } from "./componants/vote-report/vote-report.component";
import { EmployeeSurveyComponent } from "./componants/employee-survey/employee-survey.component";
import { EmployeeSurveyListComponent } from "./componants/employee-survey-list/employee-survey-list.component";
import { EmployeeSurveyVoterListComponent } from "./componants/employee-survey-voter-list/employee-survey-voter-list.component";

const routes: Routes = [
  {
    path: "e-vote-create",
    component: VoteIssuesComponent,
    data: {
      title: "",
      breadcrumb: "e-vote-create",
    },
  },
  {
    path: "e-vote-list",
    component: VoteIssueOptionsComponent,
    data: {
      title: "",
      breadcrumb: "e-vote-list",
    },
  },
  {
    path: "e-vote-list-user",
    component: VoteListByUserComponent,
    data: {
      title: "",
      breadcrumb: "e-vote-list-user",
    },
  },
  {
    path: "go-for-voting",
    children: [{ path: "edit/:id", component: VoteGiveComponent }],
    data: {
      title: "",
      breadcrumb: "go-for-voting",
    },
  },
  {
    path: "go-for-editing",
    children: [{ path: "edit/:id", component: VoteIssuesComponent }],
    data: {
      title: "",
      breadcrumb: "go-for-editing",
    },
  },
  {
    path: "live-voting",
    children: [{ path: "edit/:id", component: VoteLiveDashboardComponent }],
    data: {
      title: "",
      breadcrumb: "live-voting",
    },
  },
  {
    path: "vote-report",
    component: VoteReportComponent,
    data: {
      title: "E-Vote Report",
      breadcrumb: "vote-report",
    },
  },

  {
    path: "employee-survey",
    component: EmployeeSurveyComponent,
    data: {
      title: "Employee Survey",
      breadcrumb: "employee-survey",
    },
  },

  {
    path: "employee-survey-list",
    component: EmployeeSurveyListComponent,
    data: {
      title: "Employee Survey List",
      breadcrumb: "employee-survey-list",
    },
  },

  {
    path: "employee-survey-voter-list",
    component: EmployeeSurveyVoterListComponent,
    data: {
      title: "Employee Survey Voter List",
      breadcrumb: "employee-survey-voter-list",
    },
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EVoteRoutingModule {}
