import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { EVoteService } from "src/app/components/e-vote/services/e-vote.service";
import { Notifications } from "src/app/components/notification/model/notification";
import { AlertifyService } from "../../service/alertify.service";
import { NavService } from "../../service/nav.service";
import * as signalR from '@microsoft/signalr';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
import { AuthService } from "../../service/auth.service";
import * as moment from "moment";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  public right_sidebar = false;
  public open = false;
  public openNav = false;
  public isOpenMobile: boolean;
  notifications: Notifications[] = [];
  notificationLength: number = 0;
  branchName = "";
  finYear = "";
  searchTerm: string = '';

  NonBookingList: any[];
  anotherNonBookingList: any[];
  notificationsList: any[];
  filteredNotificationsList: any[];
  AllGatePassEmployeeList: any[] = new Array();
  criticalItemBookingNotificationCount: number = 0;

  @Output() rightSidebarEvent = new EventEmitter<boolean>();

  constructor(
    public navServices: NavService,
    private alertify: AlertifyService,
    private router: Router,
    private evoteService: EVoteService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
    public authService: AuthService,
    
  ) {
    this.branchName = localStorage.getItem("branchName");
    this.finYear = localStorage.getItem("finYear");
    // this.evoteService.GetNotifications().subscribe(
    //   (res: Notifications[]) => {
    //     this.notifications = res;
    //     this.notificationLength = this.notifications.length;
    //   },
    //   (error) => {}
    // );
  }

  collapseSidebar() {
    this.open = !this.open;
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
  }
  right_side_bar() {
    this.right_sidebar = !this.right_sidebar;
    this.rightSidebarEvent.emit(this.right_sidebar);
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }

  ngOnInit() {
    //   const connection = new signalR.HubConnectionBuilder()
    //   .configureLogging(signalR.LogLevel.Information)

    //    .withUrl("http://localhost:5000/notifyBOM")
    //   //.withUrl("http://192.168.2.246:5000/notifyBOM")   
    //   .withAutomaticReconnect()
    //   .build();

    // connection.start().then(function () {
    //   console.log('SignalR Connected!');
    // }).catch(function (err) {
    //   return console.error(err.toString());
    // });

    // connection.on("BroadcastMessage", (data: any, flag: any, errorMsg: any) => {
    //   debugger
    //   //this.displayMessage = true;
    //   if (flag === 'bom_data') {
    //     this.notifications = data;
    //     this.notificationLength = this.notifications.length;
    //     console.log('notification data', data);

    //     debugger
    //   }  else {
    //     if (errorMsg == "" || errorMsg == null || errorMsg == 'undefined') {
    //      // this.GetAdminDashBoardLunchTakenInfoUsingSignalR(data);
    //     } else {
    //       Swal.fire({
    //         title: errorMsg,
    //         icon: "error",
    //         timer: 2000, // Auto-hide after 3 seconds (3000 milliseconds)
    //         showConfirmButton: false // Hide the "OK" button
    //       });   
    //     }
    //   }
    //   this.cdr.detectChanges();
    // });
    this.LoadEmployeeList();
  }

  async LoadNonBookingSummaryInfo() {
    this.spinner.show();
    // this.NonBookingList = await this.service.GetNonBookingCriticalItemListToPromise();
    this.NonBookingList = []
    if (this.NonBookingList.length > 0) {
      this.spinner.hide();
      this.anotherNonBookingList = [];
      this.NonBookingList.forEach(element => {
        element.buyDate = this.datePipe.transform(new Date(element.buyDate), 'dd-MM-yyyy');
        element.createDate = this.datePipe.transform(new Date(element.createDate), 'dd-MM-yyyy');
        // element.createDate = moment(element.createDate, 'DD-MM-YYYY');

        if (this.AllGatePassEmployeeList.length > 0) {
          this.AllGatePassEmployeeList.forEach(selem => {
            if (selem.employeeId == element.createBy) {
              const isDuplicate = this.anotherNonBookingList.some(item => item.itemId === element.itemId && item.createBy == element.createBy && item.bomId == element.bomId);
              if (!isDuplicate) {
                this.anotherNonBookingList.push(element);
              }
            }
          });
        }
      });
      this.notificationsList = [];
      this.filteredNotificationsList = [];
      if (this.anotherNonBookingList.length > 0) {
        this.anotherNonBookingList.forEach(noBook => {
          var toDay = moment().startOf('day');


          //let formattedCreateDate = noBook.createDate;
          // let formattedCreateDate =  new Date(datePipe.transform(new Date(noBook.createDate), 'dd-MM-yyyy HH:mm:ss'));
          // formattedCreateDate.setDate(formattedCreateDate.getDate() + 1); // 1 day added for CRTICAL items
          let formattedCreateDate = moment(noBook.createDate, 'DD-MM-YYYY HH:mm:ss');
          if (noBook.criticalItemFact == 1) {
            formattedCreateDate.add(1, 'day'); // 1 day added for CRTICAL items
          } else {
            formattedCreateDate.add(3, 'day'); // 3 day added for Other items
          }



          if (toDay.isSameOrAfter(formattedCreateDate.startOf('day'))) {
            const isDuplicate = this.notificationsList.some(item => item.itemId === noBook.itemId && item.createBy == noBook.createBy && item.bomId == noBook.bomId);
            if (!isDuplicate) {
              this.notificationsList.push(noBook);
            }
          }

        });

      }
      if (this.notificationsList.length > 0) {
        //const bomWiseCriticalItemList = this.notificationsList.filter((b, i) => this.notificationsList.findIndex((t) => b.bomId === t.bomId) === i);
        //if (bomWiseCriticalItemList.length > 0) {
        this.criticalItemBookingNotificationCount = this.notificationsList.length;
        //} else {
        //  this.criticalItemBookingNotificationCount = 0;
        //}
        this.notificationsList.forEach(notiLst => {
          //var toDay: Date = new Date(); // Current date
          //var dateDifference = this.CalculateDateDifference(new Date(notiLst.createDate), toDay);

          var toDay = moment();
          let formattedCreateDate = moment(notiLst.createDate, 'DD-MM-YYYY HH:mm:ss');
          var dateDifference = toDay.diff(formattedCreateDate, 'days');

          notiLst.notificationStrDays = dateDifference + " days delay ";
          notiLst.notificationStr = "Buyer: " + notiLst.buyerName + "; Season-Year: " + notiLst.seasonYear + "; Style: " + notiLst.styleName + "; Item: " + notiLst.itemName + "."

          notiLst.createDate = formattedCreateDate;

        });
        this.filteredNotificationsList = this.notificationsList;

      } else {
        this.criticalItemBookingNotificationCount = 0;
      }

    }
    else {
      //this.toastr.warning("No Data Found!", "Non Booking Critical Item Info");
      this.spinner.hide();
    }
  }

  filterList() {
    const lowerCaseTerm = this.searchTerm.toLowerCase(); // Convert search term to lowercase for case-insensitive search
 
    this.filteredNotificationsList = this.notificationsList.filter(item =>
      item.buyerName.toLowerCase().includes(lowerCaseTerm) ||
      item.seasonName.toLowerCase().includes(lowerCaseTerm) ||
      item.itemName.toLowerCase().includes(lowerCaseTerm) ||
      item.poNo === lowerCaseTerm || // Exact match for poNo
      item.bomNo.toLowerCase().includes(lowerCaseTerm) ||
      item.styleName.toLowerCase().includes(lowerCaseTerm) ||
      item.seasonYear.toLowerCase().includes(lowerCaseTerm) ||
      item.createByName.toLowerCase().includes(lowerCaseTerm) ||
      item.notificationStrDays.toLowerCase().includes(lowerCaseTerm)
    );

    this.criticalItemBookingNotificationCount =  this.filteredNotificationsList.length;

    if (this.filteredNotificationsList.length == 0) {
      this.filteredNotificationsList = this.notificationsList;
      this.criticalItemBookingNotificationCount = 0;
    }
  }

  CalculateDateDifference(startDate: Date, endDate: Date): number {
    // Get the difference in time (milliseconds)
    const timeDifference = endDate.getTime() - startDate.getTime();
    // const timeDifference = startDate.getTime() ;

    // Convert time difference from milliseconds to days
    return Math.floor(timeDifference / (1000 * 3600 * 24));
  }

  async LoadEmployeeList() {
    var loggedInUserId = this.authService.decodedToken?.unique_name;
    this.AllGatePassEmployeeList = await this.evoteService.GatePassListBySupervisorToPromise(loggedInUserId);
    if (this.AllGatePassEmployeeList.length > 0) {
      this.LoadNonBookingSummaryInfo();
    }
    // else {
    //   this.toastr.warning("No Data Found", "Gate Pass Employee");
    // }
    return;
    // this.gatePassservice.GatePassListBySupervisor(loggedInUserId).subscribe((data: any[]) => {
    //   this.AllGatePassEmployeeList = data;
    // },
    //   (error) => {
    //     this.toastr.warning("No Data Found", "Gate Pass Employee");

    //   }
    // );
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("branchName");
    localStorage.removeItem("branchId");
    localStorage.removeItem("finYear");
    localStorage.removeItem("finYearId");
    this.alertify.success("loged out");
    this.router.navigate(["/login"]);
  }
  // getMessage(){
  //   this.evoteService.GetMessage().subscribe(
  //     (res: any[]) => {
  //       console.log(res);
  //       return res[0].message;
  //      // this.notificationLength = this.notifications.length;
  //     },
  //     (error) => {}
  //   );
  //   //return 'ERP SERVER MAINTENANCE REMINDER - PLEASE DONT INPUT/REFRESH ANY DATA IN ERP SOFTWARE. AT 06.25PM TO 08.00PM';
  // }
}
