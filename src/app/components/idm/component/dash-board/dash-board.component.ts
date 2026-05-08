import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { CommonFiles } from 'src/app/components/merchandising/models/common-files.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { environment } from 'src/environments/environment';
import { EmployeePersonalInfoModel } from '../../model/employee-personal-info.model';
import { JobDescriptionModel } from '../../model/job-description.model';
import { IdmService } from '../../service/idm.service';
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  dashboardForm: FormGroup;
  kpiForm: FormGroup;
  myId: string;
  myInfo: EmployeePersonalInfoModel[] = new Array();
  jobDescriptionListByEmployee: JobDescriptionModel[] = new Array();
  jobSummaryListByEmployee: JobDescriptionModel[] = new Array();
  visions: any[];
  missions: any[];
  missionachivements: any[];
  modalRef?: BsModalRef;
  visionAndMission: any[];
  displayBasic: boolean;
  showvideo: boolean;
  url = environment.fileUrl;
//for kpi
  doubleTypeTotalValOne=0;
  doubleTypeTotalValTwo=0;
  doubleTypeTotalValFirstAvg=0;
  doubleTypeTotalValSecAvg=0;
  doubleTypeTotalValOnePrevYr=0;
  doubleTypeTotalValTwoPrevYr=0;

  tripleTypeTotalValOne=0;
  tripleTypeTotalValTwo=0;
  tripleTypeTotalValThree=0;
  tripleTypeTotalValFirstAvg=0;
  tripleTypeTotalValSecAvg=0;

  // employeeName:string;
  // department:string;
  // section:string;
  // designation:string;
  // company:string;
  // doj:string;
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: IdmService,
    private toastr: ToastrService,
    private authService: AuthService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.myId = this.authService.decodedToken?.unique_name;
    this.InitializeForm();
    this.InitKpiForm();
    this.loadMyPersonalInfo();
    this.loadJDByEmployee();
    this.getVision();
    //this.getAllVisionStatus();
    this.getAllTrainingRequisition();
    this.getAllPleasure();
    this.getAllDisPleasure();
    this.loadIdmCurrentYearMeetingList();
    this.loadJSByEmployee();
    this.getAllKpiAssigned();
  }


  loadMyPersonalInfo() {
    this.service.PersonalByMyId(this.myId).subscribe(
      (data: EmployeePersonalInfoModel) => {

        let employeeObj = new EmployeePersonalInfoModel();
        employeeObj.employeeName = data.employeeName;
        employeeObj.department = data.department;
        employeeObj.section = data.section;
        employeeObj.designation = data.designation;
        employeeObj.company = data.company;
        employeeObj.doj = data.doj;

        //this.myInfo=data;
        this.myInfo.push(employeeObj);

      },
      (error) => {
        this.toastr.warning("No Data Found", "Personal Info");

      }
    );
  }

  InitializeForm() {
    this.dashboardForm = this.fb.group({
      employeeName: [""],
      department: [""],
      section: [""],
      designation: [""],
      company: [""],
      yearId: [new Date().getFullYear()],
      january: ["0"],
      february: ["0"],
      march: ["0"],
      april: ["0"],
      may: ["0"],
      june: ["0"],
      jul: ["0"],
      august: ["0"],
      september: ["0"],
      october: ["0"],
      november: ["0"],
      december: ["0"],
      visionMstId:[0],
      missionMstId:[0],
      id:[0],
      // kpiId: [0],
      // kpiName: ["0"],
      // kpiActualAchivement:[0],
      // kpiTarget:["0"],
      // kpiAchivedScore:[0],
      // kpiWeightedScore:[0],
    });
  }

  InitKpiForm() {
    this.kpiForm = this.fb.group({
      
      id: [0],
      mstId: [0],
      departmentName: [""],
      kpiName: [""],
      employeeId: [0],
      employeeName:[""],
      leaderId: [0],
      leaderName:[""],
      coLeaderId: [0],
      coLeaderName:[""],   
      targetNumber: [0],
      weightNumber: [0],
      typeName: ["0"],
      january: [0],
      february: [0],
      march: [0],
      april: [0],
      may: [0],
      june: [0],
      july: [0],
      august: [0],
      september: [0],
      october: [0],
      november: [0],
      december: [0],
      //avarage:[0],
      ytdValue:[0],
      doubleTypeColOne:[""],
      doubleTypeColTwo:[""],
      tripleTypeColThree:[""],
      tripleTypeColTwo:[""],
      tripleTypeColOne:[""],   
      avgKpiOneTitle:[""],
      avgKpiTwoTitle:[""],  
      previousYearId:[new Date().getFullYear()-1],
      
      kpiAssignMstId:[""],
      Month: [""], 
      doubleTypeValOne: [0],
      doubleTypeValTwo:[0] ,
      tripleTypeValOne: [0],
      tripleTypeValTwo: [0],
      tripleTypeValThree: [0] ,
      yearId:[new Date().getFullYear()],

      firstAverage:[0],
      secondAverage:[0],
    });
  }


  loadJDByEmployee() {
    this.service.GetJobDesByEmployeeId(this.myId).subscribe(
      (res: JobDescriptionModel[]) => {
        this.jobDescriptionListByEmployee = res;
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Job Description");
      }
    );
  }

  getVision() {
    this.visions = [];
    this.service.GetVisions().subscribe(
      (res: any[]) => {
        this.visions = res;
        console.log('vision List');
        console.log(this.visions);
      },
      (error) => {
        this.toastr.error("Failed to Load Visions");
        this.visions = [];
      }
    );
  }

  // getMissionForPopUp(rowData:any, template: TemplateRef<any>) {
  //   this.missions = [];
  //   this.service.GetMissionByVisionId(rowData.id).subscribe(
  //     (res: any[]) => {
  //       this.missions = res;
  //       console.log('mission List');
  //       console.log(this.missions);
  //       this.modalRef = this.modalService.show(template, { class: "modal-lg" });
  //     },
  //     (error) => {
  //       this.toastr.error("Failed to Load Visions");
  //       this.visions = [];
  //     }
  //   );
  // }

  showMission: boolean = false;
  showMissionApproveStatus: string = "";
  getMissionForTable(rowData: any) {
    console.log('getMissionForTable', rowData);
    this.missions = [];
    this.service.GetMissionByVisionId(rowData.id).subscribe(
      (res: any[]) => {
        this.missions = res;
        console.log('mission List');
        console.log(this.missions);
        this.showMission = true;
        this.showMissionAchivement = false;
        if (this.missions.length == 0) {
          this.showMissionApproveStatus = "No Approved Mission Found. Please Contact with Your Team Lead to Approve your Mission";
        }
        else {
          this.showMissionApproveStatus = null;
        }
      },
      (error) => {
        this.toastr.error("Failed to Load Visions");
        this.visions = [];
      }
    );
  }


  missionachivement: any;
  showMissionAchivement: boolean = false;
  getMissionAchivement(mission: any) {
    this.MissionAchivementClear();
    this.InitializeForm();
    this.showMissionAchivement = true;
    console.log('visionMstId', mission.visionMstId);
    console.log('missionid', mission.id);

    this.missionachivements = [];
    this.service.GetMissionAchivementByVisionMissionId(mission.id, mission.visionMstId).subscribe(
      (res: any[]) => {
        this.missionachivements = res;
        console.log('missionachivements', this.missionachivements);
        this.showMissionAchivement = true;

        if (this.missionachivements.length == 0) {

          this.dashboardForm.patchValue
            ({
              visionMstId: mission.visionMstId,
              missionMstId: mission.id,
            });
            console.log('get', this.dashboardForm)
          }
         else 
         {
          this.dashboardForm.patchValue
          ({
            visionMstId: this.missionachivements[0].visionMstId,
            missionMstId: this.missionachivements[0].missionMstId,
            january: this.missionachivements[0].january,
            february: this.missionachivements[0].february,
            march: this.missionachivements[0].march,
            april: this.missionachivements[0].april,
            may: this.missionachivements[0].may,
            june: this.missionachivements[0].june,
            jul: this.missionachivements[0].jul,
            august: this.missionachivements[0].august,
            september: this.missionachivements[0].september,
            october: this.missionachivements[0].october,
            november: this.missionachivements[0].november,
            december: this.missionachivements[0].december,
            yearId: this.missionachivements[0].yearId,
            id: this.missionachivements[0].id,
          });
          console.log('get', this.dashboardForm)
            this.showMissionApproveStatus = null;
          }
        },
        (error) => {
          this.toastr.error("Failed to Load Visions");
          this.visions = [];
        }
    );
  }

