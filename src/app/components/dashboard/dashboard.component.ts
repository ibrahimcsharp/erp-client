import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CalendarOptions } from "@fullcalendar/angular";
import { Message } from "primeng/api";

import { MenuService } from "../admin/Services/menu.service";
import { ConferrenceService } from "../conferrence-room/services/conferrence.service";
import { CommonServiceService } from "../merchandising/Common-Services/common-service.service";
import { PoReport } from "../merchandising/order-management/model/po-report";
import { OrderManagementService } from "../merchandising/order-management/service/order-management.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  scrolledToBottom = false;
  basicData: any;
  poReport: PoReport[];
  poReportList: any[];
  excelUploadForm: FormGroup;
  buyerId: number = 0;
  PLabel = new Array();
  PData = new Array();
  PoReceivedQty = new Array();
  PoReceivedUnitPrice = new Array();
  PoDelUnitPrice = new Array();
  PoDelQty = new Array();
  CM = new Array();
  totalDeleveryQty: any = 0;
  totalJanQty: any = 0;
  totalFebQty: any = 0;
  totalMarcQty: any = 0;
  totalAprQty: any = 0;
  totalMayQty: any = 0;
  totalJunQty: any = 0;
  totalJulQty: any = 0;
  totalAugQty: any = 0;
  totalSepQty: any = 0;
  totalOctQty: any = 0;
  totalNovQty: any = 0;
  totalDecQty: any = 0;


  basicOptions: any;
  constructor(
    private menuService: MenuService,
    public omService: OrderManagementService,
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: ConferrenceService,
  ) {}
  data: any;
  ngOnInit() { 
    this.resetForm();
    this.GetBuyerWiseDelQtyReport();
    this.GetBuyerWiseDelQtyReport_Popup();
    this.commonService.LoadBuyerList();
    this.service.GatEmployeeWiseMeetingList().subscribe(
      (data: any[]) => {
        for(let i = 0 ; i< data.length;i++){
          this.eventsObj =null;
          this.eventsObj ={};
          let meetingInfo = "Time : "+data[i].startTime+"    ,Department : "+data[i].department+",Agenda : "+data[i].agenda+",Room : "+data[i].roomName;
          //let meetingInfo = data[i].startTime;
          this.eventsObj.title = meetingInfo;
          this.eventsObj.date = data[i].bookDate;
          this.eventsObj.color = "#1a6540";
          this.eventsBindForCalendar.push(this.eventsObj);
        }
        this.calendarOptions.events = this.eventsBindForCalendar;
      },
      (error) => {
        //this.toastr.warning("No Meeting List Found", "Conference");
      }
    );
    this.InitialOrderQtySum();
  }
 
  GetPoMOnthWiseBuyerQty() {
    this.omService.GetMonthWisePoWithBuyerID(this.buyerId).subscribe(
      (res: any[]) => {
        if (res) {
          this.poReportList = res;
          this.GetDynamicValue();
        }
      },
      (error) => {}
    );
  }
  resetForm() {
    this.excelUploadForm = this.fb.group({
      buyerId: [null, Validators.required],
    });
  }
  GetDynamicValue() {
    this.PLabel = [];
    this.PoReceivedQty = [];
    this.PoReceivedUnitPrice = [];
    this.PoDelUnitPrice = [];
    this.PoDelQty = [];
    this.CM = [];
    for (var i = 0; i < this.poReportList.length; i++) {
      this.PLabel.push(this.poReportList[i].monthName);
      this.PoReceivedQty.push(this.poReportList[i].rcvGmtQty);
      this.PoReceivedUnitPrice.push(this.poReportList[i].rcvUnitPrice);
      this.PoDelQty.push(this.poReportList[i].delGmtQty);
      this.PoDelUnitPrice.push(this.poReportList[i].delUnitPrice);
      this.CM.push(this.poReportList[i].cm);
    }
    this.LoadBarChart();

  }
  LoadBarChart() {
    this.basicData = {
      labels: this.PLabel,
      datasets: [
        {
          label: "PO Receive Qty",
          backgroundColor: "#42A5F5",
          data: this.PoReceivedQty,
        },
        // {
        //   label: "PO Rcv. FOB",
        //   backgroundColor: "#FFA726",
        //   data: this.PoReceivedUnitPrice,
        // },
        {
          label: "PO Delivery Qty",
          backgroundColor: "#52ff52",
          data: this.PoDelQty,
        },
        // {
        //   label: "PO Del. FOB",
        //   backgroundColor: "#808000",
        //   data: this.PoDelUnitPrice,
        // },
        // {
        //   label: "CM",
        //   backgroundColor: "#E6BF83",
        //   data: this.CM,
        // },
      ],
    };
  }
  LoadSeason(event) {
    if (event != null) {
      this.buyerId = event;
      this.GetPoMOnthWiseBuyerQty();
    } else {
      this.buyerId = 0;
    }
  }

  //Start Calendar
  displayPosition: boolean;
  position: string;
  events: any[];
  eventsBindForCalendar: any[] = [];
  eventsObj :any={};
  options: any;
  meetingInfo:string="";
  meetingInfoTime:string="";
  meetingInfoDepartment:string="";
  meetingInfoAgenda:string="";
  meetingInfoRoom:string="";

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth', 
    eventClick: this.showMessage.bind(this)
  };
  
  showMessage(arg){
    this.meetingInfo = arg.event.title;
    var splitted = this.meetingInfo.split(",");
    this.meetingInfoTime=splitted[0].trim();
    this.meetingInfoDepartment=splitted[1];
    this.meetingInfoAgenda=splitted[2];
    this.meetingInfoRoom=splitted[3];
    this.showPositionDialog('center');
  }

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;

}

  // handleDateClick(arg) {
  //   alert('date click! ' + arg.dateStr)
  // }

  poStyleReport: any[]=[];
  GetBuyerWiseDelQtyReport() {
    this.omService.GetBuyerWiseDeliveryQtyReport().subscribe(
      (res: any[]) => {
        this.poStyleReport = res;
      },
      (error) => {}
    );
    
  }
  
  displayBasic: boolean=false;
  OpenNew() {
    this.displayBasic = true;
  }

  poStyleReportPopup: any[]=[];
  GetBuyerWiseDelQtyReport_Popup() {
    this.omService.GetBuyerWiseDeliveryQtyReport().subscribe(
      (res: any[]) => {
        this.poStyleReportPopup = res;  
      },
      (error) => {}
    );    
  }
 

  InitialOrderQtySum() {
    this.omService.GetBuyerWiseDeliveryQtyReport().subscribe(
      (res: any[]) => {
        this.poStyleReport = res;  
        this.totalDeleveryQty = 0;
        this.totalJanQty = 0; 
        this.totalFebQty = 0 ;
        this.totalMarcQty = 0;
        this.totalAprQty = 0 ;
        this.totalMayQty = 0 ;
        this.totalJunQty = 0 ;
        this.totalJulQty = 0 ;
        this.totalAugQty =  0;
        this.totalSepQty =  0;
        this.totalOctQty =  0;
        this.totalNovQty = 0;
        this.totalDecQty = 0;      
        this.poStyleReport.forEach((e: any) => {
          this.totalDeleveryQty = Number(this.totalDeleveryQty) + Number(e.totalQty);
          this.totalJanQty = Number(this.totalJanQty) + Number(e.january);
          this.totalFebQty = Number(this.totalFebQty) + Number(e.february);
          this.totalMarcQty = Number(this.totalMarcQty) + Number(e.march);
          this.totalAprQty = Number(this.totalAprQty) + Number(e.april);
          this.totalMayQty = Number(this.totalMayQty) + Number(e.may);
          this.totalJunQty = Number(this.totalJunQty) + Number(e.june);
          this.totalJulQty = Number(this.totalJulQty) + Number(e.july);
          this.totalAugQty = Number(this.totalAugQty) + Number(e.august);
          this.totalSepQty = Number(this.totalSepQty) + Number(e.september);
          this.totalOctQty = Number(this.totalOctQty) + Number(e.october);
          this.totalNovQty = Number(this.totalNovQty) + Number(e.november);
          this.totalDecQty = Number(this.totalDecQty) + Number(e.december);
          // this.totalOrderValue = (
          //   Number(this.totalOrderValue) + Number(e.totalPrice)
          // ).toFixed(2);
        });    
      },
      (error) => {}
    );
  }
  
  CalculateOrderQty(obj) {

    
    this.totalDeleveryQty = 0;
    this.totalJanQty = 0; 
    this.totalFebQty = 0 ;
    this.totalMarcQty = 0;
    this.totalAprQty = 0 ;
    this.totalMayQty = 0 ;
    this.totalJunQty = 0 ;
    this.totalJulQty = 0 ;
    this.totalAugQty =  0;
    this.totalSepQty =  0;
    this.totalOctQty =  0;
    this.totalNovQty = 0;
    this.totalDecQty = 0;
    let p = new Array();
    p.push(obj.filteredValue);
    if (p[0] != null) {
      p[0].forEach((e: any) => {
        // this.totalOrderQty = this.totalOrderQty + Number(e.orderQty);
        // this.totalOrderValue = (
        //   Number(this.totalOrderValue) + Number(e.totalPrice)
        // ).toFixed(2);
        this.totalDeleveryQty = Number(this.totalDeleveryQty) + Number(e.totalQty);
        this.totalJanQty = Number(this.totalJanQty) + Number(e.january);
        this.totalFebQty = Number(this.totalFebQty) + Number(e.february);
        this.totalMarcQty = Number(this.totalMarcQty) + Number(e.march);
        this.totalAprQty = Number(this.totalAprQty) + Number(e.april);
        this.totalMayQty = Number(this.totalMayQty) + Number(e.may);
        this.totalJunQty = Number(this.totalJunQty) + Number(e.june);
        this.totalJulQty = Number(this.totalJulQty) + Number(e.july);

        this.totalAugQty = Number(this.totalAugQty) + Number(e.august);
        this.totalSepQty = Number(this.totalSepQty) + Number(e.september);
        this.totalOctQty = Number(this.totalOctQty) + Number(e.october);
        this.totalNovQty = Number(this.totalNovQty) + Number(e.november);
        this.totalDecQty = Number(this.totalDecQty) + Number(e.december);
      });
    } 
    
    
    else {
      this.InitialOrderQtySum();
    }
  }
  onScroll(){
    this.scrolledToBottom = true;
  }
}
