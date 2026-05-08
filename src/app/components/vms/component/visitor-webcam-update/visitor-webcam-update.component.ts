import { Component, OnInit } from '@angular/core'; 
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-visitor-webcam-update',
  templateUrl: './visitor-webcam-update.component.html',
  styleUrls: ['./visitor-webcam-update.component.scss']
})
export class VisitorWebcamUpdateComponent implements OnInit {

  test : any;
  src : any;
  camon : {}
  turnOff : {}
  retake = {};
  title = 'lib-getMyPhoto';
  constructor(public sanitizer: DomSanitizer ) { }

  ngOnInit(): void {
  }

  Capture(){
    this.test = {capture : true};


  }
  CamOn(){
    this.camon = {camOn : true};

  }
  getImag(data){
   console.log(data);
   this.src = this.sanitizer.bypassSecurityTrustUrl(data as any);

  }


  Retake(){
    this.retake = {retake : true};
  }
  Off(){
    this.turnOff = {turnOff : true};
  }
}
