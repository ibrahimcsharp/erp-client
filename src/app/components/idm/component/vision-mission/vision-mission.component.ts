import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, Message } from 'primeng/api';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { IdmService } from '../../service/idm.service';

@Component({
  selector: 'app-vision-mission',
  templateUrl: './vision-mission.component.html',
  styleUrls: ['./vision-mission.component.scss']
})
export class VisionMissionComponent implements OnInit {
  visionForm: FormGroup;
  noResult = false;
  position: string;
  msgs: Message[] = [];
  @Output() VisionToCreate = new EventEmitter();
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: IdmService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.commonService.LoadGatePassEmplyeeList();
  }
  InitializeForm() {
    this.visionForm = this.fb.group({
      //buyerId: [null, Validators.required],
      id:[null],
      vision :[""],
      deadline :[""],
      target :[""],
      achievement :[""],
      comments :[""],
      employee_id :[""],
      employee_name :[""],
      department :[""],
      section :[""],
      designation :[""],
      missionList: this.fb.array([]),
    });

  }
  BlankMissionForm(): FormGroup {
    return this.fb.group({
      id:[null],
      visionMstId:[null],
      action:[""],
      how:[""],
      who:[""],
      when:[""],
      idmDate:[""],
      indicator:[""],
      target:[""],
      achievement:[""],
      remarks:[""],
    });
  }

  get wholeFormControl() {
    return this.visionForm.controls;
  }
  get missionFormControl() {
    return this.wholeFormControl.missionList as FormArray;
  }
  onSelectEmployee(event: TypeaheadMatch , index: number): void {
    if (this.noResult == true) {
      const missionForm = this.missionFormControl.at(index);
      missionForm.patchValue({
        who: event.item.label
      });
      const control = missionForm.get("who");
      control.markAsTouched({ onlySelf: true });
    }
    
  }
  typeaheadNoResultsEmployee(event: boolean, index: number): void {
    this.noResult = event;
    if (this.noResult == true) {
      const missionForm = this.missionFormControl.at(index);
      missionForm.patchValue({
        who: ""
      });
      const control = missionForm.get("who");
      control.markAsTouched({ onlySelf: true });

   
    }
  }

  missions(): FormArray {
    return this.visionForm.get("missionList") as FormArray;
  }

  addNewItem(): void {
    this.missions().push(this.BlankMissionForm());
  }

  DeleteRow(index: number) {
    this.position = "top";
    this.confirmationService.confirm({
      message: "Are you sure that you want to delete this row?",
      header: "Delete Task",
      icon: "pi pi-info-circle",
      accept: () => {
        this.missions().removeAt(index);
      },
      reject: () => {
        this.msgs = [
          {
            severity: "info",
            summary: "Rejected",
            detail: "You have rejected to add item",
          },
        ];
      },
      key: "positionDialog",
    });
  }

  onSubmit(){
    console.log(this.visionForm.value);
    if (this.visionForm.valid) {
       //     if (this.visionForm.value.missionList.length > 0) {
        this.service.CreateVision(this.visionForm.value).subscribe(
          (res) => {
            this.toastr.success("Vision Saved Successfully");
            this.VisionToCreate.emit();
            this.clear();
          },
          (error) => {
            console.log('onsubmit error');
            console.log(error);
            this.toastr.error("Failed To Save Vision");
            
          }
        ); 
     // } else {
        //       this.toastr.error("Please Add Mission first!");
        //     }  
    }
    else {

      this.toastr.error("Please fill up all required data!");
    }
  }

  clear(){
    this.InitializeForm();
    this.missionFormControl.reset();
    this.missionFormControl.clear();
  }
}
