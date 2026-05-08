import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { CommonServiceService } from "src/app/components/merchandising/Common-Services/common-service.service";
import { MmsReportService } from "../../../services/mms-report.service";
import { MmsService } from "../../../services/mms.service";
import { DailyMealCostComponent } from "../daily-meal-cost/daily-meal-cost.component";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-daily-meal-cost-list",
  templateUrl: "./daily-meal-cost-list.component.html",
  styleUrls: ["./daily-meal-cost-list.component.css"],
})
export class DailyMealCostListComponent implements OnInit {
  reactiveForm: FormGroup;
  MealSetupForm: FormGroup;
  reactiveDailyCostForm: FormGroup;
  mealMonthsList: any[] = [];
  selectedEmpInfo: any[] = [];
  empList: any[] = [];
  totalMonthlyCost = 0;
  bsModalRef: BsModalRef;
  spinnerName = "listSpinner";
  model: any = null;
  categoryList: any[];
  mealItems: any[];
  title: string;
  submitButton: string;

  constructor(
    private fb: FormBuilder,
    public commonService: CommonServiceService,
    private mmsService: MmsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private mmsReport: MmsReportService,
    private modalService: BsModalService,
    private toaster: ToastrService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.commonService.LoadYearList();
    this.GetMealMonths();
    this.createForm();
    this.createDailyMealForm();
    this.GetMealCategory();
    this.commonService.LoadUnitType();
    this.title = "Create Daily Meal Cost";
    this.submitButton = "Save";
  }
  //get meal category List
  GetMealCategory() {
    this.categoryList = [];
    this.mmsService.GetMealCategory().subscribe(
      (res: any) => {
        this.categoryList = res;
        console.log(res);
      },
      (error) => {
        this.categoryList = [];
      }
    );
  }

  createDailyMealForm(model = null) {
    this.submitButton = "Update";
    if (model != null) {
      this.reactiveDailyCostForm = this.fb.group({
        id: [model.id],
        monthId: [model.monthId, Validators.required],
        yearId: [model.yearId, Validators.required],
        itemId: [model.itemId, Validators.required],
        categoryId: [model.categoryId, Validators.required],
        costAmount: [model.costAmount, Validators.required],
        costType: [model.costType, Validators.required],
        entryDate: [
          this.datePipe.transform(model.entryDate, "yyyy-MM-dd"),
          Validators.required,
        ],
        quantity: [model.quantity, Validators.required],
        uomId: [model.uomId, Validators.required],
      });
      this.ChangeCategory();
    } else {
      this.OnClear();
    }
  }

  OnClear() {
    this.reactiveDailyCostForm = this.fb.group({
      id: [0],
      monthId: [new Date().getMonth() + 1, Validators.required],
      yearId: [25, Validators.required],
      itemId: ["", Validators.required],
      categoryId: ["", Validators.required],
      costAmount: ["", Validators.required],
      costType: ["D", Validators.required],
      entryDate: [
        this.datePipe.transform(new Date(), "yyyy-MM-dd"),
        Validators.required,
      ],
      quantity: ["", Validators.required],
      uomId: ["", Validators.required],
    });
  }

  OnClearMealCost() {
    this.reactiveDailyCostForm = this.fb.group({
      id: [0],
      monthId: [new Date().getMonth() + 1, Validators.required],
      yearId: [25, Validators.required],
      costType: ["D", Validators.required],
      costAmount: [0, Validators.required],
      entryDate: [
        this.datePipe.transform(new Date(), "yyyy-MM-dd"),
        Validators.required,
      ],
      quantity: [0, Validators.required],
      uomId: ["", Validators.required],
      itemId: [this.reactiveDailyCostForm.value.itemId, Validators.required],
      categoryId: [this.reactiveDailyCostForm.value.categoryId, Validators.required],
    });
  }

  ChangeCategory() {
    this.mealItems = [];
    var catId = this.reactiveDailyCostForm.value.categoryId;
    if (catId > 0) {
      this.mmsService.GetMealItemByCategoryId(catId).subscribe(
        (res: any[]) => {
          this.mealItems = res;
        },
        (error) => {
          this.mealItems = [];
        }
      );
    }
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
  AddNew() {
    this.bsModalRef = this.modalService.show(DailyMealCostComponent, {
      initialState: {
        title: "Create Daily Meal Cost",
      },
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg",
    });
    this.SaveData();
    //this.displayBasic2 = true;
  }

  // SaveData() {
  //   this.bsModalRef.content.ToCreate.subscribe((model: any) => {
  //     const ToCreate = model;
  //     if (ToCreate) {
  //       this.mmsService.CreateMealCost(ToCreate).subscribe(
  //         () => {
  //           this.toaster.success("Created successfully", "Meal Daily Cost");
  //           this.Process();
  //         },
  //         (error) => {
  //           this.toaster.error("Failed to create!", "Meal Daily Cost");
  //         }
  //       );
  //     }
  //   });
  // }

  SaveData() {
    this.mmsService.CreateMealCost(this.reactiveDailyCostForm.value).subscribe((res: any) => {
      if (this.reactiveDailyCostForm.get('id').value > 0) {
        this.toaster.success("Updated successfully", "Daily Meal Cost");
      } else {
        this.toaster.success("Created successfully", "Daily Meal Cost");      }

        this.Process();
        this.OnClearMealCost();
    },
      (error) => {
        this.toaster.error("Failed to create!", "Daily Meal Cost");
      }
    );
  }

  Process() {
    if (this.reactiveForm.valid) {
      this.spinner.show();
      this.mmsService.GetDailyMealCost(this.reactiveForm.value.monthId, this.reactiveForm.value.yearId).subscribe((res: any[]) => {
        if (res) {
          this.empList = res.filter((e) => e.costType == "D");
          res = res.filter((e) => e.costType == "D");
          this.totalMonthlyCost = res.reduce(
            (sum, p) => sum + p.costAmount,
            0
          );
          this.spinner.hide();
        }
      },
        (error) => {
          this.empList = [];
          this.spinner.hide();
        }
      );
    } else {
      this.totalMonthlyCost = 0;
      this.commonService.ValidationShow(this.reactiveForm);
    }
  }

  edit(model: any) {
    // this.bsModalRef = this.modalService.show(DailyMealCostComponent, {
    //   initialState: {
    //     title: "Update Meal Daily Cost",
    //     model,
    //   },
    //   backdrop: true,
    //   ignoreBackdropClick: true,
    //   class: "modal-lg",
    // });

    // this.SaveData();
    this.createDailyMealForm(model);
  }

  Print() {
    this.mmsReport.DailyMealCostReport(
      this.empList,
      this.mealMonthsList.filter(
        (e) => e.id == this.reactiveForm.value.monthId
      ),
      this.commonService.YearSelectList.filter(
        (e) => e.value == this.reactiveForm.value.yearId
      ),
      "open"
    );
  }
}
