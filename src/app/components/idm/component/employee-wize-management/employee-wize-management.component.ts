import { Component, OnInit } from '@angular/core';
import { IdmService } from '../../service/idm.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/service/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JobDescriptionModel } from '../../model/job-description.model';
import { IdmMissionModel } from '../../model/idm.mission.model';
import { IdmTrainingModel } from '../../model/idm.training.model';

@Component({
  selector: 'app-employee-wize-management',
  templateUrl: './employee-wize-management.component.html',
  styleUrls: ['./employee-wize-management.component.scss']
})
export class EmployeeWizeManagementComponent implements OnInit {
  AllEmployeeList: any[]= new Array();
  supervisor:string;



  jobDesEntryForm: FormGroup;
  managercmtForm: FormGroup;
  trainingApproveForm: FormGroup;

  employee:string;
  employeeId:string;
  employeeDept:string;
  jdInfo:JobDescriptionModel;

  showJD:boolean=false;
  jobDescriptionListByEmployee:JobDescriptionModel[]= new Array();
  jobSummaryListByEmployee:JobDescriptionModel[]= new Array();

  trainingApprove: any[];
  onlyTrainingApprovedList: any[];
  onlytrainingRejecetedList: any[];
  missionApprove: any[];
  onlyMissionApprovedList: any[];
  missionRejecetedList: any[];

  constructor(
    public service: IdmService,
    private toastr: ToastrService,
    private authService: AuthService,
    private fb: FormBuilder,
    
  ) {

   }

  ngOnInit(): void {
    this.supervisor = this.authService.decodedToken?.unique_name;
    this.loadEmployeeList();
    this.initializeForm();
  }

  loadEmployeeList(){
    this.service.IdmEmployeeListBySupervisor(this.supervisor).subscribe(
      (data: any[]) => {
        console.log(data);
        this.AllEmployeeList=data;
        console.log(this.AllEmployeeList);
      },
      (error) => {
        this.toastr.warning("No Data Found", "Under this Supervisor");

      }
    );
  }

  initializeForm() {
    this.jobDesEntryForm = this.fb.group({
      jobDescription:[""],
      jobSummary:[""],
    });

    this.managercmtForm = this.fb.group({
      jobDescription:[""]
    });


    this.trainingApproveForm = this.fb.group({
      employeeName: [""],
      department: [""],
      section: [""],
      designation: [""],
      company: [""],
      doj: [""],
    });


   
  }
  showPanel:boolean=false
  getPanel(rowData:any){

    this.viewJd(rowData)
    this.viewSatisfactory(rowData)
    this.getAllMissionApprove(rowData)
    this.getAllTrainingApprove(rowData);


    this.showPanel=true;
  }
  





  //JOB DESCRIPTION
  //______________________________________________________________________________________________________________
  viewJd(rowData:any){
    var chars = rowData.employeeName.split('-');
    this.employee=chars[0];
    this.employeeId = rowData.employeeId;
    this.employeeDept = chars[2];
    this.loadJDByEmployee();
    this.loadJSByEmployee();
    
  }
  loadJDByEmployee(){
    this.service.GetJobDesByEmployeeId(this.employeeId).subscribe(
      (res: JobDescriptionModel[]) => {
        this.jobDescriptionListByEmployee = res;
        console.log(this.jobDescriptionListByEmployee);
        this.showJD = true;
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Job Description");
      }
    );
  }
  myJobSummary:string;
  loadJSByEmployee(){
    
    this.service.GetJobSummaryByEmployeeId(this.employeeId).subscribe(
      (res: JobDescriptionModel[]) => {
        this.jobSummaryListByEmployee = res;
        console.log("My lisst", this.jobSummaryListByEmployee)
        if(this.jobSummaryListByEmployee!=null && this.jobSummaryListByEmployee.length>0){
          this.myJobSummary = this.jobSummaryListByEmployee[0].jobSummary;
        }
        else{
          this.myJobSummary = "";
        }
        
        console.log('Job Summary');
        
        console.log(this.jobSummaryListByEmployee);
        this.showJD = true;

      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Job Summary");
      }
    );
  }

//PLEASURE DISPLEASURE COMMENT
  //______________________________________________________________________________________________________________
  selected(rowData:any){
    debugger
   if((rowData.managerCmt == null && rowData.isDiscussed == 'Sub') || rowData.managerCmt == "" && rowData.isDiscussed == 'Sub'){
    rowData.isDiscussed = "";
    alert("You Can Not Submit Without Giving Any Comment");
   }
    

  }
  viewSatisfactory(rowData:any){
    var chars = rowData.employeeName.split('-');
    this.employee=chars[0];
    this.employeeId = rowData.employeeId;
    this.employeeDept = chars[2];
    this.loadSatisfactoryByEmployee();
  }

