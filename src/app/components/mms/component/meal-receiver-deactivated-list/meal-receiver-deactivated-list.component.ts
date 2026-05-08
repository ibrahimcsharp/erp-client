import { Component, OnInit } from '@angular/core';
import { MmsService } from '../../services/mms.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-meal-receiver-deactivated-list',
  templateUrl: './meal-receiver-deactivated-list.component.html',
  styleUrls: ['./meal-receiver-deactivated-list.component.scss']
})
export class MealReceiverDeactivatedListComponent implements OnInit {
  selectedEmpInfo: any[] = [];
  empList: any[] = [];
  constructor(
    private mmsService: MmsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.LoadDeactivatedList();
  }

  LoadDeactivatedList(){

    // if (this.reactiveForm.valid) {
      this.spinner.show();
      this.mmsService.GetDeactiveMealReceiverList().subscribe(
          (res: any[]) => {
            if (res) {
              this.empList = res.filter(x => x.deactivate =='Y');
              //this.scoEmpList = res.filter((e) => e.unitName == "SCO");
              //this.saraEmpList = res.filter((e) => e.unitName == "SaRa");
              this.spinner.hide();
            }
          },
          (error) => {
            this.empList = [];
            this.spinner.hide();
          }
        );
    //} else {
      //this.commonService.ValidationShow(this.reactiveForm);
   // }
  }

  onSubmit(){
    if (this.selectedEmpInfo.length > 0) {
      this.spinner.show();
      this.mmsService
        .UpdateDeactiveMealReceiver(this.selectedEmpInfo)
        .subscribe(
          (res) => {
            this.toastr.success(
              "Process Successfuly Done!",
              "Employee Meal Deactivated "
            );
            this.spinner.hide();
          },
          (error) => {
            this.toastr.error("Process Failed", "Meal Receiver Deactivated");
            this.spinner.hide();
          }
        );
    } else {
      //this.commonService.ValidationShow(this.MealSetupForm);
      if (this.selectedEmpInfo.length == 0) {
        this.toastr.warning("Please Select Employee First");
      }
    }

    this.LoadDeactivatedList();

  }

}
