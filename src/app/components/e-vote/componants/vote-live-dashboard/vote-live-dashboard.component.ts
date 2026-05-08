import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription, timer } from "rxjs";
import { EVoteService } from "../../services/e-vote.service";
import { SignalrService } from "../../services/signalr.service";

@Component({
  selector: "app-vote-live-dashboard",
  templateUrl: "./vote-live-dashboard.component.html",
  styleUrls: ["./vote-live-dashboard.component.css"],
})
export class VoteLiveDashboardComponent implements OnInit {
  subscription: Subscription;
  title = "";
  issueNo = 0;
  everyFiveSeconds: Observable<number> = timer(0, 5000);
  PLabel = new Array();
  PData = new Array();
  eVote: any;
  basicOptions: any;
  // public chartOptions: any = {
  //   scaleShowVerticalLines: true,
  //   responsive: true,
  //   scales: {
  //     yAxes: [
  //       {
  //         ticks: {
  //           beginAtZero: true,
  //         },
  //       },
  //     ],
  //   },
  // };
  // public chartLabels: string[] = ["Real time data for the chart"];
  // public chartType: string = "bar";
  // public chartLegend: boolean = true;
  // public colors: any[] = [
  //   { backgroundColor: "#5491DA" },
  //   { backgroundColor: "#E74C3C" },
  //   { backgroundColor: "#82E0AA" },
  //   { backgroundColor: "#E5E7E9" },
  // ];

  constructor(
    public signalRService: SignalrService,
    private http: HttpClient,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private evoteService: EVoteService
  ) {}
  ngOnInit() {
    let id = this.currentRoute.snapshot.paramMap.get("id");
    if (id != null) {
      this.evoteService.GetEVoteById(Number(id)).subscribe(
        (res: any) => {
          this.eVote = res;
          this.countDownDate = new Date(res.endTime).getTime();
          this.title = res.title;
          this.issueNo = res.id;
        },
        (error) => {}
      );

      this.subscription = this.everyFiveSeconds.subscribe(() => {
        this.GetLiveData(Number(id));
      });
    }
  }

  GetLiveData(id: number) {
    this.evoteService.GetVoteResultByIssueId(id).subscribe(
      (res: any[]) => {
        this.PLabel = [];
        this.PData = [];
        res.forEach((element) => {
          var findIndex = this.PLabel;
          this.PLabel.push(element.label.toUpperCase());
          this.PData.push(element.data);
        });
        // console.log(res);
        // console.log(this.PLabel);
        //console.log(this.PData);
        this.LoadBarChart();
      },
      (error) => {}
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  basicData: any;
  LoadBarChart() {
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

  demo: any = "";
  countDownDate: any;

  x = setInterval(() => {
    //debugger;
    var now = new Date().getTime();
    var distance = this.countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    this.demo = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
    if (distance < 0) {
      this.demo = "Expired";
      this.router.navigate(["/e-vote/e-vote-list"]);
    }
  });
}