  viewprevious(employeeId){
    this.loadHistorySatisfactoryByEmployee();
  }
  showHistory:boolean=false;
  loadHistorySatisfactoryByEmployee(){
    this.showHistory = true;
    this.getAllPleasure();
    this. getAllDisPleasure();
  }


  loadSatisfactoryByEmployee(){
    this.getAllPleasure();
    this. getAllDisPleasure();
  }

  allPlesureList:any[];
  allPlesureListThisMonth:any[];
  getAllPleasure(){
    this.service.GetAllPleasureByEmployeeId(this.employeeId).subscribe(
      (res: any[]) => {
        this.allPlesureList = res;  
        this.allPlesureListThisMonth = this.allPlesureList ;
        //filtering this month satisfaction cmt
        this.allPlesureListThisMonth = res.filter(item => {
          // Create a Date object from the pleasureDate string
          const pleasureDate = new Date(item.pleasureDate);
  
          // Get the current date and month
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth();
  
          // Check if the pleasureDate's month matches the current month
          return pleasureDate.getMonth() === currentMonth;
        });   

        console.log('this.allPlesureList',this.allPlesureList);
        console.log('this.allPlesureListThisMonth',this.allPlesureListThisMonth);
      },
      (error) => {
        this.toastr.error("Failed to Fetch Plesure List"); 
      }
      
    );
  }

  allDisPlesureList:any[];
  allDisplesureListThisMonth:any[];
  getAllDisPleasure(){
    this.service.GetAllDisPleasureByEmployeeId(this.employeeId).subscribe(
      (res: any[]) => {
        this.allDisPlesureList = res; 
        this.allDisplesureListThisMonth =  this.allDisPlesureList;     
//filtering this month satisfaction cmt

        this.allDisplesureListThisMonth = res.filter(item => {
          // Create a Date object from the displeasureDate string
          const displeasureDate = new Date(item.displeasureDate);
  
          // Get the current date and month
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth();
  
          // Check if the displeasureDate's month matches the current month
          return displeasureDate.getMonth() === currentMonth;
        });   
      },
      (error) => {
        this.toastr.error("Failed to Fetch Displesure List");
        
      }
    );
  }

  SavePleasureComment(rowdata:any){
    this.service.CreatePleasureCommentSave(rowdata).subscribe(
      (res) => {
        this.toastr.success("Comment Saved Successfully");
        this.getAllDisPleasure();
      },
      (error) => {
        console.log('onsubmit error');
        console.log(error);
        this.toastr.error("Failed To Save Comment");
        
      }
    );
  }
  SubmitPleasureComment(rowdata:any){
    if(rowdata.managerCmt != "" && rowdata.managerCmt != null ){
    debugger
    rowdata.isDiscussed = "Sub";
    this.service.CreatePleasureCommentSave(rowdata).subscribe(
      (res) => {
        this.toastr.success("Comment Saved Successfully");
        this.getAllDisPleasure();
      },
      (error) => {
        console.log('onsubmit error');
        console.log(error);
        this.toastr.error("Failed To Save Comment");
        
      }
    );
    }
    else{
      this.toastr.error(" Can't Submit Without Manager Comment");
    }
  }

  SaveDisPleasureComment(rowdata:any){
    this.service.CreateDisPleasureCommentSave(rowdata).subscribe(
      (res) => {
        this.toastr.success("Comment Saved Successfully");
        this.getAllPleasure();
      },
      (error) => {
        console.log('onsubmit error');
        console.log(error);
        this.toastr.error("Failed To Save Comment");
        
      }
    );
  }
  SubmitDisPleasureComment(rowdata:any){
    if(rowdata.managerCmt != "" && rowdata.managerCmt != null ){
      debugger
      rowdata.isDiscussed = "Sub";
      this.service.CreateDisPleasureCommentSave(rowdata).subscribe(
        (res) => {
          this.toastr.success("Comment Saved Successfully");
          this.getAllPleasure();
        },
        (error) => {
          console.log('onsubmit error');
          console.log(error);
          this.toastr.error("Failed To Save Comment");
        }
      );
    }
    else{
             this.toastr.error(" Can't Submit Without Manager Comment");
    }
  }




//MISSION APPROVE
  //______________________________________________________________________________________________________________

