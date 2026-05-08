import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-unauthorized",
  templateUrl: "./unauthorized.component.html",
  styleUrls: ["./unauthorized.component.scss"],
})
export class UnauthorizedComponent implements OnInit {
  constructor(private route: Router) {}
  imageSrc = "assets/images/errors/401.jpg";
  imageAlt = "Unauthorized";

  ngOnInit(): void {}

  login() {
    this.route.navigate(["/auth/login"]);
  }
}
