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
export class HaddadCostingReportService {
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


    async exportHaddadExcelReport(excelData) {
        //debugger
        const title = excelData.title;
        const allData = excelData.finallySubmitData;

        //Create a workbook with a worksheet
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet(
            "Costing  Report"
        );
        const stockHeaderFabric = [
            "SL. No ",
            "DESCRIPTION",
            "Qty/Dz",
            "Unit",
            "Unit Price",
            "Freight",
            "Total Price",
            "Supplier Name",
            "Remarks",
        ];

        const stockHeaderFabric1 = [
            "SL. No ",
            "DESCRIPTION",
            "CON/PC",
            "CON/DZ",
            "Price",
            "Unit",
            "Value",
            "",
            "",
            "Remarks",
        ];



        let d = new Date();
        let date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

        worksheet.mergeCells("A1", "H1");
        let companyRow = worksheet.getCell("A1");
        companyRow.value = "COST BREAK DOWN";
        companyRow.font = {
            name: "Calibri",
            size: 16,
            bold: true,
            color: { argb: "#ffff00" },
        };
        companyRow.alignment = { vertical: "middle", horizontal: "center" };


        var partList = allData.filter((a, i) => allData.findIndex((s) => a.stylePartId === s.stylePartId) === i);

        let buyer = worksheet.getCell("A2");
        buyer.value = "BUYER ";
        buyer.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        buyer.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        buyer.alignment = { vertical: "middle", horizontal: "left" };


        let buyerValue = worksheet.getCell("B2");
        buyerValue.value = partList[0].buyerName;
        buyerValue.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        buyerValue.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        buyerValue.alignment = { vertical: "middle", horizontal: "left" };

        let style = worksheet.getCell("A3");
        style.value = "STYLE";
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


        let styleValue = worksheet.getCell("B3");
        styleValue.value = partList[0].styleName;
        styleValue.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        styleValue.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        styleValue.alignment = { vertical: "middle", horizontal: "left" };


        let size = worksheet.getCell("A4");
        size.value = "SIZE";
        size.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        size.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        size.alignment = { vertical: "middle", horizontal: "left" };


        let sizeValue = worksheet.getCell("B4");
        // seasonName.value = partList[0].;
        sizeValue.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        sizeValue.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        sizeValue.alignment = { vertical: "middle", horizontal: "left" };



        let item = worksheet.getCell("A5");
        item.value = "ITEM ";
        item.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        item.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        item.alignment = { vertical: "middle", horizontal: "left" };


        let itemValue = worksheet.getCell("B5");
        itemValue.value = partList[0].gmtItem;
        itemValue.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        itemValue.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        itemValue.alignment = { vertical: "middle", horizontal: "left" };



        let season = worksheet.getCell("A6");
        season.value = "SEASON ";
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


        let seasonValue = worksheet.getCell("B6");
        seasonValue.value = partList[0].seasonName;
        seasonValue.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        seasonValue.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        seasonValue.alignment = { vertical: "middle", horizontal: "left" };



        let deliveryDate = worksheet.getCell("C2");
        deliveryDate.value = "DELIVERY DATE ";
        deliveryDate.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        deliveryDate.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        deliveryDate.alignment = { vertical: "middle", horizontal: "left" };

        worksheet.mergeCells("D2:J2")
        let deliveryDateValue = worksheet.getCell("D2");
        deliveryDateValue.value = "";
        deliveryDateValue.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        deliveryDateValue.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        deliveryDateValue.alignment = { vertical: "middle", horizontal: "left" };



        let orderQty = worksheet.getCell("C3");
        orderQty.value = "ORDER QTY";
        orderQty.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        orderQty.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        orderQty.alignment = { vertical: "middle", horizontal: "left" };


        let orderQtyValue = worksheet.getCell("D3");
        orderQtyValue.value = partList[0].moq;
        orderQtyValue.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        orderQtyValue.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        orderQtyValue.alignment = { vertical: "middle", horizontal: "left" };

        let orderQty1Unit = worksheet.getCell("E3");
        orderQty1Unit.value = "PCS";
        orderQty1Unit.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        orderQty1Unit.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        orderQty1Unit.alignment = { vertical: "middle", horizontal: "left" };

        worksheet.mergeCells("F3:J3")

        let OrderF3= worksheet.getCell("F3");
        OrderF3.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }

        let orderQty2 = worksheet.getCell("C4");
        orderQty2.value = "ORDER QTY";
        orderQty2.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        orderQty2.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        orderQty.alignment = { vertical: "middle", horizontal: "left" };

        worksheet.mergeCells("D4:J4")
        let orderQty2Value = worksheet.getCell("D4");
        orderQty2Value.value = null;
        orderQty2Value.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        orderQty2Value.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        orderQty2Value.alignment = { vertical: "middle", horizontal: "left" };


        let Fob = worksheet.getCell("C5");
        Fob.value = "FOB";
        Fob.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        Fob.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        Fob.alignment = { vertical: "middle", horizontal: "left" };


    
        let FobValue = worksheet.getCell("D5");
        FobValue.value = null;
        FobValue.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        FobValue.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        FobValue.alignment = { vertical: "middle", horizontal: "left" };


                
        let FobUnit = worksheet.getCell("E5");
        FobUnit.value = "PCCS";
        FobUnit.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        FobUnit.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        FobUnit.alignment = { vertical: "middle", horizontal: "left" };


        let FobWithOutHangerValue = worksheet.getCell("F5");
        FobWithOutHangerValue.value = "";
        FobWithOutHangerValue.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        FobWithOutHangerValue.fill = {
             type: "pattern",
              pattern: "solid",
              fgColor: { argb: "ff9fe770" },
              bgColor: { argb: "" },
        }
        FobWithOutHangerValue.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        FobWithOutHangerValue.alignment = { vertical: "middle", horizontal: "left" };

