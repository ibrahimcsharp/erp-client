import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { TemplateEntryItemModel } from '../../model/template-entry-item.model';
import { TimeAndActionService } from '../../service/time-and-action.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { cloneWithOffset } from 'ngx-bootstrap/chronos/units/offset';
import * as moment from "moment";

@Component({
  selector: 'app-tna-manual-process',
  templateUrl: './tna-manual-process.component.html',
  styleUrls: ['./tna-manual-process.component.scss']
})
export class TnaManualProcessComponent implements OnInit {

  TnaProcessForm: FormGroup;
  tnaData: any;
  tnaMasterData: any;
  TemplateItemList: TemplateEntryItemModel[] = [];
  TemplateName: string;
  LeadTimePeriod: number;
  tnaJobDetails: any;
  routeID: any;
  noResult = false;
  materialTnaDataCheck: any;
  ldtPO: number;
  ltdTemp: number;
  selectedTnaProcess: number;
  selectedEmpInfo: any[] = [];
  doneDate: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    public taskService: TimeAndActionService,
    public commonService: CommonServiceService,
    private currentRoute: ActivatedRoute,


  ) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.commonService.LoadTemplate();
    this.commonService.LoadGatePassEmplyeeList();
    //this.commonService.LoadBuyerList();
    this.LoadTnaData();
    this.selectedTnaProcess = 0;

    var id = parseInt(this.currentRoute.snapshot.paramMap.get("id"));
    console.log(id);
    if (id > 0) {
      this.LoadTnaMasterDataForEdit(id);
    }

  }


  InitializeForm() {
    this.TnaProcessForm = this.fb.group({
      buyerId: [0],
      buyerName: [""],
      styleId: [0],
      styleName: [""],
      styleDescription: [""],
      orderQuantity: [0],
      orderRecivedDate: [""],
      smv: [0],
      efficency: [0],
      shipmentDate: null,
      exFactoryDatePlan: null,
      leadTime: [0],
      queryDate: [""],
      fitSampleApproveDate: [""],
      developmentLeadTime: [0],
      yearId: [0],
      year: [""],
      seasonId: [0],
      seasonName: [""],
      poNo: [""],
      color: [""],
      destination: [""],
      quiltingStatus: [""],
      printingStatus: [""],
      washStatus: [""],
      embroideryStatus: [""],
      salesContractNo: [""],
      mrcntBussinessLeader: [""],
      factoryBussinessLeader: [""],
      floorProductionLeader: [""],

    })
  }

  LoadTnaData() {
    this.taskService.GetTnaManualPorcessList().subscribe((data: any) => {
      if (data) {
        this.tnaData = data;
        console.log(this.tnaData);
      }

    }, error => {
      this.toaster.warning("Failed To Load Data", "TnA List");
      this.tnaData = null;
    });
  }


  // templates(): FormArray {
  //   return this.TnaProcessForm.get("templateTaskList") as FormArray;
  // }

  test = '';
  test1 = '';
  test2 = 'Test2';
  test3 = 'Test3';
  test4 = 'Test4';
  test5 = '';

  LoadTnaMasterData(rowData: any) {
    //this.test1 = 'Test1';
    this.taskService.GetTnaMasterDataByPO(rowData.styleId, rowData.poNo).subscribe((data: any) => {
      if (data) {
        this.tnaMasterData = data;
        console.log(this.tnaMasterData);
        this.ldtPO = data[0].leadTime;

        this.taskService.GetStyleWiseProcessStatus(rowData.styleId).subscribe((processdata: any) => {
          if (processdata) {
            this.TnaProcessForm.patchValue({
              quiltingStatus: processdata.printing,
              printingStatus: processdata.quilting,
              washStatus: processdata.washing,
              embroideryStatus: processdata.embroidery
            })
          }
        })
        this.TnaProcessForm.patchValue({
          //id:data[0].id,
          buyerId: data[0].buyerId,
          buyerName: data[0].buyerName,
          styleId: data[0].styleId,
          styleName: data[0].styleName,
          styleDescription: data[0].styleDescription,
          orderQuantity: data[0].orderQty,
          orderRecivedDate: data[0].orderRcvDate,
          smv: data[0].smv,
          efficency: data[0].efficency,
          shipmentDate: data[0].shiftDate,
          exFactoryDatePlan: data[0].exFactoryDate,
          leadTime: data[0].leadTime,
          queryDate: data[0].queryDate,
          // fitSampleApproveDate:data[0].styleId,
          //developmentLeadTime:data[0].styleId,
          yearId: data[0].yearId,
          year: data[0].yearName,
          seasonId: data[0].seasonId,
          seasonName: data[0].seasonName,
          poNo: data[0].poNo,
          color: data[0].color,
          destination: data[0].destination,

          salesContractNo: data[0].salesContractNo,
          mrcntBussinessLeader: data[0].mrcntBussinessLeader,
          factoryBussinessLeader: data[0].factoryBussinessLeader,
          floorProductionLeader:data[0].factoryBussinessLeader,

        })
      }
    }, error => {
      this.toaster.warning("Failed To Load Data", "TnA List");
      this.tnaData = null;
    })

    this.taskService.GetTnaJobDetailsData(rowData.styleId, rowData.poNo, rowData.templateId, rowData.processType).subscribe((data: any) => {
      //this.tnaJobDetails = data;

      this.ltdTemp = data[0].leadTime;
      var datePipe = new DatePipe("en-US");

      for (var item of data) {
        item.planStart = datePipe.transform(item.planStart, 'yyyy-MM-dd');
        item.planEnd = datePipe.transform(item.planEnd, 'yyyy-MM-dd');
        // item.startDateRevised = datePipe.transform(item.startDateRevised, 'yyyy-MM-dd');
        //item.endDateRevised = datePipe.transform(item.endDateRevised,'yyyy-MM-dd');
      }

      console.log(this.ldtPO, this.ltdTemp )
      if (this.ldtPO != this.ltdTemp && rowData.processType !=0) {
        this.tnaJobDetails = null;
        this.toaster.error("You have selected a template that is not match with PO Leadtime");
      }
      else if(this.ldtPO > this.ltdTemp && rowData.processType ==0){
        this.tnaJobDetails = data;
        this.toaster.warning("You have selected a template thats Leadtime is smaller then PO Leadtime");
      }
      else if(this.ldtPO == this.ltdTemp){
        this.tnaJobDetails = data;
        this.toaster.success("Data Successfully Load Accoding To Tamplate");
      }
      else{
        this.tnaJobDetails = null;
        this.toaster.error("Failed To Tamplate Load");
      }
      console.log(this.tnaJobDetails);
    })

    console.log("selectlist", this.selectedEmpInfo);
  }


  //-----------RequiredDays cal--------------//
  C(rowData: any, ri: number) {
    //debugger
    var row;
    row = this.tnaJobDetails.at(ri);

    // isNaN(parseInt($('#' + result[0] + '_' + result[1] + '__' + 'Percentage').val()), 0) ? 0 : parseInt($('#' + result[0] + '_' + result[1] + '__' + 'Percentage').val());

    //var date1= isNaN(rowData.actualEnd, 0) ? 0 : rowData.actualEnd
    if (rowData.endDateRevised != '0001-01-01T00:00:00' && rowData.startDateRevised != '0001-01-01T00:00:00') {
      var date1 = new Date(rowData.startDateRevised);
      var date2 = new Date(rowData.endDateRevised);


      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      // Discard the time and time-zone information.
      const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
      const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
      var rdays = (Math.floor((utc2 - utc1) / _MS_PER_DAY)) <= 0 ? 1 : Math.floor((utc2 - utc1) / _MS_PER_DAY)
      rowData.requiredDays = rdays;

    }

    this.test3 = 'Test3'
    this.test4 = 'Test4';
    this.test5 = '';
    console.log(row);
  }


  LoadTnaMasterDataForEdit(id: number) {
    debugger
    this.taskService.GetAllTnaListById(id).subscribe((data: any) => {
      if (data) {
        this.test = 'Test';
        this.test1 = 'Test1';
        this.test2 = 'Test2';
        this.test3 = '';
        this.test4 = '';
        this.test5 = 'Test5'
        this.routeID = id;
        this.tnaMasterData = data;
        console.log(this.tnaMasterData);


        this.taskService.GetStyleWiseProcessStatus(data[0].styleId).subscribe((processdata: any) => {
          if (processdata) {
            this.TnaProcessForm.patchValue({
              quiltingStatus: processdata.printing,
              printingStatus: processdata.quilting,
              washStatus: processdata.washing,
              embroideryStatus: processdata.embroidery
            })
          }
        })
        this.TnaProcessForm.patchValue({
          //id:data[0].id,
          buyerId: data[0].buyerId,
          buyerName: data[0].buyerName,
          styleId: data[0].styleId,
          styleName: data[0].styleName,
          styleDescription: data[0].styleDescription,
          orderQuantity: data[0].orderQty,
          orderRecivedDate: data[0].orderRcvDate,
          smv: data[0].smv,
          efficency: data[0].efficency,
          shipmentDate: data[0].shipmentDate,
          exFactoryDatePlan: data[0].exFactoryDate,
          leadTime: data[0].leadTime,
          queryDate: data[0].queryDate,
          //fitSampleApproveDate:data[0].styleId,
          //developmentLeadTime:data[0].styleId,
          yearId: data[0].yearId,
          year: data[0].yearName,
          seasonId: data[0].seasonId,
          seasonName: data[0].seasonName,
          poNo: data[0].poNo,
          color: data[0].color,
          destination: data[0].destination,

          salesContractNo:data[0].salesContractNo,
          mrcntBussinessLeader: data[0].mrcntBussinessLeader,
          factoryBussinessLeader: data[0].factoryBussinessLeader,
          floorProductionLeader:data[0].floorProductionLeader,

        })

        this.taskService.CheckMaterialTnaDetailsData(data[0].poNo).subscribe((checkData: any) => {
          if (checkData) {
            this.materialTnaDataCheck = checkData;
            console.log("sddas", this.materialTnaDataCheck, checkData)
          }

        })
      }
    }, error => {
      this.toaster.warning("Failed To Load Data", "TnA List");
      this.tnaData = null;
    })

    this.taskService.GetTnaListDetailsByJobID(id).subscribe((data: any) => {
      this.tnaJobDetails = data;
      console.log(data);

      this.tnaJobDetails.forEach(element => {

        // var emp = this.commonService.GatePassEmployeeList.find((x: { value: any; }) => x.value == element.concernPerson);
        // element.concernPerson = emp.label;
        // console.log("Serch");
        // console.log(emp);

      });

      var datePipe = new DatePipe("en-US");

      for (var item of data) {
        item.planStart = datePipe.transform(item.planStart, 'yyyy-MM-dd');
        item.planEnd = datePipe.transform(item.planEnd, 'yyyy-MM-dd');
        item.startDateRevised = datePipe.transform(item.startDateRevised, 'yyyy-MM-dd');
        item.endDateRevised = datePipe.transform(item.endDateRevised, 'yyyy-MM-dd');
        item.doneDate = datePipe.transform(item.doneDate, 'yyyy-MM-dd')
      }
      console.log(this.tnaJobDetails);
    })

  }




  onSelectEmployee(event: TypeaheadMatch, index: number, rowData: any): void {

    if (this.noResult == true) {
      const row = this.tnaJobDetails.at(index);
      rowData.concernPerson = event.item.label;
      //console.warn(this.tnaJobDetails)
    }

  }


  typeaheadNoResultsEmployee(event: boolean, index: number, rowData: any): void {
    this.noResult = event;
    console.log("ev", this.noResult)
    if (this.noResult == true) {
      const row = this.tnaJobDetails.at(index);
      //rowData.concernPerson = "";
      // control.markAsTouched({ onlySelf: true })
    }
  }


  onSelectEmployee1(event: TypeaheadMatch): void {

    this.TnaProcessForm.patchValue({
      mrcntBussinessLeader: event.item.label,
    });

  }


  typeaheadNoResultsEmployee1(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.TnaProcessForm.patchValue({
        mrcntBussinessLeader: ""
      });
    }
  }


  onSelectEmployee2(event: TypeaheadMatch): void {

    this.TnaProcessForm.patchValue({
      factoryBussinessLeader: event.item.label,
    });

  }


  typeaheadNoResultsEmployee2(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.TnaProcessForm.patchValue({
        factoryBussinessLeader: ""
      });
    }
  }

  onSelectEmployee3(event: TypeaheadMatch): void {

    this.TnaProcessForm.patchValue({
      floorProductionLeader: event.item.label,
    });

  }


  typeaheadNoResultsEmployee3(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.TnaProcessForm.patchValue({
        floorProductionLeader: ""
      });
    }
  }


  onSubmit() {

    var data1 = this.TnaProcessForm.value;
    var mdata = {
      id: 0,
      buyerId: data1.buyerId,
      styleId: data1.styleId,
      yearId: data1.yearId,
      seasonId: data1.seasonId,
      templateId: data1.templateId,
      poNo: data1.poNo,
      shipmentDate: data1.shipmentDate,
      mrcntBussinessLeader : data1.mrcntBussinessLeader,
      factoryBussinessLeader: data1.factoryBussinessLeader,
      floorProductionLeader:data1.floorProductionLeader,    
      
    }
    var data = this.tnaMasterData[0];
    //  var data2 = this.TnaProcessForm.value.templateTaskList;
    var data3 = this.tnaJobDetails;
    if (data.id > 0) {
      data.id = 0;
      for (var item of data3) {
        item.id = 0;
      }
    }
    for (var item of data3) {
      item.status = parseInt(item.status);
    }

    var data4 = [];
    for(var item of this.selectedEmpInfo)
    {
      var itemX = {
        id:0,
        styleId: item.styleId,
        poNo: item.poNo

      }
      data4.push(itemX);
    }

    this.taskService.CreateTna(mdata, data3, data4).subscribe(
      (res) => {

        this.toaster.success("Saved Successfully");
      },
      (error) => {
        console.log('onsubmit error');
        console.log(error);
        this.toaster.error("Failed To Save");

      }
    )
  }

  getColor(value: number): any {

    if (value <= 0) {
      return 'RGBA(231, 1, 18, 0.91)';
    }
    else if (value > 0) {
      return 'rgb(5, 228, 72)';

      // return { 'background-color':'rgb(5, 228, 72)' }
    }

  }



  statusUpdate() {

    var data1 = this.TnaProcessForm.value;
    var mdata = {
      id: parseInt(this.currentRoute.snapshot.paramMap.get("id")),
      buyerId: data1.buyerId,
      styleId: data1.styleId,
      yearId: data1.yearId,
      seasonId: data1.seasonId,
      templateId: data1.templateId,
      poNo: data1.poNo,
      shipmentDate: data1.shipmentDate,
      mrcntBussinessLeader : data1.mrcntBussinessLeader,
      factoryBussinessLeader: data1.factoryBussinessLeader,
      floorProductionLeader:data1.floorProductionLeader,
      

    }
    var data = this.tnaMasterData[0];
    var data3 = this.tnaJobDetails;

    for (var item of data3) {
      item.status = parseInt(item.status);
    }

  var data4 : any[];

    this.taskService.CreateTna(mdata, data3, data4).subscribe(
      (res) => {
        this.toaster.success("Saved Successfully");
      },
      (error) => {
        console.log('onsubmit error');
        console.log(error);
        this.toaster.error("Failed To Save");

      }
    )

  }


  material_tna_check() {
    var x = this.materialTnaDataCheck;
    if (!x.length) {
      //alert("No Data found in BOM");
      this.toaster.warning("No Data found in BOM");
      return false;
    }
    // else{
    //   //alert("Your code here"+ x);
    //   return true;
    // }
    return true;
  }


  SetTnaProcess(value: number) {
    if (value == 1) {
      this.test1 = 'Test1';
      this.test2 = '';
    }
    else if (value == 0) {
      this.test1 = '';
      this.test2 = 'Test2'
    }
  }
  tempList: any[] = [];
  selectionCheck(rowData: any, ri: number) {

    if (this.selectedEmpInfo != null) {
      // debugger
      //  var dataCheck = this.tempList.filter(x=>x.buyerId == rowData.buyerId && x.styleId == rowData.styleId);
      //       if(this.tempList.length == 0){
      //         this.tempList.push(dataCheck);
      //        }
      //       else if(dataCheck.length > 0){
      //         this.tempList.push(...dataCheck);
      //       }

      //      else{
      //        this.toaster.warning("You choose different Buyer or Style. Please Check!")
      //       }


      for (var item of this.selectedEmpInfo) {
        if (item.buyerId != rowData.buyerId || item.styleId != rowData.styleId) {

          var check = this.selectedEmpInfo.filter(x => x.buyerId == rowData.buyerId && x.styleId == rowData.styleId)
          if (check.length > 0) {
            this.selectedEmpInfo.pop();
            var rowNo = ri + 1;
            this.toaster.warning("You choose different Buyer or Style. Please UnCheck Row " + rowNo)
          }
          break;
        }
      }

    }
  }

  LoadDataStyleWise(selectedEmpInfo: any, templateId: number, processType: number) {

    //this.toaster.warning(templateId.toString(),processType.toString())

    if (selectedEmpInfo) {

      var styleWiseTnaData = selectedEmpInfo;
      var orderQtyTotal = 0;

      for (var item of selectedEmpInfo) {
        orderQtyTotal = orderQtyTotal + item.orderQty;
        //alert(orderQtyTotal)
      }
      //alert("out of loop"+orderQtyTotal)

      for (var i = 0; i < selectedEmpInfo.length; i++) {

        //alert(selectedEmpInfo[i].orderRcvDate);
        var smallestorderRcvDate = selectedEmpInfo[i]
        //alert("Inital" + smallestorderRcvDate.orderRcvDate + "," + smallestorderRcvDate.poNo);
        if (selectedEmpInfo[i].orderRcvDate < smallestorderRcvDate.orderRcvDate) {
          var smallestorderRcvDate = selectedEmpInfo[i];
          //alert("in the loop" + smallestorderRcvDate.orderRcvDate + "," + smallestorderRcvDate.poNo);
        }

      }

      //alert("out of loop" + smallestorderRcvDate.orderRcvDate + "," + smallestorderRcvDate.poNo);

      this.taskService.GetTnaMasterDataByPO(selectedEmpInfo[0].styleId, selectedEmpInfo[0].poNo).subscribe((data: any) => {
        if (data) {
          this.tnaMasterData = data;
          console.log(this.tnaMasterData);
          this.ldtPO = data[0].leadTime;



          this.taskService.GetStyleWiseProcessStatus(selectedEmpInfo[0].styleId).subscribe((processdata: any) => {
            if (processdata) {
              this.TnaProcessForm.patchValue({
                quiltingStatus: processdata.printing,
                printingStatus: processdata.quilting,
                washStatus: processdata.washing,
                embroideryStatus: processdata.embroidery
              })
            }
          })
          this.TnaProcessForm.patchValue({
            //id:data[0].id,
            buyerId: data[0].buyerId,
            buyerName: data[0].buyerName,
            styleId: data[0].styleId,
            styleName: data[0].styleName,
            styleDescription: data[0].styleDescription,
            orderQuantity: orderQtyTotal,
            orderRecivedDate: data[0].orderRcvDate,
            smv: data[0].smv,
            shipmentDate: data[0].shiftDate,
            exFactoryDatePlan: data[0].exFactoryDate,
            leadTime: data[0].leadTime,
            queryDate: data[0].queryDate,
            // fitSampleApproveDate:data[0].styleId,
            //developmentLeadTime:data[0].styleId,
            yearId: data[0].yearId,
            year: data[0].yearName,
            seasonId: data[0].seasonId,
            seasonName: data[0].seasonName,
            poNo: data[0].poNo,
            color: data[0].color,
            destination: data[0].destination,

            salesContractNo: data[0].salesContractNo,
            mrcntBussinessLeader: data[0].mrcntBussinessLeader,
            factoryBussinessLeader: data[0].factoryBussinessLeader,
            floorProductionLeader:data[0].floorProductionLeader,

          })
        }
      }, error => {
        this.toaster.warning("Failed To Load Data", "TnA List");
        this.tnaData = null;
      })


      this.taskService.GetTnaJobDetailsData(selectedEmpInfo[0].styleId, selectedEmpInfo[0].poNo, templateId, processType).subscribe((data: any) => {
        //this.tnaJobDetails = data;
       debugger
        this.ltdTemp = data[0].leadTime;
        var datePipe = new DatePipe("en-US");

        for (var item of data) {
          item.planStart = datePipe.transform(item.planStart, 'yyyy-MM-dd');
          item.planEnd = datePipe.transform(item.planEnd, 'yyyy-MM-dd');
          // item.startDateRevised = datePipe.transform(item.startDateRevised, 'yyyy-MM-dd');
          //item.endDateRevised = datePipe.transform(item.endDateRevised,'yyyy-MM-dd');
        }

        console.log(this.ldtPO, this.ltdTemp)
        if(this.ldtPO != this.ltdTemp &&  processType != 0) {
          this.tnaJobDetails = null;
          this.toaster.warning("You have selected a template that is not match with PO Leadtime");
        }
        else if(this.ldtPO > this.ltdTemp && processType ==0){
          this.tnaJobDetails = data;
          this.toaster.warning("You have selected a template thats Leadtime is smaller then PO Leadtime");
        }
        else if(this.ldtPO == this.ltdTemp){
          this.tnaJobDetails = data;
          this.toaster.success("Data Successfully Load Accoding To Tamplate");
        }
        else {
          this.tnaJobDetails = null;
          this.toaster.error("Failed To Tamplate Load");
        }
    
        console.log(this.tnaJobDetails);
      })


    }

  }

  GetDoneDate(rowData: any, ri: number) {
    if (rowData.status == 1) {
      var datePipe = new DatePipe("en-US");

      var Ddate = moment.utc().toDate();
      rowData.doneDate = datePipe.transform(Ddate, 'yyyy-MM-dd')
    }
    else {
      rowData.doneDate = null;
    }
  }

}
