import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-vote-dtl-result",
  templateUrl: "./vote-dtl-result.component.html",
  styleUrls: ["./vote-dtl-result.component.css"],
})
export class VoteDtlResultComponent implements OnInit {
  res: any = ([] = []);
  title: string;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {}
}
