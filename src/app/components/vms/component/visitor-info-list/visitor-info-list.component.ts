import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { vmslistModel } from 'src/app/components/idm/model/vms.list.model';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { VisitorManageService } from '../../services/visitor-manage.service';
import { VisitorInfoComponent } from '../visitor-info/visitor-info.component';
import { Observable, interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-visitor-info-list',
  templateUrl: './visitor-info-list.component.html',
  styleUrls: ['./visitor-info-list.component.scss']
})
export class VisitorInfoListComponent implements OnInit {
  @ViewChild("SampleProjection") child: VisitorInfoComponent;
  myId: string;
  // missionApprove: any[];
  onlyMissionApprovedList: any[];


  VisitorManageService: any;
  visitorApproveForm: FormGroup;
  // interval: NodeJS.Timeout;
  data: any;
  interval: any;
  private updateSubscription: Subscription;
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private modalService: BsModalService,
    public service: VisitorManageService,
  ) { }


  ngOnInit(): void {
    //debugger
    this.getAllPendingList();
    //this.myId = this.authService.decodedToken?.unique_name;
    this.InitializeForm();

    this.getOnlyApprovedList();

      interval(1000).subscribe(
      (val) => {
        this.getAllPendingList()
      }
    );

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
   // debugger
    this.service.GetOnlyPendingList().subscribe((res: any[]) => {
      this.service.missionApprove = res;
    },
      (error) => {
        this.toastr.error("Failed to Load  pending List");

      }
    );
  }

  getOnlyApprovedList() {
    this.service.GetOnlyApproveList().subscribe((res: any[]) => {
      this.onlyMissionApprovedList = res;

    },
      (error) => {
        this.toastr.error("Failed to Load  Approved List");

      }
    );
  }
  Approve(rowdata: vmslistModel) {
    this.service.ApproveOutUser(rowdata).subscribe(
      (res) => {
        this.toastr.success(" OUT-Approve Successful");

        this.getAllPendingList();
        this.getOnlyApprovedList();
        //this.getAllMissionRejectedList();
      },
      (error) => {

        this.toastr.error("Failed To  OUT-Approve");
        console.log(error);
      }
    );
  }


  CardView(id: number) {

    //  // this.service.GetOnlyPendingList().subscribe((res: any[]) => {
    //       this.service.GetVmsDataById(id).subscribe((res: any[]) => {
    //     this.missionApprove = res;
    //     debugger
    window.open("/visitor-manage/visitor-info-card-no/" + id);
    // },
    //   (error) => {
    //     this.toastr.error("Failed to Load  VMS Card");

    //   }
    // );
  }


}
