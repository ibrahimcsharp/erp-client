import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { CommonFiles } from 'src/app/components/merchandising/models/common-files.model';
import { environment } from 'src/environments/environment';
import { DriverDisplinaryCreateModel } from '../../../model/driver-displinary.model';
import { VehicleManageService } from '../../../service/vehicle-manage.service';
import { DriverDisciplinaryCreateComponent } from '../driver-disciplinary-create/driver-disciplinary-create.component';

@Component({
  selector: 'app-driver-disciplinary-list',
  templateUrl: './driver-disciplinary-list.component.html',
  styleUrls: ['./driver-disciplinary-list.component.scss']
})
export class DriverDisciplinaryListComponent implements OnInit {
  @ViewChild("CreateTmsDriverDisciplinary") child: DriverDisciplinaryCreateComponent;
  ButtonName: string;
  AllDriverDisplinaryModelList: DriverDisplinaryCreateModel[] = new Array();
  DriverDisplinaryModel: DriverDisplinaryCreateModel;
  displayCreate: boolean;
  displayBasic: boolean;
  url = environment.fileUrl;
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: VehicleManageService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.LoadDriverDisplinary();
  }

  LoadDriverDisplinary() {
    this.service.GetDriverDisplinaryList().subscribe(
      (data: any[]) => {
        console.log(data);
        this.AllDriverDisplinaryModelList = data;
        console.log(this.AllDriverDisplinaryModelList);

      },
      (error) => {
        this.toastr.warning("No Data Found", "Driver");
      }
    );
  }


  OpenNew() {
    this.displayCreate = true;
  }

  edit(tmsDriverDisplinary: DriverDisplinaryCreateModel) {

    this.child.DriverDisplinaryModel = tmsDriverDisplinary;
    this.child.InitializeFormFromParent();
    this.child.ButtonName = "Update";
    this.displayCreate = true;
  }

  ShowImage(obj: DriverDisplinaryCreateModel) {
    let fileObjectId = 45;
    this.displayBasic = true;
    this.commonService.GetStyleImageByRefId(obj.displinaryId, fileObjectId).subscribe((data: CommonFiles[]) => {
      if (data) {
        this.commonService.commonFilesList = data;
      }
    },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Files");
      }
    );
  }

}
