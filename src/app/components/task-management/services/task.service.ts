import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { TokenService } from "src/app/shared/service/token.service";
import { DatePipe } from "@angular/common";
import { from } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class TaskService {
    baseUrl_2 = environment.apiUrl + "accounting/";
    baseUrl_2_ = this.baseUrl_2.replace(/[?&]$/, "");
    baseUrl = environment.apiUrl + "task/";
    baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
    constructor(
        private http: HttpClient,
        private token: TokenService,
        private datepipe: DatePipe
    ) { }


    GetDepartmentByCompany() {
        return this.http.get(this.baseUrl_ + "TaskSetting/GetDepartmentsByCompany", {
            headers: this.token.headerToken(),
        });
    }
    GetSectionsByDepartment(departmentName: any) {
        return this.http.get(this.baseUrl_ + "TaskSetting/GetSectionsByDepartment?departmentName=" + departmentName, {
            headers: this.token.headerToken(),
        });
    }

    SaveTaskSubmission(obj: any) {
        return this.http.post(this.baseUrl_ + "TaskManage/SaveTaskSubmission", obj, {
            headers: this.token.headerToken(),
        });
    }
    AddToDOList(obj: any) {
        return this.http.post(this.baseUrl_ + "TaskManage/AddtoDOList", obj, {
            headers: this.token.headerToken(),
        });
    }
    CreateTaskComment(obj: any) {
        return this.http.post(this.baseUrl_ + "TaskManage/CreateTaskComment", obj, {
            headers: this.token.headerToken(),
        });
    }
    RemoveToDOList(obj: any) {
        return this.http.post(this.baseUrl_ + "TaskManage/RemoveToDOList", obj, {
            headers: this.token.headerToken(),
        });
    }
    ReturnTaskToTeamLeader(obj: any) {
        return this.http.post(this.baseUrl_ + "TaskManage/ReturnTaskToTeamLeader", obj, {
            headers: this.token.headerToken(),
        });
    }
    UpdateTaskStatus(obj: any) {
        return this.http.post(this.baseUrl_ + "TaskManage/UpdateTaskStatus", obj, {
            headers: this.token.headerToken(),
        });
    }
    CreateTaskAssign(obj: any) {
        return this.http.post(this.baseUrl_ + "TaskManage/CreateTaskAssign", obj, {
            headers: this.token.headerToken(),
        });
    }
    CreateTaskAssignAnotherDept(obj: any) {
        return this.http.post(this.baseUrl_ + "TaskManage/CreateTaskAssignAnotherDept", obj, {
            headers: this.token.headerToken(),
        });
    }
    GetTaskSubmissionList() {
        return this.http.get(this.baseUrl_ + "TaskManage/GetTaskSubmissionList", {
            headers: this.token.headerToken(),
        });
    }
    GetPendingTaskList() {
        return this.http.get(this.baseUrl_ + "TaskManage/GetPendingTaskInfo", {
            headers: this.token.headerToken(),
        });
    }

    async GetPendingTaskListPromise() {
        return this.http.get<any[]>(this.baseUrl_ + "TaskManage/GetPendingTaskInfo", {
            headers: this.token.headerToken(),
        }).toPromise();
    }

    GetSpForwardedTaskInfo() {
        return this.http.get(this.baseUrl_ + "TaskManage/GetSpForwardedTaskInfo", {
            headers: this.token.headerToken(),
        });
    }
    GetDoneTaskInfo() {
        return this.http.get(this.baseUrl_ + "TaskManage/GetDoneTaskInfo", {
            headers: this.token.headerToken(),
        });
    }
    GetToDoTaskList() {
        return this.http.get(this.baseUrl_ + "TaskManage/GetToDoTaskInfo", {
            headers: this.token.headerToken(),
        });
    }
    GetTaskCommentByTaskId(taskId: number) {
        return this.http.get(this.baseUrl_ + "TaskManage/GetTaskCommentByTaskId?taskId=" + taskId, {
            headers: this.token.headerToken(),
        });
    }
    GetAllTaskList() {
        return this.http.get(this.baseUrl_ + "TaskManage/GetAllTaskInfo", {
            headers: this.token.headerToken(),
        });
    }

    //departments

    GetDepartmentPendingTaskInfo() {
        return this.http.get(this.baseUrl_ + "TaskManage/GetDepartmentPendingTaskInfo", {
            headers: this.token.headerToken(),
        });
    }
    GetDepartmentForwardingTaskInfo() {
        return this.http.get(this.baseUrl_ + "TaskManage/GetDepartmentForwardingTaskInfo", {
            headers: this.token.headerToken(),
        });
    }
    GetDepartmentOnGoingTaskInfo() {
        return this.http.get(this.baseUrl_ + "TaskManage/GetDepartmentOnGoingTaskInfo", {
            headers: this.token.headerToken(),
        });
    }
    GetDepartmentDoneTaskInfo() {
        return this.http.get(this.baseUrl_ + "TaskManage/GetDepartmentDoneTaskInfo", {
            headers: this.token.headerToken(),
        });
    }

    GetEmployeeInfo() {
        return this.http.get(this.baseUrl_2_ + "RefNote/GetEmployeesInfo", {
            headers: this.token.headerToken(),
        });
    }
    GetAllTaskSupervisors() {
        return this.http.get(this.baseUrl_ + "TaskManage/GetAllTaskSupervisors", {
            headers: this.token.headerToken(),
        });
    }
    GetSpCurrentStatusById(employeeId: string) {
        return this.http.get(this.baseUrl_ + "TaskManage/GetSpCurrentStatusById?employeeId=" + employeeId, {
            headers: this.token.headerToken(),
        });
    }

    GetTaskReport(fromDate=null,toDate=null,department:string="",section:string="",employeeId: string="") {
        return this.http.get(this.baseUrl_ + "TaskManage/GetTaskReport?fromDate=" + fromDate+"&toDate="+toDate+"&department="+department+"&section+"+section+"&employeeId="+employeeId, {
            headers: this.token.headerToken(),
        });
    }

    
    //Get All Task Team Setup Employee List
    GetAllTaskTeamSetupEmployeeList()
    {
        return this.http.get<any[]>(this.baseUrl_ + "TaskTeamSetup/GetAllTaskTeamSetupEmployeeList", { headers: this.token.headerToken()});
    }


    //Save Task Team Setup

    SaveTaskTeamSetup(taskTeamSupervisor: any, gatepassEmployeeList: any[]){
        var body = {
            ...taskTeamSupervisor,
            teamMemberList: gatepassEmployeeList
          }
          console.log(JSON.stringify(body));
        return this.http.post<any>(this.baseUrl_ + "TaskTeamSetup/SaveTaskTeamSetup", body, {
          headers: this.token.headerToken(),
        });
    }


    //Done Task Verify By User

    DoneTaskVerifyByUser(obj: any) {
        return this.http.post(this.baseUrl_ + "TaskManage/DoneTaskVerifyByUser", obj, {
            headers: this.token.headerToken(),
        });
    }

}