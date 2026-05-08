import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertifyService } from "src/app/shared/service/alertify.service";
import { AuthService } from "src/app/shared/service/auth.service";
import { SpinnerService } from "src/app/shared/service/spinner.service";

@Component({
  selector: "app-single-login",
  templateUrl: "./single-login.component.html",
  styleUrls: ["./single-login.component.css"],
})
export class SingleLoginComponent implements OnInit {
  constructor(
    private currentRoute: ActivatedRoute,
    private spinner: SpinnerService,
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    let token = this.currentRoute.snapshot.paramMap.get("token");
    this.CheckEmployeeInfo(token);
  }

  CheckEmployeeInfo(token: string) {
    debugger
    if (token != null) {
      this.spinner.showSpinner();
      var obj = {
        token: token,
      };
      this.authService.singleLogin(obj).subscribe(
        (next) => {
          this.alertify.success("Login successfully!");
        },
        (error) => {
          this.alertify.error("Failed to login!");
          this.spinner.hideSpinner();
        },
        () => {
          this.spinner.hideSpinner();
          window.open("/dashboard/default/", "_self");
        }
      );
    } else {
      this.alertify.error("Failed to login!");
    }
  }
}
