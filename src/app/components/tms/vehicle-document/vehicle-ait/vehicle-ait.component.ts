import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { VehicleManageService } from '../../service/vehicle-manage.service';
import { environment } from 'src/environments/environment';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { VehicleDocumentService } from '../../service/vehicle-document.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vehicle-ait',
  templateUrl: './vehicle-ait.component.html',
  styleUrls: ['./vehicle-ait.component.scss']
})
export class VehicleAitComponent implements OnInit {

  @ViewChild("inputFile") myInputVariable: ElementRef;
  displayBasic: boolean;
  url = environment.fileUrl;

  AllVehicleList: any = new Array();
  AllVehicleListDropdown: any;
  AllBudgetCodeDropdown: any;
  VehicleAitForm: FormGroup;
  VehicleAitList: any = [];
  ButtonName: string;
  noResult: boolean;

  fileTypeData: any;
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
    this.LoadVehicleAit();
  }

  InitializeForm() {

    this.VehicleAitForm = this.fb.group({
      aitId: 0,
      vehicleId: ["", Validators.required],
      aitReceiptNumber: ["", Validators.required],
      paymentDate: [null, Validators.required],
      financialYearId: [0],
      daysToRemind: 0,
      expense: 0,
      otherExpense: 0,
      odometer: [""],
      budgetCode: null,
      // referenceDocument: [""],
      remindAt: [""],
      remarks: [""],
      registrationNumber: [""],
    });
    this.ButtonName = "Save";
  }

  Onsubmit() {
    if (this.VehicleAitForm.valid) {
      this.documentService.VehicleAit(this.VehicleAitForm.value).subscribe(
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
          this.toastr.error("Failed To Save Vehicle Fitness");
        }
      );
      this.LoadVehicleAit();
    }

  }

  clear() {
    this.InitializeForm();
    this.myInputVariable.nativeElement.value = "";
    this.ButtonName = "Save";
  }



  EditVehicleAit(rowData: any) {
    const datepipe: DatePipe = new DatePipe('en-US')
    this.VehicleAitForm.patchValue({
      aitId: rowData.aitId,
      vehicleId: rowData.vehicleId,
      aitReceiptNumber: rowData.aitReceiptNo, // aitReceiptNumber is in frontend and aitReceiptNo is in backend
      paymentDate: datepipe.transform(rowData.paymentDate, 'yyyy-MM-dd'),
      financialYearId: rowData.financialYearId,
      daysToRemind: rowData.daysToRemind,
      expense: rowData.expense,
      otherExpense: rowData.otherExpense,
      odometer: rowData.odometer,
      budgetCode: rowData.budgetCode,
      // referenceDocument: rowData.referenceDocument,
      remindAt: datepipe.transform(rowData.remindAt, 'yyyy-MM-dd'),
      registrationNumber: rowData.registrationNumber,
      remarks: rowData.remarks,
    });
    this.ButtonName = "Update";
  }

  LoadVehicleAit() {
    this.documentService.GetVehicleAitList().subscribe(
      (data: any[]) => {
        console.log(data);
        this.VehicleAitList = data;
      },
      (error) => {
        this.toastr.warning("No Data Found", "Vehicle Fitness");
      }
    );
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
      this.VehicleAitForm.patchValue({
        vehicleId: "",
        registrationNumber: ""
      });
      const control = this.VehicleAitForm.get('vehicleId');
      control.markAsTouched({ onlySelf: true });
    }
  }
  onSelectVehicle(event: TypeaheadMatch): void {
    this.VehicleAitForm.patchValue({
      vehicleId: event.item.value,
      registrationNumber: event.item.label
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

  FileViewVehicleAit(rowData: any) {
    this.displayBasic = true;
    let fileObjectId = 136;
    this.commonService.GetVehicleFilesByRefId(rowData.aitId, fileObjectId).subscribe((data: any) => {
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

  getFileDetails(e) {
    this.fileTypeData = new FormData();
    for (var i = 0; i < e.target.files.length; i++) {
      this.fileTypeData.append(e.target.files[i].name, e.target.files[i]);
    }
  }
  uploadFiles(id: number) {
    if (this.fileTypeData != null && this.fileTypeData != undefined) {
      let event = "Vehicle Ait";
      let objectId = 136;
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

}
