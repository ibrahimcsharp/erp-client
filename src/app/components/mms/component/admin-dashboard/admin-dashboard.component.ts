import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MmsService } from '../../services/mms.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminDashboardInfoModel } from '../../model/AdminDashboardInfoModel';
import { AdminDashboardGuestInfoDto } from '../../model/AdminDashboardGuestInfoModel';
import { AuthService } from 'src/app/shared/service/auth.service';
import { interval } from 'rxjs';
import * as signalR from '@microsoft/signalr';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDashboardComponent implements OnInit {

  lstAdminDashboardInfo: any[] = [];
  lstAdminDashboardInfoAll: any[] = [];
  lstAdminDashboardInfoSCO: any[] = [];
  lstAdminDashboardInfoSARA: any[] = [];

  lstAdminDashboardLunchTakenInfo: any[] = [];
  lstAdminDashboardLunchTakenInfoAll: any[] = [];
  lstAdminDashboardLunchTakenInfoSCO: any[] = [];
  lstAdminDashboardLunchTakenInfoSARA: any[] = [];

  lstAdminDashboardLunchTakenNotPunchedInfo: any[] = [];
  lstAdminDashboardLunchTakenAllInfo: any[] = [];


  lstAdminDashboardGuestInfo: any[] = [];
  lstAdminDashboardGuestInfoAll: any[] = [];
  lstAdminDashboardGuestInfoSCO: any[] = [];
  lstAdminDashboardGuestInfoSARA: any[] = [];

  totalTokenCount: number = 0;
  scoTokenCount: number = 0;
  saraTokenCount: number = 0;

  totalLunchTakenCount: number = 0;
  scoLunchTakenCount: number = 0;
  saraLunchTakenCount: number = 0;

  totalGuestCount: number = 0;

  today: string;

  startTime: string;
  endTime: string;
  variableStartTimeString: string;
  variableEndTimeString: string;
  variableStartTimeStrings: string;
  variableEndTimeStrings: string;
  currentTime: any;
  currentTimes: any;
  displayMessage = false;
  errorMessage: string;
  guestTokenForm: FormGroup;
  currentUrl: string;

  constructor(
    public fb: FormBuilder,
    public datePipe: DatePipe,
    public mmsService: MmsService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private toaster: ToastrService

  ) { }

  ngOnInit(): void {
    this.GetAdminDashBoardInfo();
    this.GetAdminDashBoardLunchTakenInfo();

    // const connection = new signalR.HubConnectionBuilder()
    //   .configureLogging(signalR.LogLevel.Information)
    //   // .withUrl("http://localhost:5000/notify", {
    //   //   skipNegotiation: true,
    //   //   transport: signalR.HttpTransportType.WebSockets
    //   // })

    //   .withUrl("http://localhost:5000/notify", {
    //   })

    //   // .withUrl("http://192.168.2.246:5000/notify", {
    //   // })
    //   .withAutomaticReconnect()
    //   .build();

    const connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Information)
    .withUrl("http://localhost:5000/notify")
    // .withUrl("http://192.168.2.246:5000/notify")
    .withAutomaticReconnect()
    // .withUrl("http://192.168.27.27:5000/notify")
    //.withUrl("http://192.168.2.234:5000/notify")    
    .build();
    
    connection.start().then(function () {
      console.log('SignalR Connected!');
    }).catch(function (err) {
      return console.error(err.toString());
    });

    connection.on("BroadcastMessage", (data: any, flag: any, errorMsg: any) => {
      this.displayMessage = true;
      if (flag === 'meal_token') {
        this.GetAdminDashBoardInfoUsingSignalR(data);
      } else if (flag === 'generated_meal_token') {
        this.GetAdminDashBoardInfoUsingSignalR(data);
      } else if (flag === 'taken_meal') {
        if (errorMsg == "" || errorMsg == null || errorMsg == 'undefined') {
          this.GetAdminDashBoardLunchTakenInfoUsingSignalR(data);
        } else {
          // this.errorMessage = errorMsg; 
          // this.toaster.error(errorMsg);
          // setTimeout(() => {
          //   this.displayMessage = false;
          // }, 3000);
          // if (flag === 'admin_dashboard') {
            Swal.fire({
              title: errorMsg,
              icon: "error",
              timer: 3000, // Auto-hide after 3 seconds (3000 milliseconds)
              showConfirmButton: false // Hide the "OK" button
            });
          // }


          //alert(errorMsg);    
        }
      }
      this.cdr.detectChanges();
    });
    //this.GetAdminDashBoardInfo();
    //this.GetAdminDashBoardLunchTakenInfo();    
    //this.GeAdminDashBoardGuestInfo();


    // this.variableStartTimeString = '09:00';
    // this.variableEndTimeString = '11:59';
    // this.currentTime = new Date();
    // const [hours, minutes] = this.variableStartTimeString.split(':').map(Number);
    // const [shours, sminutes] = this.variableEndTimeString.split(':').map(Number);
    // const variableStartTime = new Date(this.currentTime.getFullYear(), this.currentTime.getMonth(), this.currentTime.getDate(), hours, minutes);
    // const variableEndTime = new Date(this.currentTime.getFullYear(), this.currentTime.getMonth(), this.currentTime.getDate(), shours, sminutes);

    // // checking the token  10 seconds after 10 seconds
    // if (this.currentTime >= variableStartTime && this.currentTime <= variableEndTime) {
    //   interval(10000).subscribe(x => {
    //     if (this.currentTime >= variableStartTime && this.currentTime <= variableEndTime) {
    //       this.GetAdminDashBoardInfo();
    //       this.currentTime = new Date();
    //     }
    //   });
    // }



    // this.variableStartTimeStrings = '12:00';
    // this.variableEndTimeStrings = '16:00';
    // this.currentTimes = new Date();
    // const [hourss, minutess] = this.variableStartTimeStrings.split(':').map(Number);
    // const [shourss, sminutess] = this.variableEndTimeStrings.split(':').map(Number);
    // const variableStartTimes = new Date(this.currentTimes.getFullYear(), this.currentTimes.getMonth(), this.currentTimes.getDate(), hourss, minutess);
    // const variableEndTimes = new Date(this.currentTimes.getFullYear(), this.currentTimes.getMonth(), this.currentTimes.getDate(), shourss, sminutess);

    // // checking the token 10 seconds after 10 seconds
    // if (this.currentTimes >= variableStartTimes && this.currentTimes <= variableEndTimes) {
    //   interval(10000).subscribe(x => {
    //     if (this.currentTimes >= variableStartTimes && this.currentTimes <= variableEndTimes) {
    //       this.GetAdminDashBoardLunchTakenInfo();
    //       this.currentTimes = new Date();
    //     }
    //   });
    // }
    this.CreateGuestForm();
    this.GetCurrentUserInfo();
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
        this.toaster.warning(
          "Selected user is not eligible to take lunch for this month",
          "Please make him eligible first"
        );
      }
    );
  }

  CreatePersonToken(objPersonalToken: any) {
    var today = new Date()
    var curHr = today.getHours()
    console.log(this.guestTokenForm.value);
    this.guestTokenForm.patchValue({
      tokenDate: this.datePipe.transform(new Date(), "yyyy-MM-dd"),
      mealOption: "G",
      tokenType: "P",
      employeeId: objPersonalToken.employeeId,
      unitType: 0

    });

    if (this.guestTokenForm.valid) {

      this.mmsService.SaveMealTokenForGuestForAdmin(this.guestTokenForm.value).subscribe((res: any) => {
        if (res) {
          this.toaster.success(res.message);
          this.mmsService.UpdateMealHadTokenForAdmin(this.guestTokenForm.value).subscribe((resp: any) => {
            if (resp) {
              //do code
              window.location.reload();
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

  private parseTime(time: string): Date {
    const [hours, minutes] = time.split(':');
    const dateTime = new Date();
    dateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    return dateTime;
  }

  SyncData() {
    this.GetAdminDashBoardInfo();
    this.GetAdminDashBoardLunchTakenInfo();
  }


  GetAdminDashBoardInfoUsingSignalR(data) {
    this.lstAdminDashboardInfo = data;
    this.lstAdminDashboardInfoAll = data;

    this.lstAdminDashboardInfo = this.lstAdminDashboardInfoAll.filter(x => x.havingToken != null && x.tokenCancel == 0 && x.guestId === '');
    this.totalTokenCount = this.lstAdminDashboardInfo.length;

    this.lstAdminDashboardInfoSCO = this.lstAdminDashboardInfoAll.filter(x => x.havingToken != null && x.company?.toUpperCase() == 'SCO' && x.tokenCancel == 0 && x.guestId === '');
    this.scoTokenCount = this.lstAdminDashboardInfoSCO.length;

    this.lstAdminDashboardInfoSARA = this.lstAdminDashboardInfoAll.filter(x => x.havingToken != null && x.company?.toUpperCase() == 'SARA' && x.tokenCancel == 0 && x.guestId === '');
    this.saraTokenCount = this.lstAdminDashboardInfoSARA.length;

    this.lstAdminDashboardGuestInfo = this.lstAdminDashboardInfoAll.filter(x => x.guestId !== '' && x.havingToken != null && x.tokenCancel == 0);
    this.totalGuestCount = this.lstAdminDashboardGuestInfo.length;

    this.totalTokenCount += this.totalGuestCount;

  }

  GetAdminDashBoardLunchTakenInfoUsingSignalR(dataList) {
    this.lstAdminDashboardLunchTakenInfo = dataList;
    this.lstAdminDashboardLunchTakenInfoAll = dataList;

    this.lstAdminDashboardLunchTakenInfo = this.lstAdminDashboardLunchTakenInfoAll.filter(x => x.tokenNumber !== '' && x.tokenCancel == 0);
    this.totalLunchTakenCount = this.lstAdminDashboardLunchTakenInfo.length;

    this.lstAdminDashboardLunchTakenInfoSCO = this.lstAdminDashboardLunchTakenInfoAll.filter(x => x.tokenNumber !== '' && x.company?.toUpperCase() == 'SCO' && x.tokenCancel == 0);
    this.scoLunchTakenCount = this.lstAdminDashboardLunchTakenInfoSCO.length;

    this.lstAdminDashboardLunchTakenInfoSARA = this.lstAdminDashboardLunchTakenInfoAll.filter(x => x.tokenNumber !== '' && x.company?.toUpperCase() == 'SARA' && x.tokenCancel == 0);
    this.saraLunchTakenCount = this.lstAdminDashboardLunchTakenInfoSARA.length;

  }

  GetAdminDashBoardInfo() {
    this.mmsService.GetAdminDashboardInfo().subscribe((res: AdminDashboardInfoModel[]) => {
      this.lstAdminDashboardInfo = res;
      this.lstAdminDashboardInfoAll = res;

      this.lstAdminDashboardInfo = this.lstAdminDashboardInfoAll.filter(x => x.havingToken != null && x.tokenCancel == 0 && x.guestId == null);
      this.totalTokenCount = this.lstAdminDashboardInfo.length;

      this.lstAdminDashboardInfoSCO = this.lstAdminDashboardInfoAll.filter(x => x.havingToken != null && x.company?.toUpperCase() == 'SCO' && x.tokenCancel == 0 && x.guestId == null);
      this.scoTokenCount = this.lstAdminDashboardInfoSCO.length;

      this.lstAdminDashboardInfoSARA = this.lstAdminDashboardInfoAll.filter(x => x.havingToken != null && x.company?.toUpperCase() == 'SARA' && x.tokenCancel == 0 && x.guestId == null);
      this.saraTokenCount = this.lstAdminDashboardInfoSARA.length;

      this.lstAdminDashboardGuestInfo = this.lstAdminDashboardInfoAll.filter(x => x.guestId != null && x.havingToken != null && x.tokenCancel == 0);
      this.totalGuestCount = this.lstAdminDashboardGuestInfo.length;

      this.totalTokenCount += this.totalGuestCount;

    },
      (error) => {
        this.lstAdminDashboardInfo = null;
      }
    );
  }

  GetAdminDashBoardLunchTakenInfo() {
    this.mmsService.GetAdminDashboardLunchTakenInfo().subscribe((res: AdminDashboardGuestInfoDto[]) => {
      this.lstAdminDashboardLunchTakenInfo = res;
      this.lstAdminDashboardLunchTakenInfoAll = res;

      this.lstAdminDashboardLunchTakenInfo = this.lstAdminDashboardLunchTakenInfoAll.filter(x => x.tokenNumber != null && x.tokenCancel == 0);
      this.totalLunchTakenCount = this.lstAdminDashboardLunchTakenInfo.length;

      this.lstAdminDashboardLunchTakenInfoSCO = this.lstAdminDashboardLunchTakenInfoAll.filter(x => x.tokenNumber != null && x.company?.toUpperCase() == 'SCO' && x.tokenCancel == 0);
      this.scoLunchTakenCount = this.lstAdminDashboardLunchTakenInfoSCO.length;

      this.lstAdminDashboardLunchTakenInfoSARA = this.lstAdminDashboardLunchTakenInfoAll.filter(x => x.tokenNumber != null && x.company?.toUpperCase() == 'SARA' && x.tokenCancel == 0);
      this.saraLunchTakenCount = this.lstAdminDashboardLunchTakenInfoSARA.length;

    },
      (error) => {
        this.lstAdminDashboardLunchTakenInfo = null;
      }
    );
  }



  GeAdminDashBoardGuestInfo() {
    this.today = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    this.mmsService.GetAdminDashboardGuestInfo().subscribe((res: AdminDashboardInfoModel[]) => {
      this.lstAdminDashboardGuestInfo = res;
      this.lstAdminDashboardGuestInfoAll = res;


      this.lstAdminDashboardGuestInfo = this.lstAdminDashboardGuestInfoAll.filter(x => x.guestId != null && this.datePipe.transform(new Date(x.tokenGenDate), 'dd-MM-yyyy') == this.today);
      this.totalGuestCount = this.lstAdminDashboardGuestInfo.length;



    },
      (error) => {
        this.lstAdminDashboardLunchTakenInfo = null;
      }
    );
  }

}
