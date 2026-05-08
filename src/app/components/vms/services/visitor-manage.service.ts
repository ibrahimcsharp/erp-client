import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/shared/service/token.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { vmslistModel } from '../../idm/model/vms.list.model';
import { DatePipe } from "@angular/common";
 
import pdfMake from "pdfmake/build/pdfmake";
//import { SalesContractService } from "../../services/sales-contract.service";
//import { vmslistmodel } from '../model/vms.list.model';


@Injectable({
  providedIn: 'root'
})
export class VisitorManageService {

  tableContent: any = [];
  IncreasedDescreasedValue: number = 0;
  IncreaseQty: number = 0;
  RevisedContractNo: any = [];
  RevisedDate: any = [];
  ContractQty: number = 0;
  ContractValue: number = 0;
  ShipmentDate: any;
  ExpiryDate: any = null;
  InDes: any[] = [];
  InInc: any[] = [];
  sDate: any[] = [];
  missionApprove: any[];

  baseUrl = environment.apiUrl;
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
  //datepipe: any;

  constructor(
    public datepipe: DatePipe,
   // private salesContractService: SalesContractService,
    private http: HttpClient, private token: TokenService
  ) {}
  //constructor(private http: HttpClient, private token: TokenService) { }

  CreateVMS(vmsData: any) {
    //debugger
    console.log(JSON.stringify(vmsData));
    return this.http.post<any>(this.baseUrl_ + "VMS/CreateVmsEntrySave", vmsData, {
      headers: this.token.headerToken(),
    });
  }

  GetVMSEmployeeList() {

    return this.http.get<any[]>(this.baseUrl_ + "GatePass/GetAllGatePassEmployeeList", { headers: this.token.headerToken() });
  }

  GetVMSEmployeeListNew() {
    return this.http.get<any[]>(this.baseUrl_ + "GatePass/GetAllGatePassEmployeeList", { headers: this.token.headerToken() });
  }

  /* Get all employee info*/
  GetALLEmployee() {
   
    return this.http.get<any[]>(this.baseUrl_ + "VMS/GetAllEmployeeList", { headers: this.token.headerToken() });
  }

  /**external  load*/
  GetExternalVisitorInfoList() {
   
    return this.http.get<any[]>(this.baseUrl_ + "VMS/GetExternalVisitorInfo", { headers: this.token.headerToken() });
  }

/**Get company */
  GetCompanyList() {
    debugger
   return this.http.get<any[]>(this.baseUrl_ + "VMS/GetAllEmployeeCompanyList", { headers: this.token.headerToken() });
 }
  GetVmsDataById(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl_ + "VMS/GetVmsDataById?Id=" + id,
      {
        headers: this.token.headerToken()
      }
    );
  }
  GetVmsDataList(): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "VMS/GetVmsData",
      {
        headers: this.token.headerToken()
      }
    );
  }
  /*visitor-info-list*/
  GetOnlyPendingList() {
    return this.http.get<any[]>(this.baseUrl_ + "VMS/GetVmsPendingData", { headers: this.token.headerToken() });
  }

  /*visitor-info-list*/
  GetOnlyApproveList() {
    return this.http.get<any[]>(this.baseUrl_ + "VMS/GetVmsOutApproveData", { headers: this.token.headerToken() });
  }
  /*for single report] */
  GetOnlyApproveListForReport() {
    return this.http.get<any[]>(this.baseUrl_ + "VMS/GetVmsOutApproveDataReport", { headers: this.token.headerToken() });
  }


  ApproveOutUser(vmsApprove: vmslistModel) {
    var body = {
      ...vmsApprove
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "VMS/VmsOutApprove", body, {
      headers: this.token.headerToken(),
    });
  }

  GetOnlyPendingListbyId() {
    return this.http.get<any[]>(this.baseUrl_ + "VMS/GetVmsPendingDatabyId", { headers: this.token.headerToken() });
  }

  GetOnlyApproveListbyId() {
    return this.http.get<any[]>(this.baseUrl_ + "VMS/GetVmsOutApproveDatabyId", { headers: this.token.headerToken() });
  }
  GetDailyDataList() {
   // debugger
    return this.http.get<any[]>(this.baseUrl_ + "VMS/GetVisitorDailyCountData", { headers: this.token.headerToken() });

  }
  GetweeklyDataList() {
    return this.http.get<any[]>(this.baseUrl_ + "VMS/GetVisitorWeeklyCountData", { headers: this.token.headerToken() });

  }
  GetMonthlyDataList() {
    return this.http.get<any[]>(this.baseUrl_ + "VMS/GetVisitorMonthlyCountData", { headers: this.token.headerToken() });

  }
  GetMonthwiseData() {
    return this.http.get<any[]>(this.baseUrl_ + "VMS/GetVisitorMonthwiseTotalCount", { headers: this.token.headerToken() });

  }

  GetFrequentVisitorList() {
 
    return this.http.get<any[]>(this.baseUrl_ + "VMS/GetFrequentVisitorInfo", { headers: this.token.headerToken() });
  }
  GetVMSUserContactList() {
    return this.http.get<any[]>(this.baseUrl_ + "VMS/GetVmsUserContactList", { headers: this.token.headerToken() });
  }

  GetVmsOutApproveDataForReport(fromDate: string, toDate: string) {
 
    return this.http.get<any[]>(this.baseUrl_ + "VMS/GetVmsOutApproveDataForReport?fromDate=" + fromDate + "&toDate=" + toDate,
      { headers: this.token.headerToken() });
  }

  GetVmsUserContactbyEmployeeId(employeeId: string) {
   
    return this.http.get<any[]>(this.baseUrl_ + "VMS/GetVmsUserContactListbyEmployeeId?fromDate=" + employeeId ,
      { headers: this.token.headerToken() });
  }

  GetOnlyApproveListForAllReport() {
   
    return this.http.get<any[]>(this.baseUrl_ + "VMS/GetVmsOutApproveDataForAll", { headers: this.token.headerToken() });
  }
  // GetALLCompany() {
  //   debugger
  //   return this.http.get<any[]>(this.baseUrl_ + "VMS/GetAllCompany", { headers: this.token.headerToken() });
  // }

  GetALLCompany(): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "VMS/GetAllCompany",
      {
        headers: this.token.headerToken()
      }
    );
  }

  GetUserLocalIP(){
  
    return this.http.get<any>(this.baseUrl_ + "VMS/GetUserIP", { headers: this.token.headerToken() });

  }

}





