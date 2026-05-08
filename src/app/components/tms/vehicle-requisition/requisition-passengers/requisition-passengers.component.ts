import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { ToastrService } from 'ngx-toastr';
import { VehicleRequisitionModel } from '../../model/vehicle-requisition.model';
import { VehicleManageService } from '../../service/vehicle-manage.service';
import { TmsCommonService } from '../../service/tms-common.service';
import { environment } from 'src/environments/environment';
import { PendingPassengersComponent } from '../pending-passengers/pending-passengers.component';

@Component({
  selector: 'app-requisition-passengers',
  templateUrl: './requisition-passengers.component.html',
  styleUrls: ['./requisition-passengers.component.scss']
})
export class RequisitionPassengersComponent implements OnInit {

  VehicleRequisitionModel: VehicleRequisitionModel;
  RequisitionPasserngersForm: FormGroup;
  ButtonName: string;
  noResult: boolean;
  isBuyer: boolean = false;
  isCompany: boolean = false;
  isDepartment: boolean = false;
  isDivision: boolean = false;
  isEmployee: boolean = false;
  isCustomer: boolean = false;
  displayBasic: boolean;
  currentTime = new Date().getTime();
  offsetTimeZone = new Date().getTimezoneOffset();
  @ViewChild("submitSuccess") pendingPassengersComponent: PendingPassengersComponent;
  @ViewChild("inputFile") myInputVariable: ElementRef;
  url = environment.fileUrl;
  fileTypeData: any;
  selectedEmployees: any[];
  selectedDepartments: any[];
  references: any;
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: VehicleManageService,
    private toastr: ToastrService,
    public tmsService: TmsCommonService,
  ) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.commonService.LoadBuyerList();
    this.tmsService.LoadEmployee();
    this.tmsService.LoadDepartment();
    this.commonService.LoadCompany();
    this.tmsService.LoadVehicleTypes();
    this.commonService.LoadGatePassEmplyeeDepartmentList();
    this.commonService.LoadGatePassEmplyeeList();
  }


  InitializeForm() {
    this.RequisitionPasserngersForm = this.fb.group({
      requisitionId: 0,
      departmentId: "",
      companyId: 0,
      employeeId: "",
      buyerId: null,
      vehicleTypeId: 0,
      requisitionFor: ["", Validators.required],
      requiredFor: ["Internal Use", Validators.required],
      usedType: ["Pickup & Drop", Validators.required],
      purpose: ["Buyer Meeting", Validators.required],
      customerName: [""],
      pickupLocation: ["", Validators.required],
      dropLocation: ["", Validators.required],
      startTime: [new Date(this.currentTime - this.offsetTimeZone * 60000).toISOString().slice(0, 16), Validators.required],
      endTime: [new Date(this.currentTime - this.offsetTimeZone * 60000).toISOString().slice(0, 16), Validators.required],
      noOfPerson: ["", Validators.required],
      remarks: [""],
      buyerPersonName: [""],
      buyerPersonMobileNo: [""],
      participantName: [""],
    });
    this.ButtonName = "Save";
    this.assignedFor("1");
    this.selectedEmployees = null;
    this.selectedDepartments = null;
    this.fileTypeData = null;
  }


  Onsubmit() {
    if (this.RequisitionPasserngersForm.valid) {
      this.VehicleRequisitionModel = this.RequisitionPasserngersForm.value;
      this.VehicleRequisitionModel.status = "Pending";
      this.VehicleRequisitionModel.reason = "Passengers Requisition";
      this.VehicleRequisitionModel.requisitionType = "Passengers";
      this.VehicleRequisitionModel.vehicleTypeId = parseInt(this.RequisitionPasserngersForm.value.vehicleTypeId);
      this.VehicleRequisitionModel.buyerId = parseInt(this.RequisitionPasserngersForm.value.buyerId);
      this.VehicleRequisitionModel.companyId = parseInt(this.RequisitionPasserngersForm.value.companyId);
      this.VehicleRequisitionModel.Departments = this.selectedDepartments;
      this.VehicleRequisitionModel.Employees = this.selectedEmployees;
      this.VehicleRequisitionModel.buyerPersonName = this.RequisitionPasserngersForm.value.buyerPersonName;
      this.VehicleRequisitionModel.buyerPersonMobileNo = this.RequisitionPasserngersForm.value.buyerPersonMobileNo;
      this.VehicleRequisitionModel.participantName = this.RequisitionPasserngersForm.value.participantName;
      this.service.VehicleRequisition(this.VehicleRequisitionModel).subscribe(
        (res) => {
          if (res.message.includes("SUCCESSFULLY")) {
            var splitted = res.message.split(":", 2);
            this.references = new Array();
            this.uploadFiles(parseInt(splitted[1].trim()));
            if (this.VehicleRequisitionModel.Departments != null && (this.VehicleRequisitionModel.requisitionFor == 3 || this.VehicleRequisitionModel.requisitionFor == 1)) {
              for (var i = 0; i < this.VehicleRequisitionModel.Departments.length; i++) {
                this.references.push({
                  referenceId: 0,
                  referenceNumber: String(this.VehicleRequisitionModel.Departments[i].value),
                  referenceSourceId: splitted[1].trim(),
                  referenceType: "Requisition Department"
                });
              }
            }
            if (this.VehicleRequisitionModel.Employees != null && this.VehicleRequisitionModel.requisitionFor == 6) {
              for (var i = 0; i < this.VehicleRequisitionModel.Employees.length; i++) {
                this.references.push({
                  referenceId: 0,
                  referenceNumber: String(this.VehicleRequisitionModel.Employees[i].value),
                  referenceSourceId: splitted[1].trim(),
                  referenceType: "Requisition Employee"
                });
              }
            }
            if (this.references != null) {
              if (this.references.length > 0) {
                for (var i = 0; i < this.references.length; i++) {
                  this.service.CreateRefference(this.references[i]).subscribe(
                    (res) => {
                      this.VehicleRequisitionModel = null;
                      this.InitializeForm();
                      this.toastr.success("Save Vehicle Requisition Passengers");
                      this.ButtonName = "Save";
                    },
                    (error) => {
                      this.toastr.error("Failed To Save Vehicle Requisition");
                    }
                  );
                }
              } else if (this.references != null && this.references.length == 0) {
                this.VehicleRequisitionModel = null;
                this.InitializeForm();
                this.toastr.success("Save Vehicle Requisition Passengers");
                this.ButtonName = "Save";
              }
            } else {
              this.toastr.error("Failed To Save Vehicle Requisition Passengers");
              this.ButtonName = "Save";
            }
            this.clear();
          } else {
            this.toastr.error("Failed To Save Vehicle Requisition Passengers");
          }
        },
        (error) => {
          this.toastr.error("Failed To Save Vehicle Requisition Passengers");
        }
      );
    }
    else {
      this.toastr.warning("Enter Vehicle Requisition Passengers Information");
    }
    this.pendingPassengersComponent.loadVehicleRequisition();
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
    if (this.fileTypeData != null && id != null) {
      let event = "Refence Document";
      let objectId = 134;
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


  changeassignedFor(e) {
    this.assignedFor(e.target.value);
  }

  assignedFor(event: string) {
    this.isBuyer = false;
    this.isCompany = false;
    this.isDepartment = false;
    this.isDivision = false;
    this.isEmployee = false;
    this.isCustomer = false;
    if (event == '1') {
      this.isBuyer = true;
    } else if (event == '6') {
      this.isEmployee = true;
      this.isCompany = true;
    } else if (event == '3') {
      this.isDepartment = true;
    } else if (event == '4') {
      this.isDivision = true;
    } else if (event == '5') {
      this.isCompany = true;
    } else if (event == '7') {
      this.isCustomer = true;
    }

  }

  clear() {
    this.myInputVariable.nativeElement.value = "";
    this.InitializeForm();
  }

}
