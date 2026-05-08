import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { BrandCreateModel } from '../../model/brand-create.model';
import { VehicleManageService } from '../../service/vehicle-manage.service';
import { BrandCreateComponent } from '../brand-create/brand-create.component';

@Component({
  selector: 'app-brand-create-list',
  templateUrl: './brand-create-list.component.html',
  styleUrls: ['./brand-create-list.component.scss']
})
export class BrandCreateListComponent implements OnInit {
  @ViewChild("CreateTmsBrand") child: BrandCreateComponent;
  ButtonName: string;
  AllBrandList: BrandCreateModel[] = new Array();
  BrandModel: BrandCreateModel;
  displayCreate: boolean;
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: VehicleManageService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.LoadBrands();
  }

  LoadBrands() {
    this.service.GetBrandList().subscribe(
      (data: any[]) => {
        console.log(data);
        this.AllBrandList = data;
        console.log(this.AllBrandList);

      },
      (error) => {
        this.toastr.warning("No Data Found", "Brand");

      }
    );
  }
  onChildSubmit() {
    this.displayCreate = false;
  }
  OpenNew() {
    this.displayCreate = true;
    this.child.clear();
  }

  edit(tmsBrand: BrandCreateModel) {
    this.child.BrandModel = tmsBrand;
    this.child.InitializeFormFromParent();
    this.child.ButtonName = "Update";
    this.displayCreate = true;
  }

}
