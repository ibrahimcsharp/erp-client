import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { BuyerDepartment } from "../models/BuyerDepartment";
//import {DeleteBuyerInfo} from "../models/DeleteBuyerInfo"

@Injectable ({
    providedIn : "root",
})
export class BuyerDepartmentService{
    formData: BuyerDepartment;
    buyerDepartmentList: BuyerDepartment[];
    buyerWiseDepartmentList: BuyerDepartment[];
    headers = {};
    baseUrl= environment.apiUrl + "merchandising/";
    baseUrl_ = this.baseUrl.replace(/[?&]$/, "");

    auth_token = null;
    constructor (private http: HttpClient, private token: TokenService){}

    CreateBuyerDepartment(buyerDepartment: BuyerDepartment) {
        return this.http.post<any>(this.baseUrl_ + "Helper/InsertBuyerDepartment", buyerDepartment,{
            headers: this.token.headerToken(),
        });
    }

    GetBuyerDepartmentList(): Observable<any> {
        return this.http.get<BuyerDepartment[]>(this.baseUrl_ + "Helper/GetBuyerDepartmentList", {
          headers: this.token.headerToken(),
        });
      }
    GetBuyerDepartmentListByBuyerId(buyerId: number): Observable<any> {
        return this.http.get<BuyerDepartment[]>(this.baseUrl_ + "Helper/GetBuyerDepartmentListByBuyerId?buyerId="+buyerId, {
          headers: this.token.headerToken(),
        });
      }

      //Merchandising Delete Buyer
// DeleteBuyerList(buyerSelectedForDelete: BuyerDepartment[]) {
//     var deleteBuyer= new DeleteBuyerInfo();
//     deleteBuyer.deleteBuyerInfo = [];
//     deleteBuyer.deleteBuyerInfo = buyerSelectedForDelete;
//     console.log(deleteBuyer);
//     return this.http.post(
//       this.baseUrl_ + "DeleteBuyer",
//       deleteBuyer,
//       { headers: this.token.headerToken() }
//     );
//   }
}