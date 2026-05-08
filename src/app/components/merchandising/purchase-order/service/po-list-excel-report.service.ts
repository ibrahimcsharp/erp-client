import { Injectable } from '@angular/core';
import { Workbook } from "exceljs";
import * as fs from "file-saver";
import * as moment from 'moment';
import { CommonServiceService } from '../../Common-Services/common-service.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class POListExcelReportService {

  buyerName: string;

  constructor(
    public commonService: CommonServiceService,
    private datePipe: DatePipe,
  ) { }

  async exportPOListExcelReport(excelData) {

    const title = excelData.title;
    const allListData = excelData.finallySubmitData;
    this.commonService.LoadBuyerList();
    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet();



    const poListHeader = [
      // "orderId",
      "splitOrderNo",
      "orderNo",
      "styleNo",
      "hsCode",
      "model",
      "color",
      "item",
      "size",
      "orderQty",
      "unitPrice",
      "foc",
      "creationDate",
      "orderTypeName",
      "pcbValue",
      "ueValue",
      "packaging",
      "shippedQty",
      "handOverDate",
      "portOfDestinationName",
      "contractualDeliveryDate",
      "shippedTypeName",
      "portOfLoadingName",
      "lineNo",
      "trunk",
      "upc",
      "field1",
      "packingInstruction"
      // "changeStatus"
    ];



    //worksheet.mergeCells("A1", "L1");
    // worksheet.getColumn('A').width = 30;
    // worksheet.getColumn('B').width = 43;
    // worksheet.getColumn('C').width = 12;
    // worksheet.getColumn('D').width = 9;
    // worksheet.getColumn('E').width = 11;

    let poHeaderRow = worksheet.addRow(poListHeader);
    poHeaderRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "" },
        bgColor: { argb: "" },
      };
      cell.font = {
        bold: true,
        color: { argb: "#ffff00" },
        size: 12,
      };
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    var poListDataRowCount = 2;

    for (var poData of allListData) {

      // let orderId = "A" + poListDataRowCount;
      // worksheet.getCell(orderId).value = poData.orderId;
      // worksheet.getCell(orderId).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // }
      // worksheet.getCell(orderId).alignment = { vertical: "middle", horizontal: "left" };


      let splitOrderNo = "A" + poListDataRowCount;
      worksheet.getCell(splitOrderNo).value = poData.splitOrderNo;
      worksheet.getCell(splitOrderNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(splitOrderNo).alignment = { vertical: "middle", horizontal: "left" };


      let orderNo = "B" + poListDataRowCount;
      worksheet.getCell(orderNo).value = poData.orderNo;
      worksheet.getCell(orderNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(orderNo).alignment = { vertical: "middle", horizontal: "left" };


      let styleNo = "C" + poListDataRowCount;
      worksheet.getCell(styleNo).value = poData.styleNo;
      worksheet.getCell(styleNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(styleNo).alignment = { vertical: "middle", horizontal: "left" };

      let hsCode = "D" + poListDataRowCount;
      worksheet.getCell(hsCode).value = poData.hsCode;
      worksheet.getCell(hsCode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(hsCode).alignment = { vertical: "middle", horizontal: "left" };

      let model = "E" + poListDataRowCount;
      worksheet.getCell(model).value = poData.model;
      worksheet.getCell(model).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(model).alignment = { vertical: "middle", horizontal: "left" };


      let color = "F" + poListDataRowCount;
      worksheet.getCell(color).value = poData.color;
      worksheet.getCell(color).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(color).alignment = { vertical: "middle", horizontal: "left" };


      let item = "G" + poListDataRowCount;
      worksheet.getCell(item).value = poData.item;
      worksheet.getCell(item).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(item).alignment = { vertical: "middle", horizontal: "left" };


      let size = "H" + poListDataRowCount;
      worksheet.getCell(size).value = poData.sizeValue;
      worksheet.getCell(size).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(size).alignment = { vertical: "middle", horizontal: "left" };


      let orderQty = "I" + poListDataRowCount;
      worksheet.getCell(orderQty).value = poData.orderQty;
      worksheet.getCell(orderQty).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(orderQty).alignment = { vertical: "middle", horizontal: "left" };

      let unitPrice = "J" + poListDataRowCount;
      worksheet.getCell(unitPrice).value = poData.unitPrice;
      worksheet.getCell(unitPrice).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(unitPrice).alignment = { vertical: "middle", horizontal: "left" };

      let foc = "K" + poListDataRowCount;
      worksheet.getCell(foc).value = poData.foc;
      worksheet.getCell(foc).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(foc).alignment = { vertical: "middle", horizontal: "left" };

      let creationDate = "L" + poListDataRowCount;
      worksheet.getCell(creationDate).value = poData.creationDate;
      worksheet.getCell(creationDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(creationDate).alignment = { vertical: "middle", horizontal: "left" };

      let orderTypeName = "M" + poListDataRowCount;
      worksheet.getCell(orderTypeName).value = poData.orderTypeName;
      worksheet.getCell(orderTypeName).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(orderTypeName).alignment = { vertical: "middle", horizontal: "left" };

      let pcbValue = "N" + poListDataRowCount;
      worksheet.getCell(pcbValue).value = poData.pcbValue;
      worksheet.getCell(pcbValue).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(pcbValue).alignment = { vertical: "middle", horizontal: "left" };


      let ueValue = "O" + poListDataRowCount;
      worksheet.getCell(ueValue).value = poData.ueValue;
      worksheet.getCell(ueValue).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(ueValue).alignment = { vertical: "middle", horizontal: "left" };

      let packaging = "P" + poListDataRowCount;
      worksheet.getCell(packaging).value = poData.packaging;
      worksheet.getCell(packaging).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(packaging).alignment = { vertical: "middle", horizontal: "left" };

      let shippedQty = "Q" + poListDataRowCount;
      worksheet.getCell(shippedQty).value = poData.shippedQty;
      worksheet.getCell(shippedQty).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(shippedQty).alignment = { vertical: "middle", horizontal: "left" };

      let handOverDate = "R" + poListDataRowCount;
      worksheet.getCell(handOverDate).value = poData.handOverDate;
      worksheet.getCell(handOverDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(handOverDate).alignment = { vertical: "middle", horizontal: "left" };


      let portOfDestinationName = "S" + poListDataRowCount;
      worksheet.getCell(portOfDestinationName).value = poData.portOfDestinationName;
      worksheet.getCell(portOfDestinationName).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(portOfDestinationName).alignment = { vertical: "middle", horizontal: "left" };


      let contractualDeliveryDate = "T" + poListDataRowCount;
      worksheet.getCell(contractualDeliveryDate).value = poData.contractualDeliveryDate;
      worksheet.getCell(contractualDeliveryDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(contractualDeliveryDate).alignment = { vertical: "middle", horizontal: "left" };


      let shippedTypeName = "U" + poListDataRowCount;
      worksheet.getCell(shippedTypeName).value = poData.shippedTypeName;
      worksheet.getCell(shippedTypeName).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(shippedTypeName).alignment = { vertical: "middle", horizontal: "left" };

      let portOfLoadingName = "V" + poListDataRowCount;
      worksheet.getCell(portOfLoadingName).value = poData.landingPortName;
      worksheet.getCell(portOfLoadingName).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(portOfLoadingName).alignment = { vertical: "middle", horizontal: "left" };

      let lineNo = "W" + poListDataRowCount;
      worksheet.getCell(lineNo).value = poData.lineNo;
      worksheet.getCell(lineNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(lineNo).alignment = { vertical: "middle", horizontal: "left" };

      let trunk = "X" + poListDataRowCount;
      worksheet.getCell(trunk).value = poData.trunk;
      worksheet.getCell(trunk).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(trunk).alignment = { vertical: "middle", horizontal: "left" };

      let upc = "Y" + poListDataRowCount;
      worksheet.getCell(upc).value = poData.upc;
      worksheet.getCell(upc).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(upc).alignment = { vertical: "middle", horizontal: "left" };

      let field1 = "Z" + poListDataRowCount;
      worksheet.getCell(field1).value = poData.field1;
      worksheet.getCell(field1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(field1).alignment = { vertical: "middle", horizontal: "left" };

      let packingInstruction = "AA" + poListDataRowCount;
      worksheet.getCell(packingInstruction).value = poData.packingInstruction;
      worksheet.getCell(packingInstruction).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(packingInstruction).alignment = { vertical: "middle", horizontal: "left" };


      // let changeStatus = "AA" + poListDataRowCount;
      // worksheet.getCell(changeStatus).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // };

      poListDataRowCount++;
    }



    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, title + ".xlsx");
    });

  }


  async exportPODKTListExcelReport(excelData) {

    const title = excelData.title;
    const allListData = excelData.finallySubmitData;
    this.commonService.LoadBuyerList();
    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet();



    const poDKTListHeader = [
      // "orderId",
      "creationDate",
      "splitOrderNo",
      "orderNo",
      "handOverDate",
      "contractualHandOverDate",
      "orderTypeName",
      "model",
      "item",
      "size",
      //"upc",
      "pcbValue",
      "ueValue",
      "packaging",
      "styleNo",
      "orderQty",
      "shippedQty",
      "unitPrice",
      "portOfDestinationName",
      "contractualDeliveryDate",
      // "portOfLoadingName",
      "Order Received Date",
      "hsCode",
      "packingInstruction"
        // "changeStatus"
    ];



    //worksheet.mergeCells("A1", "L1");
    // worksheet.getColumn('A').width = 30;
    // worksheet.getColumn('B').width = 43;
    // worksheet.getColumn('C').width = 12;
    // worksheet.getColumn('D').width = 9;
    // worksheet.getColumn('E').width = 11;

    let poDktHeaderRow = worksheet.addRow(poDKTListHeader);
    poDktHeaderRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "" },
        bgColor: { argb: "" },
      };
      cell.font = {
        bold: true,
        color: { argb: "#ffff00" },
        size: 12,
      };
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    var poListDataRowCount = 2;

    for (var poData of allListData) {

      // let orderId = "A" + poListDataRowCount;
      // worksheet.getCell(orderId).value = poData.orderId;
      // worksheet.getCell(orderId).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // }
      // worksheet.getCell(orderId).alignment = { vertical: "middle", horizontal: "left" };


      let creationDate = "A" + poListDataRowCount;
      worksheet.getCell(creationDate).value = poData.creationDate;
      worksheet.getCell(creationDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(creationDate).alignment = { vertical: "middle", horizontal: "left" };


      let splitOrderNo = "B" + poListDataRowCount;
      worksheet.getCell(splitOrderNo).value = poData.splitOrderNo;
      worksheet.getCell(splitOrderNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(splitOrderNo).alignment = { vertical: "middle", horizontal: "left" };


      let orderNo = "C" + poListDataRowCount;
      worksheet.getCell(orderNo).value = poData.orderNo;
      worksheet.getCell(orderNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(orderNo).alignment = { vertical: "middle", horizontal: "left" };



      let handOverDate = "D" + poListDataRowCount;
      worksheet.getCell(handOverDate).value = poData.handOverDate;
      worksheet.getCell(handOverDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(handOverDate).alignment = { vertical: "middle", horizontal: "left" };

      let contractualHandOverDate = "E" + poListDataRowCount;
      worksheet.getCell(contractualHandOverDate).value = poData.contractualHandOverDate;
      worksheet.getCell(contractualHandOverDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(contractualHandOverDate).alignment = { vertical: "middle", horizontal: "left" };

      let orderTypeName = "F" + poListDataRowCount;
      worksheet.getCell(orderTypeName).value = poData.orderTypeName;
      worksheet.getCell(orderTypeName).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(orderTypeName).alignment = { vertical: "middle", horizontal: "left" };

      let model = "G" + poListDataRowCount;
      worksheet.getCell(model).value = poData.model;
      worksheet.getCell(model).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(model).alignment = { vertical: "middle", horizontal: "left" };

      let item = "H" + poListDataRowCount;
      worksheet.getCell(item).value = poData.item;
      worksheet.getCell(item).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(item).alignment = { vertical: "middle", horizontal: "left" };


      let size = "I" + poListDataRowCount;
      worksheet.getCell(size).value = poData.sizeValue;
      worksheet.getCell(size).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(size).alignment = { vertical: "middle", horizontal: "left" };


      // let upc = "J" + poListDataRowCount;
      // worksheet.getCell(upc).value = poData.upc;
      // worksheet.getCell(upc).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // };
      // worksheet.getCell(upc).alignment = { vertical: "middle", horizontal: "left" };

      let pcbValue = "J" + poListDataRowCount;
      worksheet.getCell(pcbValue).value = poData.pcbValue;
      worksheet.getCell(pcbValue).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(pcbValue).alignment = { vertical: "middle", horizontal: "left" };

      let ueValue = "K" + poListDataRowCount;
      worksheet.getCell(ueValue).value = poData.ueValue;
      worksheet.getCell(ueValue).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(ueValue).alignment = { vertical: "middle", horizontal: "left" };

      let packaging = "L" + poListDataRowCount;
      worksheet.getCell(packaging).value = poData.packaging;
      worksheet.getCell(packaging).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(packaging).alignment = { vertical: "middle", horizontal: "left" };


      let styleNo = "M" + poListDataRowCount;
      worksheet.getCell(styleNo).value = poData.styleNo;
      worksheet.getCell(styleNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(styleNo).alignment = { vertical: "middle", horizontal: "left" };


      let orderQty = "N" + poListDataRowCount;
      worksheet.getCell(orderQty).value = poData.orderQty;
      worksheet.getCell(orderQty).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(orderQty).alignment = { vertical: "middle", horizontal: "left" };

      let shippedQty = "O" + poListDataRowCount;
      worksheet.getCell(shippedQty).value = poData.shippedQty;
      worksheet.getCell(shippedQty).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(shippedQty).alignment = { vertical: "middle", horizontal: "left" };

      let unitPrice = "P" + poListDataRowCount;
      worksheet.getCell(unitPrice).value = poData.unitPrice;
      worksheet.getCell(unitPrice).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(unitPrice).alignment = { vertical: "middle", horizontal: "left" };


      let portOfDestinationName = "Q" + poListDataRowCount;
      worksheet.getCell(portOfDestinationName).value = poData.portOfDestinationName;
      worksheet.getCell(portOfDestinationName).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(portOfDestinationName).alignment = { vertical: "middle", horizontal: "left" };

      let contractualDeliveryDate = "R" + poListDataRowCount;
      worksheet.getCell(contractualDeliveryDate).value = poData.contractualDeliveryDate;
      worksheet.getCell(contractualDeliveryDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(contractualDeliveryDate).alignment = { vertical: "middle", horizontal: "left" };

      // let portOfLoadingName = "T" + poListDataRowCount;
      // worksheet.getCell(portOfLoadingName).value = poData.landingPortName;
      // worksheet.getCell(portOfLoadingName).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // };
      // worksheet.getCell(portOfLoadingName).alignment = { vertical: "middle", horizontal: "left" };



      let orderReceivedDate = "S" + poListDataRowCount;
      worksheet.getCell(orderReceivedDate).value = poData.orderReceivedDate;
      worksheet.getCell(orderReceivedDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(orderReceivedDate).alignment = { vertical: "middle", horizontal: "left" };


      let hsCode = "T" + poListDataRowCount;
      worksheet.getCell(hsCode).value = poData.hsCode;
      worksheet.getCell(hsCode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(hsCode).alignment = { vertical: "middle", horizontal: "left" };

      let packingInstruction = "U" + poListDataRowCount;
      worksheet.getCell(packingInstruction).value = poData.packingInstruction;
      worksheet.getCell(packingInstruction).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(packingInstruction).alignment = { vertical: "middle", horizontal: "left" };

      // let changeStatus = "W" + poListDataRowCount;
      // worksheet.getCell(changeStatus).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // };

      poListDataRowCount++;
    }



    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, title + ".xlsx");
    });

  }


  async exportPOOTCFListExcelReport(excelData) {

    const title = excelData.title;
    const allListData = excelData.finallySubmitData;
    this.commonService.LoadBuyerList();
    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet();



    const poDKTListHeader = [
      // "orderId",
      "splitOrderNo",
      "orderNo",
      "styleNo",
      "hsCode",
      "model",
      "color",
      "item",
      "size",
      "upc",
      "orderQty",
      "unitPrice",
      "foc",
      "creationDate",
      "orderTypeName",
      "pcbValue",
      "ueValue",
      "packaging",
      "shippedQty",
      "handOverDate",
      "portOfDestinationName",
      "contractualDeliveryDate",
      "shippedTypeName",
      "portOfLoadingName",
      "lineNo",
      "packingInstruction"

      // "changeStatus"
    ];



    //worksheet.mergeCells("A1", "L1");
    // worksheet.getColumn('A').width = 30;
    // worksheet.getColumn('B').width = 43;
    // worksheet.getColumn('C').width = 12;
    // worksheet.getColumn('D').width = 9;
    // worksheet.getColumn('E').width = 11;

    let poDktHeaderRow = worksheet.addRow(poDKTListHeader);
    poDktHeaderRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "" },
        bgColor: { argb: "" },
      };
      cell.font = {
        bold: true,
        color: { argb: "#ffff00" },
        size: 12,
      };
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    var poListDataRowCount = 2;

    for (var poData of allListData) {

      // let orderId = "A" + poListDataRowCount;
      // worksheet.getCell(orderId).value = poData.orderId;
      // worksheet.getCell(orderId).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // }
      // worksheet.getCell(orderId).alignment = { vertical: "middle", horizontal: "left" };




      let splitOrderNo = "A" + poListDataRowCount;
      worksheet.getCell(splitOrderNo).value = poData.splitOrderNo;
      worksheet.getCell(splitOrderNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(splitOrderNo).alignment = { vertical: "middle", horizontal: "left" };


      let orderNo = "B" + poListDataRowCount;
      worksheet.getCell(orderNo).value = poData.orderNo;
      worksheet.getCell(orderNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(orderNo).alignment = { vertical: "middle", horizontal: "left" };

      let styleNo = "C" + poListDataRowCount;
      worksheet.getCell(styleNo).value = poData.styleNo;
      worksheet.getCell(styleNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(styleNo).alignment = { vertical: "middle", horizontal: "left" };


      let hsCode = "D" + poListDataRowCount;
      worksheet.getCell(hsCode).value = poData.hsCode;
      worksheet.getCell(hsCode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(hsCode).alignment = { vertical: "middle", horizontal: "left" };

      let model = "E" + poListDataRowCount;
      worksheet.getCell(model).value = poData.model;
      worksheet.getCell(model).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(model).alignment = { vertical: "middle", horizontal: "left" };

      let color = "F" + poListDataRowCount;
      worksheet.getCell(color).value = poData.color;
      worksheet.getCell(color).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(color).alignment = { vertical: "middle", horizontal: "left" };



      let item = "G" + poListDataRowCount;
      worksheet.getCell(item).value = poData.item;
      worksheet.getCell(item).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(item).alignment = { vertical: "middle", horizontal: "left" };


      let size = "H" + poListDataRowCount;
      worksheet.getCell(size).value = poData.sizeValue;
      worksheet.getCell(size).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(size).alignment = { vertical: "middle", horizontal: "left" };


      let upc = "I" + poListDataRowCount;
      worksheet.getCell(upc).value = poData.upc;
      worksheet.getCell(upc).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(upc).alignment = { vertical: "middle", horizontal: "left" };

      let orderQty = "J" + poListDataRowCount;
      worksheet.getCell(orderQty).value = poData.orderQty;
      worksheet.getCell(orderQty).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(orderQty).alignment = { vertical: "middle", horizontal: "left" };


      let unitPrice = "K" + poListDataRowCount;
      worksheet.getCell(unitPrice).value = poData.unitPrice;
      worksheet.getCell(unitPrice).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(unitPrice).alignment = { vertical: "middle", horizontal: "left" };

      let foc = "L" + poListDataRowCount;
      worksheet.getCell(foc).value = poData.foc;
      worksheet.getCell(foc).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(foc).alignment = { vertical: "middle", horizontal: "left" };


      let creationDate = "M" + poListDataRowCount;
      worksheet.getCell(creationDate).value = poData.creationDate;
      worksheet.getCell(creationDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(creationDate).alignment = { vertical: "middle", horizontal: "left" };


      let orderTypeName = "N" + poListDataRowCount;
      worksheet.getCell(orderTypeName).value = poData.orderTypeName;
      worksheet.getCell(orderTypeName).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(orderTypeName).alignment = { vertical: "middle", horizontal: "left" };

      let pcbValue = "O" + poListDataRowCount;
      worksheet.getCell(pcbValue).value = poData.pcbValue;
      worksheet.getCell(pcbValue).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(pcbValue).alignment = { vertical: "middle", horizontal: "left" };


      let ueValue = "P" + poListDataRowCount;
      worksheet.getCell(ueValue).value = poData.ueValue;
      worksheet.getCell(ueValue).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(ueValue).alignment = { vertical: "middle", horizontal: "left" };

      let packaging = "Q" + poListDataRowCount;
      worksheet.getCell(packaging).value = poData.packaging;
      worksheet.getCell(packaging).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(packaging).alignment = { vertical: "middle", horizontal: "left" };


      let shippedQty = "R" + poListDataRowCount;
      worksheet.getCell(shippedQty).value = poData.shippedQty;
      worksheet.getCell(shippedQty).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(shippedQty).alignment = { vertical: "middle", horizontal: "left" };

      let handOverDate = "S" + poListDataRowCount;
      worksheet.getCell(handOverDate).value = poData.handOverDate;
      worksheet.getCell(handOverDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(handOverDate).alignment = { vertical: "middle", horizontal: "left" };

      let portOfDestinationName = "T" + poListDataRowCount;
      worksheet.getCell(portOfDestinationName).value = poData.portOfDestinationName;
      worksheet.getCell(portOfDestinationName).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(portOfDestinationName).alignment = { vertical: "middle", horizontal: "left" };

      let contractualDeliveryDate = "U" + poListDataRowCount;
      worksheet.getCell(contractualDeliveryDate).value = poData.contractualDeliveryDate;
      worksheet.getCell(contractualDeliveryDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(contractualDeliveryDate).alignment = { vertical: "middle", horizontal: "left" };

      let shippedTypeName = "V" + poListDataRowCount;
      worksheet.getCell(shippedTypeName).value = poData.shippedTypeName;
      worksheet.getCell(shippedTypeName).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(shippedTypeName).alignment = { vertical: "middle", horizontal: "left" };


      let portOfLoadingName = "W" + poListDataRowCount;
      worksheet.getCell(portOfLoadingName).value = poData.landingPortName;
      worksheet.getCell(portOfLoadingName).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(portOfLoadingName).alignment = { vertical: "middle", horizontal: "left" };

      let lineNo = "X" + poListDataRowCount;
      worksheet.getCell(lineNo).value = poData.lineNo;
      worksheet.getCell(lineNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(lineNo).alignment = { vertical: "middle", horizontal: "left" };

      let packingInstruction = "Y" + poListDataRowCount;
      worksheet.getCell(packingInstruction).value = poData.packingInstruction;
      worksheet.getCell(packingInstruction).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(packingInstruction).alignment = { vertical: "middle", horizontal: "left" };

      // let changeStatus = "Y" + poListDataRowCount;
      // worksheet.getCell(changeStatus).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // };

      poListDataRowCount++;
    }



    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, title + ".xlsx");
    });

  }


  async exportPOGStarListExcelReport(excelData) {

    const title = excelData.title;
    const allListData = excelData.finallySubmitData;
    this.commonService.LoadBuyerList();
    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet();



    const poGStarListHeader = [
      // "orderId",
      "stCategory",
      "destinationDC",
      "portOfLoading",
      "splitOrderNo",
      "poNo",
      "sfc",
      "styleNo",
      "upc",
      "hsCode",
      "colorCode",
      "color",
      "eanCode",
      "size",
      "inseam",
      "orderReceivedDate",
      "exFactoryDate",
      "qty",
      "orderType",
      "unitPrice",
      "packingInstruction"
      // "changeStatus"
    ];



    //worksheet.mergeCells("A1", "L1");
    // worksheet.getColumn('A').width = 30;
    // worksheet.getColumn('B').width = 43;
    // worksheet.getColumn('C').width = 12;
    // worksheet.getColumn('D').width = 9;
    // worksheet.getColumn('E').width = 11;

    let poDktHeaderRow = worksheet.addRow(poGStarListHeader);
    poDktHeaderRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "" },
        bgColor: { argb: "" },
      };
      cell.font = {
        bold: true,
        color: { argb: "#ffff00" },
        size: 12,
      };
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    var poListDataRowCount = 2;

    for (var poData of allListData) {

      // let orderId = "A" + poListDataRowCount;
      // worksheet.getCell(orderId).value = poData.orderId;
      // worksheet.getCell(orderId).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // }
      // worksheet.getCell(orderId).alignment = { vertical: "middle", horizontal: "left" };

      let stCategory = "A" + poListDataRowCount;
      worksheet.getCell(stCategory).value = poData.stCategory;
      worksheet.getCell(stCategory).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(stCategory).alignment = { vertical: "middle", horizontal: "left" };

      let destinationDC = "B" + poListDataRowCount;
      worksheet.getCell(destinationDC).value = poData.portOfDestinationName;
      worksheet.getCell(destinationDC).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(destinationDC).alignment = { vertical: "middle", horizontal: "left" };


      let portOfLoadingName = "C" + poListDataRowCount;
      worksheet.getCell(portOfLoadingName).value = poData.landingPortName;
      worksheet.getCell(portOfLoadingName).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(portOfLoadingName).alignment = { vertical: "middle", horizontal: "left" };

      let splitOrderNo = "D" + poListDataRowCount;
      worksheet.getCell(splitOrderNo).value = poData.splitOrderNo;
      worksheet.getCell(splitOrderNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(splitOrderNo).alignment = { vertical: "middle", horizontal: "left" };


      let poNo = "E" + poListDataRowCount;
      worksheet.getCell(poNo).value = poData.orderNo;
      worksheet.getCell(poNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(poNo).alignment = { vertical: "middle", horizontal: "left" };


      let sfc = "F" + poListDataRowCount;
      worksheet.getCell(sfc).value = poData.sfc;
      worksheet.getCell(sfc).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(sfc).alignment = { vertical: "middle", horizontal: "left" };


      let styleNo = "G" + poListDataRowCount;
      worksheet.getCell(styleNo).value = poData.styleNo;
      worksheet.getCell(styleNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(styleNo).alignment = { vertical: "middle", horizontal: "left" };


      let upc = "H" + poListDataRowCount;
      worksheet.getCell(upc).value = poData.upc;
      worksheet.getCell(upc).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(upc).alignment = { vertical: "middle", horizontal: "left" };


      let hsCode = "I" + poListDataRowCount;
      worksheet.getCell(hsCode).value = poData.hsCode;
      worksheet.getCell(hsCode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(hsCode).alignment = { vertical: "middle", horizontal: "left" };


      let colorCode = "J" + poListDataRowCount;
      worksheet.getCell(colorCode).value = poData.colorCode ? poData.colorCode : 0;
      worksheet.getCell(colorCode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(colorCode).alignment = { vertical: "middle", horizontal: "left" };


      let color = "K" + poListDataRowCount;
      worksheet.getCell(color).value = poData.color;
      worksheet.getCell(color).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(color).alignment = { vertical: "middle", horizontal: "left" };



      let eanCode = "L" + poListDataRowCount;
      worksheet.getCell(eanCode).value = poData.eanCode;
      worksheet.getCell(eanCode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(eanCode).alignment = { vertical: "middle", horizontal: "left" };


      let size = "M" + poListDataRowCount;
      worksheet.getCell(size).value = poData.sizeValue;
      worksheet.getCell(size).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(size).alignment = { vertical: "middle", horizontal: "left" };



      let inseam = "N" + poListDataRowCount;
      worksheet.getCell(inseam).value = poData.inseam ? poData.inseam : 0;
      worksheet.getCell(inseam).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(inseam).alignment = { vertical: "middle", horizontal: "left" };


      let orderReceivedDate = "O" + poListDataRowCount;
      // worksheet.getCell(orderReceivedDate).value = poData.orderReceivedDate;
      worksheet.getCell(orderReceivedDate).value = poData.creationDate;
      worksheet.getCell(orderReceivedDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(orderReceivedDate).alignment = { vertical: "middle", horizontal: "left" };

      let exFactoryDate = "P" + poListDataRowCount;
      worksheet.getCell(exFactoryDate).value = poData.contractualDeliveryDate;
      worksheet.getCell(exFactoryDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(exFactoryDate).alignment = { vertical: "middle", horizontal: "left" };

      let qty = "Q" + poListDataRowCount;
      worksheet.getCell(qty).value = poData.orderQty;
      worksheet.getCell(qty).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(qty).alignment = { vertical: "middle", horizontal: "left" };


      let orderType = "R" + poListDataRowCount;
      worksheet.getCell(orderType).value = poData.orderTypeName;
      worksheet.getCell(orderType).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(orderType).alignment = { vertical: "middle", horizontal: "left" };

      let unitPrice = "S" + poListDataRowCount;
      worksheet.getCell(unitPrice).value = poData.unitPrice;
      worksheet.getCell(unitPrice).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(unitPrice).alignment = { vertical: "middle", horizontal: "left" };

      let packingInstruction = "T" + poListDataRowCount;
      worksheet.getCell(packingInstruction).value = poData.packingInstruction;
      worksheet.getCell(packingInstruction).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(packingInstruction).alignment = { vertical: "middle", horizontal: "left" };

      // let changeStatus = "T" + poListDataRowCount;
      // worksheet.getCell(changeStatus).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // }

      poListDataRowCount++;
    }



    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, title + ".xlsx");
    });

  }


  async exportPOCOListExcelReport(excelData) {

    debugger
    const title = excelData.title;
    const allListData = excelData.finallySubmitData;
    this.commonService.LoadBuyerList();
    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet();



    const poGStarListHeader = [
      // "orderId",
      "splitOrderNo",
      "poNo",
      "styleNo",
      "hsCode",
      "color",
      "colorCode",
      "materialStyle",
      "size",
      "sizeCode",
      "upc",
      "qty",
      "unitPrice",
      "orderReceivedBuyDate",
      "exFactoryDate",
      "shipmentDate",
      "orderType",
      "cartonMeasurement",
      "piecePerBox",
      "shippedMode",
      "portOfLoading",
      "destinationDC",
      "extractionPo",
      "orderGroup",
      "styleGroup",
      "protoNo",
      "vasIndicator",
      "capTypeGroup",
      "qtNumber",
      "tentativeMatarialsInhouseDate",
      "ioNumber",
      "barcode",
      "skuNumber",
      "manufactureCode",
      "packingInstruction"
      // "changeStatus"
    ];



    //worksheet.mergeCells("A1", "L1");
    // worksheet.getColumn('A').width = 30;
    // worksheet.getColumn('B').width = 43;
    // worksheet.getColumn('C').width = 12;
    // worksheet.getColumn('D').width = 9;
    // worksheet.getColumn('E').width = 11;

    let poDktHeaderRow = worksheet.addRow(poGStarListHeader);
    poDktHeaderRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "" },
        bgColor: { argb: "" },
      };
      cell.font = {
        bold: true,
        color: { argb: "#ffff00" },
        size: 12,
      };
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    var poListDataRowCount = 2;

    for (var poData of allListData) {

      // let orderId = "A" + poListDataRowCount;
      // worksheet.getCell(orderId).value = poData.orderId;
      // worksheet.getCell(orderId).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // }
      // worksheet.getCell(orderId).alignment = { vertical: "middle", horizontal: "left" };

      let splitOrderNo = "A" + poListDataRowCount;
      worksheet.getCell(splitOrderNo).value = poData.splitOrderNo;
      worksheet.getCell(splitOrderNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(splitOrderNo).alignment = { vertical: "middle", horizontal: "left" };

      let poNo = "B" + poListDataRowCount;
      worksheet.getCell(poNo).value = poData.orderNo;
      worksheet.getCell(poNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(poNo).alignment = { vertical: "middle", horizontal: "left" };


      let styleNo = "C" + poListDataRowCount;
      worksheet.getCell(styleNo).value = poData.styleNo;
      worksheet.getCell(styleNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(styleNo).alignment = { vertical: "middle", horizontal: "left" };



    

      let hsCode = "D" + poListDataRowCount;
      worksheet.getCell(hsCode).value = poData.hsCode;
      worksheet.getCell(hsCode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(hsCode).alignment = { vertical: "middle", horizontal: "left" };

      let color = "E" + poListDataRowCount;
      worksheet.getCell(color).value = poData.color;
      worksheet.getCell(color).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(color).alignment = { vertical: "middle", horizontal: "left" };


      let colorCode = "F" + poListDataRowCount;
      worksheet.getCell(colorCode).value = poData.model;
      worksheet.getCell(colorCode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(colorCode).alignment = { vertical: "middle", horizontal: "left" };

      let materialStyle = "G" + poListDataRowCount;
      worksheet.getCell(materialStyle).value = poData.item;
      worksheet.getCell(materialStyle).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(materialStyle).alignment = { vertical: "middle", horizontal: "left" };

      let size = "H" + poListDataRowCount;
      worksheet.getCell(size).value = poData.sizeValue;
      worksheet.getCell(size).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(size).alignment = { vertical: "middle", horizontal: "left" };


      let sizeCode = "I" + poListDataRowCount;
      worksheet.getCell(sizeCode).value = poData.sizeCode;
      worksheet.getCell(sizeCode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(sizeCode).alignment = { vertical: "middle", horizontal: "left" };

      let upc = "J" + poListDataRowCount;
      worksheet.getCell(upc).value = poData.upc;
      worksheet.getCell(upc).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(upc).alignment = { vertical: "middle", horizontal: "left" };

      let qty = "K" + poListDataRowCount;
      worksheet.getCell(qty).value = poData.orderQty;
      worksheet.getCell(qty).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(qty).alignment = { vertical: "middle", horizontal: "left" };

      let unitPrice = "L" + poListDataRowCount;
      worksheet.getCell(unitPrice).value = poData.unitPrice;
      worksheet.getCell(unitPrice).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(unitPrice).alignment = { vertical: "middle", horizontal: "left" };


      let orderReceivedDate = "M" + poListDataRowCount;
      // worksheet.getCell(orderReceivedDate).value = poData.orderReceivedDate;
      worksheet.getCell(orderReceivedDate).value = poData.creationDate;
      worksheet.getCell(orderReceivedDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(orderReceivedDate).alignment = { vertical: "middle", horizontal: "left" };


      let exFactoryDate = "N" + poListDataRowCount;
      worksheet.getCell(exFactoryDate).value = poData.contractualDeliveryDate;
      worksheet.getCell(exFactoryDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(exFactoryDate).alignment = { vertical: "middle", horizontal: "left" };


      let shipmentDate = "O" + poListDataRowCount;
      worksheet.getCell(shipmentDate).value =  poData.handOverDate; //this.convertToDate(poData.handOverDate2); //poData.handOverDate2;
      worksheet.getCell(shipmentDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(shipmentDate).alignment = { vertical: "middle", horizontal: "left" };

      let orderType = "P" + poListDataRowCount;
      worksheet.getCell(orderType).value = poData.orderTypeName;
      worksheet.getCell(orderType).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(orderType).alignment = { vertical: "middle", horizontal: "left" };

      let cartonMeasurement = "Q" + poListDataRowCount;
      worksheet.getCell(cartonMeasurement).value = poData.packaging;
      worksheet.getCell(cartonMeasurement).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(cartonMeasurement).alignment = { vertical: "middle", horizontal: "left" };

      let piecePerBox = "R" + poListDataRowCount;
      worksheet.getCell(piecePerBox).value = poData.pcbValue;
      worksheet.getCell(piecePerBox).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(piecePerBox).alignment = { vertical: "middle", horizontal: "left" };

      let shippedMode = "S" + poListDataRowCount;
      worksheet.getCell(shippedMode).value = poData.shippedTypeName;
      worksheet.getCell(shippedMode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(shippedMode).alignment = { vertical: "middle", horizontal: "left" };

      let portOfLoadingName = "T" + poListDataRowCount;
      worksheet.getCell(portOfLoadingName).value = poData.landingPortName;
      worksheet.getCell(portOfLoadingName).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(portOfLoadingName).alignment = { vertical: "middle", horizontal: "left" };
      
      let destinationDC = "U" + poListDataRowCount;
      worksheet.getCell(destinationDC).value = poData.portOfDestinationName;
      worksheet.getCell(destinationDC).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(destinationDC).alignment = { vertical: "middle", horizontal: "left" };


      let extractionPo = "V" + poListDataRowCount;
      worksheet.getCell(extractionPo).value = poData.extractionPo;
      worksheet.getCell(extractionPo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(extractionPo).alignment = { vertical: "middle", horizontal: "left" };

      let orderGroup = "W" + poListDataRowCount;
      worksheet.getCell(orderGroup).value = poData.orderGroup;
      worksheet.getCell(orderGroup).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(orderGroup).alignment = { vertical: "middle", horizontal: "left" };

      let styleGroup = "X" + poListDataRowCount;
      worksheet.getCell(styleGroup).value = poData.styleGroup;
      worksheet.getCell(styleGroup).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(styleGroup).alignment = { vertical: "middle", horizontal: "left" };

      let protoNo = "Y" + poListDataRowCount;
      worksheet.getCell(protoNo).value = poData.protoNo;
      worksheet.getCell(protoNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(protoNo).alignment = { vertical: "middle", horizontal: "left" };

      let vasIndicator = "Z" + poListDataRowCount;
      worksheet.getCell(vasIndicator).value = poData.vasIndicator;
      worksheet.getCell(vasIndicator).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(vasIndicator).alignment = { vertical: "middle", horizontal: "left" };


      let capTypeGroup = "AA" + poListDataRowCount;
      worksheet.getCell(capTypeGroup).value = poData.capTypeGroup;
      worksheet.getCell(capTypeGroup).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(capTypeGroup).alignment = { vertical: "middle", horizontal: "left" };


      let qtNumber = "AB" + poListDataRowCount;
      worksheet.getCell(qtNumber).value = poData.qtNumber;
      worksheet.getCell(qtNumber).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(qtNumber).alignment = { vertical: "middle", horizontal: "left" };

      let tentativeMatarialsInhouseDate = "AC" + poListDataRowCount;
      worksheet.getCell(tentativeMatarialsInhouseDate).value = poData.tmrInHouseDate;
      worksheet.getCell(tentativeMatarialsInhouseDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(tentativeMatarialsInhouseDate).alignment = { vertical: "middle", horizontal: "left" };

      let ioNumber = "AD" + poListDataRowCount;
      worksheet.getCell(ioNumber).value = poData.ioNumber;
      worksheet.getCell(ioNumber).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(qtNumber).alignment = { vertical: "middle", horizontal: "left" };

      let barcode = "AE" + poListDataRowCount;
      worksheet.getCell(barcode).value = poData.barcode;
      worksheet.getCell(barcode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(qtNumber).alignment = { vertical: "middle", horizontal: "left" };

      let skuNumber = "AF" + poListDataRowCount;
      worksheet.getCell(skuNumber).value = poData.skuNumber;
      worksheet.getCell(skuNumber).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(qtNumber).alignment = { vertical: "middle", horizontal: "left" };

      let manufactureCode = "AG" + poListDataRowCount;
      worksheet.getCell(manufactureCode).value = poData.manufactureCode;
      worksheet.getCell(manufactureCode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(qtNumber).alignment = { vertical: "middle", horizontal: "left" };

      let packingInstruction = "AH" + poListDataRowCount;
      worksheet.getCell(packingInstruction).value = poData.packingInstruction;
      worksheet.getCell(packingInstruction).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(packingInstruction).alignment = { vertical: "middle", horizontal: "left" };
      // let changeStatus = "AF" + poListDataRowCount;
      // worksheet.getCell(changeStatus).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // }

      poListDataRowCount++;
    }



    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, title + ".xlsx");
    });

  }


  async exportPORichluistExcelReport(excelData) {

    const title = excelData.title;
    const allListData = excelData.finallySubmitData;
    this.commonService.LoadBuyerList();
    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet();



    const poGStarListHeader = [
      // "orderId",
      "splitOrderNo",
      "poNo",
      "styleNo",
      "hsCode",
      "itemDescription",
      "color",
      "colorCode",
      "materialStyle",
      "size",
      "sizeCode",
      "upc",
      "qty",
      "unitPrice",
      "orderReceivedBuyDate",
      "exFactoryDate",
      "shipmentDate",
      "orderType",
      "cartonMeasurement",
      "piecePerBox",
      "shippedMode",
      "portOfLoading",
      "destinationDC",
      "extractionPo",
      "orderGroup",
      "styleGroup",
      "protoNo",
      "vasIndicator",
      "capTypeGroup",
      "qtNumber",
      "tentativeMatarialsInhouseDate",
      "packingInstruction"
      // "changeStatus"
    ];



    //worksheet.mergeCells("A1", "L1");
    // worksheet.getColumn('A').width = 30;
    // worksheet.getColumn('B').width = 43;
    // worksheet.getColumn('C').width = 12;
    // worksheet.getColumn('D').width = 9;
    // worksheet.getColumn('E').width = 11;

    let poDktHeaderRow = worksheet.addRow(poGStarListHeader);
    poDktHeaderRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "" },
        bgColor: { argb: "" },
      };
      cell.font = {
        bold: true,
        color: { argb: "#ffff00" },
        size: 12,
      };
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    var poListDataRowCount = 2;

    for (var poData of allListData) {

      // let orderId = "A" + poListDataRowCount;
      // worksheet.getCell(orderId).value = poData.orderId;
      // worksheet.getCell(orderId).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // }
      // worksheet.getCell(orderId).alignment = { vertical: "middle", horizontal: "left" };

      let splitOrderNo = "A" + poListDataRowCount;
      worksheet.getCell(splitOrderNo).value = poData.splitOrderNo;
      worksheet.getCell(splitOrderNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(splitOrderNo).alignment = { vertical: "middle", horizontal: "left" };

      let poNo = "B" + poListDataRowCount;
      worksheet.getCell(poNo).value = poData.orderNo;
      worksheet.getCell(poNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(poNo).alignment = { vertical: "middle", horizontal: "left" };


      let styleNo = "C" + poListDataRowCount;
      worksheet.getCell(styleNo).value = poData.styleNo;
      worksheet.getCell(styleNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(styleNo).alignment = { vertical: "middle", horizontal: "left" };
    

      let hsCode = "D" + poListDataRowCount;
      worksheet.getCell(hsCode).value = poData.hsCode;
      worksheet.getCell(hsCode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(hsCode).alignment = { vertical: "middle", horizontal: "left" };

      let itemDescription = "E" + poListDataRowCount;
      worksheet.getCell(itemDescription).value = poData.itemDescription;
      worksheet.getCell(itemDescription).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(itemDescription).alignment = { vertical: "middle", horizontal: "left" };


      let color = "F" + poListDataRowCount;
      worksheet.getCell(color).value = poData.color;
      worksheet.getCell(color).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(color).alignment = { vertical: "middle", horizontal: "left" };


      let colorCode = "G" + poListDataRowCount;
      worksheet.getCell(colorCode).value = poData.model;
      worksheet.getCell(colorCode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(colorCode).alignment = { vertical: "middle", horizontal: "left" };

      let materialStyle = "H" + poListDataRowCount;
      worksheet.getCell(materialStyle).value = poData.item;
      worksheet.getCell(materialStyle).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(materialStyle).alignment = { vertical: "middle", horizontal: "left" };

      let size = "I" + poListDataRowCount;
      worksheet.getCell(size).value = poData.sizeValue;
      worksheet.getCell(size).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(size).alignment = { vertical: "middle", horizontal: "left" };


      let sizeCode = "J" + poListDataRowCount;
      worksheet.getCell(sizeCode).value = poData.sizeCode;
      worksheet.getCell(sizeCode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(sizeCode).alignment = { vertical: "middle", horizontal: "left" };

      let upc = "K" + poListDataRowCount;
      worksheet.getCell(upc).value = poData.upc;
      worksheet.getCell(upc).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(upc).alignment = { vertical: "middle", horizontal: "left" };

      let qty = "L" + poListDataRowCount;
      worksheet.getCell(qty).value = poData.orderQty;
      worksheet.getCell(qty).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(qty).alignment = { vertical: "middle", horizontal: "left" };

      let unitPrice = "M" + poListDataRowCount;
      worksheet.getCell(unitPrice).value = poData.unitPrice;
      worksheet.getCell(unitPrice).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(unitPrice).alignment = { vertical: "middle", horizontal: "left" };


      let orderReceivedDate = "N" + poListDataRowCount;
      worksheet.getCell(orderReceivedDate).value = poData.creationDate;
      worksheet.getCell(orderReceivedDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(orderReceivedDate).alignment = { vertical: "middle", horizontal: "left" };


      let exFactoryDate = "O" + poListDataRowCount;
      worksheet.getCell(exFactoryDate).value = poData.contractualDeliveryDate;
      worksheet.getCell(exFactoryDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(exFactoryDate).alignment = { vertical: "middle", horizontal: "left" };


      let shipmentDate = "P" + poListDataRowCount;
      worksheet.getCell(shipmentDate).value =  poData.handOverDate2; //this.convertToDate(poData.handOverDate2); //poData.handOverDate2;
      worksheet.getCell(shipmentDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(shipmentDate).alignment = { vertical: "middle", horizontal: "left" };

      let orderType = "Q" + poListDataRowCount;
      worksheet.getCell(orderType).value = poData.orderTypeName;
      worksheet.getCell(orderType).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(orderType).alignment = { vertical: "middle", horizontal: "left" };

      let cartonMeasurement = "R" + poListDataRowCount;
      worksheet.getCell(cartonMeasurement).value = poData.packaging;
      worksheet.getCell(cartonMeasurement).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(cartonMeasurement).alignment = { vertical: "middle", horizontal: "left" };

      let piecePerBox = "S" + poListDataRowCount;
      worksheet.getCell(piecePerBox).value = poData.pcbValue;
      worksheet.getCell(piecePerBox).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(piecePerBox).alignment = { vertical: "middle", horizontal: "left" };

      let shippedMode = "T" + poListDataRowCount;
      worksheet.getCell(shippedMode).value = poData.shippedTypeName;
      worksheet.getCell(shippedMode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(shippedMode).alignment = { vertical: "middle", horizontal: "left" };

      let portOfLoadingName = "U" + poListDataRowCount;
      worksheet.getCell(portOfLoadingName).value = poData.landingPortName;
      worksheet.getCell(portOfLoadingName).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(portOfLoadingName).alignment = { vertical: "middle", horizontal: "left" };
      
      let destinationDC = "V" + poListDataRowCount;
      worksheet.getCell(destinationDC).value = poData.portOfDestinationName;
      worksheet.getCell(destinationDC).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(destinationDC).alignment = { vertical: "middle", horizontal: "left" };


      let extractionPo = "W" + poListDataRowCount;
      worksheet.getCell(extractionPo).value = poData.extractionPo;
      worksheet.getCell(extractionPo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(extractionPo).alignment = { vertical: "middle", horizontal: "left" };

      let orderGroup = "X" + poListDataRowCount;
      worksheet.getCell(orderGroup).value = poData.orderGroup;
      worksheet.getCell(orderGroup).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(orderGroup).alignment = { vertical: "middle", horizontal: "left" };

      let styleGroup = "Y" + poListDataRowCount;
      worksheet.getCell(styleGroup).value = poData.styleGroup;
      worksheet.getCell(styleGroup).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(styleGroup).alignment = { vertical: "middle", horizontal: "left" };

      let protoNo = "Z" + poListDataRowCount;
      worksheet.getCell(protoNo).value = poData.protoNo;
      worksheet.getCell(protoNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(protoNo).alignment = { vertical: "middle", horizontal: "left" };

      let vasIndicator = "AA" + poListDataRowCount;
      worksheet.getCell(vasIndicator).value = poData.vasIndicator;
      worksheet.getCell(vasIndicator).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(vasIndicator).alignment = { vertical: "middle", horizontal: "left" };


      let capTypeGroup = "AB" + poListDataRowCount;
      worksheet.getCell(capTypeGroup).value = poData.capTypeGroup;
      worksheet.getCell(capTypeGroup).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(capTypeGroup).alignment = { vertical: "middle", horizontal: "left" };


      let qtNumber = "AC" + poListDataRowCount;
      worksheet.getCell(qtNumber).value = poData.qtNumber;
      worksheet.getCell(qtNumber).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(qtNumber).alignment = { vertical: "middle", horizontal: "left" };

      let tentativeMatarialsInhouseDate = "AD" + poListDataRowCount;
      worksheet.getCell(tentativeMatarialsInhouseDate).value = poData.tmrInHouseDate;
      worksheet.getCell(tentativeMatarialsInhouseDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(tentativeMatarialsInhouseDate).alignment = { vertical: "middle", horizontal: "left" };

      let packingInstruction = "AE" + poListDataRowCount;
      worksheet.getCell(packingInstruction).value = poData.packingInstruction;
      worksheet.getCell(packingInstruction).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(packingInstruction).alignment = { vertical: "middle", horizontal: "left" };

      // let changeStatus = "AE" + poListDataRowCount;
      // worksheet.getCell(changeStatus).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // }
      poListDataRowCount++;
    }



    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, title + ".xlsx");
    });

  }


  async exportPOBSistExcelReport(excelData) {

    debugger
    const title = excelData.title;
    const allListData = excelData.finallySubmitData;
    this.commonService.LoadBuyerList();
    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet();



    const poGStarListHeader = [
      // "orderId",
      "splitOrderNo",
      "poNo",
      "styleNo",
      "hsCode",
      "color",
      "colorCode",
      "upc",
      "materialStyle",
      "unitPrice",
      "orderReceivedBuyDate",
      "exFactoryDate",
      "shipmentDate",
      "orderType",
      "cartonMeasurement",
      "piecePerBox",
      "shippedMode",
      "portOfLoading",
      "destinationDC",
      "extractionPo",
      "orderGroup",
      "styleGroup",
      "protoNo",
      "vasIndicator",
      "capTypeGroup",
      "qtNumber",
      "tentativeMatarialsInhouseDate",
      "uvmInstruction",
      "size",
      "qty",
      "packingInstruction"
      // "changeStatus"
    ];



    //worksheet.mergeCells("A1", "L1");
    // worksheet.getColumn('A').width = 30;
    // worksheet.getColumn('B').width = 43;
    // worksheet.getColumn('C').width = 12;
    // worksheet.getColumn('D').width = 9;
    // worksheet.getColumn('E').width = 11;

    let poDktHeaderRow = worksheet.addRow(poGStarListHeader);
    poDktHeaderRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "" },
        bgColor: { argb: "" },
      };
      cell.font = {
        bold: true,
        color: { argb: "#ffff00" },
        size: 12,
      };
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    var poListDataRowCount = 2;

    for (var poData of allListData) {

      // let orderId = "A" + poListDataRowCount;
      // worksheet.getCell(orderId).value = poData.orderId;
      // worksheet.getCell(orderId).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // }
      // worksheet.getCell(orderId).alignment = { vertical: "middle", horizontal: "left" };

      let splitOrderNo = "A" + poListDataRowCount;
      worksheet.getCell(splitOrderNo).value = poData.splitOrderNo;
      worksheet.getCell(splitOrderNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(splitOrderNo).alignment = { vertical: "middle", horizontal: "left" };

      let poNo = "B" + poListDataRowCount;
      worksheet.getCell(poNo).value = poData.orderNo;
      worksheet.getCell(poNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(poNo).alignment = { vertical: "middle", horizontal: "left" };

      let styleNo = "C" + poListDataRowCount;
      worksheet.getCell(styleNo).value = poData.styleNo;
      worksheet.getCell(styleNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(styleNo).alignment = { vertical: "middle", horizontal: "left" };


      let hsCode = "D" + poListDataRowCount;
      worksheet.getCell(hsCode).value = poData.hsCode;
      worksheet.getCell(hsCode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(hsCode).alignment = { vertical: "middle", horizontal: "left" };

      let color = "E" + poListDataRowCount;
      worksheet.getCell(color).value = poData.color;
      worksheet.getCell(color).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(color).alignment = { vertical: "middle", horizontal: "left" };


      let colorCode = "F" + poListDataRowCount;
      worksheet.getCell(colorCode).value = poData.model;
      worksheet.getCell(colorCode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(colorCode).alignment = { vertical: "middle", horizontal: "left" };


      let upc = "G" + poListDataRowCount;
      worksheet.getCell(upc).value = poData.upc;
      worksheet.getCell(upc).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(upc).alignment = { vertical: "middle", horizontal: "left" };


      let materialStyle = "H" + poListDataRowCount;
      worksheet.getCell(materialStyle).value = poData.item;
      worksheet.getCell(materialStyle).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(materialStyle).alignment = { vertical: "middle", horizontal: "left" };
     

      let unitPrice = "I" + poListDataRowCount;
      worksheet.getCell(unitPrice).value = poData.unitPrice;
      worksheet.getCell(unitPrice).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(unitPrice).alignment = { vertical: "middle", horizontal: "left" };


      let orderReceivedDate = "J" + poListDataRowCount;
      // worksheet.getCell(orderReceivedDate).value = poData.orderReceivedDate;
      worksheet.getCell(orderReceivedDate).value = poData.creationDate;
      worksheet.getCell(orderReceivedDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(orderReceivedDate).alignment = { vertical: "middle", horizontal: "left" };


      let exFactoryDate = "K" + poListDataRowCount;
      worksheet.getCell(exFactoryDate).value = poData.contractualDeliveryDate;
      worksheet.getCell(exFactoryDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(exFactoryDate).alignment = { vertical: "middle", horizontal: "left" };


      let shipmentDate = "L" + poListDataRowCount;
      worksheet.getCell(shipmentDate).value =  poData.handOverDate; //this.convertToDate(poData.handOverDate2); //poData.handOverDate2;
      worksheet.getCell(shipmentDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(shipmentDate).alignment = { vertical: "middle", horizontal: "left" };

      let orderType = "M" + poListDataRowCount;
      worksheet.getCell(orderType).value = poData.orderTypeName;
      worksheet.getCell(orderType).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(orderType).alignment = { vertical: "middle", horizontal: "left" };

      let cartonMeasurement = "N" + poListDataRowCount;
      worksheet.getCell(cartonMeasurement).value = poData.packaging;
      worksheet.getCell(cartonMeasurement).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(cartonMeasurement).alignment = { vertical: "middle", horizontal: "left" };

      let piecePerBox = "O" + poListDataRowCount;
      worksheet.getCell(piecePerBox).value = poData.pcbValue;
      worksheet.getCell(piecePerBox).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(piecePerBox).alignment = { vertical: "middle", horizontal: "left" };

      let shippedMode = "P" + poListDataRowCount;
      worksheet.getCell(shippedMode).value = poData.shippedTypeName;
      worksheet.getCell(shippedMode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(shippedMode).alignment = { vertical: "middle", horizontal: "left" };

      let portOfLoadingName = "Q" + poListDataRowCount;
      worksheet.getCell(portOfLoadingName).value = poData.landingPortName;
      worksheet.getCell(portOfLoadingName).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(portOfLoadingName).alignment = { vertical: "middle", horizontal: "left" };
      
      let destinationDC = "R" + poListDataRowCount;
      worksheet.getCell(destinationDC).value = poData.portOfDestinationName;
      worksheet.getCell(destinationDC).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(destinationDC).alignment = { vertical: "middle", horizontal: "left" };


      let extractionPo = "S" + poListDataRowCount;
      worksheet.getCell(extractionPo).value = poData.extractionPo;
      worksheet.getCell(extractionPo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(extractionPo).alignment = { vertical: "middle", horizontal: "left" };

      let orderGroup = "T" + poListDataRowCount;
      worksheet.getCell(orderGroup).value = poData.orderGroup;
      worksheet.getCell(orderGroup).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(orderGroup).alignment = { vertical: "middle", horizontal: "left" };

      let styleGroup = "U" + poListDataRowCount;
      worksheet.getCell(styleGroup).value = poData.styleGroup;
      worksheet.getCell(styleGroup).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(styleGroup).alignment = { vertical: "middle", horizontal: "left" };

      let protoNo = "V" + poListDataRowCount;
      worksheet.getCell(protoNo).value = poData.protoNo;
      worksheet.getCell(protoNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(protoNo).alignment = { vertical: "middle", horizontal: "left" };

      let vasIndicator = "W" + poListDataRowCount;
      worksheet.getCell(vasIndicator).value = poData.vasIndicator;
      worksheet.getCell(vasIndicator).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(vasIndicator).alignment = { vertical: "middle", horizontal: "left" };


      let capTypeGroup = "X" + poListDataRowCount;
      worksheet.getCell(capTypeGroup).value = poData.capTypeGroup;
      worksheet.getCell(capTypeGroup).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(capTypeGroup).alignment = { vertical: "middle", horizontal: "left" };


      let qtNumber = "Y" + poListDataRowCount;
      worksheet.getCell(qtNumber).value = poData.qtNumber;
      worksheet.getCell(qtNumber).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(qtNumber).alignment = { vertical: "middle", horizontal: "left" };

      let tentativeMatarialsInhouseDate = "Z" + poListDataRowCount;
      worksheet.getCell(tentativeMatarialsInhouseDate).value = poData.tmrInHouseDate;
      worksheet.getCell(tentativeMatarialsInhouseDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(tentativeMatarialsInhouseDate).alignment = { vertical: "middle", horizontal: "left" };

      let uvmInstruction = "AA" + poListDataRowCount;
      worksheet.getCell(uvmInstruction).value = poData.uvmInstruction;
      worksheet.getCell(uvmInstruction).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(uvmInstruction).alignment = { vertical: "middle", horizontal: "left" };   

      let size = "AB" + poListDataRowCount;
      worksheet.getCell(size).value = poData.sizeValue;
      worksheet.getCell(size).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(size).alignment = { vertical: "middle", horizontal: "left" };   
     

      let qty = "AC" + poListDataRowCount;
      worksheet.getCell(qty).value = poData.orderQty;
      worksheet.getCell(qty).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(qty).alignment = { vertical: "middle", horizontal: "left" };

      let packingInstruction = "AD" + poListDataRowCount;
      worksheet.getCell(packingInstruction).value = poData.packingInstruction;
      worksheet.getCell(packingInstruction).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(packingInstruction).alignment = { vertical: "middle", horizontal: "left" };

      // let changeStatus = "AC" + poListDataRowCount;
      // worksheet.getCell(changeStatus).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // }

      poListDataRowCount++;
    }



    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, title + ".xlsx");
    });

  }


  async exportPOLVListExcelReport(excelData) {

    debugger
    const title = excelData.title;
    const allListData = excelData.finallySubmitData;
    this.commonService.LoadBuyerList();
    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet();



    const poGStarListHeader = [
      "orderId",
      "splitOrderNo",
      "poNo",
      "styleNo",
      "hsCode",
      "color",
      "colorCode",
      "materialStyle",
      "unitPrice",
      "orderReceivedBuyDate",
      "exFactoryDate",
      "shipmentDate",
      "orderType",
      "cartonMeasurement",
      "piecePerBox",
      "shippedMode",
      "portOfLoading",
      "destinationDC",
      "extractionPo",
      "orderGroup",
      "styleGroup",
      "protoNo",
      "vasIndicator",
      "capTypeGroup",
      "qtNumber",
      "tentativeMatarialsInhouseDate",
      "sizeCode",
      "upc",
      "size",
      "qty",
      "changeStatus",
      "packingInstruction"
    ];



    //worksheet.mergeCells("A1", "L1");
    // worksheet.getColumn('A').width = 30;
    // worksheet.getColumn('B').width = 43;
    // worksheet.getColumn('C').width = 12;
    // worksheet.getColumn('D').width = 9;
    // worksheet.getColumn('E').width = 11;

    let poDktHeaderRow = worksheet.addRow(poGStarListHeader);
    poDktHeaderRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "" },
        bgColor: { argb: "" },
      };
      cell.font = {
        bold: true,
        color: { argb: "#ffff00" },
        size: 12,
      };
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    var poListDataRowCount = 2;

    for (var poData of allListData) {

      let orderId = "A" + poListDataRowCount;
      worksheet.getCell(orderId).value = poData.orderId;
      worksheet.getCell(orderId).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(orderId).alignment = { vertical: "middle", horizontal: "left" };

      let splitOrderNo = "B" + poListDataRowCount;
      worksheet.getCell(splitOrderNo).value = poData.splitOrderNo;
      worksheet.getCell(splitOrderNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(splitOrderNo).alignment = { vertical: "middle", horizontal: "left" };

      let poNo = "C" + poListDataRowCount;
      worksheet.getCell(poNo).value = poData.orderNo;
      worksheet.getCell(poNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(poNo).alignment = { vertical: "middle", horizontal: "left" };

      let styleNo = "D" + poListDataRowCount;
      worksheet.getCell(styleNo).value = poData.styleNo;
      worksheet.getCell(styleNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(styleNo).alignment = { vertical: "middle", horizontal: "left" };


      let hsCode = "E" + poListDataRowCount;
      worksheet.getCell(hsCode).value = poData.hsCode;
      worksheet.getCell(hsCode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(hsCode).alignment = { vertical: "middle", horizontal: "left" };

      let color = "F" + poListDataRowCount;
      worksheet.getCell(color).value = poData.color;
      worksheet.getCell(color).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(color).alignment = { vertical: "middle", horizontal: "left" };


      let colorCode = "G" + poListDataRowCount;
      worksheet.getCell(colorCode).value = poData.model;
      worksheet.getCell(colorCode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(colorCode).alignment = { vertical: "middle", horizontal: "left" };

   
      let materialStyle = "H" + poListDataRowCount;
      worksheet.getCell(materialStyle).value = poData.item;
      worksheet.getCell(materialStyle).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(materialStyle).alignment = { vertical: "middle", horizontal: "left" };
     

      let unitPrice = "I" + poListDataRowCount;
      worksheet.getCell(unitPrice).value = poData.unitPrice;
      worksheet.getCell(unitPrice).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(unitPrice).alignment = { vertical: "middle", horizontal: "left" };


      let orderReceivedDate = "J" + poListDataRowCount;
      // worksheet.getCell(orderReceivedDate).value = poData.orderReceivedDate;
      worksheet.getCell(orderReceivedDate).value = poData.creationDate;
      worksheet.getCell(orderReceivedDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(orderReceivedDate).alignment = { vertical: "middle", horizontal: "left" };


      let exFactoryDate = "K" + poListDataRowCount;
      worksheet.getCell(exFactoryDate).value = poData.contractualDeliveryDate;
      worksheet.getCell(exFactoryDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(exFactoryDate).alignment = { vertical: "middle", horizontal: "left" };


      let shipmentDate = "L" + poListDataRowCount;
      worksheet.getCell(shipmentDate).value =  poData.handOverDate; //this.convertToDate(poData.handOverDate2); //poData.handOverDate2;
      worksheet.getCell(shipmentDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(shipmentDate).alignment = { vertical: "middle", horizontal: "left" };

      let orderType = "M" + poListDataRowCount;
      worksheet.getCell(orderType).value = poData.orderTypeName;
      worksheet.getCell(orderType).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(orderType).alignment = { vertical: "middle", horizontal: "left" };

      let cartonMeasurement = "N" + poListDataRowCount;
      worksheet.getCell(cartonMeasurement).value = poData.packaging;
      worksheet.getCell(cartonMeasurement).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(cartonMeasurement).alignment = { vertical: "middle", horizontal: "left" };

      let piecePerBox = "O" + poListDataRowCount;
      worksheet.getCell(piecePerBox).value = poData.pcbValue;
      worksheet.getCell(piecePerBox).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(piecePerBox).alignment = { vertical: "middle", horizontal: "left" };

      let shippedMode = "P" + poListDataRowCount;
      worksheet.getCell(shippedMode).value = poData.shippedTypeName;
      worksheet.getCell(shippedMode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(shippedMode).alignment = { vertical: "middle", horizontal: "left" };

      let portOfLoadingName = "Q" + poListDataRowCount;
      worksheet.getCell(portOfLoadingName).value = poData.landingPortName;
      worksheet.getCell(portOfLoadingName).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(portOfLoadingName).alignment = { vertical: "middle", horizontal: "left" };
      
      let destinationDC = "R" + poListDataRowCount;
      worksheet.getCell(destinationDC).value = poData.portOfDestinationName;
      worksheet.getCell(destinationDC).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(destinationDC).alignment = { vertical: "middle", horizontal: "left" };


      let extractionPo = "S" + poListDataRowCount;
      worksheet.getCell(extractionPo).value = poData.extractionPo;
      worksheet.getCell(extractionPo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(extractionPo).alignment = { vertical: "middle", horizontal: "left" };

      let orderGroup = "T" + poListDataRowCount;
      worksheet.getCell(orderGroup).value = poData.orderGroup;
      worksheet.getCell(orderGroup).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(orderGroup).alignment = { vertical: "middle", horizontal: "left" };

      let styleGroup = "U" + poListDataRowCount;
      worksheet.getCell(styleGroup).value = poData.styleGroup;
      worksheet.getCell(styleGroup).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(styleGroup).alignment = { vertical: "middle", horizontal: "left" };

      let protoNo = "V" + poListDataRowCount;
      worksheet.getCell(protoNo).value = poData.protoNo;
      worksheet.getCell(protoNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(protoNo).alignment = { vertical: "middle", horizontal: "left" };

      let vasIndicator = "W" + poListDataRowCount;
      worksheet.getCell(vasIndicator).value = poData.vasIndicator;
      worksheet.getCell(vasIndicator).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(vasIndicator).alignment = { vertical: "middle", horizontal: "left" };


      let capTypeGroup = "X" + poListDataRowCount;
      worksheet.getCell(capTypeGroup).value = poData.capTypeGroup;
      worksheet.getCell(capTypeGroup).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(capTypeGroup).alignment = { vertical: "middle", horizontal: "left" };


      let qtNumber = "Y" + poListDataRowCount;
      worksheet.getCell(qtNumber).value = poData.qtNumber;
      worksheet.getCell(qtNumber).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(qtNumber).alignment = { vertical: "middle", horizontal: "left" };

      let tentativeMatarialsInhouseDate = "Z" + poListDataRowCount;
      worksheet.getCell(tentativeMatarialsInhouseDate).value = poData.tmrInHouseDate;
      worksheet.getCell(tentativeMatarialsInhouseDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(tentativeMatarialsInhouseDate).alignment = { vertical: "middle", horizontal: "left" };


      let sizeCode = "AA" + poListDataRowCount;
      worksheet.getCell(sizeCode).value = poData.sizeCode;
      worksheet.getCell(sizeCode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(sizeCode).alignment = { vertical: "middle", horizontal: "left" };

     
      let upc = "AB" + poListDataRowCount;
      worksheet.getCell(upc).value = poData.upc;
      worksheet.getCell(upc).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(upc).alignment = { vertical: "middle", horizontal: "left" };


      let size = "AC" + poListDataRowCount;
      worksheet.getCell(size).value = poData.sizeValue;
      worksheet.getCell(size).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(size).alignment = { vertical: "middle", horizontal: "left" };   
     

      let qty = "AD" + poListDataRowCount;
      worksheet.getCell(qty).value = poData.orderQty;
      worksheet.getCell(qty).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(qty).alignment = { vertical: "middle", horizontal: "left" };

      let changeStatus = "AD" + poListDataRowCount;
      worksheet.getCell(changeStatus).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let packingInstruction = "AE" + poListDataRowCount;
      worksheet.getCell(packingInstruction).value = poData.packingInstruction;
      worksheet.getCell(packingInstruction).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(packingInstruction).alignment = { vertical: "middle", horizontal: "left" };
      poListDataRowCount++;
    }



    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, title + ".xlsx");
    });

  }

  async exportPOPentlandListExcelReport(excelData) {

    debugger
    const title = excelData.title;
    const allListData = excelData.finallySubmitData;
    this.commonService.LoadBuyerList();
    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet();



    const poGStarListHeader = [
      // "orderId",
      "splitOrderNo",
      "poNo",
      "line",
      "styleNo",
      "hsCode",
      "color",
      "colorCode",
      "materialStyle",
      "size",
      "sizeCode",
      "upc",
      "ean",
      "qty",
      "unitPrice",
      "orderReceivedBuyDate",
      "exFactoryDate",
      "shipmentDate",
      "orderType",
      "cartonMeasurement",
      "piecePerBox",
      "shippedMode",
      "portOfLoading",
      "destinationDC",
      "procurementModel",
      "extractionPo",
      "orderGroup",
      "styleGroup",
      "protoNo",
      "vasIndicator",
      "capTypeGroup",
      "qtNumber",
      "tentativeMatarialsInhouseDate",
      "ioNumber",
      "barcode",
      "skuNumber",
      "manufactureCode",
      "packingInstruction"
      // "changeStatus"
    ];



    //worksheet.mergeCells("A1", "L1");
    // worksheet.getColumn('A').width = 30;
    // worksheet.getColumn('B').width = 43;
    // worksheet.getColumn('C').width = 12;
    // worksheet.getColumn('D').width = 9;
    // worksheet.getColumn('E').width = 11;

    let poDktHeaderRow = worksheet.addRow(poGStarListHeader);
    poDktHeaderRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "" },
        bgColor: { argb: "" },
      };
      cell.font = {
        bold: true,
        color: { argb: "#ffff00" },
        size: 12,
      };
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    var poListDataRowCount = 2;

    for (var poData of allListData) {

      // let orderId = "A" + poListDataRowCount;
      // worksheet.getCell(orderId).value = poData.orderId;
      // worksheet.getCell(orderId).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // }
      // worksheet.getCell(orderId).alignment = { vertical: "middle", horizontal: "left" };

      let splitOrderNo = "A" + poListDataRowCount;
      worksheet.getCell(splitOrderNo).value = poData.splitOrderNo;
      worksheet.getCell(splitOrderNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(splitOrderNo).alignment = { vertical: "middle", horizontal: "left" };

      let poNo = "B" + poListDataRowCount;
      worksheet.getCell(poNo).value = poData.orderNo;
      worksheet.getCell(poNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(poNo).alignment = { vertical: "middle", horizontal: "left" };

      let line = "C" + poListDataRowCount;
      worksheet.getCell(line).value = poData.line;
      worksheet.getCell(line).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(line).alignment = { vertical: "middle", horizontal: "left" };


      let styleNo = "D" + poListDataRowCount;
      worksheet.getCell(styleNo).value = poData.styleNo;
      worksheet.getCell(styleNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(styleNo).alignment = { vertical: "middle", horizontal: "left" };



    

      let hsCode = "E" + poListDataRowCount;
      worksheet.getCell(hsCode).value = poData.hsCode;
      worksheet.getCell(hsCode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(hsCode).alignment = { vertical: "middle", horizontal: "left" };

      let color = "F" + poListDataRowCount;
      worksheet.getCell(color).value = poData.color;
      worksheet.getCell(color).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(color).alignment = { vertical: "middle", horizontal: "left" };


      let colorCode = "G" + poListDataRowCount;
      worksheet.getCell(colorCode).value = poData.model;
      worksheet.getCell(colorCode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(colorCode).alignment = { vertical: "middle", horizontal: "left" };

      let materialStyle = "H" + poListDataRowCount;
      worksheet.getCell(materialStyle).value = poData.item;
      worksheet.getCell(materialStyle).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(materialStyle).alignment = { vertical: "middle", horizontal: "left" };

      let size = "I" + poListDataRowCount;
      worksheet.getCell(size).value = poData.sizeValue;
      worksheet.getCell(size).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(size).alignment = { vertical: "middle", horizontal: "left" };


      let sizeCode = "J" + poListDataRowCount;
      worksheet.getCell(sizeCode).value = poData.sizeCode;
      worksheet.getCell(sizeCode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(sizeCode).alignment = { vertical: "middle", horizontal: "left" };

      let upc = "K" + poListDataRowCount;
      worksheet.getCell(upc).value = poData.upc;
      worksheet.getCell(upc).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(upc).alignment = { vertical: "middle", horizontal: "left" };

      let eanCode = "L" + poListDataRowCount;
      worksheet.getCell(eanCode).value = poData.eanCode;
      worksheet.getCell(eanCode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(eanCode).alignment = { vertical: "middle", horizontal: "left" };

      let qty = "M" + poListDataRowCount;
      worksheet.getCell(qty).value = poData.orderQty;
      worksheet.getCell(qty).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(qty).alignment = { vertical: "middle", horizontal: "left" };

      let unitPrice = "N" + poListDataRowCount;
      worksheet.getCell(unitPrice).value = poData.unitPrice;
      worksheet.getCell(unitPrice).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(unitPrice).alignment = { vertical: "middle", horizontal: "left" };


      let orderReceivedDate = "O" + poListDataRowCount;
      // worksheet.getCell(orderReceivedDate).value = poData.orderReceivedDate;
      worksheet.getCell(orderReceivedDate).value = poData.creationDate;
      worksheet.getCell(orderReceivedDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(orderReceivedDate).alignment = { vertical: "middle", horizontal: "left" };


      let exFactoryDate = "P" + poListDataRowCount;
      worksheet.getCell(exFactoryDate).value = poData.contractualDeliveryDate;
      worksheet.getCell(exFactoryDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(exFactoryDate).alignment = { vertical: "middle", horizontal: "left" };


      let shipmentDate = "Q" + poListDataRowCount;
      worksheet.getCell(shipmentDate).value =  poData.handOverDate; //this.convertToDate(poData.handOverDate2); //poData.handOverDate2;
      worksheet.getCell(shipmentDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(shipmentDate).alignment = { vertical: "middle", horizontal: "left" };

      let orderType = "R" + poListDataRowCount;
      worksheet.getCell(orderType).value = poData.orderTypeName;
      worksheet.getCell(orderType).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(orderType).alignment = { vertical: "middle", horizontal: "left" };

      let cartonMeasurement = "S" + poListDataRowCount;
      worksheet.getCell(cartonMeasurement).value = poData.packaging;
      worksheet.getCell(cartonMeasurement).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(cartonMeasurement).alignment = { vertical: "middle", horizontal: "left" };

      let piecePerBox = "T" + poListDataRowCount;
      worksheet.getCell(piecePerBox).value = poData.pcbValue;
      worksheet.getCell(piecePerBox).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(piecePerBox).alignment = { vertical: "middle", horizontal: "left" };

      let shippedMode = "U" + poListDataRowCount;
      worksheet.getCell(shippedMode).value = poData.shippedTypeName;
      worksheet.getCell(shippedMode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(shippedMode).alignment = { vertical: "middle", horizontal: "left" };

      let portOfLoadingName = "V" + poListDataRowCount;
      worksheet.getCell(portOfLoadingName).value = poData.landingPortName;
      worksheet.getCell(portOfLoadingName).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(portOfLoadingName).alignment = { vertical: "middle", horizontal: "left" };
      
      let destinationDC = "W" + poListDataRowCount;
      worksheet.getCell(destinationDC).value = poData.portOfDestinationName;
      worksheet.getCell(destinationDC).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(destinationDC).alignment = { vertical: "middle", horizontal: "left" };

      let procurementModel = "X" + poListDataRowCount;
      worksheet.getCell(procurementModel).value = poData.procurementModel;
      worksheet.getCell(procurementModel).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(procurementModel).alignment = { vertical: "middle", horizontal: "left" };


      let extractionPo = "Y" + poListDataRowCount;
      worksheet.getCell(extractionPo).value = poData.extractionPo;
      worksheet.getCell(extractionPo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(extractionPo).alignment = { vertical: "middle", horizontal: "left" };

      let orderGroup = "Z" + poListDataRowCount;
      worksheet.getCell(orderGroup).value = poData.orderGroup;
      worksheet.getCell(orderGroup).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(orderGroup).alignment = { vertical: "middle", horizontal: "left" };

      let styleGroup = "AA" + poListDataRowCount;
      worksheet.getCell(styleGroup).value = poData.styleGroup;
      worksheet.getCell(styleGroup).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(styleGroup).alignment = { vertical: "middle", horizontal: "left" };

      let protoNo = "AB" + poListDataRowCount;
      worksheet.getCell(protoNo).value = poData.protoNo;
      worksheet.getCell(protoNo).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(protoNo).alignment = { vertical: "middle", horizontal: "left" };

      let vasIndicator = "AC" + poListDataRowCount;
      worksheet.getCell(vasIndicator).value = poData.vasIndicator;
      worksheet.getCell(vasIndicator).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(vasIndicator).alignment = { vertical: "middle", horizontal: "left" };


      let capTypeGroup = "AD" + poListDataRowCount;
      worksheet.getCell(capTypeGroup).value = poData.capTypeGroup;
      worksheet.getCell(capTypeGroup).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(capTypeGroup).alignment = { vertical: "middle", horizontal: "left" };


      let qtNumber = "AE" + poListDataRowCount;
      worksheet.getCell(qtNumber).value = poData.qtNumber;
      worksheet.getCell(qtNumber).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(qtNumber).alignment = { vertical: "middle", horizontal: "left" };

      let tentativeMatarialsInhouseDate = "AF" + poListDataRowCount;
      worksheet.getCell(tentativeMatarialsInhouseDate).value = poData.tmrInHouseDate;
      worksheet.getCell(tentativeMatarialsInhouseDate).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(tentativeMatarialsInhouseDate).alignment = { vertical: "middle", horizontal: "left" };

      let ioNumber = "AG" + poListDataRowCount;
      worksheet.getCell(ioNumber).value = poData.ioNumber;
      worksheet.getCell(ioNumber).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(qtNumber).alignment = { vertical: "middle", horizontal: "left" };

      let barcode = "AH" + poListDataRowCount;
      worksheet.getCell(barcode).value = poData.barcode;
      worksheet.getCell(barcode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(qtNumber).alignment = { vertical: "middle", horizontal: "left" };

      let skuNumber = "AI" + poListDataRowCount;
      worksheet.getCell(skuNumber).value = poData.skuNumber;
      worksheet.getCell(skuNumber).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(qtNumber).alignment = { vertical: "middle", horizontal: "left" };

      let manufactureCode = "AJ" + poListDataRowCount;
      worksheet.getCell(manufactureCode).value = poData.manufactureCode;
      worksheet.getCell(manufactureCode).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(qtNumber).alignment = { vertical: "middle", horizontal: "left" };

      let packingInstruction = "AK" + poListDataRowCount;
      worksheet.getCell(packingInstruction).value = poData.packingInstruction;
      worksheet.getCell(packingInstruction).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell(packingInstruction).alignment = { vertical: "middle", horizontal: "left" };
      // let changeStatus = "AF" + poListDataRowCount;
      // worksheet.getCell(changeStatus).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // }

      poListDataRowCount++;
    }



    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, title + ".xlsx");
    });

  }

  convertToDate(dateString: string): string | null {
    const parts = dateString.split('-');
    const date = new Date(+parts[2], +parts[1] - 1, +parts[0]); // YYYY-MM-DD
    return this.datePipe.transform(date, 'dd-MMM-yyyy');
  }
}