  getAllMissionApprove(rowData:any) {

    var chars = rowData.employeeName.split('-');
    this.employee=chars[0];
    this.employeeId = rowData.employeeId;
    this.employeeDept = chars[2];
    console.log('getAllMissionApprove  going', this.employeeId);

    //this.visions = [];
    this.service.GetEmployeeMissionApprove(this.employeeId).subscribe(
      (res: any[]) => {
        this.missionApprove = res;        
        // console.log('Mission Approve');
        // console.log(res);
      },
      (error) => {
        this.toastr.error("Failed to Load Mission Approve List");
      }
    );
    this.GetOnlyMissionApprovedList(this.employeeId); 
    this.getAllMissionRejectedList(this.employeeId);
  }
  GetOnlyMissionApprovedList(employeeId) {
    this.service.GetOnlyEmployeeMissionApprovedList(employeeId).subscribe(
      (res: any[]) => {       
        this.onlyMissionApprovedList = res;   
       // console.log('Mission Approved List Onlyyyyyyyyyyyyy',res);
      },
      (error) => {
        this.toastr.error("Failed to Load Mission Approved List");      
      }
    );
  }
  
  getAllMissionRejectedList(employeeId) {
    //this.visions = [];
    this.service.GetOnlyEmployeeMissionRejectedList(employeeId).subscribe(
      (res: any[]) => {  
        this.missionRejecetedList = res;
       // console.log('Mission Rejected list onlyyyyyyyyy',res);  
      },
      (error) => {
        this.toastr.error("Failed to Load Mission Rejected List");  
      }
    );
  }
  

  ApproveMission(rowdata:IdmMissionModel) {
   // debugger
    this.service.ApproveMission(rowdata).subscribe(
      (res) => {
        this.toastr.success("Mission Approve Successful");
        console.log(res);
        this.getAllMissionApprove(rowdata);
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
         this.getAllMissionApprove(rowdata);
       },
       (error) => {
         this.toastr.error("Failed To Update");
       }
     );
   }

  RejectMission(rowdata:IdmMissionModel) {
   // debugger
    this.service.RejectMission(rowdata).subscribe(
      (res) => {
        this.toastr.success("Mission Reject Successful");
        console.log(res);
       this.getAllMissionApprove(rowdata);
      },
      (error) => {
        
        this.toastr.error("Failed To Mission Reject");
        console.log(error);
      }
    );
  }







//TRAINING APPROVE
  //______________________________________________________________________________________________________________
 
  getAllTrainingApprove(rowData:any) {

    var chars = rowData.employeeName.split('-');
    this.employee=chars[0];
    this.employeeId = rowData.employeeId;
    this.employeeDept = chars[2];
    console.log('getAllTRAINING  going', this.employeeId);
    this.service.GetEmployeeTrainingApprove(this.employeeId).subscribe(
      (res: any[]) => {
        this.trainingApprove = res;
        console.log('Training Approve');
        console.log(res);
      },
      (error) => {
        this.toastr.error("Failed to Load Training Approve List");
      }
    );
    this.getOnlyTrainingApproveList(this.employeeId);
    this. getOnlyTrainingRejectedList(this.employeeId);
  }


  getOnlyTrainingApproveList(employeeId) {
    this.service.GetEmployeeApprovedTraining(employeeId).subscribe(
      (res: any[]) => {
        //debugger
        console.log("traingh",employeeId)
        this.onlyTrainingApprovedList = res;

        console.log('Training Approved List Only');
        console.log(res);
      },
      (error) => {
        this.toastr.error("Failed to Load  Training Approved List");

      }
    );
  }

  getOnlyTrainingRejectedList(employeeId) {
    this.service.GetEmployeeRejectedTraining(employeeId).subscribe(
      (res: any[]) => {
        this.onlytrainingRejecetedList = res;
        console.log('Mission Rejected');
        console.log(res);
      },
      (error) => {
        this.toastr.error("Failed to Load Training Rejected List");

      }
    );
  }


  ApproveTraining(rowdata: IdmTrainingModel) {
  //  debugger
    this.service.ApproveTraining(rowdata).subscribe(
      (res) => {
        this.toastr.success("Training  Approve Successful");
        console.log(res);
        this.getAllTrainingApprove(rowdata);
        
      },
      (error) => {
        this.toastr.error("Failed To Mission Approve");
        console.log(error);
      }
    );
  }

  RejectTraining(rowdata: IdmTrainingModel) {
  //  debugger
    this.service.RejectTraining(rowdata).subscribe(
      (res) => {
        this.toastr.success("Training Rejected Successful");
        console.log(res);
        this.getAllTrainingApprove(rowdata);
 
      },
      (error) => {
        this.toastr.error("Training Reject");
        console.log(error);
      }
    );
  }




}




