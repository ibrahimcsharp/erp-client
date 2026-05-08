import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { environment } from 'src/environments/environment';
import { IdmService } from '../../service/idm.service';
import { VisionMissionComponent } from '../vision-mission/vision-mission.component';

@Component({
  selector: 'app-vision-mission-list',
  templateUrl: './vision-mission-list.component.html',
  styleUrls: ['./vision-mission-list.component.scss']
})
export class VisionMissionListComponent implements OnInit {
  visions: any[];
  missions: any[];
  modalRef?: BsModalRef;
  url = environment.fileUrl;
  @ViewChild("vision") child: VisionMissionComponent;
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: IdmService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private modalService: BsModalService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.getVision();
  }

  getVision() {
    this.visions = [];
    this.service.GetVisions().subscribe(
      (res: any[]) => {
        this.visions = res;
        console.log('vision List');
        console.log(this.visions);
      },
      (error) => {
        this.toastr.error("Failed to Load Visions");
        this.visions = [];
      }
    );
  }

  getMission(rowData:any, template: TemplateRef<any>) {
    this.missions = [];
    this.service.GetMissionByVisionIdForVisisonList(rowData.id).subscribe(
      (res: any[]) => {
        this.missions = res;
        console.log('mission List');
        console.log(this.missions);
        this.modalRef = this.modalService.show(template, { class: "modal-lg" });
      },
      (error) => {
        this.toastr.error("Failed to Load Visions");
        this.visions = [];
      }
    );
  }

  editItem(rowData:any){
    debugger
    this.missions = [];
    this.service.GetMissionByVisionIdForVisisonList(rowData.id).subscribe(
      (res: any[]) => {
        //Date formate to datetime to date
        if(rowData.deadline!=undefined && rowData.deadline!=null){
          var chars = rowData.deadline.split('T');
          rowData.deadline = chars[0];
        }
        this.missions= res.filter((x) => x.status != "Reject");
        //1.first Initialize the child main form
        this.child.InitializeForm();
        //2.push blank form to formarray(sub form) list
        this.missions.forEach(element => {
          if(element.when!=undefined && element.when!=null){
            var chars2 = element.when.split('T');
            element.when = chars2[0];
            // element.when= this.datePipe.transform(element.when, "yyyy-dd-MM")
            // element.when = element.when.toString()
          }
          var mission: FormGroup = this.child.BlankMissionForm();
          this.child.missions().push(mission);
        });
        
        //3.make your rowdata as like your form design
        rowData.missionList = this.missions;
        //4.now pass the value to child main form
        this.child.visionForm.patchValue(rowData);
      },
      (error) => {
        this.toastr.error("Failed to Load Visions");
        this.visions = [];
      }
    );

  }

}
