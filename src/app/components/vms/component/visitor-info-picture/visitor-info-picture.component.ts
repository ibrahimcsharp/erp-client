import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-visitor-info-picture',
  templateUrl: './visitor-info-picture.component.html',
  styleUrls: ['./visitor-info-picture.component.scss']
})
export class VisitorInfoPictureComponent implements OnInit {

  WIDTH = 640;
  HEIGHT = 480;

  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

  captures: string[] = [];
  error: any;
  isCaptured: boolean;
  // @ViewChild("video")
  // public video: ElementRef;

  // @ViewChild("canvas")
  // public canvas: ElementRef;

  // public captures: Array<any>;
  constructor() {
    //this.captures = [];
  }

  ngOnInit(): void {
  }

  async ngAfterViewInit() {
    await this.setupDevices();
  }

  stream: any = null;
  checkpermission() {
    navigator.mediaDevices.getUserMedia({
        video: {
  
          width: 500,
          height: 500
        }
  
      }).then((res) => {
        console.log("response", res);
        this.stream = res;
      }).catch(err => { console.log(err) })
    }

  //   public ngAfterViewInit() {
  //     //var stream: any;
  //     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //       navigator.mediaDevices.getUserMedia({ video: true }).then(data => {
  //         var binaryData = [];
  //         binaryData.push(data);
  //         this.video.nativeElement.src = window.URL.createObjectURL(new Blob(binaryData, { type: "application/zip" }));
  //         this.video.nativeElement.play();
  //       });
  //     }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = "You have no output video device";
        }
      } catch (e) {
        this.error = e;
      }
    }
  }

  //   public ngAfterViewInit() {
  //     if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //         navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  //             //this.video.nativeElement.src = window.URL.createObjectURL(stream);
  //             this.video.nativeElement.srcObject = stream;
  //             this.video.nativeElement.play();
  //         });
  //     }
  // }

  capture() {
    this.drawImageToCanvas(this.video.nativeElement);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
    this.isCaptured = true;
  }

  removeCurrent() {
    this.isCaptured = false;
  }

  setPhoto(idx: number) {
    this.isCaptured = true;
    var image = new Image();
    image.src = this.captures[idx];
    this.drawImageToCanvas(image);
  }

  drawImageToCanvas(image: any) {
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }


  // public capture() {
  //     var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
  //     this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
  // }
  //   @ViewChild("video")
  //   public video: ElementRef;

  //   @ViewChild("canvas")
  //   public canvas: ElementRef;

  //   public captures: Array<any>;

  //   public constructor() {
  //     this.captures = [];
  //   }



  //   public ngOnInit() { }

  //   //   var binaryData = [];
  //   // binaryData.push(data);
  //   // window.URL.createObjectURL(new Blob(binaryData, {type: "application/zip"}))

  //   //ok
  //   public ngAfterViewInit() {
  //     //var stream: any;
  //     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //       navigator.mediaDevices.getUserMedia({ video: true }).then(data => {
  //         var binaryData = [];
  //         binaryData.push(data);
  //         this.video.nativeElement.src = window.URL.createObjectURL(new Blob(binaryData, { type: "application/zip" }));
  //         this.video.nativeElement.play();
  //       });
  //     }

  //   }

  //   // public ngAfterViewInit() {
  //   //   if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //   //       navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  //   //         _video.src = window.URL.createObjectURL(stream);
  //   //         //  this.video.nativeElement.src =  stream;
  //   //           this.video.nativeElement.play();
  //   //       });
  //   //   }
  // //}
  // // public ngAfterViewInit() {
  // //   if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  // //       navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  // //           this.video.nativeElement.src = window.URL.createObjectURL(stream);
  // //           this.video.nativeElement.play();
  // //       });
  // //   }
  // // }

  // // public takePicture(event?: any): void {
  // //   const vid = document.getElementById("videoelementId")
  // //   navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
  // //   .then(stream => vid.srcObject = stream);
  // // }


  //   public capture() {
  //     var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
  //     this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
  //   }

}