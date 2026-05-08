import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ChallanService } from '../../service/challan.service';
import { ChallanModel } from '../../model/challan'
import { CostingFormComponent } from '../costing-form/costing-form.component';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-cost-submit-local-list',
  templateUrl: './cost-submit-local-list.component.html',
  styleUrls: ['./cost-submit-local-list.component.scss']
})
export class CostSubmitLocalListComponent implements OnInit {
  @ViewChild("createCosting") child: CostingFormComponent;
  ChallanModelList: ChallanModel[];
  ChallanImportList: ChallanModel[];
  constructor(private challanService: ChallanService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.LoadProccessedChallan();
  }
  LoadProccessedChallan() {
    this.challanService.getBillChallans().subscribe(
      (data: any[]) => {
        this.ChallanModelList = data.filter(x => x.status == 'LOCAL_PROCESSED');
      },
      (error) => {
        this.toastr.warning("No Data Found", "Challans");
      }
    );
  }
}


