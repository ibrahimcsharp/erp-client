import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/shared/service/spinner.service';
import { MmsSnackService } from '../../../services/snacks.service';
import { SnacksItemCategoryComponent } from '../snacks-item-category/snacks-item-category.component';

@Component({
  selector: 'app-snacks-item-category-list',
  templateUrl: './snacks-item-category-list.component.html',
  styleUrls: ['./snacks-item-category-list.component.scss']
})
export class SnacksItemCategoryListComponent implements OnInit {

  constructor(private modalService: BsModalService,
    private spinner: SpinnerService,
    private toaster: ToastrService,
    private snackService: MmsSnackService) { }
  Items: any[];
  bsModalRef: BsModalRef;
  spinnerName = "listSpinner";
  ngOnInit(): void {
    this.GetItems();
  }

  GetItems() {
    this.spinner.showSpinner(this.spinnerName);
    this.Items = [];
    this.snackService.GetSnacksCategory().subscribe((res: any[]) => {
      this.Items = res;
      this.spinner.hideSpinner(this.spinnerName);

    }, error => {
      this.toaster.error("Failed to load Snacks Item Category");
      this.Items = [];
      this.spinner.hideSpinner(this.spinnerName);

    })
  }

  NewItem(){
    this.bsModalRef=this.modalService.show(SnacksItemCategoryComponent,{
      initialState:{
        title:"Create Snack Item Category",
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
        this.snackService.SaveSnackCategory(ToCreate).subscribe(
          () => {
            this.toaster.success("Created successfully", "Snacks Item Category");
            this.GetItems();
          },
          (error) => {
            this.toaster.error("Failed to create!", "Snack Item Category");            
          }
        );
      }
    });
  }

  EditItem(model: any) {
    this.bsModalRef = this.modalService.show(SnacksItemCategoryComponent, {
      initialState: {
        title: "Update Snack Item Category",
        model,
      },
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg",
    });

    this.SaveData();
  }

}
