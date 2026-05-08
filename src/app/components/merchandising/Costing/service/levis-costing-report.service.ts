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
export class LevisCostingReportService {
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


    async exportLevisExcelReport(excelData) {
        //debugger
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
            "Qty/Dz",
            "Unit",
            "Unit Price",
            "Freight",
            "Total Price",
            "Supplier Name",
            "Remarks",
        ];

        let d = new Date();
        let date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

        worksheet.mergeCells("A1", "H1");
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
        season.value = "Season ";
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


        let optionData = worksheet.getCell("D2");
        optionData.value = partList[0].costOption;
        optionData.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        optionData.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        optionData.alignment = { vertical: "middle", horizontal: "left" };


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

        worksheet.addRow([]);
        let dataTypeFabCell1 = "A" + 6;
        //worksheet.getCell(dataTypeFabCell1).value = "FABRICS";

        //debugger
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




        var fistPartData = allData.filter(x => x.stylePartId == partList[0].stylePartId);

        var dataForFirstPart = [];
        var dataForExcelForFirstPart = [];
        for (var itemPart1 of fistPartData) {
            var objFabric1 = {
                item: itemPart1.itemName,
                //itemDescription: itemPart1.itemDescription,      
                //qtyDz:(itemPart1.consumption+(itemPart1.wastagePercentage/100))*12,
                qtyDz: itemPart1.qtyDz,
                unit: itemPart1.unitName,
                unitPrice: itemPart1.rate,
                totalPrice: itemPart1.totalPrice,
                supplierName: itemPart1.supplierDescription,
                remarks: itemPart1.remarks,
                consumption: itemPart1.consumption,
                wastagePercentage: itemPart1.wastagePercentage,
                marketRelation: itemPart1.marketRelation,
                itemId: itemPart1.itemId,
                itemType: itemPart1.itemType,
                cuttAbleWidth: itemPart1.cuttAbleWidth,
                cmPc: itemPart1.cmPc,
                finCostPc: itemPart1.finCostPc,
                buyingCommission: itemPart1.buyingCommission


            };
            dataForFirstPart.push(objFabric1);
        }

