import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { MmsSnackService } from '../../../services/snacks.service';
import { SnacksOrderDetailsComponent } from '../../order/snacks-order-details/snacks-order-details.component';

@Component({
  selector: 'app-snacks-delivery',
  templateUrl: './snacks-delivery.component.html',
  styleUrls: ['./snacks-delivery.component.scss']
})
export class SnacksDeliveryComponent implements OnInit {
  reactiveForm: FormGroup;
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService, public fb: FormBuilder, public commonService: CommonServiceService, public datepipe: DatePipe, public spinnerService: NgxSpinnerService, public snackService: MmsSnackService) { }

  ngOnInit(): void {
    this.OnClear();
    this.Search();

  }

  OnClear(): void {
    this.reactiveForm = this.fb.group({
      searchDate: [this.datepipe.transform(new Date(), "yyyy-MM-dd")],
      orderStatus: ["PENDING"],

    });
  }
  Search() {
    this.spinnerService.show();
    this.snackService.GetOrderedItems(0, this.reactiveForm.value.searchDate, this.reactiveForm.value.orderStatus);
    this.spinnerService.hide();

    console.log(this.reactiveForm.value);
  }

  Details(obj: any) {
    this.snackService.orderDetails = obj.list;
    this.bsModalRef = this.modalService.show(SnacksOrderDetailsComponent, {
      initialState: {
        title: "Snacks Ordered Details Items",
      },
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg",

    });

  }

  DELIVERED(obj: any) {
    obj.type=1;//Deliver
    this.snackService.SaveSnackOrderDinningActivity(obj).subscribe(res=>{
      alert("Delivered");
      this.Search();

    },error=>{
      alert("Failed to Delivered");

    })

  }
  CANCELED(obj: any) {
    obj.type=0;
    if (confirm('Are you sure you want to Cancel this Order?')) {
      this.snackService.SaveSnackOrderDinningActivity(obj).subscribe(res=>{
        alert("Order Canceled !");
        this.Search();
      },error=>{
        alert("Failed to Cancel Order !");
      })
    } else {
      alert("Abort Cancel Order ");
    }
  }

}
