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
export class BreneCostingSummaryService {
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


  async exportBerneExcelSummaryReport(excelData) {
    //debugger
    const title = excelData.title;
    const allData = excelData.finallySubmitData;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(
      "Costing Summary Report"
    );
    const stockHeaderItem = [
      "Style Part",
      "Cost Head",
      "Particulars",
      "Amount USD/pc",
      "Amount USD/DZ",
      "Percent (%)",
      "Total (%)",
    ];



    var partList = allData.filter((a, i) => allData.findIndex((s) => a.stylePartId === s.stylePartId) === i);

    //var part1CostingSummaryReportCm = partList[0].costing


    worksheet.mergeCells("A1", "B1");
    let partName = worksheet.getCell("A1");
    partName.value = allData[0].partName;
    partName.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "#ffff00" },
    };
    partName.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    partName.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "0DCFD5" },
      bgColor: { argb: "" },
    };
    partName.alignment = { vertical: "middle", horizontal: "center" };

    let cpm1 = worksheet.getCell("A2");
    cpm1.value = "CPM";
    cpm1.font = {
      name: "Calibri",
      size: 12,
      //bold: true,
      color: { argb: "#ffff00" },
    };
    cpm1.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    cpm1.alignment = { vertical: "middle", horizontal: "left" };


    let cpm1Value = worksheet.getCell("B2");
    cpm1Value.value = allData[0].costingSummaryReportCm[0].cpm;
    cpm1Value.font = {
      name: "Calibri",
      size: 12,
      // bold: true,
      color: { argb: "#ffff00" },
    };
    cpm1Value.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    cpm1Value.alignment = { vertical: "middle", horizontal: "left" };

    let ppm1 = worksheet.getCell("A3");
    ppm1.value = "PPM";
    ppm1.font = {
      name: "Calibri",
      size: 12,
      //bold: true,
      color: { argb: "#ffff00" },
    };
    ppm1.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    ppm1.alignment = { vertical: "middle", horizontal: "left" };


    let ppm1Name = worksheet.getCell("B3");
    ppm1Name.value = allData[0].costingSummaryReportCm[0].ppm;
    ppm1Name.font = {
      name: "Calibri",
      size: 12,
      //bold: true,
      color: { argb: "#ffff00" },
    };
    ppm1Name.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    ppm1Name.alignment = { vertical: "middle", horizontal: "left" };


    let smv1 = worksheet.getCell("A4");
    smv1.value = "SMV";
    smv1.font = {
      name: "Calibri",
      size: 12,
      //bold: true,
      color: { argb: "#ffff00" },
    };
    smv1.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    smv1.alignment = { vertical: "middle", horizontal: "left" };


    let smv1Value = worksheet.getCell("B4");
    smv1Value.value = allData[0].costingSummaryReportCm[0].smv;
    smv1Value.font = {
      name: "Calibri",
      size: 12,
      //bold: true,
      color: { argb: "#ffff00" },
    };
    smv1Value.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    smv1Value.alignment = { vertical: "middle", horizontal: "left" };


    let efficency1 = worksheet.getCell("A5");
    efficency1.value = "Eff%";
    efficency1.font = {
      name: "Calibri",
      size: 12,
      //bold: true,
      color: { argb: "#ffff00" },
    };
    efficency1.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    efficency1.alignment = { vertical: "middle", horizontal: "left" };


    let efficency1Value = worksheet.getCell("B5");
    efficency1Value.value = allData[0].costingSummaryReportCm[0].efficency;
    efficency1Value.font = {
      name: "Calibri",
      size: 12,
      //bold: true,
      color: { argb: "#ffff00" },
    };
    efficency1Value.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    efficency1Value.alignment = { vertical: "middle", horizontal: "left" };



    let cmPc1 = worksheet.getCell("A6");
    cmPc1.value = "CM/Pc";
    cmPc1.font = {
      name: "Calibri",
      size: 12,
      //bold: true,
      color: { argb: "#ffff00" },
    };
    cmPc1.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    cmPc1.alignment = { vertical: "middle", horizontal: "left" };


    let cmPc1Value = worksheet.getCell("B6");
    cmPc1Value.value = allData[0].costingSummaryReportCm[0].cmPc;
    cmPc1Value.font = {
      name: "Calibri",
      size: 12,
      //bold: true,
      color: { argb: "#ffff00" },
    };
    cmPc1Value.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    cmPc1Value.alignment = { vertical: "middle", horizontal: "left" };

    let fobPc1 = worksheet.getCell("A7");
    fobPc1.value = "FOB/Pc";
    fobPc1.font = {
      name: "Calibri",
      size: 12,
      //bold: true,
      color: { argb: "#ffff00" },
    };
    fobPc1.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    fobPc1.alignment = { vertical: "middle", horizontal: "left" };


    let fobPc1Value = worksheet.getCell("B7");
    fobPc1Value.value = allData[0].costingSummaryReportCm[0].fobPc;
    fobPc1Value.font = {
      name: "Calibri",
      size: 12,
      //bold: true,
      color: { argb: "#ffff00" },
    };
    fobPc1Value.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    fobPc1Value.alignment = { vertical: "middle", horizontal: "left" };


    let targetFob1 = worksheet.getCell("A8");
    targetFob1.value = "Trgt.FOB";
    targetFob1.font = {
      name: "Calibri",
      size: 12,
      //bold: true,
      color: { argb: "#ffff00" },
    };
    targetFob1.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    targetFob1.alignment = { vertical: "middle", horizontal: "left" };


    let targetFob1Value = worksheet.getCell("B8");
    targetFob1Value.value = allData[0].costingSummaryReportCm[0].smv;
    targetFob1Value.font = {
      name: "Calibri",
      size: 12,
      //bold: true,
      color: { argb: "#ffff00" },
    };
    targetFob1Value.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    targetFob1Value.alignment = { vertical: "middle", horizontal: "left" };

    debugger
    if (partList.length > 1) {
      worksheet.mergeCells("D1", "E1");
      let partName2 = worksheet.getCell("D1");
      partName2.value = allData[1].partName;
      partName2.font = {
        name: "Calibri",
        size: 16,
        bold: true,
        color: { argb: "#ffff00" },
      };
      partName2.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      partName2.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "0DCFD5" },
        bgColor: { argb: "" },
      };
      partName2.alignment = { vertical: "middle", horizontal: "center" };

      let cpm2 = worksheet.getCell("D2");
      cpm2.value = "CPM";
      cpm2.font = {
        name: "Calibri",
        size: 12,
        //bold: true,
        color: { argb: "#ffff00" },
      };
      cpm2.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      cpm2.alignment = { vertical: "middle", horizontal: "left" };


      let cpm2Value = worksheet.getCell("E2");
      cpm2Value.value = allData[0].costingSummaryReportCm[1].cpm;
      cpm2Value.font = {
        name: "Calibri",
        size: 12,
        //bold: true,
        color: { argb: "#ffff00" },
      };
      cpm2Value.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      cpm2Value.alignment = { vertical: "middle", horizontal: "left" };

      let ppm2 = worksheet.getCell("D3");
      ppm2.value = "PPM";
      ppm2.font = {
        name: "Calibri",
        size: 12,
        //bold: true,
        color: { argb: "#ffff00" },
      };
      ppm2.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      ppm2.alignment = { vertical: "middle", horizontal: "left" };


      let ppm2Value = worksheet.getCell("E3");
      ppm2Value.value = allData[0].costingSummaryReportCm[1].ppm;
      ppm2Value.font = {
        name: "Calibri",
        size: 12,
        //bold: true,
        color: { argb: "#ffff00" },
      };
      ppm2Value.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      ppm2Value.alignment = { vertical: "middle", horizontal: "left" };


      let smv2 = worksheet.getCell("D4");
      smv2.value = "SMV";
      smv2.font = {
        name: "Calibri",
        size: 12,
        //bold: true,
        color: { argb: "#ffff00" },
      };
      smv2.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      smv2.alignment = { vertical: "middle", horizontal: "left" };


      let smv2Value = worksheet.getCell("E4");
      smv2Value.value = allData[0].costingSummaryReportCm[1].smv;
      smv2Value.font = {
        name: "Calibri",
        size: 12,
        //bold: true,
        color: { argb: "#ffff00" },
      };
      smv2Value.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      smv2Value.alignment = { vertical: "middle", horizontal: "left" };


      let efficency2 = worksheet.getCell("D5");
      efficency2.value = "Eff%";
      efficency2.font = {
        name: "Calibri",
        size: 12,
        //bold: true,
        color: { argb: "#ffff00" },
      };
      efficency2.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      efficency2.alignment = { vertical: "middle", horizontal: "left" };


      let efficency2Value = worksheet.getCell("E5");
      efficency2Value.value = allData[0].costingSummaryReportCm[1].efficency;
      efficency2Value.font = {
        name: "Calibri",
        size: 12,
        //bold: true,
        color: { argb: "#ffff00" },
      };
      efficency2Value.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      efficency2Value.alignment = { vertical: "middle", horizontal: "left" };



      let cmPc2 = worksheet.getCell("D6");
      cmPc2.value = "CM/Pc";
      cmPc2.font = {
        name: "Calibri",
        size: 12,
        //bold: true,
        color: { argb: "#ffff00" },
      };
      cmPc2.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      cmPc2.alignment = { vertical: "middle", horizontal: "left" };


      let cmPc2Value = worksheet.getCell("E6");
      cmPc2Value.value = allData[0].costingSummaryReportCm[1].cmPc;
      cmPc2Value.font = {
        name: "Calibri",
        size: 12,
        //bold: true,
        color: { argb: "#ffff00" },
      };
      cmPc2Value.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      cmPc2Value.alignment = { vertical: "middle", horizontal: "left" };

      let fobPc2 = worksheet.getCell("D7");
      fobPc2.value = "FOB/Pc";
      fobPc2.font = {
        name: "Calibri",
        size: 12,
        //bold: true,
        color: { argb: "#ffff00" },
      };
      fobPc2.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      fobPc2.alignment = { vertical: "middle", horizontal: "left" };


      let fobPc2Value = worksheet.getCell("E7");
      fobPc2Value.value = allData[0].costingSummaryReportCm[1].fobPc;
      fobPc2Value.font = {
        name: "Calibri",
        size: 12,
        //bold: true,
        color: { argb: "#ffff00" },
      };
      fobPc2Value.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      fobPc2Value.alignment = { vertical: "middle", horizontal: "left" };


      let targetFob2 = worksheet.getCell("D8");
      targetFob2.value = "Trgt.FOB";
      targetFob2.font = {
        name: "Calibri",
        size: 12,
        //bold: true,
        color: { argb: "#ffff00" },
      };
      targetFob2.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      targetFob2.alignment = { vertical: "middle", horizontal: "left" };


      let targetFob2Value = worksheet.getCell("E8");
      targetFob2Value.value = allData[0].costingSummaryReportCm[1].smv;
      targetFob2Value.font = {
        name: "Calibri",
        size: 12,
        //bold: true,
        color: { argb: "#ffff00" },
      };
      targetFob2Value.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      targetFob2Value.alignment = { vertical: "middle", horizontal: "left" };
    }


    ////-----ssunnerry----------------////

    worksheet.mergeCells("G1", "J1");
    let Name = worksheet.getCell("G1");
    Name.value = "SUMMERY";
    Name.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "#ffff00" },
    };
    Name.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    Name.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "0DCFD5" },
      bgColor: { argb: "" },
    };
    Name.alignment = { vertical: "middle", horizontal: "center" };

    let SummaryHeader1 = worksheet.getCell("G2");
    SummaryHeader1.value = "";
    SummaryHeader1.font = {
      name: "Calibri",
      size: 12,
      //bold: true,
      color: { argb: "#ffff00" },
    };
    SummaryHeader1.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    SummaryHeader1.alignment = { vertical: "middle", horizontal: "left" };


    let SummaryHeader2 = worksheet.getCell("H2");
    SummaryHeader2.value = "%";
    SummaryHeader2.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "BD0606" },
    };
    SummaryHeader2.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    SummaryHeader2.alignment = { vertical: "middle", horizontal: "left" };

    let SummaryHeader3 = worksheet.getCell("I2");
    SummaryHeader3.value = "PC";
    SummaryHeader3.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "BD0606" },
    };
    SummaryHeader3.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    SummaryHeader3.alignment = { vertical: "middle", horizontal: "left" };
    
    let SummaryHeader4 = worksheet.getCell("J2");
    SummaryHeader4.value = "DZ";
    SummaryHeader4.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "BD0606" },
    };
    SummaryHeader4.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    SummaryHeader4.alignment = { vertical: "middle", horizontal: "left" };

 
    let McostHeader = worksheet.getCell("G3");
    McostHeader.value = "M.COST";
    McostHeader.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    };
    McostHeader.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    McostHeader.alignment = { vertical: "middle", horizontal: "left" };


    let mcostPer = worksheet.getCell("H3");
    mcostPer.value = allData[0].materialCostPer;
    mcostPer.font = {
      name: "Calibri",
      size: 12,
      //bold: true,
      color: { argb: "#ffff00" },
    };
    mcostPer.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    mcostPer.alignment = { vertical: "middle", horizontal: "left" };

    let mcostPc = worksheet.getCell("I3");
    mcostPc.value = allData[0].materialCostPc;
    mcostPc.font = {
      name: "Calibri",
      size: 12,
      //bold: true,
      color: { argb: "#ffff00" },
    };
    mcostPc.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    mcostPc.alignment = { vertical: "middle", horizontal: "left" };
    
    let mcostDz = worksheet.getCell("J3");
    mcostDz.value = allData[0].materialCostDz;
    mcostDz.font = {
      name: "Calibri",
      size: 12,
      //bold: true,
      color: { argb: "#ffff00" },
    };
    mcostDz.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    mcostDz.alignment = { vertical: "middle", horizontal: "left" };


  let CmHeader = worksheet.getCell("G4");
    CmHeader.value = "CM";
    CmHeader.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    };
    CmHeader.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    CmHeader.alignment = { vertical: "middle", horizontal: "left" };


    let CMPer = worksheet.getCell("H4");
    CMPer.value = allData[0].cmPer;
    CMPer.font = {
      name: "Calibri",
      size: 12,
      //bold: true,
      color: { argb: "#ffff00" },
    };
    CMPer.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    CMPer.alignment = { vertical: "middle", horizontal: "left" };

    let CMPc = worksheet.getCell("I4");
    CMPc.value = allData[0].cmPc;
    CMPc.font = {
      name: "Calibri",
      size: 12,
      //bold: true,
      color: { argb: "#ffff00" },
    };
    CMPc.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    CMPc.alignment = { vertical: "middle", horizontal: "left" };
    
    let CMDz = worksheet.getCell("J4");
    CMDz.value = allData[0].cmDz;
    CMDz.font = {
      name: "Calibri",
      size: 12,
      //bold: true,
      color: { argb: "#ffff00" },
    };
    CMDz.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    CMDz.alignment = { vertical: "middle", horizontal: "left" };



   let factoryCostHeader = worksheet.getCell("G5");
   factoryCostHeader.value = "FACTORY COST";
   factoryCostHeader.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    };
    factoryCostHeader.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    factoryCostHeader.alignment = { vertical: "middle", horizontal: "left" };


    let factoryCostPer = worksheet.getCell("H5");
    factoryCostPer.value = allData[0].factoryCostPer;
    factoryCostPer.font = {
      name: "Calibri",
      size: 12,
      //bold: true,
      color: { argb: "#ffff00" },
    };
    factoryCostPer.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    factoryCostPer.alignment = { vertical: "middle", horizontal: "left" };

    let factoryCostPc = worksheet.getCell("I5");
    factoryCostPc.value = allData[0].factoryCostPc;
    factoryCostPc.font = {
      name: "Calibri",
      size: 12,
      //bold: true,
      color: { argb: "#ffff00" },
    };
    factoryCostPc.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    factoryCostPc.alignment = { vertical: "middle", horizontal: "left" };
    
    let factoryCostDz = worksheet.getCell("J5");
    factoryCostDz.value = allData[0].factoryCostDz;
    factoryCostDz.font = {
      name: "Calibri",
      size: 12,
      //bold: true,
      color: { argb: "#ffff00" },
    };
    factoryCostDz.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    factoryCostDz.alignment = { vertical: "middle", horizontal: "left" };




    let ProfitHeader = worksheet.getCell("G6");
    ProfitHeader.value = "PROFIT%";
    ProfitHeader.font = {
       name: "Calibri",
       size: 12,
       bold: true,
       color: { argb: "#ffff00" },
     };
     ProfitHeader.border = {
       top: { style: 'thin' },
       bottom: { style: 'thin' },
       left: { style: 'thin' },
       right: { style: 'thin' }
     }
     ProfitHeader.alignment = { vertical: "middle", horizontal: "left" };
 
 
     let ProfitCostPer = worksheet.getCell("H6");
     ProfitCostPer.value =  allData[0].profitPer;
     ProfitCostPer.font = {
       name: "Calibri",
       size: 12,
       //bold: true,
       color: { argb: "#ffff00" },
     };
     ProfitCostPer.border = {
       top: { style: 'thin' },
       bottom: { style: 'thin' },
       left: { style: 'thin' },
       right: { style: 'thin' }
     }
     ProfitCostPer.alignment = { vertical: "middle", horizontal: "left" };
 
     let ProfitCostPc = worksheet.getCell("I6");
     ProfitCostPc.value = allData[0].profitPc;
     ProfitCostPc.font = {
       name: "Calibri",
       size: 12,
       //bold: true,
       color: { argb: "#ffff00" },
     };
     ProfitCostPc.border = {
       top: { style: 'thin' },
       bottom: { style: 'thin' },
       left: { style: 'thin' },
       right: { style: 'thin' }
     }
     ProfitCostPc.alignment = { vertical: "middle", horizontal: "left" };
     
     let ProfitCostDz = worksheet.getCell("J6");
     ProfitCostDz.value = allData[0].profitDz;
     ProfitCostDz.font = {
       name: "Calibri",
       size: 12,
       //bold: true,
       color: { argb: "#ffff00" },
     };
     ProfitCostDz.border = {
       top: { style: 'thin' },
       bottom: { style: 'thin' },
       left: { style: 'thin' },
       right: { style: 'thin' }
     }
     ProfitCostDz.alignment = { vertical: "middle", horizontal: "left" };


    let CommissonHeader = worksheet.getCell("G7");
    CommissonHeader.value = "COM%";
    CommissonHeader.font = {
       name: "Calibri",
       size: 12,
       bold: true,
       color: { argb: "#ffff00" },
     };
     CommissonHeader.border = {
       top: { style: 'thin' },
       bottom: { style: 'thin' },
       left: { style: 'thin' },
       right: { style: 'thin' }
     }
     CommissonHeader.alignment = { vertical: "middle", horizontal: "left" };
 
 
     let CommissonCostPer = worksheet.getCell("H7");
     CommissonCostPer.value =  allData[0].commissionPer;
     CommissonCostPer.font = {
       name: "Calibri",
       size: 12,
       //bold: true,
       color: { argb: "#ffff00" },
     };
     CommissonCostPer.border = {
       top: { style: 'thin' },
       bottom: { style: 'thin' },
       left: { style: 'thin' },
       right: { style: 'thin' }
     }
     CommissonCostPer.alignment = { vertical: "middle", horizontal: "left" };
 
     let commissionCostPc = worksheet.getCell("I7");
     commissionCostPc.value = allData[0].commissionPc;
     commissionCostPc.font = {
       name: "Calibri",
       size: 12,
       //bold: true,
       color: { argb: "#ffff00" },
     };
     commissionCostPc.border = {
       top: { style: 'thin' },
       bottom: { style: 'thin' },
       left: { style: 'thin' },
       right: { style: 'thin' }
     }
     commissionCostPc.alignment = { vertical: "middle", horizontal: "left" };
     
     let commissionCosDz = worksheet.getCell("J7");
     commissionCosDz.value = allData[0].commissionDz;
     commissionCosDz.font = {
       name: "Calibri",
       size: 12,
       //bold: true,
       color: { argb: "#ffff00" },
     };
     commissionCosDz.border = {
       top: { style: 'thin' },
       bottom: { style: 'thin' },
       left: { style: 'thin' },
       right: { style: 'thin' }
     }
     commissionCosDz.alignment = { vertical: "middle", horizontal: "left" };


     let OtherHeader = worksheet.getCell("G8");
     OtherHeader.value = "OTHERS";
     OtherHeader.font = {
       name: "Calibri",
       size: 12,
       bold: true,
       color: { argb: "#ffff00" },
     };
     OtherHeader.border = {
       top: { style: 'thin' },
       bottom: { style: 'thin' },
       left: { style: 'thin' },
       right: { style: 'thin' }
     }
     OtherHeader.alignment = { vertical: "middle", horizontal: "left" };
 
 
     let OthersCostPer = worksheet.getCell("H8");
     OthersCostPer.value = allData[0].othersPer;
     OthersCostPer.font = {
       name: "Calibri",
       size: 12,
       //bold: true,
       color: { argb: "#ffff00" },
     };
     OthersCostPer.border = {
       top: { style: 'thin' },
       bottom: { style: 'thin' },
       left: { style: 'thin' },
       right: { style: 'thin' }
     }
     OthersCostPer.alignment = { vertical: "middle", horizontal: "left" };
 
     let OthersCostPc = worksheet.getCell("I8");
     OthersCostPc.value = allData[0].othersPc;
     OthersCostPc.font = {
       name: "Calibri",
       size: 12,
       //bold: true,
       color: { argb: "#ffff00" },
     };
     OthersCostPc.border = {
       top: { style: 'thin' },
       bottom: { style: 'thin' },
       left: { style: 'thin' },
       right: { style: 'thin' }
     }
     OthersCostPc.alignment = { vertical: "middle", horizontal: "left" };
     
     let OtherHeaderDz = worksheet.getCell("J8");
     OtherHeaderDz.value = allData[0].othersDz;
     OtherHeaderDz.font = {
       name: "Calibri",
       size: 12,
       //bold: true,
       color: { argb: "#ffff00" },
     };
     OtherHeaderDz.border = {
       top: { style: 'thin' },
       bottom: { style: 'thin' },
       left: { style: 'thin' },
       right: { style: 'thin' }
     }
     OtherHeaderDz.alignment = { vertical: "middle", horizontal: "left" };


     /////////------------

     let NetFobHeader = worksheet.getCell("G9");
     NetFobHeader.value = "NET FOB";
     NetFobHeader.font = {
       name: "Calibri",
       size: 12,
       bold: true,
       color: { argb: "#ffff00" },
     };
     NetFobHeader.border = {
       top: { style: 'thin' },
       bottom: { style: 'thin' },
       left: { style: 'thin' },
       right: { style: 'thin' }
     }
     NetFobHeader.alignment = { vertical: "middle", horizontal: "left" };

     let NetFobCostPer = worksheet.getCell("H9");
     NetFobCostPer.value = allData[0].netFobPer;
     NetFobCostPer.font = {
       name: "Calibri",
       size: 12,
       //bold: true,
       color: { argb: "#ffff00" },
     };
     NetFobCostPer.border = {
       top: { style: 'thin' },
       bottom: { style: 'thin' },
       left: { style: 'thin' },
       right: { style: 'thin' }
     }
     NetFobCostPer.alignment = { vertical: "middle", horizontal: "left" };
 
     let NetFobCostPc = worksheet.getCell("I9");
     NetFobCostPc.value = allData[0].netFobPc;
     NetFobCostPc.font = {
       name: "Calibri",
       size: 12,
       bold: true,
       color: { argb: "ff0000" },
     };
     NetFobCostPc.border = {
       top: { style: 'thin' },
       bottom: { style: 'thin' },
       left: { style: 'thin' },
       right: { style: 'thin' }
     }
     NetFobCostPc.alignment = { vertical: "middle", horizontal: "left" };
     
     let NetFobDz = worksheet.getCell("J9");
     NetFobDz.value = allData[0].netFobDz;
     NetFobDz.font = {
       name: "Calibri",
       size: 12,
       //bold: true,
       color: { argb: "#ffff00" },
     };
     NetFobDz.border = {
       top: { style: 'thin' },
       bottom: { style: 'thin' },
       left: { style: 'thin' },
       right: { style: 'thin' }
     }
     NetFobDz.alignment = { vertical: "middle", horizontal: "left" };

    ////-------------enne


    if (allData[0].fileStatus == "Y") {
      debugger
      var url = environment.fileUrl + allData[0].filePath;
      //var image = await this.imageUrlToBase64(url);
      //var image1 = await this.toDataURL(url);
      let myLogoImage = workbook.addImage({
        base64: allData[0].imageBase64,
        extension: 'jpeg',
      });

        worksheet.addImage(myLogoImage, 'L2:M7');

    }

    worksheet.addRow([]);
    //worksheet.addRow([]);
    // let dataTypeFabCell1 = "A" + 6;
    // //worksheet.getCell(dataTypeFabCell1).value = "FABRICS";

    //debugger
    let headerRowFabcric1 = worksheet.addRow(stockHeaderItem);
    headerRowFabcric1.eachCell((cell, number) => {
      // cell.fill = {
      //   type: "pattern",
      //   pattern: "solid",
      //   fgColor: { argb: "4167B8" },
      //   bgColor: { argb: "" },
      // };
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




    //var fistPartData = allData.filter(x => x.stylePartId == partList[0].stylePartId);
    var costingSummaryReportItemData = allData[0].costingSummaryReportItem.filter(x => x.stylePartId == partList[0].stylePartId)


    var materialCost = costingSummaryReportItemData.filter(x => x.groupName == "MATERIAL COST");
    var processOrCmCost = costingSummaryReportItemData.filter(x => x.groupName == "PROCESS" || x.groupName =="CM");
    var commissionCost = costingSummaryReportItemData.filter(x => x.groupName == "COMMISSION");
    var profitCost = costingSummaryReportItemData.filter(x => x.groupName == "PROFIT");

    var dataForFirstPartMCost = [];
    var dataForExcelForFirstPartMCost = [];
    for (var itemPart11 of materialCost) {
      var objItem11 = {
        partName: itemPart11.partName,
        groupName: itemPart11.groupName,
        costCategoryGroup: itemPart11.costCategoryGroup,
        totalQty: itemPart11.totalQty,
        totalDznQty: parseFloat(itemPart11.totalDznQty) ,
      };
      dataForFirstPartMCost.push(objItem11);
    }

    if(materialCost.filter(x => x.costCategoryGroup == "PACKING").length == 0){
      var objItemPac1 = {
        partName: partList[1].partName,
        groupName: "",
        costCategoryGroup: "PACKING",
        totalQty: 0,
        totalDznQty: 0 ,
      };
      dataForFirstPartMCost.push(objItemPac1);
    }


    dataForFirstPartMCost.forEach((row: any) => {
      dataForExcelForFirstPartMCost.push(Object.values(row));
    });


    var c11 = 0
    var firstPartFirstRow11 = 11 + c11 + 1;
    var firstPartLastRow11 = 11 + c11 + 1;
    for (var itemPart11 of dataForExcelForFirstPartMCost) {
      debugger
      var costrowCountitemFirstPart = 11 + c11 + 1;

      let stylePartCell = "A" + costrowCountitemFirstPart;// row.getCell(1).address;
      worksheet.getCell(stylePartCell).value = itemPart11[0];
      worksheet.getCell(stylePartCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let costHeadCell = "B" + costrowCountitemFirstPart; //row.getCell(4).address;
      worksheet.getCell(costHeadCell).value = itemPart11[1];
      worksheet.getCell(costHeadCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let particularsCell = "C" + costrowCountitemFirstPart; //row.getCell(5).address;
      worksheet.getCell(particularsCell).value = itemPart11[2];
      worksheet.getCell(particularsCell).border = {
        top: { style: 'thin' },
         bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      if(itemPart11[2]=='FABRIC'){
        worksheet.getCell(particularsCell).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "CEE4B0" },
          bgColor: { argb: "" },
        };
      }
      else if(itemPart11[2]=='ACCESSORIES'){
        worksheet.getCell(particularsCell).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "E1A094" },
          bgColor: { argb: "" },
        };
      }
      else if(itemPart11[2]=='LABELS')
      {
          worksheet.getCell(particularsCell).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "F1A738" },
            bgColor: { argb: "" },
          };
      }

        worksheet.getCell(particularsCell).font = {
          //bold: true,
          color: { argb: "#ffff00" },
          size: 12,
        };
      

      let amountPcCell = "D" + costrowCountitemFirstPart; //row.getCell(5).address;
      worksheet.getCell(amountPcCell).value = itemPart11[3];
      worksheet.getCell(amountPcCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let amountDzCell = "E" + costrowCountitemFirstPart; //row.getCell(5).address;
      worksheet.getCell(amountDzCell).value = itemPart11[4];
      worksheet.getCell(amountDzCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let percentCell = "F" + costrowCountitemFirstPart;// row.getCell(3).address;
      worksheet.getCell(percentCell).value = itemPart11[5];
        worksheet.getCell(percentCell).border = {
          top: { style: 'thin' },
           bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        var totalQtySubPartwise = costingSummaryReportItemData.filter(x => x.groupName != "PROFIT").reduce((sum, list) => sum + list.totalQty, 0);
        worksheet.getCell(percentCell).value = {
          formula: `(D${costrowCountitemFirstPart}/${totalQtySubPartwise})*100`,
          date1904: false
        }


        let totalCell = "G" + costrowCountitemFirstPart;// row.getCell(3).address;
        worksheet.getCell(totalCell).value = itemPart11[6];
          worksheet.getCell(totalCell).border = {
            top: { style: 'thin' },
             bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          if(costrowCountitemFirstPart == firstPartFirstRow11){
            var totalQtyDobulepart = allData[0].costingSummaryReportItem.filter(x => x.groupName != "PROFIT").reduce((sum, list) => sum + list.totalQty, 0);
            worksheet.getCell(totalCell).value = {
              formula: `(${totalQtySubPartwise}/${totalQtyDobulepart})*100`,
              date1904: false
            }
          }


       firstPartLastRow11 = costrowCountitemFirstPart;
       c11++
    }

    var subTotalMaterialCostRow = firstPartLastRow11 + 1
    let subtotalCell11 = "C" + subTotalMaterialCostRow;// row.getCell(3).address;
    worksheet.getCell(subtotalCell11).value =  "Sub Total :"
    worksheet.getCell(subtotalCell11).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell(subtotalCell11).font = {
      bold: true,
      color: { argb: "#ffff00" },
      size: 12,
    };

    let subtotalPcCell11 = "D" + subTotalMaterialCostRow;// row.getCell(3).address;
   // worksheet.getCell(subtotalCell12).value =  
    worksheet.getCell(subtotalPcCell11).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell(subtotalPcCell11).font = {
      bold: true,
      color: { argb: "#ffff00" },
      size: 12,
    };
    worksheet.getCell(subtotalPcCell11).value = {
      formula: `SUM(D${firstPartFirstRow11}:D${firstPartLastRow11})`,
      date1904: false
    }

    let subtotalDzCell11 = "E" + subTotalMaterialCostRow;// row.getCell(3).address;
    // worksheet.getCell(subtotalCell12).value =  
     worksheet.getCell(subtotalDzCell11).border = {
       top: { style: 'thin' },
       bottom: { style: 'thin' },
       left: { style: 'thin' },
       right: { style: 'thin' }
     }
     worksheet.getCell(subtotalDzCell11).font = {
      bold: true,
      color: { argb: "#ffff00" },
      size: 12,
    };
     worksheet.getCell(subtotalDzCell11).value = {
      formula: `SUM(E${firstPartFirstRow11}:E${firstPartLastRow11})`,
      date1904: false
    }

    let subtotalPercntCell11 = "F" + subTotalMaterialCostRow;// row.getCell(3).address;
    // worksheet.getCell(subtotalCell12).value =  
     worksheet.getCell(subtotalPercntCell11).border = {
       top: { style: 'thin' },
       bottom: { style: 'thin' },
       left: { style: 'thin' },
       right: { style: 'thin' }
     }
     worksheet.getCell(subtotalPercntCell11).font = {
      bold: true,
      color: { argb: "#ffff00" },
      size: 12,
    };

     worksheet.getCell(subtotalPercntCell11).value = {
      formula: `SUM(F${firstPartFirstRow11}:F${firstPartLastRow11})`,
      date1904: false
    }


    var dataForFirstPartProcessOrCm = [];
    var dataForExcelForFirstPartProcessOrCm = [];

    debugger
    if(processOrCmCost.filter(x => x.groupName == "PROCESS").length == 0){
      var objItemP = {
        partName: partList[0].partName,
        groupName: "PROCESS",
        costCategoryGroup: "",
        totalQty: 0,
        totalDznQty: 0 ,
      };
      dataForFirstPartProcessOrCm.push(objItemP);
    }

    for (var itemPart12 of processOrCmCost) {
      var objItem12 = {
        partName: itemPart12.partName,
        groupName: itemPart12.groupName,
        costCategoryGroup: itemPart12.costCategoryGroup,
        totalQty: itemPart12.totalQty,
        totalDznQty:  parseFloat(itemPart12.totalDznQty),
      };
      dataForFirstPartProcessOrCm.push(objItem12);
    }
    


    dataForFirstPartProcessOrCm.forEach((row: any) => {
      debugger
      dataForExcelForFirstPartProcessOrCm.push(Object.values(row));
    });


    var c12 = 0
    var firstPartFirstRow12 =  11 + c11 + 1 + 1 + c12;
    var firstPartLastRow12 =  11 + c11 + 1 + 1 + c12;
    for (var itemPart12 of dataForExcelForFirstPartProcessOrCm) {
      debugger
      var costrowCountitemFirstPart = 11 + c11 + 1 + 1 + c12;

      let stylePartCell = "A" + costrowCountitemFirstPart;// row.getCell(1).address;
      worksheet.getCell(stylePartCell).value = itemPart12[0];
      worksheet.getCell(stylePartCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let costHeadCell = "B" + costrowCountitemFirstPart; //row.getCell(4).address;
      worksheet.getCell(costHeadCell).value = itemPart12[1];
      worksheet.getCell(costHeadCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let particularsCell = "C" + costrowCountitemFirstPart; //row.getCell(5).address;
      worksheet.getCell(particularsCell).value = itemPart12[2];
      worksheet.getCell(particularsCell).border = {
        top: { style: 'thin' },
         bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let amountPcCell = "D" + costrowCountitemFirstPart; //row.getCell(5).address;
      worksheet.getCell(amountPcCell).value = itemPart12[3];
      worksheet.getCell(amountPcCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let amountDzCell = "E" + costrowCountitemFirstPart; //row.getCell(5).address;
      worksheet.getCell(amountDzCell).value = itemPart12[4];
      worksheet.getCell(amountDzCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let percentCell = "F" + costrowCountitemFirstPart;// row.getCell(3).address;
      worksheet.getCell(percentCell).value = itemPart12[5];
        worksheet.getCell(percentCell).border = {
          top: { style: 'thin' },
           bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        var totalQtySubPartwise = costingSummaryReportItemData.filter(x => x.groupName != "PROFIT").reduce((sum, list) => sum + list.totalQty, 0);
        worksheet.getCell(percentCell).value = {
          formula: `(D${costrowCountitemFirstPart}/${totalQtySubPartwise})*100`,
          date1904: false
        }


        let totalCell = "G" + costrowCountitemFirstPart;// row.getCell(3).address;
        worksheet.getCell(totalCell).value = itemPart12[6];
          worksheet.getCell(totalCell).border = {
            top: { style: 'thin' },
             bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }

       firstPartLastRow12 = costrowCountitemFirstPart;
       c12++
    }

    var subTotalProcessOrCmRow = firstPartLastRow12 + 1
    let subtotalCell12 = "C" + subTotalProcessOrCmRow;// row.getCell(3).address;
    worksheet.getCell(subtotalCell12).value =  "Sub Total :"
    worksheet.getCell(subtotalCell12).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell(subtotalCell12).font = {
      bold: true,
      color: { argb: "#ffff00" },
      size: 12,
    };

    let subtotalPcCell12 = "D" + subTotalProcessOrCmRow;// row.getCell(3).address;
   // worksheet.getCell(subtotalCell12).value =  
    worksheet.getCell(subtotalPcCell12).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell(subtotalPcCell12).font = {
      bold: true,
      color: { argb: "#ffff00" },
      size: 12,
    };

    worksheet.getCell(subtotalPcCell12).value = {
      formula: `SUM(D${firstPartFirstRow12}:D${firstPartLastRow12})`,
      date1904: false
    }

    let subtotalDzCell12 = "E" + subTotalProcessOrCmRow;// row.getCell(3).address;
    // worksheet.getCell(subtotalCell12).value =  
     worksheet.getCell(subtotalDzCell12).border = {
       top: { style: 'thin' },
       bottom: { style: 'thin' },
       left: { style: 'thin' },
       right: { style: 'thin' }
     }
     worksheet.getCell(subtotalDzCell12).font = {
      bold: true,
      color: { argb: "#ffff00" },
      size: 12,
    };

     worksheet.getCell(subtotalDzCell12).value = {
      formula: `SUM(E${firstPartFirstRow12}:E${firstPartLastRow12})`,
      date1904: false
    }

    let subtotalPercntCell12 = "F" + subTotalProcessOrCmRow;// row.getCell(3).address;
    // worksheet.getCell(subtotalCell12).value =  
     worksheet.getCell(subtotalPercntCell12).border = {
       top: { style: 'thin' },
       bottom: { style: 'thin' },
       left: { style: 'thin' },
       right: { style: 'thin' }
     }
     worksheet.getCell(subtotalPercntCell12).font = {
      bold: true,
      color: { argb: "#ffff00" },
      size: 12,
    };

     worksheet.getCell(subtotalPercntCell12).value = {
      formula: `SUM(F${firstPartFirstRow12}:F${firstPartLastRow12})`,
      date1904: false
    }




    var dataForFirstPartCommissionCost = [];
    var dataForExcelForFirstPartCommissionCost = [];
    for (var itemPart13 of commissionCost) {
      var objItem13 = {
        partName: itemPart13.partName,
        groupName: itemPart13.groupName,
        costCategoryGroup: itemPart13.costCategoryGroup,
        totalQty: itemPart13.totalQty,
        totalDznQty:  parseFloat(itemPart13.totalDznQty),
      };
      dataForFirstPartCommissionCost.push(objItem13);
    }

    dataForFirstPartCommissionCost.forEach((row: any) => {
      dataForExcelForFirstPartCommissionCost.push(Object.values(row));
    });


    var c13 = 0
    var firstPartFirstRow13= 11 + c11 + 1 + 1 + c12 + 1 + c13 ;
    var firstPartLastRow13 = 11 + c11 + 1 + 1 + c12 + 1 + c13 ;
    for (var itemPart13 of dataForExcelForFirstPartCommissionCost) {
      debugger
      var costrowCountitemFirstPart = 11 + c11 + 1 + 1 + c12 + 1 + c13;

      let stylePartCell = "A" + costrowCountitemFirstPart;// row.getCell(1).address;
      worksheet.getCell(stylePartCell).value = itemPart13[0];
      worksheet.getCell(stylePartCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let costHeadCell = "B" + costrowCountitemFirstPart; //row.getCell(4).address;
      worksheet.getCell(costHeadCell).value = itemPart13[1];
      worksheet.getCell(costHeadCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let particularsCell = "C" + costrowCountitemFirstPart; //row.getCell(5).address;
      worksheet.getCell(particularsCell).value = itemPart13[2];
      worksheet.getCell(particularsCell).border = {
        top: { style: 'thin' },
         bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let amountPcCell = "D" + costrowCountitemFirstPart; //row.getCell(5).address;
      worksheet.getCell(amountPcCell).value = itemPart13[3];
      worksheet.getCell(amountPcCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let amountDzCell = "E" + costrowCountitemFirstPart; //row.getCell(5).address;
      worksheet.getCell(amountDzCell).value = itemPart13[4];
      worksheet.getCell(amountDzCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      let percentCell = "F" + costrowCountitemFirstPart;// row.getCell(3).address;
      worksheet.getCell(percentCell).value = itemPart13[5];
        worksheet.getCell(percentCell).border = {
          top: { style: 'thin' },
           bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        var totalQtySubPartwise = costingSummaryReportItemData.filter(x => x.groupName != "PROFIT").reduce((sum, list) => sum + list.totalQty, 0);
        worksheet.getCell(percentCell).value = {
          formula: `(D${costrowCountitemFirstPart}/${totalQtySubPartwise})*100`,
          date1904: false
        }


        let totalCell = "G" + costrowCountitemFirstPart;// row.getCell(3).address;
        worksheet.getCell(totalCell).value = itemPart13[6];
          worksheet.getCell(totalCell).border = {
            top: { style: 'thin' },
             bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }

       firstPartLastRow13 = costrowCountitemFirstPart;
       c13++
    }

    var subTotalCommissionCostRow = firstPartLastRow13 + 1
    let subtotalCell13 = "C" + subTotalCommissionCostRow;// row.getCell(3).address;
    worksheet.getCell(subtotalCell13).value =  "Style Part Wise Total"
    worksheet.getCell(subtotalCell13).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell(subtotalCell13).font = {
      bold: true,
      color: { argb: "#ffff00" },
      size: 12,
    };

    let subtotalPcCell13 = "D" + subTotalCommissionCostRow;// row.getCell(3).address;
   // worksheet.getCell(subtotalCell12).value =  
    worksheet.getCell(subtotalPcCell13).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell(subtotalPcCell13).font = {
      bold: true,
      color: { argb: "#ffff00" },
      size: 12,
    };
    worksheet.getCell(subtotalPcCell13).value = {
      formula: `SUM(D${firstPartFirstRow11}:D${firstPartLastRow11})+SUM(D${firstPartFirstRow12}:D${firstPartLastRow12})+SUM(D${firstPartFirstRow13}:D${firstPartLastRow13})`,
      date1904: false
    }

    let subtotalDzCell13 = "E" + subTotalCommissionCostRow;// row.getCell(3).address;
    // worksheet.getCell(subtotalCell12).value =  
     worksheet.getCell(subtotalDzCell13).border = {
       top: { style: 'thin' },
       bottom: { style: 'thin' },
       left: { style: 'thin' },
       right: { style: 'thin' }
     }
     worksheet.getCell(subtotalDzCell13).font = {
      bold: true,
      color: { argb: "#ffff00" },
      size: 12,
    };
     worksheet.getCell(subtotalDzCell13).value = {
      formula: `SUM(E${firstPartFirstRow11}:E${firstPartLastRow11})+SUM(E${firstPartFirstRow12}:E${firstPartLastRow12})+SUM(E${firstPartFirstRow13}:E${firstPartLastRow13})`,
      date1904: false
    }

    let subtotalPercntCell13 = "F" + subTotalCommissionCostRow;// row.getCell(3).address;
    // worksheet.getCell(subtotalCell12).value =  
     worksheet.getCell(subtotalPercntCell13).border = {
       top: { style: 'thin' },
       bottom: { style: 'thin' },
       left: { style: 'thin' },
       right: { style: 'thin' }
     }
     worksheet.getCell(subtotalPercntCell13).font = {
      bold: true,
      color: { argb: "#ffff00" },
      size: 12,
    };

     worksheet.getCell(subtotalPercntCell13).value = {
      formula: `SUM(F${firstPartFirstRow11}:F${firstPartLastRow11})+SUM(F${firstPartFirstRow12}:F${firstPartLastRow12})+SUM(F${firstPartFirstRow13}:F${firstPartLastRow13})`,
      date1904: false
    }

    if(partList.length>1){
      debugger
      var costingSummaryReportItemData2 = allData[0].costingSummaryReportItem.filter(x => x.stylePartId == partList[1].stylePartId)

      var materialCost2 = costingSummaryReportItemData2.filter(x => x.groupName == "MATERIAL COST");
      var processOrCmCost2 = costingSummaryReportItemData2.filter(x => x.groupName == "PROCESS" || x.groupName =="CM");
      var commissionCost2 = costingSummaryReportItemData2.filter(x => x.groupName == "COMMISSION");
      var profitCost2 = costingSummaryReportItemData2.filter(x => x.groupName == "PROFIT");
  
      var dataForFirstPartMCost2 = [];
      var dataForExcelForFirstPartMCost2 = [];
      for (var itemPart21 of materialCost2) {
        var objItem21 = {
          partName: itemPart21.partName,
          groupName: itemPart21.groupName,
          costCategoryGroup: itemPart21.costCategoryGroup,
          totalQty: itemPart21.totalQty,
          totalDznQty:  parseFloat(itemPart21.totalDznQty),
        };
        dataForFirstPartMCost2.push(objItem21);
      }
      
      if(materialCost2.filter(x => x.costCategoryGroup == "PACKING").length == 0){
        var objItemPac2 = {
          partName: partList[1].partName,
          groupName: "",
          costCategoryGroup: "PACKING",
          totalQty: 0,
          totalDznQty: 0 ,
        };
         dataForFirstPartMCost2.push(objItemPac2);
      }

  
      dataForFirstPartMCost2.forEach((row: any) => {
        dataForExcelForFirstPartMCost2.push(Object.values(row));
      });
  
  
      var c21 = 0
      var firstPartFirstRow21 = 11 + c11 + 1 + 1 + c12 + 1 + c13 + 1+ c21;
      var firstPartLastRow21 = 11 + c11 + 1 + 1 + c12 + 1 + c13 + 1+ c21;
      for (var itemPart21 of dataForExcelForFirstPartMCost2) {
        debugger
        var costrowCountitemFirstPart = 11 + c11 + 1 + 1 + c12 + 1 + c13 + 1+ c21;
  
        let stylePartCell = "A" + costrowCountitemFirstPart;// row.getCell(1).address;
        worksheet.getCell(stylePartCell).value = itemPart21[0];
        worksheet.getCell(stylePartCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
  
        let costHeadCell = "B" + costrowCountitemFirstPart; //row.getCell(4).address;
        worksheet.getCell(costHeadCell).value = itemPart21[1];
        worksheet.getCell(costHeadCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
  
        let particularsCell = "C" + costrowCountitemFirstPart; //row.getCell(5).address;
        worksheet.getCell(particularsCell).value = itemPart21[2];
        worksheet.getCell(particularsCell).border = {
          top: { style: 'thin' },
           bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        if(itemPart21[2]=='FABRIC'){
          worksheet.getCell(particularsCell).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "CEE4B0" },
            bgColor: { argb: "" },
          };
        }
        else if(itemPart21[2]=='ACCESSORIES'){
          worksheet.getCell(particularsCell).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "E1A094" },
            bgColor: { argb: "" },
          };
        }
        else if(itemPart21[2]=='LABELS')
        {
            worksheet.getCell(particularsCell).fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "F1A738" },
              bgColor: { argb: "" },
            };
        }
  
          worksheet.getCell(particularsCell).font = {
            //bold: true,
            color: { argb: "#ffff00" },
            size: 12,
          };
  
        let amountPcCell = "D" + costrowCountitemFirstPart; //row.getCell(5).address;
        worksheet.getCell(amountPcCell).value = itemPart21[3];
        worksheet.getCell(amountPcCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
  
        let amountDzCell = "E" + costrowCountitemFirstPart; //row.getCell(5).address;
        worksheet.getCell(amountDzCell).value = itemPart21[4];
        worksheet.getCell(amountDzCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
  
        let percentCell = "F" + costrowCountitemFirstPart;// row.getCell(3).address;
        worksheet.getCell(percentCell).value = itemPart21[5];
          worksheet.getCell(percentCell).border = {
            top: { style: 'thin' },
             bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
        var totalQtySubPartwise = costingSummaryReportItemData2.filter(x => x.groupName != "PROFIT").reduce((sum, list) => sum + list.totalQty, 0);
          worksheet.getCell(percentCell).value = {
            formula: `(D${costrowCountitemFirstPart}/${totalQtySubPartwise})*100`,
            date1904: false
          }
    
  
  
          let totalCell = "G" + costrowCountitemFirstPart;// row.getCell(3).address;
          worksheet.getCell(totalCell).value = itemPart21[6];
            worksheet.getCell(totalCell).border = {
              top: { style: 'thin' },
               bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
          debugger
          if(costrowCountitemFirstPart == firstPartFirstRow21){
            var totalQtyDobulepart = allData[0].costingSummaryReportItem.filter(x => x.groupName != "PROFIT").reduce((sum, list) => sum + list.totalQty, 0);
            worksheet.getCell(totalCell).value = {
                formula: `(${totalQtySubPartwise}/${totalQtyDobulepart})*100`,
                date1904: false
            }
          }

  
         firstPartLastRow21 = costrowCountitemFirstPart;
         c21++
      }


      var subTotalMaterialCostRow2 = firstPartLastRow21 + 1
      let subtotalCell21 = "C" + subTotalMaterialCostRow2;// row.getCell(3).address;
      worksheet.getCell(subtotalCell21).value =  "Sub Total :"
      worksheet.getCell(subtotalCell21).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(subtotalCell21).font = {
        bold: true,
        color: { argb: "#ffff00" },
        size: 12,
      };
  
      let subtotalPcCell21 = "D" + subTotalMaterialCostRow2;// row.getCell(3).address;
     // worksheet.getCell(subtotalCell12).value =  
      worksheet.getCell(subtotalPcCell21).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(subtotalPcCell21).font = {
        bold: true,
        color: { argb: "#ffff00" },
        size: 12,
      };
      worksheet.getCell(subtotalPcCell21).value = {
        formula: `SUM(D${firstPartFirstRow21}:D${firstPartLastRow21})`,
        date1904: false
      }
  
      let subtotalDzCell21 = "E" + subTotalMaterialCostRow2;// row.getCell(3).address;
      // worksheet.getCell(subtotalCell12).value =  
       worksheet.getCell(subtotalDzCell21).border = {
         top: { style: 'thin' },
         bottom: { style: 'thin' },
         left: { style: 'thin' },
         right: { style: 'thin' }
       }
       worksheet.getCell(subtotalDzCell21).font = {
        bold: true,
        color: { argb: "#ffff00" },
        size: 12,
      };
  
       worksheet.getCell(subtotalDzCell21).value = {
        formula: `SUM(E${firstPartFirstRow21}:E${firstPartLastRow21})`,
        date1904: false
      }
  
      let subtotalPercntCell21 = "F" + subTotalMaterialCostRow2;// row.getCell(3).address;
      // worksheet.getCell(subtotalCell12).value =  
       worksheet.getCell(subtotalPercntCell21).border = {
         top: { style: 'thin' },
         bottom: { style: 'thin' },
         left: { style: 'thin' },
         right: { style: 'thin' }
       }
       worksheet.getCell(subtotalPcCell21).font = {
        bold: true,
        color: { argb: "#ffff00" },
        size: 12,
      };
  
       worksheet.getCell(subtotalPercntCell21).value = {
        formula: `SUM(F${firstPartFirstRow21}:F${firstPartLastRow21})`,
        date1904: false
      }
  
  
      var dataForFirstPartProcessOrCm2 = [];
      var dataForExcelForFirstPartProcessOrCm2 = [];
            
      if(processOrCmCost2.filter(x => x.groupName == "PROCESS").length == 0){
        var objItemP2 = {
          partName: partList[1].partName,
          groupName: "PROCESS",
          costCategoryGroup: "",
          totalQty: 0,
          totalDznQty: 0 ,
        };
             dataForFirstPartProcessOrCm2.push(objItemP2);
      }

      for (var itemPart22 of processOrCmCost2) {
        var objItem22 = {
          partName: itemPart22.partName,
          groupName: itemPart22.groupName,
          costCategoryGroup: itemPart22.costCategoryGroup,
          totalQty: itemPart22.totalQty,
          totalDznQty:  parseFloat(itemPart22.totalDznQty),
        };
        dataForFirstPartProcessOrCm2.push(objItem22);
      }


 
  
      dataForFirstPartProcessOrCm2.forEach((row: any) => {
        dataForExcelForFirstPartProcessOrCm2.push(Object.values(row));
      });
  
  
      var c22 = 0
      var firstPartFirstRow22 =  11 + c11 + 1 + 1 + c12 + 1 + c13 + 1+ c21 + 1 + c22;
      var firstPartLastRow22 =  11 + c11 + 1 + 1 + c12 + 1 + c13 + 1+ c21 + 1 + c22;
      for (var itemPart22 of dataForExcelForFirstPartProcessOrCm2) {
        debugger
        var costrowCountitemFirstPart = 11 + c11 + 1 + 1 + c12 + 1 + c13 + 1+ c21 + 1 + c22;;
  
        let stylePartCell = "A" + costrowCountitemFirstPart;// row.getCell(1).address;
        worksheet.getCell(stylePartCell).value = itemPart22[0];
        worksheet.getCell(stylePartCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
  
        let costHeadCell = "B" + costrowCountitemFirstPart; //row.getCell(4).address;
        worksheet.getCell(costHeadCell).value = itemPart22[1];
        worksheet.getCell(costHeadCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
  
        let particularsCell = "C" + costrowCountitemFirstPart; //row.getCell(5).address;
        worksheet.getCell(particularsCell).value = itemPart22[2];
        worksheet.getCell(particularsCell).border = {
          top: { style: 'thin' },
           bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
  
        let amountPcCell = "D" + costrowCountitemFirstPart; //row.getCell(5).address;
        worksheet.getCell(amountPcCell).value = itemPart22[3];
        worksheet.getCell(amountPcCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
  
        let amountDzCell = "E" + costrowCountitemFirstPart; //row.getCell(5).address;
        worksheet.getCell(amountDzCell).value = itemPart22[4];
        worksheet.getCell(amountDzCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
  
        let percentCell = "F" + costrowCountitemFirstPart;// row.getCell(3).address;
        worksheet.getCell(percentCell).value = itemPart22[5];
          worksheet.getCell(percentCell).border = {
            top: { style: 'thin' },
             bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          var totalQtySubPartwise = costingSummaryReportItemData2.filter(x => x.groupName != "PROFIT").reduce((sum, list) => sum + list.totalQty, 0);
          worksheet.getCell(percentCell).value = {
            formula: `(D${costrowCountitemFirstPart}/${totalQtySubPartwise})*100`,
            date1904: false
          }
     
          let totalCell = "G" + costrowCountitemFirstPart;// row.getCell(3).address;
          worksheet.getCell(totalCell).value = itemPart22[6];
            worksheet.getCell(totalCell).border = {
              top: { style: 'thin' },
               bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
  
         firstPartLastRow22 = costrowCountitemFirstPart;
         c22++
      }


      var subTotalProcessOrCmCostRow2 = firstPartLastRow22 + 1
      let subtotalCell22 = "C" + subTotalProcessOrCmCostRow2;// row.getCell(3).address;
      worksheet.getCell(subtotalCell22).value =  "Sub Total :"
      worksheet.getCell(subtotalCell22).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(subtotalCell22).font = {
        bold: true,
        color: { argb: "#ffff00" },
        size: 12,
      };
  
      let subtotalPcCell22 = "D" + subTotalProcessOrCmCostRow2;// row.getCell(3).address;
     // worksheet.getCell(subtotalCell12).value =  
      worksheet.getCell(subtotalPcCell22).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(subtotalPcCell22).font = {
        bold: true,
        color: { argb: "#ffff00" },
        size: 12,
      };
      worksheet.getCell(subtotalPcCell22).value = {
        formula: `SUM(D${firstPartFirstRow22}:D${firstPartLastRow22})`,
        date1904: false
      }
  
      let subtotalDzCell22 = "E" + subTotalProcessOrCmCostRow2;// row.getCell(3).address;
      // worksheet.getCell(subtotalCell12).value =  
       worksheet.getCell(subtotalDzCell22).border = {
         top: { style: 'thin' },
         bottom: { style: 'thin' },
         left: { style: 'thin' },
         right: { style: 'thin' }
       }
       worksheet.getCell(subtotalDzCell22).font = {
        bold: true,
        color: { argb: "#ffff00" },
        size: 12,
      };
  
       worksheet.getCell(subtotalDzCell22).value = {
        formula: `SUM(E${firstPartFirstRow22}:E${firstPartLastRow22})`,
        date1904: false
      }
  
      let subtotalPercntCell22 = "F" + subTotalProcessOrCmCostRow2;// row.getCell(3).address;
      // worksheet.getCell(subtotalCell12).value =  
       worksheet.getCell(subtotalPercntCell22).border = {
         top: { style: 'thin' },
         bottom: { style: 'thin' },
         left: { style: 'thin' },
         right: { style: 'thin' }
       }
       worksheet.getCell(subtotalPercntCell22).font = {
        bold: true,
        color: { argb: "#ffff00" },
        size: 12,
      };
  
       worksheet.getCell(subtotalPercntCell22).value = {
        formula: `SUM(F${firstPartFirstRow22}:F${firstPartLastRow22})`,
        date1904: false
      }
  
  
  
      var dataForFirstPartCommissionCost2 = [];
      var dataForExcelForFirstPartCommissionCost2 = [];
      for (var itemPart23 of commissionCost2) {
        var objItem23 = {
          partName: itemPart23.partName,
          groupName: itemPart23.groupName,
          costCategoryGroup: itemPart23.costCategoryGroup,
          totalQty: itemPart23.totalQty,
          totalDznQty:  parseFloat(itemPart23.totalDznQty),
        };
        dataForFirstPartCommissionCost2.push(objItem23);
      }
  
      dataForFirstPartCommissionCost2.forEach((row: any) => {
        dataForExcelForFirstPartCommissionCost2.push(Object.values(row));
      });
  
  
      var c23 = 0
      var firstPartFirstRow23= 11 + c11 + 1 + 1 + c12 + 1 + c13 + 1+ c21 + 1 + c22+ 1 +c23 ;
      var firstPartLastRow23 = 11 + c11 + 1 + 1 + c12 + 1 + c13 + 1+ c21 + 1 + c22+ 1 +c23 ;
      for (var itemPart23 of dataForExcelForFirstPartCommissionCost2) {
        debugger
        var costrowCountitemFirstPart = 11 + c11 + 1 + 1 + c12 + 1 + c13 + 1+ c21 + 1 + c22+ 1 +c23;
  
        let stylePartCell = "A" + costrowCountitemFirstPart;// row.getCell(1).address;
        worksheet.getCell(stylePartCell).value = itemPart23[0];
        worksheet.getCell(stylePartCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
  
        let costHeadCell = "B" + costrowCountitemFirstPart; //row.getCell(4).address;
        worksheet.getCell(costHeadCell).value = itemPart23[1];
        worksheet.getCell(costHeadCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
  
        let particularsCell = "C" + costrowCountitemFirstPart; //row.getCell(5).address;
        worksheet.getCell(particularsCell).value = itemPart23[2];
        worksheet.getCell(particularsCell).border = {
          top: { style: 'thin' },
           bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
  
        let amountPcCell = "D" + costrowCountitemFirstPart; //row.getCell(5).address;
        worksheet.getCell(amountPcCell).value = itemPart23[3];
        worksheet.getCell(amountPcCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
  
        let amountDzCell = "E" + costrowCountitemFirstPart; //row.getCell(5).address;
        worksheet.getCell(amountDzCell).value = itemPart23[4];
        worksheet.getCell(amountDzCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
  
        let percentCell = "F" + costrowCountitemFirstPart;// row.getCell(3).address;
        worksheet.getCell(percentCell).value = itemPart23[5];
        worksheet.getCell(percentCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }

        var totalQtySubPartwise = costingSummaryReportItemData2.filter(x => x.groupName != "PROFIT").reduce((sum, list) => sum + list.totalQty, 0);
        worksheet.getCell(percentCell).value = {
          formula: `(D${costrowCountitemFirstPart}/${totalQtySubPartwise})*100`,
          date1904: false
        }

          let totalCell = "G" + costrowCountitemFirstPart;// row.getCell(3).address;
          worksheet.getCell(totalCell).value = itemPart23[6];
            worksheet.getCell(totalCell).border = {
              top: { style: 'thin' },
               bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
  
         firstPartLastRow23 = costrowCountitemFirstPart;
         c23++
  
    }

 debugger
    var subTotalCommissionCostRow2 = firstPartLastRow23 + 1
    let subtotalCell23 = "C" + subTotalCommissionCostRow2;// row.getCell(3).address;
    worksheet.getCell(subtotalCell23).value =  "Style Part Wise Total"
    worksheet.getCell(subtotalCell23).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell(subtotalCell23).font = {
      bold: true,
      color: { argb: "#ffff00" },
      size: 12,
    };

    let subtotalPcCell23 = "D" + subTotalCommissionCostRow2;// row.getCell(3).address;
   // worksheet.getCell(subtotalCell12).value =  
    worksheet.getCell(subtotalPcCell23).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell(subtotalPcCell23).font = {
      bold: true,
      color: { argb: "#ffff00" },
      size: 12,
    };
    worksheet.getCell(subtotalPcCell23).value = {
      formula: `SUM(D${firstPartFirstRow21}:D${firstPartLastRow21})+SUM(D${firstPartFirstRow22}:D${firstPartLastRow22})+SUM(D${firstPartFirstRow23}:D${firstPartLastRow23})`,
      date1904: false
    }

    let subtotalDzCell23 = "E" + subTotalCommissionCostRow2;// row.getCell(3).address;
    // worksheet.getCell(subtotalCell12).value =  
     worksheet.getCell(subtotalDzCell23).border = {
       top: { style: 'thin' },
       bottom: { style: 'thin' },
       left: { style: 'thin' },
       right: { style: 'thin' }
     }
     worksheet.getCell(subtotalDzCell23).font = {
      bold: true,
      color: { argb: "#ffff00" },
      size: 12,
    };

     worksheet.getCell(subtotalDzCell23).value = {
      formula: `SUM(E${firstPartFirstRow21}:E${firstPartLastRow21})+SUM(E${firstPartFirstRow22}:E${firstPartLastRow22})+SUM(E${firstPartFirstRow23}:E${firstPartLastRow23})`,
      date1904: false
    }

    let subtotalPercntCell23 = "F" + subTotalCommissionCostRow2;// row.getCell(3).address;
    // worksheet.getCell(subtotalCell12).value =  
     worksheet.getCell(subtotalPercntCell23).border = {
       top: { style: 'thin' },
       bottom: { style: 'thin' },
       left: { style: 'thin' },
       right: { style: 'thin' }
     }
     worksheet.getCell(subtotalPercntCell23).font = {
      bold: true,
      color: { argb: "#ffff00" },
      size: 12,
    };

     worksheet.getCell(subtotalPercntCell23).value = {
      formula: `SUM(F${firstPartFirstRow21}:F${firstPartLastRow21})+SUM(F${firstPartFirstRow22}:F${firstPartLastRow22})+SUM(F${firstPartFirstRow23}:F${firstPartLastRow23})`,
      date1904: false
    }

    let subtotalPercntDobuleCell23 = "G" + subTotalCommissionCostRow2;// row.getCell(3).address;
    // worksheet.getCell(subtotalCell12).value =  
     worksheet.getCell(subtotalPercntDobuleCell23).border = {
       top: { style: 'thin' },
       bottom: { style: 'thin' },
       left: { style: 'thin' },
       right: { style: 'thin' }
     } 

     worksheet.getCell(subtotalPercntDobuleCell23).font = {
      bold: true,
      color: { argb: "#ffff00" },
      size: 12,
    };


     worksheet.getCell(subtotalPercntDobuleCell23).value = {
      formula: `(G${firstPartFirstRow11}+G${firstPartFirstRow21})`,
      date1904: false
    }
  }

//----------------------------------------------------------------------------------------------//


worksheet.mergeCells("I10", "L10");
let summuryHeaderGross = worksheet.getCell("I10");
summuryHeaderGross.value = "Gross"
summuryHeaderGross.font = {
  name: "Calibri",
  size: 16,
  bold: true,
  color: { argb: "BD0606" },
};
summuryHeaderGross.border = {
  top: { style: 'thin' },
  bottom: { style: 'thin' },
  left: { style: 'thin' },
  right: { style: 'thin' }
}
summuryHeaderGross.alignment = { vertical: "middle", horizontal: "center" };




var summuryHeader = 11

let  Particulars = "I" + summuryHeader;
worksheet.getCell(Particulars).value ="Particulars"
worksheet.getCell(Particulars).font = {
  bold: true,
  color: { argb: "#ffff00" },
  size: 12,
};
worksheet.getCell(Particulars).border = {
  top: { style: 'thin' },
  bottom: { style: 'thin' },
  left: { style: 'thin' },
  right: { style: 'thin' }
}
worksheet.getCell(Particulars).alignment = { vertical: "middle", horizontal: "center" };

let  AmountPc = "J" + summuryHeader;
worksheet.getCell(AmountPc).value ="Amount USD/pc"
worksheet.getCell(AmountPc).font = {
  bold: true,
  color: { argb: "#ffff00" },
  size: 12,
};
worksheet.getCell(AmountPc).border = {
  top: { style: 'thin' },
  bottom: { style: 'thin' },
  left: { style: 'thin' },
  right: { style: 'thin' }
}
worksheet.getCell(AmountPc).alignment = { vertical: "middle", horizontal: "center" };

let  AmountDz = "K" + summuryHeader;
worksheet.getCell(AmountDz).value ="Amount USD/DZ"
worksheet.getCell(AmountDz).font = {
  bold: true,
  color: { argb: "#ffff00" },
  size: 12,
};
worksheet.getCell(AmountDz).border = {
  top: { style: 'thin' },
  bottom: { style: 'thin' },
  left: { style: 'thin' },
  right: { style: 'thin' }
}
worksheet.getCell(AmountDz).alignment = { vertical: "middle", horizontal: "center" };

let  Percentage = "L" + summuryHeader;
worksheet.getCell(Percentage).value ="Percentage(%)"
worksheet.getCell(Percentage).font = {
  bold: true,
  color: { argb: "#ffff00" },
  size: 12,
};
worksheet.getCell(Percentage).border = {
  top: { style: 'thin' },
  bottom: { style: 'thin' },
  left: { style: 'thin' },
  right: { style: 'thin' }
}
worksheet.getCell(Percentage).alignment = { vertical: "middle", horizontal: "center" };



///------------summaryy FABRIC---------- ////
var summuryHeaderF = 12
let FabricRow = "I" + summuryHeaderF;// row.getCell(3).address;
worksheet.getCell(FabricRow).value =  "FABRIC"
 worksheet.getCell(FabricRow).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 worksheet.getCell(FabricRow).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "CEE4B0" },
    bgColor: { argb: "" },
  };



  // worksheet.getCell(particularsCell).font = {
  //   //bold: true,
  //   color: { argb: "#ffff00" },
  //   size: 12,
  // };

 let FabricRowAmount = "J" + summuryHeaderF;// row.getCell(3).address;
//worksheet.getCell(FabricRowAmount).value =  "FABRIC"
 worksheet.getCell(FabricRowAmount).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 worksheet.getCell(FabricRowAmount).value = {
  formula: `(D${firstPartFirstRow11}+D${firstPartFirstRow21})`,
  date1904: false
}

let FabricRowAmountDz = "K" + summuryHeaderF;// row.getCell(3).address;
//worksheet.getCell(FabricRowAmount).value =  "FABRIC"
 worksheet.getCell(FabricRowAmountDz).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 worksheet.getCell(FabricRowAmountDz).value = {
  //formula: `(E${firstPartFirstRow11}+E${firstPartFirstRow21})`,
  formula: `J${summuryHeaderF}*12`,
  date1904: false
}





///------------summaryy ACCESSORIES---------- ////
var summuryHeaderA = 13
let AccessoriesRow = "I" + summuryHeaderA;// row.getCell(3).address;
worksheet.getCell(AccessoriesRow).value =  "ACCESSORIES"
 worksheet.getCell(AccessoriesRow).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }
 worksheet.getCell(AccessoriesRow).fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "E1A094" },
  bgColor: { argb: "" },
};

 let AccessoriesRowAmount = "J" + summuryHeaderA;// row.getCell(3).address;
//worksheet.getCell(AccessoriesRowAmount).value =  "FABRIC"
 worksheet.getCell(AccessoriesRowAmount).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 worksheet.getCell(AccessoriesRowAmount).value = {
  formula: `(D${firstPartFirstRow11+1}+D${firstPartFirstRow21+1})`,
  date1904: false
}

let AccessoriesRowAmountDz = "K" + summuryHeaderA;// row.getCell(3).address;
//worksheet.getCell(FabricRowAmount).value =  "FABRIC"
 worksheet.getCell(AccessoriesRowAmountDz).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 worksheet.getCell(AccessoriesRowAmountDz).value = {
  //formula: `(E${firstPartFirstRow11+1}+E${firstPartFirstRow21+1})`,
  formula: `J${summuryHeaderA}*12`,
  date1904: false
}



let AccessoriesRowPercentage = "K" + summuryHeaderA;// row.getCell(3).address;
//worksheet.getCell(FabricRowAmount).value =  "FABRIC"
 worksheet.getCell(AccessoriesRowAmountDz).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 worksheet.getCell(AccessoriesRowPercentage).value = {
  //formula: `(E${firstPartFirstRow11+1}+E${firstPartFirstRow21+1})`,
  formula: `J${summuryHeaderA}*12`,
  date1904: false
}


///------------summaryy LABELS---------- ////
var summuryHeaderL = 14
let LableRow = "I" + summuryHeaderL;// row.getCell(3).address;
worksheet.getCell(LableRow).value =  "LABELS"
 worksheet.getCell(LableRow).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }
 worksheet.getCell(LableRow).fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "F1A738" },
  bgColor: { argb: "" },
};


 let LableRowAmount = "J" + summuryHeaderL;// row.getCell(3).address;
//worksheet.getCell(AccessoriesRowAmount).value =  "FABRIC"
 worksheet.getCell(AccessoriesRowAmount).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 worksheet.getCell(LableRowAmount).value = {
  formula: `(D${firstPartFirstRow11+2}+D${firstPartFirstRow21+2})`,
  date1904: false
}

let LableRowAmountDz = "K" + summuryHeaderL;// row.getCell(3).address;
//worksheet.getCell(FabricRowAmount).value =  "FABRIC"
 worksheet.getCell(LableRowAmountDz).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 worksheet.getCell(LableRowAmountDz).value = {
  //formula: `(E${firstPartFirstRow11+2}+E${firstPartFirstRow21+1})`,
  formula: `J${summuryHeaderL}*12`,
  date1904: false
}



///------------summaryy PACKING---------- ////
var summuryHeaderP = 15
let PackingRow = "I" + summuryHeaderP;// row.getCell(3).address;
worksheet.getCell(PackingRow).value =  "PACKING"
 worksheet.getCell(PackingRow).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 let PackingRowAmount = "J" + summuryHeaderP;// row.getCell(3).address;
//worksheet.getCell(AccessoriesRowAmount).value =  "FABRIC"
 worksheet.getCell(PackingRowAmount).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 worksheet.getCell(PackingRowAmount).value = {
  formula: `(D${firstPartFirstRow11+3}+D${firstPartFirstRow21+3})`,
  date1904: false
}

let PackingRowAmountDz = "K" + summuryHeaderP;// row.getCell(3).address;
//worksheet.getCell(FabricRowAmount).value =  "FABRIC"
 worksheet.getCell(PackingRowAmountDz).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 worksheet.getCell(PackingRowAmountDz).value = {
  //formula: `(E${firstPartFirstRow11+3}+E${firstPartFirstRow21+3})`,
  formula: `J${summuryHeaderP}*12`,
  date1904: false
}


///------------summaryy Process---------- ////
var summuryHeaderPr = 16
let ProcessRow = "I" + summuryHeaderPr;// row.getCell(3).address;
worksheet.getCell(ProcessRow).value =  "PROCESS"
 worksheet.getCell(ProcessRow).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }
 worksheet.getCell(ProcessRow).font = {
  bold: true,
  color: { argb: "BD0606" },
  size: 11,
};

 

 let ProcessRowAmount = "J" + summuryHeaderPr;// row.getCell(3).address;
//worksheet.getCell(AccessoriesRowAmount).value =  "FABRIC"
 worksheet.getCell(ProcessRowAmount).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 worksheet.getCell(ProcessRowAmount).value = {
  formula: `SUM(D${firstPartFirstRow12}:D${firstPartLastRow12-1})+SUM(D${firstPartFirstRow22}:D${firstPartLastRow22-1})`,
  date1904: false
}

let ProcessRowAmountDz = "K" + summuryHeaderPr;// row.getCell(3).address;
//worksheet.getCell(FabricRowAmount).value =  "FABRIC"
 worksheet.getCell(ProcessRowAmountDz).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 worksheet.getCell(ProcessRowAmountDz).value = {
  //formula: `(E${firstPartFirstRow13}+E${firstPartFirstRow23})`,
  formula: `J${summuryHeaderPr}*12`,
  date1904: false
}


///------------summaryy CM---------- ////
var summuryHeaderCm = 17
let CmRow = "I" + summuryHeaderCm;// row.getCell(3).address;
worksheet.getCell(CmRow).value =  "CM"
 worksheet.getCell(CmRow).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 let CmRowAmount = "J" + summuryHeaderCm;// row.getCell(3).address;
//worksheet.getCell(AccessoriesRowAmount).value =  "FABRIC"
 worksheet.getCell(CmRowAmount).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 worksheet.getCell(CmRowAmount).value = {
  formula: `(D${firstPartLastRow12}+D${firstPartLastRow22})`,
  date1904: false
}

let CmRowAmountDz = "K" + summuryHeaderCm;// row.getCell(3).address;
//worksheet.getCell(FabricRowAmount).value =  "FABRIC"
 worksheet.getCell(CmRowAmountDz).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 worksheet.getCell(CmRowAmountDz).value = {
  //formula: `(E${firstPartLastRow12}+E${firstPartLastRow22})`,
  formula: `J${summuryHeaderCm}*12`,
  date1904: false
}



///------------summaryy COMMISSION---------- ////
var summuryHeaderCom = 19
let ComssionRow = "I" + summuryHeaderCom;// row.getCell(3).address;
worksheet.getCell(ComssionRow).value =  "COMMISSION"
 worksheet.getCell(ComssionRow).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 let ComssionRowRowAmount = "J" + summuryHeaderCom;// row.getCell(3).address;
//worksheet.getCell(AccessoriesRowAmount).value =  "FABRIC"
 worksheet.getCell(ComssionRowRowAmount).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 worksheet.getCell(ComssionRowRowAmount).value = {
  formula: `(D${firstPartFirstRow13}+D${firstPartFirstRow23})`,
  date1904: false
}

let ComssionRowRowAmountDz = "K" + summuryHeaderCom;// row.getCell(3).address;
//worksheet.getCell(FabricRowAmount).value =  "FABRIC"
 worksheet.getCell(ComssionRowRowAmountDz).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 worksheet.getCell(ComssionRowRowAmountDz).value = {
  //formula: `(E${firstPartFirstRow13}+E${firstPartFirstRow23})`,
  formula: `J${summuryHeaderCom}*12`,
  date1904: false
}




///------------summaryy PROFIT---------- ////
var summuryHeaderProf = 20
let ProfitRow = "I" + summuryHeaderProf;// row.getCell(3).address;
worksheet.getCell(ProfitRow).value =  "PROFIT"
 worksheet.getCell(ProfitRow).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }


 
 let ProfitRowRowAmount = "J" + summuryHeaderProf;// row.getCell(3).address;
worksheet.getCell(ProfitRowRowAmount).value =  allData[0].profitPc
 worksheet.getCell(ProfitRowRowAmount).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

//  worksheet.getCell(ProfitRowRowAmount).value = {
//   formula: `(D${firstPartFirstRow13}+D${firstPartFirstRow23})`,
//   date1904: false
// }

let ProfitRowRowAmountDz = "K" + summuryHeaderProf;// row.getCell(3).address;
//worksheet.getCell(FabricRowAmount).value =  "FABRIC"
 worksheet.getCell(ProfitRowRowAmountDz).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }


 worksheet.getCell(ProfitRowRowAmountDz).value = {
  // formula: `(E${firstPartFirstRow13}+E${firstPartFirstRow23})`,
  formula: `J${summuryHeaderProf}*12`,
  date1904: false
}


///------------summaryy Total---------- ////
var summuryHeaderT = 22
let TotalRow = "I" + summuryHeaderT;// row.getCell(3).address;
worksheet.getCell(TotalRow).value =  "TOTAL"
 worksheet.getCell(TotalRow).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }
 worksheet.getCell(TotalRow).font = {
  bold: true,
  color: { argb: "#ffff00" },
  size: 12,
};

 let TotalRowRowAmount = "J" + summuryHeaderT;// row.getCell(3).address;
//worksheet.getCell(AccessoriesRowAmount).value =  "FABRIC"
 worksheet.getCell(TotalRowRowAmount).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }
 worksheet.getCell(TotalRowRowAmount).font = {
  bold: true,
  color: { argb: "ff0000" },
  size: 12,
};

 worksheet.getCell(TotalRowRowAmount).value = {
  formula: `(J${summuryHeaderF}+J${summuryHeaderA}+J${summuryHeaderL}+J${summuryHeaderP}+J${summuryHeaderPr}+J${summuryHeaderCm}+J${summuryHeaderCom})`,
  date1904: false
}

let TotalRowRowAmountDz = "K" + summuryHeaderT;// row.getCell(3).address;
//worksheet.getCell(FabricRowAmount).value =  "FABRIC"
 worksheet.getCell(TotalRowRowAmountDz).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }
 worksheet.getCell(TotalRowRowAmountDz).font = {
  bold: true,
  color: { argb: "#ffff00" },
  size: 12,
};

 worksheet.getCell(TotalRowRowAmountDz).value = {
  //formula: `(E${firstPartFirstRow13}+E${firstPartFirstRow23})`,
  formula: `(K${summuryHeaderF}+K${summuryHeaderA}+K${summuryHeaderL}+K${summuryHeaderP}+K${summuryHeaderPr}+K${summuryHeaderCm}+K${summuryHeaderCom})`,
  date1904: false
}

////---------------parcentage Calclutaion-----------------//

let FabricRowPercent = "L" + summuryHeaderF;// row.getCell(3).address;
//worksheet.getCell(FabricRowAmount).value =  "FABRIC"
 worksheet.getCell(FabricRowPercent).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 worksheet.getCell(FabricRowPercent).value = {
  //formula: `(E${firstPartFirstRow11}+E${firstPartFirstRow21})`,
  formula: `(J${summuryHeaderF}/J${summuryHeaderT})*100`,
  date1904: false
}


  let AccessoriePercent = "L" + summuryHeaderA;// row.getCell(3).address;
//worksheet.getCell(FabricRowAmount).value =  "FABRIC"
 worksheet.getCell(AccessoriePercent).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 worksheet.getCell(AccessoriePercent).value = {
  //formula: `(E${firstPartFirstRow11}+E${firstPartFirstRow21})`,
  formula: `(J${summuryHeaderA}/J${summuryHeaderT})*100`,
  date1904: false
}

let LabelPercent = "L" + summuryHeaderL;// row.getCell(3).address;
//worksheet.getCell(FabricRowAmount).value =  "FABRIC"
 worksheet.getCell(LabelPercent).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 worksheet.getCell(LabelPercent).value = {
  //formula: `(E${firstPartFirstRow11}+E${firstPartFirstRow21})`,
  formula: `(J${summuryHeaderL}/J${summuryHeaderT})*100`,
  date1904: false
}


let PackgingPercent = "L" + summuryHeaderP;// row.getCell(3).address;
//worksheet.getCell(FabricRowAmount).value =  "FABRIC"
 worksheet.getCell(PackgingPercent).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 worksheet.getCell(PackgingPercent).value = {
  //formula: `(E${firstPartFirstRow11}+E${firstPartFirstRow21})`,
  formula: `(J${summuryHeaderP}/J${summuryHeaderT})*100`,
  date1904: false
}

let ProcessRowPercent = "L" + summuryHeaderPr;// row.getCell(3).address;
//worksheet.getCell(FabricRowAmount).value =  "FABRIC"
 worksheet.getCell(ProcessRowPercent).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 worksheet.getCell(ProcessRowPercent).value = {
  //formula: `(E${firstPartFirstRow11}+E${firstPartFirstRow21})`,
  formula: `(J${summuryHeaderPr}/J${summuryHeaderT})*100`,
  date1904: false
}

let CmRowPercent = "L" + summuryHeaderCm;// row.getCell(3).address;
//worksheet.getCell(FabricRowAmount).value =  "FABRIC"
 worksheet.getCell(CmRowPercent).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 worksheet.getCell(CmRowPercent).value = {
  //formula: `(E${firstPartFirstRow11}+E${firstPartFirstRow21})`,
  formula: `(J${summuryHeaderCm}/J${summuryHeaderT})*100`,
  date1904: false
}

let CommissionRowPercent = "L" + summuryHeaderCom;// row.getCell(3).address;
//worksheet.getCell(FabricRowAmount).value =  "FABRIC"
 worksheet.getCell(CommissionRowPercent).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 worksheet.getCell(CommissionRowPercent).value = {
  //formula: `(E${firstPartFirstRow11}+E${firstPartFirstRow21})`,
  formula: `(J${summuryHeaderCom}/J${summuryHeaderT})*100`,
  date1904: false
}



let ProfitRowPercent = "L" + summuryHeaderProf;// row.getCell(3).address;
//worksheet.getCell(FabricRowAmount).value =  "FABRIC"
 worksheet.getCell(ProfitRowPercent).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 worksheet.getCell(ProfitRowPercent).value = {
  //formula: `(E${firstPartFirstRow11}+E${firstPartFirstRow21})`,
  formula: `(J${summuryHeaderProf}/J${summuryHeaderT})*100`,
  date1904: false
}



let TotalRowRowPercent = "L" + summuryHeaderT;// row.getCell(3).address;
//worksheet.getCell(FabricRowAmount).value =  "FABRIC"
 worksheet.getCell(TotalRowRowPercent).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }
 worksheet.getCell(TotalRowRowPercent).font = {
  bold: true,
  color: { argb: "#ffff00" },
  size: 12,
};

 worksheet.getCell(TotalRowRowPercent).value = {
  //formula: `(E${firstPartFirstRow13}+E${firstPartFirstRow23})`,
  formula: `(L${summuryHeaderF}+L${summuryHeaderA}+L${summuryHeaderL}+L${summuryHeaderP}+L${summuryHeaderPr}+L${summuryHeaderCm}+L${summuryHeaderCom})`,
  date1904: false
}


worksheet.mergeCells("A"+firstPartFirstRow11, "A"+firstPartLastRow13);
let partNameMerge= worksheet.getCell("A"+firstPartFirstRow11);
partNameMerge.value = allData[0].partName;
partNameMerge.border = {
  top: { style: 'thin' },
  bottom: { style: 'thin' },
  left: { style: 'thin' },
  right: { style: 'thin' }
}
partNameMerge.alignment = { vertical: "middle", horizontal: "center" };

worksheet.mergeCells("A"+firstPartFirstRow21, "A"+firstPartLastRow23);
let partNameMerge2= worksheet.getCell("A"+firstPartFirstRow21);
partNameMerge2.value = allData[1].partName;
partNameMerge2.border = {
  top: { style: 'thin' },
  bottom: { style: 'thin' },
  left: { style: 'thin' },
  right: { style: 'thin' }
}
partNameMerge2.alignment = { vertical: "middle", horizontal: "center" };


   
    worksheet.columns.forEach(function (column, i) {
     // debugger
      //if (i == 1 || i == 11 || i == 6 || i == 15) {
        var maxLength = 0;
        column["eachCell"]({ includeEmpty: false }, function (cell) {
          var columnLength = cell.value ? cell.value.toString().length : 5;
          if (columnLength > maxLength) {
            maxLength = columnLength;
          }
        });
        column.width = maxLength < 5 ? 5 : 15;
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
