import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/shared/service/token.service';
import { environment } from 'src/environments/environment';
import { Techpack } from '../models/techpack.model';

@Injectable({
  providedIn: 'root'
})
export class TechpackService {
  baseUrl = environment.apiUrl + "merchandising/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");

  TechPackList: Techpack[];
  //techPackModel: Techpack;

  constructor(
    private http: HttpClient,
     private token: TokenService) { }

     GetTechPackAllData(): Observable<any> {
      return this.http.get<Techpack[]>(this.baseUrl_ + "TechPack/GetTechPack2List", {
        headers: this.token.headerToken(),
      });
    }
    

    PostTechPackData(techPack: Techpack) {
      return this.http.post<any>(this.baseUrl_ + "TechPack/CreateTechPack2", techPack, {
        headers: this.token.headerToken(),
      });
    }
}
