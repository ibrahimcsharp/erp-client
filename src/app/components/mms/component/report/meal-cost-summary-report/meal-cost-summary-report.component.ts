import { DatePipe, DecimalPipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { CommonServiceService } from "src/app/components/merchandising/Common-Services/common-service.service";
import { MmsReportService } from "src/app/components/mms/services/mms-report.service";
import { MmsService } from "src/app/components/mms/services/mms.service";
import { MmsSnackService } from "../../../snacks/services/snacks.service";

@Component({
  selector: 'app-meal-cost-summary-report',
  templateUrl: './meal-cost-summary-report.component.html',
  styleUrls: ['./meal-cost-summary-report.component.scss']
})
export class MealCostSummaryReportComponent implements OnInit {

  reactiveSearchForm: FormGroup;
  mealMonthsList: any[] = [];
  itemList: any[] = [];
  reportsList: any[] = [];

  showSnacks: boolean = false;
  showMeal: boolean = true;
  showDayWiseMeal: boolean = false;
  showIndvDayWiseMeal: boolean = false;

  mealSnacks: string = "Meal Cost";
  dfltReportName = "Meal Cost Summary Report";

  constructor(
    private fb: FormBuilder,
    public commonService: CommonServiceService,
    private mmsService: MmsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private mmsReport: MmsReportService,
    public datePipe: DatePipe,
    public mmsSnackService: MmsSnackService,
    private decimalPipe: DecimalPipe
  ) { }

  ngOnInit(): void {
    this.commonService.LoadYearList();
    //this.GetMealMonths();
    this.commonService.LoadYearList();
    this.mmsSnackService.GetMealMonths();
    this.createForm();
    this.reportsList = [
      { name: "Snacks Summary Report" },
      { name: "Meal Cost Summary Report" },
      { name: "Day Wise Meal Cost" },
      { name: "Individual Day Wise Meal Cost" }
    ]

  }

  createForm() {
    var today = moment()
    var toDate = today.format('YYYY-MM-DD');
    var fromDate = today.clone().subtract(7, 'days').format('YYYY-MM-DD');


    this.reactiveSearchForm = this.fb.group({
      //monthId: [new Date().getMonth() + 1, Validators.required],
      reportFor: ['meal'],
      monthId: [0],
      yearId: [26, Validators.required],
      snacksSummaryReportFromDate: [fromDate, Validators.required],
      snacksSummaryReportToDate: [toDate, Validators.required],
    });
  }


  LoadDropDown(event) {
    if (event != null) {
      if (event.name == "Snacks Summary Report") {
        this.showSnacks = true;
        this.showMeal = false;
        this.showDayWiseMeal = false;
        this.showIndvDayWiseMeal = false;
        this.mealSnacks = "Snacks Summary Report";
      } else if (event.name == "Meal Cost Summary Report") {
        this.showMeal = true;
        this.showSnacks = false;
        this.showDayWiseMeal = false;
        this.showIndvDayWiseMeal = false;
        this.mealSnacks = "Meal Cost Summary Report";
      } else if (event.name == "Day Wise Meal Cost") {
        this.showMeal = false;
        this.showSnacks = false;
        this.showDayWiseMeal = true;
        this.showIndvDayWiseMeal = false;
        this.mealSnacks = "Day Wise Meal Cost Report";
      } else if (event.name == "Individual Day Wise Meal Cost") {
        this.showMeal = false;
        this.showSnacks = false;
        this.showDayWiseMeal = false;
        this.showIndvDayWiseMeal = true;
        this.mealSnacks = "Individual Day Wise Meal Cost Report";
      }
      this.itemList = [];

    }
  }
  GetMealMonths() {
    this.mmsService.GetMealMonths().subscribe((res: any[]) => {
      if (res) {
        this.mealMonthsList = res;
      }
    },
      (error) => {
        this.mealMonthsList = [];
      }
    );
  }



  Process() {
    if (this.reactiveSearchForm.valid) {
      this.spinner.show();
      if (this.showMeal) {
        this.mmsService.GetMonthlyMealCostSummaryReport(
          this.reactiveSearchForm.value.monthId,
          this.reactiveSearchForm.value.yearId
        ).subscribe((res: any[]) => {
          if (res) {
            this.itemList = res;

            this.itemList.forEach(sItem => {
              sItem.saraEmp40PercentCont = (sItem.saraMealCost * 40) / 100;
              sItem.saraCompanyNet60PercentCont = (sItem.saraMealCost * 60) / 100;

              sItem.scoEmp40PercentCont = (sItem.scoMealCost * 40) / 100;
              sItem.scoCompanyNet60PercentCont = (sItem.scoMealCost * 60) / 100;

            });

            this.spinner.hide();
          }
        },
          (error) => {
            this.itemList = [];
            this.toastr.error("Failed to load");
            this.spinner.hide();
          }
        );
      } else if (this.showSnacks) {
        this.mmsSnackService.GetSnackDailySummary(
          // this.SnacksSummaryReport.value.monthId,
          // this.SnacksSummaryReport.value.yearId
          this.reactiveSearchForm.value.snacksSummaryReportFromDate,
          this.reactiveSearchForm.value.snacksSummaryReportToDate
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
        var totalPerDayMeal = 0;
        var totalDailyGuestMeal = 0;
        this.mmsSnackService.GetDayWiseMealCost(
          this.reactiveSearchForm.value.snacksSummaryReportFromDate,
          this.reactiveSearchForm.value.snacksSummaryReportToDate
        ).subscribe((res: any[]) => {
          if (res) {
            this.itemList = res;
            this.itemList.forEach(sItem => {
              if (sItem.tokenDate != null) {
                sItem.tokenDate = moment(sItem.tokenDate).format('DD-MM-YYYY');
              }

              if (sItem.perDayMeal > 0) {
                totalPerDayMeal += sItem.perDayMeal;
              }

              if (sItem.dailyGuestMeal) {
                totalDailyGuestMeal += sItem.dailyGuestMeal;
              }
            })
            
            this.itemList.forEach(siItem => {
              siItem.perMealFixedCost = siItem.mealFixedCost / (totalPerDayMeal + totalDailyGuestMeal);
              siItem.perMealFixedCost = this.decimalPipe.transform(siItem.perMealFixedCost, '1.2-2');
            })



            this.spinner.hide();
          }
        },
          (error) => {
            this.itemList = [];
            this.spinner.hide();
          }
        );
      }
    } else {
      //this.totalMonthlyCost = 0;
      this.commonService.ValidationShow(this.reactiveSearchForm);
    }
  }

  getTotalMealCost(rowData: any): number {
    return (Number(rowData.mealRate) + Number(rowData.perMealFixedCost) );
  }


  dataForExcel = [];
  Data = [];
  exportExcelMeal() {
    //alert("hitted");
    // for (var i = 0; i < this.itemList.length; i++) {
    //   var empInfo = {
    //     declareDate: this.itemList[i].declareDate,
    //     itemName: this.itemList[i].itemName,
    //     makeQty: this.itemList[i].makeQty,
    //     makeCost: this.itemList[i].makeCost,
    //     saleQty: this.itemList[i].saleQty,
    //     salePrice: this.itemList[i].salePrice,
    //     totalSaleAmount: this.itemList[i].totalSaleAmount,
    //     officialQty: this.itemList[i].officialQty,
    //     officialGuestCost: this.itemList[i].officialGuestCost,
    //     damageQty: this.itemList[i].damageQty,
    //     damageCost: this.itemList[i].damageCost,
    //     balance: this.itemList[i].balance
    //   };
    //   this.Data.push(empInfo);
    // }

    // this.Data.forEach((row: any) => {
    //   this.dataForExcel.push(Object.values(row));
    // });

    var yearObj = this.commonService.YearSelectList.find(x => x.value == this.reactiveSearchForm.value.yearId);
    let reportData = {
      title: "Meal_Cost_Summary_Report",
      data: this.itemList,
      yearName: yearObj.label,
      headers: this.Data[0],
    };
    this.mmsService.exportExcelReport(reportData);
  }



  exportExcelSnacks() {
    let reportData = {
      title: "Snacks_Daily_Summary_Report",
      data: this.itemList,
      fromDate: this.reactiveSearchForm.value.snacksSummaryReportFromDate,
      toDate: this.reactiveSearchForm.value.snacksSummaryReportToDate,
      headers: this.Data[0],
    };
    this.mmsSnackService.exportExcelReport5(reportData);
  }

  exportDayWiseMealCost() {
    let reportData = {
      title: "Day_Wise_Meal_Cost_Report",
      data: this.itemList,
      fromDate: this.reactiveSearchForm.value.snacksSummaryReportFromDate,
      toDate: this.reactiveSearchForm.value.snacksSummaryReportToDate,
      headers: this.Data[0],
    };
    this.mmsSnackService.exportDayWiseMealCost(reportData);
  }

}

