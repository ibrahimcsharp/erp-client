import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ChallanService } from '../../service/challan.service';
import { ChallanModel } from '../../model/challan'
import { CostingFormComponent } from '../costing-form/costing-form.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-local-challan-list',
  templateUrl: './local-challan-list.component.html',
  styleUrls: ['./local-challan-list.component.scss']
})
export class LocalChallanListComponent implements OnInit {
  @ViewChild("createCosting") child: CostingFormComponent;
  ChallanLocalList: ChallanModel[];
  constructor(
    private challanService: ChallanService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.LoadChallan();
  }
  LoadChallan() {
    this.challanService.getChallans().subscribe(
      (data: any[]) => {
        this.ChallanLocalList = data.filter(x => x.status == 'Local');
      },
      (error) => {
        this.toastr.warning("No Data Found", "Challans");
      }
    );
  }

}
