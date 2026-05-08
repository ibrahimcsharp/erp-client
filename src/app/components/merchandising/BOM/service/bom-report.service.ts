import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { BookingItemModel } from "../../booking/model/booking-model/booking-item-model";
import { BomSheetDataModel } from "../model/bom-sheet-data.model";
import { Workbook } from "exceljs";
import * as fs from "file-saver";
import { BomListModel } from "../model/bom-list.model";

@Injectable({
    providedIn: "root",
})
export class BOMReportService {
    headers = {};
    baseUrl = environment.apiUrl + "merchandising/";
    baseUrl_ = this.baseUrl.replace(/[?&]$/, "");

    auth_token = null;
    BookingFormBomList: BomSheetDataModel[];
    BookingItemList: BookingItemModel[] = new Array();
    BookingItemList1 = new BehaviorSubject<any[]>(this.BookingItemList);
    s: Observable<any[]> = this.BookingItemList1.asObservable();
    BookingBasicInfoFromBom: BomListModel;
    FromBom: boolean = false;

    constructor(private http: HttpClient, private token: TokenService) { }

    exportExcel(excelData) {
        debugger
        const title = excelData.title;
        const allData = excelData.finallySubmitData;

        //Create a workbook with a worksheet
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet(
            "Bom Report"
        );

        const bomListHeader = [
            "Category",
            "Item",
            "Description",
            "Supplier",
            "Gmt Color",
            "Item Color",
            "Gmt Size",
            "Item Size",
            "PO",
            "Ref. Code",
            "Consumption",
            "Gmt Qty",
            "UOM",
            "Req. Qty",
            "wst.Qty",
            "Wst.(%)",
            "Add. Qty",
            "Total Qty",
            "Rate",
            "T. Amount",
            "Comments",
            "Supplier Change Comment",
        ];

        var partList = allData.filter((a, i) => allData.findIndex((s) => a.stylePart === s.stylePart) === i);

        var data1 = [];
        var data1ForExle = [];
        var dataForPart1 = allData.filter(x => x.stylePart == partList[0].stylePart);
        for (var item of dataForPart1) {
            var obj = {
                category: item.category,
                itemName: item.itemName,
                description: item.description,
                supplierName: item.supplierName,
                gmtColor: item.gmtColor,
                itemColor: item.itemColor,
                gmtSize: item.gmtSize,
                itemSize: item.itemSize,
                poNo: item.poNo,
                refCode: item.refCode,
                consumption: item.consumption,
                effectedQty: item.effectedQty,
                uomName: item.uomName,
                requiredQty: item.requiredQty,
                wastageQty: item.wastageQty,
                wastagePercentage: item.wastagePercentage,
                additionalQty: item.additionalQty,
                totalQty: item.totalQty,
                rate: item.rate,
                totalAmount: item.totalAmount,
                remarks: item.remarks,
                buyingTeamComment: item.buyingTeamComment
            }
            data1.push(obj);
        }


        data1.forEach((row: any) => {
            data1ForExle.push(Object.values(row));
        });

        worksheet.addRow([]);
        worksheet.addRow([]);

        var part1Hader = worksheet.addRow(bomListHeader);
        part1Hader.eachCell((cell, number) => {
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
        let Part1LableCell = "A1";
        worksheet.getCell(Part1LableCell).value = "Part Name"
        let Part1ValueCell = "B1";
        worksheet.getCell(Part1ValueCell).value = partList[0].stylePart;
        var fastpartCout = 0

        data1ForExle.forEach((d) => {
            let row = worksheet.addRow(d);
            fastpartCout++;
        });



        //---------------------------part 2---------------------------------//

        var data2 = [];
        var data2ForExle = [];
        if (partList.length > 1) {
            var dataForPart2 = allData.filter(x => x.stylePart == partList[1].stylePart);
            for (var item2 of dataForPart2) {
                var obj = {
                    category: item2.category,
                    itemName: item2.itemName,
                    description: item.description,
                    supplierName: item2.supplierName,
                    gmtColor: item2.gmtColor,
                    itemColor: item2.itemColor,
                    gmtSize: item2.gmtSize,
                    itemSize: item2.itemSize,
                    poNo: item2.poNo,
                    refCode: item2.refCode,
                    consumption: item2.consumption,
                    effectedQty: item2.effectedQty,
                    uomName: item2.uomName,
                    requiredQty: item2.requiredQty,
                    wastageQty: item2.wastageQty,
                    wastagePercentage: item2.wastagePercentage,
                    additionalQty: item2.additionalQty,
                    totalQty: item2.totalQty,
                    rate: item2.rate,
                    totalAmount: item.totalAmount,
                    remarks: item2.remarks,
                    buyingTeamComment: item2.buyingTeamComment
                }
                data2.push(obj);
            }


            data2.forEach((row: any) => {
                data2ForExle.push(Object.values(row));
            });



            worksheet.addRow([]);
            worksheet.addRow([]);
            worksheet.addRow([]);
            var part2Hader = worksheet.addRow(bomListHeader);
            part2Hader.eachCell((cell, number) => {
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
            var p2HeaderCount = + fastpartCout + 5;
            let Part2LableCell = "A" + p2HeaderCount;
            worksheet.getCell(Part2LableCell).value = "Part Name"
            let Part2ValueCell = "B" + p2HeaderCount;
            worksheet.getCell(Part2ValueCell).value = partList[1].stylePart;
            debugger
            var scondpartCout = 0
            data2ForExle.forEach((d) => {
                let row = worksheet.addRow(d);
                scondpartCout++;
            });
        }


        worksheet.columns.forEach(function (column, i) {
            // debugger
            if (i <= 10) {
                var maxLength = 10;
                column["eachCell"]({ includeEmpty: false }, function (cell) {
                    var columnLength = cell.value ? cell.value.toString().length : 10;
                    if (columnLength > maxLength) {
                        maxLength = columnLength;
                    }
                });
                column.width = maxLength < 10 ? 10 : 22;
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