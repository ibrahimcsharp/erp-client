import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { VehicleRequisitionModel } from '../../model/vehicle-requisition.model';
import { VehicleManageService } from '../../service/vehicle-manage.service';

@Component({
  selector: 'app-requisition-cancel',
  templateUrl: './requisition-cancel.component.html',
  styleUrls: ['./requisition-cancel.component.scss']
})
export class RequisitionCancelComponent implements OnInit {
  RequisitionPasserngersCancelForm: FormGroup;
  VehicleRequisitionModel: VehicleRequisitionModel;
  vehicleRequisitionModel: VehicleRequisitionModel;
  ButtonName: string;
  RequisitionStatus: string;
  @Output() submitSuccess = new EventEmitter<void>();
  constructor(
    private fb: FormBuilder,
    public service: VehicleManageService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.InitializeFormFromParent();
  }

  InitializeForm() {
    this.RequisitionPasserngersCancelForm = this.fb.group({
      reason: ["", Validators.required]
    });
  }

  InitializeFormFromParent() {
    this.InitializeForm();
    if (this.VehicleRequisitionModel) {
      this.ButtonName = "Submit";
    }
  }

  cancel() {
    this.vehicleRequisitionModel = this.RequisitionPasserngersCancelForm.value;
    this.VehicleRequisitionModel.reason = this.vehicleRequisitionModel.reason;
    this.VehicleRequisitionModel.status = this.RequisitionStatus;
    this.service.VehicleRequisition(this.VehicleRequisitionModel).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success(this.RequisitionStatus + " Vehicle Requisition Passengers");
        this.VehicleRequisitionModel = null;
        this.submitSuccess.emit();
        this.clear();
      },
      (error) => {
        this.toastr.error("Failed To " + this.RequisitionStatus + " Vehicle Requisition Passengers");
        console.log(error);
      }
    );
  }

  clear() {
    this.RequisitionPasserngersCancelForm = this.fb.group({
      reason: ""
    });
    this.VehicleRequisitionModel = null;
  }

}
