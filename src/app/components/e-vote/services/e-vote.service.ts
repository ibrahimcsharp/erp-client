import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";

@Injectable()
export class EVoteService {
  baseUrl = environment.apiUrl;
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");

  constructor(private http: HttpClient, private token: TokenService) {}
  PostEVoteData(obj: FormData ) {
    return this.http.post<any>(this.baseUrl_ + "EVote/CreateIssues", obj, {
      headers: this.token.headerToken(),
    });
  }

  CreateVote(issueId: number, issueOptionId: number) {
    var body = {
      issueId: issueId,
      issueOptionId: issueOptionId,
    };

    return this.http.post<any>(this.baseUrl_ + "EVote/CreateVote", body, {
      headers: this.token.headerToken(),
    });
  }
  GetEVoteData() {
    return this.http.get<any>(this.baseUrl_ + "EVote/GetIssueList", {
      headers: this.token.headerToken(),
    });
  }
  GetEmployeeInfoPromise() {
    return this.http.get<any>(this.baseUrl_ + "Whom/GetEmployeeInfo", {
      headers: this.token.headerToken(),
    }).toPromise();
  }
  async GatePassListBySupervisorToPromise(supervisorId:string) {
    return this.http
      .get<any[]>(this.baseUrl_ + "GatePass/GetAllGatePassUserListBySupervisor?supervisorId=" +supervisorId,  {
        headers: this.token.headerToken(),
      }).toPromise();
  }

  GatePassListBySupervisor(supervisorId:string) {
    return this.http.get<any>(this.baseUrl_ + "GatePass/GetAllGatePassUserListBySupervisor?supervisorId=" +supervisorId, 
    {
      headers: this.token.headerToken(),
    });
  }

  GetGatePassEmployeeSectionListByDept(department:string) {
    return this.http.get<any[]>(this.baseUrl_ + "GatePass/GetAllSectionListByDepartmentName?department=" +encodeURIComponent(department), { headers: this.token.headerToken()});
  }
  GatePassReqNoListLoad() {
    return this.http.get<any[]>(this.baseUrl_ + "GatePass/GetLeftOverReqNoList", { headers: this.token.headerToken()});
  }
  GetGatePassEmployeeDepartmentList() {
    return this.http.get<any[]>(this.baseUrl_ + "GatePass/GetAllGatePassEmployeeDepartmentList", { headers: this.token.headerToken()});
  }
  GetGatePassEmployeeList() {
    return this.http.get<any[]>(this.baseUrl_ + "GatePass/GetAllGatePassEmployeeList", { headers: this.token.headerToken()});
  }

  GetEVoteDataByUser() {
    return this.http.get<any>(this.baseUrl_ + "EVote/GetIssueListByUser", {
      headers: this.token.headerToken(),
    });
  }
  GetNotifications() {
    return this.http.get<any>(this.baseUrl_ + "EVote/GetNotificationList", {
      headers: this.token.headerToken(),
    });
  }
  GetMessage() {
    return this.http.get<any>(this.baseUrl_ + "EVote/GetMessage", {
      headers: this.token.headerToken(),
    });
  }
  GetEVoteById(id: number) {
    return this.http.get<any>(this.baseUrl_ + "EVote/GetIssueById?id=" + id, {
      headers: this.token.headerToken(),
    });
  }

  GetVoteResultByIssueId(id: number) {
    return this.http.get<any>(
      this.baseUrl_ + "EVote/GetVoteCountByIssueId?id=" + id,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetVoteResultById(id: number) {
    return this.http.get<any>(
      this.baseUrl_ + "EVote/GetVoteResultById?Id=" + id,
      {
        headers: this.token.headerToken(),
      }
    );
  }


  GetVoteCategory() {
    return this.http.get<any>(
      this.baseUrl_ + "EVote/GetVoteCategory",
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetVotedEmployeeList() {
    return this.http.get<any>(
      this.baseUrl_ + "EVote/GetVotedEmployeeList",
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetVoteByList(employeeId : string) {
    return this.http.get<any>(
      this.baseUrl_ + "EVote/GetVoteByList?employeeId="+ employeeId,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetMyVoteCount(employeeId : string) {
    return this.http.get<any>(
      this.baseUrl_ + "EVote/GetMyVoteCount?employeeId="+ employeeId,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetEmployeeWiseVoteList(employeeId : string) {
    return this.http.get<any>(
      this.baseUrl_ + "EVote/GetEmployeeWiseVoteList?employeeId="+ employeeId,
      {
        headers: this.token.headerToken(),
      }
    );
  }


  CreateEmployeeSurveyVote(seleclist: any) {
    debugger
    var body = {
      id: 0,
      createEmployeeSurveyVoteDto: seleclist,
    };

    return this.http.post<any>(this.baseUrl_ + "EVote/CreateEmployeeSurveyVote", body, {
      headers: this.token.headerToken(),
    });
  }

  //Added by Tamim Start
  GetCompanyListForEVote() {
    return this.http.get<any>(
      this.baseUrl_ + "EVote/GetCompanyListForEVote",
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetEVoteEmployeeDepartmentList(CompanyName: string) {
    return this.http.get<any[]>(this.baseUrl_ + "EVote/GetEVoteEmployeeDepartmentList?CompanyName="+ CompanyName, { headers: this.token.headerToken()});
  }

    //Added by Tamim End


    GetEVoteEmployeeSectionList(department: string,company:string) {
      return this.http.get<any[]>(this.baseUrl_ + "EVote/GetEVoteEmployeeSectionList?department="+ department +"&company=" + company, { headers: this.token.headerToken()});
    }

    GetEmployeeSurveyVoterList() {
      return this.http.get<any>(
        this.baseUrl_ + "EVote/GetEmployeeSurveyVoterList",
        {
          headers: this.token.headerToken(),
        }
      );
    }
}
