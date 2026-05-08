import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { IdmMissionModel } from '../../model/idm.mission.model';
import { IdmTrainingModel } from '../../model/idm.training.model';
import { IdmService } from '../../service/idm.service';
import { EVoteService } from 'src/app/components/e-vote/services/e-vote.service';


@Component({
  selector: 'app-training-approve',
  templateUrl: './training-approve.component.html',
  styleUrls: ['./training-approve.component.scss']
})
export class TrainingApproveComponent implements OnInit {
  missionApproveList: IdmMissionModel;
  trainingApproveForm: FormGroup;
  myId: string;
  trainingApprove: any[];
  onlyMissionApprovedList: any[];
  missionRejecetedList: any[];
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: IdmService,
    private toastr: ToastrService,
    private authService: AuthService,
    private modalService: BsModalService,
    public evoteService: EVoteService
  ) { }


  ngOnInit(): void {
    //this.myId = this.authService.decodedToken?.unique_name;
    this.InitializeForm();
    this.getAllTrainingApprove();
    this.getOnlyTrainingApproveList();
    this.getTrainingRejectedList();

  }
  InitializeForm() {
    this.trainingApproveForm = this.fb.group({
      employeeName: [""],
      department: [""],
      section: [""],
      designation: [""],
      company: [""],
      doj: [""],
    });

  }
  getAllTrainingApprove() {
    this.service.GetAllTrainingApprove().subscribe(
      (res: any[]) => {
        this.trainingApprove = res;
        console.log('Training Approve');
        console.log(res);
      },
      (error) => {
        this.toastr.error("Failed to Load Training Approve List");

      }
    );
  }

  getOnlyTrainingApproveList() {
    //this.visions = [];
    this.service.GetOnlyTrainingApproveList().subscribe(
      (res: any[]) => {
        //debugger
        this.onlyMissionApprovedList = res;

        console.log('Mission Approved List Only');
        console.log(res);
      },
      (error) => {
        this.toastr.error("Failed to Load  Training Approved List");

      }
    );
  }

  getTrainingRejectedList() {
    //this.visions = [];
    this.service.GetTrainingRejectedList().subscribe(
      (res: any[]) => {
        this.missionRejecetedList = res;
        console.log('Mission Rejected');
        console.log(res);
      },
      (error) => {
        this.toastr.error("Failed to Load Training Rejected List");

      }
    );
  }

  ApproveTraining(rowdata: IdmTrainingModel) {
    debugger
    this.service.ApproveTraining(rowdata).subscribe(
      (res) => {
        this.toastr.success("Training  Approve Successful");
        console.log(res);
        this.getAllTrainingApprove();
        this.getOnlyTrainingApproveList();
        this.getTrainingRejectedList();
      },
      (error) => {
        this.toastr.error("Failed To Mission Approve");
        console.log(error);
      }
    );
  }

  RejectTraining(rowdata: IdmTrainingModel) {
    debugger
    this.service.RejectTraining(rowdata).subscribe(
      (res) => {
        this.toastr.success("Training Rejected Successful");
        console.log(res);
        this.getAllTrainingApprove();
        this.getOnlyTrainingApproveList();
        this.getTrainingRejectedList();
      },
      (error) => {
        this.toastr.error("Training Reject");
        console.log(error);
      }
    );
  }

}
