import { DatePipe } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap/modal";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { CommonServiceService } from "src/app/components/merchandising/Common-Services/common-service.service";
import { MmsService } from "../../../services/mms.service";

@Component({
  selector: "app-monthly-meal-cost",
  templateUrl: "./monthly-meal-cost.component.html",
  styleUrls: ["./monthly-meal-cost.component.scss"],
})
export class MonthlyMealCostComponent implements OnInit {
  reactiveForm: FormGroup;
  mealMonthsList: any[] = [];
  selectedEmpInfo: any[] = [];
  empList: any[] = [];
  categoryList: any[];
  mealItems: any[];
  title: string;
  model: any = null;
  spinnerName = "createSpinner";
  @Output() GetToCreateValue = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    public commonService: CommonServiceService,
    private mmsService: MmsService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private datePipe: DatePipe,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.title = "Create Monthly Meal Cost";
    this.commonService.LoadYearList();
    this.GetMealMonths();
    this.createForm();
    this.GetMealCategory();
  }
  createForm() {
    if (this.model != null) {
      this.reactiveForm = this.fb.group({
        id: [this.model.id],
        monthId: [this.model.monthId, Validators.required],
        yearId: [this.model.yearId, Validators.required],
        itemId: [this.model.itemId, Validators.required],
        categoryId: [this.model.categoryId, Validators.required],
        costAmount: [this.model.costAmount, Validators.required],
        costType: [this.model.costType, Validators.required],
        entryDate: [
          this.datePipe.transform(this.model.entryDate, "yyyy-MM-dd"),
          Validators.required,
        ],
      });
      this.ChangeCategory();
    } else {
      this.OnClear();
    }
  }

  OnClear() {
    this.reactiveForm = this.fb.group({
      id: [0],
      monthId: [new Date().getMonth() + 1, Validators.required],
      yearId: [25, Validators.required],
      itemId: ["", Validators.required],
      categoryId: ["", Validators.required],
      costAmount: ["", Validators.required],
      costType: ["M", Validators.required],
      entryDate: [
        this.datePipe.transform(new Date(), "yyyy-MM-dd"),
        Validators.required,
      ],
    });
  }

  GetMealMonths() {
    this.mmsService.GetMealMonths().subscribe((res: any[]) => {
      if (res) {
        this.mealMonthsList = res;
      }
    },
      (error) => {
        this.mealMonthsList = [];
      }
    );
  }

  OnSubmit() {
    console.log(this.reactiveForm.value);
    if (this.reactiveForm.valid) {
      this.GetToCreateValue.emit(this.reactiveForm.value);
      this.reactiveForm.patchValue({
        costAmount: "",
      });
      //this.bsModalRef.hide();

      // this.spinner.show();
      // this.mmsService.CreateMealCost(this.reactiveForm.value).subscribe(
      //   (res) => {
      //     this.spinner.hide();
      //     this.toastr.success("Saved Successfully", "Meal Cost");
      //     //this.createForm();
      //     this.reactiveForm.patchValue({
      //       itemId: "",
      //       categoryId: "",
      //       costAmount: "",
      //     })
      //     this.ToCreate.emit();
      //   },
      //   (error) => {
      //     this.spinner.hide();
      //     this.toastr.error("Failed to Save", "Meal Cost");
      //   }
      // );
    } else {
      this.commonService.ValidationShow(this.reactiveForm);
    }
  }

  SaveData() {
    if (this.reactiveForm.valid) {
      this.mmsService.CreateMealCost(this.reactiveForm.value).subscribe((res: any) => {
        this.GetToCreateValue.emit("MealCostCreated");
        this.toaster.success("Created successfully", "Meal Daily Cost");
        this.reactiveForm.patchValue({
          costAmount: "",
        });
      },
        (error) => {
          this.toaster.error("Failed to create!", "Meal Daily Cost");
        }
      );
    }
  }

  //get meal category List
  GetMealCategory() {
    this.categoryList = [];
    this.mmsService.GetMealCategory().subscribe((res: any) => {
      this.categoryList = res;
      console.log(res);
    },
      (error) => {
        this.categoryList = [];
      }
    );
  }

  ChangeCategory() {
    this.mealItems = [];
    var catId = this.reactiveForm.value.categoryId;
    if (catId > 0) {
      this.mmsService.GetMealItemByCategoryId(catId).subscribe((res: any[]) => {
        this.mealItems = res;
      },
        (error) => {
          this.mealItems = [];
        }
      );
    }
  }
}
