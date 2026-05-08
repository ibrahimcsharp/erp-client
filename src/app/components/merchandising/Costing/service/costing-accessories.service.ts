import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { CostAccessories } from "../model/costing-accessories.model";

@Injectable({
  providedIn: "root",
})
export class CostingAccessoriesService {
  NewCostAccessoriesList: CostAccessories[] = [];
  formData: CostAccessories;
  costingAccessoriesList: CostAccessories[];
  headers = {};
  baseUrl = environment.apiUrl + "merchandising/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
  totalVal = 0;
  rowGroupMetadata: any;
  GroupWiseCostInfo:any;
  auth_token = null;
  totalCostInfo:any=[];
  newButtonshow = true;
  constructor(private http: HttpClient, private token: TokenService) { }

  CreateCostAccessories(costAccessories: CostAccessories) {
    return this.http.post<any>(this.baseUrl_ + "Costing/InsertCostAccessories", costAccessories, {
      headers: this.token.headerToken(),
    });
  }

  GetCostAccessoriesList(): Observable<any> {
    return this.http.get<CostAccessories[]>(this.baseUrl_ + "Costing/GetCostAccessoriesList", {
      headers: this.token.headerToken(),
    });
  }

  TotalAccessoriesValue() {
    this.totalVal = parseFloat(this.NewCostAccessoriesList.reduce((sum, list) => sum + list.value, 0).toFixed(4));
    return this.totalVal;
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    this.GroupWiseCostInfo={};
    if (this.NewCostAccessoriesList) {
      let m=0;
      for (let i = 0; i < this.NewCostAccessoriesList.length; i++) {
        let rowData = this.NewCostAccessoriesList[i];
        let categoryName = rowData.categoryName;
        if (i == 0) {
          this.rowGroupMetadata[categoryName] = { index: 0, size: 1, value: this.NewCostAccessoriesList[i].value, lastIndex: 0 };
          this.totalCostInfo[m]= {categoryName:categoryName, value: this.NewCostAccessoriesList[i].value};
        }
        else {
          let previousRowData = this.NewCostAccessoriesList[i - 1];
          let previousRowGroup = previousRowData.categoryName;
          if (categoryName === previousRowGroup) {
            this.rowGroupMetadata[categoryName].size++;
            this.rowGroupMetadata[categoryName].lastIndex = this.rowGroupMetadata[categoryName].size;
            this.rowGroupMetadata[categoryName].value = this.rowGroupMetadata[categoryName].value + this.NewCostAccessoriesList[i].value;
            this.totalCostInfo[m]={categoryName:categoryName, value: this.rowGroupMetadata[categoryName].value + this.NewCostAccessoriesList[i].value};
          }
          else {
            this.rowGroupMetadata[categoryName] = { index: i, size: 1, value: this.NewCostAccessoriesList[i].value, lastIndex: this.rowGroupMetadata[previousRowGroup].lastIndex+1 };
            this.totalCostInfo[++m]={categoryName:categoryName, value: this.NewCostAccessoriesList[i].value};
          }

        }
      }     
    }
  }

  // DeleteAccessoriesById(id: number): Observable<any> {
  //   return this.http.delete<CostAccessories[]>(this.baseUrl_ + "Costing/DeleteCostAccessories?id="+ id, {
  //     headers: this.token.headerToken(),
  //   });
  // }

  DeleteAccessoriesById(id: number) {
    var obj = {
      id: id,
    }
    return this.http.post<any>(
      this.baseUrl_ + "Costing/DeleteCostAccessories",
      obj,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  //Get All Bom Fabric List
  GetBOMAccessoriesList(
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
    return this.http.get<CostAccessories[]>(
      this.baseUrl_ +
        "Costing/GetAllBomAccessoriesList?buyerId=" +
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

  isDisable: boolean;
    CostingStatusForAccessories(status: string) // Method call from Cost Master
    { 
        if(status.toUpperCase() == "COMPLETE" || status.toUpperCase() == "CHECKED" || status.toUpperCase() == "APPROVED")
          {
            this.isDisable = true;
          }
    }

    RowColorChange(accessoriesObj: any[], masterObj: any) // Method call from Cost Master
    { 
      var list = accessoriesObj.filter(x=>x.accessoriesComment != null && masterObj.status == 'DRAFT' && masterObj.costingStatus =='OPEN' &&(masterObj.checkedBy !=null || masterObj.approvedBy !=null));
      for(var item of list)
      {
          item.isChange = 'Y';
          this.NewCostAccessoriesList.filter(x=>x.id == item.id).push(item);
      }
    }
}