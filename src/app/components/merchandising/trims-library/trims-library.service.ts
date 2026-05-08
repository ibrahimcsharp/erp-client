import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/shared/service/token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrimsLibraryService {
  trimsLibraryList: any[];
  headers = {};
  baseUrl = environment.apiUrl + "merchandising/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");

  auth_token = null;
  constructor(private http: HttpClient, private token: TokenService) { }

  CreateItemCategory(itemCategory: any) {
  
    return this.http.post<any>(this.baseUrl_ + "ItemCategory/CreateItemCategory", itemCategory, {
      headers: this.token.headerToken(),
    });
  }

  GetItemCategoryList() {
    return this.http.get<any[]>(this.baseUrl_ + "ItemCategory/GetItemCategoryAllList", {
      headers: this.token.headerToken(),
    });
  }

  GetItemCategoryById(itemCategoryId: number) {
    return this.http.get<any[]>(this.baseUrl_ + "ItemCategory/GetItemCategoryById?id=" + itemCategoryId, {
      headers: this.token.headerToken(),
    });
  }
  GetItemNameById(itemCategoryId: any) {
  
    return this.http.get<any>(this.baseUrl_ + "ItemCategory/GetItemCategoryById?id=" + itemCategoryId, {
      headers: this.token.headerToken(),
    });
  }


  CreateTrimsLibrary(trimsLibary: any) {
    console.log('trims data: ',JSON.stringify(trimsLibary));
    return this.http.post<any>(this.baseUrl_ + "TrimsLibrary/CreateTrimsLibrary", trimsLibary, {
      headers: this.token.headerToken(),
    });
  }
  CreateTrimsLibraryUpdate(trimsLibary: any) {
    console.log('trims data: ',JSON.stringify(trimsLibary));
    return this.http.post<any>(this.baseUrl_ + "TrimsLibrary/CreateTrimsLibraryUpdate", trimsLibary, {
      headers: this.token.headerToken(),
    });
  }

  GetTrimsLibraryList() {    
    return this.http.get<any[]>(this.baseUrl_ + "TrimsLibrary/GetTrimsLibraryList", {
      headers: this.token.headerToken(),
    });
  }

  GetTrimsLibraryById(trimsLibraryId: number) {
    return this.http.get<any>(this.baseUrl_ + "TrimsLibrary/GetTrimsLibraryById?id=" + trimsLibraryId, {
      headers: this.token.headerToken(),
    });
  }

  GetTrimsLibraryByItemCategory(itemCategoryId: number) {
    //debugger
    return this.http.get<any[]>(this.baseUrl_ + "TrimsLibrary/GetTrimsLibraryByItemCategory?itemCategoryId=" + itemCategoryId, {
      headers: this.token.headerToken(),
    });
  }

  DeleteTrimsLibraryById(trimsLibraryId: number): Observable<any> {
    return this.http.delete(this.baseUrl_ + "TrimsLibrary/DeleteTrimsLibraryById?trimsLibraryId=" + trimsLibraryId, {
      headers: this.token.headerToken(),
    });
  }

  getItemCategory(itemCategoryId: number) {
    return this.http.get<any[]>(this.baseUrl_ + "TrimsLibrary/GetTrimsLibraryByItemCategory?itemCategoryId=" + itemCategoryId, {
      headers: this.token.headerToken(),
    });
  }
   

}
