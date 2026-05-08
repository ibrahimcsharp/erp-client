import { Component, OnInit } from '@angular/core';
import { MapModel } from '../../model/map.model';
import { TmsMapService } from '../../service/tms-map.service';
declare var google: any

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

  options: any;
  overlays: any[] = [];
  dialogVisible: boolean = false;
  markerTitle?: string | null;
  selectedPosition: any;
  infoWindow: any;
  draggable: boolean = false;
  allDevice: any;
  constructor(public tmsMapService: TmsMapService) { }

  ngOnInit(): void {
    debugger;
    this.options = {
      center: { lat: 24.3878955, lng: 91.2204211 },
      zoom: 6
    };

    this.initOverlays();

    this.infoWindow = new google.maps.InfoWindow();
  }

  handleMapClick(event: any) {
    this.dialogVisible = true;
    this.selectedPosition = event.latLng;
  }

  handleOverlayClick(event: any) {
    let isMarker = event.overlay.getTitle != undefined;

    if (isMarker) {
      let title = event.overlay.getTitle();
      this.infoWindow.setContent('' + title + '');
      this.infoWindow.open(event.map, event.overlay);
      event.map.setCenter(event.overlay.getPosition());


    }
    else {

    }
  }

  addMarker() {
    this.overlays.push(new google.maps.Marker({ position: { lat: this.selectedPosition.lat(), lng: this.selectedPosition.lng() }, title: this.markerTitle, draggable: this.draggable }));
    this.markerTitle = null;
    this.dialogVisible = false;
  }

  handleDragEnd(event: any) {
  }

  initOverlays() {
    this.tmsMapService.LiveTracDataAll().subscribe(
      (data: any[]) => {
        console.log(data);
        this.allDevice = data;
        //const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
        const image = "";
        if (!this.overlays || !this.overlays.length) {

          for (var i = 0; i < this.allDevice.data.length; i++) {
            var deviceTitle: string = "";
            deviceTitle += "Name : " + this.allDevice.data[i].name;
            deviceTitle += "Date Time : " + this.allDevice.data[i].time;
            deviceTitle += "Speed : " + this.allDevice.data[i].speed;
            deviceTitle += "Engine Status : " + this.allDevice.data[i].engine_status;
            deviceTitle += "Stop Duration : " + this.allDevice.data[i].stop_duration;

            this.overlays = [
              new google.maps.Marker({ position: { lat: this.allDevice.data[i].latitude, lng: this.allDevice.data[i].longitude }, title: deviceTitle, icon: image, }),
            ];
          }


        }
      },
      (error) => {
      }
    );



  }

  zoomIn(map: any) {
    console.log(map);
    map.setZoom(map.getZoom() + 1);

  }

  zoomOut(map: any) {
    map.setZoom(map.getZoom() - 1);
  }

  clear() {
    this.overlays = [];
  }


}