MissionAchivementClear(){
 this.dashboardForm.reset();
}


  onSaveMissionAchivement() {
    if (this.dashboardForm.valid) {
      console.log('Missionvission id', this.missions)
      this.service.SaveMissionAchivement(this.dashboardForm.value).subscribe(
        (res) => {
          this.toastr.success("Vision Saved Successfully");
          this.showMissionAchivement = false;
          this.MissionAchivementClear();
          
        },
        (error) => {
          console.log('onsubmit error');
          console.log(error);
          this.toastr.error("Failed To Save Vision");

        }
      );
    } else {
      this.toastr.error("Please Add Mission first!");
    }
  }

  trainingScheduleList: any[];
  trainingDonePrct: number = 0;
  trainingDoneNumber: number = 0;
  coachPrct: number = 0;
  autonmyPrct: number = 0;
  countTargetAutonomy: number = 0;
  countparticipationTarget: number = 0;
  countTargetCoach: number = 0;
  RealizeAutonomy: number = 0;
  RealizeCoach: number = 0;
  participation: number = 0;
  getAllTrainingRequisition() {
    this.service.GetAllRequitionForScheduleByEmpolyeeId().subscribe(
      (res: any[]) => {
        this.trainingScheduleList = res;
        console.log('All Requisition List');
        console.log(res);
        if (this.trainingScheduleList != null && this.trainingScheduleList != undefined) {
          var countparticipation = this.trainingScheduleList.filter(x => x.achievePoint >= 2).length;
          var countparticipationTarget = this.trainingScheduleList.filter(x => x.target >= 2).length;
          var countTargetAutonomy = this.trainingScheduleList.filter(x => parseInt(x.target) > 2).length;
          var countTargetCoach = this.trainingScheduleList.filter(x => parseInt(x.target) == 4).length;
          var countRealizeAutonomy = this.trainingScheduleList.filter(x => x.achievePoint > 2).length;
          var countRealizeCoach = this.trainingScheduleList.filter(x => x.achievePoint == 4).length;
          this.RealizeAutonomy = countRealizeAutonomy;
          this.RealizeCoach = countRealizeCoach;
          this.participation=countparticipationTarget;

          if (countparticipationTarget > 0) {
            this.trainingDoneNumber = countparticipation
          }
          else {
            this.trainingDoneNumber = 0;
          }

          if (countparticipationTarget > 0) {
            this.trainingDonePrct = (countparticipation / countparticipationTarget) * 100;
          
          }
          else {
            this.trainingDonePrct = 0;
          }

          if (countTargetAutonomy > 0) {
            this.autonmyPrct = (countRealizeAutonomy / countTargetAutonomy) * 100;
          
         
          }
          else {
            this.autonmyPrct = 0;
          }

          if (countTargetCoach > 0) {
            this.coachPrct = (countRealizeCoach / countparticipation) * 100;
         
          }
          else {
            this.coachPrct = 0;
          }

          this.trainingScheduleList.forEach(element => {
            if (element.scheduleDate == "0001-01-01T00:00:00") {
              element.scheduleDate = "";
            }
          });
        }

      },
      (error) => {
        this.toastr.error("Failed to Load My Requisition List");

      }
    );
  }

  closeMission() {
    this.showMission = false;
    this.showMissionAchivement = false;

  }

  allPlesureList: any[];
  getAllPleasure() {
    this.service.GetAllPleasure().subscribe(
      (res: any[]) => {
        this.allPlesureList = res;
        console.log('Pleasure List');
        console.log(this.allPlesureList);
      },
      (error) => {
        this.toastr.error("Failed to Fetch Plesure List");

      }
    );
  }
  allDisPlesureList: any[];
  getAllDisPleasure() {
    this.service.GetAllDisPleasure().subscribe(
      (res: any[]) => {
        this.allDisPlesureList = res;
        console.log('Displeasure List');
        console.log(this.allDisPlesureList);
      },
      (error) => {
        this.toastr.error("Failed to Fetch Displesure List");

      }
    );
  }

  meetingList: any;
  forecastMeeting: number = 0;
  realMeeting: number = 0;
  loadIdmCurrentYearMeetingList() {
    this.service.GetAllIndividualMeetingForIDMDashBoard(0).subscribe(
      (res: any) => {
        console.log('meetingList List');
        console.log(res);
        this.meetingList = res;

        if (this.meetingList != null && this.meetingList != undefined) {
          if (this.meetingList.forecastJanuary != undefined && this.meetingList.forecastJanuary != null && this.meetingList.forecastJanuary != "") {
            this.forecastMeeting = this.forecastMeeting + 1;
          }

          if (this.meetingList.forecastFebruary != undefined && this.meetingList.forecastFebruary != null && this.meetingList.forecastFebruary != "") {
            this.forecastMeeting = this.forecastMeeting + 1;
          }

          if (this.meetingList.forecastMarch != undefined && this.meetingList.forecastMarch != null && this.meetingList.forecastMarch != "") {
            this.forecastMeeting = this.forecastMeeting + 1;
          }

          if (this.meetingList.forecastApril != undefined && this.meetingList.forecastApril != null && this.meetingList.forecastApril != "") {
            this.forecastMeeting = this.forecastMeeting + 1;
          }

          if (this.meetingList.forecastMay != undefined && this.meetingList.forecastMay != null && this.meetingList.forecastMay != "") {
            this.forecastMeeting = this.forecastMeeting + 1;
          }
          if (this.meetingList.forecastJune != undefined && this.meetingList.forecastJune != null && this.meetingList.forecastJune != "") {
            this.forecastMeeting = this.forecastMeeting + 1;
          }

          if (this.meetingList.forecastJuly != undefined && this.meetingList.forecastJuly != null && this.meetingList.forecastJuly != "") {
            this.forecastMeeting = this.forecastMeeting + 1;
          }

          if (this.meetingList.forecastAugust != undefined && this.meetingList.forecastAugust != null && this.meetingList.forecastAugust != "") {
            this.forecastMeeting = this.forecastMeeting + 1;
          }

          if (this.meetingList.forecastSeptember != undefined && this.meetingList.forecastSeptember != null && this.meetingList.forecastSeptember != "") {
            this.forecastMeeting = this.forecastMeeting + 1;
          }

          if (this.meetingList.forecastOctober != undefined && this.meetingList.forecastOctober != null && this.meetingList.forecastOctober != "") {
            this.forecastMeeting = this.forecastMeeting + 1;
          }

          if (this.meetingList.forecastNovember != undefined && this.meetingList.forecastNovember != null && this.meetingList.forecastNovember != "") {
            this.forecastMeeting = this.forecastMeeting + 1;
          }

          if (this.meetingList.forecastDecember != undefined && this.meetingList.forecastDecember != null && this.meetingList.forecastDecember != "") {
            this.forecastMeeting = this.forecastMeeting + 1;
          }




          if (this.meetingList.realJanuary != undefined && this.meetingList.realJanuary != null && this.meetingList.realJanuary != "") {
            this.realMeeting = this.realMeeting + 1;
          }

          if (this.meetingList.realFebruary != undefined && this.meetingList.realFebruary != null && this.meetingList.realFebruary != "") {
            this.realMeeting = this.realMeeting + 1;
          }

          if (this.meetingList.realMarch != undefined && this.meetingList.realMarch != null && this.meetingList.realMarch != "") {
            this.realMeeting = this.realMeeting + 1;
          }

          if (this.meetingList.realApril != undefined && this.meetingList.realApril != null && this.meetingList.realApril != "") {
            this.realMeeting = this.realMeeting + 1;
          }

          if (this.meetingList.realMay != undefined && this.meetingList.realMay != null && this.meetingList.realMay != "") {
            this.realMeeting = this.realMeeting + 1;
          }
          if (this.meetingList.realJune != undefined && this.meetingList.realJune != null && this.meetingList.realJune != "") {
            this.realMeeting = this.realMeeting + 1;
          }

          if (this.meetingList.realJuly != undefined && this.meetingList.realJuly != null && this.meetingList.realJuly != "") {
            this.realMeeting = this.realMeeting + 1;
          }

          if (this.meetingList.realAugust != undefined && this.meetingList.realAugust != null && this.meetingList.realAugust != "") {
            this.realMeeting = this.realMeeting + 1;
          }

          if (this.meetingList.realSeptember != undefined && this.meetingList.realSeptember != null && this.meetingList.realSeptember != "") {
            this.realMeeting = this.realMeeting + 1;
          }

          if (this.meetingList.realOctober != undefined && this.meetingList.realOctober != null && this.meetingList.realOctober != "") {
            this.realMeeting = this.realMeeting + 1;
          }

          if (this.meetingList.realNovember != undefined && this.meetingList.realNovember != null && this.meetingList.realNovember != "") {
            this.realMeeting = this.realMeeting + 1;
          }

          if (this.meetingList.realDecember != undefined && this.meetingList.realDecember != null && this.meetingList.realDecember != "") {
            this.realMeeting = this.realMeeting + 1;
          }
        }
        else {
          this.meetingList = {};
        }





      },
      (error) => {
        this.toastr.error("Failed to Fetch Plesure List");

      }
    );
  }
  myJobSummary: string = "";
  loadJSByEmployee() {
    this.service.GetJobSummaryByEmployeeId(this.myId).subscribe(
      (res: JobDescriptionModel[]) => {
        this.jobSummaryListByEmployee = res;
        if (this.jobSummaryListByEmployee != null && this.jobSummaryListByEmployee != undefined) {
          this.myJobSummary = this.jobSummaryListByEmployee[0].jobSummary;
        }
        else {
          this.myJobSummary = "";
        }
        console.log('Job Summary');
        console.log(this.jobSummaryListByEmployee);
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Job Summary");
      }
    );
  }
  ShowFiles(obj: any) {
    this.displayBasic = true;
    let fileObjectId = 129;
    this.commonService.GetTrainingFilesByRefId(obj.idmTrainingMstId, fileObjectId).subscribe((data: any) => {
      if (data) {
        this.commonService.commonFilesList = data;
        console.log("common List : ", this.commonService.commonFilesList);

      }
    },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Files");
      }
    );
  }




  allKpiAssignedList: any[];
  getAllKpiAssigned() {
    this.service.GetAssignedKpitByEmpolyeeId().subscribe(
      (res: any[]) => {
        this.allKpiAssignedList = res;
        console.log('KPI List',this.allKpiAssignedList);
      },
      (error) => {
        this.toastr.error("Failed to Fetch Assigned Kpi List");

      }
    );
  }

  
  kpidetails: any;
  kpidetailsDisplay: boolean=false;
  kpidetailsDisplay2: boolean=false;
  getKpiDetailsDisplay(kpi: any) {

  this.KpiDetailClear();
  this.InitKpiForm(); 

  if(kpi.formatTypeName=='Triple'){
    this.kpidetailsDisplay2=true;
    this.kpidetailsDisplay=false;
  }
  else{
    this.kpidetailsDisplay=true;
    this.kpidetailsDisplay2=false;
  }
  
   this.kpidetails = [];
   debugger
    this.service.GetDetailKpitByMstId(kpi.id).subscribe(
      (res: any[]) => {
        this.kpidetails = res;

        this.kpidetails = this.kpidetails.map(kpidetail => {
          kpidetail.mstId = kpi.id;
          kpidetail.kpiAssignMstId = kpi.id;
          return kpidetail;
        });
        console.log('kpidetails', this.kpidetails);

        //this.kpidetailsDisplay = true;
          this.kpiForm.patchValue
          ({          
            departmentName: kpi.departmentName,
            kpiName: kpi.kpiName,
            employeeId: kpi.employeeId,
            employeeName: kpi.employeeName,
            leaderId: kpi.leaderId,
            leaderName: kpi.leaderName,
            coLeaderId: kpi.coLeaderId,
            coLeaderName: kpi.coLeaderName,
            targetNumber: kpi.targetNumber,
            weightNumber: kpi.weightNumber,
            typeName: kpi.typeName,
            doubleTypeColOne: kpi.doubleTypeColOne,
            doubleTypeColTwo: kpi.doubleTypeColTwo,
            tripleTypeColThree: kpi.tripleTypeColThree,
            tripleTypeColTwo: kpi.tripleTypeColTwo,
            tripleTypeColOne: kpi.tripleTypeColOne,
            avgKpiOneTitle: kpi.avgKpiOneTitle,
            avgKpiTwoTitle: kpi.avgKpiTwoTitle,
            ytdValue:kpi.ytdValue,
          
            mstId:kpi.id,
            kpiAssignMstId:kpi.id,
            Month: this.kpidetails.Month,
            doubleTypeValOne: this.kpidetails.doubleTypeValOne,
            doubleTypeValTwo: this.kpidetails.doubleTypeValTwo,
            tripleTypeValOne: this.kpidetails.tripleTypeValOne,
            tripleTypeValTwo: this.kpidetails.tripleTypeValTwo,
            tripleTypeValThree: this.kpidetails.tripleTypeValThree,
            yearId: this.kpidetails[0].yearId,
            previousYearId: this.kpidetails[0].yearId- 1, 
            firstAverage: this.kpidetails.firstAverage,
            secondAverage: this.kpidetails.secondAverage,
          });
          console.log('get', this.kpiForm)
          this.tripleTypeCal(res);
          this.doubleTypeCalInit(res)
            // this.showMissionApproveStatus = null;
        },
        (error) => {
          this.toastr.error("Failed to Load Kpi Details");  
        }
  );
  
  }

  