        dataForFirstPart.forEach((row: any) => {
            dataForExcelForFirstPart.push(Object.values(row));
        });
        var c = 0
        var firstPartFirstRow = 6 + c + 1;
        var firstPartLastRow = 6 + c + 1;
        for (var itemPart1 of dataForExcelForFirstPart) {
            //debugger
            var costrowCountitemFirstPart = 6 + c + 1;
            let itemCell = "B" + costrowCountitemFirstPart;// row.getCell(1).address;
            worksheet.getCell(itemCell).value = itemPart1[0];


            if ((dataForExcelForFirstPart.length - 1) == c) {
                //debugger
                worksheet.getCell(itemCell).border = {
                    // top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    //right: { style: 'thin' }
                }
            }
            else {
                worksheet.getCell(itemCell).border = {
                    // top: { style: 'thin' },
                    // bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    //right: { style: 'thin' }
                }
            }



            ///-------------calculatinon--------------///
            //debugger
            var unitPrice1 = "";
            var qtyDz1 = "";
            if (itemPart1[11] == "F") {
                var consWithWastage = `(${itemPart1[7]} + (${itemPart1[7]} *(${itemPart1[8]}%)))`;
                qtyDz1 = `((( ${consWithWastage}*${itemPart1[12]})/36)* 12)`;

                if (itemPart1[12] != 0) {
                    unitPrice1 = `((${itemPart1[3]} + ${itemPart1[14]})*36)/ ${itemPart1[12]}`;
                }
            }
            else if (itemPart1[11] == "A") {
                //debugger
                if (itemPart1[10] == 115) {
                    unitPrice1 = `${itemPart1[3]}`;
                    qtyDz1 = `((${itemPart1[7]} *12) + ((${itemPart1[7]} *12 ) * (${itemPart1[8]}/100)))/ ${itemPart1[9]}`;
                }
                else if (itemPart1[10] == 125) {
                    unitPrice1 = `${itemPart1[3]} + ${itemPart1[14]}`;
                    qtyDz1 = `((${itemPart1[7]}*12) + ((${itemPart1[7]} * 12 ) * (${itemPart1[8]}/100)))/${itemPart1[9]}`;
                }
                else {
                    if (itemPart1[9] != 0) {
                        unitPrice1 = `(${itemPart1[3]} /${itemPart1[9]}) + ((${itemPart1[3]}/${itemPart1[9]}) * (${itemPart1[14]}/100))`;
                        qtyDz1 = `(${itemPart1[7]}*12) + ((${itemPart1[7]}* 12) * (${itemPart1[8]}/100))`;
                    }
                }
            }
            else {
                unitPrice1 = `(((${itemPart1[13]}*12 )*12)/12)`;
                qtyDz1 = `${itemPart1[1]}`;
            }


            let qtyDzCellFab = "C" + costrowCountitemFirstPart; //row.getCell(4).address;
            //worksheet.getCell(qtyDzCellFab).value = itemPart1[1];
            if ((dataForExcelForFirstPart.length - 1) == c) {
                debugger
                worksheet.getCell(qtyDzCellFab).border = {
                    //top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    //left: { style: 'thin' },
                    // right: { style: 'thin' }
                }

            }
            else {
                worksheet.getCell(qtyDzCellFab).border = {
                    //top: { style: 'thin' },
                    // bottom: { style: 'thin' },
                    // left: { style: 'thin' },
                    // right: { style: 'thin' }
                }

            }


            worksheet.getCell(qtyDzCellFab).value = {
                formula: qtyDz1,
                date1904: false
            }

            let unitCellFab = "D" + costrowCountitemFirstPart; //row.getCell(5).address;
            worksheet.getCell(unitCellFab).value = itemPart1[2];

            if ((dataForExcelForFirstPart.length - 1) == c) {
                //debugger
                worksheet.getCell(unitCellFab).border = {
                    // top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    //left: { style: 'thin' },
                    // right: { style: 'thin' }
                }

            }
            else {
                worksheet.getCell(unitCellFab).border = {
                    // top: { style: 'thin' },
                    //  bottom: { style: 'thin' },
                    // left: { style: 'thin' },
                    // right: { style: 'thin' }
                }

            }


            let unitPriceCellFab = "E" + costrowCountitemFirstPart; //row.getCell(5).address;
            //worksheet.getCell(unitPriceCellFab).value = itemPart1[3];


            if ((dataForExcelForFirstPart.length - 1) == c) {
                //debugger
                worksheet.getCell(unitPriceCellFab).border = {
                    //top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    //left: { style: 'thin' },
                    // right: { style: 'thin' }
                }
            }
            else {
                worksheet.getCell(unitPriceCellFab).border = {
                    //top: { style: 'thin' },
                    // bottom: { style: 'thin' },
                    // left: { style: 'thin' },
                    // right: { style: 'thin' }
                }

            }


            if (itemPart1[0] == "CMQ") {
                //debugger
                worksheet.getCell(unitPriceCellFab).value =
                {
                    formula: `${itemPart1[13]}`,
                    date1904: false
                }
            }
            else {
                if (unitPrice1 != "") {
                    worksheet.getCell(unitPriceCellFab).value = {
                        formula: unitPrice1,
                        date1904: false
                    }
                }

            }


            let FreightCellFab = "F" + costrowCountitemFirstPart; //row.getCell(5).address;
            worksheet.getCell(FreightCellFab).value = itemPart1[14];

            if ((dataForExcelForFirstPart.length - 1) == c) {
                //debugger
                worksheet.getCell(FreightCellFab).border = {
                    // top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    //left: { style: 'thin' },
                    // right: { style: 'thin' }
                }

            }
            else {
                worksheet.getCell(FreightCellFab).border = {
                    // top: { style: 'thin' },
                    // bottom: { style: 'thin' },
                    // left: { style: 'thin' },
                    // right: { style: 'thin' }
                }

            }


            let totalPriceCellFab = "G" + costrowCountitemFirstPart; //row.getCell(5).address;
            worksheet.getCell(totalPriceCellFab).value = itemPart1[4];

            if ((dataForExcelForFirstPart.length - 1) == c) {
                //debugger
                worksheet.getCell(totalPriceCellFab).border = {
                    // top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    //left: { style: 'thin' },
                    // right: { style: 'thin' }
                }

            }
            else {
                worksheet.getCell(totalPriceCellFab).border = {
                    // top: { style: 'thin' },
                    // bottom: { style: 'thin' },
                    // left: { style: 'thin' },
                    // right: { style: 'thin' }
                }

            }

            worksheet.getCell(totalPriceCellFab).value = {
                formula: `(C${costrowCountitemFirstPart}*E${costrowCountitemFirstPart})`,
                date1904: false
            }

            let supplierNameCellFab = "H" + costrowCountitemFirstPart;// row.getCell(3).address;
            worksheet.getCell(supplierNameCellFab).value = itemPart1[5];
            if ((dataForExcelForFirstPart.length - 1) == c) {
                //debugger
                worksheet.getCell(supplierNameCellFab).border = {
                    // top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    //left: { style: 'thin' },
                    // right: { style: 'thin' }
                }

            }
            else {
                worksheet.getCell(supplierNameCellFab).border = {
                    // top: { style: 'thin' },
                    //  bottom: { style: 'thin' },
                    // left: { style: 'thin' },
                    // right: { style: 'thin' }
                }

            }


            let remarksCellFab = "I" + costrowCountitemFirstPart; //row.getCell(5).address;
            //worksheet.getCell(remarksCellFab).value = itemPart1[6];

            if (itemPart1[6] == null) {
                worksheet.getCell(remarksCellFab).value = " ";
            }
            else {
                worksheet.getCell(remarksCellFab).value = itemPart1[6];
            }

            if ((dataForExcelForFirstPart.length - 1) == c) {
                //debugger
                worksheet.getCell(remarksCellFab).border = {
                    // top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    //left: { style: 'thin' },
                    right: { style: 'thin' }
                }

            }
            else {
                worksheet.getCell(remarksCellFab).border = {
                    // top: { style: 'thin' },
                    //  bottom: { style: 'thin' },
                    // left: { style: 'thin' },
                    right: { style: 'thin' }
                }

            }


            let slCellFab = "A" + costrowCountitemFirstPart; //row.getCell(5).address;
            worksheet.getCell(slCellFab).value = c + 1;

            if ((dataForExcelForFirstPart.length - 1) == c) {
                //debugger
                worksheet.getCell(slCellFab).border = {
                    // top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    //right: { style: 'thin' }
                }

            }
            else {
                worksheet.getCell(slCellFab).border = {
                    // top: { style: 'thin' },
                    //  bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

            }
            worksheet.getCell(slCellFab).alignment = { vertical: "middle", horizontal: "center" };

            firstPartLastRow = costrowCountitemFirstPart;
            c++
        }


        var valFirstPart = costrowCountitemFirstPart + 1;
        let toalalFirstPartQ1 = "F" + valFirstPart;
        worksheet.getCell(toalalFirstPartQ1).value = "Total Value";
        worksheet.getCell(toalalFirstPartQ1).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        worksheet.getCell(toalalFirstPartQ1).font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        }

