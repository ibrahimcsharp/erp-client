import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { CommonServiceService } from "src/app/components/merchandising/Common-Services/common-service.service";
import { MmsReportService } from "../../../services/mms-report.service";
import { MmsService } from "../../../services/mms.service";
import { MonthlyMealCostComponent } from "../monthly-meal-cost/monthly-meal-cost.component";
import { DatePipe } from "@angular/common";
import { UnitTypeModel } from "src/app/components/merchandising/fabric-library/model/setting-model/unit-type";
import { FabricBasicNameService } from "src/app/components/merchandising/fabric-library/services/fabric-basic-name.service";

@Component({
  selector: "app-monthly-meal-cost-list",
  templateUrl: "./monthly-meal-cost-list.component.html",
  styleUrls: ["./monthly-meal-cost-list.component.scss"],
})
export class MonthlyMealCostListComponent implements OnInit {
  reactiveForm: FormGroup;
  reactiveCreateForm: FormGroup;
  MealSetupForm: FormGroup;
  mealMonthsList: any[] = [];
  selectedEmpInfo: any[] = [];
  empList: any[] = [];
  totalMonthlyCost = 0;
  bsModalRef: BsModalRef;
  spinnerName = "listSpinner";
  mealCostCreated: string;
  model: any = null;
  mealItems: any[];
  categoryList: any[];
  submitButton: string;
  title: string;
  UnitTypeList: any;


  constructor(
    public fb: FormBuilder,
    public commonService: CommonServiceService,
    private mmsService: MmsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private mmsReport: MmsReportService,
    private modalService: BsModalService,
    private datePipe: DatePipe,
    private toaster: ToastrService,
    public service: FabricBasicNameService,
  ) { }

  ngOnInit() {
    this.commonService.LoadYearList();
    this.GetMealMonths();
    this.createForm();
    this.GetMealCategory();
    this.createMealCostForm();
    // this.LoadUnitType();  
    this.commonService.LoadUnitType();
    this.submitButton = "Save";
    this.title = "Create Monthly Meal Cost";
  }

  createMealCostForm(model = null) {
    this.submitButton = "Update";
    if (model != null) {
      this.reactiveCreateForm = this.fb.group({
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
        quantity: [model.quantity],
        uomId: [model.uomId],
      });
      this.ChangeCategory();
    } else {
      this.OnClear();
    }
  }

  //dropdown unit type
  LoadUnitType() {
    this.service.getUnitTypeName().subscribe(
      (data: UnitTypeModel[]) => {
        this.service.unitTypeList = data;
        this.UnitTypeList = new Array();
        this.UnitTypeList.push({ label: "Select", value: 0 });
        for (var i = 0; i < this.service.unitTypeList.length; i++) {
          this.UnitTypeList.push({
            label: this.service.unitTypeList[i].unitName,
            value: this.service.unitTypeList[i].id,
            type: this.service.unitTypeList[i].type,
          });
        }
        this.UnitTypeList = this.UnitTypeList.filter(x => x.type == '0');
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Unit Type");
      }
    );
  }

  ChangeCategory() {
    this.mealItems = [];
    var catId = this.reactiveCreateForm.value.categoryId;
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

  OnClear() {
    this.reactiveCreateForm = this.fb.group({
      id: [0],
      monthId: [new Date().getMonth() + 1, Validators.required],
      yearId: [26, Validators.required],
      itemId: ["", Validators.required],
      categoryId: ["", Validators.required],
      costAmount: ["", Validators.required],
      costType: ["M", Validators.required],
      entryDate: [
        this.datePipe.transform(new Date(), "yyyy-MM-dd"),
        Validators.required,
      ],
      quantity: [""],
      uomId: [""],
    });
    this.submitButton = "Save";
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

  getVlueFromMonthlyMealCost($event) {
    this.mealCostCreated = $event;
    if (this.mealCostCreated == "MealCostCreated") {
      this.Process();
    }
  }

  // AddNew() {
  //   this.bsModalRef = this.modalService.show(MonthlyMealCostComponent, {
  //     initialState: {
  //       title: "Create Monthly Meal Cost",
  //     },
  //     backdrop: true,
  //     ignoreBackdropClick: true,
  //     class: "modal-lg",
  //   });
  //   this.SaveData();
  //   //this.displayBasic2 = true;
  // }

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
    if (this.reactiveCreateForm.get('quantity').value === '') {
      this.reactiveCreateForm.patchValue({
        quantity: 0,
      });
    }
    if (this.reactiveCreateForm.get('uomId').value === '') {
      this.reactiveCreateForm.patchValue({
        uomId: 0,
      });
    }

    if (this.reactiveCreateForm.valid) {
      this.mmsService.CreateMealCost(this.reactiveCreateForm.value).subscribe((res: any) => {
        if (this.reactiveCreateForm.get('id').value > 0) {
          this.toaster.success("Updated successfully", "Meal Daily Cost");
        } else {
          this.toaster.success("Created successfully", "Meal Daily Cost");
        }

        this.Process();
        this.OnClear();

        // this.reactiveForm.patchValue({
        //   costAmount: "",
        // });
      },
        (error) => {
          this.toaster.error("Failed to create!", "Meal Daily Cost");
        }
      )
    };
  }

  Process() {
    if (this.reactiveForm.valid) {
      this.spinner.show();
      this.mmsService.GetMealCost(this.reactiveForm.value.monthId, this.reactiveForm.value.yearId).subscribe((res: any[]) => {
        console.log(res);
        if (res) {
          this.empList = res.filter((e) => e.costType == "M");
          res = res.filter((e) => e.costType == "M");
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
    // this.bsModalRef = this.modalService.show(MonthlyMealCostComponent, {
    //   initialState: {
    //     title: "Update Meal Monthly Cost",
    //     model,
    //   },
    //   backdrop: true,
    //   ignoreBackdropClick: true,
    //   class: "modal-lg",
    // });

    // this.SaveData();
    this.createMealCostForm(model);
  }

  Print() {
    this.mmsReport.MonthlyMealCostReport(
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
