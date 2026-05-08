import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/shared/service/spinner.service';
import { MmsSnackService } from '../../../services/snacks.service';
import { SnacksOrderDetailsComponent } from '../snacks-order-details/snacks-order-details.component';

@Component({
  selector: 'app-snacks-order-history',
  templateUrl: './snacks-order-history.component.html',
  styleUrls: ['./snacks-order-history.component.scss']
})
export class SnacksOrderHistoryComponent implements OnInit {

  Items: any[];
  bsModalRef: BsModalRef;
  spinnerName = "listSpinner";
  constructor(private modalService: BsModalService,
    private spinner: SpinnerService,
    private toaster: ToastrService,
    public snackService: MmsSnackService) { }

  ngOnInit(): void {
    this.snackService.GetOrderedItems(1,null,null);
  }
 
  Details(obj:any){
    this.snackService.orderDetails=obj.list;
    this.bsModalRef=this.modalService.show(SnacksOrderDetailsComponent,{
      initialState:{
        title:"Snacks Ordered Details Items",
      },
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg",

    });

  }


}
