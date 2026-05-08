import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/shared/service/spinner.service';
import { MmsSnackService } from '../../../services/snacks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-available-snacks-items',
  templateUrl: './available-snacks-items.component.html',
  styleUrls: ['./available-snacks-items.component.scss']
})
export class AvailableSnacksItemsComponent implements OnInit {

  bsModalRef: BsModalRef;
  spinnerName = "listSpinner";
  orderedItems_: any[] = [];
  constructor(private modalService: BsModalService,
    private spinner: SpinnerService,
    private toaster: ToastrService,
    private router: Router,
    public snackService: MmsSnackService) { }

  ngOnInit(): void {
    this.snackService.GetAvailableItems();
    this.snackService.GetOrderedItems(1, null, null);
    // this.orderedItems_ = this.snackService.orderedItems;
  }

  GenerateOrder(obj: any) {

    let href = this.router.url;
    
    if (href == "/mms/snacks-manual-sale") {
      //var pendingCount = 0;
      var pendingList = this.snackService.orderedItems.filter(x=>x.orderStatus == "PENDING");
      if(pendingList.length > 0){
        this.toaster.error("This item is on the pending list!");
        return;
      }
      // this.snackService.orderedItems.forEach(singelItem => {
      //   if (singelItem.orderStatus == 'PENDING') {
      //     singelItem.list.forEach(element => {
      //       if (obj.itemId == element.itemId) {
      //         pendingCount++;
      //       }
      //     });
      //   }
      // });

      // if (pendingCount > 0) {
      //   this.toaster.error("This item is on the pending list!");
      //   return;
      // }
    }



    if (obj.buyQty > 0 && this.snackService.snackAvailableItems.length > 0 && obj.currentStock >= obj.buyQty) {
      if (this.snackService.cartItems.length > 0) {
        var findExitsItemIndex = this.snackService.cartItems.findIndex(e => e.itemId == obj.itemId);
        if (findExitsItemIndex != -1) {
          this.snackService.cartItems[findExitsItemIndex] = obj;
          this.toaster.success("Updated item to cart");
        } else {
          this.snackService.cartItems.push(obj);
          this.toaster.success("Added item to cart");
        }

      }
      else {
        this.snackService.cartItems.push(obj);
        this.toaster.success("Added item to cart");
      }
      //this.GetItems();

    } else {
      this.toaster.error("Invalid qty!!");
    }
    // console.log(obj);
  }


}
