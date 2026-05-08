import { Component, OnInit } from '@angular/core';
import { MmsSnackService } from '../../../services/snacks.service';

@Component({
  selector: 'app-snack-damage-list',
  templateUrl: './snack-damage-list.component.html',
  styleUrls: ['./snack-damage-list.component.scss']
})
export class SnackDamageListComponent implements OnInit {

  constructor(public snackService:MmsSnackService) { }

  ngOnInit(): void {
  }

}
