import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from 'src/app/shared/service/token.service';
import { environment } from 'src/environments/environment';
import { EmployeePersonalInfoModel } from '../model/employee-personal-info.model';
import { IdmMissionModel } from '../model/idm.mission.model';
import { IdmVissionModel } from '../model/idm.vission.model';
import { JobDescriptionModel } from '../model/job-description.model';
import { TrainingEntryModel } from '../model/trainingEntry.model';
import { TrainingListModel } from '../model/trainingList.model';
import { TrainingTypeModel } from '../model/trainingType.model';
import { IdmTrainingModel } from '../model/idm.training.model';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { SkillPlanMaster } from '../model/skill-plan-master.model';
import { IdmSupervisorModel } from '../model/idm-supervisor.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdmService {

  baseUrl = environment.apiUrl;
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
  datepipe: any;
  constructor(private http: HttpClient, private token: TokenService) { }

  GetTrainingTypeList() {
    return this.http.get<TrainingTypeModel[]>(this.baseUrl_ + "IDM/GetAllTrainingTypeList", { headers: this.token.headerToken() });
  }

  TrainingCreate(triningInfo: TrainingEntryModel, triningInfoList: TrainingListModel[]) {
    var body = {
      ...triningInfo,
      TrainingList: triningInfoList
    }
    //console.log("Training Info Save");
    //console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "IDM/CreateTrainingEntrySave", body, {
      headers: this.token.headerToken(),
    });
  }

  TrainerUpdate(triningInfo: TrainingEntryModel) {
    var body = {
      ...triningInfo
    }
    //console.log("Training Info Save");
    //console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "IDM/UpdateTrainer", body, {
      headers: this.token.headerToken(),
    });
  }
  // bytt for training entry list load with section
  GetTrainingListByType(typeId: number, department: string, section: string) {
    return this.http.get<TrainingEntryModel[]>(this.baseUrl_ + "IDM/GetTraningListByType?typeId=" + typeId + "&department=" + department + "&section=" + section, { headers: this.token.headerToken() });
  }

  // bytt for training entry list load except section
  GetTrainingListByDeptType(typeId: number, department: string) {
    return this.http.get<TrainingEntryModel[]>(this.baseUrl_ + "IDM/GetTraningListByType?typeId=" + typeId + "&department=" + department , { headers: this.token.headerToken() });
  }

  JdCreate(jdInfo: JobDescriptionModel) {
    var body = {
      ...jdInfo
    }
    console.log("Jd Info Save");
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "IDM/CreateIdmJobDesSave", body, {
      headers: this.token.headerToken(),
    });
  }
  JdListSave(jdInfo: JobDescriptionModel, jdInfoList: any[]) {
    debugger
    var body = {
      ...jdInfo,
      JdInfoList:jdInfoList
    }
    return this.http.post<any>(this.baseUrl_ + "IDM/JdListSave", body, {
      headers: this.token.headerToken(),
    });
  }

  JdDelete(id: number) {
    //console.log("Jd Delete Id");
    //console.log(id);
    return this.http.get<any>(this.baseUrl_ + "IDM/DeleteIdmJobDesById?id=" + id, {
      headers: this.token.headerToken(),
    });
  }

  JSCreate(jdInfo: JobDescriptionModel) {
    var body = {
      ...jdInfo
    }
    //console.log("Job Summary Info Save");
    //console.log(JSON.stringify(body));
    console.log("body",body);
    console.log("jdinfo",jdInfo);
    return this.http.post<any>(this.baseUrl_ + "IDM/CreateIdmJobSummarySave", body, {
      headers: this.token.headerToken(),
    });
  }

  GetJobDesByEmployeeId(employeeId: string) {
    return this.http.get<JobDescriptionModel[]>(this.baseUrl_ + "IDM/GetEmployeeWiseJobDes?employeeId=" + employeeId, { headers: this.token.headerToken() });
  }

  GetJobSummaryByEmployeeId(employeeId: string) {
    return this.http.get<JobDescriptionModel[]>(this.baseUrl_ + "IDM/GetEmployeeWiseJobSummary?employeeId=" + employeeId, { headers: this.token.headerToken() });
  }

  PersonalByMyId(employeeId: string) {
    return this.http.get<EmployeePersonalInfoModel>(this.baseUrl_ + "IDM/GetEmployeePersonalInfo?employeeId=" + employeeId,
      {
        headers: this.token.headerToken(),
      });
  }

  CreateVision(FormData: IdmVissionModel) {
    //console.log(JSON.stringify(FormData));
    return this.http.post<any>(this.baseUrl_ + "IDM/CreateIdmVision", FormData, {
      headers: this.token.headerToken(),
    });
  }

  // GetVisions() {
  //   return this.http.get(this.baseUrl_ + "IDM/GetIdmVissionByEmpolyeeId", {
  //     headers: this.token.headerToken(),
  //   });
  // }

  GetMissionByVisionId(visionId: number) {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetMissionListByVisionId?visionId=" + visionId, { headers: this.token.headerToken() });
  }

  GetMissionByVisionIdForVisisonList(visionId: number) {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetMissionByVisionIdForVisisonList?visionId=" + visionId, { headers: this.token.headerToken() });
  }

  GetMissionAchivementByVisionMissionId(missionId:number,visionId: number) {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetMissionAchivementByVisionMissionId?missionId=" + missionId + "&visionId=" + visionId,{ headers: this.token.headerToken() });
  }

  GetVisions() {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetVisionListByEmployeeId", { headers: this.token.headerToken() });
  }

  GetAllVisionStatus() {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetMissionDashBoardByEmployeeId", { headers: this.token.headerToken() });
  }

  GetAllMissionApprove() {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetAllMissionApproveList", { headers: this.token.headerToken() });
  }
  GetEmployeeMissionApprove(employeeId: string) {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetEmployeeMissionApprove?employeeId=" + employeeId, { headers: this.token.headerToken() });
  }

  GetOnlyMissionApproveList() {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetOnlyMissionApprovedList", { headers: this.token.headerToken() });
  }
  GetOnlyEmployeeMissionApprovedList(employeeId: string) {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetOnlyEmployeeMissionApprovedList?employeeId=" + employeeId, { headers: this.token.headerToken() });
  }
  
  GetMissionRejectedList() {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetMissionRejectedList", { headers: this.token.headerToken() });
  }
  GetOnlyEmployeeMissionRejectedList(employeeId: string) {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetOnlyEmployeeMissionRejectedList?employeeId=" + employeeId, { headers: this.token.headerToken() });
  }

  ApproveMission(idmMissionApprove: IdmMissionModel) {
    var body = {
      ...idmMissionApprove
    }
    //console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "IDM/ApproveMission", body, {
      headers: this.token.headerToken(),
    });
  }

  RejectMission(idmMissionApprove: IdmMissionModel) {
    var body = {
      ...idmMissionApprove
    }
    //console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "IDM/RejectMission", body, {
      headers: this.token.headerToken(),
    });
  }

  TrainingRequisitionCreate(Mastercreate: any, trainingList: TrainingEntryModel[]) {
    // console.log(JSON.stringify(bookingitemcreate));     
    var body = {
      ...Mastercreate,
      TrainingList: trainingList
    }
    console.log("going good",body)
    //console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "IDM/CreateTrainingRequisitionFullSave", body, {
      headers: this.token.headerToken(),
    });
  }
  TrainingRequisitionAddTrainee(Mastercreate: any, trainingList: TrainingEntryModel[]) {
    // console.log(JSON.stringify(bookingitemcreate));     
    debugger
    var body = {
      ...Mastercreate,
      TrainingList: trainingList
    }
    console.log("going good",body)
    //console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "IDM/CreateTrainingRequisitionAddTrainee", body, {
      headers: this.token.headerToken(),
    });
  }

  GetAllRequitionForSchedule() {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetTrainingRequisionListForSchedule", { headers: this.token.headerToken() });
  }

  GetAllRequitionForScheduleByEmpolyeeId() {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetTrainingRequisionListForScheduleByEmployee", { headers: this.token.headerToken()});
  }

  GetAllRequitionListByEmpolyeeId(employeeId:string) {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetTrainingRequisionListForScheduleByEmployeeId?employeeId="+employeeId, { headers: this.token.headerToken()});
  }


  

  TrainingScheduleCreate(Mastercreate: any, scheduleList: TrainingEntryModel[]) {
    // console.log(JSON.stringify(bookingitemcreate));     
    var body = {
      ...Mastercreate,
      ScheduleList: scheduleList
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "IDM/CreateTrainingScheduleSave", body, {
      headers: this.token.headerToken(),
    });
  }

  GetAllTrainingApprove() {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetAllTrainingApproveList", { headers: this.token.headerToken() });
  }
  GetEmployeeTrainingApprove(employeeId: string) {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetEmployeeTrainingApprove?employeeId=" + employeeId,{ headers: this.token.headerToken() });
  }
  //for specific employee get(approved traing list) 
  GetEmployeeApprovedTraining(employeeId: string) {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetEmployeeApprovedTraining?employeeId=" + employeeId,{ headers: this.token.headerToken() });
  }
  //get all emloyee under  one leader and their approved traing 
  GetOnlyTrainingApproveList() {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetOnlyTrainingApprovedList", { headers: this.token.headerToken() });
  }

   //for specific employee get(rejected traing list) 
   GetEmployeeRejectedTraining(employeeId: string) {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetEmployeeRejectedTraining?employeeId=" + employeeId,{ headers: this.token.headerToken() });
  }

  GetTrainingRejectedList() {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetTrainingRejectedList", { headers: this.token.headerToken() });
  }

  ApproveTraining(idmTrainingRequisitionApprove: IdmTrainingModel) {
    var body = {
      ...idmTrainingRequisitionApprove
    }
    return this.http.post<any>(this.baseUrl_ + "IDM/ApproveTraining", body, {
      headers: this.token.headerToken(),
    });
  }

  GetAllScheduleMaster() {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetTrainingScheduledMasterData", { headers: this.token.headerToken()});
  }

  GetScheduleSubById(id:number) {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetTrainingScheduledSubDataById?id="+id, { headers: this.token.headerToken()});
  }

  RejectSchedule(model: any) {    
    var body = {
        ...model
      }
      console.log(JSON.stringify(body));
      return this.http.post<any>(this.baseUrl_ + "IDM/RejectSchedule", body, {
      headers: this.token.headerToken(),
    });
  }

  PostponedSchedule(model: any) {    
    var body = {
        ...model
      }
      console.log(JSON.stringify(body));
      return this.http.post<any>(this.baseUrl_ + "IDM/PostponedSchedule", body, {
      headers: this.token.headerToken(),
    });
  }


  RejectTraining(idmTrainingRequisitionApprove: IdmTrainingModel) {
    var body = {
      ...idmTrainingRequisitionApprove
    }
    return this.http.post<any>(this.baseUrl_ + "IDM/RejectTraining", body, {
      headers: this.token.headerToken(),
    });
  }

  CreatePleasureDisplesure(FormData: any) {
    console.log(JSON.stringify(FormData));
    return this.http.post<any>(this.baseUrl_ + "IDM/CreatePLeasureDispleasure", FormData, {
      headers: this.token.headerToken(),
    });
  }

  GetAllPleasure() {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetPleasureListData", { headers: this.token.headerToken()});
  }

  GetAllDisPleasure() {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetDisPleasureListData", { headers: this.token.headerToken()});
  }

  GetAllPleasureByEmployeeId(employeeId: string) {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetPleasureListDataByEmpId?employeeId=" + employeeId, { headers: this.token.headerToken() });
  }

  GetAllDisPleasureByEmployeeId(employeeId: string) {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetDisPleasureListDataByEmpId?employeeId=" + employeeId, { headers: this.token.headerToken() });
  }

  CreatePleasureCommentSave(FormData: any) {
    console.log(JSON.stringify(FormData));
    return this.http.post<any>(this.baseUrl_ + "IDM/SavePLeasureComment", FormData, {
      headers: this.token.headerToken(),
    });
  }

  CreateDisPleasureCommentSave(FormData: any) {
    console.log(JSON.stringify(FormData));
    return this.http.post<any>(this.baseUrl_ + "IDM/SaveDisPLeasureComment", FormData, {
      headers: this.token.headerToken(),
    });
  }

  CreateIndividualMeeting(FormData: any) {
    console.log(JSON.stringify(FormData));
    return this.http.post<any>(this.baseUrl_ + "IDM/CreateIndividualMeeting", FormData, {
      headers: this.token.headerToken(),
    });
  }

  GetAllIndividualMeeting(yearId: number) {
    return this.http.get<any>(this.baseUrl_ + "IDM/GetIndividualMeetingListByYear?yearId=" + yearId, { headers: this.token.headerToken() });
  }
  GetAllIndividualMeetingForIDMDashBoard(yearId: number) {
    return this.http.get<any>(this.baseUrl_ + "IDM/GetAllIndividualMeetingForIDMDashBoard?yearId=" + yearId, { headers: this.token.headerToken() });
  }
  
  TrainingFeedbackSave( masterFeedbackData:any,trainingList: any[]) {     
    var body = {
      ...masterFeedbackData,
      trainingList:trainingList
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "IDM/SaveIdmTrainingFeedBack", body, {
      headers: this.token.headerToken(),
    });
  }

  GetSkillPlan(company:number, department:string, section:string, employee:string) {
    return this.http.get<SkillPlanMaster>(this.baseUrl_ + "IDM/GetSkillPlan?company="+company+"&department="+department+"&section="+section+"&employee="+employee,{ headers: this.token.headerToken() });
  }

  GetSkillPlanCourses() {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetAllCourseSkillPlan",{ headers: this.token.headerToken() });
  }
 //bytt 
 // List of employee completed the training  or submit requisition 
  GetTraineeListByTrainingId(trainingId:number) {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetTraineeListByTrainingId?trainingId="+trainingId,{ headers: this.token.headerToken() });
  }
