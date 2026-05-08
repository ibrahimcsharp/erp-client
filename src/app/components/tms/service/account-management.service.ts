import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { AccountCreateModel } from "../model/account.model";



@Injectable({
    providedIn: 'root'
})
export class AccountManagementService {
    baseUrl = environment.apiUrl;
    baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
    datepipe: any;
    constructor(private http: HttpClient, private token: TokenService) { }



    CreateGLAccount(account: AccountCreateModel) {
        var body = {
            ...account,
        }
        console.log(JSON.stringify(body));
        return this.http.post<any>(this.baseUrl_ + "AccountManagement/CreateAccount", body, {

            headers: this.token.headerToken(),
        });
    }

    GetAllAccountList() {
        return this.http.get<any>(this.baseUrl_ + "AccountManagement/GetAllAccountList", {
            headers: this.token.headerToken(),
        });
    }


}