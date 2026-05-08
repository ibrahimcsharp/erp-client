import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-planing-board',
  templateUrl: './planing-board.component.html',
  styleUrls: ['./planing-board.component.scss']
})
export class PlaningBoardComponent implements OnInit {

  constructor(
    private router: Router,
    public authService: AuthService,
    private location: Location  
  ) { }

  ngOnInit(): void {
    this.openPlaningBoard();
    this.location.back();
  }

  openPlaningBoard(){
    debugger
    var userId = this.authService.decodedToken?.unique_name;
   
// const url = 'http://192.168.15.15:3000';
// const tokenPattern = `${url}-token`;
// localStorage.removeItem(tokenPattern);
/// it will  not work here$   
    this.router.navigate([]).then((result) => {
      window.open(
        "http://192.168.15.15:3000/#/login?eid="+userId+"&url=planning"
        // "http://192.168.15.15:3000/#/login?eid=010100436&url=planning"
      );
    });
  }

}
