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
import { trim } from "jquery";
import { MaterialModule } from "src/app/material/material.module";

@Injectable({
  providedIn: "root",
})
export class VfCostingReportService {
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

  async exportExcel(excelData) {
    //Title, Header & Data
    const masterData = excelData.masterData;
    const title = excelData.title;
    //const header = excelData.headers;
    const data = excelData.data; // Fabric Date
    //const data1 = excelData.data1; // Accessories Data
    const data2 = excelData.data2; // Cost Master Date
    const data3 = excelData.data3; // Cost Calculation Data
    //const data4 = excelData.data4; // Cost Accessories Label Data
    //const data5 = excelData.data5; // Cost Accessories Packging Data
    //const data6 = excelData.data6; // Cost Accessories Process Data

    const dataPart2 = excelData.dataPart2;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Costing Reprot");
    const NewHeader = [
      "Sort",
      "Supplier Article",
      "Material Code",
      "Location ",
      "Description",
      "Placement",
      "Total",
      "Roll Up",
      "Size",
      "YieId",
      "UOM",
      "Price",
      "Freight",
      "Duty",
      "Waste",
      "Ssn",
      "Material COO",
      "Lead Time",
      "Supplier Comments",
      "Costing Marker Efficieny %"
    ];

    // worksheet.mergeCells("A1", "B1");
    // let titleRow = worksheet.getCell("A1");
    // titleRow.value = data2.styleName;
    // titleRow.font = {
    //   name: "Calibri",
    //   size: 16,
    //   underline: "single",
    //   bold: true,
    //   color: { argb: "0085A3" },
    // };
    // titleRow.alignment = { vertical: "middle", horizontal: "center" };

    let part = worksheet.getCell("A2");
    part.value = "Part Name";

    let partValue = worksheet.getCell("B2");
    partValue.value =  masterData[0].partName


    // add Style Info Title
    worksheet.mergeCells("D3","L3")
    let styleTitle = worksheet.getCell("D3");
    styleTitle.value = "Snowtex - "+masterData[0].seasonName+": "+masterData[0].styleName;
    styleTitle.font = {
      name: "Calibri",
      size: 14,
      underline: "single",
      bold: true,
      color: { argb: "0085A3" },
    };

    let Colorway = worksheet.getCell("D4");
    Colorway.value ="Colorway";
    Colorway.font = {
      //name: "Calibri",
     // size: 15,
     // underline: "single",
      bold: true,
      //color: { argb: "0085A3" },
    };
    worksheet.mergeCells("E4","L4")

    let ColorwayValue = worksheet.getCell("E4");
    ColorwayValue.value = masterData[0].colorType
    // ColorwayValue.font = {
    //   name: "Calibri",
    //   size: 15,
    //   underline: "single",
    //   bold: true,
    //   color: { argb: "0085A3" },
    // };
    
    let costingSize = worksheet.getCell("D5");
    costingSize.value = "Size";
    costingSize.font = { bold: true };
    costingSize.border = {
      top: { style: 'thin' },
      //bottom: { style: 'thin' },
      left: { style: 'thin' },
     // right: { style: 'thin' }
    }

    let brand = worksheet.getCell("D6");
    brand.value = "Brand";
    brand.font = { bold: true };
    brand.border = {
      //top: { style: 'thin' },
     // bottom: { style: 'thin' },
      left: { style: 'thin' },
      //right: { style: 'thin' }
    }

    let plan = worksheet.getCell("D7");
    plan.value = "Plan";
    plan.font = { bold: true };
    plan.border = {
      //top: { style: 'thin' },
      //bottom: { style: 'thin' },
      left: { style: 'thin' },
      //right: { style: 'thin' }
    }

    let vandeor = worksheet.getCell("D8");
    vandeor.value = "Vendor";
    vandeor.font = { bold: true };
    vandeor.border = {
      //top: { style: 'thin' },
     // bottom: { style: 'thin' },
      left: { style: 'thin' },
      //right: { style: 'thin' }
    }

    let factoryCodeName = worksheet.getCell("D9");
    factoryCodeName.value = "Factory code & name";
    factoryCodeName.font = { bold: true };
    factoryCodeName.border = {
     // top: { style: 'thin' },
     // bottom: { style: 'thin' },
      left: { style: 'thin' },
      //right: { style: 'thin' }
    }

    let stage = worksheet.getCell("D10");
    stage.value = "Stage";
    stage.font = { bold: true };
    stage.border = {
      //top: { style: 'thin' },
      //bottom: { style: 'thin' },
      left: { style: 'thin' },
      //right: { style: 'thin' }
    }

    let date = worksheet.getCell("D11");
    date.value = "Date";
    date.font = { bold: true };
    date.border = {
     // top: { style: 'thin' },
      //bottom: { style: 'thin' },
      left: { style: 'thin' },
     // right: { style: 'thin' }
    }
    date.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd1e4bb" },
      bgColor: { argb: "" },
    };

    let instructions = worksheet.getCell("D12");
    instructions.value = "Instructions";
    instructions.font = { bold: true };
    instructions.border = {
     // top: { style: 'thin' },
     // bottom: { style: 'thin' },
      left: { style: 'thin' },
     // right: { style: 'thin' }
    }

