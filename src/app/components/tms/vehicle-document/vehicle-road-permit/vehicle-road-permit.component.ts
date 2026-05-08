import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { TmsModel } from '../../model/tms-model.model';
import { VehicleDocumentService } from '../../service/vehicle-document.service';
import { VehicleManageService } from '../../service/vehicle-manage.service';
import { DatePipe } from '@angular/common';
import { VehicleRoadPermitModel } from '../../model/vehicle-road-permit.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vehicle-road-permit',
  templateUrl: './vehicle-road-permit.component.html',
  styleUrls: ['./vehicle-road-permit.component.scss']
})
export class VehicleRoadPermitComponent implements OnInit {

  VehicleRoadPermitForm: FormGroup;
  VehicleRoadPermitModel: VehicleRoadPermitModel;
  ButtonName: string;
  fileTypeData: any;
  AllModelList: TmsModel[] = new Array();
  TmsModel: TmsModel;
  noResult: boolean;
  AllVehicleList: any = new Array();
  AllVehicleListDropdown: any;
  AllBudgetCodeDropdown: any;
  VehicleRoadPermitModelList: any = new Array();
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
    this.LoadVehicleRoadPermit();
  }

  InitializeForm() {


    this.VehicleRoadPermitForm = this.fb.group({
      permitId: 0,
      vehicleId: ["", Validators.required],
      registrationNumber: [""],
      permitNo: ["", Validators.required],
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
      this.VehicleRoadPermitForm.patchValue({
        vehicleId: "",
        registrationNumber: ""
      });
      const control = this.VehicleRoadPermitForm.get('vehicleId');
      control.markAsTouched({ onlySelf: true });
    }
  }

  onSelectVehicle(event: TypeaheadMatch): void {
    this.VehicleRoadPermitForm.patchValue({
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
    this.VehicleRoadPermitModel = this.VehicleRoadPermitForm.value;
    console.log(JSON.stringify(this.VehicleRoadPermitModel));
    console.log(this.VehicleRoadPermitModel);
    this.documentService.VehicleRoadPermit(this.VehicleRoadPermitModel).subscribe(
      (res) => {
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
    this.LoadVehicleRoadPermit();
  }

  LoadVehicleRoadPermit() {
    this.documentService.GetVehicleRoadPermitList().subscribe(
      (data: any[]) => {
        console.log(data);
        this.VehicleRoadPermitModelList = data;
        console.log(this.VehicleRoadPermitModelList);
      },
      (error) => {
        this.toastr.warning("No Data Found", "Vehicle Road Permit");
      }
    );
  }

  EditVehicleRoadPermit(rowData: VehicleRoadPermitModel) {
    const datepipe: DatePipe = new DatePipe('en-US')
    this.VehicleRoadPermitForm.patchValue({
      permitId: rowData.permitId,
      permitNo: rowData.permitNo,
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

  FileViewVehicleRoadPermit(rowData: any) {
    this.displayBasic = true;
    let fileObjectId = 130;
    this.commonService.GetVehicleFilesByRefId(rowData.permitId, fileObjectId).subscribe((data: any) => {
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
      let event = "Road Permit";
      let objectId = 130;
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