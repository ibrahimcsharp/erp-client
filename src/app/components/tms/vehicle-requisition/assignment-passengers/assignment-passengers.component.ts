import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { VehicleRequisitionModel } from '../../model/vehicle-requisition.model';
import { VehicleManageService } from '../../service/vehicle-manage.service';
import { AssignComponent } from '../assign/assign.component';
import { RequisitionCancelComponent } from '../requisition-cancel/requisition-cancel.component';
import { RequisitionPassengersViewComponent } from '../requisition-passengers-view/requisition-passengers-view.component';

@Component({
  selector: 'app-assignment-passengers',
  templateUrl: './assignment-passengers.component.html',
  styleUrls: ['./assignment-passengers.component.scss']
})
export class AssignmentPassengersComponent implements OnInit {
  @ViewChild("VehicleRequisitionDeatills") child: RequisitionPassengersViewComponent;
  @ViewChild("VehicleRequisitionCancel") childRequisitionCancel: RequisitionCancelComponent;
  @ViewChild("VehicleAssign") childAssign: AssignComponent;
  VehicleRequisitionModelList: VehicleRequisitionModel[];
  displayCreate: boolean;
  displayAssign: boolean;
  displayCancel: boolean;
  SelectedVehicle: VehicleRequisitionModel[] = [];
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: VehicleManageService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.loadVehicleRequisition();
  }


  loadVehicleRequisition() {
    this.service.GetAllVehicleRequisitionListForAssing().subscribe(
      (data: any[]) => {
        let vfilter = { 'status': ['Approved', 'Trip Reassigned by Transport Department'], 'requisitionType': ['Passengers'] }
        this.VehicleRequisitionModelList = data;
        console.log(this.VehicleRequisitionModelList);
        this.VehicleRequisitionModelList = this.VehicleRequisitionModelList.filter(item => {
          return Object.keys(vfilter)
            .filter(_ => vfilter.hasOwnProperty(_))
            .every(key => {
              if (!item[key]) return true; // matches undefined value
              const arrayValues = vfilter[key] as any[];
              return arrayValues.some(_ => _ === item[key]);
            });
        });

      },
      (error) => {

      }
    );
  }

  onChildSubmit() {
    this.displayCancel = false;
    this.loadVehicleRequisition();
  }

  assign() {
    this.childAssign.VehicleRequisitionModel = this.SelectedVehicle[0];
    this.childAssign.VehicleRequisitionModel.totalNoOfPerson = this.SelectedVehicle.reduce((sum, list) => sum + list.noOfPerson, 0);
    this.childAssign.InitializeFormFromParent();
    this.childAssign.ButtonName = "Requisition Assign";
    this.displayAssign = true;
  }

  reject(vehicleRequisitionModel: VehicleRequisitionModel) {
    this.childRequisitionCancel.RequisitionStatus = "Rejected By Transport Deparment";
    this.childRequisitionCancel.VehicleRequisitionModel = vehicleRequisitionModel;
    this.childRequisitionCancel.InitializeFormFromParent();
    this.displayCancel = true;
  }

  show(vehicleRequisitionModel: VehicleRequisitionModel) {
    this.child.VehicleRequisitionModel = vehicleRequisitionModel;
    this.child.InitializeFormFromParent();
    this.displayCreate = true;
  }

}
