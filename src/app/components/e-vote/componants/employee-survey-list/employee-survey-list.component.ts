import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { EVoteService } from '../../services/e-vote.service';
import { Router } from '@angular/router';
import { EVoteReportService } from '../../services/e-vote-report.service';
import { AuthService } from 'src/app/shared/service/auth.service';



@Component({
  selector: 'app-employee-survey-list',
  templateUrl: './employee-survey-list.component.html',
  styleUrls: ['./employee-survey-list.component.scss']
})
export class EmployeeSurveyListComponent implements OnInit {

  VotedEmployeeList: any[] =[];
  voteByList : any[] = [];
  employeeWiseVoteList: any = [];
  voteCountMax: number = 46;
  maxValue : number = 2;
  voterList : any[];

  constructor(
        private toastr: ToastrService,
        public commonService: CommonServiceService,
        private spinner: NgxSpinnerService,
        public evoteService: EVoteService,
        private router: Router,
        private evoteReport : EVoteReportService,
        private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.GetEmployeeSurveyVoterList();
    this.GetVotedEmployeeList();
  }

  GetVotedEmployeeList(){
    this.spinner.show();
    this.evoteService.GetVotedEmployeeList().subscribe(
      (res: any[]) => {
        this.VotedEmployeeList = res;
        this.spinner.hide();
    },(error) => {
      this.toastr.warning("Failed To Load Data", "Voted Employee List");
      this.spinner.hide();
    });
  }

  GetVoteByList(item : any){
    this.evoteService.GetVoteByList(item.employeeId).subscribe(
      (res: any[]) => {
        this.voteByList = res;
    },(error) => {this.toastr.warning("Failed To Load Data", "Vote By List");});
  }


  dataForExcel = [];
  Data = [];
  exportExcel(rowData : any) {

    this.evoteService.GetEmployeeWiseVoteList(rowData.employeeId).subscribe(
      (res: any[]) => {
        this.employeeWiseVoteList = res;

        if(this.employeeWiseVoteList.length>0){

          for (var i = 0; i < this.employeeWiseVoteList.length; i++) {
            var voteInfo = {
              employeeId: this.employeeWiseVoteList[i].employeeId,
              employeeName: this.employeeWiseVoteList[i].employeeName, 
              company: this.employeeWiseVoteList[i].company,
              department: this.employeeWiseVoteList[i].department,
              section: this.employeeWiseVoteList[i].section,
              voteBy: this.employeeWiseVoteList[i].voteBy,
              categoryName: this.employeeWiseVoteList[i].categoryName,
              comments: this.employeeWiseVoteList[i].comments,
            };
            this.Data.push(voteInfo);
          }
      
          this.Data.forEach((row: any) => {
            this.dataForExcel.push(Object.values(row));
          });
      
          let reportData = {
            title: "Employee Wise Vote Report",
            data: this.dataForExcel,
            headers: this.Data[0],
          };
          this.evoteReport.getEmployeeWiseVoteReport(reportData);
    
        }
        else{
          this.toastr.warning("Failed To Load Report", "No Vote Found");
        }

    },(error) => {this.toastr.warning("Failed To Load Data", "Vote By List");});

  }

  backToList(){
    this.router.navigate(["/e-vote/employee-survey"]);
  }


  GetEmployeeSurveyVoterList(){
    this.evoteService.GetEmployeeSurveyVoterList().subscribe(
      (res: any[]) => {
        debugger
        if(res){
          this.voterList = res;
          this.voteCountMax = this.voterList.length;
        }
    },(error) => {this.toastr.warning("Failed To Load Data", "Voter List");});
  }

}
