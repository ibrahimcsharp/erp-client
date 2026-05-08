import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { MmsService } from '../../../services/mms.service';
import { MmsReportService } from '../../../services/mms-report.service';

@Component({
  selector: 'app-employee-monthly-meal-cost-summary',
  templateUrl: './employee-monthly-meal-cost-summary.component.html',
  styleUrls: ['./employee-monthly-meal-cost-summary.component.scss']
})
export class EmployeeMonthlyMealCostSummaryComponent implements OnInit {

  reactiveForm: FormGroup;
  mealMonthsList: any[] = [];
  sum : number
  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    public commonService: CommonServiceService,
    private mmsService: MmsService,
    private mmsReportService: MmsReportService

  ) { }

  ngOnInit(): void {
    this.commonService.LoadYearList();
    this.GetMealMonths();
    this.createForm();
  }

  createForm() {
    this.reactiveForm = this.fb.group({
      monthId: [new Date().getMonth() + 1, Validators.required],
      yearId: [25, Validators.required],
      employeeId: ["", Validators.required],
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

  empList: any[] = [];
  
  Process() {
    if (this.reactiveForm.valid) {
      this.spinner.show();
      this.mmsService
        .GetEmployeeMontlyMealCostSummary(
          this.reactiveForm.value.monthId,
          this.reactiveForm.value.yearId,
          this.reactiveForm.value.employeeId
        )
        .subscribe(
          (res: any[]) => {
            if (res) {
              this.empList = res;

               const sum = res.reduce((sum, current) => sum + current.perEmpPayable, 0);
               this.sum =  sum.toFixed(2);
               console.log(this.sum);
              this.spinner.hide();
            }
          },
          (error) => {
            this.empList = [];
            this.spinner.hide();
          }
        );
    } else {
      //this.totalMonthlyCost = 0;
      this.commonService.ValidationShow(this.reactiveForm);
    }
  }


  dataForExcel = [];
  Data = [];
  exportExcel() {
    for (var i = 0; i < this.empList.length; i++) {
      var empInfo = {
        monthName: this.empList[i].monthName,
        yearName: this.empList[i].yearName,
        tokenDate: this.empList[i].tokenDate,
        employeeId: this.empList[i].employeeId,
        employeeName: this.empList[i].employeeName, 
        dailyFoodCost: this.empList[i].dailyFoodCost,
        dailyTotalToken: this.empList[i].dailyTotalToken,
        foodRate: this.empList[i].foodRate,
        mealFixedCost: this.empList[i].mealFixedCost,
        totalMeal: this.empList[i].totalMeal,
        perMealFixedCost: this.empList[i].perMealFixedCost,
        perMealTotalCost: this.empList[i].perMealTotalCost,
        perEmpPayable: this.empList[i].perEmpPayable,
      };
      this.Data.push(empInfo);
    }

    this.Data.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row));
    });

    let reportData = {
      title: "Monthly_Employee_Wise_Meal_Summary_Report",
      data: this.dataForExcel,
      headers: this.Data[0],
    };
    this.mmsReportService.exportExcelEmployeeMealSummaryReport(reportData);

  }
}
