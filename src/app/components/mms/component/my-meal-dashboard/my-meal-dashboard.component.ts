import { DatePipe } from "@angular/common";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { CommonServiceService } from "src/app/components/merchandising/Common-Services/common-service.service";
import { CommonFiles } from "src/app/components/merchandising/models/common-files.model";
import { environment } from "src/environments/environment";
import { MealDashBoardInfoModel } from "../../model/mealDashboardInfoModel";
import { MmsService } from "../../services/mms.service";
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: "app-my-meal-dashboard",
  templateUrl: "./my-meal-dashboard.component.html",
  styleUrls: ["./my-meal-dashboard.component.scss"],
})
export class MyMealDashboardComponent implements OnInit {
  thisMonthMealCount: number = 0;
  thisMonthAvgMealRate: number = 0;
  thisMonthMealCost: number = 0;
  thisMonthNetPayable: number = 0;
  thisMonthMealCancelled: number = 0;
  totalMealCostCurrentMonth: number = 0;
  totalMealCurrentMonth: number = 0;

  tokenForm: FormGroup;
  guestTokenForm: FormGroup;
  currentUser: any = null;
  currentToken: any = 0;
  tokenCancel: any = 0;
  personalTokenInfo: any[] = [];
  guestTokenInfo: any[] = [];
  mealDashboardInfo: MealDashBoardInfoModel;
  currentMonthLunchStatus: boolean = true;
  currentDate = this.datePipe.transform(new Date(), "dd/MM/yyyy");
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(
    public fb: FormBuilder,
    public datePipe: DatePipe,
    public mmsService: MmsService,
    public toastr: ToastrService,
    public commonService: CommonServiceService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.GetMealDashBoardInfo();
    this.GetCurrentUserInfo();
    this.CreateTokenForm();
    this.CreateGuestForm();
    this.GetTokenInfo();
    this.GetMealOptions();

    var encodedToken = localStorage.getItem("token");
    this.decodedToken = this.jwtHelper.decodeToken(encodedToken);
  }
  GetTokenInfo() {
    this.mmsService.GetTokenInfo().subscribe(
      (res: any[]) => {
        //debugger
        if (res) {
          console.log("token");
          console.log(res);
          var personalToken = res.filter((e) => e.tokenType == "P");

          this.personalTokenInfo = personalToken;
          this.guestTokenInfo = res.filter((e) => e.tokenType != "P");
        }
      },
      (error) => { }
    );
    this.initiateConsoleAppForGeneratedTokenList();
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

  GetCurrentUserInfo() {
    this.mmsService.GetCurrentUserInfo().subscribe(
      (res) => {
        console.log(res);
        if (res) {
          this.currentUser = res;
          console.log(res);
          this.tokenForm.patchValue(this.currentUser);
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

  CreateTokenForm() {
    this.tokenForm = this.fb.group({
      // employeeId: ["", Validators.required],
      // employeeName: [""],
      // monthId: ["", Validators.required],
      // yearId: ["", Validators.required],
      // tokenType: ["P", Validators.required],
      // tokenDate: ["", Validators.required],
      // mealOption: ["G"],

      employeeId: [""],
      employeeName: [""],
      monthId: [0],
      yearId: [0],
      tokenType: ["P"],
      tokenDate: [""],
      mealOption: ["G"],
    });
  }

  CreateGuestForm() {
    // this.guestTokenForm = this.fb.group({
    //   tokenDate: [
    //     this.datePipe.transform(new Date(), "yyyy-MM-dd"),
    //     Validators.required,
    //   ],
    //   tokenType: ["G", Validators.required],
    //   numeberOfGuest: [1, Validators.required],
    //   employeeId: ["", Validators.required],
    //   monthId: ["", Validators.required],
    //   yearId: ["", Validators.required],
    //   mealOption: ["G"],
    // });


    this.guestTokenForm = this.fb.group({
      tokenDate: [
        this.datePipe.transform(new Date(), "yyyy-MM-dd")
      ],
      tokenType: ["G"],
      numeberOfGuest: [1],
      employeeId: [""],
      monthId: [0],
      yearId: [0],
      mealOption: ["G"],
    });
  }

  DisabledGenTokenButton() {
    //if(new Date().getTime>)
  }

  //Accept healthy menu
  AcceptHealthyMenu(obj: any) {
    var date = new Date();
    if (new Date(obj.fromDateTime) < date && new Date(obj.toDateTime) > date) {
      this.tokenForm.patchValue({
        tokenType: "P",
        mealOption: "H",
        tokenDate: this.datePipe.transform(obj.curDate, "yyyy-MM-dd"),
      });
      if (this.tokenForm.valid) {
        this.mmsService.CreateMealToken(this.tokenForm.value).subscribe(
          (res) => {
            this.toastr.success("Meal Token Created Successfully");
            this.GetTokenInfo();
            this.GetMealOptions();
          },
          (error) => {
            this.toastr.error("Failed to Create Meal Token");
          }
        );
        //console.log(this.tokenForm.value);
      } else {
        alert("Invalid");
      }
    } else {
      alert("The time has expired");
    }
  }

  GenerateToken() {
    this.tokenForm.patchValue({
      tokenType: "P",
      tokenDate: this.datePipe.transform(new Date(), "yyyy-MM-dd"),
      mealOption: "G",
      employeeId: this.decodedToken.certserialnumber,
    });
    //console.log(this.tokenForm.value);
    if (this.tokenForm.valid) {
      this.mmsService.CreateMealToken(this.tokenForm.value).subscribe((res: any) => {
        this.toastr.success(res.message);
        this.GetTokenInfo();
      },
        (error) => {
          this.toastr.error("Failed to Create Meal Token");
        }
      );
      //console.log(this.tokenForm.value);
    } else {
      alert("Invalid");
    }

    //  console.log(this.time.getHours());
    //   this.time.toLocaleString('en-US', { hour: 'numeric', hour12: true })
  }
  time = new Date();

  CreateGuestToken() {
    if (this.guestTokenForm.valid) {
      this.guestTokenForm.patchValue({
        tokenDate: this.datePipe.transform(new Date(), "yyyy-MM-dd"),
        mealOption: "G",
        employeeId: this.decodedToken.certserialnumber,
      });

      this.mmsService.SaveMealTokenForGuest(this.guestTokenForm.value).subscribe((res: any) => {
        this.toastr.success(res.message);
        this.GetTokenInfo();
      },
        // (error) => {
        //   this.toastr.error("Failed to Create Meal Token");
        // }
      );
    } else {
      alert("Invalid");
    }
  }

  CancelMealToken(obj: any) {
    //if (new Date().getHours() <= 11) {
    obj.tokenCancel = 1;
    this.mmsService.CancelMealToken(obj).subscribe(
      (res: any) => {
        console.log(res);
        this.toastr.success(res.message);
        this.GetTokenInfo();
      },
      (error) => {
        this.toastr.error("Failed to Cancel Meal Token");
      }
    );
    //} else {
    // alert("The time has expired,You can try before 11 A.M.");
    //}
  }
  ActiveMealToken(obj: any) {
    //if (new Date().getHours() <= 11) {
    obj.tokenCancel = 0;
    this.mmsService.CancelMealToken(obj).subscribe(
      (res: any) => {
        console.log(res);
        this.toastr.success(res.message);
        this.GetTokenInfo();
      },
      (error) => {
        this.toastr.error("Failed to Active Meal Token");
      }
    );
    //} else {
    // alert("The time has expired,You can try before 11 A.M.");
    //}
  }

  CheckMealOptionButton() {
    debugger;
    if (this.smList.length > 0) {
      var res = this.personalTokenInfo.filter(
        (e) =>
          this.datePipe.transform(e.tokenDate, "yyyy-MM-dd") ==
          this.datePipe.transform(this.smList[0].curDate, "yyyy-MM-dd") &&
          e.mealOption == "H"
      );
      if (res.length > 0) {
        if (res[0].tokenCancel == 1) {
          return true; //inactive ache
        } else {
          return true; //active ache
        }
      } else {
        return false; //active ache
      }
    } else {
      return false; //active hobe
    }
  }
  optionsList: any[] = [];
  optionsList2: any[] = [];
  rmList: any[] = [];
  smList: any[] = [];
  GetMealOptions() {
    var date = new Date();
    this.optionsList = [];
    this.mmsService.GetMealOptions().subscribe(
      (res: any[]) => {
        // this.optionsList = res.filter(
        //   (e) =>
        //     this.datePipe.transform(e.curDate, "yyyy-MM-dd") ==
        //     this.datePipe.transform(
        //       date.setDate(date.getDate() + 1),
        //       "yyyy-MM-dd"
        //     )
        // );
        this.optionsList2 = res.filter(
          (e) =>
            new Date(e.fromDateTime) <= new Date() &&
            new Date(e.toDateTime) >= new Date()
        );
        console.log(this.optionsList2);
        this.rmList = this.optionsList2.filter((e) => e.mealType == "RM");
        this.smList = this.optionsList2.filter((e) => e.mealType == "SM");

        //this.CheckMealOptionButton();
      },
      (error) => {
        this.optionsList = [];
      }
    );
  }

  GetMealDashBoardInfo() {
    this.mmsService.GetMealDashboardInfo().subscribe(
      (res: MealDashBoardInfoModel) => {
        console.log(res);
        this.mealDashboardInfo = res;

        this.thisMonthMealCount = res.thisMonthMealCount;
        this.thisMonthAvgMealRate = res.thisMonthAvgMealRate;
        this.thisMonthMealCost = res.thisMonthMealCost;
        this.thisMonthNetPayable = res.thisMonthMealCost * 0.4;
        this.thisMonthMealCancelled = res.thisMonthMealCancelled;
      },
      (error) => {
        this.mealDashboardInfo = null;
      }
    );
  }
  modalRef?: BsModalRef;
  url = environment.fileUrl;
  images: any[];
  ShowFile(obj: any, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.images = new Array();
    //console.log(obj);
    let fileObjectId = 61;
    var id = obj.id;
    this.commonService
      .GetStyleImageByRefId(id, fileObjectId)
      .subscribe((data: CommonFiles[]) => {
        // this.commonService.commonFilesList = data;
        for (var i = 0; i < data.length; i++) {
          var ob = {
            previewImageSrc: this.url + data[i].location,
            thumbnailImageSrc: this.url + data[i].location,
            alt: "Description for Image " + i + 1,
            title: "Title " + i + 1,
          };
          this.images.push(ob);
        }

        //console.log(JSON.stringify(this.images));
        //return this.url + this.commonService.commonFilesList[0].location;
      });
  }
}
