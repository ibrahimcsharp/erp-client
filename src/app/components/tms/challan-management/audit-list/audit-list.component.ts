import { Component, OnInit, ViewChild } from '@angular/core';
import { CostingFormComponent } from '../costing-form/costing-form.component';
import { ChallanModel } from '../../model/challan';
import { ChallanService } from '../../service/challan.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-audit-list',
  templateUrl: './audit-list.component.html',
  styleUrls: ['./audit-list.component.scss']
})
export class AuditListComponent implements OnInit {
  @ViewChild("createCosting") child: CostingFormComponent;


  ChallanModelList: ChallanModel[];
  ChallanArriveList: ChallanModel[];
  constructor(
    private challanService: ChallanService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.LoadProccessedChallan();
  }

  LoadProccessedChallan() {
    this.spinner.show();
    this.challanService.getBillChallans().subscribe(
      (data: any[]) => {
        this.ChallanModelList = data.filter(x => x.status == 'EXPORT_COSTING_PROCESSED');
        console.log("Audit", this.ChallanModelList);
      },
      (error) => {
        this.toastr.warning("No Data Found", "Challans");
      }
    );
    this.spinner.hide();
  }
}
