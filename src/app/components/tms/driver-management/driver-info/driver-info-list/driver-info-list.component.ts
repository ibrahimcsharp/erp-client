import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { DriverInfoCreateModel } from '../../../model/driver-info.model';
import { VehicleManageService } from '../../../service/vehicle-manage.service';
import { DriverInfoCreateComponent } from '../driver-info-create/driver-info-create.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-driver-info-list',
  templateUrl: './driver-info-list.component.html',
  styleUrls: ['./driver-info-list.component.scss']
})
export class DriverInfoListComponent implements OnInit {
  @ViewChild("CreateTmsDriver") child: DriverInfoCreateComponent;
  ButtonName: string;
  AllDriverModelList: DriverInfoCreateModel[] = new Array();
  DriverModel: DriverInfoCreateModel;
  displayCreate: boolean;

  @ViewChild("inputFile") myInputVariable: ElementRef;
  displayBasic: boolean;
  url = environment.fileUrl;

  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: VehicleManageService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.LoadDriver();
  }

  LoadDriver() {
    this.service.GetDriverInfoList().subscribe(
      (data: any[]) => {
        console.log(data);
        this.AllDriverModelList = data;
        console.log("driver models ", this.AllDriverModelList);
        this.displayCreate = false;
      },
      (error) => {
        this.toastr.warning("No Data Found", "Driver");
      }
    );
  }

  OpenNew() {
    this.displayCreate = true;
    this.child.InitializeForm();
  }

  edit(tmsDriver: DriverInfoCreateModel) {
    this.child.DriverInfoModel = tmsDriver;
    this.child.InitializeFormFromParent();
    this.child.ButtonName = "Update";
    this.displayCreate = true;
  }


  FileViewDriverLicense(rowData: any) {
    this.displayBasic = true;
    let fileObjectId = 135;
    this.commonService.GetVehicleFilesByRefId(rowData.infoId, fileObjectId).subscribe((data: any) => {
      if (data) {
        this.commonService.commonFilesList = data;
        console.log("File List : ", this.commonService.commonFilesList);
      }
    },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Files");
      }
    );
  }

}
