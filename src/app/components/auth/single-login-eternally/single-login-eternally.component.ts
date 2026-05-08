import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/shared/service/alertify.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { SpinnerService } from 'src/app/shared/service/spinner.service';

@Component({
  selector: 'app-single-login-eternally',
  templateUrl: './single-login-eternally.component.html',
  styleUrls: ['./single-login-eternally.component.scss']
})
export class SingleLoginEternallyComponent implements OnInit {

  constructor(
    private currentRoute: ActivatedRoute,
    private spinner: SpinnerService,
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

 async ngOnInit() {
    let token = this.currentRoute.snapshot.paramMap.get("token");
    await this.CheckEmployeeInfo(token);
  }

 async CheckEmployeeInfo(token: string) {
    if (token != null) {
      this.spinner.showSpinner();
      var obj = {
        token: token,
      };
      this.authService.singleLoginEternal(obj).subscribe(
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
