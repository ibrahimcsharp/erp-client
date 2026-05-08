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
export class GStarCostingReportService {
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


    async exportGStarExcelReport(excelData) {
        debugger
        const title = excelData.title;
        const allData = excelData.finallySubmitData;
        const fabricData1 = excelData.fabricData1;

        //fabric data ---------------------------------------------------------------------------------------- 1ST PART ----
        var fistPartDataFabric = allData[0].costingFabricsList
        var dataForFirstPart = [];
        var dataForExcelFabricFstPart = [];
        for (var itemPart1 of fistPartDataFabric) {
            var objFabric1 = {
                item: itemPart1.febDescription,
                itemCode: itemPart1.itemCode,
                itemName: itemPart1.itemName,
                supplierName: itemPart1.supplierName,
                nominationName: itemPart1.nominationName,
                coo: itemPart1.countryName,
                cuttAbleWidth: itemPart1.cuttAbleWidth,
                rate: itemPart1.rate,
                unitName: itemPart1.unitName,
                consumption: itemPart1.consumption,
                wastagePercentage: itemPart1.wastagePercentage,
                finCostPc: itemPart1.finCostPc,
                freightMode: "",
                unitprice: itemPart1.finCostPc + itemPart1.rate,
                total: (itemPart1.rate * itemPart1.consumption * (1 + itemPart1.wastagePercentage)) + (itemPart1.consumption * (1 + itemPart1.wastagePercentage) * itemPart1.finCostPc),
                remark: itemPart1.fabricComment,
                mkuName: itemPart1.mkuName,

            };
            dataForFirstPart.push(objFabric1);
        }
        dataForFirstPart.forEach((row: any) => {
            dataForExcelFabricFstPart.push(Object.values(row));
        });
        if(dataForExcelFabricFstPart.length > 0){
            var mainFabVal =dataForFirstPart[0].item;
        }

        //ACCESSORIES data ---------------------------------------------------------------------------------------- 1ST PART ----
        var fistPartDataAccessories = allData[0].costAccessoriesList.filter(x => x.costCategoryGroup == "ACCESSORIES");
        var dataForFirstPartAccessories = [];
        var dataForExcelAccessoriesFstPart = [];
        for (var itemPart1 of fistPartDataAccessories) {
            var objAccessories1 = {

                item: itemPart1.description,
                itemCode: itemPart1.refCode,
                itemName: itemPart1.itemName,
                supplierName: itemPart1.supplierName,
                nominationName: itemPart1.nominationName,
                coo: itemPart1.countryName,
                cuttAbleWidth: itemPart1.cuttAbleWidth,
                rate: itemPart1.rate,
                unitName: itemPart1.uomName,
                consumption: itemPart1.consumption,
                wastagePercentage: itemPart1.wastagePercentage,
                finCostPc: itemPart1.finCostPc,
                freightMode: itemPart1.freightMode,
                unitprice: itemPart1.finCostPc + itemPart1.rate,
                total: (itemPart1.rate * itemPart1.consumption * (1 + itemPart1.wastagePercentage)) + (itemPart1.consumption * (1 + itemPart1.wastagePercentage) * itemPart1.finCostPc),
                remark: itemPart1.accessoriesComment,
                marketRelation: itemPart1.marketRelation,
            };
            dataForFirstPartAccessories.push(objAccessories1);
        }
        dataForFirstPartAccessories.forEach((row: any) => {
            dataForExcelAccessoriesFstPart.push(Object.values(row));
        });

        //label data  ---------------------------------------------------------------------------------------- 1ST PART ----
        var fistPartDataLabel = allData[0].costAccessoriesList.filter(x => x.costCategoryGroup == "LABELS");
        var dataForFirstPartLabel = [];
        var dataForExcelLabelFstPart = [];
        for (var itemPart1 of fistPartDataLabel) {
            var objLabel1 = {
                item: itemPart1.description,
                itemCode: itemPart1.refCode,
                itemName: itemPart1.itemName,
                supplierName: itemPart1.supplierName,
                nominationName: itemPart1.nominationName,
                coo: itemPart1.countryName,
                cuttAbleWidth: itemPart1.cuttAbleWidth,
                rate: itemPart1.rate,
                unitName: itemPart1.uomName,
                consumption: itemPart1.consumption,
                wastagePercentage: itemPart1.wastagePercentage,
                finCostPc: itemPart1.finCostPc,
                freightMode: itemPart1.freightMode,
                unitprice: itemPart1.finCostPc + itemPart1.rate,
                total: (itemPart1.rate * itemPart1.consumption * (1 + itemPart1.wastagePercentage)) + (itemPart1.consumption * (1 + itemPart1.wastagePercentage) * itemPart1.finCostPc),
                remark: itemPart1.accessoriesComment,
            };
            dataForFirstPartLabel.push(objLabel1);
        }
        dataForFirstPartLabel.forEach((row: any) => {
            dataForExcelLabelFstPart.push(Object.values(row));
        });

        //packaging data  ---------------------------------------------------------------------------------------- 1ST PART ----
        var fistPartDataPackaging = allData[0].costAccessoriesList.filter(x => x.costCategoryGroup == "PACKING");
        var dataForFirstPartPackaging = [];
        var dataForExcelPackagingFstPart = [];
        for (var itemPart1 of fistPartDataPackaging) {
            var objPackaging1 = {
                item: itemPart1.description,
                itemCode: itemPart1.refCode,
                itemName: itemPart1.itemName,
                supplierName: itemPart1.supplierName,
                nominationName: itemPart1.nominationName,
                coo: itemPart1.countryName,
                cuttAbleWidth: itemPart1.cuttAbleWidth,
                rate: itemPart1.rate,
                unitName: itemPart1.uomName,
                consumption: itemPart1.consumption,
                wastagePercentage: itemPart1.wastagePercentage,
                finCostPc: itemPart1.finCostPc,
                freightMode: itemPart1.freightMode,
                unitprice: itemPart1.finCostPc + itemPart1.rate,
                total: (itemPart1.rate * itemPart1.consumption * (1 + itemPart1.wastagePercentage)) + (itemPart1.consumption * (1 + itemPart1.wastagePercentage) * itemPart1.finCostPc),
                remark: itemPart1.accessoriesComment,
            };
            dataForFirstPartPackaging.push(objPackaging1);
        }
        dataForFirstPartPackaging.forEach((row: any) => {
            dataForExcelPackagingFstPart.push(Object.values(row));
        });

        //PROCESS data  ---------------------------------------------------------------------------------------- 1ST PART ----
        var fistPartDataProcess = allData[0].costAccessoriesList.filter(x => x.costCategoryGroup == "PROCESS");
        var dataForFirstPartProcess = [];
        var dataForExcelProcessFstPart = [];
        for (var itemPart1 of fistPartDataProcess) {
            var objProcess1 = {
                item: itemPart1.description,
                itemCode: itemPart1.refCode,
                itemName: itemPart1.itemName,
                supplierName: itemPart1.supplierName,
                nominationName: itemPart1.nominationName,
                coo: itemPart1.countryName,
                cuttAbleWidth: itemPart1.cuttAbleWidth,
                rate: itemPart1.rate,
                unitName: itemPart1.uomName,
                consumption: itemPart1.consumption,
                wastagePercentage: itemPart1.wastagePercentage,
                finCostPc: itemPart1.finCostPc,
                freightMode: itemPart1.freightMode,
                unitprice: itemPart1.finCostPc + itemPart1.rate,
                total: (itemPart1.rate * itemPart1.consumption * (1 + itemPart1.wastagePercentage)) + (itemPart1.consumption * (1 + itemPart1.wastagePercentage) * itemPart1.finCostPc),
                remark: itemPart1.accessoriesComment,
            };
            dataForFirstPartProcess.push(objProcess1);
        }
        dataForFirstPartProcess.forEach((row: any) => {
            dataForExcelProcessFstPart.push(Object.values(row));
        });
        var washProcessList =[];
         washProcessList = allData[0].costAccessoriesList.filter(x=>x.costCategoryGroup == "PROCESS" && 
        (x.categoryName.toUpperCase() == "WASHING 1" ||
        x.categoryName.toUpperCase() == "WASHING 2" ||
        x.categoryName.toUpperCase() == "WASHING 3" ||
        x.categoryName.toUpperCase() == "WASHING") );




        //IE data ---------------------------------------------------------------------------------------- FIRST PART ----
        var iedDetailList = allData[0].iedEtailsList;
        var dataForIe = [];
        var dataForExcelIe = [];
        for (var iEPart1 of iedDetailList) {
            var objIe1 = {
                moq: iEPart1.moq,
                lt: "",
                remark: iEPart1.comments,
                smv: iEPart1.smv,
            };
            dataForIe.push(objIe1);
        }
        dataForIe.forEach((row: any) => {
            dataForExcelIe.push(Object.values(row));
        });




        //___________________________________________2ND PART DATA ____________________________________//
        if (allData.length > 1) {
            //fabric data ---------------------------------------------------------------------------------------- 2ND PART ----
            var SecPartDataFabric = allData[1].costingFabricsList
            var dataForSecPart = [];
            var dataForExcelFabricSecPart = [];
            for (var itemPart1 of SecPartDataFabric) {
                var objFabric2 = {
                    item: itemPart1.febDescription,
                    itemCode: itemPart1.itemCode,
                    itemName: itemPart1.itemName,
                    supplierName: itemPart1.supplierName,
                    nominationName: itemPart1.nominationName,
                    coo: itemPart1.countryName,
                    cuttAbleWidth: itemPart1.cuttAbleWidth,
                    rate: itemPart1.rate,
                    unitName: itemPart1.unitName,
                    consumption: itemPart1.consumption,
                    wastagePercentage: itemPart1.wastagePercentage,
                    finCostPc: itemPart1.finCostPc,
                    freightMode: "",
                    unitprice: itemPart1.finCostPc + itemPart1.rate,
                    total: (itemPart1.rate * itemPart1.consumption * (1 + itemPart1.wastagePercentage)) + (itemPart1.consumption * (1 + itemPart1.wastagePercentage) * itemPart1.finCostPc),
                    remark: itemPart1.fabricComment,

                };
                dataForSecPart.push(objFabric2);
            }
            dataForSecPart.forEach((row: any) => {
                dataForExcelFabricSecPart.push(Object.values(row));
            });

            //ACCESSORIES  data ---------------------------------------------------------------------------------------- 2ND PART ----
            var secPartDataAccessories = allData[1].costAccessoriesList.filter(x => x.costCategoryGroup == "ACCESSORIES");
            var dataForSecPartAccessories = [];
            var dataForExcelAccessoriesSecPart = [];
            for (var itemPart1 of secPartDataAccessories) {
                var objAccessories2 = {

                    item: itemPart1.description,
                    itemCode: itemPart1.refCode,
                    itemName: itemPart1.itemName,
                    supplierName: itemPart1.supplierName,
                    nominationName: itemPart1.nominationName,
                    coo: itemPart1.countryName,
                    cuttAbleWidth: itemPart1.cuttAbleWidth,
                    rate: itemPart1.rate,
                    unitName: itemPart1.uomName,
                    consumption: itemPart1.consumption,
                    wastagePercentage: itemPart1.wastagePercentage,
                    finCostPc: itemPart1.finCostPc,
                    freightMode: itemPart1.freightMode,
                    unitprice: itemPart1.finCostPc + itemPart1.rate,
                    total: (itemPart1.rate * itemPart1.consumption * (1 + itemPart1.wastagePercentage)) + (itemPart1.consumption * (1 + itemPart1.wastagePercentage) * itemPart1.finCostPc),
                    remark: itemPart1.accessoriesComment,
                    marketRelation: itemPart1.marketRelation,
                };
                dataForSecPartAccessories.push(objAccessories2);
            }
            dataForSecPartAccessories.forEach((row: any) => {
                dataForExcelAccessoriesSecPart.push(Object.values(row));
            });

            //label data ---------------------------------------------------------------------------------------- 2ND PART ----
            var secPartDataLabel = allData[1].costAccessoriesList.filter(x => x.costCategoryGroup == "LABELS");
            var dataForSecPartLabel = [];
            var dataForExcelLabelSecPart = [];
            for (var itemPart1 of secPartDataLabel) {
                var objLabel2 = {
                    item: itemPart1.description,
                    itemCode: itemPart1.refCode,
                    itemName: itemPart1.itemName,
                    supplierName: itemPart1.supplierName,
                    nominationName: itemPart1.nominationName,
                    coo: itemPart1.countryName,
                    cuttAbleWidth: itemPart1.cuttAbleWidth,
                    rate: itemPart1.rate,
                    unitName: itemPart1.uomName,
                    consumption: itemPart1.consumption,
                    wastagePercentage: itemPart1.wastagePercentage,
                    finCostPc: itemPart1.finCostPc,
                    freightMode: itemPart1.freightMode,
                    unitprice: itemPart1.finCostPc + itemPart1.rate,
                    total: (itemPart1.rate * itemPart1.consumption * (1 + itemPart1.wastagePercentage)) + (itemPart1.consumption * (1 + itemPart1.wastagePercentage) * itemPart1.finCostPc),
                    remark: itemPart1.accessoriesComment,
                };
                dataForSecPartLabel.push(objLabel2);
            }
            dataForSecPartLabel.forEach((row: any) => {
                dataForExcelLabelSecPart.push(Object.values(row));
            });

            //packaging data ---------------------------------------------------------------------------------------- 2ND PART ----
            var secPartDataPackaging = allData[1].costAccessoriesList.filter(x => x.costCategoryGroup == "PACKING");
            var dataForSecPartPackaging = [];
            var dataForExcelPackagingSecPart = [];
            for (var itemPart1 of secPartDataPackaging) {
                var objPackaging2 = {
                    item: itemPart1.description,
                    itemCode: itemPart1.refCode,
                    itemName: itemPart1.itemName,
                    supplierName: itemPart1.supplierName,
                    nominationName: itemPart1.nominationName,
                    coo: itemPart1.countryName,
                    cuttAbleWidth: itemPart1.cuttAbleWidth,
                    rate: itemPart1.rate,
                    unitName: itemPart1.uomName,
                    consumption: itemPart1.consumption,
                    wastagePercentage: itemPart1.wastagePercentage,
                    finCostPc: itemPart1.finCostPc,
                    freightMode: itemPart1.freightMode,
                    unitprice: itemPart1.finCostPc + itemPart1.rate,
                    total: (itemPart1.rate * itemPart1.consumption * (1 + itemPart1.wastagePercentage)) + (itemPart1.consumption * (1 + itemPart1.wastagePercentage) * itemPart1.finCostPc),
                    remark: itemPart1.accessoriesComment,
                };
                dataForSecPartPackaging.push(objPackaging2);
            }
            dataForSecPartPackaging.forEach((row: any) => {
                dataForExcelPackagingSecPart.push(Object.values(row));
            });

            //PROCESS data ---------------------------------------------------------------------------------------- 2ND PART ----
            var secPartDataProcess = allData[1].costAccessoriesList.filter(x => x.costCategoryGroup == "PROCESS");
            var dataForSecPartProcess = [];
            var dataForExcelProcessSecPart = [];
            for (var itemPart1 of secPartDataProcess) {
                var objProcess2 = {
                    item: itemPart1.description,
                    itemCode: itemPart1.refCode,
                    itemName: itemPart1.itemName,
                    supplierName: itemPart1.supplierName,
                    nominationName: itemPart1.nominationName,
                    coo: itemPart1.countryName,
                    cuttAbleWidth: itemPart1.cuttAbleWidth,
                    rate: itemPart1.rate,
                    unitName: itemPart1.uomName,
                    consumption: itemPart1.consumption,
                    wastagePercentage: itemPart1.wastagePercentage,
                    finCostPc: itemPart1.finCostPc,
                    freightMode: itemPart1.freightMode,
                    unitprice: itemPart1.finCostPc + itemPart1.rate,
                    total: (itemPart1.rate * itemPart1.consumption * (1 + itemPart1.wastagePercentage)) + (itemPart1.consumption * (1 + itemPart1.wastagePercentage) * itemPart1.finCostPc),
                    remark: itemPart1.accessoriesComment,
                };
                dataForSecPartProcess.push(objProcess2);
            }
            dataForSecPartProcess.forEach((row: any) => {
                dataForExcelProcessSecPart.push(Object.values(row));
            });


            //IE data ---------------------------------------------------------------------------------------- 2ND PART ----
            var iedDetailListP2 = allData[1].iedEtailsList;
            var dataForIeP2 = [];
            var dataForExcelIeP2 = [];
            for (var iEPart2 of iedDetailListP2) {
                var objIe2 = {
                    moq: iEPart2.moq,
                    lt: "",
                    remark: iEPart2.comments,
                    smv: iEPart2.smv,
                };
                dataForIeP2.push(objIe2);
            }
            dataForIeP2.forEach((row: any) => {
                dataForExcelIeP2.push(Object.values(row));
            });

        }

        //HEADER NAMES
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet(
            "Costing  Report"
        );
        

        // -------------------------------------------------------------------MASTER START 1-------------------------------------------

        let season = worksheet.getCell("B2");
        season.value = "SEASON / DEVELOPMENT STAGE";
        season.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        season.border = {
            top: { style: 'thick' },
            //bottom: { style: 'thick' },
            left: { style: 'thick' },
            // right: { style: 'thick' }
        }
        season.alignment = { vertical: "middle", horizontal: "right" };

        worksheet.mergeCells("C2", "E2");
        let seasonValue = worksheet.getCell("C2");
        seasonValue.value = allData[0].yearSeason;
        seasonValue.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        seasonValue.border = {
            top: { style: 'thick' },
            bottom: { style: 'thin' },
            left: { style: 'thick' },
            right: { style: 'thick' }
        }
        seasonValue.alignment = { vertical: "middle", horizontal: "center" };

        let style = worksheet.getCell("B3");
        style.value = "STYLE NAME";
        style.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        style.border = {
            // top: { style: 'thick' },
            //  bottom: { style: 'thick' },
            left: { style: 'thick' },
            right: { style: 'thick' }
        }
        style.alignment = { vertical: "middle", horizontal: "right" };

        worksheet.mergeCells("C3", "E3");
        let stylename = worksheet.getCell("C3");
        stylename.value = allData[0].description;
        stylename.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        stylename.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thick' },
            right: { style: 'thick' }
        }
        stylename.alignment = { vertical: "middle", horizontal: "center" };


        let fabDesc = worksheet.getCell("B4");
        fabDesc.value = "MAIN FABRIC";
        fabDesc.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        fabDesc.border = {
            //  top: { style: 'thick' },
            //  bottom: { style: 'thick' },
            left: { style: 'thick' },
            right: { style: 'thick' }
        }
        fabDesc.alignment = { vertical: "middle", horizontal: "right" };

