import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { IdmService } from '../../service/idm.service';

@Component({
  selector: 'app-training-feedback',
  templateUrl: './training-feedback.component.html',
  styleUrls: ['./training-feedback.component.scss']
})
export class TrainingFeedbackComponent implements OnInit {
  trainingFeedBackForm: FormGroup;
  trainingScheduleList: any[];
  trainingMasterList: any[];
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
    this.getAllScheduleMasterData();
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
  scheduleTitle:string;
  scheduleDate:string;
  SelectedRequisitionDisplay:boolean=false;
  getAllScheduleSubByMasterId(rowData:any) {
    console.log("schdule master");
    console.log(rowData);
    this.service.GetScheduleSubById(rowData.id).subscribe(
      (res: any[]) => {
        this.SelectedCheckboxRequisitions = res;        
        console.log('Sub List');
        console.log(res);
        this.SelectedRequisitionDisplay = true;
        this.scheduleTitle = rowData.scheduleTitle;
        this.scheduleDate = rowData.scheduleDate;
        this.scheduleMasterId= rowData.id;
        this.SelectedCheckboxRequisitions.forEach(function (obj) {
          obj.achievePoint = obj.target ;
        });
      },
      (error) => {
        this.toastr.error("Failed to Load Schedule Sub List");
        
      }
    );
  }

  cancelAddOrViewPopup(){
    this.scheduleTitle = "";
    this.scheduleDate = "";
    this.SelectedCheckboxRequisitions= null;
    this.SelectedCheckboxRequisitions= new Array();
  }

  masterSheduleData:any = {};
  saveTrainingFeedback(){
    this.SelectedCheckboxRequisitions.forEach(function (obj) {
      obj.achievePoint = parseInt(obj.achievePoint);
    });
    this.masterSheduleData.masterId = this.scheduleMasterId; 
    this.service.TrainingFeedbackSave(this.masterSheduleData,this.SelectedCheckboxRequisitions).subscribe(
      (res) => {
        this.toastr.success("FeedBack Given Successful");
        console.log(res);
        this.getAllScheduleMasterData();
      },
      (error) => {
        
        this.toastr.error("Failed To Give FeedBack");
        console.log(error);
      }
    );

  }

}
