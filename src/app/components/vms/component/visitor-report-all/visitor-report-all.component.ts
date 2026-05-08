import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/service/auth.service';
import { VisitorManageService } from '../../services/visitor-manage.service';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';


@Component({
  selector: 'app-visitor-report-all',
  templateUrl: './visitor-report-all.component.html',
  styleUrls: ['./visitor-report-all.component.scss']
})
export class VisitorReportAllComponent implements OnInit {
  VisitingReportForm: FormGroup;
  onlyMissionApprovedListForAll: any[];
  companyTypeDropDownList: any[] = [];
  onlyApprovedList: any[];
  date = new Date();
  firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
  //firstDay = new Date(this.date.getFullYear(), this.date.getMonth());
  //lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
  //lastDay = new Date(this.date.getFullYear(), this.date.getMonth());

  constructor(
    public service: VisitorManageService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private datePipe: DatePipe,
    private authService: AuthService,
    private modalService: BsModalService,
    public commonService: CommonServiceService
  ) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.GetOnlyApproveListForAllReport();
    this.LoadALLCompany();

    //this.commonService.GetCompanyByCurrentUser();
  }

  LoadALLCompany() {    
    debugger
    this.companyTypeDropDownList = [];
    this.service.GetALLCompany().subscribe((data: any[]) => {
      console.log(data);
      this.companyTypeDropDownList.push({ label: "Please Select Company", value: null });
      for (var i = 0; i < data.length; i++) {
        this.companyTypeDropDownList.push({
          label: data[i].shortForm,
          value: data[i].id,
        });
      }
    },
      (error) => {
        this.toastr.warning("Failed To Load data", "Company DropDown List");
      }
    );
  }
  //   this.service.GetALLCompany().subscribe((data: Company[]) => {
  //     this.orderManagementService.companyList = data;
  //     this.CompanySelectedList = new Array();
  //     this.CompanySelectedList.push({
  //       label: "Select",
  //       value: null,
  //     });
  //     for (var i = 0; i < this.orderManagementService.companyList.length; i++) {
  //       this.CompanySelectedList.push({
  //         label: this.orderManagementService.companyList[i].shortForm,
  //         value: this.orderManagementService.companyList[i].id,
  //       });
  //     }
  //   });
  // }

   
  GetOnlyApproveListForAllReport() {
    this.service.GetOnlyApproveListForAllReport().subscribe((res: any[]) => {
      this.onlyMissionApprovedListForAll = res;
     
    },
      (error) => {

        this.toastr.error("Failed to Load  Approved List");
      }
    );
  }

  InitializeForm() {

    this.VisitingReportForm = this.fb.group({
      fromDate: [this.datePipe.transform(new Date(), "yyyy-MM-dd")],
      toDate: [this.datePipe.transform(new Date(), "yyyy-MM-dd")],
      permittedCompanyId: [ Number(localStorage.getItem("id"))],
      //permittedCompanyName: [ { value: localStorage.getItem("branchName"), disabled: true }],
    });
  }


  onSearech() {

    console.log('From Date');
    console.log(this.VisitingReportForm.value.fromDate);
    console.log('To Date');
    console.log(this.VisitingReportForm.value.toDate);


    if (this.VisitingReportForm.value.fromDate == "" || this.VisitingReportForm.value.fromDate == undefined) {
      this.toastr.warning("Not Selected", "From Date");
    }
    else if (this.VisitingReportForm.value.toDate == "" || this.VisitingReportForm.value.toDate == undefined) {
      this.toastr.warning("Not Selected", "To Date");
    }
    else {
      this.service.GetVmsOutApproveDataForReport(this.datePipe.transform(this.VisitingReportForm.value.fromDate, "yyyy/MM/dd"),
        this.datePipe.transform(this.VisitingReportForm.value.toDate, "yyyy/MM/dd")).subscribe((res: any[]) => {

          //  this.service.GetVmsOutApproveDataForReport(this.datePipe.transform(this.VisitingReportForm.value.fromDate, "yyyy/MM/dd"), 
          //this.datePipe.transform(this.VisitingReportForm.value.toDate, "yyyy/MM/dd")).subscribe((res: any[]) => {

          //this.onlyApprovedList = res;
          this.onlyMissionApprovedListForAll = res;
          console.log('All Approve list', this.onlyApprovedList);
          // this.datePipe.transform(this.VisitingReportForm.value.fromDate, "dd-MMM-yy") this.VisitingReportForm.value.fromDate, this.VisitingReportForm.value.toDate

        },
          (error) => {
            this.toastr.error("Failed to Load  Approved List");

          }
        );
    }

  }

  onReportSearech() {
    debugger
    console.log('From Date');
    console.log(this.VisitingReportForm.value.fromDate);
    console.log('To Date');
    console.log(this.VisitingReportForm.value.toDate);
    //console.log(this.VisitingReportForm.o);


    if (this.VisitingReportForm.value.fromDate == "" || this.VisitingReportForm.value.fromDate == undefined) {
      this.toastr.warning("Not Selected", "From Date");
    }
    else if (this.VisitingReportForm.value.toDate == "" || this.VisitingReportForm.value.toDate == undefined) {
      this.toastr.warning("Not Selected", "To Date");
    }
    else {
      this.router.navigate([]).then((result) => {
        window.open(
          "http://192.168.2.246:7778/reports/rwservlet?rpt_erp&desformat=pdf&destype=cache=" +
          "&P_FROM_DATE=" +
          // this.datePipe.transform(this.VisitingReportForm.value.fromDate) +
          this.datePipe.transform(this.VisitingReportForm.value.fromDate, "dd-MMM-yy") +
          "&P_TO_DATE=" +
          // this.datePipe.transform(this.VisitingReportForm.value.toDate, ) +
          this.datePipe.transform(this.VisitingReportForm.value.toDate, "dd-MMM-yy") +
          
          "&this.onlyMissionApprovedList[0].branchofficeid="+
          "&report=E:/reports/vms001.rdf"
         //"&report=E:/reports/visitor_report.rdf" 
         //+
          
         
          // "&P_CURRENT_USER=" +
          // this.branch +
        );
      });
      //   },
      //     (error) => {
      //       this.toastr.error("Failed to Load  Approved List");

      //     }
      //   );
      // }

    }
  }

  /*Report*/

  CardView(id: number) {

    //  // this.service.GetOnlyPendingList().subscribe((res: any[]) => {
    //       this.service.GetVmsDataById(id).subscribe((res: any[]) => {
    //     this.missionApprove = res;
    //     debugger
    window.open("/visitor-manage/visitor-info-card-no/" + id, '_blank');
    // },
    //   (error) => {
    //     this.toastr.error("Failed to Load  VMS Card");

    //   }
    // );
  }


}