    let season = worksheet.getCell("D13");
    season.value = "Development Season";
    season.font = { bold: true };
    season.border = {
     // top: { style: 'thin' },
     // bottom: { style: 'thin' },
      left: { style: 'thin' },
     // right: { style: 'thin' }
    }
    season.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd1e4bb" },
      bgColor: { argb: "" },
    };

    let factoryCoo = worksheet.getCell("D14");
    factoryCoo.value = "Factory COO";
    factoryCoo.font = { bold: true };
    factoryCoo.border = {
      //top: { style: 'thin' },
      //bottom: { style: 'thin' },
      left: { style: 'thin' },
      //right: { style: 'thin' }
    }
    factoryCoo.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd1e4bb" },
      bgColor: { argb: "" },
    };

    let style = worksheet.getCell("D15");
    style.value = "Style No.";
    style.font = { bold: true };
    style.border = {
      //top: { style: 'thin' },
     // bottom: { style: 'thin' },
      left: { style: 'thin' },
      //right: { style: 'thin' }
    }
    style.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd1e4bb" },
      bgColor: { argb: "" },
    };

    let productCollection = worksheet.getCell("D16");
    productCollection.value = "Product Collection";
    productCollection.font = { bold: true };
    productCollection.border = {
     // top: { style: 'thin' },
     // bottom: { style: 'thin' },
      left: { style: 'thin' },
     // right: { style: 'thin' }
    }
    productCollection.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd1e4bb" },
      bgColor: { argb: "" },
    };

    let globalStyleStatus = worksheet.getCell("D17");
    globalStyleStatus.value = "Global Style Status";
    globalStyleStatus.font = { bold: true };
    globalStyleStatus.border = {
      //top: { style: 'thin' },
     // bottom: { style: 'thin' },
      left: { style: 'thin' },
      //right: { style: 'thin' }
    }
    globalStyleStatus.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd1e4bb" },
      bgColor: { argb: "" },
    };

    let referenceStyleNo = worksheet.getCell("D18");
    referenceStyleNo.value = "Reference Style No.";
    referenceStyleNo.font = { bold: true };
    referenceStyleNo.border = {
      //top: { style: 'thin' },
      //bottom: { style: 'thin' },
      left: { style: 'thin' },
      //right: { style: 'thin' }
    }
    referenceStyleNo.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd1e4bb" },
      bgColor: { argb: "" },
    };

    let productCategory = worksheet.getCell("D19");
    productCategory.value = "Product Category";
    productCategory.font = { bold: true };
    productCategory.border = {
      //top: { style: 'thin' },
     // bottom: { style: 'thin' },
      left: { style: 'thin' },
      //right: { style: 'thin' }
    }
    productCategory.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd1e4bb" },
      bgColor: { argb: "" },
    };


    let othersSpecify = worksheet.getCell("D20");
    othersSpecify.value = "If others, pls specify";
    othersSpecify.font = { bold: true };
    othersSpecify.border = {
     // top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      //right: { style: 'thin' }
    }
    othersSpecify.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd1e4bb" },
      bgColor: { argb: "" },
    };


    /// value for stryle
    let sizeValue = worksheet.getCell("E5");
    sizeValue.value = data2.sizeRange;
    sizeValue.border = {
      top: { style: 'thin' },
      // bottom: { style: 'thin' },
      // left: { style: 'thin' },
      right: { style: 'thin' }
    }

    let brandValue = worksheet.getCell("E6");
    brandValue.value = data2.brandName;
    brandValue.border = {
      // top: { style: 'thin' },
      // bottom: { style: 'thin' },
      // left: { style: 'thin' },
      right: { style: 'thin' }
    }
    brandValue.font = {
      color : { argb: 'ffff0000' },
    }

    let planValue = worksheet.getCell("E7");
    planValue.value = masterData[0].seasonName;
    planValue.border = {
      // top: { style: 'thin' },
      // bottom: { style: 'thin' },
      // left: { style: 'thin' },
      right: { style: 'thin' }
    }

    let vandeorValue = worksheet.getCell("E8");
    vandeorValue.value = masterData[0].branchOfficeName;
    vandeorValue.border = {
      // top: { style: 'thin' },
      // bottom: { style: 'thin' },
      // left: { style: 'thin' },
      right: { style: 'thin' }
    }

    let factoryCodeNameValue = worksheet.getCell("E9");
    factoryCodeNameValue.value = "71474 SNOWTEX OUTERWEAR LTD";
    factoryCodeNameValue.border = {
      // top: { style: 'thin' },
      // bottom: { style: 'thin' },
      // left: { style: 'thin' },
      right: { style: 'thin' }
    }

    let stageValue = worksheet.getCell("E10");
    stageValue.value = ""
    stageValue.border = {
      // top: { style: 'thin' },
      // bottom: { style: 'thin' },
      // left: { style: 'thin' },
      right: { style: 'thin' }
    }
    stageValue.font = {
      color : { argb: 'ffff0000' },
    }
    
    let dateValue = worksheet.getCell("E11");
    dateValue.value =  new Date(masterData[0].initialDate);
    dateValue.border = {
      // top: { style: 'thin' },
      // bottom: { style: 'thin' },
      // left: { style: 'thin' },
      right: { style: 'thin' }
    }
    dateValue.font = {
      color : { argb: 'ffff0000' },
    }

    let instructionsValue = worksheet.getCell("E12");
    instructionsValue.value = ""
    instructionsValue.border = {
      // top: { style: 'thin' },
      // bottom: { style: 'thin' },
      // left: { style: 'thin' },
      right: { style: 'thin' }
    }

    let seasonValue = worksheet.getCell("E13");
    seasonValue.value = data2.seasonName;
    seasonValue.border = {
      // top: { style: 'thin' },
      // bottom: { style: 'thin' },
      // left: { style: 'thin' },
      right: { style: 'thin' }
    }
    seasonValue.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd1e4bb" },
      bgColor: { argb: "" },
    };

    let factoryCooValue = worksheet.getCell("E14");
    factoryCooValue.value = "Bangladesh";
    factoryCooValue.border = {
      // top: { style: 'thin' },
      // bottom: { style: 'thin' },
      // left: { style: 'thin' },
      right: { style: 'thin' }
    }
    factoryCooValue.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd1e4bb" },
      bgColor: { argb: "" },
    };
    factoryCooValue.font = {
      color : { argb: 'ffff0000' },
    }


    let styleValue = worksheet.getCell("E15");
    styleValue.value = data2.styleName;
    styleValue.border = {
      // top: { style: 'thin' },
      // bottom: { style: 'thin' },
      // left: { style: 'thin' },
      right: { style: 'thin' }
    }
    styleValue.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd1e4bb" },
      bgColor: { argb: "" },
    };

    let productCollectionValue = worksheet.getCell("E16");
    productCollectionValue.value = ""
    productCollectionValue.border = {
      // top: { style: 'thin' },
      // bottom: { style: 'thin' },
      // left: { style: 'thin' },
      right: { style: 'thin' }
    }
    productCollectionValue.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd1e4bb" },
      bgColor: { argb: "" },
    };

    let globalStyleStatusValue = worksheet.getCell("E17");
    globalStyleStatusValue.value = ""
    globalStyleStatusValue.border = {
      // top: { style: 'thin' },
      // bottom: { style: 'thin' },
      // left: { style: 'thin' },
      right: { style: 'thin' }
    }
    globalStyleStatusValue.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd1e4bb" },
      bgColor: { argb: "" },
    };
    globalStyleStatusValue.font = {
      color : { argb: 'ffff0000' },
    }

    let referenceStyleNoValue = worksheet.getCell("E18");
    referenceStyleNoValue.value = masterData[0].referenceStyleNo;
    referenceStyleNoValue.border = {
      // top: { style: 'thin' },
      // bottom: { style: 'thin' },
      // left: { style: 'thin' },
      right: { style: 'thin' }
    }
    referenceStyleNoValue.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd1e4bb" },
      bgColor: { argb: "" },
    };

    let productCategoryValue = worksheet.getCell("E19");
    productCategoryValue.value = masterData[0].item
    productCategoryValue.border = {
      // top: { style: 'thin' },
      // bottom: { style: 'thin' },
      // left: { style: 'thin' },
      right: { style: 'thin' }
    }
    productCategoryValue.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd1e4bb" },
      bgColor: { argb: "" },
    };
    productCategoryValue.font = {
      color : { argb: 'ffff0000' },
    }

    let othersSpecifyValue = worksheet.getCell("E20");
    othersSpecifyValue.value = ""
    othersSpecifyValue.border = {
      //top: { style: 'thin' },
      bottom: { style: 'thin' },
      //left: { style: 'thin' },
      right: { style: 'thin' }
    }
    othersSpecifyValue.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd1e4bb" },
      bgColor: { argb: "" },
    };




    //------ Bom_Value_Block ----------//

    // Value_Block_Label //

    let bomCost = worksheet.getCell("F5");
    bomCost.value = "BOM Costs"
    bomCost.font = { bold: true };
    bomCost.border = {
      top: { style: 'thin' },
      // bottom: { style: 'thin' },
      left: { style: 'thin' },
      // right: { style: 'thin' }
    }
    bomCost.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd0d9ea" },
      bgColor: { argb: "" },
    };

    let finance = worksheet.getCell("F6");
    finance.value = "Finance"
    finance.border = {
      // top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      // right: { style: 'thin' }
    }
    finance.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd0d9ea" },
      bgColor: { argb: "" },
    };

    let totalMatrial = worksheet.getCell("F7");
    totalMatrial.value = "Total Material"
    totalMatrial.font = { bold: true };
    totalMatrial.border = {
      // top: { style: 'thin' },
      // bottom: { style: 'thin' },
      left: { style: 'thin' },
      // right: { style: 'thin' }
    }
    totalMatrial.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd0d9ea" },
      bgColor: { argb: "" },
    };

    let fabric = worksheet.getCell("F8");
    fabric.value = "Fabric"
    fabric.border = {
      // top: { style: 'thin' },
      // bottom: { style: 'thin' },
      left: { style: 'thin' },
      // right: { style: 'thin' }
    }
    fabric.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd0d9ea" },
      bgColor: { argb: "" },
    };

    let trims = worksheet.getCell("F9");
    trims.value = "Trims"
    trims.border = {
      // top: { style: 'thin' },
      // bottom: { style: 'thin' },
      left: { style: 'thin' },
      // right: { style: 'thin' }
    }
    trims.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd0d9ea" },
      bgColor: { argb: "" },
    };

    let lables = worksheet.getCell("F10");
    lables.value = "Labels"
    lables.border = {
      // top: { style: 'thin' },
      // bottom: { style: 'thin' },
      left: { style: 'thin' },
      // right: { style: 'thin' }
    }
    lables.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd0d9ea" },
      bgColor: { argb: "" },
    };

    let graphic = worksheet.getCell("F11");
    graphic.value = "Graphic"
    graphic.border = {
      // top: { style: 'thin' },
      // bottom: { style: 'thin' },
      left: { style: 'thin' },
      // right: { style: 'thin' }
    }
    graphic.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd0d9ea" },
      bgColor: { argb: "" },
    };


    worksheet.getCell("F12").border ={
      left :{style:'thin' }
    }
    worksheet.getCell("F13").border ={
      left :{style:'thin' }
    }
    worksheet.getCell("F14").border ={
      left :{style:'thin' }
    }
    worksheet.getCell("F15").border ={
      left :{style:'thin' }
    }
    worksheet.getCell("F16").border ={
      left :{style:'thin' }
    }
    worksheet.getCell("F17").border ={
      left :{style:'thin' }
    }
    worksheet.getCell("F18").border ={
      left :{style:'thin' }
    }
    worksheet.getCell("F19").border ={
      left :{style:'thin' }
    }
    worksheet.getCell("F20").border ={
      left :{style:'thin' },
      bottom :{style:'thin' }
    }

    // Value_Block_Value //
    let bomCostValue = worksheet.getCell("G5");
    bomCostValue.value = ""
    bomCostValue.font = { bold: true };
    bomCostValue.border = {
      top: { style: 'thin' },
      // bottom: { style: 'thin' },
      // left: { style: 'thin' },
      right: { style: 'thin' }
    }
    bomCostValue.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd0d9ea" },
      bgColor: { argb: "" },
    };

    let financeValue = worksheet.getCell("G6");
    financeValue.value = ""
    financeValue.border = {
      //top: { style: 'thin' },
      bottom: { style: 'thin' },
      //left: { style: 'thin' },
      right: { style: 'thin' }
    }
    financeValue.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd0d9ea" },
      bgColor: { argb: "" },
    };

    let totalMatrialValue = worksheet.getCell("G7");
    totalMatrialValue.value = ""
    totalMatrialValue.font = { bold: true };
    totalMatrialValue.border = {
      // top: { style: 'thin' },
      // bottom: { style: 'thin' },
      // left: { style: 'thin' },
      right: { style: 'thin' }
    }
    totalMatrialValue.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd0d9ea" },
      bgColor: { argb: "" },
    };

    let fabricValue = worksheet.getCell("G8");
    //fabricValue.value = ""
    fabricValue.border = {
      // top: { style: 'thin' },
      // bottom: { style: 'thin' },
      // left: { style: 'thin' },
      right: { style: 'thin' }
    }
    fabricValue.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd0d9ea" },
      bgColor: { argb: "" },
    };

    let trimsValue = worksheet.getCell("G9");
    trimsValue.value = ""
    trimsValue.border = {
      // top: { style: 'thin' },
      // bottom: { style: 'thin' },
      // left: { style: 'thin' },
      right: { style: 'thin' }
    }
    trimsValue.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd0d9ea" },
      bgColor: { argb: "" },
    };

    let lablesValue = worksheet.getCell("G10");
    lablesValue.value = ""
    lablesValue.border = {
      // top: { style: 'thin' },
      // bottom: { style: 'thin' },
      // left: { style: 'thin' },
      right: { style: 'thin' }
    }
    lablesValue.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd0d9ea" },
      bgColor: { argb: "" },
    };

    let graphicValue = worksheet.getCell("G11");
    graphicValue.value = ""
    graphicValue.border = {
      // top: { style: 'thin' },
      // bottom: { style: 'thin' },
      // left: { style: 'thin' },
      right: { style: 'thin' }
    }
    graphicValue.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd0d9ea" },
      bgColor: { argb: "" },
    };

    worksheet.getCell("G12").border ={
      right :{style:'thin' }
    }
    worksheet.getCell("G13").border ={
      right :{style:'thin' }
    }
    worksheet.getCell("G14").border ={
      right :{style:'thin' }
    }
    worksheet.getCell("G15").border ={
      right :{style:'thin' }
    }
    worksheet.getCell("G16").border ={
      right :{style:'thin' }
    }
    worksheet.getCell("G17").border ={
      right :{style:'thin' }
    }
    worksheet.getCell("G18").border ={
      right :{style:'thin' }
    }
    worksheet.getCell("G19").border ={
      right :{style:'thin' }
    }
    worksheet.getCell("G20").border ={
      right :{style:'thin' },
      bottom :{style:'thin' }
    }

  
//H_per Block//

    let H5_per = worksheet.getCell("H5");
   H5_per.value = null
   H5_per.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    H5_per.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "" },
      bgColor: { argb: "" },
    };

    let H6_per = worksheet.getCell("H6");
    H6_per.value = null
    H6_per.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    H6_per.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd1e4bb" },
      bgColor: { argb: "" },
    };


    worksheet.getCell("H8").border ={
      right :{style:'thin' }
    }


    worksheet.getCell("H12").border ={
      right :{style:'thin' }
    }
    worksheet.getCell("H13").border ={
      right :{style:'thin' }
    }
    worksheet.getCell("H14").border ={
      right :{style:'thin' }
    }
    worksheet.getCell("H15").border ={
      right :{style:'thin' }
    }
    worksheet.getCell("H16").border ={
      right :{style:'thin' }
    }
    worksheet.getCell("H17").border ={
      right :{style:'thin' }
    }
    worksheet.getCell("H18").border ={
      right :{style:'thin' }
    }
    worksheet.getCell("H19").border ={
      right :{style:'thin' }
    }
    worksheet.getCell("H20").border ={
      right :{style:'thin' },
      bottom : {style:'thin'}
    }




///---------------CM_Cost_Block--------------------///

// CM_Cost_Lable //
let LabaorOverhadecost = worksheet.getCell("I5");
LabaorOverhadecost.value = "Labor & Overhead (LO) Costs"
LabaorOverhadecost.font = { bold: true };
LabaorOverhadecost.border = {
  top: { style: 'thin' },
 bottom: { style: 'dotted' },
  left: { style: 'thin' },
  right: { style: 'dotted' }
}
LabaorOverhadecost.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd0d9ea" },
  bgColor: { argb: "" },
};

let LaborCost = worksheet.getCell("I6");
LaborCost.value = "Direct Labor Cost (Cut to Pack)"
LaborCost.border = {
  top: { style: 'dotted' },
  bottom: { style: 'dotted' },
  left: { style: 'thin' },
  right: { style: 'dotted' }
}
LaborCost.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd0d9ea" },
  bgColor: { argb: "" },
};

let OverheadCost = worksheet.getCell("I7");
OverheadCost.value = "Overhead Cost"
OverheadCost.border = {
  top: { style: 'dotted' },
  bottom: { style: 'dotted' },
  left: { style: 'thin' },
  right: { style: 'dotted' }
}
OverheadCost.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd0d9ea" },
  bgColor: { argb: "" },
};

//--------------need to work---------------//

let smv = worksheet.getCell("I9");
smv.value = "Standard Minute Value	"
smv.border = {
  top: { style: 'dotted' },
  bottom: { style: 'dotted' },
  left: { style: 'thin' },
  right: { style: 'dotted' }
}
smv.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};

let AverageEfficiency = worksheet.getCell("I10");
AverageEfficiency.value = "Average Efficiency %"
AverageEfficiency.border = {
  top: { style: 'dotted' },
 bottom: { style: 'dotted' },
  left: { style: 'thin' },
 right: { style: 'dotted' }
}
AverageEfficiency.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};

let HourlyWage = worksheet.getCell("I11");
HourlyWage.value = "Hourly Wage with Fringes"
HourlyWage.border = {
 top: { style: 'dotted' },
 bottom: { style: 'dotted' },
  left: { style: 'thin' },
 right: { style: 'dotted' }
}
HourlyWage.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};

//--------------need to work---------------//

let OverheadCostRatio = worksheet.getCell("I13");
OverheadCostRatio.value = "Overhead Cost Ratio to Direct Labor"
OverheadCostRatio.border = {
  top: { style: 'dotted' },
  bottom: { style: 'dotted' },
  left: { style: 'thin' },
  right: { style: 'dotted' }
}
OverheadCostRatio.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};

