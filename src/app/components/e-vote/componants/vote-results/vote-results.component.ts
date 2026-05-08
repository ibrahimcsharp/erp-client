import { Component, OnInit } from "@angular/core";
import { EVoteService } from "../../services/e-vote.service";

@Component({
  selector: "app-vote-results",
  templateUrl: "./vote-results.component.html",
  styleUrls: ["./vote-results.component.scss"],
})
export class VoteResultsComponent implements OnInit {
  constructor(private voteService: EVoteService) {}

  ngOnInit(): void {}

  GetVoteResultByIssueId(issueId: number) {
    this.voteService.GetVoteResultByIssueId(issueId).subscribe(
      (res: any[]) => {
        if (res) {
          this.PLabel = [];
          this.PData = [];
          res.forEach((element) => {
            this.PLabel.push(element.label.toUpperCase());
            this.PData.push(element.data);
          });
          this.LoadBarChart();
        }
      },
      (error) => {}
    );
  }
  basicData: any;
  basicOptions: any;
  PLabel = new Array();
  PData = new Array();
  eVote: any;
  title = "";
  LoadBarChart() {
    //this.PData = [];
    this.basicData = {
      //labels: ["January", "February", "March", "April", "May", "June", "July"],
      labels: this.PLabel,
      datasets: [
        {
          label: "ISSUE NO." + this.eVote.id,
          fontSize: "20px",
          //backgroundColor: "#42A5F5",
          data: this.PData,
          backgroundColor: [
            "#8000ff",
            "#0040ff",
            "#40ff00",
            "#ff8000",
            "#00ffff",
            "#8c7373",
            "#0000ff",
          ],
          hoverBackgroundColor: [
            "#8000ff",
            "#0040ff",
            "#40ff00",
            "#ff8000",
            "#00ffff",
            "#8c7373",
            "#0000ff",
          ],
        },
        // {
        //   label: "My Second dataset",
        //   backgroundColor: "#FFA726",
        //   data: [28, 48, 40, 19, 86, 27, 90],
        // },
      ],
    };
    //console.log(this.basicData);
  }
}
