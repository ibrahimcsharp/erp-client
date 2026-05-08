import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ConfirmationService, Message } from "primeng/api";
import { EVoteService } from "../../services/e-vote.service";
import { CommonServiceService } from "src/app/components/merchandising/Common-Services/common-service.service";
import { CommonFiles } from "src/app/components/merchandising/models/common-files.model";
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";


@Component({
  selector: "app-vote-give",
  templateUrl: "./vote-give.component.html",
  styleUrls: ["./vote-give.component.css"],
})
export class VoteGiveComponent implements OnInit {
  constructor(
    private currentRoute: ActivatedRoute,
    private router: Router,
    private eVoteService: EVoteService,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService,
    public commonService: CommonServiceService,    
    private http: HttpClient,
  ) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }
  responsiveOptions;
  eVote: any = [];
  //countDownDate = new Date("december 28, 2021 15:00:00").getTime();
  countDownDate: any;
  msgs: Message[] = [];
  fileList: any=[];
  position: string;
  url = environment.fileUrl;
  ngOnInit() {
    debugger
    let id = this.currentRoute.snapshot.paramMap.get("id");
    if (id != null) {
      debugger
     
      this.GetEVoteById(Number(id));
      this.ShowFile(Number(id));


      
    }
  }

  GetEVoteById(id: number) {
    debugger
    this.eVoteService.GetEVoteById(id).subscribe(
      (res: any) => {
        debugger
        //console.log(res);
        this.eVote = res;
        this.countDownDate = new Date(res.endTime).getTime();
      },
      (error) => {
        this.eVote = null;
      }
    );
  }
  demo: any = "";

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
      this.router.navigate(["/e-vote/e-vote-list-user"]);
    }
  });

  Vote(issueId: number, issueOptionId: number) {
    var endtime = new Date(this.eVote.endTime).getTime();
    var now = new Date().getTime();
    if (now <= endtime) {
      this.eVoteService.CreateVote(issueId, issueOptionId).subscribe(
        (res) => {
          this.toastr.success("Voted Successfully");
          this.router.navigate(["/e-vote/e-vote-list-user"]);
        },
        (error) => {
          this.toastr.error("Failed to Vote");
        }
      );
    } else {
      alert("Expired Issue");
    }

    //alert("clicked");
  }
 
  showImagePath: string;
   ShowFile(refId: number) {  
    // this.http.get<any>('assets/products-small.json').subscribe()
    //     .then(res => <any[]>res.data)
    //     .then(data => { return data; });
    

    debugger
    let fileObjectId = 135;  
    this.commonService.GetStyleImageByRefId(refId, fileObjectId).subscribe((data: CommonFiles[]) => {
      if (data) {        
        var sortData = data.filter(x => x.fileType == '.png' || x.fileType == '.jpg' || x.fileType == '.jpeg')
        if(sortData.length>0){
          for(var item of sortData){
            var obj = {
              loc : this.url + item.location
            };
            this.fileList.push(obj);
          }
        }      
      }
    },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Files");
      }
    );
  }

  // confirmPosition(position: string) {
  //   this.position = position;

  //   this.confirmationService.confirm({
  //     message: "Do you want to delete this record?",
  //     header: "Delete Confirmation",
  //     icon: "pi pi-info-circle",
  //     accept: () => {
  //       this.msgs = [
  //         { severity: "info", summary: "Confirmed", detail: "Record deleted" },
  //       ];
  //     },
  //     reject: () => {
  //       this.msgs = [
  //         {
  //           severity: "info",
  //           summary: "Rejected",
  //           detail: "You have rejected",
  //         },
  //       ];
  //     },
  //     key: "positionDialog",
  //   });
  // }
}
