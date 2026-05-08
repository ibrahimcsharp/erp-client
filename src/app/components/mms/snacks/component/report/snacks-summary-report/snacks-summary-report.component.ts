import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { MmsSnackService } from '../../../services/snacks.service';
import * as moment from 'moment';
@Component({
  selector: 'app-snacks-summary-report',
  templateUrl: './snacks-summary-report.component.html',
  styleUrls: ['./snacks-summary-report.component.scss']
})
export class SnacksSummaryReportComponent implements OnInit {

  currentDate: string;

  SnacksSummaryReport: FormGroup;

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    public commonService: CommonServiceService,
    public mmsSnackService: MmsSnackService) { }

  ngOnInit(): void {
    this.commonService.LoadYearList();
    this.mmsSnackService.GetMealMonths();
    this.createForm();
  }

  createForm() {
    var today = moment()
    var toDate = today.format('YYYY-MM-DD');
    var fromDate = today.clone().subtract(7, 'days').format('YYYY-MM-DD');


    this.SnacksSummaryReport = this.fb.group({
      snacksSummaryReportFromDate: [fromDate, Validators.required],
      snacksSummaryReportToDate: [toDate, Validators.required],
    });
  }

  itemList: any[] = [];
  Process() {
    if (this.SnacksSummaryReport.valid) {
      this.spinner.show();
      this.mmsSnackService.GetSnackDailySummary(
        // this.SnacksSummaryReport.value.monthId,
        // this.SnacksSummaryReport.value.yearId
        this.SnacksSummaryReport.value.snacksSummaryReportFromDate,
        this.SnacksSummaryReport.value.snacksSummaryReportToDate
      ).subscribe((res: any[]) => {
        if (res) {
          this.itemList = res;
          this.itemList.forEach(sItem => {
            if (sItem.declareDate != null) {
              sItem.declareDate = moment(sItem.declareDate).format('DD-MM-YYYY');
            }
          })

          this.spinner.hide();
        }
      },
        (error) => {
          this.itemList = [];
          this.spinner.hide();
        }
      );
    } else {
      //this.totalMonthlyCost = 0;
      this.commonService.ValidationShow(this.SnacksSummaryReport);
    }
  }

  dataForExcel = [];
  Data = [];
  exportExcel() {
    //alert("hitted");
    for (var i = 0; i < this.itemList.length; i++) {
      var empInfo = {
        declareDate: this.itemList[i].declareDate,
        itemName: this.itemList[i].itemName,
        makeQty: this.itemList[i].makeQty,
        makeCost: this.itemList[i].makeCost,
        saleQty: this.itemList[i].saleQty,
        salePrice: this.itemList[i].salePrice,
        totalSaleAmount: this.itemList[i].totalSaleAmount,
        officialQty: this.itemList[i].officialQty,
        officialGuestCost: this.itemList[i].officialGuestCost,
        damageQty: this.itemList[i].damageQty,
        damageCost: this.itemList[i].damageCost,
        balance: this.itemList[i].balance
      };
      this.Data.push(empInfo);
    }

    this.Data.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row));
    });

    let reportData = {
      title: "Snacks_Daily_Summary_Report",
      data: this.itemList,
      fromDate: this.SnacksSummaryReport.value.snacksSummaryReportFromDate,
      toDate: this.SnacksSummaryReport.value.snacksSummaryReportToDate,
      headers: this.Data[0],
    };
    this.mmsSnackService.exportExcelReport5(reportData);
  }

}

