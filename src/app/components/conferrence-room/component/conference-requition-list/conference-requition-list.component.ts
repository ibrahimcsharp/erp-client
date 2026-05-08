import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { ConferenceRoomBookListModel } from '../../model/conference-book-list.model';
import { ConferenceRoomBookModel } from '../../model/conference-room-book.model';
import { ConferrenceService } from '../../services/conferrence.service';

@Component({
  selector: 'app-conference-requition-list',
  templateUrl: './conference-requition-list.component.html',
  styleUrls: ['./conference-requition-list.component.scss']
})
export class ConferenceRequitionListComponent implements OnInit {
  CustomConferenceListForm: FormGroup;
  ConferenceBookListModel:ConferenceRoomBookListModel;
  ConferenceRoomBookList: ConferenceRoomBookListModel[]= new Array();
  currentDate1:string;
  currentDate:string;
  
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: ConferrenceService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.LoadAvailableRoom();
    this.commonService.LoadCompanyOnlySnowtexAndSara();
  }

  InitializeForm() {
    
    this.currentDate1= new Date().toISOString().slice(0, 10);
    var today = new Date();
    today.setHours(today.getHours() + 6);
    this.currentDate= today.toISOString().slice(0, 16);
    this.CustomConferenceListForm =this.fb.group({
      bookDate: [this.currentDate1,Validators.required],
      companyId:[Number(localStorage.getItem("branchId")) ,Validators.required],
    });
    
  }

  LoadAvailableRoom(){
    this.service.GatAllRoomBookList().subscribe(
      (data: any[]) => {
        // console.log(data);
        this.ConferenceRoomBookList=data;
        console.log(this.ConferenceRoomBookList);
        this.updateRowGroupMetaData();
      },
      (error) => {
        this.toastr.warning("No Room Available", "Conference");

      }
    );

  }

  LoadDateWiseAvailableRoom(){
    this.service.GatDateWiseAllRoomBookList(this.CustomConferenceListForm.value.bookDate,this.CustomConferenceListForm.value.companyId).subscribe(
      (data: any[]) => {
        // console.log(data);
        this.ConferenceRoomBookList=data;
        console.log(this.ConferenceRoomBookList);
        this.updateRowGroupMetaData();
      },
      (error) => {
        this.toastr.warning("No Room Available", "Conference");

      }
    );

  }
  DeleteConferenceBook(rowData:ConferenceRoomBookListModel){
    this.service.ConferenceBookingCancel(rowData).subscribe(
      (res) => {
        this.toastr.success("Room Free is Successfull");
        console.log(res);
        this.LoadDateWiseAvailableRoom();
    
      },
      (error) => {
        this.toastr.error("Failed To Room Free");
        console.log(error);
      }
    );

  }

//Load
  roomNameRowGroup: any;
  updateRowGroupMetaData() {
    debugger;
    this.roomNameRowGroup = {};
    if (this.ConferenceRoomBookList) {
      for (let i = 0; i < this.ConferenceRoomBookList.length; i++) {
        let rowData = this.ConferenceRoomBookList[i];
        let roomName = rowData.roomName;
       
        if (i == 0) {
           this.roomNameRowGroup[roomName] = { index: 0, size: 1 };
           
        } else {
          let previousRowData = this.ConferenceRoomBookList[i - 1];
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





}
