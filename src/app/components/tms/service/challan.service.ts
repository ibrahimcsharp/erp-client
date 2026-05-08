import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/shared/service/token.service';

@Injectable({
  providedIn: 'root'
})
export class ChallanService {
  private route = environment.apiUrl + 'ChallanManagement';
  baseUrl = environment.apiUrl + "ChallanManagement";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
  constructor(
    private http: HttpClient,
    private token: TokenService
  ) { }

  getAll(): Observable<any> {
    return this.http.get(this.route)
  }
  //Export Challan
  getChallans(): Observable<any> {
    return this.http.get(`${this.route}/GetChallans`);
  }
  //Import Challan
  getImportChallans(): Observable<any> {
    return this.http.get(`${this.route}/GetImportChallans`);
  }
  //get import challan by id
  getImportChallanInfo(id: number) {
    return this.http.get<any[]>(this.baseUrl_ + "/GetImportChallanById?ChallanId=" + id, {
      headers: this.token.headerToken(),
    });
  }
  getBillChallans(): Observable<any> {
    return this.http.get(`${this.route}/GetBillChallans`);
  }

  get(id: any) {
    return this.http.get(`${this.route}/${id}`);
  }
  //get export challan by id
  getChallanInfo(id: number) {
    return this.http.get<any[]>(this.baseUrl_ + "/GetChallanById?ChallanId=" + id, {
      headers: this.token.headerToken(),
    });
  }

  // GetIEOthersData(buyerId: number, styleId: number): Observable<any> {
  //   return this.http.get<any[]>(this.baseUrl_ + "Ie/GetIeOthersList?buyerId=" + buyerId + "&styleId=" + styleId, {
  //     headers: this.token.headerToken(),
  //   });
  // }
  post(data: any) {
    return this.http.post(this.route, data)
  }

  update(data: any): Observable<any> {
    return this.http.put(this.route, data);
  }

  createImport(data: any): Observable<any> {

    return this.http.post(`${this.route}/CreateImportChallan`, data);
  }


  delete(id: any): Observable<any> {
    return this.http.delete(`${this.route}/${id}`);
  }
  MigrateAPIData(): Observable<any> {
    return this.http.post(`${this.route}/MigrateAPIData`, {});
  }
  MigrateAPIImportData(): Observable<any> {
    return this.http.post(`${this.route}/MigrateAPIImportData`, {});
  }


}
