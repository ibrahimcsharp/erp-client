import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TreeNode } from "primeng/api";
import { Observable } from "rxjs";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { Ie } from "./model/ie";
import { ConfirmIe } from "./model/confirmIe";
import { Workbook } from "exceljs";
import * as fs from "file-saver";
import { Item } from "@syncfusion/ej2-angular-navigations";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: "root",
})
export class IeService {
  baseUrl = environment.apiUrl + "merchandising/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");

  IEList: Ie[];
  IeFormatedList: any[];
  IeDetailsList: Ie[];
  constructor(private http: HttpClient, private token: TokenService,  public spinner: NgxSpinnerService) {}

  GetIEAllData(): Observable<any> {
    return this.http.get<Ie[]>(this.baseUrl_ + "Ie/GetIeList", {
      headers: this.token.headerToken(),
    });
  }
  GetIEMaxData(): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "Ie/GetIeMaxList", {
      headers: this.token.headerToken(),
    });
  }

  async GetIEMaxDataToPromise() {
    return this.http.get<any[]>(this.baseUrl_ + "Ie/GetIeMaxList", {
      headers: this.token.headerToken(),
    }).toPromise();
  }

  GetIeMaxOnlyConfirmList(): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "Ie/GetIeMaxOnlyConfirmList", {
      headers: this.token.headerToken(),
    });
  }

  GetIeMaxInfoByVersion(styleId: number, versionNo: number): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "Ie/GetIeMaxInfoByVersion?styleId=" + styleId + "&versionNo=" + versionNo, {
      headers: this.token.headerToken(),
    });
  }
  GetIEOthersData(buyerId: number, styleId: number): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "Ie/GetIeOthersList?buyerId=" + buyerId + "&styleId=" + styleId, {
      headers: this.token.headerToken(),
    });
  }

  GetIEOthersOnlyConfirmData(buyerId: number, styleId: number): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "Ie/GetIEOthersOnlyConfirmDataList?buyerId=" + buyerId + "&styleId=" + styleId, {
      headers: this.token.headerToken(),
    });
  }

  GetIEFormatedData(): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "Ie/GetIeListByFormated", {
      headers: this.token.headerToken(),
    });
  }
  GetIEDataByStyle(id: number, iePartId: number): Observable<any> {
    return this.http.get<Ie[]>(this.baseUrl_ + "Ie/GetIeListByStyle?styleId=" + id + "&iePartId=" + iePartId, {
      headers: this.token.headerToken(),
    });
  }
  GetIEMasterDataById(ieId: number, partId: number): Observable<any> {
    return this.http.get<Ie[]>(this.baseUrl_ + "Ie/GetIEMasterDataById?id=" + ieId + "&partId="+ partId, {
      headers: this.token.headerToken(),
    });
  }
  GetIEMasterDataByVersionNo(styleId: number, versionNo: number): Observable<any> {
    return this.http.get<Ie[]>(this.baseUrl_ + "Ie/GetIeMasterByVersion?styleId=" + styleId + "&versionNo="+ versionNo, {
      headers: this.token.headerToken(),
    });
  }
  GetIEDataById(id: number): Observable<any> {
    return this.http.get<Ie[]>(this.baseUrl_ + "Ie/GetIeDetailsListByMaster?ieMasterId=" + id, {
      headers: this.token.headerToken(),
    });
  }

  // PostIeData(ie: Ie, IeDetailList: Ie[]) {
  //   ie.ieDate=new Date(ie.ieDate);
  //   var body = {
  //     ...ie,
  //     IeDetails: IeDetailList
  //   }
  //    console.log(JSON.stringify(body));
  //   return this.http.post<any>(this.baseUrl_ + "Ie/CreateIe", body, {
  //     headers: this.token.headerToken(),
  //   });
  // }

  async PostIeData(ie: Ie, IeDetailList: Ie[]) {
    ie.ieDate=new Date(ie.ieDate);
    var body = {
      ...ie,
      IeDetails: IeDetailList
    }
     console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "Ie/CreateIe", body, {
      headers: this.token.headerToken(),
    }).toPromise();
  }

  
  SaveConfirmStyleIeData(ie: Ie, IeDetailList: Ie[]) {
    ie.ieDate=new Date(ie.ieDate);
    var body = {
      ...ie,
      IeDetails: IeDetailList
    }
     console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "Ie/CreateConfirmStyleIe", body, {
      headers: this.token.headerToken(),
    });
  }


  deleteIE(idList: string): Observable<any> {
    return this.http.delete(this.baseUrl_ + "Ie/DeleteMultipleIEById?IdList=" + idList, {
      headers: this.token.headerToken(),
    });
  }

  deleteIEById(obj: any) {
    return this.http.post<any>(this.baseUrl_ + "Ie/DeleteIEById", obj, {
      headers: this.token.headerToken(),
    }).toPromise();
  }

  GetIeListByFormated(): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "Ie/GetIeListByFormated", {
      headers: this.token.headerToken(),
    });
  }

  async IeDataCheckForPartWise(styleId: number, iePartId: number, versionNo: number) {
    return this.http.get<any>(
      this.baseUrl_ + "Ie/GetIeInfoBySPV?styleId=" + styleId + "&iePartId=" + iePartId + "&versionNo=" + versionNo, //// SPV Means StyleId, PartId, VersionNo
      { headers: this.token.headerToken() }).toPromise();
  }

 async GetIEMasterDataByVersionNoToPromise(styleId: number, versionNo: number) {
    return this.http.get<any[]>(this.baseUrl_ + "Ie/GetIeMasterByVersion?styleId=" + styleId + "&versionNo="+ versionNo, {
      headers: this.token.headerToken(),
    }).toPromise();
  }

  revisedStyleUpdatedDataForIe(styleId: number) {
    var obj = { styleId: styleId };
    return this.http.post<any>(
      this.baseUrl_ + "Ie/IeUpdatedDataReviseProcess", obj,
      { headers: this.token.headerToken() }
    );
  }

 // Save Confirm Ie Data 
  PostConfirmIeData(ie: ConfirmIe, IeDetailList: ConfirmIe[]) {
    ie.ieDate=new Date(ie.ieDate);
    var body = {
      ...ie,
      IeDetails: IeDetailList
    }
     console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "ConfirmIe/CreateConfirmIe", body, {
      headers: this.token.headerToken(),
    });
  }

  //Get Confirm Ie MaxList
  ConfirmIEList: ConfirmIe[];
  GetConfirmIeMaxList() : Observable<any>{
    return this.http.get<any[]>(this.baseUrl_ + "ConfirmIe/GetConfirmIeMaxList", {
      headers: this.token.headerToken(),
    });
  }

  //Get ConfirmIE Master Data By VersionNo To Promise
  async GetConfirmIEMasterDataByVersionNoToPromise(styleId: number, cnfmVersionNo: number) {
    //debugger
    return this.http.get<any[]>(this.baseUrl_ + "ConfirmIe/GetConfirmIeMasterByVersion?styleId=" + styleId + "&cnfmVersionNo="+ cnfmVersionNo, {
      headers: this.token.headerToken(),
    }).toPromise();
  }

  // Confirm Ie Data Check For Part Wise
  async ConfirmIeDataCheckForPartWise(styleId: number, iePartId: number, cnfVersionNo: number) {
    return this.http.get<any>(
      this.baseUrl_ + "ConfirmIe/GetConfirmIeInfoBySPV?styleId=" + styleId + "&iePartId=" + iePartId + "&cnfVersionNo=" + cnfVersionNo, //// SPV Means StyleId, PartId, VersionNo
      { headers: this.token.headerToken() }).toPromise();
  }
