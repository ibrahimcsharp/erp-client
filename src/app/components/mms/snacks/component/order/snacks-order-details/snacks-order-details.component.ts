import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MmsSnackService } from '../../../services/snacks.service';

@Component({
  selector: 'app-snacks-order-details',
  templateUrl: './snacks-order-details.component.html',
  styleUrls: ['./snacks-order-details.component.scss']
})
export class SnacksOrderDetailsComponent implements OnInit {
  title="Snacks Order Details"
  constructor(public snackService:MmsSnackService,
    public bsModalRef: BsModalRef,) { }

  ngOnInit(): void {
  }

}
