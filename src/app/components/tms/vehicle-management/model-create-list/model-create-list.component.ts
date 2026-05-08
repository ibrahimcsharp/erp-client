import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { BrandCreateModel } from '../../model/brand-create.model';
import { TmsModel } from '../../model/tms-model.model';
import { VehicleManageService } from '../../service/vehicle-manage.service';
import { ModelCreateComponent } from '../model-create/model-create.component';

@Component({
  selector: 'app-model-create-list',
  templateUrl: './model-create-list.component.html',
  styleUrls: ['./model-create-list.component.scss']
})
export class ModelCreateListComponent implements OnInit {
  @ViewChild("CreateTmsModel") child: ModelCreateComponent;
  ButtonName: string;
  AllModelList: TmsModel[] = new Array();
  TmsModel: TmsModel;
  noResult: boolean;
  AllBrandList: BrandCreateModel[] = new Array();
  AllBrandListDropdown: any;
  displayCreate: boolean;
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: VehicleManageService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.LoadModels();
  }

  onChildSubmit() {
    this.displayCreate = false;
  }

  LoadModels() {
    this.service.GetModelList().subscribe(
      (data: any[]) => {
        console.log(data);
        this.AllModelList = data;
        console.log(this.AllModelList);

      },
      (error) => {
        this.toastr.warning("No Data Found", "Models");

      }
    );
  }

  OpenNew() {
    this.child.InitializeFormFromParen();
    this.displayCreate = true;
    this.child.clear();
  }

  EditModels(tmsModel: TmsModel) {
    this.child.TmsModel = tmsModel;
    this.child.InitializeFormFromParen();
    this.child.ButtonName = "Update";
    this.displayCreate = true;
  }
}
