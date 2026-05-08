import { Component, OnInit } from '@angular/core';
import { VisitorManageService } from '../../services/visitor-manage.service';

@Component({
  selector: 'app-visitor-bar-chart',
  templateUrl: './visitor-bar-chart.component.html',
  styleUrls: ['./visitor-bar-chart.component.scss']
})
export class VisitorBarChartComponent implements OnInit {
  basicData: any;
  poReportList: any[];
  PLabel = new Array();
  VmsReceivedQty = new Array();
  // PoReceivedQty 
  PoReceivedUnitPrice = new Array();
  PoDelUnitPrice = new Array();
  PoDelQty = new Array();
  CM = new Array();
  basicOptions: any;

  constructor(
     
  public service: VisitorManageService,
 
  ) {}

  ngOnInit() {
    this.GetVMSSummary();
  }

  LoadBarChart() {
    this.basicData = {
      labels: this.PLabel,
      datasets: [
        {
          label: "Monthwise Visitor Count",
          backgroundColor: "#42A5F5",
          data: this.VmsReceivedQty,
        },   
       
   
      ],
    };

    //console.log(this.basicData);
  }

  GetVMSSummary() {
    this.poReportList = [];
      this.service.GetMonthwiseData().subscribe((res: any[]) => {    
        if (res) {
       //   console.log(res);
          this.poReportList = res;
          this.GetDynamicValue();
        }
      },
      (error) => {
        this.poReportList = [];
      }
    );
  }

  GetDynamicValue() {
    this.PLabel = [];
    this.VmsReceivedQty = [];
 
    for (var i = 0; i < this.poReportList.length; i++) {
      this.PLabel.push(this.poReportList[i].monthyear);
      this.VmsReceivedQty.push(this.poReportList[i].thisMonthcount);
  
    }
    //console.log(JSON.stringify(this.PLabel));
    this.LoadBarChart();
  }
}
