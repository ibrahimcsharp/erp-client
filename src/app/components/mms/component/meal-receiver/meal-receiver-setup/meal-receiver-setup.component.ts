import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { CommonServiceService } from "src/app/components/merchandising/Common-Services/common-service.service";
import { MmsService } from "../../../services/mms.service";

@Component({
  selector: "app-meal-receiver-setup",
  templateUrl: "./meal-receiver-setup.component.html",
  styleUrls: ["./meal-receiver-setup.component.scss"],
})
export class MealReceiverSetupComponent implements OnInit {
  reactiveForm: FormGroup;
  MealSetupForm: FormGroup;
  mealMonthsList: any[] = [];
  selectedEmpInfo: any[] = [];
  constructor(
    private fb: FormBuilder,
    public commonService: CommonServiceService,
    private mmsService: MmsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }
  empList: any[] = [];
  deactiveEmpList: any[] = [];
  activeEmpList: any[] = [];
  ngOnInit(): void {
    this.createForm();
    this.GetMealMonths();
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
      monthId: [new Date().getMonth() + 1, Validators.required],
      yearId: [25, Validators.required],
    });
  }

  onSubmit() {
    if (this.reactiveForm.valid) {
      this.spinner.show();

      //---------Code block add By Shuvo-----//

      this.mmsService.GetDeactiveMealReceiverList().subscribe(
        (res: any[]) => {
          if (res) {
            this.deactiveEmpList = res;
            //this.scoEmpList = res.filter((e) => e.unitName == "SCO");
            //this.saraEmpList = res.filter((e) => e.unitName == "SaRa");
            //this.spinner.hide();
            console.log(this.deactiveEmpList);
          }
        },
        (error) => {
          this.deactiveEmpList = [];
          this.spinner.hide();
        }
      );


      // this.mmsService.GetEmployess(this.reactiveForm.value.unitType).subscribe(///
      //
      this.mmsService.GetEmployessFromDataBase(this.reactiveForm.value.unitType).subscribe(
        (res: any[]) => {
          if (res) {
            this.empList = res;
            for (var item of this.empList) {
              var check = this.deactiveEmpList.find(x => x.employeeId == item.employeeId && x.deactivate == 'Y');
              if (!check) {
                //alert(JSON.stringify(item));
                this.activeEmpList.push(item);
              }
            }
            this.spinner.hide();
          }

          console.log(this.activeEmpList);
          console.log(this.empList);
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
    if (this.MealSetupForm.valid && this.selectedEmpInfo.length > 0) {
      this.spinner.show();
      this.mmsService
        .MealReceiverSave(this.MealSetupForm.value, this.selectedEmpInfo)
        .subscribe(
          (res) => {
            this.toastr.success(
              "Process Successfuly Done!",
              "Employee Meal Setup"
            );
            this.spinner.hide();
          },
          (error) => {
            this.toastr.error("Process Failed", "Meal Receiver Setup");
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
