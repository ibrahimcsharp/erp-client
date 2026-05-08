import { Component, OnInit } from '@angular/core';
import { VisitorManageService } from '../../services/visitor-manage.service';

@Component({
  selector: 'app-visitor-frequent',
  templateUrl: './visitor-frequent.component.html',
  styleUrls: ['./visitor-frequent.component.scss']
})
export class VisitorFrequentComponent implements OnInit {
  frequentVisitorList: any[];
  toastr: any;
  constructor(
    public service: VisitorManageService,
  ) { }

  ngOnInit(): void {
    this.getAllPendingList();
  }
  
  CardView(id: number) {
    window.open("/visitor-manage/visitor-info-card-no/" + id, '_blank');
  }

  getAllPendingList() {
   
    this.service.GetFrequentVisitorList().subscribe((res: any[]) => {
      this.frequentVisitorList = res;
      //console.log("frequentVisitorList:",this.frequentVisitorList);
    },
      (error) => {
        this.toastr.error("Failed to Load  pending List");

      }
    );
  }
}
