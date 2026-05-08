import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { VehicleRequisitionModel } from '../../model/vehicle-requisition.model';
import { VehicleManageService } from '../../service/vehicle-manage.service';

@Component({
  selector: 'app-assignment-logistics',
  templateUrl: './assignment-logistics.component.html',
  styleUrls: ['./assignment-logistics.component.scss']
})
export class AssignmentLogisticsComponent implements OnInit {

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
        this.VehicleRequisitionModelList = this.VehicleRequisitionModelList.filter(s => s.requisitionType.includes("Logistics")).filter(v => v.status.includes("Approved"));
      },
      (error) => {

      }
    );
  }

}
