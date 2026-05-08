import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/shared/service/spinner.service';
import { MmsSnackService } from '../../../services/snacks.service';

@Component({
  selector: 'app-snacks-cart-manual',
  templateUrl: './snacks-cart-manual.component.html',
  styleUrls: ['./snacks-cart-manual.component.scss']
})
export class SnacksCartManualComponent implements OnInit {

  constructor(public snackService: MmsSnackService,private spinner: SpinnerService,
    private toaster: ToastrService) { }

  ngOnInit(): void {
  }

  RemoveBuyItems(index: number) {
    this.snackService.cartItems.splice(index, 1);
  }

  CalculateTotalPrice() {
    return this.snackService.cartItems.reduce(
      (sum, p) => sum + (p.salePrice * p.buyQty),
      0
    );
  }
  SaveOrderPersonal() {
    if (this.snackService.cartItems.length > 0 && this.snackService.employeeId!="-1") {
      var body={
        costType:"PERSONAL",
        orderStatus:'DELIVERED',
        employeeId:this.snackService.employeeId,
        list:this.snackService.cartItems
      }
      this.snackService.SaveSnackOrderItem(body).subscribe((res:any) => {
        //console.log(res);
        this.snackService.GetOrderedItems(1,null,null);
        this.snackService.GetAvailableItems();
        this.snackService.cartItems=[];
        this.toaster.success("Order Placed successfully","Order No #"+res.message);
      }, error => {
        //console.log(error);
        this.snackService.GetOrderedItems(1,null,null);
        this.snackService.GetAvailableItems();
        this.toaster.error("Failed to place order");
      })

    } else {
      alert("Please add to cart first and select a valid employee Id");
    }
  }
  SaveOrderGuest() {
    if (this.snackService.cartItems.length > 0) {
      var body={
        costType:"GUEST",
        orderStatus:'PENDING',
        list:this.snackService.cartItems
      }
      this.snackService.SaveSnackOrderItem(body).subscribe((res:any) => {
        //console.log(res);
        this.snackService.GetOrderedItems(1,null,null);
        this.snackService.GetAvailableItems();
        this.snackService.cartItems=[];
        this.toaster.success("Order Placed successfully","Order No #"+res.message);
      }, error => {
        //console.log(error);
        this.snackService.GetOrderedItems(1,null,null);
        this.snackService.GetAvailableItems();
        this.toaster.error("Failed to place order");
      })

    } else {
      alert("Please add to cart first");
    }
  }

  SaveOrderOfficialGuest() {
    if (this.snackService.cartItems.length > 0) {
      var body={
        costType:"OFFICIAL",
        orderStatus:'PENDING',
        employeeId:this.snackService.employeeId,
        list:this.snackService.cartItems
      }
      this.snackService.SaveSnackOrderItem(body).subscribe((res:any) => {
        //console.log(res);
        this.snackService.GetOrderedItems(1,null,null);
        this.snackService.GetAvailableItems();
        this.snackService.cartItems=[];
        this.toaster.success("Order Placed successfully","Order No #"+res.message);
      }, error => {
        //console.log(error);
        this.snackService.GetOrderedItems(1,null,null);
        this.snackService.GetAvailableItems();
        this.toaster.error("Failed to place order");
      })

    } else {
      alert("Please add to cart first");
    }
  }





}