        worksheet.mergeCells("C4", "E4");
        let fabDescval = worksheet.getCell("C4");
        if(dataForExcelFabricFstPart.length > 0){
            fabDescval.value = mainFabVal;
        }
        else{
            fabDescval.value = "";
        }
            fabDescval.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            fabDescval.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thick' },
                right: { style: 'thick' }
            }
            fabDescval.alignment = { vertical: "middle", horizontal: "center" };
    
        let colorway = worksheet.getCell("B5");
        colorway.value = "COLORWAY";
        colorway.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        colorway.border = {
            //  top: { style: 'thick' },
            //  bottom: { style: 'thick' },
            left: { style: 'thick' },
            right: { style: 'thick' }
        }
        colorway.alignment = { vertical: "middle", horizontal: "right" };

        worksheet.mergeCells("C5", "E5");
        let colorwayVal = worksheet.getCell("C5");
        colorwayVal.value = allData[0].colorType;
        colorwayVal.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        colorwayVal.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thick' },
            right: { style: 'thick' }
        }
        colorwayVal.alignment = { vertical: "middle", horizontal: "center" };


        let wash = worksheet.getCell("B6");
        wash.value = "WASH";
        wash.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        wash.border = {
            //  top: { style: 'thick' },
            //  bottom: { style: 'thick' },
            left: { style: 'thick' },
            right: { style: 'thick' }
        }
        wash.alignment = { vertical: "middle", horizontal: "right" };

        worksheet.mergeCells("C6", "E6");
        let washval = worksheet.getCell("C6");
        if(washProcessList.length > 0){
            washval.value = washProcessList[0].itemName;
        }
        else{
            washval.value = "";
        }
       
        washval.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        washval.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thick' },
            right: { style: 'thick' }
        }
        washval.alignment = { vertical: "middle", horizontal: "center" };


        let sfc = worksheet.getCell("B7");
        sfc.value = "SFC";
        sfc.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        sfc.border = {
            top: { style: 'thin' },
            bottom: { style: 'thick' },
            left: { style: 'thick' },
            right: { style: 'thick' }
        }
        sfc.alignment = { vertical: "middle", horizontal: "right" };

        worksheet.mergeCells("C7", "E7");
        let sfcval = worksheet.getCell("C7");
        sfcval.value = allData[0].styleName;
        sfcval.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        sfcval.border = {
            top: { style: 'thin' },
            bottom: { style: 'thick' },
            left: { style: 'thick' },
            right: { style: 'thick' }
        }
        sfcval.alignment = { vertical: "middle", horizontal: "center" };

        //-----------------------------------------------------------MASTER START 2 -----------------------------------------------
        let vendor = worksheet.getCell("G2");
        vendor.value = "VENDOR";
        vendor.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        vendor.border = {
            top: { style: 'thick' },
            //bottom: { style: 'thick' },
            left: { style: 'thick' },
            // right: { style: 'thick' }
        }
        vendor.alignment = { vertical: "middle", horizontal: "right" };

        worksheet.mergeCells("H2", "J2");
        let vendorValue = worksheet.getCell("H2");
        vendorValue.value = allData[0].companyFullName;
        vendorValue.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        vendorValue.border = {
            top: { style: 'thick' },
            bottom: { style: 'thin' },
            left: { style: 'thick' },
            right: { style: 'thick' }
        }
        vendorValue.alignment = { vertical: "middle", horizontal: "center" };

        let Coo = worksheet.getCell("G3");
        Coo.value = "COO";
        Coo.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        Coo.border = {
            // top: { style: 'thick' },
            //  bottom: { style: 'thick' },
            left: { style: 'thick' },
            right: { style: 'thick' }
        }
        Coo.alignment = { vertical: "middle", horizontal: "right" };

        worksheet.mergeCells("H3", "J3");
        let cooVal = worksheet.getCell("H3");
        cooVal.value = "BANGLADESH";
        cooVal.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        cooVal.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thick' },
            right: { style: 'thick' }
        }
        cooVal.alignment = { vertical: "middle", horizontal: "center" };


        let person = worksheet.getCell("G4");
        person.value = "CONTACT PERSON";
        person.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        person.border = {
            //  top: { style: 'thick' },
            //  bottom: { style: 'thick' },
            left: { style: 'thick' },
            right: { style: 'thick' }
        }
        person.alignment = { vertical: "middle", horizontal: "right" };

        worksheet.mergeCells("H4", "J4");
        let personName = worksheet.getCell("H4");
        personName.value = allData[0].contactPerson;
        personName.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        personName.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thick' },
            right: { style: 'thick' }
        }
        personName.alignment = { vertical: "middle", horizontal: "center" };



        let prodCategory = worksheet.getCell("G5");
        prodCategory.value = "PRODUCT CATEGORY";
        prodCategory.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        prodCategory.border = {
            //  top: { style: 'thick' },
            //  bottom: { style: 'thick' },
            left: { style: 'thick' },
            right: { style: 'thick' }
        }
        prodCategory.alignment = { vertical: "middle", horizontal: "right" };

        worksheet.mergeCells("H5", "J5");
        let prodCategoryVal = worksheet.getCell("H5");
        prodCategoryVal.value = allData[0].item;
        prodCategoryVal.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        prodCategoryVal.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thick' },
            right: { style: 'thick' }
        }
        prodCategoryVal.alignment = { vertical: "middle", horizontal: "center" };


        let gender = worksheet.getCell("G6");
        gender.value = "GENDER";
        gender.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        gender.border = {
            //  top: { style: 'thick' },
            //  bottom: { style: 'thick' },
            left: { style: 'thick' },
            right: { style: 'thick' }
        }
        gender.alignment = { vertical: "middle", horizontal: "right" };

        worksheet.mergeCells("H6", "J6");
        let genderval = worksheet.getCell("H6");
        genderval.value = allData[0].deptName;
        genderval.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        genderval.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thick' },
            right: { style: 'thick' }
        }
        genderval.alignment = { vertical: "middle", horizontal: "center" };


        let prodDev = worksheet.getCell("G7");
        prodDev.value = "PRODUCT DEVELOPER";
        prodDev.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        prodDev.border = {
            top: { style: 'thin' },
            bottom: { style: 'thick' },
            left: { style: 'thick' },
            right: { style: 'thick' }
        }
        prodDev.alignment = { vertical: "middle", horizontal: "right" };

        worksheet.mergeCells("H7", "J7");
        let prodDevval = worksheet.getCell("H7");
        prodDevval.value = "";
        prodDevval.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        prodDevval.border = {
            top: { style: 'thin' },
            bottom: { style: 'thick' },
            left: { style: 'thick' },
            right: { style: 'thick' }
        }
        prodDevval.alignment = { vertical: "middle", horizontal: "center" };
        // ----------------------------------------------------------------MASTER DATE -----------------------------------------
        let initDate = worksheet.getCell("M2");
        initDate.value = "Date";
        initDate.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        initDate.border = {
            top: { style: 'thick' },
            bottom: { style: 'thick' },
            left: { style: 'thick' },
            right: { style: 'thin' }
        }
        initDate.alignment = { vertical: "middle", horizontal: "center" };

        let initDateVal = worksheet.getCell("N2");
        initDateVal.value = new Date(allData[0].initialDate);
        initDateVal.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        initDateVal.border = {
            top: { style: 'thick' },
            bottom: { style: 'thick' },
            left: { style: 'thin' },
            right: { style: 'thick' }
        }
        initDateVal.alignment = { vertical: "middle", horizontal: "center" };


        let currency = worksheet.getCell("M5");
        currency.value = "CURRENCY";
        currency.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        currency.border = {
            top: { style: 'thick' },
            bottom: { style: 'thick' },
            left: { style: 'thick' },
            right: { style: 'thin' }
        }
        currency.alignment = { vertical: "middle", horizontal: "center" };

        let currencyVal = worksheet.getCell("N5");
        currencyVal.value = allData[0].currencyName;
        currencyVal.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        currencyVal.border = {
            top: { style: 'thick' },
            bottom: { style: 'thick' },
            left: { style: 'thin' },
            right: { style: 'thick' }
        }
        currencyVal.alignment = { vertical: "middle", horizontal: "center" };


        //PART NAME -------------------------------------------------------------------------------------------------------
        let partName1 = worksheet.getCell("B9");
        partName1.value = "PART :";
        partName1.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "FFFFFF" },
        };
        partName1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        partName1.alignment = { vertical: "middle", horizontal: "center" };

        let partName1Val = worksheet.getCell("C9");
        partName1Val.value = allData[0].partName;
        partName1Val.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "FFFFFF" },
        };
        partName1Val.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        partName1Val.alignment = { vertical: "middle", horizontal: "center" };

        //PART NAME 2ND PART-------------------------------------------------------------------------------------------------------
        if (allData.length > 1) {
            let partName2 = worksheet.getCell("X9");
            partName2.value = "PART :";
            partName2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "FFFFFF" },
            };
            partName2.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            partName2.alignment = { vertical: "middle", horizontal: "center" };

            let partName2Val = worksheet.getCell("Y9");
            partName2Val.value = allData[1].partName;
            partName2Val.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "FFFFFF" },
            };
            partName2Val.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            partName2Val.alignment = { vertical: "middle", horizontal: "center" };
        }




        //TABLE STARTS HERE_____________________________________________________________________________________________________________//
        //FABRIC HEADER
        var fabricHeaderP1 = 10;
        let facheadTwo1P1 = worksheet.getCell("B" + fabricHeaderP1);
        facheadTwo1P1.value = "MATERIAL NAME";
        facheadTwo1P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        facheadTwo1P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let facheadTwo2P1 = worksheet.getCell("C" + fabricHeaderP1);
        facheadTwo2P1.value = "MATERIAL PLM CODE";
        facheadTwo2P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        facheadTwo2P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let facheadTwo3P1 = worksheet.getCell("D" + fabricHeaderP1);
        facheadTwo3P1.value = "MATERIAL TYPE";
        facheadTwo3P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        facheadTwo3P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let facheadTwo4P1 = worksheet.getCell("E" + fabricHeaderP1);
        facheadTwo4P1.value = "SUPPLIER";
        facheadTwo4P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        facheadTwo4P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let facheadTwo5P1 = worksheet.getCell("F" + fabricHeaderP1);
        facheadTwo5P1.value = "NOM";
        facheadTwo5P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        facheadTwo5P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let facheadTwo6P1 = worksheet.getCell("G" + fabricHeaderP1);
        facheadTwo6P1.value = "COO";
        facheadTwo6P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        facheadTwo6P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let facheadTwo7P1 = worksheet.getCell("H" + fabricHeaderP1);
        facheadTwo7P1.value = "CUTTABLE WIDTH (inches/cm)";
        facheadTwo7P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        facheadTwo7P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let facheadTwo8P1 = worksheet.getCell("I" + fabricHeaderP1);
        facheadTwo8P1.value = "UNIT PRICE (FOB)";
        facheadTwo8P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        facheadTwo8P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let facheadTwo9P1 = worksheet.getCell("J" + fabricHeaderP1);
        facheadTwo9P1.value = "UoM";
        facheadTwo9P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        facheadTwo9P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let facheadTwo10P1 = worksheet.getCell("K" + fabricHeaderP1);
        facheadTwo10P1.value = "CONS.";
        facheadTwo10P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        facheadTwo10P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };



        let facheadTwo11P1 = worksheet.getCell("L" + fabricHeaderP1);
        facheadTwo11P1.value = "WASTAGE (%).";
        facheadTwo11P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        facheadTwo11P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let facheadTwo12P1 = worksheet.getCell("M" + fabricHeaderP1);
        facheadTwo12P1.value = "FREIGHT/CUSTOM COST/ UoM";
        facheadTwo12P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        facheadTwo12P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };


        let facheadTwo13P1 = worksheet.getCell("N" + fabricHeaderP1);
        facheadTwo13P1.value = "FREIGHT MODE";
        facheadTwo13P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        facheadTwo13P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let facheadTwo14P1 = worksheet.getCell("O" + fabricHeaderP1);
        facheadTwo14P1.value = "UNIT PRICE (CIF)";
        facheadTwo14P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        facheadTwo14P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let facheadTwo15P1 = worksheet.getCell("P" + fabricHeaderP1);
        facheadTwo15P1.value = "TOTAL (CIF)";
        facheadTwo15P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        facheadTwo15P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let facheadTwo16P1 = worksheet.getCell("Q" + fabricHeaderP1);
        facheadTwo16P1.value = "REMARK";
        facheadTwo16P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        facheadTwo16P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        //FABRIC DATA 1ST PART ----------------------------------------------------------------------------------------------------------

        var rowCountDetailFabric = 0
        var detailsFastRowFabric = rowCountDetailFabric + 10 + 1;
        var detailsLastRowFabric = 0

        for (var itemDetailsFab1 of dataForExcelFabricFstPart) {
            var costrowDetailOneFabric = rowCountDetailFabric + 10 + 1;
            let detailRowOneFabric1 = "B" + costrowDetailOneFabric;
            worksheet.getCell(detailRowOneFabric1).value = itemDetailsFab1[0];
            worksheet.getCell(detailRowOneFabric1).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            let detailRowOneFabric2 = "C" + costrowDetailOneFabric;
            worksheet.getCell(detailRowOneFabric2).value = itemDetailsFab1[1];
            worksheet.getCell(detailRowOneFabric2).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            let detailRowOneFabric3 = "D" + costrowDetailOneFabric;
            worksheet.getCell(detailRowOneFabric3).value = itemDetailsFab1[2];
            worksheet.getCell(detailRowOneFabric3).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneFabric4 = "E" + costrowDetailOneFabric;
            worksheet.getCell(detailRowOneFabric4).value = itemDetailsFab1[3];
            worksheet.getCell(detailRowOneFabric4).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneFabric5 = "F" + costrowDetailOneFabric;
            worksheet.getCell(detailRowOneFabric5).value = itemDetailsFab1[4];
            worksheet.getCell(detailRowOneFabric5).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneFabric6 = "G" + costrowDetailOneFabric;
            worksheet.getCell(detailRowOneFabric6).value = itemDetailsFab1[5];
            worksheet.getCell(detailRowOneFabric6).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneFabric7 = "H" + costrowDetailOneFabric;
            worksheet.getCell(detailRowOneFabric7).value = itemDetailsFab1[6];
            worksheet.getCell(detailRowOneFabric7).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneFabric8 = "I" + costrowDetailOneFabric;
            worksheet.getCell(detailRowOneFabric8).value = itemDetailsFab1[7];
            worksheet.getCell(detailRowOneFabric8).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneFabric9 = "J" + costrowDetailOneFabric;
            worksheet.getCell(detailRowOneFabric9).value = itemDetailsFab1[8];
            worksheet.getCell(detailRowOneFabric9).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneFabric10 = "K" + costrowDetailOneFabric; //row.getCell(5).address;
            worksheet.getCell(detailRowOneFabric10).value = itemDetailsFab1[9];
            worksheet.getCell(detailRowOneFabric10).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneFabric11 = "L" + costrowDetailOneFabric;
            worksheet.getCell(detailRowOneFabric11).value = itemDetailsFab1[10]/100;
            worksheet.getCell(detailRowOneFabric11).numFmt = '0%'
            worksheet.getCell(detailRowOneFabric11).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneLFabric12 = "M" + costrowDetailOneFabric;
            worksheet.getCell(detailRowOneLFabric12).value = itemDetailsFab1[11];
            worksheet.getCell(detailRowOneLFabric12).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneFabric13 = "N" + costrowDetailOneFabric;
            worksheet.getCell(detailRowOneFabric13).value = itemDetailsFab1[12];
            worksheet.getCell(detailRowOneFabric13).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneFabric14 = "O" + costrowDetailOneFabric;
            worksheet.getCell(detailRowOneFabric14).value = itemDetailsFab1[13];
            worksheet.getCell(detailRowOneFabric14).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            worksheet.getCell(detailRowOneFabric14).value = {
                formula: `I${costrowDetailOneFabric}+M${costrowDetailOneFabric}`,
                date1904: false
            }

            let detailRowOneFabric15 = "P" + costrowDetailOneFabric;
            worksheet.getCell(detailRowOneFabric15).value = itemDetailsFab1[14];
            worksheet.getCell(detailRowOneFabric15).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            worksheet.getCell(detailRowOneFabric15).fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "ff9fe770" },
                bgColor: { argb: "" },
            };
            if(itemDetailsFab1[8].toUpperCase() =="METER" &&  itemDetailsFab1[16].toUpperCase() == "YDS"){
                worksheet.getCell(detailRowOneFabric15).value = {
                    formula: `IFERROR((I${costrowDetailOneFabric}*(K${costrowDetailOneFabric}*1.09361)*(1+L${costrowDetailOneFabric}))+((K${costrowDetailOneFabric}*1.09361)*(1+L${costrowDetailOneFabric})*M${costrowDetailOneFabric}),0)`,
                    date1904: false
                }
            }
            else if(itemDetailsFab1[8].toUpperCase() =="YDS" &&  itemDetailsFab1[16].toUpperCase() == "METER"){
                worksheet.getCell(detailRowOneFabric15).value = {
                    formula: `IFERROR((I${costrowDetailOneFabric}*(K${costrowDetailOneFabric}/1.09361)*(1+L${costrowDetailOneFabric}))+((K${costrowDetailOneFabric}/1.09361)*(1+L${costrowDetailOneFabric})*M${costrowDetailOneFabric}),0)`,
                    date1904: false
                }
            }
            else{
                worksheet.getCell(detailRowOneFabric15).value = {
                    formula: `IFERROR((I${costrowDetailOneFabric}*K${costrowDetailOneFabric}*(1+L${costrowDetailOneFabric}))+(K${costrowDetailOneFabric}*(1+L${costrowDetailOneFabric})*M${costrowDetailOneFabric}),0)`,
                    date1904: false
                }
            }           
            let detailRowOneFabric16 = "Q" + costrowDetailOneFabric;
            worksheet.getCell(detailRowOneFabric16).value = itemDetailsFab1[15];
            worksheet.getCell(detailRowOneFabric16).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            detailsLastRowFabric = costrowDetailOneFabric;
            rowCountDetailFabric++
        }


        //ACCSESSORIES HEADER
        var accHeader2P1 = 10 + 1 + rowCountDetailFabric + 2;
        let accTwo1P1 = worksheet.getCell("B" + accHeader2P1);
        accTwo1P1.value = "TRIM NAME";
        accTwo1P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        accTwo1P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let accTwo2P1 = worksheet.getCell("C" + accHeader2P1);
        accTwo2P1.value = "TRIM PLM CODE";
        accTwo2P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        accTwo2P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let accTwo3P1 = worksheet.getCell("D" + accHeader2P1);
        accTwo3P1.value = "TRIM TYPE";
        accTwo3P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        accTwo3P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let accTwo4P1 = worksheet.getCell("E" + accHeader2P1);
        accTwo4P1.value = "SUPPLIER";
        accTwo4P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        accTwo4P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let accTwo5P1 = worksheet.getCell("F" + accHeader2P1);
        accTwo5P1.value = "NOM";
        accTwo5P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        accTwo5P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let accTwo6P1 = worksheet.getCell("G" + accHeader2P1);
        accTwo6P1.value = "COO";
        accTwo6P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        accTwo6P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let accTwo7P1 = worksheet.getCell("H" + accHeader2P1);
        accTwo7P1.value = "SIZE";
        accTwo7P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        accTwo7P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let accTwo8P1 = worksheet.getCell("I" + accHeader2P1);
        accTwo8P1.value = "UNIT PRICE (FOB)";
        accTwo8P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        accTwo8P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let accTwo9P1 = worksheet.getCell("J" + accHeader2P1);
        accTwo9P1.value = "UoM";
        accTwo9P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        accTwo9P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let accTwo10P1 = worksheet.getCell("K" + accHeader2P1);
        accTwo10P1.value = "CONS.";
        accTwo10P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        accTwo10P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let accTwo11P1 = worksheet.getCell("L" + accHeader2P1);
        accTwo11P1.value = "WASTAGE (%).";
        accTwo11P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        accTwo11P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let accTwo12P1 = worksheet.getCell("M" + accHeader2P1);
        accTwo12P1.value = "FREIGHT/CUSTOM COST/ UoM";
        accTwo12P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        accTwo12P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };


        let accTwo13P1 = worksheet.getCell("N" + accHeader2P1);
        accTwo13P1.value = "FREIGHT MODE";
        accTwo13P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        accTwo13P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let accTwo14P1 = worksheet.getCell("O" + accHeader2P1);
        accTwo14P1.value = "UNIT PRICE (CIF)";
        accTwo14P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        accTwo14P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let accTwo15P1 = worksheet.getCell("P" + accHeader2P1);
        accTwo15P1.value = "TOTAL (CIF)";
        accTwo15P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        accTwo15P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let accTwo16P1 = worksheet.getCell("Q" + accHeader2P1);
        accTwo16P1.value = "REMARK";
        accTwo16P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        accTwo16P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };


        //ACCESSORIES DATA-------------------------------------- 1ST PART -------------------------------------------------------

        var rowCountDetailsAccsessories1 = 0
        var detailsFastRowAccsessories1 = rowCountDetailsAccsessories1 + 10 + 1 + rowCountDetailFabric + 3;
        var detailsLastRowAccsessories1 = 0
      
        for (var itemDetailsAccsessories1 of dataForExcelAccessoriesFstPart) {
            var costrowDetailOneAccsessories = rowCountDetailsAccsessories1 + 10 + 1 + rowCountDetailFabric + 3;
            let detailRowOneAccsessories1 = "B" + costrowDetailOneAccsessories;// row.getCell(1).address;
            worksheet.getCell(detailRowOneAccsessories1).value = itemDetailsAccsessories1[0];
            worksheet.getCell(detailRowOneAccsessories1).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneAccsessories2 = "C" + costrowDetailOneAccsessories;//  row.getCell(2).address;
            worksheet.getCell(detailRowOneAccsessories2).value = itemDetailsAccsessories1[1];
            worksheet.getCell(detailRowOneAccsessories2).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneAccsessories3 = "D" + costrowDetailOneAccsessories;// row.getCell(3).address;
            worksheet.getCell(detailRowOneAccsessories3).value = itemDetailsAccsessories1[2];
            worksheet.getCell(detailRowOneAccsessories3).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneAccsessories4 = "E" + costrowDetailOneAccsessories; //row.getCell(4).address;
            worksheet.getCell(detailRowOneAccsessories4).value = itemDetailsAccsessories1[3];
            worksheet.getCell(detailRowOneAccsessories4).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneAccsessories5 = "F" + costrowDetailOneAccsessories; //row.getCell(5).address;
            worksheet.getCell(detailRowOneAccsessories5).value = itemDetailsAccsessories1[4];
            worksheet.getCell(detailRowOneAccsessories5).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneAccsessories6 = "G" + costrowDetailOneAccsessories; //row.getCell(5).address;
            worksheet.getCell(detailRowOneAccsessories6).value = itemDetailsAccsessories1[5];
            worksheet.getCell(detailRowOneAccsessories6).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneAccsessories7 = "H" + costrowDetailOneAccsessories; //row.getCell(5).address;
            worksheet.getCell(detailRowOneAccsessories7).value = itemDetailsAccsessories1[6];
            worksheet.getCell(detailRowOneAccsessories7).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneAccsessories8 = "I" + costrowDetailOneAccsessories; //row.getCell(5).address;
            worksheet.getCell(detailRowOneAccsessories8).value = itemDetailsAccsessories1[7];
            worksheet.getCell(detailRowOneAccsessories8).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneAccsessories9 = "J" + costrowDetailOneAccsessories; //row.getCell(5).address;
            worksheet.getCell(detailRowOneAccsessories9).value = itemDetailsAccsessories1[8];
            worksheet.getCell(detailRowOneAccsessories9).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneAccsessories10 = "K" + costrowDetailOneAccsessories; //row.getCell(5).address;
            worksheet.getCell(detailRowOneAccsessories10).value = itemDetailsAccsessories1[9];
            worksheet.getCell(detailRowOneAccsessories10).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneAccsessories11 = "L" + costrowDetailOneAccsessories; //row.getCell(5).address;
            worksheet.getCell(detailRowOneAccsessories11).value = itemDetailsAccsessories1[10]/100;
            worksheet.getCell(detailRowOneAccsessories11).numFmt = '0%'
            worksheet.getCell(detailRowOneAccsessories11).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneAccsessories12 = "M" + costrowDetailOneAccsessories; //row.getCell(5).address;
            worksheet.getCell(detailRowOneAccsessories12).value = itemDetailsAccsessories1[11];
            worksheet.getCell(detailRowOneAccsessories12).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneAccsessories13 = "N" + costrowDetailOneAccsessories; //row.getCell(5).address;
            worksheet.getCell(detailRowOneAccsessories13).value = itemDetailsAccsessories1[12];
            worksheet.getCell(detailRowOneAccsessories13).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneAccsessories14 = "O" + costrowDetailOneAccsessories; //row.getCell(5).address;
            worksheet.getCell(detailRowOneAccsessories14).value = itemDetailsAccsessories1[13];
            worksheet.getCell(detailRowOneAccsessories14).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            worksheet.getCell(detailRowOneAccsessories14).value = {
                formula: `I${costrowDetailOneAccsessories}+M${costrowDetailOneAccsessories}`,
                date1904: false
            }


            var flAcs1 = "";
            var finalFLAcs1 = "";
            var qtyDzTempAcs1 = `(((${itemDetailsAccsessories1[9]}) + ( (${itemDetailsAccsessories1[9]}) *(${itemDetailsAccsessories1[10]}%)))/${itemDetailsAccsessories1[16]})*${itemDetailsAccsessories1[7]}`;
            if (itemDetailsAccsessories1[16] == 1) {
      
                finalFLAcs1 = `(${qtyDzTempAcs1}  + ${qtyDzTempAcs1}*(${itemDetailsAccsessories1[11]}/100))`;
      
            }
            else {
                finalFLAcs1 = `(${qtyDzTempAcs1} +${itemDetailsAccsessories1[11]})`;
            }
      
    

            let detailRowOneAccsessories15 = "P" + costrowDetailOneAccsessories; //row.getCell(5).address;
            worksheet.getCell(detailRowOneAccsessories15).value = itemDetailsAccsessories1[14];
            worksheet.getCell(detailRowOneAccsessories15).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            worksheet.getCell(detailRowOneAccsessories15).fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "ff9fe770" },
                bgColor: { argb: "" },
            };
            // worksheet.getCell(detailRowOneAccsessories15).value = {
            //     formula: `IFERROR((I${costrowDetailOneAccsessories}*K${costrowDetailOneAccsessories}*(1+L${costrowDetailOneAccsessories}))+(K${costrowDetailOneAccsessories}*(1+L${costrowDetailOneAccsessories})*M${costrowDetailOneAccsessories}),0)`,
            //     date1904: false
            // }
            worksheet.getCell(detailRowOneAccsessories15).value = {
                formula: finalFLAcs1,
                date1904: false
              }

            let detailRowOneAccsessories16 = "Q" + costrowDetailOneAccsessories; //row.getCell(5).address;
            worksheet.getCell(detailRowOneAccsessories16).value = itemDetailsAccsessories1[15];
            worksheet.getCell(detailRowOneAccsessories16).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            detailsLastRowAccsessories1 = costrowDetailOneAccsessories;
            rowCountDetailsAccsessories1++
        }




        // LABEL HEADER
        var labelHeaderP1 = 10 + 1 + rowCountDetailFabric + 3 + rowCountDetailsAccsessories1 + 2;
        let labelTwo1P1 = worksheet.getCell("B" + labelHeaderP1);
        labelTwo1P1.value = "LABEL";
        labelTwo1P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        labelTwo1P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let labelTwo2P1 = worksheet.getCell("C" + labelHeaderP1);
        labelTwo2P1.value = "PLM CODE";
        labelTwo2P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        labelTwo2P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let labelTwo3P1 = worksheet.getCell("D" + labelHeaderP1);
        labelTwo3P1.value = "LABEL TYPE";
        labelTwo3P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        labelTwo3P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let labelTwo4P1 = worksheet.getCell("E" + labelHeaderP1);
        labelTwo4P1.value = "SUPPLIER";
        labelTwo4P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        labelTwo4P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let labelTwo5P1 = worksheet.getCell("F" + labelHeaderP1);
        labelTwo5P1.value = "NOM";
        labelTwo5P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        labelTwo5P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let labelTwo6P1 = worksheet.getCell("G" + labelHeaderP1);
        labelTwo6P1.value = "COO";
        labelTwo6P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        labelTwo6P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let labelTwo7P1 = worksheet.getCell("H" + labelHeaderP1);
        labelTwo7P1.value = "SIZE";
        labelTwo7P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        labelTwo7P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let labelTwo8P1 = worksheet.getCell("I" + labelHeaderP1);
        labelTwo8P1.value = "UNIT PRICE (FOB)";
        labelTwo8P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        labelTwo8P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let labelTwo9P1 = worksheet.getCell("J" + labelHeaderP1);
        labelTwo9P1.value = "UoM";
        labelTwo9P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        labelTwo9P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let labelTwo10P1 = worksheet.getCell("K" + labelHeaderP1);
        labelTwo10P1.value = "CONS.";
        labelTwo10P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        labelTwo10P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let labelTwo11P1 = worksheet.getCell("L" + labelHeaderP1);
        labelTwo11P1.value = "WASTAGE (%).";
        labelTwo11P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        labelTwo11P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let labelTwo12P1 = worksheet.getCell("M" + labelHeaderP1);
        labelTwo12P1.value = "FREIGHT/CUSTOM COST/ UoM";
        labelTwo12P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        labelTwo12P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let labelTwo13P1 = worksheet.getCell("N" + labelHeaderP1);
        labelTwo13P1.value = "FREIGHT MODE";
        labelTwo13P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        labelTwo13P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let labelTwo14P1 = worksheet.getCell("O" + labelHeaderP1);
        labelTwo14P1.value = "UNIT PRICE (CIF)";
        labelTwo14P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        labelTwo14P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let labelTwo15P1 = worksheet.getCell("P" + labelHeaderP1);
        labelTwo15P1.value = "TOTAL (CIF)";
        labelTwo15P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        labelTwo15P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let labelTwo16P1 = worksheet.getCell("Q" + labelHeaderP1);
        labelTwo16P1.value = "REMARK";
        labelTwo16P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        labelTwo16P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };



        //LABEL DATA ---------------------------------------------------------------------1ST ---------------------------------
        var rowCountDetailsLabel1 = 0
        var detailsFastRowLabel1 = rowCountDetailsLabel1 + 10 + 1 + rowCountDetailsAccsessories1 + 3 + rowCountDetailFabric + 3;
        var detailsLastRowLabel1 = 0

        for (var itemDetailsLabel1 of dataForExcelLabelFstPart) {
            var costrowDetailOneLabel = rowCountDetailsLabel1 + 10 + 1 + rowCountDetailsAccsessories1 + 3 + rowCountDetailFabric + 3;
            let detailRowOneLabel1 = "B" + costrowDetailOneLabel;// row.getCell(1).address;
            worksheet.getCell(detailRowOneLabel1).value = itemDetailsLabel1[0];
            worksheet.getCell(detailRowOneLabel1).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneLabel2 = "C" + costrowDetailOneLabel;//  row.getCell(2).address;
            worksheet.getCell(detailRowOneLabel2).value = itemDetailsLabel1[1];
            worksheet.getCell(detailRowOneLabel2).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneLabel3 = "D" + costrowDetailOneLabel;// row.getCell(3).address;
            worksheet.getCell(detailRowOneLabel3).value = itemDetailsLabel1[2];
            worksheet.getCell(detailRowOneLabel3).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneLabel4 = "E" + costrowDetailOneLabel; //row.getCell(4).address;
            worksheet.getCell(detailRowOneLabel4).value = itemDetailsLabel1[3];
            worksheet.getCell(detailRowOneLabel4).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneLabel5 = "F" + costrowDetailOneLabel; //row.getCell(5).address;
            worksheet.getCell(detailRowOneLabel5).value = itemDetailsLabel1[4];
            worksheet.getCell(detailRowOneLabel5).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneLabel6 = "G" + costrowDetailOneLabel; //row.getCell(5).address;
            worksheet.getCell(detailRowOneLabel6).value = itemDetailsLabel1[5];
            worksheet.getCell(detailRowOneLabel6).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneLabel7 = "H" + costrowDetailOneLabel; //row.getCell(5).address;
            worksheet.getCell(detailRowOneLabel7).value = itemDetailsLabel1[6];
            worksheet.getCell(detailRowOneLabel7).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneLabel8 = "I" + costrowDetailOneLabel; //row.getCell(5).address;
            worksheet.getCell(detailRowOneLabel8).value = itemDetailsLabel1[7];
            worksheet.getCell(detailRowOneLabel8).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneLabel9 = "J" + costrowDetailOneLabel; //row.getCell(5).address;
            worksheet.getCell(detailRowOneLabel9).value = itemDetailsLabel1[8];
            worksheet.getCell(detailRowOneLabel9).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            //   worksheet.getCell(detailRowOneLabel9).alignment = { vertical: "middle", horizontal: "center" };


            let detailRowOneLabel10 = "K" + costrowDetailOneLabel; //row.getCell(5).address;
            worksheet.getCell(detailRowOneLabel10).value = itemDetailsLabel1[9];
            worksheet.getCell(detailRowOneLabel10).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            //   worksheet.getCell(detailRowOneLabel10).alignment = { vertical: "middle", horizontal: "center" };

            let detailRowOneLabel11 = "L" + costrowDetailOneLabel; //row.getCell(5).address;
            worksheet.getCell(detailRowOneLabel11).value = itemDetailsLabel1[10]/100;
            worksheet.getCell(detailRowOneLabel11).numFmt = '0%'
            worksheet.getCell(detailRowOneLabel11).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }


            let detailRowOneLabel12 = "M" + costrowDetailOneLabel; //row.getCell(5).address;
            worksheet.getCell(detailRowOneLabel12).value = itemDetailsLabel1[11];
            worksheet.getCell(detailRowOneLabel12).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneLabel13 = "N" + costrowDetailOneLabel; //row.getCell(5).address;
            worksheet.getCell(detailRowOneLabel13).value = itemDetailsLabel1[12];
            worksheet.getCell(detailRowOneLabel13).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneLabel14 = "O" + costrowDetailOneLabel; //row.getCell(5).address;
            worksheet.getCell(detailRowOneLabel14).value = itemDetailsLabel1[13];
            worksheet.getCell(detailRowOneLabel14).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            worksheet.getCell(detailRowOneLabel14).value = {
                formula: `I${costrowDetailOneLabel}+M${costrowDetailOneLabel}`,
                date1904: false
            }

            let detailRowOneLabel15 = "P" + costrowDetailOneLabel; //row.getCell(5).address;
            worksheet.getCell(detailRowOneLabel15).value = itemDetailsLabel1[14];
            worksheet.getCell(detailRowOneLabel15).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            worksheet.getCell(detailRowOneLabel15).fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "ff9fe770" },
                bgColor: { argb: "" },
            };
            worksheet.getCell(detailRowOneLabel15).value = {
                formula: `IFERROR((I${costrowDetailOneLabel}*K${costrowDetailOneLabel}*(1+L${costrowDetailOneLabel}))+(K${costrowDetailOneLabel}*(1+L${costrowDetailOneLabel})*M${costrowDetailOneLabel}),0)`,
                date1904: false
            }

            let detailRowOneLabel16 = "Q" + costrowDetailOneLabel; //row.getCell(5).address;
            worksheet.getCell(detailRowOneLabel16).value = itemDetailsLabel1[15];
            worksheet.getCell(detailRowOneLabel16).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            detailsLastRowLabel1 = costrowDetailOneLabel;
            rowCountDetailsLabel1++
        }



        // PACKAGING HEADER 

        var packagingHeaderP1 = 10 + 1 + rowCountDetailFabric + 3 + rowCountDetailsAccsessories1 + 3 + rowCountDetailsLabel1 + 2;
        let packagingTwo1P1 = worksheet.getCell("B" + packagingHeaderP1);
        packagingTwo1P1.value = "PACKAGING";
        packagingTwo1P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        packagingTwo1P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let packagingTwo2P1 = worksheet.getCell("C" + packagingHeaderP1);
        packagingTwo2P1.value = "PLM CODE";
        packagingTwo2P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        packagingTwo2P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let packagingTwo3P1 = worksheet.getCell("D" + packagingHeaderP1);
        packagingTwo3P1.value = "PACKAGING TYPE";
        packagingTwo3P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        packagingTwo3P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let packagingTwo4P1 = worksheet.getCell("E" + packagingHeaderP1);
        packagingTwo4P1.value = "SUPPLIER";
        packagingTwo4P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        packagingTwo4P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let packagingTwo5P1 = worksheet.getCell("F" + packagingHeaderP1);
        packagingTwo5P1.value = "NOM";
        packagingTwo5P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        packagingTwo5P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let packagingTwo6P1 = worksheet.getCell("G" + packagingHeaderP1);
        packagingTwo6P1.value = "COO";
        packagingTwo6P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        packagingTwo6P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let packagingTwo7P1 = worksheet.getCell("H" + packagingHeaderP1);
        packagingTwo7P1.value = "SIZE";
        packagingTwo7P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        packagingTwo7P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let packagingTwo8P1 = worksheet.getCell("I" + packagingHeaderP1);
        packagingTwo8P1.value = "UNIT PRICE (FOB)";
        packagingTwo8P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        packagingTwo8P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let packagingTwo9P1 = worksheet.getCell("J" + packagingHeaderP1);
        packagingTwo9P1.value = "UoM";
        packagingTwo9P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        packagingTwo9P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let packagingTwo10P1 = worksheet.getCell("K" + packagingHeaderP1);
        packagingTwo10P1.value = "CONS.";
        packagingTwo10P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        packagingTwo10P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let packagingTwo11P1 = worksheet.getCell("L" + packagingHeaderP1);
        packagingTwo11P1.value = "WASTAGE (%).";
        packagingTwo11P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        packagingTwo11P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let packagingTwo12P1 = worksheet.getCell("M" + packagingHeaderP1);
        packagingTwo12P1.value = "FREIGHT/CUSTOM COST/ UoM";
        packagingTwo12P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        packagingTwo12P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let packagingTwo13P1 = worksheet.getCell("N" + packagingHeaderP1);
        packagingTwo13P1.value = "FREIGHT MODE";
        packagingTwo13P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        packagingTwo13P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let packagingTwo14P1 = worksheet.getCell("O" + packagingHeaderP1);
        packagingTwo14P1.value = "UNIT PRICE (CIF)";
        packagingTwo14P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        packagingTwo14P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let packagingTwo15P1 = worksheet.getCell("P" + packagingHeaderP1);
        packagingTwo15P1.value = "TOTAL (CIF)";
        packagingTwo15P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        packagingTwo15P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };
        let packagingTwo16P1 = worksheet.getCell("Q" + packagingHeaderP1);
        packagingTwo16P1.value = "REMARK";
        packagingTwo16P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        packagingTwo16P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };





        // PACKAGING DATA -----------------------1ST PART----------------------------------------------------------------
        var rowCountDetailsPackaging1 = 0
        var detailsFastRowPackaging1 = rowCountDetailsPackaging1 + 10 + 1 + rowCountDetailsLabel1 + 3 + rowCountDetailsAccsessories1 + 3 + rowCountDetailFabric + 3;
        var detailsLastRowPackaging1 = 0

        for (var itemDetailsPackaging1 of dataForExcelPackagingFstPart) {
            var costrowDetailPackagingOne = rowCountDetailsPackaging1 + 10 + 1 + rowCountDetailsLabel1 + 3 + rowCountDetailsAccsessories1 + 3 + rowCountDetailFabric + 3;
            let detailRowOnePackaging1 = "B" + costrowDetailPackagingOne;// row.getCell(1).address;
            worksheet.getCell(detailRowOnePackaging1).value = itemDetailsPackaging1[0];
            worksheet.getCell(detailRowOnePackaging1).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOnePackaging2 = "C" + costrowDetailPackagingOne;//  row.getCell(2).address;
            worksheet.getCell(detailRowOnePackaging2).value = itemDetailsPackaging1[1];
            worksheet.getCell(detailRowOnePackaging2).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOnePackaging3 = "D" + costrowDetailPackagingOne;// row.getCell(3).address;
            worksheet.getCell(detailRowOnePackaging3).value = itemDetailsPackaging1[2];
            worksheet.getCell(detailRowOnePackaging3).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOnePackaging4 = "E" + costrowDetailPackagingOne; //row.getCell(4).address;
            worksheet.getCell(detailRowOnePackaging4).value = itemDetailsPackaging1[3];
            worksheet.getCell(detailRowOnePackaging4).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOnePackaging5 = "F" + costrowDetailPackagingOne; //row.getCell(5).address;
            worksheet.getCell(detailRowOnePackaging5).value = itemDetailsPackaging1[4];
            worksheet.getCell(detailRowOnePackaging5).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOnePackaging6 = "G" + costrowDetailPackagingOne; //row.getCell(5).address;
            worksheet.getCell(detailRowOnePackaging6).value = itemDetailsPackaging1[5];
            worksheet.getCell(detailRowOnePackaging6).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOnePackaging7 = "H" + costrowDetailPackagingOne; //row.getCell(5).address;
            worksheet.getCell(detailRowOnePackaging7).value = itemDetailsPackaging1[6];
            worksheet.getCell(detailRowOnePackaging7).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOnePackaging8 = "I" + costrowDetailPackagingOne; //row.getCell(5).address;
            worksheet.getCell(detailRowOnePackaging8).value = itemDetailsPackaging1[7];
            worksheet.getCell(detailRowOnePackaging8).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOnePackaging9 = "J" + costrowDetailPackagingOne; //row.getCell(5).address;
            worksheet.getCell(detailRowOnePackaging9).value = itemDetailsPackaging1[8];
            worksheet.getCell(detailRowOnePackaging9).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            //   worksheet.getCell(detailRowOnePackaging9).alignment = { vertical: "middle", horizontal: "center" };


            let detailRowOnePackaging10 = "K" + costrowDetailPackagingOne; //row.getCell(5).address;
            worksheet.getCell(detailRowOnePackaging10).value = itemDetailsPackaging1[9];
            worksheet.getCell(detailRowOnePackaging10).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            //   worksheet.getCell(detailRowOnePackaging10).alignment = { vertical: "middle", horizontal: "center" };

            let detailRowOnePackaging11 = "L" + costrowDetailPackagingOne; //row.getCell(5).address;
            worksheet.getCell(detailRowOnePackaging11).value = itemDetailsPackaging1[10]/100;
            worksheet.getCell(detailRowOnePackaging11).numFmt = '0%'
            worksheet.getCell(detailRowOnePackaging11).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }


            let detailRowOnePackaging12 = "M" + costrowDetailPackagingOne; //row.getCell(5).address;
            worksheet.getCell(detailRowOnePackaging12).value = itemDetailsPackaging1[11];
            worksheet.getCell(detailRowOnePackaging12).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOnePackaging13 = "N" + costrowDetailPackagingOne; //row.getCell(5).address;
            worksheet.getCell(detailRowOnePackaging13).value = itemDetailsPackaging1[12];
            worksheet.getCell(detailRowOnePackaging13).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOnePackaging14 = "O" + costrowDetailPackagingOne; //row.getCell(5).address;
            worksheet.getCell(detailRowOnePackaging14).value = itemDetailsPackaging1[13];
            worksheet.getCell(detailRowOnePackaging14).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            worksheet.getCell(detailRowOnePackaging14).value = {
                formula: `I${costrowDetailPackagingOne}+M${costrowDetailPackagingOne}`,
                date1904: false
            }
            let detailRowOnePackaging15 = "P" + costrowDetailPackagingOne; //row.getCell(5).address;
            worksheet.getCell(detailRowOnePackaging15).value = itemDetailsPackaging1[14];
            worksheet.getCell(detailRowOnePackaging15).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            worksheet.getCell(detailRowOnePackaging15).fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "ff9fe770" },
                bgColor: { argb: "" },
            };
            worksheet.getCell(detailRowOnePackaging15).value = {
                formula: `IFERROR((I${costrowDetailPackagingOne}*K${costrowDetailPackagingOne}*(1+L${costrowDetailPackagingOne}))+(K${costrowDetailPackagingOne}*(1+L${costrowDetailPackagingOne})*M${costrowDetailPackagingOne}),0)`,
                date1904: false
            }
            let detailRowOnePackaging16 = "Q" + costrowDetailPackagingOne; //row.getCell(5).address;
            worksheet.getCell(detailRowOnePackaging16).value = itemDetailsPackaging1[15];
            worksheet.getCell(detailRowOnePackaging16).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            detailsLastRowPackaging1 = costrowDetailPackagingOne;
            rowCountDetailsPackaging1++
        }


        // PROCESS HEADER

        var processHeaderP1 = 10 + 1 + rowCountDetailFabric + 3 + rowCountDetailsAccsessories1 + 3 + rowCountDetailsLabel1 + 3 + rowCountDetailsPackaging1 + 2;
        let processTwo1P1 = worksheet.getCell("B" + processHeaderP1);
        processTwo1P1.value = "PROCESS";
        processTwo1P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        processTwo1P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let processTwo2P1 = worksheet.getCell("C" + processHeaderP1);
        processTwo2P1.value = "PLM CODE";
        processTwo2P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        processTwo2P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let processTwo3P1 = worksheet.getCell("D" + processHeaderP1);
        processTwo3P1.value = "PROCESS TYPE";
        processTwo3P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        processTwo3P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let processTwo4P1 = worksheet.getCell("E" + processHeaderP1);
        processTwo4P1.value = "SUPPLIER";
        processTwo4P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        processTwo4P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let processTwo5P1 = worksheet.getCell("F" + processHeaderP1);
        processTwo5P1.value = "NOM";
        processTwo5P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        processTwo5P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let processTwo6P1 = worksheet.getCell("G" + processHeaderP1);
        processTwo6P1.value = "COO";
        processTwo6P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        processTwo6P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let processTwo7P1 = worksheet.getCell("H" + processHeaderP1);
        processTwo7P1.value = "SIZE";
        processTwo7P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        processTwo7P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let processTwo8P1 = worksheet.getCell("I" + processHeaderP1);
        processTwo8P1.value = "UNIT PRICE (FOB)";
        processTwo8P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        processTwo8P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let processTwo9P1 = worksheet.getCell("J" + processHeaderP1);
        processTwo9P1.value = "UoM";
        processTwo9P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        processTwo9P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let processTwo10P1 = worksheet.getCell("K" + processHeaderP1);
        processTwo10P1.value = "CONS.";
        processTwo10P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        processTwo10P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };



        let processTwo11P1 = worksheet.getCell("L" + processHeaderP1);
        processTwo11P1.value = "WASTAGE (%).";
        processTwo11P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        processTwo11P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let processTwo12P1 = worksheet.getCell("M" + processHeaderP1);
        processTwo12P1.value = "FREIGHT/CUSTOM COST/ UoM";
        processTwo12P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        processTwo12P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };


        let processTwo13P1 = worksheet.getCell("N" + processHeaderP1);
        processTwo13P1.value = "FREIGHT MODE";
        processTwo13P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        processTwo13P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let processTwo14P1 = worksheet.getCell("O" + processHeaderP1);
        processTwo14P1.value = "UNIT PRICE (CIF)";
        processTwo14P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        processTwo14P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let processTwo15P1 = worksheet.getCell("P" + processHeaderP1);
        processTwo15P1.value = "TOTAL (CIF)";
        processTwo15P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        processTwo15P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let processTwo16P1 = worksheet.getCell("Q" + processHeaderP1);
        processTwo16P1.value = "REMARK";
        processTwo16P1.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        processTwo16P1.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        //PROCESS DATA ---------------------------------------------------1ST PART------------------------------------------
        var rowCountDetailsProcess1 = 0

        var detailsFastRowProcess1 = rowCountDetailsProcess1 + 10 + 1 + rowCountDetailsPackaging1 + 3 + rowCountDetailsLabel1 + 3 + rowCountDetailsAccsessories1 + 3 + rowCountDetailFabric + 3;
        var detailsLastRowProcess1 = 0

        for (var itemDetailsProcess1 of dataForExcelProcessFstPart) {
            var costrowDetailProcessOne = rowCountDetailsProcess1 + 10 + 1 + rowCountDetailsPackaging1 + 3 + rowCountDetailsLabel1 + 3 + rowCountDetailsAccsessories1 + 3 + rowCountDetailFabric + 3;
            let detailRowOneProcess1 = "B" + costrowDetailProcessOne;// row.getCell(1).address;
            worksheet.getCell(detailRowOneProcess1).value = itemDetailsProcess1[0];
            worksheet.getCell(detailRowOneProcess1).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneProcess2 = "C" + costrowDetailProcessOne;//  row.getCell(2).address;
            worksheet.getCell(detailRowOneProcess2).value = itemDetailsProcess1[1];
            worksheet.getCell(detailRowOneProcess2).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneProcess3 = "D" + costrowDetailProcessOne;// row.getCell(3).address;
            worksheet.getCell(detailRowOneProcess3).value = itemDetailsProcess1[2];
            worksheet.getCell(detailRowOneProcess3).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneProcess4 = "E" + costrowDetailProcessOne; //row.getCell(4).address;
            worksheet.getCell(detailRowOneProcess4).value = itemDetailsProcess1[3];
            worksheet.getCell(detailRowOneProcess4).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneProcess5 = "F" + costrowDetailProcessOne; //row.getCell(5).address;
            worksheet.getCell(detailRowOneProcess5).value = itemDetailsProcess1[4];
            worksheet.getCell(detailRowOneProcess5).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneProcess6 = "G" + costrowDetailProcessOne; //row.getCell(5).address;
            worksheet.getCell(detailRowOneProcess6).value = itemDetailsProcess1[5];
            worksheet.getCell(detailRowOneProcess6).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneProcess7 = "H" + costrowDetailProcessOne; //row.getCell(5).address;
            worksheet.getCell(detailRowOneProcess7).value = itemDetailsProcess1[6];
            worksheet.getCell(detailRowOneProcess7).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneProcess8 = "I" + costrowDetailProcessOne; //row.getCell(5).address;
            worksheet.getCell(detailRowOneProcess8).value = itemDetailsProcess1[7];
            worksheet.getCell(detailRowOneProcess8).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneProcess9 = "J" + costrowDetailProcessOne; //row.getCell(5).address;
            worksheet.getCell(detailRowOneProcess9).value = itemDetailsProcess1[8];
            worksheet.getCell(detailRowOneProcess9).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            //   worksheet.getCell(detailRowOneProcess9).alignment = { vertical: "middle", horizontal: "center" };


            let detailRowOneProcess10 = "K" + costrowDetailProcessOne; //row.getCell(5).address;
            worksheet.getCell(detailRowOneProcess10).value = itemDetailsProcess1[9];
            worksheet.getCell(detailRowOneProcess10).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            //   worksheet.getCell(detailRowOneProcess10).alignment = { vertical: "middle", horizontal: "center" };

            let detailRowOneProcess11 = "L" + costrowDetailProcessOne; //row.getCell(5).address;
            worksheet.getCell(detailRowOneProcess11).value = itemDetailsProcess1[10]/100;
            worksheet.getCell(detailRowOneProcess11).numFmt = '0%'
            worksheet.getCell(detailRowOneProcess11).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }


            let detailRowOneProcess12 = "M" + costrowDetailProcessOne; //row.getCell(5).address;
            worksheet.getCell(detailRowOneProcess12).value = itemDetailsProcess1[11];
            worksheet.getCell(detailRowOneProcess12).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneProcess13 = "N" + costrowDetailProcessOne; //row.getCell(5).address;
            worksheet.getCell(detailRowOneProcess13).value = itemDetailsProcess1[12];
            worksheet.getCell(detailRowOneProcess13).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneProcess14 = "O" + costrowDetailProcessOne; //row.getCell(5).address;
            worksheet.getCell(detailRowOneProcess14).value = itemDetailsProcess1[13];
            worksheet.getCell(detailRowOneProcess14).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            worksheet.getCell(detailRowOneProcess14).value = {
                formula: `I${costrowDetailProcessOne}+M${costrowDetailProcessOne}`,
                date1904: false
            }

            let detailRowOneProcess15 = "P" + costrowDetailProcessOne; //row.getCell(5).address;
            worksheet.getCell(detailRowOneProcess15).value = itemDetailsProcess1[14];
            worksheet.getCell(detailRowOneProcess15).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            worksheet.getCell(detailRowOneProcess15).fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "ff9fe770" },
                bgColor: { argb: "" },
            };
            worksheet.getCell(detailRowOneProcess15).value = {
                formula: `IFERROR((I${costrowDetailProcessOne}*K${costrowDetailProcessOne}*(1+L${costrowDetailProcessOne}))+(K${costrowDetailProcessOne}*(1+L${costrowDetailProcessOne})*M${costrowDetailProcessOne}),0)`,
                date1904: false
            }

            let detailRowOneProcess16 = "Q" + costrowDetailProcessOne; //row.getCell(5).address;
            worksheet.getCell(detailRowOneProcess16).value = itemDetailsProcess1[15];
            worksheet.getCell(detailRowOneProcess16).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            detailsLastRowProcess1 = costrowDetailProcessOne;
            rowCountDetailsProcess1++
        }


        // IE HEADER -----------------------------------------1ST PART ---------------------------------------------

        let ieMoq = worksheet.getCell("S10");
        ieMoq.value = "MOQ";
        ieMoq.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        ieMoq.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let ieLt = worksheet.getCell("T10");
        ieLt.value = "L/T";
        ieLt.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        ieLt.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };

        let ieRemark = worksheet.getCell("U10");
        ieRemark.value = "Remark";
        ieRemark.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "547955" },
            bgColor: { argb: "" },
        };
        ieRemark.font = {
            bold: true,
            color: { argb: "FFFFFF" },
            size: 12,
        };


        // IE DATA -----------------------------------------1ST PART ---------------------------------------------


        var rowCountDetailsIe1 = 0

        var detailsFastRowIe1 = 11 + rowCountDetailsIe1;
        var detailsLastRowIe1 = 0

        for (var itemDetailsIe1 of dataForExcelIe) {
            var costrowDetailIeOne = 11 + rowCountDetailsIe1;
            let detailRowOneIe1 = "S" + costrowDetailIeOne;// row.getCell(1).address;
            worksheet.getCell(detailRowOneIe1).value = itemDetailsIe1[0];
            worksheet.getCell(detailRowOneIe1).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneIe2 = "T" + costrowDetailIeOne;//  row.getCell(2).address;
            worksheet.getCell(detailRowOneIe2).value = itemDetailsIe1[1];
            worksheet.getCell(detailRowOneIe2).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }

            let detailRowOneIe3 = "U" + costrowDetailIeOne;// row.getCell(3).address;
            worksheet.getCell(detailRowOneIe3).value = itemDetailsIe1[2];
            worksheet.getCell(detailRowOneIe3).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            detailsLastRowIe1 = costrowDetailIeOne;
            rowCountDetailsIe1++

        }


        //----------------------------------------------------------------------------DOUBLE PART START -------------------------------------------
        //  FABRIC  DOUBLE PART_______________________________________//
        //HEADER 
        if (allData.length > 1) {
            var fabricHeader = 10;
            let facheadTwo1 = worksheet.getCell("X" + fabricHeader);
            facheadTwo1.value = "MATERIAL NAME";
            facheadTwo1.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            facheadTwo1.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let facheadTwo2 = worksheet.getCell("Y" + fabricHeader);
            facheadTwo2.value = "MATERIAL PLM CODE";
            facheadTwo2.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            facheadTwo2.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let facheadTwo3 = worksheet.getCell("Z" + fabricHeader);
            facheadTwo3.value = "MATERIAL TYPE";
            facheadTwo3.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            facheadTwo3.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let facheadTwo4 = worksheet.getCell("AA" + fabricHeader);
            facheadTwo4.value = "SUPPLIER";
            facheadTwo4.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            facheadTwo4.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let facheadTwo5 = worksheet.getCell("AB" + fabricHeader);
            facheadTwo5.value = "NOM";
            facheadTwo5.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            facheadTwo5.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let facheadTwo6 = worksheet.getCell("AC" + fabricHeader);
            facheadTwo6.value = "COO";
            facheadTwo6.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            facheadTwo6.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let facheadTwo7 = worksheet.getCell("AD" + fabricHeader);
            facheadTwo7.value = "CUTTABLE WIDTH (inches/cm)";
            facheadTwo7.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            facheadTwo7.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let facheadTwo8 = worksheet.getCell("AE" + fabricHeader);
            facheadTwo8.value = "UNIT PRICE (FOB)";
            facheadTwo8.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            facheadTwo8.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let facheadTwo9 = worksheet.getCell("AF" + fabricHeader);
            facheadTwo9.value = "UoM";
            facheadTwo9.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            facheadTwo9.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let facheadTwo10 = worksheet.getCell("AG" + fabricHeader);
            facheadTwo10.value = "CONS.";
            facheadTwo10.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            facheadTwo10.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };



            let facheadTwo11 = worksheet.getCell("AH" + fabricHeader);
            facheadTwo11.value = "WASTAGE (%).";
            facheadTwo11.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            facheadTwo11.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let facheadTwo12 = worksheet.getCell("AI" + fabricHeader);
            facheadTwo12.value = "FREIGHT/CUSTOM COST/ UoM";
            facheadTwo12.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            facheadTwo12.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };


            let facheadTwo13 = worksheet.getCell("AJ" + fabricHeader);
            facheadTwo13.value = "FREIGHT MODE";
            facheadTwo13.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            facheadTwo13.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let facheadTwo14 = worksheet.getCell("AK" + fabricHeader);
            facheadTwo14.value = "UNIT PRICE (CIF)";
            facheadTwo14.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            facheadTwo14.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let facheadTwo15 = worksheet.getCell("AL" + fabricHeader);
            facheadTwo15.value = "TOTAL (CIF)";
            facheadTwo15.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            facheadTwo15.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let facheadTwo16 = worksheet.getCell("AM" + fabricHeader);
            facheadTwo16.value = "REMARK";
            facheadTwo16.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            facheadTwo16.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };



            //FABRIC DATA ---------------------------------------------------------------------2ND PART------------------------------
            var rowCountDetailFabricP2 = 0
            var detailsFastRowFabricP2 = 10 + 1 + rowCountDetailFabricP2;
            var detailsLastRowFabricP2 = 0

            for (var itemDetailsFab2 of dataForExcelFabricSecPart) {
                var costrowDetailTwoFabric = 10 + 1 + rowCountDetailFabricP2;
                let detailRowTwoFabric1 = "X" + costrowDetailTwoFabric;// row.getCell(1).address;
                worksheet.getCell(detailRowTwoFabric1).value = itemDetailsFab2[0];
                worksheet.getCell(detailRowTwoFabric1).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoFabric2 = "Y" + costrowDetailTwoFabric;//  row.getCell(2).address;
                worksheet.getCell(detailRowTwoFabric2).value = itemDetailsFab2[1];
                worksheet.getCell(detailRowTwoFabric2).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoFabric3 = "Z" + costrowDetailTwoFabric;// row.getCell(3).address;
                worksheet.getCell(detailRowTwoFabric3).value = itemDetailsFab2[2];
                worksheet.getCell(detailRowTwoFabric3).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoFabric4 = "AA" + costrowDetailTwoFabric; //row.getCell(4).address;
                worksheet.getCell(detailRowTwoFabric4).value = itemDetailsFab2[3];
                worksheet.getCell(detailRowTwoFabric4).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoFabric5 = "AB" + costrowDetailTwoFabric; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoFabric5).value = itemDetailsFab2[4];
                worksheet.getCell(detailRowTwoFabric5).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoFabric6 = "AC" + costrowDetailTwoFabric; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoFabric6).value = itemDetailsFab2[5];
                worksheet.getCell(detailRowTwoFabric6).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoFabric7 = "AD" + costrowDetailTwoFabric; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoFabric7).value = itemDetailsFab2[6];
                worksheet.getCell(detailRowTwoFabric7).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoFabric8 = "AE" + costrowDetailTwoFabric; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoFabric8).value = itemDetailsFab2[7];
                worksheet.getCell(detailRowTwoFabric8).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoFabric9 = "AF" + costrowDetailTwoFabric; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoFabric9).value = itemDetailsFab2[8];
                worksheet.getCell(detailRowTwoFabric9).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }


                let detailRowTwoFabric10 = "AG" + costrowDetailTwoFabric; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoFabric10).value = itemDetailsFab2[9];
                worksheet.getCell(detailRowTwoFabric10).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoFabric11 = "AH" + costrowDetailTwoFabric; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoFabric11).value = itemDetailsFab2[10]/100;
                worksheet.getCell(detailRowTwoFabric11).numFmt = '0%'
                worksheet.getCell(detailRowTwoFabric11).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }


                let detailRowTwoLFabric12 = "AI" + costrowDetailTwoFabric; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoLFabric12).value = itemDetailsFab2[11];
                worksheet.getCell(detailRowTwoLFabric12).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoFabric13 = "AJ" + costrowDetailTwoFabric; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoFabric13).value = itemDetailsFab2[12];
                worksheet.getCell(detailRowTwoFabric13).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoFabric14 = "AK" + costrowDetailTwoFabric; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoFabric14).value = itemDetailsFab2[13];
                worksheet.getCell(detailRowTwoFabric14).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }
                worksheet.getCell(detailRowTwoFabric14).value = {
                    formula: `AE${costrowDetailTwoFabric}+AI${costrowDetailTwoFabric}`,
                    date1904: false
                }


                let detailRowTwoFabric15 = "AL" + costrowDetailTwoFabric; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoFabric15).value = itemDetailsFab2[14];
                worksheet.getCell(detailRowTwoFabric15).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }
                worksheet.getCell(detailRowTwoFabric15).fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "ff9fe770" },
                    bgColor: { argb: "" },
                };

                // worksheet.getCell(detailRowTwoFabric15).value = {
                //     formula: `IFERROR((AE${costrowDetailTwoFabric}*AG${costrowDetailTwoFabric}*(1+AH${costrowDetailTwoFabric}))+(AG${costrowDetailTwoFabric}*(1+AH${costrowDetailTwoFabric})*AI${costrowDetailTwoFabric}),0)`,
                //     date1904: false
                // }
                
                if(itemDetailsFab2[8].toUpperCase() =="METER" &&  itemDetailsFab2[16].toUpperCase() == "YDS"){
                    worksheet.getCell(detailRowTwoFabric15).value = {
                        formula: `IFERROR((AE${costrowDetailTwoFabric}*(AG${costrowDetailTwoFabric}*1.09361)*(1+AH${costrowDetailTwoFabric}))+((AG${costrowDetailTwoFabric}*1.09361)*(1+AH${costrowDetailTwoFabric})*AI${costrowDetailTwoFabric}),0)`,
                        date1904: false
                    }
                }
                else if(itemDetailsFab2[8].toUpperCase() =="YDS" &&  itemDetailsFab2[16].toUpperCase() == "METER"){
                    worksheet.getCell(detailRowTwoFabric15).value = {
                        formula: `IFERROR((AE${costrowDetailTwoFabric}*(AG${costrowDetailTwoFabric}/1.09361)*(1+AH${costrowDetailTwoFabric}))+((AG${costrowDetailTwoFabric}/1.09361)*(1+AH${costrowDetailTwoFabric})*AI${costrowDetailTwoFabric}),0)`,
                        date1904: false
                    }
                }
                else{
                    worksheet.getCell(detailRowTwoFabric15).value = {
                        formula: `IFERROR((AE${costrowDetailTwoFabric}*AG${costrowDetailTwoFabric}*(1+AH${costrowDetailTwoFabric}))+(AG${costrowDetailTwoFabric}*(1+AH${costrowDetailTwoFabric})*AI${costrowDetailTwoFabric}),0)`,
                        date1904: false
                    }
                }  

                let detailRowTwoFabric16 = "AM" + costrowDetailTwoFabric; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoFabric16).value = itemDetailsFab2[15];
                worksheet.getCell(detailRowTwoFabric16).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                detailsLastRowFabricP2 = costrowDetailTwoFabric;
                rowCountDetailFabricP2++
            }


            // ACC ---------------------------------------------------------------------2ND PART------------------------------
            // ACC HEADER

            var accHeader2 = 10 + 1 + rowCountDetailFabricP2 + 2;
            let accTwo1 = worksheet.getCell("X" + accHeader2);
            accTwo1.value = "TRIM NAME";
            accTwo1.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            accTwo1.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let accTwo2 = worksheet.getCell("Y" + accHeader2);
            accTwo2.value = "TRIM PLM CODE";
            accTwo2.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            accTwo2.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let accTwo3 = worksheet.getCell("Z" + accHeader2);
            accTwo3.value = "TRIM TYPE";
            accTwo3.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            accTwo3.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let accTwo4 = worksheet.getCell("AA" + accHeader2);
            accTwo4.value = "SUPPLIER";
            accTwo4.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            accTwo4.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let accTwo5 = worksheet.getCell("AB" + accHeader2);
            accTwo5.value = "NOM";
            accTwo5.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            accTwo5.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let accTwo6 = worksheet.getCell("AC" + accHeader2);
            accTwo6.value = "COO";
            accTwo6.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            accTwo6.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let accTwo7 = worksheet.getCell("AD" + accHeader2);
            accTwo7.value = "SIZE";
            accTwo7.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            accTwo7.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let accTwo8 = worksheet.getCell("AE" + accHeader2);
            accTwo8.value = "UNIT PRICE (FOB)";
            accTwo8.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            accTwo8.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let accTwo9 = worksheet.getCell("AF" + accHeader2);
            accTwo9.value = "UoM";
            accTwo9.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            accTwo9.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let accTwo10 = worksheet.getCell("AG" + accHeader2);
            accTwo10.value = "CONS.";
            accTwo10.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            accTwo10.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };



            let accTwo11 = worksheet.getCell("AH" + accHeader2);
            accTwo11.value = "WASTAGE (%).";
            accTwo11.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            accTwo11.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let accTwo12 = worksheet.getCell("AI" + accHeader2);
            accTwo12.value = "FREIGHT/CUSTOM COST/ UoM";
            accTwo12.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            accTwo12.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };


            let accTwo13 = worksheet.getCell("AJ" + accHeader2);
            accTwo13.value = "FREIGHT MODE";
            accTwo13.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            accTwo13.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let accTwo14 = worksheet.getCell("AK" + accHeader2);
            accTwo14.value = "UNIT PRICE (CIF)";
            accTwo14.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            accTwo14.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let accTwo15 = worksheet.getCell("AL" + accHeader2);
            accTwo15.value = "TOTAL (CIF)";
            accTwo15.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            accTwo15.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let accTwo16 = worksheet.getCell("AM" + accHeader2);
            accTwo16.value = "REMARK";
            accTwo16.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            accTwo16.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };



            //ACCESSORIES  DATA ----------------------------------------------------------------2ND PART------------------------------


            var rowCountDetailsAccsessories2 = 0
            var detailsFastRowAccsessories2 = 10 + 1 + rowCountDetailFabricP2 + 3 + rowCountDetailsAccsessories2;
            var detailsLastRowAccsessories2 = 0

            for (var itemDetailsAccsessories2 of dataForExcelAccessoriesSecPart) {
                var costrowDetailTwoAccsessories = 10 + 1 + rowCountDetailFabricP2 + 3 + rowCountDetailsAccsessories2;
                let detailRowTwoAccsessories1 = "X" + costrowDetailTwoAccsessories;// row.getCell(1).address;
                worksheet.getCell(detailRowTwoAccsessories1).value = itemDetailsAccsessories2[0];
                worksheet.getCell(detailRowTwoAccsessories1).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoAccsessories2 = "Y" + costrowDetailTwoAccsessories;//  row.getCell(2).address;
                worksheet.getCell(detailRowTwoAccsessories2).value = itemDetailsAccsessories2[1];
                worksheet.getCell(detailRowTwoAccsessories2).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoAccsessories3 = "Z" + costrowDetailTwoAccsessories;// row.getCell(3).address;
                worksheet.getCell(detailRowTwoAccsessories3).value = itemDetailsAccsessories2[2];
                worksheet.getCell(detailRowTwoAccsessories3).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoAccsessories4 = "AA" + costrowDetailTwoAccsessories; //row.getCell(4).address;
                worksheet.getCell(detailRowTwoAccsessories4).value = itemDetailsAccsessories2[3];
                worksheet.getCell(detailRowTwoAccsessories4).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoAccsessories5 = "AB" + costrowDetailTwoAccsessories; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoAccsessories5).value = itemDetailsAccsessories2[4];
                worksheet.getCell(detailRowTwoAccsessories5).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoAccsessories6 = "AC" + costrowDetailTwoAccsessories; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoAccsessories6).value = itemDetailsAccsessories2[5];
                worksheet.getCell(detailRowTwoAccsessories6).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoAccsessories7 = "AD" + costrowDetailTwoAccsessories; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoAccsessories7).value = itemDetailsAccsessories2[6];
                worksheet.getCell(detailRowTwoAccsessories7).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoAccsessories8 = "AE" + costrowDetailTwoAccsessories; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoAccsessories8).value = itemDetailsAccsessories2[7];
                worksheet.getCell(detailRowTwoAccsessories8).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoAccsessories9 = "AF" + costrowDetailTwoAccsessories; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoAccsessories9).value = itemDetailsAccsessories2[8];
                worksheet.getCell(detailRowTwoAccsessories9).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }
                //   worksheet.getCell(detailRowOneLabel9).alignment = { vertical: "middle", horizontal: "center" };


                let detailRowTwoAccsessories0 = "AG" + costrowDetailTwoAccsessories; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoAccsessories0).value = itemDetailsAccsessories2[9];
                worksheet.getCell(detailRowTwoAccsessories0).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }
                //   worksheet.getCell(detailRowOneLabel10).alignment = { vertical: "middle", horizontal: "center" };

                let detailRowTwoAccsessories11 = "AH" + costrowDetailTwoAccsessories; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoAccsessories11).value = itemDetailsAccsessories2[10]/100;
                worksheet.getCell(detailRowTwoAccsessories11).numFmt = '0%'
                worksheet.getCell(detailRowTwoAccsessories11).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }


                let detailRowTwoAccsessories12 = "AI" + costrowDetailTwoAccsessories; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoAccsessories12).value = itemDetailsAccsessories2[11];
                worksheet.getCell(detailRowTwoAccsessories12).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoAccsessories13 = "AJ" + costrowDetailTwoAccsessories; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoAccsessories13).value = itemDetailsAccsessories2[12];
                worksheet.getCell(detailRowTwoAccsessories13).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoAccsessories14 = "AK" + costrowDetailTwoAccsessories; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoAccsessories14).value = itemDetailsAccsessories2[13];
                worksheet.getCell(detailRowTwoAccsessories14).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }
                worksheet.getCell(detailRowTwoAccsessories14).value = {
                    formula: `AE${costrowDetailTwoAccsessories}+AI${costrowDetailTwoAccsessories}`,
                    date1904: false
                }

                       
                 var flAcs2 = "";
                 var finalFLAcs2 = "";
                 var qtyDzTempAcs2 = `(((${itemDetailsAccsessories2[9]}) + ( (${itemDetailsAccsessories2[9]}) *(${itemDetailsAccsessories2[10]}%)))/${itemDetailsAccsessories2[16]})*${itemDetailsAccsessories2[7]}`;
                 if (itemDetailsAccsessories2[16] == 1) {
           
                     finalFLAcs2 = `(${qtyDzTempAcs2}  + ${qtyDzTempAcs2}*(${itemDetailsAccsessories2[11]}/100))`;
           
                 }
                 else {
                     finalFLAcs2 = `(${qtyDzTempAcs2} +${itemDetailsAccsessories2[11]})`;
                 }
           

                let detailRowTwoAccsessories15 = "AL" + costrowDetailTwoAccsessories; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoAccsessories15).value = itemDetailsAccsessories2[14];
                worksheet.getCell(detailRowTwoAccsessories15).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }
                worksheet.getCell(detailRowTwoAccsessories15).fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "ff9fe770" },
                    bgColor: { argb: "" },
                };
                // worksheet.getCell(detailRowTwoAccsessories15).value = {
                //     formula: `IFERROR((AE${costrowDetailTwoAccsessories}*AG${costrowDetailTwoAccsessories}*(1+AH${costrowDetailTwoAccsessories}))+(AG${costrowDetailTwoAccsessories}*(1+AH${costrowDetailTwoAccsessories})*AI${costrowDetailTwoAccsessories}),0)`,
                //     date1904: false
                // }
                worksheet.getCell(detailRowTwoAccsessories15).value = {
                    formula: finalFLAcs1,
                    date1904: false
                  }

                let detailRowTwoAccsessories16 = "AM" + costrowDetailTwoAccsessories; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoAccsessories16).value = itemDetailsAccsessories2[15];
                worksheet.getCell(detailRowTwoAccsessories16).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                detailsLastRowAccsessories2 = costrowDetailTwoAccsessories;
                rowCountDetailsAccsessories2++
            }


            //LABEL 2ND  PART ----------------------------------------------------------------------------------------------
            // LABEL HEADER
            var labelHeader = 10 + 1 + rowCountDetailFabricP2 + 3 + rowCountDetailsAccsessories2 + 2;
            let labelTwo1 = worksheet.getCell("X" + labelHeader);
            labelTwo1.value = "LABEL";
            labelTwo1.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            labelTwo1.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let labelTwo2 = worksheet.getCell("Y" + labelHeader);
            labelTwo2.value = "PLM CODE";
            labelTwo2.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            labelTwo2.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let labelTwo3 = worksheet.getCell("Z" + labelHeader);
            labelTwo3.value = "LABEL TYPE";
            labelTwo3.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            labelTwo3.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let labelTwo4 = worksheet.getCell("AA" + labelHeader);
            labelTwo4.value = "SUPPLIER";
            labelTwo4.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            labelTwo4.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let labelTwo5 = worksheet.getCell("AB" + labelHeader);
            labelTwo5.value = "NOM";
            labelTwo5.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            labelTwo5.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let labelTwo6 = worksheet.getCell("AC" + labelHeader);
            labelTwo6.value = "COO";
            labelTwo6.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            labelTwo6.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let labelTwo7 = worksheet.getCell("AD" + labelHeader);
            labelTwo7.value = "SIZE";
            labelTwo7.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            labelTwo7.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let labelTwo8 = worksheet.getCell("AE" + labelHeader);
            labelTwo8.value = "UNIT PRICE (FOB)";
            labelTwo8.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            labelTwo8.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let labelTwo9 = worksheet.getCell("AF" + labelHeader);
            labelTwo9.value = "UoM";
            labelTwo9.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            labelTwo9.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let labelTwo10 = worksheet.getCell("AG" + labelHeader);
            labelTwo10.value = "CONS.";
            labelTwo10.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            labelTwo10.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let labelTwo11 = worksheet.getCell("AH" + labelHeader);
            labelTwo11.value = "WASTAGE (%).";
            labelTwo11.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            labelTwo11.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let labelTwo12 = worksheet.getCell("AI" + labelHeader);
            labelTwo12.value = "FREIGHT/CUSTOM COST/ UoM";
            labelTwo12.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            labelTwo12.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let labelTwo13 = worksheet.getCell("AJ" + labelHeader);
            labelTwo13.value = "FREIGHT MODE";
            labelTwo13.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            labelTwo13.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let labelTwo14 = worksheet.getCell("AK" + labelHeader);
            labelTwo14.value = "UNIT PRICE (CIF)";
            labelTwo14.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            labelTwo14.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let labelTwo15 = worksheet.getCell("AL" + labelHeader);
            labelTwo15.value = "TOTAL (CIF)";
            labelTwo15.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            labelTwo15.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let labelTwo16 = worksheet.getCell("AM" + labelHeader);
            labelTwo16.value = "REMARK";
            labelTwo16.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            labelTwo16.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            //LABEL DATA----2ND PART------------------------------------------------------------------------------------------------


            var rowCountDetailsLabel2 = 0
            var detailsFastRowLabel2 = 10 + 1 + rowCountDetailFabricP2 + 3 + rowCountDetailsAccsessories2 + 3 + rowCountDetailsLabel2;
            var detailsLastRowLabel2 = 0

            for (var itemDetailsLabel2 of dataForExcelLabelSecPart) {
                var costrowDetailTwoLabel = 10 + 1 + rowCountDetailFabricP2 + 3 + rowCountDetailsAccsessories2 + 3 + rowCountDetailsLabel2;
                let detailRowTwoLabel1 = "X" + costrowDetailTwoLabel;// row.getCell(1).address;
                worksheet.getCell(detailRowTwoLabel1).value = itemDetailsLabel2[0];
                worksheet.getCell(detailRowTwoLabel1).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoLabel2 = "Y" + costrowDetailTwoLabel;//  row.getCell(2).address;
                worksheet.getCell(detailRowTwoLabel2).value = itemDetailsLabel2[1];
                worksheet.getCell(detailRowTwoLabel2).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoLabel3 = "Z" + costrowDetailTwoLabel;// row.getCell(3).address;
                worksheet.getCell(detailRowTwoLabel3).value = itemDetailsLabel2[2];
                worksheet.getCell(detailRowTwoLabel3).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoLabel4 = "AA" + costrowDetailTwoLabel; //row.getCell(4).address;
                worksheet.getCell(detailRowTwoLabel4).value = itemDetailsLabel2[3];
                worksheet.getCell(detailRowTwoLabel4).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoLabel5 = "AB" + costrowDetailTwoLabel; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoLabel5).value = itemDetailsLabel2[4];
                worksheet.getCell(detailRowTwoLabel5).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoLabel6 = "AC" + costrowDetailTwoLabel; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoLabel6).value = itemDetailsLabel2[5];
                worksheet.getCell(detailRowTwoLabel6).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoLabel7 = "AD" + costrowDetailTwoLabel; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoLabel7).value = itemDetailsLabel2[6];
                worksheet.getCell(detailRowTwoLabel7).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoLabel8 = "AE" + costrowDetailTwoLabel; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoLabel8).value = itemDetailsLabel2[7];
                worksheet.getCell(detailRowTwoLabel8).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoLabel9 = "AF" + costrowDetailTwoLabel; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoLabel9).value = itemDetailsLabel2[8];
                worksheet.getCell(detailRowTwoLabel9).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }
                //   worksheet.getCell(detailRowOneLabel9).alignment = { vertical: "middle", horizontal: "center" };


                let detailRowTwoLabel10 = "AG" + costrowDetailTwoLabel; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoLabel10).value = itemDetailsLabel2[9];
                worksheet.getCell(detailRowTwoLabel10).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }
                //   worksheet.getCell(detailRowOneLabel10).alignment = { vertical: "middle", horizontal: "center" };

                let detailRowTwoLabel11 = "AH" + costrowDetailTwoLabel; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoLabel11).value = itemDetailsLabel2[10]/100;
                worksheet.getCell(detailRowTwoLabel11).numFmt = '0%'
                worksheet.getCell(detailRowTwoLabel11).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }


                let detailRowTwoLabel12 = "AI" + costrowDetailTwoLabel; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoLabel12).value = itemDetailsLabel2[11];
                worksheet.getCell(detailRowTwoLabel12).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoLabel13 = "AJ" + costrowDetailTwoLabel; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoLabel13).value = itemDetailsLabel2[12];
                worksheet.getCell(detailRowTwoLabel13).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoLabel14 = "AK" + costrowDetailTwoLabel; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoLabel14).value = itemDetailsLabel2[13];
                worksheet.getCell(detailRowTwoLabel14).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }
                worksheet.getCell(detailRowTwoLabel14).value = {
                    formula: `AE${costrowDetailTwoLabel}+AI${costrowDetailTwoLabel}`,
                    date1904: false
                }

                let detailRowTwoLabel15 = "AL" + costrowDetailTwoLabel; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoLabel15).value = itemDetailsLabel2[14];
                worksheet.getCell(detailRowTwoLabel15).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }
                worksheet.getCell(detailRowTwoLabel15).fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "ff9fe770" },
                    bgColor: { argb: "" },
                };
                worksheet.getCell(detailRowTwoLabel15).value = {
                    formula: `IFERROR((AE${costrowDetailTwoLabel}*AG${costrowDetailTwoLabel}*(1+AH${costrowDetailTwoLabel}))+(AG${costrowDetailTwoLabel}*(1+AH${costrowDetailTwoLabel})*AI${costrowDetailTwoLabel}),0)`,
                    date1904: false
                }

                let detailRowTwoLabel16 = "AM" + costrowDetailTwoLabel; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoLabel16).value = itemDetailsLabel2[15];
                worksheet.getCell(detailRowTwoLabel16).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                detailsLastRowLabel2 = costrowDetailTwoLabel;
                rowCountDetailsLabel2++
            }






            //PACKAGING 2ND PART---------------------------------------------------------------------------------------------------------



            // PACKAGING HEADER
            var packagingHeader = 10 + 1 + rowCountDetailFabricP2 + 3 + rowCountDetailsAccsessories2 + 3 + rowCountDetailsLabel2 + 2;
            let packagingTwo1 = worksheet.getCell("X" + packagingHeader);
            packagingTwo1.value = "PACKAGING";
            packagingTwo1.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            packagingTwo1.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let packagingTwo2 = worksheet.getCell("Y" + packagingHeader);
            packagingTwo2.value = "PLM CODE";
            packagingTwo2.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            packagingTwo2.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let packagingTwo3 = worksheet.getCell("Z" + packagingHeader);
            packagingTwo3.value = "PACKAGING TYPE";
            packagingTwo3.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            packagingTwo3.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let packagingTwo4 = worksheet.getCell("AA" + packagingHeader);
            packagingTwo4.value = "SUPPLIER";
            packagingTwo4.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            packagingTwo4.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let packagingTwo5 = worksheet.getCell("AB" + packagingHeader);
            packagingTwo5.value = "NOM";
            packagingTwo5.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            packagingTwo5.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let packagingTwo6 = worksheet.getCell("AC" + packagingHeader);
            packagingTwo6.value = "COO";
            packagingTwo6.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            packagingTwo6.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let packagingTwo7 = worksheet.getCell("AD" + packagingHeader);
            packagingTwo7.value = "SIZE";
            packagingTwo7.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            packagingTwo7.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let packagingTwo8 = worksheet.getCell("AE" + packagingHeader);
            packagingTwo8.value = "UNIT PRICE (FOB)";
            packagingTwo8.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            packagingTwo8.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let packagingTwo9 = worksheet.getCell("AF" + packagingHeader);
            packagingTwo9.value = "UoM";
            packagingTwo9.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            packagingTwo9.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let packagingTwo10 = worksheet.getCell("AG" + packagingHeader);
            packagingTwo10.value = "CONS.";
            packagingTwo10.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            packagingTwo10.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let packagingTwo11 = worksheet.getCell("AH" + packagingHeader);
            packagingTwo11.value = "WASTAGE (%).";
            packagingTwo11.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            packagingTwo11.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let packagingTwo12 = worksheet.getCell("AI" + packagingHeader);
            packagingTwo12.value = "FREIGHT/CUSTOM COST/ UoM";
            packagingTwo12.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            packagingTwo12.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let packagingTwo13 = worksheet.getCell("AJ" + packagingHeader);
            packagingTwo13.value = "FREIGHT MODE";
            packagingTwo13.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            packagingTwo13.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let packagingTwo14 = worksheet.getCell("AK" + packagingHeader);
            packagingTwo14.value = "UNIT PRICE (CIF)";
            packagingTwo14.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            packagingTwo14.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let packagingTwo15 = worksheet.getCell("AL" + packagingHeader);
            packagingTwo15.value = "TOTAL (CIF)";
            packagingTwo15.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            packagingTwo15.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            let packagingTwo16 = worksheet.getCell("AM" + packagingHeader);
            packagingTwo16.value = "REMARK";
            packagingTwo16.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            packagingTwo16.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };




            //PACKAGING DATA -------------------------------------------------------------------------------------------------------------------------------------
            var rowCountDetailsPackaging2 = 0
            var detailsFastRowPackaging2 = 10 + 1 + rowCountDetailFabricP2 + 3 + rowCountDetailsAccsessories2 + 3 + rowCountDetailsLabel2 + 3 + rowCountDetailsPackaging2;
            var detailsLastRowPackaging2 = 0

            for (var itemDetailsPackaging2 of dataForExcelPackagingSecPart) {
                var costrowDetailPackagingTwo = rowCountDetailsPackaging2 + 10 + 1 + rowCountDetailsLabel2 + 3 + rowCountDetailsAccsessories2 + 3 + rowCountDetailFabricP2 + 3;
                let detailRowTwoPackaging1 = "X" + costrowDetailPackagingTwo;// row.getCell(1).address;
                worksheet.getCell(detailRowTwoPackaging1).value = itemDetailsPackaging2[0];
                worksheet.getCell(detailRowTwoPackaging1).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoPackaging2 = "Y" + costrowDetailPackagingTwo;//  row.getCell(2).address;
                worksheet.getCell(detailRowTwoPackaging2).value = itemDetailsPackaging2[1];
                worksheet.getCell(detailRowTwoPackaging2).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoPackaging3 = "Z" + costrowDetailPackagingTwo;// row.getCell(3).address;
                worksheet.getCell(detailRowTwoPackaging3).value = itemDetailsPackaging2[2];
                worksheet.getCell(detailRowTwoPackaging3).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoPackaging4 = "AA" + costrowDetailPackagingTwo; //row.getCell(4).address;
                worksheet.getCell(detailRowTwoPackaging4).value = itemDetailsPackaging2[3];
                worksheet.getCell(detailRowTwoPackaging4).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoPackaging5 = "AB" + costrowDetailPackagingTwo; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoPackaging5).value = itemDetailsPackaging2[4];
                worksheet.getCell(detailRowTwoPackaging5).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoPackaging6 = "AC" + costrowDetailPackagingTwo; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoPackaging6).value = itemDetailsPackaging2[5];
                worksheet.getCell(detailRowTwoPackaging6).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoPackaging7 = "AD" + costrowDetailPackagingTwo; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoPackaging7).value = itemDetailsPackaging2[6];
                worksheet.getCell(detailRowTwoPackaging7).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoPackaging8 = "AE" + costrowDetailPackagingTwo; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoPackaging8).value = itemDetailsPackaging2[7];
                worksheet.getCell(detailRowTwoPackaging8).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoPackaging9 = "AF" + costrowDetailPackagingTwo; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoPackaging9).value = itemDetailsPackaging2[8];
                worksheet.getCell(detailRowTwoPackaging9).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }
                //   worksheet.getCell(detailRowOnePackaging9).alignment = { vertical: "middle", horizontal: "center" };


                let detailRowTwoPackaging10 = "AG" + costrowDetailPackagingTwo; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoPackaging10).value = itemDetailsPackaging2[9];
                worksheet.getCell(detailRowTwoPackaging10).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }
                //   worksheet.getCell(detailRowOnePackaging10).alignment = { vertical: "middle", horizontal: "center" };

                let detailRowTwoPackaging11 = "AH" + costrowDetailPackagingTwo; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoPackaging11).value = itemDetailsPackaging2[10]/100;
                worksheet.getCell(detailRowTwoPackaging11).numFmt = '0%'
                worksheet.getCell(detailRowTwoPackaging11).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }


                let detailRowTwoPackaging12 = "AI" + costrowDetailPackagingTwo; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoPackaging12).value = itemDetailsPackaging2[11];
                worksheet.getCell(detailRowTwoPackaging12).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoPackaging13 = "AJ" + costrowDetailPackagingTwo; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoPackaging13).value = itemDetailsPackaging2[12];
                worksheet.getCell(detailRowTwoPackaging13).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoPackaging14 = "AK" + costrowDetailPackagingTwo; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoPackaging14).value = itemDetailsPackaging2[13];
                worksheet.getCell(detailRowTwoPackaging14).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }
                worksheet.getCell(detailRowTwoPackaging14).value = {
                    formula: `AE${costrowDetailPackagingTwo}+AI${costrowDetailPackagingTwo}`,
                    date1904: false
                }
                let detailRowTwoPackaging15 = "AL" + costrowDetailPackagingTwo; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoPackaging15).value = itemDetailsPackaging2[14];
                worksheet.getCell(detailRowTwoPackaging15).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }
                worksheet.getCell(detailRowTwoPackaging15).fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "ff9fe770" },
                    bgColor: { argb: "" },
                };
                worksheet.getCell(detailRowTwoPackaging15).value = {
                    formula: `IFERROR((AE${costrowDetailPackagingTwo}*AG${costrowDetailPackagingTwo}*(1+AH${costrowDetailPackagingTwo}))+(AG${costrowDetailPackagingTwo}*(1+AH${costrowDetailPackagingTwo})*AI${costrowDetailPackagingTwo}),0)`,

                    date1904: false
                }
                let detailRowTwoPackaging16 = "AM" + costrowDetailPackagingTwo; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoPackaging16).value = itemDetailsPackaging2[15];
                worksheet.getCell(detailRowTwoPackaging16).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                detailsLastRowPackaging2 = costrowDetailPackagingTwo;
                rowCountDetailsPackaging2++
            }




            //PROCESS 2ND PART--------------------------------------------------------------------------------------------------------------
            // PROCESS HEADER

            var processHeader = 10 + 1 + rowCountDetailFabricP2 + 3 + rowCountDetailsAccsessories2 + 3 + rowCountDetailsLabel2 + 3 + rowCountDetailsPackaging2 + 2;
            let processTwo1 = worksheet.getCell("X" + processHeader);
            processTwo1.value = "PROCESS";
            processTwo1.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            processTwo1.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let processTwo2 = worksheet.getCell("Y" + processHeader);
            processTwo2.value = "PLM CODE";
            processTwo2.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            processTwo2.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let processTwo3 = worksheet.getCell("Z" + processHeader);
            processTwo3.value = "PROCESS TYPE";
            processTwo3.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            processTwo3.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let processTwo4 = worksheet.getCell("AA" + processHeader);
            processTwo4.value = "SUPPLIER";
            processTwo4.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            processTwo4.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let processTwo5 = worksheet.getCell("AB" + processHeader);
            processTwo5.value = "NOM";
            processTwo5.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            processTwo5.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let processTwo6 = worksheet.getCell("AC" + processHeader);
            processTwo6.value = "COO";
            processTwo6.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            processTwo6.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let processTwo7 = worksheet.getCell("AD" + processHeader);
            processTwo7.value = "SIZE";
            processTwo7.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            processTwo7.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let processTwo8 = worksheet.getCell("AE" + processHeader);
            processTwo8.value = "UNIT PRICE (FOB)";
            processTwo8.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            processTwo8.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let processTwo9 = worksheet.getCell("AF" + processHeader);
            processTwo9.value = "UoM";
            processTwo9.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            processTwo9.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let processTwo10 = worksheet.getCell("AG" + processHeader);
            processTwo10.value = "CONS.";
            processTwo10.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            processTwo10.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };



            let processTwo11 = worksheet.getCell("AH" + processHeader);
            processTwo11.value = "WASTAGE (%).";
            processTwo11.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            processTwo11.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let processTwo12 = worksheet.getCell("AI" + processHeader);
            processTwo12.value = "FREIGHT/CUSTOM COST/ UoM";
            processTwo12.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            processTwo12.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };


            let processTwo13 = worksheet.getCell("AJ" + processHeader);
            processTwo13.value = "FREIGHT MODE";
            processTwo13.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            processTwo13.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let processTwo14 = worksheet.getCell("AK" + processHeader);
            processTwo14.value = "UNIT PRICE (CIF)";
            processTwo14.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            processTwo14.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let processTwo15 = worksheet.getCell("AL" + processHeader);
            processTwo15.value = "TOTAL (CIF)";
            processTwo15.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            processTwo15.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let processTwo16 = worksheet.getCell("AM" + processHeader);
            processTwo16.value = "REMARK";
            processTwo16.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            processTwo16.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            //PROCESS DATA --------------------2ND PART=------------------------------------------------------------

            var rowCountDetailsProcess2 = 0

            var detailsFastRowProcess2 = 10 + 1 + rowCountDetailFabricP2 + 3 + rowCountDetailsAccsessories2 + 3 + rowCountDetailsLabel2 + 3 + rowCountDetailsPackaging2 + 3 + rowCountDetailsProcess2;
            var detailsLastRowProcess2 = 0

            for (var itemDetailsProcess2 of dataForExcelProcessSecPart) {
                var costrowDetailProcessTwo = 10 + 1 + rowCountDetailFabricP2 + 3 + rowCountDetailsAccsessories2 + 3 + rowCountDetailsLabel2 + 3 + rowCountDetailsPackaging2 + 3 + rowCountDetailsProcess2;
                let detailRowTwoProcess1 = "X" + costrowDetailProcessTwo;// row.getCell(1).address;
                worksheet.getCell(detailRowTwoProcess1).value = itemDetailsProcess2[0];
                worksheet.getCell(detailRowTwoProcess1).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoProcess2 = "Y" + costrowDetailProcessTwo;//  row.getCell(2).address;
                worksheet.getCell(detailRowTwoProcess2).value = itemDetailsProcess2[1];
                worksheet.getCell(detailRowTwoProcess2).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoProcess3 = "Z" + costrowDetailProcessTwo;// row.getCell(3).address;
                worksheet.getCell(detailRowTwoProcess3).value = itemDetailsProcess2[2];
                worksheet.getCell(detailRowTwoProcess3).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoProcess4 = "AA" + costrowDetailProcessTwo; //row.getCell(4).address;
                worksheet.getCell(detailRowTwoProcess4).value = itemDetailsProcess2[3];
                worksheet.getCell(detailRowTwoProcess4).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoProcess5 = "AB" + costrowDetailProcessTwo; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoProcess5).value = itemDetailsProcess2[4];
                worksheet.getCell(detailRowTwoProcess5).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoProcess6 = "AC" + costrowDetailProcessTwo; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoProcess6).value = itemDetailsProcess2[5];
                worksheet.getCell(detailRowTwoProcess6).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoProcess7 = "AD" + costrowDetailProcessTwo; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoProcess7).value = itemDetailsProcess2[6];
                worksheet.getCell(detailRowTwoProcess7).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoProcess8 = "AE" + costrowDetailProcessTwo; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoProcess8).value = itemDetailsProcess2[7];
                worksheet.getCell(detailRowTwoProcess8).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoProcess9 = "AF" + costrowDetailProcessTwo; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoProcess9).value = itemDetailsProcess2[8];
                worksheet.getCell(detailRowTwoProcess9).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }
                //   worksheet.getCell(detailRowOneProcess9).alignment = { vertical: "middle", horizontal: "center" };


                let detailRowTwoProcess10 = "AG" + costrowDetailProcessTwo; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoProcess10).value = itemDetailsProcess2[9];
                worksheet.getCell(detailRowTwoProcess10).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }
                //   worksheet.getCell(detailRowOneProcess10).alignment = { vertical: "middle", horizontal: "center" };

                let detailRowTwoProcess11 = "AH" + costrowDetailProcessTwo; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoProcess11).value = itemDetailsProcess2[10]/100;
                worksheet.getCell(detailRowTwoProcess11).numFmt = '0%'
                worksheet.getCell(detailRowTwoProcess11).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }


                let detailRowTwoProcess12 = "AI" + costrowDetailProcessTwo; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoProcess12).value = itemDetailsProcess2[11];
                worksheet.getCell(detailRowTwoProcess12).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoProcess13 = "AJ" + costrowDetailProcessTwo; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoProcess13).value = itemDetailsProcess2[12];
                worksheet.getCell(detailRowTwoProcess13).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoProcess14 = "AK" + costrowDetailProcessTwo; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoProcess14).value = itemDetailsProcess2[13];
                worksheet.getCell(detailRowTwoProcess14).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }
                worksheet.getCell(detailRowTwoProcess14).value = {
                    formula: `AE${costrowDetailProcessTwo}+AI${costrowDetailProcessTwo}`,
                    date1904: false
                }

                let detailRowTwoProcess15 = "AL" + costrowDetailProcessTwo; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoProcess15).value = itemDetailsProcess2[14];
                worksheet.getCell(detailRowTwoProcess15).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }
                worksheet.getCell(detailRowTwoProcess15).fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "ff9fe770" },
                    bgColor: { argb: "" },
                };
                worksheet.getCell(detailRowTwoProcess15).value = {
                    formula: `IFERROR((AE${costrowDetailProcessTwo}*AG${costrowDetailProcessTwo}*(1+AH${costrowDetailProcessTwo}))+(AG${costrowDetailProcessTwo}*(1+AH${costrowDetailProcessTwo})*AI${costrowDetailProcessTwo}),0)`,
                    date1904: false
                }

                let detailRowTwoProcess16 = "AM" + costrowDetailProcessTwo; //row.getCell(5).address;
                worksheet.getCell(detailRowTwoProcess16).value = itemDetailsProcess2[15];
                worksheet.getCell(detailRowTwoProcess16).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                detailsLastRowProcess2 = costrowDetailProcessTwo;
                rowCountDetailsProcess2++
            }



            // IE 2ND  PART ----------------------------------------------------------------------------------------
            let ieMoq = worksheet.getCell("AO10");
            ieMoq.value = "MOQ";
            ieMoq.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            ieMoq.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let ieLt = worksheet.getCell("AP10");
            ieLt.value = "L/T";
            ieLt.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            ieLt.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };

            let ieRemark = worksheet.getCell("AQ10");
            ieRemark.value = "Remark";
            ieRemark.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "547955" },
                bgColor: { argb: "" },
            };
            ieRemark.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
            //IE DATA ----------2ND PART------------------------------------------------------------------
            var rowCountDetailsIe2 = 0

            var detailsFastRowIe2 = 11 + rowCountDetailsIe2;
            var detailsLastRowIe2 = 0

            for (var itemDetailsIe2 of dataForExcelIeP2) {
                var costrowDetailIeTwo = 11 + rowCountDetailsIe2;
                let detailRowTwoIe1 = "AO" + costrowDetailIeTwo;
                worksheet.getCell(detailRowTwoIe1).value = itemDetailsIe2[0];
                worksheet.getCell(detailRowTwoIe1).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoIe2 = "AP" + costrowDetailIeTwo;
                worksheet.getCell(detailRowTwoIe2).value = itemDetailsIe2[1];
                worksheet.getCell(detailRowTwoIe2).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }

                let detailRowTwoIe3 = "AQ" + costrowDetailIeTwo;
                worksheet.getCell(detailRowTwoIe3).value = itemDetailsIe2[2];
                worksheet.getCell(detailRowTwoIe3).border = {
                    top: { style: 'thin' },
                    bottom: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' }
                }
                detailsLastRowIe2 = costrowDetailIeTwo;
                rowCountDetailsIe2++

            }
        }



        //TOTAL CALCULATION---------------------------------------------------------------------------------
        //TOTAL FABRIC 1ST PART-----------------------------------------------------------------------------
        var fabTotalSumColNumber = (10 + 1 + rowCountDetailFabric);
        let fabMetCost = worksheet.getCell("M" + fabTotalSumColNumber);
        fabMetCost.value = "TOTAL MATERIAL COST :";
        fabMetCost.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        fabMetCost.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        fabMetCost.alignment = { vertical: "middle", horizontal: "right" };

        //WENT DOWN (fabMetCostperc)

        let fabMetCostblank1 = worksheet.getCell("O" + fabTotalSumColNumber);
        fabMetCostblank1.value = "";
        fabMetCostblank1.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        fabMetCostblank1.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        let fabMetCostblank2 = worksheet.getCell("Q" + fabTotalSumColNumber);
        fabMetCostblank2.value = "";
        fabMetCostblank2.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        fabMetCostblank2.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        let fabTotalSum = worksheet.getCell("P" + fabTotalSumColNumber);
        fabTotalSum.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        fabTotalSum.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        fabTotalSum.value = {
            formula: `IFERROR(SUM(P${detailsFastRowFabric}:P${detailsLastRowFabric}),0)`,
            date1904: false
        }
        fabTotalSum.alignment = { vertical: "middle", horizontal: "right" };


        //TOTAL ACCESSORIES  1ST PART----------------------------------------------------------------------------------------

        var accTotalSumColNumber = (10 + 1 + rowCountDetailFabric + 3 + rowCountDetailsAccsessories1);
        let accMetCost = worksheet.getCell("M" + accTotalSumColNumber);
        accMetCost.value = "TOTAL TRIM COST  :";
        accMetCost.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        accMetCost.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        accMetCost.alignment = { vertical: "middle", horizontal: "right" };

         //WENT DOWN (accMetCostperc)
       
        let accMetCostblank1 = worksheet.getCell("O" + accTotalSumColNumber);
        accMetCostblank1.value = "";
        accMetCostblank1.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        accMetCostblank1.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        let accMetCostblank2 = worksheet.getCell("Q" + accTotalSumColNumber);
        accMetCostblank2.value = "";
        accMetCostblank2.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        accMetCostblank2.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        let accotalSum = worksheet.getCell("P" + accTotalSumColNumber);
        accotalSum.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        accotalSum.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        accotalSum.alignment = { vertical: "middle", horizontal: "right" };
        accotalSum.value =null;
        accotalSum.value = {
            formula: `IFERROR(SUM(P${detailsFastRowAccsessories1}:P${detailsLastRowAccsessories1}),0)`,
            date1904: false
        }

        //TOTAL LABEL 1ST PART--------------------------------------------------------------------------------------------

        var labelTotalSumColNumber = (10 + 1 + rowCountDetailFabric + 3 + rowCountDetailsAccsessories1 + 3 + rowCountDetailsLabel1);
        let labelMetCost = worksheet.getCell("M" + labelTotalSumColNumber);
        labelMetCost.value = "TOTAL LABEL COST  :";
        labelMetCost.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        labelMetCost.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        labelMetCost.alignment = { vertical: "middle", horizontal: "right" };
          //WENT DOWN (labelMetCostperc)

        
        let labelMetCostblank1 = worksheet.getCell("O" + labelTotalSumColNumber);
        labelMetCostblank1.value = "";
        labelMetCostblank1.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        labelMetCostblank1.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        let labelMetCostblank2 = worksheet.getCell("Q" + labelTotalSumColNumber);
        labelMetCostblank2.value = "";
        labelMetCostblank2.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        labelMetCostblank2.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        let labelTotalSum = worksheet.getCell("P" + labelTotalSumColNumber);
        labelTotalSum.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        labelTotalSum.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        labelTotalSum.alignment = { vertical: "middle", horizontal: "right" };
        labelTotalSum.value =null;
        labelTotalSum.value = {
            formula: `IFERROR(SUM(P${detailsFastRowLabel1}:P${detailsLastRowLabel1}),0)`,
            date1904: false
        }


        //TOTAL PACKAGING 1ST PART----------------------------------------------------------------------------------------------------------

        var packagingTotalSumColNumber = (10 + 1 + rowCountDetailFabric + 3 + rowCountDetailsAccsessories1 + 3 + rowCountDetailsLabel1 + 3 + rowCountDetailsPackaging1);
        let packagingMetCost = worksheet.getCell("M" + packagingTotalSumColNumber);
        packagingMetCost.value = "TOTAL PACKAGING COST  :";
        packagingMetCost.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        packagingMetCost.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        packagingMetCost.alignment = { vertical: "middle", horizontal: "right" };

           //WENT DOWN (packagingMetCostperc)
        
        let packagingMetCostblank1 = worksheet.getCell("O" + packagingTotalSumColNumber);
        packagingMetCostblank1.value = "";
        packagingMetCostblank1.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        packagingMetCostblank1.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        let packagingMetCostblank2 = worksheet.getCell("Q" + packagingTotalSumColNumber);
        packagingMetCostblank2.value = "";
        packagingMetCostblank2.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        packagingMetCostblank2.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        let packagingTotalSum = worksheet.getCell("P" + packagingTotalSumColNumber);
        packagingTotalSum.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        packagingTotalSum.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        packagingTotalSum.alignment = { vertical: "middle", horizontal: "right" };
        packagingTotalSum.value =null;
        packagingTotalSum.value = {
            formula: `IFERROR(SUM(P${detailsFastRowPackaging1}:P${detailsLastRowPackaging1}),0)`,
            date1904: false
        }
        //TOTAL PROCESS 1ST PART-------------------------------------------------------------------------------------------------

        var processTotalSumColNumber = (10 + 1 + rowCountDetailFabric + 3 + rowCountDetailsAccsessories1 + 3 + rowCountDetailsLabel1 + 3 + rowCountDetailsPackaging1 + 3 + rowCountDetailsProcess1);
        let processMetCost = worksheet.getCell("M" + processTotalSumColNumber);
        processMetCost.value = "TOTAL PROCESS COST  :";
        processMetCost.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        processMetCost.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        processMetCost.alignment = { vertical: "middle", horizontal: "right" };

           //WENT DOWN (processMetCostperc)
        
        let processMetCostblank1 = worksheet.getCell("O" + processTotalSumColNumber);
        processMetCostblank1.value = "";
        processMetCostblank1.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        processMetCostblank1.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        let processMetCostblank2 = worksheet.getCell("Q" + processTotalSumColNumber);
        processMetCostblank2.value = "";
        processMetCostblank2.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        processMetCostblank2.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        let processTotalSum = worksheet.getCell("P" + processTotalSumColNumber);
        processTotalSum.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        processTotalSum.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        processTotalSum.alignment = { vertical: "middle", horizontal: "right" };
        processTotalSum.value =null;
        processTotalSum.value = {
            formula: `IFERROR(SUM(P${detailsFastRowProcess1}:P${detailsLastRowProcess1}),0)`,
            date1904: false
        }


        //TOTAL CALCULATION  2ND PART

        if (allData.length > 1) {
            //TOTAL FABRIC 2ND PART

            var fabTotalSumColNumberP2 = (10 + 1 + rowCountDetailFabricP2);
            let fabMetCostP2 = worksheet.getCell("AI" + fabTotalSumColNumberP2);
            fabMetCostP2.value = "TOTAL MATERIAL COST :";
            fabMetCostP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            fabMetCostP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            fabMetCostP2.alignment = { vertical: "middle", horizontal: "right" };

            //WENT DOWN (fabMetCostpercP2)
            
            let fabMetCostblank1P2 = worksheet.getCell("AK" + fabTotalSumColNumberP2);
            fabMetCostblank1P2.value = "";
            fabMetCostblank1P2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            fabMetCostblank1P2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            let fabMetCostblank2P2 = worksheet.getCell("AM" + fabTotalSumColNumberP2);
            fabMetCostblank2P2.value = "";
            fabMetCostblank2P2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            fabMetCostblank2P2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            let fabTotalSumP2 = worksheet.getCell("AL" + fabTotalSumColNumberP2);
            fabTotalSumP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            fabTotalSumP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            fabTotalSumP2.alignment = { vertical: "middle", horizontal: "right" };
            fabTotalSumP2.value = {
                formula: `IFERROR(SUM(AL${detailsFastRowFabricP2}:AL${detailsLastRowFabricP2}),0)`,
                date1904: false
            }
            //TOTAL ACC 2ND PART
            var accTotalSumColNumberP2 = (10 + 1 + rowCountDetailFabricP2 + 3 + rowCountDetailsAccsessories2);
            let accMetCostP2 = worksheet.getCell("AI" + accTotalSumColNumberP2);
            accMetCostP2.value = "TOTAL TRIM COST  :";
            accMetCostP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            accMetCostP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            accMetCostP2.alignment = { vertical: "middle", horizontal: "right" };

              //WENT DOWN (accMetCostpercP2)
            
            let accMetCostblank1P2 = worksheet.getCell("AK" + accTotalSumColNumberP2);
            accMetCostblank1P2.value = "";
            accMetCostblank1P2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            accMetCostblank1P2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            let accMetCostblank2P2 = worksheet.getCell("AM" + accTotalSumColNumberP2);
            accMetCostblank2P2.value = "";
            accMetCostblank2P2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            accMetCostblank2P2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            let accTotalSumP2 = worksheet.getCell("AL" + accTotalSumColNumberP2);
            accTotalSumP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            accTotalSumP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            accTotalSumP2.alignment = { vertical: "middle", horizontal: "right" };
            accTotalSumP2.value = {
                formula: `IFERROR(SUM(AL${detailsFastRowAccsessories2}:AL${detailsLastRowAccsessories2}),0)`,
                date1904: false
            }
            //TOTAL label 2ND PART
            var labelTotalSumColNumberP2 = (10 + 1 + rowCountDetailFabricP2 + 3 + rowCountDetailsAccsessories2 + 3 + rowCountDetailsLabel2);
            let labelMetCostP2 = worksheet.getCell("AI" + labelTotalSumColNumberP2);
            labelMetCostP2.value = "TOTAL L&P COST :";
            labelMetCostP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            labelMetCostP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            labelMetCostP2.alignment = { vertical: "middle", horizontal: "right" };

              //WENT DOWN (labelMetCostpercP2)
           
            let labelMetCostblank1P2 = worksheet.getCell("AK" + labelTotalSumColNumberP2);
            labelMetCostblank1P2.value = "";
            labelMetCostblank1P2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            labelMetCostblank1P2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            let labelMetCostblank2P2 = worksheet.getCell("AM" + labelTotalSumColNumberP2);
            labelMetCostblank2P2.value = "";
            labelMetCostblank2P2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            labelMetCostblank2P2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            let labelTotalSumP2 = worksheet.getCell("AL" + labelTotalSumColNumberP2);
            labelTotalSumP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            labelTotalSumP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            labelTotalSumP2.alignment = { vertical: "middle", horizontal: "right" };
            labelTotalSumP2.value = {
                formula: `IFERROR(SUM(AL${detailsFastRowLabel2}:AL${detailsLastRowLabel2}),0)`,
                date1904: false
            }
            //TOTAL PACKAGING 2ND PART
            var packagingTotalSumColNumberP2 = (10 + 1 + rowCountDetailFabricP2 + 3 + rowCountDetailsAccsessories2 + 3 + rowCountDetailsLabel2 + 3 + rowCountDetailsPackaging2);
            let packagingMetCostP2 = worksheet.getCell("AI" + packagingTotalSumColNumberP2);
            packagingMetCostP2.value = "TOTAL PACKAGING COST :";
            packagingMetCostP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            packagingMetCostP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            packagingMetCostP2.alignment = { vertical: "middle", horizontal: "right" };

                 //WENT DOWN (packagingMetCostpercP2)
            
            let packagingMetCostblank1P2 = worksheet.getCell("AK" + packagingTotalSumColNumberP2);
            packagingMetCostblank1P2.value = "";
            packagingMetCostblank1P2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            packagingMetCostblank1P2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            let packagingMetCostblank2P2 = worksheet.getCell("AM" + packagingTotalSumColNumberP2);
            packagingMetCostblank2P2.value = "";
            packagingMetCostblank2P2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            packagingMetCostblank2P2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            let packagingTotalSumP2 = worksheet.getCell("AL" + packagingTotalSumColNumberP2);
            packagingTotalSumP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            packagingTotalSumP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            packagingTotalSumP2.alignment = { vertical: "middle", horizontal: "right" };
            packagingTotalSumP2.value = {
                formula: `IFERROR(SUM(AL${detailsFastRowPackaging2}:AL${detailsLastRowPackaging2}),0)`,
                date1904: false
            }
            //TOTAL PROCESS 2ND PART
            var processingTotalSumColNumberP2 = (10 + 1 + rowCountDetailFabricP2 + 3 + rowCountDetailsAccsessories2 + 3 + rowCountDetailsLabel2 + 3 + rowCountDetailsPackaging2 + 3 + rowCountDetailsProcess2);
            let processMetCostP2 = worksheet.getCell("AI" + processingTotalSumColNumberP2);
            processMetCostP2.value = "TOTAL PACKAGING COST :";
            processMetCostP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            processMetCostP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            processMetCostP2.alignment = { vertical: "middle", horizontal: "right" };
               //WENT DOWN (processingMetCostpercP2)

            
            let processingMetCostblank1P2 = worksheet.getCell("AK" + processingTotalSumColNumberP2);
            processingMetCostblank1P2.value = "";
            processingMetCostblank1P2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            processingMetCostblank1P2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            let processMetCostblank2P2 = worksheet.getCell("AM" + processingTotalSumColNumberP2);
            processMetCostblank2P2.value = "";
            processMetCostblank2P2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            processMetCostblank2P2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            let processTotalSumP2 = worksheet.getCell("AL" + processingTotalSumColNumberP2);
            processTotalSumP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            processTotalSumP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            processTotalSumP2.alignment = { vertical: "middle", horizontal: "right" };
            processTotalSumP2.value = {
                formula: `IFERROR(SUM(AL${detailsFastRowProcess2}:AL${detailsLastRowProcess2}),0)`,
                date1904: false
            }
        }




        //  BELOW LEFT SIDE TABLE ----1ST---PART----------------------------------------------
        //row 1

        var belowtableRowNumber = (10 + 1 + rowCountDetailFabric + 3 + rowCountDetailsAccsessories1 + 3 + rowCountDetailsLabel1 + 3 + rowCountDetailsPackaging1 + 3 + rowCountDetailsProcess1 + 2);
        let oprderMin = worksheet.getCell("B" + belowtableRowNumber);
        oprderMin.value = "ORDER MIN";
        oprderMin.font = {
            name: "Calibri",
            size: 12,
           // bold: true,
            color: { argb: "#ffff00" },
        };
        oprderMin.border = {
            top: { style: 'thick' },
            bottom: { style: 'thin' },
            left: { style: 'thick' },
            right: { style: 'thin' }
        }
        oprderMin.alignment = { vertical: "middle", horizontal: "right" };

        let oprderMinblank = worksheet.getCell("C" + belowtableRowNumber);
        oprderMinblank.value = "";
        oprderMinblank.font = {
            name: "Calibri",
            size: 12,
           // bold: true,
            color: { argb: "#ffff00" },
        };
        oprderMinblank.border = {
            top: { style: 'thick' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        oprderMinblank.alignment = { vertical: "middle", horizontal: "right" };

        let piecesPerColor = worksheet.getCell("D" + belowtableRowNumber);
        piecesPerColor.value = "pieces per color";
        piecesPerColor.font = {
            name: "Calibri",
            size: 12,
          // bold: true,
            color: { argb: "#ffff00" },
        };
        piecesPerColor.border = {
            top: { style: 'thick' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        piecesPerColor.alignment = { vertical: "middle", horizontal: "right" };

        let piecesPerColorBlank = worksheet.getCell("E" + belowtableRowNumber);
        piecesPerColorBlank.value = "";
        piecesPerColorBlank.font = {
            name: "Calibri",
            size: 12,
            // bold: true,
            color: { argb: "#ffff00" },
        };
        piecesPerColorBlank.border = {
            top: { style: 'thick' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        piecesPerColorBlank.alignment = { vertical: "middle", horizontal: "right" };

        let piecesPerOrder = worksheet.getCell("F" + belowtableRowNumber);
        piecesPerOrder.value = "Pieces per color";
        piecesPerOrder.font = {
            name: "Calibri",
            size: 12,
            // bold: true,
            color: { argb: "#ffff00" },
        };
        piecesPerOrder.border = {
            top: { style: 'thick' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thick' }
        }
        piecesPerOrder.alignment = { vertical: "middle", horizontal: "right" };

        // below left table 1ST part
        //row 2
        var belowtableRowNumber2 = (10 + 1 + rowCountDetailFabric + 3 + rowCountDetailsAccsessories1 + 3 + rowCountDetailsLabel1 + 3 + rowCountDetailsPackaging1 + 3 + rowCountDetailsProcess1 + 3);

        let matProdLt = worksheet.getCell("B" + belowtableRowNumber2);
        matProdLt.value = "MATERIAL PRODUCTION LT";
        matProdLt.font = {
            name: "Calibri",
            size: 12,
             // bold: true,
            color: { argb: "#ffff00" },
        };
        matProdLt.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thick' },
            right: { style: 'thin' }
        }
        matProdLt.alignment = { vertical: "middle", horizontal: "right" };
        

        let matProdLtBlank = worksheet.getCell("C" + belowtableRowNumber2);
        matProdLtBlank.value = "";
        matProdLtBlank.font = {
            name: "Calibri",
            size: 12,
            // bold: true,
            color: { argb: "#ffff00" },
        };
        matProdLtBlank.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        matProdLtBlank.alignment = { vertical: "middle", horizontal: "right" };

        let matProdLtdays = worksheet.getCell("D" + belowtableRowNumber2);
        matProdLtdays.value = "days";
        matProdLtdays.font = {
            name: "Calibri",
            size: 12,
           // bold: true,
            color: { argb: "#ffff00" },
        };
        matProdLtdays.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        matProdLtdays.alignment = { vertical: "middle", horizontal: "right" };

        let matProdLtdaysBlank = worksheet.getCell("E" + belowtableRowNumber2);
        matProdLtdaysBlank.value = "";
        matProdLtdaysBlank.font = {
            name: "Calibri",
            size: 12,
            // bold: true,
            color: { argb: "#ffff00" },
        };
        matProdLtdaysBlank.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        matProdLtdaysBlank.alignment = { vertical: "middle", horizontal: "right" };

        let matProdLtPPO = worksheet.getCell("F" + belowtableRowNumber2);
        matProdLtPPO.value = "";
        matProdLtPPO.font = {
            name: "Calibri",
            size: 12,
            // bold: true,
            color: { argb: "#ffff00" },
        };
        matProdLtPPO.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thick' }
        }
        matProdLtPPO.alignment = { vertical: "middle", horizontal: "right" };

        // below left table 1ST part
        //row 3
        var belowtableRowNumber3 = (10 + 1 + rowCountDetailFabric + 3 + rowCountDetailsAccsessories1 + 3 + rowCountDetailsLabel1 + 3 + rowCountDetailsPackaging1 + 3 + rowCountDetailsProcess1 + 4);

        let catSewPack = worksheet.getCell("B" + belowtableRowNumber3);
        catSewPack.value = "CUT/SEW/PACK LT";
        catSewPack.font = {
            name: "Calibri",
            size: 12,
           // bold: true,
            color: { argb: "#ffff00" },
        };
        catSewPack.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thick' },
            right: { style: 'thin' }
        }
        catSewPack.alignment = { vertical: "middle", horizontal: "right" };

        let catSewPackBlank = worksheet.getCell("C" + belowtableRowNumber3);
        catSewPackBlank.value = "";
        catSewPackBlank.font = {
            name: "Calibri",
            size: 12,
          // bold: true,
            color: { argb: "#ffff00" },
        };
        catSewPackBlank.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        catSewPackBlank.alignment = { vertical: "middle", horizontal: "right" };

        let catSewPacdays = worksheet.getCell("D" + belowtableRowNumber3);
        catSewPacdays.value = "days";
        catSewPacdays.font = {
            name: "Calibri",
            size: 12,
            // bold: true,
            color: { argb: "#ffff00" },
        };
        catSewPacdays.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        catSewPacdays.alignment = { vertical: "middle", horizontal: "right" };

        let catSewPacdaysBlank = worksheet.getCell("E" + belowtableRowNumber3);
        catSewPacdaysBlank.value = "";
        catSewPacdaysBlank.font = {
            name: "Calibri",
            size: 12,
            // bold: true,
            color: { argb: "#ffff00" },
        };
        catSewPacdaysBlank.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        catSewPacdaysBlank.alignment = { vertical: "middle", horizontal: "right" };

        let catSewPacPPO = worksheet.getCell("F" + belowtableRowNumber3);
        catSewPacPPO.value = "";
        catSewPacPPO.font = {
            name: "Calibri",
            size: 12,
             // bold: true,
            color: { argb: "#ffff00" },
        };
        catSewPacPPO.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thick' }
        }
        catSewPacPPO.alignment = { vertical: "middle", horizontal: "right" };

        // below left table 1ST part
        //row 4
        var belowtableRowNumber4 = (10 + 1 + rowCountDetailFabric + 3 + rowCountDetailsAccsessories1 + 3 + rowCountDetailsLabel1 + 3 + rowCountDetailsPackaging1 + 3 + rowCountDetailsProcess1 + 5);

        let totalLt = worksheet.getCell("B" + belowtableRowNumber4);
        totalLt.value = "TOTAL LT";
        totalLt.font = {
            name: "Calibri",
            size: 12,
           // bold: true,
            color: { argb: "#ffff00" },
        };
        totalLt.border = {
            top: { style: 'thin' },
            bottom: { style: 'thick' },
            left: { style: 'thick' },
            right: { style: 'thin' }
        }
        totalLt.alignment = { vertical: "middle", horizontal: "right" };

        let totalLtBlank = worksheet.getCell("C" + belowtableRowNumber4);
        totalLtBlank.value = "";
        totalLtBlank.font = {
            name: "Calibri",
            size: 12,
           // bold: true,
            color: { argb: "#ffff00" },
        };
        totalLtBlank.border = {
            top: { style: 'thin' },
            bottom: { style: 'thick' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        totalLtBlank.alignment = { vertical: "middle", horizontal: "right" };

        let totalLtdays = worksheet.getCell("D" + belowtableRowNumber4);
        totalLtdays.value = "days";
        totalLtdays.font = {
            name: "Calibri",
            size: 12,
            // bold: true,
            color: { argb: "#ffff00" },
        };
        totalLtdays.border = {
            top: { style: 'thin' },
            bottom: { style: 'thick' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        totalLtdays.alignment = { vertical: "middle", horizontal: "right" };

        let totalLtdaysBlank = worksheet.getCell("E" + belowtableRowNumber4);
        totalLtdaysBlank.value = "";
        totalLtdaysBlank.font = {
            name: "Calibri",
            size: 12,
          // bold: true,
            color: { argb: "#ffff00" },
        };
        totalLtdaysBlank.border = {
            top: { style: 'thin' },
            bottom: { style: 'thick' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        totalLtdaysBlank.alignment = { vertical: "middle", horizontal: "right" };

        let ctotalLtPPO = worksheet.getCell("F" + belowtableRowNumber4);
        ctotalLtPPO.value = "";
        ctotalLtPPO.font = {
            name: "Calibri",
            size: 12,
           // bold: true,
            color: { argb: "#ffff00" },
        };
        ctotalLtPPO.border = {
            top: { style: 'thin' },
            bottom: { style: 'thick' },
            left: { style: 'thin' },
            right: { style: 'thick' }
        }
        ctotalLtPPO.alignment = { vertical: "middle", horizontal: "right" };


        //  BELOW RIGHT table  1ST PART
        //row 1
        let totalMatOthrCost = worksheet.getCell("M" + belowtableRowNumber);
        totalMatOthrCost.value = "TOTAL MATERIAL + OTHERS COST ";
        totalMatOthrCost.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        totalMatOthrCost.alignment = { vertical: "middle", horizontal: "right" };
        //WENT DOWN (totalMatOthrCost)


        let totalMatOthrCostBlank = worksheet.getCell("O" + belowtableRowNumber);
        totalMatOthrCostBlank.value = "";
        totalMatOthrCostBlank.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        totalMatOthrCostBlank.alignment = { vertical: "middle", horizontal: "right" };
        let totalMatOthrCostCal = worksheet.getCell("P" + belowtableRowNumber);
        totalMatOthrCostCal.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        totalMatOthrCostCal.border = {
            top: { style: 'thick' },
            bottom: { style: 'thick' },
            left: { style: 'thick' },
            right: { style: 'thick' }
        }
        totalMatOthrCostCal.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "ffabff9a" },
            bgColor: { argb: "" },
        };
        totalMatOthrCostCal.alignment = { vertical: "middle", horizontal: "right" };
        totalMatOthrCostCal.value = {
            formula: `P${processTotalSumColNumber}+P${packagingTotalSumColNumber}+P${labelTotalSumColNumber}+P${accTotalSumColNumber}+P${fabTotalSumColNumber}`,
            date1904: false
        }

        //  below Right table  1ST PART
        //row 2
        var belowtableRowRightNumber2 = (10 + 1 + rowCountDetailFabric + 3 + rowCountDetailsAccsessories1 + 3 + rowCountDetailsLabel1 + 3 + rowCountDetailsPackaging1 + 3 + rowCountDetailsProcess1 + 4);
        let directLaborCst = worksheet.getCell("M" + belowtableRowRightNumber2);
        directLaborCst.value = "DIRECT LABOR (CMT) COST ";
        directLaborCst.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        directLaborCst.alignment = { vertical: "middle", horizontal: "right" };
        //WENT DOWN (directLaborCstValue)

        let directLaborCstBlank = worksheet.getCell("O" + belowtableRowRightNumber2);
        directLaborCstBlank.value = "";
        directLaborCstBlank.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        directLaborCstBlank.alignment = { vertical: "middle", horizontal: "right" };
        let directLaborCstCal = worksheet.getCell("P" + belowtableRowRightNumber2);
        directLaborCstCal.value = allData[0].cmPC;
        directLaborCstCal.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        directLaborCstCal.border = {
            top: { style: 'thick' },
            bottom: { style: 'thick' },
            left: { style: 'thick' },
            right: { style: 'thick' }
        }
        directLaborCstCal.alignment = { vertical: "middle", horizontal: "right" };

        // let smvValue = worksheet.getCell("Q" + belowtableRowRightNumber2);
        // smvValue.value = allData[0].iedEtailsList[0].smv;
        // smvValue.font = {
        //     name: "Calibri",
        //     size: 12,
        //     bold: true,
        //     color: { argb: "#ffffe828" },
        // };
        // smvValue.border = {
        //     top: { style: 'thick' },
        //     bottom: { style: 'thick' },
        //     left: { style: 'thick' },
        //     right: { style: 'thick' }
        // }
        // smvValue.alignment = { vertical: "middle", horizontal: "right" };



        //  below Right table part 1ST PART
        // row 3
        var belowtableRowRightNumber3 = (10 + 1 + rowCountDetailFabric + 3 + rowCountDetailsAccsessories1 + 3 + rowCountDetailsLabel1 + 3 + rowCountDetailsPackaging1 + 3 + rowCountDetailsProcess1 + 6);
        let profOverheadCst = worksheet.getCell("M" + belowtableRowRightNumber3);
        profOverheadCst.value = "PROFIT & OVERHEAD COST ";
        profOverheadCst.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        profOverheadCst.alignment = { vertical: "middle", horizontal: "right" };

        //WENT DOWN (profOverheadValue)


        let profOverheadBlank = worksheet.getCell("O" + belowtableRowRightNumber3);
        profOverheadBlank.value = "";
        profOverheadBlank.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        profOverheadBlank.alignment = { vertical: "middle", horizontal: "right" };
        let profOverheadCstCal = worksheet.getCell("P" + belowtableRowRightNumber3);
        profOverheadCstCal.value = 0;
        profOverheadCstCal.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        profOverheadCstCal.border = {
            top: { style: 'thick' },
            bottom: { style: 'thick' },
            left: { style: 'thick' },
            right: { style: 'thick' }
        }
        profOverheadCstCal.alignment = { vertical: "middle", horizontal: "right" };



        //  below Right table part  1ST PART
        // row 4
        var belowtableRowRightNumber4 = (10 + 1 + rowCountDetailFabric + 3 + rowCountDetailsAccsessories1 + 3 + rowCountDetailsLabel1 + 3 + rowCountDetailsPackaging1 + 3 + rowCountDetailsProcess1 + 8);
        let totalQuotedFob = worksheet.getCell("M" + belowtableRowRightNumber4);
        totalQuotedFob.value = "TOTAL QUOTED FOB ";
        totalQuotedFob.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        totalQuotedFob.alignment = { vertical: "middle", horizontal: "right" };


        //WENT DOWN (totalQuotedFobValue)

        let totalQuotedFobBlank = worksheet.getCell("O" + belowtableRowRightNumber4);
        totalQuotedFobBlank.value = "";
        totalQuotedFobBlank.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        totalQuotedFobBlank.alignment = { vertical: "middle", horizontal: "right" };
        debugger
        let totalQuotedFobtCal = worksheet.getCell("P" + belowtableRowRightNumber4);
        totalQuotedFobtCal.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        totalQuotedFobtCal.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "ffffb827" },
            bgColor: { argb: "" },
        };
        totalQuotedFobtCal.border = {
            top: { style: 'thick' },
            bottom: { style: 'thick' },
            left: { style: 'thick' },
            right: { style: 'thick' }
        }
        totalQuotedFobtCal.alignment = { vertical: "middle", horizontal: "right" };
        totalQuotedFobtCal.value = {
            formula: `P${belowtableRowRightNumber3}+P${belowtableRowRightNumber2}+P${belowtableRowNumber}`,
            date1904: false
        }
        totalQuotedFobtCal.numFmt='0.00';

        //  below Right table part  1ST PART
        //  row 5
        var belowtableRowRightNumber5 = (10 + 1 + rowCountDetailFabric + 3 + rowCountDetailsAccsessories1 + 3 + rowCountDetailsLabel1 + 3 + rowCountDetailsPackaging1 + 3 + rowCountDetailsProcess1 + 10);
        let confirmedFob = worksheet.getCell("M" + belowtableRowRightNumber5);
        confirmedFob.value = "CONFIRMED FOB";
        confirmedFob.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        confirmedFob.alignment = { vertical: "middle", horizontal: "right" };
        let confirmedFobValue = worksheet.getCell("N" + belowtableRowRightNumber5);
        confirmedFobValue.value = "";
        confirmedFobValue.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        confirmedFobValue.alignment = { vertical: "middle", horizontal: "right" };
        let confirmedFobBlank = worksheet.getCell("O" + belowtableRowRightNumber5);
        confirmedFobBlank.value = "";
        confirmedFobBlank.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        confirmedFobBlank.alignment = { vertical: "middle", horizontal: "right" };
        let confirmedFobCal = worksheet.getCell("P" + belowtableRowRightNumber5);
        confirmedFobCal.value = "";
        confirmedFobCal.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffabff9a" },
        };
        confirmedFobCal.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "ffffb827" },
            bgColor: { argb: "" },
        };
        confirmedFobCal.border = {
            top: { style: 'thick' },
            bottom: { style: 'thick' },
            left: { style: 'thick' },
            right: { style: 'thick' }
        }
        confirmedFobCal.alignment = { vertical: "middle", horizontal: "right" };


        //below RIGHT TABLE EXTRA HERE   1ST PART
        //FROM RIGHT 1
        let totalMatOthrCostValue = worksheet.getCell("N" + belowtableRowNumber);
        totalMatOthrCostValue.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        totalMatOthrCostValue.alignment = { vertical: "middle", horizontal: "right" };
        totalMatOthrCostValue.value = {
            formula: `IFERROR(P${belowtableRowNumber}/P${belowtableRowRightNumber4},0)`,
            date1904: false
        }
        totalMatOthrCostValue.numFmt = '0.00%'
        totalMatOthrCostValue.alignment = { vertical: "middle", horizontal: "right" };


        //below RIGHT TABLE EXTRA HERE 
        //FROM RIGHT 2
        let directLaborCstValue = worksheet.getCell("N" + belowtableRowRightNumber2);

        directLaborCstValue.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        directLaborCstValue.alignment = { vertical: "middle", horizontal: "right" };
        directLaborCstValue.value = {
            formula: `IFERROR(P${belowtableRowRightNumber2}/P${belowtableRowRightNumber4},0)`,
            date1904: false
        }
        directLaborCstValue.numFmt = '0.00%'
        //below RIGHT TABLE EXTRA HERE 
        //FROM RIGHT 3
        let profOverheadValue = worksheet.getCell("N" + belowtableRowRightNumber3);

        profOverheadValue.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        profOverheadValue.alignment = { vertical: "middle", horizontal: "right" };
        profOverheadValue.value = {
            formula: `IFERROR(P${belowtableRowRightNumber3}/P${belowtableRowRightNumber4},0)`,
            date1904: false
        }
        profOverheadValue.numFmt = '0.00%'

        //below RIGHT TABLE EXTRA HERE 
        //FROM RIGHT 4
        let totalQuotedFobValue = worksheet.getCell("N" + belowtableRowRightNumber4);
        totalQuotedFobValue.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        totalQuotedFobValue.alignment = { vertical: "middle", horizontal: "right" };
        totalQuotedFobValue.value = {
            formula: `N${belowtableRowRightNumber3}+N${belowtableRowRightNumber2}+N${belowtableRowNumber}`,
            date1904: false
        }
        totalQuotedFobValue.numFmt = '0.00%'





        if (allData.length > 1) {

            //  BELOW LEFT SIDE TABLE ----2nd---PART----------------------------------------------
            //row 1

            var belowtableRowNumberP2 = (10 + 1 + rowCountDetailFabricP2 + 3 + rowCountDetailsAccsessories2 + 3 + rowCountDetailsLabel2 + 3 + rowCountDetailsPackaging2 + 3 + rowCountDetailsProcess2 + 2);
            let oprderMinP2 = worksheet.getCell("X" + belowtableRowNumberP2);
            oprderMinP2.value = "ORDER MIN";
            oprderMinP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            oprderMinP2.border = {
                top: { style: 'thick' },
                bottom: { style: 'thin' },
                left: { style: 'thick' },
                right: { style: 'thin' }
            }
            oprderMinP2.alignment = { vertical: "middle", horizontal: "right" };

            let oprderMinblankP2 = worksheet.getCell("Y" + belowtableRowNumberP2);
            oprderMinblankP2.value = "";
            oprderMinblankP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            oprderMinblankP2.border = {
                top: { style: 'thick' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            oprderMinblankP2.alignment = { vertical: "middle", horizontal: "right" };

            let piecesPerColorP2 = worksheet.getCell("Z" + belowtableRowNumberP2);
            piecesPerColorP2.value = "pieces per color";
            piecesPerColorP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            piecesPerColorP2.border = {
                top: { style: 'thick' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            piecesPerColorP2.alignment = { vertical: "middle", horizontal: "right" };

            let piecesPerColorBlankP2 = worksheet.getCell("AA" + belowtableRowNumberP2);
            piecesPerColorBlankP2.value = "";
            piecesPerColorBlankP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            piecesPerColorBlankP2.border = {
                top: { style: 'thick' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            piecesPerColorBlankP2.alignment = { vertical: "middle", horizontal: "right" };

            let piecesPerOrderP2 = worksheet.getCell("AB" + belowtableRowNumberP2);
            piecesPerOrderP2.value = "Pieces per color";
            piecesPerOrderP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            piecesPerOrderP2.border = {
                top: { style: 'thick' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thick' }
            }
            piecesPerOrderP2.alignment = { vertical: "middle", horizontal: "right" };

            // below left table 2ND part
            //row 2
            var belowtableRowNumberP2_2 = (10 + 1 + rowCountDetailFabricP2 + 3 + rowCountDetailsAccsessories2 + 3 + rowCountDetailsLabel2 + 3 + rowCountDetailsPackaging2 + 3 + rowCountDetailsProcess2 + 3);

            let matProdLtP2 = worksheet.getCell("X" + belowtableRowNumberP2_2);
            matProdLtP2.value = "MATERIAL PRODUCTION LT";
            matProdLtP2.font = {
                name: "Calibri",
                size: 12,
               // bold: true,
                color: { argb: "#ffff00" },
            };
            matProdLtP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thick' },
                right: { style: 'thin' }
            }
            matProdLtP2.alignment = { vertical: "middle", horizontal: "right" };

            let matProdLtBlankP2 = worksheet.getCell("Y" + belowtableRowNumberP2_2);
            matProdLtBlankP2.value = "";
            matProdLtBlankP2.font = {
                name: "Calibri",
                size: 12,
              // bold: true,
                color: { argb: "#ffff00" },
            };
            matProdLtBlankP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            matProdLtBlankP2.alignment = { vertical: "middle", horizontal: "right" };

            let matProdLtdaysP2 = worksheet.getCell("Z" + belowtableRowNumberP2_2);
            matProdLtdaysP2.value = "days";
            matProdLtdaysP2.font = {
                name: "Calibri",
                size: 12,
               // bold: true,
                color: { argb: "#ffff00" },
            };
            matProdLtdaysP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            matProdLtdaysP2.alignment = { vertical: "middle", horizontal: "right" };

            let matProdLtdaysBlankP2 = worksheet.getCell("AA" + belowtableRowNumberP2_2);
            matProdLtdaysBlankP2.value = "";
            matProdLtdaysBlankP2.font = {
                name: "Calibri",
                size: 12,
                // bold: true,
                color: { argb: "#ffff00" },
            };
            matProdLtdaysBlankP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            matProdLtdaysBlankP2.alignment = { vertical: "middle", horizontal: "right" };

            let matProdLtPPOP2 = worksheet.getCell("AB" + belowtableRowNumberP2_2);
            matProdLtPPOP2.value = "";
            matProdLtPPOP2.font = {
                name: "Calibri",
                size: 12,
                // bold: true,
                color: { argb: "#ffff00" },
            };
            matProdLtPPOP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thick' }
            }
            matProdLtPPOP2.alignment = { vertical: "middle", horizontal: "right" };



            // below left table 2ND part
            //row 3
            var belowtableRowNumberP2_3 = (10 + 1 + rowCountDetailFabricP2 + 3 + rowCountDetailsAccsessories2 + 3 + rowCountDetailsLabel2 + 3 + rowCountDetailsPackaging2 + 3 + rowCountDetailsProcess2 + 4);

            let catSewPackP2 = worksheet.getCell("X" + belowtableRowNumberP2_3);
            catSewPackP2.value = "CUT/SEW/PACK LT";
            catSewPackP2.font = {
                name: "Calibri",
                size: 12,
                // bold: true,
                color: { argb: "#ffff00" },
            };
            catSewPackP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thick' },
                right: { style: 'thin' }
            }
            catSewPackP2.alignment = { vertical: "middle", horizontal: "right" };

            let catSewPackBlankP2 = worksheet.getCell("Y" + belowtableRowNumberP2_3);
            catSewPackBlankP2.value = "";
            catSewPackBlankP2.font = {
                name: "Calibri",
                size: 12,
               // bold: true,
                color: { argb: "#ffff00" },
            };
            catSewPackBlankP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            catSewPackBlankP2.alignment = { vertical: "middle", horizontal: "right" };

            let catSewPacdaysP2 = worksheet.getCell("Z" + belowtableRowNumberP2_3);
            catSewPacdaysP2.value = "days";
            catSewPacdaysP2.font = {
                name: "Calibri",
                size: 12,
              // bold: true,
                color: { argb: "#ffff00" },
            };
            catSewPacdaysP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            catSewPacdaysP2.alignment = { vertical: "middle", horizontal: "right" };

            let catSewPacdaysBlankP2 = worksheet.getCell("AA" + belowtableRowNumberP2_3);
            catSewPacdaysBlankP2.value = "";
            catSewPacdaysBlankP2.font = {
                name: "Calibri",
                size: 12,
                 // bold: true,
                color: { argb: "#ffff00" },
            };
            catSewPacdaysBlankP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            catSewPacdaysBlankP2.alignment = { vertical: "middle", horizontal: "right" };

            let catSewPacPPOP2 = worksheet.getCell("AB" + belowtableRowNumberP2_3);
            catSewPacPPOP2.value = "";
            catSewPacPPOP2.font = {
                name: "Calibri",
                size: 12,
              // bold: true,
                color: { argb: "#ffff00" },
            };
            catSewPacPPOP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thick' }
            }
            catSewPacPPOP2.alignment = { vertical: "middle", horizontal: "right" };

            // below left table 2ND part
            //row 4
            var belowtableRowNumberP2_4 = (10 + 1 + rowCountDetailFabricP2 + 3 + rowCountDetailsAccsessories2 + 3 + rowCountDetailsLabel2 + 3 + rowCountDetailsPackaging2 + 3 + rowCountDetailsProcess2 + 5);

            let totalLtP2 = worksheet.getCell("X" + belowtableRowNumberP2_4);
            totalLtP2.value = "TOTAL LT";
            totalLtP2.font = {
                name: "Calibri",
                size: 12,
              // bold: true,
                color: { argb: "#ffff00" },
            };
            totalLtP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thick' },
                left: { style: 'thick' },
                right: { style: 'thin' }
            }
            totalLtP2.alignment = { vertical: "middle", horizontal: "right" };

            let totalLtBlankP2 = worksheet.getCell("Y" + belowtableRowNumberP2_4);
            totalLtBlankP2.value = "";
            totalLtBlankP2.font = {
                name: "Calibri",
                size: 12,
               // bold: true,
                color: { argb: "#ffff00" },
            };
            totalLtBlankP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thick' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            totalLtBlankP2.alignment = { vertical: "middle", horizontal: "right" };

            let totalLtdaysP2 = worksheet.getCell("Z" + belowtableRowNumberP2_4);
            totalLtdaysP2.value = "days";
            totalLtdaysP2.font = {
                name: "Calibri",
                size: 12,
               // bold: true,
                color: { argb: "#ffff00" },
            };
            totalLtdaysP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thick' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            totalLtdaysP2.alignment = { vertical: "middle", horizontal: "right" };

            let totalLtdaysBlankP2 = worksheet.getCell("AA" + belowtableRowNumberP2_4);
            totalLtdaysBlankP2.value = "";
            totalLtdaysBlankP2.font = {
                name: "Calibri",
                size: 12,
                // bold: true,
                color: { argb: "#ffff00" },
            };
            totalLtdaysBlankP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thick' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            totalLtdaysBlankP2.alignment = { vertical: "middle", horizontal: "right" };

            let ctotalLtPPOP2 = worksheet.getCell("AB" + belowtableRowNumberP2_4);
            ctotalLtPPOP2.value = "";
            ctotalLtPPOP2.font = {
                name: "Calibri",
                size: 12,
                // bold: true,
                color: { argb: "#ffff00" },
            };
            ctotalLtPPOP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thick' },
                left: { style: 'thin' },
                right: { style: 'thick' }
            }
            ctotalLtPPOP2.alignment = { vertical: "middle", horizontal: "right" };










            //  BELOW RIGHT table  2ND PART---------------------------------------------------------------------------------------
            //row 1-------------------------------------------------------------------------------------------------------
            let totalMatOthrCostP2 = worksheet.getCell("AI" + belowtableRowNumberP2);
            totalMatOthrCostP2.value = "TOTAL MATERIAL + OTHERS COST ";
            totalMatOthrCostP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            totalMatOthrCostP2.alignment = { vertical: "middle", horizontal: "right" };
            //WENT DOWN (totalMatOthrCostP2)


            let totalMatOthrCostBlankP2 = worksheet.getCell("AK" + belowtableRowNumberP2);
            totalMatOthrCostBlankP2.value = "";
            totalMatOthrCostBlankP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            totalMatOthrCostBlankP2.alignment = { vertical: "middle", horizontal: "right" };
            let totalMatOthrCostCalP2 = worksheet.getCell("AL" + belowtableRowNumberP2);
            totalMatOthrCostCalP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            totalMatOthrCostCalP2.border = {
                top: { style: 'thick' },
                bottom: { style: 'thick' },
                left: { style: 'thick' },
                right: { style: 'thick' }
            }
            totalMatOthrCostCalP2.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "ffabff9a" },
                bgColor: { argb: "" },
            };
            totalMatOthrCostCalP2.alignment = { vertical: "middle", horizontal: "right" };
            totalMatOthrCostCalP2.value = {
                formula: `AL${processingTotalSumColNumberP2}+AL${packagingTotalSumColNumberP2}+AL${labelTotalSumColNumberP2}+AL${accTotalSumColNumberP2}+AL${fabTotalSumColNumberP2}`,
                date1904: false
            }

            //  below Right table  2ND PART
            //row 2
            var belowtableRowRightNumber2P2 = (10 + 1 + rowCountDetailFabricP2 + 3 + rowCountDetailsAccsessories2 + 3 + rowCountDetailsLabel2 + 3 + rowCountDetailsPackaging2 + 3 + rowCountDetailsProcess2 + 4);
            let directLaborCstP2 = worksheet.getCell("AI" + belowtableRowRightNumber2P2);
            directLaborCstP2.value = "DIRECT LABOR (CMT) COST ";
            directLaborCstP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            directLaborCstP2.alignment = { vertical: "middle", horizontal: "right" };
            //WENT DOWN (directLaborCstValueP2)

            let directLaborCstBlankP2 = worksheet.getCell("AK" + belowtableRowRightNumber2P2);
            directLaborCstBlankP2.value = "";
            directLaborCstBlankP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            directLaborCstBlankP2.alignment = { vertical: "middle", horizontal: "right" };
            let directLaborCstCalP2 = worksheet.getCell("AL" + belowtableRowRightNumber2P2);
            directLaborCstCalP2.value =  allData[0].cmPC;
            directLaborCstCalP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            directLaborCstCalP2.border = {
                top: { style: 'thick' },
                bottom: { style: 'thick' },
                left: { style: 'thick' },
                right: { style: 'thick' }
            }
            directLaborCstCalP2.alignment = { vertical: "middle", horizontal: "right" };
            directLaborCstBlankP2.alignment = { vertical: "middle", horizontal: "right" };

            // let smvValueP2 = worksheet.getCell("AL" + belowtableRowRightNumber2P2);
            // smvValueP2.value = allData[1].iedEtailsList[0].smv;
            // smvValueP2.font = {
            //     name: "Calibri",
            //     size: 12,
            //     bold: true,
            //     color: { argb: "#ffffe828" },
            // };
            // smvValueP2.border = {
            //     top: { style: 'thick' },
            //     bottom: { style: 'thick' },
            //     left: { style: 'thick' },
            //     right: { style: 'thick' }
            // }
            // smvValueP2.alignment = { vertical: "middle", horizontal: "right" };


            //  below Right table part 2ND PART
            // row 3
            var belowtableRowRightNumber3P2 = (10 + 1 + rowCountDetailFabricP2 + 3 + rowCountDetailsAccsessories2 + 3 + rowCountDetailsLabel2 + 3 + rowCountDetailsPackaging2 + 3 + rowCountDetailsProcess2 + 6);
            let profOverheadCstP2 = worksheet.getCell("AI" + belowtableRowRightNumber3P2);
            profOverheadCstP2.value = "PROFIT & OVERHEAD COST ";
            profOverheadCstP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            profOverheadCstP2.alignment = { vertical: "middle", horizontal: "right" };

            //WENT DOWN (profOverheadValueP2)


            let profOverheadBlankP2 = worksheet.getCell("AK" + belowtableRowRightNumber3P2);
            profOverheadBlankP2.value = "";
            profOverheadBlankP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            profOverheadBlankP2.alignment = { vertical: "middle", horizontal: "right" };
            let profOverheadCstCalP2 = worksheet.getCell("AL" + belowtableRowRightNumber3P2);
            profOverheadCstCalP2.value = 0;
            profOverheadCstCalP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            profOverheadCstCalP2.border = {
                top: { style: 'thick' },
                bottom: { style: 'thick' },
                left: { style: 'thick' },
                right: { style: 'thick' }
            }
            profOverheadCstCalP2.alignment = { vertical: "middle", horizontal: "right" };



            //  below Right table part  2nd PART
            // row 4
            var belowtableRowRightNumber4P2 = (10 + 1 + rowCountDetailFabricP2 + 3 + rowCountDetailsAccsessories2 + 3 + rowCountDetailsLabel2 + 3 + rowCountDetailsPackaging2 + 3 + rowCountDetailsProcess2 + 8);
            let totalQuotedFobP2 = worksheet.getCell("AI" + belowtableRowRightNumber4P2);
            totalQuotedFobP2.value = "TOTAL QUOTED FOB ";
            totalQuotedFobP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            totalQuotedFobP2.alignment = { vertical: "middle", horizontal: "right" };


            //WENT DOWN (totalQuotedFobValueP2)



            let totalQuotedFobBlankP2 = worksheet.getCell("AK" + belowtableRowRightNumber4P2);
            totalQuotedFobBlankP2.value = "";
            totalQuotedFobBlankP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            totalQuotedFobBlankP2.alignment = { vertical: "middle", horizontal: "right" };
            let totalQuotedFobtCalP2 = worksheet.getCell("AL" + belowtableRowRightNumber4P2);
            totalQuotedFobtCalP2.value = "";
            totalQuotedFobtCalP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            totalQuotedFobtCalP2.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "ffffb827" },
                bgColor: { argb: "" },
            };
            totalQuotedFobtCalP2.border = {
                top: { style: 'thick' },
                bottom: { style: 'thick' },
                left: { style: 'thick' },
                right: { style: 'thick' }
            }
            totalQuotedFobtCalP2.alignment = { vertical: "middle", horizontal: "right" };
            totalQuotedFobtCalP2.value = {
                formula: `AL${belowtableRowRightNumber3P2}+AL${belowtableRowRightNumber2P2}+AL${belowtableRowNumberP2}`,
                date1904: false
            }
            totalQuotedFobtCalP2.numFmt='0.00';



            //  below Right table part  2nd PART
            //  row 5
            var belowtableRowRightNumber5P2 = (10 + 1 + rowCountDetailFabricP2 + 3 + rowCountDetailsAccsessories2 + 3 + rowCountDetailsLabel2 + 3 + rowCountDetailsPackaging2 + 3 + rowCountDetailsProcess2 + 10);
            let confirmedFobP2 = worksheet.getCell("AI" + belowtableRowRightNumber5P2);
            confirmedFobP2.value = "CONFIRMED FOB";
            confirmedFobP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            confirmedFobP2.alignment = { vertical: "middle", horizontal: "right" };
            let confirmedFobValueP2 = worksheet.getCell("AJ" + belowtableRowRightNumber5P2);
            confirmedFobValueP2.value = "";
            confirmedFobValueP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            confirmedFobValueP2.alignment = { vertical: "middle", horizontal: "right" };
            let confirmedFobBlankP2 = worksheet.getCell("AK" + belowtableRowRightNumber5P2);
            confirmedFobBlankP2.value = "";
            confirmedFobBlankP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            confirmedFobBlankP2.alignment = { vertical: "middle", horizontal: "right" };
            let confirmedFobCalP2 = worksheet.getCell("AL" + belowtableRowRightNumber5P2);
            confirmedFobCalP2.value = "";
            confirmedFobCalP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffabff9a" },
            };
            confirmedFobCalP2.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "ffffb827" },
                bgColor: { argb: "" },
            };
            confirmedFobCalP2.border = {
                top: { style: 'thick' },
                bottom: { style: 'thick' },
                left: { style: 'thick' },
                right: { style: 'thick' }
            }
            confirmedFobCalP2.alignment = { vertical: "middle", horizontal: "right" };




            //below RIGHT TABLE EXTRA HERE   2nd PART
            //FROM RIGHT 1

            let totalMatOthrCostValueP2 = worksheet.getCell("AJ" + belowtableRowNumberP2);
            totalMatOthrCostValueP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            totalMatOthrCostValueP2.alignment = { vertical: "middle", horizontal: "right" };
            totalMatOthrCostValueP2.value = {
                formula: `IFERROR(AL${belowtableRowNumberP2}/AL${belowtableRowRightNumber4P2},0)`,
                date1904: false
            }
            totalMatOthrCostValueP2.numFmt = '0.00%'
            totalMatOthrCostValueP2.alignment = { vertical: "middle", horizontal: "right" };


            //below RIGHT TABLE EXTRA HERE 
            //FROM RIGHT 2
            let directLaborCstValueP2 = worksheet.getCell("AJ" + belowtableRowRightNumber2P2);

            directLaborCstValueP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            directLaborCstValueP2.alignment = { vertical: "middle", horizontal: "right" };
            directLaborCstValueP2.value = {
                formula: `IFERROR(AL${belowtableRowRightNumber2P2}/AL${belowtableRowRightNumber4P2},0)`,
                date1904: false
            }
            directLaborCstValueP2.numFmt = '0.00%'

            //below RIGHT TABLE EXTRA HERE 
            //FROM RIGHT 3
            let profOverheadValueP2 = worksheet.getCell("AJ" + belowtableRowRightNumber3P2);

            profOverheadValueP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            profOverheadValueP2.alignment = { vertical: "middle", horizontal: "right" };
            profOverheadValueP2.value = {
                formula: `IFERROR(AL${belowtableRowRightNumber3P2}/AL${belowtableRowRightNumber4P2},0)`,
                date1904: false
            }
            profOverheadValueP2.numFmt = '0.00%'

            //below RIGHT TABLE EXTRA HERE 
            //FROM RIGHT 4
            let totalQuotedFobValueP2 = worksheet.getCell("AJ" + belowtableRowRightNumber4P2);
            totalQuotedFobValueP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            totalQuotedFobValueP2.alignment = { vertical: "middle", horizontal: "right" };
            totalQuotedFobValueP2.value = {
                formula: `AJ${belowtableRowRightNumber3P2}+AJ${belowtableRowRightNumber2P2}+AJ${belowtableRowNumberP2}`,
                date1904: false
            }
            totalQuotedFobValueP2.numFmt = '0.00%'
        }