        let toalaltoalalFirstPartQ1Cell1 = "G" + valFirstPart;
        worksheet.getCell(toalaltoalalFirstPartQ1Cell1).value = 0;
        if (dataForExcelForFirstPart.length > 0) {
            worksheet.getCell(toalaltoalalFirstPartQ1Cell1).value = {
                formula: `SUM(G${firstPartFirstRow}:G${firstPartLastRow})`,
                date1904: false
            };
        }
        worksheet.getCell(toalaltoalalFirstPartQ1Cell1).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        worksheet.getCell(toalaltoalalFirstPartQ1Cell1).font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        }

        let toalaltoalalFirstPartQ1Cell11 = "H" + valFirstPart;
        worksheet.getCell(toalaltoalalFirstPartQ1Cell11).value = 0;
        if (dataForExcelForFirstPart.length > 0) {
            worksheet.getCell(toalaltoalalFirstPartQ1Cell11).value = {
                formula: `G${valFirstPart}/12`,
                date1904: false
            };
        }
        worksheet.getCell(toalaltoalalFirstPartQ1Cell11).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        worksheet.getCell(toalaltoalalFirstPartQ1Cell11).font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        }
        worksheet.getCell(toalaltoalalFirstPartQ1Cell11).alignment = { vertical: "middle", horizontal: "left" };

        var fobFirstPart = costrowCountitemFirstPart;

        let toalalSecondPartcCell111 = "H" + fobFirstPart;
        worksheet.getCell(toalalSecondPartcCell111).value = 0;
        if (dataForExcelForFirstPart.length > 0) {
            worksheet.getCell(toalalSecondPartcCell111).value = {
                formula: `H${valFirstPart}+(H${valFirstPart}*(${dataForFirstPart[0].buyingCommission}/100))`,
                date1904: false
            };
        }
        worksheet.getCell(toalalSecondPartcCell111).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        worksheet.getCell(toalalSecondPartcCell111).font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        }
        worksheet.getCell(toalalSecondPartcCell111).alignment = { vertical: "middle", horizontal: "left" };



    
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
            season2.value = "Season";
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
            option2.value = "Option ";
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


            let optionData2 = worksheet.getCell("N2");
            optionData2.value = partList[0].costOption;
            optionData2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            optionData2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            optionData2.alignment = { vertical: "middle", horizontal: "left" };


            let dataTypeFabCell2 = "K" + 6;

            var costRowCount = 6;

            let f11 = worksheet.getCell("K" + costRowCount);
            f11.value = "SL";
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
            f2.value = "Qty/Dz";
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


            let f3 = worksheet.getCell("N" + costRowCount);
            f3.value = "Unit";
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

            let f4 = worksheet.getCell("O" + costRowCount);
            f4.value = "Unit Price";
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

            let f5_1 = worksheet.getCell("P" + costRowCount);
            f5_1.value = "Freight";
            f5_1.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "4167B8" },
                bgColor: { argb: "" },
            };
            f5_1.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            f5_1.alignment = { vertical: "middle", horizontal: "center" };

            let f5 = worksheet.getCell("Q" + costRowCount);
            f5.value = "Total Price";
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

            let f7 = worksheet.getCell("R" + costRowCount);
            f7.value = "Supplier Name";
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



            var secondPartData = allData.filter(x => x.stylePartId == partList[1].stylePartId);

            var dataForSecondPart = [];
            var dataForExcelForSecondPart = [];
            for (var itemPart2 of secondPartData) {
                var objPart2 = {
                    item: itemPart2.itemName,
                    //itemDescription: itemPart2.itemDescription,

                    //qtyDz:(itemPart2.consumption+(itemPart2.wastagePercentage/100))*12,
                    qtyDz: itemPart2.qtyDz,
                    unit: itemPart2.unitName,
                    unitPrice: itemPart2.rate,
                    totalPrice: itemPart2.totalPrice,
                    supplierName: itemPart2.supplierDescription,
                    remarks: itemPart2.remarks,
                    consumption: itemPart2.consumption,
                    wastagePercentage: itemPart2.wastagePercentage,
                    marketRelation: itemPart2.marketRelation,
                    itemId: itemPart2.itemId,
                    itemType: itemPart2.itemType,
                    cuttAbleWidth: itemPart2.cuttAbleWidth,
                    cmPc: itemPart2.cmPc,
                    finCostPc: itemPart2.finCostPc,
                    buyingCommission: itemPart2.buyingCommission

                };
                dataForSecondPart.push(objPart2);
            }

            dataForSecondPart.forEach((row: any) => {
                dataForExcelForSecondPart.push(Object.values(row));
            });


            var rowCount = 0
            var secondtPartFirstRow = rowCount + 6 + 1;
            var secondtPartLastRow = rowCount + 6 + 1;
            for (var itemSecond of dataForExcelForSecondPart) {
                var costRowCount2 = rowCount + 6 + 1;

                let slCell = "K" + costRowCount2; //row.getCell(5).address;
                worksheet.getCell(slCell).value = rowCount + 1;

                if ((dataForExcelForSecondPart.length - 1) == rowCount) {
                    //debugger
                    worksheet.getCell(slCell).border = {
                        // top: { style: 'thin' },
                        bottom: { style: 'thin' },
                        left: { style: 'thin' },
                        //right: { style: 'thin' }
                    }

                }
                else {
                    worksheet.getCell(slCell).border = {
                        // top: { style: 'thin' },
                        //  bottom: { style: 'thin' },
                        left: { style: 'thin' },
                        right: { style: 'thin' }
                    }

                }
                worksheet.getCell(slCell).alignment = { vertical: "middle", horizontal: "center" };

                let itemCell = "L" + costRowCount2;// row.getCell(1).address;
                worksheet.getCell(itemCell).value = itemSecond[0];

                if ((dataForExcelForSecondPart.length - 1) == rowCount) {
                    worksheet.getCell(itemCell).border = {
                        //top: { style: 'thin' },
                        bottom: { style: 'thin' },
                        left: { style: 'thin' },
                        //right: { style: 'thin' }
                    }
                }
                else {
                    worksheet.getCell(itemCell).border = {
                        //top: { style: 'thin' },
                        //bottom: { style: 'thin' },
                        left: { style: 'thin' },
                        //right: { style: 'thin' }
                    }
                }


                ///-------------calculatinon--------------///
                var unitPrice2 = "";
                var qtyDz2 = "";
                if (itemSecond[11] == "F") {
                    var consWithWastage2 = `(${itemSecond[7]} + (${itemSecond[7]} *(${itemSecond[8]}%)))`;
                    qtyDz2 = `((( ${consWithWastage2}*${itemSecond[12]})/36)* 12)`;

                    if (itemSecond[12] != 0) {
                        unitPrice2 = `((${itemSecond[3]} + ${itemSecond[14]})*36)/ ${itemSecond[12]}`;
                    }
                }
                else if (itemSecond[11] == "A") {
                    if (itemSecond[10] == 115) {
                        unitPrice2 = `${itemSecond[3]}`;
                        qtyDz2 = `((${itemSecond[7]} *12) + ((${itemSecond[7]} *12 ) * (${itemSecond[8]}/100)))/ ${itemSecond[9]}`;
                    }
                    else if (itemSecond[10] == 125) {
                        unitPrice2 = `${itemSecond[3]} + ${itemSecond[14]}`;
                        qtyDz2 = `((${itemSecond[7]}*12) + ((${itemSecond[7]} * 12 ) * (${itemSecond[8]}/100)))/${itemSecond[9]}`;
                    }
                    else {
                        if (itemSecond[9] != 0) {
                            unitPrice2 = `(${itemSecond[3]} /${itemSecond[9]}) + ((${itemSecond[3]}/${itemSecond[9]}) * (${itemSecond[14]}/100))`;
                            qtyDz2 = `(${itemSecond[7]}*12) + ((${itemSecond[7]}* 12) * (${itemSecond[8]}/100))`;
                        }
                    }
                }
                else {
                    unitPrice2 = `(((${itemSecond[13]}*12 )*12)/12)`;
                    qtyDz2 = `${itemSecond[1]}`;
                }



                let qtyDzCell = "M" + costRowCount2; //row.getCell(4).address;
                worksheet.getCell(qtyDzCell).value = itemSecond[1];

                if ((dataForExcelForSecondPart.length - 1) == rowCount) {
                    worksheet.getCell(qtyDzCell).border = {
                        //top: { style: 'thin' },
                        bottom: { style: 'thin' },
                        //left: { style: 'thin' },
                        //right: { style: 'thin' }
                    }
                }
                else {
                    worksheet.getCell(qtyDzCell).border = {
                        //top: { style: 'thin' },
                        //bottom: { style: 'thin' },
                        //left: { style: 'thin' },
                        //right: { style: 'thin' }
                    }

                }


                worksheet.getCell(qtyDzCell).value = {
                    formula: qtyDz2,
                    date1904: false
                }

                let unitCell = "N" + costRowCount2; //row.getCell(5).address;
                worksheet.getCell(unitCell).value = itemSecond[2];

                if ((dataForExcelForSecondPart.length - 1) == rowCount) {
                    worksheet.getCell(unitCell).border = {
                        //top: { style: 'thin' },
                        bottom: { style: 'thin' },
                        //left: { style: 'thin' },
                        //right: { style: 'thin' }
                    }
                }
                else {
                    worksheet.getCell(unitCell).border = {
                        // top: { style: 'thin' },
                        // bottom: { style: 'thin' },
                        // left: { style: 'thin' },
                        // right: { style: 'thin' }
                    }

                }


                let unitPriceCell = "O" + costRowCount2; //row.getCell(5).address;
                //worksheet.getCell(unitPriceCell).value = itemSecond[3];

                if ((dataForExcelForSecondPart.length - 1) == rowCount) {
                    worksheet.getCell(unitPriceCell).border = {
                        // top: { style: 'thin' },
                        bottom: { style: 'thin' },
                        // left: { style: 'thin' },
                        // right: { style: 'thin' }
                    }
                }
                else {
                    worksheet.getCell(unitPriceCell).border = {
                        // top: { style: 'thin' },
                        // bottom: { style: 'thin' },
                        // left: { style: 'thin' },
                        // right: { style: 'thin' }
                    }

                }

                if (itemSecond[0] == "CMQ") {
                    worksheet.getCell(unitPriceCell).value = {
                        formula: `${itemSecond[13]}`,
                        date1904: false
                    }
                }
                else {
                    if (unitPrice2 != "") {
                        worksheet.getCell(unitPriceCell).value = {
                            formula: unitPrice2,
                            date1904: false
                        }

                    }

                }


                let FreightCell = "P" + costRowCount2; //row.getCell(5).address;
                worksheet.getCell(FreightCell).value = itemSecond[14];

                if ((dataForExcelForSecondPart.length - 1) == rowCount) {
                    worksheet.getCell(FreightCell).border = {
                        // top: { style: 'thin' },
                        bottom: { style: 'thin' },
                        // left: { style: 'thin' },
                        // right: { style: 'thin' }
                    }
                }
                else {
                    worksheet.getCell(FreightCell).border = {
                        // top: { style: 'thin' },
                        // bottom: { style: 'thin' },
                        // left: { style: 'thin' },
                        // right: { style: 'thin' }
                    }

                }


                let totalPriceCell = "Q" + costRowCount2; //row.getCell(5).address;
                worksheet.getCell(totalPriceCell).value = itemSecond[4];

                if ((dataForExcelForSecondPart.length - 1) == rowCount) {
                    worksheet.getCell(totalPriceCell).border = {
                        // top: { style: 'thin' },
                        bottom: { style: 'thin' },
                        // left: { style: 'thin' },
                        // right: { style: 'thin' }
                    }
                }
                else {
                    worksheet.getCell(totalPriceCell).border = {
                        // top: { style: 'thin' },
                        // bottom: { style: 'thin' },
                        // left: { style: 'thin' },
                        // right: { style: 'thin' }
                    }

                }


                worksheet.getCell(totalPriceCell).value = {
                    formula: `(M${costRowCount2}*O${costRowCount2})`,
                    date1904: false
                }


                let supplierNameCell = "R" + costRowCount2;// row.getCell(3).address;
                worksheet.getCell(supplierNameCell).value = itemSecond[5];

                if ((dataForExcelForSecondPart.length - 1) == rowCount) {
                    worksheet.getCell(supplierNameCell).border = {
                        // top: { style: 'thin' },
                        bottom: { style: 'thin' },
                        // left: { style: 'thin' },
                        // right: { style: 'thin' }
                    }
                }
                else {
                    worksheet.getCell(supplierNameCell).border = {
                        // top: { style: 'thin' },
                        // bottom: { style: 'thin' },
                        // left: { style: 'thin' },
                        // right: { style: 'thin' }
                    }

                }

                // worksheet.getCell(supplierNameCell).alignment = {  vertical: "middle", horizontal: "left" , wrapText: true};


                let remarksCell = "S" + costRowCount2; //row.getCell(5).address;
                //worksheet.getCell(remarksCell).value = itemSecond[6];
                if (itemSecond[6] == null) {
                    worksheet.getCell(remarksCell).value = " ";
                }
                else {
                    worksheet.getCell(remarksCell).value = itemSecond[6];
                }


                if ((dataForExcelForSecondPart.length - 1) == rowCount) {
                    worksheet.getCell(remarksCell).border = {
                        // top: { style: 'thin' },
                        bottom: { style: 'thin' },
                        // left: { style: 'thin' },
                        right: { style: 'thin' }
                    }
                }
                else {
                    worksheet.getCell(remarksCell).border = {
                        // top: { style: 'thin' },
                        // bottom: { style: 'thin' },
                        // left: { style: 'thin' },
                        right: { style: 'thin' }
                    }

                }


                secondtPartLastRow = costRowCount2;
                rowCount++
            }


            var valSecondPart = costRowCount2 + 1;
            let toalalSecondPartQ1 = "N" + valSecondPart;
            worksheet.getCell(toalalSecondPartQ1).value = "Total Value";
            worksheet.getCell(toalalSecondPartQ1).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            worksheet.getCell(toalalSecondPartQ1).font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            }

            let toalalSecondPartcCell1 = "Q" + valSecondPart;
            worksheet.getCell(toalalSecondPartcCell1).value = 0;
            if (dataForExcelForSecondPart.length > 0) {
                worksheet.getCell(toalalSecondPartcCell1).value = {
                    formula: `SUM(Q${secondtPartFirstRow}:Q${secondtPartLastRow})`,
                    date1904: false
                };
            }
            worksheet.getCell(toalalSecondPartcCell1).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            worksheet.getCell(toalalSecondPartcCell1).font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            }


            let toalalSecondPartcCell12 = "R" + valSecondPart;
            worksheet.getCell(toalalSecondPartcCell12).value = 0;
            if (dataForExcelForSecondPart.length > 0) {
                worksheet.getCell(toalalSecondPartcCell12).value = {
                    formula: `Q${valSecondPart}/12`,
                    date1904: false
                };
            }
            worksheet.getCell(toalalSecondPartcCell12).alignment = { vertical: "middle", horizontal: "left" };

            worksheet.getCell(toalalSecondPartcCell12).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            worksheet.getCell(toalalSecondPartcCell12).font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            }

            var fobSecondPart = costRowCount2;

            let toalalSecondPartcCell122 = "R" + fobSecondPart;
            worksheet.getCell(toalalSecondPartcCell122).value = 0;
            if (dataForExcelForSecondPart.length > 0) {
                worksheet.getCell(toalalSecondPartcCell122).value = {
                    formula: `R${valSecondPart}+(R${valSecondPart}*(${secondPartData[0].buyingCommission}/100))`,
                    date1904: false
                };
            }
            worksheet.getCell(toalalSecondPartcCell122).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            worksheet.getCell(toalalSecondPartcCell122).font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            }
            worksheet.getCell(toalalSecondPartcCell122).alignment = { vertical: "middle", horizontal: "left" };


        }
         



          //---------IE data --------//
         var  allIedEtailsList = partList[0].iedEtailsList.find(x => x.moq ==  partList[0].moq);
         


          if (firstPartLastRow > secondtPartLastRow) {
            var val = 6 + c + 1 + 2 ;
          }
          else if (partList.length > 1 && firstPartLastRow < secondtPartLastRow) {
            var val = 6 + rowCount  + 1 + 2;
          }
          else {
            var val = 6 + c  + 1 + 2;
          }
          debugger
          let dataTypeIEPartCell1 = "A" + val;
          worksheet.getCell(dataTypeIEPartCell1).value = "Details";
          worksheet.getCell(dataTypeIEPartCell1).font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
          };
          worksheet.getCell(dataTypeIEPartCell1).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }

          let dataTypeIEPartCell1Offer = "B" + val;
          worksheet.getCell(dataTypeIEPartCell1Offer).value = "Offer";
          worksheet.getCell(dataTypeIEPartCell1Offer).font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
          };
          worksheet.getCell(dataTypeIEPartCell1Offer).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }

          let dataTypeIEPartCell1Actual = "C" + val;
          worksheet.getCell(dataTypeIEPartCell1Actual).value = "Actual";
          worksheet.getCell(dataTypeIEPartCell1Actual).font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
          };
          worksheet.getCell(dataTypeIEPartCell1Actual).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }


          let rowSmv = val + 1
          let smv1 = "A" +rowSmv;
          worksheet.getCell(smv1).value = "SMV";
          worksheet.getCell(smv1).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          worksheet.getCell(smv1).alignment = { vertical: "middle", horizontal: "left" };     
      
          let smv1Value = "B"+rowSmv;
          worksheet.getCell(smv1Value).value = allData[0].costingSummaryReportCm[0].smv;
          worksheet.getCell(smv1Value).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          worksheet.getCell(smv1Value).alignment = { vertical: "middle", horizontal: "left" };
          
          let smv1ValueActual = "C"+ rowSmv;
          if(allIedEtailsList !=null || allIedEtailsList != undefined){
            worksheet.getCell(smv1ValueActual).value = allIedEtailsList.smv;
          }
       
          worksheet.getCell(smv1ValueActual).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          worksheet.getCell(smv1ValueActual).alignment = { vertical: "middle", horizontal: "left" };


          let rowEffi = val + 2
          let Effi1 = "A" + rowEffi;
          worksheet.getCell(Effi1).value = "Effi %";
          worksheet.getCell(Effi1).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          worksheet.getCell(Effi1).alignment = { vertical: "middle", horizontal: "left" };     
      
          let Effi1Value = "B"+rowEffi;
          worksheet.getCell(Effi1Value).value = allData[0].costingSummaryReportCm[0].efficency;
          worksheet.getCell(Effi1Value).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          worksheet.getCell(Effi1Value).alignment = { vertical: "middle", horizontal: "left" };
          
          let Effi1ValueActual = "C"+ rowEffi;
          if(allIedEtailsList !=null || allIedEtailsList != undefined){
          worksheet.getCell(Effi1ValueActual).value = allIedEtailsList.averageEfficiencyPercentage;
          }
          worksheet.getCell(Effi1ValueActual).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          worksheet.getCell(Effi1ValueActual).alignment = { vertical: "middle", horizontal: "left" };

          let rowPpm = val + 3
          let ppm1 = "A" + rowPpm;
          worksheet.getCell(ppm1).value = "PPM";
          worksheet.getCell(ppm1).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          worksheet.getCell(ppm1).alignment = { vertical: "middle", horizontal: "left" };     
      
          let ppm11Value = "B"+rowPpm;
          worksheet.getCell(ppm11Value).value = allData[0].costingSummaryReportCm[0].ppm;
          worksheet.getCell(ppm11Value).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          worksheet.getCell(ppm11Value).alignment = { vertical: "middle", horizontal: "left" };
          
          let ppm1ValueActual = "C"+ rowPpm;
          if(allIedEtailsList !=null || allIedEtailsList != undefined){
          worksheet.getCell(ppm1ValueActual).value = allIedEtailsList.ppm;
          }
          worksheet.getCell(ppm1ValueActual).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          worksheet.getCell(ppm1ValueActual).alignment = { vertical: "middle", horizontal: "left" };


          let rowPph = val + 4
          let pph1 = "A" + rowPph;
          worksheet.getCell(pph1).value = "Prductivity/10 hour";
          worksheet.getCell(pph1).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          worksheet.getCell(pph1).alignment = { vertical: "middle", horizontal: "left" };     
      
          let pph11Value = "B"+rowPph;
          worksheet.getCell(pph11Value).value = "";
          worksheet.getCell(pph11Value).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          worksheet.getCell(pph11Value).alignment = { vertical: "middle", horizontal: "left" };

          worksheet.getCell(pph11Value).value = {
            formula: `48*600*B${rowEffi}%/B${rowSmv}`,
            date1904: false
        }


          
          let pph1ValueActual = "C"+ rowPph;
          worksheet.getCell(pph1ValueActual).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          worksheet.getCell(pph1ValueActual).alignment = { vertical: "middle", horizontal: "left" };


          worksheet.getCell(pph1ValueActual).value = {
            formula: `48*600*C${rowEffi}%/C${rowSmv}`,
            date1904: false
        }


          let rowPh = val + 5
          let ph1 = "A" + rowPh;
          worksheet.getCell(ph1).value = "Prductivity/hour";
          worksheet.getCell(ph1).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          worksheet.getCell(ph1).alignment = { vertical: "middle", horizontal: "left" };     
      
          let ph11Value = "B"+rowPh;
          worksheet.getCell(ph11Value).value = "";
          worksheet.getCell(ph11Value).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          worksheet.getCell(ph11Value).alignment = { vertical: "middle", horizontal: "left" };

          worksheet.getCell(ph11Value).value = {
            formula: `B${rowPph}/12`,
            date1904: false
        }
          
          let ph1ValueActual = "C"+ rowPh;

          worksheet.getCell(ph1ValueActual).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          worksheet.getCell(ph1ValueActual).alignment = { vertical: "middle", horizontal: "left" };

          worksheet.getCell(ph1ValueActual).value = {
            formula: `C${rowPph}/12`,
            date1904: false
        }

          let rowCmPc = val + 6
          let CmPc1 = "A" + rowCmPc;
          worksheet.getCell(CmPc1).value = "CM/PC";
          worksheet.getCell(CmPc1).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          worksheet.getCell(CmPc1).alignment = { vertical: "middle", horizontal: "left" };     
      
          let CmPc1Value = "B"+rowCmPc;
          worksheet.getCell(CmPc1Value).value = allData[0].costingSummaryReportItem[0].totalQty;
          worksheet.getCell(CmPc1Value).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          worksheet.getCell(CmPc1Value).alignment = { vertical: "middle", horizontal: "left" };

          worksheet.getCell(CmPc1Value).value = {
            formula: `B${rowSmv}*B${rowPpm}/B${rowEffi}%`,
            date1904: false
        }
          
          let CmPc1ValueActual = "C"+ rowCmPc;
          
          worksheet.getCell(CmPc1ValueActual).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          worksheet.getCell(CmPc1ValueActual).alignment = { vertical: "middle", horizontal: "left" };

          worksheet.getCell(CmPc1ValueActual).value = {
            formula: `C${rowSmv}*C${rowPpm}/C${rowEffi}%`,
            date1904: false
        }


          let rowCmPcDz = val + 7
          let CmPcDz1 = "A" + rowCmPcDz;
          worksheet.getCell(CmPcDz1).value = "CM/Dzn";
          worksheet.getCell(CmPcDz1).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          worksheet.getCell(CmPcDz1).alignment = { vertical: "middle", horizontal: "left" };     
      
          let CmPcDz1Value = "B"+rowCmPcDz;
          worksheet.getCell(CmPcDz1Value).value = allData[0].costingSummaryReportItem[0].totalDznQty;
          worksheet.getCell(CmPcDz1Value).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          worksheet.getCell(CmPcDz1Value).alignment = { vertical: "middle", horizontal: "left" };

          worksheet.getCell(CmPcDz1Value).value = {
            formula: `B${rowCmPc}*12`,
            date1904: false
        }
          
          let CmPcDz1ValueActual = "C"+ rowCmPcDz;
          
          worksheet.getCell(CmPcDz1ValueActual).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          worksheet.getCell(CmPcDz1ValueActual).alignment = { vertical: "middle", horizontal: "left" };

          worksheet.getCell(CmPcDz1ValueActual).value = {
            formula: `C${rowCmPc}*12`,
            date1904: false
        }

          let rowCmEarn = val + 8
          let CmEarn1 = "A" + rowCmEarn;
          worksheet.getCell(CmEarn1).value = "CM earned/Pc";
          worksheet.getCell(CmEarn1).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          worksheet.getCell(CmEarn1).alignment = { vertical: "middle", horizontal: "left" };     
      
          let CmEarnValue = "B"+rowCmEarn;
          worksheet.getCell(CmEarnValue).value = "";
          worksheet.getCell(CmEarnValue).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          worksheet.getCell(CmEarnValue).font = {
            bold: true,
          }
          worksheet.getCell(CmEarnValue).alignment = { vertical: "middle", horizontal: "left" };

          worksheet.getCell(CmEarnValue).value = {
            formula: `B${rowCmPcDz}-C${rowCmPcDz}`,
            date1904: false
        }
          
          let CmEarn1ValueActual = "C"+ rowCmEarn;
          
          worksheet.getCell(CmEarn1ValueActual).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          worksheet.getCell(CmEarn1ValueActual).alignment = { vertical: "middle", horizontal: "left" };

        worksheet.columns.forEach(function (column, i) {
            // debugger
            if (i == 1 || i == 12 || i == 7 || i == 17) {
                var maxLength = 0;
                column["eachCell"]({ includeEmpty: false }, function (cell) {
                    var columnLength = cell.value ? cell.value.toString().length : 5;
                    if (columnLength > maxLength) {
                        maxLength = columnLength;
                    }
                });
                column.width = maxLength < 5 ? 5 : 30;
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
