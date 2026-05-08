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
export class EddieCostingReportService {
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
    //debugger
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
    const masterData = excelData.finallySubmitData;
    const title = excelData.title;




    var partList = masterData.filter((a, i) => masterData.findIndex((s) => a.stylePartId === s.stylePartId) === i);
    console.log("partList",partList);

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


    //-----------------------Stat  of Haderd block one---------------//

    let buyerLable = worksheet.getCell("A1");
    buyerLable.value = "LV";
    buyerLable.font = {
      bold: true,
      size: 16,
    };

    let SketchLable = worksheet.getCell("F1");
    SketchLable.value = "Sketch";
    SketchLable.font = { bold: true };

    //-------------------- Image ----------------------------------//
    if (masterData[0].fileStatus == "Y") {
      //debugger
      var url = environment.fileUrl + masterData[0].filePath;
      let myLogoImage = workbook.addImage({
        base64: masterData[0].imageBase64,
        extension: 'jpeg',
      });
        worksheet.addImage(myLogoImage, 'D3:H10');
    }

    let dateLable = worksheet.getCell("A3");
    dateLable.value = "Date:";
    dateLable.font = { bold: true };
    dateLable.border = {
      //top: { style: 'thin' },
      // bottom: { style: 'thin' },
      //left: { style: 'thin' },
      //right: { style: 'thin' }
    }

    let seasonlable = worksheet.getCell("A4");
    seasonlable.value = "Season:";
    seasonlable.font = { bold: true };
    seasonlable.border = {
      //top: { style: 'thin' },
      // bottom: { style: 'thin' },
      //left: { style: 'thin' },
      //right: { style: 'thin' }
    }

    let brandLable = worksheet.getCell("A5");
    brandLable.value = "Group:";
    brandLable.font = { bold: true };
    brandLable.border = {
      //top: { style: 'thin' },
      // bottom: { style: 'thin' },
      //left: { style: 'thin' },
      //right: { style: 'thin' }
    }

    let VandorLable = worksheet.getCell("A6");
    VandorLable.value = "Vendor:";
    VandorLable.font = { bold: true };
    VandorLable.border = {
      //top: { style: 'thin' },
      // bottom: { style: 'thin' },
      //left: { style: 'thin' },
      //right: { style: 'thin' }
    }

    let styleLable = worksheet.getCell("A7");
    styleLable.value = "Style:";
    styleLable.font = { bold: true };
    styleLable.border = {
      //top: { style: 'thin' },
      // bottom: { style: 'thin' },
      //left: { style: 'thin' },
      //right: { style: 'thin' }
    }

    let ProjectionLable = worksheet.getCell("A8");
    ProjectionLable.value = "Projection:";
    ProjectionLable.font = { bold: true };
    ProjectionLable.border = {
      //top: { style: 'thin' },
      // bottom: { style: 'thin' },
      //left: { style: 'thin' },
      //right: { style: 'thin' }
    }


    let DescriptionLable = worksheet.getCell("A9");
    DescriptionLable.value = "Description:";
    DescriptionLable.font = { bold: true };
    DescriptionLable.border = {
      //top: { style: 'thin' },
      // bottom: { style: 'thin' },
      //left: { style: 'thin' },
      //right: { style: 'thin' }
    }


    let FactoryLable = worksheet.getCell("A10");
    FactoryLable.value = "Factory:";
    FactoryLable.font = { bold: true };
    FactoryLable.border = {
      //top: { style: 'thin' },
      // bottom: { style: 'thin' },
      //left: { style: 'thin' },
      //right: { style: 'thin' }
    }


    let CountryOfOriginLable = worksheet.getCell("A11");
    CountryOfOriginLable.value = "Country of Origin:";
    CountryOfOriginLable.font = { bold: true };
    CountryOfOriginLable.border = {
      //top: { style: 'thin' },
      // bottom: { style: 'thin' },
      //left: { style: 'thin' },
      //right: { style: 'thin' }
    }


    let PlaidStripeMatchingLable = worksheet.getCell("A12");
    PlaidStripeMatchingLable.value = "Plaid/Stripe matching:";
    PlaidStripeMatchingLable.font = { bold: true };
    PlaidStripeMatchingLable.border = {
      //top: { style: 'thin' },
      // bottom: { style: 'thin' },
      //left: { style: 'thin' },
      //right: { style: 'thin' }
    }



    let dateDate = worksheet.getCell("B3");
    dateDate.value = new Date(masterData[0].initialDate);
    //dateDate.font = { bold: true };

    let seasonValue = worksheet.getCell("B4");
    seasonValue.value = masterData[0].seasonName;
    //seasonValue.font = { bold: true };

    let brandValue = worksheet.getCell("B5");
    brandValue.value = masterData[0].brandName;
    //brandValue.font = { bold: true };

    let VandorValue = worksheet.getCell("B6");
    VandorValue.value = "Snowtex"
    //VandorValue.font = { bold: true };

    let styleValue = worksheet.getCell("B7");
    styleValue.value = masterData[0].styleName;
    //styleValue.font = { bold: true };

    let ProjectionValue = worksheet.getCell("B8");
    ProjectionValue.value = masterData[0].moq;
    ProjectionValue.font = { bold: true };

    let DescriptionValue = worksheet.getCell("B9");
    DescriptionValue.value = masterData[0].description
    DescriptionValue.font = { bold: true };

    let FactoryValue = worksheet.getCell("B10");
    FactoryValue.value = "Snowtex";
    //FactoryValue.font = { bold: true };

    let CountryOfOriginValue = worksheet.getCell("B11");
    CountryOfOriginValue.value = "Bangladesh";
    //CountryOfOriginValue.font = { bold: true };

    let PlaidStripeMatchingValue = worksheet.getCell("B12");
    PlaidStripeMatchingValue.value = "";
    //PlaidStripeMatchingValue.font = { bold: true };



    //-----------------------End of Haderd block One---------------//

    //-----------------------Stat  of Haderd block Tow---------------//
    let CostBreakdownLable = worksheet.getCell("K1");
    CostBreakdownLable.value = "Cost breakdown Summry";
    CostBreakdownLable.font = { bold: true };

