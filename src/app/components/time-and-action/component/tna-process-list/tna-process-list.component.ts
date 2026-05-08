import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from '../../../merchandising/Common-Services/common-service.service';
import { TimeAndActionService } from '../../service/time-and-action.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tna-process-list',
  templateUrl: './tna-process-list.component.html',
  styleUrls: ['./tna-process-list.component.scss']
})
export class TnaProcessListComponent implements OnInit {
  tnaJobList: any;
  tnaJobListRevised: any;
  materialTnaDataCheck: any;
  constructor(
    private toaster: ToastrService,
    public taskService: TimeAndActionService,
    public commonService: CommonServiceService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.LoadTnaJobList();
  }


  LoadTnaJobList() {
    this.taskService.GetAllTnaList().subscribe((data: any) => {
      if (data) {
        this.tnaJobList = data;
        console.log(this.tnaJobList);
      }

    }, error => {
      this.toaster.warning("Failed To Load Data", "TnA process List");
      this.tnaJobList = null;
    });
  }


  LoadTnaListRevised(rowData: any) {
    //debugger
    this.taskService.GetTnaListRevised(rowData.buyerId, rowData.styleId, rowData.yearId, rowData.seasonId, rowData.poNo).subscribe((data: any) => {
      if (data) {
        this.tnaJobListRevised = data;
        console.log(this.tnaJobListRevised);
      }

    }, error => {
      this.toaster.warning("Failed To Load Data", "TnA process List");
      this.tnaJobListRevised = null;
    });
  }

  material_tna_check(rowData: any) {
    this.taskService.CheckMaterialTnaDetailsData(rowData.poNo).subscribe((checkData: any) => {
      if (checkData.length) {
        this.router.navigate([`/time-and-action/material-tna/show/${rowData.id}`]);
      } else {
        //alert("No Data found in BOM");
        this.toaster.warning("No Data found in BOM");
        return false;
      }
    });
  }

}
