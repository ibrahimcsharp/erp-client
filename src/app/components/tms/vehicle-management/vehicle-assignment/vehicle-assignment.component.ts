import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { GoogleMapComponent } from '../../dashboard/google-map/google-map.component';
import { ReferenceModel } from '../../model/common.model';
import { VehicleAssignmentModel } from '../../model/vehicle-assignment.model';
import { VehicleCreateModel } from '../../model/vehicle-entry.model';
import { TmsCommonService } from '../../service/tms-common.service';
import { VehicleManageService } from '../../service/vehicle-manage.service';

@Component({
  selector: 'app-vehicle-assignment',
  templateUrl: './vehicle-assignment.component.html',
  styleUrls: ['./vehicle-assignment.component.scss']
})
export class VehicleAssignmentComponent implements OnInit {
  @ViewChild("GoogleMap") child: GoogleMapComponent;
  VehicleAssignForm: FormGroup;
  ButtonName: string;
  noResult: boolean;
  isBuyer: boolean = false;
  isCompany: boolean = false;
  isDepartment: boolean = false;
  isDivision: boolean = false;
  isEmployee: boolean = false;
  VehicleAssignmentModelList: VehicleAssignmentModel[] = new Array();
  VehicleAssignmentModel: VehicleAssignmentModel;
  selectedEmployees: any[];
  selectedDepartments: any[];
  selectedRoadRoutes: any[];
  selectedVehicles: any[] = [];
  references: any;
  allReferenceList: ReferenceModel[] = new Array();
  displayGoogleMap: boolean;
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
    this.LoadVehicleAssign();
    this.commonService.LoadBuyerList();
    this.tmsService.LoadEmployee();
    this.tmsService.LoadDrivers();
    this.tmsService.LoadDepartment();
    this.tmsService.LoadRoadRoutes();
    this.commonService.LoadCompany();
  }
  InitializeForm() {
    this.VehicleAssignForm = this.fb.group({
      assignmentId: 0,
      requisitionId: 0,
      vehicleId: ["", Validators.required],
      departmentId: "",
      companyId: 0,
      employeeId: "",
      driverId: ["", Validators.required],
      roadRoutesId: [""],
      buyerId: [""],
      assignedType: ["4", Validators.required],
      assignedFor: ["1", Validators.required],
      usedType: ["Pickup & Drop", Validators.required],
      pickupLocation: ["", Validators.required],
      dropLocation: ["", Validators.required],
      noOfPerson: ["", Validators.required],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      status: ["1", Validators.required],
      remarks: [""]
    });
    this.ButtonName = "Save";
    this.assignedFor("1");
  }



  OnSubmit() {
    if (this.VehicleAssignForm.valid) {
      this.VehicleAssignmentModel = this.VehicleAssignForm.value;
      this.VehicleAssignmentModel.assignedType = parseInt(this.VehicleAssignForm.value.assignedType);
      this.VehicleAssignmentModel.assignedFor = parseInt(this.VehicleAssignForm.value.assignedFor);
      this.VehicleAssignmentModel.buyerId = parseInt(this.VehicleAssignForm.value.buyerId);
      this.VehicleAssignmentModel.driverId = parseInt(this.VehicleAssignForm.value.driverId);
      this.VehicleAssignmentModel.companyId = parseInt(this.VehicleAssignForm.value.companyId);
      this.VehicleAssignmentModel.status = this.VehicleAssignForm.value.status;
      this.VehicleAssignmentModel.Departments = this.selectedDepartments;
      this.VehicleAssignmentModel.Employees = this.selectedEmployees;

      this.service.VehicleAssign(this.VehicleAssignmentModelList, this.selectedVehicles).subscribe(
        (res) => {

          if (res.message.includes("SUCCESSFULLY")) {
            var splitted = res.message.split(":", 2);
            console.log(splitted);
            this.references = new Array();
            if (this.selectedRoadRoutes != null) {
              for (var i = 0; i < this.selectedRoadRoutes.length; i++) {
                console.log(this.selectedRoadRoutes[i].value);
                this.references.push({
                  referenceId: 0,
                  referenceNumber: String(this.selectedRoadRoutes[i].value),
                  referenceSourceId: splitted[1].trim(),
                  referenceType: "Assignment RoadRoutes"
                });
              }
            }
            if (this.VehicleAssignmentModel.Departments != null && (this.VehicleAssignmentModel.assignedFor == 3 || this.VehicleAssignmentModel.assignedFor == 1)) {
              for (var i = 0; i < this.VehicleAssignmentModel.Departments.length; i++) {
                console.log(this.VehicleAssignmentModel.Departments[i].value);
                this.references.push({
                  referenceId: 0,
                  referenceNumber: String(this.VehicleAssignmentModel.Departments[i].value),
                  referenceSourceId: splitted[1].trim(),
                  referenceType: "Assignment Department"
                });
              }
            }
            if (this.VehicleAssignmentModel.Employees != null && (this.VehicleAssignmentModel.assignedFor == 6)) {
              for (var i = 0; i < this.VehicleAssignmentModel.Employees.length; i++) {
                console.log(this.VehicleAssignmentModel.Employees[i].value);
                this.references.push({
                  referenceId: 0,
                  referenceNumber: String(this.VehicleAssignmentModel.Employees[i].value),
                  referenceSourceId: splitted[1].trim(),
                  referenceType: "Assignment Employee"
                });
              }
            }

            if (this.references != null) {
              for (var i = 0; i < this.references.length; i++) {
                this.service.CreateRefference(this.references[i]).subscribe(
                  (res) => {
                    console.log(res);
                  },
                  (error) => {
                    this.toastr.error("Failed To Save Vehicle Assignment Department/Employee");
                    console.log(error);
                  }
                );
              }
            }

            this.VehicleAssignmentModel = null;
            this.LoadVehicleAssign();
            this.Clear();
            this.toastr.success("Save Vehicle Assignment \n" + res.message);
            this.ButtonName = "Save";


          } else {
            this.toastr.error("Failed To Save Vehicle Assignment \n" + res.message);
          }
        },
        (error) => {
          this.toastr.error("Failed To Save Vehicle Assignment");
          console.log(error);
        }
      );
    } else {
      this.toastr.warning("Please Enter Required Field");
    }
  }

  LoadVehicleAssign() {
    this.service.GetVehicleAssign().subscribe(
      (data: any[]) => {
        console.log(data);
        this.VehicleAssignmentModelList = data;
        console.log(this.VehicleAssignmentModelList);
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Vehicle Assignment");
      }
    );
  }

  EditVehicleAssign(rowData: VehicleAssignmentModel) {
    const datepipe: DatePipe = new DatePipe('en-US')
    this.VehicleAssignForm.patchValue({
      assignmentId: rowData.assignmentId,
      vehicleId: rowData.vehicleId,
      assignedType: rowData.assignedType,
      assignedFor: rowData.assignedFor,
      employeeId: rowData.employeeId,
      driverId: rowData.driverId,
      buyerId: rowData.buyerId,
      companyId: rowData.companyId,
      departmentId: rowData.departmentId,
      fromDate: rowData.fromDate,
      toDate: rowData.toDate,
      remarks: rowData.remarks,
      status: rowData.status,
      usedType: rowData.usedType,
      pickupLocation: rowData.pickupLocation,
      dropLocation: rowData.dropLocation,
      noOfPerson: rowData.noOfPerson,
    });
    this.ButtonName = "Update";
    this.assignedFor(rowData.assignedFor.toString());
    this.setRefaranceDate(rowData.assignmentId, rowData.assignedFor);

  }


  changeassignedFor(e) {
    console.log(e.target.value);
    this.assignedFor(e.target.value);


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



  setRefaranceDate(refaranceId: number, assignedFor: number) {
    this.service.GetTMSReferenceList().subscribe(
      (data: any[]) => {
        console.log(data);
        let vfilter = { 'referenceType': ['Assignment Employee', 'Assignment Department', "Assignment RoadRoutes"], "referenceSourceId": [String(refaranceId)] }
        this.allReferenceList = data;
        this.selectedEmployees = new Array();
        this.selectedDepartments = new Array();
        this.selectedRoadRoutes = new Array();
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
          if (assignedFor == 6 && this.allReferenceList[i].referenceType === "Assignment Employee") {

            this.selectedEmployees.push({
              label: this.allReferenceList[i].referenceNumberName,
              value: this.allReferenceList[i].referenceNumber,
            });
          }
          if ((assignedFor == 3 || assignedFor == 1) && this.allReferenceList[i].referenceType === "Assignment Department") {
            this.selectedDepartments.push({
              label: this.allReferenceList[i].referenceNumberName,
              value: this.allReferenceList[i].referenceNumber,
            });
          }

          if (this.allReferenceList[i].referenceType === "Assignment RoadRoutes") {
            this.selectedRoadRoutes.push({
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

  Clear() {
    this.VehicleAssignForm = this.fb.group({
      assignmentId: 0,
      requisitionId: 0,
      departmentId: "",
      companyId: 0,
      employeeId: "",
      driverId: "",
      buyerId: "",
      vehicleId: "",
      assignedType: ["4"],
      assignedFor: ["1"],
      usedType: ["Pickup & Drop"],
      pickupLocation: [""],
      dropLocation: [""],
      roadRoutesId: [""],
      noOfPerson: [""],
      fromDate: [""],
      toDate: [""],
      status: ["1"],
      remarks: [""]
    });
    this.ButtonName = "Save";
    this.assignedFor("1");
  }

  openMap(rowData: VehicleAssignmentModel) {
    this.displayGoogleMap = true;
  }
}