// CM_Cost_Value //
let LabaorOverhadecostValue = worksheet.getCell("J5");
LabaorOverhadecostValue.value = null
LabaorOverhadecostValue.font = { bold: true };
LabaorOverhadecostValue.border = {
  top: { style: 'thin' },
  bottom: { style: 'dotted' },
  left: { style: 'dotted' },
  right: { style: 'thin' }
}
LabaorOverhadecostValue.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd0d9ea" },
  bgColor: { argb: "" },
};

let LaborCostValue = worksheet.getCell("J6");
LaborCostValue.value = null
LaborCostValue.border = {
  top: { style: 'dotted' },
  bottom: { style: 'dotted' },
  left: { style: 'dotted' },
  right: { style: 'thin' }
}
LaborCostValue.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd0d9ea" },
  bgColor: { argb: "" },
};

let OverheadCostValue = worksheet.getCell("J7");
OverheadCostValue.value = ""
OverheadCostValue.border = {
  top: { style: 'dotted' },
  bottom: { style: 'dotted' },
  left: { style: 'dotted' },
  right: { style: 'thin' }
}
OverheadCostValue.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd0d9ea" },
  bgColor: { argb: "" },
};

worksheet.getCell("I20").border ={
  //right :{style:'thin' },
  bottom : {style: 'thin'}
}
//--------------need to work---------------//

let smvValue = worksheet.getCell("J9");
smvValue.value = masterData[0].smv
smvValue.border = {
  top: { style: 'dotted' },
  bottom: { style: 'dotted' },
  left: { style: 'dotted' },
  right: { style: 'thin' }
}
smvValue.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};

let AverageEfficiencyValue = worksheet.getCell("J10");
AverageEfficiencyValue.value = masterData[0].efficency
AverageEfficiencyValue.border = {
  top: { style: 'dotted' },
  bottom: { style: 'dotted' },
  left: { style: 'dotted' },
  right: { style: 'thin' }
}
AverageEfficiencyValue.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};

let HourlyWageValue = worksheet.getCell("J11");
HourlyWageValue.value = masterData[0].hourlyWageWithFringes
HourlyWageValue.border = {
  top: { style: 'dotted' },
  bottom: { style: 'dotted' },
  left: { style: 'dotted' },
  right: { style: 'thin' }
}
HourlyWageValue.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};
worksheet.getCell("J12").border ={
  right :{style:'thin' }
}
worksheet.getCell("J12").border ={
  right :{style:'thin' }
}
worksheet.getCell("J13").border ={
  right :{style:'thin' }
}
worksheet.getCell("J14").border ={
  right :{style:'thin' }
}
worksheet.getCell("J15").border ={
  right :{style:'thin' }
}
worksheet.getCell("J16").border ={
  right :{style:'thin' }
}
worksheet.getCell("J17").border ={
  right :{style:'thin' }
}
worksheet.getCell("J18").border ={
  right :{style:'thin' }
}
worksheet.getCell("J19").border ={
  right :{style:'thin' }
}
worksheet.getCell("J20").border ={
  right :{style:'thin' },
  bottom : {style: 'thin'}
}

//--------------need to work---------------//

let OverheadCostRatioValue = worksheet.getCell("J13");
OverheadCostRatioValue.value = null
OverheadCostRatioValue.border = {
  top: { style: 'dotted' },
  bottom: { style: 'dotted' },
  left: { style: 'dotted' },
  right: { style: 'thin' }
}
OverheadCostRatioValue.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};




//------------------Special_Costs_Block----------------------//
//Special_Costs_Lable//
let SpecialCosts= worksheet.getCell("K5");
SpecialCosts.value = "Special Costs(Total)"
SpecialCosts.font = { bold: true };
SpecialCosts.border = {
  top: { style: 'thin' },
  bottom: { style: 'dotted' },
  left: { style: 'thin' },
  right: { style: 'dotted' }
}
SpecialCosts.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd0d9ea" },
  bgColor: { argb: "" },
};

let SpecialCosts1= worksheet.getCell("K6");
SpecialCosts1.value = "Special Cost 1"
SpecialCosts1.border = {
  top: { style: 'dotted' },
  bottom: { style: 'dotted' },
  left: { style: 'thin' },
  right: { style: 'dotted' }
}
SpecialCosts1.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};

let SpecialCosts2= worksheet.getCell("K7");
SpecialCosts2.value = " Special Cost 2"
SpecialCosts2.border = {
  top: { style: 'dotted' },
  bottom: { style: 'dotted' },
  left: { style: 'thin' },
  right: { style: 'dotted' }
}
SpecialCosts2.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};

let SpecialCosts3= worksheet.getCell("K8");
SpecialCosts3.value = "Special Cost 3"
SpecialCosts3.border = {
  top: { style: 'dotted' },
  bottom: { style: 'dotted' },
  left: { style: 'thin' },
  right: { style: 'dotted' }
}
SpecialCosts3.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};

let SpecialCosts4= worksheet.getCell("K9");
SpecialCosts4.value = " Special Cost 4"
SpecialCosts4.border = {
  top: { style: 'dotted' },
  bottom: { style: 'dotted' },
  left: { style: 'thin' },
  right: { style: 'dotted' }
}
SpecialCosts4.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};

let SpecialCosts5= worksheet.getCell("K10");
SpecialCosts5.value = " Special Cost 5"
SpecialCosts5.border = {
  top: { style: 'dotted' },
  bottom: { style: 'dotted' },
  left: { style: 'thin' },
  right: { style: 'dotted' }
}
SpecialCosts5.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};


worksheet.getCell("K20").border ={
  //right :{style:'thin' },
  bottom : {style: 'thin'}
}
//Special_Costs_Value//

let SpecialCostsValue= worksheet.getCell("L5");
SpecialCostsValue.value = null
SpecialCostsValue.font = { bold: true };
SpecialCostsValue.border = {
  top: { style: 'thin' },
  bottom: { style: 'dotted' },
  left: { style: 'dotted' },
  right: { style: 'thin' }
}
SpecialCostsValue.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd0d9ea" },
  bgColor: { argb: "" },
};

var spCost1 = masterData[0].costAccessoriesList.find(x=>x.costCategoryGroup == "PROCESS" && x.categoryName == "SPECIAL COST 1");
var spCost2 = masterData[0].costAccessoriesList.find(x=>x.costCategoryGroup == "PROCESS" && x.categoryName == "SPECIAL COST 2");
var spCost3 = masterData[0].costAccessoriesList.find(x=>x.costCategoryGroup == "PROCESS" && x.categoryName == "SPECIAL COST 3");
var spCost4 = masterData[0].costAccessoriesList.find(x=>x.costCategoryGroup == "PROCESS" && x.categoryName == "SPECIAL COST 4");
var spCost5 = masterData[0].costAccessoriesList.find(x=>x.costCategoryGroup == "PROCESS" && x.categoryName == "SPECIAL COST 5");

let SpecialCosts1Value= worksheet.getCell("L6");
if(spCost1 != undefined){
  SpecialCosts1Value.value = spCost1.value;
}else{
  SpecialCosts1Value.value = null
}

SpecialCosts1Value.border = {
  top: { style: 'dotted' },
  bottom: { style: 'dotted' },
  left: { style: 'dotted' },
  right: { style: 'thin' }
}
SpecialCosts1Value.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};

let SpecialCosts2Value = worksheet.getCell("L7");

if(spCost2 != undefined){
  SpecialCosts2Value.value = spCost2.value;
}else{
  SpecialCosts2Value.value = null
}

SpecialCosts2Value.border = {
  top: { style: 'dotted' },
  bottom: { style: 'dotted' },
  left: { style: 'dotted' },
  right: { style: 'thin' }
}
SpecialCosts2Value.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};

let SpecialCosts3Value= worksheet.getCell("L8");
if(spCost3 != undefined){
  SpecialCosts3Value.value = spCost3.value;
}else{
  SpecialCosts3Value.value = null
}
SpecialCosts3Value.border = {
  top: { style: 'dotted' },
  bottom: { style: 'dotted' },
  left: { style: 'dotted' },
  right: { style: 'thin' }
}
SpecialCosts3Value.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};

let SpecialCosts4Value= worksheet.getCell("L9");
if(spCost4 != undefined){
  SpecialCosts4Value.value = spCost4.value;
}else{
  SpecialCosts4Value.value = null
}
SpecialCosts4Value.border = {
  top: { style: 'dotted' },
  bottom: { style: 'dotted' },
  left: { style: 'dotted' },
  right: { style: 'thin' }
}
SpecialCosts4Value.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};

let SpecialCosts5Value= worksheet.getCell("L10");
if(spCost5 != undefined){
  SpecialCosts5Value.value = spCost5.value;
}else{
  SpecialCosts5Value.value = null
}

SpecialCosts5Value.border = {
  top: { style: 'dotted' },
  bottom: { style: 'dotted' },
  left: { style: 'dotted' },
  right: { style: 'thin' }
}
SpecialCosts5Value.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};


worksheet.getCell("L15").border ={
  right :{style:'thin' }
}
worksheet.getCell("L16").border ={
  right :{style:'thin' }
}
worksheet.getCell("L17").border ={
  right :{style:'thin' }
}
worksheet.getCell("L18").border ={
  right :{style:'thin' }
}
worksheet.getCell("L19").border ={
  right :{style:'thin' }
}
worksheet.getCell("L20").border ={
  right :{style:'thin' },
  bottom : {style: 'thin'}
}

//--------------Fob Block----------------------------------//
// Fob Lable Block //
let QuotedFob= worksheet.getCell("M3");
QuotedFob.value = "Quoted FOB"
QuotedFob.font = { 
  bold: true ,
  size:18
};
QuotedFob.border = {
  top: { style: 'thin' },
  //bottom: { style: 'thin' },
  left: { style: 'thin' },
  //right: { style: 'thin' }
}
QuotedFob.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd0d9ea" },
  bgColor: { argb: "" },
};

//USD---Start//
let Usd= worksheet.getCell("O3");
Usd.value = "USD"
Usd.font = { 
  bold: true ,
  size:18
};
Usd.border = {
  top: { style: 'thin' },
  bottom: { style: 'thin' },
  //left: { style: 'thin' },
  right: { style: 'thin' }
}
//USD---End//
//---------Supplier Comments----------//

let suppclierComment11= worksheet.getCell("P3");
suppclierComment11.value = "Supplier Comments"
worksheet.mergeCells("P4:Q13")
let suppclierComment11Value= worksheet.getCell("P4");
suppclierComment11Value.value = "";
suppclierComment11Value.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};

//---------Supplier Comments----------//

let FobAdjustment = worksheet.getCell("M4");
FobAdjustment.value = "FOB Adjustment"
FobAdjustment.border = {
  // top: { style: 'thin' },
  bottom: { style: 'thin' },
  left: { style: 'thin' },
  // right: { style: 'thin' }
}
FobAdjustment.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};

let CalculatedFob= worksheet.getCell("M5");
CalculatedFob.value = "Calculated FOB"
CalculatedFob.font = { bold: true };
CalculatedFob.border = {
  top: { style: 'thin' },
  //bottom: { style: 'thin' },
  left: { style: 'thin' },
  //right: { style: 'thin' }
}
CalculatedFob.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd0d9ea" },
  bgColor: { argb: "" },
};

let BomLo = worksheet.getCell("M6");
BomLo.value = "BOM + LO"
BomLo.font = { bold: true };
BomLo.border = {
  //top: { style: 'thin' },
  //bottom: { style: 'thin' },
  left: { style: 'thin' },
  //right: { style: 'thin' }
}
BomLo.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd0d9ea" },
  bgColor: { argb: "" },
};

let FactoryProfit	= worksheet.getCell("M7");
FactoryProfit.value = "Factory Profit"
FactoryProfit.border = {
  //top: { style: 'thin' },
 // bottom: { style: 'thin' },
  left: { style: 'thin' },
  //right: { style: 'thin' }
}
FactoryProfit.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd0d9ea" },
  bgColor: { argb: "" },
};

