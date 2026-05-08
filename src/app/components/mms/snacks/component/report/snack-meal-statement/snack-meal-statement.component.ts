import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { MmsSnackService } from '../../../services/snacks.service';

@Component({
  selector: 'app-snack-meal-statement',
  templateUrl: './snack-meal-statement.component.html',
  styleUrls: ['./snack-meal-statement.component.scss']
})
export class SnackMealStatementComponent implements OnInit {

  reactiveForm: FormGroup;
  constructor( private fb: FormBuilder,
    private spinner: NgxSpinnerService, public commonService: CommonServiceService,public mmsSnackService:MmsSnackService) { }

  ngOnInit(): void {
    this.commonService.LoadYearList();
    this.mmsSnackService.GetMealMonths();
    this.createForm();
  }

  createForm() {
    this.reactiveForm = this.fb.group({
      monthId: [new Date().getMonth() + 1, Validators.required],
      yearId: [24, Validators.required],      
    });
  }

  empList: any[] = [];
  Process() {
    if (this.reactiveForm.valid) {
      this.spinner.show();
      this.mmsSnackService
        .GetSnackMealStatement(
          this.reactiveForm.value.monthId,
          this.reactiveForm.value.yearId         
        )
        .subscribe(
          (res: any[]) => {
            if (res) {
              this.empList = res;
              console.log(res);
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
    //alert("hitted");
    for (var i = 0; i < this.empList.length; i++) {
      var empInfo = {
        monthName: this.empList[i].monthName,
        yearName: this.empList[i].yearName,
        employeeName: this.empList[i].employeeName,
        employeeId: this.empList[i].employeeId,
        department: this.empList[i].department,
        totalSnacksQty: this.empList[i].totalSnacksQty,
        totalSnacksCost: this.empList[i].totalSnacksCost,
        totalMealQty: this.empList[i].totalMealQty,
        totalMealCost: this.empList[i].totalMealCost,
        totalCost: this.empList[i].totalCost

      };
      this.Data.push(empInfo);
    }

    this.Data.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row));
    });

    let reportData = {
      title: "Individual_Snacks_Meal_Statement",
      data: this.dataForExcel,
      headers: this.Data[0],
    };
    this.mmsSnackService.exportExcelReport3(reportData);
  }

}
