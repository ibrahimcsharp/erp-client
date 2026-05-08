import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { RouteCreateModel } from '../../model/route-create.model';
import { TmsCommonService } from '../../service/tms-common.service';

@Component({
  selector: 'app-route-create',
  templateUrl: './route-create.component.html',
  styleUrls: ['./route-create.component.scss']
})
export class RouteCreateComponent implements OnInit {
  @Output() tmsRouteList = new EventEmitter();
  RouteForm: FormGroup;
  ButtonName: string;
  AllRouteList: RouteCreateModel[] = new Array();
  RouteModel: RouteCreateModel;
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: TmsCommonService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.InitializeFormFromParent();
  }
  InitializeFormFromParent() {
    if (this.RouteForm) {
      this.RouteForm = this.fb.group({
        routeId: this.RouteModel.routeId,
        brandName: this.RouteModel.routeName,
        fare: this.RouteModel.fare,
        status: this.RouteModel.status,
        remarks: this.RouteModel.remarks
      });
    }
    else {
      this.InitializeForm();
    }
  }

  InitializeForm() {
    this.RouteForm = this.fb.group({
      routeId: 0,
      routeName: ["", Validators.required],
      fare: 0,
      status: ["1", Validators.required],
      remarks: [""]
    });
    this.ButtonName = "Save";
  }

  Onsubmit() {
    if (this.RouteForm.valid) {
      this.RouteModel = this.RouteForm.value;
      console.log('Submitted Data');
      this.RouteModel.status = parseInt(this.RouteForm.value.status);
      console.log(this.RouteModel);
      this.service.RouteCreate(this.RouteModel).subscribe(
        (res) => {
          console.log(res);
          this.RouteModel = null;
          this.InitializeForm();
          this.toastr.success(res.message);
          this.tmsRouteList.emit();
          this.ButtonName = "Save";
          this.clear();
        },
        (error) => {
          this.RouteModel = null;
          this.InitializeForm();
          this.toastr.error("Failed To Save Brand");
          console.log(error);
        }
      );
    }
    else {
      this.toastr.warning("Enter Brand Name");
    }

  }

  clear() {
    this.RouteForm = this.fb.group({
      routeId: 0,
      routeName: ["", Validators.required],
      fare: 0,
      status: ["1", Validators.required],
      remarks: [""]
    })
    this.ButtonName = "Save";
  }











}
