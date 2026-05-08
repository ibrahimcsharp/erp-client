import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/shared/service/spinner.service';
import { MmsSnackService } from '../../../services/snacks.service';
import { SnacksItemComponent } from '../snacks-item/snacks-item.component';

@Component({
  selector: 'app-snacks-item-list',
  templateUrl: './snacks-item-list.component.html',
  styleUrls: ['./snacks-item-list.component.scss']
})
export class SnacksItemListComponent implements OnInit {
  Items: any[];
  bsModalRef: BsModalRef;
  spinnerName = "listSpinner";
  constructor(private modalService: BsModalService,
    private spinner: SpinnerService,
    private toaster: ToastrService,
    private snackService: MmsSnackService) { }

  ngOnInit(): void {
    this.GetItems();
  }

  GetItems() {
    this.spinner.showSpinner(this.spinnerName);
    this.Items = [];
    this.snackService.GetSnacksItems().subscribe((res: any[]) => {
      this.Items = res;
      this.spinner.hideSpinner(this.spinnerName);
    }, error => {
      this.toaster.error("Failed to load Snack Item");
      this.Items = [];
      this.spinner.hideSpinner(this.spinnerName);
    })
  }

  NewItem() {
    this.bsModalRef = this.modalService.show(SnacksItemComponent, {
      initialState: {
        title: "Create Snack Item",
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
        this.snackService.SaveSnackItem(ToCreate).subscribe(
          () => {
            this.toaster.success("Created successfully", "Snack Item");
            this.GetItems();
          },
          (error) => {
            this.toaster.error("Failed to create!", "Snack Item");
          }
        );
      }
    });
  }

  EditItem(model: any) {   
    this.bsModalRef = this.modalService.show(SnacksItemComponent, {
      initialState: {
        title: "Update Snack Item",
        model,
      },
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg",
    });

    this.SaveData();
  }


}
