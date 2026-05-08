import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { VehicleRequisitionModel } from '../../model/vehicle-requisition.model';
import { VehicleManageService } from '../../service/vehicle-manage.service';

@Component({
  selector: 'app-pending-logistics',
  templateUrl: './pending-logistics.component.html',
  styleUrls: ['./pending-logistics.component.scss']
})
export class PendingLogisticsComponent implements OnInit {

  VehicleRequisitionModelList: VehicleRequisitionModel[];

  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: VehicleManageService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    //this.loadVehicleRequisition();
  }


  loadVehicleRequisition() {
    this.service.GetAllVehicleRequisitionList().subscribe(
      (data: any[]) => {
        console.log(data);
        this.VehicleRequisitionModelList = data;
        console.log(this.VehicleRequisitionModelList);
        this.VehicleRequisitionModelList = this.VehicleRequisitionModelList.filter(s => s.requisitionType.includes("Logistics"));
      },
      (error) => {

      }
    );
  }

  cancel(vehicleRequisitionModel: VehicleRequisitionModel) {
    vehicleRequisitionModel.status = "Cancel";
    this.service.VehicleRequisition(vehicleRequisitionModel).subscribe(
      (res) => {
        console.log(res);
        vehicleRequisitionModel = null;
        this.loadVehicleRequisition()
        this.toastr.success("Cancel Vehicle Requisition Logistics Support");
      },
      (error) => {
        vehicleRequisitionModel = null;
        this.loadVehicleRequisition()
        this.toastr.error("Failed To Cancel Vehicle Requisition Logistics Support");
        console.log(error);
      }
    );
  }

  show(vehicleRequisitionModel: VehicleRequisitionModel) {

  }

}