    let CMLable = worksheet.getCell("K2");
    CMLable.value = "CM";
    CMLable.font = { bold: true };
    CMLable.border = {
      top: { style: 'medium' },
      // bottom: { style: 'thin' },
      left: { style: 'medium' },
      //right: { style: 'thin' }
    }

    let FabricLable = worksheet.getCell("K3");
    FabricLable.value = "Fabric";
    FabricLable.font = { bold: true };
    FabricLable.border = {
      //top: { style: 'medium' },
      // bottom: { style: 'thin' },
      left: { style: 'medium' },
      //right: { style: 'thin' }
    }


    let TrimFabricLable = worksheet.getCell("K4");
    TrimFabricLable.value = "Trim Fabric";
    TrimFabricLable.font = { bold: true };
    TrimFabricLable.border = {
      //top: { style: 'medium' },
      // bottom: { style: 'thin' },
      left: { style: 'medium' },
      //right: { style: 'thin' }
    }


    let PocketingLable = worksheet.getCell("K5");
    PocketingLable.value = "Pocketing";
    PocketingLable.font = { bold: true };
    PocketingLable.border = {
      //top: { style: 'medium' },
      // bottom: { style: 'thin' },
      left: { style: 'medium' },
      //right: { style: 'thin' }
    }
    
    let EmbroideryPrintLable = worksheet.getCell("K6");
    EmbroideryPrintLable.value = "Embroidery/ Print";
    EmbroideryPrintLable.font = { bold: true };
    EmbroideryPrintLable.border = {
      //top: { style: 'medium' },
      // bottom: { style: 'thin' },
      left: { style: 'medium' },
      //right: { style: 'thin' }
    }

    let BasicTrimsLable = worksheet.getCell("K7");
    BasicTrimsLable.value = "Basic Trims";
    BasicTrimsLable.font = { bold: true };
    BasicTrimsLable.border = {
      //top: { style: 'medium' },
      // bottom: { style: 'thin' },
      left: { style: 'medium' },
      //right: { style: 'thin' }
    }

    let PackingLable = worksheet.getCell("K8");
    PackingLable.value = "Packing";
    PackingLable.font = { bold: true };
    PackingLable.border = {
      //top: { style: 'medium' },
      // bottom: { style: 'thin' },
      left: { style: 'medium' },
      //right: { style: 'thin' }
    }

    let WashingLable = worksheet.getCell("K9");
    WashingLable.value = "Washing";
    WashingLable.font = { bold: true };
    WashingLable.border = {
      //top: { style: 'medium' },
       bottom: { style: 'medium' },
      left: { style: 'medium' },
      //right: { style: 'thin' }
    }

    let FobLable = worksheet.getCell("K10");
    FobLable.value = "FOB";
    FobLable.font = { bold: true };
    FobLable.border = {
      //top: { style: 'medium' },
      // bottom: { style: 'thin' },
      left: { style: 'medium' },
      //right: { style: 'thin' }
    }
    
    let CommercialCostLable = worksheet.getCell("K11");
    CommercialCostLable.value = "Commercial Cost";
    CommercialCostLable.font = { bold: true };
    CommercialCostLable.border = {
      //top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      //right: { style: 'thin' }
    }

    let TotalFobLable = worksheet.getCell("K12");
    TotalFobLable.value = "TOTAL FOB";
    TotalFobLable.font = { bold: true };
    TotalFobLable.border = {
      //top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'thin' }
    }