KpiDetailClear(){
  this.kpiForm.reset();
 }
 
 
 onSaveKpiDetail() {
  if (this.kpiForm.valid) {
   console.log('kpi form save ',this.kpiForm);
   console.log('list ', this.kpidetails);
    this.service.SaveKpiDetails(this.kpiForm.value,this.kpidetails).subscribe(
      (res) => {
        this.toastr.success("KPI Saved Successfully");
        this.kpidetailsDisplay = false;
        this.kpidetailsDisplay2 = false;
        this.KpiDetailClear();
        
      },
      (error) => {
        console.log('onsubmit error');
        console.log(error);
        this.toastr.error("Failed To Save KPI Details");

      }
    );
  } else {
    this.toastr.error("Invalid KPI Details!");
  }
}

   getshowvid(){
    this.showvideo=true;
   }

   //triple type  calculation
   tripleTypeCal(obj:any){
    debugger
    this.tripleTypeTotalValOne = this.kpidetails.reduce((sum, list) => sum + list.tripleTypeValOne, 0);
    this.tripleTypeTotalValTwo = this.kpidetails.reduce((sum, list) => sum + list.tripleTypeValTwo, 0);
    this.tripleTypeTotalValThree = this.kpidetails.reduce((sum, list) => sum + list.tripleTypeValThree, 0);
    var countFirstAverage = this.kpidetails.filter(item => item.firstAverage > 0).length;
    var countSecondAverage = this.kpidetails.filter(item => item.secondAverage > 0).length;
    if(countFirstAverage >0 ){
      var totalFirstAvg = this.kpidetails.reduce((sum, list) => sum + list.firstAverage, 0);
      this.tripleTypeTotalValFirstAvg = parseFloat((totalFirstAvg / countFirstAverage).toFixed(6));
    }else{this.tripleTypeTotalValFirstAvg = 0;}
    if(countSecondAverage >0 ){
      var totalSecondAvg = this.kpidetails.reduce((sum, list) => sum + list.secondAverage, 0);
      this.tripleTypeTotalValSecAvg =  parseFloat((totalSecondAvg / countSecondAverage).toFixed(6));
    }else{this.tripleTypeTotalValSecAvg = 0;}
 }
