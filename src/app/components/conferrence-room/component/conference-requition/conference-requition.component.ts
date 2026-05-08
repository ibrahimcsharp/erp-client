import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { bookInfoModel } from '../../model/book-info.model';
import { ConferenceRoomBookListModel } from '../../model/conference-book-list.model';
import { ConferenceRoomBookModel } from '../../model/conference-room-book.model';
import { ConferenceRoomModel } from '../../model/conference-room.model';
import { participantsModel } from '../../model/participant.model';
import { ConferrenceService } from '../../services/conferrence.service';


@Component({
  selector: 'app-conference-requition',
  templateUrl: './conference-requition.component.html',
  styleUrls: ['./conference-requition.component.scss']
})
export class ConferenceRequitionComponent implements OnInit {

  CustomConferenceForm: FormGroup;
  ConferenceRoomModel:ConferenceRoomModel;
  ConferenceRoomBookModel:ConferenceRoomBookModel;
  ConferenceRoomList: ConferenceRoomModel[]= new Array();
  currentDate1:string;
  currentDate:string;
  sourceRoom: ConferenceRoomModel[];
  targetRoom: ConferenceRoomModel[];
  ConferenceRoomBookList: ConferenceRoomBookModel[]= new Array();
  bookInfoList: bookInfoModel[]= new Array();
  MyConferenceRoomBookList: ConferenceRoomBookListModel[]= new Array();
  selectedParticipant: any[];
  participantsList:participantsModel[] = new Array();
  participantObject:participantsModel;
  bookInfoDept:string;
  bookInfoAgenda:string;
  bookInfoBy:string;
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: ConferrenceService,
    private toastr: ToastrService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.InitializeForm();
    //this.LoadAvailableRoom();
    this.targetRoom = [];
    this.LoadDateWiseAvailableRoom();
    this.LoadMyRoomBookedList();
    this.commonService.LoadCompanyOnlySnowtexAndSara();
    this.commonService.LoadGatePassEmplyeeList();
  }

  InitializeForm() {
    this.targetRoom = [];
    this.sourceRoom = [];
    this.currentDate1= new Date().toISOString().slice(0, 10);
    var today = new Date();
    today.setHours(today.getHours() + 6);
    this.currentDate= today.toISOString().slice(0, 16);
    this.CustomConferenceForm =this.fb.group({
      bookDate: [this.currentDate1,Validators.required],
      department: ["",Validators.required],
      startTime: ["",Validators.required],
      endTime:["",Validators.required],
      agenda:["",Validators.required],
      nop:[0],
      participantId:["",Validators.required],
      guestName:[""],
      companyId:[Number(localStorage.getItem("branchId")) ,Validators.required],
    });
    this.selectedParticipant = null;
    
  }

  LoadAvailableRoom(){
    this.service.GatAllRoomListList(this.CustomConferenceForm.value.bookDate,this.CustomConferenceForm.value.startTime,this.CustomConferenceForm.value.endTime,this.CustomConferenceForm.value.companyId).subscribe(
      (data: any[]) => {
        // console.log(data);
        this.ConferenceRoomList=data;
        this.sourceRoom = this.ConferenceRoomList;
        this.targetRoom = [];
        console.log(this.sourceRoom);
      },
      (error) => {
        this.toastr.warning("No Room Available", "Conference");

      }
    );

  }
  changeStartTime(){
    let startTime = this.CustomConferenceForm.value.startTime;
    var StartSplitted = startTime.split(":"); 
    if(StartSplitted[1]=="30" || StartSplitted[1]=="00" ){
      //Do Nothing
    }
    else{
      this.toastr.warning("Your Time Formate is Incorrect.Please select HH:00 or HH:30 formate");
      this.CustomConferenceForm.patchValue({
        startTime: [""]
      });
    }
    //this.CheckStartTimeIsGreaterThanCurrentTime();

    console.log(StartSplitted);
  }

  changeEndTime(){
    debugger;
    let abc = this.CustomConferenceForm.value.endTime;
    var EndSplitted = abc.split(":"); 
    if(EndSplitted[1]=="30" || EndSplitted[1]=="00" ){
      //
    }
    else{
      this.toastr.warning("Your Time Formate is Incorrect.Please select HH:00 or HH:30 formate");
      this.CustomConferenceForm.patchValue({
        endTime: [""]
      });
    }
    this.CheckEndTimeIsGreaterThanStartTime();

    console.log(EndSplitted);
  }

  CheckStartTimeIsGreaterThanCurrentTime(){
    let startTime = this.CustomConferenceForm.value.startTime;
    let currentdate = new Date();

    let currentHour = currentdate.getHours();
    let currentMinutes = currentdate.getMinutes();
    let totalCurrentMinutes = (currentHour*60)+currentMinutes;

    
    var startSplit =  startTime.split(":");
    let starthour = parseInt(startSplit[0]);
    let startminutes =  parseInt(startSplit[1]);;
    let totalStartMinutes = (starthour*60)+startminutes;

    

   

    if(totalCurrentMinutes  >= totalStartMinutes){
    
      this.toastr.warning("Start Time Is Smaller then Current Time");
      this.CustomConferenceForm.patchValue({
        startTime: [""]
      });

    }
  }

  CheckEndTimeIsGreaterThanStartTime(){
    let startTime = this.CustomConferenceForm.value.startTime;
    let abc =this.CustomConferenceForm.value.endTime;
    var startSplit =  startTime.split(":");
    
    let starthour = parseInt(startSplit[0]);
    let startminutes =  parseInt(startSplit[1]);;
    let totalStartMinutes = (starthour*60)+startminutes;

    var endSplit =  abc.split(":");

    let endhour = parseInt(endSplit[0]);
    let endminutes = parseInt(endSplit[1]);
    let totalEndMinutes = (endhour*60)+endminutes;

    if(totalStartMinutes >= totalEndMinutes){
    
      this.toastr.warning("End Time Is Smaller then Start Time");
      this.CustomConferenceForm.patchValue({
        endTime: [""]
      });

    }
  }

  onSubmit() {
    if(this.CustomConferenceForm.valid){
        if (this.targetRoom.length > 0 ) { 
          console.log('Target Rooms');
          console.log(this.targetRoom);
          for(let i = 0; i < this.selectedParticipant.length; i++) {
            this.participantObject=null;
            this.participantObject = new participantsModel();
            this.participantObject.EmployeeId = this.selectedParticipant[i].value;
            this.participantObject.EmployeeName = this.selectedParticipant[i].label;
            this.participantsList.push(this.participantObject);
          }
          if(this.CustomConferenceForm.value.guestName!='undefined' && this.CustomConferenceForm.value.guestName!="" && this.CustomConferenceForm.value.guestName!=null){
            this.participantObject=null;
            this.participantObject = new participantsModel();
            this.participantObject.GuestName = this.CustomConferenceForm.value.guestName;
            this.participantsList.push(this.participantObject);
          }
          console.log('participant List');
          console.log(this.selectedParticipant);
          this.ConferenceRoomBookModel = this.CustomConferenceForm.value;
          this.service.ConferenceBookingCreate(this.ConferenceRoomBookModel, this.targetRoom , this.participantsList).subscribe(
            (res) => {
              debugger
              if(res.message =="BOOKED SUCCESSFULLY"){
                 this.toastr.success("Your Booking Saved Successfully");
              }
              else if(res.message =="ALREADY BOOKED"){
                this.toastr.warning("ALREADY BOOKED");
              }
              else
              {
                this.toastr.error(res.message);
              }
              
             
              console.log(res);
              this.LoadDateWiseAvailableRoom();
              this.LoadMyRoomBookedList();
              this.CustomConferenceForm.patchValue({
                department: [""],
                startTime: [""],
                endTime:[""],
                agenda:[""],
                nop:[0],
                guestName:[""],
                participantId:[""]

              });
              this.targetRoom = [];
              this.sourceRoom = [];
              this.participantsList = null;
              this.participantsList = [];
              this.selectedParticipant = [];
            },
            (error) => {
              this.toastr.error("Failed To Book");
              console.log(error);
              this.participantsList = null;
              this.participantsList = [];
            }
          );
        } else {
          this.toastr.error("Please Select A Room For Booking");
        }
      
    }
    else{

      this.toastr.error("Please fill up all required data!");
      this.commonService.ValidationShow(this.CustomConferenceForm);
    }
    
    
  }

  LoadDateWiseAvailableRoom(){
    debugger
    this.service.GatDateWiseAllRoomBookListView(this.CustomConferenceForm.value.bookDate, this.CustomConferenceForm.value.companyId).subscribe(
      (data: any[]) => {
        // console.log(data);
        this.ConferenceRoomBookList=data;
        console.log(this.ConferenceRoomBookList);
      },
      (error) => {
        this.toastr.warning("No Room Available", "Conference");

      }
    );

  }

  LoadMyRoomBookedList(){
    this.service.GatAllRoomBookListByUser().subscribe(
      (data: any[]) => {
        // console.log(data);
        this.MyConferenceRoomBookList=data;
        console.log(this.MyConferenceRoomBookList);
        this.updateRowGroupMetaData();
      },
      (error) => {
        //this.toastr.warning("No Room Available", "Conference");
      }
    );

  }

  //Load
  roomNameRowGroup: any;
  updateRowGroupMetaData() {
    debugger;
    this.roomNameRowGroup = {};
    if (this.MyConferenceRoomBookList) {
      for (let i = 0; i < this.MyConferenceRoomBookList.length; i++) {
        let rowData = this.MyConferenceRoomBookList[i];
        let roomName = rowData.roomName;
       
        if (i == 0) {
           this.roomNameRowGroup[roomName] = { index: 0, size: 1 };
           
        } else {
          let previousRowData = this.MyConferenceRoomBookList[i - 1];
          let previousRoomName = previousRowData.roomName;
         
          if (roomName == previousRoomName) {
            this.roomNameRowGroup[roomName].size++;
          } else {
            this.roomNameRowGroup[roomName] = { index: i, size: 1 };
          }
         
       
        }
      }
    }
  }

  DeleteConferenceBook(rowData:ConferenceRoomBookListModel){
    this.service.ConferenceBookingCancel(rowData).subscribe(
      (res) => {
        this.toastr.success("Room Book Cancelation is Successfull");
        console.log(res);
        this.LoadDateWiseAvailableRoom();
        this.LoadMyRoomBookedList();
    
      },
      (error) => {
        this.toastr.error("Room Book Cancelation is Failed");
        console.log(error);
      }
    );

  }

  modalRef?: BsModalRef;
  getinfo(obj: any, template: TemplateRef<any> , value:any){
    debugger;
    let roomId = obj.roomId;
    this.bookInfoDept="";
    this.bookInfoAgenda="";
    this.bookInfoBy="";
    this.service.GatBookRoomInfoView(this.CustomConferenceForm.value.bookDate, this.CustomConferenceForm.value.companyId ,value ,roomId).subscribe(
      (data: any[]) => {
        // console.log(data);
        this.bookInfoList=data;
        this.bookInfoDept=this.bookInfoList[0].department;
        this.bookInfoAgenda=this.bookInfoList[0].agenda;
        this.bookInfoBy=this.bookInfoList[0].bookedBy;
        console.log('Info Data');
        console.log(this.bookInfoList);
      },
      (error) => {
        this.toastr.warning("No Room Available", "Conference");

      }
    );

    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
    console.log('Row info');
    console.log(obj);
  }

  ChangeEmployeeName(){
    if(this.CustomConferenceForm.value.startTime==undefined || this.CustomConferenceForm.value.startTime=="" ||this.CustomConferenceForm.value.startTime==null ){
      //this.toastr.warning("Is Missing", "Start Time");
    }
    else if(this.CustomConferenceForm.value.endTime==undefined || this.CustomConferenceForm.value.endTime=="" ||this.CustomConferenceForm.value.endTime==null ){
      //this.toastr.warning("Is Missing", "End Time");
    }
    else{
      let lenght = this.selectedParticipant.length;
      let id = this.selectedParticipant[lenght-1].value;
      this.service.GatEmployeeBookingStatus(this.CustomConferenceForm.value.bookDate, id ,this.CustomConferenceForm.value.startTime , this.CustomConferenceForm.value.endTime).subscribe(
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
          //this.toastr.warning("No Room Available", "Conference");
  
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


}
