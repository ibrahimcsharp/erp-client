import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { VehicleRequisitionModel } from '../../model/vehicle-requisition.model';
import { TmsCommonService } from '../../service/tms-common.service';
import { VehicleManageService } from '../../service/vehicle-manage.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { ReferenceModel } from '../../model/common.model';
import { VehicleAssignmentModel } from '../../model/vehicle-assignment.model';
import { VehicleCreateModel } from '../../model/vehicle-entry.model';
import { RequisitionLogModel } from '../../model/Requisition-log.model';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss']
})
export class AssignComponent implements OnInit {
  @Input() SelectedVehicle: VehicleRequisitionModel[];
  @Output() SelectedVehicleChange = new EventEmitter<VehicleRequisitionModel[]>();
  @Input() displayAssign: boolean;
  @Output() displayAssignChange = new EventEmitter<boolean>();
  @Output() loadVehicleRequisition = new EventEmitter<void>();
  AssignForm: FormGroup;
  VehicleRequisitionModel: VehicleRequisitionModel;
  VehicleAssignmentModel: VehicleAssignmentModel;
  vehicleCreateModel: VehicleCreateModel;
  VehicleCreateModelList: VehicleCreateModel[] = new Array();
  AllRequisitionLogList: RequisitionLogModel[] = new Array();
  ButtonName: string;
  AllDriverAssignmentList: any;
  AssignedVehicleList: any;
  AllVehicleList: any;
  isDriverFree: boolean = false;
  isVehicleFree: boolean = false;
  isSeatFull: boolean = false;
  isBuyer: boolean = false;
  isCompany: boolean = false;
  isDepartment: boolean = false;
  isDivision: boolean = false;
  isEmployee: boolean = false;
  selectedEmployees: any[];
  selectedDepartments: any[];
  references: any;
  allReferenceList: ReferenceModel[] = new Array();
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: VehicleManageService,
    private toastr: ToastrService,
    public tmsService: TmsCommonService,
  ) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.tmsService.LoadVehicle();
    this.commonService.LoadBuyerList();
    this.tmsService.LoadEmployee();
    this.tmsService.LoadDepartment();
    this.commonService.LoadCompany();
    this.tmsService.LoadVehicleTypes();
    
    this.tmsService.LoadVehicleBrands();
    this.tmsService.LoadVehicleModels();
    this.tmsService.LoadVehicleFuelTypes();
    this.tmsService.LoadDrivers();
    this.GetAssignedVehicle();
    this.GetAssignedDriver();
    this.LoadVehicle();
  }

  InitializeForm() {
    this.AssignForm = this.fb.group({
      assignmentId: 0,
      requisitionId: 0,
      vehicleId: ["", Validators.required],
      vehicleTypeId: "",
      requiredVehicleTypeId: "",
      departmentId: "",
      companyId: 0,
      employeeId: "",
      driverId: ["", Validators.required],
      buyerId: "",
      requiredFor: ["", Validators.required],
      assignedFor: ["1", Validators.required],
      usedType: ["Pickup & Drop", Validators.required],
      pickupLocation: ["", Validators.required],
      dropLocation: ["", Validators.required],
      noOfPerson: ["", Validators.required],
      totalNoOfPerson: [0, Validators.required],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      status: ["Vehicle Assign", Validators.required],
      purpose: ["", Validators.required],
      remarks: [""],
      assignRemarks: ["", Validators.required],
      requisitionSplit: ["NO", Validators.required],
      brandId: ["", Validators.required],
      modelId: ["", Validators.required],
      fuelType: ["", Validators.required],
      modelYear: [""],
      engineNumber: ["", Validators.required],
      chassisNumber: ["", Validators.required],
      engineCc: ["", Validators.required],
      tyreSize: [""],
      battery: [""],
      totalSeat: [""],
      color: ["", Validators.required],
      fuelCapacity: ["", Validators.required],
      vehicleStatus: ["1", Validators.required]
    });
    this.ButtonName = "Vehicle Assign";
    this.assignedFor("1");
  }

  InitializeFormFromParent() {
    if (this.VehicleRequisitionModel) {
      this.AssignForm = this.fb.group({
        assignmentId: 0,
        requisitionId: 0,
        vehicleId: ["", Validators.required],
        vehicleTypeId: "",
        requiredVehicleTypeId: "",
        requiredFor: [""],
        departmentId: "",
        companyId: 0,
        employeeId: "",
        driverId: ["", Validators.required],
        buyerId: "",
        assignedFor: ["1", Validators.required],
        usedType: ["Pickup & Drop", Validators.required],
        pickupLocation: ["", Validators.required],
        dropLocation: ["", Validators.required],
        noOfPerson: ["", Validators.required],
        totalNoOfPerson: [0, Validators.required],
        fromDate: ["", Validators.required],
        toDate: ["", Validators.required],
        status: ["Vehicle Assign", Validators.required],
        purpose: ["", Validators.required],
        remarks: [""],
        assignRemarks: [""],
        requisitionSplit: ["NO"],
        brandId: [""],
        modelId: [""],
        fuelType: [""],
        modelYear: [""],
        engineNumber: [""],
        chassisNumber: [""],
        engineCc: [""],
        tyreSize: [""],
        battery: [""],
        totalSeat: [""],
        color: [""],
        fuelCapacity: [""],
        vehicleStatus: ["1"]
      });
      this.ButtonName = "Vehicle Assign";
      this.assignedFor("1");
      this.VehicleAssign(this.VehicleRequisitionModel);

    }
    else {
      this.InitializeForm();
    }
  }

  VehicleAssign(rowData: VehicleRequisitionModel) {
    const datepipe: DatePipe = new DatePipe('en-US')
    this.AssignForm.patchValue({
      assignmentId: 0,
      requisitionId: rowData.requisitionId,
      assignedType: 3,
      assignedFor: rowData.requisitionFor,
      buyerId: rowData.buyerId,
      companyId: rowData.companyId,
      fromDate: rowData.startTime,
      toDate: rowData.endTime,
      remarks: rowData.remarks,
      status: rowData.status,
      usedType: rowData.usedType,
      pickupLocation: rowData.pickupLocation,
      dropLocation: rowData.dropLocation,
      noOfPerson: rowData.noOfPerson,
      requiredVehicleTypeId: rowData.vehicleTypeId,
      requiredFor: rowData.requiredFor,
      purpose: rowData.purpose,
      totalNoOfPerson: rowData.totalNoOfPerson,

    });
    this.ButtonName = "Vehicle Assign";
    this.assignedFor(rowData.requisitionFor.toString());
    this.setRefaranceDate(rowData.requisitionId, rowData.requisitionFor);
    this.LoadRequisitionLogList(rowData.requisitionId);
  }


  LoadVehicle() {
    this.service.GetVehicleList().subscribe(
      (data: any[]) => {
        console.log(data);
        this.AllVehicleList = data.filter(s => s.status == "Free");
        console.log("all vehicle", this.AllVehicleList);
      }
    );
  }
  GetAssignedVehicle() {
    this.service.GetVehicleAssign().subscribe(
      (data: any[]) => {
        this.AssignedVehicleList = data;
      }
    );
  }
  GetAssignedDriver() {
    this.service.GetDriverAssignmentList().subscribe(
      (data: any[]) => {
        this.AllDriverAssignmentList = data;
      }
    );
  }
  FindAssignedVehicle() {
    var vehicleList = this.AllVehicleList.find(v => v.vehicleId === this.AssignForm.value.vehicleId && v.status == "Assigned");
    if (vehicleList) {
      this.toastr.warning('Vehicle is already assigned');
      this.isVehicleFree = false;
    }
    else {
      this.isVehicleFree = true;
    }
  }

  FindSeatFull() {
    var selectedVehicleAssignForm = this.AllVehicleList.find(v => v.vehicleId === this.AssignForm.value.vehicleId);
    if (selectedVehicleAssignForm.totalSeat >= this.AssignForm.value.totalNoOfPerson) {
      this.isSeatFull = false;
    }
    else {
      this.isSeatFull = true;
      this.toastr.warning('Seat Capacity exceeded');
    }
  }
  selectDriver() {
    var selectedVehicle = this.AllDriverAssignmentList.find(d => d.vehicleId === this.AssignForm.value.vehicleId && d.status == "Free");
    if (selectedVehicle) {
      this.isDriverFree = true;
      this.AssignForm.patchValue({
        driverId: selectedVehicle.driverId
      });

      // this.VehicleAssignmentModel.driverId = parseInt(selectedVehicle.driverId);
    }
    else {
      this.toastr.warning('No Driver assigned for the vehicle');
      this.isDriverFree = false;
    }
  }
  Onsubmit(selectedVehicle: any[]) {
    if (this.AssignForm.valid) {
      this.VehicleAssignmentModel = this.AssignForm.value;
      this.VehicleAssignmentModel.assignedType = 3;
      this.VehicleAssignmentModel.requisitionId = this.VehicleRequisitionModel.requisitionId
      this.VehicleAssignmentModel.assignedFor = parseInt(this.AssignForm.value.assignedFor);
      this.VehicleAssignmentModel.noOfPerson = parseInt(this.AssignForm.value.totalNoOfPerson);
      this.VehicleAssignmentModel.buyerId = parseInt(this.AssignForm.value.buyerId);
      this.VehicleAssignmentModel.driverId = parseInt(this.AssignForm.value.driverId);
      this.VehicleAssignmentModel.companyId = parseInt(this.AssignForm.value.companyId);
      this.VehicleAssignmentModel.status = (this.AssignForm.value.status === "Trip Reassigned by Transport Department") ? "Approved" : this.AssignForm.value.status;
      this.VehicleAssignmentModel.Departments = this.selectedDepartments;
      this.VehicleAssignmentModel.Employees = this.selectedEmployees;
      this.VehicleAssignmentModel.remarks = this.AssignForm.value.assignRemarks;

      this.FindAssignedVehicle();
      this.FindSeatFull();

      if (this.isVehicleFree && !this.isSeatFull) {

        this.service.VehicleAssign(this.VehicleAssignmentModel, selectedVehicle).subscribe(
          (res) => {

            if (res.succeeded) {
              //this.references = new Array();
              // if (this.VehicleAssignmentModel.Departments != null && (this.VehicleAssignmentModel.assignedFor == 3 || this.VehicleAssignmentModel.assignedFor == 1)) {
              //   for (var i = 0; i < this.VehicleAssignmentModel.Departments.length; i++) {
              //     console.log(this.VehicleAssignmentModel.Departments[i].value);
              //     this.references.push({
              //       referenceId: 0,
              //       referenceNumber: String(this.VehicleAssignmentModel.Departments[i].value),
              //       referenceSourceId: splitted[1].trim(),
              //       referenceType: "Assignment Department"
              //     });
              //   }
              // }
              // if (this.VehicleAssignmentModel.Employees != null && (this.VehicleAssignmentModel.assignedFor == 6)) {
              //   for (var i = 0; i < this.VehicleAssignmentModel.Employees.length; i++) {
              //     console.log(this.VehicleAssignmentModel.Employees[i].value);
              //     this.references.push({
              //       referenceId: 0,
              //       referenceNumber: String(this.VehicleAssignmentModel.Employees[i].value),
              //       referenceSourceId: splitted[1].trim(),
              //       referenceType: "Assignment Employee"
              //     });
              //   }
              // }
              // if (this.references != null) {
              //   for (var i = 0; i < this.references.length; i++) {
              //     this.service.CreateRefference(this.references[i]).subscribe(
              //       (res) => {
              //         console.log(res);
              //       },
              //       (error) => {
              //         this.toastr.error("Failed To Requisition Vehicle Assignment Department/Employee");
              //         console.log(error);
              //       }
              //     );
              //   }
              // }
              this.displayAssignChange.emit(false);
              this.SelectedVehicleChange.emit([]);
              this.loadVehicleRequisition.emit();
              this.VehicleRequisitionModel = null;
              this.VehicleAssignmentModel = null;
              this.Clear();
              this.toastr.success("Requisition Vehicle Assignment \n" + res.message);
              this.ButtonName = "Requisition Assign";
            } else {
              this.toastr.error("Failed To Requisition Vehicle Assignment \n" + res.message);
            }
          },
          (error) => {
            this.toastr.error("Failed To Requisition Vehicle Assignment");
            console.log(error);
          }
        );
      }

    } else {
      this.toastr.warning("Please Enter Required Field");
    }

  }

  setRefaranceDate(refaranceId: number, requisitionFor: number) {
    this.service.GetTMSReferenceList().subscribe(
      (data: any[]) => {
        console.log(data);
        let vfilter = { 'referenceType': ['Requisition Employee', 'Requisition Department'], "referenceSourceId": [String(refaranceId)] }
        this.allReferenceList = data;
        this.selectedEmployees = new Array();
        this.selectedDepartments = new Array();
        this.allReferenceList = this.allReferenceList.filter(item => {
          return Object.keys(vfilter)
            .filter(_ => vfilter.hasOwnProperty(_))
            .every(key => {
              if (!item[key]) return true; // matches undefined value
              const arrayValues = vfilter[key] as any[];
              return arrayValues.some(_ => _ === item[key]);
            });
        });
        for (var i = 0; i < this.allReferenceList.length; i++) {
          if (requisitionFor == 6) {

            this.selectedEmployees.push({
              label: this.allReferenceList[i].referenceNumberName,
              value: this.allReferenceList[i].referenceNumber,
            });
          }
          if (requisitionFor == 3 || requisitionFor == 1) {
            this.selectedDepartments.push({
              label: this.allReferenceList[i].referenceNumberName,
              value: this.allReferenceList[i].referenceNumber,
            });
          }

        }

      },
      (error) => {
        this.toastr.error("Failed To Get Vehicle Requisition Department/Employee");
        console.log(error);
      }
    );
  }

  changeassignedFor(e) {
    console.log(e.target.value);
    this.assignedFor(e.target.value);

  }

  onOptionsVehicleSelected() {
    console.log("the selected value is " + this.AssignForm.value.vehicleId);
    this.Vehicles(this.AssignForm.value.vehicleId);
  }

  assignedFor(event: string) {
    this.isBuyer = false;
    this.isCompany = false;
    this.isDepartment = false;
    this.isDivision = false;
    this.isEmployee = false;
    console.log(event);
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
    }

  }

  Vehicles(value: string) {

    this.service.GetVehicleList().subscribe(
      (data: any[]) => {
        this.VehicleCreateModelList = data;

        this.VehicleCreateModelList = this.VehicleCreateModelList.filter(s => s.vehicleId == parseInt(value));
        if (this.VehicleCreateModelList.length == 1) {
          this.vehicleCreateModel = this.VehicleCreateModelList[0];
          this.AssignForm.patchValue({
            vehicleTypeId: this.vehicleCreateModel.vehicleTypeId,
            brandId: this.vehicleCreateModel.brandId,
            modelId: this.vehicleCreateModel.modelId,
            fuelType: this.vehicleCreateModel.fuelType,
            modelYear: this.vehicleCreateModel.modelYear,
            engineNumber: this.vehicleCreateModel.engineNumber,
            chassisNumber: this.vehicleCreateModel.chassisNumber,
            engineCc: this.vehicleCreateModel.engineCc,
            tyreSize: this.vehicleCreateModel.tyreSize,
            battery: this.vehicleCreateModel.battery,
            totalSeat: this.vehicleCreateModel.totalSeat,
            color: this.vehicleCreateModel.color,
            fuelCapacity: this.vehicleCreateModel.fuelCapacity,
          });
        }
      },
      (error) => {
        this.toastr.warning("No Data Found", "Vehicles");
      }
    );
  }

  LoadRequisitionLogList(value: number) {
    this.service.GetRequisitionLogList().subscribe(
      (data: any[]) => {
        this.AllRequisitionLogList = data;
        this.AllRequisitionLogList = this.AllRequisitionLogList.filter(s => s.requisitionId == value);
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Vehicle Requisition Log");
      }
    );
  }

  Clear() {
    this.VehicleRequisitionModel = null;
    this.VehicleAssignmentModel = null;
    this.AssignForm.reset();
    this.ButtonName = "Vehicle Assign";
    this.assignedFor("1");
  }
}


