import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { Brand } from "../models/brand";

@Injectable({
  providedIn: "root",
})
export class BrandService {
  formData: Brand;
  brandList: Brand[];
  headers = {};
  baseUrl = environment.apiUrl + "merchandising/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");

  auth_token = null;
  constructor(private http: HttpClient, private token: TokenService) {}

  saveBrand(): Observable<any> {
    return this.http.post<any>(this.baseUrl_ + "Brand", this.formData, {
      headers: this.token.headerToken(),
    });
  }

  getBrandData(buyerId: number): Observable<any> {
    return this.http.get<Brand[]>(this.baseUrl_ + "Brand?buyerId=" + buyerId, {
      headers: this.token.headerToken(),
    });
  }

  updateBrand(): Observable<any> {
    return this.http.put(
      this.baseUrl_ + "Brand/" + this.formData.brandId,
      this.formData,
      { headers: this.token.headerToken() }
    );
  }

  deleteBrand(id: number): Observable<any> {
    return this.http.delete(this.baseUrl_ + "Brand/" + id, {
      headers: this.token.headerToken(),
    });
  }
}