        worksheet.mergeCells("G5:J5")
        let FobWithOutHanger = worksheet.getCell("G5");
        FobWithOutHanger.value = "WITHOUT HANGER";
        FobWithOutHanger.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            //color: { argb: "#ff3cb371" },
        };
        FobWithOutHanger.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "ff9fe770" },
            bgColor: { argb: "" },
       }
        FobWithOutHanger.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        FobWithOutHanger.alignment = { vertical: "middle", horizontal: "left" };




        let tValue = worksheet.getCell("C6");
        tValue.value = "VALUE";
        tValue.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        tValue.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        tValue.alignment = { vertical: "middle", horizontal: "left" };


        let tValuedata = worksheet.getCell("D6");
        tValuedata.value = null;
        tValuedata.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        tValuedata.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        tValuedata.alignment = { vertical: "middle", horizontal: "left" };

      
        worksheet.mergeCells("E6:J6")

        let vlaueE6= worksheet.getCell("E6");
        vlaueE6.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }


        if (allData[0].fileStatus == "Y") {
            debugger
            var url = environment.fileUrl + allData[0].filePath;
            //var image = await this.imageUrlToBase64(url);
            //var image1 = await this.toDataURL(url);
            let myLogoImage = workbook.addImage({
                base64: allData[0].imageBase64,
                extension: 'jpeg',
            });
            if (partList.length > 1) {
                worksheet.addImage(myLogoImage, 'T2:V7');
            }
            else {
                worksheet.addImage(myLogoImage, 'K2:M7');
            }

        }



        //----------------new code block-------------------//
        var fabricData1 = allData.filter(x => x.costCategoryGroup == "FABRICS" && x.stylePartId == partList[0].stylePartId);

        var dataForFabric1 = [];
        var dataForExcelFabric1 = [];
        for (var itemFab of fabricData1) {
            var objFabric = {
                item: itemFab.itemName,
                itemDescription: itemFab.itemDescription,
                consumption: itemFab.consumption,
                unitPrice: itemFab.rate,
                totalPrice: itemFab.totalPrice,
                unit: itemFab.unitName,
                remarks: itemFab.remarks,
            };
            dataForFabric1.push(objFabric);
        }

        dataForFabric1.forEach((row: any) => {
            dataForExcelFabric1.push(Object.values(row));
        });

        worksheet.addRow([]);
        let dataTypeFabCell1 = "A" + 8;
        let headerRowFabcric1 = worksheet.addRow(stockHeaderFabric1);
        headerRowFabcric1.eachCell((cell, number) => {
            // cell.fill = {
            //     type: "pattern",
            //     pattern: "solid",
            //     fgColor: { argb: "4167B8" },
            //     bgColor: { argb: "" },
            // };
            cell.font = {
                bold: true,
                //color: { argb: "FFFFFF" },
                size: 12,
            };
            cell.alignment = { vertical: "middle", horizontal: "center" };
            cell.border= {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            cell.alignment = { vertical: "middle", horizontal: "center" };
        });



        var c = 0
        var firstPartFirstRow = 8 + c + 1;
        var firstPartLastRow = 8 + c + 1;
        for (var itemFabPart1 of dataForExcelFabric1) {
            var costrowCountFabricFirstPart = 8 + c + 1;
            let slCellFab = "A" + costrowCountFabricFirstPart; 
            worksheet.getCell(slCellFab).value = c + 1;
            worksheet.getCell(slCellFab).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            worksheet.getCell(slCellFab).alignment = { vertical: "middle", horizontal: "center" };

            let descriptionFabCell = "B" + costrowCountFabricFirstPart; //row.getCell(2).address;
            worksheet.getCell(descriptionFabCell).value = itemFabPart1[0];
            worksheet.getCell(descriptionFabCell).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }


            let conPcCellFab = "C" + costrowCountFabricFirstPart; 
            worksheet.getCell(conPcCellFab).value = itemFabPart1[2];

            worksheet.getCell(conPcCellFab).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }



            let conDzCellFab = "D" + costrowCountFabricFirstPart; 
            worksheet.getCell(conDzCellFab).value = null
            worksheet.getCell(conDzCellFab).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            worksheet.getCell(conDzCellFab).value = {
                formula: `C${costrowCountFabricFirstPart}*12`,
                date1904: false
              }



            let UnitPriceCellFab = "E" + costrowCountFabricFirstPart; 
            worksheet.getCell(UnitPriceCellFab).value = itemFabPart1[3];
            worksheet.getCell(UnitPriceCellFab).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

 

            let unitNameCellFab = "F" + costrowCountFabricFirstPart; 
            worksheet.getCell(unitNameCellFab).value = itemFabPart1[5];
            worksheet.getCell(unitNameCellFab).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }


            let TotalPriceCellFab = "G" + costrowCountFabricFirstPart; 
           // worksheet.getCell(TotalPriceCellFab).value = null;
            worksheet.getCell(TotalPriceCellFab).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            worksheet.getCell(TotalPriceCellFab).value = {
                formula: `D${costrowCountFabricFirstPart}*E${costrowCountFabricFirstPart}`,
                date1904: false
              }




            let blanck1CellFab = "H" + costrowCountFabricFirstPart; 
            worksheet.getCell(blanck1CellFab).value = itemFabPart1[6];
            worksheet.getCell(blanck1CellFab).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            worksheet.getCell(blanck1CellFab).value = {
                formula: `G${costrowCountFabricFirstPart}/12`,
                date1904: false
              }


            let blanck2CellFab = "I" + costrowCountFabricFirstPart; 
            worksheet.getCell(blanck2CellFab).value = itemFabPart1[6];
            worksheet.getCell(blanck2CellFab).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let remarksCellFab = "J" + costrowCountFabricFirstPart; 
            worksheet.getCell(remarksCellFab).value = itemFabPart1[6];
            worksheet.getCell(remarksCellFab).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            firstPartLastRow = costrowCountFabricFirstPart;
            c++
        }

        var fabricTotalCost = firstPartLastRow + 1;
        let TotalPriceSum = "G" + fabricTotalCost; 
         worksheet.getCell(TotalPriceSum).value = {
            formula:`SUM(G${firstPartFirstRow}:G${firstPartFirstRow})`,
            date1904: false
         }
        worksheet.getCell(TotalPriceSum).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        worksheet.getCell(TotalPriceSum).fill= {
            type: "pattern",
             pattern: "solid",
             fgColor: { argb: "fffff447" },
             bgColor: { argb: "" },
         }

        let TotalPriceSumPC = "H" + fabricTotalCost; 
        worksheet.getCell(TotalPriceSumPC).value = {
           formula:`SUM(H${firstPartFirstRow}:H${firstPartFirstRow})`,
           date1904: false
        }
       worksheet.getCell(TotalPriceSumPC).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
       }
       worksheet.getCell(TotalPriceSumPC).fill= {
        type: "pattern",
         pattern: "solid",
         fgColor: { argb: "fffff447" },
         bgColor: { argb: "" },
     }


       worksheet.mergeCells(`A${fabricTotalCost}:F${fabricTotalCost}`);

       let TotalPriceSumFront = "A" + fabricTotalCost; 
        worksheet.getCell(TotalPriceSumFront).value = "TOTAL FABRIC COST"
        worksheet.getCell(TotalPriceSumFront).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        worksheet.getCell(TotalPriceSumFront).fill= {
          type: "pattern",
           pattern: "solid",
           fgColor: { argb: "fffff447" },
           bgColor: { argb: "" },
       }
  
  
        worksheet.mergeCells(`I${fabricTotalCost}:J${fabricTotalCost}`);
  
        let TotalPriceSumBack = "I" + fabricTotalCost; 
        worksheet.getCell(TotalPriceSumBack).value = ""
        worksheet.getCell(TotalPriceSumBack).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
       }
       worksheet.getCell(TotalPriceSumBack).fill= {
          type: "pattern",
           pattern: "solid",
           fgColor: { argb: "fffff447" },
           bgColor: { argb: "" },
   }



       worksheet.addRow([]);
       let headerRowProcess1 = worksheet.addRow(stockHeaderFabric1);
       headerRowFabcric1.eachCell((cell, number) => {
           // cell.fill = {
           //     type: "pattern",
           //     pattern: "solid",
           //     fgColor: { argb: "4167B8" },
           //     bgColor: { argb: "" },
           // };
           cell.font = {
               bold: true,
               //color: { argb: "FFFFFF" },
               size: 12,
           };
           cell.alignment = { vertical: "middle", horizontal: "center" };
           cell.border= {
               top: { style: 'thin' },
               bottom: { style: 'thin' },
               left: { style: 'thin' },
               right: { style: 'thin' }
           }
           cell.alignment = { vertical: "middle", horizontal: "center" };
       });


       var processData1 = allData.filter(x => x.costCategoryGroup == "PROCESS" && x.stylePartId == partList[0].stylePartId);

       var dataForProcesss1 = [];
       var dataForExcelProcesss1 = [];
       for (var itemProcesss1 of processData1) {
           var objProcss = {
               item: itemProcesss1.itemName,
               itemDescription: itemProcesss1.itemDescription,
               consumption: itemProcesss1.consumption,
               unitPrice: itemProcesss1.rate,
               totalPrice: itemProcesss1.totalPrice,
               unit: itemProcesss1.unitName,
               remarks: itemProcesss1.remarks,
           };
           dataForProcesss1.push(objProcss);
       }

       dataForProcesss1.forEach((row: any) => {
        dataForExcelProcesss1.push(Object.values(row));
       });

       var processRow = 0
       var ProcssFirstPartFirstRow = processRow + 8 + c + 1 + 2;
       var ProcssFirstPartLastRow = processRow + 8 + c + 1 + 2;
       for (var itemPoressPart1 of dataForExcelProcesss1) {
           var costrowCountProcessFirstPart = processRow + 8 + c + 1 + 2;
           let slCellFab = "A" + costrowCountProcessFirstPart; 
           worksheet.getCell(slCellFab).value = processRow + 1;
           worksheet.getCell(slCellFab).border = {
               top: { style: 'thin' },
               bottom: { style: 'thin' },
               left: { style: 'thin' },
               right: { style: 'thin' }
           }
           worksheet.getCell(slCellFab).alignment = { vertical: "middle", horizontal: "center" };

           let descriptionFabCell = "B" + costrowCountProcessFirstPart; //row.getCell(2).address;
           worksheet.getCell(descriptionFabCell).value = itemPoressPart1[0];
           worksheet.getCell(descriptionFabCell).border = {
               top: { style: 'thin' },
               bottom: { style: 'thin' },
               left: { style: 'thin' },
               right: { style: 'thin' }
           }


           let conPcCellFab = "C" + costrowCountProcessFirstPart; 
           worksheet.getCell(conPcCellFab).value = itemPoressPart1[2];

           worksheet.getCell(conPcCellFab).border = {
               top: { style: 'thin' },
               bottom: { style: 'thin' },
               left: { style: 'thin' },
               right: { style: 'thin' }
           }



           let conDzCellFab = "D" + costrowCountProcessFirstPart; 
           worksheet.getCell(conDzCellFab).value = null
           worksheet.getCell(conDzCellFab).border = {
               top: { style: 'thin' },
               bottom: { style: 'thin' },
               left: { style: 'thin' },
               right: { style: 'thin' }
           }
           worksheet.getCell(conDzCellFab).value = {
               formula: `C${costrowCountProcessFirstPart}*12`,
               date1904: false
             }



           let UnitPriceCellFab = "E" + costrowCountProcessFirstPart; 
           worksheet.getCell(UnitPriceCellFab).value = itemPoressPart1[3];
           worksheet.getCell(UnitPriceCellFab).border = {
               top: { style: 'thin' },
               bottom: { style: 'thin' },
               left: { style: 'thin' },
               right: { style: 'thin' }
           }



           let unitNameCellFab = "F" + costrowCountProcessFirstPart; 
           worksheet.getCell(unitNameCellFab).value = itemPoressPart1[5];
           worksheet.getCell(unitNameCellFab).border = {
               top: { style: 'thin' },
               bottom: { style: 'thin' },
               left: { style: 'thin' },
               right: { style: 'thin' }
           }


           let TotalPriceCellFab = "G" + costrowCountProcessFirstPart; 
          // worksheet.getCell(TotalPriceCellFab).value = null;
           worksheet.getCell(TotalPriceCellFab).border = {
               top: { style: 'thin' },
               bottom: { style: 'thin' },
               left: { style: 'thin' },
               right: { style: 'thin' }
           }

           worksheet.getCell(TotalPriceCellFab).value = {
               formula: `D${costrowCountProcessFirstPart}*E${costrowCountProcessFirstPart}`,
               date1904: false
             }

           let blanck1CellFab = "H" + costrowCountProcessFirstPart; 
           worksheet.getCell(blanck1CellFab).value = itemPoressPart1[6];
           worksheet.getCell(blanck1CellFab).border = {
               top: { style: 'thin' },
               bottom: { style: 'thin' },
               left: { style: 'thin' },
               right: { style: 'thin' }
           }

           worksheet.getCell(blanck1CellFab).value = {
               formula: `G${costrowCountProcessFirstPart}/12`,
               date1904: false
             }


           let blanck2CellFab = "I" + costrowCountProcessFirstPart; 
           worksheet.getCell(blanck2CellFab).value = itemPoressPart1[6];
           worksheet.getCell(blanck2CellFab).border = {
               top: { style: 'thin' },
               bottom: { style: 'thin' },
               left: { style: 'thin' },
               right: { style: 'thin' }
           }

           let remarksCellFab = "J" + costrowCountProcessFirstPart; 
           worksheet.getCell(remarksCellFab).value = itemPoressPart1[6];
           worksheet.getCell(remarksCellFab).border = {
               top: { style: 'thin' },
               bottom: { style: 'thin' },
               left: { style: 'thin' },
               right: { style: 'thin' }
           }

           ProcssFirstPartLastRow = costrowCountProcessFirstPart;
           processRow++
       }

       var processTotalCost = ProcssFirstPartLastRow + 1;
