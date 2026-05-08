import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { DriverInfoCreateModel } from '../../../model/driver-info.model';
import { VehicleManageService } from '../../../service/vehicle-manage.service';
import * as moment from 'moment';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { GatePassEmployeeType } from 'src/app/components/merchandising/models/gatePassEmployeeModel';
import { EVoteService } from 'src/app/components/e-vote/services/e-vote.service';

@Component({
  selector: 'app-driver-info-create',
  templateUrl: './driver-info-create.component.html',
  styleUrls: ['./driver-info-create.component.scss']
})
export class DriverInfoCreateComponent implements OnInit {
  @Output() DriverInfoList = new EventEmitter();
  DriverInfoForm: FormGroup;
  ButtonName: string;
  AllDriverInfoList: DriverInfoCreateModel[] = new Array();
  DriverInfoModel: DriverInfoCreateModel;
  @ViewChild("inputFile") myInputVariable: ElementRef;

  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: VehicleManageService,
    private toastr: ToastrService,    
    public evoteService: EVoteService
  ) { }

  ngOnInit(): void {
    this.InitializeFormFromParent();
    this.commonService.LoadCompany();
    this.LoadGatePassEmplyeeList();
  }

  InitializeFormFromParent() {
    if (this.DriverInfoModel) {
      this.DriverInfoForm = this.fb.group({
        infoId: this.DriverInfoModel.infoId,
        employeeId: this.DriverInfoModel.employeeId,
        employeeName: this.DriverInfoModel.employeeName,
        contactNo: this.DriverInfoModel.contactNo,
        companyId: this.DriverInfoModel.companyId,
        companyName: this.DriverInfoModel.companyName,
        departmentName: this.DriverInfoModel.departmentName,
        nId: this.DriverInfoModel.nId,
        designation: this.DriverInfoModel.designation,
        position: this.DriverInfoModel.position,
        workLocation: this.DriverInfoModel.workLocation,
        weekend: this.DriverInfoModel.weekend,
        grade: this.DriverInfoModel.grade,
        joiningDate: moment(this.DriverInfoModel.joiningDate).format('YYYY-MM-DD'),
        employeeStatus: this.DriverInfoModel.employeeStatus,
        mobileNo: this.DriverInfoModel.mobileNo,
        licenseNo: this.DriverInfoModel.licenseNo,
        licenseExpiryDate: moment(this.DriverInfoModel.licenseExpiryDate).format('YYYY-MM-DD'),
        daysToRemind: this.DriverInfoModel.daysToRemind,
      });
    }
    else {
      this.InitializeForm();
    }

  }

  InitializeForm() {
    this.DriverInfoForm = this.fb.group({
      employeeName: ["", Validators.required],
      employeeId: ["", Validators.required],
      contactNo: [""],
      companyId: [null],
      companyName: [""],
      departmentName: ["Transport"],
      weekend: [""],
      designation: ["Driver"],
      position: [""],
      workLocation: [""],
      grade: [""],
      joiningDate: [null],
      employeeStatus: ["Active"],
      mobileNo: ["", Validators.required],
      licenseNo: [""],
      licenseExpiryDate: [null],
      daysToRemind: 15,
      nId: 0,
    });
    this.ButtonName = "Save";
  }

  Onsubmit() {
    if (this.DriverInfoForm.valid) {
      this.DriverInfoModel = this.DriverInfoForm.value;
      console.log('Submitted Data');
      console.log(this.DriverInfoModel);

      this.service.DriverInfoCreate(this.DriverInfoModel).subscribe(
        (res) => {
          console.log(res);
          this.DriverInfoModel = null;
          this.InitializeForm();
          this.toastr.success("Driver Saved Successfully");
          this.DriverInfoList.emit();
          this.uploadFiles(parseInt(res.message));
          this.ButtonName = "Save";
        },
        (error) => {
          this.DriverInfoModel = null;
          this.InitializeForm();
          this.toastr.error("Failed To Save Driver");
          console.log(error);
        }
      );
    }
    else {
      this.commonService.ValidationShow(this.DriverInfoForm);
    }

  }

  clear() {
    this.DriverInfoForm = this.fb.group({
      employeeName: ["", Validators.required],
      employeeId: [""],
      contactNo: [""],
      companyId: [null],
      companyName: [""],
      departmentName: [""],
      designation: [""],
      position: [""],
      workLocation: [""],
      grade: [""],
      joiningDate: [null],
      employeeStatus: ["Active"],
      mobileNo: ["", Validators.required],
      weekend: [""],
      licenseNo: [""],
      licenseExpiryDate: [null],
      daysToRemind: null,
      nId: 0,
    });
    this.ButtonName = "Save";
    this.myInputVariable.nativeElement.value = "";
  }
  gatePassEmployeeList: GatePassEmployeeType[] = new Array();
  gatePassEmployeeListBackup: GatePassEmployeeType[] = new Array();
  GatePassEmployeeList: any[] = new Array();
  LoadGatePassEmplyeeList() {
    this.evoteService.GetGatePassEmployeeList().subscribe(
      (res: GatePassEmployeeType[]) => {
        this.gatePassEmployeeList = res;
        this.gatePassEmployeeListBackup = res;
        this.GatePassEmployeeList = new Array();
        //this.GatePassEmployeeList.push({ label: "Select", value: null });
        for (var i = 0; i < this.gatePassEmployeeList.length; i++) {
          this.GatePassEmployeeList.push({
            label:
              this.gatePassEmployeeList[i].employeeName +
              "-" +
              this.gatePassEmployeeList[i].employeeId +
              "-" +
              this.gatePassEmployeeList[i].department,
            nameOnly: this.gatePassEmployeeList[i].employeeName,
            value: this.gatePassEmployeeList[i].employeeId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Employee List");
      }
    );
  }


  fileTypeData: any;
  getFileDetails(e) {
    this.fileTypeData = new FormData();
    for (var i = 0; i < e.target.files.length; i++) {
      this.fileTypeData.append(e.target.files[i].name, e.target.files[i]);
    }
  }
  filePath = "";
  fileComment = "";
  fileName = "";
  uploadFiles(id: number) {
    if (this.fileTypeData != undefined && this.fileTypeData != null) {
      let event = "License No";
      let objectId = 135;
      var refId = id;
      var fileComment = "";
      var fileRevised = "";
      this.commonService.FileUpload(refId, fileComment, fileRevised, event, objectId, this.fileTypeData).subscribe(
        (res) => {
          this.filePath = "",
            this.fileComment = "",
            this.fileName = ""
        },
        (error) => { }
      );
    }
  }
  noResult: boolean;
  typeaheadNoResultsSupervisor(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.DriverInfoForm.patchValue({
        //employeeName: "",
        //employeeId: 0
      });

      const control = this.DriverInfoForm.get('employeeName');
      control.markAsTouched({ onlySelf: true });
    }
  }
  onSelectSupervisor(event: TypeaheadMatch): void {
    this.DriverInfoForm.patchValue({
      employeeId: event.item.value,
      employeeName: event.item.nameOnly
    });
  }
}
