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
export class BestSellerCostingReportService {
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



  async exportExcel(excelData) {
    debugger
    const title = excelData.title;
    const allData = excelData.finallySubmitData;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(
      "Costing  Report"
    );
    const stockHeaderFabric = [
      "Item",
      "Supplier",
      "Description",
      "Price (USD) in Yds/Dz",
      "Consumption in Yds/Dz",
      "Unit",
      "Wastage (%)",
      "Total Cost",
    ];


    worksheet.mergeCells("A1", "H1");
    let companyRow = worksheet.getCell("A1");
    companyRow.value = "Snowtex Outerwear Ltd";
    companyRow.font = {
      name: "Calibri",
      size: 14,
      bold: true,
      color: { argb: "#ffff00" },
    };
    companyRow.alignment = { vertical: "middle", horizontal: "center" };


    worksheet.mergeCells("A2", "H2");
    let costRow = worksheet.getCell("A2");
    costRow.value = "Cost Sheet";
    costRow.font = {
      name: "Calibri",
      size: 14,
      bold: true,
      color: { argb: "#ffff00" },
    };
    costRow.alignment = { vertical: "middle", horizontal: "center" };


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
        worksheet.addImage(myLogoImage, 'I2:J7');
      }
    }


    let date = worksheet.getCell("A3");
    date.value = "Style ";
    date.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    };
    date.alignment = { vertical: "middle", horizontal: "left" };


    let dateValue = worksheet.getCell("B3");
    dateValue.value = new Date(partList[0].createDate);
    dateValue.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    };
    dateValue.alignment = { vertical: "middle", horizontal: "left" };



    let Buyer = worksheet.getCell("A4");
    Buyer.value = "Buyer ";
    Buyer.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    };
    Buyer.alignment = { vertical: "middle", horizontal: "left" };


    let BuyerValue = worksheet.getCell("B4");
    BuyerValue.value = partList[0].buyerName;
    BuyerValue.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    };
    BuyerValue.alignment = { vertical: "middle", horizontal: "left" };

    let Brand = worksheet.getCell("A5");
    Brand.value = "Brand ";
    Brand.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    };
    Brand.alignment = { vertical: "middle", horizontal: "left" };


    let BrandValue = worksheet.getCell("B5");
    BrandValue.value = partList[0].brandName;
    BrandValue.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    };
    BrandValue.alignment = { vertical: "middle", horizontal: "left" };

    let ItemDescription = worksheet.getCell("A6");
    ItemDescription.value = "ItemDescription ";
    ItemDescription.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    };
    ItemDescription.alignment = { vertical: "middle", horizontal: "left" };


    let ItemDescriptionValue = worksheet.getCell("B6");
    ItemDescriptionValue.value = partList[0].brandName;
    ItemDescriptionValue.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    };
    ItemDescriptionValue.alignment = { vertical: "middle", horizontal: "left" };

    let Style = worksheet.getCell("A7");
    Style.value = "Style Name ";
    Style.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    };
    Style.alignment = { vertical: "middle", horizontal: "left" };


    let StyleValue = worksheet.getCell("B7");
    StyleValue.value = partList[0].styleName;
    StyleValue.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    };
    StyleValue.alignment = { vertical: "middle", horizontal: "left" };

    worksheet.mergeCells("A8:H8")
    let FabricPartLable = worksheet.getCell("A8");
    FabricPartLable.value = "FABRIC";
    FabricPartLable.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "ffffffff" },
    };
    FabricPartLable.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ff92cddc" },
      bgColor: { argb: "" },
    }
    FabricPartLable.alignment = { vertical: "middle", horizontal: "left" };

    var fabricDataList = [];
    var accessoriesDataList = [];
    var lablesDataList = [];
    var packingDataList = [];
    var processDataList = [];

    var fabricDataListExcle = [];
    var accessoriesDataListExcle = [];
    var lablesDataListExcle = [];
    var packingDataListExcle = [];
    var processDataListExcle = [];


    fabricDataList = allData.filter(x => x.costCategoryGroup == "FABRICS" && x.stylePartId == partList[0].stylePartId);
    accessoriesDataList = allData.filter(x => x.costCategoryGroup == "ACCESSORIES" && x.stylePartId == partList[0].stylePartId);
    lablesDataList = allData.filter(x => x.costCategoryGroup == "LABELS" && x.stylePartId == partList[0].stylePartId);
    packingDataList = allData.filter(x => x.costCategoryGroup == "PACKING" && x.stylePartId == partList[0].stylePartId);
    processDataList = allData.filter(x => x.costCategoryGroup == "PROCESS" && x.stylePartId == partList[0].stylePartId);


    let headerRow = worksheet.addRow(stockHeaderFabric);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffbfbfbf" },
        bgColor: { argb: "" },
      };
      cell.font = {
        bold: true,
        color: { argb: "ff000000" },
        size: 12,
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.border = {
        top: { style: "medium" },
        left: { style: "medium" },
        bottom: { style: "medium" },
        right: { style: "medium" },
      };
    });


    var fabRowcount = 0
    var fabricFastRow = 9 + fabRowcount + 1;
    var fabricLastRow = 9 + fabRowcount + 1;
    for (var itemFab of fabricDataList) {
      var costrowCountitemFeb = 9 + fabRowcount + 1;
      let itemCell = "A" + costrowCountitemFeb;// row.getCell(1).address;
      worksheet.getCell(itemCell).value = itemFab.itemName;
      worksheet.getCell(itemCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let supplierCell = "B" + costrowCountitemFeb;// row.getCell(1).address;
      worksheet.getCell(supplierCell).value = itemFab.supplierName;
      worksheet.getCell(supplierCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let descriptionCell = "C" + costrowCountitemFeb;// row.getCell(1).address;
      worksheet.getCell(descriptionCell).value = itemFab.itemDescription;
      worksheet.getCell(descriptionCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let priceCell = "D" + costrowCountitemFeb;// row.getCell(1).address;
      worksheet.getCell(priceCell).value = itemFab.rate;
      worksheet.getCell(priceCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let consumptionCell = "E" + costrowCountitemFeb;// row.getCell(1).address;
      worksheet.getCell(consumptionCell).value = itemFab.consumption;
      worksheet.getCell(consumptionCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let unitCell = "F" + costrowCountitemFeb;// row.getCell(1).address;
      worksheet.getCell(unitCell).value = itemFab.unitName;
      worksheet.getCell(unitCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let wastageCell = "G" + costrowCountitemFeb;// row.getCell(1).address;
      worksheet.getCell(wastageCell).value = itemFab.wastagePercentage;
      worksheet.getCell(wastageCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }


   ////-------------- calclution start------------////
      var totalPrice = "";
      var totalPriceEuation = `(((E${costrowCountitemFeb} + (E${costrowCountitemFeb}*(G${costrowCountitemFeb}/100)))/  ${itemFab.marketRelation})*D${costrowCountitemFeb})`;
      if (itemFab.isFinCostPc == 1)
      {
          totalPrice = `ROUND(${totalPriceEuation} + ${totalPriceEuation}*(${itemFab.finCostPc}/100,4)`;
      }
      else
      {
          totalPrice = `ROUND(${totalPriceEuation} + ${itemFab.finCostPc} ,4)`;
      }
   ////-------------- calclution end ------------////
      let totalCell = "H" + costrowCountitemFeb;// row.getCell(1).address;
      worksheet.getCell(totalCell).value = null;
      worksheet.getCell(totalCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }
      
      worksheet.getCell(totalCell).value = {
        formula: totalPrice,
        date1904 : false
      }
      fabricLastRow = costrowCountitemFeb;
      fabRowcount++
    }


    var fabricTotalCount = 9 + fabRowcount + 1;
    if (fabricDataList.length > 0) {
      worksheet.mergeCells(`A${fabricTotalCount}:G${fabricTotalCount}`)
      let FabricTotalPartLable = worksheet.getCell(`A${fabricTotalCount}`);
      FabricTotalPartLable.value = "Total Fabric Value";
      FabricTotalPartLable.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "ff000000" },
      };
      FabricTotalPartLable.border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      FabricTotalPartLable.alignment = { vertical: "middle", horizontal: "right" };

      let FabricTotalPartValue = worksheet.getCell(`H${fabricTotalCount}`);
      FabricTotalPartValue.value = {
        formula: `SUM(H${fabricFastRow}:H${fabricLastRow})`,
        date1904: false
      };
      FabricTotalPartValue.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "ff000000" },
      };
      FabricTotalPartValue.border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }
    }

    var accessoriesHeaderCount = 9 + fabRowcount + 1 + 1;
    worksheet.mergeCells(`A${accessoriesHeaderCount}:H${accessoriesHeaderCount}`)
    let AccessoriesPartLable = worksheet.getCell(`A${accessoriesHeaderCount}`);
    AccessoriesPartLable.value = "ACCESSROIES & TRIMS";
    AccessoriesPartLable.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "ffffffff" },
    };
    AccessoriesPartLable.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ff92cddc" },
      bgColor: { argb: "" },
    }
    AccessoriesPartLable.alignment = { vertical: "middle", horizontal: "left" };




    var accsRowcount = 0
    var accsFastRow = 9 + fabRowcount + 1 + 2 + accsRowcount;
    var accesLastRow = 9 + fabRowcount + 1 + 2 + accsRowcount;
    for (var itemAcs of accessoriesDataList) {
      var costrowCountitemAccs = 9 + fabRowcount + 1 + 2 + accsRowcount;
      let itemCell = "A" + costrowCountitemAccs;// row.getCell(1).address;
      worksheet.getCell(itemCell).value = itemAcs.itemName;
      worksheet.getCell(itemCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let supplierCell = "B" + costrowCountitemAccs;// row.getCell(1).address;
      worksheet.getCell(supplierCell).value = itemAcs.supplierName;
      worksheet.getCell(supplierCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let descriptionCell = "C" + costrowCountitemAccs;// row.getCell(1).address;
      worksheet.getCell(descriptionCell).value = itemAcs.itemDescription;
      worksheet.getCell(descriptionCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let priceCell = "D" + costrowCountitemAccs;// row.getCell(1).address;
      worksheet.getCell(priceCell).value = itemAcs.rate;
      worksheet.getCell(priceCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let consumptionCell = "E" + costrowCountitemAccs;// row.getCell(1).address;
      worksheet.getCell(consumptionCell).value = itemAcs.consumption;
      worksheet.getCell(consumptionCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let unitCell = "F" + costrowCountitemAccs;// row.getCell(1).address;
      worksheet.getCell(unitCell).value = itemAcs.unitName;
      worksheet.getCell(unitCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let wastageCell = "G" + costrowCountitemAccs;// row.getCell(1).address;
      worksheet.getCell(wastageCell).value = itemAcs.wastagePercentage;
      worksheet.getCell(wastageCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }


         ////-------------- calclution start------------////
         var totalPrice = "";
         var totalPriceEuation = `(((E${costrowCountitemAccs} + (E${costrowCountitemAccs}*(G${costrowCountitemAccs}/100)))/  ${itemAcs.marketRelation})*D${costrowCountitemAccs})`;
         if (itemAcs.isFinCostPc == 1)
         {
             totalPrice = `ROUND(${totalPriceEuation} + ${totalPriceEuation}*(${itemAcs.finCostPc}/100,4)`;
         }
         else
         {
             totalPrice = `ROUND(${totalPriceEuation} + ${itemAcs.finCostPc} ,4)`;
         }
      ////-------------- calclution end ------------////

      let totalCell = "H" + costrowCountitemAccs;// row.getCell(1).address;
      worksheet.getCell(totalCell).value = null;
      worksheet.getCell(totalCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      worksheet.getCell(totalCell).value = {
        formula: totalPrice,
        date1904 : false
      }

      accesLastRow = costrowCountitemAccs;
      accsRowcount++
    }


    var accessoriesTotalCount = 9 + fabRowcount + 1 + 2 + accsRowcount;
    if (accessoriesDataList.length > 0) {
      worksheet.mergeCells(`A${accessoriesTotalCount}:G${accessoriesTotalCount}`)
      let AccessoriesTotalPartLable = worksheet.getCell(`A${accessoriesTotalCount}`);
      AccessoriesTotalPartLable.value = "Total  Value";
      AccessoriesTotalPartLable.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "ff000000" },
      };
      AccessoriesTotalPartLable.border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      AccessoriesTotalPartLable.alignment = { vertical: "middle", horizontal: "right" };

      let AccessoriesTotalPartValue = worksheet.getCell(`H${accessoriesTotalCount}`);
      AccessoriesTotalPartValue.value = {
        formula: `SUM(H${accsFastRow}:H${accesLastRow})`,
        date1904: false
      };
      AccessoriesTotalPartValue.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "ff000000" },
      };
      AccessoriesTotalPartValue.border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }
    }


    debugger
    var lablesHeaderCount = 9 + fabRowcount + 1 + 2 + accsRowcount + 1;
    worksheet.mergeCells(`A${lablesHeaderCount}:H${lablesHeaderCount}`)
    let LablesAccessoriesPartLable = worksheet.getCell(`A${lablesHeaderCount}`);
    LablesAccessoriesPartLable.value = "LABELS HANGTAG";
    LablesAccessoriesPartLable.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "ffffffff" },
    };
    LablesAccessoriesPartLable.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ff92cddc" },
      bgColor: { argb: "" },
    }
    LablesAccessoriesPartLable.alignment = { vertical: "middle", horizontal: "left" };

    var lableRowcount = 0
    var lableFastRow = 9 + fabRowcount + 1 + 2 + accsRowcount + 2 + lableRowcount;
    var lableLastRow = 9 + fabRowcount + 1 + 2 + accsRowcount + 2 + lableRowcount;
    for (var itemLable of lablesDataList) {
      var costrowCountitemLable = 9 + fabRowcount + 1 + 2 + accsRowcount + 2 + lableRowcount;
      let itemCell = "A" + costrowCountitemLable;// row.getCell(1).address;
      worksheet.getCell(itemCell).value = itemLable.itemName;
      worksheet.getCell(itemCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let supplierCell = "B" + costrowCountitemLable;// row.getCell(1).address;
      worksheet.getCell(supplierCell).value = itemLable.supplierName;
      worksheet.getCell(supplierCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let descriptionCell = "C" + costrowCountitemLable;// row.getCell(1).address;
      worksheet.getCell(descriptionCell).value = itemLable.itemDescription;
      worksheet.getCell(descriptionCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let priceCell = "D" + costrowCountitemLable;// row.getCell(1).address;
      worksheet.getCell(priceCell).value = itemLable.rate;
      worksheet.getCell(priceCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let consumptionCell = "E" + costrowCountitemLable;// row.getCell(1).address;
      worksheet.getCell(consumptionCell).value = itemLable.consumption;
      worksheet.getCell(consumptionCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let unitCell = "F" + costrowCountitemLable;// row.getCell(1).address;
      worksheet.getCell(unitCell).value = itemLable.unitName;
      worksheet.getCell(unitCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let wastageCell = "G" + costrowCountitemLable;// row.getCell(1).address;
      worksheet.getCell(wastageCell).value = itemLable.wastagePercentage;
      worksheet.getCell(wastageCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

       ////-------------- calclution start------------////
       var totalPrice = "";
       var totalPriceEuation = `(((E${costrowCountitemLable} + (E${costrowCountitemLable}*(G${costrowCountitemLable}/100)))/  ${itemLable.marketRelation})*D${costrowCountitemLable})`;
       if (itemLable.isFinCostPc == 1)
       {
           totalPrice = `ROUND(${totalPriceEuation} + ${totalPriceEuation}*(${itemLable.finCostPc}/100,4)`;
       }
       else
       {
           totalPrice = `ROUND(${totalPriceEuation} + ${itemLable.finCostPc} ,4)`;
       }
    ////-------------- calclution end ------------////

      let totalCell = "H" + costrowCountitemLable;// row.getCell(1).address;
      worksheet.getCell(totalCell).value = null;
      worksheet.getCell(totalCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }
      
      worksheet.getCell(totalCell).value = {
        formula: totalPrice,
        date1904 : false
      }
      lableLastRow = costrowCountitemLable;
      accsRowcount++
    }


    var lablesTotalCount = 9 + fabRowcount + 1 + 2 + accsRowcount + 2 + lableRowcount;
    if (lablesDataList.length > 0) {
      worksheet.mergeCells(`A${lablesTotalCount}:G${lablesTotalCount}`)
      let LableTotalPartLable = worksheet.getCell(`A${lablesTotalCount}`);
      LableTotalPartLable.value = "Total  Value";
      LableTotalPartLable.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "ff000000" },
      };
      LableTotalPartLable.border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      LableTotalPartLable.alignment = { vertical: "middle", horizontal: "right" };

      let LableTotalPartValue = worksheet.getCell(`H${lablesTotalCount}`);
      LableTotalPartValue.value = {
        formula: `SUM(H${lableFastRow}:H${lableLastRow})`,
        date1904: false
      };
      LableTotalPartValue.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "ff000000" },
      };
      LableTotalPartValue.border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }
    }

    var packingHeaderCount = 9 + fabRowcount + 1 + 2 + accsRowcount + 2 + lableRowcount + 1;
    worksheet.mergeCells(`A${packingHeaderCount}:H${packingHeaderCount}`)
    let PackingAccessoriesPartLable = worksheet.getCell(`A${packingHeaderCount}`);
    PackingAccessoriesPartLable.value = "PACKING ITEMS";
    PackingAccessoriesPartLable.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "ffffffff" },
    };
    PackingAccessoriesPartLable.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ff92cddc" },
      bgColor: { argb: "" },
    }
    PackingAccessoriesPartLable.alignment = { vertical: "middle", horizontal: "left" };


    var packingRowcount = 0
    var packingFastRow = 9 + fabRowcount + 1 + 2 + accsRowcount + 2 + lableRowcount + 2 + packingRowcount;
    var packingLastRow = 9 + fabRowcount + 1 + 2 + accsRowcount + 2 + lableRowcount + 2 + packingRowcount;
    for (var itemPacking of packingDataList) {
      var costrowCountitemPacking = 9 + fabRowcount + 1 + 2 + accsRowcount + 2 + lableRowcount + 2 + packingRowcount;
      let itemCell = "A" + costrowCountitemPacking;// row.getCell(1).address;
      worksheet.getCell(itemCell).value = itemPacking.itemName;
      worksheet.getCell(itemCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let supplierCell = "B" + costrowCountitemPacking;// row.getCell(1).address;
      worksheet.getCell(supplierCell).value = itemPacking.supplierName;
      worksheet.getCell(supplierCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let descriptionCell = "C" + costrowCountitemPacking;// row.getCell(1).address;
      worksheet.getCell(descriptionCell).value = itemPacking.itemDescription;
      worksheet.getCell(descriptionCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let priceCell = "D" + costrowCountitemPacking;// row.getCell(1).address;
      worksheet.getCell(priceCell).value = itemPacking.rate;
      worksheet.getCell(priceCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let consumptionCell = "E" + costrowCountitemPacking;// row.getCell(1).address;
      worksheet.getCell(consumptionCell).value = itemPacking.consumption;
      worksheet.getCell(consumptionCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let unitCell = "F" + costrowCountitemPacking;// row.getCell(1).address;
      worksheet.getCell(unitCell).value = itemPacking.unitName;
      worksheet.getCell(unitCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let wastageCell = "G" + costrowCountitemPacking;// row.getCell(1).address;
      worksheet.getCell(wastageCell).value = itemPacking.wastagePercentage;
      worksheet.getCell(wastageCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

         ////-------------- calclution start------------////
         var totalPrice = "";
         var totalPriceEuation = `(((E${costrowCountitemPacking} + (E${costrowCountitemPacking}*(G${costrowCountitemPacking}/100)))/  ${itemPacking.marketRelation})*D${costrowCountitemPacking})`;
         if (itemPacking.isFinCostPc == 1)
         {
             totalPrice = `ROUND(${totalPriceEuation} + ${totalPriceEuation}*(${itemPacking.finCostPc}/100,4)`;
         }
         else
         {
             totalPrice = `ROUND(${totalPriceEuation} + ${itemPacking.finCostPc} ,4)`;
         }
      ////-------------- calclution end ------------////

      let totalCell = "H" + costrowCountitemPacking;// row.getCell(1).address;
      worksheet.getCell(totalCell).value = null;
      worksheet.getCell(totalCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      worksheet.getCell(totalCell).value = {
        formula: totalPrice,
        date1904 : false
      }

      packingLastRow = costrowCountitemPacking;
      packingRowcount++
    }


    var packingTotalCount = 9 + fabRowcount + 1 + 2 + accsRowcount + 2 + lableRowcount + 2 + packingRowcount;
    if (packingDataList.length > 0) {
      worksheet.mergeCells(`A${packingTotalCount}:G${packingTotalCount}`)
      let PackingTotalPartLable = worksheet.getCell(`A${packingTotalCount}`);
      PackingTotalPartLable.value = "Total  Value";
      PackingTotalPartLable.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "ff000000" },
      };
      PackingTotalPartLable.border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      PackingTotalPartLable.alignment = { vertical: "middle", horizontal: "right" };

      let PackingTotalPartValue = worksheet.getCell(`H${packingTotalCount}`);
      PackingTotalPartValue.value = {
        formula: `SUM(H${packingFastRow}:H${packingLastRow})`,
        date1904: false
      };
      PackingTotalPartValue.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "ff000000" },
      };
      PackingTotalPartValue.border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }
    }

    var processHeaderCount = 9 + fabRowcount + 1 + 2 + accsRowcount + 2 + lableRowcount + 2 + packingRowcount + 1;
    worksheet.mergeCells(`A${processHeaderCount}:H${processHeaderCount}`)
    let ProcessAccessoriesPartLable = worksheet.getCell(`A${processHeaderCount}`);
    ProcessAccessoriesPartLable.value = "OTHERS: EMBROIDERY, QUILT, TEST";
    ProcessAccessoriesPartLable.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "ffffffff" },
    };
    ProcessAccessoriesPartLable.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ff92cddc" },
      bgColor: { argb: "" },
    }
    ProcessAccessoriesPartLable.alignment = { vertical: "middle", horizontal: "left" };


    var processRowcount = 0
    var processFastRow = 9 + fabRowcount + 1 + 2 + accsRowcount + 2 + lableRowcount + 2 +packingRowcount + 2 + processRowcount;
    var processLastRow = 9 + fabRowcount + 1 + 2 + accsRowcount + 2 + lableRowcount + 2 + packingRowcount + 2 + processRowcount;
    for (var itemProcess of processDataList) {
      var costrowCountitemProess = 9 + fabRowcount + 1 + 2 + accsRowcount + 2 + lableRowcount + 2 + packingRowcount + 2 + processRowcount;
      let itemCell = "A" + costrowCountitemProess;// row.getCell(1).address;
      worksheet.getCell(itemCell).value = itemProcess.itemName;
      worksheet.getCell(itemCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let supplierCell = "B" + costrowCountitemProess;// row.getCell(1).address;
      worksheet.getCell(supplierCell).value = itemProcess.supplierName;
      worksheet.getCell(supplierCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let descriptionCell = "C" + costrowCountitemProess;// row.getCell(1).address;
      worksheet.getCell(descriptionCell).value = itemProcess.itemDescription;
      worksheet.getCell(descriptionCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let priceCell = "D" + costrowCountitemProess;// row.getCell(1).address;
      worksheet.getCell(priceCell).value = itemProcess.rate;
      worksheet.getCell(priceCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let consumptionCell = "E" + costrowCountitemProess;// row.getCell(1).address;
      worksheet.getCell(consumptionCell).value = itemProcess.consumption;
      worksheet.getCell(consumptionCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let unitCell = "F" + costrowCountitemProess;// row.getCell(1).address;
      worksheet.getCell(unitCell).value = itemProcess.unitName;
      worksheet.getCell(unitCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      let wastageCell = "G" + costrowCountitemProess;// row.getCell(1).address;
      worksheet.getCell(wastageCell).value = itemProcess.wastagePercentage;
      worksheet.getCell(wastageCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }
    

         ////-------------- calclution start------------////
         var totalPrice = "";
         var totalPriceEuation = `(((E${costrowCountitemProess} + (E${costrowCountitemProess}*(G${costrowCountitemProess}/100)))/  ${itemProcess.marketRelation})*D${costrowCountitemProess})`;
         if (itemProcess.isFinCostPc == 1)
         {
             totalPrice = `ROUND(${totalPriceEuation} + ${totalPriceEuation}*(${itemProcess.finCostPc}/100,4)`;
         }
         else
         {
             totalPrice = `ROUND(${totalPriceEuation} + ${itemProcess.finCostPc} ,4)`;
         }
      ////-------------- calclution end ------------////
      

      let totalCell = "H" + costrowCountitemProess;// row.getCell(1).address;
      worksheet.getCell(totalCell).value = null;
      worksheet.getCell(totalCell).border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      worksheet.getCell(totalCell).value = {
        formula: totalPrice,
        date1904 : false
      }

      processLastRow = costrowCountitemProess;
      processRowcount++
    }


      var proceeTotalCount = 9 + fabRowcount + 1 + 2 + accsRowcount + 2 + lableRowcount + 2 + packingRowcount + 2 + processRowcount;
      if( processDataList.length > 0){
      worksheet.mergeCells(`A${proceeTotalCount}:G${proceeTotalCount}`)
      let ProcessTotalPartLable = worksheet.getCell(`A${proceeTotalCount}`);
      ProcessTotalPartLable.value = "Total  Value";
      ProcessTotalPartLable.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "ff000000" },
      };
      ProcessTotalPartLable.border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }

      ProcessTotalPartLable.alignment = { vertical: "middle", horizontal: "right" };
  
      let ProcessTotalPartValue = worksheet.getCell(`H${proceeTotalCount}`);
      ProcessTotalPartValue.value = {
        formula:`SUM(H${processFastRow}:H${processLastRow})`,
        date1904: false
      };
      ProcessTotalPartValue.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "ff000000" },
      };
      ProcessTotalPartValue.border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }
    }

    var moqRowCount = 9 + fabRowcount + 1 + 2 + accsRowcount + 2 + lableRowcount + 2 + packingRowcount + 2 + processRowcount + 1;
    var smvRowCount = 9 + fabRowcount + 1 + 2 + accsRowcount + 2 + lableRowcount + 2 + packingRowcount + 2 + processRowcount + 2;
    var ppmRowCount = 9 + fabRowcount + 1 + 2 + accsRowcount + 2 + lableRowcount + 2 + packingRowcount + 2 + processRowcount + 3;
    var effecincyRowCount = 9 + fabRowcount + 1 + 2 + accsRowcount + 2 + lableRowcount + 2 + packingRowcount + 2 + processRowcount + 4;
    var cmPcRowCount = 9 + fabRowcount + 1 + 2 + accsRowcount + 2 + lableRowcount + 2 + packingRowcount + 2 + processRowcount + 5;
    var cmDzRowCount = 9 + fabRowcount + 1 + 2 + accsRowcount + 2 + lableRowcount + 2 + packingRowcount + 2 + processRowcount + 6;
    var productinLineRowCount = 9 + fabRowcount + 1 + 2 + accsRowcount + 2 + lableRowcount + 2 + packingRowcount + 2 + processRowcount + 7;

    let MoqLable = worksheet.getCell(`A${moqRowCount}`);
    MoqLable.value = "MOQ";
    // MoqLable.font = {
    //   name: "Calibri",
    //   size: 12,
    //   bold: true,
    //   color: { argb: "ff000000" },
    // };
    MoqLable.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }

    let MoqValue = worksheet.getCell(`B${moqRowCount}`);
    MoqValue.value = partList[0].moq;
    MoqValue.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "ff000000" },
    };
    MoqValue.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }

    worksheet.mergeCells(`C${moqRowCount}:G${moqRowCount}`);

    let CmLable = worksheet.getCell(`C${moqRowCount}`);
    CmLable.value = "CM";
    // CmLable.font = {
    //   name: "Calibri",
    //   size: 12,
    //   bold: true,
    //   color: { argb: "ff000000" },
    // };
    CmLable.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }

    let CmValue = worksheet.getCell(`H${moqRowCount}`);
    CmValue.value = {
      formula :`B${cmPcRowCount}`,
      date1904 : false
    };
    // CmValue.font = {
    //   name: "Calibri",
    //   size: 12,
    //   bold: true,
    //   color: { argb: "ff000000" },
    // };
    CmValue.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }



    let SmvLable = worksheet.getCell(`A${smvRowCount}`);
    SmvLable.value = "SMV";
    // SmvLable.font = {
    //   name: "Calibri",
    //   size: 12,
    //   bold: true,
    //   color: { argb: "ff000000" },
    // };
    SmvLable.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }

    let SmvValue = worksheet.getCell(`B${smvRowCount}`);
    SmvValue.value = partList[0].smv;
    SmvValue.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "ff000000" },
    };
    SmvValue.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }

    worksheet.mergeCells(`C${smvRowCount}:G${smvRowCount}`);

    let TotalCostLable = worksheet.getCell(`C${smvRowCount}`);
    TotalCostLable.value = "Total Cost";
    // TotalCostLable.font = {
    //   name: "Calibri",
    //   size: 12,
    //   bold: true,
    //   color: { argb: "ff000000" },
    // };
    TotalCostLable.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }

    let TotalCostValue = worksheet.getCell(`H${smvRowCount}`);
    TotalCostValue.value = {
      formula :`H${fabricTotalCount}+H${accessoriesTotalCount}+H${lablesTotalCount}+ H${packingTotalCount}+H${proceeTotalCount} + H${moqRowCount}`,
      date1904 : false
    };
    // TotalCostValue.font = {
    //   name: "Calibri",
    //   size: 12,
    //   bold: true,
    //   color: { argb: "ff000000" },
    // };
    TotalCostValue.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }
    




    let ppmLable = worksheet.getCell(`A${ppmRowCount}`);
    ppmLable.value = "PPM";
    // ppmLable.font = {
    //   name: "Calibri",
    //   size: 12,
    //   bold: true,
    //   color: { argb: "ff000000" },
    // };
    ppmLable.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }

    let ppmValue = worksheet.getCell(`B${ppmRowCount}`);
    ppmValue.value = partList[0].ppm;
    ppmValue.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "ff000000" },
    };
    ppmValue.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }

    worksheet.mergeCells(`C${ppmRowCount}:E${productinLineRowCount}`);

    let CommentsLable = worksheet.getCell(`C${ppmRowCount}`);
    CommentsLable.value = "Comments:";
    // CommentsLable.font = {
    //   name: "Calibri",
    //   size: 12,
    //   //bold: true,
    //   color: { argb: "ff000000" },
    // };
    CommentsLable.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }



    let CostPcLable = worksheet.getCell(`F${ppmRowCount}`);
    CostPcLable.value = "Cost/Pc";
    CostPcLable.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }

    let CostPcBlank = worksheet.getCell(`G${ppmRowCount}`);
    CostPcBlank.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }

    let CostPcValue = worksheet.getCell(`H${ppmRowCount}`);
    CostPcValue.value ={
      formula: `ROUND(H${smvRowCount},2)`,
      date1904: false
    };
    CostPcValue.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }

   
    let effecincyLable = worksheet.getCell(`A${effecincyRowCount}`);
    effecincyLable.value = "EFFECIENCY";
    // effecincyLable.font = {
    //   name: "Calibri",
    //   size: 12,
    //   bold: true,
    //   color: { argb: "ff000000" },
    // };
    effecincyLable.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }

    let effecincyValue = worksheet.getCell(`B${effecincyRowCount}`);
    effecincyValue.value = `${partList[0].efficency}%`;
    effecincyValue.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "ff000000" },
    };
    effecincyValue.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }


    let ComissionLable = worksheet.getCell(`F${effecincyRowCount}`);
    ComissionLable.value = "Comission";
    ComissionLable.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }
    debugger
    var totalComission = partList[0].localCommission + partList[0].commercialCommission + partList[0].buyingCommission;
    let ComissionPrecet = worksheet.getCell(`G${effecincyRowCount}`);
    ComissionPrecet.value = `${totalComission}%`; 
    ComissionPrecet.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }

    let ComissionValue = worksheet.getCell(`H${effecincyRowCount}`);
    ComissionValue.value ={
      formula: `ROUND(H${ppmRowCount}/((100-(G${effecincyRowCount}*100))/100),2)`,
      date1904: false
    };
    ComissionValue.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }

    

    let CmPcLable = worksheet.getCell(`A${cmPcRowCount}`);
    CmPcLable.value = "CM/Pc";
    // CmPcLable.font = {
    //   name: "Calibri",
    //   size: 12,
    //   bold: true,
    //   color: { argb: "ff000000" },
    // };
    CmPcLable.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }

    let CmPcValue = worksheet.getCell(`B${cmPcRowCount}`);
    CmPcValue.value = {
      formula:`ROUND((B${smvRowCount}*B${ppmRowCount})/B${effecincyRowCount},2)`,
      date1904: false
    };
    CmPcValue.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "ff000000" },
    };
    CmPcValue.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }


    let FobPcLable = worksheet.getCell(`F${cmPcRowCount}`);
    FobPcLable.value = "FobPc";
    FobPcLable.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }

    let FobPcPrecet = worksheet.getCell(`G${cmPcRowCount}`);
    FobPcPrecet.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }

    let FobPcValue = worksheet.getCell(`H${cmPcRowCount}`);
    FobPcValue.value ={
      formula: `H${effecincyRowCount}`,
      date1904: false
    };
    FobPcValue.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }
   

    let cmDzLable = worksheet.getCell(`A${cmDzRowCount}`);
    cmDzLable.value = "CM/Dz";
    // cmDzLable.font = {
    //   name: "Calibri",
    //   size: 12,
    //   bold: true,
    //   color: { argb: "ff000000" },
    // };
    cmDzLable.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }

    let CmDzValue = worksheet.getCell(`B${cmDzRowCount}`);
    CmDzValue.value = {
      formula:`ROUND(B${cmPcRowCount}*12,2)`,
      date1904: false
    };
    CmDzValue.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "ff000000" },
    };
    CmDzValue.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }


    let CmDzBalnkLable1 = worksheet.getCell(`F${cmDzRowCount}`);
    CmDzBalnkLable1.value = "";
    CmDzBalnkLable1.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffffff00" },
      bgColor: { argb: "" },
    }
    CmDzBalnkLable1.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }

    let CmDzBalnkLable2 = worksheet.getCell(`G${cmDzRowCount}`);
    CmDzBalnkLable2.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffffff00" },
      bgColor: { argb: "" },
    }
    CmDzBalnkLable2.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }

    let CmDzBalnkLable3 = worksheet.getCell(`H${cmDzRowCount}`);
    CmDzBalnkLable3.value = ""
    CmDzBalnkLable3.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffffff00" },
      bgColor: { argb: "" },
    }
    CmDzBalnkLable3.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }
    


    let PoedutionLable = worksheet.getCell(`A${productinLineRowCount}`);
    PoedutionLable.value = "Production/Daily/Line";
    // PoedutionLable.font = {
    //   name: "Calibri",
    //   size: 12,
    //   bold: true,
    //   color: { argb: "ff000000" },
    // };
    PoedutionLable.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }

    let ProductionValue = worksheet.getCell(`B${productinLineRowCount}`);
    ProductionValue.value = "";
    ProductionValue.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "ff000000" },
    };
    ProductionValue.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }


    let ProductionBalnkLable1 = worksheet.getCell(`F${productinLineRowCount}`);
    ProductionBalnkLable1.value = "Accept BuyertargetFOB price";
    ProductionBalnkLable1.font ={
      color: { argb: "ffff003a" }
    }
    ProductionBalnkLable1.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }

    let ProductionBalnkLable2 = worksheet.getCell(`G${productinLineRowCount}`);
    ProductionBalnkLable2.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }

    let ProductionBalnkLable3 = worksheet.getCell(`H${productinLineRowCount}`);
    ProductionBalnkLable3.value = ""
    ProductionBalnkLable3.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }

    worksheet.columns.forEach(function (column, i) {
      // debugger
      //if (i != 0 && i != 21) {
      var maxLength = 5;
      column["eachCell"]({ includeEmpty: false }, function (cell) {
        var columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : 22;
      //}
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, title + ".xlsx");
    });


  }

}