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
export class CostingComparisonService {
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



  async exportCostComerisonExcel(excelData) {
    debugger
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers;
    const data = excelData.data; // Fabric Data
    const data1 = excelData.data1; // Accessories Data
    const data2 = excelData.data2; // Cost Master Data
    const data3 = excelData.data3; // Cost Calculation Data
    const data4 = excelData.data4; // Cost Accessories Label Data
    const data5 = excelData.data5; // Cost Accessories Packging Data
    const data6 = excelData.data6; // Cost Accessories Process Data

    const dataP2 = excelData.dataP2; // Fabric Data
    const data1P2 = excelData.data1P2; // Accessories Data
    const data2P2 = excelData.data2P2; // Cost Master Data
    const data3P2 = excelData.data3P2; // Cost Calculation Data
    const data4P2 = excelData.data4P2; // Cost Accessories Label Data
    const data5P2 = excelData.data5P2; // Cost Accessories Packging Data
    const data6P2 = excelData.data6P2; // Cost Accessories Process Data

    const dataTwo = excelData.dataTwo; // Fabric Datea
    const dataTwo1 = excelData.dataTwo1; // Accessories Data
    const dataTwo2 = excelData.dataTwo2; // Cost Master Data
    const dataTwo3 = excelData.dataTwo3; // Cost Calculation Data
    const dataTwo4 = excelData.dataTwo4; // Cost Accessories Label Data
    const dataTwo5 = excelData.dataTwo5; // Cost Accessories Packging Data
    const dataTwo6 = excelData.dataTwo6; // Cost Accessories Process Data

    const dataTwoP2 = excelData.dataTwoP2; // Fabric Datea
    const dataTwo1P2 = excelData.dataTwo1P2; // Accessories Data
    const dataTwo2P2 = excelData.dataTwo2P2; // Cost Master Data
    const dataTwo3P2 = excelData.dataTwo3P2; // Cost Calculation Data
    const dataTwo4P2 = excelData.dataTwo4P2; // Cost Accessories Label Data
    const dataTwo5P2 = excelData.dataTwo5P2; // Cost Accessories Packging Data
    const dataTwo6P2 = excelData.dataTwo6P2; // Cost Accessories Process Data


    const dataThree = excelData.dataThree; // Fabric Datea
    const dataThree1 = excelData.dataThree1; // Accessories Data
    const dataThree4 = excelData.dataThree4; // Cost Accessories Label Data
    const dataThree5 = excelData.dataThree5; // Cost Accessories Packging Data
    const dataThree6 = excelData.dataThree6; // Cost Accessories Process Data

    const dataThreeP2 = excelData.dataThreeP2; // Fabric Datea
    const dataThree1P2 = excelData.dataThree1P2; // Accessories Data
    const dataThree4P2 = excelData.dataThree4P2; // Cost Accessories Label Data
    const dataThree5P2 = excelData.dataThree5P2; // Cost Accessories Packging Data
    const dataThree6P2 = excelData.dataThree6P2; // Cost Accessories Process Data

    // console.log("first fabric", data);
    // console.log("2nd fabric", dataTwo);
    // console.log("3rd fabric", dataThree);

    debugger
    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Costing Data Sheet");
    const fabricHeader = [
      "Category",
      "Component/Item",
      "Description",
      "ST Code",
      "Item Placement",
      "Item Code",
      "Nomination Status",
      "Supplier",
      "Country",
      "Cutt Able Width",
      "UoM",
      "Consumption",
      "Market Unit",
      "Con. Value",
      "Price",
      "Price Mood Name",
      "Wastage Percentage",
      "Fin Cost",
      "%",
      "Value",
      "Comment",
    ];
    const AccessoriesHeader = [
      "Category",
      "Component/Item",
      "Description",
      "St Code",
      "Placement ",
      "Ref.Code",
      "Nomination Status",
      "Supplier",
      "Country",
      "UoM",
      "Consumption",
      "Wastage Percentage",
      "Market Unit",
      "Con. Value",
      "Price",
      "FinCost",
      "%",
      "Value",
      "Comment",
    ];
    const LabelHeader = [
      "Category",
      "Component/Item",
      "Description",
      "St Code",
      "Placement ",
      "Ref.Code",
      "Nomination Status",
      "Supplier",
      "Country",
      "UoM",
      "Consumption",
      "Wastage Percentage",
      "Market Unit",
      "Con. Value",
      "Price",
      "FinCost",
      "%",
      "Value",
      "Comment",
    ];
    const PackgingHeader = [
      "Category",
      "Component/Item",
      "Description",
      "St Code",
      "Placement ",
      "Ref.Code",
      "Nomination Status",
      "Supplier",
      "Country",
      "UoM",
      "Consumption",
      "Wastage Percentage",
      "Market Unit",
      "Con. Value",
      "Price",
      "FinCost",
      "%",
      "Value",
      "Comment",
    ];
    const ProcessHeader = [
      "Process",
      "Ref(Where Applicable)",
      "Description",
      "St Code",
      "Placement ",
      "Ref.Code",
      "Nomination Status",
      "Supplier",
      "Country",
      "UoM",
      "Consumption",
      "Wastage Percentage",
      "Market Unit",
      "Con. Value",
      "Price",
      "FinCost",
      "%",
      "Value",
      "Comment",
    ];

    worksheet.mergeCells("A1", "C1");
    let titleRow = worksheet.getCell("A1");
    titleRow.value = title;
    titleRow.font = {
      name: "Calibri",
      size: 16,
      underline: "single",
      bold: true,
      color: { argb: "0085A3" },
    };
    titleRow.alignment = { vertical: "middle", horizontal: "center" };

    let part = worksheet.getCell("A2");
    part.value = "Part Name";

    let partValue = worksheet.getCell("B2");
    partValue.value = data2[0].partName;
    // Create 2 blank row
    worksheet.addRow([]);
    worksheet.addRow([]);

    // add Buyer Info Title
    // let buyerTitle = worksheet.getCell("A4");
    // buyerTitle.value = "Buyer Info";
    // buyerTitle.font = {
    //   name: "Calibri",
    //   size: 15,
    //   underline: "single",
    //   bold: true,
    //   color: { argb: "0085A3" },
    // };
    // Buyer for Label
    // let date = worksheet.getCell("A5");
    // date.value = "Date";
    // date.font = { bold: true };
    // let buyerName = worksheet.getCell("A6");
    // buyerName.value = "Buyer";
    // buyerName.font = { bold: true };
    // let dgnRef = worksheet.getCell("A7");
    // dgnRef.value = "Design Reference";
    // dgnRef.font = { bold: true };
    // let department = worksheet.getCell("A8");
    // department.value = "Department";
    // department.font = { bold: true };
    // let cPerson = worksheet.getCell("A9");
    // cPerson.value = "Contact Person";
    // cPerson.font = { bold: true };
    // let factory = worksheet.getCell("A10");
    // factory.value = "Factory";
    // factory.font = { bold: true };
    // let styleRef = worksheet.getCell("A11");
    // styleRef.value = "Style Reference";
    // styleRef.font = { bold: true };

    // // Buyer Value
    // let dateValue = worksheet.getCell("B5");
    // dateValue.value = data2.initialDate;
    // let buyerNameValue = worksheet.getCell("B6");
    // buyerNameValue.value = data2.buyerName;
    // let buyerDesignValue = worksheet.getCell("B7");
    // buyerDesignValue.value = data2.buyerDesign;
    // let deptNameValue = worksheet.getCell("B8");
    // deptNameValue.value = data2.deptName;
    // let buyerCPValue = worksheet.getCell("B9");
    // buyerCPValue.value = data2.buyerCP;
    // let branchOfficeNameValue = worksheet.getCell("B10");
    // branchOfficeNameValue.value = data2.branchOfficeName;
    // let styleNoValue = worksheet.getCell("B11");
    // styleNoValue.value = data2.styleNo;

    // add Style Info Title
    // let styleTitle = worksheet.getCell("D4");
    // styleTitle.value = "Style Info";
    // styleTitle.font = {
    //   name: "Calibri",
    //   size: 15,
    //   underline: "single",
    //   bold: true,
    //   color: { argb: "0085A3" },
    // };
    // Style for Label
    // let style = worksheet.getCell("D5");
    // style.value = "Style";
    // style.font = { bold: true };
    // let styleDes = worksheet.getCell("D6");
    // styleDes.value = "Style Description";
    // styleDes.font = { bold: true };
    // let gmtItem = worksheet.getCell("D7");
    // gmtItem.value = "GMT Item";
    // gmtItem.font = { bold: true };
    // let season = worksheet.getCell("D8");
    // season.value = "Season";
    // season.font = { bold: true };
    // let brand = worksheet.getCell("D9");
    // brand.value = "Brand";
    // brand.font = { bold: true };
    // let sizeRange = worksheet.getCell("D10");
    // sizeRange.value = "Size Range";
    // sizeRange.font = { bold: true };
    // let costingSize = worksheet.getCell("D11");
    // costingSize.value = "Costing Size";
    // costingSize.font = { bold: true };

    // let option = worksheet.getCell("G5");
    // option.value = "Option";
    // option.font = { bold: true };
    // let color = worksheet.getCell("G6");
    // color.value = "Color";
    // color.font = { bold: true };
    // let ofColor = worksheet.getCell("G7");
    // ofColor.value = "Of Color";
    // ofColor.font = { bold: true };

    // // Style Value
    // let styleValue = worksheet.getCell("E5");
    // styleValue.value = data2.styleName;
    // let styleDesValue = worksheet.getCell("E6");
    // styleDesValue.value = data2.description;
    // let gmtItemValue = worksheet.getCell("E7");
    // gmtItemValue.value = data2.item;
    // let seasonValue = worksheet.getCell("E8");
    // seasonValue.value = data2.seasonName;
    // let brandValue = worksheet.getCell("E9");
    // brandValue.value = data2.brandName;
    // let sizeRangeValue = worksheet.getCell("E10");
    // sizeRangeValue.value = data2.sizeRange;
    // let costingSizeValue = worksheet.getCell("E11");
    // costingSizeValue.value = data2.costSize;

    // let optionValue = worksheet.getCell("H5");
    // optionValue.value = data2.costOption;
    // let colorValue = worksheet.getCell("H6");
    // colorValue.value = data2.colorType;
    // let ofColorValue = worksheet.getCell("H7");
    // ofColorValue.value = data2.noOfColor;

    // add Commission Title
    // let commissionTitle = worksheet.getCell("J4");
    // commissionTitle.value = "Finance";
    // commissionTitle.font = {
    //   name: "Calibri",
    //   size: 15,
    //   underline: "single",
    //   bold: true,
    //   color: { argb: "0085A3" },
    // };
    // //Label  for Commission
    // let sMood = worksheet.getCell("J5");
    // sMood.value = "Shipped Mood";
    // sMood.font = { bold: true };
    // let currency = worksheet.getCell("J6");
    // currency.value = "Currency";
    // currency.font = { bold: true };
    // let foreign = worksheet.getCell("J7");
    // foreign.value = "Foreign(%)";
    // foreign.font = { bold: true };
    // let local = worksheet.getCell("J8");
    // local.value = "Local(%)";
    // local.font = { bold: true };
    // let special = worksheet.getCell("J9");
    // special.value = "Special(%)";
    // special.font = { bold: true };
    // let moq = worksheet.getCell("J10");
    // moq.value = "MOQ";
    // moq.font = { bold: true };
    // let mcq = worksheet.getCell("J11");
    // mcq.value = "MCQ";
    // mcq.font = { bold: true };

    // // Commission Value
    // let sMoodValue = worksheet.getCell("K5");
    // sMoodValue.value = data2.shippedTypeName;
    // let currencyValue = worksheet.getCell("K6");
    // currencyValue.value = data2.currencyName;
    // let foreignValue = worksheet.getCell("K7");
    // foreignValue.value = data2.foreignCommPc;
    // let localValue = worksheet.getCell("K8");
    // localValue.value = data2.localCommPc;
    // let specialValue = worksheet.getCell("K9");
    // specialValue.value = data2.specialCommPc;
    // let moqValue = worksheet.getCell("K10");
    // moqValue.value = data2.moq;
    // let mcqValue = worksheet.getCell("K11");
    // mcqValue.value = data2.mcq;

    // add CM Title
    // let cmTitle = worksheet.getCell("M4");
    // cmTitle.value = "CM";
    // cmTitle.font = {
    //   name: "Calibri",
    //   size: 15,
    //   underline: "single",
    //   bold: true,
    //   color: { argb: "0085A3" },
    // };
    //Label  for CM
    // let cpm = worksheet.getCell("M5");
    // cpm.value = "CPM";
    // let ppm = worksheet.getCell("M6");
    // ppm.value = "PPM";
    // ppm.font = { bold: true };
    // let smv = worksheet.getCell("M7");
    // smv.value = "SMV";
    // smv.font = { bold: true };
    // let effiency = worksheet.getCell("M8");
    // effiency.value = "Effciency(%)";
    // effiency.font = { bold: true };
    // let cmpc = worksheet.getCell("M9");
    // cmpc.value = "CM/PC";
    // cmpc.font = { bold: true };
    // let fobpc = worksheet.getCell("M10");
    // fobpc.value = "FOB/PC";
    // fobpc.font = { bold: true };
    // let targetFob = worksheet.getCell("M11");
    // targetFob.value = "Target FOB";
    // targetFob.font = { bold: true };
    // let pqty = worksheet.getCell("M12");
    // pqty.value = "Proposed Qty";
    // pqty.font = { bold: true };

    // // CM Value
    // let cpmValue = worksheet.getCell("N5");
    // cpmValue.value = data2.cpm;
    // let ppmValue = worksheet.getCell("N6");
    // ppmValue.value = data2.ppm;
    // let smvValue = worksheet.getCell("N7");
    // smvValue.value = data2.smv;
    // let effiencyValue = worksheet.getCell("N8");
    // effiencyValue.value = data2.efficency;
    // let cmpcValue = worksheet.getCell("N9");
    // cmpcValue.value = data2.cmPC;
    // let fobpcValue = worksheet.getCell("N10");
    // fobpcValue.value = data3.fobPc;
    // let targetFobValue = worksheet.getCell("N11");
    // targetFobValue.value = data2.targetFOB;
    // let pqtyValue = worksheet.getCell("N12");
    // pqtyValue.value = data2.poq;

    // add Summary Title
    // let summaryTitle = worksheet.getCell("P4");
    // summaryTitle.value = "Summary";
    // summaryTitle.font = {
    //   name: "Calibri",
    //   size: 15,
    //   underline: "single",
    //   bold: true,
    //   color: { argb: "0085A3" },
    // };

    //Label  for Summary
    // let blankTitle = worksheet.getCell("P5");
    // blankTitle.value = "";
    // let mCost = worksheet.getCell("P6");
    // mCost.value = "Material Cost";
    // mCost.font = { bold: true };
    // let cm = worksheet.getCell("P7");
    // cm.value = "CM";
    // cm.font = { bold: true };
    // let factoryCost = worksheet.getCell("P8");
    // factoryCost.value = "Factory Cost";
    // factoryCost.font = { bold: true };
    // let profit = worksheet.getCell("P9");
    // profit.value = "Profit";
    // profit.font = { bold: true };
    // let commission = worksheet.getCell("P10");
    // commission.value = "Commission(%)";
    // commission.font = { bold: true };
    // let others = worksheet.getCell("P11");
    // others.value = "Others";
    // others.font = { bold: true };
    // let netFOB = worksheet.getCell("P12");
    // netFOB.value = "Net FOB";
    // netFOB.font = { bold: true };

    // // Summary Value for Percentage
    // let percentageTitle = worksheet.getCell("Q5");
    // percentageTitle.value = "%";
    // percentageTitle.alignment = { vertical: "middle", horizontal: "center" };
    // let mCostValue = worksheet.getCell("Q6");
    // mCostValue.value = data3.metarialCostPercentage;
    // let cmValue = worksheet.getCell("Q7");
    // cmValue.value = data3.finalCMPercentage;
    // let factoryCostValue = worksheet.getCell("Q8");
    // factoryCostValue.value = data3.factorialCostPercentage;
    // factoryCostValue.font = {bold: true,color: { argb: "0085A3" }};
    // let profitValue = worksheet.getCell("Q9");
    // profitValue.value = data2.surPlusPercentage;
    // profitValue.font = {bold: true,color: { argb: "0085A3" }};
    // let commissionValue = worksheet.getCell("Q10");
    // commissionValue.value = data3.finalCommissionPercentage;
    // let othersValue = worksheet.getCell("Q11");
    // othersValue.value = data3.othersPercentage;
    // let netFOBValue = worksheet.getCell("Q12");
    // netFOBValue.value = "";

    // Summary Value for Piece
    // let pieceTitle = worksheet.getCell("R5");
    // pieceTitle.value = "Pc";
    // pieceTitle.alignment = { vertical: "middle", horizontal: "center" };
    // let mCostValue1 = worksheet.getCell("R6");
    // mCostValue1.value = data3.metarialCostPc;
    // let cmValue1 = worksheet.getCell("R7");
    // cmValue1.value = data3.finalCMPc;
    // let factoryCostValue1 = worksheet.getCell("R8");
    // factoryCostValue1.value = data3.factorialCostPc;
    // factoryCostValue1.font = {bold: true, color: { argb: "0085A3" }};
    // let profitValue1 = worksheet.getCell("R9");
    // profitValue1.value = data3.surPlusPc;
    // profitValue1.font = {bold: true,color: { argb: "0085A3" }};
    // let commissionValue1 = worksheet.getCell("R10");
    // commissionValue1.value = data3.finalCommissionPc;
    // let othersValue1 = worksheet.getCell("R11");
    // othersValue1.value = data2.otherPc;
    // let netFOBValue1 = worksheet.getCell("R12");
    // netFOBValue1.value = data3.netFOBPc;

    // // Summary Value for Dozen
    // let dozenTitle = worksheet.getCell("S5");
    // dozenTitle.value = "Dz";
    // dozenTitle.alignment = { vertical: "middle", horizontal: "center" };
    // let mCostValue2 = worksheet.getCell("S6");
    // mCostValue2.value = data3.metarialCost;
    // let cmValue2 = worksheet.getCell("S7");
    // cmValue2.value = data3.finalCMDZ;
    // let factoryCostValue2 = worksheet.getCell("S8");
    // factoryCostValue2.value = data3.factorialCostDz;
    // factoryCostValue2.font = {bold: true, color: { argb: "0085A3" }};
    // let profitValue2 = worksheet.getCell("S9");
    // profitValue2.value = data3.surPlus;
    // profitValue2.font = {bold: true, color: { argb: "0085A3" }};
    // let commissionValue2 = worksheet.getCell("S10");
    // commissionValue2.value = data3.finalCommission;
    // let othersValue2 = worksheet.getCell("S11");
    // othersValue2.value = data3.otherDz;
    // let netFOBValue2 = worksheet.getCell("S12");
    // netFOBValue2.value = data3.netFOB;

    // add Image Title
    // let imageTitle = worksheet.getCell("V4");
    // imageTitle.value = "Image";
    // imageTitle.font = {
    //   name: "Calibri",
    //   size: 15,
    //   underline: "single",
    //   bold: true,
    //   color: { argb: "0085A3" },
    // };
    // debugger
    // var url = environment.fileUrl + data2.filePath;

    // if(data2.filePath != null){
    //  var  image = await this.imageUrlToBase64(url);

    //   let myLogoImage = workbook.addImage({
    //     base64: image,
    //     extension: 'png',
    //   });

    //   worksheet.mergeCells("V5:X11");
    //   worksheet.addImage(myLogoImage, 'V5:X11');
    // }

    //Add Image
    // let myLogoImage = workbook.addImage({
    //   base64: image,
    //   extension: 'png',
    // });



    //Blank Row
    worksheet.addRow([]);
    // Fabric Name
    let fabricTitle = worksheet.getCell("A4");
    fabricTitle.value = "Fabric";

    // fabricTitle.font = {
    //   name: "Calibri",
    //   size: 12,
    //   underline: "single",
    //   bold: true,
    //   color: { argb: "0085A3" },
    // };
    //Add Header Row
    let headerRow = worksheet.addRow(fabricHeader);
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF00" },
        bgColor: { argb: "FF0000FF" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Show Data For Fabric in excel

    ///new-start//
    var rowCount1 = 0
    var fabricFastRow1 = rowCount1 + 6 + 1;
    var fabricLastRow1 = 0
    for (var itemFab1 of data) {
      var costrowCount1 = rowCount1 + 6 + 1;
      let fab1 = "A" + costrowCount1;// row.getCell(1).address;
      worksheet.getCell(fab1).value = itemFab1[0];
      worksheet.getCell(fab1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab2 = "B" + costrowCount1;//  row.getCell(2).address;
      worksheet.getCell(fab2).value = itemFab1[1];
      worksheet.getCell(fab2).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab3 = "C" + costrowCount1;// row.getCell(3).address;
      worksheet.getCell(fab3).value = itemFab1[2];
      worksheet.getCell(fab3).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab4 = "D" + costrowCount1; //row.getCell(4).address;
      worksheet.getCell(fab4).value = itemFab1[3];
      worksheet.getCell(fab4).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab5 = "E" + costrowCount1; //row.getCell(5).address;
      worksheet.getCell(fab5).value = itemFab1[4];
      worksheet.getCell(fab5).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab6 = "F" + costrowCount1; //row.getCell(5).address;
      worksheet.getCell(fab6).value = itemFab1[5];
      worksheet.getCell(fab6).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab7 = "G" + costrowCount1; //row.getCell(5).address;
      worksheet.getCell(fab7).value = itemFab1[6];
      worksheet.getCell(fab7).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab8 = "H" + costrowCount1; //row.getCell(5).address;
      worksheet.getCell(fab8).value = itemFab1[7];
      worksheet.getCell(fab8).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab9 = "I" + costrowCount1; //row.getCell(5).address;
      worksheet.getCell(fab9).value = itemFab1[8];
      worksheet.getCell(fab9).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(fab9).alignment = { vertical: "middle", horizontal: "center" };


      let fab10 = "J" + costrowCount1; //row.getCell(5).address;
      worksheet.getCell(fab10).value = itemFab1[9];
      worksheet.getCell(fab10).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(fab10).alignment = { vertical: "middle", horizontal: "center" };

      let fab11 = "K" + costrowCount1; //row.getCell(5).address;
      worksheet.getCell(fab11).value = itemFab1[10];
      worksheet.getCell(fab11).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }


      let fab12 = "L" + costrowCount1; //row.getCell(5).address;
      worksheet.getCell(fab12).value = itemFab1[11];
      worksheet.getCell(fab12).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }


      let fab13 = "M" + costrowCount1; //row.getCell(5).address;
      worksheet.getCell(fab13).value = itemFab1[12];
      worksheet.getCell(fab13).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab14 = "N" + costrowCount1; //row.getCell(5).address;
      worksheet.getCell(fab14).value = itemFab1[13];
      worksheet.getCell(fab14).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab15 = "O" + costrowCount1; //row.getCell(5).address;
      worksheet.getCell(fab15).value = itemFab1[14];
      worksheet.getCell(fab15).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab16 = "P" + costrowCount1; //row.getCell(5).address;
      worksheet.getCell(fab16).value = itemFab1[15];
      worksheet.getCell(fab16).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab17 = "Q" + costrowCount1; //row.getCell(5).address;
      worksheet.getCell(fab17).value = itemFab1[16];
      worksheet.getCell(fab17).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab18 = "R" + costrowCount1; //row.getCell(5).address;
      worksheet.getCell(fab18).value = itemFab1[17];
      worksheet.getCell(fab18).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab19 = "S" + costrowCount1; //row.getCell(5).address;
      worksheet.getCell(fab19).value = itemFab1[18];
      worksheet.getCell(fab19).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab20 = "T" + costrowCount1; //row.getCell(5).address;
      worksheet.getCell(fab20).value = itemFab1[19];
      worksheet.getCell(fab20).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab21 = "U" + costrowCount1; //row.getCell(5).address;
      worksheet.getCell(fab21).value = itemFab1[20];
      worksheet.getCell(fab21).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      // //Balance 
      // let fab22 = "AR" + costrowCount1; //row.getCell(5).address;
      // worksheet.getCell(fab22).value = itemFab1[21];

      // worksheet.getCell(fab22).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // }

      // worksheet.getCell(fab22).fill = {
      //   type: "pattern",
      //   pattern: "solid",
      //   fgColor: { argb: "ffedd5a1" },
      //   bgColor: { argb: "" },
      // };

      // let fab23 = "AS" + costrowCount1; //row.getCell(5).address;
      // worksheet.getCell(fab23).value = "";
      // worksheet.getCell(fab23).border = {
      //   top: { style: 'thin' },
      //   bottom: { style: 'thin' },
      //   left: { style: 'thin' },
      //   right: { style: 'thin' }
      // }


      // worksheet.getCell(fab23).fill = {
      //   type: "pattern",
      //   pattern: "solid",
      //   fgColor: { argb: "ffedd5a1" },
      //   bgColor: { argb: "" },
      // };


      fabricLastRow1 = costrowCount1;
      rowCount1++
    }


    data.forEach((d) => {
      //debugger
      //let row = worksheet.addRow(d);

      //   let categoryName = row.getCell(1).address;
      //   worksheet.getCell(categoryName).value = d[0];
      //   let categoryName1 = row.getCell(2).address;
      //   worksheet.getCell(categoryName1).value = "";


      //  let categoryName:any = row.getCell(15);
      //   let sales = row.getCell(6);
    });

    // data.map((p) => [ // PDF
    //   // this.datepipe.transform(p.buyDate),
    //   {
    //     text: p.description,
    //     alignment: "center",
    //   },
    //   {
    //     text: p.categoryName,
    //     alignment: "center",
    //   },
    // ]);

    // var fabricValue = data.reduce((sum, fabric) => sum + fabric[19], 0);
    // let fabrictitle = worksheet.addRow([
    //   "Value:  " + " " + fabricValue.toFixed(4),
    worksheet.addRow([]);
    // ]);
    // fabrictitle.getCell(1).fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: {},
    // };
    //fabrictitle.font = { bold: true };
    //fabrictitle.alignment = { vertical: "middle", horizontal: "right" };
    //worksheet.mergeCells(`A${fabrictitle.number}:T${fabrictitle.number}`);

    worksheet.addRow([]);

    let accessoriesTitle = "Accessories";
    let accessoriesheaderRow1 = worksheet.addRow([accessoriesTitle]);
    // accessoriesheaderRow1.font = {
    //   name: "Calibri",
    //   size: 16,
    //   underline: "single",
    //   bold: true,
    //   color: { argb: "0085A3" },
    // };

    let accessoriesheaderRow = worksheet.addRow(AccessoriesHeader);
    // Cell Style : Fill and Border
    accessoriesheaderRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF00" },
        bgColor: { argb: "FF0000FF" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
    // Show Data For Fabric in Accessories
    //New start//
    var rowCountAccessories1 = 0
    var accessoriesFastRow1 = rowCountAccessories1 + 7 + rowCount1 + 3 + 1;
    var accessoriesLastRow1 = 0

    for (var itemAcs1 of dataTwo1) {
      var costrowCountAccessories1 = rowCountAccessories1 + 7 + rowCount1 + 3 + 1;
      let Acs1 = "A" + costrowCountAccessories1;// row.getCell(1).address;
      worksheet.getCell(Acs1).value = itemAcs1[0];
      worksheet.getCell(Acs1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs2 = "B" + costrowCountAccessories1;//  row.getCell(2).address;
      worksheet.getCell(Acs2).value = itemAcs1[1];
      worksheet.getCell(Acs2).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs3 = "C" + costrowCountAccessories1;// row.getCell(3).address;
      worksheet.getCell(Acs3).value = itemAcs1[2];
      worksheet.getCell(Acs3).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs4 = "D" + costrowCountAccessories1; //row.getCell(4).address;
      worksheet.getCell(Acs4).value = itemAcs1[3];
      worksheet.getCell(Acs4).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs5 = "E" + costrowCountAccessories1; //row.getCell(5).address;
      worksheet.getCell(Acs5).value = itemAcs1[4];
      worksheet.getCell(Acs5).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs6 = "F" + costrowCountAccessories1; //row.getCell(5).address;
      worksheet.getCell(Acs6).value = itemAcs1[5];
      worksheet.getCell(Acs6).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs7 = "G" + costrowCountAccessories1; //row.getCell(5).address;
      worksheet.getCell(Acs7).value = itemAcs1[6];
      worksheet.getCell(Acs7).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs8 = "H" + costrowCountAccessories1; //row.getCell(5).address;
      worksheet.getCell(Acs8).value = itemAcs1[7];
      worksheet.getCell(Acs8).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs9 = "I" + costrowCountAccessories1; //row.getCell(5).address;
      worksheet.getCell(Acs9).value = itemAcs1[8];
      worksheet.getCell(Acs9).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(Acs9).alignment = { vertical: "middle", horizontal: "center" };


      let Acs10 = "J" + costrowCountAccessories1; //row.getCell(5).address;
      worksheet.getCell(Acs10).value = itemAcs1[9];
      worksheet.getCell(Acs10).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(Acs10).alignment = { vertical: "middle", horizontal: "center" };

      let Acs11 = "K" + costrowCountAccessories1; //row.getCell(5).address;
      worksheet.getCell(Acs11).value = itemAcs1[10];
      worksheet.getCell(Acs11).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }


      let Acs12 = "L" + costrowCountAccessories1; //row.getCell(5).address;
      worksheet.getCell(Acs12).value = itemAcs1[11];
      worksheet.getCell(Acs12).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs13 = "M" + costrowCountAccessories1; //row.getCell(5).address;
      worksheet.getCell(Acs13).value = itemAcs1[12];
      worksheet.getCell(Acs13).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs14 = "N" + costrowCountAccessories1; //row.getCell(5).address;
      worksheet.getCell(Acs14).value = itemAcs1[13];
      worksheet.getCell(Acs14).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs15 = "O" + costrowCountAccessories1; //row.getCell(5).address;
      worksheet.getCell(Acs15).value = itemAcs1[14];
      worksheet.getCell(Acs15).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs16 = "P" + costrowCountAccessories1; //row.getCell(5).address;
      worksheet.getCell(Acs16).value = itemAcs1[15];
      worksheet.getCell(Acs16).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs17 = "Q" + costrowCountAccessories1; //row.getCell(5).address;
      worksheet.getCell(Acs17).value = itemAcs1[16];
      worksheet.getCell(Acs17).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs18 = "R" + costrowCountAccessories1; //row.getCell(5).address;
      worksheet.getCell(Acs18).value = itemAcs1[17];
      worksheet.getCell(Acs18).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs19 = "S" + costrowCountAccessories1; //row.getCell(5).address;
      worksheet.getCell(Acs19).value = itemAcs1[18];
      worksheet.getCell(Acs19).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }


      accessoriesLastRow1 = costrowCountAccessories1;
      rowCountAccessories1++
    }

    //New End //
    data1.forEach((d) => {
      //let row = worksheet.addRow(d);
      //let sales = row.getCell(6);
    });

    // var accessoriesValue = data1.reduce(
    //   (sum, accessorie) => sum + accessorie[17],
    //   0
    // );
    // let accessoriestitle = worksheet.addRow([
    //   "Value:  " + " " + accessoriesValue.toFixed(4),
    worksheet.addRow([]);
    // ]);
    // accessoriestitle.getCell(1).fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: {},
    // };
    // //accessoriestitle.font = { bold: true };
    // accessoriestitle.alignment = { vertical: "middle", horizontal: "right" };
    // worksheet.mergeCells(
    //   `A${accessoriestitle.number}:R${accessoriestitle.number}`
    // );

    worksheet.addRow([]);

    // Label Name
    let labelTitle = "Labels Hangtag";
    let labelheaderRow1 = worksheet.addRow([labelTitle]);
    // labelheaderRow1.font = {
    //   name: "Calibri",
    //   size: 16,
    //   underline: "single",
    //   bold: true,
    //   color: { argb: "0085A3" },
    // };

    //Add Header Row
    let labelheaderRow = worksheet.addRow(LabelHeader);
    // Cell Style : Fill and Border
    labelheaderRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF00" },
        bgColor: { argb: "FF0000FF" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
    // Show Data For Label
    //New Start //
    var rowCountLable1 = 0
    var lableFastRow1 = rowCountLable1 + 7 + rowCount1 + 3 + rowCountAccessories1 + 3 + 1 + 1;
    var lableLastRow1 = 0

    for (var itemLable1 of data4) {
      var costrowCountLable1 = rowCountLable1 + 7 + rowCount1 + 3 + rowCountAccessories1 + 3 + 1 + 1;;
      let Leb1 = "A" + costrowCountLable1;// row.getCell(1).address;
      worksheet.getCell(Leb1).value = itemLable1[0];
      worksheet.getCell(Leb1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb2 = "B" + costrowCountLable1;//  row.getCell(2).address;
      worksheet.getCell(Leb2).value = itemLable1[1];
      worksheet.getCell(Leb2).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb3 = "C" + costrowCountLable1;// row.getCell(3).address;
      worksheet.getCell(Leb3).value = itemLable1[2];
      worksheet.getCell(Leb3).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb4 = "D" + costrowCountLable1; //row.getCell(4).address;
      worksheet.getCell(Leb4).value = itemLable1[3];
      worksheet.getCell(Leb4).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb5 = "E" + costrowCountLable1; //row.getCell(5).address;
      worksheet.getCell(Leb5).value = itemLable1[4];
      worksheet.getCell(Leb5).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb6 = "F" + costrowCountLable1; //row.getCell(5).address;
      worksheet.getCell(Leb6).value = itemLable1[5];
      worksheet.getCell(Leb6).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb7 = "G" + costrowCountLable1; //row.getCell(5).address;
      worksheet.getCell(Leb7).value = itemLable1[6];
      worksheet.getCell(Leb7).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb8 = "H" + costrowCountLable1; //row.getCell(5).address;
      worksheet.getCell(Leb8).value = itemLable1[7];
      worksheet.getCell(Leb8).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb9 = "I" + costrowCountLable1; //row.getCell(5).address;
      worksheet.getCell(Leb9).value = itemLable1[8];
      worksheet.getCell(Leb9).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(Leb9).alignment = { vertical: "middle", horizontal: "center" };


      let Leb10 = "J" + costrowCountLable1; //row.getCell(5).address;
      worksheet.getCell(Leb10).value = itemLable1[9];
      worksheet.getCell(Leb10).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(Leb10).alignment = { vertical: "middle", horizontal: "center" };

      let Leb11 = "K" + costrowCountLable1; //row.getCell(5).address;
      worksheet.getCell(Leb11).value = itemLable1[10];
      worksheet.getCell(Leb11).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }


      let Leb12 = "L" + costrowCountLable1; //row.getCell(5).address;
      worksheet.getCell(Leb12).value = itemLable1[11];
      worksheet.getCell(Leb12).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb13 = "M" + costrowCountLable1; //row.getCell(5).address;
      worksheet.getCell(Leb13).value = itemLable1[12];
      worksheet.getCell(Leb13).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb14 = "N" + costrowCountLable1; //row.getCell(5).address;
      worksheet.getCell(Leb14).value = itemLable1[13];
      worksheet.getCell(Leb14).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb15 = "O" + costrowCountLable1; //row.getCell(5).address;
      worksheet.getCell(Leb15).value = itemLable1[14];
      worksheet.getCell(Leb15).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb16 = "P" + costrowCountLable1; //row.getCell(5).address;
      worksheet.getCell(Leb16).value = itemLable1[15];
      worksheet.getCell(Leb16).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb17 = "Q" + costrowCountLable1; //row.getCell(5).address;
      worksheet.getCell(Leb17).value = itemLable1[16];
      worksheet.getCell(Leb17).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb18 = "R" + costrowCountLable1; //row.getCell(5).address;
      worksheet.getCell(Leb18).value = itemLable1[17];
      worksheet.getCell(Leb18).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb19 = "S" + costrowCountLable1; //row.getCell(5).address;
      worksheet.getCell(Leb19).value = itemLable1[18];
      worksheet.getCell(Leb19).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }


      lableLastRow1 = costrowCountLable1;
      rowCountLable1++
    }
    //New End//

    data4.forEach((d) => {
      //let row = worksheet.addRow(d);
      //let sales = row.getCell(6);
    });

    // var labelValue = data4.reduce((sum, label) => sum + label[17], 0);
    // let labeltitle = worksheet.addRow([
    //   "Value:  " + " " + labelValue.toFixed(4),
    worksheet.addRow([]);
    // ]);
    // labeltitle.getCell(1).fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: {},
    // };
    // //labeltitle.font = { bold: true };
    // labeltitle.alignment = { vertical: "middle", horizontal: "right" };
    // worksheet.mergeCells(`A${labeltitle.number}:R${labeltitle.number}`);

    worksheet.addRow([]);
    // worksheet.addRow([]);

    // Packging Name
    let packgingTitle = "Packging";
    let packgingheaderRow1 = worksheet.addRow([packgingTitle]);
    // packgingheaderRow1.font = {
    //   name: "Calibri",
    //   size: 16,
    //   underline: "single",
    //   bold: true,
    //   color: { argb: "0085A3" },
    // };

    //Add Header Row
    let packgingheaderRow = worksheet.addRow(PackgingHeader);
    // Cell Style : Fill and Border
    packgingheaderRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF00" },
        bgColor: { argb: "FF0000FF" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
    // Show Data For Packging
    // New Start //
        var rowCountPackging1 = 0
    var pakingFastRow2 = rowCountPackging1 + rowCountLable1 + 7 + rowCount1 + 3 + rowCountAccessories1 + 3 + 1 + 1 + rowCountLable1 + 3 + 1;
    var pakingLastRow2 = 0

    for (var itemPackging1 of data5) {
      var costrowCountPackging1 = rowCountPackging1 + rowCountLable1 + 7 + rowCount1 + 3 + rowCountAccessories1 + 3 + 1 + 1 + rowCountLable1 + 3 + 1;
      let Pack1 = "A" + costrowCountPackging1;// row.getCell(1).address;
      worksheet.getCell(Pack1).value = itemPackging1[0];
      worksheet.getCell(Pack1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack2 = "B" + costrowCountPackging1;//  row.getCell(2).address;
      worksheet.getCell(Pack2).value = itemPackging1[1];
      worksheet.getCell(Pack2).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack3 = "C" + costrowCountPackging1;// row.getCell(3).address;
      worksheet.getCell(Pack3).value = itemPackging1[2];
      worksheet.getCell(Pack3).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack4 = "D" + costrowCountPackging1; //row.getCell(4).address;
      worksheet.getCell(Pack4).value = itemPackging1[3];
      worksheet.getCell(Pack4).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack5 = "E" + costrowCountPackging1; //row.getCell(5).address;
      worksheet.getCell(Pack5).value = itemPackging1[4];
      worksheet.getCell(Pack5).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack6 = "F" + costrowCountPackging1; //row.getCell(5).address;
      worksheet.getCell(Pack6).value = itemPackging1[5];
      worksheet.getCell(Pack6).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack7 = "G" + costrowCountPackging1; //row.getCell(5).address;
      worksheet.getCell(Pack7).value = itemPackging1[6];
      worksheet.getCell(Pack7).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack8 = "H" + costrowCountPackging1; //row.getCell(5).address;
      worksheet.getCell(Pack8).value = itemPackging1[7];
      worksheet.getCell(Pack8).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack9 = "I" + costrowCountPackging1; //row.getCell(5).address;
      worksheet.getCell(Pack9).value = itemPackging1[8];
      worksheet.getCell(Pack9).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(Pack9).alignment = { vertical: "middle", horizontal: "center" };


      let Pack10 = "J" + costrowCountPackging1; //row.getCell(5).address;
      worksheet.getCell(Pack10).value = itemPackging1[9];
      worksheet.getCell(Pack10).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(Pack10).alignment = { vertical: "middle", horizontal: "center" };

      let Pack11 = "K" + costrowCountPackging1; //row.getCell(5).address;
      worksheet.getCell(Pack11).value = itemPackging1[10];
      worksheet.getCell(Pack11).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }


      let Pack12 = "L" + costrowCountPackging1; //row.getCell(5).address;
      worksheet.getCell(Pack12).value = itemPackging1[11];
      worksheet.getCell(Pack12).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack13 = "M" + costrowCountPackging1; //row.getCell(5).address;
      worksheet.getCell(Pack13).value = itemPackging1[12];
      worksheet.getCell(Pack13).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack14 = "N" + costrowCountPackging1; //row.getCell(5).address;
      worksheet.getCell(Pack14).value = itemPackging1[13];
      worksheet.getCell(Pack14).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack15 = "O" + costrowCountPackging1; //row.getCell(5).address;
      worksheet.getCell(Pack15).value = itemPackging1[14];
      worksheet.getCell(Pack15).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack16 = "P" + costrowCountPackging1; //row.getCell(5).address;
      worksheet.getCell(Pack16).value = itemPackging1[15];
      worksheet.getCell(Pack16).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack17 = "Q" + costrowCountPackging1; //row.getCell(5).address;
      worksheet.getCell(Pack17).value = itemPackging1[16];
      worksheet.getCell(Pack17).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }


      let Pack18 = "R" + costrowCountPackging1; //row.getCell(5).address;
      worksheet.getCell(Pack18).value = itemPackging1[17];
      worksheet.getCell(Pack18).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack19 = "S" + costrowCountPackging1; //row.getCell(5).address;
      worksheet.getCell(Pack19).value = itemPackging1[18];
      worksheet.getCell(Pack19).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }


      pakingLastRow2 = costrowCountPackging1;
      rowCountPackging1++
    }

