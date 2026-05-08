import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { VehicleRequisitionModel } from '../../model/vehicle-requisition.model';
import { VehicleManageService } from '../../service/vehicle-manage.service';
import { RequisitionCancelComponent } from '../requisition-cancel/requisition-cancel.component';
import { RequisitionPassengersViewComponent } from '../requisition-passengers-view/requisition-passengers-view.component';

@Component({
  selector: 'app-approve-passengers',
  templateUrl: './approve-passengers.component.html',
  styleUrls: ['./approve-passengers.component.scss']
})
export class ApprovePassengersComponent implements OnInit {
  @ViewChild("VehicleRequisitionDeatills") child: RequisitionPassengersViewComponent;
  @ViewChild("VehicleRequisitionCancel") childRequisitionCancel: RequisitionCancelComponent;
  VehicleRequisitionModelList: VehicleRequisitionModel[];
  displayCreate: boolean;
  displayCancel: boolean;
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
        this.VehicleRequisitionModelList = this.VehicleRequisitionModelList.filter(s => s.requisitionType.includes("Passengers")).filter(v => v.status.includes("Pending"));
      },
      (error) => {

      }
    );
  }
  onChildSubmit() {
    this.displayCancel = false;
    this.loadVehicleRequisition();
  }

  // approve(vehicleRequisitionModel: VehicleRequisitionModel) {
  //   this.childRequisitionCancel.RequisitionStatus = "Approved";
  //   this.childRequisitionCancel.VehicleRequisitionModel = vehicleRequisitionModel;
  //   this.childRequisitionCancel.InitializeFormFromParent();
  //   this.displayCancel = true;
  // }
  approve(rowData: VehicleRequisitionModel) {
    rowData.status = "Approved";
    this.service.VehicleRequisition(rowData).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success(" Vehicle Assigned Successfully");
        this.loadVehicleRequisition();
      },
      (error) => {
        this.toastr.error("Failed To Assign Vehicle");
        console.log(error);
      }
    );
  }
  reject(rowData: VehicleRequisitionModel) {
    this.childRequisitionCancel.RequisitionStatus = "Rejected By Team Leader";
    this.childRequisitionCancel.VehicleRequisitionModel = rowData;
    this.childRequisitionCancel.InitializeFormFromParent();
    this.displayCancel = true;
  }

  show(rowData: VehicleRequisitionModel) {
    this.child.VehicleRequisitionModel = rowData;
    this.child.InitializeFormFromParent();
    this.displayCreate = true;
  }

}
