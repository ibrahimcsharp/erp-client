import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { VehicleRequisitionModel } from '../../model/vehicle-requisition.model';
import { VehicleManageService } from '../../service/vehicle-manage.service';
import { VehicleAssignmentModel } from '../../model/vehicle-assignment.model';

@Component({
  selector: 'app-trip-complete-transaction',
  templateUrl: './trip-complete-transaction.component.html',
  styleUrls: ['./trip-complete-transaction.component.scss']
})
export class TripCompleteTransactionComponent implements OnInit {
  TripCompleteForm: FormGroup;
  VehicleAssignmentModel: VehicleAssignmentModel[];
  VehicleRequisitionModel: VehicleRequisitionModel;
  ButtonName: string;
  assignmentId: number;
  @Output() submitSuccess = new EventEmitter<void>();
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: VehicleManageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.InitializeForm();
  }


  InitializeForm() {
    this.TripCompleteForm = this.fb.group({
      id: [0],
      totalKM: ["", Validators.required],
      driverCost: ["", Validators.required],
      fuelCost: ["", Validators.required],
      tollCost: ["", Validators.required],
      parkingCost: ["", Validators.required],
      otherCost: ["", Validators.required],
      assignmentId: [0],
    });
    this.ButtonName = "Submit";
  }

  InitializeFormFromParent() {
    if (this.VehicleRequisitionModel) {
      this.TripCompleteForm = this.fb.group({
        id: [0],
        totalKM: ["", Validators.required],
        driverCost: ["", Validators.required],
        fuelCost: ["", Validators.required],
        tollCost: ["", Validators.required],
        parkingCost: ["", Validators.required],
        otherCost: ["", Validators.required],
        assignmentId: [this.assignmentId],
      });
      this.ButtonName = "Save";
    }
    else {
      this.InitializeForm();
    }
  }

  Onsubmit() {
    this.TripCompleteForm.value.assignmentId = this.assignmentId;
    console.log("Assignment Id", this.assignmentId);
    if (this.TripCompleteForm.valid && this.assignmentId > 0) {
      this.service.CreateTripComplete(this.TripCompleteForm.value).subscribe(
        (res: any) => {
          if (res.succeeded) {
            this.toastr.success("Trip Complete Successfully");
            this.Clear();
            this.submitSuccess.emit();
          }
          else {
            this.toastr.error("Trip Complete Failed");
          }
        }
      );
    }
    else {
      this.toastr.warning("Please Select Trip Completed");
    }
  }

  Clear() {
    this.VehicleRequisitionModel = null;
    this.InitializeForm();
  }

}
