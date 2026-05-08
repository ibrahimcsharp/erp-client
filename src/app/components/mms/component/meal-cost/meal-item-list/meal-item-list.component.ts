import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/shared/service/spinner.service';
import { MmsReportService } from '../../../services/mms-report.service';
import { MmsService } from '../../../services/mms.service';
import { MealItemComponent } from '../meal-item/meal-item.component';

@Component({
  selector: 'app-meal-item-list',
  templateUrl: './meal-item-list.component.html',
  styleUrls: ['./meal-item-list.component.scss']
})
export class MealItemListComponent implements OnInit {
  Items: any[];
  bsModalRef: BsModalRef;
  spinnerName = "listSpinner";
  constructor(private modalService: BsModalService,
    private spinner: SpinnerService,
    private toaster: ToastrService,
    public mmsService: MmsService,
    public mmsReportService:MmsReportService
  ) { }

  ngOnInit(): void {
    this.GetItems();
  }


  GetItems() {
    this.spinner.showSpinner(this.spinnerName);
    this.Items = [];
    this.mmsService.GetMealItem().subscribe((res:any[]) => {
      this.Items=res;
      this.spinner.hideSpinner(this.spinnerName);

    }, error => {
      this.toaster.error("Failed to load Meal Item");
      this.Items=[];
      this.spinner.hideSpinner(this.spinnerName);

    })
  }

  NewItem(){
    this.bsModalRef=this.modalService.show(MealItemComponent,{
      initialState:{
        title:"Create Meal Item",
      },
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg",

    });
    this.SaveData();
  }



  SaveData() {
    this.bsModalRef.content.ToCreate.subscribe((model: any) => {
      const ToCreate = model;
      if (ToCreate) {
        this.mmsService.CreateMealItem(ToCreate).subscribe(
          () => {
            this.toaster.success("Created successfully", "Meal Item");
            this.GetItems();
          },
          (error) => {
            this.toaster.error("Failed to create!", "Meal Item");            
          }
        );
      }
    });
  }


  EditItem(model: any) {
    console.log(model);
    this.bsModalRef = this.modalService.show(MealItemComponent, {
      initialState: {
        title: "Update Meal Item",
        model,
      },
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg",
    });

    this.SaveData();
  }

  dataForExcel = [];
  Data = [];
  exportExcel() {
    for (var i = 0; i < this.Items.length; i++) {
      var foodInfo = {       
        categoryName: this.Items[i].categoryName,       
        itemName: this.Items[i].itemName,       
        remarks: this.Items[i].remarks,        
      };
      this.Data.push(foodInfo);
    }

    this.Data.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row));
    });

    let reportData = {
      title: "Meal Items",
      data: this.dataForExcel,
      headers: Object.keys(this.Data[0]),
    };
    this.mmsReportService.ExportMealItems(reportData);    
  }
}
