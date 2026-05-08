import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { AuthService } from 'src/app/shared/service/auth.service';
@Component({
  selector: 'app-bill-report',
  templateUrl: './bill-report.component.html',
  styleUrls: ['./bill-report.component.scss']
})
export class BillReportComponent implements OnInit {
  BillReport: FormGroup;
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
    this.commonService.LoadCompany();
    this.commonService.LoadBuyerList();
  }
  InitializeForm() {
    this.BillReport = this.fb.group({
      reportType: ["",Validators.required],
      companyId: ["",Validators.required],  
      fDate: [this.datePipe.transform(this.firstDay, "yyyy-MM-dd")],
      tDate: [this.datePipe.transform(this.lastDay, "yyyy-MM-dd")],
      companyName: [""],
      transportCompany: [""],
      buyerName: [""],
      billingMonth: [""],    
    });
  }
  onReportTypeChange(event: any) {
    this.BillReport.get('reportType').valueChanges.subscribe((value) => {
      // Reset another form field when reportType value changes
     
        this.BillReport.get('transportCompany').setValue('');
    });
  }

  onSubmit() {
    if(this.BillReport.value.reportType == "EXPORT"){
      if(this.BillReport.value.fDate == "" || this.BillReport.value.fDate == undefined){
        this.toastr.warning("Not Selected", "From Date");
      }
      else if(this.BillReport.value.tDate == "" || this.BillReport.value.tDate == undefined){
        this.toastr.warning("Not Selected", "To Date");
      }        
      else {
        var ss = this.datePipe.transform(this.BillReport.value.fDate, "dd-MMM-yyyy");
        console.log("This Value", this.BillReport.value.buyerName)
        this.router.navigate([]).then((result) => {
          window.open(
            "http://192.168.2.246:7778/reports/rwservlet?rpt_erp&desformat=pdf&destype=cache&P_COMPANY_ID="+
              this.BillReport.value.companyId+
              "&P_FROM_DATE=" +
              this.datePipe.transform(this.BillReport.value.fDate, "dd-MMM-yyyy") +
              "&P_TO_DATE=" +
              this.datePipe.transform(this.BillReport.value.tDate, "dd-MMM-yyyy") +
              "&P_BILLING_MONTH="+
              this.BillReport.value.billingMonth+
              "&P_TRANSPORT_COMPANY="+
              this.BillReport.value.transportCompany+
              "&P_COMPANY_NAME=" + 
              "&P_BUYER_NAME="+
              this.BillReport.value.buyerName+
              "&report=E:/reports/TMS_EXP_001.rdf"
          );
        });
      }
    }else if(this.BillReport.value.reportType == "IMPORT"){
      this.router.navigate([]).then((result) => {
        window.open(
          "http://192.168.2.246:7778/reports/rwservlet?rpt_erp&desformat=pdf&destype=cache&P_COMPANY_ID="+
            this.BillReport.value.companyId+
            "&P_FROM_DATE=" +
            this.datePipe.transform(this.BillReport.value.fDate, "dd-MMM-yyyy") +
            "&P_TO_DATE=" +
            this.datePipe.transform(this.BillReport.value.tDate, "dd-MMM-yyyy") +
            "&P_BILLING_MONTH="+
            this.BillReport.value.billingMonth+
            "&P_TRANSPORT_COMPANY="+
            this.BillReport.value.transportCompany+
            "&P_COMPANY_NAME=" + 
            "&P_BUYER_NAME="+
            this.BillReport.value.buyerName+
            "&report=E:/reports/TMS_IMP_001.rdf"
        );
      });
    }

  }
}
