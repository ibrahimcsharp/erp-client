import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { DisplinaryDropdownModel } from '../../../model/displinary-list.model';
import { DisplinaryTypeModel } from '../../../model/displinary-Type.model';
import { DriverDisplinaryCreateModel } from '../../../model/driver-displinary.model';
import { VehicleManageService } from '../../../service/vehicle-manage.service';

@Component({
  selector: 'app-driver-disciplinary-create',
  templateUrl: './driver-disciplinary-create.component.html',
  styleUrls: ['./driver-disciplinary-create.component.scss']
})
export class DriverDisciplinaryCreateComponent implements OnInit {
  @Output() DriverDisplinaryList = new EventEmitter();
  DriverDisplinaryForm: FormGroup;
  ButtonName: string;
  AllDriverDisplinaryModelList: DriverDisplinaryCreateModel[] = new Array();
  DriverDisplinaryModel: DriverDisplinaryCreateModel;
  DisplinaryDropDownList: DisplinaryTypeModel[] = new Array();
  DisplinarySelectList: DisplinaryDropdownModel[] = new Array();
  formData: FormData;
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: VehicleManageService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.InitializeFormFromParent();
    this.LoadDiplinaryType();
  }

  InitializeFormFromParent() {
    if (this.DriverDisplinaryModel) {
      this.DriverDisplinaryForm = this.fb.group({
        displinaryTypeId: this.DriverDisplinaryModel.displinaryTypeId,
        occurrenceDate: this.DriverDisplinaryModel.occurrenceDate,
        actionDate: this.DriverDisplinaryModel.actionDate,
        reason: this.DriverDisplinaryModel.reason
      });
    }
    else {
      this.InitializeForm();
    }

  }

  InitializeForm() {
    this.DriverDisplinaryForm = this.fb.group({
      displinaryTypeId: [0],
      occurrenceDate: [null],
      actionDate: [null],
      reason: [""],
    });
    this.ButtonName = "Save";
  }

  Onsubmit() {
    if (this.DriverDisplinaryForm.valid) {
      this.DriverDisplinaryModel = this.DriverDisplinaryForm.value;
      console.log('Submitted Data');
      console.log(this.DriverDisplinaryModel);
      this.service.DriverDisplinaryCreate(this.DriverDisplinaryModel).subscribe(
        (res) => {
          console.log(res);
          this.DriverDisplinaryModel = null;
          this.InitializeForm();
          this.toastr.success(res.message);
          console.log(res.message);
          this.DriverDisplinaryList.emit();
          this.ButtonName = "Save";
          let refId = parseInt(res.message);
          this.uploadFiles(refId);
        },
        (error) => {
          this.DriverDisplinaryModel = null;
          this.InitializeForm();
          this.toastr.error("Failed To Save Driver");
          console.log(error);
        }
      );
    }
    else {
      this.commonService.ValidationShow(this.DriverDisplinaryForm);
    }

  }

  clear() {
    this.DriverDisplinaryForm = this.fb.group({
      disciplinaryTypeId: 0,
      occurrenceDate: null,
      actionDate: null,
      reason: "",
    });
    this.ButtonName = "Save";
  }

  getFileDetails(e) {
    this.formData = new FormData();
    for (var i = 0; i < e.target.files.length; i++) {
      this.formData.append(e.target.files[i].name, e.target.files[i]);
    }
  }
  filePath = "";
  fileComment = "";
  fileName = "";
  uploadFiles(DisplinaryId: number) {
    let event = "Driver Displinary";
    let objectId = 45;
    var refId = DisplinaryId;
    alert(refId);
    var fileComment = "";
    var fileRevised = "";
    this.commonService.FileUpload(refId, fileComment, fileRevised, event, objectId, this.formData).subscribe(
      (res) => {
        this.toastr.success("Driver Displinary", "File Uploded Successfully");
        this.filePath = "",
          this.fileComment = "",
          this.fileName = ""
      },
      (error) => { }
    );
  }

  LoadDiplinaryType() {
    this.service.GetDisplinaryDropDownList().subscribe((data: DisplinaryTypeModel[]) => {
      this.DisplinaryDropDownList = data;
      this.DisplinarySelectList = new Array();
      this.DisplinarySelectList.push({
        label: "Select",
        value: 0,
      });
      for (var i = 0; i < this.DisplinaryDropDownList.length; i++) {
        this.DisplinarySelectList.push({
          label: this.DisplinaryDropDownList[i].typeName,
          value: this.DisplinaryDropDownList[i].typeId,
        });

      }
      console.log(this.DisplinarySelectList);
    });
  }

}
