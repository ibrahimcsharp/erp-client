import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/shared/service/token.service';
import { environment } from 'src/environments/environment';
import { Gmtitem } from '../models/gmtitem.model';

@Injectable({
  providedIn: 'root'
})
export class GmtitemService {
  formData: Gmtitem;
  gmtItemList: Gmtitem[];
  headers = {};
  baseUrl= environment.apiUrl + "merchandising/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
  constructor(private http: HttpClient, private token: TokenService) { }

  GetGMTItemList(): Observable<any> {
    return this.http.get<Gmtitem[]>(this.baseUrl_ + "GmtItem/GetAllGmtItem", {
      headers: this.token.headerToken(),
    });
  }

  GetStyleWiseGMTItemList(styleId: number): Observable<any> {
    debugger   
    return this.http.get<Gmtitem[]>(this.baseUrl_ + "GmtItem/GetAllGmtItemByStyleId?styleId=" + styleId, {
      headers: this.token.headerToken(),
    });
  }
}
