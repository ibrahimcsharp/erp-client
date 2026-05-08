import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, Message } from 'primeng/api';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { IdmService } from '../../service/idm.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

@Component({
  selector: 'app-training-schedule',
  templateUrl: './training-schedule.component.html',
  styleUrls: ['./training-schedule.component.scss']
})
export class TrainingScheduleComponent implements OnInit {
  trainingScheduleForm: FormGroup;
  trainingScheduleList: any[];
  trainingMasterList: any[];
  noResult = false;
  //for checkbox select items
  SelectedCheckboxRequisitions: any[] = [];
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: IdmService,
    private toastr: ToastrService,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.getAllTrainingRequisition();
    this.getAllScheduleMasterData();
    this. AllCourseData();
    this.commonService.LoadGatePassEmplyeeList();
  }

  InitializeForm() {
    this.trainingScheduleForm = this.fb.group({
      trainerName: [""],
      employeeName : [""],
      department: [""],
      section: [""],
      designation: [""],
      company: [""],
      doj: [""],
      scheduleDate:[""],
      scheduleTitle:[""]
    });

  }
  getAllTrainingRequisition() {
    this.service.GetAllRequitionForSchedule().subscribe(
      (res: any[]) => {
        this.trainingScheduleList = res;        
        console.log('All List');
        console.log(res);
      },
      (error) => {
        this.toastr.error("Failed to Load Requisition List");
        
      }
    );
  }
  SelectedRequisitionDisplay:boolean=false;
  DisplaySchedule(){
    if(this.trainingScheduleForm.value.scheduleDate==undefined || this.trainingScheduleForm.value.scheduleDate==null || this.trainingScheduleForm.value.scheduleDate==""){
      this.toastr.warning('Please Select a Schedule Date');
    }
    else if(this.trainingScheduleForm.value.scheduleTitle==undefined || this.trainingScheduleForm.value.scheduleTitle==null || this.trainingScheduleForm.value.scheduleTitle==""){
      this.toastr.warning('Please Select a Schedule Title');
    }
    else{
      this.SelectedRequisitionDisplay = true;
      this.addViewModel.scheduleDate = this.trainingScheduleForm.value.scheduleDate;
    }
    
  }

  deleteFromCheckList(index: number) {
    if (index !== -1) {
        this.SelectedCheckboxRequisitions.splice(index, 1);
    }        
  }
  ScheduleMaster:any={};
  onSubmit(){
    if (this.SelectedCheckboxRequisitions.length > 0 ) {   
      this.ScheduleMaster.scheduleDate = this.trainingScheduleForm.value.scheduleDate;
      this.ScheduleMaster.scheduleTitle = this.trainingScheduleForm.value.scheduleTitle;
      this.ScheduleMaster.trainerName = this.trainingScheduleForm.value.trainerName;
      if(this.scheduleMasterId!=undefined&&this.scheduleMasterId!=null){
        this.ScheduleMaster.ScheduleMasterId = this.scheduleMasterId;
      }
      this.service.TrainingScheduleCreate(this.ScheduleMaster, this.SelectedCheckboxRequisitions).subscribe(
        (res) => {
          this.toastr.success("Scheduled Successful");
          console.log(res);
          this.SelectedCheckboxRequisitions= null;
          this.SelectedCheckboxRequisitions= new Array();
          this.SelectedRequisitionDisplay = false;
          this.getAllTrainingRequisition();
          this.getAllScheduleMasterData();
          this.trainingScheduleForm.patchValue({
            scheduleTitle: "",
            scheduleDate: "",
            trainerName: ""
          });
        },
        (error) => {
          this.toastr.error("Failed To Scheduled Save");
          console.log(error);
        }
      );
    } else {
      this.toastr.warning("Please Add Training First!");
    }
  }

  getAllScheduleMasterData() {
    this.service.GetAllScheduleMaster().subscribe(
      (res: any[]) => {
        this.trainingMasterList = res;        
        console.log('Master List');
        console.log(res);
      },
      (error) => {
        this.toastr.error("Failed to Schedule Master List");
        
      }
    );
  }
  scheduleMasterId:number;
  addViewModel:any={};
  getAllScheduleSubByMasterId(rowData:any) {
    console.log("schdule master");
    console.log(rowData);
    this.service.GetScheduleSubById(rowData.id).subscribe(
      (res: any[]) => {
        this.SelectedCheckboxRequisitions = res;        
        console.log('Sub List');
        console.log(res);
        this.SelectedRequisitionDisplay = true;
        var updateDate = moment(rowData.scheduleDate).format('YYYY-MM-DD');
        this.trainingScheduleForm.patchValue({
          scheduleTitle: rowData.scheduleTitle,
          scheduleDate: updateDate
        });
        this.scheduleMasterId= rowData.id;
        this.addViewModel = rowData;
      },
      (error) => {
        this.toastr.error("Failed to Load Schedule Sub List");
        
      }
    );
  }
  @ViewChild("postponedDateValue") postponedDateValue: ElementRef = {} as ElementRef;
  @ViewChild("postponedReasonValue") postponedReasonValue: ElementRef = {} as ElementRef;
  PostponedDisplay:boolean=false;
  postponedModel:any={};
  postponedSchedule(rowData:any){
    console.log("schdule master postponed");
    console.log(rowData);
    this.PostponedDisplay = true;
    var updateDate = moment(rowData.scheduleDate).format('YYYY-MM-DD');
        this.trainingScheduleForm.patchValue({
          scheduleTitle: rowData.scheduleTitle,
          scheduleDate: updateDate
        });

        this.postponedModel = rowData;

  }

  onSubmitPostponed(){
    var postponedDate = this.postponedDateValue.nativeElement.value;
    if(postponedDate!=undefined && postponedDate!=undefined!=null && postponedDate!=""){
      this.postponedModel.postponedDate = postponedDate;
    }
    var postponedReason = this.postponedReasonValue.nativeElement.value;
    if(postponedReason!=undefined && postponedReason!=undefined!=null && postponedReason!=""){
      this.postponedModel.reason = postponedReason;
    }
    this.service.PostponedSchedule(this.postponedModel).subscribe(
      (res) => {
        this.toastr.success("Schedule Postponed Successful");
        console.log(res);
        this.postponedModel= null;
        this.postponedModel= {};
        this.SelectedRequisitionDisplay = false;
        this.getAllScheduleMasterData();
        this.PostponedDisplay = false;
        this.trainingScheduleForm.patchValue({
          scheduleTitle: "",
          scheduleDate: ""
        });
      },
      (error) => {
        this.toastr.error("Failed To Schedule Postponed");
        console.log(error);
      }
    );
  }

  position: string;
  msgs: Message[] = [];
  
  rejectSchedule(rowData:any){
    this.position = "top";
    this.confirmationService.confirm({
      message: "Are you sure that you want to delete this row?",
      header: "Delete Task",
      icon: "pi pi-info-circle",
      accept: () => {
        this.service.RejectSchedule(rowData).subscribe(
          (res) => {
            this.toastr.success("Schedule Rejected Successful");
            console.log(res);
            this.getAllScheduleMasterData();
          },
          (error) => {
            this.toastr.error("Failed To Schedule Rejecte");
            console.log(error);
          }
        );
       
      },
      reject: () => {
        this.msgs = [
          {
            severity: "info",
            summary: "Rejected",
            detail: "You have rejected to add item",
          },
        ];
      },
      key: "positionDialog",
    });
  }

  cancelPostponePopup(){
    this.trainingScheduleForm.patchValue({
      scheduleTitle: "",
      scheduleDate: ""
    });
  }

  cancelAddOrViewPopup(){
    this.trainingScheduleForm.patchValue({
      scheduleTitle: "",
      scheduleDate: ""
    });
    this.SelectedCheckboxRequisitions= null;
    this.SelectedCheckboxRequisitions= new Array();
  }



skillPlanCourseListData:any[]=[];
 AllCourseData(){
    this.service.GetSkillPlanCourses().subscribe(
      (res: any[]) => {
        console.log(res) 
      //  this.SkillPlanCourseListData = res;
       for (var i = 0; i < res.length; i++) {
        this.skillPlanCourseListData.push({
          label:
            res[i].trainingName ,
          value: res[i].trainingName,  
        });
        console.log(this.skillPlanCourseListData[i].trainingName) 
      }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Skill Plan Course List");
      }
    );
  }

  onSelectCourse(event: TypeaheadMatch): void {
    this.trainingScheduleForm.patchValue({
      trainingName: event.item.label
    });
  } 
  //employee No result found
  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.trainingScheduleForm.patchValue({
        trainingName: "",
      });
      const control = this.trainingScheduleForm.get('trainingName');            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    }
  }
}