//bytt
// KpiEntryCreate(KpiInfo: any, AllNewKpiList: any[]) {
  KpiEntryCreate(KpiInfo: any) {
    var body = {
      ...KpiInfo,
      // AllNewKpiList: AllNewKpiList
    }
    
    return this.http.post<any>(this.baseUrl_ + "IDM/KpiEntryCreate", body, {
      headers: this.token.headerToken(),
    });
  }

  //bytt
// KpiEntry delete
  DeleteKpi(id: number,mstId:number): Observable<any> {
    return this.http.delete(this.baseUrl_ + "IDM/DeleteKpi?id=" + id+"&mstId="+mstId, {
      headers: this.token.headerToken(),
    });
  }

  GetKpiListByDept(department: string) {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetKpiListByDeptSec?department=" + department, { headers: this.token.headerToken() });
  }

   //Get GetAllKpiList Department Data
   GetAllKpiList() {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetAllKpiList", { headers: this.token.headerToken()});
  }
  
  SaveKpiAssign(FormData: any) {
    debugger
    var body = {
      ...FormData
    }
    console.log('save Kpi achivement',body);
    return this.http.post<any>(this.baseUrl_ + "IDM/SaveKpiAssign", body, {
      headers: this.token.headerToken(),
    });
  }

  GetAssignedKpitByEmpolyeeId() {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetAssignedKpitByEmpolyeeId", { headers: this.token.headerToken()});
  }
  GetAssignedKpitBySupervisorId() {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetAssignedKpitBySupervisorId", { headers: this.token.headerToken()});
  }
  
  GetDetailKpitByMstId(Id:number) {
    return this.http.get<any[]>(this.baseUrl_ + "IDM/GetDetailKpitByMstId?Id=" + Id ,{ headers: this.token.headerToken() });
  }

  SaveKpiDetails(FormData: any,kpidetails:any) {
    debugger
    var body = {
      ...FormData,
      kpidetails
    }
    console.log('kpi form save service',body);
    return this.http.post<any>(this.baseUrl_ + "IDM/SaveKpiDetails", body, {
      headers: this.token.headerToken(),
    });
  }


  //bytt
  IdmEmployeeListBySupervisor(supervisorId:string) {

    return this.http.get<any>(this.baseUrl_ + "IDM/IdmEmployeeListBySupervisor?supervisorId=" +supervisorId, 
    {
      headers: this.token.headerToken(),
    });
  }
  
  //bytt
  LoadIdmloadSupervisorById(employeeId:string) {

    return this.http.get<any>(this.baseUrl_ + "IDM/LoadIdmloadSupervisorById?employeeId=" +employeeId, 
    {
      headers: this.token.headerToken(),
    });
  }
  

  IdmPermission(IdmSupervisor: any, idmEmployeeList: any[]) {
    debugger
    // console.log(JSON.stringify(bookingitemcreate));     
    var body = {
        ...IdmSupervisor,
        IdmNewEmployeeList: idmEmployeeList
      }
      console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "IDM/CreateIdmPermissionGroup", body, {
      headers: this.token.headerToken(),
    });
  }

   //bytt
