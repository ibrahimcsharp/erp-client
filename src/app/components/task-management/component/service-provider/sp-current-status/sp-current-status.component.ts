import { Component, OnInit } from '@angular/core';
import { TaskCommonService } from '../../../services/task.common.service';

@Component({
  selector: 'app-sp-current-status',
  templateUrl: './sp-current-status.component.html',
  styleUrls: ['./sp-current-status.component.scss']
})
export class SpCurrentStatusComponent implements OnInit {

  constructor(public taskCommonService:TaskCommonService) { }

  ngOnInit(): void {
  }

}