//triple type  calculation
   tripleTypeCalFstCol(obj:any){
    debugger
    if(obj.tripleTypeValOne == 0){
      this.toastr.warning("First Column Can Not Be Zero !!");
      obj.tripleTypeValOne = 0;
      obj.tripleTypeValTwo = 0;
      obj.tripleTypeValThree = 0;
      obj.firstAverage = 0;
      obj.secondAverage = 0;
    }
    else{
      obj.firstAverage=parseFloat((obj.tripleTypeValTwo / obj.tripleTypeValOne).toFixed(6));
      obj.secondAverage=parseFloat((obj.tripleTypeValThree / obj.tripleTypeValOne).toFixed(6));
    }
    //for total calculation in footer
   this.tripleTypeTotalValOne = this.kpidetails.reduce((sum, list) => sum + list.tripleTypeValOne, 0);
   this.tripleTypeTotalValTwo = this.kpidetails.reduce((sum, list) => sum + list.tripleTypeValTwo, 0);
   this.tripleTypeTotalValThree = this.kpidetails.reduce((sum, list) => sum + list.tripleTypeValThree, 0);
   var countFirstAverage = this.kpidetails.filter(item => item.firstAverage > 0).length;
   var countSecondAverage = this.kpidetails.filter(item => item.secondAverage > 0).length;
   if(countFirstAverage >0 ){
    var totalFirstAvg = this.kpidetails.reduce((sum, list) => sum + list.firstAverage, 0);
    this.tripleTypeTotalValFirstAvg = parseFloat((totalFirstAvg / countFirstAverage).toFixed(6));
  }else{this.tripleTypeTotalValFirstAvg = 0;}
  if(countSecondAverage >0 ){
    var totalSecondAvg = this.kpidetails.reduce((sum, list) => sum + list.secondAverage, 0);
    this.tripleTypeTotalValSecAvg = parseFloat((totalSecondAvg / countSecondAverage).toFixed(6));
  }else{this.tripleTypeTotalValSecAvg = 0;}
 }
   tripleTypeCalAvgSecCol(obj:any){
    debugger
    if(obj.tripleTypeValOne == 0){
      this.toastr.warning("Unable calculation Average: First column cannot be zero!");
      obj.tripleTypeValTwo = 0;
      obj.firstAverage = 0;
    }
    else{
      obj.firstAverage=parseFloat((obj.tripleTypeValTwo / obj.tripleTypeValOne).toFixed(6));
    }
    //for total calculation in footer
    this.tripleTypeTotalValOne = this.kpidetails.reduce((sum, list) => sum + list.tripleTypeValOne, 0);
    this.tripleTypeTotalValTwo = this.kpidetails.reduce((sum, list) => sum + list.tripleTypeValTwo, 0);
    this.tripleTypeTotalValThree = this.kpidetails.reduce((sum, list) => sum + list.tripleTypeValThree, 0);
    var countFirstAverage = this.kpidetails.filter(item => item.firstAverage > 0).length;
    if(countFirstAverage >0 ){
      var totalFirstAvg = this.kpidetails.reduce((sum, list) => sum + list.firstAverage, 0);
      this.tripleTypeTotalValFirstAvg = parseFloat((totalFirstAvg / countFirstAverage).toFixed(6));
    }
    else{
      this.tripleTypeTotalValFirstAvg = 0;
    }
  }
  tripleTypeCalAvgThirdCol(obj:any){
    debugger
    if(obj.tripleTypeValOne == 0){
      this.toastr.warning("Unable calculation Average: First column cannot be zero!");
      obj.tripleTypeValOne = 0;
      obj.tripleTypeValThree = 0;
      obj.secondAverage = 0;
    }
    else{
      obj.secondAverage=parseFloat((obj.tripleTypeValThree / obj.tripleTypeValOne).toFixed(6));
    }
   //for total calculation in footer
    this.tripleTypeTotalValOne = this.kpidetails.reduce((sum, list) => sum + list.tripleTypeValOne, 0);
    this.tripleTypeTotalValTwo = this.kpidetails.reduce((sum, list) => sum + list.tripleTypeValTwo, 0);
    this.tripleTypeTotalValThree = this.kpidetails.reduce((sum, list) => sum + list.tripleTypeValThree, 0);
    
    var countSecondAverage = this.kpidetails.filter(item => item.secondAverage > 0).length;
    if(countSecondAverage >0 ){
      var totalSecondAvg = this.kpidetails.reduce((sum, list) => sum + list.secondAverage, 0);
      this.tripleTypeTotalValSecAvg =  parseFloat((totalSecondAvg / countSecondAverage).toFixed(6));
    }
    else{
      this.tripleTypeTotalValSecAvg = 0;
  }
}