let ProductTestingCost = worksheet.getCell("M8");
ProductTestingCost.value = "Product Testing Cost"
ProductTestingCost.border = {
  // top: { style: 'thin' },
  // bottom: { style: 'thin' },
  left: { style: 'thin' },
  // right: { style: 'thin' }
}
ProductTestingCost.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};


let FreightToPort	= worksheet.getCell("M9");
FreightToPort.value = "Freight to Port"
FreightToPort.border = {
  //top: { style: 'thin' },
  bottom: { style: 'thin' },
  left: { style: 'thin' },
  //right: { style: 'thin' }
}
FreightToPort.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};

let LeadTime = worksheet.getCell("M10");
LeadTime.value = "Lead Time (PO To Ship)"
LeadTime.border = {
  top: { style: 'thin' },
  //bottom: { style: 'thin' },
  left: { style: 'thin' },
  //right: { style: 'thin' }
}
LeadTime.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};

let StyleMinimum	= worksheet.getCell("M11");
StyleMinimum.value = "Style Minimum"
StyleMinimum.border = {
  // top: { style: 'thin' },
  // bottom: { style: 'thin' },
  left: { style: 'thin' },
  // right: { style: 'thin' }
}
StyleMinimum.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};

let ColorMinimum	= worksheet.getCell("M12");
ColorMinimum.value = "Color Minimum"
ColorMinimum.border = {
  // top: { style: 'thin' },
  // bottom: { style: 'thin' },
  left: { style: 'thin' },
  // right: { style: 'thin' }
}
ColorMinimum.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};

let AddedItems	= worksheet.getCell("M13");
AddedItems.value = "Added Items"
AddedItems.border = {
  // top: { style: 'thin' },
  // bottom: { style: 'thin' },
  left: { style: 'thin' },
  // right: { style: 'thin' }
}
AddedItems.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd0d9ea" },
  bgColor: { argb: "" },
};

let MetalFinishing	= worksheet.getCell("M14");
MetalFinishing.value = "Metal Finishing"
MetalFinishing.border = {
  // top: { style: 'thin' },
  // bottom: { style: 'thin' },
  left: { style: 'thin' },
  //right: { style: 'thin' }
}
MetalFinishing.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};


worksheet.getCell("M20").border ={
  bottom :{style:'thin' }
}

//Fob Value Block//

let QuotedFobValue= worksheet.getCell("N3");
QuotedFobValue.value = null
QuotedFobValue.font = { 
  bold: true ,
  size: 18,
};
QuotedFobValue.border = {
  top: { style: 'thin' },
  //bottom: { style: 'thin' },
  //left: { style: 'thin' },
  right: { style: 'thin' }
}
QuotedFobValue.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd0d9ea" },
  bgColor: { argb: "" },
};

let FobAdjustmentValue = worksheet.getCell("N4");
FobAdjustmentValue.value = null
FobAdjustmentValue.border = {
  // top: { style: 'thin' },
  // bottom: { style: 'thin' },
  // left: { style: 'thin' },
   right: { style: 'thin' }
}
FobAdjustmentValue.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};

let CalculatedFobValue= worksheet.getCell("N5");
CalculatedFobValue.value = null
CalculatedFobValue.font = { bold: true };
CalculatedFobValue.border = {
  top: { style: 'thin' },
  // bottom: { style: 'thin' },
  // left: { style: 'thin' },
  right: { style: 'thin' }
}
CalculatedFobValue.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd0d9ea" },
  bgColor: { argb: "" },
};

let BomLoValue = worksheet.getCell("N6");
BomLoValue.value = ""
BomLoValue.font = { bold: true };
BomLoValue.border = {
  // top: { style: 'thin' },
  // bottom: { style: 'thin' },
  // left: { style: 'thin' },
  right: { style: 'thin' }
}
BomLoValue.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd0d9ea" },
  bgColor: { argb: "" },
};

let FactoryProfitValue	= worksheet.getCell("N7");
FactoryProfitValue.value = null
FactoryProfitValue.border = {
  // top: { style: 'thin' },
  // bottom: { style: 'thin' },
  // left: { style: 'thin' },
  right: { style: 'thin' }
}
FactoryProfitValue.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd0d9ea" },
  bgColor: { argb: "" },
};

debugger
var testCost = masterData[0].costAccessoriesList.find(x=>x.costCategoryGroup == "PROCESS" && x.categoryName == "TEST CHARGE");
let ProductTestingCostValue = worksheet.getCell("N8");
if(testCost != undefined){
  ProductTestingCostValue.value = testCost.value;
}

ProductTestingCostValue.border = {
  // top: { style: 'thin' },
  // bottom: { style: 'thin' },
  // left: { style: 'thin' },
  right: { style: 'thin' }
}
ProductTestingCostValue.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};


var poetCost1 = masterData[0].costAccessoriesList.find(x=>x.costCategoryGroup == "PROCESS" && x.categoryName.toUpperCase() == "PORT COST");

let FreightToPortValue	= worksheet.getCell("N9");

if(poetCost1 != undefined){
  FreightToPortValue.value = poetCost1.value;
}else{
  FreightToPortValue.value = null
}

FreightToPortValue.border = {
  //top: { style: 'thin' },
  bottom: { style: 'thin' },
  //left: { style: 'thin' },
  right: { style: 'thin' }
}
FreightToPortValue.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};

let LeadTimeValue = worksheet.getCell("N10");
LeadTimeValue.value = 0
LeadTimeValue.border = {
  // top: { style: 'thin' },
  // bottom: { style: 'thin' },
  // left: { style: 'thin' },
  right: { style: 'thin' }
}
LeadTimeValue.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};

let StyleMinimumValue	= worksheet.getCell("N11");
StyleMinimumValue.value = masterData[0].moq
StyleMinimumValue.border = {
  // top: { style: 'thin' },
  // bottom: { style: 'thin' },
  // left: { style: 'thin' },
  right: { style: 'thin' }
}
StyleMinimumValue.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};

let ColorMinimumValue	= worksheet.getCell("N12");
ColorMinimumValue.value = masterData[0].mcq
ColorMinimumValue.border = {
  // top: { style: 'thin' },
  // bottom: { style: 'thin' },
  // left: { style: 'thin' },
  right: { style: 'thin' }
}
ColorMinimumValue.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};

let AddedItemsValue	= worksheet.getCell("N13");
AddedItemsValue.value = 0
AddedItemsValue.border = {
  // top: { style: 'thin' },
  // bottom: { style: 'thin' },
  // left: { style: 'thin' },
  right: { style: 'thin' }
}
AddedItemsValue.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd0d9ea" },
  bgColor: { argb: "" },
};

let MetalFinishingValue	= worksheet.getCell("N14");
MetalFinishingValue.value = ""
MetalFinishingValue.border = {
  //top: { style: 'thin' },
  //bottom: { style: 'thin' },
  //left: { style: 'thin' },
  right: { style: 'thin' }
}
MetalFinishingValue.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};


let profitPerValue	= worksheet.getCell("O7");
profitPerValue.value = masterData[0].surPlusPercentage/100
profitPerValue.numFmt = '0.00%'
profitPerValue.border = {
  top: { style: 'thin' },
  bottom: { style: 'thin' },
  left: { style: 'thin' },
  right: { style: 'thin' }
}
profitPerValue.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "ffd1e4bb" },
  bgColor: { argb: "" },
};



worksheet.getCell("N15").border ={
  right :{style:'thin' }
}
worksheet.getCell("N16").border ={
  right :{style:'thin' }
}
worksheet.getCell("N17").border ={
  right :{style:'thin' }
}
worksheet.getCell("N18").border ={
  right :{style:'thin' }
}
worksheet.getCell("N19").border ={
  right :{style:'thin' }
}
worksheet.getCell("N20").border ={
  right :{style:'thin' },
  bottom : {style: 'thin'}
}


