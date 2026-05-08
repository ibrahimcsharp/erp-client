import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/shared/service/spinner.service';
import { MmsSnackService } from '../../../services/snacks.service';

@Component({
  selector: 'app-snacks-received-history',
  templateUrl: './snacks-received-history.component.html',
  styleUrls: ['./snacks-received-history.component.scss']
})
export class SnacksReceivedHistoryComponent implements OnInit {

  bsModalRef: BsModalRef;
  spinnerName = "listSpinner";
  constructor(private modalService: BsModalService,
    private spinner: SpinnerService,
    private toaster: ToastrService,
    public snackService: MmsSnackService) { }

  ngOnInit(): void {
    this.snackService.GetReceivedItems();
  }

  

}
