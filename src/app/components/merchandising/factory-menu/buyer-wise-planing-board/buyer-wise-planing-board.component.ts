import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-buyer-wise-planing-board',
  templateUrl: './buyer-wise-planing-board.component.html',
  styleUrls: ['./buyer-wise-planing-board.component.scss']
})
export class BuyerWisePlaningBoardComponent implements OnInit {

  constructor(
    private router: Router,
    public authService: AuthService,
    private location: Location   
  ) { 

  }

  ngOnInit(): void {
   this.openBuyerWisePlaningBoard()
 this.location.back();
    
  }
  openBuyerWisePlaningBoard() {
    debugger
    var userId = this.authService.decodedToken?.unique_name;    
    this.router.navigate([]).then((result) => {
      window.open(
        "http://192.168.15.15:3000/#/login?eid=" + userId + "&url=buyer_wise_planning"        
      );
    });
  }

}
