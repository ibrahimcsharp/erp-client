import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { TmsModel } from '../../model/tms-model.model';
import { VehicleRegistrationModel } from '../../model/vehicle-registration.model';
import { VehicleManageService } from '../../service/vehicle-manage.service';
import { VehicleDocumentService } from '../../service/vehicle-document.service';
import { DatePipe } from '@angular/common';
import { TmsCommonService } from '../../service/tms-common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vehicle-registration',
  templateUrl: './vehicle-registration.component.html',
  styleUrls: ['./vehicle-registration.component.scss']
})
export class VehicleRegistrationComponent implements OnInit {

  VehicleRegistrationForm: FormGroup;
  VehicleRegistrationModel: VehicleRegistrationModel;
  ButtonName: string;
  fileTypeData: any;
  AllModelList: TmsModel[] = new Array();
  TmsModel: TmsModel;
  noResult: boolean;
  AllVehicleList: any = new Array();
  AllVehicleListDropdown: any;
  AllBudgetCodeDropdown: any;
  @ViewChild("inputFile") myInputVariable: ElementRef;
  VehicleRegistrationModelList: any = new Array();
  displayBasic: boolean;
  url = environment.fileUrl;
  regNo: number;

  filePath = "";
  fileComment = "";
  fileName = "";
  constructor(public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: VehicleManageService,
    public documentService: VehicleDocumentService,
    public tmsService: TmsCommonService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.LoadVehicles();
    this.LoadBudgetCodes();
    this.LoadVehicleRegistration();
  }

  InitializeForm() {

    this.VehicleRegistrationForm = this.fb.group({
      registrationId: 0,
      vehicleId: ["", Validators.required],
      registrationNumber: ["", Validators.required],
      effectiveDate: [null, Validators.required],
      expiryDate: [null, Validators.required],
      documentType: ["", Validators.required],
      daysToRemind: 0,
      expense: 0.00,
      otherExpense: 0.00,
      odometer: "",
      budgetCode: ["", Validators.required],
      remarks: [""]
    });
    this.ButtonName = "Save";
  }

  LoadVehicles() {
    this.service.GetVehicleList().subscribe(
      (data: any[]) => {
        this.AllVehicleList = data;
        console.log("All Vehicle ", this.AllVehicleList);
        this.AllVehicleListDropdown = new Array();
        this.AllVehicleListDropdown.push({ label: "--Select One--", value: "" });
        for (var i = 0; i < this.AllVehicleList.length; i++) {
          this.AllVehicleListDropdown.push({
            label: this.AllVehicleList[i].registrationNumber + " - " + this.AllVehicleList[i].vehicleType,
            onlyLabel: this.AllVehicleList[i].registrationNumber,
            value: this.AllVehicleList[i].vehicleId,
          });
        }

      },
      (error) => {
        this.toastr.warning("No Data Found", "Vehicles");

      }
    );

  }

  typeaheadNoResultsVehicle(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.VehicleRegistrationForm.patchValue({
        vehicleId: "",
        registrationNumber: ""
      });
      const control = this.VehicleRegistrationForm.get('vehicleId');
      control.markAsTouched({ onlySelf: true });
    }
  }

  onSelectVehicle(event: TypeaheadMatch): void {
    this.VehicleRegistrationForm.patchValue({
      vehicleId: event.item.value,
      registrationNumber: event.item.onlyLabel
    });

  }

  LoadBudgetCodes() {
    this.AllBudgetCodeDropdown = new Array();
    this.AllBudgetCodeDropdown.push({ label: "--Select One--", value: "" });
    this.AllBudgetCodeDropdown.push({
      label: "Police Cost-001",
      value: "Police Cost-001",
    });
  }

  Onsubmit() {
    this.VehicleRegistrationModel = this.VehicleRegistrationForm.value;
    this.VehicleRegistrationModel.documentType = parseInt(this.VehicleRegistrationForm.value.documentType);
    this.documentService.VehicleRegistration(this.VehicleRegistrationModel).subscribe((res) => {
      if (res.succeeded == true && res.message) {
        this.toastr.success("Data Saved Successfully");
        this.clear();
        this.uploadFiles(parseInt(res.message));
      }
      else {
        this.toastr.warning("Data Saved Failed");
      }
    }
    );
    this.LoadVehicleRegistration();
  }

  getFileDetails(e) {
    this.fileTypeData = new FormData();
    for (var i = 0; i < e.target.files.length; i++) {
      this.fileTypeData.append(e.target.files[i].name, e.target.files[i]);
    }
  }

  uploadFiles(id: number) {
    if (this.fileTypeData != undefined || this.fileTypeData != null) {
      let event = "Vehicle Registration";
      let objectId = 133;
      var refId = id;
      var fileComment = this.VehicleRegistrationForm.value.documentType;
      var fileRevised = "";
      this.commonService.FileUpload(refId, fileComment, fileRevised, event, objectId, this.fileTypeData).subscribe(
        (res) => {
          //this.toastr.success("Approval", "File Uploded Successfully");
          this.filePath = "",
            this.fileComment = "",
            this.fileName = ""
        },
        (error) => { }
      );
    }
  }
  LoadVehicleRegistration() {
    this.documentService.GetVehicleRegistrationList().subscribe(
      (data: any[]) => {
        this.VehicleRegistrationModelList = data;
      },
      (error) => {
        this.toastr.warning("No Data Found", "Vehicle Registration");
      }
    );
  }

  EditVehicleRegistration(rowData: VehicleRegistrationModel) {
    const datepipe: DatePipe = new DatePipe('en-US')
    this.VehicleRegistrationForm.patchValue({
      registrationId: rowData.registrationId,
      registrationNumber: rowData.registrationNumber,
      vehicleId: rowData.vehicleId,
      effectiveDate: datepipe.transform(rowData.effectiveDate, 'yyyy-MM-dd'),
      expiryDate: datepipe.transform(rowData.expiryDate, 'yyyy-MM-dd'),
      documentType: rowData.documentType,
      daysToRemind: rowData.daysToRemind,
      expense: rowData.expense,
      otherExpense: rowData.otherExpense,
      odometer: rowData.odometer,
      budgetCode: rowData.budgetCode,
      remarks: rowData.remarks,
    });
    this.ButtonName = "Update";
  }

  FileViewVehicleRegistration(rowData: any) {
    this.displayBasic = true;
    let fileObjectId = 133;
    this.commonService.GetVehicleFilesByRefId(rowData.registrationId, fileObjectId).subscribe((data: any) => {
      if (data) {
        // Find the latest file based on UploadDate
        let latestFile = data.reduce((prev: any, current: any) => (prev.UploadDate > current.UploadDate) ? prev : current);
        this.commonService.commonFilesList = [latestFile];
      }
    },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Files");
      }
    );
  }

  clear() {
    this.myInputVariable.nativeElement.value = "";
    this.VehicleRegistrationForm.reset();
    this.VehicleRegistrationForm = this.fb.group({
      vehicleId: ["", Validators.required],
      registrationNumber: ["", Validators.required],
      effectiveDate: [null, Validators.required],
      expiryDate: [null, Validators.required],
      documentType: ["", Validators.required],
      daysToRemind: 0,
      expense: 0.00,
      otherExpense: 0.00,
      odometer: "",
      budgetCode: ["", Validators.required],
      remarks: [""]
    });
    this.ButtonName = "Save";
    this.regNo = 0;
    this.myInputVariable.nativeElement.value = "";
  }
}