doubleTypeCalInit(obj:any){
  this.doubleTypeTotalValOnePrevYr = this.kpidetails.reduce((sum, list) => sum + list.dblTypValOnePrevYr, 0);
  this.doubleTypeTotalValTwoPrevYr = this.kpidetails.reduce((sum, list) => sum + list.dblTypValTwoPrevYr, 0);
  this.doubleTypeTotalValOne = this.kpidetails.reduce((sum, list) => sum + list.doubleTypeValOne, 0);
  this.doubleTypeTotalValTwo = this.kpidetails.reduce((sum, list) => sum + list.doubleTypeValTwo, 0);
  this.doubleTypeTotalValFirstAvg = this.kpidetails.reduce((sum, list) => sum + list.firstAverage, 0);
  this.doubleTypeTotalValSecAvg = this.kpidetails.reduce((sum, list) => sum + list.secondAverage, 0);
  if(this.doubleTypeTotalValTwoPrevYr == 0){
    this.doubleTypeTotalValFirstAvg =0;
    this.doubleTypeTotalValSecAvg =0;
  }else{
    this.doubleTypeTotalValFirstAvg = parseFloat((( this.doubleTypeTotalValTwo / this.doubleTypeTotalValTwoPrevYr) *100).toFixed(6));
    this.doubleTypeTotalValSecAvg =  parseFloat((((this.doubleTypeTotalValTwo - this.doubleTypeTotalValTwoPrevYr) /this.doubleTypeTotalValTwoPrevYr) * 100).toFixed(6)); 
  }
  }
