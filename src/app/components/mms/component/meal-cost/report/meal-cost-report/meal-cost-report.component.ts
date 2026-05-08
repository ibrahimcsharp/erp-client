import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { CommonServiceService } from "src/app/components/merchandising/Common-Services/common-service.service";
import { MmsReportService } from "src/app/components/mms/services/mms-report.service";
import { MmsService } from "src/app/components/mms/services/mms.service";

@Component({
  selector: "app-meal-cost-report",
  templateUrl: "./meal-cost-report.component.html",
  styleUrls: ["./meal-cost-report.component.scss"],
})
export class MealCostReportComponent implements OnInit {
  reactiveForm: FormGroup;
  mealMonthsList: any[] = [];
  constructor(
    private fb: FormBuilder,
    public commonService: CommonServiceService,
    private mmsService: MmsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private mmsReport: MmsReportService,
    public datePipe: DatePipe
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
      currentDate: [
        this.datePipe.transform(new Date(), "yyyy-MM-dd"),
        Validators.required,
      ],
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
      this.mmsService
        .GetDailyMealCostReport(
          this.reactiveForm.value.monthId,
          this.reactiveForm.value.yearId,
          this.reactiveForm.value.currentDate
        )
        .subscribe(
          (res) => {
            if (res) {
              this.mmsReport.DateWiseMealCostReport(
                res,
                this.reactiveForm.value.currentDate,
                "open"
              );
            }
          },
          (error) => {
            this.toastr.error("Failed to load");
          }
        );
    }
  }
}
