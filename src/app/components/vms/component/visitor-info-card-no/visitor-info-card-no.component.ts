import { FlexibleConnectedPositionStrategyOrigin } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VisitorManageService } from '../../services/visitor-manage.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-visitor-info-card-no',
  templateUrl: './visitor-info-card-no.component.html',
  // template: `<div class="notification is-primary">
  // <h3> Child</h3>
  // Say {{message}}
  // `,
  styleUrls: ['./visitor-info-card-no.component.scss']
})
export class VisitorInfoCardNoComponent implements OnInit {
  // step: any = 1;
  VisitorInfoForm: FormGroup;

  // @Input() message: string;
  id: string;
  visitorData:any;
  imagePath:any;
  constructor(
    private route: ActivatedRoute,
    public service: VisitorManageService,
    private _sanitizer: DomSanitizer
  ) {

  }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.getVmsUser(Number(this.id));
  }


  getVmsUser(id: number){
    this.service.GetVmsDataById(id).subscribe(  
    (res: any) => {
      
      this.visitorData = res;
    
      this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
      + this.visitorData.visitorimage);
      //this.purchaseItemList = res;     
       
    },
    (error) => {
   //   this.toaster.error("Failed to load Requisition Items");     
       
    }
  );
  }

  // submit() {
  //   this.step = this.step + 1;
  // }
  // previous(){
  //   this.step = this.step - 1;
  // }
}

// export class VisitorInfoCardNoComponent implements OnInit {
 
//   showWebcam = true;
//   isCameraExist = true;
//   //isCameraExists=true;
//   errors: WebcamInitError[] = [];

//   private trigger: Subject<void> = new Subject<void>();
//   private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

//   constructor() { }

//   ngOnInit(): void {
//     WebcamUtil.getAvailableVideoInputs().then(
//       (mediaDevices: MediaDeviceInfo[]) => {
//         this.isCameraExist = mediaDevices && MediaDevices.length > 0;
//       }
//     );
//   }

//   takeSnapshot(): void {

//     this.trigger.next();
//   }

//   onOffWebCame() {
//     this.showWebcam = !this.showWebcam;
//   }

//   handleInitWeeo(error: WebcamInitError) {
//     this.errors.push(error);
//   }

//   changeWebCame(directionOrDeviceId: boolean | string) {
//     this.nextWebcam.next(directionOrDeviceId);
//   }

//   handleImage(webcamImage: WebcamImage) {
//     //this.getPicture.emit(webcamImage);
//     this.showWebcam = false;
//   }

//   get triggerObservable(): Observable<void> {
//     return this.trigger.asObservable();
//   }

//   get nextWebcamObservable(): Observable<boolean | string> {
//     return this.nextWebcam.asObservable();

//   }

// }