worksheet.getCell("O4").border ={
  right :{style:'thin' }
}
worksheet.getCell("O5").border ={
  right :{style:'thin' }
}
worksheet.getCell("O6").border ={
  right :{style:'thin' }
}
worksheet.getCell("O8").border ={
  right :{style:'thin' }
}
worksheet.getCell("O9").border ={
  right :{style:'thin' }
}
worksheet.getCell("O10").border ={
  right :{style:'thin' }
}
worksheet.getCell("O11").border ={
  right :{style:'thin' }
}
worksheet.getCell("O12").border ={
  right :{style:'thin' }
}
worksheet.getCell("O13").border ={
  right :{style:'thin' }
}
worksheet.getCell("O14").border ={
  right :{style:'thin' }
}
worksheet.getCell("O15").border ={
  right :{style:'thin' }
}
worksheet.getCell("O16").border ={
  right :{style:'thin' }
}
worksheet.getCell("O17").border ={
  right :{style:'thin' }
}
worksheet.getCell("O18").border ={
  right :{style:'thin' }
}
worksheet.getCell("O19").border ={
  right :{style:'thin' }
}
worksheet.getCell("O20").border ={
  right :{style:'thin' },
  bottom: {style: 'thin'}
}


  //add Image Title
   debugger
    //var url = environment.fileUrl + data2.filePath;

    // if (masterData[0].filePath != null) {
    //   //var image = await this.imageUrlToBase64(url);

    //   let myLogoImage = workbook.addImage({
    //     base64: masterData[0].imageUrlToBase64,
    //     extension: 'png',
    //   });

    //   //worksheet.mergeCells("A5:C11");
    //   worksheet.addImage(myLogoImage, 'A5:C11');
    // }


    if (masterData[0].fileStatus == "Y") {
      debugger
      var url = environment.fileUrl + masterData[0].filePath;
      let myLogoImage = workbook.addImage({
        base64: masterData[0].imageBase64,
        extension: 'jpeg',
      });
        worksheet.addImage(myLogoImage, 'A5:B11');
    }

    
    //Blank Row
    worksheet.addRow([]);

    //Add Header Row
    let headerRow = worksheet.addRow(NewHeader);
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ff1a3c76" },
        bgColor: { argb: "" },
      };
      cell.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });


    var  rowCountDetails1 = 0
    var detailsFastRow1 =  rowCountDetails1 + 22 + 1;
    var detailsLastRow1 = 0

    for (var itemDetails1 of data) {
      var costrowDetailOne =  rowCountDetails1 + 22 + 1;
      let detailRowOne1 = "A" + costrowDetailOne;// row.getCell(1).address;
      worksheet.getCell(detailRowOne1).value = itemDetails1[0];
      worksheet.getCell(detailRowOne1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        //right: { style: 'thin' }
      }

      let detailRowOne2 = "B" + costrowDetailOne;//  row.getCell(2).address;
      worksheet.getCell(detailRowOne2).value = itemDetails1[1];
      worksheet.getCell(detailRowOne2).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
       // left: { style: 'thin' },
       // right: { style: 'thin' }
      }

      let detailRowOne3 = "C" + costrowDetailOne;// row.getCell(3).address;
      worksheet.getCell(detailRowOne3).value = itemDetails1[2];
      worksheet.getCell(detailRowOne3).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
       // left: { style: 'thin' },
       // right: { style: 'thin' }
      }

      let detailRowOne4 = "D" + costrowDetailOne; //row.getCell(4).address;
      worksheet.getCell(detailRowOne4).value = itemDetails1[3];
      worksheet.getCell(detailRowOne4).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        //left: { style: 'thin' },
        //right: { style: 'thin' }
      }

      let detailRowOne5 = "E" + costrowDetailOne; //row.getCell(5).address;
      worksheet.getCell(detailRowOne5).value = itemDetails1[4];
      worksheet.getCell(detailRowOne5).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
       // left: { style: 'thin' },
        //right: { style: 'thin' }
      }

      let detailRowOne6 = "F" + costrowDetailOne; //row.getCell(5).address;
      worksheet.getCell(detailRowOne6).value = itemDetails1[5];
      worksheet.getCell(detailRowOne6).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        //left: { style: 'thin' },
        //right: { style: 'thin' }
      }

      let detailRowOne7 = "G" + costrowDetailOne; //row.getCell(5).address;
      //worksheet.getCell(detailRowOne7).value = itemDetails1[6];
      worksheet.getCell(detailRowOne7).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
       // left: { style: 'thin' },
       // right: { style: 'thin' }
      }
      worksheet.getCell(detailRowOne7).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffd0d9ea" },
        bgColor: { argb: "" },
      };

       //var total = ;
      
      worksheet.getCell(detailRowOne7).value = {
        formula: `(J${costrowDetailOne}+(J${costrowDetailOne}*O${costrowDetailOne}))*((L${costrowDetailOne} + M${costrowDetailOne})+(L${costrowDetailOne}*N${costrowDetailOne}))`,
        date1904: false
      }

      let detailRowOne8 = "H" + costrowDetailOne; //row.getCell(5).address;
      worksheet.getCell(detailRowOne8).value = itemDetails1[7];
      worksheet.getCell(detailRowOne8).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
       // left: { style: 'thin' },
        //right: { style: 'thin' }
      }

      let detailRowOne9 = "I" + costrowDetailOne; //row.getCell(5).address;
      worksheet.getCell(detailRowOne9).value = itemDetails1[8];
      worksheet.getCell(detailRowOne9).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        //left: { style: 'thin' },
        //right: { style: 'thin' }
      }
      //   worksheet.getCell(detailRowOne9).alignment = { vertical: "middle", horizontal: "center" };


      let detailRowOne10 = "J" + costrowDetailOne; //row.getCell(5).address;
      worksheet.getCell(detailRowOne10).value = itemDetails1[9];
      worksheet.getCell(detailRowOne10).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
       // left: { style: 'thin' },
       // right: { style: 'thin' }
      }
      worksheet.getCell(detailRowOne10).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffd1e4bb" },
        bgColor: { argb: "" },
      };

      //   worksheet.getCell(detailRowOne10).alignment = { vertical: "middle", horizontal: "center" };

      let detailRowOne11 = "K" + costrowDetailOne; //row.getCell(5).address;
      worksheet.getCell(detailRowOne11).value = itemDetails1[10];
      worksheet.getCell(detailRowOne11).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        //left: { style: 'thin' },
        //right: { style: 'thin' }
      }


      let detailRowOne12 = "L" + costrowDetailOne; //row.getCell(5).address;
      worksheet.getCell(detailRowOne12).value = itemDetails1[11];
      worksheet.getCell(detailRowOne12).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        //left: { style: 'thin' },
       // right: { style: 'thin' }
      }
      worksheet.getCell(detailRowOne12).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffd1e4bb" },
        bgColor: { argb: "" },
      };

      let detailRowOne13 = "M" + costrowDetailOne; //row.getCell(5).address;
      worksheet.getCell(detailRowOne13).value = itemDetails1[12];
      worksheet.getCell(detailRowOne13).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        //left: { style: 'thin' },
       // right: { style: 'thin' }
      }
      worksheet.getCell(detailRowOne13).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffd1e4bb" },
        bgColor: { argb: "" },
      };

      let detailRowOne14 = "N" + costrowDetailOne; //row.getCell(5).address;
      worksheet.getCell(detailRowOne14).value = itemDetails1[13];
      worksheet.getCell(detailRowOne14).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
       // left: { style: 'thin' },
       // right: { style: 'thin' }
      }
      worksheet.getCell(detailRowOne14).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffd1e4bb" },
        bgColor: { argb: "" },
      };



      let detailRowOne15 = "O" + costrowDetailOne; //row.getCell(5).address;
      worksheet.getCell(detailRowOne15).value = itemDetails1[14]/100;
      worksheet.getCell(detailRowOne15).numFmt ='0%'
      worksheet.getCell(detailRowOne15).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        //left: { style: 'thin' },
       // right: { style: 'thin' }
      }
      worksheet.getCell(detailRowOne15).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffd1e4bb" },
        bgColor: { argb: "" },
      };

      let detailRowOne16 = "P" + costrowDetailOne; //row.getCell(5).address;
      worksheet.getCell(detailRowOne16).value = itemDetails1[15];
      worksheet.getCell(detailRowOne16).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        //left: { style: 'thin' },
       // right: { style: 'thin' }
      }


      let detailRowOne17 = "Q" + costrowDetailOne; //row.getCell(5).address;
      worksheet.getCell(detailRowOne17).value = itemDetails1[16];
      worksheet.getCell(detailRowOne17).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
       // left: { style: 'thin' },
       // right: { style: 'thin' }
      }

      let detailRowOne18 = "R" + costrowDetailOne; //row.getCell(5).address;
      worksheet.getCell(detailRowOne18).value = itemDetails1[17];
      worksheet.getCell(detailRowOne18).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        //left: { style: 'thin' },
       // right: { style: 'thin' }
      }

      let detailRowOne19 = "S" + costrowDetailOne; //row.getCell(5).address;
      worksheet.getCell(detailRowOne19).value = itemDetails1[18];
      worksheet.getCell(detailRowOne19).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
       // left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(detailRowOne19).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffd1e4bb" },
        bgColor: { argb: "" },
      };

      let detailRowOne20 = "T" + costrowDetailOne; //row.getCell(5).address;
      worksheet.getCell(detailRowOne20).value = itemDetails1[19];
      worksheet.getCell(detailRowOne20).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
       // left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(detailRowOne20).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffd1e4bb" },
        bgColor: { argb: "" },
      };
      


      detailsLastRow1 = costrowDetailOne;
      rowCountDetails1++
    }



    //Bom_Fomula Bloack
    fabricValue.value = {
      formula: `SUMIF(H${detailsFastRow1}:H${detailsLastRow1},UPPER(F8),G${detailsFastRow1}:G${detailsLastRow1})`,
      date1904: false
    }
    trimsValue.value = {
      formula: `SUMIF(H${detailsFastRow1}:H${detailsLastRow1},UPPER(F9),G${detailsFastRow1}:G${detailsLastRow1})`,
      date1904: false
    }
    lablesValue.value = {
      formula: `SUMIF(H${detailsFastRow1}:H${detailsLastRow1},UPPER(F10),G${detailsFastRow1}:G${detailsLastRow1})`,
      date1904: false
    }
    graphicValue.value = {
      formula: `SUMIF(H${detailsFastRow1}:H${detailsLastRow1},UPPER(F11),G${detailsFastRow1}:G${detailsLastRow1})`,
      date1904: false
    }
    totalMatrialValue.value = {
      formula: `SUM(G8:G11)`,
      date1904: false
    }
    financeValue.value ={
      formula: `${totalMatrialValue.address}*${H6_per.address}%`,
      date1904: false
    }
    bomCostValue.value ={
      formula: `${financeValue.address}+${totalMatrialValue.address}`,
      date1904: false
    }


    //--------Laber Cost Formula----------------//
    LaborCostValue.value = {
      formula: `((${smvValue.address}*${HourlyWageValue.address})/${AverageEfficiencyValue.address}%)/60`,
      date1904 : false
    }

    OverheadCostValue.value = {
      formula: `${LaborCostValue.address}*${OverheadCostRatioValue.address}%`,
      date1904 : false
    }

    LabaorOverhadecostValue.value = {
      formula: `SUM(${LaborCostValue.address}:${OverheadCostValue.address})`,
      date1904: false
    }

    //--------------------- Special Costs Farmula -------------------/
    SpecialCostsValue.value = {
      formula:`SUM(${SpecialCosts1Value.address}:${SpecialCosts5Value.address})`,
      date1904: false
    }

    //  Quoted Fob Formula //
    debugger
    BomLoValue.value = {
      formula: `${bomCostValue.address}+${LabaorOverhadecostValue.address} +${SpecialCostsValue.address}`,
      date1904: false
    }

    FactoryProfitValue.value = {
      formula: `${BomLoValue.address}*${profitPerValue.address}`,
      date1904: false
    }

    CalculatedFobValue.value = {

      formula: `${BomLoValue.address}+${FactoryProfitValue.address}+${ProductTestingCostValue.address}+${FreightToPortValue.address}`,
      date1904: false
    }

    QuotedFobValue.value ={
      formula: `${FobAdjustmentValue.address}+${CalculatedFobValue.address}`,
      date1904: false
    }

    worksheet.getCell('H5').value = {
      formula: `IF(N3=0,0,G5/N3)`,
      date1904: false
    }
    worksheet.getCell('H5').numFmt = '0%'
    worksheet.getCell('H6').numFmt = '0%'


    

    
    

///////////////////////-------------------------------- Part2 Start ---------------///////////////

//     if(masterData.length>1)
//     {
//       let part = worksheet.getCell("V2");
//       part.value = "Part Name";
  
//       let partValue = worksheet.getCell("W2");
//       partValue.value = masterData[1].partName;



//   //------ Bom_Value_Block2 ----------//
//     // Value_Block_Label2 //
//     let bomCost = worksheet.getCell("Y5");
//     bomCost.value = "BOM Costs"
//     bomCost.font = { bold: true };
//     bomCost.border = {
//       top: { style: 'thin' },
//       bottom: { style: 'thin' },
//       left: { style: 'thin' },
//       right: { style: 'thin' }
//     }
//     bomCost.fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "ffd0d9ea" },
//       bgColor: { argb: "" },
//     };

//     let finance = worksheet.getCell("Y6");
//     finance.value = "Finance"
//     finance.border = {
//       top: { style: 'thin' },
//       bottom: { style: 'thin' },
//       left: { style: 'thin' },
//       right: { style: 'thin' }
//     }
//     finance.fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "ffd0d9ea" },
//       bgColor: { argb: "" },
//     };

//     let totalMatrial = worksheet.getCell("Y7");
//     totalMatrial.value = "Total Material"
//     totalMatrial.font = { bold: true };
//     totalMatrial.border = {
//       top: { style: 'thin' },
//       bottom: { style: 'thin' },
//       left: { style: 'thin' },
//       right: { style: 'thin' }
//     }
//     totalMatrial.fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "ffd0d9ea" },
//       bgColor: { argb: "" },
//     };

//     let fabric = worksheet.getCell("Y8");
//     fabric.value = "Fabric"
//     fabric.border = {
//       top: { style: 'thin' },
//       bottom: { style: 'thin' },
//       left: { style: 'thin' },
//       right: { style: 'thin' }
//     }
//     fabric.fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "ffd0d9ea" },
//       bgColor: { argb: "" },
//     };

//     let trims = worksheet.getCell("Y9");
//     trims.value = "Trims"
//     trims.border = {
//       top: { style: 'thin' },
//       bottom: { style: 'thin' },
//       left: { style: 'thin' },
//       right: { style: 'thin' }
//     }
//     trims.fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "ffd0d9ea" },
//       bgColor: { argb: "" },
//     };

//     let lables = worksheet.getCell("Y10");
//     lables.value = "Labels"
//     lables.border = {
//       top: { style: 'thin' },
//       bottom: { style: 'thin' },
//       left: { style: 'thin' },
//       right: { style: 'thin' }
//     }
//     lables.fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "ffd0d9ea" },
//       bgColor: { argb: "" },
//     };

//     let graphic = worksheet.getCell("Y11");
//     graphic.value = "Graphic"
//     graphic.border = {
//       top: { style: 'thin' },
//       bottom: { style: 'thin' },
//       left: { style: 'thin' },
//       right: { style: 'thin' }
//     }
//     graphic.fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "ffd0d9ea" },
//       bgColor: { argb: "" },
//     };

//     // Value_Block_Value2 //
//     let bomCostValue = worksheet.getCell("Z5");
//     bomCostValue.value = ""
//     bomCostValue.font = { bold: true };
//     bomCostValue.border = {
//       top: { style: 'thin' },
//       bottom: { style: 'thin' },
//       left: { style: 'thin' },
//       right: { style: 'thin' }
//     }
//     bomCostValue.fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "ffd0d9ea" },
//       bgColor: { argb: "" },
//     };

