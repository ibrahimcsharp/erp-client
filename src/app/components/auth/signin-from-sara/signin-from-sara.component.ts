import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertifyService } from "src/app/shared/service/alertify.service";
import { AuthService } from "src/app/shared/service/auth.service";
import { SpinnerService } from "src/app/shared/service/spinner.service";

@Component({
  selector: "app-signin-from-sara",
  templateUrl: "./signin-from-sara.component.html",
  styleUrls: ["./signin-from-sara.component.css"],
})
export class SigninFromSaraComponent implements OnInit {
  constructor(
    private currentRoute: ActivatedRoute,
    private spinner: SpinnerService,
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    let employeeId = this.currentRoute.snapshot.paramMap.get("employeeId");
    
    let sessionId = this.currentRoute.snapshot.paramMap.get("sessionId");

    if (this.authService.loggedIn()) {
      this.router.navigate(["/dashboard/default/"]);
    }else{
      if(sessionId){
        this.loginFromSaraSSO(sessionId);
      }else{
        this.CheckEmployeeInfo(employeeId);
      }
    }
  }

  CheckEmployeeInfo(employeeId: string) {
    if (employeeId != null) {
      this.spinner.showSpinner();
      var obj = {
        employeeId: employeeId,
      };
      this.authService.signinFromSara(obj).subscribe(
        (next) => {
          this.alertify.success("Login successfully!");
        },
        (error) => {
          this.alertify.error(
            "Failed to login,You have no any branch permission!"
          );
          this.spinner.hideSpinner();
        },
        () => {
          this.spinner.hideSpinner();
          this.router.navigate(["/dashboard/default/"]);
          //window.location.reload();
        }
      );
    } else {
      this.alertify.error("Failed to login!");
    }
  }

  loginFromSaraSSO(sessionId:string){
    this.authService.signinFromSaraSso(sessionId).subscribe(
      (next) => {
        this.alertify.success("Login successfully!");
        window.location.reload();
      },
      (error) => {
        this.alertify.error("Failed to login!");
        this.spinner.hideSpinner();
      },
      () => {
          this.spinner.hideSpinner();
      }
    );
  }
}