//        worksheet.addRow(["TOTAL PRINT/HEAT TRANSFER/EMBROIDERY COST"]).fill= {
//         type: "pattern",
//          pattern: "solid",
//          fgColor: { argb: "" },
//          bgColor: { argb: "ffffcc00" },
//  }
       
       let processTotalPriceSum = "G" + processTotalCost; 
        worksheet.getCell(processTotalPriceSum).value = {
           formula:`SUM(G${ProcssFirstPartFirstRow}:G${ProcssFirstPartLastRow})`,
           date1904: false
        }
       worksheet.getCell(processTotalPriceSum).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
       }
       worksheet.getCell(processTotalPriceSum).fill= {
        type: "pattern",
         pattern: "solid",
         fgColor: { argb: "fffff447" },
         bgColor: { argb: "" },
     }


       let processTotalPriceSumPC = "H" + processTotalCost; 
       worksheet.getCell(processTotalPriceSumPC).value = {
          formula:`SUM(H${ProcssFirstPartFirstRow}:H${ProcssFirstPartLastRow})`,
          date1904: false
       }
      worksheet.getCell(processTotalPriceSumPC).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
      }
      worksheet.getCell(processTotalPriceSumPC).fill= {
        type: "pattern",
         pattern: "solid",
         fgColor: { argb: "fffff447" },
         bgColor: { argb: "" },
     }


      worksheet.mergeCells(`A${processTotalCost}:F${processTotalCost}`);

      let processTotalPriceSumFront = "A" + processTotalCost; 
       worksheet.getCell(processTotalPriceSumFront).value = "TTOTAL PRINT/HEAT TRANSFER/EMBROIDERY COST"
       worksheet.getCell(processTotalPriceSumFront).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
       }
       worksheet.getCell(processTotalPriceSumFront).fill= {
         type: "pattern",
          pattern: "solid",
          fgColor: { argb: "fffff447" },
          bgColor: { argb: "" },
      }
 
 
       worksheet.mergeCells(`I${processTotalCost}:J${processTotalCost}`);
 
       let  processTotalPriceSumBack = "I" + processTotalCost; 
       worksheet.getCell( processTotalPriceSumBack).value = ""
       worksheet.getCell( processTotalPriceSumBack).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
      }
      worksheet.getCell(processTotalPriceSumBack).fill= {
         type: "pattern",
          pattern: "solid",
          fgColor: { argb: "fffff447" },
          bgColor: { argb: "" },
  }

      



      var accessoriesData1 = allData.filter(x => x.costCategoryGroup != "FABRICS" && x.costCategoryGroup != "PROCESS" && x.stylePartId == partList[0].stylePartId);

      var dataForAccessories1 = [];
      var dataForExcelAccessories1 = [];
      for (var itemAsc1 of accessoriesData1) {
        var objAccessories1 = {
            item: itemAsc1.itemName,
            itemDescription: itemAsc1.itemDescription,
            consumption: itemAsc1.consumption,
            unitPrice: itemAsc1.rate,
            totalPrice: itemAsc1.totalPrice,
            unit: itemAsc1.unitName,
            wastagePercentage : itemAsc1.wastagePercentage,
            marketRelation: itemAsc1.marketRelation,
            finCostPc: itemAsc1.finCostPc
        };
        dataForAccessories1.push(objAccessories1);
      }
  
      dataForAccessories1.forEach((row: any) => {
        dataForExcelAccessories1.push(Object.values(row));
      });

      
      worksheet.addRow([]);
      let headerRowAceeccessor1 = worksheet.addRow(stockHeaderFabric1);
      headerRowFabcric1.eachCell((cell, number) => {
          // cell.fill = {
          //     type: "pattern",
          //     pattern: "solid",
          //     fgColor: { argb: "4167B8" },
          //     bgColor: { argb: "" },
          // };
          cell.font = {
              bold: true,
              //color: { argb: "FFFFFF" },
              size: 12,
          };
          cell.alignment = { vertical: "middle", horizontal: "center" };
          cell.border= {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
          }
          cell.alignment = { vertical: "middle", horizontal: "center" };
      });




      var accessorRow = 0
      var AccessorFirstPartFirstRow = accessorRow + 8 + c + 1 + 2 + processRow + 2;
      var AccessorFirstPartLastRow = accessorRow + 8 + c + 1 + 2 + processRow  + 2;
      for (var itemAccessorPart1 of dataForExcelAccessories1) {
          var costrowCountProcessFirstPart = accessorRow + 8 + c + 1 + 2 + processRow + 2;
          let slCellFab = "A" + costrowCountProcessFirstPart; 
          worksheet.getCell(slCellFab).value = accessorRow + 1;
          worksheet.getCell(slCellFab).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
          }
          worksheet.getCell(slCellFab).alignment = { vertical: "middle", horizontal: "center" };

          let descriptionFabCell = "B" + costrowCountProcessFirstPart; //row.getCell(2).address;
          worksheet.getCell(descriptionFabCell).value = itemAccessorPart1[0];
          worksheet.getCell(descriptionFabCell).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
          }


          let conPcCellFab = "C" + costrowCountProcessFirstPart; 
          worksheet.getCell(conPcCellFab).value = itemAccessorPart1[2];

          worksheet.getCell(conPcCellFab).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
          }



          let conDzCellFab = "D" + costrowCountProcessFirstPart; 
          worksheet.getCell(conDzCellFab).value = null
          worksheet.getCell(conDzCellFab).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
          }
          worksheet.getCell(conDzCellFab).value = {
              formula: `C${costrowCountProcessFirstPart}*12`,
              date1904: false
            }



          let UnitPriceCellFab = "E" + costrowCountProcessFirstPart; 
          worksheet.getCell(UnitPriceCellFab).value = itemAccessorPart1[3];
          worksheet.getCell(UnitPriceCellFab).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
          }



          let unitNameCellFab = "F" + costrowCountProcessFirstPart; 
          worksheet.getCell(unitNameCellFab).value = itemAccessorPart1[5];
          worksheet.getCell(unitNameCellFab).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
          }


          let TotalPriceCellFab = "G" + costrowCountProcessFirstPart; 
         // worksheet.getCell(TotalPriceCellFab).value = null;
          worksheet.getCell(TotalPriceCellFab).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
          }

   debugger
      var flAcs1 = "";
      var finalFLAcs1 = "";
      var qtyDzTempAcs1 = `((D${costrowCountProcessFirstPart} + ( D${costrowCountProcessFirstPart} *(${itemAccessorPart1[6]}%)))/${itemAccessorPart1[7]})*E${costrowCountProcessFirstPart}`;
      if (itemAccessorPart1[7] == 1) {

        flAcs1 = `(${qtyDzTempAcs1}  + ${qtyDzTempAcs1}*(${itemAccessorPart1[8]}/100))`;

      }
      else {
        flAcs1 = `(${qtyDzTempAcs1} +${itemAccessorPart1[8]})`;
      }

      if (itemAccessorPart1[0] == "CMQ") {
        finalFLAcs1 = `(D${costrowCountProcessFirstPart}*${itemAccessorPart1[8]})/12`;

      }
      else {
        finalFLAcs1 = flAcs1;
      }
      worksheet.getCell(TotalPriceCellFab).value = {
        formula: finalFLAcs1,
        date1904: false
      }



          let blanck1CellFab = "H" + costrowCountProcessFirstPart; 
          worksheet.getCell(blanck1CellFab).value = itemAccessorPart1[6];
          worksheet.getCell(blanck1CellFab).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
          }

          worksheet.getCell(blanck1CellFab).value = {
              formula: `G${costrowCountProcessFirstPart}/12`,
              date1904: false
            }


          let blanck2CellFab = "I" + costrowCountProcessFirstPart; 
          worksheet.getCell(blanck2CellFab).value = null;
          worksheet.getCell(blanck2CellFab).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
          }

          let remarksCellFab = "J" + costrowCountProcessFirstPart; 
          worksheet.getCell(remarksCellFab).value = null;
          worksheet.getCell(remarksCellFab).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
          }

          AccessorFirstPartLastRow = costrowCountProcessFirstPart;
          accessorRow++
      }

      var accessorTotalCost = AccessorFirstPartLastRow + 1;
  
      let accessorTotalPriceSum = "G" + accessorTotalCost; 
       worksheet.getCell(accessorTotalPriceSum).value = {
          formula:`SUM(G${AccessorFirstPartFirstRow}:G${AccessorFirstPartLastRow})`,
          date1904: false
       }
      worksheet.getCell(accessorTotalPriceSum).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
      }
      worksheet.getCell(accessorTotalPriceSum).fill= {
        type: "pattern",
         pattern: "solid",
         fgColor: { argb: "fffff447" },
         bgColor: { argb: "" },
     }

     
      let accessorTotalPriceSumPC = "H" + accessorTotalCost; 
      worksheet.getCell(accessorTotalPriceSumPC).value = {
         formula:`SUM(H${AccessorFirstPartFirstRow}:H${AccessorFirstPartLastRow})`,
         date1904: false
      }
     worksheet.getCell(accessorTotalPriceSumPC).border = {
         top: { style: 'thin' },
         bottom: { style: 'thin' },
         left: { style: 'thin' },
         right: { style: 'thin' }
     }
     worksheet.getCell(accessorTotalPriceSumPC).fill= {
        type: "pattern",
         pattern: "solid",
         fgColor: { argb: "fffff447" },
         bgColor: { argb: "" },
 }


     worksheet.mergeCells(`A${accessorTotalCost}:F${accessorTotalCost}`);

     let accessorTotalPriceSumFront = "A" + accessorTotalCost; 
       worksheet.getCell(accessorTotalPriceSumFront).value = "TOTAL ACC'RIES COST"
      worksheet.getCell(accessorTotalPriceSumFront).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
      }
      worksheet.getCell(accessorTotalPriceSumFront).fill= {
        type: "pattern",
         pattern: "solid",
         fgColor: { argb: "fffff447" },
         bgColor: { argb: "" },
 }


      worksheet.mergeCells(`I${accessorTotalCost}:J${accessorTotalCost}`);

      let accessorTotalPriceSumBack = "I" + accessorTotalCost; 
      worksheet.getCell(accessorTotalPriceSumBack).value = ""
      worksheet.getCell(accessorTotalPriceSumBack).border = {
         top: { style: 'thin' },
         bottom: { style: 'thin' },
         left: { style: 'thin' },
         right: { style: 'thin' }
     }
     worksheet.getCell(accessorTotalPriceSumBack).fill= {
        type: "pattern",
         pattern: "solid",
         fgColor: { argb: "fffff447" },
         bgColor: { argb: "" },
 }




    var performRowCount =accessorTotalCost+2;
    let performencSum = "B" +performRowCount; 
     worksheet.getCell(performencSum).value = "FAB PERFORMANCE+ FAB RSL+ ACC RSL+Garment PERFORMANCE + FABRIC CPSIA"
    worksheet.getCell(performencSum).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
    }

    let performencSumValue = "C" +performRowCount; 
    worksheet.getCell(performencSumValue).value =  0;
   worksheet.getCell(performencSumValue).border = {
       top: { style: 'thin' },
       bottom: { style: 'thin' },
       left: { style: 'thin' },
       right: { style: 'thin' }
   }

   let performencSumValuePc = "D" +performRowCount; 
   worksheet.getCell(performencSumValuePc).value =  null;
   worksheet.getCell(performencSumValuePc).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }

    
    worksheet.getCell(performencSumValuePc).value = {
        formula: `C${performRowCount}/12`,
        date1904: false
      }

  
  let performencBlank1 = "E" +performRowCount; 
  worksheet.getCell(performencBlank1).value =  null;
  worksheet.getCell(performencBlank1).border = {
     top: { style: 'thin' },
     bottom: { style: 'thin' },
     left: { style: 'thin' },
     right: { style: 'thin' }
  }

  worksheet.mergeCells(`F${performRowCount}:J${performRowCount}`);
  let performencBlank2 = "F" +performRowCount; 
  worksheet.getCell(performencBlank2).value =  null;
  worksheet.getCell(performencBlank2).border = {
     top: { style: 'thin' },
     bottom: { style: 'thin' },
     left: { style: 'thin' },
     right: { style: 'thin' }
  }

