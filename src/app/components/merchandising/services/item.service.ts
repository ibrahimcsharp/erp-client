import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { DeleteBuyerInfo } from "../models/DeleteBuyerInfo"
import { Item } from "../models/item";
import { StCodeModel } from "../models/stCode.model";

@Injectable({
  providedIn: "root",
})
export class ItemService {
  formData: Item;
  itemList: Item[];
  processItemList: Item[];
  stCodeList: Item[];
  hsCategoriesList: any[];
  hsSnowtexInfoList: any[];
  stCodeDropDownList: StCodeModel[];
  stCodeDropDown: StCodeModel;
  headers = {};
  baseUrl = environment.apiUrl + "merchandising/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");

  auth_token = null;
  constructor(private http: HttpClient, private token: TokenService) { }

  CreateItem(item: Item) {
    return this.http.post<any>(this.baseUrl_ + "Item/CreateItem", item, {
      headers: this.token.headerToken(),
    });
  }


  GetItemList(processType): Observable<any> {
    if (processType != null) {
      return this.http.get<Item[]>(this.baseUrl_ + "Item/GetItemByCategory?categoryType=" + processType, {
        headers: this.token.headerToken(),
      });
    }
    else {
      return this.http.get<Item[]>(this.baseUrl_ + "Item/GetItemList", {
        headers: this.token.headerToken(),
      });
    }
  }
  GetItemListForStyle(processType): Observable<any> {
    if (processType != null) {
      return this.http.get<Item[]>(this.baseUrl_ + "Item/GetItemByCategoryForStyle?categoryType=" + processType, {
        headers: this.token.headerToken(),
      });
    }
    else {
      return this.http.get<Item[]>(this.baseUrl_ + "Item/GetItemList", {
        headers: this.token.headerToken(),
      });
    }
  }

  GetItemListToPromise(processType): Observable<any> {
      return this.http.get<Item>(this.baseUrl_ + "Item/GetItemByCategory?categoryType=" + processType, {
        headers: this.token.headerToken(),
      });
  }

  GetItemListForZipperEntry(): Observable<any> {
      return this.http.get<Item[]>(this.baseUrl_ + "Item/GetItemList", {
        headers: this.token.headerToken(),
      });
  }

  GetComponentList(): Observable<any> {
      return this.http.get<Item[]>(this.baseUrl_ + "Item/GetComponentList", {
        headers: this.token.headerToken(),
      });
  }

  GetItemListById(id: number): Observable<any> {
    return this.http.get<Item>(this.baseUrl_ + "Item/GetItemById?Id=" + id, {
      headers: this.token.headerToken(),
    });
  }

  async GetItemListByIdToPromics(id: number){
    return this.http.get<Item>(this.baseUrl_ + "Item/GetItemById?Id=" + id, {
      headers: this.token.headerToken(),
    }).toPromise();
  }
  processType = "P"
  GetItemListForProcess(): Observable<any> {
    return this.http.get<Item>(this.baseUrl_ + "Item/GetItemByCategory?categoryType=" + this.processType, {
      headers: this.token.headerToken(),
    });
  }
  accessoriesType = "A"
  GetItemListForAccessories(): Observable<any> {
    return this.http.get<Item>(this.baseUrl_ + "Item/GetItemByCategory?categoryType=" + this.accessoriesType, {
      headers: this.token.headerToken(),
    });
  }
  processOthersType = "PO"
  GetItemListForPrecessOthers(): Observable<any> {
    return this.http.get<Item>(this.baseUrl_ + "Item/GetItemByCategory?categoryType=" + this.processOthersType, {
      headers: this.token.headerToken(),
    });
  }
  GetItemByCategoryId(id: number): Observable<any> {
    return this.http.get<Item>(this.baseUrl_ + "Item/GetItemByCategoryId?categoryId=" + id, {
      headers: this.token.headerToken(),
    });
  }
  GetItemByCategoryGroup(categoryGroup: string): Observable<any> {
    return this.http.get<Item>(this.baseUrl_ + "Item/GetItemByCategoryGroup?categoryGroup=" + categoryGroup, {
      headers: this.token.headerToken(),
    });
  }

  GereateSTCode(item: Item) {
    return this.http.post<any>(this.baseUrl_ + "Item/GenerateSTCode", item, {
      headers: this.token.headerToken(),
    });
  }

  GetSTCodeList(): Observable<any> {
    return this.http.get<Item>(this.baseUrl_ + "Item/GetSTCodeList", {
      headers: this.token.headerToken(),
    });
  }

  CreateHSCategories(hsCategories: any) {
    console.log(JSON.stringify(hsCategories));
    return this.http.post<any>(this.baseUrl_ + "Item/CreateHSCategories", hsCategories, {
      headers: this.token.headerToken(),
    });
  }



  GetHSCategoriesList(): Observable<any> {
    return this.http.get<any>(this.baseUrl_ + "Item/GetHSCategoriesList", {
      headers: this.token.headerToken(),
    });
  }

  GetHSCategoriesById(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl_ + "Item/GetHSCategoriesById?Id=" + id, {
      headers: this.token.headerToken(),
    });
  }

  CreateHSSnowtex(hsSnowtex: any) {
    return this.http.post<any>(this.baseUrl_ + "Item/CreateHSSnotexInfo", hsSnowtex, {
      headers: this.token.headerToken(),
    });
  }
  CreateColorSetup(colorSetup: any) {
    return this.http.post<any>(this.baseUrl_ + "Item/CreateColorSetup", colorSetup, {
      headers: this.token.headerToken(),
    });
  }

  GetHSSnowtexList(): Observable<any> {
    return this.http.get<any>(this.baseUrl_ + "Item/GetHSSnowtexList", {
      headers: this.token.headerToken(),
    });
  }
  
  GetHSSnowtexById(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl_ + "Item/GetHSSnowtexById?Id=" + id, {
      headers: this.token.headerToken(),
    });
  }
  GetColorSetupData(): Observable<any> {
    return this.http.get<any>(this.baseUrl_ + "Item/GetColorSetupData", {
      headers: this.token.headerToken(),
    });
  }

  GetSTCodeListDropDown(): Observable<any> {
    return this.http.get<StCodeModel>(this.baseUrl_ + "Item/GetSTCodeList", {
      headers: this.token.headerToken(),
    });
  }

  GetSTCodeListDropDownByBuyerAndItemId(buyerId: number,itemId:number): Observable<any> {
    return this.http.get<StCodeModel>(this.baseUrl_ + "Item/GetSTCodeListByBuyerAndItem?buyerId=" + buyerId+"&itemId=" +itemId , {
      headers: this.token.headerToken(),
    });
  }

  GetDescriptionListDropDown(): Observable<any> {
    return this.http.get<StCodeModel>(this.baseUrl_ + "Item/GetSTCodeDescriptionList", {
      headers: this.token.headerToken(),
    });
  }

  

}