import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/shared/service/token.service';
import { environment } from 'src/environments/environment';
import { CostAccessories } from '../model/costing-accessories.model';

@Injectable({
  providedIn: 'root'
})
export class CostingProcessService {
  NewCostProcessList: CostAccessories[] = [];
  formData: CostAccessories;
  costingProcessList: CostAccessories[];
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

  GetCostProcessList(): Observable<any> {
    return this.http.get<CostAccessories[]>(this.baseUrl_ + "Costing/GetCostAccessoriesList", {
      headers: this.token.headerToken(),
    });
  }

  TotalProcessValue() {
    // this.totalVal = 0;
    // for (var index of this.NewCostProcessList) {
    //   this.totalVal = parseFloat((this.totalVal + index.value).toFixed(4));
    // }
    this.totalVal = parseFloat(this.NewCostProcessList.reduce((sum, list) => sum + list.value, 0).toFixed(4));
    return this.totalVal;
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    this.GroupWiseCostInfo={};
    if (this.NewCostProcessList) {
      let m=0;
      for (let i = 0; i < this.NewCostProcessList.length; i++) {
        let rowData = this.NewCostProcessList[i];
        let categoryName = rowData.categoryName;
        if (i == 0) {
          this.rowGroupMetadata[categoryName] = { index: 0, size: 1, value: this.NewCostProcessList[i].value, lastIndex: 0 };
          this.totalCostInfo[m]= {categoryName:categoryName, value: this.NewCostProcessList[i].value};
        }
        else {
          let previousRowData = this.NewCostProcessList[i - 1];
          let previousRowGroup = previousRowData.categoryName;
          if (categoryName === previousRowGroup) {
            this.rowGroupMetadata[categoryName].size++;
            this.rowGroupMetadata[categoryName].lastIndex = this.rowGroupMetadata[categoryName].size;
            this.rowGroupMetadata[categoryName].value = this.rowGroupMetadata[categoryName].value + this.NewCostProcessList[i].value;
            this.totalCostInfo[m]={categoryName:categoryName, value: this.rowGroupMetadata[categoryName].value + this.NewCostProcessList[i].value};
          }
          else {
            this.rowGroupMetadata[categoryName] = { index: i, size: 1, value: this.NewCostProcessList[i].value, lastIndex: this.rowGroupMetadata[previousRowGroup].lastIndex+1 };
            this.totalCostInfo[++m]={categoryName:categoryName, value: this.NewCostProcessList[i].value};
          }
        }
      }     
    }
  }

  // DeleteProcessById(id: number): Observable<any> {
  //   return this.http.delete<CostAccessories[]>(this.baseUrl_ + "Costing/DeleteCostAccessories?id="+ id, {
  //     headers: this.token.headerToken(),
  //   });
  // }

 async DeleteProcessById(id: number) {
    var obj = {
      id: id,
    }
    return this.http.post<any>(
      this.baseUrl_ + "Costing/DeleteCostAccessories",
      obj,
      {
        headers: this.token.headerToken(),
      }
    ).toPromise();
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