doubleTypeCalPrevYrOne(obj:any){
  this.doubleTypeTotalValOnePrevYr = this.kpidetails.reduce((sum, list) => sum + list.dblTypValOnePrevYr, 0);
  this.doubleTypeTotalValFirstAvg = this.kpidetails.reduce((sum, list) => sum + list.firstAverage, 0);
  this.doubleTypeTotalValSecAvg = this.kpidetails.reduce((sum, list) => sum + list.secondAverage, 0);
  if(this.doubleTypeTotalValTwoPrevYr == 0){
    this.doubleTypeTotalValFirstAvg =0;
    this.doubleTypeTotalValSecAvg =0;
  }else{
    this.doubleTypeTotalValFirstAvg = parseFloat((( this.doubleTypeTotalValTwo / this.doubleTypeTotalValTwoPrevYr) *100).toFixed(6));
    this.doubleTypeTotalValSecAvg =  parseFloat((((this.doubleTypeTotalValTwo - this.doubleTypeTotalValTwoPrevYr) /this.doubleTypeTotalValTwoPrevYr) * 100).toFixed(6)); 
  }
}  
doubleTypeCalPrevYrTwo(obj:any){
  if(obj.dblTypValTwoPrevYr == 0){
    this.toastr.warning("Unable calculation Average: First column cannot be zero!");
    obj.doubleTypeValTwo = 0;
    obj.firstAverage = 0;
    obj.secondAverage = 0;
  }
  else{
    obj.firstAverage=parseFloat(((obj.doubleTypeValTwo / obj.dblTypValTwoPrevYr)*100).toFixed(6));
    obj.secondAverage=parseFloat((((obj.doubleTypeValTwo -obj.dblTypValTwoPrevYr) / obj.dblTypValTwoPrevYr)*100).toFixed(6));
  }
  this.doubleTypeTotalValTwoPrevYr = this.kpidetails.reduce((sum, list) => sum + list.dblTypValTwoPrevYr, 0);
  this.doubleTypeTotalValFirstAvg = this.kpidetails.reduce((sum, list) => sum + list.firstAverage, 0);
  this.doubleTypeTotalValSecAvg = this.kpidetails.reduce((sum, list) => sum + list.secondAverage, 0);
  if(this.doubleTypeTotalValTwoPrevYr == 0){
    this.doubleTypeTotalValFirstAvg =0;
    this.doubleTypeTotalValSecAvg =0;
  }else{
    this.doubleTypeTotalValFirstAvg = parseFloat((( this.doubleTypeTotalValTwo / this.doubleTypeTotalValTwoPrevYr) *100).toFixed(6));
    this.doubleTypeTotalValSecAvg =  parseFloat((((this.doubleTypeTotalValTwo - this.doubleTypeTotalValTwoPrevYr) /this.doubleTypeTotalValTwoPrevYr) * 100).toFixed(6)); 
  }
}
doubleTypeCalOne(obj:any){
  this.doubleTypeTotalValOne = this.kpidetails.reduce((sum, list) => sum + list.doubleTypeValOne, 0);
  this.doubleTypeTotalValFirstAvg = this.kpidetails.reduce((sum, list) => sum + list.firstAverage, 0);
  this.doubleTypeTotalValSecAvg = this.kpidetails.reduce((sum, list) => sum + list.secondAverage, 0);

   if(this.doubleTypeTotalValTwoPrevYr == 0){
    this.doubleTypeTotalValFirstAvg =0;
    this.doubleTypeTotalValSecAvg =0;
  }else{
    this.doubleTypeTotalValFirstAvg = parseFloat((( this.doubleTypeTotalValTwo / this.doubleTypeTotalValTwoPrevYr) *100).toFixed(6));
    this.doubleTypeTotalValSecAvg =  parseFloat((((this.doubleTypeTotalValTwo - this.doubleTypeTotalValTwoPrevYr) /this.doubleTypeTotalValTwoPrevYr) * 100).toFixed(6)); 
  }
}
doubleTypeCalTwo(obj:any){
  debugger
  if(obj.dblTypValTwoPrevYr == 0){
    this.toastr.warning("Unable calculation Average: First column cannot be zero!");
    obj.dblTypValOnePrevYr = 0;
    obj.firstAverage = 0;
    obj.secondAverage = 0;
  }
  else{
    obj.firstAverage=parseFloat(((obj.doubleTypeValTwo / obj.dblTypValTwoPrevYr)*100).toFixed(6));
    obj.secondAverage=parseFloat((((obj.doubleTypeValTwo -obj.dblTypValTwoPrevYr) / obj.dblTypValTwoPrevYr)*100).toFixed(6));
  }
  this.doubleTypeTotalValTwo = this.kpidetails.reduce((sum, list) => sum + list.doubleTypeValTwo, 0);
  this.doubleTypeTotalValFirstAvg = this.kpidetails.reduce((sum, list) => sum + list.firstAverage, 0);
  this.doubleTypeTotalValSecAvg = this.kpidetails.reduce((sum, list) => sum + list.secondAverage, 0);

  if(this.doubleTypeTotalValTwoPrevYr == 0){
    this.doubleTypeTotalValFirstAvg =0;
    this.doubleTypeTotalValSecAvg =0;
  }else{
    this.doubleTypeTotalValFirstAvg = parseFloat((( this.doubleTypeTotalValTwo / this.doubleTypeTotalValTwoPrevYr) *100).toFixed(6));
    this.doubleTypeTotalValSecAvg =  parseFloat((((this.doubleTypeTotalValTwo - this.doubleTypeTotalValTwoPrevYr) /this.doubleTypeTotalValTwoPrevYr) * 100).toFixed(6)); 
  }
}

}
