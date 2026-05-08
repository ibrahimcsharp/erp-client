import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { FinishGoodsItem } from "../models/FinishGoodsItem";

@Injectable({
  providedIn: "root",
})
export class FinishGoodsItemService {
  formData: FinishGoodsItem;
  finishGoodsItemList: FinishGoodsItem[];
  headers = {};
  baseUrl = environment.apiUrl + "merchandising/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
  auth_token = null;

  constructor(private http: HttpClient, private token: TokenService) {}

  //save finish goods items
  saveFinishGoodsItem(): Observable<any> {
    return this.http.post<any>(this.baseUrl_ + "FinishedGoods", this.formData, {
      headers: this.token.headerToken(),
    });
  }

  //Update
  // updateFinishGoodsItem(){
  //   return this.http.post(this.baseUrl+'FinishedGoods')
  // }
  //delete
  deleteFinishGoodsItem(id: number) {
    return this.http.delete(this.baseUrl_ + "FinishedGoods/" + id);
  }

  // get finish goods item list

  getFinishGoodsItem(buyerId: number): Observable<any> {
    return this.http.get<FinishGoodsItem[]>(
      this.baseUrl_ + "FinishedGoods?buyerId=" + buyerId,
      { headers: this.token.headerToken() }
    );

    //.toPromise().then(res => this.finishGoodsItemList = res );
  }
}
