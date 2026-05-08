import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DateformatterService {

constructor(private datepipe:DatePipe) { }

DateFormatter(date:Date){
  if(date!=null){
    let lDate=this.datepipe.transform(date,'MM-dd-yyyy'); 
        return new Date(lDate);

  }
  

}

}