// TOTAL MATERIAL COST PERC HERE 1ST PART 
        let fabMetCostperc = worksheet.getCell("N" + fabTotalSumColNumber);
        fabMetCostperc.value = "";
        fabMetCostperc.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        fabMetCostperc.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        fabMetCostperc.value = {
            formula: `IFERROR(P${fabTotalSumColNumber}/P${belowtableRowRightNumber4},0)`,
            date1904: false
        }
        fabMetCostperc.alignment = { vertical: "middle", horizontal: "right" };
        fabMetCostperc.numFmt = '0.00%'

// TOTAL TRIM COST  : PERC HERE 1ST PART 
        let accMetCostperc = worksheet.getCell("N" + accTotalSumColNumber);
        accMetCostperc.value = "";
        accMetCostperc.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        accMetCostperc.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        accMetCostperc.value = {
            formula: `IFERROR(P${accTotalSumColNumber}/P${belowtableRowRightNumber4},0)`,
            date1904: false
        }
        accMetCostperc.numFmt = '0.00%'

//TOTAL LABEL COST  :  : PERC HERE 1ST PART 
        let labelMetCostperc = worksheet.getCell("N" + labelTotalSumColNumber);
        labelMetCostperc.value = "";
        labelMetCostperc.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        labelMetCostperc.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        labelMetCostperc.value = {
            formula: `IFERROR(P${labelTotalSumColNumber}/P${belowtableRowRightNumber4},0)`,
            date1904: false
        }
        labelMetCostperc.numFmt = '0.00%'

        
