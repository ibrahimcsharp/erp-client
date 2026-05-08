import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertifyService } from "src/app/shared/service/alertify.service";

@Component({
  selector: "app-log-out",
  templateUrl: "./log-out.component.html",
  styleUrls: ["./log-out.component.css"],
})
export class LogOutComponent implements OnInit {
  constructor(private alertify: AlertifyService, private router: Router) {}

  ngOnInit() {
    debugger;
    this.logOut();
  }
  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("branchName");
    localStorage.removeItem("branchId");
    localStorage.removeItem("finYear");
    localStorage.removeItem("finYearId");
    this.alertify.success("loged out");
    //this.router.navigate(["/login"]);
  }
}
