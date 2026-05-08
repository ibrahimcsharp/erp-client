import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Workbook } from "exceljs";
import * as fs from "file-saver";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { MmsService } from "../../services/mms.service";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class MmsSnackService {
  baseUrl = environment.apiUrl + "mms_snack/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
  cartItems: any[] = [];
  orderDetails: any[] = [];
  employeeId: string = "-1";
  DamageItems: any[];

  constructor(private http: HttpClient, private token: TokenService,
    public mmsService: MmsService) { }


  GetSnackDamageByItemId(itemId: number) {
    return this.http.get(this.baseUrl_ + "SnackSetting/GetSnackDamageByItemId?itemId=" + itemId, {
      headers: this.token.headerToken(),
    });
  }

  SaveSnackDamage(obj: any) {
    return this.http.post(this.baseUrl_ + "SnackSetting/SaveSnackDamageItem", obj, {
      headers: this.token.headerToken(),
    });
  }

  GetSnacksCategory() {
    return this.http.get(this.baseUrl_ + "SnackSetting/GetSnackCategory", {
      headers: this.token.headerToken(),
    });
  }
  SaveSnackCategory(obj: any) {
    return this.http.post(this.baseUrl_ + "SnackSetting/SaveSnaksCategory", obj, {
      headers: this.token.headerToken(),
    });
  }
  GetSnacksItems() {
    return this.http.get(this.baseUrl_ + "SnackSetting/GetSnackItems", {
      headers: this.token.headerToken(),
    });
  }
  SaveSnackItem(obj: any) {
    console.log(obj);
    return this.http.post(this.baseUrl_ + "SnackSetting/SaveSnaksItem", obj, {
      headers: this.token.headerToken(),
    });
  }
  SaveSnackReadyItem(obj: any) {
    return this.http.post(this.baseUrl_ + "SnackSetting/SaveSnackReadyItem", obj, {
      headers: this.token.headerToken(),
    });
  }
  SaveSnackItemStockSynced(obj: any) {
    return this.http.post(this.baseUrl_ + "SnackSetting/SaveSnackItemStockSynced", obj, {
      headers: this.token.headerToken(),
    });
  }
  GetSnacksReadyItems() {
    return this.http.get(this.baseUrl_ + "SnackSetting/GetSnackReadyItems", {
      headers: this.token.headerToken(),
    });
  }
  GetSnacksCurrentStock(showAll: number) {
    return this.http.get(this.baseUrl_ + "SnackSetting/GetSnackCurrentStock?showAll=" + showAll, {
      headers: this.token.headerToken(),
    });
  }

  GetSnacksReceivedItems() {
    return this.http.get(this.baseUrl_ + "SnackReport/GetSnacksIndStatementCurrentUser", {
      headers: this.token.headerToken(),
    });
  }

  GetSnacksOrderList(showAll: number, searchDate: string, orderStatus: string) {
    return this.http.get(this.baseUrl_ + "SnackOrder/GetSnacksOrderList?showAll=" + showAll + "&searchDate=" + searchDate + "&orderStatus=" + orderStatus, {
      headers: this.token.headerToken(),
    });
  }


  SaveSnackOrderItem(obj: any) {

    return this.http.post(this.baseUrl_ + "SnackOrder/SaveSnaksOrder", obj, {
      headers: this.token.headerToken(),
    });
  }


  SaveSnackOrderDinningActivity(obj: any) {
    return this.http.post(this.baseUrl_ + "SnackOrder/SaveSnaksOrderDinningActivity", obj, {
      headers: this.token.headerToken(),
    });
  }

  //Report
  GetSnackReportIndStatement(monthId: number, yearId: number, employeeId: string) {
    return this.http.get(this.baseUrl_ + "SnackReport/GetSnacksIndStatement?monthId=" + monthId + "&yearId=" + yearId + "&employeeId=" + employeeId, {
      headers: this.token.headerToken(),
    });
  }
  GetSnacksIndStatementPayable(monthId: number, yearId: number) {
    return this.http.get(this.baseUrl_ + "SnackReport/GetSnacksIndStatementPayable?monthId=" + monthId + "&yearId=" + yearId, {
      headers: this.token.headerToken(),
    });
  }

  GetSnackMealStatement(monthId: number, yearId: number) {
    return this.http.get(this.baseUrl_ + "SnackReport/GetSnackMealStatement?monthId=" + monthId + "&yearId=" + yearId, {
      headers: this.token.headerToken(),
    });
  }

  GetSnackMonthSummary(monthId: number, yearId: number) {
    return this.http.get(this.baseUrl_ + "SnackReport/GetSnackMonthSummary?monthId=" + monthId + "&yearId=" + yearId, {
      headers: this.token.headerToken(),
    });
  }

  GetSnackDailySummary(snacksSummaryReportFromDate: any, snacksSummaryReportToDate: any) {
    return this.http.get(this.baseUrl_ + "SnackReport/GetSnackDailySummary?fromDate=" + snacksSummaryReportFromDate + "&toDate=" + snacksSummaryReportToDate, {
      headers: this.token.headerToken(),
    });
  }

  GetDayWiseMealCost(snacksSummaryReportFromDate: any, snacksSummaryReportToDate: any) {
    return this.http.get(this.baseUrl_ + "SnackReport/GetDayWiseMealCost?fromDate=" + snacksSummaryReportFromDate + "&toDate=" + snacksSummaryReportToDate, {
      headers: this.token.headerToken(),
    });
  }

  //Get employee Info
  GetEmployeeInfo() {
    return this.http.get(this.baseUrl_ + "SnackSetting/GetEmployeeInfo", {
      headers: this.token.headerToken(),
    });
  }



  ///end report

  orderedItems: any[] = [];
  ///api call

  GetOrderedItems(showAll: number, searchDate: string, orderStatus: string) {
    this.orderedItems = [];
    this.GetSnacksOrderList(showAll, searchDate, orderStatus).subscribe((res: any[]) => {
      this.orderedItems = res;
    }, error => {
      this.orderedItems = [];

    })
  }

  //Get available items
  snackAvailableItems: any[] = [];
  GetAvailableItems() {
    this.snackAvailableItems = [];
    this.GetSnacksCurrentStock(1).subscribe((res: any[]) => {
      this.snackAvailableItems = res;
    }, error => {
      this.snackAvailableItems = [];

    })
  }

  //Get Received items
  snacksReceivedItems: any[] = [];
  GetReceivedItems() {
    this.snacksReceivedItems = [];
    this.GetSnacksReceivedItems().subscribe((res: any[]) => {
      this.snacksReceivedItems = res;
    }, error => {
      this.snacksReceivedItems = [];

    })
  }

  //meal snack month
  mealMonthsList: any[] = [];
  GetMealMonths() {
    this.mmsService.GetMealMonths().subscribe(
      (res: any[]) => {
        if (res) {
          this.mealMonthsList = res;
        }
      },
      (error) => {
        this.mealMonthsList = [];
      }
    );
  }

  //Get employee info 
  empList: any[] = [];
  GetEmployeeInfoWithSearch() {
    this.GetEmployeeInfo().subscribe((res: any[]) => {
      this.empList = res;
      console.log(this.empList);
    }, error => {
      this.empList = [];
      console.log(error);

    })
  }


  ///excel report
  //report 1
  exportExcelReport1(excelData) {
    //alert("fired");
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers;
    const data = excelData.data;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Monthly Employee Wise Snacks Statement");
    const stockHeader = [
      "Date",
      "Employee Id",
      "Employee Name",
      "Department",
      "Item Name",
      "Buy Qty",
      "Unit Price",
      "Sub Total Cost"
    ];

    let d = new Date();
    let date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

    worksheet.mergeCells("A1", "J1");
    let companyRow = worksheet.getCell("A1");
    companyRow.value = header.unitName;
    companyRow.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "#ffff00" },
    };
    companyRow.alignment = { vertical: "middle", horizontal: "center" };

    worksheet.mergeCells("A2", "J2");
    let EmployeeNameRow = worksheet.getCell("A2");
    EmployeeNameRow.value = "Monthly Individual Snacks Details Report";
    EmployeeNameRow.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "#ffff00" },
    };
    EmployeeNameRow.alignment = { vertical: "middle", horizontal: "center" };

    worksheet.mergeCells("A3", "J3");
    let MonthRow = worksheet.getCell("A3");
    //MonthRow.value = header.monthName + "'" + header.yearName;
    MonthRow.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "#ffff00" },
    };
    MonthRow.alignment = { vertical: "middle", horizontal: "center" };

    worksheet.addRow([]);

    let headerRow = worksheet.addRow(stockHeader);
    headerRow.eachCell((cell, number) => {
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

    data.forEach((d) => {
      let row = worksheet.addRow(d);
    });

    worksheet.addRow([]);

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, title + ".xlsx");
    });
  }
  ///excel report
  //report 2 
  exportExcelReport2(excelData) {
    //alert("fired");
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers;
    const data = excelData.data;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Individual_Snacks_Payable_Statement");
    const stockHeader = [
      "Month",
      "Year",
      "Employee Name",
      "Employee Id",
      "Department",
      "Total Qty",
      "Total Cost",
    ];

    let d = new Date();
    let date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

    worksheet.mergeCells("A1", "J1");
    let companyRow = worksheet.getCell("A1");
    companyRow.value = header.unitName;
    companyRow.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "#ffff00" },
    };
    companyRow.alignment = { vertical: "middle", horizontal: "center" };

    worksheet.mergeCells("A2", "J2");
    let EmployeeNameRow = worksheet.getCell("A2");
    EmployeeNameRow.value = "Payable Report All Employees for Snacks";
    EmployeeNameRow.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "#ffff00" },
    };
    EmployeeNameRow.alignment = { vertical: "middle", horizontal: "center" };

    worksheet.mergeCells("A3", "J3");
    let MonthRow = worksheet.getCell("A3");
    //MonthRow.value = header.monthName + "'" + header.yearName;
    MonthRow.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "#ffff00" },
    };
    MonthRow.alignment = { vertical: "middle", horizontal: "center" };

    worksheet.addRow([]);

    let headerRow = worksheet.addRow(stockHeader);
    headerRow.eachCell((cell, number) => {
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

    data.forEach((d) => {
      let row = worksheet.addRow(d);
    });

    worksheet.addRow([]);

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, title + ".xlsx");
    });
  }
  ///excel report
  //report 2 
  exportExcelReport3(excelData) {
    //alert("fired");
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers;
    const data = excelData.data;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Payable_Report_All Employees_for_Snacks_Meal");
    const stockHeader = [
      "Month",
      "Year",
      "Employee Name",
      "Employee Id",
      "Department",
      "Total Qty",
      "Total Cost",
      "Total Meal Qty",
      "Total Meal Cost",
      "Total Cost"
    ];

    let d = new Date();
    let date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

    worksheet.mergeCells("A1", "J1");
    let companyRow = worksheet.getCell("A1");
    companyRow.value = header.unitName;
    companyRow.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "#ffff00" },
    };
    companyRow.alignment = { vertical: "middle", horizontal: "center" };

    worksheet.mergeCells("A2", "J2");
    let EmployeeNameRow = worksheet.getCell("A2");
    EmployeeNameRow.value = "Payable Report All Employees for Snacks and Meal";
    EmployeeNameRow.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "#ffff00" },
    };
    EmployeeNameRow.alignment = { vertical: "middle", horizontal: "center" };

    worksheet.mergeCells("A3", "J3");
    let MonthRow = worksheet.getCell("A3");
    //MonthRow.value = header.monthName + "'" + header.yearName;
    MonthRow.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "#ffff00" },
    };
    MonthRow.alignment = { vertical: "middle", horizontal: "center" };

    worksheet.addRow([]);

    let headerRow = worksheet.addRow(stockHeader);
    headerRow.eachCell((cell, number) => {
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

    data.forEach((d) => {
      let row = worksheet.addRow(d);
    });

    worksheet.addRow([]);

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, title + ".xlsx");
    });
  }


  exportExcelReport4(excelData) {
    //alert("fired");
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers;
    const data = excelData.data;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Items_Month_Summary_Report");
    const stockHeader = [
      "Month",
      "ItemName",
      "CostPrice",
      "MakingQty",
      "MakingCost",
      "DamageQty",
      "DamageCost",
      "ActualQty",
      "ActualCost",
      "PersonalSaleQty",
      "PersonalSaleAmount",
      "GuestPurposeQty",
      "GuestPurposeCost",
      "TotalSalQty",
      "TotalSaleAmount",
      "ActualSaleAmount",
      "Balance"
    ];

    let d = new Date();
    let date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

    worksheet.mergeCells("A1", "J1");
    let companyRow = worksheet.getCell("A1");
    companyRow.value = header.unitName;
    companyRow.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "#ffff00" },
    };
    companyRow.alignment = { vertical: "middle", horizontal: "center" };

    worksheet.mergeCells("A2", "J2");
    let EmployeeNameRow = worksheet.getCell("A2");
    EmployeeNameRow.value = "Items Monthly Summary Report";
    EmployeeNameRow.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "#ffff00" },
    };
    EmployeeNameRow.alignment = { vertical: "middle", horizontal: "center" };

    worksheet.mergeCells("A3", "J3");
    let MonthRow = worksheet.getCell("A3");
    //MonthRow.value = header.monthName + "'" + header.yearName;
    MonthRow.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "#ffff00" },
    };
    MonthRow.alignment = { vertical: "middle", horizontal: "center" };

    worksheet.addRow([]);

    let headerRow = worksheet.addRow(stockHeader);
    headerRow.eachCell((cell, number) => {
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

    data.forEach((d) => {
      let row = worksheet.addRow(d);
    });

    worksheet.addRow([]);

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, title + ".xlsx");
    });
  }

  exportExcelReport5(excelData) {
    debugger
    //alert("fired");
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers;
    const data = excelData.data;
    const fromDate = excelData.fromDate;
    const toDate = excelData.toDate;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet();
    const stockHeader = [
      "S/L",
      "Date",
      "Item Name",
      "Make Quantity",
      "Making Cost Per Unit",
      "Sale Qty",
      "Sale Price",
      "Total Sale Amount",
      "Official Guest Qty",
      "Official Guest Cost",
      "Damage Quantity",
      "Damage Cost",
      "Balance"
    ];

    let d = new Date();
    let date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

    worksheet.mergeCells("A1", "M1");

    worksheet.getColumn('A').width = 10;
    worksheet.getColumn('B').width = 15;
    worksheet.getColumn('C').width = 15;
    worksheet.getColumn('D').width = 15;
    worksheet.getColumn('E').width = 15;
    worksheet.getColumn('F').width = 15;
    worksheet.getColumn('G').width = 15;
    worksheet.getColumn('H').width = 15;
    worksheet.getColumn('I').width = 15;
    worksheet.getColumn('J').width = 15;
    worksheet.getColumn('K').width = 16;
    worksheet.getColumn('L').width = 15;
    worksheet.getColumn('M').width = 15;


    let titleRow = worksheet.getCell("A1");
    titleRow.value = "Snacks Summary Report (" + moment(fromDate).format('DD-MM-YYYY') + " to " + moment(toDate).format('DD-MM-YYYY') + ") ";
    titleRow.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "#ffff00" },
    };
    titleRow.alignment = { vertical: "middle", horizontal: "center" };



    let headerRow = worksheet.addRow(stockHeader);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "CCCCCC" },
        bgColor: { argb: "" },
      };
      cell.font = {
        bold: true,
        color: { argb: "000000" },
        size: 12,
      };
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
    headerRow.alignment = { wrapText: true, vertical: "middle", horizontal: "center" };

    var slNo = 1;
    var dataRowCount = 3;

    for (var sData of data) {
      let slCell = "A" + dataRowCount;
      worksheet.getCell(slCell).value = slNo;
      worksheet.getCell(slCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(slCell).alignment = { wrapText: true, vertical: "top", horizontal: "center" };

      let dateCell = "B" + dataRowCount;
      worksheet.getCell(dateCell).value = sData.declareDate;
      worksheet.getCell(dateCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(dateCell).alignment = { wrapText: true, vertical: "top", horizontal: "center" };

      let itemNameCell = "C" + dataRowCount;
      worksheet.getCell(itemNameCell).value = sData.itemName;
      worksheet.getCell(itemNameCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(itemNameCell).alignment = { wrapText: true, vertical: "top", horizontal: "left" };

      let makeQtyCell = "D" + dataRowCount;
      worksheet.getCell(makeQtyCell).value = sData.makeQty;
      worksheet.getCell(makeQtyCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(makeQtyCell).alignment = { wrapText: true, vertical: "top", horizontal: "center" };


      let makeCostCell = "E" + dataRowCount;
      worksheet.getCell(makeCostCell).value = sData.makeCost;
      worksheet.getCell(makeCostCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(makeCostCell).alignment = { wrapText: true, vertical: "top", horizontal: "center" };



      let saleQtyCell = "F" + dataRowCount;
      worksheet.getCell(saleQtyCell).value = sData.saleQty;
      worksheet.getCell(saleQtyCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(saleQtyCell).alignment = { wrapText: true, vertical: "top", horizontal: "center" };


      let salePriceCell = "G" + dataRowCount;
      worksheet.getCell(salePriceCell).value = sData.salePrice;
      worksheet.getCell(salePriceCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(salePriceCell).alignment = { wrapText: true, vertical: "top", horizontal: "center" };


      let totalSaleAmountCell = "H" + dataRowCount;
      worksheet.getCell(totalSaleAmountCell).value = sData.totalSaleAmount;
      worksheet.getCell(totalSaleAmountCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(totalSaleAmountCell).alignment = { wrapText: true, vertical: "top", horizontal: "center" };


      let officialQtyCell = "I" + dataRowCount;
      worksheet.getCell(officialQtyCell).value = sData.officialQty;
      worksheet.getCell(officialQtyCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(officialQtyCell).alignment = { wrapText: true, vertical: "top", horizontal: "center" };



      let officialGuestCostCell = "J" + dataRowCount;
      worksheet.getCell(officialGuestCostCell).value = sData.officialGuestCost;
      worksheet.getCell(officialGuestCostCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(officialGuestCostCell).alignment = { wrapText: true, vertical: "top", horizontal: "center" };


      let damageQtyCell = "K" + dataRowCount;
      worksheet.getCell(damageQtyCell).value = sData.damageQty;
      worksheet.getCell(damageQtyCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(damageQtyCell).alignment = { wrapText: true, vertical: "top", horizontal: "center" };


      let damageCostCell = "L" + dataRowCount;
      worksheet.getCell(damageCostCell).value = sData.damageCost;
      worksheet.getCell(damageCostCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(damageCostCell).alignment = { wrapText: true, vertical: "top", horizontal: "center" };


      let balanceCell = "M" + dataRowCount;
      worksheet.getCell(balanceCell).value = sData.balance;
      worksheet.getCell(balanceCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(balanceCell).alignment = { wrapText: true, vertical: "top", horizontal: "center" };

      dataRowCount++;
      slNo++;    }

    // data.forEach((d) => {
    //   let row = worksheet.addRow(d);
    // });

    worksheet.addRow([]);

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, title + ".xlsx");
    });
  }


  exportDayWiseMealCost(excelData) {
    const title = excelData.title;
    const header = excelData.headers;
    const data = excelData.data;
    const fromDate = excelData.fromDate;
    const toDate = excelData.toDate;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet();
    const stockHeader = [
      "S/L",
      "Date",
      "Meal Cost",
      "Fixed Cost",
      "Per Day Meal",
      "Meal Rate",
      "Per Day Guest Meal",
      "Per Meal Fixed Cost",
      "Actual Meal Rate",
      "Guest Cost",
    ];

    let d = new Date();
    let date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

    worksheet.mergeCells("A1", "J1");

    worksheet.getColumn('A').width = 10;
    worksheet.getColumn('B').width = 15;
    worksheet.getColumn('C').width = 15;
    worksheet.getColumn('D').width = 15;
    worksheet.getColumn('E').width = 15;
    worksheet.getColumn('F').width = 15;
    worksheet.getColumn('G').width = 15;
    worksheet.getColumn('H').width = 15;
    worksheet.getColumn('I').width = 15;
    worksheet.getColumn('J').width = 15;


    let titleRow = worksheet.getCell("A1");
    titleRow.value = "Day Wise Meal Cost Report (" + moment(fromDate).format('DD-MM-YYYY') + " to " + moment(toDate).format('DD-MM-YYYY') + ") ";
    titleRow.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "#ffff00" },
    };
    titleRow.alignment = { vertical: "middle", horizontal: "center" };



    let headerRow = worksheet.addRow(stockHeader);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "CCCCCC" },
        bgColor: { argb: "" },
      };
      cell.font = {
        bold: true,
        color: { argb: "000000" },
        size: 12,
      };
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
    headerRow.alignment = { wrapText: true, vertical: "middle", horizontal: "center" };

    var slNo = 1;
    var dataRowCount = 3;

    for (var sData of data) {
      let slCell = "A" + dataRowCount;
      worksheet.getCell(slCell).value = slNo;
      worksheet.getCell(slCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(slCell).alignment = { wrapText: true, vertical: "top", horizontal: "center" };

      let dateCell = "B" + dataRowCount;
      worksheet.getCell(dateCell).value = sData.tokenDate;
      worksheet.getCell(dateCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(dateCell).alignment = { wrapText: true, vertical: "top", horizontal: "center" };

      let mealCostCell = "C" + dataRowCount;
      worksheet.getCell(mealCostCell).value = sData.mealCost;
      worksheet.getCell(mealCostCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(mealCostCell).alignment = { wrapText: true, vertical: "top", horizontal: "left" };

      let fixedCostCell = "D" + dataRowCount;
      worksheet.getCell(fixedCostCell).value = sData.mealFixedCost;
      worksheet.getCell(fixedCostCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(fixedCostCell).alignment = { wrapText: true, vertical: "top", horizontal: "center" };


      let perDayMealCell = "E" + dataRowCount;
      worksheet.getCell(perDayMealCell).value = sData.perDayMeal;
      worksheet.getCell(perDayMealCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(perDayMealCell).alignment = { wrapText: true, vertical: "top", horizontal: "center" };



      let mealRateCell = "F" + dataRowCount;
      worksheet.getCell(mealRateCell).value = sData.mealRate;
      worksheet.getCell(mealRateCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(mealRateCell).alignment = { wrapText: true, vertical: "top", horizontal: "center" };


    


      let perDayGuestMealCell = "G" + dataRowCount;
      worksheet.getCell(perDayGuestMealCell).value = sData.dailyGuestMeal;
      worksheet.getCell(perDayGuestMealCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(perDayGuestMealCell).alignment = { wrapText: true, vertical: "top", horizontal: "center" };


      let perMealFixedCostCell = "H" + dataRowCount;
      worksheet.getCell(perMealFixedCostCell).value = sData.perMealFixedCost;
      worksheet.getCell(perMealFixedCostCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(perMealFixedCostCell).alignment = { wrapText: true, vertical: "top", horizontal: "center" };


      let actualMealRateCell = "I" + dataRowCount;
      worksheet.getCell(actualMealRateCell).value = this.getTotalMealCost(sData);
      worksheet.getCell(actualMealRateCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(actualMealRateCell).alignment = { wrapText: true, vertical: "top", horizontal: "center" };



      let guestCostCell = "J" + dataRowCount;
      worksheet.getCell(guestCostCell).value = (this.getTotalMealCost(sData) *  sData.dailyGuestMeal);
      worksheet.getCell(guestCostCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(guestCostCell).alignment = { wrapText: true, vertical: "top", horizontal: "center" };


      

      dataRowCount++;
      slNo++;    }

    // data.forEach((d) => {
    //   let row = worksheet.addRow(d);
    // });

    worksheet.addRow([]);

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, title + ".xlsx");
    });
  }

  getTotalMealCost(rowData: any): number {
    return (Number(rowData.mealRate) + Number(rowData.perMealFixedCost) );
  }


}
