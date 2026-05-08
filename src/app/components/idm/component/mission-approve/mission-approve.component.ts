import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { IdmMissionModel } from '../../model/idm.mission.model';
import { IdmService } from '../../service/idm.service';

@Component({
  selector: 'app-mission-approve',
  templateUrl: './mission-approve.component.html',
  styleUrls: ['./mission-approve.component.scss']
})
export class MissionApproveComponent implements OnInit {
  missionApproveList: IdmMissionModel; 
  missionApproveForm: FormGroup;
  myId:string;
  missionApprove: any[];
  onlyMissionApprovedList: any[];
  missionRejecetedList: any[];
  

  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: IdmService,
    private toastr: ToastrService,
    private authService: AuthService,
    private modalService: BsModalService,
  ) { }
 

  ngOnInit(): void {
    //this.myId = this.authService.decodedToken?.unique_name;
    this.InitializeForm();
    this.getAllMissionApprove();
    this.GetOnlyMissionApprovedList();
    this.getAllMissionRejectedList();

  }
  InitializeForm() {
    this.missionApproveForm = this.fb.group({
      employeeName : [""],
      department: [""],
      section: [""],
      designation: [""],
      company: [""],
      doj: [""],
    });

  }
  getAllMissionApprove() {
    //this.visions = [];
    this.service.GetAllMissionApprove().subscribe(
      (res: any[]) => {
        this.missionApprove = res;        
        console.log('Mission Approve');
        console.log(res);
      },
      (error) => {
        this.toastr.error("Failed to Load Mission Approve List");
        
      }
    );
  }

  GetOnlyMissionApprovedList() {
    //this.visions = [];
    this.service.GetOnlyMissionApproveList().subscribe(
      (res: any[]) => {       
        //debugger
        this.onlyMissionApprovedList = res;
       
        console.log('Mission Approved List Only');
        console.log(res);
      },
      (error) => {
        this.toastr.error("Failed to Load Mission Approved List");
        
      }
    );
  }
  getAllMissionRejectedList() {
    //this.visions = [];
    this.service.GetMissionRejectedList().subscribe(
      (res: any[]) => {  
        this.missionRejecetedList = res;
        console.log('Mission Rejected');
        console.log(res);
      },
      (error) => {
        this.toastr.error("Failed to Load Mission Rejected List");
        
      }
    );
  }

  ApproveMission(rowdata:IdmMissionModel,achievement:string) {
    debugger
    this.service.ApproveMission(rowdata).subscribe(
      (res) => {
        this.toastr.success("Mission Approve Successful");
        console.log(res);
        this.getAllMissionApprove();
        this.GetOnlyMissionApprovedList();
        this.getAllMissionRejectedList();
      },
      (error) => {
        
        this.toastr.error("Failed To Mission Approve");
        console.log(error);
      }
    );
  }
  UpdateMission(rowdata:IdmMissionModel) {
    this.service.ApproveMission(rowdata).subscribe(
      (res) => {
        this.toastr.success("Mission Achivement Updated");
        this.getAllMissionApprove();
        this.GetOnlyMissionApprovedList();
        this.getAllMissionRejectedList();
      },
      (error) => {
        this.toastr.error("Failed To Update");
      }
    );
  }

  RejectMission(rowdata:IdmMissionModel) {
    debugger
    this.service.RejectMission(rowdata).subscribe(
      (res) => {
        this.toastr.success("Mission Reject Successful");
        console.log(res);
        this.getAllMissionApprove();
        this.GetOnlyMissionApprovedList();
        this.getAllMissionRejectedList();
      },
      (error) => {
        
        this.toastr.error("Failed To Mission Reject");
        console.log(error);
      }
    );
  }

}
