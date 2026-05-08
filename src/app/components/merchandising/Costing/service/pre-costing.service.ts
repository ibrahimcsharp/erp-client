import { HttpClient, HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/shared/service/token.service';
import { environment } from 'src/environments/environment';
import { CostingMasterModel } from '../model/costing-model';
import { PreCosting } from '../model/pre-costing.model';

@Injectable({
  providedIn: 'root'
})
export class PreCostingService {
  baseUrl = environment.apiUrl + "merchandising/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
  preCostingList: CostingMasterModel[];

  constructor(
    private http: HttpClient, 
    private token: TokenService
    ) { }

    //Get Pre Costing data
    GetPreCostingList(styleId: number,quotationNumber: string,revisedNo: number): Observable<any> {
      return this.http.get<any>(
        this.baseUrl_ +"Costing/PreCostingProcess?styleId="+styleId +"&quotationNumber=" +encodeURIComponent(quotationNumber)  +"&revisedNo=" + revisedNo,
        { headers: this.token.headerToken() }
      );
    }
    GetPreCostingGStarSinglePartList(buyerId: number, seasonId: number, yearId: number, styleId: number, sfc: string): Observable<any> {
      return this.http.get<any>(
        this.baseUrl_ +"Costing/PreCostingGStarSinglePartProcess?buyerId=" + buyerId + "&seasonId=" + seasonId  + "&yearId=" + yearId + "&styleId=" + styleId + "&sfc=" + sfc,
        { headers: this.token.headerToken() }
      );
    }
    
    GetApproveCostingStyleList(costingStatus: string,status: string,buyerId: number,seasonId: number,yearId: number): Observable<any> {
      return this.http.get<any[]>(
        this.baseUrl_ +"Costing/GetApproveCostingStyleList?costingStatus=" +costingStatus + "&status=" +status +"&buyerId=" +buyerId +
          "&seasonId=" +seasonId +"&yearId=" + yearId,
        {
          headers: this.token.headerToken(),
        }
      );
    }
}