var otherRowount = performRowCount + 1
  let OtherComcSum = "B" +otherRowount; 
  worksheet.getCell(OtherComcSum).value = "Others/Commercial"
 worksheet.getCell(OtherComcSum).border = {
     top: { style: 'thin' },
     bottom: { style: 'thin' },
     left: { style: 'thin' },
     right: { style: 'thin' }
 }

 let OtherComcSumValue = "C" +otherRowount; 
 worksheet.getCell(OtherComcSumValue).value =  0;
worksheet.getCell(OtherComcSumValue).border = {
    top: { style: 'thin' },
    bottom: { style: 'thin' },
    left: { style: 'thin' },
    right: { style: 'thin' }
}

let OtherComcSumValuePc = "D" +otherRowount; 
worksheet.getCell(OtherComcSumValuePc).value =  null;
worksheet.getCell(OtherComcSumValuePc).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 worksheet.getCell(OtherComcSumValuePc).value = {
    formula: `C${otherRowount}/12`,
    date1904: false
  }


let OtherComcBlank1 = "E" +otherRowount; 
worksheet.getCell(OtherComcBlank1).value =  null;
worksheet.getCell(OtherComcBlank1).border = {
  top: { style: 'thin' },
  bottom: { style: 'thin' },
  left: { style: 'thin' },
  right: { style: 'thin' }
}

