import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ChallanService } from '../../service/challan.service';
import { ChallanModel } from '../../model/challan'
import { CostingFormComponent } from '../costing-form/costing-form.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-export-challan-list',
  templateUrl: './export-challan-list.component.html',
  styleUrls: ['./export-challan-list.component.scss']
})
export class ExportChallanListComponent implements OnInit {
  @ViewChild("createCosting") child: CostingFormComponent;

  ChallanExportList: ChallanModel[];
  ChallanArriveList: ChallanModel[];
  isLoading: boolean = false;
  displayDialog: boolean = false;
  costingId: string;
  constructor(
    private challanService: ChallanService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.LoadChallan();
    this.LoadArrive();
  }

  LoadChallan() {
    this.spinner.show();
    this.challanService.getChallans().subscribe(
      (data: any[]) => {
        this.ChallanExportList = data.filter(x => x.status == 'EXPORT');
        console.log("Export Not Arrive", this.ChallanExportList);
      },
      (error) => {
        this.toastr.warning("No Data Found", "Challans");
      }
    );
    this.spinner.hide();
  }


  LoadArrive() {
    this.spinner.show();
    this.challanService.getChallans().subscribe(
      (data: any[]) => {
        this.ChallanArriveList = data.filter(x => x.status == 'EXPORT_ARRIVED' || x.status == 'EXPORT_COSTING_PROCESSED');
        this.ChallanArriveList = this.ChallanArriveList.sort((a, b) => b.id - a.id);
        console.log("Export Arrive", this.ChallanArriveList);
      },
      (error) => {
        this.toastr.warning("No Data Found", "Challans");
      }
    );
    this.spinner.hide();
  }

  // showChallanDialog(rowData: ChallanModel) {
  //   this.displayDialog = true;
  //   this.child.$challanModel = rowData;
  //   this.child.challanType = rowData.status;
  //   this.child.createCosting();
  //   this.LoadChallan();
  // }

  saveAPIData() {
    this.isLoading = true;
    this.spinner.show();
    this.challanService.MigrateAPIData().subscribe(response => {

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



  deleteChallan(id: number) {
    var Con = confirm("Are you sure want to delete this?");
    if (Con === true) {
      this.challanService.delete(id).subscribe(response => {
        this.toastr.success("Record deleted Successfully");
        this.LoadChallan();
      },
        (error) => {
          this.toastr.warning("Failed To Delete Data!");
        }
      )
    }
  }

}
