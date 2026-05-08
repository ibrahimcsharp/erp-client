import { DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { MmsService } from "../../services/mms.service";
import * as signalR from '@microsoft/signalr';

@Component({
  selector: "app-gen-token-from-gate",
  templateUrl: "./gen-token-from-gate.component.html",
  styleUrls: ["./gen-token-from-gate.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenTokenFromGateComponent implements OnInit {
  empList: any[] = [];
  currentDate = new Date();
  guestTokenForm: FormGroup;

  constructor(
    public mmsService: MmsService,
    public spinner: NgxSpinnerService,
    private toaster: ToastrService,
    public fb: FormBuilder,
    public datePipe: DatePipe,
    private cdr: ChangeDetectorRef,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.CreateGuestForm();
    this.GetMealTokenList();
    this.GetCurrentUserInfo();
  }
  GetMealTokenList() {
    this.mmsService.GetTokenList().subscribe((res: any[]) => {
      this.empList = res;
      this.cdr.detectChanges();
    },
      (error) => {
        this.empList = [];
      }
    );
    if (this.empList.length > 0) {
      this.initiateConsoleAppForGeneratedTokenList();
    }

  }

  activeToken(obj: any) {
    obj.tokenCancel = 0;
    this.mmsService.CancelMealTokenForAdmin(obj).subscribe(
      (res: any) => {
        //console.log(res);
        this.toaster.success(res.message);
        this.GetMealTokenList();
      },
      (error) => {
        this.toaster.error("Failed to Active Meal Token");
      }
    );
  }

  cancelToken(obj: any) {
    obj.tokenCancel = 1;
    this.mmsService.CancelMealTokenForAdmin(obj).subscribe(
      (res: any) => {
        //console.log(res);
        this.toaster.success(res.message);

        this.GetMealTokenList();
      },
      (error) => {
        this.toaster.error("Failed to Cancel Meal Token");
      }
    );
  }

  CreateGuestForm() {
    this.guestTokenForm = this.fb.group({
      tokenDate: [
        this.datePipe.transform(new Date(), "yyyy-MM-dd"),
        Validators.required,
      ],
      tokenType: ["O", Validators.required],
      numeberOfGuest: [1, Validators.required],
      employeeId: ["", Validators.required],
      monthId: [0],
      yearId: [0],
      mealOption: ["G", Validators.required],
      fromDate: [this.datePipe.transform(new Date(), "yyyy-MM-dd"), Validators.required],
      toDate: [this.datePipe.transform(new Date(), "yyyy-MM-dd"), Validators.required],
      unitType: ["", Validators.required],
    });
  }

  CreateGuestToken() {
    var today = new Date()
    var curHr = today.getHours()
    debugger
    if (curHr < 24) {
      if (this.guestTokenForm.value.tokenType == "O" || this.guestTokenForm.value.tokenType == "G" || this.guestTokenForm.value.tokenType == "P") {
        //console.log('good morning')
        if (this.guestTokenForm.valid) {
          this.guestTokenForm.patchValue({
            tokenDate: this.datePipe.transform(new Date(), "yyyy-MM-dd"),
          });

          this.mmsService.SaveMealTokenForGuestForAdmin(this.guestTokenForm.value).subscribe((res: any) => {
            this.toastr.success(res.message);
            this.CreateGuestForm();
            this.GetMealTokenList();
          },
            // (error) => {
            //   this.toastr.error("Failed to Create Meal Token");
            // }
          );
        } else {
          alert("Invalid");
          console.log(this.guestTokenForm);
        }
      }
    }
    else {
      //console.log('good evening');
      //alert("Time is over");
      this.toaster.warning("You can not Generent Token after 12:00PM", "Time is over")
    }

  }

  initiateConsoleAppForGeneratedTokenList() {
    this.mmsService.GetGeneratedTokenFromConsoleApp().subscribe((res) => {
    },
      (error) => {
        this.toastr.warning(
          "Check console",
          "Console app error"
        );
      }
    );
  }
  currentUser: any = null;
  currentMonthLunchStatus: boolean = true;
  GetCurrentUserInfo() {
    this.mmsService.GetCurrentUserInfo().subscribe((res) => {
      if (res) {
        this.currentUser = res;
        this.guestTokenForm.patchValue(this.currentUser);
      }
    },
      (error) => {
        this.currentUser = null;
        this.currentMonthLunchStatus = false;
        this.toastr.warning(
          "You are not eligible to take lunch for this month",
          "Please Contact with admin"
        );
      }
    );
  }
  employeeList: any[] = [];
  GetEmployees() {
    if (this.guestTokenForm.value.unitType > 0) {
      this.spinner.show();
      //start coment by shuvo
      // this.mmsService.GetEmployess(this.guestTokenForm.value.unitType).subscribe(
      //end coment by shuvo
      this.mmsService.GetEmployessFromDataBase(this.guestTokenForm.value.unitType).subscribe((res: any[]) => {
        if (res) {
          this.employeeList = res;
          this.spinner.hide();
        }
      },
        (error) => {
          this.employeeList = [];
          this.spinner.hide();
        }
      );
    } else {
      this.employeeList = [];
    }
  }
}
