import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { MmsSnackService } from '../../../services/snacks.service';

@Component({
  selector: 'app-snacks-month-summary',
  templateUrl: './snacks-month-summary.component.html',
  styleUrls: ['./snacks-month-summary.component.scss']
})
export class SnacksMonthSummaryComponent implements OnInit {

  reactiveForm: FormGroup;
  constructor( 
    private fb: FormBuilder,
    private spinner: NgxSpinnerService, 
    public commonService: CommonServiceService,
    public mmsSnackService:MmsSnackService) { }

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

  itemList: any[] = [];
  Process() {
    if (this.reactiveForm.valid) {
      this.spinner.show();
      this.mmsSnackService
        .GetSnackMonthSummary(
          this.reactiveForm.value.monthId,
          this.reactiveForm.value.yearId         
        )
        .subscribe(
          (res: any[]) => {
            if (res) {
              this.itemList = res;
              console.log(res);
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
      this.commonService.ValidationShow(this.reactiveForm);
    }
  }

  dataForExcel = [];
  Data = [];
  exportExcel() {
    //alert("hitted");
    for (var i = 0; i < this.itemList.length; i++) {
      var empInfo = {
        monthName: this.itemList[i].monthName,
        itemName: this.itemList[i].itemName,
        costPrice: this.itemList[i].costPrice,
        makingQty: this.itemList[i].makingQty,
        makingCost: this.itemList[i].makingCost,
        damageQty: this.itemList[i].damageQty,
        damageCost: this.itemList[i].damageCost,
        actualQty: this.itemList[i].actualQty,
        actualCost: this.itemList[i].actualCost,
        personalSaleQty: this.itemList[i].personalSaleQty,
        personalSaleAmount: this.itemList[i].personalSaleAmount,
        guestPurposeQty: this.itemList[i].guestPurposeQty,
        guestPurposeCost: this.itemList[i].guestPurposeCost,
        totalSalQty: this.itemList[i].totalSalQty,
        totalSaleAmount: this.itemList[i].totalSaleAmount,
        actualSaleAmount: this.itemList[i].actualSaleAmount,
        balance: this.itemList[i].balance
      };
      this.Data.push(empInfo);
    }

    this.Data.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row));
    });

    let reportData = {
      title: "Items_Month_Summary_Report",
      data: this.dataForExcel,
      headers: this.Data[0],
    };
    this.mmsSnackService.exportExcelReport4(reportData);
  }

}
