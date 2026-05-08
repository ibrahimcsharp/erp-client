import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { CommonServiceService } from "src/app/components/merchandising/Common-Services/common-service.service";
import { MmsReportService } from "../../../services/mms-report.service";
import { MmsService } from "../../../services/mms.service";

@Component({
  selector: "app-employee-wise-meal-cost-report",
  templateUrl: "./employee-wise-meal-cost-report.component.html",
  styleUrls: ["./employee-wise-meal-cost-report.component.scss"],
})
export class EmployeeWiseMealCostReportComponent implements OnInit {
  reactiveForm: FormGroup;
  mealMonthsList: any[] = [];
  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    public commonService: CommonServiceService,
    private mmsService: MmsService,
    private mmsReportService: MmsReportService
  ) {}

  ngOnInit(): void {
    this.commonService.LoadYearList();
    this.GetMealMonths();
    this.createForm();
  }
  createForm() {
    this.reactiveForm = this.fb.group({
      monthId: [new Date().getMonth() + 1, Validators.required],
      yearId: [26, Validators.required],
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
        .GetEmplDtlMealCostEmpMonthly(
          this.reactiveForm.value.monthId,
          this.reactiveForm.value.yearId,
          this.reactiveForm.value.employeeId
        )
        .subscribe(
          (res: any[]) => {
            if (res) {
              this.empList = res;
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
        unitName: this.empList[i].unitName,
        totalMeal: this.empList[i].totalMeal,
        monthlyMealRate: this.empList[i].monthlyMealRate,
        perEmpPayable: this.empList[i].perEmpPayable,

        perDayCost: this.empList[i].perDayCost,
      };
      this.Data.push(empInfo);
    }

    this.Data.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row));
    });

    let reportData = {
      title: "Monthly_Employee_Wise_Meal_Report",
      data: this.dataForExcel,
      headers: this.Data[0],
    };
    this.mmsReportService.exportExcel(reportData);

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
  // saveAsExcelFile(buffer: any, fileName: string): void {
  //   let EXCEL_TYPE =
  //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  //   let EXCEL_EXTENSION = ".xlsx";
  //   const data: Blob = new Blob([buffer], {
  //     type: EXCEL_TYPE,
  //   });
  //   FileSaver.saveAs(
  //     data,
  //     fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
  //   );
  // }
}
