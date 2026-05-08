import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { TypeCreateModel } from '../../model/vehicle-type.model';
import { VehicleManageService } from '../../service/vehicle-manage.service';

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.scss']
})
export class VehicleTypeComponent implements OnInit {
  @Output() typeModelList = new EventEmitter();
  @Output() submitSuccess = new EventEmitter<void>();
  TypeForm: FormGroup;
  ButtonName: string;
  AllTypeList: TypeCreateModel[] = new Array();
  TypeModel: TypeCreateModel;
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
    if (this.TypeModel) {
      this.TypeForm = this.fb.group({
        typeId: this.TypeModel.typeId,
        typeName: this.TypeModel.typeName,
        status: this.TypeModel.status,
        remarks: this.TypeModel.remarks
      });
    }
    else {
      this.InitializeForm();
    }
  }

  InitializeForm() {
    this.TypeForm = this.fb.group({
      typeId: 0,
      typeName: ["", Validators.required],
      status: [1, Validators.required],
      remarks: [""]
    });
    this.ButtonName = "Save";
  }

  Onsubmit() {
    if (this.TypeForm.valid) {
      this.TypeModel = this.TypeForm.value;
      this.TypeModel.status = parseInt(this.TypeForm.value.status);
      this.service.TypeCreate(this.TypeModel).subscribe(
        (res) => {
          this.toastr.success(res.message);
          this.typeModelList.emit();
          this.TypeModel = null;
          console.log(res);
          this.ButtonName = "Save";
          this.clear();
          this.submitSuccess.emit();
        },
        (error) => {
          this.toastr.error("Failed To Save Type");
          console.log(error);
        }
      );
    }
    else {
      this.toastr.warning("Please Enter Brand Name");
    }

  }



  clear() {
    this.TypeForm = this.fb.group({
      typeId: 0,
      typeName: [""],
      status: [1],
      remarks: [""]
    })
    this.ButtonName = "Save";
  }

}
