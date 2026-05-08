import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { VehicleRequisitionModel } from '../../model/vehicle-requisition.model';
import { VehicleManageService } from '../../service/vehicle-manage.service';

@Component({
  selector: 'app-approve-logistics',
  templateUrl: './approve-logistics.component.html',
  styleUrls: ['./approve-logistics.component.scss']
})
export class ApproveLogisticsComponent implements OnInit {

  VehicleRequisitionModelList: VehicleRequisitionModel[];

  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: VehicleManageService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.loadVehicleRequisition();
  }


  loadVehicleRequisition() {
    this.service.GetAllVehicleRequisitionList().subscribe(
      (data: any[]) => {
        console.log(data);
        this.VehicleRequisitionModelList = data;
        console.log(this.VehicleRequisitionModelList);
        this.VehicleRequisitionModelList = this.VehicleRequisitionModelList.filter(s => s.requisitionType.includes("Logistics")).filter(v => v.status.includes("Pending"));
      },
      (error) => {

      }
    );
  }


  approve(vehicleRequisitionModel: VehicleRequisitionModel) {
    vehicleRequisitionModel.status = "Approved";
    this.service.VehicleRequisition(vehicleRequisitionModel).subscribe(
      (res) => {
        console.log(res);
        vehicleRequisitionModel = null;
        this.loadVehicleRequisition()
        this.toastr.success("Approve Vehicle Requisition Logistics Suppoort");
      },
      (error) => {
        vehicleRequisitionModel = null;
        this.loadVehicleRequisition()
        this.toastr.error("Failed To Approve Vehicle Requisition Logistics Suppoort");
        console.log(error);
      }
    );
  }

  raject(vehicleRequisitionModel: VehicleRequisitionModel) {
    vehicleRequisitionModel.status = "Rejected";
    this.service.VehicleRequisition(vehicleRequisitionModel).subscribe(
      (res) => {
        console.log(res);
        vehicleRequisitionModel = null;
        this.loadVehicleRequisition()
        this.toastr.success("Rejected Vehicle Requisition Logistics Suppoort");
      },
      (error) => {
        vehicleRequisitionModel = null;
        this.loadVehicleRequisition()
        this.toastr.error("Failed To Rejected Vehicle Requisition Logistics Suppoort");
        console.log(error);
      }
    );
  }

}
