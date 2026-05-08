import { DatePipe } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap/modal";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { CommonServiceService } from "src/app/components/merchandising/Common-Services/common-service.service";
import { MmsReportService } from "../../../services/mms-report.service";
import { MmsService } from "../../../services/mms.service";

@Component({
  selector: "app-meal-option-post",
  templateUrl: "./meal-option-post.component.html",
  styleUrls: ["./meal-option-post.component.scss"],
})
export class MealOptionPostComponent implements OnInit {
  reactiveForm: FormGroup;
  mealMonthsList: any[] = [];
  title: string;
  spinnerName = "createSpinner";
  @Output() ToCreate = new EventEmitter();
  model: any = null;
  defaultMonthId = new Date().getMonth() + 1;
  constructor(
    private fb: FormBuilder,
    public commonService: CommonServiceService,
    private mmsService: MmsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private mmsReport: MmsReportService,
    public datePipe: DatePipe,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.commonService.LoadYearList();
    this.GetMealMonths();
    this.createForm();
  }

  createForm() {
    var date = new Date();

    if (this.model != null) {
      this.reactiveForm = this.fb.group({
        monthId: [this.model.monthId, Validators.required],
        yearId: [this.model.yearId, Validators.required],
        currentDate: [
          this.datePipe.transform(
            date.setDate(date.getDate() + 1),
            "yyyy-MM-dd"
          ),
          Validators.required,
        ],
        mealDes: [this.model.mealDes, Validators.required],
        remarks: [this.model.remarks],
        id: [this.model.id],
        fromTime: [
          this.datePipe.transform(
            this.model.fromDateTime,
            "MM-dd-yyyy h:mm:ss a"
          ),
          Validators.required,
        ],
        toTime: [
          this.datePipe.transform(
            this.model.toDateTime,
            "MM-dd-yyyy h:mm:ss a"
          ),
          Validators.required,
        ],
        mealType: [this.model.mealType, Validators.required],
      });
    } else {
      this.OnClear();
    }
  }
  OnClear() {
    var date = new Date();
    var date1 = new Date();
    this.reactiveForm = this.fb.group({
      monthId: [this.defaultMonthId, Validators.required],
      yearId: [24, Validators.required],
      currentDate: [
        this.datePipe.transform(date.setDate(date.getDate() + 1), "yyyy-MM-dd"),
        Validators.required,
      ],
      mealDes: ["", Validators.required],
      remarks: [""],
      id: [0],
      fromTime: [new Date(), Validators.required],
      toTime: [
        this.createGMTDate(date.getFullYear(), date.getMonth(), date.getDate()),

        Validators.required,
      ],
      mealType: ["", Validators.required],
    });
  }

  createGMTDate(xiYear, xiMonth, xiDate) {
    return new Date(xiMonth + 1 + " " + xiDate + ", " + xiYear + " 11:00:00");
  }
  GetFromDateTime(xiYear, xiMonth, xiDate) {
    return new Date(xiMonth + 1 + " " + xiDate + ", " + xiYear + " 11:00:00");
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
    console.log(this.reactiveForm.value);
    if (this.reactiveForm.valid) {
      this.ToCreate.emit({
        obj: this.reactiveForm.value,
        formData: this.formData,
      });
      this.bsModalRef.hide();
    } else {
      this.commonService.ValidationShow(this.reactiveForm);
    }
  }

  url: any = "./assets/images/dashboard/600px-No_image_available.png";
  formData: FormData;
  fileToUpload: File;
  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.formData = new FormData();
      this.formData.append(event.target.files[0].name, event.target.files[0]);
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }
}
