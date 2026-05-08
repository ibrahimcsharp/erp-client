import { Component, OnInit } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VisitorManageService } from '../../services/visitor-manage.service';



@Component({
  selector: 'app-visitor-webcam',
  templateUrl: './visitor-webcam.component.html',
  styleUrls: ['./visitor-webcam.component.scss']
})
export class VisitorWebcamComponent implements OnInit {

  [x: string]: any;
  trigger: Subject<void> = new Subject<void>();
  webcamImage!: WebcamImage;
  nextWebcam: Subject<void> = new Subject<void>();
  captureImage = '';
  http: any;
  userIP = '';
  constructor(
    private httpClient: HttpClient,
    public service: VisitorManageService) { }

  ngOnInit(): void {
    //this.LoadUserlocalIP();
  }
  // LoadUserlocalIP() {
  //   this.service.GetUserLocalIP().subscribe(res => {
  //     this.userIP = res.ip;
  //   },
  //     (error) => {
  //       this.toastr.warning("Failed To Load User Ip address", "List");
  //     }
  //   );
  // }

  // stream: any = null;
  // checkpermission() {
  //   debugger
  //   this.userIP.toString();
  //   navigator.mediaDevices.getUserMedia({
  //     video: {

  //       width: 500,
  //       height: 500
  //     }

  //   }).then((res) => {
  //     console.log("response", res);
  //     this.stream = res;
  //   }).catch(err => { console.log(err) })
  // }

  // triggerSnapshot(): void {
  //   this.trigger.next();
  // }

  // handleImage(webcameImage: WebcamImage): void {
  //   this.webcamImage = webcameImage;
  //   this.captureImage = webcameImage!.imageAsDataUrl;
  // }

  // get triggerObservable(): Observable<void> {
  //   return this.trigger.asObservable();
  // }

  // get nextWebcamObservable(): Observable<void> {
  //   return this.trigger.asObservable();

  // }


}