worksheet.mergeCells(`F${otherRowount}:J${otherRowount}`);
let OtherComcBlank2 = "F" +otherRowount; 
worksheet.getCell(OtherComcBlank2).value =  null;
worksheet.getCell(OtherComcBlank2).border = {
  top: { style: 'thin' },
  bottom: { style: 'thin' },
  left: { style: 'thin' },
  right: { style: 'thin' }
}

var cmRowCount = otherRowount + 1
  let cmSum  = "B" +cmRowCount; 
  worksheet.getCell(cmSum).value = "CM"
  worksheet.getCell(cmSum).border = {
     top: { style: 'thin' },
     bottom: { style: 'thin' },
     left: { style: 'thin' },
     right: { style: 'thin' }
  }
 worksheet.getCell(cmSum).fill= {
    type: "pattern",
     pattern: "solid",
     fgColor: { argb: "ffffe0cb" },
     bgColor: { argb: "" },
 }

 let cmSumValue = "C" +cmRowCount; 
 worksheet.getCell(cmSumValue).value = allData[0].costingSummaryReportItem.find(x => x.costCategoryGroup ="CM").totalDznQty;
 worksheet.getCell(cmSumValue).border = {
    top: { style: 'thin' },
    bottom: { style: 'thin' },
    left: { style: 'thin' },
    right: { style: 'thin' }
}
worksheet.getCell(cmSumValue).fill= {
    type: "pattern",
     pattern: "solid",
     fgColor: { argb: "ffffe0cb" },
     bgColor: { argb: "" },
 }


