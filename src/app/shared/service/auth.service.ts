import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  baseUrl = environment.apiUrl + "auth/";
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient, private token: TokenService) {}

  login(model: any) {
    //console.log(model);
    return this.http.post(this.baseUrl + "login", model).pipe(
      map((response: any) => {
        const user = response;
        //console.log(response);
        if (user) {
          localStorage.setItem("token", user.token);
          localStorage.setItem("branchName", user.user.branchOfficeName);
          localStorage.setItem("branchId", user.user.branchOfficeId);
          localStorage.setItem("finYearId", user.user.finYearId);
          localStorage.setItem("finYear", user.user.finYearTitle);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
      })
    );
  }

  singleLogin(model: any) {
    return this.http.post(this.baseUrl + "SingleSignIn", model).pipe(
      map((response: any) => {
        const user = response;
        //console.log(response);
        if (user) {
          localStorage.setItem("token", user.token);
          //localStorage.setItem("branchName", user.user.branchOfficeName);
          //localStorage.setItem("branchId", user.user.branchOfficeId);
          //localStorage.setItem("finYearId", user.user.finYearId);
          //localStorage.setItem("finYear", user.user.finYearTitle);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
      })
    );
  }

  singleLoginEternal(model: any) {
    return this.http.post(this.baseUrl + "SingleSignInEternally", model).pipe(
      map((response: any) => {
        const user = response;
        //console.log(response);
        // shuvo
        if (user) {
          localStorage.setItem("token", user.token);
          localStorage.setItem("branchName", user.user.branchOfficeName);
          localStorage.setItem("branchId", user.user.branchOfficeId);
          localStorage.setItem("finYearId", user.user.finYearId);
          localStorage.setItem("finYear", user.user.finYearTitle);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
      })
    );
  }
  
  signinFromSara(model: any) {
    debugger;
    return this.http.post(this.baseUrl + "SigninFromSara", model).pipe(
      map((response: any) => {
        const user = response;
        //console.log(response);
        if (user) {
          localStorage.setItem("token", user.token);
          localStorage.setItem("branchName", user.user.branchOfficeName);
          localStorage.setItem("branchId", user.user.branchOfficeId);
          //localStorage.setItem("finYearId", user.user.finYearId);
          //localStorage.setItem("finYear", user.user.finYearTitle);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
      })
    );
  }

  signinFromSaraSso(sessionId: string) {
    return this.http.post(this.baseUrl + "SigninFromSaraSSO", {sessionId}).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem("token", user.token);
          localStorage.setItem("branchName", user.user.branchOfficeName);
          localStorage.setItem("branchId", user.user.branchOfficeId);
          localStorage.setItem("finYearId", user.user.finYearId);
          localStorage.setItem("finYear", user.user.finYearTitle);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
      })
    );
  }
  
  register(form: FormGroup) {
    //console.log(JSON.stringify(form));
    return this.http.post(this.baseUrl, form);
  }

  loggedIn() {
    const token = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }

  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles = this.decodedToken.role as Array<string>;
    if (userRoles) {
      allowedRoles.forEach((element: string) => {
        if (userRoles.includes(element)) {
          isMatch = true;
          return;
        }
      });
    }
    return isMatch;
  }

  ChangePassword(obj: any) {
    return this.http.post(this.baseUrl + "ResetPassword", obj, {
      headers: this.token.headerToken(),
    });
  }
}
