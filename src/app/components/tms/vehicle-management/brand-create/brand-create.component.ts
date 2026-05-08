import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { BrandCreateModel } from '../../model/brand-create.model';
import { VehicleManageService } from '../../service/vehicle-manage.service';

@Component({
  selector: 'app-brand-create',
  templateUrl: './brand-create.component.html',
  styleUrls: ['./brand-create.component.scss']
})
export class BrandCreateComponent implements OnInit {
  @Output() tmsBrandList = new EventEmitter();
  BrandForm: FormGroup;
  ButtonName: string;
  AllBrandList: BrandCreateModel[] = new Array();
  BrandModel: BrandCreateModel;
  @Output() submitSuccess = new EventEmitter<void>();
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: VehicleManageService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.InitializeFormFromParent();
  }
  InitializeFormFromParent() {
    if (this.BrandModel) {
      this.BrandForm = this.fb.group({
        brandId: this.BrandModel.brandId,
        brandName: this.BrandModel.brandName,
        status: this.BrandModel.status,
        remarks: this.BrandModel.remarks
      });
    }
    else {
      this.InitializeForm();
    }

  }

  InitializeForm() {
    this.BrandForm = this.fb.group({
      brandId: 0,
      brandName: ["", Validators.required],
      status: ["1", Validators.required],
      remarks: [""]
    });
    this.ButtonName = "Save";
  }

  Onsubmit() {
    if (this.BrandForm.valid) {
      this.BrandModel = this.BrandForm.value;
      this.BrandModel.status = parseInt(this.BrandForm.value.status);
      this.service.BrandCreate(this.BrandModel).subscribe(
        (res) => {
          console.log(res);
          this.BrandModel = null;
          this.InitializeForm();
          this.toastr.success(res.message);
          this.tmsBrandList.emit();
          this.ButtonName = "Save";
          this.clear();
          this.submitSuccess.emit();
        },
        (error) => {
          this.BrandModel = null;
          this.InitializeForm();
          this.toastr.error("Failed To Save Brand");
        }
      );
    }
    else {
      this.toastr.warning("Enter Brand Name");
    }

  }


  clear() {
    this.BrandForm = this.fb.group({
      brandId: 0,
      brandName: ["", Validators.required],
      status: ["1", Validators.required],
      remarks: [""]
    })
    this.ButtonName = "Save";
  }

}
