import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { MmsService } from '../../../services/mms.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MmsReportService } from '../../../services/mms-report.service';

@Component({
  selector: 'app-monthly-meal-cost-summary',
  templateUrl: './monthly-meal-cost-summary.component.html',
  styleUrls: ['./monthly-meal-cost-summary.component.scss']
})
export class MonthlyMealCostSummaryComponent implements OnInit {


  MealSummaryForm: FormGroup;
  mealMonthsList: any[] = [];
  monthYear: string;

  summaryList : any[] = [];
  constructor(
    private fb: FormBuilder,
    public commonService: CommonServiceService,
    private mmsService: MmsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private mmsReportService: MmsReportService
  ) { }

  ngOnInit(): void {

    this.GetMealMonths();
    this.CreateMealSetupForm();
    this.commonService.LoadYearList();
  }

  CreateMealSetupForm() {
    this.MealSummaryForm = this.fb.group({
      monthId: [new Date().getMonth() + 1, Validators.required],
      yearId: [25, Validators.required],
    });
  }

  GetMealMonths() {
    this.mmsService.GetMealMonths().subscribe(
      (res: any[]) => {
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
    if (this.MealSummaryForm.valid) {
      this.spinner.show();
      this.mmsService
        .GetMontlyMealCostSummary(
          this.MealSummaryForm.value.monthId,
          this.MealSummaryForm.value.yearId
        ).subscribe(
          (res: any[]) => {
            if (res) {
              this.summaryList = res;
              //var m = res[0].monthName + res[0].yearName;
              //this.monthYear = m;
              //alert(res[0].monthName)
              this.spinner.hide();
            }
          },
          (error) => {
            this.summaryList = [];
            this.spinner.hide();
          }
        );
    } else {
      //this.totalMonthlyCost = 0;
      this.commonService.ValidationShow(this.MealSummaryForm);
    }
  }



  dataForExcel = [];
  Data = [];
  exportExcel() {
    for (var i = 0; i < this.summaryList.length; i++) {
      var summaryInfo = {
        typeOrName: this.summaryList[i].typeOrName,
        noOfMeal: this.summaryList[i].noOfMeal,
        monthlyFixedCost: this.summaryList[i].monthlyFixedCost,
        monthlyFoodCost: this.summaryList[i].monthlyFoodCost,
        totalMonthlyMealCost: this.summaryList[i].totalMonthlyMealCost,
        payableAmount: this.summaryList[i].payableAmount,
        comment: this.summaryList[i].comment,

      };
      this.Data.push(summaryInfo);
    }

    this.Data.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row));
    });

    let reportData = {
      title: "Monthly_Meal_Cost_Summary_Report",
      data: this.dataForExcel,
      headers: Object.keys(this.Data[0]),
    };
    this.mmsReportService.exportExcelSummaryReport(reportData);

    // import("xlsx").then((xlsx) => {
    //   const worksheet = xlsx.utils.json_to_sheet(this.empList);
    //   const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    //   const excelBuffer: any = xlsx.write(workbook, {
    //     bookType: "xlsx",
    //     type: "array",
    //   });
    //   this.saveAsExcelFile(excelBuffer, "MonthlyMealCost");
    // });
  }


}
