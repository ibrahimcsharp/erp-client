import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/shared/service/token.service';

@Injectable({
    providedIn: 'root'
})

export class TmsMapService {
    baseUrl = environment.apiMapUrl;
    apiMapUser = environment.apiMapUser;
    apiMapPassword = environment.apiMapPassword;
    baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
    headers: any;
    map_auth_token: any;
    jwtHelper: any;
    constructor(
        private http: HttpClient,
        private token: TokenService
    ) {
        //this.map_auth_token = localStorage.getItem('map_token'); 
        this.map_auth_token = "JDJ5JDEwJHUwSUs0Snp1YmpsL20zTEM4Ni9nQnVudmhJSHZIb0NhcmRQNTVwdy9EL3VDZHpIRk1DdEQ2"
    }

    LiveTracDataByTrackerId(trackerId: string) {
        let body = new URLSearchParams();
        body.set('device_name', trackerId);

        console.log(JSON.stringify(body));
        return this.http.post<any>("http://localhost:4200/api/custom/v1/livetracdata", body.toString(), {
            headers: this.headerToken(),
        });
    }

    LiveTracDataAll() {
        let body = new URLSearchParams();

        console.log(JSON.stringify(body));
        return this.http.post<any>(this.baseUrl_ + "livetracdata", body.toString(), {
            headers: this.headerToken(),
        });
    }



    headerToken(): any {
        //debugger;
        if (this.loggedIn()) {
            this.headers = new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': 'http://localhost:4200',
                'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                'Authorization': "Bearer " + this.map_auth_token
            })
            console.log(this.headers);
            return this.headers;
        }
        else {
            return this.headers;

        }

    }

    loggedIn() {

        return true;//!this.jwtHelper.isTokenExpired(this.map_auth_token);
    }

}