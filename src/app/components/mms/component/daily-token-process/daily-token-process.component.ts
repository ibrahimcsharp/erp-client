import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { MmsReportService } from "../../services/mms-report.service";
import { MmsService } from "../../services/mms.service";
import { AdminDashboardGuestInfoDto } from "../../model/AdminDashboardGuestInfoModel";
import { AdminDashboardInfoModel } from "../../model/AdminDashboardInfoModel";

@Component({
  selector: "app-daily-token-process",
  templateUrl: "./daily-token-process.component.html",
  styleUrls: ["./daily-token-process.component.scss"],
})
export class DailyTokenProcessComponent implements OnInit {
  customForm: FormGroup;
  spinnerName = "createSpinner";
  empList: any[] = [];
  tokenCancelEmpList: any[] = [];

  GScoEmpList: any[] = [];
  GSaraEmplist: any[] = [];
  HSaraEmpList: any[] = [];
  HScoEmpList: any[] = [];
  lstAdminDashboardLunchTakenInfo: any[] = [];
  lstAdminDashboardLunchTakenInfoAll: any[] = [];
  lstAdminDashboardGuestInfo: any[] = [];
  lstAdminDashboardGuestInfoAll: any[] = [];

  totalLunchTakenCount: number = 0;
  guestTokenForm: FormGroup;
  today: string;
  totalGuestCount: number;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    public mmsService: MmsService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private mmsReportService: MmsReportService
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.CreateGuestForm();
    this.GetCurrentUserInfo();

  }

  CreateForm() {
    this.customForm = this.fb.group({
      currentDate: [
        this.datePipe.transform(new Date(), "yyyy-MM-dd"),
        Validators.required,
      ],
      tokenType: "P",
    });
  }

  Search() {
    this.lstAdminDashboardLunchTakenInfo = [];
    this.lstAdminDashboardGuestInfo = [];
    this.tokenCancelEmpList = [];
    if (this.customForm.valid) {
      this.spinner.show();
      this.mmsService.GetTokenListForAll(this.customForm.value.currentDate).subscribe((res: any[]) => {
        if (res) {
          debugger
          this.empList = res;
          this.GScoEmpList = res.filter((e) => e.mealOption == "G" && e.unitName == "SCO");
          // this.GScoEmpList = res;
          this.HScoEmpList = res.filter((e) => e.mealOption == "H" && e.unitName == "SCO");
          this.GSaraEmplist = res.filter((e) => e.mealOption == "G" && e.unitName == "SaRa");
          this.HSaraEmpList = res.filter((e) => e.mealOption == "H" && e.unitName == "SaRa");
          //console.log(JSON.stringify(res));
          this.spinner.hide();
          this.GetAdminDashBoardLunchTakenInfo();
          this.GeAdminDashBoardGuestInfo();
          this.GetTokenCancelEmployeeMealTokenList();
        }
      },
        (error) => {
          this.empList = [];
          this.spinner.hide();
        }
      );
    }
  }

  GetTokenCancelEmployeeMealTokenList() {
    this.mmsService.GetTokenList().subscribe((res: any[]) => {
      if (res) {
        this.tokenCancelEmpList = res.filter((e) => e.tokenCancel == 1 && this.datePipe.transform(e.tokenGenDate, "yyyy-MM-dd") == this.customForm.value.currentDate);
      }
    },
      (error) => {
        this.empList = [];
        this.spinner.hide();
      }
    );
  }



  CreateGuestForm() {
    this.guestTokenForm = this.fb.group({
      tokenDate: [
        this.datePipe.transform(new Date(), "yyyy-MM-dd"),
        Validators.required,
      ],
      tokenType: ["P", Validators.required],
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
          "Selected user is not eligible to take lunch for this month",
          "Please make him eligible first"
        );
      }
    );
  }

  CreatePersonToken(objPersonalToken: any) {
    var today = new Date()
    var curHr = today.getHours()
    this.guestTokenForm.patchValue({
      // tokenDate: this.datePipe.transform(new Date(), "yyyy-MM-dd"),
      tokenDate: this.datePipe.transform(this.customForm.value.currentDate, "yyyy-MM-dd"),
      fromDate: this.datePipe.transform(this.customForm.value.currentDate, "yyyy-MM-dd"),
      toDate: this.datePipe.transform(this.customForm.value.currentDate, "yyyy-MM-dd"),
      mealOption: "G",
      tokenType: "P",
      employeeId: objPersonalToken.employeeId,
      unitType: 0
    });

    if (this.guestTokenForm.valid) {

      this.mmsService.SaveMealTokenForGuestForAdmin(this.guestTokenForm.value).subscribe((res: any) => {
        if (res) {
          this.toastr.success(res.message);
          this.mmsService.UpdateMealHadTokenForAdmin(this.guestTokenForm.value).subscribe((resp: any) => {
            if (resp) {
              //do code
              //window.location.reload();
              this.Search();
              this.GetAdminDashBoardLunchTakenInfo();
            }
          });

        }
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

  GetAdminDashBoardLunchTakenInfo() {
    this.mmsService.GetLunchTakenListForAllByDate(this.customForm.value.currentDate).subscribe((res: AdminDashboardGuestInfoDto[]) => {
      this.lstAdminDashboardLunchTakenInfo = res;
      this.lstAdminDashboardLunchTakenInfoAll = res;

      this.lstAdminDashboardLunchTakenInfo = this.lstAdminDashboardLunchTakenInfoAll.filter(x => x.tokenNumber != null && x.tokenCancel == 0 && x.hasMealToken == 0);
      this.totalLunchTakenCount = this.lstAdminDashboardLunchTakenInfo.length;
    },
      (error) => {
        this.lstAdminDashboardLunchTakenInfo = null;
      }
    );
  }

  GeAdminDashBoardGuestInfo() {
    // this.today = this.datePipe.transform(this.customForm.value.currentDate, 'YYYY/MM/DD');
    this.mmsService.GetAdminDashboardGuestInfoByDate(this.customForm.value.currentDate).subscribe((res: AdminDashboardInfoModel[]) => {
      this.lstAdminDashboardGuestInfo = res;
      this.lstAdminDashboardGuestInfoAll = res;


      this.lstAdminDashboardGuestInfo = this.lstAdminDashboardGuestInfoAll.filter(x => x.guestId != null && x.tokenCancel == 0);
      this.totalGuestCount = this.lstAdminDashboardGuestInfo.length;



    },
      (error) => {
        this.lstAdminDashboardGuestInfo = null;
      }
    );
  }

  TokenProcess() {
    if (this.customForm.valid) {
      this.spinner.show();
      this.mmsService.CreateMealTokenForAll(this.customForm.value).subscribe(
        (res) => {
          this.toastr.success("Process Successfully Done!");
          this.spinner.hide();
        },
        (error) => {
          //alert("Failed");
          this.toastr.error("Failed to process");
          this.spinner.hide();
        }
      );
    } else {
      this.toastr.warning("Invalid Form");
    }
  }

  print() {
    this.mmsReportService.CashBookStatement(
      this.empList,
      this.GScoEmpList,
      this.HScoEmpList,
      this.GSaraEmplist,
      this.HSaraEmpList,
      this.lstAdminDashboardLunchTakenInfo,
      this.lstAdminDashboardGuestInfo,
      this.tokenCancelEmpList,
      this.customForm.value.currentDate,
      "open"
    );
  }

  CancelMealToken(obj: any) {
    if (new Date().getHours() <= 11) {
      obj.tokenCancel = 1;
      this.mmsService.CancelMealToken(obj).subscribe(
        (res) => {
          this.toastr.success("Meal Token Cancelled Successfully");
          this.Search();
        },
        (error) => {
          this.toastr.error("Failed to Cancel Meal Token");
        }
      );
    } else {
      alert("The time has expired,You can try before 11 A.M.");
    }
  }
  ActiveMealToken(obj: any) {
    if (new Date().getHours() <= 11) {
      obj.tokenCancel = 0;
      this.mmsService.CancelMealToken(obj).subscribe(
        (res) => {
          this.toastr.success("Meal Token Activated Successfully");
          this.Search();
        },
        (error) => {
          this.toastr.error("Failed to Active Meal Token");
        }
      );
    } else {
      alert("The time has expired,You can try before 11 A.M.");
    }
  }

  async GetDailyMealRecReportExcel() {
    this.mmsReportService.GetDailyMealRecReportExcel(
      this.empList,
      this.GScoEmpList,
      this.HScoEmpList,
      this.GSaraEmplist,
      this.HSaraEmpList,
      this.lstAdminDashboardLunchTakenInfo,
      this.lstAdminDashboardGuestInfo,
      this.tokenCancelEmpList,
      "open"
    );
  }
}
