import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EVoteService } from '../../services/e-vote.service';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-employee-survey-voter-list',
  templateUrl: './employee-survey-voter-list.component.html',
  styleUrls: ['./employee-survey-voter-list.component.scss']
})
export class EmployeeSurveyVoterListComponent implements OnInit {
  voterList : any[] = [];
  myVoteList: any[];

  constructor(
    private toastr: ToastrService,
    public evoteService: EVoteService,
     private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.GetEmployeeSurveyVoterList();
  }

  GetEmployeeSurveyVoterList(){
    this.evoteService.GetEmployeeSurveyVoterList().subscribe(
      (res: any[]) => {
        debugger
        this.voterList = res;
    },(error) => {this.toastr.warning("Failed To Load Data", "Voter List");});
  }


  GetMyVoteCount(employeeId: any) {
    this.evoteService.GetMyVoteCount(employeeId).subscribe(
      (res: any[]) => {
        debugger
        this.myVoteList = res;
      }, (error) => { this.toastr.warning("Failed To Load Data", "My Vote List"); });
  }

}