//     let financeValue = worksheet.getCell("Z6");
//     financeValue.value = ""
//     financeValue.border = {
//       top: { style: 'thin' },
//       bottom: { style: 'thin' },
//       left: { style: 'thin' },
//       right: { style: 'thin' }
//     }
//     financeValue.fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "ffd0d9ea" },
//       bgColor: { argb: "" },
//     };

//     let totalMatrialValue = worksheet.getCell("Z7");
//     totalMatrialValue.value = ""
//     totalMatrialValue.font = { bold: true };
//     totalMatrialValue.border = {
//       top: { style: 'thin' },
//       bottom: { style: 'thin' },
//       left: { style: 'thin' },
//       right: { style: 'thin' }
//     }
//     totalMatrialValue.fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "ffd0d9ea" },
//       bgColor: { argb: "" },
//     };

//     let fabricValue = worksheet.getCell("Z8");
//     fabricValue.value = null
//     fabricValue.border = {
//       top: { style: 'thin' },
//       bottom: { style: 'thin' },
//       left: { style: 'thin' },
//       right: { style: 'thin' }
//     }
//     fabricValue.fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "ffd0d9ea" },
//       bgColor: { argb: "" },
//     };

//     let trimsValue = worksheet.getCell("Z9");
//     trimsValue.value = null
//     trimsValue.border = {
//       top: { style: 'thin' },
//       bottom: { style: 'thin' },
//       left: { style: 'thin' },
//       right: { style: 'thin' }
//     }
//     trimsValue.fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "ffd0d9ea" },
//       bgColor: { argb: "" },
//     };

//     let lablesValue = worksheet.getCell("Z10");
//     lablesValue.value = null
//     lablesValue.border = {
//       top: { style: 'thin' },
//       bottom: { style: 'thin' },
//       left: { style: 'thin' },
//       right: { style: 'thin' }
//     }
//     lablesValue.fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "ffd0d9ea" },
//       bgColor: { argb: "" },
//     };

//     let graphicValue = worksheet.getCell("Z11");
//     graphicValue.value = null
//     graphicValue.border = {
//       top: { style: 'thin' },
//       bottom: { style: 'thin' },
//       left: { style: 'thin' },
//       right: { style: 'thin' }
//     }
//     graphicValue.fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "ffd0d9ea" },
//       bgColor: { argb: "" },
//     };



// ///---------------CM_Cost_Block2--------------------///

// // CM_Cost_Lable //
// let LabaorOverhadecost = worksheet.getCell("AB5");
// LabaorOverhadecost.value = "Labor & Overhead (LO) Costs"
// LabaorOverhadecost.font = { bold: true };
// LabaorOverhadecost.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }
// LabaorOverhadecost.fill = {
//   type: "pattern",
//   pattern: "solid",
//   fgColor: { argb: "ffd0d9ea" },
//   bgColor: { argb: "" },
// };

// let LaborCost = worksheet.getCell("AB6");
// LaborCost.value = "Direct Labor Cost (Cut to Pack)"
// LaborCost.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }
// LaborCost.fill = {
//   type: "pattern",
//   pattern: "solid",
//   fgColor: { argb: "ffd0d9ea" },
//   bgColor: { argb: "" },
// };

// let OverheadCost = worksheet.getCell("AB7");
// OverheadCost.value = "Overhead Cost"
// OverheadCost.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }
// OverheadCost.fill = {
//   type: "pattern",
//   pattern: "solid",
//   fgColor: { argb: "ffd0d9ea" },
//   bgColor: { argb: "" },
// };

// let smv = worksheet.getCell("AB9");
// smv.value = "Standard Minute Value	"
// smv.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }

// let AverageEfficiency = worksheet.getCell("AB10");
// AverageEfficiency.value = "Average Efficiency %"
// AverageEfficiency.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }

// let HourlyWage = worksheet.getCell("AB11");
// HourlyWage.value = "Hourly Wage with Fringes"
// HourlyWage.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }

// let OverheadCostRatio = worksheet.getCell("AB13");
// OverheadCostRatio.value = "Overhead Cost Ratio to Direct Labor"
// OverheadCostRatio.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }

// // CM_Cost_Value //
// let LabaorOverhadecostValue = worksheet.getCell("AC5");
// LabaorOverhadecostValue.value = null
// LabaorOverhadecostValue.font = { bold: true };
// LabaorOverhadecostValue.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }
// LabaorOverhadecostValue.fill = {
//   type: "pattern",
//   pattern: "solid",
//   fgColor: { argb: "ffd0d9ea" },
//   bgColor: { argb: "" },
// };

// let LaborCostValue = worksheet.getCell("AC6");
// // LaborCostValue.value = ""
// LaborCostValue.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }
// LaborCostValue.fill = {
//   type: "pattern",
//   pattern: "solid",
//   fgColor: { argb: "ffd0d9ea" },
//   bgColor: { argb: "" },
// };

// let OverheadCostValue = worksheet.getCell("AC7");
// OverheadCostValue.value = ""
// OverheadCostValue.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }
// OverheadCostValue.fill = {
//   type: "pattern",
//   pattern: "solid",
//   fgColor: { argb: "ffd0d9ea" },
//   bgColor: { argb: "" },
// };

// let smvValue = worksheet.getCell("AC9");
// smvValue.value = masterData[1].smv
// smvValue.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }

// let AverageEfficiencyValue = worksheet.getCell("AC10");
// AverageEfficiencyValue.value =  masterData[1].efficency
// AverageEfficiencyValue.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }

// let HourlyWageValue = worksheet.getCell("AC11");
// HourlyWageValue.value =  null 
// HourlyWageValue.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }

// let OverheadCostRatioValue = worksheet.getCell("AC13");
// OverheadCostRatioValue.value = null
// OverheadCostRatioValue.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }



// //------------------Special_Costs_Block2----------------------//
// //Special_Costs_Lable//
// let SpecialCosts= worksheet.getCell("AD5");
// SpecialCosts.value = "Special Costs(Total)"
// SpecialCosts.font = { bold: true };
// SpecialCosts.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }
// SpecialCosts.fill = {
//   type: "pattern",
//   pattern: "solid",
//   fgColor: { argb: "ffd0d9ea" },
//   bgColor: { argb: "" },
// };

// let SpecialCosts1= worksheet.getCell("AD6");
// SpecialCosts1.value = "Special Cost 1"
// SpecialCosts1.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }

// let SpecialCosts2= worksheet.getCell("AD7");
// SpecialCosts2.value = " Special Cost 2"
// SpecialCosts2.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }

// let SpecialCosts3= worksheet.getCell("AD8");
// SpecialCosts3.value = "Special Cost 3"
// SpecialCosts3.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }

// let SpecialCosts4= worksheet.getCell("AD9");
// SpecialCosts4.value = " Special Cost 4"
// SpecialCosts4.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }

// let SpecialCosts5= worksheet.getCell("AD10");
// SpecialCosts5.value = " Special Cost 5"
// SpecialCosts5.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }

// //Special_Costs_Value//

// let SpecialCostsValue= worksheet.getCell("AE5");

// SpecialCostsValue.font = { bold: true };
// SpecialCostsValue.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }
// SpecialCostsValue.fill = {
//   type: "pattern",
//   pattern: "solid",
//   fgColor: { argb: "ffd0d9ea" },
//   bgColor: { argb: "" },
// };

// let SpecialCosts1Value= worksheet.getCell("AE6");
// SpecialCosts1Value.value = ""
// SpecialCosts1Value.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }

// let SpecialCosts2Value = worksheet.getCell("AE7");
// SpecialCosts2Value.value = ""
// SpecialCosts2Value.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }

// let SpecialCosts3Value= worksheet.getCell("AE8");
// SpecialCosts3Value.value = ""
// SpecialCosts3Value.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }

// let SpecialCosts4Value= worksheet.getCell("AE9");
// SpecialCosts4Value.value = ""
// SpecialCosts4Value.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }

// let SpecialCosts5Value= worksheet.getCell("AE10");
// SpecialCosts5Value.value = ""
// SpecialCosts5Value.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }



// //--------------Fob Block2----------------------------------//
// // Fob Lable Block //
// let QuotedFob= worksheet.getCell("AF3");
// QuotedFob.value = "Quoted FOB"
// QuotedFob.font = { 
//   bold: true ,
//   size:18
// };
// QuotedFob.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }
// QuotedFob.fill = {
//   type: "pattern",
//   pattern: "solid",
//   fgColor: { argb: "ffd0d9ea" },
//   bgColor: { argb: "" },
// };

// let FobAdjustment = worksheet.getCell("AF4");
// FobAdjustment.value = "FOB Adjustment"
// FobAdjustment.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }

// let CalculatedFob= worksheet.getCell("AF5");
// CalculatedFob.value = "Calculated FOB"
// CalculatedFob.font = { bold: true };
// CalculatedFob.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }
// CalculatedFob.fill = {
//   type: "pattern",
//   pattern: "solid",
//   fgColor: { argb: "ffd0d9ea" },
//   bgColor: { argb: "" },
// };

// let BomLo = worksheet.getCell("AF6");
// BomLo.value = "BOM + LO"
// BomLo.font = { bold: true };
// BomLo.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }
// BomLo.fill = {
//   type: "pattern",
//   pattern: "solid",
//   fgColor: { argb: "ffd0d9ea" },
//   bgColor: { argb: "" },
// };

// let FactoryProfit	= worksheet.getCell("AF7");
// FactoryProfit.value = "Factory Profit"
// FactoryProfit.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }
// FactoryProfit.fill = {
//   type: "pattern",
//   pattern: "solid",
//   fgColor: { argb: "ffd0d9ea" },
//   bgColor: { argb: "" },
// };

// let ProductTestingCost = worksheet.getCell("AF8");
// ProductTestingCost.value = "Product Testing Cost"
// ProductTestingCost.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }


// let FreightToPort	= worksheet.getCell("AF9");
// FreightToPort.value = "Freight to Port"
// FreightToPort.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }

// let LeadTime = worksheet.getCell("AF10");
// LeadTime.value = "Lead Time (PO To Ship)"
// LeadTime.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }

// let StyleMinimum	= worksheet.getCell("AF11");
// StyleMinimum.value = "Style Minimum"
// StyleMinimum.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }

// let ColorMinimum	= worksheet.getCell("AF12");
// ColorMinimum.value = "Color Minimum"
// ColorMinimum.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }

// let AddedItems	= worksheet.getCell("AF13");
// AddedItems.value = "Added Items"
// AddedItems.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }
// AddedItems.fill = {
//   type: "pattern",
//   pattern: "solid",
//   fgColor: { argb: "ffd0d9ea" },
//   bgColor: { argb: "" },
// };

// let MetalFinishing	= worksheet.getCell("AF14");
// MetalFinishing.value = "Metal Finishing"
// MetalFinishing.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }


// //Fob Value Block//

// let QuotedFobValue= worksheet.getCell("AG3");
// QuotedFobValue.value = null
// QuotedFobValue.font = { 
//   bold: true ,
//   size: 18,
// };
// QuotedFobValue.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }
// QuotedFobValue.fill = {
//   type: "pattern",
//   pattern: "solid",
//   fgColor: { argb: "ffd0d9ea" },
//   bgColor: { argb: "" },
// };

// let FobAdjustmentValue = worksheet.getCell("AG4");
// FobAdjustmentValue.value = null
// FobAdjustmentValue.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }

// let CalculatedFobValue= worksheet.getCell("AG5");
// CalculatedFobValue.value = null
// CalculatedFobValue.font = { bold: true };
// CalculatedFobValue.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }
// CalculatedFobValue.fill = {
//   type: "pattern",
//   pattern: "solid",
//   fgColor: { argb: "ffd0d9ea" },
//   bgColor: { argb: "" },
// };

// let BomLoValue = worksheet.getCell("AG6");
// BomLoValue.value = null
// BomLoValue.font = { bold: true };
// BomLoValue.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }
// BomLoValue.fill = {
//   type: "pattern",
//   pattern: "solid",
//   fgColor: { argb: "ffd0d9ea" },
//   bgColor: { argb: "" },
// };

