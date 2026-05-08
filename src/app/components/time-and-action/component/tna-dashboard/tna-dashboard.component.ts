import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TimeAndActionService } from '../../service/time-and-action.service';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-tna-dashboard',
  templateUrl: './tna-dashboard.component.html',
  styleUrls: ['./tna-dashboard.component.scss']
})
export class TnaDashboardComponent implements OnInit {
  tnaJobListForDashboard: any;
  displaySize: boolean;
  SizeForm: FormGroup;
  constructor(
    private toaster: ToastrService,
    public taskService: TimeAndActionService,
    public commonService: CommonServiceService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.LoadDataForTnaDashbord();
  }

  LoadDataForTnaDashbord() {
    debugger
    this.taskService.GetMasterTnaDashboardData().subscribe((data: any) => {
      if (data) {
        this.tnaJobListForDashboard = data;
        console.log(this.tnaJobListForDashboard);
      }

    }, error => {
      this.toaster.warning("Failed To Load Data", "TAN Dashboard Data List");
      this.tnaJobListForDashboard = null;
    });
  }


  // poSize: any[] = [];
  // newPOList: any[];
  // colorQty: any[] = [];
  // sizeQty: any[] = [];
  // newPOListForMkr: any[] = [];
  // sizeListTemp: any[] =[];
  // ShowSizeInfo(rowData: any){
    
  //   //this.displaySize= false;
    
  //   this.bookingCadService.GetSizePOByStyleId(rowData.buyerId, rowData.seasonId, rowData.yearId, rowData.styleId).subscribe(poData => {
  //     debugger 
  //     if(poData.length >0){
  //       this.displaySize= true;
  //       console.log(poData);
  //       this.poSize = poData.reduce((bo, item) => {  
  //         let bobbinItem = bo.find(ai => ai.poNo === item.poNo && ai.color === item.color && ai.sizeName === item.sizeName)      
  //         if(bobbinItem){
  //           bobbinItem.qty += item.qty 
  //         }else{
  //           bo.push(item)
  //         }    
  //         return bo.filter(x =>x.poNo == rowData.poNo);
  //       },[])



  //       // this.newPOList = poData;
  //       // var poSize_1 = poData.filter((a, i) => this.newPOList.findIndex((s) => a.sizeName === s.sizeName) === i); // Distinct by SizeName 
  //       // console.log("poSize_1", poSize_1)          
  //       // this.poSize = poSize_1.map(element =>(({color,sizeName,poNo, qty}) => ({color,sizeName, poNo, qty}))(element));
            
  //       // console.log("posize", this.poSize);
  //       var uniqueColor = this.poSize.filter((a, i) => this.poSize.findIndex((s) => a.color === s.color) === i); 
  //       console.log("uniqueColor",uniqueColor);
  //       var uniqueSize = this.poSize.filter((a, i) => this.poSize.findIndex((s) => a.sizeName === s.sizeName) === i); 
  //       console.log("uniqueSize",uniqueSize);
  //       var list = [];
  //       for(var item of uniqueColor){
  //         var obj21 ={
  //           color: item.color,
  //           sizeList: []
  //         } 
  //         list.push(obj21);
  //       }
  //       for(var item2 of list){
  //         for(var item4 of uniqueSize){
  //           var obj = {
  //             sizeName: item4.sizeName,
  //             qty: poData.find(x=>x.sizeName == item4.sizeName && x.color == item2.color).qty ? poData.find(x=>x.sizeName == item4.sizeName && x.color == item2.color).qty : 0,
  //           }
  //           item2.sizeList.push(obj);
  //         }

  //         // for(var item of item2.sizeList){
  //         //   var objj = {

  //         //   }
           
            
  //         // }
  //       }
  //       console.log("list",list);

        
        
  //     }
  //     else{
  //       this.toaster.warning("Item not Found!");
  //       return;
  //     }

  //   })
  // }

 

  ///// Izab Vaia Code
  
  buyDateDiv : boolean;
  poDiv: boolean;
  poListShowFromPO: any[];
  poColorListShowFromPO: any[];
  colorQtyShow: any[] = [];
  displayBasic: boolean;
  poSizeShow: any[] = [];
  totalSizeShow: number;
  totalStyleSizeQtyShow = 0;
  sizeQtyShow: any[] = [];
  markerSizeShow: any[] = [];
  
