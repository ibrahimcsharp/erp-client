import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ChallanService } from '../../service/challan.service';
import { ChallanModel } from '../../model/challan'
import { CostingFormComponent } from '../costing-form/costing-form.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cost-submit-export-list',
  templateUrl: './cost-submit-export-list.component.html',
  styleUrls: ['./cost-submit-export-list.component.scss']
})

export class CostSubmitExportListComponent implements OnInit {
  @ViewChild("createCosting") child: CostingFormComponent;


  ChallanModelList: ChallanModel[];
  ChallanArriveList: ChallanModel[];
  constructor(
    private challanService: ChallanService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.LoadArrive();
    this.LoadProccessedChallan();
  }

  LoadArrive() {
    this.spinner.show();
    this.challanService.getChallans().subscribe(
      (data: any[]) => {
        this.ChallanArriveList = data.filter(x => x.status == 'EXPORT_ARRIVED');
        console.log("Export Costing", this.ChallanArriveList);
      },
      (error) => {
        this.toastr.warning("No Data Found", "Challans");
      }
    );
    this.spinner.hide();
  }
  openLink(){
      this.router.navigateByUrl(`/tms/bill-report`);

  }
  LoadProccessedChallan() {
    this.spinner.show();
    this.challanService.getBillChallans().subscribe(
      (data: any[]) => {
        this.ChallanModelList = data.filter(x => x.status == 'EXPORT_COSTING_PROCESSED');
        console.log("Bill List", this.ChallanModelList);
      },
      (error) => {
        this.toastr.warning("No Data Found", "Challans");
      }
    );
    this.spinner.hide();
  }
}

