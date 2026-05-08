import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from 'src/app/shared/service/token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BomSecondService {
  headers = {};
  baseUrl = environment.apiUrl + "merchandising/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
  constructor(
    private http: HttpClient, 
    private token: TokenService
  ) { }


  async GetBomVersionNo(bomId: number) {
    return this.http.get<any[]>(
      this.baseUrl_ + "BillOfMaterialSecond/ShowBomVersionNo?bomId=" + bomId,
      {
        headers: this.token.headerToken(),
      }).toPromise();
  }

  async GetBomPoSizeDetail(bomId: number, versionNo: number, previousVersionNo: number) {
    return this.http.get<any>(
      this.baseUrl_ + "BillOfMaterialSecond/ShowBomPoSizeDetail?bomId=" + bomId + "&versionNo=" + versionNo + "&previousVersionNo=" + previousVersionNo,
      {
        headers: this.token.headerToken(),
      }).toPromise();
  }
}