  ShowPOColorList(rowData: any){
    this.poListShowFromPO = [];
    this.poColorListShowFromPO = [];
    this.colorQtyShow = [];
    this.poSizeShow = [];
    this.totalSizeShow = 0;
    this.totalStyleSizeQtyShow = 0;
    this.sizeQtyShow = [];
    this.markerSizeShow = [];
   
    var basedOn ="";

    this.displayBasic = true;
    //var buyerId = this.cuttingCadForm.value.buyerId;
    //var seasonId = this.cuttingCadForm.value.seasonId;
    //var yearId = this.cuttingCadForm.value.yearId;
    //var styleId = this.cuttingCadForm.value.styleId;    var basedOn = this.cuttingCadForm.value.basedOn;
    if(rowData.buyerId == 3){
      this.buyDateDiv = true;
      this.poDiv = false;
      debugger
      this.commonService.GetAllSizePOByBuyDate(rowData.buyerId, rowData.seasonId, rowData.yearId, rowData.styleId,'').subscribe(poColorData => {
        poColorData = poColorData.filter(x => x.buyDate == rowData.orderRcvDate);
        //poColorData = poColorData.filter(x=> x.poNo ==rowData.poNo);
        this.colorQtyShow = [];
        var poListFromPO_1 = poColorData.filter((a, i) => poColorData.findIndex((s) => a.buyDate === s.buyDate) === i); // Distinct by Buy Date
        this.poListShowFromPO = poListFromPO_1.map(element =>(({color,sizeName,buyDate, qty}) => ({color,sizeName, buyDate, qty}))(element));
        var poColorListFromPO_1 = poColorData.filter((a, i) => poColorData.findIndex((s) => a.color === s.color) === i); // Distinct by Color
        this.poColorListShowFromPO = poColorListFromPO_1.map(element =>(({color,sizeName,buyDate, qty}) => ({color,sizeName, buyDate, qty}))(element));
        var poSize_1 = poColorData.filter((a, i) => poColorData.findIndex((s) => a.sizeName === s.sizeName) === i); // Distinct by SizeName
        //var poSize_2 = poColorData.filter((person, index, selfArray) =>index == selfArray.findIndex((p) => (p.buyDate == person.buyDate && p.sizeName == person.sizeName)));
        this.poSizeShow = poSize_1.map(element =>(({color,sizeName,buyDate, qty}) => ({color,sizeName, buyDate, qty}))(element));

        for (let item of this.poColorListShowFromPO) {
          this.sizeQtyShow = [];
          var selectedList_1 = poColorData.filter(x => x.color == item.color);
          var selectedList = selectedList_1.map(element =>(({color,sizeName,buyDate, qty}) => ({color,sizeName, buyDate, qty}))(element));                
          var selectedSizeList= selectedList.filter((person, index, selfArray) =>index == selfArray.findIndex((p) => (p.buyDate == person.buyDate && p.sizeName == person.sizeName)));
          if (selectedSizeList.length < this.poSizeShow.length) {
            var margeList =  this.poSizeShow.map(obj => selectedList.find(o => o.sizeName === obj.sizeName) || obj);
            var sizeQtyList =  margeList.map(element =>(({color,sizeName,buyDate, qty}) => ({color,sizeName, buyDate, qty}))(element));
            for (let item1 of sizeQtyList) {
              var list1 = selectedList.find(x => x.sizeName == item1.sizeName && x.color == item1.color && x.buyDate == item1.buyDate);
              if(list1 != null){
                item1.qty = list1.qty
              }
              else{
                item1.qty = 0;
              }
            }
            for(var obj of sizeQtyList)
            {
              var sizeObj = this.sizeQtyShow.find(x=> x.sizeName == obj.sizeName);
              if(sizeObj == null){
                this.sizeQtyShow.push({
                  sizeName: obj.sizeName,
                  qty: obj.qty
                });
              }
              else{
                obj.qty = obj.qty + sizeObj.qty;
                sizeObj.qty = obj.qty;
              }
            }
          }
          else {
            for (let item1 of selectedList) {
              var list2 = poColorData.find(x => x.sizeName == item1.sizeName && x.color == item1.color && x.buyDate == item1.buyDate);
              if(list2 != null){
                item1.qty = list2.qty
              }
              else{
                item1.qty = 0;
              }
            }
            for(var obj2 of selectedList)
            {
              var sizeObj = this.sizeQtyShow.find(x=> x.sizeName == obj2.sizeName);
              if(sizeObj == null){
                this.sizeQtyShow.push({
                  sizeName: obj2.sizeName,
                  qty: obj2.qty
                });
              }
              else{
                obj2.qty = obj2.qty + sizeObj.qty;
                sizeObj.qty = obj2.qty;
              }
            }
          }
          debugger
          this.colorQtyShow.push({
            color: item.color,
            qtyList: this.sizeQtyShow,
            totalStyleSizeQty: this.sizeQtyShow.reduce((acc, cur) => acc + cur.qty, 0)
          });
        }
        const allData = poColorData.map(element =>(({color,sizeName,qty,poNo }) => ({color,sizeName,qty,poNo}))(element));
        this.markerSizeShow =[];
        for(var obj1 of allData)
        {
          var sizeObj = this.markerSizeShow.find(x=> x.sizeName == obj1.sizeName);
          if(sizeObj == null){
            this.markerSizeShow.push({
              sizeName: obj1.sizeName,
              qty: obj1.qty
            });
          }
          else{
            obj1.qty = obj1.qty + sizeObj.qty;
            sizeObj.qty = obj1.qty;
          }
        }
        this.totalSizeShow = this.poSizeShow.length;
        this.totalStyleSizeQtyShow = this.markerSizeShow.reduce((sum, list) => sum + list.qty, 0);
      })
    }
    else{
      this.buyDateDiv = false;
      this.poDiv = true;
      this.commonService.GetAllSizePOByStyleId(rowData.buyerId, rowData.seasonId, rowData.yearId, rowData.styleId).subscribe(poColorData => {
        debugger
        poColorData = poColorData.filter(x=>x.poNo ==rowData.poNo);
        this.colorQtyShow = [];
        var poListFromPO_1 = poColorData.filter((a, i) => poColorData.findIndex((s) => a.poNo === s.poNo) === i); // Distinct by PO_NO
        this.poListShowFromPO = poListFromPO_1.map(element =>(({color,sizeName,poNo, qty}) => ({color,sizeName, poNo, qty}))(element));
        //this.poListShowFromPO = poListFromPO_1;
        var poColorListFromPO_1 = poColorData.filter((a, i) => poColorData.findIndex((s) => a.color === s.color) === i); // Distinct by Color
        this.poColorListShowFromPO = poColorListFromPO_1.map(element =>(({color,sizeName,poNo, qty}) => ({color,sizeName, poNo, qty}))(element));
        //this.poColorListShowFromPO = poColorListFromPO_1;
        var poSize_1 = poColorData.filter((a, i) => poColorData.findIndex((s) => a.sizeName === s.sizeName) === i); // Distinct by SizeName
        var poSize_2 = poColorData.filter((person, index, selfArray) =>index == selfArray.findIndex((p) => (p.poNo == person.poNo && p.sizeName == person.sizeName)));
        this.poSizeShow = poSize_1.map(element =>(({color,sizeName,poNo, qty}) => ({color,sizeName, poNo, qty}))(element));
        //this.poListFromPOForSave = poColorData;

        for (let item of this.poColorListShowFromPO) {
          this.sizeQtyShow = [];
          var selectedList_1 = poColorData.filter(x => x.color == item.color);                
          var selectedList11 = selectedList_1.map(element =>(({color,sizeName,poNo, qty}) => ({color,sizeName, poNo, qty}))(element));                
          var selectedSizeList= selectedList11.filter((person, index, selfArray) =>index == selfArray.findIndex((p) => (
            p.poNo == person.poNo && p.sizeName == person.sizeName
          )));
          if (selectedSizeList.length < poSize_2.length) {
            var margeList =  poSize_2.map(obj => selectedList11.find(o => o.sizeName == obj.sizeName && o.poNo == obj.poNo) || obj);
            var sizeQtyList =  margeList.map(element =>(({color,sizeName,poNo, qty}) => ({color,sizeName, poNo, qty}))(element));
            
            for (var item1 of sizeQtyList) {
              var list1 = selectedList11.find(x => x.sizeName == item1.sizeName && x.color == item1.color && x.poNo == item1.poNo && x.qty == item1.qty);
              if(list1 != null){
                item1.qty = list1.qty
              }
              else{
                item1.qty = 0;
              }
            }
            
            for(var obj of sizeQtyList)
            {
              var sizeObj = this.sizeQtyShow.find(x=> x.sizeName == obj.sizeName);
              if(sizeObj == null){
                this.sizeQtyShow.push({
                  sizeName: obj.sizeName,
                  qty: obj.qty
                });
              }
              else{
                obj.qty = obj.qty + sizeObj.qty;
                sizeObj.qty = obj.qty;
              }
            }
          }
          else {
            for (var item12 of selectedList11) {
              var list12 = poColorData.find(x => x.sizeName == item12.sizeName && x.color == item12.color && x.poNo == item12.poNo && x.qty == item12.qty);
              if(list12 != null){
                item12.qty = list12.qty
              }
              else{
                item12.qty = 0;
              }
            }

          for(var obj of selectedList11){
            var sizeObj = this.sizeQtyShow.find(x=> x.sizeName == obj.sizeName);
            if(sizeObj == null){
              this.sizeQtyShow.push({
                sizeName: obj.sizeName,
                qty: obj.qty
              });
            }
            else{
              obj.qty = obj.qty + sizeObj.qty;
              sizeObj.qty = obj.qty;
            }
          }
          }
          this.colorQtyShow.push({
            color: item.color,
            qtyList: this.sizeQtyShow,
            totalStyleSizeQty: this.sizeQtyShow.reduce((acc, cur) => acc + cur.qty, 0)
          });
        }
        const allData = poColorData.map(element =>(({color,sizeName,qty,poNo }) => ({color,sizeName,qty,poNo}))(element));
        this.markerSizeShow =[];
        var sizeRowIndex = 0;
        for(var obj1 of allData)
          {
            var sizeObj = this.markerSizeShow.find(x=> x.sizeName == obj1.sizeName);
            if(sizeObj == undefined){
              this.markerSizeShow.push({
                sizeName: obj1.sizeName,
                qty: obj1.qty,
                sizeRowIndex : sizeRowIndex
              });
            }
            else{
              obj1.qty = obj1.qty + sizeObj.qty;
              sizeObj.qty = obj1.qty;
            }
            sizeRowIndex++;
          }
        this.totalSizeShow = this.poSizeShow.length;
        this.totalStyleSizeQtyShow = this.markerSizeShow.reduce((sum, list) => sum + list.qty, 0);
      })
    }
  }

}
