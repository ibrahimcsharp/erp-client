import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Workbook } from "exceljs";
import * as fs from "file-saver";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { CostAccessories } from "../model/costing-accessories.model";
import { CostFabric } from "../model/costing-fabric-model";
import { CostingMasterModel } from "../model/costing-model";

@Injectable({
  providedIn: "root",
})
export class AlphabroderCostingReportService {
  NewCostAccessoriesList: CostAccessories[] = [];
  formData: CostAccessories;
  costingAccessoriesList: CostAccessories[];
  headers = {};
  baseUrl = environment.apiUrl + "merchandising/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
  totalVal = 0;
  rowGroupMetadata: any;
  GroupWiseCostInfo: any;
  auth_token = null;
  totalCostInfo: any = [];
  newButtonshow = true;
  constructor(private http: HttpClient, private token: TokenService) { }

  async imageUrlToBase64(urL: string) {
    debugger
    return this.http
      .get(urL, { observe: "body", responseType: "arraybuffer" })
      .pipe(
        take(1),
        map((arrayBuffer) =>
          btoa(
            Array.from(new Uint8Array(arrayBuffer))
              .map((b) => String.fromCharCode(b))
              .join("")
          )
        )
      ).toPromise();
  }

  //------ Image Url To Base64 Converter------//
  toDataURL = async (url) => {
    console.log("Downloading image...");
    var res = await fetch(url);
    var blob = await res.blob();

    const result = await new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
    return result
  };

