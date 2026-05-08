import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, Message } from 'primeng/api';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { IdmService } from '../../service/idm.service';

@Component({
  selector: 'app-individual-meeting',
  templateUrl: './individual-meeting.component.html',
  styleUrls: ['./individual-meeting.component.scss']
})
export class IndividualMeetingComponent implements OnInit {
  individualMeetingForm: FormGroup;
  noResult = false;
  position: string;
  msgs: Message[] = [];
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: IdmService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.commonService.LoadYearList();
    this.InitializeForm();
  }

  InitializeForm() {
    this.individualMeetingForm = this.fb.group({
             yearId:[null],
             realJanuary:[""],
             realFebruary:[""],
             realMarch:[""],
             realApril:[""],
             realMay:[""],
             realJune:[""],
             realJuly:[""],
             realAugust:[""],
             realSeptember:[""],
             realOctober:[""],
             realNovember:[""],
             realDecember:[""],
             forecastJanuary:[""],
             forecastFebruary:[""],
             forecastMarch :[""],
             forecastApril:[""],
             forecastMay :[""],
             forecastJune :[""],
             forecastJuly :[""],
             forecastAugust :[""],
             forecastSeptember :[""],
             forecastOctober :[""],
             forecastNovember :[""],
             forecastDecember :[""],
    });

  }
  january:string;
  february:string;
  march:string;
  april:string;
  may:string;
  june:string;
  july:string;
  august:string;
  september:string;
  october:string;
  november:string;
  december:string;
  forecastMeeting:number = 0;
  realMeeting:number = 0;

  changeYear(){
    debugger
    var year = this.commonService.YearSelectList.find(x=>x.value ==this.individualMeetingForm.value.yearId);
    this.january = year.label+"-01-01";
    this.february = year.label+"-02-01";
    this.march = year.label+"-03-01";
    this.april = year.label+"-04-01";
    this.may =  year.label+"-05-01";
    this.june =  year.label+"-06-01";
    this.july =  year.label+"-07-01";
    this.august =  year.label+"-08-01";
    this.september =  year.label+"-09-01";
    this.october =  year.label+"-10-01";
    this.november =  year.label+"-11-01";
    this.december =  year.label+"-12-01";

    this.service.GetAllIndividualMeeting(this.individualMeetingForm.value.yearId).subscribe(
      (res: any) => {       
        console.log('meetingList List');
        console.log(res);

        if(res !=null){
            this.individualMeetingForm.patchValue({
              yearId:res.yearId,
              realJanuary:this.datePipe.transform(res.realJanuary, "yyyy-MM-dd"),
              realFebruary:this.datePipe.transform(res.realFebruary, "yyyy-MM-dd"),
              forecastMarch :this.datePipe.transform(res.forecastMarch, "yyyy-MM-dd"),
              realMarch:this.datePipe.transform(res.realMarch, "yyyy-MM-dd"),
              realApril:this.datePipe.transform(res.realApril, "yyyy-MM-dd"),
              realMay:this.datePipe.transform(res.realMay, "yyyy-MM-dd"),
              realJune:this.datePipe.transform(res.realJune, "yyyy-MM-dd"),
              realJuly:this.datePipe.transform(res.realJuly, "yyyy-MM-dd"),
              realAugust:this.datePipe.transform(res.realAugust, "yyyy-MM-dd"),
              realSeptember:this.datePipe.transform(res.realSeptember, "yyyy-MM-dd"),
              realOctober:this.datePipe.transform(res.realOctober, "yyyy-MM-dd"),
              realNovember:this.datePipe.transform(res.realNovember, "yyyy-MM-dd"),
              realDecember:this.datePipe.transform(res.realDecember, "yyyy-MM-dd"),
              forecastJanuary:this.datePipe.transform(res.forecastJanuary, "yyyy-MM-dd"),
              forecastFebruary:this.datePipe.transform(res.forecastFebruary, "yyyy-MM-dd"),
              
              forecastApril:this.datePipe.transform(res.forecastApril, "yyyy-MM-dd"),
              forecastMay :this.datePipe.transform(res.forecastMay, "yyyy-MM-dd"),
              forecastJune :this.datePipe.transform(res.forecastJune, "yyyy-MM-dd"),
              forecastJuly :this.datePipe.transform(res.forecastJuly, "yyyy-MM-dd"),
              forecastAugust :this.datePipe.transform(res.forecastAugust, "yyyy-MM-dd"),
              forecastSeptember :this.datePipe.transform(res.forecastSeptember, "yyyy-MM-dd"),
              forecastOctober :this.datePipe.transform(res.forecastOctober, "yyyy-MM-dd"),
              forecastNovember :this.datePipe.transform(res.forecastNovember, "yyyy-MM-dd"),
              forecastDecember :this.datePipe.transform(res.forecastDecember, "yyyy-MM-dd"),
          });
          console.log('meetingList assign to form value');
          console.log(this.individualMeetingForm.value);
          this.forecastMeeting = 0;
          this.realMeeting = 0;

          if(res.forecastJanuary!=undefined && res.forecastJanuary!=null && res.forecastJanuary!=""){
          this.forecastMeeting = this.forecastMeeting+1;
          }

          if(res.forecastFebruary!=undefined && res.forecastFebruary!=null && res.forecastFebruary!=""){
          this.forecastMeeting = this.forecastMeeting+1;
          }

          if(res.forecastMarch!=undefined && res.forecastMarch!=null && res.forecastMarch!=""){
          this.forecastMeeting = this.forecastMeeting+1;
          }

          if(res.forecastApril!=undefined && res.forecastApril!=null && res.forecastApril!=""){
          this.forecastMeeting = this.forecastMeeting+1;
          }

          if(res.forecastMay!=undefined && res.forecastMay!=null && res.forecastMay!=""){
          this.forecastMeeting = this.forecastMeeting+1;
          }
          if(res.forecastJune!=undefined && res.forecastJune!=null && res.forecastJune!=""){
          this.forecastMeeting = this.forecastMeeting+1;
          }

          if(res.forecastJuly!=undefined && res.forecastJuly!=null && res.forecastJuly!=""){
          this.forecastMeeting = this.forecastMeeting+1;
          }

          if(res.forecastAugust!=undefined && res.forecastAugust!=null && res.forecastAugust!=""){
          this.forecastMeeting = this.forecastMeeting+1;
          }

          if(res.forecastSeptember!=undefined && res.forecastSeptember!=null && res.forecastSeptember!=""){
          this.forecastMeeting = this.forecastMeeting+1;
          }

          if(res.forecastOctober!=undefined && res.forecastOctober!=null && res.forecastOctober!=""){
          this.forecastMeeting = this.forecastMeeting+1;
          }

          if(res.forecastNovember!=undefined && res.forecastNovember!=null && res.forecastNovember!=""){
          this.forecastMeeting = this.forecastMeeting+1;
          }

          if(res.forecastDecember!=undefined && res.forecastDecember!=null && res.forecastDecember!=""){
          this.forecastMeeting = this.forecastMeeting+1;
          }


          if(res.realJanuary!=undefined && res.realJanuary!=null && res.realJanuary!=""){
          this.realMeeting = this.realMeeting+1;
          }

          if(res.realFebruary!=undefined && res.realFebruary!=null && res.realFebruary!=""){
          this.realMeeting = this.realMeeting+1;
          }

          if(res.realMarch!=undefined && res.realMarch!=null && res.realMarch!=""){
          this.realMeeting = this.realMeeting+1;
          }

          if(res.realApril!=undefined && res.realApril!=null && res.realApril!=""){
          this.realMeeting = this.realMeeting+1;
          }

          if(res.realMay!=undefined && res.realMay!=null && res.realMay!=""){
          this.realMeeting = this.realMeeting+1;
          }
          if(res.realJune!=undefined && res.realJune!=null && res.realJune!=""){
          this.realMeeting = this.realMeeting+1;
          }

          if(res.realJuly!=undefined && res.realJuly!=null && res.realJuly!=""){
          this.realMeeting = this.realMeeting+1;
          }

          if(res.realAugust!=undefined && res.realAugust!=null && res.realAugust!=""){
          this.realMeeting = this.realMeeting+1;
          }

          if(res.realSeptember!=undefined && res.realSeptember!=null && res.realSeptember!=""){
          this.realMeeting = this.realMeeting+1;
          }

          if(res.realOctober!=undefined && res.realOctober!=null && res.realOctober!=""){
          this.realMeeting = this.realMeeting+1;
          }

          if(res.realNovember!=undefined && res.realNovember!=null && res.realNovember!=""){
          this.realMeeting = this.realMeeting+1;
          }

          if(res.realDecember!=undefined && res.realDecember!=null && res.realDecember!=""){
          this.realMeeting = this.realMeeting+1;
          }
        }
        else{
          this.individualMeetingForm.patchValue({
             realJanuary:[""],
             realFebruary:[""],
             realMarch:[""],
             realApril:[""],
             realMay:[""],
             realJune:[""],
             realJuly:[""],
             realAugust:[""],
             realSeptember:[""],
             realOctober:[""],
             realNovember:[""],
             realDecember:[""],
             forecastJanuary:[""],
             forecastFebruary:[""],
             forecastMarch :[""],
             forecastApril:[""],
             forecastMay :[""],
             forecastJune :[""],
             forecastJuly :[""],
             forecastAugust :[""],
             forecastSeptember :[""],
             forecastOctober :[""],
             forecastNovember :[""],
             forecastDecember :[""],
        });
        }
        
      },
      (error) => {
        this.toastr.error("Failed to Fetch Plesure List");
        
      }
    );
  }

  onSubmit(){
    console.log('Before converting');
    console.log(this.individualMeetingForm.value);
    if(this.individualMeetingForm.value.forecastJanuary==undefined || this.individualMeetingForm.value.forecastJanuary ==""){
      this.individualMeetingForm.value.forecastJanuary = null;
    }
    
    if(this.individualMeetingForm.value.forecastFebruary==undefined || this.individualMeetingForm.value.forecastFebruary==""){
      this.individualMeetingForm.value.forecastFebruary = null;
     }

     if(this.individualMeetingForm.value.forecastMarch==undefined  || this.individualMeetingForm.value.forecastMarch==""){
      this.individualMeetingForm.value.forecastMarch = null;
     }

     if(this.individualMeetingForm.value.forecastApril==undefined  || this.individualMeetingForm.value.forecastApril==""){
      this.individualMeetingForm.value.forecastApril = null;
     }

     if(this.individualMeetingForm.value.forecastMay==undefined  || this.individualMeetingForm.value.forecastMay==""){
      this.individualMeetingForm.value.forecastMay = null;
     }
     if(this.individualMeetingForm.value.forecastJune==undefined  || this.individualMeetingForm.value.forecastJune==""){
      this.individualMeetingForm.value.forecastJune = null;
     }

     if(this.individualMeetingForm.value.forecastJuly==undefined  || this.individualMeetingForm.value.forecastJuly==""){
      this.individualMeetingForm.value.forecastJuly = null;
     }
  
     if(this.individualMeetingForm.value.forecastAugust==undefined  || this.individualMeetingForm.value.forecastAugust==""){
      this.individualMeetingForm.value.forecastAugust = null;
     }

     if(this.individualMeetingForm.value.forecastSeptember==undefined  || this.individualMeetingForm.value.forecastSeptember==""){
      this.individualMeetingForm.value.forecastSeptember = null;
     }

     if(this.individualMeetingForm.value.forecastOctober==undefined || this.individualMeetingForm.value.forecastOctober==""){
      this.individualMeetingForm.value.forecastOctober = null;
     }

     if(this.individualMeetingForm.value.forecastNovember==undefined  || this.individualMeetingForm.value.forecastNovember==""){
      this.individualMeetingForm.value.forecastNovember = null;
     }
  
     if(this.individualMeetingForm.value.forecastDecember==undefined  || this.individualMeetingForm.value.forecastDecember==""){
      this.individualMeetingForm.value.forecastDecember = null;
     }


    if(this.individualMeetingForm.value.realJanuary==undefined || this.individualMeetingForm.value.realJanuary==""){
      this.individualMeetingForm.value.realJanuary = null;
    }
    
    if(this.individualMeetingForm.value.realFebruary==undefined || this.individualMeetingForm.value.realFebruary==""){
      this.individualMeetingForm.value.realFebruary = null;
     }

     if(this.individualMeetingForm.value.realMarch==undefined  || this.individualMeetingForm.value.realMarch==""){
      this.individualMeetingForm.value.realMarch = null;
     }

     if(this.individualMeetingForm.value.realApril==undefined  || this.individualMeetingForm.value.realApril==""){
      this.individualMeetingForm.value.realApril = null;
     }

     if(this.individualMeetingForm.value.realMay==undefined  || this.individualMeetingForm.value.realMay==""){
      this.individualMeetingForm.value.realMay = null;
     }
     if(this.individualMeetingForm.value.realJune==undefined  || this.individualMeetingForm.value.realJune==""){
      this.individualMeetingForm.value.realJune = null;
     }

     if(this.individualMeetingForm.value.realJuly==undefined  || this.individualMeetingForm.value.realJuly==""){
      this.individualMeetingForm.value.realJuly = null;
     }
  
     if(this.individualMeetingForm.value.realAugust==undefined  || this.individualMeetingForm.value.realAugust==""){
      this.individualMeetingForm.value.realAugust = null;
     }

     if(this.individualMeetingForm.value.realSeptember==undefined  || this.individualMeetingForm.value.realSeptember==""){
      this.individualMeetingForm.value.realSeptember = null;
     }

     if(this.individualMeetingForm.value.realOctober==undefined  || this.individualMeetingForm.value.realOctober==""){
      this.individualMeetingForm.value.realOctober = null;
     }

     if(this.individualMeetingForm.value.realNovember==undefined  || this.individualMeetingForm.value.realNovember==""){
      this.individualMeetingForm.value.realNovember = null;
     }
  
     if(this.individualMeetingForm.value.realDecember==undefined  || this.individualMeetingForm.value.realDecember==""){
      this.individualMeetingForm.value.realDecember = null;
     }
    console.log('After converting');
    console.log(this.individualMeetingForm.value);
    this.service.CreateIndividualMeeting(this.individualMeetingForm.value).subscribe(
      (res) => {
        this.toastr.success("Meeting Saved Successful");
        console.log(res);
        this.changeYear();
        
      },
      (error) => {
        
        this.toastr.error("Failed To Meeting Save");
        console.log(error);
      }
    );
  }

  clear(){
    this.InitializeForm();
  }

}
