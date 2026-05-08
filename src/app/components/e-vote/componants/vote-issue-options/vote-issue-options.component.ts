import { Component, OnInit, ViewChild } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { EVoteService } from "../../services/e-vote.service";
import { VoteDtlResultComponent } from "../vote-dtl-result/vote-dtl-result.component";
import { VoteResultsComponent } from "../vote-results/vote-results.component";
import { ToastrService } from "ngx-toastr";
import { CommonServiceService } from "src/app/components/merchandising/Common-Services/common-service.service";
import { CommonFiles } from "src/app/components/merchandising/models/common-files.model";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-vote-issue-options",
  templateUrl: "./vote-issue-options.component.html",
  styleUrls: ["./vote-issue-options.component.css"],
})
export class VoteIssueOptionsComponent implements OnInit {
  constructor(
    private eVoteService: EVoteService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    public commonService: CommonServiceService,   
  ) {}
  EVoteList: any[] = [];
  displayBasic: boolean;
  displayBasic2: boolean;
  fileList: any=[];
  url = environment.fileUrl;
  @ViewChild("voteResult") child: VoteResultsComponent;

  ngOnInit() {
    this.GetEVoteList();
  }
  GetEVoteList() {
    this.eVoteService.GetEVoteData().subscribe(
      (res: any[]) => {
        this.EVoteList = res;
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
  ViewVoteResult(obj: any) {        
    this.displayBasic = true;
    this.child.title = obj.title;
    this.child.eVote = obj;
    this.child.GetVoteResultByIssueId(obj.id);
  }

  bsModalRef: BsModalRef;
  ShowDtlResult(obj: any) {   
    console.log(obj);
    this.eVoteService.GetVoteResultById(obj.id).subscribe(
      (res: any[]) => {        
        this.bsModalRef = this.modalService.show(VoteDtlResultComponent, {
          initialState: {
            title: obj.title,
            res,
          },
          backdrop: true,
          ignoreBackdropClick: true,
          class: "modal-lg",
        });
      },
      (error) => {}
    );
  }
  ShowFile(obj: any) {        
    let fileObjectId = 135;        
    this.displayBasic2 = true;    
    this.commonService.GetStyleImageByRefId(obj.id, fileObjectId).subscribe((data: CommonFiles[]) => {
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
