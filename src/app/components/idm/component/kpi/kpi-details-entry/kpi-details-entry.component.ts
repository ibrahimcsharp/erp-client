import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IdmService } from '../../../service/idm.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-kpi-details-entry',
  templateUrl: './kpi-details-entry.component.html',
  styleUrls: ['./kpi-details-entry.component.scss']
})
export class KpiDetailsEntryComponent implements OnInit {
  kpiForm: FormGroup;
  doubleTypeTotalValOne=0;
  doubleTypeTotalValOnePrevYr=0;
  doubleTypeTotalValTwo=0;
  doubleTypeTotalValTwoPrevYr=0;
  doubleTypeTotalValFirstAvg=0;
  doubleTypeTotalValSecAvg=0;

  tripleTypeTotalValOne=0;
  tripleTypeTotalValTwo=0;
  tripleTypeTotalValThree=0;
  tripleTypeTotalValFirstAvg=0;
  tripleTypeTotalValSecAvg=0;

  constructor(
    private fb: FormBuilder,
    public service: IdmService,
    private toastr: ToastrService,
  
  ) { }

  ngOnInit(): void {
    this.InitKpiForm();
    this.getAllKpiAssigned(); 
    
  }

  InitKpiForm() {
    this.kpiForm = this.fb.group({
      
      id: [0],
      mstId: [0],
      departmentName: [""],
      kpiName: [""],
      employeeId: [0],
      employeeName:[""],
      leaderId: [0],
      leaderName:[""],
      coLeaderId: [0],
      coLeaderName:[""],   
      targetNumber: [0],
      ytdValue:[0],
      weightNumber: [0],
      typeName: ["0"],
      january: [0],
      february: [0],
      march: [0],
      april: [0],
      may: [0],
      june: [0],
      july: [0],
      august: [0],
      september: [0],
      october: [0],
      november: [0],
      december: [0],
      firstAverage:[0],
      secondAverage:[0],
      yearId:[new Date().getFullYear()],
      previousYearId:[new Date().getFullYear()-1],
      
      kpiAssignMstId:[""],
      doubleTypeColOne:[""],
      doubleTypeColTwo:[""],
      tripleTypeColThree:[""],
      tripleTypeColTwo:[""],
      tripleTypeColOne:[""],
      avgKpiOneTitle:[""],
      avgKpiTwoTitle:[""],    

      Month: [""], 
      doubleTypeValOne: [0],
      dblTypValOnePrevYr: [0],
      doubleTypeValTwo:[0] ,
      dblTypValTwoPrevYr:[0] ,
      tripleTypeValOne: [0],
      tripleTypeValTwo: [0],
      tripleTypeValThree: [0] ,
    });
  }