    // New End //
    data5.forEach((d) => {
      //let row = worksheet.addRow(d);
      //let sales = row.getCell(6);
    });

    // var packgingValue = data5.reduce((sum, packging) => sum + packging[17], 0);
    // let packgingtitle = worksheet.addRow([
    //   "Value:  " + " " + packgingValue.toFixed(4),
    worksheet.addRow([]);
    // ]);
    // packgingtitle.getCell(1).fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: {},
    // };
    // //packgingtitle.font = { bold: true };
    // packgingtitle.alignment = { vertical: "middle", horizontal: "right" };
    // worksheet.mergeCells(`A${packgingtitle.number}:R${packgingtitle.number}`);

    worksheet.addRow([]);
    // worksheet.addRow([]);

    // Packging Name
    let processTitle = "PROCESS AND OTHERS (USE THIS SECTION FOR WASHING,QUILTING, EMBROIDERY, PRINTING, TEST, SMS AND OTHERS)";
    let processheaderRow1 = worksheet.addRow([processTitle]);
    // processheaderRow1.font = {
    //   name: "Calibri",
    //   //size: 16,
    //   underline: "single",
    //   bold: true,
    //   color: { argb: "0085A3" },
    // };

    //Add Header Row
    let processheaderRow = worksheet.addRow(ProcessHeader);
    // Cell Style : Fill and Border
    processheaderRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF00" },
        bgColor: { argb: "FF0000FF" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
    // Show Data For Packging

    // New Start //
        var  rowCountProcesss1 = 0
    var processFastRow1 =  rowCountProcesss1 + 7 + rowCount1 + 3 + rowCountAccessories1 + 3 + 1 + rowCountLable1 + 3 + 1 + rowCountPackging1 + 3 + 1;
    var processLastRow1 = 0

    for (var itemProcesss1 of dataTwo6) {
      var costrowCountProcesss1 =  rowCountProcesss1 + 7 + rowCount1 + 3 + rowCountAccessories1 + 3 + 1 + rowCountLable1 + 3 + 1 + rowCountPackging1 + 3 + 1 + 1;
      let Porcss1 = "A" + costrowCountProcesss1;// row.getCell(1).address;
      worksheet.getCell(Porcss1).value = itemProcesss1[0];
      worksheet.getCell(Porcss1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss2 = "B" + costrowCountProcesss1;//  row.getCell(2).address;
      worksheet.getCell(Porcss2).value = itemProcesss1[1];
      worksheet.getCell(Porcss2).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss3 = "C" + costrowCountProcesss1;// row.getCell(3).address;
      worksheet.getCell(Porcss3).value = itemProcesss1[2];
      worksheet.getCell(Porcss3).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss4 = "D" + costrowCountProcesss1; //row.getCell(4).address;
      worksheet.getCell(Porcss4).value = itemProcesss1[3];
      worksheet.getCell(Porcss4).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss5 = "E" + costrowCountProcesss1; //row.getCell(5).address;
      worksheet.getCell(Porcss5).value = itemProcesss1[4];
      worksheet.getCell(Porcss5).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss6 = "F" + costrowCountProcesss1; //row.getCell(5).address;
      worksheet.getCell(Porcss6).value = itemProcesss1[5];
      worksheet.getCell(Porcss6).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss7 = "G" + costrowCountProcesss1; //row.getCell(5).address;
      worksheet.getCell(Porcss7).value = itemProcesss1[6];
      worksheet.getCell(Porcss7).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss8 = "H" + costrowCountProcesss1; //row.getCell(5).address;
      worksheet.getCell(Porcss8).value = itemProcesss1[7];
      worksheet.getCell(Porcss8).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss9 = "I" + costrowCountProcesss1; //row.getCell(5).address;
      worksheet.getCell(Porcss9).value = itemProcesss1[8];
      worksheet.getCell(Porcss9).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(Porcss9).alignment = { vertical: "middle", horizontal: "center" };


      let Porcss10 = "J" + costrowCountProcesss1; //row.getCell(5).address;
      worksheet.getCell(Porcss10).value = itemProcesss1[9];
      worksheet.getCell(Porcss10).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(Porcss10).alignment = { vertical: "middle", horizontal: "center" };

      let Porcss11 = "K" + costrowCountProcesss1; //row.getCell(5).address;
      worksheet.getCell(Porcss11).value = itemProcesss1[10];
      worksheet.getCell(Porcss11).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }


      let Porcss12 = "L" + costrowCountProcesss1; //row.getCell(5).address;
      worksheet.getCell(Porcss12).value = itemProcesss1[11];
      worksheet.getCell(Porcss12).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss13 = "M" + costrowCountProcesss1; //row.getCell(5).address;
      worksheet.getCell(Porcss13).value = itemProcesss1[12];
      worksheet.getCell(Porcss13).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss14 = "N" + costrowCountProcesss1; //row.getCell(5).address;
      worksheet.getCell(Porcss14).value = itemProcesss1[13];
      worksheet.getCell(Porcss14).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss15 = "O" + costrowCountProcesss1; //row.getCell(5).address;
      worksheet.getCell(Porcss15).value = itemProcesss1[14];
      worksheet.getCell(Porcss15).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss16 = "P" + costrowCountProcesss1; //row.getCell(5).address;
      worksheet.getCell(Porcss16).value = itemProcesss1[15];
      worksheet.getCell(Porcss16).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss17 = "Q" + costrowCountProcesss1; //row.getCell(5).address;
      worksheet.getCell(Porcss17).value = itemProcesss1[16];
      worksheet.getCell(Porcss17).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss18 = "R" + costrowCountProcesss1; //row.getCell(5).address;
      worksheet.getCell(Porcss18).value = itemProcesss1[17];
      worksheet.getCell(Porcss18).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss19 = "S" + costrowCountProcesss1; //row.getCell(5).address;
      worksheet.getCell(Porcss19).value = itemProcesss1[18];
      worksheet.getCell(Porcss19).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }


      processLastRow1 = costrowCountProcesss1;
      rowCountProcesss1++
    }
    // New End //

    data6.forEach((d) => {
      //let row = worksheet.addRow(d);
      //let sales = row.getCell(6);
    });

    // var processValue = data6.reduce((sum, process) => sum + process[17], 0);
    // let processtitle = worksheet.addRow([
    //   "Value:  " + " " + processValue.toFixed(4),
    worksheet.addRow([]); //--need to remove
    // ]);
    // processtitle.getCell(1).fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: {},
    // };
    // //processtitle.font = { bold: true };
    // processtitle.alignment = { vertical: "middle", horizontal: "right" };
    // worksheet.mergeCells(`A${processtitle.number}:R${processtitle.number}`);
    worksheet.addRow([]);
    worksheet.addRow([]);



