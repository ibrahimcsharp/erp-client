import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
  constructor(private route: Router, private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    //console.log("Passed through the interceptor in request");

    return next.handle(request).pipe(
      map((res) => {
        //console.log(res);
        //console.log("Passed through the interceptor in response");
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        //console.log(error);
        if (error.error[0] != undefined) {
          alert("Error : " + error.error[0]);
        }

        let errorMsg = "";
        if (error.error instanceof ErrorEvent) {
          //console.log("This is client side error");
          //errorMsg = `Error: ${error.error.message}`;
        } else {
          //console.log("This is server side error");
          //errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          if (error.status == 401) {
            this.toastr.warning(
              "You have no permission to action",
              "Unauthorized User"
            );
            //alert("You have no permission to action");
            // localStorage.removeItem("token");
            // localStorage.removeItem("branchName");
            // localStorage.removeItem("branchId");
            // localStorage.removeItem("finYear");
            // localStorage.removeItem("finYearId");
            // this.route.navigate(["/auth/unauthorized-401"]);
          }
        }
        //console.log(errorMsg);
        return throwError(errorMsg);
      })
    );
  }
}
