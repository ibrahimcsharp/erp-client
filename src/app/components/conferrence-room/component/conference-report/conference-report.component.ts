import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';

@Component({
  selector: 'app-conference-report',
  templateUrl: './conference-report.component.html',
  styleUrls: ['./conference-report.component.scss']
})
export class ConferenceReportComponent implements OnInit {
  MeetingReport: FormGroup;
  date = new Date();
  firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
  constructor(
    private fb: FormBuilder,
    public commonService: CommonServiceService,
    private toastr: ToastrService,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.commonService.LoadCompanyOnlySnowtexAndSara();
    this.InitializeForm();

  }

  
  InitializeForm() {
    this.MeetingReport = this.fb.group({
      yearNo: [""],
      fDate: [this.datePipe.transform(this.firstDay, "yyyy-MM-dd")],
      tDate: [this.datePipe.transform(this.lastDay, "yyyy-MM-dd")],
      companyId: [0],
      reportType: [""],
    });
  }

  onSubmit() {
    console.log('From Date');
    console.log(this.MeetingReport.value.fDate);
    console.log('To Date');
    console.log(this.MeetingReport.value.tDate);

    if(this.MeetingReport.value.reportType == ""){
      this.toastr.warning("Not Selected", "Report Type");
    }
    else if(this.MeetingReport.value.companyId == "" || this.MeetingReport.value.companyId == 0){
      this.toastr.warning("Not Selected", "Company");
    }
    else if(this.MeetingReport.value.fDate == "" || this.MeetingReport.value.fDate == undefined){
      this.toastr.warning("Not Selected", "From Date");
    }
    else if(this.MeetingReport.value.tDate == "" || this.MeetingReport.value.tDate == undefined){
      this.toastr.warning("Not Selected", "To Date");
    }
    else if (this.MeetingReport.value.reportType == 'ML') {
      this.router.navigate([]).then((result) => {
        window.open(
          "http://192.168.2.246:7778/reports/rwservlet?rpt_erp&desformat=pdf&destype=cache&P_COMPANY_ID=" +
            this.MeetingReport.value.companyId +
            "&P_DT=" +
            this.datePipe.transform(this.MeetingReport.value.fDate, "dd-MMM-yy") +
            "&P_DT2=" +
            this.datePipe.transform(this.MeetingReport.value.tDate, "dd-MMM-yy") +
            "&report=E:/reports/CONF_1001.rdf"
        );
      });
    } 
    // else if (this.MeetingReport.value.reportType == 'Out') {
    //   this.router.navigate([]).then((result) => {
    //     window.open(
    //       "http://192.168.2.246:7778/reports/rwservlet?rpt_erp&desformat=pdf&destype=cache&P_COMPANY_ID=" +
    //         this.MeetingReport.value.companyId +
    //         "&P_DT=" +
    //         this.datePipe.transform(this.MeetingReport.value.fDate, "dd-MMM-yy") +
    //         "&P_DT2=" +
    //         this.datePipe.transform(this.MeetingReport.value.tDate, "dd-MMM-yy") +
    //         "&report=E:/reports/GT_1004.rdf"
    //     );
    //   });
    // } 
    else {
      alert("Please Select Report Type");
    }


  }

}
