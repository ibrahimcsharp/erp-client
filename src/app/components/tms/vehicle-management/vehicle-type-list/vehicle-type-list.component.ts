import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { TypeCreateModel } from '../../model/vehicle-type.model';
import { VehicleManageService } from '../../service/vehicle-manage.service';
import { VehicleTypeComponent } from '../vehicle-type/vehicle-type.component';

@Component({
  selector: 'app-vehicle-type-list',
  templateUrl: './vehicle-type-list.component.html',
  styleUrls: ['./vehicle-type-list.component.scss']
})
export class VehicleTypeListComponent implements OnInit {
  @ViewChild("CreateTmsType") child: VehicleTypeComponent;
  ButtonName: string;
  AllTypeList: TypeCreateModel[] = new Array();
  TypeModel: TypeCreateModel;
  displayCreate: boolean;
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: VehicleManageService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.LoadTypes();
  }
  LoadTypes() {
    this.service.GetTypeList().subscribe(
      (data: any[]) => {
        console.log(data);
        this.AllTypeList = data;
        console.log(this.AllTypeList);

      },
      (error) => {
        this.toastr.warning("No Data Found", "Type");

      }
    );
  }
  EditTypes(rowData: TypeCreateModel) {
    this.child.TypeModel = rowData;
    this.child.InitializeFormFromParent();
    this.child.ButtonName = "Update";
    this.displayCreate = true;

  }
  onChildSubmit() {
    this.displayCreate = false;
  }
  OpenNew() {
    this.displayCreate = true;
    this.child.clear();
  }
}
