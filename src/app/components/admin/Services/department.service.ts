import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/shared/service/token.service';
import { environment } from 'src/environments/environment';
import { Department } from '../Model/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  baseUrl = environment.apiUrl;
  //reporturl = environment.reportUrl;
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
  //reporturl_ = this.reporturl.replace(/[?&]$/, "");
  

  departmentList: Department[];

  constructor(private http:HttpClient,private token:TokenService) { }

  //SAVE OR UPDATE SUPPLIER
  SaveDepartment(department:Department):Observable<any>{
  return this.http.post<any>(this.baseUrl_+'DepartmentRole/CreateDepartmentRole',department, { headers: this.token.headerToken() });
}

//Role LIST
GetDepartmentList():Observable<any>{     
  return this.http.get<Department[]>(this.baseUrl_+'DepartmentRole/GetAllDepartmentList', { headers: this.token.headerToken() });
}

 //SAVE OR UPDATE SUPPLIER
//  MakeReportDepartment():Observable<any>{
//    var objectlist ={
//      departmentlist: this.departmentList
//    };

//    //return this.http.get<any>(this.reporturl_+'Report/Get',{ headers: this.token.headerToken() });

//    //return this.http.get<any>(this.reporturl_+'Report/GetReport2');
//    //return this.http.get<any>(this.reporturl_+'Report/GetReport?jsonstr='+JSON.stringify(objectlist));
// }

}
