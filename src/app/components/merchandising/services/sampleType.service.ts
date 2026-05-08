import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { SampleType } from "../models/sampleType";

@Injectable({
  providedIn: "root",
})
export class SampleTypeService {
  formData: SampleType;
  sampleTypeList: SampleType[];
  baseUrl = environment.apiUrl + "merchandising/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
  constructor(private http: HttpClient, private token: TokenService) {}
  //save data
  saveSampleType(sampleType: SampleType): Observable<any> {
    return this.http.post<any>(this.baseUrl + "SampleType", sampleType, {
      headers: this.token.headerToken(),
    });
  }

  //update sample Type
  updateSampleType(): Observable<any> {
    return this.http.put(
      this.baseUrl_ + "SampleType/" + this.formData.sampleTypeId,
      this.formData,
      { headers: this.token.headerToken() }
    );
  }

  //getSampleTypeData
  getSampleTypeData(buyerId: number): Observable<any> {
    return this.http.get<SampleType[]>(
      this.baseUrl_ + "SampleType?buyerId=" + buyerId,
      {
        headers: this.token.headerToken(),
      }
    );
  }


    //getAllSampleTypeData
    getAllSampleTypeData(): Observable<any> {
      debugger
      return this.http.get<SampleType[]>(
        this.baseUrl_ + "SampleTypeNew/GetAllSampleTypes" ,
        {
          headers: this.token.headerToken(),
        }
      );
    }

  //delete sample Type data
  deleteSampleType(id: number): Observable<any> {
    return this.http.delete(this.baseUrl_ + "SampleType/" + id, {
      headers: this.token.headerToken(),
    });
  }
}
