import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visitor-welcome',
  templateUrl: './visitor-welcome.component.html',
  styleUrls: ['./visitor-welcome.component.scss']
})
export class VisitorWelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  Nextpage(){
    alert('test');
    window.open("/visitor-manage/visitor-info", '_blank');
  }


  // Nextpage1(event: any){

  //   window.open("/visitor-manage/visitor-info", '_blank');
  // }


  public add_showroom() {
    alert('test test');
  }
}
