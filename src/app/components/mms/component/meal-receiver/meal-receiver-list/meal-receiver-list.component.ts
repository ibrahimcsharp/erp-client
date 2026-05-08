import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { CommonServiceService } from "src/app/components/merchandising/Common-Services/common-service.service";
import { MmsService } from "../../../services/mms.service";

@Component({
  selector: "app-meal-receiver-list",
  templateUrl: "./meal-receiver-list.component.html",
  styleUrls: ["./meal-receiver-list.component.scss"],
})
export class MealReceiverListComponent implements OnInit {
  reactiveForm: FormGroup;
  MealSetupForm: FormGroup;
  mealMonthsList: any[] = [];
  selectedEmpInfo: any[] = [];
  empList: any[] = [];
  saraEmpList: any[] = [];
  scoEmpList: any[] = [];
  constructor(
    private fb: FormBuilder,
    public commonService: CommonServiceService,
    private mmsService: MmsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.commonService.LoadYearList();
    this.GetMealMonths();
    this.createForm();
  }
  createForm() {
    this.reactiveForm = this.fb.group({
      monthId: [new Date().getMonth() + 1, Validators.required],
      yearId: [26, Validators.required],
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
    if (this.reactiveForm.valid) {
      this.spinner.show();
      this.mmsService
        .GetMealReceiver(
          this.reactiveForm.value.monthId,
          this.reactiveForm.value.yearId
        )
        .subscribe(
          (res: any[]) => {
            if (res) {
              this.empList = res;
              this.scoEmpList = res.filter((e) => e.unitName == "SCO");
              this.saraEmpList = res.filter((e) => e.unitName == "SaRa");
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
  activeMealReceiver(obj: any) {
    obj.activeYn = "Y";
    this.mmsService.UpdateMealReceiver(obj).subscribe(
      (res: any) => {
        this.Process();
        this.toastr.success(res.message);
      },
      (error) => {
        this.toastr.error("Failed to update");
      }
    );
  }

  inactiveMealReceiver(obj: any) {
    obj.activeYn = "N";

    this.mmsService.UpdateMealReceiver(obj).subscribe(
      (res: any) => {
        this.Process();
        this.toastr.success(res.message);
      },
      (error) => {
        this.toastr.error("Failed to update");
      }
    );
  }
}
