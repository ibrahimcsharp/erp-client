import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/shared/service/spinner.service';
import { MmsSnackService } from '../../../services/snacks.service';
import { SnackDamageDeclareComponent } from '../snack-damage-declare/snack-damage-declare.component';

@Component({
  selector: 'app-snack-current-stock',
  templateUrl: './snack-current-stock.component.html',
  styleUrls: ['./snack-current-stock.component.scss']
})
export class SnackCurrentStockComponent implements OnInit {

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
    this.snackService.GetSnacksCurrentStock(0).subscribe((res: any[]) => {
      this.Items = res;
      this.spinner.hideSpinner(this.spinnerName);
    }, error => {
      this.toaster.error("Failed to load Snack Current Stock");
      this.Items = [];
      this.spinner.hideSpinner(this.spinnerName);
    })
  }

  AddDamage(model: any) {
    this.bsModalRef = this.modalService.show(SnackDamageDeclareComponent, {
      initialState: {
        title: "Declare Snack Damage",
        model
      },
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg",

    });
    this.GetSnackDamageByItemId(model.itemId);

    this.SaveData();
  }

  SaveData() {
    this.bsModalRef.content.ToCreate.subscribe((model: any) => {
      const ToCreate = model;
      if (ToCreate) {
        this.snackService.SaveSnackDamage(ToCreate).subscribe(
          (res: any) => {
            this.toaster.success(res.message);
            this.GetItems();
          },
          (error) => {
            this.toaster.error("Failed to create!", "Snacks Damage");
          }
        );
      }
    });
  }

  GetSnackDamageByItemId(itemId: number) {
    this.snackService.GetSnackDamageByItemId(itemId).subscribe((res: any[]) => {
      this.snackService.DamageItems = res;

    }, error => {
      this.snackService.DamageItems = [];

    })
  }


}