  allKpiAssignedList: any[];
  getAllKpiAssigned() {
    this.service.GetAssignedKpitBySupervisorId().subscribe(
      (res: any[]) => {
        this.allKpiAssignedList = res;
        console.log('KPI List',this.allKpiAssignedList);
      },
      (error) => {
        this.toastr.error("Failed to Fetch Assigned Kpi List");

      }
    );
  }

  
  kpidetails: any;
  kpidetailsDisplay: boolean=false;
  kpidetailsDisplay2: boolean=false;
  getKpiDetailsDisplay(kpi: any) {

  this.KpiDetailClear();
  this.InitKpiForm(); 

  if(kpi.formatTypeName=='Triple'){
    this.kpidetailsDisplay2=true;
    this.kpidetailsDisplay=false;
  }
  else{
    this.kpidetailsDisplay=true;
    this.kpidetailsDisplay2=false;
  }
  
   this.kpidetails = [];
   debugger
    this.service.GetDetailKpitByMstId(kpi.id).subscribe(
      (res: any[]) => {
        this.kpidetails = res;

        this.kpidetails = this.kpidetails.map(kpidetail => {
          kpidetail.mstId = kpi.id;
          kpidetail.kpiAssignMstId = kpi.id;
          return kpidetail;
        });
        console.log('kpidetails', this.kpidetails);

        //this.kpidetailsDisplay = true;
          this.kpiForm.patchValue
          ({          
            departmentName: kpi.departmentName,
            kpiName: kpi.kpiName,
            employeeId: kpi.employeeId,
            employeeName: kpi.employeeName,
            leaderId: kpi.leaderId,
            leaderName: kpi.leaderName,
            coLeaderId: kpi.coLeaderId,
            coLeaderName: kpi.coLeaderName,
            targetNumber: kpi.targetNumber,
            weightNumber: kpi.weightNumber,
            typeName: kpi.typeName,
            doubleTypeColOne: kpi.doubleTypeColOne,
            doubleTypeColTwo: kpi.doubleTypeColTwo,
            tripleTypeColThree: kpi.tripleTypeColThree,
            tripleTypeColTwo: kpi.tripleTypeColTwo,
            tripleTypeColOne: kpi.tripleTypeColOne,
            avgKpiOneTitle: kpi.avgKpiOneTitle,
            avgKpiTwoTitle: kpi.avgKpiTwoTitle,

            ytdValue:kpi.ytdValue,
          
            mstId:kpi.id,
            kpiAssignMstId:kpi.id,
            Month: this.kpidetails.Month,
            doubleTypeValOne: this.kpidetails.doubleTypeValOne,
            dblTypValOnePrevYr: this.kpidetails.dblTypValOnePrevYr,
            doubleTypeValTwo: this.kpidetails.doubleTypeValTwo,
            dblTypValTwoPrevYr: this.kpidetails.dblTypValTwoPrevYr,
            tripleTypeValOne: this.kpidetails.tripleTypeValOne,
            tripleTypeValTwo: this.kpidetails.tripleTypeValTwo,
            tripleTypeValThree: this.kpidetails.tripleTypeValThree,
            firstAverage: this.kpidetails.firstAverage,
            secondAverage: this.kpidetails.secondAverage,
            yearId: this.kpidetails[0].yearId,
            previousYearId: this.kpidetails[0].yearId- 1, 
          });
          console.log('get', this.kpiForm)
          this.tripleTypeCal(res);
          this.doubleTypeCalInit(res)
            // this.showMissionApproveStatus = null;
        },
        (error) => {
          this.toastr.error("Failed to Load Kpi Details");  
        }
  );
  }


  
KpiDetailClear(){
  this.kpiForm.reset();
 }
 
 
   onSaveKpiDetail() {
     if (this.kpiForm.valid) {
      console.log('kpi form save ',this.kpiForm);
      console.log('list ', this.kpidetails);
       this.service.SaveKpiDetails(this.kpiForm.value,this.kpidetails).subscribe(
         (res) => {
           this.toastr.success("KPI Saved Successfully");
           this.kpidetailsDisplay = false;
           this.kpidetailsDisplay2 = false;
           this.KpiDetailClear();
           
         },
         (error) => {
           console.log('onsubmit error');
           console.log(error);
           this.toastr.error("Failed To Save KPI Details");
 
         }
       );
     } else {
       this.toastr.error("Invalid KPI Details!");
     }
   }


