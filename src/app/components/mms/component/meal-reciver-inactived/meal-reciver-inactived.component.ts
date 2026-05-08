import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { MmsService } from '../../services/mms.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-meal-reciver-inactived',
  templateUrl: './meal-reciver-inactived.component.html',
  styleUrls: ['./meal-reciver-inactived.component.scss']
})
export class MealReciverInactivedComponent implements OnInit {
  reactiveForm: FormGroup;
  MealSetupForm: FormGroup;
  // mealMonthsList: any[] = [];
  selectedEmpInfo: any[] = [];
  constructor(
    private fb: FormBuilder,
    public commonService: CommonServiceService,
    private mmsService: MmsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }
  empList: any[] = [];
  
  ngOnInit(): void {
    this.createForm();
    //this.GetMealMonths();
    this.CreateMealSetupForm();
    this.commonService.LoadYearList();
  }

  createForm() {
    this.reactiveForm = this.fb.group({
      unitType: ["", Validators.required],
    });
  }
  CreateMealSetupForm() {
    this.MealSetupForm = this.fb.group({
      //monthId: [new Date().getMonth() + 1, Validators.required],
      //yearId: [24, Validators.required],
    });
  }


  onSubmit() {
    if (this.reactiveForm.valid) {
      this.spinner.show();
      //start comment by shuvo
      // this.mmsService.GetEmployess(this.reactiveForm.value.unitType).subscribe(
      //end coment by shuvo
        this.mmsService.GetEmployessFromDataBase(this.reactiveForm.value.unitType).subscribe(
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
      this.commonService.ValidationShow(this.reactiveForm);
    }
  }

  Process() {
    if (this.selectedEmpInfo.length > 0) {
      this.spinner.show();
      this.mmsService
        .SaveDeactiveMealReceiver(this.selectedEmpInfo)
        .subscribe(
          (res) => {
            this.toastr.success(
              "Process Successfuly Done!",
              "Employee Meal Deactivated "
            );
          this.spinner.hide();
          },
          (error) => {
            this.toastr.error("Process Failed", "Meal Receiver Deactivated");
            this.spinner.hide();
          }
        );
    } else {
      this.commonService.ValidationShow(this.MealSetupForm);
      if (this.selectedEmpInfo.length == 0) {
        this.toastr.warning("Please Select Employee First");
      }
    }
  }
  
}