//TOTAL PACKAGING COST  : PERC HERE 1ST PART 

        let packagingMetCostperc = worksheet.getCell("N" + packagingTotalSumColNumber);
        packagingMetCostperc.value = "";
        packagingMetCostperc.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        packagingMetCostperc.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        packagingMetCostperc.value = {
            formula: `IFERROR(P${packagingTotalSumColNumber}/P${belowtableRowRightNumber4},0)`,
            date1904: false
        }
        packagingMetCostperc.numFmt = '0.00%'

//TOTAL PROCESS COST : PERC HERE 1ST PART 
        let processMetCostperc = worksheet.getCell("N" + processTotalSumColNumber);
        processMetCostperc.value = "";
        processMetCostperc.font = {
            name: "Calibri",
            size: 12,
            bold: true,
            color: { argb: "#ffff00" },
        };
        processMetCostperc.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
        processMetCostperc.value = {
            formula: `IFERROR(P${processTotalSumColNumber}/P${belowtableRowRightNumber4},0)`,
            date1904: false
        }
        processMetCostperc.numFmt = '0.00%'





if(allData.length > 1){
//TOTAL MATERIAL COST : PERC HERE 2ND PART  
            let fabMetCostpercP2 = worksheet.getCell("AJ" + fabTotalSumColNumberP2);
            fabMetCostpercP2.value = "";
            fabMetCostpercP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            fabMetCostpercP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            fabMetCostpercP2.value = {
                formula: `IFERROR(AL${fabTotalSumColNumberP2}/AL${belowtableRowRightNumber4P2},0)`,
                date1904: false
            }
            fabMetCostpercP2.numFmt = '0.00%'
            fabMetCostpercP2.alignment = { vertical: "middle", horizontal: "right" };

// TOTAL TRIM COST  : PERC HERE 2ND PART 
          let accMetCostpercP2 = worksheet.getCell("AJ" + accTotalSumColNumberP2);
            accMetCostpercP2.value = "";
            accMetCostpercP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            accMetCostpercP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            accMetCostpercP2.value = {
                formula: `IFERROR(AL${accTotalSumColNumberP2}/AL${belowtableRowRightNumber4P2},0)`,
                date1904: false
            }
            accMetCostpercP2.numFmt = '0.00%'

// TOTAL LABEL COST : PERC HERE 2ND PART 
            let labelMetCostpercP2 = worksheet.getCell("AJ" + labelTotalSumColNumberP2);
            labelMetCostpercP2.value = "";
            labelMetCostpercP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            labelMetCostpercP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            labelMetCostpercP2.value = {
                formula: `IFERROR(AL${labelTotalSumColNumberP2}/AL${belowtableRowRightNumber4P2},0)`,
                date1904: false
            }
            labelMetCostpercP2.numFmt = '0.00%'


// TOTAL PACKAGING COST : PERC HERE 2ND PART 
            let packagingMetCostpercP2 = worksheet.getCell("AJ" + packagingTotalSumColNumberP2);
            packagingMetCostpercP2.value = "";
            packagingMetCostpercP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            packagingMetCostpercP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            packagingMetCostpercP2.value = {
                formula: `IFERROR(AL${packagingTotalSumColNumberP2}/AL${belowtableRowRightNumber4P2},0)`,
                date1904: false
            }
            packagingMetCostpercP2.numFmt = '0.00%'

// TOTAL PROCESS COST : PERC HERE 2ND PART 
            let processingMetCostpercP2 = worksheet.getCell("AJ" + processingTotalSumColNumberP2);
            processingMetCostpercP2.value = "";
            processingMetCostpercP2.font = {
                name: "Calibri",
                size: 12,
                bold: true,
                color: { argb: "#ffff00" },
            };
            processingMetCostpercP2.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            }
            processingMetCostpercP2.value = {
                formula: `IFERROR(AL${processingTotalSumColNumberP2}/AL${belowtableRowRightNumber4P2},0)`,
                date1904: false
            }
            processingMetCostpercP2.numFmt = '0.00%'
}





        worksheet.columns.forEach(function (column, i) {
            // debugger
            if (i != 0 && i != 30) {
                var maxLength = 0;
                column["eachCell"]({ includeEmpty: false }, function (cell) {
                    var columnLength = cell.value ? cell.value.toString().length : 15;
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



    }




}