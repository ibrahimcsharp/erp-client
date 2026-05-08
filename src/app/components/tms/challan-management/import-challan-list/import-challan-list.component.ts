import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ChallanService } from '../../service/challan.service';
import { ChallanModel } from '../../model/challan'
import { CostingFormComponent } from '../costing-form/costing-form.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-import-challan-list',
  templateUrl: './import-challan-list.component.html',
  styleUrls: ['./import-challan-list.component.scss']
})
export class ImportChallanListComponent implements OnInit {
  @ViewChild("createCosting") child: CostingFormComponent;
  ChallanModelList: ChallanModel[];
  isLoading: boolean = false;
  displayDialog: boolean = false;
  ChallanImportList: ChallanModel[];
  constructor(private challanService: ChallanService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.LoadChallan();
  }
  LoadChallan() {
    this.spinner.show();
    this.challanService.getImportChallans().subscribe(
      (data: any[]) => {
        this.ChallanImportList = data.filter(x => x.status == 'IMPORT');
        console.log("This List", this.ChallanImportList);
      },
      (error) => {
        this.toastr.warning("No Data Found", "Challans");
      }
    );
    this.spinner.hide();
  }

  saveAPIImportData() {
    this.isLoading = true;
    this.spinner.show();
    this.challanService.MigrateAPIImportData().subscribe(response => {
      this.toastr.success("API Data Saved Successfully");
      this.spinner.hide();
      this.isLoading = false;
      this.LoadChallan();
    },
      (error) => {
        this.toastr.warning("API Data Already Updated");
        this.isLoading = false;
        this.spinner.hide();
        this.LoadChallan();
      }
    )
    this.LoadChallan();
  }
}
