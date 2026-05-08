import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { Buyer } from "../models/buyer";
import {DeleteBuyerInfo} from "../models/DeleteBuyerInfo"

@Injectable ({
    providedIn : "root",
})
export class BuyerService{
    formData: Buyer;
    buyerList: Buyer[];
    headers = {};
    baseUrl= environment.apiUrl + "merchandising/";
    baseUrl_ = this.baseUrl.replace(/[?&]$/, "");

    auth_token = null;
    constructor (private http: HttpClient, private token: TokenService){}

    CreateBuyer(buyer: Buyer) {
        return this.http.post<any>(this.baseUrl_ + "Helper/InsertBuyer", buyer,{
            headers: this.token.headerToken(),
        });
    }

    GetBuyerList(): Observable<any> {
        return this.http.get<Buyer[]>(this.baseUrl_ + "Helper/GetBuyerList", {
          headers: this.token.headerToken(),
        });
      }

      //Merchandising Delete Buyer
DeleteBuyerList(buyerSelectedForDelete: Buyer[]) {
    var deleteBuyer= new DeleteBuyerInfo();
    deleteBuyer.deleteBuyerInfo = [];
    deleteBuyer.deleteBuyerInfo = buyerSelectedForDelete;
    return this.http.post(
      this.baseUrl_ + "DeleteBuyer",
      deleteBuyer,
      { headers: this.token.headerToken() }
    );
  }

    //save data
    submitContractualBuyerInfo(contractualBuyerInfo: any): Observable<any> {
      return this.http.post<any>(this.baseUrl + "Helper/SubmitContractualBuyerInfo", contractualBuyerInfo, {
        headers: this.token.headerToken(),
      });
    }

}