  async exportAlphabroderExcelReport(excelData) {
    debugger
    const title = excelData.title;
    const allData = excelData.finallySubmitData;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(
      "Costing  Report"
    );
    const stockHeaderFabric = [
      "SL",
      "Item",
      "Item Description",
      "Supplier Name",
      "Qty/Dz",
      "Unit",
      "Unit Price",
      "Total Price",
      "Remarks",
    ];

    const stockHeaderIE = [
      //"Buyer",
     // "Style",
     // "Item",
      "Order Qty",
      "PPM",
      "SMV",
      //"Machine",
      //"W/Munte",
      // "Wanted Eff(%)",
      "Eff(%)",
      // "Daily Prod'N",
      // "Hourly Prod'n",
      // "0.036",
      // "0.04",
      // "0.055",
      // "0.059",
      "PRO/mc",
      "CM/Dz"
    ];

    let d = new Date();
    let date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

    worksheet.mergeCells("A1", "I1");
    let companyRow = worksheet.getCell("A1");
    companyRow.value = "Costing Report (" + date + ")";
    companyRow.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "#ffff00" },
    };
    companyRow.alignment = { vertical: "middle", horizontal: "right" };


    var partList = allData.filter((a, i) => allData.findIndex((s) => a.stylePartId === s.stylePartId) === i);

    debugger
    if (allData[0].fileStatus == "Y") {
      var url = environment.fileUrl + allData[0].filePath;
      //var  image = await this.imageUrlToBase64(url);
      //var image1 = await this.toDataURL(url);
      let myLogoImage = workbook.addImage({
        base64: allData[0].imageBase64,
        extension: 'jpeg',
      });

      //worksheet.mergeCells("T2:V8");
      if (partList.length > 1) {
        worksheet.addImage(myLogoImage, 'T2:V7');
      }
      else {
        worksheet.addImage(myLogoImage, 'K2:M7');
      }
    }

    let style = worksheet.getCell("A2");
    style.value = "Style ";
    style.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    };
    style.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    style.alignment = { vertical: "middle", horizontal: "left" };


    let styleName = worksheet.getCell("B2");
    styleName.value = partList[0].styleName;
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
      right: { style: 'thin' }
    }
    styleName.alignment = { vertical: "middle", horizontal: "left" };

    let part = worksheet.getCell("A3");
    part.value = "Part Name ";
    part.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    };
    part.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    part.alignment = { vertical: "middle", horizontal: "left" };


    let partName = worksheet.getCell("B3");
    partName.value = partList[0].partName;
    partName.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    };
    partName.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    partName.alignment = { vertical: "middle", horizontal: "left" };

    let season = worksheet.getCell("A4");
    season.value = "Season";
    season.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    };
    season.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    season.alignment = { vertical: "middle", horizontal: "left" };


    let seasonName = worksheet.getCell("B4");
    seasonName.value = partList[0].seasonYear;
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
      right: { style: 'thin' }
    }
    seasonName.alignment = { vertical: "middle", horizontal: "left" };

    let option = worksheet.getCell("C2");
    option.value = "Option ";
    option.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    };
    option.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    option.alignment = { vertical: "middle", horizontal: "left" };


    let optionName = worksheet.getCell("D2");
    optionName.value = partList[0].costOption;
    optionName.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    };
    optionName.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    optionName.alignment = { vertical: "middle", horizontal: "left" };




    var fabricData1 = allData.filter(x => x.costCategoryGroup == "FABRICS" && x.stylePartId == partList[0].stylePartId);

    var dataForFabric1 = [];
    var dataForExcelFabric1 = [];
    for (var itemFab of fabricData1) {
      var objFabric1 = {
        item: itemFab.itemName,
        itemDescription: itemFab.itemDescription,
        supplierName: itemFab.supplierDescription,
        qtyDz: (itemFab.consumption + (itemFab.wastagePercentage / 100)) * 12,
        unit: itemFab.unitName,
        unitPrice: itemFab.rate,
        totalPrice: itemFab.totalPrice,
        remarks: itemFab.remarks,
        consumption: itemFab.consumption,
        wastagePercentage: itemFab.wastagePercentage,
        marketRelation: itemFab.marketRelation,

      };
      dataForFabric1.push(objFabric1);
    }
    //var qtyDz22 = (main.Consumption + (main.Consumption * (main.WastagePercentage / 100))) * 12;
    dataForFabric1.forEach((row: any) => {
      dataForExcelFabric1.push(Object.values(row));
    });


    worksheet.addRow([]);
    worksheet.addRow([]);
    //let dataTypeFabCell1 = "A" + 6;
    ////let dataTypeFabCell1sl = "A" + 7;
    //let dataTypeFabCell1Item = "B" + 7;
    //worksheet.getCell(dataTypeFabCell1).value = "FABRICS";

    debugger
    let headerRowFabcric1 = worksheet.addRow(stockHeaderFabric);
    headerRowFabcric1.eachCell((cell, number) => {
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
      cell.alignment = { vertical: "middle", horizontal: "center" };

    });

    //worksheet.getCell(dataTypeFabCell1sl).alignment = { vertical: "middle", horizontal: "center" };
    //worksheet.getCell(dataTypeFabCell1Item).alignment = { vertical: "middle", horizontal: "center" };




    var c = 0
    var fabricFastRow = 7 + c + 1;
    var fabricLastRow = 0
    for (var itemFab of dataForExcelFabric1) {
      var costrowCountitemFeb = 7 + c + 1;
      let itemCell = "B" + costrowCountitemFeb;// row.getCell(1).address;
      worksheet.getCell(itemCell).value = itemFab[0];
      worksheet.getCell(itemCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let itemDescriptionCellFab = "C" + costrowCountitemFeb;//  row.getCell(2).address;
      worksheet.getCell(itemDescriptionCellFab).value = itemFab[1];
      worksheet.getCell(itemDescriptionCellFab).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let supplierNameCellFab = "D" + costrowCountitemFeb;// row.getCell(3).address;
      worksheet.getCell(supplierNameCellFab).value = itemFab[2];
      worksheet.getCell(supplierNameCellFab).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let qtyDzCellFab = "E" + costrowCountitemFeb; //row.getCell(4).address;
      worksheet.getCell(qtyDzCellFab).value = itemFab[3];
      worksheet.getCell(qtyDzCellFab).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(qtyDzCellFab).value = {
        formula: `(${itemFab[8]}+(${itemFab[8]}*(${itemFab[9]}/100)))*12`,
        date1904: false
      }

      let unitCellFab = "F" + costrowCountitemFeb; //row.getCell(5).address;
      worksheet.getCell(unitCellFab).value = itemFab[4];
      worksheet.getCell(unitCellFab).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let unitPriceCellFab = "G" + costrowCountitemFeb; //row.getCell(5).address;
      worksheet.getCell(unitPriceCellFab).value = itemFab[5];
      worksheet.getCell(unitPriceCellFab).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let totalPriceCellFab = "H" + costrowCountitemFeb; //row.getCell(5).address;
      worksheet.getCell(totalPriceCellFab).value = itemFab[6];
      worksheet.getCell(totalPriceCellFab).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(totalPriceCellFab).value = {
        formula: `(E${costrowCountitemFeb}*G${costrowCountitemFeb})`,
        date1904: false
      }

      let remarksCellFab = "I" + costrowCountitemFeb; //row.getCell(5).address;
      worksheet.getCell(remarksCellFab).value = itemFab[7];
      worksheet.getCell(remarksCellFab).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let slCellFab = "A" + costrowCountitemFeb; //row.getCell(5).address;
      worksheet.getCell(slCellFab).value = c + 1;
      worksheet.getCell(slCellFab).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(slCellFab).alignment = { vertical: "middle", horizontal: "center" };


      fabricLastRow = costrowCountitemFeb;
      c++
    }


    // worksheet.addRow([]);
    // var valFabric1 = 8 + c;
    // let toalalFabricpriceAscCellQ1 = "G" + valFabric1;
    // worksheet.getCell(toalalFabricpriceAscCellQ1).value = "Total Value";
    // worksheet.getCell(toalalFabricpriceAscCellQ1).border = {
    //   top: { style: 'thin' },
    //   bottom: { style: 'thin' },
    //   left: { style: 'thin' },
    //   right: { style: 'thin' }
    // }
    // worksheet.getCell(toalalFabricpriceAscCellQ1).font = {
    //   name: "Calibri",
    //   size: 12,
    //   bold: true,
    //   color: { argb: "#ffff00" },
    // }

    // let toalalFabricpriceAscCell1 = "H" + valFabric1;
    // worksheet.getCell(toalalFabricpriceAscCell1).value = 0;
    // if (dataForExcelFabric1.length > 0) {
    //   worksheet.getCell(toalalFabricpriceAscCell1).value = {
    //     formula: `SUM(H${fabricFastRow}:H${fabricLastRow})`,
    //     date1904: false
    //   };
    // }

    // worksheet.getCell(toalalFabricpriceAscCell1).border = {
    //   top: { style: 'thin' },
    //   bottom: { style: 'thin' },
    //   left: { style: 'thin' },
    //   right: { style: 'thin' }
    // }

    // worksheet.getCell(toalalFabricpriceAscCell1).font = {
    //   name: "Calibri",
    //   size: 12,
    //   bold: true,
    //   color: { argb: "#ffff00" },
    // }

    // var val = 8 + c + 1;
    // let dataTypeAscCell1 = "A" + val;
    // worksheet.getCell(dataTypeAscCell1).value = "ACCESSORIES";

    var accessoriesData1 = allData.filter(x => x.costCategoryGroup == "ACCESSORIES" && x.stylePartId == partList[0].stylePartId);

    var dataForAccessories1 = [];
    var dataForExcelAccessories1 = [];
    for (var itemAsc1 of accessoriesData1) {
      var objAccessories1 = {
        item: itemAsc1.itemName,
        itemDescription: itemAsc1.itemDescription,
        supplierName: itemAsc1.supplierDescription,
        qtyDz: itemAsc1.consumption * 12,
        unit: itemAsc1.unitName,
        unitPrice: itemAsc1.rate,
        totalPrice: itemAsc1.totalPrice,
        remarks: itemAsc1.remarks,
        consumption: itemAsc1.consumption,
        wastagePercentage: itemAsc1.wastagePercentage,
        marketRelation: itemAsc1.marketRelation,
        finCostPc: itemAsc1.finCostPc
      };
      dataForAccessories1.push(objAccessories1);
    }

    dataForAccessories1.forEach((row: any) => {
      dataForExcelAccessories1.push(Object.values(row));
    });


    var rowCountAccessories1 = 0
    var accessoriesFastRow = rowCountAccessories1 + 8 + c;
    var accessoriesLastRow = 0
    for (var itemAcs1 of dataForExcelAccessories1) {
      var costrowCountAccessories1 = rowCountAccessories1 + 8 + c;
      let itemCell = "B" + costrowCountAccessories1;// row.getCell(1).address;
      worksheet.getCell(itemCell).value = itemAcs1[0];
      worksheet.getCell(itemCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let itemDescriptionCellAcs1 = "C" + costrowCountAccessories1;//  row.getCell(2).address;
      worksheet.getCell(itemDescriptionCellAcs1).value = itemAcs1[1];
      worksheet.getCell(itemDescriptionCellAcs1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let supplierNameCellAcs1 = "D" + costrowCountAccessories1;// row.getCell(3).address;
      worksheet.getCell(supplierNameCellAcs1).value = itemAcs1[2];
      worksheet.getCell(supplierNameCellAcs1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let qtyDzCellAcs1 = "E" + costrowCountAccessories1; //row.getCell(4).address;
      worksheet.getCell(qtyDzCellAcs1).value = itemAcs1[3];
      worksheet.getCell(qtyDzCellAcs1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      // worksheet.getCell(qtyDzCellAcs1).value = {
      //   formula: `(${itemAcs1[8]})*12`,
      //   date1904: false
      // }

      //new code 
      worksheet.getCell(qtyDzCellAcs1).value = {
        formula: `(${itemAcs1[8]}+(${itemAcs1[8]}*(${itemAcs1[9]}/100)))*12`,
        date1904: false
      }

      let unitCellAcs1 = "F" + costrowCountAccessories1; //row.getCell(5).address;
      worksheet.getCell(unitCellAcs1).value = itemAcs1[4];
      worksheet.getCell(unitCellAcs1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let unitPriceCellAcs1 = "G" + costrowCountAccessories1; //row.getCell(5).address;
      worksheet.getCell(unitPriceCellAcs1).value = itemAcs1[5];
      worksheet.getCell(unitPriceCellAcs1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let totalPriceCellAcs1 = "H" + costrowCountAccessories1; //row.getCell(5).address;
      worksheet.getCell(totalPriceCellAcs1).value = itemAcs1[6];
      worksheet.getCell(totalPriceCellAcs1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      var flAcs1 = "";
      var finalFLAcs1 = "";
      //var qtyDzTempAcs1 = `((E${costrowCountAccessories1} + ( E${costrowCountAccessories1} *(${itemAcs1[9]}%)))/${itemAcs1[10]})*G${costrowCountAccessories1}`;
      var qtyDzTempAcs1 = `(E${costrowCountAccessories1}/${itemAcs1[10]})*G${costrowCountAccessories1}`;
      
      if (itemAcs1[10] == 1) {

        flAcs1 = `(${qtyDzTempAcs1}  + ${qtyDzTempAcs1}*(${itemAcs1[11]}/100))`;

      }
      else {
        flAcs1 = `(${qtyDzTempAcs1} +${itemAcs1[11]})`;
      }

      if (itemAcs1[0] == "CMQ") {
        finalFLAcs1 = `(E${costrowCountAccessories1}*H${costrowCountAccessories1})/12`;

      }
      else {
        finalFLAcs1 = flAcs1;
      }
      worksheet.getCell(totalPriceCellAcs1).value = {
        formula: finalFLAcs1,
        date1904: false
      }


      let remarksCellAcs1 = "I" + costrowCountAccessories1; //row.getCell(5).address;
      worksheet.getCell(remarksCellAcs1).value = itemAcs1[7];
      worksheet.getCell(remarksCellAcs1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let slCellAcs1 = "A" + costrowCountAccessories1; //row.getCell(5).address;
      worksheet.getCell(slCellAcs1).value = c + rowCountAccessories1 + 1;
      worksheet.getCell(slCellAcs1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(slCellAcs1).alignment = { vertical: "middle", horizontal: "center" };

      accessoriesLastRow = costrowCountAccessories1;
      rowCountAccessories1++
    }


    // worksheet.addRow([]);
    // var valAccessories1 = 8 + c + rowCountAccessories1 + 2;
    // let toalalAccessoriesPriceAscCellQ1 = "G" + valAccessories1;
    // worksheet.getCell(toalalAccessoriesPriceAscCellQ1).value = "Total Value";
    // worksheet.getCell(toalalAccessoriesPriceAscCellQ1).border = {
    //   top: { style: 'thin' },
    //   bottom: { style: 'thin' },
    //   left: { style: 'thin' },
    //   right: { style: 'thin' }
    // }
    // worksheet.getCell(toalalAccessoriesPriceAscCellQ1).font = {
    //   name: "Calibri",
    //   size: 12,
    //   bold: true,
    //   color: { argb: "#ffff00" },
    // }

    // let toalalAccessoriesPriceAscCell1 = "H" + valAccessories1;
    // worksheet.getCell(toalalAccessoriesPriceAscCell1).value = 0
    // if (dataForExcelAccessories1.length > 0) {
    //   worksheet.getCell(toalalAccessoriesPriceAscCell1).value = {
    //     formula: `SUM(H${accessoriesFastRow}:H${accessoriesLastRow})`,
    //     date1904: false
    //   };
    // }

    // worksheet.getCell(toalalAccessoriesPriceAscCell1).border = {
    //   top: { style: 'thin' },
    //   bottom: { style: 'thin' },
    //   left: { style: 'thin' },
    //   right: { style: 'thin' }
    // }
    // worksheet.getCell(toalalAccessoriesPriceAscCell1).font = {
    //   name: "Calibri",
    //   size: 12,
    //   bold: true,
    //   color: { argb: "#ffff00" },
    // }

    // var val = 8 + c + rowCountAccessories1 + 2 + 1
    // let dataTypelableCell1 = "A" + val;
    // worksheet.getCell(dataTypelableCell1).value = "LABELS";

    var lableData1 = allData.filter(x => x.costCategoryGroup == "LABELS" && x.stylePartId == partList[0].stylePartId);

    var dataForLable1 = [];
    var dataForExcelLable1 = [];
    for (var itemLable1 of lableData1) {
      var objLable1 = {
        item: itemLable1.itemName,
        itemDescription: itemLable1.itemDescription,
        supplierName: itemLable1.supplierDescription,
        qtyDz: itemLable1.qtyDz,
        unit: itemLable1.unitName,
        unitPrice: itemLable1.rate,
        totalPrice: itemLable1.totalPrice,
        remarks: itemLable1.remarks,
        consumption: itemLable1.consumption,
        wastagePercentage: itemLable1.wastagePercentage,
        marketRelation: itemLable1.marketRelation,
        finCostPc: itemLable1.finCostPc
      };
      dataForLable1.push(objLable1);
    }

    dataForLable1.forEach((row: any) => {
      dataForExcelLable1.push(Object.values(row));
    });


    var rowCountLable1 = 0
    var lableFastRow = rowCountLable1 + 8 + c + rowCountAccessories1;
    var lableLastRow = 0
    for (var itemLable1 of dataForExcelLable1) {
      var costrowCountLable1 = rowCountLable1 + 8 + c + rowCountAccessories1;
      let itemCellLable1 = "B" + costrowCountLable1;// row.getCell(1).address;
      worksheet.getCell(itemCellLable1).value = itemLable1[0];
      worksheet.getCell(itemCellLable1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let itemDescriptionCellLable1 = "C" + costrowCountLable1;//  row.getCell(2).address;
      worksheet.getCell(itemDescriptionCellLable1).value = itemLable1[1];
      worksheet.getCell(itemDescriptionCellLable1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let supplierNameCellLable1 = "D" + costrowCountLable1;// row.getCell(3).address;
      worksheet.getCell(supplierNameCellLable1).value = itemLable1[2];
      worksheet.getCell(supplierNameCellLable1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let qtyDzCellLable1 = "E" + costrowCountLable1; //row.getCell(4).address;
      worksheet.getCell(qtyDzCellLable1).value = itemLable1[3];
      worksheet.getCell(qtyDzCellLable1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      // worksheet.getCell(qtyDzCellLable1).value = {
      //   formula: `${itemLable1[8]}*12`,
      //   date1904: false
      // }
      worksheet.getCell(qtyDzCellLable1).value = {
        formula: `(${itemLable1[8]}+(${itemLable1[8]}*(${itemLable1[9]}/100)))*12`,
        date1904: false
      }

      let unitCellLable1 = "F" + costrowCountLable1; //row.getCell(5).address;
      worksheet.getCell(unitCellLable1).value = itemLable1[4];
      worksheet.getCell(unitCellLable1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let unitPriceCellLable1 = "G" + costrowCountLable1; //row.getCell(5).address;
      worksheet.getCell(unitPriceCellLable1).value = itemLable1[5];
      worksheet.getCell(unitPriceCellLable1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }



      let totalPriceCellLable1 = "H" + costrowCountLable1; //row.getCell(5).address;
      worksheet.getCell(totalPriceCellLable1).value = itemLable1[6];
      worksheet.getCell(totalPriceCellLable1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      var flLable1 = "";
      var finalFLLable1 = "";
      //var qtyDzTempLable1 = `((E${costrowCountLable1} + ( E${costrowCountLable1} *(${itemLable1[9]}%)))/${itemLable1[10]})*G${costrowCountLable1}`;
      var qtyDzTempLable1 = `(E${costrowCountLable1}/${itemLable1[10]})*G${costrowCountLable1}`;
      if (itemLable1[10] == 1) {

        flLable1 = `(${qtyDzTempLable1}  + ${qtyDzTempLable1}*(${itemLable1[11]}/100))`;

      }
      else {
        flLable1 = `(${qtyDzTempLable1} +${itemLable1[11]})`;
      }

      if (itemLable1[0] == "CMQ") {
        finalFLLable1 = `(E${costrowCountLable1}*H${costrowCountLable1})/12`;

      }
      else {
        finalFLLable1 = flLable1;
      }
      worksheet.getCell(totalPriceCellLable1).value = {
        formula: finalFLLable1,
        date1904: false
      }

      let remarksCellLable1 = "I" + costrowCountLable1; //row.getCell(5).address;
      worksheet.getCell(remarksCellLable1).value = itemLable1[7];
      worksheet.getCell(remarksCellLable1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let slCellLable1 = "A" + costrowCountLable1; //row.getCell(5).address;
      worksheet.getCell(slCellLable1).value = c + rowCountAccessories1 + rowCountLable1 + 1;
      worksheet.getCell(slCellLable1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(slCellLable1).alignment = { vertical: "middle", horizontal: "center" };

      lableLastRow = costrowCountLable1;
      rowCountLable1++
    }



    // worksheet.addRow([]);

    // var valLable1 = 8 + c + rowCountAccessories1 + rowCountLable1 + 2 + 2;
    // let toalalLablePriceAscCellQ1 = "G" + valLable1;
    // worksheet.getCell(toalalLablePriceAscCellQ1).value = "Total Value";
    // worksheet.getCell(toalalLablePriceAscCellQ1).border = {
    //   top: { style: 'thin' },
    //   bottom: { style: 'thin' },
    //   left: { style: 'thin' },
    //   right: { style: 'thin' }
    // }
    // worksheet.getCell(toalalLablePriceAscCellQ1).font = {
    //   name: "Calibri",
    //   size: 12,
    //   bold: true,
    //   color: { argb: "#ffff00" },
    // }

    // let toalalLablePriceAscCell1 = "H" + valLable1;
    // worksheet.getCell(toalalLablePriceAscCell1).value = 0;
    // if (dataForExcelLable1.length > 0) {
    //   worksheet.getCell(toalalLablePriceAscCell1).value = {
    //     formula: `SUM(H${lableFastRow}:H${lableLastRow})`,
    //     date1904: false
    //   };
    // }
    // worksheet.getCell(toalalLablePriceAscCell1).border = {
    //   top: { style: 'thin' },
    //   bottom: { style: 'thin' },
    //   left: { style: 'thin' },
    //   right: { style: 'thin' }
    // }
    // worksheet.getCell(toalalLablePriceAscCell1).font = {
    //   name: "Calibri",
    //   size: 12,
    //   bold: true,
    //   color: { argb: "#ffff00" },
    // }

    // var val = 8 + c + rowCountAccessories1 + rowCountLable1 + 2 + 2 + 1
    // let dataTypePakingCell1 = "A" + val;
    // worksheet.getCell(dataTypePakingCell1).value = "PACKING";

    var packgingData1 = allData.filter(x => x.costCategoryGroup == "PACKING" && x.stylePartId == partList[0].stylePartId);

    var dataForPackging1 = [];
    var dataForExcelPackging1 = [];
    for (var itemPackging1 of packgingData1) {
      var objPackging1 = {
        item: itemPackging1.itemName,
        itemDescription: itemPackging1.itemDescription,
        supplierName: itemPackging1.supplierDescription,
        qtyDz: itemPackging1.qtyDz,
        unit: itemPackging1.unitName,
        unitPrice: itemPackging1.rate,
        totalPrice: itemPackging1.totalPrice,
        remarks: itemPackging1.remarks,
        consumption: itemPackging1.consumption,
        wastagePercentage: itemPackging1.wastagePercentage,
        marketRelation: itemPackging1.marketRelation,
        finCostPc: itemPackging1.finCostPc
      };
      dataForPackging1.push(objPackging1);
    }

    dataForPackging1.forEach((row: any) => {
      dataForExcelPackging1.push(Object.values(row));
    });


    var rowCountPackging1 = 0
    var pakingFastRow = rowCountPackging1 + 8 + c + rowCountAccessories1 + rowCountLable1;
    var pakingLastRow = 0
    for (var itemPackging1 of dataForExcelPackging1) {
      var costrowCountPackging1 = rowCountPackging1 + 8 + c + rowCountAccessories1 + rowCountLable1;
      let itemCellPackging1 = "B" + costrowCountPackging1;// row.getCell(1).address;
      worksheet.getCell(itemCellPackging1).value = itemPackging1[0];
      worksheet.getCell(itemCellPackging1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let itemDescriptionCellPackging1 = "C" + costrowCountPackging1;//  row.getCell(2).address;
      worksheet.getCell(itemDescriptionCellPackging1).value = itemPackging1[1];
      worksheet.getCell(itemDescriptionCellPackging1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let supplierNameCellPackging1 = "D" + costrowCountPackging1;// row.getCell(3).address;
      worksheet.getCell(supplierNameCellPackging1).value = itemPackging1[2];
      worksheet.getCell(supplierNameCellPackging1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let qtyDzCellPackging1 = "E" + costrowCountPackging1; //row.getCell(4).address;
      worksheet.getCell(qtyDzCellPackging1).value = itemPackging1[3];
      worksheet.getCell(qtyDzCellPackging1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      // worksheet.getCell(qtyDzCellPackging1).value = {
      //   formula: `${itemPackging1[8]}*12`,
      //   date1904: false
      // }
      //new code 
      worksheet.getCell(qtyDzCellPackging1).value = {
        formula: `(${itemPackging1[8]}+(${itemPackging1[8]}*(${itemPackging1[9]}/100)))*12`,
        date1904: false
      }

      let unitCellPackging1 = "F" + costrowCountPackging1; //row.getCell(5).address;
      worksheet.getCell(unitCellPackging1).value = itemPackging1[4];
      worksheet.getCell(unitCellPackging1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let unitPriceCellPackging1 = "G" + costrowCountPackging1; //row.getCell(5).address;
      worksheet.getCell(unitPriceCellPackging1).value = itemPackging1[5];
      worksheet.getCell(unitPriceCellPackging1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let totalPriceCellPackging1 = "H" + costrowCountPackging1; //row.getCell(5).address;
      worksheet.getCell(totalPriceCellPackging1).value = itemPackging1[6];
      worksheet.getCell(totalPriceCellPackging1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      var flPackging1 = "";
      var finalFLPackging1 = "";
      //var qtyDzTempPackging1 = `((E${costrowCountPackging1} + ( E${costrowCountPackging1} *(${itemPackging1[9]}%)))/${itemPackging1[10]})*G${costrowCountPackging1}`;
      var qtyDzTempPackging1 = `(E${costrowCountPackging1}/${itemPackging1[10]})*G${costrowCountPackging1}`;
      if (itemPackging1[10] == 1) {

        flPackging1 = `(${qtyDzTempPackging1}  + ${qtyDzTempPackging1}*(${itemPackging1[11]}/100))`;

      }
      else {
        flPackging1 = `(${qtyDzTempPackging1} +${itemPackging1[11]})`;
      }

      if (itemPackging1[0] == "CMQ") {
        finalFLPackging1 = `(E${costrowCountPackging1}*H${costrowCountPackging1})/12`;

      }
      else {
        finalFLPackging1 = flPackging1;
      }
      worksheet.getCell(totalPriceCellPackging1).value = {
        formula: finalFLPackging1,
        date1904: false
      }

      let remarksCellPackging1 = "I" + costrowCountPackging1; //row.getCell(5).address;
      worksheet.getCell(remarksCellPackging1).value = itemPackging1[7];
      worksheet.getCell(remarksCellPackging1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let slCellPackging1 = "A" + costrowCountPackging1; //row.getCell(5).address;
      worksheet.getCell(slCellPackging1).value = c + rowCountAccessories1 + rowCountLable1 + rowCountPackging1 + 1;
      worksheet.getCell(slCellPackging1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(slCellPackging1).alignment = { vertical: "middle", horizontal: "center" };

      pakingLastRow = costrowCountPackging1;
      rowCountPackging1++
    }


    // worksheet.addRow([]);

    // var valPaking1 = 8 + c + rowCountAccessories1 + rowCountLable1 + rowCountPackging1 + 2 + 2 + 2;
    // let toalalPakingPriceCellQ1 = "G" + valPaking1;
    // worksheet.getCell(toalalPakingPriceCellQ1).value = "Total Value";
    // worksheet.getCell(toalalPakingPriceCellQ1).border = {
    //   top: { style: 'thin' },
    //   bottom: { style: 'thin' },
    //   left: { style: 'thin' },
    //   right: { style: 'thin' }
    // }
    // worksheet.getCell(toalalPakingPriceCellQ1).font = {
    //   name: "Calibri",
    //   size: 12,
    //   bold: true,
    //   color: { argb: "#ffff00" },
    // }

    // let toalalPakingPriceAscCell1 = "H" + valPaking1;
    // worksheet.getCell(toalalPakingPriceAscCell1).value = 0;
    // if (dataForExcelPackging1.length > 0) {
    //   worksheet.getCell(toalalPakingPriceAscCell1).value = {
    //     formula: `SUM(H${pakingFastRow}:H${pakingLastRow})`,
    //     date1904: false
    //   };
    // }
    // worksheet.getCell(toalalPakingPriceAscCell1).border = {
    //   top: { style: 'thin' },
    //   bottom: { style: 'thin' },
    //   left: { style: 'thin' },
    //   right: { style: 'thin' }
    // }
    // worksheet.getCell(toalalPakingPriceAscCell1).font = {
    //   name: "Calibri",
    //   size: 12,
    //   bold: true,
    //   color: { argb: "#ffff00" },
    // }

    // var val = 8 + c + rowCountAccessories1 + rowCountLable1 + rowCountPackging1 + 2 + 2 + 2 + 1
    // let dataTypeProcessCell1 = "A" + val;
    // worksheet.getCell(dataTypeProcessCell1).value = "PROCESS";




    /////--------process----------------/////

    var processData1 = allData.filter(x => x.costCategoryGroup == "PROCESS" && x.stylePartId == partList[0].stylePartId);

    var dataForProcesss1 = [];
    var dataForExcelProcesss1 = [];
    for (var itemProcesss1 of processData1) {
      var objProcesss1 = {
        item: itemProcesss1.itemName,
        itemDescription: itemProcesss1.itemDescription,
        supplierName: itemProcesss1.supplierDescription,
        qtyDz: itemProcesss1.qtyDz,
        unit: itemProcesss1.unitName,
        unitPrice: itemProcesss1.rate,
        totalPrice: itemProcesss1.totalPrice,
        remarks: itemProcesss1.remarks,
        consumption: itemProcesss1.consumption,
        wastagePercentage: itemProcesss1.wastagePercentage,
        marketRelation: itemProcesss1.marketRelation,
        finCostPc: itemProcesss1.finCostPc,

      };
      dataForProcesss1.push(objProcesss1);
    }

    dataForProcesss1.forEach((row: any) => {
      dataForExcelProcesss1.push(Object.values(row));
    });


    var rowCountProcesss1 = 0
    var processFastRow = rowCountProcesss1 + 8 + c + rowCountAccessories1 + rowCountLable1 + rowCountPackging1;
    var processLastRow = 0
    for (var itemProcesss1 of dataForExcelProcesss1) {
      var costrowCountProcesss1 = rowCountProcesss1 + 8 + c + rowCountAccessories1 + rowCountLable1 + rowCountPackging1;
      let itemCellProcesss1 = "B" + costrowCountProcesss1;// row.getCell(1).address;
      worksheet.getCell(itemCellProcesss1).value = itemProcesss1[0];
      worksheet.getCell(itemCellProcesss1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let itemDescriptionCellProcesss1 = "C" + costrowCountProcesss1;//  row.getCell(2).address;
      worksheet.getCell(itemDescriptionCellProcesss1).value = itemProcesss1[1];
      worksheet.getCell(itemDescriptionCellProcesss1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let supplierNameCellProcesss1 = "D" + costrowCountProcesss1;// row.getCell(3).address;
      worksheet.getCell(supplierNameCellProcesss1).value = itemProcesss1[2];
      worksheet.getCell(supplierNameCellProcesss1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let qtyDzCellProcesss1 = "E" + costrowCountProcesss1; //row.getCell(4).address;
      worksheet.getCell(qtyDzCellProcesss1).value = itemProcesss1[3];
      worksheet.getCell(qtyDzCellProcesss1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      // worksheet.getCell(qtyDzCellProcesss1).value = {
      //   formula: `${itemProcesss1[8]}*12`,
      //   date1904: false
      // }

      worksheet.getCell(qtyDzCellProcesss1).value = {
        formula: `(${itemProcesss1[8]}+(${itemProcesss1[8]}*(${itemProcesss1[9]}/100)))*12`,
        date1904: false
      }

      let unitCellProcesss1 = "F" + costrowCountProcesss1; //row.getCell(5).address;
      worksheet.getCell(unitCellProcesss1).value = itemProcesss1[4];
      worksheet.getCell(unitCellProcesss1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let unitPriceCellProcesss1 = "G" + costrowCountProcesss1; //row.getCell(5).address;
      worksheet.getCell(unitPriceCellProcesss1).value = itemProcesss1[5];
      worksheet.getCell(unitPriceCellProcesss1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let totalPriceCellProcesss1 = "H" + costrowCountProcesss1; //row.getCell(5).address;
      worksheet.getCell(totalPriceCellProcesss1).value = itemProcesss1[6];
      worksheet.getCell(totalPriceCellProcesss1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      var flProcesss1 = "";
      var finalFLProcesss1 = "";
      //var qtyDzTempProcesss1 = `((E${costrowCountProcesss1} + ( E${costrowCountProcesss1} *(${itemProcesss1[9]}%)))/${itemProcesss1[10]})*G${costrowCountProcesss1}`;
      var qtyDzTempProcesss1 = `(E${costrowCountProcesss1}/${itemProcesss1[10]})*G${costrowCountProcesss1}`;
      if (itemProcesss1[10] == 1) {

        flProcesss1 = `(${qtyDzTempProcesss1}  + ${qtyDzTempProcesss1}*(${itemProcesss1[11]}/100))`;

      }
      else {
        flProcesss1 = `(${qtyDzTempProcesss1} +${itemProcesss1[11]})`;
      }

      if (itemProcesss1[0] == "CMQ") {
        finalFLProcesss1 = `(E${costrowCountProcesss1}*H${costrowCountProcesss1})/12`;

      }
      else {
        finalFLProcesss1 = flProcesss1;
      }
      worksheet.getCell(totalPriceCellProcesss1).value = {
        formula: finalFLProcesss1,
        date1904: false
      }

      let remarksCellProcesss1 = "I" + costrowCountProcesss1; //row.getCell(5).address;
      worksheet.getCell(remarksCellProcesss1).value = itemProcesss1[7];
      worksheet.getCell(remarksCellProcesss1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let slCellProcesss1 = "A" + costrowCountProcesss1; //row.getCell(5).address;
      worksheet.getCell(slCellProcesss1).value = c + rowCountAccessories1 + rowCountLable1 + rowCountPackging1 + rowCountProcesss1 + 1;
      worksheet.getCell(slCellProcesss1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(slCellProcesss1).alignment = { vertical: "middle", horizontal: "center" };

      processLastRow = costrowCountProcesss1;
      rowCountProcesss1++
    }



    // worksheet.addRow([]);

    // var valProcesss1 = 8 + c + rowCountAccessories1 + rowCountLable1 + rowCountPackging1 + rowCountProcesss1 + 2 + 2 + 2 + 2;
    // let totalProcesssPriceCellQ1 = "G" + valProcesss1;
    // worksheet.getCell(totalProcesssPriceCellQ1).value = "Total Value";
    // worksheet.getCell(totalProcesssPriceCellQ1).border = {
    //   top: { style: 'thin' },
    //   bottom: { style: 'thin' },
    //   left: { style: 'thin' },
    //   right: { style: 'thin' }
    // }
    // worksheet.getCell(totalProcesssPriceCellQ1).font = {
    //   name: "Calibri",
    //   size: 12,
    //   bold: true,
    //   color: { argb: "#ffff00" },
    // }

    // let totalProcesssPriceCell1 = "H" + valProcesss1;
    // worksheet.getCell(totalProcesssPriceCell1).value = 0;
    // if (dataForExcelProcesss1.length > 0) {
    //   worksheet.getCell(totalProcesssPriceCell1).value = {
    //     formula: `SUM(H${processFastRow}:H${processLastRow})`,
    //     date1904: false
    //   };
    // }
    // worksheet.getCell(totalProcesssPriceCell1).border = {
    //   top: { style: 'thin' },
    //   bottom: { style: 'thin' },
    //   left: { style: 'thin' },
    //   right: { style: 'thin' }
    // }
    // worksheet.getCell(totalProcesssPriceCell1).font = {
    //   name: "Calibri",
    //   size: 12,
    //   bold: true,
    //   color: { argb: "#ffff00" },
    // }

    var cmqData1 = allData.filter(x => x.itemName == "CMQ" && x.stylePartId == partList[0].stylePartId);

    var dataForCMQ1 = [];
    var dataForExcelCMQ1 = [];
    for (var itemCMQ1 of cmqData1) {
      var objCMQ1 = {
        item: itemCMQ1.itemName,
        itemDescription: itemCMQ1.itemDescription,
        supplierName: itemCMQ1.supplierDescription,
        qtyDz: itemCMQ1.qtyDz,
        unit: itemCMQ1.unitName,
        unitPrice: itemCMQ1.unitPrice,
        totalPrice: itemCMQ1.totalPrice,
        remarks: itemCMQ1.remarks,
        consumption: itemCMQ1.consumption,
        wastagePercentage: itemCMQ1.wastagePercentage,
        marketRelation: itemCMQ1.marketRelation,
        finCostPc: itemCMQ1.finCostPc,
        cmPc: itemCMQ1.cmPc
      };
      dataForCMQ1.push(objCMQ1);
    }

    dataForCMQ1.forEach((row: any) => {
      dataForExcelCMQ1.push(Object.values(row));
    });



    var rowCountCMQ1 = 0
    var cmqFastRow = rowCountCMQ1 + 8 + c + rowCountAccessories1 + rowCountLable1 + rowCountPackging1 + rowCountProcesss1 ;
    var cmqLastRow = 0
    for (var itemCMQ1 of dataForExcelCMQ1) {
      var costrowCountCMQ1 = rowCountCMQ1 + 8 + c + rowCountAccessories1 + rowCountLable1 + rowCountPackging1 + rowCountProcesss1;
      let itemCellCMQ1 = "B" + costrowCountCMQ1;// row.getCell(1).address;
      worksheet.getCell(itemCellCMQ1).value = itemCMQ1[0];
      worksheet.getCell(itemCellCMQ1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let itemDescriptionCellCMQ1 = "C" + costrowCountCMQ1;//  row.getCell(2).address;
      worksheet.getCell(itemDescriptionCellCMQ1).value = itemCMQ1[1];
      worksheet.getCell(itemDescriptionCellCMQ1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let supplierNameCellCMQ1 = "D" + costrowCountCMQ1;// row.getCell(3).address;
      //worksheet.getCell(supplierNameCellCMQ1).value = itemCMQ1[2];
      worksheet.getCell(supplierNameCellCMQ1).value = "COST FOR MANUFACTURING";

      worksheet.getCell(supplierNameCellCMQ1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let qtyDzCellCMQ1 = "E" + costrowCountCMQ1; //row.getCell(4).address;
      worksheet.getCell(qtyDzCellCMQ1).value = itemCMQ1[3];
      worksheet.getCell(qtyDzCellCMQ1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(qtyDzCellCMQ1).value = {
        formula: `${itemCMQ1[3]}`,
        date1904: false
      }

      let unitCellCMQ1 = "F" + costrowCountCMQ1; //row.getCell(5).address;
      worksheet.getCell(unitCellCMQ1).value = itemCMQ1[4];
      worksheet.getCell(unitCellCMQ1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let unitPriceCellMQ1 = "G" + costrowCountCMQ1; //row.getCell(5).address;
      worksheet.getCell(unitPriceCellMQ1).value = itemCMQ1[5];
      worksheet.getCell(unitPriceCellMQ1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(unitPriceCellMQ1).value = {
        formula: `(((${itemCMQ1[12]} *12) * 12)/ 12)`,
        date1904: false
      }

      let totalPriceCellCMQ1 = "H" + costrowCountCMQ1; //row.getCell(5).address;
      worksheet.getCell(totalPriceCellCMQ1).value = itemCMQ1[6];
      worksheet.getCell(totalPriceCellCMQ1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(totalPriceCellCMQ1).value = {
        formula: `(E${costrowCountCMQ1}*G${costrowCountCMQ1})/12`,
        date1904: false
      }

      let remarksCellCMQ1 = "I" + costrowCountCMQ1; //row.getCell(5).address;
      worksheet.getCell(remarksCellCMQ1).value = itemCMQ1[7];
      worksheet.getCell(remarksCellCMQ1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let slCellCMQ1 = "A" + costrowCountCMQ1; //row.getCell(5).address;
      worksheet.getCell(slCellCMQ1).value = c + rowCountAccessories1 + rowCountLable1 + rowCountPackging1 + rowCountProcesss1+ cmqLastRow + 1;
      worksheet.getCell(slCellCMQ1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(slCellCMQ1).alignment = { vertical: "middle", horizontal: "center" };

      cmqLastRow = costrowCountCMQ1;
      rowCountCMQ1++
    }




    //worksheet.addRow([]);
    var valFinalTotal1 = cmqLastRow + 1;
    let FinalTotalCellQ1 = "G" + valFinalTotal1;
    worksheet.getCell(FinalTotalCellQ1).value = "Total ";
    worksheet.getCell(FinalTotalCellQ1).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell(FinalTotalCellQ1).font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    }

    let FinalTotalCell1 = "H" + valFinalTotal1;
    worksheet.getCell(FinalTotalCell1).value = {
      //formula:`0`,
      formula: `SUM(H${fabricFastRow}:H${cmqLastRow})`,
      date1904: false
    };
    worksheet.getCell(FinalTotalCell1).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell(FinalTotalCell1).font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    }

    let FinalTotalCell1Cal = "J" + valFinalTotal1;
    worksheet.getCell(FinalTotalCell1Cal).value = {
      formula: `H${valFinalTotal1}/12`,
      date1904: false
    };
    worksheet.getCell(FinalTotalCell1Cal).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell(FinalTotalCell1Cal).font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    }



    let cmqCalTotalCell1 = "J" + cmqLastRow;
    worksheet.getCell(cmqCalTotalCell1).value = {
      //formula: `J${valFinalTotal1}+J${cmqLastRow - 1}`,
      formula:`J${cmqLastRow+1}+(J${cmqLastRow+1}*${partList[0].buyingCommission}%)`,
      date1904: false
    };
    worksheet.getCell(cmqCalTotalCell1).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell(cmqCalTotalCell1).font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    }


    //  var valuePline1 = cmqLastRow-3
    var valuePline1 = cmqLastRow - 2
    let cmqCalTotalCell11 = "J" + valuePline1;
    worksheet.getCell(cmqCalTotalCell11).value = {
      //formula: `J${cmqLastRow}+(J${cmqLastRow}*${partList[0].buyingCommission}%)`,
      formula: `J${cmqLastRow}+J${cmqLastRow - 1}`,
      date1904: false
    };
    worksheet.getCell(cmqCalTotalCell11).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell(cmqCalTotalCell11).font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    }



    //var valueUperPline1 = cmqLastRow-5
    //var valueUperPline1 = cmqLastRow - 4
    var valueUperPline1 = cmqLastRow - 3
    let cmqCalTotalCell111 = "J" + valueUperPline1;
    worksheet.getCell(cmqCalTotalCell111).value = {
      // formula:`(I${cmqLastRow-4}-I${cmqLastRow+1})`,
      //formula: `(J${cmqLastRow - 3}-J${cmqLastRow + 1})`,
      formula: `(J${cmqLastRow - 2}-J${cmqLastRow + 1})`,
      date1904: false
    };
    worksheet.getCell(cmqCalTotalCell111).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell(cmqCalTotalCell111).font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    }







    ///---------------double part--------------///

    if (partList.length > 1) {
      let style2 = worksheet.getCell("K2");
      style2.value = "Style ";
      style2.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      style2.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      style2.alignment = { vertical: "middle", horizontal: "left" };


      let styleName2 = worksheet.getCell("L2");
      styleName2.value = partList[0].styleName;
      styleName2.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      styleName2.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      styleName2.alignment = { vertical: "middle", horizontal: "left" };

      let part2 = worksheet.getCell("K3");
      part2.value = "Part Name ";
      part2.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      part2.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      part2.alignment = { vertical: "middle", horizontal: "left" };


      let partName2 = worksheet.getCell("L3");
      partName2.value = partList[1].partName;
      partName2.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      partName2.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      partName2.alignment = { vertical: "middle", horizontal: "left" };


      let season2 = worksheet.getCell("K4");
      season2.value = "Season ";
      season2.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      season2.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      season2.alignment = { vertical: "middle", horizontal: "left" };


      let seasonName2 = worksheet.getCell("L4");
      seasonName2.value = partList[1].seasonYear;
      seasonName2.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      seasonName2.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      seasonName2.alignment = { vertical: "middle", horizontal: "left" };

      let option2 = worksheet.getCell("M2");
      option2.value = "Style ";
      option2.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      option2.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      option2.alignment = { vertical: "middle", horizontal: "left" };


      let optionName2 = worksheet.getCell("N2");
      optionName2.value = partList[0].costOption;
      optionName2.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      optionName2.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      optionName2.alignment = { vertical: "middle", horizontal: "left" };


      var fabricData2 = allData.filter(x => x.costCategoryGroup == "FABRICS" && x.stylePartId == partList[1].stylePartId);

      debugger
      var dataForFabric2 = [];
      var dataForExcelFabric2 = [];
      for (var itemFab of fabricData2) {
        var objFabric2 = {
          item: itemFab.itemName,
          itemDescription: itemFab.itemDescription,
          supplierName: itemFab.supplierDescription,
          qtyDz: (itemFab.consumption + (itemFab.wastagePercentage / 100)) * 12,
          unit: itemFab.unitName,
          unitPrice: itemFab.rate,
          totalPrice: itemFab.totalPrice,
          remarks: itemFab.remarks,
          consumption: itemFab.consumption,
          wastagePercentage: itemFab.wastagePercentage,
          marketRelation: itemFab.marketRelation,
          finCostPc: itemFab.finCostPc
        };
        dataForFabric2.push(objFabric2);
      }

      dataForFabric2.forEach((row: any) => {
        dataForExcelFabric2.push(Object.values(row));
      });

      //let dataTypeFabCell2 = "K" + 6;
      //worksheet.getCell(dataTypeFabCell2).value = "FABRICS";

      var costRowCount = 7;

      let f111 = worksheet.getCell("K" + costRowCount);
      f111.value = "SL";
      f111.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      f111.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      f111.alignment = { vertical: "middle", horizontal: "center" };

      let f1 = worksheet.getCell("L" + costRowCount);
      f1.value = "Item";
      f1.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      f1.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      f1.alignment = { vertical: "middle", horizontal: "center" };

      let f2 = worksheet.getCell("M" + costRowCount);
      f2.value = "Item Description";
      f2.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      f2.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      f2.alignment = { vertical: "middle", horizontal: "center" }

      let f3 = worksheet.getCell("N" + costRowCount);
      f3.value = "Supplier Name";
      f3.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      f3.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      f3.alignment = { vertical: "middle", horizontal: "center" }

      let f4 = worksheet.getCell("O" + costRowCount);
      f4.value = "Qty/Dz";
      f4.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      f4.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      f4.alignment = { vertical: "middle", horizontal: "center" }

      let f5 = worksheet.getCell("P" + costRowCount);
      f5.value = "Unit";
      f5.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      f5.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      f5.alignment = { vertical: "middle", horizontal: "center" }

      let f6 = worksheet.getCell("Q" + costRowCount);
      f6.value = "Unit Price";
      f6.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      f6.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      f6.alignment = { vertical: "middle", horizontal: "center" }

      let f7 = worksheet.getCell("R" + costRowCount);
      f7.value = "Total Price";
      f7.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      f7.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      f7.alignment = { vertical: "middle", horizontal: "center" }

      let f8 = worksheet.getCell("S" + costRowCount);
      f8.value = "Remarks";
      f8.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      f8.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      f8.alignment = { vertical: "middle", horizontal: "center" }


      var rowCount = 0
      var fabricFastRow2 = rowCount + 7 + 1;
      var fabricLastRow2 = 0
      for (var itemFab2 of dataForExcelFabric2) {
        var costRowCount2 = rowCount + 7 + 1;
        let itemCell = "L" + costRowCount2;// row.getCell(1).address;
        worksheet.getCell(itemCell).value = itemFab2[0];
        worksheet.getCell(itemCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let itemDescriptionCell = "M" + costRowCount2;//  row.getCell(2).address;
        worksheet.getCell(itemDescriptionCell).value = itemFab2[1];
        worksheet.getCell(itemDescriptionCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let supplierNameCell = "N" + costRowCount2;// row.getCell(3).address;
        worksheet.getCell(supplierNameCell).value = itemFab2[2];
        worksheet.getCell(supplierNameCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let qtyDzCell = "O" + costRowCount2; //row.getCell(4).address;
        worksheet.getCell(qtyDzCell).value = itemFab2[3];
        worksheet.getCell(qtyDzCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(qtyDzCell).value = {
          formula: `(${itemFab2[8]}+(${itemFab2[8]}*(${itemFab2[9]}/100)))*12`,
          date1904: false
        }

        let unitCell = "P" + costRowCount2; //row.getCell(5).address;
        worksheet.getCell(unitCell).value = itemFab2[4];
        worksheet.getCell(unitCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let unitPriceCell = "Q" + costRowCount2; //row.getCell(5).address;
        worksheet.getCell(unitPriceCell).value = itemFab2[5];
        worksheet.getCell(unitPriceCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let totalPriceCell = "R" + costRowCount2; //row.getCell(5).address;
        worksheet.getCell(totalPriceCell).value = itemFab2[6];
        worksheet.getCell(totalPriceCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(totalPriceCell).value = {
          formula: `(O${costRowCount2}*Q${costRowCount2})`,
          date1904: false
        }


        let remarksCell = "S" + costRowCount2; //row.getCell(5).address;
        worksheet.getCell(remarksCell).value = itemFab2[7];
        worksheet.getCell(remarksCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let slksCell2 = "K" + costRowCount2; //row.getCell(5).address;
        worksheet.getCell(slksCell2).value = rowCount + 1;
        worksheet.getCell(slksCell2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(slksCell2).alignment = { vertical: "middle", horizontal: "center" };




        fabricLastRow2 = costRowCount2;
        rowCount++
      }

      // worksheet.addRow([]);
      // var valFabric2 = 8 + rowCount;
      // let toalalFabricpriceAscCellQ2 = "Q" + valFabric2;
      // worksheet.getCell(toalalFabricpriceAscCellQ2).value = "Total Value";
      // worksheet.getCell(toalalFabricpriceAscCellQ2).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // }
      // worksheet.getCell(toalalFabricpriceAscCellQ2).font = {
      //   name: "Calibri",
      //   size: 12,
      //   bold: true,
      //   color: { argb: "#ffff00" },
      // }

      // let toalalFabricpriceAscCell2 = "R" + valFabric2;
      // worksheet.getCell(toalalFabricpriceAscCell2).value = 0;
      // if (dataForExcelFabric2.length > 0) {
      //   worksheet.getCell(toalalFabricpriceAscCell2).value = {
      //     formula: `SUM(R${fabricFastRow2}:R${fabricLastRow2})`,
      //     date1904: false
      //   };
      // }
      // worksheet.getCell(toalalFabricpriceAscCell2).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // }
      // worksheet.getCell(toalalFabricpriceAscCell2).font = {
      //   name: "Calibri",
      //   size: 12,
      //   bold: true,
      //   color: { argb: "#ffff00" },
      // }

      // var val = 8 + rowCount + 1
      // let dataTypeAscCell2 = "K" + val;
      // worksheet.getCell(dataTypeAscCell2).value = "ACCESSORIES";

      var accessoriesData2 = allData.filter(x => x.costCategoryGroup == "ACCESSORIES" && x.stylePartId == partList[1].stylePartId);

      var dataForAccessories2 = [];
      var dataForExcelAccessories2 = [];
      for (var itemAsc2 of accessoriesData2) {
        var objAccessories2 = {
          item: itemAsc2.itemName,
          itemDescription: itemAsc2.itemDescription,
          supplierName: itemAsc2.supplierDescription,
          qtyDz: itemAsc2.qtyDz,
          unit: itemAsc2.unitName,
          unitPrice: itemAsc2.rate,
          totalPrice: itemAsc2.totalPrice,
          remarks: itemAsc2.remarks,
          consumption: itemAsc2.consumption,
          wastagePercentage: itemAsc2.wastagePercentage,
          marketRelation: itemAsc2.marketRelation,
          finCostPc: itemAsc2.finCostPc
        };
        dataForAccessories2.push(objAccessories2);
      }

      dataForAccessories2.forEach((row: any) => {
        dataForExcelAccessories2.push(Object.values(row));
      });

      var rowCountAccessories2 = 0
      var accessoriesFastRow2 = rowCountAccessories2 + 8 + rowCount;
      var accessoriesLastRow2 = 0
      for (var itemAcs2 of dataForExcelAccessories2) {
        var costrowCountAccessories2 = rowCountAccessories2 + 8 + rowCount ;
        let itemCell = "L" + costrowCountAccessories2;// row.getCell(1).address;
        worksheet.getCell(itemCell).value = itemAcs2[0];
        worksheet.getCell(itemCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let itemDescriptionCellAcs2 = "M" + costrowCountAccessories2;//  row.getCell(2).address;
        worksheet.getCell(itemDescriptionCellAcs2).value = itemAcs2[1];
        worksheet.getCell(itemDescriptionCellAcs2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let supplierNameCellAcs2 = "N" + costrowCountAccessories2;// row.getCell(3).address;
        worksheet.getCell(supplierNameCellAcs2).value = itemAcs2[2];
        worksheet.getCell(supplierNameCellAcs2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let qtyDzCellAcs2 = "O" + costrowCountAccessories2; //row.getCell(4).address;
        worksheet.getCell(qtyDzCellAcs2).value = itemAcs2[3];
        worksheet.getCell(qtyDzCellAcs2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        // worksheet.getCell(qtyDzCellAcs2).value = {
        //   formula: `${itemAcs2[8]}*12`,
        //   date1904: false
        // }
        //new code
        worksheet.getCell(qtyDzCellAcs2).value = {
          formula: `(${itemAcs2[8]}+(${itemAcs2[8]}*(${itemAcs2[9]}/100)))*12`,
          date1904: false
        }


        let unitCellAcs2 = "P" + costrowCountAccessories2; //row.getCell(5).address;
        worksheet.getCell(unitCellAcs2).value = itemAcs2[4];
        worksheet.getCell(unitCellAcs2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let unitPriceCellAcs2 = "Q" + costrowCountAccessories2; //row.getCell(5).address;
        worksheet.getCell(unitPriceCellAcs2).value = itemAcs2[5];
        worksheet.getCell(unitPriceCellAcs2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let totalPriceCellAcs2 = "R" + costrowCountAccessories2; //row.getCell(5).address;
        worksheet.getCell(totalPriceCellAcs2).value = itemAcs2[6];
        worksheet.getCell(totalPriceCellAcs2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        var flAcs2 = "";
        var finalFLAcs2 = "";
        // var qtyDzTempAcs2 = `((O${costrowCountAccessories2} + ( O${costrowCountAccessories2} *(${itemAcs2[9]}%)))/${itemAcs2[10]})*Q${costrowCountAccessories2}`;
        var qtyDzTempAcs2 = `(O${costrowCountAccessories2}/${itemAcs2[10]})*Q${costrowCountAccessories2}`;
        if (itemAcs2[10] == 1) {

          flAcs2 = `(${qtyDzTempAcs2}  + ${qtyDzTempAcs2}*(${itemAcs2[11]}/100))`;

        }
        else {
          flAcs2 = `(${qtyDzTempAcs2} +${itemAcs2[11]})`;
        }

        if (itemAcs2[0] == "CMQ") {
          finalFLAcs2 = `(O${costrowCountAccessories2}*Q${costrowCountAccessories2})/12`;

        }
        else {
          finalFLAcs2 = flAcs2;
        }
        worksheet.getCell(totalPriceCellAcs2).value = {
          formula: finalFLAcs2,
          date1904: false
        }

        let remarksCellAcs2 = "S" + costrowCountAccessories2; //row.getCell(5).address;
        worksheet.getCell(remarksCellAcs2).value = itemAcs2[7];
        worksheet.getCell(remarksCellAcs2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let slksCellAcs2 = "K" + costrowCountAccessories2; //row.getCell(5).address;
        worksheet.getCell(slksCellAcs2).value = rowCount + rowCountAccessories2 + 1;
        worksheet.getCell(slksCellAcs2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(slksCellAcs2).alignment = { vertical: "middle", horizontal: "center" };

        accessoriesLastRow2 = costrowCountAccessories2;
        rowCountAccessories2++
      }




      // worksheet.addRow([]);

      // var valAccessories2 = 8 + rowCount + rowCountAccessories2 + 2;
      // let toalalAccessoriesPriceAscCellQ2 = "Q" + valAccessories2;
      // worksheet.getCell(toalalAccessoriesPriceAscCellQ2).value = "Total Value";
      // worksheet.getCell(toalalAccessoriesPriceAscCellQ2).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // }
      // worksheet.getCell(toalalAccessoriesPriceAscCellQ2).font = {
      //   name: "Calibri",
      //   size: 12,
      //   bold: true,
      //   color: { argb: "#ffff00" },
      // }
      // let toalalAccessoriesPriceAscCell2 = "R" + valAccessories2;
      // worksheet.getCell(toalalAccessoriesPriceAscCell2).value = 0
      // if (dataForExcelAccessories2.length > 0) {
      //   worksheet.getCell(toalalAccessoriesPriceAscCell2).value = {
      //     formula: `SUM(R${accessoriesFastRow2}:R${accessoriesLastRow2})`,
      //     date1904: false
      //   };
      // }
      // worksheet.getCell(toalalAccessoriesPriceAscCell2).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // }
      // worksheet.getCell(toalalAccessoriesPriceAscCell2).font = {
      //   name: "Calibri",
      //   size: 12,
      //   bold: true,
      //   color: { argb: "#ffff00" },
      // }

      // var val = 8 + rowCount + rowCountAccessories2 + 2 + 1
      // let dataTypeLableCell2 = "K" + val;
      // worksheet.getCell(dataTypeLableCell2).value = "LABELS";

      var lableData2 = allData.filter(x => x.costCategoryGroup == "LABELS" && x.stylePartId == partList[1].stylePartId);

      var dataForLable2 = [];
      var dataForExcelLable2 = [];
      for (var itemLable2 of lableData2) {
        var objLable2 = {
          item: itemLable2.itemName,
          itemDescription: itemLable2.itemDescription,
          supplierName: itemLable2.supplierDescription,
          qtyDz: itemLable2.qtyDz,
          unit: itemLable2.unitName,
          unitPrice: itemLable2.rate,
          totalPrice: itemLable2.totalPrice,
          remarks: itemLable2.remarks,
          consumption: itemLable2.consumption,
          wastagePercentage: itemLable2.wastagePercentage,
          marketRelation: itemLable2.marketRelation,
          finCostPc: itemLable2.finCostPc
        };
        dataForLable2.push(objLable2);
      }

      dataForLable2.forEach((row: any) => {
        dataForExcelLable2.push(Object.values(row));
      });


      var rowCountLable2 = 0

      var lableFastRow2 = rowCountLable2 + 8 + rowCount + rowCountAccessories2;
      var lableLastRow2 = 0
      for (var itemLable2 of dataForExcelLable2) {
        var costrowCountLable2 = rowCountLable2 + 8 + rowCount + rowCountAccessories2;
        let itemCellLable2 = "L" + costrowCountLable2;// row.getCell(1).address;
        worksheet.getCell(itemCellLable2).value = itemLable2[0];
        worksheet.getCell(itemCellLable2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let itemDescriptionCellLable2 = "M" + costrowCountLable2;//  row.getCell(2).address;
        worksheet.getCell(itemDescriptionCellLable2).value = itemLable2[1];
        worksheet.getCell(itemDescriptionCellLable2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let supplierNameCellLable2 = "N" + costrowCountLable2;// row.getCell(3).address;
        worksheet.getCell(supplierNameCellLable2).value = itemLable2[2];
        worksheet.getCell(supplierNameCellLable2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let qtyDzCellLable2 = "O" + costrowCountLable2; //row.getCell(4).address;
        worksheet.getCell(qtyDzCellLable2).value = itemLable2[3];
        worksheet.getCell(qtyDzCellLable2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        // worksheet.getCell(qtyDzCellLable2).value = {
        //   formula: `${itemLable2[8]}*12`,
        //   date1904: false
        // }
        //new code 
        worksheet.getCell(qtyDzCellLable2).value = {
          formula: `(${itemLable2[8]}+(${itemLable2[8]}*(${itemLable2[9]}/100)))*12`,
          date1904: false
        }

        let unitCellLable2 = "P" + costrowCountLable2; //row.getCell(5).address;
        worksheet.getCell(unitCellLable2).value = itemLable2[4];
        worksheet.getCell(unitCellLable2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let unitPriceCellLable2 = "Q" + costrowCountLable2; //row.getCell(5).address;
        worksheet.getCell(unitPriceCellLable2).value = itemLable2[5];
        worksheet.getCell(unitPriceCellLable2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let totalPriceCellLable2 = "R" + costrowCountLable2; //row.getCell(5).address;
        worksheet.getCell(totalPriceCellLable2).value = itemLable2[6];
        worksheet.getCell(totalPriceCellLable2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }


        var flLable2 = "";
        var finalFLLable2 = "";
        // var qtyDzTempLable2 = `((O${costrowCountLable2} + ( O${costrowCountLable2} *(${itemLable2[9]}%)))/${itemLable2[10]})*Q${costrowCountLable2}`;
        var qtyDzTempLable2 = `(O${costrowCountLable2}/${itemLable2[10]})*Q${costrowCountLable2}`;
        if (itemLable2[10] == 1) {

          flLable2 = `(${qtyDzTempLable2}  + ${qtyDzTempLable2}*(${itemLable2[11]}/100))`;

        }
        else {
          flLable2 = `(${qtyDzTempLable2} +${itemLable2[11]})`;
        }

        if (itemLable2[0] == "CMQ") {
          finalFLLable2 = `(O${costrowCountLable2}*Q${costrowCountLable2})/12`;

        }
        else {
          finalFLLable2 = flLable2;
        }
        worksheet.getCell(totalPriceCellLable2).value = {
          formula: finalFLLable2,
          date1904: false
        }

        let remarksCellLable2 = "S" + costrowCountLable2; //row.getCell(5).address;
        worksheet.getCell(remarksCellLable2).value = itemLable2[7];
        worksheet.getCell(remarksCellLable2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }


        let slksCellLable2 = "K" + costrowCountLable2; //row.getCell(5).address;
        worksheet.getCell(slksCellLable2).value = rowCount + rowCountAccessories2 + rowCountLable2 + 1;
        worksheet.getCell(slksCellLable2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(slksCellLable2).alignment = { vertical: "middle", horizontal: "center" };

        lableLastRow2 = costrowCountLable2;
        rowCountLable2++
      }

      // worksheet.addRow([]);

      // var valLable2 = 8 + rowCount + rowCountAccessories2 + rowCountLable2 + 2 + 2;
      // let toalalLablePriceAscCellQ2 = "Q" + valLable2;
      // worksheet.getCell(toalalLablePriceAscCellQ2).value = "Total Value";
      // worksheet.getCell(toalalLablePriceAscCellQ2).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // }
      // worksheet.getCell(toalalLablePriceAscCellQ2).font = {
      //   name: "Calibri",
      //   size: 12,
      //   bold: true,
      //   color: { argb: "#ffff00" },
      // }

      // let toalalLablePriceAscCell2 = "R" + valLable2;
      // worksheet.getCell(toalalLablePriceAscCell2).value = 0;
      // if (dataForExcelLable2.length > 0) {
      //   worksheet.getCell(toalalLablePriceAscCell2).value = {
      //     formula: `SUM(R${lableFastRow2}:R${lableLastRow2})`,
      //     date1904: false
      //   };
      // }
      // worksheet.getCell(toalalLablePriceAscCell2).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // }
      // worksheet.getCell(toalalLablePriceAscCell2).font = {
      //   name: "Calibri",
      //   size: 12,
      //   bold: true,
      //   color: { argb: "#ffff00" },
      // }

      // var val = 8 + rowCount + rowCountAccessories2 + rowCountLable2 + 2 + 2 + 1
      // let dataTypePakingCell1 = "K" + val;
      // worksheet.getCell(dataTypePakingCell1).value = "PACKING";



      var packgingData2 = allData.filter(x => x.costCategoryGroup == "PACKING" && x.stylePartId == partList[1].stylePartId);

      var dataForPackging2 = [];
      var dataForExcelPackging2 = [];
      for (var itemPackging2 of packgingData2) {
        var objPackging2 = {
          item: itemPackging2.itemName,
          itemDescription: itemPackging2.itemDescription,
          supplierName: itemPackging2.supplierDescription,
          qtyDz: itemPackging2.qtyDz,
          unit: itemPackging2.unitName,
          unitPrice: itemPackging2.rate,
          totalPrice: itemPackging2.totalPrice,
          remarks: itemPackging2.remarks,
          consumption: itemPackging2.consumption,
          wastagePercentage: itemPackging2.wastagePercentage,
          marketRelation: itemPackging2.marketRelation,
          finCostPc: itemPackging2.finCostPc
        };
        dataForPackging2.push(objPackging2);
      }

      dataForPackging2.forEach((row: any) => {
        dataForExcelPackging2.push(Object.values(row));
      });


      var rowCountPackging2 = 0
      var pakingFastRow2 = rowCountPackging2 + 8 + rowCount + rowCountAccessories2 + rowCountLable2;
      var pakingLastRow2 = 0
      for (var itemPackging2 of dataForExcelPackging2) {
        var costrowCountPackging2 = rowCountPackging2 + 8 + rowCount + rowCountAccessories2 + rowCountLable2 ;
        let itemCellPackging2 = "L" + costrowCountPackging2;// row.getCell(1).address;
        worksheet.getCell(itemCellPackging2).value = itemPackging2[0];
        worksheet.getCell(itemCellPackging2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let itemDescriptionCellPackging2 = "M" + costrowCountPackging2;//  row.getCell(2).address;
        worksheet.getCell(itemDescriptionCellPackging2).value = itemPackging2[1];
        worksheet.getCell(itemDescriptionCellPackging2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let supplierNameCellPackging2 = "N" + costrowCountPackging2;// row.getCell(3).address;
        worksheet.getCell(supplierNameCellPackging2).value = itemPackging2[2];
        worksheet.getCell(supplierNameCellPackging2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let qtyDzCellPackging2 = "O" + costrowCountPackging2; //row.getCell(4).address;
        worksheet.getCell(qtyDzCellPackging2).value = itemPackging2[3];
        worksheet.getCell(qtyDzCellPackging2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        // worksheet.getCell(qtyDzCellPackging2).value = {
        //   formula: `${itemPackging2[8]}*12`,
        //   date1904: false
        // }
        //new code 
        worksheet.getCell(qtyDzCellPackging2).value = {
          formula: `(${itemPackging2[8]}+(${itemPackging2[8]}*(${itemPackging2[9]}/100)))*12`,
          date1904: false
        }

        let unitCellPackging2 = "P" + costrowCountPackging2; //row.getCell(5).address;
        worksheet.getCell(unitCellPackging2).value = itemPackging2[4];
        worksheet.getCell(unitCellPackging2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let unitPriceCellPackging2 = "Q" + costrowCountPackging2; //row.getCell(5).address;
        worksheet.getCell(unitPriceCellPackging2).value = itemPackging2[5];
        worksheet.getCell(unitPriceCellPackging2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let totalPriceCellPackging2 = "R" + costrowCountPackging2; //row.getCell(5).address;
        worksheet.getCell(totalPriceCellPackging2).value = itemPackging2[6];
        worksheet.getCell(totalPriceCellPackging2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        var flPackging2 = "";
        var finalFLPackging2 = "";
        // var qtyDzTempPackging2 = `((O${costrowCountPackging2} + ( O${costrowCountPackging2} *(${itemPackging2[9]}%)))/${itemPackging2[10]})*Q${costrowCountPackging2}`;
        var qtyDzTempPackging2 = `(O${costrowCountPackging2}/${itemPackging2[10]})*Q${costrowCountPackging2}`;
        if (itemPackging2[10] == 1) {

          flPackging2 = `(${qtyDzTempPackging2}  + ${qtyDzTempPackging2}*(${itemPackging2[11]}/100))`;

        }
        else {
          flPackging2 = `(${qtyDzTempPackging2} +${itemPackging2[11]})`;
        }

        if (itemPackging2[0] == "CMQ") {
          finalFLPackging2 = `(O${costrowCountPackging2}*Q${costrowCountPackging2})/12`;

        }
        else {
          finalFLPackging2 = flPackging2;
        }
        worksheet.getCell(totalPriceCellPackging2).value = {
          formula: finalFLPackging2,
          date1904: false
        }

        let remarksCellPackging2 = "S" + costrowCountPackging2; //row.getCell(5).address;
        worksheet.getCell(remarksCellPackging2).value = itemPackging2[7];
        worksheet.getCell(remarksCellPackging2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }


        let slksCellPackging2 = "K" + costrowCountPackging2; //row.getCell(5).address;
        worksheet.getCell(slksCellPackging2).value = rowCount + rowCountAccessories2 + rowCountLable2 + rowCountPackging2 + 1;
        worksheet.getCell(slksCellPackging2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(slksCellPackging2).alignment = { vertical: "middle", horizontal: "center" };

        pakingLastRow2 = costrowCountPackging2;
        rowCountPackging2++
      }

      // worksheet.addRow([]);

      // var valPaking2 = 8 + rowCount + rowCountAccessories2 + rowCountLable2 + rowCountPackging2 + 2 + 2 + 2;
      // let toalalPakingPriceCellQ2 = "Q" + valPaking2;
      // worksheet.getCell(toalalPakingPriceCellQ2).value = "Total Value";
      // worksheet.getCell(toalalPakingPriceCellQ2).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // }
      // worksheet.getCell(toalalPakingPriceCellQ2).font = {
      //   name: "Calibri",
      //   size: 12,
      //   bold: true,
      //   color: { argb: "#ffff00" },
      // }

      // let toalalPakingPriceAscCell2 = "R" + valPaking2;
      // worksheet.getCell(toalalPakingPriceAscCell2).value = 0;
      // if (dataForExcelPackging2.length > 0) {
      //   worksheet.getCell(toalalPakingPriceAscCell2).value = {
      //     formula: `SUM(R${pakingFastRow2}:R${pakingLastRow2})`,
      //     date1904: false
      //   };
      // }

      // worksheet.getCell(toalalPakingPriceAscCell2).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // }
      // worksheet.getCell(toalalPakingPriceAscCell2).font = {
      //   name: "Calibri",
      //   size: 12,
      //   bold: true,
      //   color: { argb: "#ffff00" },
      // }


      // var val = 8 + rowCount + rowCountAccessories2 + rowCountLable2 + rowCountPackging2 + 2 + 2 + 2 + 1
      // let dataTypeProcessCell1 = "K" + val;
      // worksheet.getCell(dataTypeProcessCell1).value = "PROCESS";




      /////--------process----------------/////

      var processData2 = allData.filter(x => x.costCategoryGroup == "PROCESS" && x.stylePartId == partList[1].stylePartId);

      var dataForProcesss2 = [];
      var dataForExcelProcesss2 = [];
      for (var itemProcesss2 of processData2) {
        var objProcesss2 = {
          item: itemProcesss2.itemName,
          itemDescription: itemProcesss2.itemDescription,
          supplierName: itemProcesss2.supplierDescription,
          qtyDz: itemProcesss2.qtyDz,
          unit: itemProcesss2.unitName,
          unitPrice: itemProcesss2.rate,
          totalPrice: itemProcesss2.totalPrice,
          remarks: itemProcesss2.remarks,
          consumption: itemProcesss2.consumption,
          wastagePercentage: itemProcesss2.wastagePercentage,
          marketRelation: itemProcesss2.marketRelation,
          finCostPc: itemProcesss2.finCostPc
        };
        dataForProcesss2.push(objProcesss2);
      }

      dataForProcesss2.forEach((row: any) => {
        dataForExcelProcesss2.push(Object.values(row));
      });


      var rowCountProcesss2 = 0
      var processFastRow2 = rowCountProcesss2 + 8 + rowCount + rowCountAccessories2 + rowCountLable2 + rowCountPackging2;
      var processLastRow2 = 0
      for (var itemProcesss2 of dataForExcelProcesss2) {
        var costrowCountProcesss2 = rowCountProcesss2 + 8 + rowCount + rowCountAccessories2 + rowCountLable2 + rowCountPackging2;
        let itemCellProcesss2 = "L" + costrowCountProcesss2;// row.getCell(1).address;
        worksheet.getCell(itemCellProcesss2).value = itemProcesss2[0];
        worksheet.getCell(itemCellProcesss2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let itemDescriptionCellProcesss2 = "M" + costrowCountProcesss2;//  row.getCell(2).address;
        worksheet.getCell(itemDescriptionCellProcesss2).value = itemProcesss2[1];
        worksheet.getCell(itemDescriptionCellProcesss2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let supplierNameCellProcesss2 = "N" + costrowCountProcesss2;// row.getCell(3).address;
        worksheet.getCell(supplierNameCellProcesss2).value = itemProcesss2[2];
        worksheet.getCell(supplierNameCellProcesss2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let qtyDzCellProcesss2 = "O" + costrowCountProcesss2; //row.getCell(4).address;
        worksheet.getCell(qtyDzCellProcesss2).value = itemProcesss2[3];
        worksheet.getCell(qtyDzCellProcesss2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        // worksheet.getCell(qtyDzCellProcesss2).value = {
        //   formula: `${itemProcesss2[8]}*12`,
        //   date1904: false
        // }
        //new code
        worksheet.getCell(qtyDzCellProcesss2).value = {
          formula: `(${itemProcesss2[8]}+(${itemProcesss2[8]}*(${itemProcesss2[9]}/100)))*12`,
          date1904: false
        }

        let unitCellProcesss2 = "P" + costrowCountProcesss2; //row.getCell(5).address;
        worksheet.getCell(unitCellProcesss2).value = itemProcesss2[4];
        worksheet.getCell(unitCellProcesss2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let unitPriceCellProcesss2 = "Q" + costrowCountProcesss2; //row.getCell(5).address;
        worksheet.getCell(unitPriceCellProcesss2).value = itemProcesss2[5];
        worksheet.getCell(unitPriceCellProcesss2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let totalPriceCellProcesss2 = "R" + costrowCountProcesss2; //row.getCell(5).address;
        worksheet.getCell(totalPriceCellProcesss2).value = itemProcesss2[6];
        worksheet.getCell(totalPriceCellProcesss2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        var flProcesss2 = "";
        var finalFLProcesss2 = "";
        // var qtyDzTempProcesss2 = `((O${costrowCountProcesss2} + ( O${costrowCountProcesss2} *(${itemProcesss2[9]}%)))/${itemProcesss2[10]})*Q${costrowCountProcesss2}`;
        var qtyDzTempProcesss2 = `(O${costrowCountProcesss2}/${itemProcesss2[10]})*Q${costrowCountProcesss2}`;
        if (itemProcesss2[10] == 1) {

          flProcesss2 = `(${qtyDzTempProcesss2}  + ${qtyDzTempProcesss2}*(${itemProcesss2[11]}/100))`;

        }
        else {
          flProcesss2 = `(${qtyDzTempProcesss2} +${itemProcesss2[11]})`;
        }

        if (itemProcesss2[0] == "CMQ") {
          finalFLProcesss2 = `(O${costrowCountProcesss2}*Q${costrowCountProcesss2})/12`;

        }
        else {
          finalFLProcesss2 = flProcesss2;
        }
        worksheet.getCell(totalPriceCellProcesss2).value = {
          formula: finalFLProcesss2,
          date1904: false
        }

        let remarksCellProcesss2 = "S" + costrowCountProcesss2; //row.getCell(5).address;
        worksheet.getCell(remarksCellProcesss2).value = itemProcesss2[7];
        worksheet.getCell(remarksCellProcesss2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let slksCellProcess2 = "K" + costrowCountProcesss2; //row.getCell(5).address;
        worksheet.getCell(slksCellProcess2).value = rowCount + rowCountAccessories2 + rowCountLable2 + rowCountPackging2 + rowCountProcesss2 + 1;
        worksheet.getCell(slksCellProcess2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(slksCellProcess2).alignment = { vertical: "middle", horizontal: "center" };

        processLastRow2 = costrowCountProcesss2;
        rowCountProcesss2++
      }

      // worksheet.addRow([]);
      // var valProcesss2 = 8 + rowCount + rowCountAccessories2 + rowCountLable2 + rowCountPackging2 + rowCountProcesss2 + 2 + 2 + 2 + 2;
      // let totalProcesssPriceCellQ2 = "Q" + valProcesss2;
      // worksheet.getCell(totalProcesssPriceCellQ2).value = "Total Value";
      // worksheet.getCell(totalProcesssPriceCellQ2).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // }
      // worksheet.getCell(totalProcesssPriceCellQ2).font = {
      //   name: "Calibri",
      //   size: 12,
      //   bold: true,
      //   color: { argb: "#ffff00" },
      // }

      // let totalProcesssPriceCell2 = "R" + valProcesss2;
      // worksheet.getCell(totalProcesssPriceCell2).value = 0;
      // if (dataForExcelProcesss2.length > 0) {
      //   worksheet.getCell(totalProcesssPriceCell2).value = {
      //     formula: `SUM(R${processFastRow2}:R${processLastRow2})`,
      //     date1904: false
      //   };
      // }
      // worksheet.getCell(totalProcesssPriceCell2).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // }
      // worksheet.getCell(totalProcesssPriceCell2).font = {
      //   name: "Calibri",
      //   size: 12,
      //   bold: true,
      //   color: { argb: "#ffff00" },
      // }


      //worksheet.addRow([]);

      var cmqData2 = allData.filter(x => x.itemName == "CMQ" && x.stylePartId == partList[1].stylePartId);

      var dataForCMQ2 = [];
      var dataForExcelCMQ2 = [];
      for (var itemCMQ2 of cmqData2) {
        var objCMQ2 = {
          item: itemCMQ2.itemName,
          itemDescription: itemCMQ2.itemDescription,
          supplierName: itemCMQ2.supplierDescription,
          qtyDz: itemCMQ2.qtyDz,
          unit: itemCMQ2.unitName,
          unitPrice: itemCMQ2.unitPrice,
          totalPrice: itemCMQ2.totalPrice,
          remarks: itemCMQ2.remarks,
          consumption: itemCMQ2.consumption,
          wastagePercentage: itemCMQ2.wastagePercentage,
          marketRelation: itemCMQ2.marketRelation,
          finCostPc: itemCMQ2.finCostPc,
          cmPc: itemCMQ2.cmPc
        };
        dataForCMQ2.push(objCMQ2);
      }

      dataForCMQ2.forEach((row: any) => {
        dataForExcelCMQ2.push(Object.values(row));
      });



      var rowCountCMQ2 = 0
      var cmqFastRow2 = rowCountCMQ2 + 8 + rowCount + rowCountAccessories2 + rowCountLable2 + rowCountPackging2 + rowCountProcesss2;
      var cmqLastRow2 = 0
      for (var itemCMQ2 of dataForExcelCMQ2) {
        var costrowCountCMQ2 = rowCountCMQ2 + 8 + rowCount + rowCountAccessories2 + rowCountLable2 + rowCountPackging2 + rowCountProcesss2;
        let itemCellCMQ2 = "L" + costrowCountCMQ2;// row.getCell(1).address;
        worksheet.getCell(itemCellCMQ2).value = itemCMQ2[0];
        worksheet.getCell(itemCellCMQ2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let itemDescriptionCellCMQ2 = "M" + costrowCountCMQ2;//  row.getCell(2).address;
        //worksheet.getCell(itemDescriptionCellCMQ2).value = itemCMQ2[1];
        worksheet.getCell(itemDescriptionCellCMQ2).value = "COST FOR MANUFACTURING";
        worksheet.getCell(itemDescriptionCellCMQ2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let supplierNameCellCMQ2 = "N" + costrowCountCMQ2;// row.getCell(3).address;
        worksheet.getCell(supplierNameCellCMQ2).value = itemCMQ2[2];
        worksheet.getCell(supplierNameCellCMQ2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let qtyDzCellCMQ2 = "O" + costrowCountCMQ2; //row.getCell(4).address;
        worksheet.getCell(qtyDzCellCMQ2).value = itemCMQ2[3];
        worksheet.getCell(qtyDzCellCMQ2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(qtyDzCellCMQ2).value = {
          formula: `=${itemCMQ2[3]}`,
          date1904: false
        }

        let unitCellCMQ2 = "P" + costrowCountCMQ2; //row.getCell(5).address;
        worksheet.getCell(unitCellCMQ2).value = itemCMQ2[4];
        worksheet.getCell(unitCellCMQ2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let unitPriceCellMQ2 = "Q" + costrowCountCMQ2; //row.getCell(5).address;
        worksheet.getCell(unitPriceCellMQ2).value = itemCMQ2[5];
        worksheet.getCell(unitPriceCellMQ2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(unitPriceCellMQ2).value = {
          formula: `(((${itemCMQ2[12]} *12) * 12)/ 12)`,
          date1904: false
        }

        let totalPriceCellCMQ2 = "R" + costrowCountCMQ2; //row.getCell(5).address;
        worksheet.getCell(totalPriceCellCMQ2).value = itemCMQ2[6];
        worksheet.getCell(totalPriceCellCMQ2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(totalPriceCellCMQ2).value = {
          formula: `(O${costrowCountCMQ2}*Q${costrowCountCMQ2})/12`,
          date1904: false
        }

        let remarksCellCMQ2 = "S" + costrowCountCMQ2; //row.getCell(5).address;
        worksheet.getCell(remarksCellCMQ2).value = itemCMQ2[7];
        worksheet.getCell(remarksCellCMQ2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }


        let slksCellCmq2 = "K" + costrowCountCMQ2; //row.getCell(5).address;
        worksheet.getCell(slksCellCmq2).value = rowCount + rowCountAccessories2 + rowCountLable2 + rowCountPackging2 + rowCountProcesss2 + rowCountCMQ2 + 1;
        worksheet.getCell(slksCellCmq2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(slksCellCmq2).alignment = { vertical: "middle", horizontal: "center" };

        cmqLastRow2 = costrowCountCMQ2;
        rowCountCMQ2++
      }

      var valFinalTotal2 = cmqLastRow2 + 1;
      let FinalTotalCellQ1 = "Q" + valFinalTotal2;
      worksheet.getCell(FinalTotalCellQ1).value = "Total ";
      worksheet.getCell(FinalTotalCellQ1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(FinalTotalCellQ1).font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      }

      let FinalTotalCell2 = "R" + valFinalTotal2;
      worksheet.getCell(FinalTotalCell2).value = {
        formula: `SUM(R${fabricFastRow2}:R${cmqLastRow2})`,
        date1904: false
      };
      worksheet.getCell(FinalTotalCell2).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(FinalTotalCell2).font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      }

      let FinalTotalCell1Cal2 = "T" + valFinalTotal2;
      worksheet.getCell(FinalTotalCell1Cal2).value = {
        formula: `R${valFinalTotal2}/12`,
        date1904: false
      };
      worksheet.getCell(FinalTotalCell1Cal2).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(FinalTotalCell1Cal2).font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      }

      let cmqCalTotalCell2 = "T" + cmqLastRow2;
      worksheet.getCell(cmqCalTotalCell2).value = {
        //formula: `T${valFinalTotal2}+T${cmqLastRow2 - 1}`,
        formula:`T${cmqLastRow2+1}+(T${cmqLastRow2+1}*${partList[1].buyingCommission}%)`,
        date1904: false
      };
      worksheet.getCell(cmqCalTotalCell2).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(cmqCalTotalCell2).font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      }

      // var valuePline2 = cmqLastRow2-3;
      var valuePline2 = cmqLastRow2 - 2
      let cmqCalTotalCell22 = "T" + valuePline2;
      worksheet.getCell(cmqCalTotalCell22).value = {
        //formula: `T${cmqLastRow2}+(T${cmqLastRow2}*${partList[1].buyingCommission}%)`,
        formula: `T${cmqLastRow2}+T${cmqLastRow2 - 1}`,
        date1904: false
      };
      worksheet.getCell(cmqCalTotalCell22).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(cmqCalTotalCell22).font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      }

      // var valueUperPline2 = cmqLastRow2-5
      // var valueUperPline2 = cmqLastRow2 - 4
      var valueUperPline2 = cmqLastRow2 - 3
      let cmqCalTotalCell222 = "T" + valueUperPline2;
      worksheet.getCell(cmqCalTotalCell222).value = {
        //formula: `(T${cmqLastRow2 - 3}-T${cmqLastRow2 + 1})`,
        formula: `(T${cmqLastRow2 - 2}-T${cmqLastRow2 + 1})`,
        date1904: false
      };
      worksheet.getCell(cmqCalTotalCell222).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(cmqCalTotalCell222).font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      }

    }







    //---------IE data --------//

    if (cmqLastRow > cmqLastRow2) {
      var val = 8 + c + rowCountAccessories1 + rowCountLable1 + rowCountPackging1 + rowCountProcesss1 + rowCountCMQ1 + 2 + 1;
    }
    else if (partList.length > 1 && cmqLastRow < cmqLastRow2) {
      var val = 8 + rowCount + rowCountAccessories2 + rowCountLable2 + rowCountPackging2 + rowCountProcesss2 + rowCountCMQ2 + 2 +1;
    }
    else {
      var val = 8 + c + rowCountAccessories1 + rowCountLable1 + rowCountPackging1 + rowCountProcesss1 + rowCountCMQ1 + 2 + 1;
    }
    debugger
    //var val = 8 + c + rowCountAccessories1 + rowCountLable1+ rowCountPackging1 + rowCountProcesss1 + rowCountCMQ1 + 2 + 2 + 2 + 2 + 2 + 1
    let dataTypeIEPartCell1 = "A" + val;
    worksheet.getCell(dataTypeIEPartCell1).value = partList[0].partName;



    var IEDdata1 = allData[0].iedEtailsList;
    //var IEDdata1 = IEDdata[0];





    var rowCountIE1 = 0
    if (IEDdata1.length > 0) {
      let headerRowIE = worksheet.addRow(stockHeaderIE);
      headerRowIE.eachCell((cell, number) => {
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

      for (var itemIE1 of IEDdata1) {
        if (cmqLastRow > cmqLastRow2) {
          var costrowCountIE1 = rowCountIE1 + 8 + c + rowCountAccessories1 + rowCountLable1 + rowCountPackging1 + rowCountProcesss1 + rowCountCMQ1 + 2 + 2 +  1;
        }
        else if (partList.length > 1 && cmqLastRow < cmqLastRow2) {
          var costrowCountIE1 = rowCountIE1 + 8 + rowCount + rowCountAccessories2 + rowCountLable2 + rowCountPackging2 + rowCountProcesss2 + rowCountCMQ2 + 2 + 2  + 1;
        }
        else {
          var costrowCountIE1 = rowCountIE1 + 8 + c + rowCountAccessories1 + rowCountLable1 + rowCountPackging1 + rowCountProcesss1 + rowCountCMQ1 + 2 + 2  + 1;
        }
        //alert(1);
        debugger

        let orderQtyCellIE1 = "A" + costrowCountIE1; //row.getCell(4).address;
        worksheet.getCell(orderQtyCellIE1).value = itemIE1.moq;
        worksheet.getCell(orderQtyCellIE1).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let ppmCellIE1 = "B" + costrowCountIE1; //row.getCell(5).address;
        worksheet.getCell(ppmCellIE1).value = itemIE1.ppm;
        worksheet.getCell(ppmCellIE1).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let smvCellIE1 = "C" + costrowCountIE1; //row.getCell(5).address;
        worksheet.getCell(smvCellIE1).value = itemIE1.smv;;
        worksheet.getCell(smvCellIE1).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }


        let EffCellIE1 = "D" + costrowCountIE1; //row.getCell(5).address;
        worksheet.getCell(EffCellIE1).value = `${itemIE1.averageEfficiencyPercentage}%`;
        worksheet.getCell(EffCellIE1).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }


        let ProPerMcCellIE1 = "E" + costrowCountIE1; //row.getCell(5).address;
        worksheet.getCell(ProPerMcCellIE1).value = "";
        worksheet.getCell(ProPerMcCellIE1).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        
        worksheet.getCell(ProPerMcCellIE1).value = {
            formula: `42*600*D${costrowCountIE1}/C${costrowCountIE1}`,
            date1904: false
          }

        
        let cmPerDzCellIE1 = "F" + costrowCountIE1; //row.getCell(5).address;
        worksheet.getCell(cmPerDzCellIE1).value = "";
        worksheet.getCell(cmPerDzCellIE1).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(cmPerDzCellIE1).value = {
          formula: `B${costrowCountIE1}*C${costrowCountIE1}/D${costrowCountIE1}*12`,
          date1904: false
        }     
        rowCountIE1++
      }
    }
    else {
      var newRowNumber = val + 2;
      let IEDat1stColoum = "A" + newRowNumber;
      worksheet.getCell(IEDat1stColoum).value = "Order Qty";
      worksheet.getCell(IEDat1stColoum).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      worksheet.getCell(IEDat1stColoum).font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };

      let IEDat2ndColoum = "B" + newRowNumber;
      worksheet.getCell(IEDat2ndColoum).value = "PPM";
      worksheet.getCell(IEDat2ndColoum).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      worksheet.getCell(IEDat2ndColoum).font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };

      let IEDat3rdColoum = "C" + newRowNumber;
      worksheet.getCell(IEDat3rdColoum).value = "SMV";
      worksheet.getCell(IEDat3rdColoum).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      worksheet.getCell(IEDat3rdColoum).font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };

      let IEDat4thColoum = "D" + newRowNumber;
      worksheet.getCell(IEDat4thColoum).value = "Eff(%)";
      worksheet.getCell(IEDat4thColoum).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      worksheet.getCell(IEDat4thColoum).font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };

      let IEDat5thColoum = "E" + newRowNumber;
      worksheet.getCell(IEDat5thColoum).value = "PRO/mc";
      worksheet.getCell(IEDat5thColoum).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      worksheet.getCell(IEDat5thColoum).font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };

      let IEDat6thColoum = "F" + newRowNumber;
      worksheet.getCell(IEDat6thColoum).value = "CM/Dz";
      worksheet.getCell(IEDat6thColoum).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      worksheet.getCell(IEDat6thColoum).font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };

    }



    debugger

    if (partList.length > 1) {
      debugger
      worksheet.addRow([]);
      if (cmqLastRow > cmqLastRow2) {
        var val1 = 8 + c + rowCountAccessories1 + rowCountLable1 + rowCountPackging1 + rowCountProcesss1 + rowCountIE1 + rowCountCMQ1 + 2 + 2  + 2;
      }
      else if (cmqLastRow < cmqLastRow2) {
        var val1 = 8 + rowCount + rowCountAccessories2 + rowCountLable2 + rowCountPackging2 + rowCountProcesss2 + rowCountIE1 + rowCountCMQ2 + 2 + 2 + 2;
      }
      //var val =  8 + c + rowCountAccessories1 + rowCountLable1+ rowCountPackging1 + rowCountProcesss1 + rowCountIE1 + rowCountCMQ1 + 2 + 2 +2 + 2 + 2 + 2 + 2;
      let dataTypeIEPartCell2 = "A" + val1;
      worksheet.getCell(dataTypeIEPartCell2).value = partList[1].partName;

      var IEDdata2 = allData[1].iedEtailsList;




      var rowCountIE2 = 0
      if (IEDdata2.length > 0) {
        let headerRowIE2 = worksheet.addRow(stockHeaderIE);
        headerRowIE2.eachCell((cell, number) => {
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


        for (var itemIE2 of IEDdata2) {
          if (cmqLastRow > cmqLastRow2) {
            var costrowCountIE2 = rowCountIE2 + 8 + c + rowCountAccessories1 + rowCountLable1 + rowCountPackging1 + rowCountProcesss1 + rowCountIE1 + + rowCountCMQ1 + 2 + 2 + 2  + 2;
          }
          else if (cmqLastRow < cmqLastRow2) {
            var costrowCountIE2 = rowCountIE2 + 8 + rowCount + rowCountAccessories2 + rowCountLable2 + rowCountPackging2 + rowCountProcesss2 + rowCountIE1 + + rowCountCMQ2 + 2 + 2 + 2 + 2;
          }
         
          let orderQtyCellIE2 = "A" + costrowCountIE2; //row.getCell(4).address;
          worksheet.getCell(orderQtyCellIE2).value = itemIE2.moq;
          worksheet.getCell(orderQtyCellIE2).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }

          let ppmCellIE2 = "B" + costrowCountIE2; //row.getCell(5).address;
          worksheet.getCell(ppmCellIE2).value = itemIE2.ppm;
          worksheet.getCell(ppmCellIE2).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }

          let smvCellIE2 = "C" + costrowCountIE2; //row.getCell(5).address;
          worksheet.getCell(smvCellIE2).value = itemIE2.smv;
          worksheet.getCell(smvCellIE2).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }

          let wantedEffCellIE2 = "D" + costrowCountIE2; //row.getCell(5).address;
          worksheet.getCell(wantedEffCellIE2).value = `${itemIE2.averageEfficiencyPercentage}%`;
          worksheet.getCell(wantedEffCellIE2).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }


          let ProPerMcCellIE2 = "E" + costrowCountIE2; //row.getCell(5).address;
          worksheet.getCell(ProPerMcCellIE2).value = "";
          worksheet.getCell(ProPerMcCellIE2).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }

          worksheet.getCell(ProPerMcCellIE2).value = {
            formula: `42*600*D${costrowCountIE2}/C${costrowCountIE2}`,
            date1904: false
          }

          let cmPerDzCellIE2 = "F" + costrowCountIE2; //row.getCell(5).address;
          worksheet.getCell(cmPerDzCellIE2).value = "";
          worksheet.getCell(cmPerDzCellIE2).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          worksheet.getCell(cmPerDzCellIE2).value = {
            formula: `B${costrowCountIE2}*C${costrowCountIE2}/D${costrowCountIE2}*12`,
            date1904: false
          }
          rowCountIE2++
        }
      }
      else {
        var newRowNumber = val1 + 2;
        let IEDat1stColoum = "A" + newRowNumber;
        worksheet.getCell(IEDat1stColoum).value = "Order Qty";
        worksheet.getCell(IEDat1stColoum).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "4167B8" },
          bgColor: { argb: "" },
        };
        worksheet.getCell(IEDat1stColoum).font = {
          bold: true,
          color: { argb: "FFFFFF" },
          size: 12,
        };

        let IEDat2ndColoum = "B" + newRowNumber;
        worksheet.getCell(IEDat2ndColoum).value = "PPM";
        worksheet.getCell(IEDat2ndColoum).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "4167B8" },
          bgColor: { argb: "" },
        };
        worksheet.getCell(IEDat2ndColoum).font = {
          bold: true,
          color: { argb: "FFFFFF" },
          size: 12,
        };

        let IEDat3rdColoum = "C" + newRowNumber;
        worksheet.getCell(IEDat3rdColoum).value = "SMV";
        worksheet.getCell(IEDat3rdColoum).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "4167B8" },
          bgColor: { argb: "" },
        };
        worksheet.getCell(IEDat3rdColoum).font = {
          bold: true,
          color: { argb: "FFFFFF" },
          size: 12,
        };

        let IEDat4thColoum = "D" + newRowNumber;
        worksheet.getCell(IEDat4thColoum).value = "Eff(%)";
        worksheet.getCell(IEDat4thColoum).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "4167B8" },
          bgColor: { argb: "" },
        };
        worksheet.getCell(IEDat4thColoum).font = {
          bold: true,
          color: { argb: "FFFFFF" },
          size: 12,
        };

        let IEDat5thColoum = "E" + newRowNumber;
        worksheet.getCell(IEDat5thColoum).value = "PRO/mc";
        worksheet.getCell(IEDat5thColoum).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "4167B8" },
          bgColor: { argb: "" },
        };
        worksheet.getCell(IEDat5thColoum).font = {
          bold: true,
          color: { argb: "FFFFFF" },
          size: 12,
        };

        let IEDat6thColoum = "F" + newRowNumber;
        worksheet.getCell(IEDat6thColoum).value = "CM/Dz";
        worksheet.getCell(IEDat6thColoum).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "4167B8" },
          bgColor: { argb: "" },
        };
        worksheet.getCell(IEDat6thColoum).font = {
          bold: true,
          color: { argb: "FFFFFF" },
          size: 12,
        };
      
      }

    }



    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, title + ".xlsx");
    });


  }

}