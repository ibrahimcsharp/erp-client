import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
// import { EventEmitter } from 'stream';
import { BrandCreateModel } from '../../model/brand-create.model';
import { TmsModel } from '../../model/tms-model.model';
import { TmsCommonService } from '../../service/tms-common.service';
import { VehicleManageService } from '../../service/vehicle-manage.service';

@Component({
  selector: 'app-model-create',
  templateUrl: './model-create.component.html',
  styleUrls: ['./model-create.component.scss']
})
export class ModelCreateComponent implements OnInit {
  @Output() tmsModelList = new EventEmitter();
  @Output() submitSuccess = new EventEmitter<void>();
  ModelForm: FormGroup;
  ButtonName: string;
  AllModelList: TmsModel[] = new Array();
  TmsModel: TmsModel;
  noResult: boolean;

  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: VehicleManageService,
    private toastr: ToastrService,
    public tmsService: TmsCommonService,
  ) { }

  ngOnInit(): void {
    this.InitializeFormFromParen();
    this.tmsService.LoadVehicleBrands();
  }

  InitializeFormFromParen() {
    this.tmsService.LoadVehicleBrands();
    if (this.TmsModel) {
      this.ModelForm = this.fb.group({
        brandId: this.TmsModel.brandId,
        brandName: this.TmsModel.brandName,
        modelName: this.TmsModel.modelName,
        modelId: this.TmsModel.modelId,
        status: this.TmsModel.status,
        remarks: this.TmsModel.remarks
      });
    }
    else {
      this.InitializeForm();
    }


  }

  InitializeForm() {

    this.ModelForm = this.fb.group({
      brandId: ["", Validators.required],
      brandName: [""],
      modelName: ["", Validators.required],
      modelId: 0,
      status: ["1", Validators.required],
      remarks: [""]
    });
    this.ButtonName = "Save";
  }

  clear() {
    this.ModelForm = this.fb.group({
      brandId: "",
      brandName: [""],
      modelName: [""],
      modelId: 0,
      status: ["1"],
      remarks: [""]
    });
    this.ButtonName = "Save";
  }


  Onsubmit() {
    if (this.ModelForm.valid) {
      this.TmsModel = this.ModelForm.value;
      this.TmsModel.status = parseInt(this.ModelForm.value.status);
      this.service.ModelCreate(this.TmsModel).subscribe(
        (res) => {
          this.toastr.success(res.message);
          this.TmsModel = null;
          this.InitializeForm();
          this.tmsModelList.emit();
          this.ButtonName = "Save";
          console.log(res);
          this.clear();
          this.submitSuccess.emit();
        },
        (error) => {
          this.toastr.error("Failed To Save Model");
          console.log(error);
        }
      );
    }
    else {
      this.toastr.warning("Please Enter Required Field");
    }

  }
}
