import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'app-visitor-info-confirm',
  templateUrl: './visitor-info-confirm.component.html',
  styleUrls: ['./visitor-info-confirm.component.scss']
})
export class VisitorInfoConfirmComponent implements OnInit {
    @Output() getPicture = new EventEmitter<WebcamImage>();

  showWebcam = true;
  isCameraExist = true;
  errors: WebcamInitError[] = [];

  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
 
  constructor() { }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.isCameraExist = mediaDevices && MediaDevices.length > 0;
      }
    );
  }

  takeSnapshot(): void {
    this.trigger.next();
  }

  onOffWebCame() {
    this.showWebcam = !this.showWebcam;
  }

  // handleInitError(error: WebcamInitError) {
  //   this.errors.push(error);
  // }

 
  stream: any = null;
  // checkpermission() {
  // navigator.mediaDevices.getUserMedia({
  //     video: {

  //       width: 500,
  //       height: 500
  //     }

  //   }).then((res) => {
  //     console.log("response", res);
  //     this.stream = res;
  //   }).catch(err => { console.log(err) })
  // }

  handleImage(webcamImage: WebcamImage): void {
    //console.log(webcamImage);
    this.getPicture.emit(webcamImage);
    this.showWebcam = false;
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();

  }
 

}
