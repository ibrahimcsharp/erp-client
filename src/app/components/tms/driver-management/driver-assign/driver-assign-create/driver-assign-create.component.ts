import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { DriverAssignedModel } from '../../../model/driver-assigned.model';
import { DriverInfoCreateModel } from '../../../model/driver-info.model';
import { VehicleCreateModel } from '../../../model/vehicle-entry.model';
import { VehicleManageService } from '../../../service/vehicle-manage.service';

@Component({
  selector: 'app-driver-assign-create',
  templateUrl: './driver-assign-create.component.html',
  styleUrls: ['./driver-assign-create.component.scss']
})
export class DriverAssignCreateComponent implements OnInit {
  @Output() DriverAssignmentList = new EventEmitter();
  DriverAssignmentForm: FormGroup;
  ButtonName: string;
  AllDriverAssignmentList: DriverAssignedModel[] = new Array();
  DriverAssignModel: DriverAssignedModel;
  formData: FormData;
  noResult = false;
  AllVehicleList: VehicleCreateModel[];
  AllVehicleDropdown: any;
  AllDriverModelList: DriverInfoCreateModel[] = new Array();
  AllDriverDropdown: any;
  @Output() submitSuccess = new EventEmitter<void>();
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: VehicleManageService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.InitializeFormFromParent();
    this.LoadVehicle();
    this.LoadDriver();
  }
  InitializeFormFromParent() {
    if (this.DriverAssignmentForm) {
      this.DriverAssignmentForm = this.fb.group({
        id: this.DriverAssignModel.id,
        driverId: this.DriverAssignModel.driverId,
        driverName: this.DriverAssignModel.driverName,
        vehicleId: this.DriverAssignModel.vehicleId,
        vehicleName: this.DriverAssignModel.vehicleName,
        assignFromDate: this.DriverAssignModel.assignFromDate,
        assignToDate: this.DriverAssignModel.assignToDate,
        remarks: this.DriverAssignModel.remarks,
      });
    }
    else {
      this.InitializeForm();
    }

  }
  InitializeForm() {
    this.DriverAssignmentForm = this.fb.group({
      id: [0],
      driverId: [0],
      driverName: [""],
      vehicleId: [0],
      vehicleName: [""],
      assignFromDate: [null],
      assignToDate: [null],
      remarks: [""],
    });
    this.ButtonName = "Save";
  }

  Onsubmit() {
    if (this.DriverAssignmentForm.valid) {
      this.DriverAssignModel = this.DriverAssignmentForm.value;
      console.log('Submitted Data');
      console.log(this.DriverAssignModel);
      this.service.DriverAssignmentCreate(this.DriverAssignModel).subscribe(
        (res) => {
          console.log(res);
          this.DriverAssignModel = null;
          this.InitializeForm();
          this.toastr.success("Driver Saved Successfully");
          this.DriverAssignmentList.emit();
          this.ButtonName = "Save";
          this.submitSuccess.emit();
        },
        (error) => {
          this.DriverAssignModel = null;
          this.InitializeForm();
          this.toastr.error("Failed To Save Driver");
          console.log(error);
        }
      );
    }
    else {
      this.commonService.ValidationShow(this.DriverAssignmentForm);
    }
  }
  LoadVehicle() {
    this.service.GetVehicleList().subscribe(
      (data: any[]) => {
        console.log(data);
        this.AllVehicleList = data;
        this.AllVehicleDropdown = new Array();
        this.AllVehicleDropdown.push({ label: "Select", value: 0 });
        for (var i = 0; i < this.AllVehicleList.length; i++) {
          this.AllVehicleDropdown.push({
            label: this.AllVehicleList[i].registrationNumber + " - " + this.AllVehicleList[i].vehicleType,
            value: this.AllVehicleList[i].vehicleId,
          });
        }
      },
      (error) => {
        this.toastr.warning("No Data Found", "Vehicle");

      }
    );
  }
  onSelectDriver(event: TypeaheadMatch): void {
    this.DriverAssignmentForm.patchValue({
      driverId: event.item.value,
      driverName: event.item.label
    });

  }
  //style No result found
  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.DriverAssignmentForm.patchValue({
        driverName: "",
        driverId: null
      });
      const control = this.DriverAssignmentForm.get('driverName');            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    }
  }
  onSelectVehicle(event: TypeaheadMatch): void {
    this.DriverAssignmentForm.patchValue({
      vehicleId: event.item.value,
      vehicleName: event.item.label
    });

  }
  //style No result found
  typeaheadNoResultsVehicle(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.DriverAssignmentForm.patchValue({
        vehicleName: "",
        vehicleId: null
      });
      const control = this.DriverAssignmentForm.get('vehicleName');            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    }
  }

  LoadDriver() {
    this.service.GetDriverInfoList().subscribe(
      (data: any[]) => {
        if (data.length > 0) {
          this.AllDriverModelList = data;
          console.log(this.AllDriverModelList);
          this.AllDriverDropdown = new Array();
          this.AllDriverDropdown.push({ label: "Select", value: 0 });
          for (var i = 0; i < this.AllDriverModelList.length; i++) {
            this.AllDriverDropdown.push({
              label: this.AllDriverModelList[i].employeeName,
              value: this.AllDriverModelList[i].infoId,
            });
          }
        }
        else {
          this.toastr.warning("No Data Found", "Driver");
        }
      },
    );
  }

  clear() {
    this.DriverAssignModel = null;
    this.InitializeForm();
  }
}
