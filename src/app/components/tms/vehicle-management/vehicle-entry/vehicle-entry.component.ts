import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { GoogleMapComponent } from '../../dashboard/google-map/google-map.component';
import { TmsModel } from '../../model/tms-model.model';
import { VehicleCreateModel } from '../../model/vehicle-entry.model';
import { TmsCommonService } from '../../service/tms-common.service';
import { VehicleManageService } from '../../service/vehicle-manage.service';

@Component({
  selector: 'app-vehicle-entry',
  templateUrl: './vehicle-entry.component.html',
  styleUrls: ['./vehicle-entry.component.scss']
})
export class VehicleEntryComponent implements OnInit {
  @ViewChild("GoogleMap") child: GoogleMapComponent;
  VehicleEntryForm: FormGroup;
  ButtonName: string;
  allModelList: TmsModel[] = new Array();
  allModelListDropdown: any;
  VehicleCreateModel: VehicleCreateModel;
  VehicleCreateModelList: VehicleCreateModel[];
  noResult: boolean;
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
    this.tmsService.LoadVehicleBrands();
    this.tmsService.LoadVehicleTypes();
    this.tmsService.LoadVehicleModels();
    this.tmsService.LoadVehicleFuelTypes();
    this.commonService.LoadCompany();
    this.LoadVehicle();
  }

  InitializeForm() {
    this.VehicleEntryForm = this.fb.group({
      vehicleId: 0,
      registrationNumber: ["", Validators.required],
      ownershipType: ["Owned", Validators.required],
      registrationDate: [null, Validators.required],
      vehicleTypeId: ["", Validators.required],
      brandId: ["", Validators.required],
      modelId: ["", Validators.required],
      fuelType: ["", Validators.required],
      modelYear: [""],
      engineNumber: ["", Validators.required],
      chassisNumber: ["", Validators.required],
      engineCc: ["", Validators.required],
      tyreSize: [""],
      battery: [""],
      totalSeat: ["", Validators.required],
      color: ["", Validators.required],
      fuelCapacity: ["", Validators.required],
      companyId: [0, Validators.required],
      purchaseDate: null,
      purchaseMileage: [""],
      isDisposed: [""],
      disposeDate: null,
      trackerId: [""],
      status: [""],
      isActive: ["Y", Validators.required],
      remarks: [""]
    });
    this.ButtonName = "Save";
  }

  Onsubmit() {
    if (this.VehicleEntryForm.valid) {
      this.VehicleCreateModel = this.VehicleEntryForm.value;
      console.log(JSON.stringify(this.VehicleCreateModel));
      this.VehicleCreateModel.status = this.VehicleEntryForm.value.status;
      this.VehicleCreateModel.isDisposed = parseInt(this.VehicleEntryForm.value.isDisposed);
      this.VehicleCreateModel.companyId = (this.VehicleEntryForm.value.companyId).toString();
      console.log(this.VehicleCreateModel);
      this.service.VehicleCreate(this.VehicleCreateModel).subscribe(
        (res) => {
          if (res.succeeded) {
            this.toastr.success(res.message);
            console.log(res);
            this.Clear();
            this.LoadVehicle();
          }

        },
        (error) => {
          this.toastr.error("Failed To Save Vehicle");
          console.log(error);
        }
      );
    } else {
      this.toastr.warning("Please Enter Required Field");
    }
  }

  LoadVehicle() {
    this.service.GetVehicleList().subscribe(
      (data: any[]) => {
        this.VehicleCreateModelList = data;
        console.log("Created Vehicle List:", this.VehicleCreateModelList);
      },
      (error) => {
        this.toastr.warning("No Data Found", "Vehicles");
      }
    );
  }

  EditVehicles(rowData: VehicleCreateModel) {
    const datepipe: DatePipe = new DatePipe('en-US')
    console.log(rowData);
    this.VehicleEntryForm.patchValue({
      vehicleId: rowData.vehicleId,
      registrationNumber: rowData.registrationNumber,
      ownershipType: rowData.ownershipType,
      registrationDate: datepipe.transform(rowData.registrationDate, 'yyyy-MM-dd'),
      vehicleTypeId: rowData.vehicleTypeId,
      brandId: rowData.brandId,
      modelId: rowData.modelId,
      fuelType: rowData.fuelType,
      modelYear: rowData.modelYear,
      engineNumber: rowData.engineNumber,
      chassisNumber: rowData.chassisNumber,
      engineCc: rowData.engineCc,
      tyreSize: rowData.tyreSize,
      battery: rowData.battery,
      totalSeat: rowData.totalSeat,
      color: rowData.color,
      fuelCapacity: rowData.fuelCapacity,
      companyId: parseInt(rowData.companyId),
      purchaseDate: datepipe.transform(rowData.purchaseDate, 'yyyy-MM-dd'),
      purchaseMileage: rowData.purchaseMileage,
      isDisposed: rowData.isDisposed,
      disposeDate: datepipe.transform(rowData.disposeDate, 'yyyy-MM-dd'),
      trackerId: rowData.trackerId,
      status: rowData.status,
      remarks: rowData.remarks,
      isActive: rowData.isActive
    });
    this.ButtonName = "Update";
  }

  Clear() {
    this.InitializeForm();
  }

  openMap(rowData: VehicleCreateModel) {
    this.displayGoogleMap = true;
  }

  onOptionsBrandSelected() {
    console.log("the selected value is " + this.VehicleEntryForm.value.brandId);
    this.tmsService.LoadVehicleModelsByBrand(this.VehicleEntryForm.value.brandId);
    console.log(this.tmsService.allModelListDropdown);
  }

}
