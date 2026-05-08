import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/shared/service/token.service';
import { environment } from 'src/environments/environment';
import { CostAccessories } from '../model/costing-accessories.model';

@Injectable({
  providedIn: 'root'
})
export class CostingLabelService {
  NewCostLabelList: CostAccessories[] = [];
  formData: CostAccessories;
  costingLabelList: CostAccessories[];
  headers = {};
  baseUrl = environment.apiUrl + "merchandising/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
  totalVal = 0;
  rowGroupMetadata: any;
  GroupWiseCostInfo:any;
  auth_token = null;
  totalCostInfo:any=[];
  newButtonshow = true;

  constructor(
    private http: HttpClient, 
    private token: TokenService
  ) { }


  GetCostLabelList(): Observable<any> {
    return this.http.get<CostAccessories[]>(this.baseUrl_ + "Costing/GetCostAccessoriesList", {
      headers: this.token.headerToken(),
    });
  }

  TotalLabelValue() {
    // this.totalVal = 0;
    // for (var index of this.NewCostLabelList) {
    //   this.totalVal = parseFloat((this.totalVal + index.value).toFixed(4));
    // }
    this.totalVal = parseFloat(this.NewCostLabelList.reduce((sum, list) => sum + list.value, 0).toFixed(4));
    return this.totalVal;
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    this.GroupWiseCostInfo={};
    if (this.NewCostLabelList) {
      let m=0;
      for (let i = 0; i < this.NewCostLabelList.length; i++) {
        let rowData = this.NewCostLabelList[i];
        let categoryName = rowData.categoryName;
        if (i == 0) {
          this.rowGroupMetadata[categoryName] = { index: 0, size: 1, value: this.NewCostLabelList[i].value, lastIndex: 0 };
          this.totalCostInfo[m]= {categoryName:categoryName, value: this.NewCostLabelList[i].value};
        }
        else {
          let previousRowData = this.NewCostLabelList[i - 1];
          let previousRowGroup = previousRowData.categoryName;
          if (categoryName === previousRowGroup) {
            this.rowGroupMetadata[categoryName].size++;
            this.rowGroupMetadata[categoryName].lastIndex = this.rowGroupMetadata[categoryName].size;
            this.rowGroupMetadata[categoryName].value = this.rowGroupMetadata[categoryName].value + this.NewCostLabelList[i].value;
            this.totalCostInfo[m]={categoryName:categoryName, value: this.rowGroupMetadata[categoryName].value + this.NewCostLabelList[i].value};
          }
          else {
            this.rowGroupMetadata[categoryName] = { index: i, size: 1, value: this.NewCostLabelList[i].value, lastIndex: this.rowGroupMetadata[previousRowGroup].lastIndex+1 };
            this.totalCostInfo[++m]={categoryName:categoryName, value: this.NewCostLabelList[i].value};
          }
        }
      }     
    }
  }

  // DeleteLabelById(id: number): Observable<any> {
  //   return this.http.delete<CostAccessories[]>(this.baseUrl_ + "Costing/DeleteCostAccessories?id="+ id, {
  //     headers: this.token.headerToken(),
  //   });
  // }
  DeleteLabelById(id: number) {
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


  isDisable: boolean;
    CostingStatusForAccessories(status: string) // Method call from Cost Master
    { 
        if(status.toUpperCase() == "COMPLETE" || status.toUpperCase() == "CHECKED" || status.toUpperCase() == "APPROVED")
          {
            this.isDisable = true;
          }
    }
}