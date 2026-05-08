import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { RouteCreateModel } from '../../model/route-create.model';
import { TmsCommonService } from '../../service/tms-common.service';
import { RouteCreateComponent } from '../route-create/route-create.component';

@Component({
  selector: 'app-route-create-list',
  templateUrl: './route-create-list.component.html',
  styleUrls: ['./route-create-list.component.scss']
})
export class RouteCreateListComponent implements OnInit {
  @ViewChild("CreateTmsBrand") child: RouteCreateComponent;
  RouteName: string;
  AllRouteList: RouteCreateModel[] = new Array();
  RouteModel: RouteCreateModel;
  displayCreate: boolean;
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: TmsCommonService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.LoadRoutes();
  }

  LoadRoutes() {
    this.service.GetRouteList().subscribe(
      (data: any[]) => {
        console.log(data);
        this.AllRouteList = data;
        console.log(this.AllRouteList);

      },
      (error) => {
        this.toastr.warning("No Data Found", "Brand");

      }
    );
  }

  OpenNew() {
    this.displayCreate = true;
  }

  edit(tmsBrand: RouteCreateModel) {
    this.child.RouteModel = tmsBrand;
    this.child.InitializeFormFromParent();
    this.child.ButtonName = "Update";
    this.displayCreate = true;
  }

}