// let FactoryProfitValue	= worksheet.getCell("AG7");
// FactoryProfitValue.value = null
// FactoryProfitValue.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }
// FactoryProfitValue.fill = {
//   type: "pattern",
//   pattern: "solid",
//   fgColor: { argb: "ffd0d9ea" },
//   bgColor: { argb: "" },
// };
// debugger
// var testCost = masterData[1].costAccessoriesList.find(x=>x.costCategoryGroup == "PROCESS" && x.categoryName == "TEST CHARGE");
// let ProductTestingCostValue = worksheet.getCell("AG8");
// if(testCost != undefined){
//   ProductTestingCostValue.value = testCost.value ;
// }
// ProductTestingCostValue.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }


// let FreightToPortValue	= worksheet.getCell("AG9");
// FreightToPortValue.value = null
// FreightToPortValue.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }

// let LeadTimeValue = worksheet.getCell("AG10");
// LeadTimeValue.value = 0
// LeadTimeValue.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }

// let StyleMinimumValue	= worksheet.getCell("AG11");
// StyleMinimumValue.value = masterData[1].moq
// StyleMinimumValue.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }

// let ColorMinimumValue	= worksheet.getCell("AG12");
// ColorMinimumValue.value = masterData[1].mcq
// ColorMinimumValue.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }

// let AddedItemsValue	= worksheet.getCell("AG13");
// AddedItemsValue.value = 0
// AddedItemsValue.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }
// AddedItemsValue.fill = {
//   type: "pattern",
//   pattern: "solid",
//   fgColor: { argb: "ffd0d9ea" },
//   bgColor: { argb: "" },
// };

// let MetalFinishingValue	= worksheet.getCell("AG14");
// MetalFinishingValue.value = ""
// MetalFinishingValue.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }

// let profitPerValue	= worksheet.getCell("AH7");
// profitPerValue.value = masterData[1].surPlusPercentage
// profitPerValue.border = {
//   top: { style: 'thin' },
//   bottom: { style: 'thin' },
//   left: { style: 'thin' },
//   right: { style: 'thin' }
// }


// //------------------- Details Header-------------------------------///

// let detailTwo1 = worksheet.getCell("V" + 22);
// detailTwo1.value = "Sort";
// detailTwo1.fill = {
//     type: "pattern",
//     pattern: "solid",
//     fgColor: { argb: "ff1a3c76" },
//     bgColor: { argb: "" },
// };
// detailTwo1.font = {
//   bold: true,
//   color: { argb: "FFFFFF" },
//   size: 12,
// };


// let detailTwo2 = worksheet.getCell("W" + 22);
// detailTwo2.value = "Supplier Article";
// detailTwo2.fill = {
//     type: "pattern",
//     pattern: "solid",
//     fgColor: { argb: "ff1a3c76" },
//     bgColor: { argb: "" },
// };
// detailTwo2.font = {
//   bold: true,
//   color: { argb: "FFFFFF" },
//   size: 12,
// };

// let detailTwo3 = worksheet.getCell("X" + 22);
// detailTwo3.value = "Material Code";
// detailTwo3.fill = {
//     type: "pattern",
//     pattern: "solid",
//     fgColor: { argb: "ff1a3c76" },
//     bgColor: { argb: "" },
// };
// detailTwo3.font = {
//   bold: true,
//   color: { argb: "FFFFFF" },
//   size: 12,
// };


// let detailTwo4 = worksheet.getCell("Y" + 22);
// detailTwo4.value = "Location";
// detailTwo4.fill = {
//     type: "pattern",
//     pattern: "solid",
//     fgColor: { argb: "ff1a3c76" },
//     bgColor: { argb: "" },
// };
// detailTwo4.font = {
//   bold: true,
//   color: { argb: "FFFFFF" },
//   size: 12,
// };


// let detailTwo5 = worksheet.getCell("Z" + 22);
// detailTwo5.value = "Description";
// detailTwo5.fill = {
//     type: "pattern",
//     pattern: "solid",
//     fgColor: { argb: "ff1a3c76" },
//     bgColor: { argb: "" },
// };
// detailTwo5.font = {
//   bold: true,
//   color: { argb: "FFFFFF" },
//   size: 12,
// };


// let detailTwo6 = worksheet.getCell("AA" + 22);
// detailTwo6.value = "Placement";
// detailTwo6.fill = {
//     type: "pattern",
//     pattern: "solid",
//     fgColor: { argb: "ff1a3c76" },
//     bgColor: { argb: "" },
// };
// detailTwo6.font = {
//   bold: true,
//   color: { argb: "FFFFFF" },
//   size: 12,
// };
// let detailTwo7 = worksheet.getCell("AB" + 22);
// detailTwo7.value = "Total";
// detailTwo7.fill = {
//     type: "pattern",
//     pattern: "solid",
//     fgColor: { argb: "ff1a3c76" },
//     bgColor: { argb: "" },
// };
// detailTwo7.font = {
//   bold: true,
//   color: { argb: "FFFFFF" },
//   size: 12,
// };


// let detailTwo8 = worksheet.getCell("AC" + 22);
// detailTwo8.value = "Roll Up";
// detailTwo8.fill = {
//     type: "pattern",
//     pattern: "solid",
//     fgColor: { argb: "ff1a3c76" },
//     bgColor: { argb: "" },
// };
// detailTwo8.font = {
//   bold: true,
//   color: { argb: "FFFFFF" },
//   size: 12,
// };

// let detailTwo9 = worksheet.getCell("AD" + 22);
// detailTwo9.value = "Size";
// detailTwo9.fill = {
//     type: "pattern",
//     pattern: "solid",
//     fgColor: { argb: "ff1a3c76" },
//     bgColor: { argb: "" },
// };
// detailTwo9.font = {
//   bold: true,
//   color: { argb: "FFFFFF" },
//   size: 12,
// };


// let detailTwo10 = worksheet.getCell("AE" + 22);
// detailTwo10.value = "YieId";
// detailTwo10.fill = {
//     type: "pattern",
//     pattern: "solid",
//     fgColor: { argb: "ff1a3c76" },
//     bgColor: { argb: "" },
// };
// detailTwo10.font = {
//   bold: true,
//   color: { argb: "FFFFFF" },
//   size: 12,
// };

// let detailTwo11 = worksheet.getCell("AF" + 22);
// detailTwo11.value = "UOM";
// detailTwo11.fill = {
//     type: "pattern",
//     pattern: "solid",
//     fgColor: { argb: "ff1a3c76" },
//     bgColor: { argb: "" },
// };
// detailTwo11.font = {
//   bold: true,
//   color: { argb: "FFFFFF" },
//   size: 12,
// };


// let detailTwo12 = worksheet.getCell("AG" + 22);
// detailTwo12.value = "Price";
// detailTwo12.fill = {
//     type: "pattern",
//     pattern: "solid",
//     fgColor: { argb: "ff1a3c76" },
//     bgColor: { argb: "" },
// };
// detailTwo12.font = {
//   bold: true,
//   color: { argb: "FFFFFF" },
//   size: 12,
// };

// let detailTwo13 = worksheet.getCell("AH" + 22);
// detailTwo13.value = "Freight";
// detailTwo13.fill = {
//     type: "pattern",
//     pattern: "solid",
//     fgColor: { argb: "ff1a3c76" },
//     bgColor: { argb: "" },
// };
// detailTwo13.font = {
//   bold: true,
//   color: { argb: "FFFFFF" },
//   size: 12,
// };


// let detailTwo14 = worksheet.getCell("AI" + 22);
// detailTwo14.value = "Duty";
// detailTwo14.fill = {
//     type: "pattern",
//     pattern: "solid",
//     fgColor: { argb: "ff1a3c76" },
//     bgColor: { argb: "" },
// };
// detailTwo14.font = {
//   bold: true,
//   color: { argb: "FFFFFF" },
//   size: 12,
// };

// let detailTwo15 = worksheet.getCell("AJ" + 22);
// detailTwo15.value = "Waste";
// detailTwo15.fill = {
//     type: "pattern",
//     pattern: "solid",
//     fgColor: { argb: "ff1a3c76" },
//     bgColor: { argb: "" },
// };
// detailTwo15.font = {
//   bold: true,
//   color: { argb: "FFFFFF" },
//   size: 12,
// };


// let detailTwo16 = worksheet.getCell("AK" + 22);
// detailTwo16.value = "Ssn";
// detailTwo16.fill = {
//     type: "pattern",
//     pattern: "solid",
//     fgColor: { argb: "ff1a3c76" },
//     bgColor: { argb: "" },
// };
// detailTwo16.font = {
//   bold: true,
//   color: { argb: "FFFFFF" },
//   size: 12,
// };

// let detailTwo17 = worksheet.getCell("AL" + 22);
// detailTwo17.value = "Material COO";
// detailTwo17.fill = {
//     type: "pattern",
//     pattern: "solid",
//     fgColor: { argb: "ff1a3c76" },
//     bgColor: { argb: "" },
// };
// detailTwo17.font = {
//   bold: true,
//   color: { argb: "FFFFFF" },
//   size: 12,
// };


// let detailTwo18 = worksheet.getCell("AM" + 22);
// detailTwo18.value = "Lead Time";
// detailTwo18.fill = {
//     type: "pattern",
//     pattern: "solid",
//     fgColor: { argb: "ff1a3c76" },
//     bgColor: { argb: "" },
// };
// detailTwo18.font = {
//   bold: true,
//   color: { argb: "FFFFFF" },
//   size: 12,
// };

// let detailTwo19 = worksheet.getCell("AN" + 22);
// detailTwo19.value = "Supplier Comments";
// detailTwo19.fill = {
//     type: "pattern",
//     pattern: "solid",
//     fgColor: { argb: "ff1a3c76" },
//     bgColor: { argb: "" },
// };
// detailTwo19.font = {
//   bold: true,
//   color: { argb: "FFFFFF" },
//   size: 12,
// };

// let detailTwo20 = worksheet.getCell("AO" + 22);
// detailTwo20.value = "Costing Marker Efficieny %";
// detailTwo20.fill = {
//     type: "pattern",
//     pattern: "solid",
//     fgColor: { argb: "ff1a3c76" },
//     bgColor: { argb: "" },
// };
// detailTwo20.font = {
//   bold: true,
//   color: { argb: "FFFFFF" },
//   size: 12,
// };



// var  rowCountDetails2 = 0
//     var detailsFastRow2 =  rowCountDetails2 + 22 + 1;
//     var detailsLastRow2 = 0

//     for (var itemDetails2 of dataPart2) {
//       var costrowDetailTow =  rowCountDetails2 + 22 + 1;
//       let detailRowTow1 = "V" + costrowDetailTow;// row.getCell(1).address;
//       worksheet.getCell(detailRowTow1).value = itemDetails2[0];
//       worksheet.getCell(detailRowTow1).border = {
//         top: { style: 'thin' },
//         bottom: { style: 'thin' },
//         left: { style: 'thin' },
//         //right: { style: 'thin' }
//       }

//       let detailRowTow2 = "W" + costrowDetailTow;//  row.getCell(2).address;
//       worksheet.getCell(detailRowTow2).value = itemDetails2[1];
//       worksheet.getCell(detailRowTow2).border = {
//         top: { style: 'thin' },
//         bottom: { style: 'thin' },
//         //left: { style: 'thin' },
//         //right: { style: 'thin' }
//       }

//       let detailRowTow3 = "X" + costrowDetailTow;// row.getCell(3).address;
//       worksheet.getCell(detailRowTow3).value = itemDetails2[2];
//       worksheet.getCell(detailRowTow3).border = {
//         top: { style: 'thin' },
//         bottom: { style: 'thin' },
//         //left: { style: 'thin' },
//         //right: { style: 'thin' }
//       }

//       let detailRowTow4 = "Y" + costrowDetailTow; //row.getCell(4).address;
//       worksheet.getCell(detailRowTow4).value = itemDetails2[3];
//       worksheet.getCell(detailRowTow4).border = {
//         top: { style: 'thin' },
//         bottom: { style: 'thin' },
//         //left: { style: 'thin' },
//         //right: { style: 'thin' }
//       }

