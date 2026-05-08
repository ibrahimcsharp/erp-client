import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/shared/service/token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FabricStatusService {
  baseUrl = environment.apiUrl + "merchandising/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
  constructor(
    private http: HttpClient, 
    private token: TokenService
  ) { }

  GetFabricStatusList(buyerId: number, seasonId: number, yearId: number, styleId: number): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "Costing/GetFabricStatusListByBSY?buyerId=" +
    buyerId +
    "&seasonId=" +
    seasonId +
    "&yearId=" +
    yearId +
    "&styleId=" +
    styleId, {
      headers: this.token.headerToken(),
    });
  }

  PostCostingSave(postCostingList: any[]): Observable<any> {
    var obj={
      postCostingList: postCostingList
    }
   console.log(JSON.stringify(obj));
    return this.http.post<any>(this.baseUrl_ + "PostCosting/PostCostingSave", obj, {
      headers: this.token.headerToken(),
    });
  }
}
