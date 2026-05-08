import { HttpClient } from "@angular/common/http";
import { Injectable, ViewChild } from "@angular/core";
import { json } from "express";
import { Observable } from "rxjs";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
//import { CostingCreateComponent } from "../costing-component/costing-create/costing-create.component";
import {CostFabric} from "../model/costing-fabric-model"
import { CostingMasterModel } from "../model/costing-model";

@Injectable ({
    providedIn : "root",
})
export class CostingFabricService{
  //@ViewChild("costingMaster") child: CostingCreateComponent;
    NewCostFabricList: CostFabric[] = [];
    formData: CostFabric;
    costingFabricList: CostFabric[];
    totalVal = 0;
    headers = {};
    baseUrl= environment.apiUrl + "merchandising/";
    baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
    costingMaster: CostingMasterModel;
    auth_token = null;
    newButtonshow = true;
    isDisable: boolean;
    constructor (private http: HttpClient, private token: TokenService){}

    CreateCostFabric(costingFabric: CostFabric) {
        //console.log(JSON.stringify(costingFabric));
        return this.http.post<any>(this.baseUrl_ + "Costing/InsertCostingFabric", costingFabric,{
            headers: this.token.headerToken(),
        });
    }

    GetCostFabricList(): Observable<any> {
        return this.http.get<CostFabric[]>(this.baseUrl_ + "Costing/GetCostingFabricList", {
          headers: this.token.headerToken(),
        });
      }
      // DeleteFabricById(id: number): Observable<any> {
      //   return this.http.delete<CostFabric[]>(this.baseUrl_ + "Costing/DeleteCostFabrics?id="+ id, {
      //     headers: this.token.headerToken(),
      //   });
      // }

    async DeleteFabricById(id: number) {
        var obj = {
          id: id,
        }
        return this.http.post<any>(
          this.baseUrl_ + "Costing/DeleteCostFabrics",obj,
          { headers: this.token.headerToken()}).toPromise();
      }

    //  DeleteFabricById(id: number) {
    //   var obj = {
    //     id: id,
    //   }
    //   return this.http.post<any>(
    //     this.baseUrl_ + "Costing/DeleteCostFabrics",obj,
    //     { headers: this.token.headerToken()});
    // }

      TotalFabricValue() {
        //this.totalVal = 0;
        // for (var item of this.NewCostFabricList) {
        //   this.totalVal = parseFloat((this.totalVal + item.value).toFixed(4));
        // }
        this.totalVal = parseFloat(this.NewCostFabricList.reduce((sum, list) => sum + list.value, 0).toFixed(4));
        return this.totalVal;
      }

    //Get All Bom Fabric List
     GetBOMFabricList(
      seasonId: number,
      yearId: number,
      buyerId: number,
      styleId: number
    ): Observable<any> {
      if (buyerId == null) {
        buyerId = 0;
      }
      if (seasonId == null) {
        seasonId = 0;
      }
      if (yearId == null) {
        yearId = 0;
      }
      if (styleId == null) {
        styleId = 0;
      }
      return this.http.get<CostFabric[]>(
        this.baseUrl_ +
          "Costing/GetAllBomFabricList?buyerId=" +
          buyerId +
          "&seasonId=" +
          seasonId +
          "&yearId=" +
          yearId +
          "&styleId=" +
          styleId ,
        { headers: this.token.headerToken() }
      );
    }
  
    CostingStatusForFabric(status: string) // Method call from Cost Master
    { 
        if(status.toUpperCase() == "COMPLETE" || status.toUpperCase() == "CHECKED" || status.toUpperCase() == "APPROVED")
          {
            this.isDisable = true;
          }
    }

    RowColorChange(fabricsObj: any[], masterObj: any) // Method call from Cost Master
    { 
      var list = fabricsObj.filter(x=>x.fabricComment != null && masterObj.status == 'DRAFT' && masterObj.costingStatus =='OPEN' &&(masterObj.checkedBy !=null || masterObj.approvedBy !=null));
      for(var item of list)
      {
          item.isChange = 'Y';
          this.NewCostFabricList.filter(x=>x.id == item.id).push(item);
      }
    }

    LoadAllFabricList(buyerId: number, seasonId: number, yearId: number): Observable<any> {
      return this.http.get<any[]>(this.baseUrl_ + "Item/GetAllStyleFabricList?buyerId="+ buyerId
      + "&seasonId="+ seasonId + "&yearId=" + yearId, {
        headers: this.token.headerToken(),
      });
    }

}