let cmSumValuePc = "D" +cmRowCount; 
worksheet.getCell(cmSumValuePc).value =  null;
worksheet.getCell(cmSumValuePc).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }
 worksheet.getCell(cmSumValuePc).fill= {
    type: "pattern",
     pattern: "solid",
     fgColor: { argb: "ffffe0cb" },
     bgColor: { argb: "" },
 }

 worksheet.getCell(cmSumValuePc).value = {
    formula: `C${cmRowCount}/12`,
    date1904: false
  }


let cmBlank1 = "E" +cmRowCount; 
worksheet.getCell(cmBlank1).value =  null;
worksheet.getCell(cmBlank1).border = {
  top: { style: 'thin' },
  bottom: { style: 'thin' },
  left: { style: 'thin' },
  right: { style: 'thin' }
}
worksheet.getCell(cmBlank1).fill= {
    type: "pattern",
     pattern: "solid",
     fgColor: { argb: "ffffe0cb" },
     bgColor: { argb: "" },
 }

worksheet.mergeCells(`F${cmRowCount}:J${cmRowCount}`);
let cmBlank2 = "F" +cmRowCount; 
worksheet.getCell(cmBlank2).value =  null;
worksheet.getCell(cmBlank2).border = {
  top: { style: 'thin' },
  bottom: { style: 'thin' },
  left: { style: 'thin' },
  right: { style: 'thin' }
}
worksheet.getCell(cmBlank2).fill= {
    type: "pattern",
     pattern: "solid",
     fgColor: { argb: "ffffe0cb" },
     bgColor: { argb: "" },
 }

