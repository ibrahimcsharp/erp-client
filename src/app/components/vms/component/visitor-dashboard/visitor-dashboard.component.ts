import { Component, OnInit } from '@angular/core';
import { VisitorManageService } from '../../services/visitor-manage.service';

@Component({
  selector: 'app-visitor-dashboard',
  templateUrl: './visitor-dashboard.component.html',
  styleUrls: ['./visitor-dashboard.component.scss']
})
export class VisitorDashboardComponent implements OnInit {
 
  DailyDashboardInfo:any=[];
  WeeklyDashboardInfo :any=[];
  MonthlyDashboardInfo :any=[];
  constructor(
    public service: VisitorManageService,
  ) { }

  ngOnInit(): void {
    this.GetDailyDataInfo();
     this.GetMonthlyDataInfo();
    this.GetweeklyDataInfo();
  }
  GetDailyDataInfo() {    
    //debugger
      this.service.GetDailyDataList().subscribe(
      (res: any) => {
       // console.log(res);
        this.DailyDashboardInfo = res[0];      
    
      },
      (error) => {
        this.DailyDashboardInfo = null;
      }
     );
  }
  GetMonthlyDataInfo() {
    //debugger
    this.service.GetMonthlyDataList().subscribe(
     
      (res: any) => {
       // console.log(res);
        this.MonthlyDashboardInfo = res[0];
         
      },
      (error) => {
        this.MonthlyDashboardInfo = null;
      }
    );
      
    
  }
  GetweeklyDataInfo() {
   // debugger
    this.service.GetweeklyDataList().subscribe(
      (res: any) => {
       // console.log(res);
        this.WeeklyDashboardInfo = res[0];      
  
      },
      (error) => {
        this.WeeklyDashboardInfo = null;
      }
    );
  }
}
