import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { TmsModel } from '../../model/tms-model.model';
import { VehicleManageService } from '../../service/vehicle-manage.service';

@Component({
  selector: 'app-rental_management-suppliers',
  templateUrl: './rental_management-suppliers.component.html',
  styleUrls: ['./rental_management-suppliers.component.scss']
})
export class rental_managementSuppliersComponent implements OnInit {

  rental_managementSuppliersForm: FormGroup;
  ButtonName: string;
  AllModelList: TmsModel[] = new Array();
  TmsModel: TmsModel;
  noResult: boolean;
  constructor(public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: VehicleManageService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.InitializeForm();
  }

  InitializeForm() {

    this.rental_managementSuppliersForm = this.fb.group({
      SupplierName: ["", Validators.required],
      ShortName: 0,
      SupplierType: null,
      remarks: [""]
    });
    this.ButtonName = "Save";
  }


}