    if (data2P2.length > 1) {

      let partName2 = data2[1].partName;
      worksheet.addRow([partName2]);
      //Blank Row
      worksheet.addRow([]);
      // Fabric Name
      let fabeiccTitle = "Fabric";
      let fabricheaderRow1 = worksheet.addRow([fabeiccTitle]);
      // fabricTitle.font = {
      //   name: "Calibri",
      //   size: 12,
      //   underline: "single",
      //   bold: true,
      //   color: { argb: "0085A3" },
      // };
      //Add Header Row
      let headerRow = worksheet.addRow(fabricHeader);
      // Cell Style : Fill and Border
      headerRow.eachCell((cell, number) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFFFF00" },
          bgColor: { argb: "FF0000FF" },
        };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });

      // Show Data For Fabric in excel
      dataP2.forEach((d) => {
        //debugger
        let row = worksheet.addRow(d);

        //   let categoryName = row.getCell(1).address;
        //   worksheet.getCell(categoryName).value = d[0];
        //   let categoryName1 = row.getCell(2).address;
        //   worksheet.getCell(categoryName1).value = "";


        //  let categoryName:any = row.getCell(15);
        //   let sales = row.getCell(6);
      });


      worksheet.addRow([]);
      worksheet.addRow([]);

      let accessoriesTitle = "Accessories";
      let accessoriesheaderRow1 = worksheet.addRow([accessoriesTitle]);
      // accessoriesheaderRow1.font = {
      //   name: "Calibri",
      //   size: 16,
      //   underline: "single",
      //   bold: true,
      //   color: { argb: "0085A3" },
      // };

      let accessoriesheaderRow = worksheet.addRow(AccessoriesHeader);
      // Cell Style : Fill and Border
      accessoriesheaderRow.eachCell((cell, number) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFFFF00" },
          bgColor: { argb: "FF0000FF" },
        };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
      // Show Data For Fabric in Accessories
      data1P2.forEach((d) => {
        let row = worksheet.addRow(d);
        let sales = row.getCell(6);
      });


      worksheet.addRow([]);
      worksheet.addRow([]);

      // Label Name
      let labelTitle = "Labels Hangtag";
      let labelheaderRow1 = worksheet.addRow([labelTitle]);
      // labelheaderRow1.font = {
      //   name: "Calibri",
      //   size: 16,
      //   underline: "single",
      //   bold: true,
      //   color: { argb: "0085A3" },
      // };

      //Add Header Row
      let labelheaderRow = worksheet.addRow(LabelHeader);
      // Cell Style : Fill and Border
      labelheaderRow.eachCell((cell, number) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFFFF00" },
          bgColor: { argb: "FF0000FF" },
        };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
      // Show Data For Label
      data4P2.forEach((d) => {
        let row = worksheet.addRow(d);
        let sales = row.getCell(6);
      });


      worksheet.addRow([]);
      worksheet.addRow([]);

      // Packging Name
      let packgingTitle = "Packging";
      let packgingheaderRow1 = worksheet.addRow([packgingTitle]);
      // packgingheaderRow1.font = {
      //   name: "Calibri",
      //   size: 16,
      //   underline: "single",
      //   bold: true,
      //   color: { argb: "0085A3" },
      // };

      //Add Header Row
      let packgingheaderRow = worksheet.addRow(PackgingHeader);
      // Cell Style : Fill and Border
      packgingheaderRow.eachCell((cell, number) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFFFF00" },
          bgColor: { argb: "FF0000FF" },
        };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
      // Show Data For Packging
      data5P2.forEach((d) => {
        let row = worksheet.addRow(d);
        let sales = row.getCell(6);
      });

      worksheet.addRow([]);
      worksheet.addRow([]);

      // Packging Name
      let processTitle = "PROCESS AND OTHERS (USE THIS SECTION FOR WASHING,QUILTING, EMBROIDERY, PRINTING, TEST, SMS AND OTHERS)";
      let processheaderRow1 = worksheet.addRow([processTitle]);
      // processheaderRow1.font = {
      //   name: "Calibri",
      //   //size: 16,
      //   underline: "single",
      //   bold: true,
      //   color: { argb: "0085A3" },
      // };

      //Add Header Row
      let processheaderRow = worksheet.addRow(ProcessHeader);
      // Cell Style : Fill and Border
      processheaderRow.eachCell((cell, number) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFFFF00" },
          bgColor: { argb: "FF0000FF" },
        };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
      // Show Data For Packging
      data6P2.forEach((d) => {
        let row = worksheet.addRow(d);
        let sales = row.getCell(6);
      });

    }




    ///---------------------comparing cost sheet with costing block ------------------------------------///

    let part2 = worksheet.getCell("W2");
    part2.value = "Part Name";

    let part2Value = worksheet.getCell("X2");
    part2Value.value = dataTwo2[0].partName;
    var costRowCount = 6;

    let f1 = worksheet.getCell("W" + costRowCount);
    f1.value = "Category";
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

    let f2 = worksheet.getCell("X" + costRowCount);
    f2.value = "Component/Item";
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
    f2.alignment = { vertical: "middle", horizontal: "center" };

    let f3 = worksheet.getCell("Y" + costRowCount);
    f3.value = "Description";
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
    f3.alignment = { vertical: "middle", horizontal: "center" };

    let f4 = worksheet.getCell("Z" + costRowCount);
    f4.value = "ST Code";
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
    f4.alignment = { vertical: "middle", horizontal: "center" };

    let f5 = worksheet.getCell("AA" + costRowCount);
    f5.value = "Item Placement";
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
    f5.alignment = { vertical: "middle", horizontal: "center" };

    let f6 = worksheet.getCell("AB" + costRowCount);
    f6.value = "Item Code";
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
    f6.alignment = { vertical: "middle", horizontal: "center" };


    let f7 = worksheet.getCell("AC" + costRowCount);
    f7.value = "Nomination Status";
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
    f7.alignment = { vertical: "middle", horizontal: "center" };

    let f8 = worksheet.getCell("AD" + costRowCount);
    f8.value = "Supplier";
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
    f8.alignment = { vertical: "middle", horizontal: "center" };


    let f9 = worksheet.getCell("AE" + costRowCount);
    f9.value = "Country";
    f9.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    f9.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    f9.alignment = { vertical: "middle", horizontal: "center" };


    let f10 = worksheet.getCell("AF" + costRowCount);
    f10.value = "Cutt Able Width";
    f10.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    f10.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    f10.alignment = { vertical: "middle", horizontal: "center" };

    let f11 = worksheet.getCell("AG" + costRowCount);
    f11.value = "UoM";
    f11.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    f11.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    f11.alignment = { vertical: "middle", horizontal: "center" };

    let f12 = worksheet.getCell("AH" + costRowCount);
    f12.value = "Consumption";
    f12.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    f12.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    f12.alignment = { vertical: "middle", horizontal: "center" };

    let f13 = worksheet.getCell("AI" + costRowCount);
    f13.value = "Market Unit";
    f13.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    f13.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    f13.alignment = { vertical: "middle", horizontal: "center" };

    let f14 = worksheet.getCell("AJ" + costRowCount);
    f14.value = "Con. Value";
    f14.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    f14.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    f14.alignment = { vertical: "middle", horizontal: "center" };

    let f15 = worksheet.getCell("AK" + costRowCount);
    f15.value = "Price";
    f15.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    f15.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    f15.alignment = { vertical: "middle", horizontal: "center" };


    let f16 = worksheet.getCell("AL" + costRowCount);
    f16.value = "Price Mood Name";
    f16.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    f16.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    f16.alignment = { vertical: "middle", horizontal: "center" };

    let f17 = worksheet.getCell("AM" + costRowCount);
    f17.value = "Wastage Percentage";
    f17.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    f17.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    f17.alignment = { vertical: "middle", horizontal: "center" };

    let f18 = worksheet.getCell("AN" + costRowCount);
    f18.value = "Fin Cost";
    f18.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    f18.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    f18.alignment = { vertical: "middle", horizontal: "center" };

    let f19 = worksheet.getCell("AO" + costRowCount);
    f19.value = "%";
    f19.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    f19.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    f19.alignment = { vertical: "middle", horizontal: "center" };

    let f20 = worksheet.getCell("AP" + costRowCount);
    f20.value = "Value";
    f20.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    f20.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    f20.alignment = { vertical: "middle", horizontal: "center" };

    let f21 = worksheet.getCell("AQ" + costRowCount);
    f21.value = "Comment";
    f21.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    f21.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    f21.alignment = { vertical: "middle", horizontal: "center" };

    let f22 = worksheet.getCell("AR" + costRowCount);
    f22.value = "Balance";
    f22.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffedd5a1" },
      bgColor: { argb: "" },
    };
    f22.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    f22.alignment = { vertical: "middle", horizontal: "center" };

    let f23 = worksheet.getCell("AS" + costRowCount);
    f23.value = "%";
    f23.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffedd5a1" },
      bgColor: { argb: "" },
    };
    f23.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    f23.alignment = { vertical: "middle", horizontal: "center" };




    var rowCount = 0
    var fabricFastRow2 = rowCount + 6 + 1;
    var fabricLastRow2 = 0
    for (var itemFab2 of dataTwo) {
      var costRowCount2 = rowCount + 6 + 1;
      let fab1 = "W" + costRowCount2;// row.getCell(1).address;
      worksheet.getCell(fab1).value = itemFab2[0];
      worksheet.getCell(fab1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab2 = "X" + costRowCount2;//  row.getCell(2).address;
      worksheet.getCell(fab2).value = itemFab2[1];
      worksheet.getCell(fab2).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab3 = "Y" + costRowCount2;// row.getCell(3).address;
      worksheet.getCell(fab3).value = itemFab2[2];
      worksheet.getCell(fab3).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab4 = "Z" + costRowCount2; //row.getCell(4).address;
      worksheet.getCell(fab4).value = itemFab2[3];
      worksheet.getCell(fab4).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab5 = "AA" + costRowCount2; //row.getCell(5).address;
      worksheet.getCell(fab5).value = itemFab2[4];
      worksheet.getCell(fab5).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab6 = "AB" + costRowCount2; //row.getCell(5).address;
      worksheet.getCell(fab6).value = itemFab2[5];
      worksheet.getCell(fab6).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab7 = "AC" + costRowCount2; //row.getCell(5).address;
      worksheet.getCell(fab7).value = itemFab2[6];
      worksheet.getCell(fab7).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab8 = "AD" + costRowCount2; //row.getCell(5).address;
      worksheet.getCell(fab8).value = itemFab2[7];
      worksheet.getCell(fab8).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab9 = "AE" + costRowCount2; //row.getCell(5).address;
      worksheet.getCell(fab9).value = itemFab2[8];
      worksheet.getCell(fab9).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(fab9).alignment = { vertical: "middle", horizontal: "center" };


      let fab10 = "AF" + costRowCount2; //row.getCell(5).address;
      worksheet.getCell(fab10).value = itemFab2[9];
      worksheet.getCell(fab10).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(fab10).alignment = { vertical: "middle", horizontal: "center" };

      let fab11 = "AG" + costRowCount2; //row.getCell(5).address;
      worksheet.getCell(fab11).value = itemFab2[10];
      worksheet.getCell(fab11).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }


      let fab12 = "AH" + costRowCount2; //row.getCell(5).address;
      worksheet.getCell(fab12).value = itemFab2[11];
      worksheet.getCell(fab12).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }


      let fab13 = "AI" + costRowCount2; //row.getCell(5).address;
      worksheet.getCell(fab13).value = itemFab2[12];
      worksheet.getCell(fab13).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab14 = "AJ" + costRowCount2; //row.getCell(5).address;
      worksheet.getCell(fab14).value = itemFab2[13];
      worksheet.getCell(fab14).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab15 = "AK" + costRowCount2; //row.getCell(5).address;
      worksheet.getCell(fab15).value = itemFab2[14];
      worksheet.getCell(fab15).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab16 = "AL" + costRowCount2; //row.getCell(5).address;
      worksheet.getCell(fab16).value = itemFab2[15];
      worksheet.getCell(fab16).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab17 = "AM" + costRowCount2; //row.getCell(5).address;
      worksheet.getCell(fab17).value = itemFab2[16];
      worksheet.getCell(fab17).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab18 = "AN" + costRowCount2; //row.getCell(5).address;
      worksheet.getCell(fab18).value = itemFab2[17];
      worksheet.getCell(fab18).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab19 = "AO" + costRowCount2; //row.getCell(5).address;
      worksheet.getCell(fab19).value = itemFab2[18];
      worksheet.getCell(fab19).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab20 = "AP" + costRowCount2; //row.getCell(5).address;
      worksheet.getCell(fab20).value = itemFab2[19];
      worksheet.getCell(fab20).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let fab21 = "AQ" + costRowCount2; //row.getCell(5).address;
      worksheet.getCell(fab21).value = itemFab2[20];
      worksheet.getCell(fab21).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      //Balance 
      let fab22 = "AR" + costRowCount2; //row.getCell(5).address;
      worksheet.getCell(fab22).value = itemFab2[21];

      worksheet.getCell(fab22).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(fab22).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffedd5a1" },
        bgColor: { argb: "" },
      };

      let fab23 = "AS" + costRowCount2; //row.getCell(5).address;
      worksheet.getCell(fab23).value = "";
      worksheet.getCell(fab23).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }


      worksheet.getCell(fab23).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffedd5a1" },
        bgColor: { argb: "" },
      };


      fabricLastRow2 = costRowCount2;
      rowCount++
    }


    var headerCountAccessories2 = 7 + rowCount + 3;

    let a1 = worksheet.getCell("W" + headerCountAccessories2);
    a1.value = "Category";
    a1.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    a1.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    a1.alignment = { vertical: "middle", horizontal: "center" };

    let a2 = worksheet.getCell("X" + headerCountAccessories2);
    a2.value = "Component/Item";
    a2.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    a2.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    a2.alignment = { vertical: "middle", horizontal: "center" };

    let a3 = worksheet.getCell("Y" + headerCountAccessories2);
    a3.value = "Description";
    a3.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    a3.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    a3.alignment = { vertical: "middle", horizontal: "center" };

    let a4 = worksheet.getCell("Z" + headerCountAccessories2);
    a4.value = "ST Code";
    a4.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    a4.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    a4.alignment = { vertical: "middle", horizontal: "center" };

    let a5 = worksheet.getCell("AA" + headerCountAccessories2);
    a5.value = "Placement";
    a5.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    a5.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    a5.alignment = { vertical: "middle", horizontal: "center" };

    let a6 = worksheet.getCell("AB" + headerCountAccessories2);
    a6.value = "Ref. Code";
    a6.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    a6.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    a6.alignment = { vertical: "middle", horizontal: "center" };


    let a7 = worksheet.getCell("AC" + headerCountAccessories2);
    a7.value = "Nomination Status";
    a7.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    a7.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    a7.alignment = { vertical: "middle", horizontal: "center" };

    let a8 = worksheet.getCell("AD" + headerCountAccessories2);
    a8.value = "Supplier";
    a8.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    a8.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    a8.alignment = { vertical: "middle", horizontal: "center" };


    let a9 = worksheet.getCell("AE" + headerCountAccessories2);
    a9.value = "Country";
    a9.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    a9.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    a9.alignment = { vertical: "middle", horizontal: "center" };


    let a10 = worksheet.getCell("AF" + headerCountAccessories2);
    a10.value = "UoM";
    a10.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    a10.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    a10.alignment = { vertical: "middle", horizontal: "center" };

    let a11 = worksheet.getCell("AG" + headerCountAccessories2);
    a11.value = "Consumption";
    a11.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    a11.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    a11.alignment = { vertical: "middle", horizontal: "center" };

    let a12 = worksheet.getCell("AH" + headerCountAccessories2);
    a12.value = "Wastage Percentage";
    a12.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    a12.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    a12.alignment = { vertical: "middle", horizontal: "center" };

    let a13 = worksheet.getCell("AI" + headerCountAccessories2);
    a13.value = "Market Unit";
    a13.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    a13.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    a13.alignment = { vertical: "middle", horizontal: "center" };

    let a14 = worksheet.getCell("AJ" + headerCountAccessories2);
    a14.value = "Con. Value";
    a14.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    a14.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    a14.alignment = { vertical: "middle", horizontal: "center" };

    let a15 = worksheet.getCell("AK" + headerCountAccessories2);
    a15.value = "Price";
    a15.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    a15.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    a15.alignment = { vertical: "middle", horizontal: "center" };


    let a16 = worksheet.getCell("AL" + headerCountAccessories2);
    a16.value = "FinCost";
    a16.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    a16.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    a16.alignment = { vertical: "middle", horizontal: "center" };

    let a17 = worksheet.getCell("AM" + headerCountAccessories2);
    a17.value = "%";
    a17.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    a17.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    a17.alignment = { vertical: "middle", horizontal: "center" };

    let a18 = worksheet.getCell("AN" + headerCountAccessories2);
    a18.value = "Value";
    a18.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    a18.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    a18.alignment = { vertical: "middle", horizontal: "center" };

    let a19 = worksheet.getCell("AO" + headerCountAccessories2);
    a19.value = "Comment";
    a19.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    a19.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    a19.alignment = { vertical: "middle", horizontal: "center" };


    var rowCountAccessories2 = 0
    var accessoriesFastRow2 = rowCountAccessories2 + 7 + rowCount + 3 + 1;
    var accessoriesLastRow2 = 0

    for (var itemAcs2 of dataTwo1) {
      var costrowCountAccessories2 = rowCountAccessories2 + 7 + rowCount + 3 + 1;
      let Acs1 = "W" + costrowCountAccessories2;// row.getCell(1).address;
      worksheet.getCell(Acs1).value = itemAcs2[0];
      worksheet.getCell(Acs1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs2 = "X" + costrowCountAccessories2;//  row.getCell(2).address;
      worksheet.getCell(Acs2).value = itemAcs2[1];
      worksheet.getCell(Acs2).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs3 = "Y" + costrowCountAccessories2;// row.getCell(3).address;
      worksheet.getCell(Acs3).value = itemAcs2[2];
      worksheet.getCell(Acs3).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs4 = "Z" + costrowCountAccessories2; //row.getCell(4).address;
      worksheet.getCell(Acs4).value = itemAcs2[3];
      worksheet.getCell(Acs4).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs5 = "AA" + costrowCountAccessories2; //row.getCell(5).address;
      worksheet.getCell(Acs5).value = itemAcs2[4];
      worksheet.getCell(Acs5).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs6 = "AB" + costrowCountAccessories2; //row.getCell(5).address;
      worksheet.getCell(Acs6).value = itemAcs2[5];
      worksheet.getCell(Acs6).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs7 = "AC" + costrowCountAccessories2; //row.getCell(5).address;
      worksheet.getCell(Acs7).value = itemAcs2[6];
      worksheet.getCell(Acs7).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs8 = "AD" + costrowCountAccessories2; //row.getCell(5).address;
      worksheet.getCell(Acs8).value = itemAcs2[7];
      worksheet.getCell(Acs8).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs9 = "AE" + costrowCountAccessories2; //row.getCell(5).address;
      worksheet.getCell(Acs9).value = itemAcs2[8];
      worksheet.getCell(Acs9).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(Acs9).alignment = { vertical: "middle", horizontal: "center" };


      let Acs10 = "AF" + costrowCountAccessories2; //row.getCell(5).address;
      worksheet.getCell(Acs10).value = itemAcs2[9];
      worksheet.getCell(Acs10).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(Acs10).alignment = { vertical: "middle", horizontal: "center" };

      let Acs11 = "AG" + costrowCountAccessories2; //row.getCell(5).address;
      worksheet.getCell(Acs11).value = itemAcs2[10];
      worksheet.getCell(Acs11).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }


      let Acs12 = "AH" + costrowCountAccessories2; //row.getCell(5).address;
      worksheet.getCell(Acs12).value = itemAcs2[11];
      worksheet.getCell(Acs12).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs13 = "AI" + costrowCountAccessories2; //row.getCell(5).address;
      worksheet.getCell(Acs13).value = itemAcs2[12];
      worksheet.getCell(Acs13).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs14 = "AJ" + costrowCountAccessories2; //row.getCell(5).address;
      worksheet.getCell(Acs14).value = itemAcs2[13];
      worksheet.getCell(Acs14).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs15 = "AK" + costrowCountAccessories2; //row.getCell(5).address;
      worksheet.getCell(Acs15).value = itemAcs2[14];
      worksheet.getCell(Acs15).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs16 = "AL" + costrowCountAccessories2; //row.getCell(5).address;
      worksheet.getCell(Acs16).value = itemAcs2[15];
      worksheet.getCell(Acs16).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs17 = "AM" + costrowCountAccessories2; //row.getCell(5).address;
      worksheet.getCell(Acs17).value = itemAcs2[16];
      worksheet.getCell(Acs17).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs18 = "AN" + costrowCountAccessories2; //row.getCell(5).address;
      worksheet.getCell(Acs18).value = itemAcs2[17];
      worksheet.getCell(Acs18).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Acs19 = "AO" + costrowCountAccessories2; //row.getCell(5).address;
      worksheet.getCell(Acs19).value = itemAcs2[18];
      worksheet.getCell(Acs19).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      //Balance
      let Acs20 = "AR" + costrowCountAccessories2; //row.getCell(5).address;
      worksheet.getCell(Acs20).value = itemAcs2[19];
      worksheet.getCell(Acs20).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Acs20).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffedd5a1" },
        bgColor: { argb: "" },
      };

      let Acs21 = "AS" + costrowCountAccessories2; //row.getCell(5).address;
      worksheet.getCell(Acs21).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Acs21).value = "";
      worksheet.getCell(Acs21).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffedd5a1" },
        bgColor: { argb: "" },
      };


      accessoriesLastRow2 = costrowCountAccessories2;
      rowCountAccessories2++
    }




    var headerCountLable2 = 7 + rowCount + 3 + rowCountAccessories2 + 3 + 1;

    let l1 = worksheet.getCell("W" + headerCountLable2);
    l1.value = "Category";
    l1.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    l1.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    l1.alignment = { vertical: "middle", horizontal: "center" };

    let l2 = worksheet.getCell("X" + headerCountLable2);
    l2.value = "Component/Item";
    l2.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    l2.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    l2.alignment = { vertical: "middle", horizontal: "center" };

    let l3 = worksheet.getCell("Y" + headerCountLable2);
    l3.value = "Description";
    l3.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    l3.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    l3.alignment = { vertical: "middle", horizontal: "center" };

    let l4 = worksheet.getCell("Z" + headerCountLable2);
    l4.value = "ST Code";
    l4.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    l4.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    l4.alignment = { vertical: "middle", horizontal: "center" };

    let l5 = worksheet.getCell("AA" + headerCountLable2);
    l5.value = "Placement";
    l5.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    l5.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    l5.alignment = { vertical: "middle", horizontal: "center" };

    let l6 = worksheet.getCell("AB" + headerCountLable2);
    l6.value = "Ref. Code";
    l6.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    l6.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    l6.alignment = { vertical: "middle", horizontal: "center" };


    let l7 = worksheet.getCell("AC" + headerCountLable2);
    l7.value = "Nomination Status";
    l7.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    l7.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    l7.alignment = { vertical: "middle", horizontal: "center" };

    let l8 = worksheet.getCell("AD" + headerCountLable2);
    l8.value = "Supplier";
    l8.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    l8.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    l8.alignment = { vertical: "middle", horizontal: "center" };


    let l9 = worksheet.getCell("AE" + headerCountLable2);
    l9.value = "Country";
    l9.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    l9.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    l9.alignment = { vertical: "middle", horizontal: "center" };


    let l10 = worksheet.getCell("AF" + headerCountLable2);
    l10.value = "UoM";
    l10.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    l10.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    l10.alignment = { vertical: "middle", horizontal: "center" };

    let l11 = worksheet.getCell("AG" + headerCountLable2);
    l11.value = "Consumption";
    l11.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    l11.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    a11.alignment = { vertical: "middle", horizontal: "center" };

    let l12 = worksheet.getCell("AH" + headerCountLable2);
    l12.value = "Wastage Percentage";
    l12.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    l12.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    l12.alignment = { vertical: "middle", horizontal: "center" };

    let l13 = worksheet.getCell("AI" + headerCountLable2);
    l13.value = "Market Unit";
    l13.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    l13.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    l13.alignment = { vertical: "middle", horizontal: "center" };

    let l14 = worksheet.getCell("AJ" + headerCountLable2);
    l14.value = "Con. Value";
    l14.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    l14.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    l14.alignment = { vertical: "middle", horizontal: "center" };

    let l15 = worksheet.getCell("AK" + headerCountLable2);
    l15.value = "Price";
    l15.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    l15.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    l15.alignment = { vertical: "middle", horizontal: "center" };


    let l16 = worksheet.getCell("AL" + headerCountLable2);
    l16.value = "FinCost";
    l16.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    l16.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    l16.alignment = { vertical: "middle", horizontal: "center" };

    let l17 = worksheet.getCell("AM" + headerCountLable2);
    l17.value = "%";
    l17.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    l17.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    l17.alignment = { vertical: "middle", horizontal: "center" };

    let l18 = worksheet.getCell("AN" + headerCountLable2);
    l18.value = "Value";
    l18.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    l18.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    l18.alignment = { vertical: "middle", horizontal: "center" };

    let l19 = worksheet.getCell("AO" + headerCountLable2);
    l19.value = "Comment";
    l19.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    l19.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    l19.alignment = { vertical: "middle", horizontal: "center" };






    var rowCountLable2 = 0
    var lableFastRow2 = rowCountLable2 + 7 + rowCount + 3 + rowCountAccessories2 + 3 + 1 + 1;
    var lableLastRow2 = 0

    for (var itemLable2 of dataTwo4) {
      var costrowCountLable2 = rowCountLable2 + 7 + rowCount + 3 + rowCountAccessories2 + 3 + 1 + 1;;
      let Leb1 = "W" + costrowCountLable2;// row.getCell(1).address;
      worksheet.getCell(Leb1).value = itemLable2[0];
      worksheet.getCell(Leb1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb2 = "X" + costrowCountLable2;//  row.getCell(2).address;
      worksheet.getCell(Leb2).value = itemLable2[1];
      worksheet.getCell(Leb2).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb3 = "Y" + costrowCountLable2;// row.getCell(3).address;
      worksheet.getCell(Leb3).value = itemLable2[2];
      worksheet.getCell(Leb3).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb4 = "Z" + costrowCountLable2; //row.getCell(4).address;
      worksheet.getCell(Leb4).value = itemLable2[3];
      worksheet.getCell(Leb4).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb5 = "AA" + costrowCountLable2; //row.getCell(5).address;
      worksheet.getCell(Leb5).value = itemLable2[4];
      worksheet.getCell(Leb5).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb6 = "AB" + costrowCountLable2; //row.getCell(5).address;
      worksheet.getCell(Leb6).value = itemLable2[5];
      worksheet.getCell(Leb6).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb7 = "AC" + costrowCountLable2; //row.getCell(5).address;
      worksheet.getCell(Leb7).value = itemLable2[6];
      worksheet.getCell(Leb7).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb8 = "AD" + costrowCountLable2; //row.getCell(5).address;
      worksheet.getCell(Leb8).value = itemLable2[7];
      worksheet.getCell(Leb8).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb9 = "AE" + costrowCountLable2; //row.getCell(5).address;
      worksheet.getCell(Leb9).value = itemLable2[8];
      worksheet.getCell(Leb9).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(Leb9).alignment = { vertical: "middle", horizontal: "center" };


      let Leb10 = "AF" + costrowCountLable2; //row.getCell(5).address;
      worksheet.getCell(Leb10).value = itemLable2[9];
      worksheet.getCell(Leb10).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(Leb10).alignment = { vertical: "middle", horizontal: "center" };

      let Leb11 = "AG" + costrowCountLable2; //row.getCell(5).address;
      worksheet.getCell(Leb11).value = itemLable2[10];
      worksheet.getCell(Leb11).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }


      let Leb12 = "AH" + costrowCountLable2; //row.getCell(5).address;
      worksheet.getCell(Leb12).value = itemLable2[11];
      worksheet.getCell(Leb12).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb13 = "AI" + costrowCountLable2; //row.getCell(5).address;
      worksheet.getCell(Leb13).value = itemLable2[12];
      worksheet.getCell(Leb13).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb14 = "AJ" + costrowCountLable2; //row.getCell(5).address;
      worksheet.getCell(Leb14).value = itemLable2[13];
      worksheet.getCell(Leb14).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb15 = "AK" + costrowCountLable2; //row.getCell(5).address;
      worksheet.getCell(Leb15).value = itemLable2[14];
      worksheet.getCell(Leb15).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb16 = "AL" + costrowCountLable2; //row.getCell(5).address;
      worksheet.getCell(Leb16).value = itemLable2[15];
      worksheet.getCell(Leb16).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb17 = "AM" + costrowCountLable2; //row.getCell(5).address;
      worksheet.getCell(Leb17).value = itemLable2[16];
      worksheet.getCell(Leb17).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb18 = "AN" + costrowCountLable2; //row.getCell(5).address;
      worksheet.getCell(Leb18).value = itemLable2[17];
      worksheet.getCell(Leb18).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Leb19 = "AO" + costrowCountLable2; //row.getCell(5).address;
      worksheet.getCell(Leb19).value = itemLable2[18];
      worksheet.getCell(Leb19).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      //Balance
      let Leb20 = "AR" + costrowCountLable2; //row.getCell(5).address;
      worksheet.getCell(Leb20).value = itemLable2[19];
      worksheet.getCell(Leb20).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Leb20).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffedd5a1" },
        bgColor: { argb: "" },
      };

      let Leb21 = "AS" + costrowCountLable2; //row.getCell(5).address;
      worksheet.getCell(Leb21).value = "";
      worksheet.getCell(Leb21).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }


      worksheet.getCell(Leb21).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffedd5a1" },
        bgColor: { argb: "" },
      };



      lableLastRow2 = costrowCountLable2;
      rowCountLable2++
    }


    var headerCountPaking2 = 7 + rowCount + 3 + rowCountAccessories2 + 3 + 1 + rowCountLable2 + 3 + 1;

    let p1 = worksheet.getCell("W" + headerCountPaking2);
    p1.value = "Category";
    p1.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    p1.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    p1.alignment = { vertical: "middle", horizontal: "center" };

    let p2 = worksheet.getCell("X" + headerCountPaking2);
    p2.value = "Component/Item";
    p2.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    p2.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    p2.alignment = { vertical: "middle", horizontal: "center" };

    let p3 = worksheet.getCell("Y" + headerCountPaking2);
    p3.value = "Description";
    p3.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    p3.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    p3.alignment = { vertical: "middle", horizontal: "center" };

    let p4 = worksheet.getCell("Z" + headerCountPaking2);
    p4.value = "ST Code";
    p4.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    p4.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    p4.alignment = { vertical: "middle", horizontal: "center" };

    let p5 = worksheet.getCell("AA" + headerCountPaking2);
    p5.value = "Placement";
    p5.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    p5.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    p5.alignment = { vertical: "middle", horizontal: "center" };

    let p6 = worksheet.getCell("AB" + headerCountPaking2);
    p6.value = "Ref. Code";
    p6.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    p6.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    p6.alignment = { vertical: "middle", horizontal: "center" };


    let p7 = worksheet.getCell("AC" + headerCountPaking2);
    p7.value = "Nomination Status";
    p7.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    p7.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    p7.alignment = { vertical: "middle", horizontal: "center" };

    let p8 = worksheet.getCell("AD" + headerCountPaking2);
    p8.value = "Supplier";
    p8.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    p8.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    p8.alignment = { vertical: "middle", horizontal: "center" };


    let p9 = worksheet.getCell("AE" + headerCountPaking2);
    p9.value = "Country";
    p9.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    p9.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    p9.alignment = { vertical: "middle", horizontal: "center" };


    let p10 = worksheet.getCell("AF" + headerCountPaking2);
    p10.value = "UoM";
    p10.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    p10.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    p10.alignment = { vertical: "middle", horizontal: "center" };

    let p11 = worksheet.getCell("AG" + headerCountPaking2);
    p11.value = "Consumption";
    p11.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    p11.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    a11.alignment = { vertical: "middle", horizontal: "center" };

    let p12 = worksheet.getCell("AH" + headerCountPaking2);
    p12.value = "Wastage Percentage";
    p12.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    p12.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    p12.alignment = { vertical: "middle", horizontal: "center" };

    let p13 = worksheet.getCell("AI" + headerCountPaking2);
    p13.value = "Market Unit";
    p13.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    p13.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    p13.alignment = { vertical: "middle", horizontal: "center" };

    let p14 = worksheet.getCell("AJ" + headerCountPaking2);
    p14.value = "Con. Value";
    p14.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    p14.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    p14.alignment = { vertical: "middle", horizontal: "center" };

    let p15 = worksheet.getCell("AK" + headerCountPaking2);
    p15.value = "Price";
    p15.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    p15.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    p15.alignment = { vertical: "middle", horizontal: "center" };


    let p16 = worksheet.getCell("AL" + headerCountPaking2);
    p16.value = "FinCost";
    p16.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    p16.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    p16.alignment = { vertical: "middle", horizontal: "center" };

    let p17 = worksheet.getCell("AM" + headerCountPaking2);
    p17.value = "%";
    p17.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    p17.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    p17.alignment = { vertical: "middle", horizontal: "center" };

    let p18 = worksheet.getCell("AN" + headerCountPaking2);
    p18.value = "Value";
    p18.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    p18.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    p18.alignment = { vertical: "middle", horizontal: "center" };

    let p19 = worksheet.getCell("AO" + headerCountPaking2);
    p19.value = "Comment";
    p19.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    p19.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    p19.alignment = { vertical: "middle", horizontal: "center" };


    var rowCountPackging2 = 0
    var pakingFastRow2 = rowCountPackging2 + rowCountLable2 + 7 + rowCount + 3 + rowCountAccessories2 + 3 + 1 + 1 + rowCountLable2 + 3 + 1;
    var pakingLastRow2 = 0

    for (var itemPackging2 of dataTwo5) {
      var costrowCountPackging2 = rowCountPackging2 + rowCountLable2 + 7 + rowCount + 3 + rowCountAccessories2 + 3 + 1 + 1 + rowCountLable2 + 3 + 1;
      let Pack1 = "W" + costrowCountPackging2;// row.getCell(1).address;
      worksheet.getCell(Pack1).value = itemPackging2[0];
      worksheet.getCell(Pack1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack2 = "X" + costrowCountPackging2;//  row.getCell(2).address;
      worksheet.getCell(Pack2).value = itemPackging2[1];
      worksheet.getCell(Pack2).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack3 = "Y" + costrowCountPackging2;// row.getCell(3).address;
      worksheet.getCell(Pack3).value = itemPackging2[2];
      worksheet.getCell(Pack3).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack4 = "Z" + costrowCountPackging2; //row.getCell(4).address;
      worksheet.getCell(Pack4).value = itemPackging2[3];
      worksheet.getCell(Pack4).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack5 = "AA" + costrowCountPackging2; //row.getCell(5).address;
      worksheet.getCell(Pack5).value = itemPackging2[4];
      worksheet.getCell(Pack5).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack6 = "AB" + costrowCountPackging2; //row.getCell(5).address;
      worksheet.getCell(Pack6).value = itemPackging2[5];
      worksheet.getCell(Pack6).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack7 = "AC" + costrowCountPackging2; //row.getCell(5).address;
      worksheet.getCell(Pack7).value = itemPackging2[6];
      worksheet.getCell(Pack7).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack8 = "AD" + costrowCountPackging2; //row.getCell(5).address;
      worksheet.getCell(Pack8).value = itemPackging2[7];
      worksheet.getCell(Pack8).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack9 = "AE" + costrowCountPackging2; //row.getCell(5).address;
      worksheet.getCell(Pack9).value = itemPackging2[8];
      worksheet.getCell(Pack9).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(Pack9).alignment = { vertical: "middle", horizontal: "center" };


      let Pack10 = "AF" + costrowCountPackging2; //row.getCell(5).address;
      worksheet.getCell(Pack10).value = itemPackging2[9];
      worksheet.getCell(Pack10).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(Pack10).alignment = { vertical: "middle", horizontal: "center" };

      let Pack11 = "AG" + costrowCountPackging2; //row.getCell(5).address;
      worksheet.getCell(Pack11).value = itemPackging2[10];
      worksheet.getCell(Pack11).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }


      let Pack12 = "AH" + costrowCountPackging2; //row.getCell(5).address;
      worksheet.getCell(Pack12).value = itemPackging2[11];
      worksheet.getCell(Pack12).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack13 = "AI" + costrowCountPackging2; //row.getCell(5).address;
      worksheet.getCell(Pack13).value = itemPackging2[12];
      worksheet.getCell(Pack13).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack14 = "AJ" + costrowCountPackging2; //row.getCell(5).address;
      worksheet.getCell(Pack14).value = itemPackging2[13];
      worksheet.getCell(Pack14).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack15 = "AK" + costrowCountPackging2; //row.getCell(5).address;
      worksheet.getCell(Pack15).value = itemPackging2[14];
      worksheet.getCell(Pack15).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack16 = "AL" + costrowCountPackging2; //row.getCell(5).address;
      worksheet.getCell(Pack16).value = itemPackging2[15];
      worksheet.getCell(Pack16).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack17 = "AM" + costrowCountPackging2; //row.getCell(5).address;
      worksheet.getCell(Pack17).value = itemPackging2[16];
      worksheet.getCell(Pack17).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }


      let Pack18 = "AN" + costrowCountPackging2; //row.getCell(5).address;
      worksheet.getCell(Pack18).value = itemPackging2[17];
      worksheet.getCell(Pack18).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Pack19 = "AO" + costrowCountPackging2; //row.getCell(5).address;
      worksheet.getCell(Pack19).value = itemPackging2[18];
      worksheet.getCell(Pack19).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      //Balance
      let Pack20 = "AR" + costrowCountPackging2; //row.getCell(5).address;
      worksheet.getCell(Pack20).value = itemPackging2[19];
      worksheet.getCell(Pack20).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }


      worksheet.getCell(Pack20).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffedd5a1" },
        bgColor: { argb: "" },
      };

      let Pack21 = "AS" + costrowCountPackging2; //row.getCell(5).address;
      worksheet.getCell(Pack21).value = "";
      worksheet.getCell(Pack21).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Pack21).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffedd5a1" },
        bgColor: { argb: "" },
      };



      pakingLastRow2 = costrowCountPackging2;
      rowCountPackging2++
    }



    var headerProcesssCount2 = 7 + rowCount + 3 + rowCountAccessories2 + 3 + 1 + rowCountLable2 + 3 + 1 + rowCountPackging2 + 3 + 1;

    let pro1 = worksheet.getCell("W" + headerProcesssCount2);
    pro1.value = "Category";
    pro1.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    pro1.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    pro1.alignment = { vertical: "middle", horizontal: "center" };

    let pro2 = worksheet.getCell("X" + headerProcesssCount2);
    pro2.value = "Component/Item";
    pro2.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    pro2.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    pro2.alignment = { vertical: "middle", horizontal: "center" };

    let pro3 = worksheet.getCell("Y" + headerProcesssCount2);
    pro3.value = "Description";
    pro3.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    pro3.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    pro3.alignment = { vertical: "middle", horizontal: "center" };

    let pro4 = worksheet.getCell("Z" + headerProcesssCount2);
    pro4.value = "ST Code";
    pro4.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    pro4.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    pro4.alignment = { vertical: "middle", horizontal: "center" };

    let pro5 = worksheet.getCell("AA" + headerProcesssCount2);
    pro5.value = "Placement";
    pro5.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    pro5.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    pro5.alignment = { vertical: "middle", horizontal: "center" };

    let pro6 = worksheet.getCell("AB" + headerProcesssCount2);
    pro6.value = "Ref. Code";
    pro6.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    pro6.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    pro6.alignment = { vertical: "middle", horizontal: "center" };


    let pro7 = worksheet.getCell("AC" + headerProcesssCount2);
    pro7.value = "Nomination Status";
    pro7.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    pro7.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    pro7.alignment = { vertical: "middle", horizontal: "center" };

    let pro8 = worksheet.getCell("AD" + headerProcesssCount2);
    pro8.value = "Supplier";
    pro8.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    pro8.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    pro8.alignment = { vertical: "middle", horizontal: "center" };


    let pro9 = worksheet.getCell("AE" + headerProcesssCount2);
    pro9.value = "Country";
    pro9.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    pro9.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    pro9.alignment = { vertical: "middle", horizontal: "center" };


    let pro10 = worksheet.getCell("AF" + headerProcesssCount2);
    pro10.value = "UoM";
    pro10.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    pro10.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    pro10.alignment = { vertical: "middle", horizontal: "center" };

    let pro11 = worksheet.getCell("AG" + headerProcesssCount2);
    pro11.value = "Consumption";
    pro11.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    pro11.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    a11.alignment = { vertical: "middle", horizontal: "center" };

    let pro12 = worksheet.getCell("AH" + headerProcesssCount2);
    pro12.value = "Wastage Percentage";
    pro12.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    pro12.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    pro12.alignment = { vertical: "middle", horizontal: "center" };

    let pro13 = worksheet.getCell("AI" + headerProcesssCount2);
    pro13.value = "Market Unit";
    pro13.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    pro13.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    pro13.alignment = { vertical: "middle", horizontal: "center" };

    let pro14 = worksheet.getCell("AJ" + headerProcesssCount2);
    pro14.value = "Con. Value";
    pro14.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    pro14.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    pro14.alignment = { vertical: "middle", horizontal: "center" };

    let pro15 = worksheet.getCell("AK" + headerProcesssCount2);
    pro15.value = "Price";
    pro15.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    pro15.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    pro15.alignment = { vertical: "middle", horizontal: "center" };


    let pro16 = worksheet.getCell("AL" + headerProcesssCount2);
    pro16.value = "FinCost";
    pro16.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    pro16.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    pro16.alignment = { vertical: "middle", horizontal: "center" };

    let pro17 = worksheet.getCell("AM" + headerProcesssCount2);
    pro17.value = "%";
    pro17.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    pro17.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    pro17.alignment = { vertical: "middle", horizontal: "center" };

    let pro18 = worksheet.getCell("AN" + headerProcesssCount2);
    pro18.value = "Value";
    pro18.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    pro18.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    pro18.alignment = { vertical: "middle", horizontal: "center" };

    let pro19 = worksheet.getCell("AO" + headerProcesssCount2);
    pro19.value = "Comment";
    pro19.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4167B8" },
      bgColor: { argb: "" },
    };
    pro19.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    pro19.alignment = { vertical: "middle", horizontal: "center" };





    var rowCountProcesss2 = 0
    var processFastRow = rowCountProcesss2 + 7 + rowCount + 3 + rowCountAccessories2 + 3 + 1 + rowCountLable2 + 3 + 1 + rowCountPackging2 + 3 + 1;
    var processLastRow = 0

    for (var itemProcesss2 of dataTwo6) {
      var costrowCountProcesss2 = rowCountProcesss2 + 7 + rowCount + 3 + rowCountAccessories2 + 3 + 1 + rowCountLable2 + 3 + 1 + rowCountPackging2 + 3 + 1 + 1;
      let Porcss1 = "W" + costrowCountProcesss2;// row.getCell(1).address;
      worksheet.getCell(Porcss1).value = itemProcesss2[0];
      worksheet.getCell(Porcss1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss2 = "X" + costrowCountProcesss2;//  row.getCell(2).address;
      worksheet.getCell(Porcss2).value = itemProcesss2[1];
      worksheet.getCell(Porcss2).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss3 = "Y" + costrowCountProcesss2;// row.getCell(3).address;
      worksheet.getCell(Porcss3).value = itemProcesss2[2];
      worksheet.getCell(Porcss3).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss4 = "Z" + costrowCountProcesss2; //row.getCell(4).address;
      worksheet.getCell(Porcss4).value = itemProcesss2[3];
      worksheet.getCell(Porcss4).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss5 = "AA" + costrowCountProcesss2; //row.getCell(5).address;
      worksheet.getCell(Porcss5).value = itemProcesss2[4];
      worksheet.getCell(Porcss5).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss6 = "AB" + costrowCountProcesss2; //row.getCell(5).address;
      worksheet.getCell(Porcss6).value = itemProcesss2[5];
      worksheet.getCell(Porcss6).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss7 = "AC" + costrowCountProcesss2; //row.getCell(5).address;
      worksheet.getCell(Porcss7).value = itemProcesss2[6];
      worksheet.getCell(Porcss7).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss8 = "AD" + costrowCountProcesss2; //row.getCell(5).address;
      worksheet.getCell(Porcss8).value = itemProcesss2[7];
      worksheet.getCell(Porcss8).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss9 = "AE" + costrowCountProcesss2; //row.getCell(5).address;
      worksheet.getCell(Porcss9).value = itemProcesss2[8];
      worksheet.getCell(Porcss9).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(Porcss9).alignment = { vertical: "middle", horizontal: "center" };


      let Porcss10 = "AF" + costrowCountProcesss2; //row.getCell(5).address;
      worksheet.getCell(Porcss10).value = itemProcesss2[9];
      worksheet.getCell(Porcss10).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(Porcss10).alignment = { vertical: "middle", horizontal: "center" };

      let Porcss11 = "AG" + costrowCountProcesss2; //row.getCell(5).address;
      worksheet.getCell(Porcss11).value = itemProcesss2[10];
      worksheet.getCell(Porcss11).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }


      let Porcss12 = "AH" + costrowCountProcesss2; //row.getCell(5).address;
      worksheet.getCell(Porcss12).value = itemProcesss2[11];
      worksheet.getCell(Porcss12).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss13 = "AI" + costrowCountProcesss2; //row.getCell(5).address;
      worksheet.getCell(Porcss13).value = itemProcesss2[12];
      worksheet.getCell(Porcss13).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss14 = "AJ" + costrowCountProcesss2; //row.getCell(5).address;
      worksheet.getCell(Porcss14).value = itemProcesss2[13];
      worksheet.getCell(Porcss14).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss15 = "AK" + costrowCountProcesss2; //row.getCell(5).address;
      worksheet.getCell(Porcss15).value = itemProcesss2[14];
      worksheet.getCell(Porcss15).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss16 = "AL" + costrowCountProcesss2; //row.getCell(5).address;
      worksheet.getCell(Porcss16).value = itemProcesss2[15];
      worksheet.getCell(Porcss16).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss17 = "AM" + costrowCountProcesss2; //row.getCell(5).address;
      worksheet.getCell(Porcss17).value = itemProcesss2[16];
      worksheet.getCell(Porcss17).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss18 = "AN" + costrowCountProcesss2; //row.getCell(5).address;
      worksheet.getCell(Porcss18).value = itemProcesss2[17];
      worksheet.getCell(Porcss18).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let Porcss19 = "AO" + costrowCountProcesss2; //row.getCell(5).address;
      worksheet.getCell(Porcss19).value = itemProcesss2[18];
      worksheet.getCell(Porcss19).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      //Balance
      let Porcss20 = "AR" + costrowCountProcesss2; //row.getCell(5).address;
      worksheet.getCell(Porcss20).value = itemProcesss2[19];
      worksheet.getCell(Porcss20).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Porcss20).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffedd5a1" },
        bgColor: { argb: "" },
      };

      let Porcss21 = "AS" + costrowCountProcesss2; //row.getCell(5).address;
      worksheet.getCell(Porcss21).value = "";
      worksheet.getCell(Porcss21).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Porcss21).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffedd5a1" },
        bgColor: { argb: "" },
      };


      processLastRow = costrowCountProcesss2;
      rowCountProcesss2++
    }

    debugger
    if (dataTwo2P2.length > 1) {
      var testVal = 3 + rowCountProcesss2 + 7 + rowCount + 3 + rowCountAccessories2 + 3 + 1 + rowCountLable2 + 3 + 1 + rowCountPackging2 + 3 + 1 + 1;
      let SencdPartRow = "W" + testVal;
      worksheet.getCell(SencdPartRow).value = "Part Name:"
      let SecondPartnameRow = "X" + testVal;
      worksheet.getCell(SecondPartnameRow).value = dataTwo2P2[1].partName;


      var costRowCountP2 = testVal + 3;

      let f1 = worksheet.getCell("W" + costRowCountP2);
      f1.value = "Category";
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

      let f2 = worksheet.getCell("X" + costRowCountP2);
      f2.value = "Component/Item";
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
      f2.alignment = { vertical: "middle", horizontal: "center" };

      let f3 = worksheet.getCell("Y" + costRowCountP2);
      f3.value = "Description";
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
      f3.alignment = { vertical: "middle", horizontal: "center" };

      let f4 = worksheet.getCell("Z" + costRowCountP2);
      f4.value = "ST Code";
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
      f4.alignment = { vertical: "middle", horizontal: "center" };

      let f5 = worksheet.getCell("AA" + costRowCountP2);
      f5.value = "Item Placement";
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
      f5.alignment = { vertical: "middle", horizontal: "center" };

      let f6 = worksheet.getCell("AB" + costRowCountP2);
      f6.value = "Item Code";
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
      f6.alignment = { vertical: "middle", horizontal: "center" };


      let f7 = worksheet.getCell("AC" + costRowCountP2);
      f7.value = "Nomination Status";
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
      f7.alignment = { vertical: "middle", horizontal: "center" };

      let f8 = worksheet.getCell("AD" + costRowCountP2);
      f8.value = "Supplier";
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
      f8.alignment = { vertical: "middle", horizontal: "center" };


      let f9 = worksheet.getCell("AE" + costRowCountP2);
      f9.value = "Country";
      f9.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      f9.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      f9.alignment = { vertical: "middle", horizontal: "center" };


      let f10 = worksheet.getCell("AF" + costRowCountP2);
      f10.value = "Cutt Able Width";
      f10.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      f10.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      f10.alignment = { vertical: "middle", horizontal: "center" };

      let f11 = worksheet.getCell("AG" + costRowCountP2);
      f11.value = "UoM";
      f11.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      f11.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      f11.alignment = { vertical: "middle", horizontal: "center" };

      let f12 = worksheet.getCell("AH" + costRowCountP2);
      f12.value = "Consumption";
      f12.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      f12.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      f12.alignment = { vertical: "middle", horizontal: "center" };

      let f13 = worksheet.getCell("AI" + costRowCountP2);
      f13.value = "Market Unit";
      f13.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      f13.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      f13.alignment = { vertical: "middle", horizontal: "center" };

      let f14 = worksheet.getCell("AJ" + costRowCountP2);
      f14.value = "Con. Value";
      f14.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      f14.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      f14.alignment = { vertical: "middle", horizontal: "center" };

      let f15 = worksheet.getCell("AK" + costRowCountP2);
      f15.value = "Price";
      f15.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      f15.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      f15.alignment = { vertical: "middle", horizontal: "center" };


      let f16 = worksheet.getCell("AL" + costRowCountP2);
      f16.value = "Price Mood Name";
      f16.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      f16.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      f16.alignment = { vertical: "middle", horizontal: "center" };

      let f17 = worksheet.getCell("AM" + costRowCountP2);
      f17.value = "Wastage Percentage";
      f17.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      f17.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      f17.alignment = { vertical: "middle", horizontal: "center" };

      let f18 = worksheet.getCell("AN" + costRowCountP2);
      f18.value = "Fin Cost";
      f18.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      f18.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      f18.alignment = { vertical: "middle", horizontal: "center" };

      let f19 = worksheet.getCell("AO" + costRowCountP2);
      f19.value = "%";
      f19.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      f19.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      f19.alignment = { vertical: "middle", horizontal: "center" };

      let f20 = worksheet.getCell("AP" + costRowCountP2);
      f20.value = "Value";
      f20.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      f20.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      f20.alignment = { vertical: "middle", horizontal: "center" };

      let f21 = worksheet.getCell("AQ" + costRowCountP2);
      f21.value = "Comment";
      f21.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      f21.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      f21.alignment = { vertical: "middle", horizontal: "center" };


      let f22 = worksheet.getCell("AR" + costRowCountP2);
      f22.value = "Balance";
      f22.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffedd5a1" },
        bgColor: { argb: "" },
      };
      f22.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      f22.alignment = { vertical: "middle", horizontal: "center" };

      let f23 = worksheet.getCell("AS" + costRowCountP2);
      f23.value = "%";
      f23.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffedd5a1" },
        bgColor: { argb: "" },
      };
      f23.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      f23.alignment = { vertical: "middle", horizontal: "center" };


      debugger
      var rowCountP2 = 0
      var part2StartLenth = costRowCountP2 + 1
      var fabricFastRow2P2 = rowCount + part2StartLenth;
      var fabricLastRow2P2 = 0
      for (var itemFab2P2 of dataTwoP2) {
        var costRowCount2P2 = rowCountP2 + part2StartLenth;
        let fab1 = "W" + costRowCount2P2;// row.getCell(1).address;
        worksheet.getCell(fab1).value = itemFab2P2[0];
        worksheet.getCell(fab1).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let fab2 = "X" + costRowCount2P2;//  row.getCell(2).address;
        worksheet.getCell(fab2).value = itemFab2P2[1];
        worksheet.getCell(fab2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let fab3 = "Y" + costRowCount2P2;// row.getCell(3).address;
        worksheet.getCell(fab3).value = itemFab2P2[2];
        worksheet.getCell(fab3).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let fab4 = "Z" + costRowCount2P2; //row.getCell(4).address;
        worksheet.getCell(fab4).value = itemFab2P2[3];
        worksheet.getCell(fab4).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let fab5 = "AA" + costRowCount2P2; //row.getCell(5).address;
        worksheet.getCell(fab5).value = itemFab2P2[4];
        worksheet.getCell(fab5).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let fab6 = "AB" + costRowCount2P2; //row.getCell(5).address;
        worksheet.getCell(fab6).value = itemFab2P2[5];
        worksheet.getCell(fab6).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let fab7 = "AC" + costRowCount2P2; //row.getCell(5).address;
        worksheet.getCell(fab7).value = itemFab2P2[6];
        worksheet.getCell(fab7).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let fab8 = "AD" + costRowCount2P2; //row.getCell(5).address;
        worksheet.getCell(fab8).value = itemFab2P2[7];
        worksheet.getCell(fab8).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let fab9 = "AE" + costRowCount2P2; //row.getCell(5).address;
        worksheet.getCell(fab9).value = itemFab2P2[8];
        worksheet.getCell(fab9).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        //   worksheet.getCell(fab9).alignment = { vertical: "middle", horizontal: "center" };


        let fab10 = "AF" + costRowCount2P2; //row.getCell(5).address;
        worksheet.getCell(fab10).value = itemFab2P2[9];
        worksheet.getCell(fab10).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        //   worksheet.getCell(fab10).alignment = { vertical: "middle", horizontal: "center" };

        let fab11 = "AG" + costRowCount2P2; //row.getCell(5).address;
        worksheet.getCell(fab11).value = itemFab2P2[10];
        worksheet.getCell(fab11).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }


        let fab12 = "AH" + costRowCount2P2; //row.getCell(5).address;
        worksheet.getCell(fab12).value = itemFab2P2[11];
        worksheet.getCell(fab12).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let fab13 = "AI" + costRowCount2P2; //row.getCell(5).address;
        worksheet.getCell(fab13).value = itemFab2P2[12];
        worksheet.getCell(fab13).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let fab14 = "AJ" + costRowCount2P2; //row.getCell(5).address;
        worksheet.getCell(fab14).value = itemFab2P2[13];
        worksheet.getCell(fab14).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let fab15 = "AK" + costRowCount2; //row.getCell(5).address;
        worksheet.getCell(fab15).value = itemFab2P2[14];
        worksheet.getCell(fab15).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let fab16 = "AL" + costRowCount2P2; //row.getCell(5).address;
        worksheet.getCell(fab16).value = itemFab2P2[15];
        worksheet.getCell(fab16).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let fab17 = "AM" + costRowCount2P2; //row.getCell(5).address;
        worksheet.getCell(fab17).value = itemFab2P2[16];
        worksheet.getCell(fab17).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let fab18 = "AN" + costRowCount2P2; //row.getCell(5).address;
        worksheet.getCell(fab18).value = itemFab2P2[17];
        worksheet.getCell(fab18).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let fab19 = "AO" + costRowCount2P2; //row.getCell(5).address;
        worksheet.getCell(fab19).value = itemFab2[18];
        worksheet.getCell(fab19).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let fab20 = "AP" + costRowCount2P2; //row.getCell(5).address;
        worksheet.getCell(fab20).value = itemFab2P2[19];
        worksheet.getCell(fab20).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let fab21 = "AQ" + costRowCount2P2; //row.getCell(5).address;
        worksheet.getCell(fab21).value = itemFab2P2[20];
        worksheet.getCell(fab21).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        //Balance
        let fab22 = "AR" + costRowCount2P2; //row.getCell(5).address;
        worksheet.getCell(fab22).value = itemFab2P2[21];
        worksheet.getCell(fab22).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(fab22).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "ffedd5a1" },
          bgColor: { argb: "" },
        };

        let fab23 = "AS" + costRowCount2P2; //row.getCell(5).address;
        worksheet.getCell(fab23).value = "";
        worksheet.getCell(fab23).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(fab23).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "ffedd5a1" },
          bgColor: { argb: "" },
        };



        fabricLastRow2P2 = costRowCount2P2;
        rowCountP2++
      }


      var headerCountAccessories2P2 = part2StartLenth + rowCountP2 + 3;

      let a1 = worksheet.getCell("W" + headerCountAccessories2P2);
      a1.value = "Category";
      a1.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      a1.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      a1.alignment = { vertical: "middle", horizontal: "center" };

      let a2 = worksheet.getCell("X" + headerCountAccessories2P2);
      a2.value = "Component/Item";
      a2.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      a2.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      a2.alignment = { vertical: "middle", horizontal: "center" };

      let a3 = worksheet.getCell("Y" + headerCountAccessories2P2);
      a3.value = "Description";
      a3.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      a3.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      a3.alignment = { vertical: "middle", horizontal: "center" };

      let a4 = worksheet.getCell("Z" + headerCountAccessories2P2);
      a4.value = "ST Code";
      a4.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      a4.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      a4.alignment = { vertical: "middle", horizontal: "center" };

      let a5 = worksheet.getCell("AA" + headerCountAccessories2P2);
      a5.value = "Placement";
      a5.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      a5.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      a5.alignment = { vertical: "middle", horizontal: "center" };

      let a6 = worksheet.getCell("AB" + headerCountAccessories2P2);
      a6.value = "Ref. Code";
      a6.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      a6.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      a6.alignment = { vertical: "middle", horizontal: "center" };


      let a7 = worksheet.getCell("AC" + headerCountAccessories2P2);
      a7.value = "Nomination Status";
      a7.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      a7.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      a7.alignment = { vertical: "middle", horizontal: "center" };

      let a8 = worksheet.getCell("AD" + headerCountAccessories2P2);
      a8.value = "Supplier";
      a8.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      a8.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      a8.alignment = { vertical: "middle", horizontal: "center" };


      let a9 = worksheet.getCell("AE" + headerCountAccessories2P2);
      a9.value = "Country";
      a9.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      a9.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      a9.alignment = { vertical: "middle", horizontal: "center" };


      let a10 = worksheet.getCell("AF" + headerCountAccessories2P2);
      a10.value = "UoM";
      a10.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      a10.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      a10.alignment = { vertical: "middle", horizontal: "center" };

      let a11 = worksheet.getCell("AG" + headerCountAccessories2P2);
      a11.value = "Consumption";
      a11.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      a11.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      a11.alignment = { vertical: "middle", horizontal: "center" };

      let a12 = worksheet.getCell("AH" + headerCountAccessories2P2);
      a12.value = "Wastage Percentage";
      a12.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      a12.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      a12.alignment = { vertical: "middle", horizontal: "center" };

      let a13 = worksheet.getCell("AI" + headerCountAccessories2P2);
      a13.value = "Market Unit";
      a13.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      a13.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      a13.alignment = { vertical: "middle", horizontal: "center" };

      let a14 = worksheet.getCell("AJ" + headerCountAccessories2P2);
      a14.value = "Con. Value";
      a14.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      a14.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      a14.alignment = { vertical: "middle", horizontal: "center" };

      let a15 = worksheet.getCell("AK" + headerCountAccessories2P2);
      a15.value = "Price";
      a15.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      a15.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      a15.alignment = { vertical: "middle", horizontal: "center" };


      let a16 = worksheet.getCell("AL" + headerCountAccessories2P2);
      a16.value = "FinCost";
      a16.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      a16.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      a16.alignment = { vertical: "middle", horizontal: "center" };

      let a17 = worksheet.getCell("AM" + headerCountAccessories2P2);
      a17.value = "%";
      a17.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      a17.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      a17.alignment = { vertical: "middle", horizontal: "center" };

      let a18 = worksheet.getCell("AN" + headerCountAccessories2P2);
      a18.value = "Value";
      a18.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      a18.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      a18.alignment = { vertical: "middle", horizontal: "center" };

      let a19 = worksheet.getCell("AO" + headerCountAccessories2P2);
      a19.value = "Comment";
      a19.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      a19.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      a19.alignment = { vertical: "middle", horizontal: "center" };


      var rowCountAccessories2P2 = 0
      var accessoriesFastRow2P2 = rowCountAccessories2P2 + part2StartLenth + rowCountP2 + 3 + 1;
      var accessoriesLastRow2P2 = 0

      for (var itemAcs2P2 of dataTwo1P2) {
        var costrowCountAccessories2P2 = rowCountAccessories2P2 + part2StartLenth + rowCountP2 + 3 + 1;
        let Acs1 = "W" + costrowCountAccessories2P2;// row.getCell(1).address;
        worksheet.getCell(Acs1).value = itemAcs2P2[0];
        worksheet.getCell(Acs1).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Acs2 = "X" + costrowCountAccessories2P2;//  row.getCell(2).address;
        worksheet.getCell(Acs2).value = itemAcs2P2[1];
        worksheet.getCell(Acs2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Acs3 = "Y" + costrowCountAccessories2P2;// row.getCell(3).address;
        worksheet.getCell(Acs3).value = itemAcs2P2[2];
        worksheet.getCell(Acs3).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Acs4 = "Z" + costrowCountAccessories2P2; //row.getCell(4).address;
        worksheet.getCell(Acs4).value = itemAcs2P2[3];
        worksheet.getCell(Acs4).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Acs5 = "AA" + costrowCountAccessories2P2; //row.getCell(5).address;
        worksheet.getCell(Acs5).value = itemAcs2P2[4];
        worksheet.getCell(Acs5).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Acs6 = "AB" + costrowCountAccessories2P2; //row.getCell(5).address;
        worksheet.getCell(Acs6).value = itemAcs2P2[5];
        worksheet.getCell(Acs6).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Acs7 = "AC" + costrowCountAccessories2P2; //row.getCell(5).address;
        worksheet.getCell(Acs7).value = itemAcs2P2[6];
        worksheet.getCell(Acs7).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Acs8 = "AD" + costrowCountAccessories2P2; //row.getCell(5).address;
        worksheet.getCell(Acs8).value = itemAcs2P2[7];
        worksheet.getCell(Acs8).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Acs9 = "AE" + costrowCountAccessories2P2; //row.getCell(5).address;
        worksheet.getCell(Acs9).value = itemAcs2P2[8];
        worksheet.getCell(Acs9).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        //   worksheet.getCell(Acs9).alignment = { vertical: "middle", horizontal: "center" };


        let Acs10 = "AF" + costrowCountAccessories2P2; //row.getCell(5).address;
        worksheet.getCell(Acs10).value = itemAcs2P2[9];
        worksheet.getCell(Acs10).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        //   worksheet.getCell(Acs10).alignment = { vertical: "middle", horizontal: "center" };

        let Acs11 = "AG" + costrowCountAccessories2P2; //row.getCell(5).address;
        worksheet.getCell(Acs11).value = itemAcs2P2[10];
        worksheet.getCell(Acs11).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }


        let Acs12 = "AH" + costrowCountAccessories2P2; //row.getCell(5).address;
        worksheet.getCell(Acs12).value = itemAcs2P2[11];
        worksheet.getCell(Acs12).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Acs13 = "AI" + costrowCountAccessories2P2; //row.getCell(5).address;
        worksheet.getCell(Acs13).value = itemAcs2P2[12];
        worksheet.getCell(Acs13).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Acs14 = "AJ" + costrowCountAccessories2P2; //row.getCell(5).address;
        worksheet.getCell(Acs14).value = itemAcs2P2[13];
        worksheet.getCell(Acs14).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Acs15 = "AK" + costrowCountAccessories2P2; //row.getCell(5).address;
        worksheet.getCell(Acs15).value = itemAcs2P2[14];
        worksheet.getCell(Acs15).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Acs16 = "AL" + costrowCountAccessories2P2; //row.getCell(5).address;
        worksheet.getCell(Acs16).value = itemAcs2P2[15];
        worksheet.getCell(Acs16).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Acs17 = "AM" + costrowCountAccessories2P2; //row.getCell(5).address;
        worksheet.getCell(Acs17).value = itemAcs2P2[16];
        worksheet.getCell(Acs17).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Acs18 = "AN" + costrowCountAccessories2P2; //row.getCell(5).address;
        worksheet.getCell(Acs18).value = itemAcs2P2[17];
        worksheet.getCell(Acs18).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Acs19 = "AO" + costrowCountAccessories2P2; //row.getCell(5).address;
        worksheet.getCell(Acs19).value = itemAcs2P2[18];
        worksheet.getCell(Acs19).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }


        // Balance
        let Acs20 = "AR" + costrowCountAccessories2P2; //row.getCell(5).address;
        worksheet.getCell(Acs20).value = itemAcs2P2[19];
        worksheet.getCell(Acs20).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Acs20).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "ffedd5a1" },
          bgColor: { argb: "" },
        };

        let Acs21 = "AS" + costrowCountAccessories2P2; //row.getCell(5).address;
        worksheet.getCell(Acs21).value = "";
        worksheet.getCell(Acs21).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Acs21).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "ffedd5a1" },
          bgColor: { argb: "" },
        };


        accessoriesLastRow2P2 = costrowCountAccessories2P2;
        rowCountAccessories2P2++
      }



      var headerCountLable2P2 = part2StartLenth + rowCountP2 + 3 + rowCountAccessories2P2 + 3 + 1;

      let l1 = worksheet.getCell("W" + headerCountLable2P2);
      l1.value = "Category";
      l1.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      l1.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      l1.alignment = { vertical: "middle", horizontal: "center" };

      let l2 = worksheet.getCell("X" + headerCountLable2P2);
      l2.value = "Component/Item";
      l2.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      l2.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      l2.alignment = { vertical: "middle", horizontal: "center" };

      let l3 = worksheet.getCell("Y" + headerCountLable2P2);
      l3.value = "Description";
      l3.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      l3.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      l3.alignment = { vertical: "middle", horizontal: "center" };

      let l4 = worksheet.getCell("Z" + headerCountLable2P2);
      l4.value = "ST Code";
      l4.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      l4.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      l4.alignment = { vertical: "middle", horizontal: "center" };

      let l5 = worksheet.getCell("AA" + headerCountLable2P2);
      l5.value = "Placement";
      l5.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      l5.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      l5.alignment = { vertical: "middle", horizontal: "center" };

      let l6 = worksheet.getCell("AB" + headerCountLable2P2);
      l6.value = "Ref. Code";
      l6.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      l6.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      l6.alignment = { vertical: "middle", horizontal: "center" };


      let l7 = worksheet.getCell("AC" + headerCountLable2P2);
      l7.value = "Nomination Status";
      l7.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      l7.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      l7.alignment = { vertical: "middle", horizontal: "center" };

      let l8 = worksheet.getCell("AD" + headerCountLable2P2);
      l8.value = "Supplier";
      l8.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      l8.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      l8.alignment = { vertical: "middle", horizontal: "center" };


      let l9 = worksheet.getCell("AE" + headerCountLable2P2);
      l9.value = "Country";
      l9.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      l9.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      l9.alignment = { vertical: "middle", horizontal: "center" };


      let l10 = worksheet.getCell("AF" + headerCountLable2P2);
      l10.value = "UoM";
      l10.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      l10.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      l10.alignment = { vertical: "middle", horizontal: "center" };

      let l11 = worksheet.getCell("AG" + headerCountLable2P2);
      l11.value = "Consumption";
      l11.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      l11.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      a11.alignment = { vertical: "middle", horizontal: "center" };

      let l12 = worksheet.getCell("AH" + headerCountLable2P2);
      l12.value = "Wastage Percentage";
      l12.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      l12.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      l12.alignment = { vertical: "middle", horizontal: "center" };

      let l13 = worksheet.getCell("AI" + headerCountLable2P2);
      l13.value = "Market Unit";
      l13.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      l13.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      l13.alignment = { vertical: "middle", horizontal: "center" };

      let l14 = worksheet.getCell("AJ" + headerCountLable2P2);
      l14.value = "Con. Value";
      l14.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      l14.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      l14.alignment = { vertical: "middle", horizontal: "center" };

      let l15 = worksheet.getCell("AK" + headerCountLable2P2);
      l15.value = "Price";
      l15.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      l15.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      l15.alignment = { vertical: "middle", horizontal: "center" };


      let l16 = worksheet.getCell("AL" + headerCountLable2P2);
      l16.value = "FinCost";
      l16.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      l16.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      l16.alignment = { vertical: "middle", horizontal: "center" };

      let l17 = worksheet.getCell("AM" + headerCountLable2P2);
      l17.value = "%";
      l17.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      l17.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      l17.alignment = { vertical: "middle", horizontal: "center" };

      let l18 = worksheet.getCell("AN" + headerCountLable2P2);
      l18.value = "Value";
      l18.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      l18.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      l18.alignment = { vertical: "middle", horizontal: "center" };

      let l19 = worksheet.getCell("AO" + headerCountLable2P2);
      l19.value = "Comment";
      l19.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      l19.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      l19.alignment = { vertical: "middle", horizontal: "center" };






      var rowCountLable2P2 = 0
      var lableFastRow2P2 = rowCountLable2P2 + part2StartLenth + rowCountP2 + 3 + rowCountAccessories2P2 + 3 + 1 + 1;
      var lableLastRow2P2 = 0

      for (var itemLable2P2 of dataTwo4P2) {
        var costrowCountLable2P2 = rowCountLable2P2 + part2StartLenth + rowCountP2 + 3 + rowCountAccessories2P2 + 3 + 1 + 1;;
        let Leb1 = "W" + costrowCountLable2P2;// row.getCell(1).address;
        worksheet.getCell(Leb1).value = itemLable2P2[0];
        worksheet.getCell(Leb1).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Leb2 = "X" + costrowCountLable2P2;//  row.getCell(2).address;
        worksheet.getCell(Leb2).value = itemLable2P2[1];
        worksheet.getCell(Leb2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Leb3 = "Y" + costrowCountLable2P2;// row.getCell(3).address;
        worksheet.getCell(Leb3).value = itemLable2P2[2];
        worksheet.getCell(Leb3).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Leb4 = "Z" + costrowCountLable2P2; //row.getCell(4).address;
        worksheet.getCell(Leb4).value = itemLable2P2[3];
        worksheet.getCell(Leb4).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Leb5 = "AA" + costrowCountLable2P2; //row.getCell(5).address;
        worksheet.getCell(Leb5).value = itemLable2P2[4];
        worksheet.getCell(Leb5).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Leb6 = "AB" + costrowCountLable2P2; //row.getCell(5).address;
        worksheet.getCell(Leb6).value = itemLable2P2[5];
        worksheet.getCell(Leb6).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Leb7 = "AC" + costrowCountLable2P2; //row.getCell(5).address;
        worksheet.getCell(Leb7).value = itemLable2P2[6];
        worksheet.getCell(Leb7).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Leb8 = "AD" + costrowCountLable2P2; //row.getCell(5).address;
        worksheet.getCell(Leb8).value = itemLable2P2[7];
        worksheet.getCell(Leb8).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Leb9 = "AE" + costrowCountLable2P2; //row.getCell(5).address;
        worksheet.getCell(Leb9).value = itemLable2P2[8];
        worksheet.getCell(Leb9).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        //   worksheet.getCell(Leb9).alignment = { vertical: "middle", horizontal: "center" };


        let Leb10 = "AF" + costrowCountLable2P2; //row.getCell(5).address;
        worksheet.getCell(Leb10).value = itemLable2P2[9];
        worksheet.getCell(Leb10).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        //   worksheet.getCell(Leb10).alignment = { vertical: "middle", horizontal: "center" };

        let Leb11 = "AG" + costrowCountLable2P2; //row.getCell(5).address;
        worksheet.getCell(Leb11).value = itemLable2P2[10];
        worksheet.getCell(Leb11).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }


        let Leb12 = "AH" + costrowCountLable2P2; //row.getCell(5).address;
        worksheet.getCell(Leb12).value = itemLable2P2[11];
        worksheet.getCell(Leb12).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Leb13 = "AI" + costrowCountLable2P2; //row.getCell(5).address;
        worksheet.getCell(Leb13).value = itemLable2P2[12];
        worksheet.getCell(Leb13).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Leb14 = "AJ" + costrowCountLable2P2; //row.getCell(5).address;
        worksheet.getCell(Leb14).value = itemLable2[13];
        worksheet.getCell(Leb14).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Leb15 = "AK" + costrowCountLable2P2; //row.getCell(5).address;
        worksheet.getCell(Leb15).value = itemLable2P2[14];
        worksheet.getCell(Leb15).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Leb16 = "AL" + costrowCountLable2P2; //row.getCell(5).address;
        worksheet.getCell(Leb16).value = itemLable2P2[15];
        worksheet.getCell(Leb16).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Leb17 = "AM" + costrowCountLable2P2; //row.getCell(5).address;
        worksheet.getCell(Leb17).value = itemLable2P2[16];
        worksheet.getCell(Leb17).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Leb18 = "AN" + costrowCountLable2P2; //row.getCell(5).address;
        worksheet.getCell(Leb18).value = itemLable2P2[17];
        worksheet.getCell(Leb18).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Leb19 = "AO" + costrowCountLable2P2; //row.getCell(5).address;
        worksheet.getCell(Leb19).value = itemLable2P2[18];
        worksheet.getCell(Leb19).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        //Balance
        let Leb20 = "AR" + costrowCountLable2P2; //row.getCell(5).address;
        worksheet.getCell(Leb20).value = itemLable2P2[19];
        worksheet.getCell(Leb20).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Leb20).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "ffedd5a1" },
          bgColor: { argb: "" },
        };

        let Leb21 = "AS" + costrowCountLable2P2; //row.getCell(5).address;
        worksheet.getCell(Leb21).value = "";
        worksheet.getCell(Leb21).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Leb21).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "ffedd5a1" },
          bgColor: { argb: "" },
        };


        lableLastRow2P2 = costrowCountLable2P2;
        rowCountLable2P2++
      }


      var headerCountPaking2P2 = part2StartLenth + rowCountP2 + 3 + rowCountAccessories2P2 + 3 + 1 + rowCountLable2P2 + 3 + 1;

      let p1 = worksheet.getCell("W" + headerCountPaking2P2);
      p1.value = "Category";
      p1.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      p1.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      p1.alignment = { vertical: "middle", horizontal: "center" };

      let p2 = worksheet.getCell("X" + headerCountPaking2P2);
      p2.value = "Component/Item";
      p2.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      p2.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      p2.alignment = { vertical: "middle", horizontal: "center" };

      let p3 = worksheet.getCell("Y" + headerCountPaking2P2);
      p3.value = "Description";
      p3.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      p3.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      p3.alignment = { vertical: "middle", horizontal: "center" };

      let p4 = worksheet.getCell("Z" + headerCountPaking2P2);
      p4.value = "ST Code";
      p4.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      p4.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      p4.alignment = { vertical: "middle", horizontal: "center" };

      let p5 = worksheet.getCell("AA" + headerCountPaking2P2);
      p5.value = "Placement";
      p5.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      p5.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      p5.alignment = { vertical: "middle", horizontal: "center" };

      let p6 = worksheet.getCell("AB" + headerCountPaking2P2);
      p6.value = "Ref. Code";
      p6.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      p6.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      p6.alignment = { vertical: "middle", horizontal: "center" };


      let p7 = worksheet.getCell("AC" + headerCountPaking2P2);
      p7.value = "Nomination Status";
      p7.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      p7.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      p7.alignment = { vertical: "middle", horizontal: "center" };

      let p8 = worksheet.getCell("AD" + headerCountPaking2P2);
      p8.value = "Supplier";
      p8.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      p8.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      p8.alignment = { vertical: "middle", horizontal: "center" };


      let p9 = worksheet.getCell("AE" + headerCountPaking2P2);
      p9.value = "Country";
      p9.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      p9.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      p9.alignment = { vertical: "middle", horizontal: "center" };


      let p10 = worksheet.getCell("AF" + headerCountPaking2P2);
      p10.value = "UoM";
      p10.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      p10.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      p10.alignment = { vertical: "middle", horizontal: "center" };

      let p11 = worksheet.getCell("AG" + headerCountPaking2P2);
      p11.value = "Consumption";
      p11.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      p11.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      a11.alignment = { vertical: "middle", horizontal: "center" };

      let p12 = worksheet.getCell("AH" + headerCountPaking2P2);
      p12.value = "Wastage Percentage";
      p12.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      p12.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      p12.alignment = { vertical: "middle", horizontal: "center" };

      let p13 = worksheet.getCell("AI" + headerCountPaking2P2);
      p13.value = "Market Unit";
      p13.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      p13.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      p13.alignment = { vertical: "middle", horizontal: "center" };

      let p14 = worksheet.getCell("AJ" + headerCountPaking2P2);
      p14.value = "Con. Value";
      p14.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      p14.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      p14.alignment = { vertical: "middle", horizontal: "center" };

      let p15 = worksheet.getCell("AK" + headerCountPaking2P2);
      p15.value = "Price";
      p15.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      p15.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      p15.alignment = { vertical: "middle", horizontal: "center" };


      let p16 = worksheet.getCell("AL" + headerCountPaking2P2);
      p16.value = "FinCost";
      p16.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      p16.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      p16.alignment = { vertical: "middle", horizontal: "center" };

      let p17 = worksheet.getCell("AM" + headerCountPaking2P2);
      p17.value = "%";
      p17.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      p17.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      p17.alignment = { vertical: "middle", horizontal: "center" };

      let p18 = worksheet.getCell("AN" + headerCountPaking2P2);
      p18.value = "Value";
      p18.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      p18.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      p18.alignment = { vertical: "middle", horizontal: "center" };

      let p19 = worksheet.getCell("AO" + headerCountPaking2);
      p19.value = "Comment";
      p19.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      p19.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      p19.alignment = { vertical: "middle", horizontal: "center" };




      var rowCountPackging2P2 = 0
      var pakingFastRow2P2 = rowCountPackging2P2 + rowCountLable2P2 + part2StartLenth + rowCountP2 + 3 + rowCountAccessories2P2 + 3 + 1 + 1 + rowCountLable2P2 + 3 + 1;
      var pakingLastRow2P2 = 0

      for (var itemPackging2P2 of dataTwo5P2) {
        var costrowCountPackging2P2 = rowCountPackging2P2 + rowCountLable2P2 + part2StartLenth + rowCountP2 + 3 + rowCountAccessories2P2 + 3 + 1 + 1 + rowCountLable2P2 + 3 + 1;
        let Pack1 = "W" + costrowCountPackging2P2;// row.getCell(1).address;
        worksheet.getCell(Pack1).value = itemPackging2P2[0];
        worksheet.getCell(Pack1).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Pack2 = "X" + costrowCountPackging2P2;//  row.getCell(2).address;
        worksheet.getCell(Pack2).value = itemPackging2P2[1];
        worksheet.getCell(Pack2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Pack3 = "Y" + costrowCountPackging2P2;// row.getCell(3).address;
        worksheet.getCell(Pack3).value = itemPackging2P2[2];
        worksheet.getCell(Pack3).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Pack4 = "Z" + costrowCountPackging2P2; //row.getCell(4).address;
        worksheet.getCell(Pack4).value = itemPackging2P2[3];
        worksheet.getCell(Pack4).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Pack5 = "AA" + costrowCountPackging2P2; //row.getCell(5).address;
        worksheet.getCell(Pack5).value = itemPackging2P2[4];
        worksheet.getCell(Pack5).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Pack6 = "AB" + costrowCountPackging2P2; //row.getCell(5).address;
        worksheet.getCell(Pack6).value = itemPackging2P2[5];
        worksheet.getCell(Pack6).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Pack7 = "AC" + costrowCountPackging2P2; //row.getCell(5).address;
        worksheet.getCell(Pack7).value = itemPackging2P2[6];
        worksheet.getCell(Pack7).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Pack8 = "AD" + costrowCountPackging2P2; //row.getCell(5).address;
        worksheet.getCell(Pack8).value = itemPackging2P2[7];
        worksheet.getCell(Pack8).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Pack9 = "AE" + costrowCountPackging2P2; //row.getCell(5).address;
        worksheet.getCell(Pack9).value = itemPackging2P2[8];
        worksheet.getCell(Pack9).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        //   worksheet.getCell(Pack9).alignment = { vertical: "middle", horizontal: "center" };


        let Pack10 = "AF" + costrowCountPackging2P2; //row.getCell(5).address;
        worksheet.getCell(Pack10).value = itemPackging2P2[9];
        worksheet.getCell(Pack10).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        //   worksheet.getCell(Pack10).alignment = { vertical: "middle", horizontal: "center" };

        let Pack11 = "AG" + costrowCountPackging2P2; //row.getCell(5).address;
        worksheet.getCell(Pack11).value = itemPackging2P2[10];
        worksheet.getCell(Pack11).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }


        let Pack12 = "AH" + costrowCountPackging2P2; //row.getCell(5).address;
        worksheet.getCell(Pack12).value = itemPackging2P2[11];
        worksheet.getCell(Pack12).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Pack13 = "AI" + costrowCountPackging2P2; //row.getCell(5).address;
        worksheet.getCell(Pack13).value = itemPackging2P2[12];
        worksheet.getCell(Pack13).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Pack14 = "AJ" + costrowCountPackging2P2; //row.getCell(5).address;
        worksheet.getCell(Pack14).value = itemPackging2P2[13];
        worksheet.getCell(Pack10).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Pack15 = "AK" + costrowCountPackging2P2; //row.getCell(5).address;
        worksheet.getCell(Pack15).value = itemPackging2[14];
        worksheet.getCell(Pack15).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Pack16 = "AL" + costrowCountPackging2P2; //row.getCell(5).address;
        worksheet.getCell(Pack16).value = itemPackging2[15];
        worksheet.getCell(Pack16).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Pack17 = "AM" + costrowCountPackging2; //row.getCell(5).address;
        worksheet.getCell(Pack17).value = itemPackging2P2[16];
        worksheet.getCell(Pack17).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Pack18 = "AN" + costrowCountPackging2P2; //row.getCell(5).address;
        worksheet.getCell(Pack18).value = itemPackging2P2[17];
        worksheet.getCell(Pack18).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }


        let Pack19 = "AO" + costrowCountPackging2P2; //row.getCell(5).address;
        worksheet.getCell(Pack19).value = itemPackging2P2[18];
        worksheet.getCell(Pack19).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        //Balance
        let Pack20 = "AR" + costrowCountPackging2P2; //row.getCell(5).address;
        worksheet.getCell(Pack20).value = itemPackging2P2[19];
        worksheet.getCell(Pack20).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Pack20).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "ffedd5a1" },
          bgColor: { argb: "" },
        };

        let Pack21 = "AS" + costrowCountPackging2P2; //row.getCell(5).address;
        worksheet.getCell(Pack21).value = "";
        worksheet.getCell(Pack21).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Pack21).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "ffedd5a1" },
          bgColor: { argb: "" },
        };


        pakingLastRow2P2 = costrowCountPackging2P2;
        rowCountPackging2P2++
      }



      var headerProcesssCount2P2 = part2StartLenth + rowCountP2 + 3 + rowCountAccessories2P2 + 3 + 1 + rowCountLable2P2 + 3 + 1 + rowCountPackging2P2 + 3 + 1;

      let pro1 = worksheet.getCell("W" + headerProcesssCount2P2);
      pro1.value = "Category";
      pro1.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      pro1.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      pro1.alignment = { vertical: "middle", horizontal: "center" };

      let pro2 = worksheet.getCell("X" + headerProcesssCount2P2);
      pro2.value = "Component/Item";
      pro2.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      pro2.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      pro2.alignment = { vertical: "middle", horizontal: "center" };

      let pro3 = worksheet.getCell("Y" + headerProcesssCount2P2);
      pro3.value = "Description";
      pro3.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      pro3.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      pro3.alignment = { vertical: "middle", horizontal: "center" };

      let pro4 = worksheet.getCell("Z" + headerProcesssCount2P2);
      pro4.value = "ST Code";
      pro4.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      pro4.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      pro4.alignment = { vertical: "middle", horizontal: "center" };

      let pro5 = worksheet.getCell("AA" + headerProcesssCount2P2);
      pro5.value = "Placement";
      pro5.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      pro5.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      pro5.alignment = { vertical: "middle", horizontal: "center" };

      let pro6 = worksheet.getCell("AB" + headerProcesssCount2P2);
      pro6.value = "Ref. Code";
      pro6.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      pro6.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      pro6.alignment = { vertical: "middle", horizontal: "center" };


      let pro7 = worksheet.getCell("AC" + headerProcesssCount2P2);
      pro7.value = "Nomination Status";
      pro7.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      pro7.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      pro7.alignment = { vertical: "middle", horizontal: "center" };

      let pro8 = worksheet.getCell("AD" + headerProcesssCount2P2);
      pro8.value = "Supplier";
      pro8.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      pro8.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      pro8.alignment = { vertical: "middle", horizontal: "center" };


      let pro9 = worksheet.getCell("AE" + headerProcesssCount2P2);
      pro9.value = "Country";
      pro9.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      pro9.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      pro9.alignment = { vertical: "middle", horizontal: "center" };


      let pro10 = worksheet.getCell("AF" + headerProcesssCount2P2);
      pro10.value = "UoM";
      pro10.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      pro10.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      pro10.alignment = { vertical: "middle", horizontal: "center" };

      let pro11 = worksheet.getCell("AG" + headerProcesssCount2P2);
      pro11.value = "Consumption";
      pro11.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      pro11.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      a11.alignment = { vertical: "middle", horizontal: "center" };

      let pro12 = worksheet.getCell("AH" + headerProcesssCount2P2);
      pro12.value = "Wastage Percentage";
      pro12.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      pro12.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      pro12.alignment = { vertical: "middle", horizontal: "center" };

      let pro13 = worksheet.getCell("AI" + headerProcesssCount2P2);
      pro13.value = "Market Unit";
      pro13.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      pro13.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      pro13.alignment = { vertical: "middle", horizontal: "center" };

      let pro14 = worksheet.getCell("AJ" + headerProcesssCount2P2);
      pro14.value = "Con. Value";
      pro14.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      pro14.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      pro14.alignment = { vertical: "middle", horizontal: "center" };

      let pro15 = worksheet.getCell("AK" + headerProcesssCount2P2);
      pro15.value = "Price";
      pro15.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      pro15.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      pro15.alignment = { vertical: "middle", horizontal: "center" };


      let pro16 = worksheet.getCell("AL" + headerProcesssCount2P2);
      pro16.value = "FinCost";
      pro16.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      pro16.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      pro16.alignment = { vertical: "middle", horizontal: "center" };

      let pro17 = worksheet.getCell("AM" + headerProcesssCount2P2);
      pro17.value = "%";
      pro17.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      pro17.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      pro17.alignment = { vertical: "middle", horizontal: "center" };

      let pro18 = worksheet.getCell("AN" + headerProcesssCount2P2);
      pro18.value = "Value";
      pro18.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      pro18.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      pro18.alignment = { vertical: "middle", horizontal: "center" };

      let pro19 = worksheet.getCell("AO" + headerProcesssCount2P2);
      pro19.value = "Comment";
      pro19.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      pro19.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      pro19.alignment = { vertical: "middle", horizontal: "center" };



      var rowCountProcesss2P2 = 0
      var processFastRowP2 = rowCountProcesss2P2 + part2StartLenth + rowCountP2 + 3 + rowCountAccessories2P2 + 3 + 1 + rowCountLable2P2 + 3 + 1 + rowCountPackging2P2 + 3 + 1;
      var processLastRowP2 = 0

      for (var itemProcesss2P2 of dataTwo6P2) {
        var costrowCountProcesss2P2 = rowCountProcesss2P2 + part2StartLenth + rowCountP2 + 3 + rowCountAccessories2P2 + 3 + 1 + rowCountLable2P2 + 3 + 1 + rowCountPackging2P2 + 3 + 1 + 1;
        let Porcss1 = "W" + costrowCountProcesss2P2;// row.getCell(1).address;
        worksheet.getCell(Porcss1).value = itemProcesss2P2[0];
        worksheet.getCell(Porcss1).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Porcss2 = "X" + costrowCountProcesss2P2;//  row.getCell(2).address;
        worksheet.getCell(Porcss2).value = itemProcesss2P2[1];
        worksheet.getCell(Porcss2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Porcss3 = "Y" + costrowCountProcesss2P2;// row.getCell(3).address;
        worksheet.getCell(Porcss3).value = itemProcesss2P2[2];
        worksheet.getCell(Porcss3).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Porcss4 = "Z" + costrowCountProcesss2P2; //row.getCell(4).address;
        worksheet.getCell(Porcss4).value = itemProcesss2P2[3];
        worksheet.getCell(Porcss4).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Porcss5 = "AA" + costrowCountProcesss2P2; //row.getCell(5).address;
        worksheet.getCell(Porcss5).value = itemProcesss2P2[4];
        worksheet.getCell(Porcss5).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Porcss6 = "AB" + costrowCountProcesss2P2; //row.getCell(5).address;
        worksheet.getCell(Porcss6).value = itemProcesss2P2[5];
        worksheet.getCell(Porcss6).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Porcss7 = "AC" + costrowCountProcesss2P2; //row.getCell(5).address;
        worksheet.getCell(Porcss7).value = itemProcesss2P2[6];
        worksheet.getCell(Porcss7).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Porcss8 = "AD" + costrowCountProcesss2P2; //row.getCell(5).address;
        worksheet.getCell(Porcss8).value = itemProcesss2P2[7];
        worksheet.getCell(Porcss8).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Porcss9 = "AE" + costrowCountProcesss2P2; //row.getCell(5).address;
        worksheet.getCell(Porcss9).value = itemProcesss2P2[8];
        worksheet.getCell(Porcss9).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        //   worksheet.getCell(Porcss9).alignment = { vertical: "middle", horizontal: "center" };


        let Porcss10 = "AF" + costrowCountProcesss2P2; //row.getCell(5).address;
        worksheet.getCell(Porcss10).value = itemProcesss2P2[9];
        worksheet.getCell(Porcss10).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        //   worksheet.getCell(Porcss10).alignment = { vertical: "middle", horizontal: "center" };

        let Porcss11 = "AG" + costrowCountProcesss2P2; //row.getCell(5).address;
        worksheet.getCell(Porcss11).value = itemProcesss2P2[10];
        worksheet.getCell(Porcss11).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }


        let Porcss12 = "AH" + costrowCountProcesss2P2; //row.getCell(5).address;
        worksheet.getCell(Porcss12).value = itemProcesss2P2[11];
        worksheet.getCell(Porcss12).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Porcss13 = "AI" + costrowCountProcesss2P2; //row.getCell(5).address;
        worksheet.getCell(Porcss13).value = itemProcesss2P2[12];
        worksheet.getCell(Porcss13).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Porcss14 = "AJ" + costrowCountProcesss2P2; //row.getCell(5).address;
        worksheet.getCell(Porcss14).value = itemProcesss2P2[13];
        worksheet.getCell(Porcss14).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Porcss15 = "AK" + costrowCountProcesss2P2; //row.getCell(5).address;
        worksheet.getCell(Porcss15).value = itemProcesss2P2[14];
        worksheet.getCell(Porcss15).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }


        let Porcss16 = "AL" + costrowCountProcesss2P2; //row.getCell(5).address;
        worksheet.getCell(Porcss16).value = itemProcesss2P2[15];
        worksheet.getCell(Porcss16).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Porcss17 = "AM" + costrowCountProcesss2P2; //row.getCell(5).address;
        worksheet.getCell(Porcss17).value = itemProcesss2[16];
        worksheet.getCell(Porcss17).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Porcss18 = "AN" + costrowCountProcesss2P2; //row.getCell(5).address;
        worksheet.getCell(Porcss18).value = itemProcesss2P2[17];
        worksheet.getCell(Porcss18).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        let Porcss19 = "AO" + costrowCountProcesss2P2; //row.getCell(5).address;
        worksheet.getCell(Porcss19).value = itemProcesss2P2[18];
        worksheet.getCell(Porcss19).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        //Balance
        let Porcss20 = "AR" + costrowCountProcesss2P2; //row.getCell(5).address;
        worksheet.getCell(Porcss20).value = itemProcesss2P2[19];
        worksheet.getCell(Porcss20).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Porcss20).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "ffedd5a1" },
          bgColor: { argb: "" },
        };

        let Porcss21 = "AS" + costrowCountProcesss2P2; //row.getCell(5).address;
        worksheet.getCell(Porcss21).value = "";
        worksheet.getCell(Porcss21).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Porcss21).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "ffedd5a1" },
          bgColor: { argb: "" },
        };



        processLastRowP2 = costrowCountProcesss2P2;
        rowCountProcesss2P2++
      }

    }




    //------------------------after comparing cost sheet-------------------------------------//

    let part2P2 = worksheet.getCell("AT2");
    part2P2.value = "Part Name";

    let part2P2Value = worksheet.getCell("AU2");
    part2P2Value.value = dataTwo2[0].partName;
    var costRowCount = 6;

    let acf1 = worksheet.getCell("AT" + costRowCount);
    acf1.value = "Category";
    acf1.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acf1.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acf1.alignment = { vertical: "middle", horizontal: "center" };

    let acf2 = worksheet.getCell("AU" + costRowCount);
    acf2.value = "Component/Item";
    acf2.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acf2.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acf2.alignment = { vertical: "middle", horizontal: "center" };

    let acf3 = worksheet.getCell("AV" + costRowCount);
    acf3.value = "Description";
    acf3.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acf3.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acf3.alignment = { vertical: "middle", horizontal: "center" };

    let acf4 = worksheet.getCell("AW" + costRowCount);
    acf4.value = "ST Code";
    acf4.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acf4.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acf4.alignment = { vertical: "middle", horizontal: "center" };

    let acf5 = worksheet.getCell("AX" + costRowCount);
    acf5.value = "Item Placement";
    acf5.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acf5.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acf5.alignment = { vertical: "middle", horizontal: "center" };

    let acf6 = worksheet.getCell("AY" + costRowCount);
    acf6.value = "Item Code";
    acf6.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acf6.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acf6.alignment = { vertical: "middle", horizontal: "center" };


    let acf7 = worksheet.getCell("AZ" + costRowCount);
    acf7.value = "Nomination Status";
    acf7.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acf7.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acf7.alignment = { vertical: "middle", horizontal: "center" };

    let acf8 = worksheet.getCell("BA" + costRowCount);
    acf8.value = "Supplier";
    acf8.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acf8.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acf8.alignment = { vertical: "middle", horizontal: "center" };


    let acf9 = worksheet.getCell("BB" + costRowCount);
    acf9.value = "Country";
    acf9.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acf9.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acf9.alignment = { vertical: "middle", horizontal: "center" };


    let acf10 = worksheet.getCell("BC" + costRowCount);
    acf10.value = "Cutt Able Width";
    acf10.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acf10.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acf10.alignment = { vertical: "middle", horizontal: "center" };

    let acf11 = worksheet.getCell("BD" + costRowCount);
    acf11.value = "UoM";
    acf11.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acf11.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acf11.alignment = { vertical: "middle", horizontal: "center" };

    let acf12 = worksheet.getCell("BE" + costRowCount);
    acf12.value = "Consumption";
    acf12.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acf12.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acf12.alignment = { vertical: "middle", horizontal: "center" };

    let acf13 = worksheet.getCell("BF" + costRowCount);
    acf13.value = "Market Unit";
    acf13.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acf13.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acf13.alignment = { vertical: "middle", horizontal: "center" };

    let acf14 = worksheet.getCell("BG" + costRowCount);
    acf14.value = "Con. Value";
    acf14.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acf14.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acf14.alignment = { vertical: "middle", horizontal: "center" };

    let acf15 = worksheet.getCell("BH" + costRowCount);
    acf15.value = "Price";
    acf15.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acf15.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acf15.alignment = { vertical: "middle", horizontal: "center" };


    let acf16 = worksheet.getCell("BI" + costRowCount);
    acf16.value = "Price Mood Name";
    acf16.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acf16.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acf16.alignment = { vertical: "middle", horizontal: "center" };

    let acf17 = worksheet.getCell("BJ" + costRowCount);
    acf17.value = "Wastage Percentage";
    acf17.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acf17.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acf17.alignment = { vertical: "middle", horizontal: "center" };

    let acf18 = worksheet.getCell("BK" + costRowCount);
    acf18.value = "Fin Cost";
    acf18.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acf18.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acf18.alignment = { vertical: "middle", horizontal: "center" };

    let acf19 = worksheet.getCell("BL" + costRowCount);
    acf19.value = "%";
    acf19.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acf19.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acf19.alignment = { vertical: "middle", horizontal: "center" };

    let acf20 = worksheet.getCell("BM" + costRowCount);
    acf20.value = "Value";
    acf20.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acf20.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acf20.alignment = { vertical: "middle", horizontal: "center" };

    let acf21 = worksheet.getCell("BN" + costRowCount);
    acf21.value = "Comment";
    acf21.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acf21.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acf21.alignment = { vertical: "middle", horizontal: "center" };



    var rowCount3 = 0
    var fabricFastRow3 = rowCount3 + 6 + 1;
    var fabricLastRow3 = 0
    for (var itemFab3 of dataThree) {
      var costRowCount3 = rowCount3 + 6 + 1;
      let fab1 = "AT" + costRowCount3;// row.getCell(1).address;
      worksheet.getCell(fab1).value = itemFab3[0];
      worksheet.getCell(fab1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(fab1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemFab3[22] },
        bgColor: { argb: "" },
      };

      let fab2 = "AU" + costRowCount3;//  row.getCell(2).address;
      worksheet.getCell(fab2).value = itemFab3[1];
      worksheet.getCell(fab2).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(fab2).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemFab3[23] },
        bgColor: { argb: "" },
      };

      let fab3 = "AV" + costRowCount3;// row.getCell(3).address;
      worksheet.getCell(fab3).value = itemFab3[2];
      worksheet.getCell(fab3).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(fab3).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemFab3[24] },
        bgColor: { argb: "" },
      };

      let fab4 = "AW" + costRowCount3; //row.getCell(4).address;
      worksheet.getCell(fab4).value = itemFab3[3];
      worksheet.getCell(fab4).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(fab4).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemFab3[25] },
        bgColor: { argb: "" },
      };

      let fab5 = "AX" + costRowCount3; //row.getCell(5).address;
      worksheet.getCell(fab5).value = itemFab3[4];
      worksheet.getCell(fab5).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(fab5).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemFab3[26] },
        bgColor: { argb: "" },
      };

      let fab6 = "AY" + costRowCount3; //row.getCell(5).address;
      worksheet.getCell(fab6).value = itemFab3[5];
      worksheet.getCell(fab6).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(fab6).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemFab3[27] },
        bgColor: { argb: "" },
      };

      let fab7 = "AZ" + costRowCount3; //row.getCell(5).address;
      worksheet.getCell(fab7).value = itemFab3[6];
      worksheet.getCell(fab7).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(fab7).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemFab3[28] },
        bgColor: { argb: "" },
      };

      let fab8 = "BA" + costRowCount3; //row.getCell(5).address;
      worksheet.getCell(fab8).value = itemFab3[7];
      worksheet.getCell(fab8).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(fab8).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemFab3[29] },
        bgColor: { argb: "" },
      };

      let fab9 = "BB" + costRowCount3; //row.getCell(5).address;
      worksheet.getCell(fab9).value = itemFab3[8];
      worksheet.getCell(fab9).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(fab9).alignment = { vertical: "middle", horizontal: "center" };

      worksheet.getCell(fab9).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemFab3[30] },
        bgColor: { argb: "" },
      };


      let fab10 = "	BC" + costRowCount3; //row.getCell(5).address;
      worksheet.getCell(fab10).value = itemFab3[9];
      worksheet.getCell(fab10).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(fab10).alignment = { vertical: "middle", horizontal: "center" };

      worksheet.getCell(fab10).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemFab3[31] },
        bgColor: { argb: "" },
      };

      let fab11 = "BD" + costRowCount3; //row.getCell(5).address;
      worksheet.getCell(fab11).value = itemFab3[10];
      worksheet.getCell(fab11).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(fab11).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemFab3[32] },
        bgColor: { argb: "" },
      };


      let fab12 = "BE" + costRowCount3; //row.getCell(5).address;
      worksheet.getCell(fab12).value = itemFab3[11];
      worksheet.getCell(fab12).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(fab12).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemFab3[33] },
        bgColor: { argb: "" },
      };

      let fab13 = "BF" + costRowCount3; //row.getCell(5).address;
      worksheet.getCell(fab13).value = itemFab3[12];
      worksheet.getCell(fab13).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(fab13).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemFab3[34] },
        bgColor: { argb: "" },
      };

      let fab14 = "BG" + costRowCount3; //row.getCell(5).address;
      worksheet.getCell(fab14).value = itemFab3[13];
      worksheet.getCell(fab14).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(fab14).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemFab3[35] },
        bgColor: { argb: "" },
      };

      let fab15 = "BH" + costRowCount3; //row.getCell(5).address;
      worksheet.getCell(fab15).value = itemFab3[14];
      worksheet.getCell(fab15).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(fab15).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemFab3[36] },
        bgColor: { argb: "" },
      };

      let fab16 = "BI" + costRowCount3; //row.getCell(5).address;
      worksheet.getCell(fab16).value = itemFab3[15];
      worksheet.getCell(fab16).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(fab16).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemFab3[37] },
        bgColor: { argb: "" },
      };

      let fab17 = "BJ" + costRowCount3; //row.getCell(5).address;
      worksheet.getCell(fab17).value = itemFab3[16];
      worksheet.getCell(fab17).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(fab17).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemFab3[38] },
        bgColor: { argb: "" },
      };

      let fab18 = "BK" + costRowCount3; //row.getCell(5).address;
      worksheet.getCell(fab18).value = itemFab3[17];
      worksheet.getCell(fab18).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(fab18).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemFab3[39] },
        bgColor: { argb: "" },
      };

      let fab19 = "BL" + costRowCount3; //row.getCell(5).address;
      worksheet.getCell(fab19).value = itemFab3[18];
      worksheet.getCell(fab19).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(fab19).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemFab3[40] },
        bgColor: { argb: "" },
      };

      let fab20 = "BM" + costRowCount3; //row.getCell(5).address;
      worksheet.getCell(fab20).value = itemFab3[19];
      worksheet.getCell(fab20).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(fab20).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemFab3[41] },
        bgColor: { argb: "" },
      };

      let fab21 = "BN" + costRowCount3; //row.getCell(5).address;
      worksheet.getCell(fab21).value = itemFab3[20];
      worksheet.getCell(fab21).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(fab21).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemFab3[42] },
        bgColor: { argb: "" },
      };


      fabricLastRow3 = costRowCount3;
      rowCount3++
    }



    var headerCountAccessories3 = 7 + rowCount3 + 3;

    let aca1 = worksheet.getCell("AT" + headerCountAccessories3);
    aca1.value = "Category";
    aca1.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    aca1.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    aca1.alignment = { vertical: "middle", horizontal: "center" };

    let aca2 = worksheet.getCell("AU" + headerCountAccessories3);
    aca2.value = "Component/Item";
    aca2.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    aca2.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    aca2.alignment = { vertical: "middle", horizontal: "center" };

    let aca3 = worksheet.getCell("AV" + headerCountAccessories3);
    aca3.value = "Description";
    aca3.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    aca3.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    aca3.alignment = { vertical: "middle", horizontal: "center" };

    let aca4 = worksheet.getCell("AW" + headerCountAccessories3);
    aca4.value = "ST Code";
    aca4.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    aca4.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    aca4.alignment = { vertical: "middle", horizontal: "center" };

    let aca5 = worksheet.getCell("AX" + headerCountAccessories3);
    aca5.value = "Placement";
    aca5.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    aca5.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    aca5.alignment = { vertical: "middle", horizontal: "center" };

    let aca6 = worksheet.getCell("AY" + headerCountAccessories3);
    aca6.value = "Ref. Code";
    aca6.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    aca6.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    aca6.alignment = { vertical: "middle", horizontal: "center" };


    let aca7 = worksheet.getCell("AZ" + headerCountAccessories3);
    aca7.value = "Nomination Status";
    aca7.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    aca7.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    aca7.alignment = { vertical: "middle", horizontal: "center" };

    let aca8 = worksheet.getCell("BA" + headerCountAccessories3);
    aca8.value = "Supplier";
    aca8.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    aca8.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    aca8.alignment = { vertical: "middle", horizontal: "center" };


    let aca9 = worksheet.getCell("BB" + headerCountAccessories3);
    aca9.value = "Country";
    aca9.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    aca9.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    aca9.alignment = { vertical: "middle", horizontal: "center" };


    let aca10 = worksheet.getCell("BC" + headerCountAccessories3);
    aca10.value = "UoM";
    aca10.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    aca10.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    aca10.alignment = { vertical: "middle", horizontal: "center" };

    let aca11 = worksheet.getCell("BD" + headerCountAccessories3);
    aca11.value = "Consumption";
    aca11.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    aca11.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    aca11.alignment = { vertical: "middle", horizontal: "center" };

    let aca12 = worksheet.getCell("BE" + headerCountAccessories3);
    aca12.value = "Wastage Percentage";
    aca12.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    aca12.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    aca12.alignment = { vertical: "middle", horizontal: "center" };

    let aca13 = worksheet.getCell("BF" + headerCountAccessories3);
    aca13.value = "Market Unit";
    aca13.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    aca13.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    aca13.alignment = { vertical: "middle", horizontal: "center" };

    let aca14 = worksheet.getCell("BG" + headerCountAccessories3);
    aca14.value = "Con. Value";
    aca14.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    aca14.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    aca14.alignment = { vertical: "middle", horizontal: "center" };

    let aca15 = worksheet.getCell("BH" + headerCountAccessories3);
    aca15.value = "Price";
    aca15.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    aca15.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    aca15.alignment = { vertical: "middle", horizontal: "center" };


    let aca16 = worksheet.getCell("BI" + headerCountAccessories3);
    aca16.value = "FinCost";
    aca16.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    aca16.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    aca16.alignment = { vertical: "middle", horizontal: "center" };

    let aca17 = worksheet.getCell("BJ" + headerCountAccessories3);
    aca17.value = "%";
    aca17.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    aca17.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    aca17.alignment = { vertical: "middle", horizontal: "center" };

    let aca18 = worksheet.getCell("BK" + headerCountAccessories3);
    aca18.value = "Value";
    aca18.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    aca18.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    aca18.alignment = { vertical: "middle", horizontal: "center" };

    let aca19 = worksheet.getCell("BL" + headerCountAccessories3);
    aca19.value = "Comment";
    aca19.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    aca19.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    aca19.alignment = { vertical: "middle", horizontal: "center" };




    var rowCountAccessories3 = 0
    var accessoriesFastRow3 = rowCountAccessories3 + 7 + rowCount3 + 3 + 1;
    var accessoriesLastRow3 = 0

    for (var itemAcs3 of dataThree1) {
      var costrowCountAccessories3 = rowCountAccessories3 + 7 + rowCount3 + 3 + 1;
      let Acs1 = "AT" + costrowCountAccessories3;// row.getCell(1).address;
      worksheet.getCell(Acs1).value = itemAcs3[0];
      worksheet.getCell(Acs1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Acs1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemAcs3[20] },
        bgColor: { argb: "" },
      };

      let Acs2 = "AU" + costrowCountAccessories3;//  row.getCell(2).address;
      worksheet.getCell(Acs2).value = itemAcs3[1];
      worksheet.getCell(Acs2).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Acs2).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemAcs3[21] },
        bgColor: { argb: "" },
      };

      let Acs3 = "AV" + costrowCountAccessories3;// row.getCell(3).address;
      worksheet.getCell(Acs3).value = itemAcs3[2];
      worksheet.getCell(Acs3).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Acs3).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemAcs3[22] },
        bgColor: { argb: "" },
      };

      let Acs4 = "AW" + costrowCountAccessories3; //row.getCell(4).address;
      worksheet.getCell(Acs4).value = itemAcs3[3];
      worksheet.getCell(Acs4).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Acs4).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemAcs3[23] },
        bgColor: { argb: "" },
      };

      let Acs5 = "AX" + costrowCountAccessories3; //row.getCell(5).address;
      worksheet.getCell(Acs5).value = itemAcs3[4];
      worksheet.getCell(Acs5).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Acs5).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemAcs3[24] },
        bgColor: { argb: "" },
      };

      let Acs6 = "AY" + costrowCountAccessories3; //row.getCell(5).address;
      worksheet.getCell(Acs6).value = itemAcs3[5];
      worksheet.getCell(Acs6).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Acs6).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemAcs3[25] },
        bgColor: { argb: "" },
      };

      let Acs7 = "AZ" + costrowCountAccessories3; //row.getCell(5).address;
      worksheet.getCell(Acs7).value = itemAcs3[6];
      worksheet.getCell(Acs7).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Acs7).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemAcs3[26] },
        bgColor: { argb: "" },
      };

      let Acs8 = "BA" + costrowCountAccessories3; //row.getCell(5).address;
      worksheet.getCell(Acs8).value = itemAcs3[7];
      worksheet.getCell(Acs8).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Acs8).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemAcs3[27] },
        bgColor: { argb: "" },
      };

      let Acs9 = "BB" + costrowCountAccessories3; //row.getCell(5).address;
      worksheet.getCell(Acs9).value = itemAcs3[8];
      worksheet.getCell(Acs9).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(Acs9).alignment = { vertical: "middle", horizontal: "center" };

      worksheet.getCell(Acs9).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemAcs3[28] },
        bgColor: { argb: "" },
      };


      let Acs10 = "BC" + costrowCountAccessories3; //row.getCell(5).address;
      worksheet.getCell(Acs10).value = itemAcs3[9];
      worksheet.getCell(Acs10).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(Acs10).alignment = { vertical: "middle", horizontal: "center" };

      worksheet.getCell(Acs10).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemAcs3[29] },
        bgColor: { argb: "" },
      };

      let Acs11 = "BD" + costrowCountAccessories3; //row.getCell(5).address;
      worksheet.getCell(Acs11).value = itemAcs3[10];
      worksheet.getCell(Acs11).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Acs11).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemAcs3[30] },
        bgColor: { argb: "" },
      };



      let Acs12 = "BE" + costrowCountAccessories3; //row.getCell(5).address;
      worksheet.getCell(Acs12).value = itemAcs3[11];
      worksheet.getCell(Acs12).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Acs12).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemAcs3[31] },
        bgColor: { argb: "" },
      };

      let Acs13 = "BF" + costrowCountAccessories3; //row.getCell(5).address;
      worksheet.getCell(Acs13).value = itemAcs3[12];
      worksheet.getCell(Acs13).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Acs13).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemAcs3[32] },
        bgColor: { argb: "" },
      };

      let Acs14 = "BG" + costrowCountAccessories3; //row.getCell(5).address;
      worksheet.getCell(Acs14).value = itemAcs3[13];
      worksheet.getCell(Acs14).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Acs14).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemAcs3[33] },
        bgColor: { argb: "" },
      };

      let Acs15 = "BH" + costrowCountAccessories3; //row.getCell(5).address;
      worksheet.getCell(Acs15).value = itemAcs3[14];
      worksheet.getCell(Acs15).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Acs15).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemAcs3[34] },
        bgColor: { argb: "" },
      };

      let Acs16 = "BI" + costrowCountAccessories3; //row.getCell(5).address;
      worksheet.getCell(Acs16).value = itemAcs3[15];
      worksheet.getCell(Acs16).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Acs16).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemAcs3[35] },
        bgColor: { argb: "" },
      };

      let Acs17 = "BJ" + costrowCountAccessories3; //row.getCell(5).address;
      worksheet.getCell(Acs17).value = itemAcs3[16];
      worksheet.getCell(Acs17).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Acs17).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemAcs3[36] },
        bgColor: { argb: "" },
      };

      let Acs18 = "BK" + costrowCountAccessories3; //row.getCell(5).address;
      worksheet.getCell(Acs18).value = itemAcs3[17];
      worksheet.getCell(Acs18).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Acs18).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemAcs3[37] },
        bgColor: { argb: "" },
      };

      let Acs19 = "BL" + costrowCountAccessories3; //row.getCell(5).address;
      worksheet.getCell(Acs19).value = itemAcs3[18];
      worksheet.getCell(Acs19).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Acs19).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemAcs3[38] },
        bgColor: { argb: "" },
      };


      accessoriesLastRow3 = costrowCountAccessories3;
      rowCountAccessories3++
    }





    var headerCountLable3 = 7 + rowCount3 + 3 + rowCountAccessories3 + 3 + 1;

    let acl1 = worksheet.getCell("AT" + headerCountLable3);
    acl1.value = "Category";
    acl1.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acl1.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acl1.alignment = { vertical: "middle", horizontal: "center" };

    let acl2 = worksheet.getCell("AU" + headerCountLable3);
    acl2.value = "Component/Item";
    acl2.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acl2.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acl2.alignment = { vertical: "middle", horizontal: "center" };

    let acl3 = worksheet.getCell("AV" + headerCountLable3);
    acl3.value = "Description";
    acl3.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acl3.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acl3.alignment = { vertical: "middle", horizontal: "center" };

    let acl4 = worksheet.getCell("AW" + headerCountLable3);
    acl4.value = "ST Code";
    acl4.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acl4.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acl4.alignment = { vertical: "middle", horizontal: "center" };

    let acl5 = worksheet.getCell("AX" + headerCountLable3);
    acl5.value = "Placement";
    acl5.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acl5.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acl5.alignment = { vertical: "middle", horizontal: "center" };

    let acl6 = worksheet.getCell("AY" + headerCountLable3);
    acl6.value = "Ref. Code";
    acl6.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acl6.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acl6.alignment = { vertical: "middle", horizontal: "center" };


    let acl7 = worksheet.getCell("AZ" + headerCountLable3);
    acl7.value = "Nomination Status";
    acl7.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acl7.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acl7.alignment = { vertical: "middle", horizontal: "center" };

    let acl8 = worksheet.getCell("BA" + headerCountLable3);
    acl8.value = "Supplier";
    acl8.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acl8.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acl8.alignment = { vertical: "middle", horizontal: "center" };


    let acl9 = worksheet.getCell("BB" + headerCountLable3);
    acl9.value = "Country";
    acl9.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acl9.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acl9.alignment = { vertical: "middle", horizontal: "center" };


    let acl10 = worksheet.getCell("BC" + headerCountLable3);
    acl10.value = "UoM";
    acl10.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acl10.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acl10.alignment = { vertical: "middle", horizontal: "center" };

    let acl11 = worksheet.getCell("BD" + headerCountLable3);
    acl11.value = "Consumption";
    acl11.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acl11.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    a11.alignment = { vertical: "middle", horizontal: "center" };

    let acl12 = worksheet.getCell("BE" + headerCountLable3);
    acl12.value = "Wastage Percentage";
    acl12.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acl12.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acl12.alignment = { vertical: "middle", horizontal: "center" };

    let acl13 = worksheet.getCell("BF" + headerCountLable3);
    acl13.value = "Market Unit";
    acl13.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acl13.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acl13.alignment = { vertical: "middle", horizontal: "center" };

    let acl14 = worksheet.getCell("BG" + headerCountLable3);
    acl14.value = "Con. Value";
    acl14.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acl14.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acl14.alignment = { vertical: "middle", horizontal: "center" };

    let acl15 = worksheet.getCell("BH" + headerCountLable3);
    acl15.value = "Price";
    acl15.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acl15.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acl15.alignment = { vertical: "middle", horizontal: "center" };


    let acl16 = worksheet.getCell("BI" + headerCountLable3);
    acl16.value = "FinCost";
    acl16.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acl16.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acl16.alignment = { vertical: "middle", horizontal: "center" };

    let acl17 = worksheet.getCell("BJ" + headerCountLable3);
    acl17.value = "%";
    acl17.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acl17.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acl17.alignment = { vertical: "middle", horizontal: "center" };

    let acl18 = worksheet.getCell("BK" + headerCountLable3);
    acl18.value = "Value";
    acl18.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acl18.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acl18.alignment = { vertical: "middle", horizontal: "center" };

    let acl19 = worksheet.getCell("BL" + headerCountLable3);
    acl19.value = "Comment";
    acl19.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acl19.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acl19.alignment = { vertical: "middle", horizontal: "center" };



    var rowCountLable3 = 0
    var lableFastRow3 = rowCountLable3 + 7 + rowCount3 + 3 + rowCountAccessories3 + 3 + 1 + 1;
    var lableLastRow3 = 0

    for (var itemLable3 of dataThree4) {
      var costrowCountLable3 = rowCountLable3 + 7 + rowCount3 + 3 + rowCountAccessories3 + 3 + 1 + 1;;
      let Leb1 = "AT" + costrowCountLable3;// row.getCell(1).address;
      worksheet.getCell(Leb1).value = itemLable3[0];
      worksheet.getCell(Leb1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }


      worksheet.getCell(Leb1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemLable3[20] },
        bgColor: { argb: "" },
      };

      let Leb2 = "AU" + costrowCountLable3;//  row.getCell(2).address;
      worksheet.getCell(Leb2).value = itemLable3[1];
      worksheet.getCell(Leb2).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Leb2).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemLable3[21] },
        bgColor: { argb: "" },
      };

      let Leb3 = "AV" + costrowCountLable3;// row.getCell(3).address;
      worksheet.getCell(Leb3).value = itemLable3[2];
      worksheet.getCell(Leb3).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Leb3).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemLable3[22] },
        bgColor: { argb: "" },
      };

      let Leb4 = "AW" + costrowCountLable3; //row.getCell(4).address;
      worksheet.getCell(Leb4).value = itemLable3[3];
      worksheet.getCell(Leb4).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Leb4).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemLable3[23] },
        bgColor: { argb: "" },
      };

      let Leb5 = "AX" + costrowCountLable3; //row.getCell(5).address;
      worksheet.getCell(Leb5).value = itemLable3[4];
      worksheet.getCell(Leb5).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Leb5).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemLable3[24] },
        bgColor: { argb: "" },
      };

      let Leb6 = "AY" + costrowCountLable3; //row.getCell(5).address;
      worksheet.getCell(Leb6).value = itemLable3[5];
      worksheet.getCell(Leb6).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Leb6).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemLable3[25] },
        bgColor: { argb: "" },
      };

      let Leb7 = "AZ" + costrowCountLable3; //row.getCell(5).address;
      worksheet.getCell(Leb7).value = itemLable3[6];
      worksheet.getCell(Leb7).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Leb7).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemLable3[26] },
        bgColor: { argb: "" },
      };

      let Leb8 = "BA" + costrowCountLable3; //row.getCell(5).address;
      worksheet.getCell(Leb8).value = itemLable3[7];
      worksheet.getCell(Leb8).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Leb8).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemLable3[27] },
        bgColor: { argb: "" },
      };

      let Leb9 = "BB" + costrowCountLable3; //row.getCell(5).address;
      worksheet.getCell(Leb9).value = itemLable3[8];
      worksheet.getCell(Leb9).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(Leb9).alignment = { vertical: "middle", horizontal: "center" };
      worksheet.getCell(Leb9).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemLable3[28] },
        bgColor: { argb: "" },
      };


      let Leb10 = "BC" + costrowCountLable3; //row.getCell(5).address;
      worksheet.getCell(Leb10).value = itemLable3[9];
      worksheet.getCell(Leb10).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(Leb10).alignment = { vertical: "middle", horizontal: "center" };

      worksheet.getCell(Leb10).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemLable3[29] },
        bgColor: { argb: "" },
      };

      let Leb11 = "BD" + costrowCountLable3; //row.getCell(5).address;
      worksheet.getCell(Leb11).value = itemLable3[10];
      worksheet.getCell(Leb11).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Leb11).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemLable3[30] },
        bgColor: { argb: "" },
      };


      let Leb12 = "BE" + costrowCountLable3; //row.getCell(5).address;
      worksheet.getCell(Leb12).value = itemLable3[11];
      worksheet.getCell(Leb12).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Leb12).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemLable3[31] },
        bgColor: { argb: "" },
      };

      let Leb13 = "BF" + costrowCountLable3; //row.getCell(5).address;
      worksheet.getCell(Leb13).value = itemLable3[12];
      worksheet.getCell(Leb13).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Leb13).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemLable3[32] },
        bgColor: { argb: "" },
      };


      let Leb14 = "BG" + costrowCountLable3; //row.getCell(5).address;
      worksheet.getCell(Leb14).value = itemLable3[13];
      worksheet.getCell(Leb14).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Leb14).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemLable3[33] },
        bgColor: { argb: "" },
      };

      let Leb15 = "BH" + costrowCountLable3; //row.getCell(5).address;
      worksheet.getCell(Leb15).value = itemLable3[14];
      worksheet.getCell(Leb15).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Leb15).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemLable3[34] },
        bgColor: { argb: "" },
      };

      let Leb16 = "BI" + costrowCountLable3; //row.getCell(5).address;
      worksheet.getCell(Leb16).value = itemLable3[15];
      worksheet.getCell(Leb16).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Leb16).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemLable3[35] },
        bgColor: { argb: "" },
      };

      let Leb17 = "BJ" + costrowCountLable3; //row.getCell(5).address;
      worksheet.getCell(Leb17).value = itemLable3[16];
      worksheet.getCell(Leb17).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Leb17).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemLable3[36] },
        bgColor: { argb: "" },
      };

      let Leb18 = "BK" + costrowCountLable3; //row.getCell(5).address;
      worksheet.getCell(Leb18).value = itemLable3[17];
      worksheet.getCell(Leb18).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Leb18).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemLable3[37] },
        bgColor: { argb: "" },
      };

      let Leb19 = "BL" + costrowCountLable3; //row.getCell(5).address;
      worksheet.getCell(Leb19).value = itemLable3[18];
      worksheet.getCell(Leb19).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Leb19).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemLable3[38] },
        bgColor: { argb: "" },
      };


      lableLastRow3 = costrowCountLable3;
      rowCountLable3++
    }



    var headerCountPaking3 = 7 + rowCount3 + 3 + rowCountAccessories3 + 3 + 1 + rowCountLable3 + 3 + 1;

    let acp1 = worksheet.getCell("AT" + headerCountPaking3);
    acp1.value = "Category";
    acp1.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acp1.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acp1.alignment = { vertical: "middle", horizontal: "center" };

    let acp2 = worksheet.getCell("AU" + headerCountPaking3);
    acp2.value = "Component/Item";
    acp2.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acp2.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acp2.alignment = { vertical: "middle", horizontal: "center" };

    let acp3 = worksheet.getCell("AV" + headerCountPaking3);
    acp3.value = "Description";
    acp3.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acp3.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acp3.alignment = { vertical: "middle", horizontal: "center" };

    let acp4 = worksheet.getCell("AW" + headerCountPaking3);
    acp4.value = "ST Code";
    acp4.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acp4.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acp4.alignment = { vertical: "middle", horizontal: "center" };

    let acp5 = worksheet.getCell("AX" + headerCountPaking3);
    acp5.value = "Placement";
    acp5.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acp5.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acp5.alignment = { vertical: "middle", horizontal: "center" };

    let acp6 = worksheet.getCell("AY" + headerCountPaking3);
    acp6.value = "Ref. Code";
    acp6.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acp6.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acp6.alignment = { vertical: "middle", horizontal: "center" };


    let acp7 = worksheet.getCell("AZ" + headerCountPaking3);
    acp7.value = "Nomination Status";
    acp7.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acp7.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acp7.alignment = { vertical: "middle", horizontal: "center" };

    let acp8 = worksheet.getCell("BA" + headerCountPaking3);
    acp8.value = "Supplier";
    acp8.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acp8.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acp8.alignment = { vertical: "middle", horizontal: "center" };


    let acp9 = worksheet.getCell("BB" + headerCountPaking3);
    acp9.value = "Country";
    acp9.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acp9.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acp9.alignment = { vertical: "middle", horizontal: "center" };


    let acp10 = worksheet.getCell("BC" + headerCountPaking3);
    acp10.value = "UoM";
    acp10.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acp10.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acp10.alignment = { vertical: "middle", horizontal: "center" };

    let acp11 = worksheet.getCell("BD" + headerCountPaking3);
    acp11.value = "Consumption";
    acp11.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acp11.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    a11.alignment = { vertical: "middle", horizontal: "center" };

    let acp12 = worksheet.getCell("BE" + headerCountPaking3);
    acp12.value = "Wastage Percentage";
    acp12.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acp12.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acp12.alignment = { vertical: "middle", horizontal: "center" };

    let acp13 = worksheet.getCell("BF" + headerCountPaking3);
    acp13.value = "Market Unit";
    acp13.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acp13.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acp13.alignment = { vertical: "middle", horizontal: "center" };

    let acp14 = worksheet.getCell("BG" + headerCountPaking3);
    acp14.value = "Con. Value";
    acp14.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acp14.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acp14.alignment = { vertical: "middle", horizontal: "center" };

    let acp15 = worksheet.getCell("BH" + headerCountPaking3);
    acp15.value = "Price";
    acp15.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acp15.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acp15.alignment = { vertical: "middle", horizontal: "center" };


    let acp16 = worksheet.getCell("BI" + headerCountPaking3);
    acp16.value = "FinCost";
    acp16.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acp16.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acp16.alignment = { vertical: "middle", horizontal: "center" };

    let acp17 = worksheet.getCell("BJ" + headerCountPaking3);
    acp17.value = "%";
    acp17.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acp17.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acp17.alignment = { vertical: "middle", horizontal: "center" };

    let acp18 = worksheet.getCell("BK" + headerCountPaking3);
    acp18.value = "Value";
    acp18.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acp18.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acp18.alignment = { vertical: "middle", horizontal: "center" };

    let acp19 = worksheet.getCell("BL" + headerCountPaking3);
    acp19.value = "Comment";
    acp19.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acp19.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acp19.alignment = { vertical: "middle", horizontal: "center" };





    var rowCountPackging3 = 0
    var pakingFastRow3 = rowCountPackging3 + rowCountLable3 + 7 + rowCount3 + 3 + rowCountAccessories3 + 3 + 1 + 1 + rowCountLable3 + 3 + 1;
    var pakingLastRow3 = 0

    for (var itemPackging3 of dataThree5) {
      var costrowCountPackging3 = rowCountPackging3 + rowCountLable3 + 7 + rowCount3 + 3 + rowCountAccessories3 + 3 + 1 + 1 + rowCountLable3 + 3 + 1;
      let Pack1 = "AT" + costrowCountPackging3;// row.getCell(1).address;
      worksheet.getCell(Pack1).value = itemPackging3[0];
      worksheet.getCell(Pack1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Pack1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemPackging3[20] },
        bgColor: { argb: "" },
      };

      let Pack2 = "AU" + costrowCountPackging3;//  row.getCell(2).address;
      worksheet.getCell(Pack2).value = itemPackging3[1];
      worksheet.getCell(Pack2).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Pack2).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemPackging3[21] },
        bgColor: { argb: "" },
      };

      let Pack3 = "AV" + costrowCountPackging3;// row.getCell(3).address;
      worksheet.getCell(Pack3).value = itemPackging3[2];
      worksheet.getCell(Pack3).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Pack3).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemPackging3[22] },
        bgColor: { argb: "" },
      };

      let Pack4 = "AW" + costrowCountPackging3; //row.getCell(4).address;
      worksheet.getCell(Pack4).value = itemPackging3[3];
      worksheet.getCell(Pack4).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Pack4).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemPackging3[23] },
        bgColor: { argb: "" },
      };

      let Pack5 = "AX" + costrowCountPackging3; //row.getCell(5).address;
      worksheet.getCell(Pack5).value = itemPackging3[4];
      worksheet.getCell(Pack5).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Pack5).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemPackging3[24] },
        bgColor: { argb: "" },
      };

      let Pack6 = "AY" + costrowCountPackging3; //row.getCell(5).address;
      worksheet.getCell(Pack6).value = itemPackging3[5];
      worksheet.getCell(Pack6).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Pack6).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemPackging3[25] },
        bgColor: { argb: "" },
      };

      let Pack7 = "AZ" + costrowCountPackging3; //row.getCell(5).address;
      worksheet.getCell(Pack7).value = itemPackging3[6];
      worksheet.getCell(Pack7).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Pack7).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemPackging3[26] },
        bgColor: { argb: "" },
      };

      let Pack8 = "BA" + costrowCountPackging3; //row.getCell(5).address;
      worksheet.getCell(Pack8).value = itemPackging3[7];
      worksheet.getCell(Pack8).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Pack8).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemPackging3[27] },
        bgColor: { argb: "" },
      };

      let Pack9 = "BB" + costrowCountPackging3; //row.getCell(5).address;
      worksheet.getCell(Pack9).value = itemPackging3[8];
      worksheet.getCell(Pack9).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(Pack9).alignment = { vertical: "middle", horizontal: "center" };

      worksheet.getCell(Pack9).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemPackging3[28] },
        bgColor: { argb: "" },
      };



      let Pack10 = "BC" + costrowCountPackging3; //row.getCell(5).address;
      worksheet.getCell(Pack10).value = itemPackging3[9];
      worksheet.getCell(Pack10).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(Pack10).alignment = { vertical: "middle", horizontal: "center" };

      worksheet.getCell(Pack10).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemPackging3[29] },
        bgColor: { argb: "" },
      };


      let Pack11 = "BD" + costrowCountPackging3; //row.getCell(5).address;
      worksheet.getCell(Pack11).value = itemPackging3[10];
      worksheet.getCell(Pack11).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Pack11).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemPackging3[30] },
        bgColor: { argb: "" },
      };



      let Pack12 = "BE" + costrowCountPackging3; //row.getCell(5).address;
      worksheet.getCell(Pack12).value = itemPackging3[11];
      worksheet.getCell(Pack12).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Pack12).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemPackging3[31] },
        bgColor: { argb: "" },
      };

      let Pack13 = "BF" + costrowCountPackging3; //row.getCell(5).address;
      worksheet.getCell(Pack13).value = itemPackging3[12];
      worksheet.getCell(Pack13).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Pack13).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemPackging3[32] },
        bgColor: { argb: "" },
      };

      let Pack14 = "BG" + costrowCountPackging3; //row.getCell(5).address;
      worksheet.getCell(Pack14).value = itemPackging3[13];
      worksheet.getCell(Pack14).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Pack14).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemPackging3[33] },
        bgColor: { argb: "" },
      };

      let Pack15 = "BH" + costrowCountPackging3; //row.getCell(5).address;
      worksheet.getCell(Pack15).value = itemPackging3[14];
      worksheet.getCell(Pack15).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Pack15).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemPackging3[34] },
        bgColor: { argb: "" },
      };

      let Pack16 = "BI" + costrowCountPackging3; //row.getCell(5).address;
      worksheet.getCell(Pack16).value = itemPackging3[15];
      worksheet.getCell(Pack16).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Pack16).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemPackging3[35] },
        bgColor: { argb: "" },
      };

      let Pack17 = "BJ" + costrowCountPackging3; //row.getCell(5).address;
      worksheet.getCell(Pack17).value = itemPackging3[16];
      worksheet.getCell(Pack17).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Pack17).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemPackging3[36] },
        bgColor: { argb: "" },
      };

      let Pack18 = "BK" + costrowCountPackging3; //row.getCell(5).address;
      worksheet.getCell(Pack18).value = itemPackging3[17];
      worksheet.getCell(Pack18).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Pack18).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemPackging3[37] },
        bgColor: { argb: "" },
      };

      let Pack19 = "BL" + costrowCountPackging3; //row.getCell(5).address;
      worksheet.getCell(Pack19).value = itemPackging3[18];
      worksheet.getCell(Pack19).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Pack19).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemPackging3[38] },
        bgColor: { argb: "" },
      };

      pakingLastRow3 = costrowCountPackging3;
      rowCountPackging3++
    }


    var headerProcesssCount3 = 7 + rowCount3 + 3 + rowCountAccessories3 + 3 + 1 + rowCountLable3 + 3 + 1 + rowCountPackging3 + 3 + 1;

    let acpro1 = worksheet.getCell("AT" + headerProcesssCount3);
    acpro1.value = "Category";
    acpro1.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acpro1.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acpro1.alignment = { vertical: "middle", horizontal: "center" };

    let acpro2 = worksheet.getCell("AU" + headerProcesssCount3);
    acpro2.value = "Component/Item";
    acpro2.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acpro2.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acpro2.alignment = { vertical: "middle", horizontal: "center" };

    let acpro3 = worksheet.getCell("AV" + headerProcesssCount3);
    acpro3.value = "Description";
    acpro3.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acpro3.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acpro3.alignment = { vertical: "middle", horizontal: "center" };

    let acpro4 = worksheet.getCell("AW" + headerProcesssCount3);
    acpro4.value = "ST Code";
    acpro4.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acpro4.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acpro4.alignment = { vertical: "middle", horizontal: "center" };

    let acpro5 = worksheet.getCell("AX" + headerProcesssCount3);
    acpro5.value = "Placement";
    acpro5.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acpro5.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acpro5.alignment = { vertical: "middle", horizontal: "center" };

    let acpro6 = worksheet.getCell("AY" + headerProcesssCount3);
    acpro6.value = "Ref. Code";
    acpro6.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acpro6.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acpro6.alignment = { vertical: "middle", horizontal: "center" };


    let acpro7 = worksheet.getCell("AZ" + headerProcesssCount3);
    acpro7.value = "Nomination Status";
    acpro7.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acpro7.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acpro7.alignment = { vertical: "middle", horizontal: "center" };

    let acpro8 = worksheet.getCell("BA" + headerProcesssCount3);
    acpro8.value = "Supplier";
    acpro8.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acpro8.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acpro8.alignment = { vertical: "middle", horizontal: "center" };


    let acpro9 = worksheet.getCell("BB" + headerProcesssCount3);
    acpro9.value = "Country";
    acpro9.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acpro9.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acpro9.alignment = { vertical: "middle", horizontal: "center" };


    let acpro10 = worksheet.getCell("BC" + headerProcesssCount3);
    acpro10.value = "UoM";
    acpro10.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acpro10.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acpro10.alignment = { vertical: "middle", horizontal: "center" };

    let acpro11 = worksheet.getCell("BD" + headerProcesssCount3);
    acpro11.value = "Consumption";
    acpro11.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acpro11.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    a11.alignment = { vertical: "middle", horizontal: "center" };

    let acpro12 = worksheet.getCell("BE" + headerProcesssCount3);
    acpro12.value = "Wastage Percentage";
    acpro12.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acpro12.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acpro12.alignment = { vertical: "middle", horizontal: "center" };

    let acpro13 = worksheet.getCell("BF" + headerProcesssCount3);
    acpro13.value = "Market Unit";
    acpro13.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acpro13.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acpro13.alignment = { vertical: "middle", horizontal: "center" };

    let acpro14 = worksheet.getCell("BG" + headerProcesssCount3);
    acpro14.value = "Con. Value";
    acpro14.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acpro14.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acpro14.alignment = { vertical: "middle", horizontal: "center" };

    let acpro15 = worksheet.getCell("BH" + headerProcesssCount3);
    acpro15.value = "Price";
    acpro15.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acpro15.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acpro15.alignment = { vertical: "middle", horizontal: "center" };


    let acpro16 = worksheet.getCell("BI" + headerProcesssCount3);
    acpro16.value = "FinCost";
    acpro16.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acpro16.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acpro16.alignment = { vertical: "middle", horizontal: "center" };

    let acpro17 = worksheet.getCell("BJ" + headerProcesssCount3);
    acpro17.value = "%";
    acpro17.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acpro17.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acpro17.alignment = { vertical: "middle", horizontal: "center" };

    let acpro18 = worksheet.getCell("BK" + headerProcesssCount3);
    acpro18.value = "Value";
    acpro18.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acpro18.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acpro18.alignment = { vertical: "middle", horizontal: "center" };

    let acpro19 = worksheet.getCell("BL" + headerProcesssCount3);
    acpro19.value = "Comment";
    acpro19.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "66BB55" },
      bgColor: { argb: "" },
    };
    acpro19.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
    acpro19.alignment = { vertical: "middle", horizontal: "center" };

    //----------now_working----------------------------//

    var rowCountProcesss3 = 0
    var processFastRow3 = rowCountProcesss3 + 7 + rowCount3 + 3 + rowCountAccessories3 + 3 + 1 + rowCountLable3 + 3 + 1 + rowCountPackging3 + 3 + 1;
    var processLastRow3 = 0

    for (var itemProcesss3 of dataThree6) {
      var costrowCountProcesss3 = rowCountProcesss3 + 7 + rowCount3 + 3 + rowCountAccessories3 + 3 + 1 + rowCountLable3 + 3 + 1 + rowCountPackging3 + 3 + 1 + 1;
      let Porcss1 = "AT" + costrowCountProcesss3;// row.getCell(1).address;
      worksheet.getCell(Porcss1).value = itemProcesss3[0];
      worksheet.getCell(Porcss1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Porcss1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemProcesss3[20] },
        bgColor: { argb: "" },
      };

      let Porcss2 = "AU" + costrowCountProcesss3;//  row.getCell(2).address;
      worksheet.getCell(Porcss2).value = itemProcesss3[1];
      worksheet.getCell(Porcss2).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Porcss2).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemProcesss3[21] },
        bgColor: { argb: "" },
      };

      let Porcss3 = "AV" + costrowCountProcesss3;// row.getCell(3).address;
      worksheet.getCell(Porcss3).value = itemProcesss3[2];
      worksheet.getCell(Porcss3).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Porcss3).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemProcesss3[22] },
        bgColor: { argb: "" },
      };

      let Porcss4 = "AW" + costrowCountProcesss3; //row.getCell(4).address;
      worksheet.getCell(Porcss4).value = itemProcesss3[3];
      worksheet.getCell(Porcss4).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Porcss4).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemProcesss3[23] },
        bgColor: { argb: "" },
      };

      let Porcss5 = "AX" + costrowCountProcesss3; //row.getCell(5).address;
      worksheet.getCell(Porcss5).value = itemProcesss3[4];
      worksheet.getCell(Porcss5).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Porcss5).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemProcesss3[24] },
        bgColor: { argb: "" },
      };

      let Porcss6 = "AY" + costrowCountProcesss3; //row.getCell(5).address;
      worksheet.getCell(Porcss6).value = itemProcesss3[5];
      worksheet.getCell(Porcss6).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Porcss6).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemProcesss3[25] },
        bgColor: { argb: "" },
      };

      let Porcss7 = "AZ" + costrowCountProcesss3; //row.getCell(5).address;
      worksheet.getCell(Porcss7).value = itemProcesss3[6];
      worksheet.getCell(Porcss7).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Porcss7).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemProcesss3[26] },
        bgColor: { argb: "" },
      };

      let Porcss8 = "BA" + costrowCountProcesss3; //row.getCell(5).address;
      worksheet.getCell(Porcss8).value = itemProcesss3[7];
      worksheet.getCell(Porcss8).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Porcss8).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemProcesss3[27] },
        bgColor: { argb: "" },
      };

      let Porcss9 = "BB" + costrowCountProcesss3; //row.getCell(5).address;
      worksheet.getCell(Porcss9).value = itemProcesss3[8];
      worksheet.getCell(Porcss9).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(Porcss9).alignment = { vertical: "middle", horizontal: "center" };

      worksheet.getCell(Porcss9).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemProcesss3[28] },
        bgColor: { argb: "" },
      };


      let Porcss10 = "BC" + costrowCountProcesss3; //row.getCell(5).address;
      worksheet.getCell(Porcss10).value = itemProcesss3[9];
      worksheet.getCell(Porcss10).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      //   worksheet.getCell(Porcss10).alignment = { vertical: "middle", horizontal: "center" };

      worksheet.getCell(Porcss10).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemProcesss3[29] },
        bgColor: { argb: "" },
      };

      let Porcss11 = "BD" + costrowCountProcesss3; //row.getCell(5).address;
      worksheet.getCell(Porcss11).value = itemProcesss3[10];
      worksheet.getCell(Porcss11).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Porcss11).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemProcesss3[30] },
        bgColor: { argb: "" },
      };


      let Porcss12 = "BE" + costrowCountProcesss3; //row.getCell(5).address;
      worksheet.getCell(Porcss12).value = itemProcesss3[11];
      worksheet.getCell(Porcss12).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Porcss12).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemProcesss3[31] },
        bgColor: { argb: "" },
      };

      let Porcss13 = "BF" + costrowCountProcesss3; //row.getCell(5).address;
      worksheet.getCell(Porcss13).value = itemProcesss3[12];
      worksheet.getCell(Porcss13).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Porcss13).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemProcesss3[32] },
        bgColor: { argb: "" },
      };

      let Porcss14 = "BG" + costrowCountProcesss3; //row.getCell(5).address;
      worksheet.getCell(Porcss14).value = itemProcesss3[13];
      worksheet.getCell(Porcss14).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Porcss14).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemProcesss3[33] },
        bgColor: { argb: "" },
      };

      let Porcss15 = "BH" + costrowCountProcesss3; //row.getCell(5).address;
      worksheet.getCell(Porcss15).value = itemProcesss3[14];
      worksheet.getCell(Porcss15).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Porcss15).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemProcesss3[34] },
        bgColor: { argb: "" },
      };

      let Porcss16 = "BI" + costrowCountProcesss3; //row.getCell(5).address;
      worksheet.getCell(Porcss16).value = itemProcesss3[15];
      worksheet.getCell(Porcss16).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Porcss16).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemProcesss3[35] },
        bgColor: { argb: "" },
      };

      let Porcss17 = "BJ" + costrowCountProcesss3; //row.getCell(5).address;
      worksheet.getCell(Porcss17).value = itemProcesss3[16];
      worksheet.getCell(Porcss17).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Porcss17).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemProcesss3[36] },
        bgColor: { argb: "" },
      };

      let Porcss18 = "BK" + costrowCountProcesss3; //row.getCell(5).address;
      worksheet.getCell(Porcss18).value = itemProcesss3[17];
      worksheet.getCell(Porcss18).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Porcss18).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemProcesss3[37] },
        bgColor: { argb: "" },
      };

      let Porcss19 = "BL" + costrowCountProcesss3; //row.getCell(5).address;
      worksheet.getCell(Porcss19).value = itemProcesss3[18];
      worksheet.getCell(Porcss19).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      worksheet.getCell(Porcss19).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: itemProcesss3[38] },
        bgColor: { argb: "" },
      };


      processLastRow3 = costrowCountProcesss3;
      rowCountProcesss3++
    }


    if (dataTwo2P2.length > 1 && dataTwo2.length > 1) {
      var testVal3 = 3 + rowCountProcesss3 + 7 + rowCount3 + 3 + rowCountAccessories3 + 3 + 1 + rowCountLable3 + 3 + 1 + rowCountPackging3 + 3 + 1 + 1;
      let SencdPartRow3 = "AT" + testVal;
      worksheet.getCell(SencdPartRow3).value = "Part Name:"
      let SecondPartnameRow3 = "AU" + testVal;
      worksheet.getCell(SecondPartnameRow3).value = dataTwo2P2[1].partName;

      var costRowCountP2_3 = testVal3 + 3;

      let acf1 = worksheet.getCell("AT" + costRowCountP2_3);
      acf1.value = "Category";
      acf1.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acf1.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acf1.alignment = { vertical: "middle", horizontal: "center" };

      let acf2 = worksheet.getCell("AU" + costRowCountP2_3);
      acf2.value = "Component/Item";
      acf2.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acf2.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acf2.alignment = { vertical: "middle", horizontal: "center" };

      let acf3 = worksheet.getCell("AV" + costRowCountP2_3);
      acf3.value = "Description";
      acf3.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acf3.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acf3.alignment = { vertical: "middle", horizontal: "center" };

      let acf4 = worksheet.getCell("AW" + costRowCountP2_3);
      acf4.value = "ST Code";
      acf4.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acf4.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acf4.alignment = { vertical: "middle", horizontal: "center" };

      let acf5 = worksheet.getCell("AX" + costRowCountP2_3);
      acf5.value = "Item Placement";
      acf5.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acf5.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acf5.alignment = { vertical: "middle", horizontal: "center" };

      let acf6 = worksheet.getCell("AY" + costRowCountP2_3);
      acf6.value = "Item Code";
      acf6.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acf6.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acf6.alignment = { vertical: "middle", horizontal: "center" };


      let acf7 = worksheet.getCell("AZ" + costRowCountP2_3);
      acf7.value = "Nomination Status";
      acf7.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acf7.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acf7.alignment = { vertical: "middle", horizontal: "center" };

      let acf8 = worksheet.getCell("BA" + costRowCountP2_3);
      acf8.value = "Supplier";
      acf8.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acf8.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acf8.alignment = { vertical: "middle", horizontal: "center" };


      let acf9 = worksheet.getCell("BB" + costRowCountP2_3);
      acf9.value = "Country";
      acf9.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acf9.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acf9.alignment = { vertical: "middle", horizontal: "center" };


      let acf10 = worksheet.getCell("BC" + costRowCountP2_3);
      acf10.value = "Cutt Able Width";
      acf10.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acf10.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acf10.alignment = { vertical: "middle", horizontal: "center" };

      let acf11 = worksheet.getCell("BD" + costRowCountP2_3);
      acf11.value = "UoM";
      acf11.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acf11.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acf11.alignment = { vertical: "middle", horizontal: "center" };

      let acf12 = worksheet.getCell("BE" + costRowCountP2_3);
      acf12.value = "Consumption";
      acf12.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acf12.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acf12.alignment = { vertical: "middle", horizontal: "center" };

      let acf13 = worksheet.getCell("BF" + costRowCountP2_3);
      acf13.value = "Market Unit";
      acf13.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acf13.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acf13.alignment = { vertical: "middle", horizontal: "center" };

      let acf14 = worksheet.getCell("BG" + costRowCountP2_3);
      acf14.value = "Con. Value";
      acf14.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acf14.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acf14.alignment = { vertical: "middle", horizontal: "center" };

      let acf15 = worksheet.getCell("BH" + costRowCountP2_3);
      acf15.value = "Price";
      acf15.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acf15.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acf15.alignment = { vertical: "middle", horizontal: "center" };


      let acf16 = worksheet.getCell("BI" + costRowCountP2_3);
      acf16.value = "Price Mood Name";
      acf16.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acf16.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acf16.alignment = { vertical: "middle", horizontal: "center" };

      let acf17 = worksheet.getCell("BJ" + costRowCountP2_3);
      acf17.value = "Wastage Percentage";
      acf17.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acf17.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acf17.alignment = { vertical: "middle", horizontal: "center" };

      let acf18 = worksheet.getCell("BK" + costRowCountP2_3);
      acf18.value = "Fin Cost";
      acf18.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acf18.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acf18.alignment = { vertical: "middle", horizontal: "center" };

      let acf19 = worksheet.getCell("BL" + costRowCountP2_3);
      acf19.value = "%";
      acf19.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acf19.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acf19.alignment = { vertical: "middle", horizontal: "center" };

      let acf20 = worksheet.getCell("BM" + costRowCountP2_3);
      acf20.value = "Value";
      acf20.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acf20.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acf20.alignment = { vertical: "middle", horizontal: "center" };

      let acf21 = worksheet.getCell("BN" + costRowCountP2_3);
      acf21.value = "Comment";
      acf21.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acf21.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acf21.alignment = { vertical: "middle", horizontal: "center" };


      debugger
      var rowCountP2_3 = 0
      var part2StartLenth3 = costRowCountP2_3 + 1
      var fabricFastRow2P2_3 = rowCountP2_3 + part2StartLenth3;
      var fabricLastRow2P2_3 = 0
      for (var itemFab2P2_3 of dataThreeP2) {
        var costRowCount2P2_3 = rowCountP2_3 + part2StartLenth3;
        let fab1 = "AT" + costRowCount2P2_3;// row.getCell(1).address;
        worksheet.getCell(fab1).value = itemFab2P2_3[0];
        worksheet.getCell(fab1).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(fab1).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemFab2P2_3[22] },
          bgColor: { argb: "" },
        };

        let fab2 = "AU" + costRowCount2P2_3;//  row.getCell(2).address;
        worksheet.getCell(fab2).value = itemFab2P2_3[1];
        worksheet.getCell(fab2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(fab2).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemFab2P2_3[23] },
          bgColor: { argb: "" },
        };

        let fab3 = "AV" + costRowCount2P2_3;// row.getCell(3).address;
        worksheet.getCell(fab3).value = itemFab2P2_3[2];
        worksheet.getCell(fab3).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(fab3).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemFab2P2_3[24] },
          bgColor: { argb: "" },
        };

        let fab4 = "AW" + costRowCount2P2_3; //row.getCell(4).address;
        worksheet.getCell(fab4).value = itemFab2P2_3[3];
        worksheet.getCell(fab4).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(fab4).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemFab2P2_3[25] },
          bgColor: { argb: "" },
        };

        let fab5 = "AX" + costRowCount2P2_3; //row.getCell(5).address;
        worksheet.getCell(fab5).value = itemFab2P2_3[4];
        worksheet.getCell(fab5).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(fab5).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemFab2P2_3[26] },
          bgColor: { argb: "" },
        };

        let fab6 = "AY" + costRowCount2P2_3; //row.getCell(5).address;
        worksheet.getCell(fab6).value = itemFab2P2_3[5];
        worksheet.getCell(fab6).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(fab6).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemFab2P2_3[27] },
          bgColor: { argb: "" },
        };

        let fab7 = "AZ" + costRowCount2P2_3; //row.getCell(5).address;
        worksheet.getCell(fab7).value = itemFab2P2_3[6];
        worksheet.getCell(fab7).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(fab7).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemFab2P2_3[28] },
          bgColor: { argb: "" },
        };

        let fab8 = "BA" + costRowCount2P2_3; //row.getCell(5).address;
        worksheet.getCell(fab8).value = itemFab2P2_3[7];
        worksheet.getCell(fab8).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(fab8).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemFab2P2_3[29] },
          bgColor: { argb: "" },
        };

        let fab9 = "BB" + costRowCount2P2_3; //row.getCell(5).address;
        worksheet.getCell(fab9).value = itemFab2P2_3[8];
        worksheet.getCell(fab9).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        //   worksheet.getCell(fab9).alignment = { vertical: "middle", horizontal: "center" };

        worksheet.getCell(fab9).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemFab2P2_3[30] },
          bgColor: { argb: "" },
        };



        let fab10 = "	BC" + costRowCount2P2_3; //row.getCell(5).address;
        worksheet.getCell(fab10).value = itemFab2P2_3[9];
        worksheet.getCell(fab10).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        //   worksheet.getCell(fab10).alignment = { vertical: "middle", horizontal: "center" };

        worksheet.getCell(fab10).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemFab2P2_3[31] },
          bgColor: { argb: "" },
        };

        let fab11 = "BD" + costRowCount2P2_3; //row.getCell(5).address;
        worksheet.getCell(fab11).value = itemFab2P2_3[10];
        worksheet.getCell(fab11).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(fab11).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemFab2P2_3[32] },
          bgColor: { argb: "" },
        };


        let fab12 = "BE" + costRowCount2P2_3; //row.getCell(5).address;
        worksheet.getCell(fab12).value = itemFab2P2_3[11];
        worksheet.getCell(fab12).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(fab12).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemFab2P2_3[33] },
          bgColor: { argb: "" },
        };

        let fab13 = "BF" + costRowCount2P2_3; //row.getCell(5).address;
        worksheet.getCell(fab13).value = itemFab2P2_3[12];
        worksheet.getCell(fab13).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(fab13).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemFab2P2_3[34] },
          bgColor: { argb: "" },
        };

        let fab14 = "BG" + costRowCount2P2_3; //row.getCell(5).address;
        worksheet.getCell(fab14).value = itemFab2P2_3[13];
        worksheet.getCell(fab14).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(fab14).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemFab2P2_3[35] },
          bgColor: { argb: "" },
        };

        let fab15 = "BH" + costRowCount2P2_3; //row.getCell(5).address;
        worksheet.getCell(fab15).value = itemFab2P2_3[14];
        worksheet.getCell(fab15).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(fab15).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemFab2P2_3[36] },
          bgColor: { argb: "" },
        };

        let fab16 = "BI" + costRowCount2P2_3; //row.getCell(5).address;
        worksheet.getCell(fab16).value = itemFab2P2_3[15];
        worksheet.getCell(fab16).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(fab16).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemFab2P2_3[37] },
          bgColor: { argb: "" },
        };


        let fab17 = "BJ" + costRowCount2P2_3; //row.getCell(5).address;
        worksheet.getCell(fab17).value = itemFab2P2_3[16];
        worksheet.getCell(fab17).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(fab17).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemFab2P2_3[38] },
          bgColor: { argb: "" },
        };

        let fab18 = "BK" + costRowCount2P2_3; //row.getCell(5).address;
        worksheet.getCell(fab18).value = itemFab2P2_3[17];
        worksheet.getCell(fab18).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(fab18).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemFab2P2_3[39] },
          bgColor: { argb: "" },
        };


        let fab19 = "BL" + costRowCount2P2_3; //row.getCell(5).address;
        worksheet.getCell(fab19).value = itemFab2P2_3[18];
        worksheet.getCell(fab19).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(fab19).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemFab2P2_3[40] },
          bgColor: { argb: "" },
        };

        let fab20 = "BM" + costRowCount2P2_3; //row.getCell(5).address;
        worksheet.getCell(fab20).value = itemFab2P2_3[19];
        worksheet.getCell(fab20).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(fab20).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemFab2P2_3[41] },
          bgColor: { argb: "" },
        };

        let fab21 = "BN" + costRowCount2P2_3; //row.getCell(5).address;
        worksheet.getCell(fab21).value = itemFab2P2_3[20];
        worksheet.getCell(fab21).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(fab21).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemFab2P2_3[42] },
          bgColor: { argb: "" },
        };

        fabricLastRow2P2 = costRowCount2P2_3;
        rowCountP2_3++
      }



      var headerCountAccessories2P2_3 = part2StartLenth3 + rowCountP2_3 + 3;


      let aca1 = worksheet.getCell("AT" + headerCountAccessories2P2_3);
      aca1.value = "Category";
      aca1.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      aca1.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      aca1.alignment = { vertical: "middle", horizontal: "center" };

      let aca2 = worksheet.getCell("AU" + headerCountAccessories2P2_3);
      aca2.value = "Component/Item";
      aca2.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      aca2.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      aca2.alignment = { vertical: "middle", horizontal: "center" };

      let aca3 = worksheet.getCell("AV" + headerCountAccessories2P2_3);
      aca3.value = "Description";
      aca3.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      aca3.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      aca3.alignment = { vertical: "middle", horizontal: "center" };

      let aca4 = worksheet.getCell("AW" + headerCountAccessories2P2_3);
      aca4.value = "ST Code";
      aca4.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      aca4.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      aca4.alignment = { vertical: "middle", horizontal: "center" };

      let aca5 = worksheet.getCell("AX" + headerCountAccessories2P2_3);
      aca5.value = "Placement";
      aca5.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      aca5.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      aca5.alignment = { vertical: "middle", horizontal: "center" };

      let aca6 = worksheet.getCell("AY" + headerCountAccessories2P2_3);
      aca6.value = "Ref. Code";
      aca6.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      aca6.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      aca6.alignment = { vertical: "middle", horizontal: "center" };


      let aca7 = worksheet.getCell("AZ" + headerCountAccessories2P2_3);
      aca7.value = "Nomination Status";
      aca7.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      aca7.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      aca7.alignment = { vertical: "middle", horizontal: "center" };

      let aca8 = worksheet.getCell("BA" + headerCountAccessories2P2_3);
      aca8.value = "Supplier";
      aca8.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      aca8.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      aca8.alignment = { vertical: "middle", horizontal: "center" };


      let aca9 = worksheet.getCell("BB" + headerCountAccessories2P2_3);
      aca9.value = "Country";
      aca9.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      aca9.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      aca9.alignment = { vertical: "middle", horizontal: "center" };


      let aca10 = worksheet.getCell("BC" + headerCountAccessories2P2_3);
      aca10.value = "UoM";
      aca10.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      aca10.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      aca10.alignment = { vertical: "middle", horizontal: "center" };

      let aca11 = worksheet.getCell("BD" + headerCountAccessories2P2_3);
      aca11.value = "Consumption";
      aca11.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      aca11.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      aca11.alignment = { vertical: "middle", horizontal: "center" };

      let aca12 = worksheet.getCell("BE" + headerCountAccessories2P2_3);
      aca12.value = "Wastage Percentage";
      aca12.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      aca12.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      aca12.alignment = { vertical: "middle", horizontal: "center" };

      let aca13 = worksheet.getCell("BF" + headerCountAccessories2P2_3);
      aca13.value = "Market Unit";
      aca13.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      aca13.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      aca13.alignment = { vertical: "middle", horizontal: "center" };

      let aca14 = worksheet.getCell("BG" + headerCountAccessories2P2_3);
      aca14.value = "Con. Value";
      aca14.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      aca14.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      aca14.alignment = { vertical: "middle", horizontal: "center" };

      let aca15 = worksheet.getCell("BH" + headerCountAccessories2P2_3);
      aca15.value = "Price";
      aca15.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      aca15.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      aca15.alignment = { vertical: "middle", horizontal: "center" };


      let aca16 = worksheet.getCell("BI" + headerCountAccessories2P2_3);
      aca16.value = "FinCost";
      aca16.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      aca16.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      aca16.alignment = { vertical: "middle", horizontal: "center" };

      let aca17 = worksheet.getCell("BJ" + headerCountAccessories2P2_3);
      aca17.value = "%";
      aca17.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      aca17.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      aca17.alignment = { vertical: "middle", horizontal: "center" };

      let aca18 = worksheet.getCell("BK" + headerCountAccessories2P2_3);
      aca18.value = "Value";
      aca18.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      aca18.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      aca18.alignment = { vertical: "middle", horizontal: "center" };

      let aca19 = worksheet.getCell("BL" + headerCountAccessories2P2_3);
      aca19.value = "Comment";
      aca19.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      aca19.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      aca19.alignment = { vertical: "middle", horizontal: "center" };



      var rowCountAccessories2P2_3 = 0
      var accessoriesFastRow2P2_3 = rowCountAccessories2P2_3 + part2StartLenth3 + rowCountP2_3 + 3 + 1;
      var accessoriesLastRow2P2_3 = 0

      for (var itemAcs2P2_3 of dataThree1P2) {
        var costrowCountAccessories2P2_3 = rowCountAccessories2P2_3 + part2StartLenth3 + rowCountP2_3 + 3 + 1;
        let Acs1 = "AT" + costrowCountAccessories2P2_3;// row.getCell(1).address;
        worksheet.getCell(Acs1).value = itemAcs2P2_3[0];
        worksheet.getCell(Acs1).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Acs1).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemAcs2P2_3[20] },
          bgColor: { argb: "" },
        };

        let Acs2 = "AU" + costrowCountAccessories2P2_3;//  row.getCell(2).address;
        worksheet.getCell(Acs2).value = itemAcs2P2_3[1];
        worksheet.getCell(Acs2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Acs2).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemAcs2P2_3[21] },
          bgColor: { argb: "" },
        };

        let Acs3 = "AV" + costrowCountAccessories2P2_3;// row.getCell(3).address;
        worksheet.getCell(Acs3).value = itemAcs2P2_3[2];
        worksheet.getCell(Acs3).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Acs3).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemAcs2P2_3[22] },
          bgColor: { argb: "" },
        };

        let Acs4 = "AW" + costrowCountAccessories2P2_3; //row.getCell(4).address;
        worksheet.getCell(Acs4).value = itemAcs2P2_3[3];
        worksheet.getCell(Acs4).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Acs4).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemAcs2P2_3[23] },
          bgColor: { argb: "" },
        };

        let Acs5 = "AX" + costrowCountAccessories2P2_3; //row.getCell(5).address;
        worksheet.getCell(Acs5).value = itemAcs2P2_3[4];
        worksheet.getCell(Acs5).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }


        worksheet.getCell(Acs5).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemAcs2P2_3[24] },
          bgColor: { argb: "" },
        };

        let Acs6 = "AY" + costrowCountAccessories2P2_3; //row.getCell(5).address;
        worksheet.getCell(Acs6).value = itemAcs2P2_3[5];
        worksheet.getCell(Acs6).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Acs6).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemAcs2P2_3[25] },
          bgColor: { argb: "" },
        };

        let Acs7 = "AZ" + costrowCountAccessories2P2_3; //row.getCell(5).address;
        worksheet.getCell(Acs7).value = itemAcs2P2_3[6];
        worksheet.getCell(Acs7).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Acs7).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemAcs2P2_3[26] },
          bgColor: { argb: "" },
        };

        let Acs8 = "BA" + costrowCountAccessories2P2_3; //row.getCell(5).address;
        worksheet.getCell(Acs8).value = itemAcs2P2_3[7];
        worksheet.getCell(Acs8).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Acs8).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemAcs2P2_3[27] },
          bgColor: { argb: "" },
        };

        let Acs9 = "BB" + costrowCountAccessories2P2_3; //row.getCell(5).address;
        worksheet.getCell(Acs9).value = itemAcs2P2_3[8];
        worksheet.getCell(Acs9).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        //   worksheet.getCell(Acs9).alignment = { vertical: "middle", horizontal: "center" };

        worksheet.getCell(Acs9).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemAcs2P2_3[28] },
          bgColor: { argb: "" },
        };


        let Acs10 = "BC" + costrowCountAccessories2P2_3; //row.getCell(5).address;
        worksheet.getCell(Acs10).value = itemAcs2P2_3[9];
        worksheet.getCell(Acs10).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        //   worksheet.getCell(Acs10).alignment = { vertical: "middle", horizontal: "center" };

        worksheet.getCell(Acs10).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemAcs2P2_3[29] },
          bgColor: { argb: "" },
        };

        let Acs11 = "BD" + costrowCountAccessories2P2_3; //row.getCell(5).address;
        worksheet.getCell(Acs11).value = itemAcs2P2_3[10];
        worksheet.getCell(Acs11).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Acs11).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemAcs2P2_3[30] },
          bgColor: { argb: "" },
        };


        let Acs12 = "BE" + costrowCountAccessories2P2_3; //row.getCell(5).address;
        worksheet.getCell(Acs12).value = itemAcs2P2_3[11];
        worksheet.getCell(Acs12).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Acs12).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemAcs2P2_3[31] },
          bgColor: { argb: "" },
        };

        let Acs13 = "BF" + costrowCountAccessories2P2_3; //row.getCell(5).address;
        worksheet.getCell(Acs13).value = itemAcs2P2_3[12];
        worksheet.getCell(Acs13).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Acs13).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemAcs2P2_3[32] },
          bgColor: { argb: "" },
        };

        let Acs14 = "BG" + costrowCountAccessories2P2_3; //row.getCell(5).address;
        worksheet.getCell(Acs14).value = itemAcs2P2_3[13];
        worksheet.getCell(Acs14).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Acs14).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemAcs2P2_3[33] },
          bgColor: { argb: "" },
        };

        let Acs15 = "BH" + costrowCountAccessories2P2_3; //row.getCell(5).address;
        worksheet.getCell(Acs15).value = itemAcs2P2_3[14];
        worksheet.getCell(Acs15).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Acs15).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemAcs2P2_3[34] },
          bgColor: { argb: "" },
        };

        let Acs16 = "BI" + costrowCountAccessories2P2_3; //row.getCell(5).address;
        worksheet.getCell(Acs16).value = itemAcs2P2_3[15];
        worksheet.getCell(Acs16).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Acs16).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemAcs2P2_3[35] },
          bgColor: { argb: "" },
        };

        let Acs17 = "BJ" + costrowCountAccessories2P2_3; //row.getCell(5).address;
        worksheet.getCell(Acs17).value = itemAcs2P2_3[16];
        worksheet.getCell(Acs17).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Acs17).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemAcs2P2_3[36] },
          bgColor: { argb: "" },
        };

        let Acs18 = "BK" + costrowCountAccessories2P2_3; //row.getCell(5).address;
        worksheet.getCell(Acs18).value = itemAcs2P2_3[17];
        worksheet.getCell(Acs18).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Acs18).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemAcs2P2_3[37] },
          bgColor: { argb: "" },
        };


        let Acs19 = "BL" + costrowCountAccessories2P2_3; //row.getCell(5).address;
        worksheet.getCell(Acs19).value = itemAcs2P2_3[18];
        worksheet.getCell(Acs19).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Acs19).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemAcs2P2_3[38] },
          bgColor: { argb: "" },
        };


        accessoriesLastRow2P2_3 = costrowCountAccessories2P2_3;
        rowCountAccessories2P2_3++
      }



      var headerCountLable2P2_3 = part2StartLenth3 + rowCountP2_3 + 3 + rowCountAccessories2P2_3 + 3 + 1;


      let acl1 = worksheet.getCell("AT" + headerCountLable2P2_3);
      acl1.value = "Category";
      acl1.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acl1.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acl1.alignment = { vertical: "middle", horizontal: "center" };

      let acl2 = worksheet.getCell("AU" + headerCountLable2P2_3);
      acl2.value = "Component/Item";
      acl2.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acl2.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acl2.alignment = { vertical: "middle", horizontal: "center" };

      let acl3 = worksheet.getCell("AV" + headerCountLable2P2_3);
      acl3.value = "Description";
      acl3.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acl3.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acl3.alignment = { vertical: "middle", horizontal: "center" };

      let acl4 = worksheet.getCell("AW" + headerCountLable2P2_3);
      acl4.value = "ST Code";
      acl4.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acl4.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acl4.alignment = { vertical: "middle", horizontal: "center" };

      let acl5 = worksheet.getCell("AX" + headerCountLable2P2_3);
      acl5.value = "Placement";
      acl5.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acl5.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acl5.alignment = { vertical: "middle", horizontal: "center" };

      let acl6 = worksheet.getCell("AY" + headerCountLable2P2_3);
      acl6.value = "Ref. Code";
      acl6.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acl6.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acl6.alignment = { vertical: "middle", horizontal: "center" };


      let acl7 = worksheet.getCell("AZ" + headerCountLable2P2_3);
      acl7.value = "Nomination Status";
      acl7.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acl7.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acl7.alignment = { vertical: "middle", horizontal: "center" };

      let acl8 = worksheet.getCell("BA" + headerCountLable2P2_3);
      acl8.value = "Supplier";
      acl8.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acl8.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acl8.alignment = { vertical: "middle", horizontal: "center" };


      let acl9 = worksheet.getCell("BB" + headerCountLable2P2_3);
      acl9.value = "Country";
      acl9.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acl9.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acl9.alignment = { vertical: "middle", horizontal: "center" };


      let acl10 = worksheet.getCell("BC" + headerCountLable2P2_3);
      acl10.value = "UoM";
      acl10.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acl10.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acl10.alignment = { vertical: "middle", horizontal: "center" };

      let acl11 = worksheet.getCell("BD" + headerCountLable2P2_3);
      acl11.value = "Consumption";
      acl11.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acl11.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      a11.alignment = { vertical: "middle", horizontal: "center" };

      let acl12 = worksheet.getCell("BE" + headerCountLable2P2_3);
      acl12.value = "Wastage Percentage";
      acl12.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acl12.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acl12.alignment = { vertical: "middle", horizontal: "center" };

      let acl13 = worksheet.getCell("BF" + headerCountLable2P2_3);
      acl13.value = "Market Unit";
      acl13.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acl13.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acl13.alignment = { vertical: "middle", horizontal: "center" };

      let acl14 = worksheet.getCell("BG" + headerCountLable2P2_3);
      acl14.value = "Con. Value";
      acl14.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acl14.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acl14.alignment = { vertical: "middle", horizontal: "center" };

      let acl15 = worksheet.getCell("BH" + headerCountLable2P2_3);
      acl15.value = "Price";
      acl15.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acl15.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acl15.alignment = { vertical: "middle", horizontal: "center" };


      let acl16 = worksheet.getCell("BI" + headerCountLable2P2_3);
      acl16.value = "FinCost";
      acl16.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acl16.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acl16.alignment = { vertical: "middle", horizontal: "center" };

      let acl17 = worksheet.getCell("BJ" + headerCountLable2P2_3);
      acl17.value = "%";
      acl17.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acl17.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acl17.alignment = { vertical: "middle", horizontal: "center" };

      let acl18 = worksheet.getCell("BK" + headerCountLable2P2_3);
      acl18.value = "Value";
      acl18.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acl18.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acl18.alignment = { vertical: "middle", horizontal: "center" };

      let acl19 = worksheet.getCell("BL" + headerCountLable2P2_3);
      acl19.value = "Comment";
      acl19.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acl19.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acl19.alignment = { vertical: "middle", horizontal: "center" };




      var rowCountLable2P2_3 = 0
      var lableFastRow2P2_3 = rowCountLable2P2_3 + part2StartLenth3 + rowCountP2_3 + 3 + rowCountAccessories2P2_3 + 3 + 1 + 1;
      var lableLastRow2P2_3 = 0

      for (var itemLable2P2_3 of dataThree4P2) {
        var costrowCountLable2P2_3 = rowCountLable2P2_3 + part2StartLenth3 + rowCountP2_3 + 3 + rowCountAccessories2P2_3 + 3 + 1 + 1;;
        let Leb1 = "AT" + costrowCountLable2P2_3;// row.getCell(1).address;
        worksheet.getCell(Leb1).value = itemLable2P2_3[0];
        worksheet.getCell(Leb1).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Leb1).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemLable2P2_3[20] },
          bgColor: { argb: "" },
        };

        let Leb2 = "AU" + costrowCountLable2P2_3;//  row.getCell(2).address;
        worksheet.getCell(Leb2).value = itemLable2P2_3[1];
        worksheet.getCell(Leb2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Leb2).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemLable2P2_3[21] },
          bgColor: { argb: "" },
        };

        let Leb3 = "AV" + costrowCountLable2P2_3;// row.getCell(3).address;
        worksheet.getCell(Leb3).value = itemLable2P2_3[2];
        worksheet.getCell(Leb3).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Leb3).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemLable2P2_3[22] },
          bgColor: { argb: "" },
        };

        let Leb4 = "AW" + costrowCountLable2P2_3; //row.getCell(4).address;
        worksheet.getCell(Leb4).value = itemLable2P2_3[3];
        worksheet.getCell(Leb4).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Leb4).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemLable2P2_3[23] },
          bgColor: { argb: "" },
        };



        let Leb5 = "AX" + costrowCountLable2P2_3; //row.getCell(5).address;
        worksheet.getCell(Leb5).value = itemLable2P2_3[4];
        worksheet.getCell(Leb5).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Leb5).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemLable2P2_3[24] },
          bgColor: { argb: "" },
        };

        let Leb6 = "AY" + costrowCountLable2P2_3; //row.getCell(5).address;
        worksheet.getCell(Leb6).value = itemLable2P2_3[5];
        worksheet.getCell(Leb6).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Leb6).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemLable2P2_3[25] },
          bgColor: { argb: "" },
        };

        let Leb7 = "AZ" + costrowCountLable2P2_3; //row.getCell(5).address;
        worksheet.getCell(Leb7).value = itemLable2P2_3[6];
        worksheet.getCell(Leb7).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Leb7).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemLable2P2_3[26] },
          bgColor: { argb: "" },
        };

        let Leb8 = "BA" + costrowCountLable2P2_3; //row.getCell(5).address;
        worksheet.getCell(Leb8).value = itemLable2P2_3[7];
        worksheet.getCell(Leb8).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Leb8).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemLable2P2_3[27] },
          bgColor: { argb: "" },
        };

        let Leb9 = "BB" + costrowCountLable2P2_3; //row.getCell(5).address;
        worksheet.getCell(Leb9).value = itemLable2P2_3[8];
        worksheet.getCell(Leb9).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        //   worksheet.getCell(Leb9).alignment = { vertical: "middle", horizontal: "center" };

        worksheet.getCell(Leb9).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemLable2P2_3[28] },
          bgColor: { argb: "" },
        };


        let Leb10 = "BC" + costrowCountLable2P2_3; //row.getCell(5).address;
        worksheet.getCell(Leb10).value = itemLable2P2_3[9];
        worksheet.getCell(Leb10).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        //   worksheet.getCell(Leb10).alignment = { vertical: "middle", horizontal: "center" };

        worksheet.getCell(Leb10).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemLable2P2_3[29] },
          bgColor: { argb: "" },
        };

        let Leb11 = "BD" + costrowCountLable2P2_3; //row.getCell(5).address;
        worksheet.getCell(Leb11).value = itemLable2P2_3[10];
        worksheet.getCell(Leb11).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Leb11).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemLable2P2_3[30] },
          bgColor: { argb: "" },
        };


        let Leb12 = "BE" + costrowCountLable2P2_3; //row.getCell(5).address;
        worksheet.getCell(Leb12).value = itemLable2P2_3[11];
        worksheet.getCell(Leb12).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Leb12).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemLable2P2_3[31] },
          bgColor: { argb: "" },
        };

        let Leb13 = "BF" + costrowCountLable2P2_3; //row.getCell(5).address;
        worksheet.getCell(Leb13).value = itemLable2P2_3[12];
        worksheet.getCell(Leb13).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Leb13).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemLable2P2_3[32] },
          bgColor: { argb: "" },
        };

        let Leb14 = "BG" + costrowCountLable2P2_3; //row.getCell(5).address;
        worksheet.getCell(Leb14).value = itemLable2P2_3[13];
        worksheet.getCell(Leb14).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Leb14).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemLable2P2_3[33] },
          bgColor: { argb: "" },
        };


        let Leb15 = "BH" + costrowCountLable2P2_3; //row.getCell(5).address;
        worksheet.getCell(Leb15).value = itemLable2P2_3[14];
        worksheet.getCell(Leb15).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Leb15).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemLable2P2_3[34] },
          bgColor: { argb: "" },
        };

        let Leb16 = "BI" + costrowCountLable2P2_3; //row.getCell(5).address;
        worksheet.getCell(Leb16).value = itemLable2P2_3[15];
        worksheet.getCell(Leb16).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Leb16).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemLable2P2_3[35] },
          bgColor: { argb: "" },
        };

        let Leb17 = "BJ" + costrowCountLable2P2_3; //row.getCell(5).address;
        worksheet.getCell(Leb17).value = itemLable2P2_3[16];
        worksheet.getCell(Leb17).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Leb17).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemLable2P2_3[36] },
          bgColor: { argb: "" },
        };

        let Leb18 = "BK" + costrowCountLable2P2_3; //row.getCell(5).address;
        worksheet.getCell(Leb18).value = itemLable2P2_3[17];

        worksheet.getCell(Leb18).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Leb18).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemLable2P2_3[37] },
          bgColor: { argb: "" },
        };

        let Leb19 = "BL" + costrowCountLable2P2_3; //row.getCell(5).address;
        worksheet.getCell(Leb19).value = itemLable2P2_3[18];
        worksheet.getCell(Leb19).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Leb19).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemLable2P2_3[38] },
          bgColor: { argb: "" },
        };


        lableLastRow2P2_3 = costrowCountLable2P2_3;
        rowCountLable2P2_3++
      }



      var headerCountPaking2P2_3 = part2StartLenth3 + rowCountP2_3 + 3 + rowCountAccessories2P2_3 + 3 + 1 + rowCountLable2P2_3 + 3 + 1;


      let acp1 = worksheet.getCell("AT" + headerCountPaking2P2_3);
      acp1.value = "Category";
      acp1.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acp1.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acp1.alignment = { vertical: "middle", horizontal: "center" };

      let acp2 = worksheet.getCell("AU" + headerCountPaking2P2_3);
      acp2.value = "Component/Item";
      acp2.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acp2.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acp2.alignment = { vertical: "middle", horizontal: "center" };

      let acp3 = worksheet.getCell("AV" + headerCountPaking2P2_3);
      acp3.value = "Description";
      acp3.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acp3.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acp3.alignment = { vertical: "middle", horizontal: "center" };

      let acp4 = worksheet.getCell("AW" + headerCountPaking2P2_3);
      acp4.value = "ST Code";
      acp4.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acp4.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acp4.alignment = { vertical: "middle", horizontal: "center" };

      let acp5 = worksheet.getCell("AX" + headerCountPaking2P2_3);
      acp5.value = "Placement";
      acp5.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acp5.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acp5.alignment = { vertical: "middle", horizontal: "center" };

      let acp6 = worksheet.getCell("AY" + headerCountPaking2P2_3);
      acp6.value = "Ref. Code";
      acp6.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acp6.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acp6.alignment = { vertical: "middle", horizontal: "center" };


      let acp7 = worksheet.getCell("AZ" + headerCountPaking2P2_3);
      acp7.value = "Nomination Status";
      acp7.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acp7.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acp7.alignment = { vertical: "middle", horizontal: "center" };

      let acp8 = worksheet.getCell("BA" + headerCountPaking2P2_3);
      acp8.value = "Supplier";
      acp8.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acp8.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acp8.alignment = { vertical: "middle", horizontal: "center" };


      let acp9 = worksheet.getCell("BB" + headerCountPaking2P2_3);
      acp9.value = "Country";
      acp9.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acp9.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acp9.alignment = { vertical: "middle", horizontal: "center" };


      let acp10 = worksheet.getCell("BC" + headerCountPaking2P2_3);
      acp10.value = "UoM";
      acp10.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acp10.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acp10.alignment = { vertical: "middle", horizontal: "center" };

      let acp11 = worksheet.getCell("BD" + headerCountPaking2P2_3);
      acp11.value = "Consumption";
      acp11.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acp11.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      a11.alignment = { vertical: "middle", horizontal: "center" };

      let acp12 = worksheet.getCell("BE" + headerCountPaking2P2_3);
      acp12.value = "Wastage Percentage";
      acp12.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acp12.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acp12.alignment = { vertical: "middle", horizontal: "center" };

      let acp13 = worksheet.getCell("BF" + headerCountPaking2P2_3);
      acp13.value = "Market Unit";
      acp13.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acp13.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acp13.alignment = { vertical: "middle", horizontal: "center" };

      let acp14 = worksheet.getCell("BG" + headerCountPaking2P2_3);
      acp14.value = "Con. Value";
      acp14.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acp14.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acp14.alignment = { vertical: "middle", horizontal: "center" };

      let acp15 = worksheet.getCell("BH" + headerCountPaking2P2_3);
      acp15.value = "Price";
      acp15.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acp15.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acp15.alignment = { vertical: "middle", horizontal: "center" };


      let acp16 = worksheet.getCell("BI" + headerCountPaking2P2_3);
      acp16.value = "FinCost";
      acp16.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acp16.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acp16.alignment = { vertical: "middle", horizontal: "center" };

      let acp17 = worksheet.getCell("BJ" + headerCountPaking2P2_3);
      acp17.value = "%";
      acp17.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acp17.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acp17.alignment = { vertical: "middle", horizontal: "center" };

      let acp18 = worksheet.getCell("BK" + headerCountPaking2P2_3);
      acp18.value = "Value";
      acp18.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acp18.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acp18.alignment = { vertical: "middle", horizontal: "center" };

      let acp19 = worksheet.getCell("BL" + headerCountPaking2P2_3);
      acp19.value = "Comment";
      acp19.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acp19.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acp19.alignment = { vertical: "middle", horizontal: "center" };


      var rowCountPackging2P2_3 = 0
      var pakingFastRow2P2_3 = rowCountPackging2P2_3 + rowCountLable2P2_3 + part2StartLenth3 + rowCountP2_3 + 3 + rowCountAccessories2P2_3 + 3 + 1 + 1 + rowCountLable2P2_3 + 3 + 1;
      var pakingLastRow2P2_3 = 0

      for (var itemPackging2P2_3 of dataThree5P2) {
        var costrowCountPackging2P2_3 = rowCountPackging2P2_3 + rowCountLable2P2_3 + part2StartLenth3 + rowCountP2_3 + 3 + rowCountAccessories2P2_3 + 3 + 1 + 1 + rowCountLable2P2_3 + 3 + 1;
        let Pack1 = "AT" + costrowCountPackging2P2_3;// row.getCell(1).address;
        worksheet.getCell(Pack1).value = itemPackging2P2_3[0];
        worksheet.getCell(Pack1).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Pack1).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemPackging2P2_3[20] },
          bgColor: { argb: "" },
        };

        let Pack2 = "AU" + costrowCountPackging2P2_3;//  row.getCell(2).address;
        worksheet.getCell(Pack2).value = itemPackging2P2_3[1];
        worksheet.getCell(Pack2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Pack2).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemPackging2P2_3[21] },
          bgColor: { argb: "" },
        };

        let Pack3 = "AV" + costrowCountPackging2P2_3;// row.getCell(3).address;
        worksheet.getCell(Pack3).value = itemPackging2P2_3[2];
        worksheet.getCell(Pack3).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Pack3).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemPackging2P2_3[22] },
          bgColor: { argb: "" },
        };

        let Pack4 = "AW" + costrowCountPackging2P2_3; //row.getCell(4).address;
        worksheet.getCell(Pack4).value = itemPackging2P2_3[3];
        worksheet.getCell(Pack4).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Pack4).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemPackging2P2_3[23] },
          bgColor: { argb: "" },
        };

        let Pack5 = "AX" + costrowCountPackging2P2_3; //row.getCell(5).address;
        worksheet.getCell(Pack5).value = itemPackging2P2_3[4];
        worksheet.getCell(Pack5).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Pack5).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemPackging2P2_3[24] },
          bgColor: { argb: "" },
        };

        let Pack6 = "AY" + costrowCountPackging2P2_3; //row.getCell(5).address;
        worksheet.getCell(Pack6).value = itemPackging2P2_3[5];
        worksheet.getCell(Pack6).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Pack6).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemPackging2P2_3[25] },
          bgColor: { argb: "" },
        };

        let Pack7 = "AZ" + costrowCountPackging2P2_3; //row.getCell(5).address;
        worksheet.getCell(Pack7).value = itemPackging2P2_3[6];
        worksheet.getCell(Pack7).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Pack7).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemPackging2P2_3[26] },
          bgColor: { argb: "" },
        };

        let Pack8 = "BA" + costrowCountPackging2P2_3; //row.getCell(5).address;
        worksheet.getCell(Pack8).value = itemPackging2P2_3[7];
        worksheet.getCell(Pack8).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Pack8).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemPackging2P2_3[27] },
          bgColor: { argb: "" },
        };

        let Pack9 = "BB" + costrowCountPackging2P2_3; //row.getCell(5).address;
        worksheet.getCell(Pack9).value = itemPackging2P2_3[8];
        worksheet.getCell(Pack9).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        //   worksheet.getCell(Pack9).alignment = { vertical: "middle", horizontal: "center" };

        worksheet.getCell(Pack9).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemPackging2P2_3[28] },
          bgColor: { argb: "" },
        };


        let Pack10 = "BC" + costrowCountPackging2P2_3; //row.getCell(5).address;
        worksheet.getCell(Pack10).value = itemPackging2P2_3[9];
        worksheet.getCell(Pack10).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        //   worksheet.getCell(Pack10).alignment = { vertical: "middle", horizontal: "center" };

        worksheet.getCell(Pack10).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemPackging2P2_3[29] },
          bgColor: { argb: "" },
        };

        let Pack11 = "BD" + costrowCountPackging2P2_3; //row.getCell(5).address;
        worksheet.getCell(Pack11).value = itemPackging2P2_3[10];
        worksheet.getCell(Pack11).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }


        worksheet.getCell(Pack11).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemPackging2P2_3[30] },
          bgColor: { argb: "" },
        };


        let Pack12 = "BE" + costrowCountPackging2P2_3; //row.getCell(5).address;
        worksheet.getCell(Pack12).value = itemPackging2P2_3[11];
        worksheet.getCell(Pack12).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Pack12).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemPackging2P2_3[31] },
          bgColor: { argb: "" },
        };

        let Pack13 = "BF" + costrowCountPackging2P2_3; //row.getCell(5).address;
        worksheet.getCell(Pack13).value = itemPackging2P2_3[12];
        worksheet.getCell(Pack13).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Pack13).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemPackging2P2_3[32] },
          bgColor: { argb: "" },
        };

        let Pack14 = "BG" + costrowCountPackging2P2_3; //row.getCell(5).address;
        worksheet.getCell(Pack14).value = itemPackging2P2_3[13];
        worksheet.getCell(Pack14).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Pack14).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemPackging2P2_3[33] },
          bgColor: { argb: "" },
        };

        let Pack15 = "BH" + costrowCountPackging2P2_3; //row.getCell(5).address;
        worksheet.getCell(Pack15).value = itemPackging2P2_3[14];
        worksheet.getCell(Pack15).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Pack15).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemPackging2P2_3[34] },
          bgColor: { argb: "" },
        };

        let Pack16 = "BI" + costrowCountPackging2P2_3; //row.getCell(5).address;
        worksheet.getCell(Pack16).value = itemPackging2P2_3[15];
        worksheet.getCell(Pack16).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Pack16).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemPackging2P2_3[35] },
          bgColor: { argb: "" },
        };

        let Pack17 = "BJ" + costrowCountPackging2P2_3; //row.getCell(5).address;
        worksheet.getCell(Pack17).value = itemPackging2P2_3[16];
        worksheet.getCell(Pack17).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Pack17).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemPackging2P2_3[36] },
          bgColor: { argb: "" },
        };

        let Pack18 = "BK" + costrowCountPackging2P2_3; //row.getCell(5).address;
        worksheet.getCell(Pack18).value = itemPackging2P2_3[17];
        worksheet.getCell(Pack18).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Pack18).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemPackging2P2_3[37] },
          bgColor: { argb: "" },
        };

        let Pack19 = "BL" + costrowCountPackging2P2_3; //row.getCell(5).address;
        worksheet.getCell(Pack19).value = itemPackging2P2_3[18];
        worksheet.getCell(Pack19).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Pack19).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemPackging2P2_3[38] },
          bgColor: { argb: "" },
        };


        pakingLastRow2P2_3 = costrowCountPackging2P2_3;
        rowCountPackging2P2_3++
      }



      var headerProcesssCount2P2_3 = part2StartLenth3 + rowCountP2_3 + 3 + rowCountAccessories2P2_3 + 3 + 1 + rowCountLable2P2_3 + 3 + 1 + rowCountPackging2P2_3 + 3 + 1;
      let acpro1 = worksheet.getCell("AT" + headerProcesssCount2P2_3);
      acpro1.value = "Category";
      acpro1.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acpro1.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acpro1.alignment = { vertical: "middle", horizontal: "center" };

      let acpro2 = worksheet.getCell("AU" + headerProcesssCount2P2_3);
      acpro2.value = "Component/Item";
      acpro2.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acpro2.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acpro2.alignment = { vertical: "middle", horizontal: "center" };

      let acpro3 = worksheet.getCell("AV" + headerProcesssCount2P2_3);
      acpro3.value = "Description";
      acpro3.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acpro3.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acpro3.alignment = { vertical: "middle", horizontal: "center" };

      let acpro4 = worksheet.getCell("AW" + headerProcesssCount2P2_3);
      acpro4.value = "ST Code";
      acpro4.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acpro4.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acpro4.alignment = { vertical: "middle", horizontal: "center" };

      let acpro5 = worksheet.getCell("AX" + headerProcesssCount2P2_3);
      acpro5.value = "Placement";
      acpro5.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acpro5.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acpro5.alignment = { vertical: "middle", horizontal: "center" };

      let acpro6 = worksheet.getCell("AY" + headerProcesssCount2P2_3);
      acpro6.value = "Ref. Code";
      acpro6.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acpro6.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acpro6.alignment = { vertical: "middle", horizontal: "center" };


      let acpro7 = worksheet.getCell("AZ" + headerProcesssCount2P2_3);
      acpro7.value = "Nomination Status";
      acpro7.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acpro7.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acpro7.alignment = { vertical: "middle", horizontal: "center" };

      let acpro8 = worksheet.getCell("BA" + headerProcesssCount2P2_3);
      acpro8.value = "Supplier";
      acpro8.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acpro8.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acpro8.alignment = { vertical: "middle", horizontal: "center" };


      let acpro9 = worksheet.getCell("BB" + headerProcesssCount2P2_3);
      acpro9.value = "Country";
      acpro9.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acpro9.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acpro9.alignment = { vertical: "middle", horizontal: "center" };


      let acpro10 = worksheet.getCell("BC" + headerProcesssCount2P2_3);
      acpro10.value = "UoM";
      acpro10.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acpro10.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acpro10.alignment = { vertical: "middle", horizontal: "center" };

      let acpro11 = worksheet.getCell("BD" + headerProcesssCount2P2_3);
      acpro11.value = "Consumption";
      acpro11.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acpro11.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      a11.alignment = { vertical: "middle", horizontal: "center" };

      let acpro12 = worksheet.getCell("BE" + headerProcesssCount2P2_3);
      acpro12.value = "Wastage Percentage";
      acpro12.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acpro12.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acpro12.alignment = { vertical: "middle", horizontal: "center" };

      let acpro13 = worksheet.getCell("BF" + headerProcesssCount2P2_3);
      acpro13.value = "Market Unit";
      acpro13.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acpro13.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acpro13.alignment = { vertical: "middle", horizontal: "center" };

      let acpro14 = worksheet.getCell("BG" + headerProcesssCount2P2_3);
      acpro14.value = "Con. Value";
      acpro14.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acpro14.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acpro14.alignment = { vertical: "middle", horizontal: "center" };

      let acpro15 = worksheet.getCell("BH" + headerProcesssCount2P2_3);
      acpro15.value = "Price";
      acpro15.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acpro15.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acpro15.alignment = { vertical: "middle", horizontal: "center" };


      let acpro16 = worksheet.getCell("BI" + headerProcesssCount2P2_3);
      acpro16.value = "FinCost";
      acpro16.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acpro16.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acpro16.alignment = { vertical: "middle", horizontal: "center" };

      let acpro17 = worksheet.getCell("BJ" + headerProcesssCount2P2_3);
      acpro17.value = "%";
      acpro17.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acpro17.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acpro17.alignment = { vertical: "middle", horizontal: "center" };

      let acpro18 = worksheet.getCell("BK" + headerProcesssCount2P2_3);
      acpro18.value = "Value";
      acpro18.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acpro18.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acpro18.alignment = { vertical: "middle", horizontal: "center" };

      let acpro19 = worksheet.getCell("BL" + headerProcesssCount2P2_3);
      acpro19.value = "Comment";
      acpro19.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "66BB55" },
        bgColor: { argb: "" },
      };
      acpro19.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      acpro19.alignment = { vertical: "middle", horizontal: "center" };


      //----------------now_working-------------------------------//
      var rowCountProcesss2P2_3 = 0
      var processFastRowP2_3 = rowCountProcesss2P2_3 + part2StartLenth3 + rowCountP2_3 + 3 + rowCountAccessories2P2_3 + 3 + 1 + rowCountLable2P2_3 + 3 + 1 + rowCountPackging2P2_3 + 3 + 1;
      var processLastRowP2_3 = 0

      for (var itemProcesss2P2_3 of dataThree6P2) {
        var costrowCountProcesss2P2_3 = rowCountProcesss2P2_3 + part2StartLenth3 + rowCountP2_3 + 3 + rowCountAccessories2P2_3 + 3 + 1 + rowCountLable2P2_3 + 3 + 1 + rowCountPackging2P2_3 + 3 + 1 + 1;
        let Porcss1 = "AT" + costrowCountProcesss2P2_3;// row.getCell(1).address;
        worksheet.getCell(Porcss1).value = itemProcesss2P2_3[0];
        worksheet.getCell(Porcss1).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Porcss1).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemProcesss2P2_3[20] },
          bgColor: { argb: "" },
        };

        let Porcss2 = "AU" + costrowCountProcesss2P2_3;//  row.getCell(2).address;
        worksheet.getCell(Porcss2).value = itemProcesss2P2_3[1];
        worksheet.getCell(Porcss2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Porcss2).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemProcesss2P2_3[21] },
          bgColor: { argb: "" },
        };

        let Porcss3 = "AV" + costrowCountProcesss2P2_3;// row.getCell(3).address;
        worksheet.getCell(Porcss3).value = itemProcesss2P2_3[2];
        //   worksheet.getCell(Porcss3).border = {
        //     top: { style: 'thin' },
        //     bottom: { style: 'thin' },
        //     left: { style: 'thin' },
        //     right: { style: 'thin' }
        //   }

        worksheet.getCell(Porcss3).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemProcesss2P2_3[22] },
          bgColor: { argb: "" },
        };

        let Porcss4 = "AW" + costrowCountProcesss2P2_3; //row.getCell(4).address;
        worksheet.getCell(Porcss4).value = itemProcesss2P2_3[3];
        worksheet.getCell(Porcss4).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Porcss4).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemProcesss2P2_3[23] },
          bgColor: { argb: "" },
        };

        let Porcss5 = "AX" + costrowCountProcesss2P2_3; //row.getCell(5).address;
        worksheet.getCell(Porcss5).value = itemProcesss2P2_3[4];
        worksheet.getCell(Porcss5).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Porcss5).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemLable3[24] },
          bgColor: { argb: "" },
        };

        let Porcss6 = "AY" + costrowCountProcesss2P2_3; //row.getCell(5).address;
        worksheet.getCell(Porcss6).value = itemProcesss2P2_3[5];
        worksheet.getCell(Porcss6).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Porcss6).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemLable3[25] },
          bgColor: { argb: "" },
        };

        let Porcss7 = "AZ" + costrowCountProcesss2P2_3; //row.getCell(5).address;
        worksheet.getCell(Porcss7).value = itemProcesss2P2_3[6];
        worksheet.getCell(Porcss7).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Porcss7).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemProcesss2P2_3[26] },
          bgColor: { argb: "" },
        };

        let Porcss8 = "BA" + costrowCountProcesss2P2_3; //row.getCell(5).address;
        worksheet.getCell(Porcss8).value = itemProcesss2P2_3[7];
        worksheet.getCell(Porcss8).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Porcss8).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemProcesss2P2_3[27] },
          bgColor: { argb: "" },
        };

        let Porcss9 = "BB" + costrowCountProcesss2P2_3; //row.getCell(5).address;
        worksheet.getCell(Porcss9).value = itemProcesss2P2_3[8];
        worksheet.getCell(Porcss9).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(Porcss9).alignment = { vertical: "middle", horizontal: "center" };

        worksheet.getCell(Porcss9).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemProcesss2P2_3[28] },
          bgColor: { argb: "" },
        };


        let Porcss10 = "BC" + costrowCountProcesss2P2_3; //row.getCell(5).address;
        worksheet.getCell(Porcss10).value = itemProcesss2P2_3[9];
        worksheet.getCell(Porcss10).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        //worksheet.getCell(Porcss10).alignment = { vertical: "middle", horizontal: "center" };

        worksheet.getCell(Porcss10).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemProcesss2P2_3[29] },
          bgColor: { argb: "" },
        };

        let Porcss11 = "BD" + costrowCountProcesss2P2_3; //row.getCell(5).address;
        worksheet.getCell(Porcss11).value = itemProcesss2P2_3[10];

        worksheet.getCell(Porcss11).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Porcss11).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemLable3[30] },
          bgColor: { argb: "" },
        };


        let Porcss12 = "BE" + costrowCountProcesss2P2_3; //row.getCell(5).address;
        worksheet.getCell(Porcss12).value = itemProcesss2P2_3[11];
        worksheet.getCell(Porcss12).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Porcss12).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemProcesss2P2_3[31] },
          bgColor: { argb: "" },
        };

        let Porcss13 = "BF" + costrowCountProcesss2P2_3; //row.getCell(5).address;
        worksheet.getCell(Porcss13).value = itemProcesss2P2_3[12];
        worksheet.getCell(Porcss13).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Porcss13).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemProcesss2P2_3[32] },
          bgColor: { argb: "" },
        };

        let Porcss14 = "BG" + costrowCountProcesss2P2_3; //row.getCell(5).address;
        worksheet.getCell(Porcss14).value = itemProcesss2P2_3[13];
        worksheet.getCell(Porcss14).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Porcss14).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemProcesss2P2_3[33] },
          bgColor: { argb: "" },
        };

        let Porcss15 = "BH" + costrowCountProcesss2P2_3; //row.getCell(5).address;
        worksheet.getCell(Porcss15).value = itemProcesss2P2_3[14];
        worksheet.getCell(Porcss15).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Porcss15).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemProcesss2P2_3[34] },
          bgColor: { argb: "" },
        };

        let Porcss16 = "BI" + costrowCountProcesss2P2_3; //row.getCell(5).address;
        worksheet.getCell(Porcss16).value = itemProcesss2P2_3[15];
        worksheet.getCell(Porcss16).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Porcss16).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemProcesss2P2_3[35] },
          bgColor: { argb: "" },
        };

        let Porcss17 = "BJ" + costrowCountProcesss2P2_3; //row.getCell(5).address;
        worksheet.getCell(Porcss17).value = itemProcesss2P2_3[16];
        worksheet.getCell(Porcss17).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Porcss17).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemProcesss2P2_3[36] },
          bgColor: { argb: "" },
        };

        let Porcss18 = "BK" + costrowCountProcesss2P2_3; //row.getCell(5).address;
        worksheet.getCell(Porcss18).value = itemProcesss2P2_3[17];
        worksheet.getCell(Porcss18).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Porcss18).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemProcesss2P2_3[37] },
          bgColor: { argb: "" },
        };

        let Porcss19 = "BL" + costrowCountProcesss2P2_3; //row.getCell(5).address;
        worksheet.getCell(Porcss19).value = itemProcesss2P2_3[18];
        worksheet.getCell(Porcss19).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        worksheet.getCell(Porcss19).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: itemProcesss2P2_3[38] },
          bgColor: { argb: "" },
        };


        processLastRowP2_3 = costrowCountProcesss2P2_3;
        rowCountProcesss2P2_3++
      }



    }



    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, title + ".xlsx");
    });
  }


}
