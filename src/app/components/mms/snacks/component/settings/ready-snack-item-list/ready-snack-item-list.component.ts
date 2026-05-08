import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/shared/service/spinner.service';
import { MmsSnackService } from '../../../services/snacks.service';
import { ReadySnackItemComponent } from '../ready-snack-item/ready-snack-item.component';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-ready-snack-item-list',
  templateUrl: './ready-snack-item-list.component.html',
  styleUrls: ['./ready-snack-item-list.component.scss']
})
export class ReadySnackItemListComponent implements OnInit {

  Items: any[];
  bsModalRef: BsModalRef;
  spinnerName = "listSpinner";
  constructor(private modalService: BsModalService,
    private spinner: SpinnerService,
    private toaster: ToastrService,
    public authService: AuthService,
    private snackService: MmsSnackService) { }

  ngOnInit(): void {
    this.GetItems();
  }

  GetItems() {
    debugger
    this.spinner.showSpinner(this.spinnerName);
    this.Items = [];
    this.snackService.GetSnacksReadyItems().subscribe((res: any[]) => {
      this.Items = res;
      this.spinner.hideSpinner(this.spinnerName);
    }, error => {
      this.toaster.error("Failed to load Snack ready Item");
      this.Items = [];
      this.spinner.hideSpinner(this.spinnerName);
    })
  }

  NewItem() {
    this.bsModalRef = this.modalService.show(ReadySnackItemComponent, {
      initialState: {
        title: "Create Snack Ready Item",
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
      ToCreate.isApproved = 0;
      if (ToCreate) {
        this.snackService.SaveSnackReadyItem(ToCreate).subscribe(
          () => {
            this.toaster.success("Created successfully", "Snack Ready Item");
            this.GetItems();
          },
          (error) => {
            this.toaster.error("Failed to create!", "Snack Ready Item");
          }
        );
      }
    });
  }

  ApproveItem(obj: any) {
    if (obj != null) {
      obj.isApproved = 1;
      this.snackService.SaveSnackReadyItem(obj).subscribe(() => {
          this.toaster.success("Approved successfully", "Snack Ready Item");
          this.GetItems();
        },
        (error) => {
          this.toaster.error("Failed to approve!", "Snack Ready Item");
        }
      );

    }
  }

  EditItem(model: any) {
    this.bsModalRef = this.modalService.show(ReadySnackItemComponent, {
      initialState: {
        title: "Update Snack Ready Item",
        model,
      },
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg",
    });

    this.SaveData();
  }

  StockSynced(obj: any) {
    this.spinner.showSpinner(this.spinnerName);
    obj.stockSynced = 1;
    this.snackService.SaveSnackItemStockSynced(obj).subscribe(res => {
      this.toaster.success("Stock Synced Successfully!");
      this.GetItems();
      this.spinner.hideSpinner(this.spinnerName);

    }, error => {
      this.toaster.error("Failed to Stock Synced");
      this.GetItems();
      this.spinner.hideSpinner(this.spinnerName);

    })

  }
}
