import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { TmsModel } from '../../model/tms-model.model';
import { VehicleInsuranceModel } from '../../model/vehicle-insurance.model';
import { VehicleDocumentService } from '../../service/vehicle-document.service';
import { VehicleManageService } from '../../service/vehicle-manage.service';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vehicle-insurance',
  templateUrl: './vehicle-insurance.component.html',
  styleUrls: ['./vehicle-insurance.component.scss']
})
export class VehicleInsuranceComponent implements OnInit {

  vehicleInsuranceForm: FormGroup;
  VehicleInsuranceModel: VehicleInsuranceModel;
  ButtonName: string;
  fileTypeData: any;
  AllModelList: TmsModel[] = new Array();
  TmsModel: TmsModel;
  noResult: boolean;
  AllVehicleList: any = new Array();
  AllVehicleListDropdown: any;
  AllBudgetCodeDropdown: any;
  VehicleInsuranceModelList: any = new Array();
  @ViewChild("inputFile") myInputVariable: ElementRef;
  displayBasic: boolean;
  url = environment.fileUrl;


  filePath = "";
  fileComment = "";
  fileName = "";
  constructor(public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: VehicleManageService,
    public documentService: VehicleDocumentService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.LoadVehicles();
    this.LoadBudgetCodes();
    this.LoadVehicleInsurance();
  }

  InitializeForm() {

    this.vehicleInsuranceForm = this.fb.group({
      insurenceId: 0,
      vehicleId: ["", Validators.required],
      insurenceNo: ["", Validators.required],
      insurenceType: ["", Validators.required],
      insurerId: 0,
      effectiveDate: ["", Validators.required],
      expiryDate: ["", Validators.required],
      daysToRemind: 0,
      expense: 0,
      otherExpense: 0,
      odometer: "",
      budgetCode: "",
      registrationNumber: [""],
      remarks: [""]
    });
    this.ButtonName = "Save";
  }

  LoadVehicles() {
    this.service.GetVehicleList().subscribe(
      (data: any[]) => {
        console.log(data);
        this.AllVehicleList = data;
        this.AllVehicleListDropdown = new Array();
        this.AllVehicleListDropdown.push({ label: "--Select One--", value: "" });
        for (var i = 0; i < this.AllVehicleList.length; i++) {
          this.AllVehicleListDropdown.push({
            label: this.AllVehicleList[i].registrationNumber + " - " + this.AllVehicleList[i].vehicleType,
            onlyLabel: this.AllVehicleList[i].registrationNumber,
            value: this.AllVehicleList[i].vehicleId,
          });
        }
        console.log(this.AllVehicleList);

      },
      (error) => {
        this.toastr.warning("No Data Found", "Vehicles");

      }
    );

  }

  typeaheadNoResultsVehicle(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.vehicleInsuranceForm.patchValue({
        vehicleId: "",
        registrationNumber: ""
      });
      const control = this.vehicleInsuranceForm.get('vehicleId');
      control.markAsTouched({ onlySelf: true });
    }
  }

  onSelectVehicle(event: TypeaheadMatch): void {
    this.vehicleInsuranceForm.patchValue({
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

    console.log(this.AllBudgetCodeDropdown);

  }

  Onsubmit() {
    debugger;
    this.VehicleInsuranceModel = this.vehicleInsuranceForm.value;
    console.log(JSON.stringify(this.VehicleInsuranceModel));
    console.log(this.VehicleInsuranceModel);
    this.VehicleInsuranceModel.insurenceType = parseInt(this.vehicleInsuranceForm.value.insurenceType);
    this.VehicleInsuranceModel.insurerId = parseInt(this.vehicleInsuranceForm.value.insurerId);
    this.documentService.VehicleInsurance(this.VehicleInsuranceModel).subscribe(
      (res) => {
        if (res.succeeded == true && res.message) {
          this.toastr.success("Data Saved Successfully");
          this.uploadFiles(parseInt(res.message));
          this.clear();
        }
        else {
          this.toastr.warning("Data Saved Failed");
        }

      },
      (error) => {
        this.toastr.error("Failed To Save Vehicle Insurance");
      }
    );
    this.LoadVehicleInsurance();

  }

  LoadVehicleInsurance() {
    this.documentService.GetVehicleInsuranceList().subscribe(
      (data: any[]) => {
        console.log(data);
        this.VehicleInsuranceModelList = data;
      },
      (error) => {
        this.toastr.warning("No Data Found", "Vehicle Insurance");
      }
    );
  }

  EditVehicleInsurence(rowData: VehicleInsuranceModel) {
    const datepipe: DatePipe = new DatePipe('en-US')
    this.vehicleInsuranceForm.patchValue({
      insurenceId: rowData.insurenceId,
      vehicleId: rowData.vehicleId,
      insurenceNo: rowData.insurenceNo,
      insurerId: rowData.insurerId,
      registrationNumber: rowData.registrationNumber,
      effectiveDate: datepipe.transform(rowData.effectiveDate, 'yyyy-MM-ddThh:mm'),
      expiryDate: datepipe.transform(rowData.expiryDate, 'yyyy-MM-ddThh:mm'),
      insurenceType: rowData.insurenceType,
      daysToRemind: rowData.daysToRemind,
      expense: rowData.expense,
      otherExpense: rowData.otherExpense,
      odometer: rowData.odometer,
      budgetCode: rowData.budgetCode,
      remarks: rowData.remarks,

    });
    this.ButtonName = "Update";
  }

  FileViewVehicleInsurance(rowData: VehicleInsuranceModel) {
    this.displayBasic = true;
    let fileObjectId = 137;
    this.commonService.GetVehicleFilesByRefId(rowData.insurenceId, fileObjectId).subscribe((data: any) => {
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
    this.InitializeForm();
    this.ButtonName = "Save";
    this.myInputVariable.nativeElement.value = "";

  }



  getFileDetails(e) {
    this.fileTypeData = new FormData();
    for (var i = 0; i < e.target.files.length; i++) {
      this.fileTypeData.append(e.target.files[i].name, e.target.files[i]);
    }
  }

  uploadFiles(id: number) {
    if (this.fileTypeData != undefined || this.fileTypeData != null) {
      let event = "Vehicle Insurance";
      let objectId = 137;
      var refId = id;
      var fileComment = "";
      var fileRevised = "";
      this.commonService.FileUpload(refId, fileComment, fileRevised, event, objectId, this.fileTypeData).subscribe(
        (res) => {
          this.toastr.success("Approval", "File Uploded Successfully");
          this.filePath = "",
            this.fileComment = "",
            this.fileName = ""
        },
        (error) => { }
      );
    }
  }

}