// Get Confirm Ie Others List
  GetConfirmIeOthersList(buyerId: number, styleId: number): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "ConfirmIe/GetConfirmIeOthersList?buyerId=" + buyerId + "&styleId=" + styleId, {
      headers: this.token.headerToken(),
    });
  }

  // Get Data From Ie And Approved Pre Costing
async  GetDataFromIeAndApprovedPreCosting(buyerId: number,seasonId:number,yearId:number, styleId: number) {
    debugger
    return this.http.get<any[]>(this.baseUrl_ + "ConfirmIe/GetDataFromIeAndApprovedPreCosting?buyerId=" + buyerId + "&seasonId=" + seasonId + "&yearId=" + yearId+ "&styleId=" + styleId, {
      headers: this.token.headerToken(),
    }).toPromise();
  }

   GetDataFromIeAndApprovedPreCosting_1(buyerId: number,seasonId:number,yearId:number, styleId: number) {
    debugger
    return this.http.get<any[]>(this.baseUrl_ + "ConfirmIe/GetDataFromIeAndApprovedPreCosting?buyerId=" + buyerId + "&seasonId=" + seasonId + "&yearId=" + yearId+ "&styleId=" + styleId, {
      headers: this.token.headerToken(),
    });
  }



  exportExcelReport(excelData) {
    debugger
    this.spinner.show();
    const title = excelData.title;
    const allData = excelData.finallySubmitData;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(
      "IE Report"
    );
    const stockHeader = [
      "MOQ",
      "Effeciency (%)",
      "SMV",    
      "CM Based On CPM",
      "CM Based On PPM",
      "Target Pcs",
      "Costing PPM"
    ];
    const stockHeaderCosting = [
      "MOQ",
      "Effeciency (%)",
      "SMV", 
      "FOB",
      "BTB",    
      "CM(Final)",
      "Final CM %",
      "Final PPM",
    ];

    const stockHeaderCostingSummary = [
      "FOB",
      "BTB",
      //"10H",  
      "CM(Final)",
      "Final CM %",
      "         ",
      "Costing PPM",
      "         "
    ];

    let d = new Date();
    let date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

    worksheet.mergeCells("A1", "E1");
    let companyRow = worksheet.getCell("A1");
    companyRow.value = "IE Report (" + date + ")";
    companyRow.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "#ffff00" },
    };
    companyRow.alignment = { vertical: "middle", horizontal: "center" };


    //Format Data for Excle report 
    debugger
    var rowCount = 2;
    var distinctStyleId = allData.filter((a, i) => allData.findIndex((s) => a.styleId === s.styleId) === i);

    //New code as Pre The requerment 09-20-23

    //var newIndex = 2
    for (var iStyle of distinctStyleId) {
      this.spinner.show();
      var xStyle = allData.filter(x => x.styleId == iStyle.styleId);
      var distinctXStyle = xStyle.filter((a, i) => xStyle.findIndex((s) => a.id === s.id) === i);

      //Format Master Data part
   
      let buyer = worksheet.getCell("A" + rowCount);
      buyer.value = "Buyer Name: ";
      buyer.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      buyer.border = {
        top: { style: 'medium' },
        bottom: { style: 'thin' },
        left: { style: 'medium' },
        right: { style: 'thin' }
      }
      buyer.alignment = { vertical: "middle", horizontal: "left" };

      let buyerName = worksheet.getCell("B" + rowCount);
      buyerName.value = distinctXStyle[0].buyerName;
      buyerName.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      buyerName.border = {
        top: { style: 'medium' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'medium' }
      }
      buyerName.alignment = { vertical: "middle", horizontal: "left" };



      let style = worksheet.getCell("A" + (rowCount + 1));
      style.value = "Style Name: ";
      style.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      style.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'medium' },
        right: { style: 'thin' }
      }
      style.alignment = { vertical: "middle", horizontal: "left" };

      let styleName = worksheet.getCell("B" + (rowCount + 1));
      styleName.value = distinctXStyle[0].styleName;
      styleName.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      styleName.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'medium' }
      }
      styleName.alignment = { vertical: "middle", horizontal: "left" };


      let styleItem = worksheet.getCell("A" + (rowCount + 2));
      styleItem.value = "Item: ";
      styleItem.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      styleItem.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'medium' },
        right: { style: 'thin' }
      }
      styleItem.alignment = { vertical: "middle", horizontal: "left" };

      let styleItemName = worksheet.getCell("B" + (rowCount + 2));
      styleItemName.value = distinctXStyle[0].item;
      styleItemName.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      styleItemName.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'medium' }
      }
      styleItemName.alignment = {  vertical: "middle", horizontal: "left" , wrapText: true};

      let season = worksheet.getCell("A" + (rowCount + 3));
      season.value = "Season: ";
      season.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      season.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'medium' },
        right: { style: 'thin' }
      }
      season.alignment = { vertical: "middle", horizontal: "left" };

      let seasonName = worksheet.getCell("B" + (rowCount + 3));
      seasonName.value = distinctXStyle[0].seasonYear;
      seasonName.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      seasonName.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'medium' }
      }
      seasonName.alignment = { vertical: "middle", horizontal: "left" };


      let branchOffice = worksheet.getCell("A" + (rowCount + 4));
      branchOffice.value = "Factory: ";
      branchOffice.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      branchOffice.border = {
        top: { style: 'thin' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'thin' }
      }
      branchOffice.alignment = { vertical: "middle", horizontal: "left" };

      let branchOfficeN = worksheet.getCell("B" + (rowCount + 4));
      branchOfficeN.value = distinctXStyle[0].branchOfficeName;
      branchOfficeN.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      branchOfficeN.border = {
        top: { style: 'thin' },
        bottom: { style: 'medium' },
        left: { style: 'thin' },
        right: { style: 'medium' }
      }
      branchOfficeN.alignment = { vertical: "middle", horizontal: "left" };


      let headerC1 = worksheet.getCell("C" + (rowCount));
      headerC1.border = {
        top: { style: 'medium' },
      }
      headerC1.alignment = { vertical: "middle", horizontal: "left" };
      let headerC2 = worksheet.getCell("C" + (rowCount + 4));
      headerC2.border = {
        bottom: { style: 'medium' },
      }
      headerC2.alignment = { vertical: "middle", horizontal: "left" };



      let costingSmv1 = worksheet.getCell("D" + rowCount);
      costingSmv1.value = "SMV: ";
      costingSmv1.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      costingSmv1.border = {
        top: { style: 'medium' },
        bottom: { style: 'thin' },
        left: { style: 'medium' },
        right: { style: 'thin' }
      }
      costingSmv1.alignment = { vertical: "middle", horizontal: "left" };

      let costingSmv1V = worksheet.getCell("E" + rowCount);
      costingSmv1V.value = distinctXStyle[0].costingSmv;
      costingSmv1V.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      costingSmv1V.border = {
        top: { style: 'medium' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'medium' }
      }
      costingSmv1V.alignment = { vertical: "middle", horizontal: "left" };



      let lineManP = worksheet.getCell("D" + (rowCount + 1));
      lineManP.value = "Line MP: ";
      lineManP.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      lineManP.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'medium' },
        right: { style: 'thin' }
      }
      lineManP.alignment = { vertical: "middle", horizontal: "left" };

      let lineManPval = worksheet.getCell("E" + (rowCount + 1));
      lineManPval.value = distinctXStyle[0].lineMp;
      lineManPval.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      lineManPval.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'medium' }
      }
      lineManPval.alignment = { vertical: "middle", horizontal: "left" };


      let hours = worksheet.getCell("D" + (rowCount + 2));
      hours.value = "Hours: ";
      hours.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      hours.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'medium' },
        right: { style: 'thin' }
      }
      hours.alignment = { vertical: "middle", horizontal: "left" };

      let targetWorkingHours = worksheet.getCell("E" + (rowCount + 2));
      targetWorkingHours.value = distinctXStyle[0].targetWorkingHour;
      targetWorkingHours.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      targetWorkingHours.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'medium' }
      }
      targetWorkingHours.alignment = { vertical: "middle", horizontal: "left" };

      let CPM = worksheet.getCell("D" + (rowCount + 3));
      CPM.value = "CPM: ";
      CPM.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      CPM.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'medium' },
        right: { style: 'thin' }
      }
      CPM.alignment = { vertical: "middle", horizontal: "left" };

      let CPMvalue = worksheet.getCell("E" + (rowCount + 3));
      CPMvalue.value = distinctXStyle[0].cpm;
      CPMvalue.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      CPMvalue.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'medium' }
      }
      CPMvalue.alignment = { vertical: "middle", horizontal: "left" };


      let PPM = worksheet.getCell("D" + (rowCount + 4));
      PPM.value = "PPM: ";
      PPM.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      PPM.border = {
        top: { style: 'thin' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'thin' }
      }
      PPM.alignment = { vertical: "middle", horizontal: "left" };

      let PPMvalue = worksheet.getCell("E" + (rowCount + 4));
      PPMvalue.value = distinctXStyle[0].ppm;
      PPMvalue.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      PPMvalue.border = {
        top: { style: 'thin' },
        bottom: { style: 'medium' },
        left: { style: 'thin' },
        right: { style: 'medium' }
      }
      PPMvalue.alignment = { vertical: "middle", horizontal: "left" };



      worksheet.addRow([]);

      var partCount = 0;
      var singlePartCount = 0;
      var summaryCount = 0;

      if (distinctXStyle.length > 1) {

        var dubolePartFob =0;
        var dubolePartBtb = 0;
        var dubolePartCM = 0;
        var  dubolePartFinalCmPrc = 0;
        var dubolePartCostingPpm = 0;

        for (var part of distinctXStyle) {
          worksheet.addRow([part.partName + " - IE"]).font = {
            bold: true,
          };
          let headerRow = worksheet.addRow(stockHeader);
          headerRow.eachCell((cell, number) => {
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "4167B8" },
              bgColor: { argb: "" },
            };
            cell.font = {
              bold: true,
              color: { argb: "FFFFFF" },
              size: 12,
            };
          });

          var dataFormIE = [];
          var dataForExcelIE = [];
          for (var item of part.ieDetails) {
            var obj = {
              moq: item.moq,
              averageEfficiencyPercentage: item.averageEfficiencyPercentage,
              smv: item.smv,
              cmCPM: item.cmCPM,
              cm: item.cm,
              averagePph: item.averagePph,
              ppm: item.ppm
            };
            dataFormIE.push(obj);
          }


          dataFormIE.forEach((row: any) => {
            dataForExcelIE.push(Object.values(row));
          });

          //debugger
          var c = 0;
          //var dxData = distinctXStyle[0].ieDetails;
          dataForExcelIE.forEach((d) => {
            //debugger
            let row = worksheet.addRow(d);
            row.border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
            c++
          });

          worksheet.addRow([]);

          //end -Format part item--IE(2)


          //--start Open Open Aprovoe Cosring
          worksheet.addRow([part.partName +" - OPEN COSTING"]).font = {
            bold: true,
          };
          var dataFormCostingOpen = [];
          var dataForExcelCostingOpen = [];
                     
          let headerRowCostingOpen = worksheet.addRow(stockHeader);
          headerRowCostingOpen.eachCell((cell, number) => {
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "12F0AA" },
              bgColor: { argb: "" },
            };
            cell.font = {
              bold: true,
              color: { argb: "FFFFFF" },
              size: 12,
            };
          });
          
         
          var objOpen = {
            costingMoq: part.costingMoqOpen,
            costingEfficiency: part.costingEfficiencyOpen,
            costingSmv: part.costingSmvOpen,
            //costingFob: part.costingFobOpen,
            //costingBtb: part.costingBtbOpen,
            costingCostFactoryOpen: part.costingCostFactoryOpen,
            costingCmPc: part.costingCmPcOpen,
            //costingFiamlCmPercentage: part.costingFiamlCmPercentageOpen,
            costingTargetPcsOpen: part.costingTargetPcsOpen,
            costingPpm: part.costingPpmOpen
          };

          dataFormCostingOpen.push(objOpen);

          dataFormCostingOpen.forEach((row: any) => {
            dataForExcelCostingOpen.push(Object.values(row));
          });


          var o1 = 0
          dataForExcelCostingOpen.forEach((d) => {
           // debugger
            let row = worksheet.addRow(d);
            row.border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
            o1++
          });
          worksheet.addRow([]);
          //--end Open Approve Costing

          //Format part item--Pre Approve Costing 

          worksheet.addRow([part.partName +" - PRE COSTING"]).font = {
            bold: true,
          };
          var dataFormCosting = [];
          var dataForExcelCosting = [];
                     
          let headerRowCosting = worksheet.addRow(stockHeaderCosting);
          headerRowCosting.eachCell((cell, number) => {
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "762998" },
              bgColor: { argb: "" },
            };
            cell.font = {
              bold: true,
              color: { argb: "FFFFFF" },
              size: 12,
            };
          });
          
         
          var obj2 = {
            costingMoq: part.costingMoq,
            costingEfficiency: part.costingEfficiency,
            costingSmv: part.costingSmv,
            costingFob: part.costingFob,
            costingBtb: part.costingBtb,
            costingCmPc: part.costingCmPc,
            costingFiamlCmPercentage: part.costingFiamlCmPercentage,
            costingPpm: part.costingPpm
          };

          dataFormCosting.push(obj2);

          dataFormCosting.forEach((row: any) => {
            dataForExcelCosting.push(Object.values(row));
          });


          var c1 = 0
          dataForExcelCosting.forEach((d) => {
           // debugger
            let row = worksheet.addRow(d);
            row.border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
            c1++
          });

          //end -Format part item--Pre Approve Costing 

          worksheet.addRow([]);
         // debugger
          partCount = partCount + c + c1 + o1+ 4 + 2 + 2;

          //summury count 
          dubolePartFob = dubolePartFob + part.costingFob;
          dubolePartBtb = dubolePartBtb + part.costingBtb;
          dubolePartCM = dubolePartCM + part.costingCmPc;
          dubolePartFinalCmPrc = dubolePartFinalCmPrc + part.costingFiamlCmPercentage;
          dubolePartCostingPpm = dubolePartCostingPpm + part.costingPpm;
  

        }

        var dataFormCostingSummary = [];
        var dataForExcelCostingSummary = [];
      
        
        worksheet.addRow(["Summary"]).font={
          bold: true,
        };

        let headerRowCostingSummary = worksheet.addRow(stockHeaderCostingSummary);
        headerRowCostingSummary.eachCell((cell, number) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "319829" },
            bgColor: { argb: "" },
          };
          cell.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
          };
        });
        

        var obj7 = {
          dubolePartFob: dubolePartFob,
          dubolePartBtb: dubolePartBtb,
          dubolePartCM : dubolePartCM ,
          dubolePartFinalCmPrc : dubolePartFinalCmPrc,
          blackValue:"",
          dubolePartCostingPpm : dubolePartCostingPpm,
  
        };

        dataFormCostingSummary.push(obj7);


        dataFormCostingSummary.forEach((row: any) => {
          dataForExcelCostingSummary.push(Object.values(row));
        });



        dataForExcelCostingSummary.forEach((d) => {
         // debugger
          let row = worksheet.addRow(d);
          row.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
        });

        worksheet.addRow([]);
        summaryCount = 4;
      }
      else {
        debugger
        worksheet.addRow([distinctXStyle[0].partName +" - IE"]).font={
          bold: true,
        };
        let headerRow = worksheet.addRow(stockHeader);
        headerRow.eachCell((cell, number) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "4167B8" },
            bgColor: { argb: "" },
          };
          cell.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
          };
        });

        //Format details Part --IE
        var dataFormIE = [];
        var dataForExcelIE = [];
        for (var item of distinctXStyle[0].ieDetails) {
          var obj = {
            moq: item.moq,
            averageEfficiencyPercentage: item.averageEfficiencyPercentage,
            smv: item.smv,
            cmCPM: item.cmCPM,
            cm: item.cm,
            averagePph: item.averagePph,
            ppm: item.ppm
          };
          dataFormIE.push(obj);
        }


        dataFormIE.forEach((row: any) => {
          dataForExcelIE.push(Object.values(row));
        });

        //debugger
        var c3= 0;
        dataForExcelIE.forEach((d) => {
          //debugger
          let row = worksheet.addRow(d);
          row.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          c3++;
        });
        worksheet.addRow([]);
        //end -Format part item--IE

          //--start Open Open Aprovoe Cosring
          worksheet.addRow([distinctXStyle[0].partName +" - OPEN COSTING"]).font ={
            bold: true,
          };
          var costingOpen = distinctXStyle;
          var dataFormCostingOpen2 = [];
          var dataForExcelCostingOpen2 = [];
                     
          let headerRowCostingOpen = worksheet.addRow(stockHeader);
          headerRowCostingOpen.eachCell((cell, number) => {
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "12F0AA" },
              bgColor: { argb: "" },
            };
            cell.font = {
              bold: true,
              color: { argb: "FFFFFF" },
              size: 12,
            };
          });
          
         
          for (var item of costingOpen) {
            var objOpen2 = {
              costingMoq: item.costingMoqOpen,
              costingEfficiency: item.costingEfficiencyOpen,
              costingSmv: item.costingSmvOpen,
              //costingFob: item.costingFobOpen,
              //costingBtb: item.costingBtbOpen,
              costingCostFactoryOpen: item.costingCostFactoryOpen,
              costingCmPc: item.costingCmPcOpen,
              //costingFiamlCmPercentage: item.costingFiamlCmPercentageOpen,
              costingTargetPcsOpen:item.costingTargetPcsOpen,
              costingPpm: item.costingPpmOpen
              
            };    
            dataFormCostingOpen2.push(objOpen2);
          }

          dataFormCostingOpen2.forEach((row: any) => {
            dataForExcelCostingOpen2.push(Object.values(row));
          });


          var o2 = 0
          dataForExcelCostingOpen2.forEach((d) => {
           // debugger
            let row = worksheet.addRow(d);
            row.border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
            o2++
          });

          worksheet.addRow([]);
          //--end Open Approve Costing

        

        //Format part item--Pre Approve Costing 
        worksheet.addRow([distinctXStyle[0].partName +" - PRE COSTING"]).font={
          bold: true,
        };

        let headerRowCosting = worksheet.addRow(stockHeaderCosting);
        headerRowCosting.eachCell((cell, number) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "762998" },
            bgColor: { argb: "" },
          };
          cell.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
          };
        });
         
        var costing = distinctXStyle;
        var dataFormCosting = [];
        var dataForExcelCosting = [];
        for (var item of costing) {
          var obj2 = {
            costingMoq: item.costingMoq,
            costingEfficiency: item.costingEfficiency,
            costingSmv: item.costingSmv,
            costingFob: item.costingFob,
            costingBtb: item.costingBtb,
            costingCmPc: item.costingCmPc,
            costingFiamlCmPercentage: item.costingFiamlCmPercentage,
            costingPpm: item.costingPpm
            
          };
          
          dataFormCosting.push(obj2);
        }
       

        dataFormCosting.forEach((row: any) => {
          dataForExcelCosting.push(Object.values(row));
        });
        
        var c4 =0;
        dataForExcelCosting.forEach((d) => {
          //debugger
          let row = worksheet.addRow(d);
          row.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          c4++;
        });

        //end -Format part item--Pre Approve Costing 

         worksheet.addRow([]);

        singlePartCount = c3+c4+ o2+ 4 + 2 + 2;
      }

      //end - Format Master Data Part
      rowCount = rowCount + 8 + partCount + singlePartCount + summaryCount;
    }





    worksheet.columns.forEach(function (column, i) {
      debugger
      if (i <= 11) {
        var maxLength = 0;
        column["eachCell"]({ includeEmpty: false }, function (cell) {
          var columnLength = cell.value ? cell.value.toString().length : 10;
          if (columnLength > maxLength) {
            maxLength = columnLength;
          }
        });
        column.width = maxLength < 10 ? 10 : 20;
      }

    });



    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, title + ".xlsx");
    });

    this.spinner.hide();

  }

  

}
