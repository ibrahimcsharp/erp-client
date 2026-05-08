import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { Brand } from "../models/brand";

@Injectable({
  providedIn: "root",
})
export class TrackingDasboardService { 
  headers = {};
  baseUrl = environment.apiUrl + "merchandising/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");

  auth_token = null;
  constructor(private http: HttpClient, private token: TokenService) {}
  //GetDataForMerchDasboard

  GetDataForTrackingDasboard(buyerId: number, yearId : number, seasonId : number): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "TrackingDashboard/GetDataForTrackinghDasboard?buyerId=" + buyerId+"&&yearId="+yearId+"&seasonId="+seasonId, {
      headers: this.token.headerToken(),
    });
  }

  // GetDataForTrackingDasboardDetails(bomId: number): Observable<any> {
  //   return this.http.get<any[]>(this.baseUrl_ + "MerchandisingDashboard/GetDataForMerchDasboardDetails?bomId=" + bomId, {
  //     headers: this.token.headerToken(),
  //   });
  // }

}
