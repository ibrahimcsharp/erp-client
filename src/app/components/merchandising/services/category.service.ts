import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { Category } from "../models/category";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  formData: Category;
  categoryList: Category[];
  processCategoryList: Category[];
  headers = {};
  baseUrl = environment.apiUrl + "merchandising/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");

  auth_token = null;
  constructor(private http: HttpClient, private token: TokenService) {}

//   saveCategory(): Observable<any> {
//     return this.http.post<any>(this.baseUrl_ + "Category", this.formData, {
//       headers: this.token.headerToken(),
//     });
//   }

  getCategoryData(categoryType: string): Observable<any> {
    if(categoryType!= null)
    {
      return this.http.get<Category[]>(this.baseUrl_ + "Category/GetCategoryByType?categoryType="+ categoryType, {
        headers: this.token.headerToken(),
      });
    }
    else{
      return this.http.get<Category[]>(this.baseUrl_ + "Category/GetCategoryList", {
        headers: this.token.headerToken(),
      });
    }
  }

  async getCategoryDataToPromise(categoryType: string) {
      return this.http.get<Category[]>(this.baseUrl_ + "Category/GetCategoryByType?categoryType="+ categoryType, {
        headers: this.token.headerToken(),
      }).toPromise();
  }

  getFabricCategoryData(): Observable<any> {
      return this.http.get<Category[]>(this.baseUrl_ + "Category/GetFabricCategoryList", {
        headers: this.token.headerToken(),
      });
  }

  getCategoryForSetup(): Observable<any> {
    return this.http.get<Category[]>(this.baseUrl_ + "Category/GetCategoryForSetup", {
      headers: this.token.headerToken(),
    });
}

CreateCategory(category: any) {
  return this.http.post<any>(
    this.baseUrl_ + "Category/CreateCategory",
    category,
    {
      headers: this.token.headerToken(),
    }
  );
}
//   updateCategory(): Observable<any> {
//     return this.http.put(
//       this.baseUrl_ + "Category/" + this.formData.categoryId,
//       this.formData,
//       { headers: this.token.headerToken() }
//     );
//   }

}