    TotalFobLable.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd3d3d3" },
      bgColor: { argb: "" },
    };


    let precentLable = worksheet.getCell("K13");
    precentLable.value = null;
    precentLable.font = { bold: true };
    precentLable.border = {
      //top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      //right: { style: 'thin' }
    }
    precentLable.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ff9ab3e5" },
      bgColor: { argb: "" },
    };




  //-------------------- values --------------------//

  let TotalCostLable = worksheet.getCell("L1");
  TotalCostLable.value = "Total Cost";
  TotalCostLable.font = { bold: true };


    let CMValue = worksheet.getCell("L2");
    CMValue.value = masterData[0].cmPC;
    CMValue.font = { bold: true };
    CMValue.border = {
      top: { style: 'medium' },
      // bottom: { style: 'thin' },
      //left: { style: 'medium' },
      right: { style: 'thin' }
    }

    let FabricValue = worksheet.getCell("L3");
    FabricValue.value = null;
    FabricValue.font = { bold: true };
    FabricValue.border = {
      //top: { style: 'medium' },
      // bottom: { style: 'thin' },
      // left: { style: 'medium' },
      right: { style: 'thin' }
    }


    let TrimFabricValue = worksheet.getCell("L4");
    TrimFabricValue.value = null;
    TrimFabricValue.font = { bold: true };
    TrimFabricValue.border = {
      //top: { style: 'medium' },
      // bottom: { style: 'thin' },
      //left: { style: 'medium' },
      right: { style: 'thin' }
    }


    let PocketingValue = worksheet.getCell("L5");
    PocketingValue.value = null;
    PocketingValue.font = { bold: true };
    PocketingValue.border = {
      //top: { style: 'medium' },
      // bottom: { style: 'thin' },
      //left: { style: 'medium' },
      right: { style: 'thin' }
    }
    
    let EmbroideryPrintValue = worksheet.getCell("L6");
    EmbroideryPrintValue.value = null;
    EmbroideryPrintValue.font = { bold: true };
    EmbroideryPrintValue.border = {
      //top: { style: 'medium' },
      // bottom: { style: 'thin' },
      // left: { style: 'medium' },
      right: { style: 'thin' }
    }

    let BasicTrimsValue = worksheet.getCell("L7");
    BasicTrimsValue.value = null;
    BasicTrimsValue.font = { bold: true };
    BasicTrimsValue.border = {
      //top: { style: 'medium' },
      // bottom: { style: 'thin' },
      // left: { style: 'medium' },
      right: { style: 'thin' }
    }

    let PackingValue = worksheet.getCell("L8");
    PackingValue.value = null;
    PackingValue.font = { bold: true };
    PackingValue.border = {
      //top: { style: 'medium' },
      // bottom: { style: 'thin' },
      // left: { style: 'medium' },
      right: { style: 'thin' }
    }

    let WashingValue = worksheet.getCell("L9");
    WashingValue.value = null;
    WashingValue.font = { bold: true };
    WashingValue.border = {
      //top: { style: 'medium' },
       bottom: { style: 'medium' },
      // left: { style: 'medium' },
      right: { style: 'thin' }
    }

    let FobValue = worksheet.getCell("L10");
    FobValue.value = null;
    FobValue.font = { bold: true };
    FobValue.border = {
      //top: { style: 'medium' },
      // bottom: { style: 'thin' },
      //left: { style: 'medium' },
      right: { style: 'thin' }
    }
    
    let CommercialCostValue = worksheet.getCell("L11");
    CommercialCostValue.value = null;
    CommercialCostValue.font = { bold: true };
    CommercialCostValue.border = {
      //top: { style: 'medium' },
      bottom: { style: 'medium' },
      //left: { style: 'medium' },
      right: { style: 'thin' }
    }

    let TotalFobValue = worksheet.getCell("L12");
    TotalFobValue.value = null;
    TotalFobValue.font = { bold: true };
    TotalFobValue.border = {
      //top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }

    TotalFobValue.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffd3d3d3" },
      bgColor: { argb: "" },
    };

    let totalCostValue = worksheet.getCell("L13");
    totalCostValue.value = null;
    totalCostValue.font = { bold: true };
    totalCostValue.border = {
      //top: { style: 'medium' },
      bottom: { style: 'medium' },
      //left: { style: 'medium' },
      //right: { style: 'thin' }
    }
    totalCostValue.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ff1dccff" },
      bgColor: { argb: "" },
    };


    //--------------------- Only for Desgin--------------------------//
    let forDesginM2 = worksheet.getCell("M2");
    forDesginM2.border = {
      top: { style: 'medium' },
      //bottom: { style: 'medium' },
      //left: { style: 'medium' },
      right: { style: 'medium' }
    }

    let forDesginM3 = worksheet.getCell("M3");
    forDesginM3.border = {
      //top: { style: 'medium' },
      //bottom: { style: 'medium' },
      //left: { style: 'medium' },
      right: { style: 'medium' }
    }


    let forDesginM4 = worksheet.getCell("M4");
    forDesginM4.border = {
      //top: { style: 'medium' },
      //bottom: { style: 'medium' },
      //left: { style: 'medium' },
      right: { style: 'medium' }
    }

    let forDesginM5 = worksheet.getCell("M5");
    forDesginM5.border = {
      //top: { style: 'medium' },
      //bottom: { style: 'medium' },
      //left: { style: 'medium' },
      right: { style: 'medium' }
    }

    let forDesginM6 = worksheet.getCell("M6");
    forDesginM6.border = {
      //top: { style: 'medium' },
      //bottom: { style: 'medium' },
      //left: { style: 'medium' },
      right: { style: 'medium' }
    }


    let forDesginM7 = worksheet.getCell("M7");
    forDesginM7.border = {
      //top: { style: 'medium' },
      //bottom: { style: 'medium' },
      //left: { style: 'medium' },
      right: { style: 'medium' }
    }

    let forDesginM8 = worksheet.getCell("M8");
    forDesginM8.border = {
      //top: { style: 'medium' },
      //bottom: { style: 'medium' },
      //left: { style: 'medium' },
      right: { style: 'medium' }
    }

    let forDesginM9 = worksheet.getCell("M9");
    forDesginM9.border = {
      //top: { style: 'medium' },
      bottom: { style: 'medium' },
      //left: { style: 'medium' },
      right: { style: 'medium' }
    }

    let forDesginM10 = worksheet.getCell("M10");
    forDesginM10.border = {
      //top: { style: 'medium' },
      bottom: { style: 'medium' },
      //left: { style: 'medium' },
      right: { style: 'medium' }
    }

    let forDesginM11 = worksheet.getCell("M11");
    forDesginM11.border = {
      //top: { style: 'medium' },
      bottom: { style: 'medium' },
      //left: { style: 'medium' },
      right: { style: 'medium' }
    }

    let forDesginM12 = worksheet.getCell("M12");
    forDesginM12.border = {
      //top: { style: 'medium' },
      bottom: { style: 'medium' },
      //left: { style: 'medium' },
      right: { style: 'medium' }
    }

    let forDesginM13 = worksheet.getCell("M13");
    forDesginM13.border = {
      //top: { style: 'medium' },
      bottom: { style: 'medium' },
      //left: { style: 'medium' },
      right: { style: 'medium' }
    }
    // forDesginM13.fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: { argb: "ff1dccff" },
    //   bgColor: { argb: "" },
    // };

    //-----------------------End  of Haderd block Tow---------------//



    //----------------------Start of fabric Block-------------------//

    //----------------- Commeted Header Start-------------//
    // let f1 = worksheet.getCell("A17");
    // f1.border = {
    //   top: { style: 'medium' },
    //   bottom: { style: 'medium' },
    //   left: { style: 'medium' },
    //   right: { style: 'medium' }
    // }
    // f1.fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: { argb: "ff000000" },
    //   bgColor: { argb: "" },
    // };

    // let f2 = worksheet.getCell("B17");
    // f2.value = "Fabric details"
    // f2.border = {
    //   top: { style: 'medium' },
    //   bottom: { style: 'medium' },
    //   left: { style: 'medium' },
    //   right: { style: 'medium' }
    // }
    // f2.fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: { argb: "ffb3b3b3" },
    //   bgColor: { argb: "" },
    // };

    // let f3 = worksheet.getCell("C17");
    // f3.value = ""
    // f3.border = {
    //   top: { style: 'medium' },
    //   bottom: { style: 'medium' },
    //   left: { style: 'medium' },
    //   right: { style: 'medium' }
    // }
    // f3.fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: { argb: "ffb3b3b3" },
    //   bgColor: { argb: "" },
    // };


    // let f4 = worksheet.getCell("D17");
    // f4.value = "Price/y"
    // f4.border = {
    //   top: { style: 'medium' },
    //   bottom: { style: 'medium' },
    //   left: { style: 'medium' },
    //   right: { style: 'medium' }
    // }
    // f4.fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: { argb: "ffb3b3b3" },
    //   bgColor: { argb: "" },
    // };

    // let f5 = worksheet.getCell("E17");
    // f5.value = "YY"
    // f5.border = {
    //   top: { style: 'medium' },
    //   bottom: { style: 'medium' },
    //   left: { style: 'medium' },
    //   right: { style: 'medium' }
    // }
    // f5.fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: { argb: "ffb3b3b3" },
    //   bgColor: { argb: "" },
    // };

    // let f6 = worksheet.getCell("F17");
    // f6.value = "Wastage"
    // f6.border = {
    //   top: { style: 'medium' },
    //   bottom: { style: 'medium' },
    //   left: { style: 'medium' },
    //   right: { style: 'medium' }
    // }
    // f6.fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: { argb: "ffb3b3b3" },
    //   bgColor: { argb: "" },
    // };

    // let f7 = worksheet.getCell("G17");
    // f7.value = "TOTAL"
    // f7.border = {
    //   top: { style: 'medium' },
    //   bottom: { style: 'medium' },
    //   left: { style: 'medium' },
    //   right: { style: 'medium' }
    // }
    // f7.fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: { argb: "ffb3b3b3" },
    //   bgColor: { argb: "" },
    // };
    //----------------- Commeted Header End-------------//
    //debugger
   // var fabricDta1Ex = partList[0].costingFabricsList.filter(x => x.category != "INTERLINING");
    var fabricDta1 = partList[0].costingFabricsList.filter(x => x.category != "INTERLINING");
    console.log("fabricDta1",fabricDta1);

    const rowTypeName = [
      "Header",
      "Mill / Code",
      "Content / Finish",
      "Construction / Width",
      "Color",
      "Placement"
    ]

    
  //debugger
    var dataFabric = [];
    var dataForExcelFabric1 = [];
    for(var fabItem1 of fabricDta1){
      dataFabric = [];
      for(let item of rowTypeName){
        if(item == "Header"){
          var objFabricH = {
            rowType:fabItem1.itemName,
            details: "Fabric details",
            code: " ",
            price:"Price/y",
            yy: "yy",
            wastagePercentage:"Wastage",
            total: "TOTAL",
            itemName: fabItem1.itemName,
            category: fabItem1.category
          }
          dataFabric.push(objFabricH);
        }
        if(item == "Mill / Code"){
          var objFabric1 = {
            rowType:item,
            details: fabItem1.supplierName,
            code: fabItem1.refCode,
            price:fabItem1.rate,
            yy: fabItem1.consumption,
            wastagePercentage: fabItem1.wastagePercentage,
            total: 0,
            itemName: fabItem1.itemName,
            category: fabItem1.category
          }
          dataFabric.push(objFabric1);
        }
        else if(item == "Content / Finish"){
          var objFabric2 = {
            rowType:item,
            details: fabItem1.febDescription,
            code: null,
            price: null,
            yy: null,
            wastagePercentage: null,
            total: null,
            itemName: fabItem1.itemName,
            category: fabItem1.category
          }
          dataFabric.push(objFabric2);
        }
        else if(item == "Construction / Width"){
          var objFabric3 = {
            rowType:item,
            details: fabItem1.febDescription,
            code: fabItem1.cuttAbleWidth,
            price: null,
            yy: null,
            wastagePercentage: null,
            total: null,
            itemName: fabItem1.itemName,
            category: fabItem1.category
          }
          dataFabric.push(objFabric3);
        }
        else if(item == "Color"){
          var objFabric4 = {
            rowType:item,
            details: null,
            code: null,
            price: null,
            yy: null,
            wastagePercentage: null,
            total: 0,
            itemName: fabItem1.itemName,
            category: fabItem1.category
          }
          dataFabric.push(objFabric4);
        }
        else if(item == "Placement"){
          var objFabric5 = {
            rowType:item,
            details: fabItem1.itemPlacement,
            code: null,
            price:null,
            yy: null,
            wastagePercentage: null,
            total: null,
            itemName: fabItem1.itemName,
            category: fabItem1.category
          }
          dataFabric.push(objFabric5);
        }
      }
      dataForExcelFabric1.push(dataFabric)
     // debugger

    }


    console.log("dataForExcelFabric1", dataForExcelFabric1);


   //debugger

    var fabricRowCout = 0
    var fabricFastRow = 16 + fabricRowCout + 1;
    var fabricLastRow = 0

    for(var item of dataForExcelFabric1){
      var headerCouter = 0;
      for (var itemFab of item) {
        var costrowCountitemFeb = 16 + fabricRowCout + 1;
        let itemCell = "A" + costrowCountitemFeb;// row.getCell(1).address;
        worksheet.getCell(itemCell).value = itemFab.rowType;

        if(headerCouter == 0){
          worksheet.getCell(itemCell).border = {
            top: { style: 'medium' },
            bottom: { style: 'medium' },
            left: { style: 'medium' },
            right: { style: 'medium' }
          }
          worksheet.getCell(itemCell).font = { bold: true };
          // worksheet.getCell(itemCell).fill = {
          //   type: "pattern",
          //   pattern: "solid",
          //   fgColor: { argb: "ff000000" },
          //   bgColor: { argb: "" },
          // };
        }
        else{
          worksheet.getCell(itemCell).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
        }
  
        let detailsCell = "B" + costrowCountitemFeb;// row.getCell(1).address;
        worksheet.getCell(detailsCell).value = itemFab.details;


        if(headerCouter == 0){
          worksheet.getCell(detailsCell).border = {
            top: { style: 'medium' },
            bottom: { style: 'medium' },
            left: { style: 'medium' },
            right: { style: 'medium' }
          }

          worksheet.getCell(detailsCell).font = { bold: true };

          // worksheet.getCell(detailsCell).fill = {
          //   type: "pattern",
          //   pattern: "solid",
          //   fgColor: { argb: "ff000000" },
          //   bgColor: { argb: "" },
          // };
        }
        else{
          worksheet.getCell(detailsCell).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
        }
  
        let codeCell = "C" + costrowCountitemFeb;// row.getCell(1).address;
        worksheet.getCell(codeCell).value = itemFab.code;
        if(headerCouter == 0){
          worksheet.getCell(codeCell).border = {
            top: { style: 'medium' },
            bottom: { style: 'medium' },
            left: { style: 'medium' },
            right: { style: 'medium' }
          }

          worksheet.getCell(codeCell).font = { bold: true };

          // worksheet.getCell(codeCell).fill = {
          //   type: "pattern",
          //   pattern: "solid",
          //   fgColor: { argb: "ff000000" },
          //   bgColor: { argb: "" },
          // };
        }
        else{
          worksheet.getCell(codeCell).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
        }
  
        let priceCell = "D" + costrowCountitemFeb;// row.getCell(1).address;
        worksheet.getCell(priceCell).value = itemFab.price;
        if(headerCouter == 0){
          worksheet.getCell(priceCell).border = {
            top: { style: 'medium' },
            bottom: { style: 'medium' },
            left: { style: 'medium' },
            right: { style: 'medium' }
          }

          worksheet.getCell(priceCell).font = { bold: true };

          // worksheet.getCell(priceCell).fill = {
          //   type: "pattern",
          //   pattern: "solid",
          //   fgColor: { argb: "ff000000" },
          //   bgColor: { argb: "" },
          // };
        }
        else{
          worksheet.getCell(priceCell).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
        }
  
        let yyCell = "E" + costrowCountitemFeb;// row.getCell(1).address;
        worksheet.getCell(yyCell).value = itemFab.yy;
        if(headerCouter == 0){
          worksheet.getCell(yyCell).border = {
            top: { style: 'medium' },
            bottom: { style: 'medium' },
            left: { style: 'medium' },
            right: { style: 'medium' }
          }

          worksheet.getCell(yyCell).font = { bold: true };

          // worksheet.getCell(yyCell).fill = {
          //   type: "pattern",
          //   pattern: "solid",
          //   fgColor: { argb: "ff000000" },
          //   bgColor: { argb: "" },
          // };
        }
        else{
          worksheet.getCell(yyCell).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
        }
  
        let wastagePercentageCell = "F" + costrowCountitemFeb;// row.getCell(1).address;
        worksheet.getCell(wastagePercentageCell).value = itemFab.wastagePercentage;
        if(headerCouter == 0){
          worksheet.getCell(wastagePercentageCell).border = {
            top: { style: 'medium' },
            bottom: { style: 'medium' },
            left: { style: 'medium' },
            right: { style: 'medium' }
          }
          worksheet.getCell(wastagePercentageCell).font = { bold: true };

          // worksheet.getCell(wastagePercentageCell).fill = {
          //   type: "pattern",
          //   pattern: "solid",
          //   fgColor: { argb: "ff000000" },
          //   bgColor: { argb: "" },
          // };
        }
        else{
          worksheet.getCell(wastagePercentageCell).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }

          if(headerCouter == 1){
            worksheet.getCell(wastagePercentageCell).value = `${itemFab.wastagePercentage}%`;
          }
        }
  
        let totalCell = "G" + costrowCountitemFeb;// row.getCell(1).address;
        
        if(headerCouter == 0){
          worksheet.getCell(totalCell).value = itemFab.total;
          worksheet.getCell(totalCell).border = {
            top: { style: 'medium' },
            bottom: { style: 'medium' },
            left: { style: 'medium' },
            right: { style: 'medium' }
          }

          worksheet.getCell(totalCell).font = { bold: true };

          // worksheet.getCell(totalCell).fill = {
          //   type: "pattern",
          //   pattern: "solid",
          //   fgColor: { argb: "ff000000" },
          //   bgColor: { argb: "" },
          // };
        }
        else{
          worksheet.getCell(totalCell).value = null;
          worksheet.getCell(totalCell).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }

          if(headerCouter == 1){
            worksheet.getCell(totalCell).value = {
              formula:`(D${costrowCountitemFeb}*E${costrowCountitemFeb})+(D${costrowCountitemFeb}*E${costrowCountitemFeb})*F${costrowCountitemFeb}`,
              date1904:false
            }
          }
        }
        
        headerCouter++
        fabricLastRow = costrowCountitemFeb;
        fabricRowCout++    
      }
    }
  
    //----------------------End of fabric Block---------------------//

    //----------------------Start of Wash Block--------------------//

    const wasingHaderName = [
      "WASHING",
      "Washing method",
      "",
      "",
      "",
      "",
      "TOTAL"
    ]
    debugger
    var WashingData1 = partList[0].costAccessoriesList.filter(x => x.categoryGroup.toUpperCase() == "WASHING");
    console.log("WashingData1", WashingData1);

    worksheet.addRow([])
    worksheet.addRow([])
    let headerRowWashing1 = worksheet.addRow(wasingHaderName);

    headerRowWashing1.eachCell((cell, number) => {
      // cell.fill = {
      //   type: "pattern",
      //   pattern: "solid",
      //   fgColor: { argb: "4167B8" },
      //   bgColor: { argb: "" },
      // };
      cell.font = {
        bold: true,
        // color: { argb: "FFFFFF" },
        // size: 12,
      };
      cell.border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }
      //cell.alignment = { vertical: "middle", horizontal: "center" };

    }); 

    var washRowCout = 0
    var washFastRow = 16 + fabricRowCout + 1 + 2 + washRowCout + 1;
    var washLastRow = 16 + fabricRowCout + 1 + 2 + washRowCout + 1;
	
	
	for (var itemWash of WashingData1) {
      var costrowCountitemWash = 16 + fabricRowCout + 1 + 2 + washRowCout + 1;
      let itemCell = "A" + costrowCountitemWash;// row.getCell(1).address;
      worksheet.getCell(itemCell).value = itemWash.categoryName;
      worksheet.getCell(itemCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let detailsCell = "B" + costrowCountitemWash;// row.getCell(1).address;
      worksheet.getCell(detailsCell).value = itemWash.itemName;
      worksheet.getCell(detailsCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let codeCell = "C" + costrowCountitemWash;// row.getCell(1).address;
      //worksheet.getCell(codeCell).value = itemWash.code;
      worksheet.getCell(codeCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let priceCell = "D" + costrowCountitemWash;// row.getCell(1).address;
      //worksheet.getCell(priceCell).value = itemWash.price;
      worksheet.getCell(priceCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let yyCell = "E" + costrowCountitemWash;// row.getCell(1).address;
      //worksheet.getCell(yyCell).value = itemWash.yy;
      worksheet.getCell(yyCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let wastagePercentageCell = "F" + costrowCountitemWash;// row.getCell(1).address;
      //worksheet.getCell(wastagePercentageCell).value = itemWash.wastagePercentage;
      worksheet.getCell(wastagePercentageCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let totalCell = "G" + costrowCountitemWash;// row.getCell(1).address;
      worksheet.getCell(totalCell).value = null;
      worksheet.getCell(totalCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      
      washLastRow = costrowCountitemWash;
      washRowCout++
    }

    var washSumRowCount = washLastRow + 1;
    let totalWashValue = "G" + washSumRowCount;

    worksheet.getCell(totalWashValue).value = null;
    worksheet.getCell(totalWashValue).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell(totalWashValue).value = {
      formula:`SUM(G${washFastRow}:G${washLastRow})`,
      date1904: false
    }
    //----------------------End of Wash Block----------------------//

    //----------------------Start of Print Block-------------------//
    const printingHaderName = [
      "PRINT / EMBROIDERY",
      "Trim code",
      "",
      "Price/Unit",
      "",
      "Qnty/Pc",
      "TOTAL"
    ]
    debugger
    var PrintingData1 = partList[0].costAccessoriesList.filter(x => x.categoryGroup.toUpperCase() == "PRINTING");
    console.log("PrintingData1", PrintingData1);

    //worksheet.addRow([])
    worksheet.addRow([])
    let headerRowPrinting1 = worksheet.addRow(printingHaderName);

    headerRowPrinting1.eachCell((cell, number) => {
      // cell.fill = {
      //   type: "pattern",
      //   pattern: "solid",
      //   fgColor: { argb: "4167B8" },
      //   bgColor: { argb: "" },
      // };
      cell.font = {
        bold: true,
        // color: { argb: "FFFFFF" },
        // size: 12,
      };
      cell.border = {
        top: { style: 'medium' },
        bottom: { style: 'medium' },
        left: { style: 'medium' },
        right: { style: 'medium' }
      }
      //cell.alignment = { vertical: "middle", horizontal: "center" };

    }); 

    var printRowCout = 0
    var printFastRow = 16 + fabricRowCout + 1 + 2 + washRowCout + 1 +2 + printRowCout + 1;
    var printLastRow = 16 + fabricRowCout + 1 + 2 + washRowCout + 1 +2 + printRowCout + 1;
	
	for (var itemPrint of PrintingData1) {
      var costrowCountitemPrint = 16 + fabricRowCout + 1 + 2 + washRowCout + 1 +2 + printRowCout + 1;
      let itemCell = "A" + costrowCountitemPrint;// row.getCell(1).address;
      worksheet.getCell(itemCell).value = itemPrint.categoryName;
      worksheet.getCell(itemCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let detailsCell = "B" + costrowCountitemPrint;// row.getCell(1).address;
      worksheet.getCell(detailsCell).value = itemPrint.refCode;
      worksheet.getCell(detailsCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let codeCell = "C" + costrowCountitemPrint;// row.getCell(1).address;
      //worksheet.getCell(codeCell).value = itemPrint.code;
      worksheet.getCell(codeCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let priceCell = "D" + costrowCountitemPrint;// row.getCell(1).address;
      worksheet.getCell(priceCell).value = itemPrint.rate;
      worksheet.getCell(priceCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let yyCell = "E" + costrowCountitemPrint;// row.getCell(1).address;
      //worksheet.getCell(yyCell).value = itemPrint.yy;
      worksheet.getCell(yyCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let wastagePercentageCell = "F" + costrowCountitemPrint;// row.getCell(1).address;
      worksheet.getCell(wastagePercentageCell).value = itemPrint.consumption;
      worksheet.getCell(wastagePercentageCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let totalCell = "G" + costrowCountitemPrint;// row.getCell(1).address;
      worksheet.getCell(totalCell).value = null;
      worksheet.getCell(totalCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(totalCell).value = {
        formula:`(F${costrowCountitemPrint}*D${costrowCountitemPrint})`,
        date1904: false
      }



      
      printLastRow = costrowCountitemPrint;
      printRowCout++
    }
    var printSumRowCount = printLastRow + 1;
    let totalPrintValue = "G" + printSumRowCount;

    worksheet.getCell(totalPrintValue).value = null;
    worksheet.getCell(totalPrintValue).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell(totalPrintValue).value = {
      formula:`SUM(G${printFastRow}:G${printLastRow})`,
      date1904: false
    }



    //----------------------End Of Print Block---------------------//

    //----------------------Start of Accessories/Label-------------//

    var iterlining = partList[0].costingFabricsList.filter(x => x.category.toUpperCase() == "INTERLINING");
    console.log("iterlining",iterlining);

    debugger
    var AccessoriesData1 = partList[0].costAccessoriesList.filter(x => x.costCategoryGroup.toUpperCase() == "ACCESSORIES" || x.costCategoryGroup.toUpperCase() == "LABELS");
    console.log("AccessoriesData1", AccessoriesData1);
    for(let itemInrlinig of iterlining ){
      AccessoriesData1.push(itemInrlinig);
    }


    let a1 = worksheet.getCell("I17");
    a1.value = "TRIMS";
    a1.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }
    a1.font = {bold:true}
    // a1.fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: { argb: "ff000000" },
    //   bgColor: { argb: "" },
    // };

    let a2 = worksheet.getCell("J17");
    a2.value = "Trim code"
    a2.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }
    a2.font = {bold:true}
    // a2.fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: { argb: "ffb3b3b3" },
    //   bgColor: { argb: "" },
    // };

    let a3 = worksheet.getCell("K17");
    a3.value = "Supplier"
    a3.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }
    a3.font = {bold:true}
    // a3.fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: { argb: "ffb3b3b3" },
    //   bgColor: { argb: "" },
    // };


    let a4 = worksheet.getCell("L17");
    a4.value = "Price/Unit"
    a4.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }
    a4.font = {bold:true}
    // a4.fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: { argb: "ffb3b3b3" },
    //   bgColor: { argb: "" },
    // };

    let a5 = worksheet.getCell("M17");
    a5.value = ""
    a5.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }
    a5.font = {bold:true}
    // a5.fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: { argb: "ffb3b3b3" },
    //   bgColor: { argb: "" },
    // };

    let a6 = worksheet.getCell("N17");
    a6.value = "Qnty/Pc"
    a6.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }
    a6.font = {bold:true}
    // a6.fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: { argb: "ffb3b3b3" },
    //   bgColor: { argb: "" },
    // };

    let a7 = worksheet.getCell("O17");
    a7.value = "Wastage"
    a7.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }
    a7.font = {bold:true}
    // a7.fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: { argb: "ffb3b3b3" },
    //   bgColor: { argb: "" },
    // };

    let a8 = worksheet.getCell("P17");
    a8.value = "TOTAL"
    a8.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }
    a8.font = {bold:true}
    // a8.fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: { argb: "ffb3b3b3" },
    //   bgColor: { argb: "" },
    // };


    var accessoriesRowCout = 0
    var accessoriesFastRow = 16 + accessoriesRowCout + 2 ;
    var accessoriesLastRow = 16 + accessoriesRowCout + 2;
	
	for (var itemAccessories of AccessoriesData1) {
      var costrowCountitemAccessories = 16 + accessoriesRowCout + 2 ;
      let itemCell = "I" + costrowCountitemAccessories;// row.getCell(1).address;
      worksheet.getCell(itemCell).value = itemAccessories.itemName;
      worksheet.getCell(itemCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
	  
	  let codeCell = "J" + costrowCountitemAccessories;// row.getCell(1).address;
    worksheet.getCell(codeCell).value = itemAccessories.refCode;
      worksheet.getCell(codeCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
 
      let SupplierCell = "K" + costrowCountitemAccessories;// row.getCell(1).address;
      worksheet.getCell(SupplierCell).value = itemAccessories.supplierName;
      worksheet.getCell(SupplierCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      


      let priceCell = "L" + costrowCountitemAccessories;// row.getCell(1).address;
      worksheet.getCell(priceCell).value = itemAccessories.rate;
      worksheet.getCell(priceCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let unitNameCell = "M" + costrowCountitemAccessories;// row.getCell(1).address;
      worksheet.getCell(unitNameCell).value = itemAccessories.uomName;
      worksheet.getCell(unitNameCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let yyCell = "N" + costrowCountitemAccessories;// row.getCell(1).address;
      worksheet.getCell(yyCell).value = itemAccessories.consumption;
      worksheet.getCell(yyCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let wastagePercentageCell = "O" + costrowCountitemAccessories;// row.getCell(1).address;
      worksheet.getCell(wastagePercentageCell).value = `${itemAccessories.wastagePercentage}%`;
      worksheet.getCell(wastagePercentageCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
	  
	  

      let totalCell = "P" + costrowCountitemAccessories;// row.getCell(1).address;
      worksheet.getCell(totalCell).value = null;
      worksheet.getCell(totalCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(totalCell).value = {
        formula:`((L${costrowCountitemAccessories}*N${costrowCountitemAccessories})+ (L${costrowCountitemAccessories}*N${costrowCountitemAccessories})*O${costrowCountitemAccessories})`,
        date1904: false
      }


      
      accessoriesLastRow = costrowCountitemAccessories;
      accessoriesRowCout++
    }

  debugger
    var accessoriesSumRowCount = accessoriesLastRow + 1;
    let totalAccessoriesValue = "P" + accessoriesSumRowCount;

    worksheet.getCell(totalAccessoriesValue).value = null;
    worksheet.getCell(totalAccessoriesValue).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell(totalAccessoriesValue).value = {
      formula:`SUM(P${accessoriesFastRow}:P${accessoriesLastRow})`,
      date1904: false
    }

    //----------------------End of Accessories/Label---------------//


    //----------------------Start of Packing Block-----------------//

    var PackingData1 = partList[0].costAccessoriesList.filter(x => x.costCategoryGroup.toUpperCase() == "PACKING");
    console.log("PackingData1", PackingData1);

    var packingHeaderCount = 16 + accessoriesRowCout + 2 + 2;
    let p1 = "I" + packingHeaderCount;

    worksheet.getCell(p1).value = "PACKING";
    worksheet.getCell(p1).border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }
    worksheet.getCell(p1).font = {bold:true}
    //worksheet.getCell(p1).fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: { argb: "ff000000" },
    //   bgColor: { argb: "" },
    // };

    let p2 = "J" + packingHeaderCount;
    worksheet.getCell(p2).value = "Trim code"
    worksheet.getCell(p2).border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }
    worksheet.getCell(p2).font = {bold:true}
    // worksheet.getCell(p2).fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: { argb: "ffb3b3b3" },
    //   bgColor: { argb: "" },
    // };

    let p3 = "K" + packingHeaderCount;
    worksheet.getCell(p3).value = "Supplier"
    worksheet.getCell(p3).border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }
    worksheet.getCell(p3).font = {bold:true}
    // worksheet.getCell(p3).fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: { argb: "ffb3b3b3" },
    //   bgColor: { argb: "" },
    // };


    let p4 = "L" + packingHeaderCount;
    worksheet.getCell(p4).value = "Price/Unit"
    worksheet.getCell(p4).border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }
    worksheet.getCell(p4).font = {bold:true}
    // worksheet.getCell(p4).fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: { argb: "ffb3b3b3" },
    //   bgColor: { argb: "" },
    // };

    let p5 = "M" + packingHeaderCount;
    worksheet.getCell(p5).value = ""
    worksheet.getCell(p5).border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }
    worksheet.getCell(p5).font = {bold:true}
    // worksheet.getCell(p5).fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: { argb: "ffb3b3b3" },
    //   bgColor: { argb: "" },
    // };

    let p6 = "N" + packingHeaderCount;
    worksheet.getCell(p6).value = "Qnty/Pc"
    worksheet.getCell(p6).border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }
    worksheet.getCell(p6).font = {bold:true}
    // worksheet.getCell(p6).fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: { argb: "ffb3b3b3" },
    //   bgColor: { argb: "" },
    // };

    let p7 = "O" + packingHeaderCount;
    worksheet.getCell(p7).value = "Wastage"
    worksheet.getCell(p7).border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }
    worksheet.getCell(p7).font = {bold:true}
    // worksheet.getCell(p7).fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: { argb: "ffb3b3b3" },
    //   bgColor: { argb: "" },
    // };

    let p8 = "P" + packingHeaderCount;
    worksheet.getCell(p8).value = "TOTAL"
    worksheet.getCell(p8).border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'medium' },
      right: { style: 'medium' }
    }
    worksheet.getCell(p8).font = {bold:true}
    // worksheet.getCell(p8).fill = {
    //   type: "pattern",
    //   pattern: "solid",
    //   fgColor: { argb: "ffb3b3b3" },
    //   bgColor: { argb: "" },
    // };

    var packingRowCout = 0
    var packingFastRow = 16 + accessoriesRowCout + 2 + 2 + packingRowCout +1 ;
    var packingLastRow = 16 + accessoriesRowCout + 2 + 2 + packingRowCout +1 ;
	
	for (var itemPacking of PackingData1) {
      var costrowCountitemPacking = 16 + accessoriesRowCout + 2 + 2 + packingRowCout +1;
      let itemCell = "I" + costrowCountitemPacking;// row.getCell(1).address;
      worksheet.getCell(itemCell).value = itemPacking.itemName;
      worksheet.getCell(itemCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
	  
	  let codeCell = "J" + costrowCountitemPacking;// row.getCell(1).address;
    worksheet.getCell(codeCell).value = itemPacking.refCode;
      worksheet.getCell(codeCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
 
      let SupplierCell = "K" + costrowCountitemPacking;// row.getCell(1).address;
      worksheet.getCell(SupplierCell).value = itemPacking.supplierName;
      worksheet.getCell(SupplierCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      


      let priceCell = "L" + costrowCountitemPacking;// row.getCell(1).address;
      worksheet.getCell(priceCell).value = itemPacking.rate;
      worksheet.getCell(priceCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let unitNameCell = "M" + costrowCountitemPacking;// row.getCell(1).address;
      worksheet.getCell(unitNameCell).value = itemPacking.uomName;
      worksheet.getCell(unitNameCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let yyCell = "N" + costrowCountitemPacking;// row.getCell(1).address;
      worksheet.getCell(yyCell).value = itemPacking.consumption;
      worksheet.getCell(yyCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let wastagePercentageCell = "O" + costrowCountitemPacking;// row.getCell(1).address;
      worksheet.getCell(wastagePercentageCell).value = `${itemPacking.wastagePercentage}%`;
      worksheet.getCell(wastagePercentageCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
	  
	  

      let totalCell = "P" + costrowCountitemPacking;// row.getCell(1).address;
      worksheet.getCell(totalCell).value = null;
      worksheet.getCell(totalCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(totalCell).value = {
        formula:`((L${costrowCountitemPacking}*N${costrowCountitemPacking})+ (L${costrowCountitemPacking}*N${costrowCountitemPacking})*O${costrowCountitemPacking})`,
        date1904: false
      }
      
      packingLastRow = costrowCountitemPacking;
      packingRowCout++
    }

    debugger
    var packingSumRowCount = packingLastRow + 1;
    let totalPackingValue = "P" + packingSumRowCount;

    worksheet.getCell(totalPackingValue).value = null;
    worksheet.getCell(totalPackingValue).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell(totalPackingValue).value = {
      formula:`SUM(P${packingFastRow}:P${packingLastRow})`,
      date1904: false
    }

    //----------------------End of Packing Block-------------------//


    //-------------------Start Cost breakdown Summry Block---------//


    
     EmbroideryPrintValue.value = {
      formula:`${totalPrintValue}`,
      date1904: false
    }
     BasicTrimsValue.value  = {
      formula:`${totalAccessoriesValue}`,
      date1904: false
    }
     PackingValue.value  = {
      formula:`${totalPackingValue}`,
      date1904: false
    }
     WashingValue.value  = {
      formula:`${totalWashValue}`,
      date1904: false
    }
     FobValue.value  = {
      formula:`SUM(${CMValue.address}:${WashingValue.address})`,
      date1904: false
    }
     CommercialCostValue.value= {
      formula:`(${CMValue.address}+${FabricValue.address}+${TrimFabricValue.address}+${PocketingValue.address}+${BasicTrimsValue.address}+${PackingValue.address}+${WashingValue.address})*2%`,
      date1904: false
    }
     TotalFobValue.value = {
      formula :`SUM(${FobValue.address}:${CommercialCostValue.address})`,
      date1904: false
     }
     debugger
    //  let prec = `${precentLable.value}`;
    //  let finalPrec = 1 - (parseFloat(prec))/100);
     totalCostValue.value = {
      formula: `${TotalFobValue.address}/(1-${precentLable.address})`,
      date1904 : false
     }
    //-------------------End Cost breakdown Summry Block-----------//



    worksheet.columns.forEach(function (column, i) {
      // debugger
     if (i == 0 || i == 1 || i == 8  || i == 10 ) {
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

