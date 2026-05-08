import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { DashboardModel } from '../../model/common.model';
import { TmsCommonService } from '../../service/tms-common.service';
import { VehicleManageService } from '../../service/vehicle-manage.service';

@Component({
  selector: 'app-scheduler-calender',
  templateUrl: './scheduler-calender.component.html',
  styleUrls: ['./scheduler-calender.component.scss']
})
export class SchedulerCalenderComponent implements OnInit {

  DashboardModelList: DashboardModel[];
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: VehicleManageService,
    private toastr: ToastrService,
    public tmsService: TmsCommonService,) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.LoadSchedulerCalender();
  }

  InitializeForm() { }

  LoadSchedulerCalender() {
    this.service.GetSchedulerCalenderList().subscribe(
      (data: any[]) => {
        console.log(data);
        this.DashboardModelList = data;
        console.log(this.DashboardModelList);
      },
      (error) => {
        this.toastr.warning("No Data Found", "Scheduler Calender");
      }
    );
  }


}
