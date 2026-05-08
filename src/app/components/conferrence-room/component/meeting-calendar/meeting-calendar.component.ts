import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { FormBuilder } from '@angular/forms';
import { ConferrenceService } from '../../services/conferrence.service';
import { ToastrService } from 'ngx-toastr';
import { Calendar, CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Message, MessageService } from 'primeng/api';


@Component({
  selector: 'app-meeting-calendar',
  templateUrl: './meeting-calendar.component.html',
  styleUrls: ['./meeting-calendar.component.scss'],
})
export class MeetingCalendarComponent implements OnInit {
  displayPosition: boolean;
  position: string;
  events: any[];
  eventsBindForCalendar: any[] = [];
  eventsObj :any={};
  options: any;
  constructor(
    public commonService: CommonServiceService,
    public service: ConferrenceService,
  ) { }

  modalRef?: BsModalRef;
  meetingInfo:string="";
  meetingInfoTime:string="";
  meetingInfoDepartment:string="";
  meetingInfoAgenda:string="";
  meetingInfoRoom:string="";

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    //dateClick: this.handleDateClick.bind(this),   
    // eventClick: function(info) {
    //   this.meetingInfo = info.event.title;
    //   alert('Event: ' + info.event.title);
    //   info.el.style.borderColor = 'red';
    //   info.jsEvent.preventDefault();
    // }  
    eventClick: this.showMessage.bind(this),
    eventColor: '#FF0000'
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
    // this.showConfirm();
    //this.showMultiple();

}

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }

  ngOnInit(): void {
    this.service.GatEmployeeWiseMeetingList().subscribe(
      (data: any[]) => {
        console.log('Meeting List From API');
        console.log(data);
        for(let i = 0 ; i< data.length;i++){
          this.eventsObj =null;
          this.eventsObj ={};
          let meetingInfo = "Time : "+data[i].startTime+"    ,Department : "+data[i].department+",Agenda : "+data[i].agenda+",Room : "+data[i].roomName;
          //let meetingInfo = data[i].startTime;
          this.eventsObj.title = meetingInfo;
          this.eventsObj.date = data[i].bookDate;
          this.eventsObj.color = "#40E0D0";
          this.eventsBindForCalendar.push(this.eventsObj);
        }
        this.calendarOptions.events = this.eventsBindForCalendar;
        console.log('Event List');
        console.log(this.calendarOptions.events);
        
      },
      (error) => {
        //this.toastr.warning("No Meeting List Found", "Conference");

      }
    );

  }

msgs: Message[] = [];
showMultiple() {
  this.msgs = [];
  this.msgs.push({severity:'info', summary:'Time', detail:this.meetingInfoTime});
  this.msgs.push({severity:'info', summary:'Department', detail:this.meetingInfoDepartment});
  this.msgs.push({severity:'info', summary:'Agenda', detail:this.meetingInfoAgenda});
  this.msgs.push({severity:'info', summary:'Room', detail:this.meetingInfoRoom});
}

  

}