var totalPriceDozenRowCount = cmRowCount  + 1
  let TotalPriceDozenSum  = "B" +totalPriceDozenRowCount; 
  worksheet.getCell(TotalPriceDozenSum).value = "Total Price / Dozen "
 worksheet.getCell(TotalPriceDozenSum).border = {
     top: { style: 'thin' },
     bottom: { style: 'thin' },
     left: { style: 'thin' },
     right: { style: 'thin' }
 }

 let TotalPriceDozenSumValue = "C" +totalPriceDozenRowCount; 
 worksheet.getCell(TotalPriceDozenSumValue).value =  null;
worksheet.getCell(TotalPriceDozenSumValue).border = {
    top: { style: 'thin' },
    bottom: { style: 'thin' },
    left: { style: 'thin' },
    right: { style: 'thin' }
}


worksheet.getCell(TotalPriceDozenSumValue).value = {
    formula:`G${firstPartLastRow+1}+G${ProcssFirstPartLastRow+1}+G${AccessorFirstPartLastRow+1}+C${performRowCount}+C${otherRowount}+C${cmRowCount}`,
    date1904: false
}


let TotalPriceDozenSumValuePc = "D" +totalPriceDozenRowCount; 
worksheet.getCell(TotalPriceDozenSumValuePc).value =  null;
worksheet.getCell(TotalPriceDozenSumValuePc).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

 worksheet.getCell(TotalPriceDozenSumValuePc).value = {
    formula: `C${totalPriceDozenRowCount}/12`,
    date1904: false
  }


let TotalPriceDozenBlank1 = "E" +totalPriceDozenRowCount; 
worksheet.getCell(TotalPriceDozenBlank1).value =  null;
worksheet.getCell(TotalPriceDozenBlank1).border = {
  top: { style: 'thin' },
  bottom: { style: 'thin' },
  left: { style: 'thin' },
  right: { style: 'thin' }
}

worksheet.mergeCells(`F${totalPriceDozenRowCount}:J${totalPriceDozenRowCount}`);
let TotalPriceDozenBlank2 = "F" +totalPriceDozenRowCount; 
worksheet.getCell(TotalPriceDozenBlank2).value =  null;
worksheet.getCell(TotalPriceDozenBlank2).border = {
  top: { style: 'thin' },
  bottom: { style: 'thin' },
  left: { style: 'thin' },
  right: { style: 'thin' }
}




var totalPricePecRowCount = totalPriceDozenRowCount + 1
  let TotalPricePecSum  = "B" +totalPricePecRowCount; 
  worksheet.getCell(TotalPricePecSum).value = "Total Price / Pec "
 worksheet.getCell(TotalPricePecSum).border = {
     top: { style: 'thin' },
     bottom: { style: 'thin' },
     left: { style: 'thin' },
     right: { style: 'thin' }
 }

 let TotalPricePecSumValue = "C" +totalPricePecRowCount; 
 worksheet.getCell(TotalPricePecSumValue).value =  {
    formula: `C${totalPriceDozenRowCount}/12`,
    date1904: false
 }
worksheet.getCell(TotalPricePecSumValue).border = {
    top: { style: 'thin' },
    bottom: { style: 'thin' },
    left: { style: 'thin' },
    right: { style: 'thin' }
}

let TotalPricePecSumValuePc = "D" +totalPricePecRowCount; 
worksheet.getCell(TotalPricePecSumValuePc).value =  {
    formula:`D${totalPriceDozenRowCount}`,
    date1904:false
};
worksheet.getCell(TotalPricePecSumValuePc).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }


let TotalPricePecBlank1 = "E" +totalPricePecRowCount; 
worksheet.getCell(TotalPricePecBlank1).value =  null;
worksheet.getCell(TotalPricePecBlank1).border = {
  top: { style: 'thin' },
  bottom: { style: 'thin' },
  left: { style: 'thin' },
  right: { style: 'thin' }
}

worksheet.mergeCells(`F${totalPricePecRowCount}:J${totalPricePecRowCount}`);
let TotalPricePecBlank2 = "F" +totalPricePecRowCount; 
worksheet.getCell(TotalPricePecBlank2).value =  null;
worksheet.getCell(TotalPricePecBlank2).border = {
  top: { style: 'thin' },
  bottom: { style: 'thin' },
  left: { style: 'thin' },
  right: { style: 'thin' }
}