// RemoveIdmEmployee from idm permission group
RemoveIdmEmployee(id: string): Observable<any> {
  console.log(id)
  return this.http.delete(this.baseUrl_ + "IDM/RemoveIdmEmployee?id=" + id, {
    headers: this.token.headerToken(),
  });
}

  SaveMissionAchivement(FormData: any) {
    debugger
    var body = {
      ...FormData
    }
    console.log('save mission achivement',body);
    return this.http.post<any>(this.baseUrl_ + "IDM/SaveMissionAchivement", body, {
      headers: this.token.headerToken(),
    });
  }

  // IdmPermission(gatepassSupervisor: GatePassSupervisorModel, gatepassEmployeeList: any[]) {
  //   // console.log(JSON.stringify(bookingitemcreate));     
  //   var body = {
  //       ...gatepassSupervisor,
  //       GatePassNewEmployeeList: gatepassEmployeeList
  //     }
  //     console.log(JSON.stringify(body));
  //   return this.http.post<any>(this.baseUrl_ + "GatePass/CreateGatePassPermissionGroup", body, {
  //     headers: this.token.headerToken(),
  //   });
  // }
  //delete unitType  data


  DeleteTraining(id: number): Observable<any> {
    return this.http.delete(this.baseUrl_ + "IDM/DeleteTraining?id=" + id, {
      headers: this.token.headerToken(),
    });
  }


  // deleteTraining(id): Observable<any> {
  //   return this.http.post<any[]>(this.baseUrl_ + "DeleteTraining",
  //   {
  //     "id": id
  //   },{headers: this.token.headerToken()});
  // }

}
