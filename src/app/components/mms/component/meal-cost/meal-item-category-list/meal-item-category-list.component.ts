import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/shared/service/spinner.service';
import { MmsService } from '../../../services/mms.service';
import { MealItemCategoryComponent } from '../meal-item-category/meal-item-category.component';

@Component({
  selector: 'app-meal-item-category-list',
  templateUrl: './meal-item-category-list.component.html',
  styleUrls: ['./meal-item-category-list.component.scss']
})
export class MealItemCategoryListComponent implements OnInit {
  Items: any[];
  bsModalRef: BsModalRef;
  spinnerName = "listSpinner";
  constructor(private modalService: BsModalService,
    private spinner: SpinnerService,
    private toaster: ToastrService,
    public mmsService: MmsService
  ) { }

  ngOnInit(): void {
    this.GetItems();
  }


  GetItems() {
    this.spinner.showSpinner(this.spinnerName);
    this.Items = [];
    this.mmsService.GetMealCategory().subscribe((res:any[]) => {
      this.Items=res;
      this.spinner.hideSpinner(this.spinnerName);

    }, error => {
      this.toaster.error("Failed to load Meal Item Category");
      this.Items=[];
      this.spinner.hideSpinner(this.spinnerName);

    })
  }

  NewItem(){
    this.bsModalRef=this.modalService.show(MealItemCategoryComponent,{
      initialState:{
        title:"Create Meal Item Category",
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
        this.mmsService.CreateMealCategory(ToCreate).subscribe(
          () => {
            this.toaster.success("Created successfully", "Meal Item Category");
            this.GetItems();
          },
          (error) => {
            this.toaster.error("Failed to create!", "Meal Item Category");            
          }
        );
      }
    });
  }


  EditItem(model: any) {
    this.bsModalRef = this.modalService.show(MealItemCategoryComponent, {
      initialState: {
        title: "Update Meal Item Category",
        model,
      },
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg",
    });

    this.SaveData();
  }



}
