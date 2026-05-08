import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { meetingListMasterModel } from '../../model/meeting-list-master.model';
import { participantsModel } from '../../model/participant.model';
import { ConferrenceService } from '../../services/conferrence.service';

@Component({
  selector: 'app-conference-meeting-list',
  templateUrl: './conference-meeting-list.component.html',
  styleUrls: ['./conference-meeting-list.component.scss']
})
export class ConferenceMeetingListComponent implements OnInit {
  CustomConferenceListMasterForm: FormGroup;
  AllMeetingList: meetingListMasterModel[]= new Array();
  allParticipantList:participantsModel[]= new Array();
  allParticipantListForFeedback:participantsModel[]= new Array();
  currentDate1:string;
  currentDate:string;
  displayParticipant:string;
  displayFeedback:string;
  selectedParticipant: any[];
  participantsList:participantsModel[] = new Array();
  participantObject:participantsModel;
  masterDataObject:meetingListMasterModel;
  meetingId:number;
  reportDate:string;
  reportTime:string;
  reportAgenda:string;
  backgroundColor:string;
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: ConferrenceService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.LoadAllMeetingListMaster();
    this.commonService.LoadGatePassEmplyeeList();
  }

  InitializeForm() {
    this.currentDate1= new Date().toISOString().slice(0, 10);
    var today = new Date();
    today.setHours(today.getHours() + 6);
    this.currentDate= today.toISOString().slice(0, 16);
    this.CustomConferenceListMasterForm =this.fb.group({
      participantId:[0],
      attendStatus:[""],
      lateTime:[0],
      earlyOut:[0],

    });
    
  }

  LoadAllMeetingListMaster(){
    this.service.GatEmployeeWiseMeetingListMaster().subscribe(
      (data: any[]) => {
        console.log('Meeting List');
        this.AllMeetingList=data;
        console.log(this.AllMeetingList);
      },
      (error) => {
        this.toastr.warning("No Meeting Found");

      }
    );

  }

  participantList(rowData:meetingListMasterModel){
    this.masterDataObject =rowData;
    this.meetingId =rowData.mettingId;
    this.service.GatMeetingParticipantList(rowData.mettingId).subscribe(
      (data: any[]) => {
        this.allParticipantList=data;
        console.log('Particinat List');
        console.log(this.allParticipantList);
        this.displayParticipant ='Y';
        this.displayFeedback = 'N';
        // this.reportDate=rowData.bookDate;
        // this.reportAgenda=rowData.agenda;
        const index: number = this.AllMeetingList.indexOf(rowData);
        if (index !== -1) {
          for(let i=0;i<this.AllMeetingList.length;i++){
            this.AllMeetingList[i].backgroundColor = '';
          }
          this.AllMeetingList[index].backgroundColor = '#AED6F1';
        }  
      },
      (error) => {
        this.toastr.warning("No Participant Found");

      }
    );
  }

  participantListForFeedback(rowData:meetingListMasterModel){
    this.service.GatMeetingParticipantListForFeedback(rowData.mettingId).subscribe(
      (data: any[]) => {
        this.allParticipantListForFeedback=data;
        if(this.allParticipantListForFeedback!=null){
          for(let i = 0;i<this.allParticipantListForFeedback.length;i++){
            this.allParticipantListForFeedback[i].attendStatus="";
          }
        }
        console.log('Particinat List For Feedback');
        console.log(this.allParticipantListForFeedback);
        this.displayFeedback = 'Y';
        this.displayParticipant ='N';
        const index: number = this.AllMeetingList.indexOf(rowData);
        if (index !== -1) {
          for(let i=0;i<this.AllMeetingList.length;i++){
            this.AllMeetingList[i].backgroundColor = '';
          }
          this.AllMeetingList[index].backgroundColor = '#AED6F1';
          
        } 
      },
      (error) => {
        this.toastr.warning("No Participant Found");
      }
    );
  }

  ChangeEmployeeName(){
    if(this.selectedParticipant.length!=null && this.selectedParticipant.length > 0){
      debugger;
      let lenght = this.selectedParticipant.length;
      let id = this.selectedParticipant[lenght-1].value;
      this.service.GatEmployeeBookingStatus(this.masterDataObject.bookDate, id ,this.masterDataObject.startTime1 , this.masterDataObject.endTime2).subscribe(
        (data: any) => {
          console.log('Employee Book Status Check');
          console.log(data);
          if(data.status=="True"){
            let bookStatus="He has a meeting with ";
            bookStatus = bookStatus +""+data.department+" at " +data.meetingTime;
            this.toastr.warning(bookStatus);
            this.selectedParticipant.splice(lenght-1,1);
          }
        },
        (error) => {
          //this.toastr.warning('No Meeting Found');
  
        }
      );

    }  
  }

  deleteItem(obj: any) {
    const index: number = this.selectedParticipant.indexOf(obj);
    if (index !== -1) {
        this.selectedParticipant.splice(index, 1);
    }        
}

saveParticipantToMeeting(){
  debugger;
  for(let i = 0; i < this.selectedParticipant.length; i++) {
    this.participantObject=null;
    this.participantObject = new participantsModel();
    this.participantObject.EmployeeId = this.selectedParticipant[i].value;
    this.participantObject.EmployeeName = this.selectedParticipant[i].label;
    this.participantObject.MeetingId =this.meetingId;
    this.participantsList.push(this.participantObject);
  }
    this.service.AddParticipantToMeeting( this.participantsList).subscribe(
      (res) => {
        this.toastr.success("Participant Added Successfully");
        console.log(res);
        this.participantList(this.masterDataObject);
        this.selectedParticipant = [];
      },
      (error) => {
        this.toastr.error("Participant Added Failed");
        console.log(error);
        this.participantsList = null;
        this.participantsList = [];
      }
    );


  
}

FreeParticipant(rowData:participantsModel){
  this.service.FreeEmployeeFromMeeting(rowData).subscribe(
    (res) => {
      this.toastr.success("Participant Remove is Successfull");
      console.log(res);
      this.participantList(this.masterDataObject);
  
    },
    (error) => {
      this.toastr.error("Participant Remove is Failed");
      console.log(error);
    }
  );


}

submitFeedback(){

  var meetingMinutes =(<HTMLInputElement>document.getElementById('meetingMinutes')).value;
  console.log('submit feedback');
  console.log(this.allParticipantListForFeedback);
  this.service.submitMeetingFeedback(meetingMinutes, this.allParticipantListForFeedback).subscribe(
    (res) => {
      this.toastr.success("Feedback Given Successfully");
      console.log(res);
      this.LoadAllMeetingListMaster();
        this.displayFeedback = 'N';
        this.displayParticipant ='N';

    },
    (error) => {
      this.toastr.error("Feedback Given Failed");
      console.log(error);

    }
  );

  
}

clickOnComplete(rowData:meetingListMasterModel){
  const index: number = this.AllMeetingList.indexOf(rowData);
  if (index !== -1) {
    for(let i=0;i<this.AllMeetingList.length;i++){
      this.AllMeetingList[i].backgroundColor = '';
    }
    this.AllMeetingList[index].backgroundColor = '#AED6F1';
  }
}

}
