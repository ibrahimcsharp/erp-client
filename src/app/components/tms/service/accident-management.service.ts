import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/shared/service/token.service';
import { environment } from 'src/environments/environment';
import { AccidentTypeCreateModel } from '../model/accident-type.model';
import { AccidentModel } from '../model/accident.model';



@Injectable({
    providedIn: 'root'
})
export class AccidentManagementService {
    baseUrl = environment.apiUrl;
    baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
    datepipe: any;
    constructor(private http: HttpClient, private token: TokenService) { }



    TypeCreate(accidentType: AccidentTypeCreateModel) {
        var body = {
            ...accidentType,
        }
        console.log(JSON.stringify(body));
        return this.http.post<any>(this.baseUrl_ + "AcciddentalManagement/CreateType", body, {
            headers: this.token.headerToken(),
        });
    }

    GetAllTypeList() {
        return this.http.get<any>(this.baseUrl_ + "AcciddentalManagement/GetAllTypeList", {
            headers: this.token.headerToken(),
        });
    }

    CreateExpense(accidentExpense: AccidentModel) {
        var body = {
            ...accidentExpense,
        }
        console.log(JSON.stringify(body));
        return this.http.post<any>(this.baseUrl_ + "AcciddentalManagement/CreateExpense", body, {
            headers: this.token.headerToken(),
        });
    }

    GetAllExpenseList() {
        return this.http.get<any>(this.baseUrl_ + "AcciddentalManagement/GetAllExpenseList", {
            headers: this.token.headerToken(),
        });
    }

    
    
}