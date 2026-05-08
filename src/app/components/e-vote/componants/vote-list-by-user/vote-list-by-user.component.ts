import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "src/app/shared/service/auth.service";
import { EVoteService } from "../../services/e-vote.service";
import { VoteResultsComponent } from "../vote-results/vote-results.component";
import { CommonFiles } from "src/app/components/merchandising/models/common-files.model";
import { ToastrService } from "ngx-toastr";
import { CommonServiceService } from "src/app/components/merchandising/Common-Services/common-service.service";
import { environment } from 'src/environments/environment';
@Component({
  selector: "app-vote-list-by-user",
  templateUrl: "./vote-list-by-user.component.html",
  styleUrls: ["./vote-list-by-user.component.css"],
})
export class VoteListByUserComponent implements OnInit {
  
  constructor(
    private eVoteService: EVoteService,
    public authService: AuthService,
    private toastr: ToastrService,
    public commonService: CommonServiceService,    
  ) {}
  EVoteList: any[] = [];
  displayBasic: boolean;
  url = environment.fileUrl;
  displayBasic2: boolean;
  fileList: any=[];
  @ViewChild("voteResult") child: VoteResultsComponent;

  ngOnInit() {
    this.GetEVoteList();
  }
  GetEVoteList() {
    this.eVoteService.GetEVoteDataByUser().subscribe(
      (res: any[]) => {
        debugger
        this.EVoteList = res;
        console.log(this.EVoteList);
      },
      (error) => {}
    );
  }

  GetValidityOfIssue(obj: any) {
    var endtime = new Date(obj.endTime).getTime();
    var now = new Date().getTime();
    if (now > endtime) {
      return false;
    } else {
      return true;
    }
  }
  CurrentUser(obj: any) {
    console.log(this.authService.decodedToken?.unique_name);
    console.log(obj.createdBy);
    if (this.authService.decodedToken?.unique_name == obj.createdBy) {
      return true;
    } else {
      return false;
    }
  }

  ViewVoteResult(obj: any) {
    console.log(obj);
    this.child.title = obj.title;
    this.displayBasic = true;
    this.child.eVote = obj;
    this.child.GetVoteResultByIssueId(obj.issueId);
  }

  
  
  ShowFile(obj: any) {    
    debugger
    let fileObjectId = 135;        
    this.displayBasic2 = true;
    var styleId = 0;
    this.commonService.GetStyleImageByRefId(obj.issueId, fileObjectId).subscribe((data: CommonFiles[]) => {
      if (data) {
        
        this.fileList = data;        
      }
    },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Files");
      }
    );
  }
}
