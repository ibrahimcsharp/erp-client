import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { BuyerSizeSet } from "../models/BuyerSizeSet";
import { SizeSetup } from "../models/size-setup.model";


@Injectable({
  providedIn: "root",
})
export class BuyerSizeSetService {
  formData: BuyerSizeSet;
  buyerSizeSetList: BuyerSizeSet[];
  sizeSetList: any[] = [];
  sizeList: any[] = [];
  headers = {};
  baseUrl = environment.apiUrl + "merchandising/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
  auth_token = null;
  constructor(private http: HttpClient, private token: TokenService) { }

  CreateBuyerSizeSet(buyerSizeSet: BuyerSizeSet) {
    return this.http.post<any>(this.baseUrl_ + "Helper/InsertBuyerSizeSet", buyerSizeSet, {
      headers: this.token.headerToken(),
    });
  }

  GetBuyerSizeSetList(): Observable<any> {
    return this.http.get<BuyerSizeSet[]>(this.baseUrl_ + "Helper/GetBuyerSizeSetList", {
      headers: this.token.headerToken(),
    });
  }

  GetBuyerSizeSetById(id): Observable<any> {
    return this.http.get<BuyerSizeSet[]>(this.baseUrl_ + "Helper/GetBuyerSizeSetListById?id=" + id, {
      headers: this.token.headerToken(),
    });
  }

  GetBuyerSizeSetByBuyerId(buyerId): Observable<any> {
    return this.http.get<BuyerSizeSet[]>(this.baseUrl_ + "Helper/GetSizeRangeByBuyerId?buyerId=" + buyerId, {
      headers: this.token.headerToken(),
    });
  }

  GetSizeList11(): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "Size", {
      headers: this.token.headerToken(),
    });
  }

  /*zahid-23-2-2023*/
  GetSizeListBybuyerId(buyerId): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "SizeSetup/GetStyleSizeListByBuyerId?buyerId="+buyerId , {
      headers: this.token.headerToken(),
    });
  }

  GetSizeList(): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "SizeSetup/GetSizeList", {
      headers: this.token.headerToken(),
    });
  }

  GetSizeListBySizeRangeId(buyerId, sizeRangeId, styleId): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "SizeSetup/GetSizeListBySizeRangeId?buyerId=" + buyerId + "&sizeRangeId=" + sizeRangeId + "&styleId=" + styleId, {
      headers: this.token.headerToken(),
    });
  }
  GetSizeListBySizeRangeIdForEdit(id, buyerId, sizeRangeId, styleId): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "SizeSetup/GetSizeListBySizeRangeIdForZipper?id=" + id + "&buyerId" + buyerId + "&sizeRangeId=" + sizeRangeId + "&styleId=" + styleId, {
      headers: this.token.headerToken(),
    });
  }

  GetStyleSizeListBySizeRangeStyleId(sizeRangeId, styleId): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "SizeSetup/GetStyleSizeListBySizeRangeStyleId?sizeRangeId=" + sizeRangeId + "&styleId=" + styleId, {
      headers: this.token.headerToken(),
    });
  }

  GetStyleSizeListByStyleId(styleId): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "SizeSetup/GetStyleSizeListByStyleId?styleId=" + styleId, {
      headers: this.token.headerToken(),
    });
  }

  CreateSizeSetup(listData: SizeSetup[]) {
    var body = {
      sizeSetupCreateList: listData
    };
    return this.http.post<any>(this.baseUrl_ + "SizeSetup/CreateSizeSetup", body, {
      headers: this.token.headerToken(),
    });
  }

  DeleteSizeById(sizeId: number): Observable<any> {
    return this.http.delete(this.baseUrl_ + "SizeSetup/DeleteSizeById?id=" + sizeId, {
      headers: this.token.headerToken(),
    });
  }

  GetColorListFromPOByBuyerId(buyerId): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "SizeSetup/GetColorListFromPOByBuyerId?buyerId=" + buyerId, {
      headers: this.token.headerToken(),
    });
  }

  GetColorListFromMeasurementDetails(buyerId:number,season:number,year:number,style:number,item:number): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "SizeSetup/GetColorListForEdit?buyerId=" + buyerId+ "&season=" + season+ "&year=" + year+ "&style=" + style+ "&item=" + item, {
      headers: this.token.headerToken(),
    });
  }
}