   //triple type  calculation
   tripleTypeCal(obj:any){
    debugger
    this.tripleTypeTotalValOne = this.kpidetails.reduce((sum, list) => sum + list.tripleTypeValOne, 0);
    this.tripleTypeTotalValTwo = this.kpidetails.reduce((sum, list) => sum + list.tripleTypeValTwo, 0);
    this.tripleTypeTotalValThree = this.kpidetails.reduce((sum, list) => sum + list.tripleTypeValThree, 0);
    var countFirstAverage = this.kpidetails.filter(item => item.firstAverage > 0).length;
    var countSecondAverage = this.kpidetails.filter(item => item.secondAverage > 0).length;
    if(countFirstAverage >0 ){
      var totalFirstAvg = this.kpidetails.reduce((sum, list) => sum + list.firstAverage, 0);
      this.tripleTypeTotalValFirstAvg = parseFloat((totalFirstAvg / countFirstAverage).toFixed(6));
    }else{this.tripleTypeTotalValFirstAvg = 0;}
    if(countSecondAverage >0 ){
      var totalSecondAvg = this.kpidetails.reduce((sum, list) => sum + list.secondAverage, 0);
      this.tripleTypeTotalValSecAvg =  parseFloat((totalSecondAvg / countSecondAverage).toFixed(6));
    }else{this.tripleTypeTotalValSecAvg = 0;}
 }


//triple type  calculation
   tripleTypeCalFstCol(obj:any){
    debugger
    if(obj.tripleTypeValOne == 0){
      this.toastr.warning("First Column Can Not Be Zero !!");
      obj.tripleTypeValOne = 0;
      obj.tripleTypeValTwo = 0;
      obj.tripleTypeValThree = 0;
      obj.firstAverage = 0;
      obj.secondAverage = 0;
    }
    else{
      obj.firstAverage=parseFloat((obj.tripleTypeValTwo / obj.tripleTypeValOne).toFixed(6));
      obj.secondAverage=parseFloat((obj.tripleTypeValThree / obj.tripleTypeValOne).toFixed(6));
    }
    //for total calculation in footer
   this.tripleTypeTotalValOne = this.kpidetails.reduce((sum, list) => sum + list.tripleTypeValOne, 0);
   this.tripleTypeTotalValTwo = this.kpidetails.reduce((sum, list) => sum + list.tripleTypeValTwo, 0);
   this.tripleTypeTotalValThree = this.kpidetails.reduce((sum, list) => sum + list.tripleTypeValThree, 0);
   
   var countFirstAverage = this.kpidetails.filter(item => item.firstAverage > 0).length;
   var countSecondAverage = this.kpidetails.filter(item => item.secondAverage > 0).length;

   if(countFirstAverage >0 ){
    var totalFirstAvg = this.kpidetails.reduce((sum, list) => sum + list.firstAverage, 0);
    this.tripleTypeTotalValFirstAvg = parseFloat((totalFirstAvg / countFirstAverage).toFixed(6));
  }else{this.tripleTypeTotalValFirstAvg = 0;}

  if(countSecondAverage >0 ){
    var totalSecondAvg = this.kpidetails.reduce((sum, list) => sum + list.secondAverage, 0);
    this.tripleTypeTotalValSecAvg = parseFloat((totalSecondAvg / countSecondAverage).toFixed(6));
  }else{this.tripleTypeTotalValSecAvg = 0;}
 }


   tripleTypeCalAvgSecCol(obj:any){
    debugger
    if(obj.tripleTypeValOne == 0){
      this.toastr.warning("Unable calculation Average: First column cannot be zero!");
      obj.tripleTypeValTwo = 0;
      obj.firstAverage = 0;
    }
    else{
      obj.firstAverage=parseFloat((obj.tripleTypeValTwo / obj.tripleTypeValOne).toFixed(6));
    }
    //for total calculation in footer
    this.tripleTypeTotalValOne = this.kpidetails.reduce((sum, list) => sum + list.tripleTypeValOne, 0);
    this.tripleTypeTotalValTwo = this.kpidetails.reduce((sum, list) => sum + list.tripleTypeValTwo, 0);
    this.tripleTypeTotalValThree = this.kpidetails.reduce((sum, list) => sum + list.tripleTypeValThree, 0);

    var countFirstAverage = this.kpidetails.filter(item => item.firstAverage > 0).length;
    if(countFirstAverage >0 ){
      var totalFirstAvg = this.kpidetails.reduce((sum, list) => sum + list.firstAverage, 0);
      this.tripleTypeTotalValFirstAvg = parseFloat((totalFirstAvg / countFirstAverage).toFixed(6));
    }
    else{
      this.tripleTypeTotalValFirstAvg = 0;
    }
   

  }


