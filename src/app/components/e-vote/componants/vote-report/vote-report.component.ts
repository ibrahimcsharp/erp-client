import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-vote-report',
  templateUrl: './vote-report.component.html',
  styleUrls: ['./vote-report.component.scss']
})
export class VoteReportComponent implements OnInit {
  VoteReport: FormGroup;
  date = new Date();
  firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
  EmployeeId:string;
  constructor(
    private fb: FormBuilder,
    public commonService: CommonServiceService,
    private toastr: ToastrService,
    private router: Router,
    private datePipe: DatePipe,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.InitializeForm();
  }
  InitializeForm() {
    this.VoteReport = this.fb.group({
      fDate: [this.datePipe.transform(this.firstDay, "yyyy-MM-dd")],
      tDate: [this.datePipe.transform(this.lastDay, "yyyy-MM-dd")],      
    });
  }

  onSubmit() {
    debugger
    console.log('From Date');
    console.log(this.VoteReport.value.fDate);
    console.log('To Date');
    console.log(this.VoteReport.value.tDate);

    if(this.VoteReport.value.fDate == "" || this.VoteReport.value.fDate == undefined){
      this.toastr.warning("Not Selected", "From Date");
    }
    else if(this.VoteReport.value.tDate == "" || this.VoteReport.value.tDate == undefined){
      this.toastr.warning("Not Selected", "To Date");
    }        
    else {
      debugger
      var ss = this.datePipe.transform(this.VoteReport.value.fDate, "dd-MMM-yyyy");
      this.router.navigate([]).then((result) => {
        window.open(
          "http://192.168.2.246:7778/reports/rwservlet?rpt_erp&desformat=pdf&destype=cache&P_FROM_DATE=" +
            this.datePipe.transform(this.VoteReport.value.fDate, "dd-MMM-yyyy") +
            "&P_TO_DATE=" +
            this.datePipe.transform(this.VoteReport.value.tDate, "dd-MMM-yyyy") +
            "&P_COMPANY_ID=2&report=E:/reports/EVOTE_001.rdf"


            //http://192.168.2.246:7778/reports/rwservlet?rpt_erp&desformat=pdf&destype=cache&P_FROM_DATE=6-feb-2022&P_TO_DATE=22-jun-2023&P_COMPANY_ID=2&report=E:/reports/EVOTE_001.rdf
        );
      });
    }


  }
}