var HaddadCommissonRowCount = totalPricePecRowCount + 1
let HaddadCommissonSum  = "B" + HaddadCommissonRowCount; 
  worksheet.getCell(HaddadCommissonSum).value = "HADDAD COMMISSION - 2%"
 worksheet.getCell(HaddadCommissonSum).border = {
     top: { style: 'thin' },
     bottom: { style: 'thin' },
     left: { style: 'thin' },
     right: { style: 'thin' }
 }

 var buyingCommission = allData[0].buyingCommission/100;

 let HaddadCommissonSumValue = "C" +HaddadCommissonRowCount; 
 worksheet.getCell(HaddadCommissonSumValue).value = {
    formula:`C${totalPricePecRowCount}*${buyingCommission}`,
    date1904:false

 };
worksheet.getCell(HaddadCommissonSumValue).border = {
    top: { style: 'thin' },
    bottom: { style: 'thin' },
    left: { style: 'thin' },
    right: { style: 'thin' }
}

let HaddadCommissonSumValuePc = "D" +HaddadCommissonRowCount; 
worksheet.getCell(HaddadCommissonSumValuePc).value =  {
    formula:`D${totalPricePecRowCount}*${buyingCommission}`,
    date1904:false

 };
worksheet.getCell(HaddadCommissonSumValuePc).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }


let HaddadCommissonBlank1 = "E" +HaddadCommissonRowCount; 
worksheet.getCell(HaddadCommissonBlank1).value =  null;
worksheet.getCell(HaddadCommissonBlank1).border = {
  top: { style: 'thin' },
  bottom: { style: 'thin' },
  left: { style: 'thin' },
  right: { style: 'thin' }
}

worksheet.mergeCells(`F${HaddadCommissonRowCount}:J${HaddadCommissonRowCount}`);
let HaddadCommissonBlank2 = "F" +HaddadCommissonRowCount; 
worksheet.getCell(HaddadCommissonBlank2).value =  null;
worksheet.getCell(HaddadCommissonBlank2).border = {
  top: { style: 'thin' },
  bottom: { style: 'thin' },
  left: { style: 'thin' },
  right: { style: 'thin' }
}



var GrandTotalRowCount = HaddadCommissonRowCount + 1
  let GrandTotalSum  = "B" +GrandTotalRowCount; 
  worksheet.getCell(GrandTotalSum).value = "Grand total FOB"
 worksheet.getCell(GrandTotalSum).border = {
     top: { style: 'thin' },
     bottom: { style: 'thin' },
     left: { style: 'thin' },
     right: { style: 'thin' }
 }
 worksheet.getCell(GrandTotalSum).fill= {
    type: "pattern",
     pattern: "solid",
     fgColor: { argb: "ff91b788" },
     bgColor: { argb: "" },
 }


 let GrandTotalSumValue = "C" +GrandTotalRowCount; 
 worksheet.getCell(GrandTotalSumValue).value =  {
    formula:`C${totalPricePecRowCount}+C${HaddadCommissonRowCount}`,
    date1904: false
 }
worksheet.getCell(GrandTotalSumValue).border = {
    top: { style: 'thin' },
    bottom: { style: 'thin' },
    left: { style: 'thin' },
    right: { style: 'thin' }
}
worksheet.getCell(GrandTotalSumValue).fill= {
    type: "pattern",
     pattern: "solid",
     fgColor: { argb: "ff91b788" },
     bgColor: { argb: "" },
 }


let GrandTotalSumValuePc = "D" +GrandTotalRowCount; 
worksheet.getCell(GrandTotalSumValuePc).value =   {
    formula:`D${totalPricePecRowCount}+D${HaddadCommissonRowCount}`,
    date1904: false
 }
worksheet.getCell(GrandTotalSumValuePc).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }
 worksheet.getCell(GrandTotalSumValuePc).fill= {
    type: "pattern",
     pattern: "solid",
     fgColor: { argb: "ff91b788" },
     bgColor: { argb: "" },
 }



let GrandTotalBlank1 = "E" +GrandTotalRowCount; 
worksheet.getCell(GrandTotalBlank1).value =  null;
worksheet.getCell(GrandTotalBlank1).border = {
  top: { style: 'thin' },
  bottom: { style: 'thin' },
  left: { style: 'thin' },
  right: { style: 'thin' }
}
worksheet.getCell(GrandTotalBlank1).fill= {
    type: "pattern",
     pattern: "solid",
     fgColor: { argb: "ff91b788" },
     bgColor: { argb: "" },
 }


worksheet.mergeCells(`F${GrandTotalRowCount}:J${GrandTotalRowCount}`);
let GrandTotalBlank2 = "F" +GrandTotalRowCount; 
worksheet.getCell(GrandTotalBlank2).value =  null;
worksheet.getCell(GrandTotalBlank2).border = {
  top: { style: 'thin' },
  bottom: { style: 'thin' },
  left: { style: 'thin' },
  right: { style: 'thin' }
}
worksheet.getCell(GrandTotalBlank2).fill= {
    type: "pattern",
     pattern: "solid",
     fgColor: { argb: "ff91b788" },
     bgColor: { argb: "" },
 }




FobValue.value ={
    formula:`C${GrandTotalRowCount}`,
    date1904:false
}
tValuedata.value = {
    formula:`${FobValue.address}*${orderQtyValue.address}`,
    date1904:false
};


        worksheet.columns.forEach(function (column, i) {
            // debugger  
            if (i == 1) {
                var maxLength = 0;

                
                column["eachCell"]({ includeEmpty: false }, function (cell) {
                    var columnLength = cell.value ? cell.value.toString().length : 10;
                    if (columnLength > maxLength) {
                        maxLength = columnLength;
                    }
                });
                column.width = maxLength < 10 ? 10 : 30;
            }
        });


        workbook.xlsx.writeBuffer().then((data) => {
            let blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            fs.saveAs(blob, title + ".xlsx");
        });

    }



}
