import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { VehicleRequisitionModel } from '../../model/vehicle-requisition.model';
import { VehicleManageService } from '../../service/vehicle-manage.service';
import { RequisitionPassengersViewComponent } from '../requisition-passengers-view/requisition-passengers-view.component';
import { TripCompleteTransactionComponent } from '../trip-complete-transaction/trip-complete-transaction.component';
import { RequisitionCancelComponent } from '../requisition-cancel/requisition-cancel.component';
import { VehicleAssignmentModel } from '../../model/vehicle-assignment.model';


@Component({
  selector: 'app-trip-complete-passengers',
  templateUrl: './trip-complete-passengers.component.html',
  styleUrls: ['./trip-complete-passengers.component.scss']
})
export class TripCompletePassengersComponent implements OnInit {
  @ViewChild("VehicleRequisitionDeatills") childRequisitionDeatills: RequisitionPassengersViewComponent;
  @ViewChild("TripComplete") child: TripCompleteTransactionComponent;

  AssignForm: FormGroup;
  CancelForm: FormGroup;
  VehicleAssignModelList: VehicleAssignmentModel[];
  VehicleAssignmentModel: VehicleAssignmentModel;
  displayCreate: boolean;
  displayCancel: boolean = false;
  displayRevise: boolean = false;

  isBuyer: boolean = false;
  isCompany: boolean = false;
  isDepartment: boolean = false;
  isDivision: boolean = false;
  isEmployee: boolean = false;
  isCustomer: boolean = false;
  VehicleRequisitionModelList: VehicleRequisitionModel[];
  displayRequisitionDeatills: boolean;
  AssignmentViewForm: FormGroup;
  ButtonName: string = "Submit";
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: VehicleManageService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.GetAssignedList();
    this.InitializeCancelForm();
  }

  InitializeCancelForm() {
    this.CancelForm = this.fb.group({
      reason: ["", Validators.required]
    });
  }

  onChildSubmit() {
    this.GetAssignedList();
    this.displayCreate = false;
  }
  GetAssignedList() {
    this.service.GetVehicleAssign().subscribe(
      (data: any[]) => {
        console.log("AsiignList:", data);
        //this.VehicleAssignModelList = data.filter(v => v.status == "Approved" || v.status == "Pending");
        this.VehicleAssignModelList = data.filter(v => v.status.includes("Approved") || v.status.includes("Pending"));

      }
    );
  }
  loadVehicleRequisition(rowData: VehicleAssignmentModel) {
    this.service.GetAllVehicleRequisitionList().subscribe(
      (data: any[]) => {
        console.log("Raw Requisition Data", data);
        this.VehicleRequisitionModelList = data.filter(s => s.requisitionType.includes("Passengers"))
          .filter(v => v.status.includes("Vehicle Assigned"))
          .filter(v => v.vehicleAssignMstId == rowData.assignmentId);
        console.log("Filtered Requisition Data", this.VehicleRequisitionModelList);
      },
      (error) => {

      }
    );
  }



  tripComplete(rowData: VehicleAssignmentModel) {
    this.child.assignmentId = rowData.assignmentId;
    this.child.InitializeFormFromParent();
    this.child.ButtonName = "Save";
    this.displayCreate = true;
  }

  tripReject(rowData: VehicleAssignmentModel) {
    this.VehicleAssignmentModel = rowData;
    this.displayCancel = true;
  }

  tripReassign(rowData: VehicleAssignmentModel) {
    this.displayRevise = true;
    this.service.ReassignTripComplete(rowData.assignmentId).subscribe(
      (res) => {
        if (res.succeeded == true) {
          this.toastr.success("Trip Reassign Successfully");
          this.GetAssignedList();
          this.VehicleAssignmentModel = null;
        }
        else {
          this.toastr.error("Failed To Reassign Trip");
        }
      }
    );
  }

  cancel() {
    this.displayCancel = false;
    this.service.CancelTripComplete(this.VehicleAssignmentModel.assignmentId, this.CancelForm.value.reason).subscribe(
      (res) => {
        console.log(res);
        if (res.succeeded == true) {
          this.toastr.success("Trip Cancelled Successfully");
          this.CancelForm.reset();
          this.GetAssignedList();
          this.VehicleAssignmentModel = null;
        }
        else {
          this.toastr.error("Failed To Trip Cancelled");
        }
      }
    );
  }

  clearCancelForm() {
    this.CancelForm = this.fb.group({
      reason: ""
    });

  }

  show(rowData: VehicleAssignmentModel) {
    this.loadVehicleRequisition(rowData);
    this.displayRequisitionDeatills = true;
  }

}
