import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { ToastrService } from 'ngx-toastr';
import { VehicleRequisitionModel } from '../../model/vehicle-requisition.model';
import { VehicleManageService } from '../../service/vehicle-manage.service';
import { TmsCommonService } from '../../service/tms-common.service';

@Component({
  selector: 'app-requisition-logistics',
  templateUrl: './requisition-logistics.component.html',
  styleUrls: ['./requisition-logistics.component.scss']
})
export class RequisitionLogisticsComponent implements OnInit {

  RequisitionLogisticsForm: FormGroup;
  ButtonName: string;
  isBuyer: boolean = false;
  isCompany: boolean = false;
  isDepartment: boolean = false;
  isDivision: boolean = false;
  isEmployee: boolean = false;
  isCustomer: boolean = false;
  VehicleRequisitionModel: VehicleRequisitionModel;
  selectedEmployees: any[];
  selectedDepartments: any[];
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
  }


  InitializeForm() {
    this.RequisitionLogisticsForm = this.fb.group({
      requisitionId: 0,
      departmentId: "",
      companyId: 0,
      employeeId: "",
      buyerId: "",
      vehicleTypeId: ["", Validators.required],
      requisitionFor: ["1", Validators.required],
      requiredFor: ["Export", Validators.required],
      goodsWeight: ["", Validators.required],
      customerName: [""],
      pickupLocation: ["", Validators.required],
      dropLocation: ["", Validators.required],
      loadingCapacity: ["1.5 Ton", Validators.required],
      goodsDetails: ["", Validators.required],
      storeName: ["", Validators.required],
      startTime: ["", Validators.required],
      remarks: [""]
    });
    this.ButtonName = "Save";
    this.assignedFor("1");
    this.selectedEmployees = null;
    this.selectedDepartments = null;
  }


  Onsubmit() {
    if (this.RequisitionLogisticsForm.valid) {
      this.VehicleRequisitionModel = this.RequisitionLogisticsForm.value;
      console.log('Submitted Data');
      this.VehicleRequisitionModel.status = "Pending";
      this.VehicleRequisitionModel.reason = "Logistics Support Requisition";
      this.VehicleRequisitionModel.requisitionType = "Logistics";
      this.VehicleRequisitionModel.vehicleTypeId = parseInt(this.RequisitionLogisticsForm.value.vehicleTypeId);
      this.VehicleRequisitionModel.buyerId = parseInt(this.RequisitionLogisticsForm.value.buyerId);
      this.VehicleRequisitionModel.companyId = parseInt(this.RequisitionLogisticsForm.value.companyId);

      console.log(this.VehicleRequisitionModel);
      this.service.VehicleRequisition(this.VehicleRequisitionModel).subscribe(
        (res) => {
          console.log(res);
          this.VehicleRequisitionModel = null;
          this.InitializeForm();
          this.toastr.success(res.message);
          this.ButtonName = "Save";
        },
        (error) => {
          this.toastr.error("Failed To Save Vehicle Requisition Logistics Support");
          console.log(error);
        }
      );
    }
    else {
      this.toastr.warning("Enter Vehicle Requisition Logistics Support Information");
    }

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
    this.isCustomer = false;
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
    } else if (event == '7') {
      this.isCustomer = true;
    }

  }

  clear() {
    this.RequisitionLogisticsForm = this.fb.group({
      requisitionId: 0,
      departmentId: "",
      companyId: 0,
      employeeId: "",
      buyerId: "",
      vehicleId: "",
      vehicleTypeId: [""],
      requiredFor: ["Export"],
      requisitionFor: ["1"],
      goodsWeight: [""],
      customerName: [""],
      pickupLocation: [""],
      dropLocation: [""],
      loadingCapacity: ["1.5 Ton"],
      goodsDetails: [""],
      storeName: [""],
      startTime: [""],
      remarks: [""]
    });
    this.ButtonName = "Save";
    this.assignedFor("1");
    this.selectedEmployees = null;
    this.selectedDepartments = null;
  }

}
