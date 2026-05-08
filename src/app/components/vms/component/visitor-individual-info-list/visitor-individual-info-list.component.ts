import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { vmslistModel } from 'src/app/components/idm/model/vms.list.model';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { VisitorManageService } from '../../services/visitor-manage.service';

@Component({
  selector: 'app-visitor-individual-info-list',
  templateUrl: './visitor-individual-info-list.component.html',
  styleUrls: ['./visitor-individual-info-list.component.scss']
})
export class VisitorIndividualInfoListComponent implements OnInit {

  myId: string;
  missionApprove: any[];
  onlyMissionApprovedList: any[];


  VisitorManageService: any;
  visitorApproveForm: FormGroup;
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private modalService: BsModalService,
    public service: VisitorManageService,
  ) { }


  ngOnInit(): void {
    //this.myId = this.authService.decodedToken?.unique_name;
    this.InitializeForm();
    this.getAllPendingList();
    this.getOnlyApprovedList();


  }
  InitializeForm() {
    this.visitorApproveForm = this.fb.group({
      employeeName: [""],
      department: [""],
      section: [""],
      designation: [""],
      company: [""],
      doj: [""],
    });

  }
  getAllPendingList() {
    this.service.GetOnlyPendingListbyId().subscribe((res: any[]) => {
      this.missionApprove = res;
    },
      (error) => {
        this.toastr.error("Failed to Load  pending List");

      }
    );
  }

  getOnlyApprovedList() {
    this.service.GetOnlyApproveListbyId().subscribe((res: any[]) => {
      debugger
      this.onlyMissionApprovedList = res;
      console.log('All Approve list', res);
    },
      (error) => {
        this.toastr.error("Failed to Load  Approved List");

      }
    );
  }
  Approve(rowdata: vmslistModel) {
    debugger
    this.service.ApproveOutUser(rowdata).subscribe(
      (res) => {
        this.toastr.success(" Approve Successful");
        console.log(res);
        this.getAllPendingList();
        this.getOnlyApprovedList();
        //this.getAllMissionRejectedList();
      },
      (error) => {

        this.toastr.error("Failed To  Approve");
        console.log(error);
      }
    );
  }

  CardView(id: number) {
    window.open("/visitor-manage/visitor-info-card-no/" + id );
  }



}
