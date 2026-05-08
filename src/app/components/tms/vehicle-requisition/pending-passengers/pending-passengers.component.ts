import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { GoogleMapComponent } from '../../dashboard/google-map/google-map.component';
import { VehicleRequisitionModel } from '../../model/vehicle-requisition.model';
import { VehicleManageService } from '../../service/vehicle-manage.service';
import { RequisitionCancelComponent } from '../requisition-cancel/requisition-cancel.component';
import { RequisitionPassengersViewComponent } from '../requisition-passengers-view/requisition-passengers-view.component';
import { CommonFiles } from 'src/app/components/merchandising/models/common-files.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pending-passengers',
  templateUrl: './pending-passengers.component.html',
  styleUrls: ['./pending-passengers.component.scss']
})
export class PendingPassengersComponent implements OnInit {
  @ViewChild("GoogleMap") childGoogleMap: GoogleMapComponent;
  @ViewChild("VehicleRequisitionDeatills") child: RequisitionPassengersViewComponent;
  @ViewChild("VehicleRequisitionCancel") childRequisitionCancel: RequisitionCancelComponent;
  VehicleRequisitionModelList: VehicleRequisitionModel[];
  commonFilesList: any[];
  displayCreate: boolean;
  displayCancel: boolean;
  displayGoogleMap: boolean;
  displayBasic: boolean;
  url = environment.fileUrl;
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: VehicleManageService,
    private toastr: ToastrService,
    private authService: AuthService,

  ) { }

  ngOnInit(): void {
    this.loadVehicleRequisition();
  }


  loadVehicleRequisition() {
    this.service.GetAllVehicleRequisitionListStatus().subscribe(
      (data: any[]) => {
        this.VehicleRequisitionModelList = data;
        this.VehicleRequisitionModelList = this.VehicleRequisitionModelList.filter(s => s.requisitionType == "Passengers" && s.createById == this.authService.decodedToken?.unique_name);
        
      },
      (error) => {

      }
    );
  }

  cancel(rowData: VehicleRequisitionModel) {
    this.childRequisitionCancel.RequisitionStatus = "Rejected By User";
    this.childRequisitionCancel.VehicleRequisitionModel = rowData;
    this.childRequisitionCancel.InitializeFormFromParent();
    this.displayCancel = true;
  }

  show(rowData: VehicleRequisitionModel) {
    console.log(rowData);
    this.child.VehicleRequisitionModel = rowData;
    this.child.InitializeFormFromParent();
    this.displayCreate = true;
  }

  openMap(rowData: VehicleRequisitionModel) {
    this.displayGoogleMap = true;
  }

  onChildSubmit() {
    this.displayCancel = false;
  }
  fileView(rowData: any) {
    this.displayBasic = true;
    let fileObjectId = 134;
    this.commonService.GetVehicleFilesByRefId(rowData.requisitionId, fileObjectId).subscribe((data: any) => {
      if (data) {
        this.commonFilesList = data;
      }
    },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Files");
      }
    );
  }
}
