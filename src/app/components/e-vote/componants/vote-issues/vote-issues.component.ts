import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { CommonServiceService } from "src/app/components/merchandising/Common-Services/common-service.service";
import { EVoteService } from "../../services/e-vote.service";

@Component({
  selector: "app-vote-issues",
  templateUrl: "./vote-issues.component.html",
  styleUrls: ["./vote-issues.component.css"],
})
export class VoteIssuesComponent implements OnInit {
  customForm: FormGroup;
  saveButtonTitle = "Save";
  items: FormArray;
  submitted = false;
  formData: any = new FormData();
  @ViewChild("inputFile") myInputVariable: ElementRef;
  constructor(
    private fb: FormBuilder,
    private voteService: EVoteService,
    private toastr: ToastrService,
    private settingService: CommonServiceService,
    private spinner: NgxSpinnerService,
    private currentRoute: ActivatedRoute,
    private eVoteService: EVoteService
  ) {}

  ngOnInit() {
    this.CreateCustomForm();
    let id = this.currentRoute.snapshot.paramMap.get("id");
    if (id != null) {
      this.GetEVoteById(Number(id));
    }
  }

  GetEVoteById(id: number) {
    this.eVoteService.GetEVoteById(id).subscribe(
      (res: any) => {
        console.log(res);
        res.issueOptions.forEach((element) => {
          var dtl: FormGroup = this.CreateIssueOptionsForm();
          this.t.push(dtl);
        });
        this.customForm.patchValue(res);
        //this.eVote = res;
      },
      (error) => {}
    );
  }

  CreateCustomForm() {
    this.customForm = this.fb.group({
      id: [0],
      title: ["", Validators.required],
      typeId: ["", Validators.required],
      owner: ["", Validators.required],
      startTime: ["", Validators.required],
      endTime: ["", Validators.required],
      sortOrder: ["", Validators.required],
      remarks: [""],
      issueOptions: new FormArray([]),
    });
  }

  CreateIssueOptionsForm(): FormGroup {
    return this.fb.group({
      id: [0],
      issueId: [0],
      optionName: ["", Validators.required],
      sortOrder: ["", Validators.required],
      remarks: [""],
    });
  }

  get f() {
    return this.customForm.controls;
  }
  get t() {
    return this.f.issueOptions as FormArray;
  }
  get ticketFormGroups() {
    return this.t.controls as FormGroup[];
  }

  onSubmit() {
    this.submitted = true;
    if (this.customForm.valid) {
      this.spinner.show();
      //console.log(this.customForm.value);
      this.formData.append('createIssues', JSON.stringify(this.customForm.value));
     // this.formData.append('issueOptionsList', JSON.stringify(this.customForm.value.issueOptions));

      //this.voteService.PostEVoteData(this.customForm.value, this.formData).subscribe(
      this.voteService.PostEVoteData(this.formData).subscribe(
        (res: any) => {
          //console.log(res);
          debugger
          this.toastr.success("Saved Succssfully!", "Issues Info");
          this.CreateCustomForm();
          this.t.clear();
          this.formData = new FormData();
          this.myInputVariable.nativeElement.value = "";
          this.spinner.hide();
        },
        (error) => {
          //console.log(error);
          this.toastr.error("Failed to Save", "Issue Info");
          this.spinner.hide();
        }
      );
    } else {
      this.settingService.ValidationShow(this.customForm);
    }
  }
  addNewItem(): void {
    this.items = this.customForm.get("issueOptions") as FormArray;
    this.items.push(this.CreateIssueOptionsForm());
  }

  DeleteRow(index: number) {
    var f = this.t.at(index);
    if (f.value.id > 0) {
      this.toastr.error("Failed to delete", "This options is already used");
      //this.t.removeAt(index);
    } else {
      this.t.removeAt(index);
    }
  }

  getFileDetails(e, itemId: number) {    
    itemId = 0;
    this.formData.delete(itemId.toString());
    for (var i = 0; i < e.target.files.length; i++) {
      this.formData.append(itemId.toString(), e.target.files[i]);
    }
  }
}