  tripleTypeCalAvgThirdCol(obj:any){
    debugger
    if(obj.tripleTypeValOne == 0){
      this.toastr.warning("Unable calculation Average: First column cannot be zero!");
      obj.tripleTypeValOne = 0;
      obj.tripleTypeValThree = 0;
      obj.secondAverage = 0;
    }
    else{
      obj.secondAverage=parseFloat((obj.tripleTypeValThree / obj.tripleTypeValOne).toFixed(6));
    }
   //for total calculation in footer
    this.tripleTypeTotalValOne = this.kpidetails.reduce((sum, list) => sum + list.tripleTypeValOne, 0);
    this.tripleTypeTotalValTwo = this.kpidetails.reduce((sum, list) => sum + list.tripleTypeValTwo, 0);
    this.tripleTypeTotalValThree = this.kpidetails.reduce((sum, list) => sum + list.tripleTypeValThree, 0);
    
    var countSecondAverage = this.kpidetails.filter(item => item.secondAverage > 0).length;
    if(countSecondAverage >0 ){
      var totalSecondAvg = this.kpidetails.reduce((sum, list) => sum + list.secondAverage, 0);
      this.tripleTypeTotalValSecAvg =  parseFloat((totalSecondAvg / countSecondAverage).toFixed(6));
    }
    else{
      this.tripleTypeTotalValSecAvg = 0;
  }
}


  
 doubleTypeCalInit(obj:any){
  this.doubleTypeTotalValOnePrevYr = this.kpidetails.reduce((sum, list) => sum + list.dblTypValOnePrevYr, 0);
  this.doubleTypeTotalValTwoPrevYr = this.kpidetails.reduce((sum, list) => sum + list.dblTypValTwoPrevYr, 0);
  this.doubleTypeTotalValOne = this.kpidetails.reduce((sum, list) => sum + list.doubleTypeValOne, 0);
  this.doubleTypeTotalValTwo = this.kpidetails.reduce((sum, list) => sum + list.doubleTypeValTwo, 0);
  this.doubleTypeTotalValFirstAvg = this.kpidetails.reduce((sum, list) => sum + list.firstAverage, 0);
  this.doubleTypeTotalValSecAvg = this.kpidetails.reduce((sum, list) => sum + list.secondAverage, 0);

  if(this.doubleTypeTotalValTwoPrevYr == 0){
    this.doubleTypeTotalValFirstAvg =0;
    this.doubleTypeTotalValSecAvg =0;
  }else{
    this.doubleTypeTotalValFirstAvg = parseFloat((( this.doubleTypeTotalValTwo / this.doubleTypeTotalValTwoPrevYr) *100).toFixed(6));
    this.doubleTypeTotalValSecAvg =  parseFloat((((this.doubleTypeTotalValTwo - this.doubleTypeTotalValTwoPrevYr) /this.doubleTypeTotalValTwoPrevYr) * 100).toFixed(6)); 
  }
 

  }

doubleTypeCalPrevYrOne(obj:any){
  this.doubleTypeTotalValOnePrevYr = this.kpidetails.reduce((sum, list) => sum + list.dblTypValOnePrevYr, 0);
  this.doubleTypeTotalValFirstAvg = this.kpidetails.reduce((sum, list) => sum + list.firstAverage, 0);
  this.doubleTypeTotalValSecAvg = this.kpidetails.reduce((sum, list) => sum + list.secondAverage, 0);

  if(this.doubleTypeTotalValTwoPrevYr == 0){
    this.doubleTypeTotalValFirstAvg =0;
    this.doubleTypeTotalValSecAvg =0;
  }else{
    this.doubleTypeTotalValFirstAvg = parseFloat((( this.doubleTypeTotalValTwo / this.doubleTypeTotalValTwoPrevYr) *100).toFixed(6));
    this.doubleTypeTotalValSecAvg =  parseFloat((((this.doubleTypeTotalValTwo - this.doubleTypeTotalValTwoPrevYr) /this.doubleTypeTotalValTwoPrevYr) * 100).toFixed(6)); 
  }
}  


doubleTypeCalPrevYrTwo(obj:any){
  if(obj.dblTypValTwoPrevYr == 0){
    this.toastr.warning("Unable calculation Average: First column cannot be zero!");
    obj.doubleTypeValTwo = 0;
    obj.firstAverage = 0;
    obj.secondAverage = 0;
  }
  else{
    obj.firstAverage=parseFloat(((obj.doubleTypeValTwo / obj.dblTypValTwoPrevYr)*100).toFixed(6));
    obj.secondAverage=parseFloat((((obj.doubleTypeValTwo -obj.dblTypValTwoPrevYr) / obj.dblTypValTwoPrevYr)*100).toFixed(6));
  }
  this.doubleTypeTotalValTwoPrevYr = this.kpidetails.reduce((sum, list) => sum + list.dblTypValTwoPrevYr, 0);
  this.doubleTypeTotalValFirstAvg = this.kpidetails.reduce((sum, list) => sum + list.firstAverage, 0);
  this.doubleTypeTotalValSecAvg = this.kpidetails.reduce((sum, list) => sum + list.secondAverage, 0);

  if(this.doubleTypeTotalValTwoPrevYr == 0){
    this.doubleTypeTotalValFirstAvg =0;
    this.doubleTypeTotalValSecAvg =0;
  }else{
    this.doubleTypeTotalValFirstAvg = parseFloat((( this.doubleTypeTotalValTwo / this.doubleTypeTotalValTwoPrevYr) *100).toFixed(6));
    this.doubleTypeTotalValSecAvg =  parseFloat((((this.doubleTypeTotalValTwo - this.doubleTypeTotalValTwoPrevYr) /this.doubleTypeTotalValTwoPrevYr) * 100).toFixed(6)); 
  }

}
doubleTypeCalOne(obj:any){
  this.doubleTypeTotalValOne = this.kpidetails.reduce((sum, list) => sum + list.doubleTypeValOne, 0);
  this.doubleTypeTotalValFirstAvg = this.kpidetails.reduce((sum, list) => sum + list.firstAverage, 0);
  this.doubleTypeTotalValSecAvg = this.kpidetails.reduce((sum, list) => sum + list.secondAverage, 0);

   if(this.doubleTypeTotalValTwoPrevYr == 0){
    this.doubleTypeTotalValFirstAvg =0;
    this.doubleTypeTotalValSecAvg =0;
  }else{
    this.doubleTypeTotalValFirstAvg = parseFloat((( this.doubleTypeTotalValTwo / this.doubleTypeTotalValTwoPrevYr) *100).toFixed(6));
    this.doubleTypeTotalValSecAvg =  parseFloat((((this.doubleTypeTotalValTwo - this.doubleTypeTotalValTwoPrevYr) /this.doubleTypeTotalValTwoPrevYr) * 100).toFixed(6)); 
  }
}
doubleTypeCalTwo(obj:any){
  debugger
  if(obj.dblTypValTwoPrevYr == 0){
    this.toastr.warning("Unable calculation Average: First column cannot be zero!");
    obj.dblTypValOnePrevYr = 0;
    obj.firstAverage = 0;
    obj.secondAverage = 0;
  }
  else{
    obj.firstAverage=parseFloat(((obj.doubleTypeValTwo / obj.dblTypValTwoPrevYr)*100).toFixed(6));
    obj.secondAverage=parseFloat((((obj.doubleTypeValTwo -obj.dblTypValTwoPrevYr) / obj.dblTypValTwoPrevYr)*100).toFixed(6));
  }
  this.doubleTypeTotalValTwo = this.kpidetails.reduce((sum, list) => sum + list.doubleTypeValTwo, 0);
  this.doubleTypeTotalValFirstAvg = this.kpidetails.reduce((sum, list) => sum + list.firstAverage, 0);
  this.doubleTypeTotalValSecAvg = this.kpidetails.reduce((sum, list) => sum + list.secondAverage, 0);

  if(this.doubleTypeTotalValTwoPrevYr == 0){
    this.doubleTypeTotalValFirstAvg =0;
    this.doubleTypeTotalValSecAvg =0;
  }else{
    this.doubleTypeTotalValFirstAvg = parseFloat((( this.doubleTypeTotalValTwo / this.doubleTypeTotalValTwoPrevYr) *100).toFixed(6));
    this.doubleTypeTotalValSecAvg =  parseFloat((((this.doubleTypeTotalValTwo - this.doubleTypeTotalValTwoPrevYr) /this.doubleTypeTotalValTwoPrevYr) * 100).toFixed(6)); 
  }
}

}
