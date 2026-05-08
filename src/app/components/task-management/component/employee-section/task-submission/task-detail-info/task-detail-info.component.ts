import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-task-detail-info',
  templateUrl: './task-detail-info.component.html',
  styleUrls: ['./task-detail-info.component.scss']
})
export class TaskDetailInfoComponent implements OnInit {
  model: any = null;
  constructor( public bsModalRef: BsModalRef,) { }

  ngOnInit(): void {
  }

}
