import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { TmsModel } from '../../model/tms-model.model';
import { VehicleDocumentService } from '../../service/vehicle-document.service';
import { VehicleManageService } from '../../service/vehicle-manage.service';
import { DatePipe } from '@angular/common';
import { VehicleTaxTokenModel } from '../../model/vehicle-tax-token.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vehicle-tax-token',
  templateUrl: './vehicle-tax-token.component.html',
  styleUrls: ['./vehicle-tax-token.component.scss']
})
export class VehicleTaxTokenComponent implements OnInit {

  VehicleTaxTokenForm: FormGroup;
  VehicleTaxTokenModel: VehicleTaxTokenModel;
  ButtonName: string;
  fileTypeData: any;
  AllModelList: TmsModel[] = new Array();
  TmsModel: TmsModel;
  noResult: boolean;
  AllVehicleList: any = new Array();
  AllVehicleListDropdown: any;
  AllBudgetCodeDropdown: any;
  VehicleTaxTokenModelList: any = new Array();
  @ViewChild("inputFile") myInputVariable: ElementRef;
  displayBasic: boolean;
  url = environment.fileUrl;
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
    this.LoadVehicleTaxToken();
  }

  InitializeForm() {
    this.VehicleTaxTokenForm = this.fb.group({
      taxTokenId: 0,
      vehicleId: [null, Validators.required],
      registrationNumber: [""],
      taxTokenNo: [null, Validators.required],
      effectiveDate: [null, Validators.required],
      expiryDate: [null, Validators.required],
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
      this.VehicleTaxTokenForm.patchValue({
        vehicleId: "",
        registrationNumber: ""
      });
      const control = this.VehicleTaxTokenForm.get('vehicleId');
      control.markAsTouched({ onlySelf: true });
    }
  }

  onSelectVehicle(event: TypeaheadMatch): void {
    this.VehicleTaxTokenForm.patchValue({
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
    this.VehicleTaxTokenModel = this.VehicleTaxTokenForm.value;
    console.log(JSON.stringify(this.VehicleTaxTokenModel));
    this.documentService.VehicleTaxToken(this.VehicleTaxTokenModel).subscribe(
      (res) => {
        if (res.succeeded == true && res.message) {
          this.toastr.success("Data Saved Successfully");
          this.clear();
          this.uploadFiles(parseInt(res.message));
        }
        else {
          this.toastr.warning("Data Saved Failed");
        }
      },
      (error) => {
        this.toastr.error("Failed To Save Vehicle Tax Token");
      }
    );
    this.LoadVehicleTaxToken();

  }

  LoadVehicleTaxToken() {
    this.documentService.GetVehicleTaxTokenList().subscribe(
      (data: any[]) => {
        this.VehicleTaxTokenModelList = data;
      },
      (error) => {
        this.toastr.warning("No Data Found", "Vehicle Tax Token");
      }
    );
  }

  EditVehicleTaxToken(rowData: VehicleTaxTokenModel) {
    const datepipe: DatePipe = new DatePipe('en-US')
    this.VehicleTaxTokenForm.patchValue({
      taxTokenId: rowData.taxTokenId,
      taxTokenNo: rowData.taxTokenNo,
      vehicleId: rowData.vehicleId,
      effectiveDate: datepipe.transform(rowData.effectiveDate, 'yyyy-MM-dd'),
      expiryDate: datepipe.transform(rowData.expiryDate, 'yyyy-MM-dd'),
      daysToRemind: rowData.daysToRemind,
      expense: rowData.expense,
      otherExpense: rowData.otherExpense,
      odometer: rowData.odometer,
      budgetCode: rowData.budgetCode,
      registrationNumber: rowData.registrationNumber,
      remarks: rowData.remarks,
    });
    this.ButtonName = "Update";
  }

  FileViewTaxTokenRegistration(rowData: any) {
    this.displayBasic = true;
    let fileObjectId = 132;
    this.commonService.GetVehicleFilesByRefId(rowData.taxTokenId, fileObjectId).subscribe((data: any) => {
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
  filePath = "";
  fileComment = "";
  fileName = "";
  uploadFiles(id: number) {
    if (this.fileTypeData != undefined || this.fileTypeData != null) {
      let event = "Tax Token No";
      let objectId = 132;
      //var refId = this.VehicleTaxTokenForm.value.taxTokenNo;
      var refId = id;
      var fileComment = "";
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
}