//       let detailRowTow5 = "Z" + costrowDetailTow; //row.getCell(5).address;
//       worksheet.getCell(detailRowTow5).value = itemDetails2[4];
//       worksheet.getCell(detailRowTow5).border = {
//         top: { style: 'thin' },
//         bottom: { style: 'thin' },
//         //left: { style: 'thin' },
//         //right: { style: 'thin' }
//       }

//       let detailRowTow6 = "AA" + costrowDetailTow; //row.getCell(5).address;
//       worksheet.getCell(detailRowTow6).value = itemDetails2[5];
//       worksheet.getCell(detailRowTow6).border = {
//         top: { style: 'thin' },
//         bottom: { style: 'thin' },
//         //left: { style: 'thin' },
//         //right: { style: 'thin' }
//       }

//       let detailRowTow7 = "AB" + costrowDetailTow; //row.getCell(5).address;
//       worksheet.getCell(detailRowTow7).value = itemDetails2[6];
//       worksheet.getCell(detailRowTow7).border = {
//         top: { style: 'thin' },
//         bottom: { style: 'thin' },
//         //left: { style: 'thin' },
//         //right: { style: 'thin' }
//       }
//       worksheet.getCell(detailRowTow7).fill = {
//         type: "pattern",
//         pattern: "solid",
//         fgColor: { argb: "ffd0d9ea" },
//         bgColor: { argb: "" },
//       };
      

//       var total2 = `(AE${costrowDetailTow}+(AE${costrowDetailTow} * AJ${costrowDetailTow}% ))*((AG${costrowDetailTow} + AH${costrowDetailTow})+(AG${costrowDetailTow}*AI${costrowDetailTow}))`
      
//       worksheet.getCell(detailRowTow7).value = {
//         formula: total2,
//         date1904: false
//       }

//       let detailRowTow8 = "AC" + costrowDetailTow; //row.getCell(5).address;
//       worksheet.getCell(detailRowTow8).value = itemDetails2[7];
//       worksheet.getCell(detailRowTow8).border = {
//         top: { style: 'thin' },
//         bottom: { style: 'thin' },
//         //left: { style: 'thin' },
//         //right: { style: 'thin' }
//       }

//       let detailRowTow9 = "AD" + costrowDetailTow; //row.getCell(5).address;
//       worksheet.getCell(detailRowTow9).value = itemDetails2[8];
//       worksheet.getCell(detailRowTow9).border = {
//         top: { style: 'thin' },
//         bottom: { style: 'thin' },
//         //left: { style: 'thin' },
//        // right: { style: 'thin' }
//       }
//       //   worksheet.getCell(detailRowTow9).alignment = { vertical: "middle", horizontal: "center" };


//       let detailRowTow10 = "AE" + costrowDetailTow; //row.getCell(5).address;
//       worksheet.getCell(detailRowTow10).value = itemDetails2[9];
//       worksheet.getCell(detailRowTow10).border = {
//         top: { style: 'thin' },
//         bottom: { style: 'thin' },
//         //left: { style: 'thin' },
//         //right: { style: 'thin' }
//       }
//       worksheet.getCell(detailRowTow10).fill = {
//         type: "pattern",
//         pattern: "solid",
//         fgColor: { argb: "ffd1e4bb" },
//         bgColor: { argb: "" },
//       };
//       //   worksheet.getCell(detailRowTow10).alignment = { vertical: "middle", horizontal: "center" };

//       let detailRowTow11 = "AF" + costrowDetailTow; //row.getCell(5).address;
//       worksheet.getCell(detailRowTow11).value = itemDetails2[10];
//       worksheet.getCell(detailRowTow11).border = {
//         top: { style: 'thin' },
//         bottom: { style: 'thin' },
//         //left: { style: 'thin' },
//         //right: { style: 'thin' }
//       }
      


//       let detailRowTow12 = "AG" + costrowDetailTow; //row.getCell(5).address;
//       worksheet.getCell(detailRowTow12).value = itemDetails2[11];
//       worksheet.getCell(detailRowTow12).border = {
//         top: { style: 'thin' },
//         bottom: { style: 'thin' },
//         //left: { style: 'thin' },
//        // right: { style: 'thin' }
//       }
//       worksheet.getCell(detailRowTow12).fill = {
//         type: "pattern",
//         pattern: "solid",
//         fgColor: { argb: "ffd1e4bb" },
//         bgColor: { argb: "" },
//       };

//       let detailRowTow13 = "AH" + costrowDetailTow; //row.getCell(5).address;
//       worksheet.getCell(detailRowTow13).value = itemDetails2[12];
//       worksheet.getCell(detailRowTow13).border = {
//         top: { style: 'thin' },
//         bottom: { style: 'thin' },
//         //left: { style: 'thin' },
//         //right: { style: 'thin' }
//       }
//       worksheet.getCell(detailRowTow13).fill = {
//         type: "pattern",
//         pattern: "solid",
//         fgColor: { argb: "ffd1e4bb" },
//         bgColor: { argb: "" },
//       };

//       let detailRowTow14 = "AI" + costrowDetailTow; //row.getCell(5).address;
//       worksheet.getCell(detailRowTow14).value = itemDetails2[13];
//       worksheet.getCell(detailRowTow14).border = {
//         top: { style: 'thin' },
//         bottom: { style: 'thin' },
//         //left: { style: 'thin' },
//         //right: { style: 'thin' }
//       }
//       worksheet.getCell(detailRowTow14).fill = {
//         type: "pattern",
//         pattern: "solid",
//         fgColor: { argb: "ffd1e4bb" },
//         bgColor: { argb: "" },
//       };

//       let detailRowTow15 = "AJ" + costrowDetailTow; //row.getCell(5).address;
//       worksheet.getCell(detailRowTow15).value = itemDetails2[14];
//       worksheet.getCell(detailRowTow15).border = {
//         top: { style: 'thin' },
//         bottom: { style: 'thin' },
//         //left: { style: 'thin' },
//         //right: { style: 'thin' }
//       }
//       worksheet.getCell(detailRowTow15).fill = {
//         type: "pattern",
//         pattern: "solid",
//         fgColor: { argb: "ffd1e4bb" },
//         bgColor: { argb: "" },
//       };

//       let detailRowTow16 = "AK" + costrowDetailTow; //row.getCell(5).address;
//       worksheet.getCell(detailRowTow16).value = itemDetails2[15];
//       worksheet.getCell(detailRowTow16).border = {
//         top: { style: 'thin' },
//         bottom: { style: 'thin' },
//         //left: { style: 'thin' },
//         //right: { style: 'thin' }
//       }

//       let detailRowTow17 = "AL" + costrowDetailTow; //row.getCell(5).address;
//       worksheet.getCell(detailRowTow17).value = itemDetails2[16];
//       worksheet.getCell(detailRowTow17).border = {
//         top: { style: 'thin' },
//         bottom: { style: 'thin' },
//         //left: { style: 'thin' },
//         //right: { style: 'thin' }
//       }

//       let detailRowTow18 = "AM" + costrowDetailTow; //row.getCell(5).address;
//       worksheet.getCell(detailRowTow18).value = itemDetails2[17];
//       worksheet.getCell(detailRowTow18).border = {
//         top: { style: 'thin' },
//         bottom: { style: 'thin' },
//         //left: { style: 'thin' },
//         //right: { style: 'thin' }
//       }

//       let detailRowTow19 = "AN" + costrowDetailTow; //row.getCell(5).address;
//       worksheet.getCell(detailRowTow19).value = itemDetails2[18];
//       worksheet.getCell(detailRowTow19).border = {
//         top: { style: 'thin' },
//         bottom: { style: 'thin' },
//         //left: { style: 'thin' },
//         right: { style: 'thin' }
//       }
//       worksheet.getCell(detailRowTow19).fill = {
//         type: "pattern",
//         pattern: "solid",
//         fgColor: { argb: "ffd1e4bb" },
//         bgColor: { argb: "" },
//       };

//       let detailRowTow20 = "AO" + costrowDetailTow; //row.getCell(5).address;
//       worksheet.getCell(detailRowTow20).value = itemDetails2[19];
//       worksheet.getCell(detailRowTow20).border = {
//         top: { style: 'thin' },
//         bottom: { style: 'thin' },
//         //left: { style: 'thin' },
//         right: { style: 'thin' }
//       }
//       worksheet.getCell(detailRowTow20).fill = {
//         type: "pattern",
//         pattern: "solid",
//         fgColor: { argb: "ffd1e4bb" },
//         bgColor: { argb: "" },
//       };

//       detailsLastRow2 = costrowDetailTow;
//       rowCountDetails2++
//     }

    
//     //Bom_Fomula Bloack
//     fabricValue.value = {
//       formula: `SUMIF(H${detailsFastRow1}:H${detailsLastRow1},UPPER(G8),G${detailsFastRow1}:G${detailsLastRow1})`,
//       date1904: false
//     }
//     trimsValue.value = {
//       formula: `SUMIF(H${detailsFastRow1}:H${detailsLastRow1},UPPER(G9),G${detailsFastRow1}:G${detailsLastRow1})`,
//       date1904: false
//     }
//     lablesValue.value = {
//       formula: `SUMIF(H${detailsFastRow1}:H${detailsLastRow1},UPPER(G10),G${detailsFastRow1}:G${detailsLastRow1})`,
//       date1904: false
//     }
//     graphicValue.value = {
//       formula: `SUMIF(H${detailsFastRow1}:H${detailsLastRow1},UPPER(G11),G${detailsFastRow1}:G${detailsLastRow1})`,
//       date1904: false
//     }
//     totalMatrialValue.value = {
//       formula: `SUM(H8:H11)`,
//       date1904: false
//     }
//     financeValue.value ={
//       formula: `H7*H6%`,
//       date1904: false
//     }
//     bomCostValue.value ={
//       formula: `H6+H7`,
//       date1904: false
//     }


//     //--------Laber Cost Formula----------------//
//     LaborCostValue.value = {
//       formula: `((${smvValue.address}*${HourlyWageValue.address})/${AverageEfficiencyValue.address}%)/60`,
//       date1904 : false
//     }

//     OverheadCostValue.value = {
//       formula: `${LaborCostValue.address}*${OverheadCostRatioValue.address}%`,
//       date1904 : false
//     }

//     LabaorOverhadecostValue.value = {
//       formula: `SUM(${LaborCostValue.address}:${OverheadCostValue.address})`,
//       date1904: false
//     }

//     //--------------------- Special Costs Farmula -------------------/
//     SpecialCostsValue.value = {
//       formula:`SUM(AE6:AE10)`,
//       date1904: false
//     }

//     //  Quoted Fob Formula //
//     debugger
//     BomLoValue.value = {
//       formula: `${bomCostValue.address}+${LabaorOverhadecostValue.address} +${SpecialCostsValue.address}`,
//       date1904: false
//     }

//     FactoryProfitValue.value = {
//       formula: `${BomLoValue.address}*${profitPerValue.address}%`,
//       date1904: false
//     }

//     CalculatedFobValue.value = {

//       formula: `${BomLoValue.address}+${FactoryProfitValue.address}+${ProductTestingCostValue.address}+${FreightToPortValue.address}`,
//       date1904: false
//     }

//     QuotedFobValue.value ={
//       formula: `${FobAdjustmentValue.address}+${CalculatedFobValue.address}`,
//       date1904: false
//     }

// }


///////////////-------------------------Part2 End-------------------------------------------------//




worksheet.columns.forEach(function (column, i) {
  // debugger
 if (i != 0 && i != 21) {
      var maxLength = 5;
      column["eachCell"]({ includeEmpty: false }, function (cell) {
          var columnLength = cell.value ? cell.value.toString().length : 10;
          if (columnLength > maxLength) {
              maxLength = columnLength;
          }
      });
      column.width = maxLength < 10 ? 10 : 22;
  }
});


    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, title + ".xlsx");
    });
  }

}