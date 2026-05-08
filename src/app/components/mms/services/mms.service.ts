import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Workbook } from "exceljs";
import * as moment from "moment";
import * as fs from "file-saver";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class MmsService {
  baseUrl = environment.apiUrl + "mms/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");

  constructor(
    private http: HttpClient,
    private token: TokenService,
    private datepipe: DatePipe
  ) { }

  //start  Comment By shuvo

  // GetEmployess(empType: string) {
  //   return this.http.get(
  //     this.baseUrl_ + "EmpInfo/GetEmpInfoByType?empType=" + empType,
  //     {
  //       headers: this.token.headerToken(),
  //     }
  //   );
  // }

  //end Comment by shuvo


  GetGeneratedTokenFromConsoleApp() {
    var obj = null;
    //var baseURL = "http://localhost:5000/api/BroadcastMealData";
    var baseURL = "http://192.168.2.246:5000/api/BroadcastMealData";
    return this.http.post(
      baseURL,
      obj,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetEmployessFromDataBase(empType: string) {
    return this.http.get(
      this.baseUrl_ + "EmpInfo/GetEmpInfoByCompanyType?empType=" + empType,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetMealMonths() {
    return this.http.get(this.baseUrl_ + "EmpInfo/GetMealMonths", {
      headers: this.token.headerToken(),
    });
  }
  GetTokenList() {
    return this.http.get(this.baseUrl_ + "EmpInfo/GetTokenList", {
      headers: this.token.headerToken(),
    });
  }
  GetTokenListForAll(currentDate: any) {
    return this.http.get(
      this.baseUrl_ + "EmpInfo/GetTokenListForAll?currentDate=" + currentDate,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  GetCurrentUserInfo() {
    return this.http.get(this.baseUrl_ + "EmpInfo/GetCurrentUserInfo", {
      headers: this.token.headerToken(),
    });
  }
  GetTokenInfo() {
    return this.http.get(this.baseUrl_ + "EmpInfo/GetEmployeeTokenList", {
      headers: this.token.headerToken(),
    });
  }
  GetMealOptions() {
    return this.http.get(this.baseUrl_ + "EmpInfo/GetMealOptions", {
      headers: this.token.headerToken(),
    });
  }
  SaveMealOptions(obj: any) {
    obj.fromTime = new Date(obj.fromTime);
    obj.toTime = new Date(obj.toTime);
    console.log(obj);
    return this.http.post(this.baseUrl_ + "EmpInfo/SaveMealOptions", obj, {
      headers: this.token.headerToken(),
    });
  }

  MealReceiverSave(obj: any, empList: any[]) {
    var body = {
      ...obj,
      empList: empList,
    };
    return this.http.post(
      this.baseUrl_ + "MealReceiver/SaveMealReceiver",
      body,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  UpdateMealReceiver(obj: any) {
    return this.http.post(
      this.baseUrl_ + "MealReceiver/UpdateMealReceiver",
      obj,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  CreateMealCost(obj: any) {
    return this.http.post(this.baseUrl_ + "MealCost/SaveMealCostr", obj, {
      headers: this.token.headerToken(),
    });
  }
  CreateMealToken(obj: any) {
    return this.http.post(this.baseUrl_ + "EmpInfo/SaveMealToken", obj, {
      headers: this.token.headerToken(),
    });
  }
  CancelMealToken(obj: any) {
    return this.http.post(this.baseUrl_ + "EmpInfo/CancelToken", obj, {
      headers: this.token.headerToken(),
    });
  }
  CancelMealTokenForAdmin(obj: any) {
    return this.http.post(this.baseUrl_ + "EmpInfo/CancelTokenFromAdmin", obj, {
      headers: this.token.headerToken(),
    });
  }
  SaveMealTokenForGuest(obj: any) {
    return this.http.post(
      this.baseUrl_ + "EmpInfo/SaveMealTokenForGuest",
      obj,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  SaveMealTokenForGuestForAdmin(obj: any) {
    return this.http.post(
      this.baseUrl_ + "EmpInfo/SaveMealTokenForGuestForAdmin",
      obj,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  UpdateMealHadTokenForAdmin(obj: any) {
    return this.http.post(
      this.baseUrl_ + "EmpInfo/UpdateMealHadTokenForAdmin",
      obj,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  CreateMealTokenForAll(obj: any) {
    debugger;
    return this.http.post(this.baseUrl_ + "EmpInfo/SaveMealTokenForAll", obj, {
      headers: this.token.headerToken(),
    });
  }

  GetMealCost(monthId: number, yearId: number) {
    return this.http.get(
      this.baseUrl_ +
      "MealCost/GetMealCost?monthId=" +
      monthId +
      "&yearId=" +
      yearId,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetDailyMealCost(monthId: number, yearId: number) {
    return this.http.get(
      this.baseUrl_ +
      "MealCost/GetMealCostDaily?monthId=" +
      monthId +
      "&yearId=" +
      yearId,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetMealCostEmpMonthly(monthId: number, yearId: number, unitId: number) {
    return this.http.get(
      this.baseUrl_ +
      "MealCost/GetMealCostEmpMonthly?monthId=" +
      monthId +
      "&yearId=" +
      yearId +
      "&unitId=" +
      unitId,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  GetEmplDtlMealCostEmpMonthly(
    monthId: number,
    yearId: number,
    employeeId: string
  ) {
    return this.http.get(
      this.baseUrl_ +
      "MealCost/GetEmpDetailsMealCostEmpMonthly?monthId=" +
      monthId +
      "&yearId=" +
      yearId +
      "&employeeId=" +
      employeeId,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  GetDailyMealCostReport(monthId: number, yearId: number, currentDate: Date) {
    return this.http.get(
      this.baseUrl_ +
      "MealCost/GetDailyMealCostReport?monthId=" +
      monthId +
      "&yearId=" +
      yearId +
      "&currentDate=" +
      currentDate,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetMonthlyMealCostSummaryReport(monthId: number, yearId: number) {
    return this.http.get(
      this.baseUrl_ +
      "MealCost/GetMonthlyMealCostSummaryReport?monthId=" +
      monthId +
      "&yearId=" +
      yearId,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  CreateMealCategory(obj: any) {
    return this.http.post(
      this.baseUrl_ + "MealCost/SaveMealItemCategory",
      obj,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  CreateMealItem(obj: any) {
    return this.http.post(this.baseUrl_ + "MealCost/SaveMealItem", obj, {
      headers: this.token.headerToken(),
    });
  }

  GetMealReceiver(monthId: number, yearId: number) {
    return this.http.get(
      this.baseUrl_ +
      "MealReceiver/GetMealReceivere?monthId=" +
      monthId +
      "&yearId=" +
      yearId,

      {
        headers: this.token.headerToken(),
      }
    );
  }
  GetMealCategory() {
    return this.http.get(this.baseUrl_ + "MealCost/GetMealItemCategory", {
      headers: this.token.headerToken(),
    });
  }
  GetMealItem() {
    return this.http.get(this.baseUrl_ + "MealCost/GetMealItem", {
      headers: this.token.headerToken(),
    });
  }
  GetMealItemByCategoryId(id: number) {
    return this.http.get(
      this.baseUrl_ + "MealCost/GetMealItemByCategoryId?id=" + id,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetMealDashboardInfo() {
    return this.http.get(this.baseUrl_ + "EmpInfo/GetMealDashboardInfo", {
      headers: this.token.headerToken(),
    });
  }

  GetAdminDashboardInfo() {
    return this.http.get(this.baseUrl_ + "EmpInfo/GetAdminDashboardInfo",
      {
        headers: this.token.headerToken(),
      });
  }


  GetAdminDashboardLunchTakenInfo() {
    return this.http.get(this.baseUrl_ + "EmpInfo/GetAdminDashboardLunchTakenInfo",
      {
        headers: this.token.headerToken(),
      });
  }

  GetLunchTakenListForAll(currentDate: any) {
    return this.http.get(
      this.baseUrl_ + "EmpInfo/GetLunchTakenListForAll?currentDate=" + currentDate,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetLunchTakenListForAllByDate(currentDate: any) {
    return this.http.get(
      this.baseUrl_ + "EmpInfo/GetLunchTakenListForAllByDate?currentDate=" + currentDate,
      {
        headers: this.token.headerToken(),
      }
    );
  }


  GetAdminDashboardLunchTakenAllInfo() {
    return this.http.get(this.baseUrl_ + "EmpInfo/GetAdminDashboardLunchTakenAllInfo",
      {
        headers: this.token.headerToken(),
      });
  }

  GetAdminDashboardGuestInfo() {
    return this.http.get(this.baseUrl_ + "EmpInfo/GetAdminDashboardGuestInfo",
      {
        headers: this.token.headerToken(),
      });
  }

  GetAdminDashboardGuestInfoByDate(currentDate: any) {
    return this.http.get(this.baseUrl_ + "EmpInfo/GetAdminDashboardGuestInfoByDate?currentDate=" + currentDate,
      {
        headers: this.token.headerToken(),
      });
  }

  //  Save Deactive Meal Receiver
  SaveDeactiveMealReceiver(empList: any[]) {
    var body = {
      empList: empList,
    };
    return this.http.post(
      this.baseUrl_ + "MealReceiver/SaveDeactiveMealReceiver",
      body,
      {
        headers: this.token.headerToken(),
      }
    );
  }


  //Update Deactive MealReceiver
  UpdateDeactiveMealReceiver(empList: any[]) {
    var body = {
      empList: empList,
    };
    return this.http.post(
      this.baseUrl_ + "MealReceiver/UpdateDeactiveMealReceiver",
      body,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  //Get Deactive Meal Receiver List
  GetDeactiveMealReceiverList() {
    return this.http.get(this.baseUrl_ + "MealReceiver/GetDeactiveMealReceiverList", {
      headers: this.token.headerToken(),
    });
  }

  //GetMontlyMealCostSummary
  GetMontlyMealCostSummary(monthId: number, yearId: number) {
    return this.http.get(
      this.baseUrl_ +
      "MealCost/GetMontlyMealCostSummary?monthId=" +
      monthId +
      "&yearId=" +
      yearId,

      {
        headers: this.token.headerToken(),
      }
    );
  }

  //Get Employee Montly Meal Cost Summary
  GetEmployeeMontlyMealCostSummary(
    monthId: number,
    yearId: number,
    employeeId: string
  ) {
    return this.http.get(
      this.baseUrl_ +
      "MealCost/GetEmployeeMontlyMealCostSummary?monthId=" +
      monthId +
      "&yearId=" +
      yearId +
      "&employeeId=" +
      employeeId,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  //Get All Employee Montly Meal CostSummary
  GetAllEmployeeMontlyMealCostSummary(monthId: number, yearId: number, unitId: number) {
    return this.http.get(
      this.baseUrl_ +
      "MealCost/GetAllEmployeeMontlyMealCostSummary?monthId=" +
      monthId +
      "&yearId=" +
      yearId +
      "&unitId=" +
      unitId,
      {
        headers: this.token.headerToken(),
      }
    );
  }


  //AllEmpInfoSyncFromApi
  AllEmpInfoSyncFromApi() {
    return this.http.get(
      this.baseUrl_ +
      "EmpInfo/AllEmpInfoSyncFromApi",
      {
        headers: this.token.headerToken(),
      }
    );
  }

  exportExcelReport(excelData) {
    debugger
    //alert("fired");
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers;
    const data = excelData.data;
    const yearName = excelData.yearName;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet();
    const stockHeader = [
      "SL",
      "Month",
      "Food Cost",
      "Fixed Cost",
      "Total Cost",
      "SCO Guest Meal",
      "SCO Guest Cost",
      "SaRa Guest Meal",
      "Sara Guest Cost",
      "Total Guest Cost",
      "SaRa Meal Count",
      "SaRa Meal Cost",
      "SaRa Employee 40% Contribution",
      "SaRa Net Meal 60% Company Contribution",
      "SCO Net Meal Count",
      "Total Meal",
      "Per Meal Cost",
      "SCO Net Meal Total  Cost",
      "SCO Employee 40% Contribution",
      "SCO Net Meal 60% Company Contribution",
    ];

    let d = new Date();
    let date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

    worksheet.mergeCells("A1", "T1");

    worksheet.getColumn('A').width = 6;
    worksheet.getColumn('B').width = 11;
    worksheet.getColumn('C').width = 11;
    worksheet.getColumn('D').width = 11;
    worksheet.getColumn('E').width = 11;
    worksheet.getColumn('F').width = 11;
    worksheet.getColumn('G').width = 11;
    worksheet.getColumn('H').width = 11;
    worksheet.getColumn('I').width = 11;
    worksheet.getColumn('J').width = 15;
    worksheet.getColumn('K').width = 11;
    worksheet.getColumn('L').width = 11;
    worksheet.getColumn('M').width = 11;
    worksheet.getColumn('M').width = 13;
    worksheet.getColumn('N').width = 15;
    worksheet.getColumn('O').width = 12;
    worksheet.getColumn('P').width = 12;
    worksheet.getColumn('Q').width = 12;
    worksheet.getColumn('R').width = 12;
    worksheet.getColumn('S').width = 13;
    worksheet.getColumn('T').width = 13;


    let titleRow = worksheet.getCell("A1");
    titleRow.value = "Snowtex Corporate Office Meal Costing Report " + yearName;
    titleRow.font = {
      name: "Times New Roman",
      size: 20,
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
        name: "Arial",
        bold: true,
        color: { argb: "000000" },
        size: 10,
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
    var sumFoodCost = 0;
    var sumFixedCost = 0;
    var sumTotalCost = 0;
    var sumScoGuestCost = 0;
    var sumSaraGuestCost = 0;
    var sumTotalGuestCost = 0;
    var sumSaraMealCost = 0;
    var sumSaraEmp40PercentCont = 0;
    var sumSaraCompanyNet60PercentCont = 0;
    var sumScoMealCost = 0;
    var sumScoEmp40PercentCont = 0;
    var sumScoCompanyNet60PercentCont = 0;


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

      let monthName = "B" + dataRowCount;
      worksheet.getCell(monthName).value = sData.monthName;
      worksheet.getCell(monthName).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(monthName).alignment = { wrapText: true, vertical: "top", horizontal: "center" };

      let foodCostCell = "C" + dataRowCount;
      worksheet.getCell(foodCostCell).value = sData.foodCost.toFixed(2);
      worksheet.getCell(foodCostCell).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(foodCostCell).alignment = { wrapText: true, vertical: "top", horizontal: "right" };

      let fixedCost = "D" + dataRowCount;
      worksheet.getCell(fixedCost).value = sData.fixedCost.toFixed(2);
      worksheet.getCell(fixedCost).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(fixedCost).alignment = { wrapText: true, vertical: "top", horizontal: "right" };


      let totalCost = "E" + dataRowCount;
      worksheet.getCell(totalCost).value = sData.totalCost.toFixed(2);
      worksheet.getCell(totalCost).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(totalCost).alignment = { wrapText: true, vertical: "top", horizontal: "right" };



      let scoGuestMeal = "F" + dataRowCount;
      worksheet.getCell(scoGuestMeal).value = sData.scoGuestMeal.toFixed(2);
      worksheet.getCell(scoGuestMeal).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(scoGuestMeal).alignment = { wrapText: true, vertical: "top", horizontal: "right" };


      let scoGuestCost = "G" + dataRowCount;
      worksheet.getCell(scoGuestCost).value = sData.scoGuestCost.toFixed(2);
      worksheet.getCell(scoGuestCost).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(scoGuestCost).alignment = { wrapText: true, vertical: "top", horizontal: "right" };


      let saraGuestMeal = "H" + dataRowCount;
      worksheet.getCell(saraGuestMeal).value = sData.saraGuestMeal.toFixed(2);
      worksheet.getCell(saraGuestMeal).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(saraGuestMeal).alignment = { wrapText: true, vertical: "top", horizontal: "right" };


      let saraGuestCost = "I" + dataRowCount;
      worksheet.getCell(saraGuestCost).value = sData.saraGuestCost.toFixed(2);
      worksheet.getCell(saraGuestCost).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(saraGuestCost).alignment = { wrapText: true, vertical: "top", horizontal: "right" };



      let totalGuestCost = "J" + dataRowCount;
      worksheet.getCell(totalGuestCost).value = sData.totalGuestCost.toFixed(2);
      worksheet.getCell(totalGuestCost).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(totalGuestCost).alignment = { wrapText: true, vertical: "top", horizontal: "right" };


      let saraMealCount = "K" + dataRowCount;
      worksheet.getCell(saraMealCount).value = sData.saraMealCount.toFixed(2);
      worksheet.getCell(saraMealCount).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(saraMealCount).alignment = { wrapText: true, vertical: "top", horizontal: "right" };


      let saraMealCost = "L" + dataRowCount;
      worksheet.getCell(saraMealCost).value = sData.saraMealCost.toFixed(2);
      worksheet.getCell(saraMealCost).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(saraMealCost).alignment = { wrapText: true, vertical: "top", horizontal: "right" };


      let saraEmp40PercentCont = "M" + dataRowCount;
      worksheet.getCell(saraEmp40PercentCont).value = sData.saraEmp40PercentCont.toFixed(2);
      worksheet.getCell(saraEmp40PercentCont).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(saraEmp40PercentCont).alignment = { wrapText: true, vertical: "top", horizontal: "right" };


      let saraCompanyNet60PercentCont = "N" + dataRowCount;
      worksheet.getCell(saraCompanyNet60PercentCont).value = sData.saraCompanyNet60PercentCont.toFixed(2);
      worksheet.getCell(saraCompanyNet60PercentCont).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(saraCompanyNet60PercentCont).alignment = { wrapText: true, vertical: "top", horizontal: "right" };

      let scoMealCount = "O" + dataRowCount;
      worksheet.getCell(scoMealCount).value = sData.scoMealCount.toFixed(2);
      worksheet.getCell(scoMealCount).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(scoMealCount).alignment = { wrapText: true, vertical: "top", horizontal: "right" };


      let totalMeal = "P" + dataRowCount;
      worksheet.getCell(totalMeal).value = sData.totalMeal.toFixed(2);
      worksheet.getCell(totalMeal).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(totalMeal).alignment = { wrapText: true, vertical: "top", horizontal: "right" };


      let perMealCost = "Q" + dataRowCount;
      worksheet.getCell(perMealCost).value = sData.perMealCost.toFixed(2);
      worksheet.getCell(perMealCost).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(perMealCost).alignment = { wrapText: true, vertical: "top", horizontal: "right" };

      let scoMealCost = "R" + dataRowCount;
      worksheet.getCell(scoMealCost).value = sData.scoMealCost.toFixed(2);
      worksheet.getCell(scoMealCost).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(scoMealCost).alignment = { wrapText: true, vertical: "top", horizontal: "right" };

      let scoEmp40PercentCont = "S" + dataRowCount;
      worksheet.getCell(scoEmp40PercentCont).value = sData.scoEmp40PercentCont.toFixed(2);
      worksheet.getCell(scoEmp40PercentCont).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(scoEmp40PercentCont).alignment = { wrapText: true, vertical: "top", horizontal: "right" };


      let scoCompanyNet60PercentCont = "T" + dataRowCount;
      worksheet.getCell(scoCompanyNet60PercentCont).value = sData.scoCompanyNet60PercentCont.toFixed(2);
      worksheet.getCell(scoCompanyNet60PercentCont).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      worksheet.getCell(scoCompanyNet60PercentCont).alignment = { wrapText: true, vertical: "top", horizontal: "right" };


      sumFoodCost += sData.foodCost;
      sumFixedCost += sData.fixedCost;
      sumTotalCost += sData.totalCost;
      sumScoGuestCost += sData.scoGuestCost;
      sumSaraGuestCost += sData.saraGuestCost;
      sumTotalGuestCost += sData.totalGuestCost;
      sumSaraMealCost += sData.saraMealCost;
      sumSaraEmp40PercentCont += sData.saraEmp40PercentCont;
      sumSaraCompanyNet60PercentCont += sData.saraCompanyNet60PercentCont;
      sumScoMealCost += sData.scoMealCost;
      sumScoEmp40PercentCont += sData.scoEmp40PercentCont;
      sumScoCompanyNet60PercentCont += sData.scoCompanyNet60PercentCont;

      dataRowCount++;
      slNo++;
    }

    worksheet.mergeCells("A" + dataRowCount, "B" + dataRowCount);
    let totalCell = "A" + dataRowCount;
    worksheet.getCell(totalCell).value = "TOTAL: ";
    worksheet.getCell(totalCell).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell(totalCell).font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    };
    worksheet.getCell(totalCell).alignment = { vertical: "middle", horizontal: "center" };

    //worksheet.mergeCells("C" + dataRowCount, "T" + dataRowCount);
    let sumFoodCostC = "C" + dataRowCount;
    worksheet.getCell(sumFoodCostC).value = sumFoodCost.toFixed(2);
    worksheet.getCell(sumFoodCostC).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      // right: { style: 'thin' }
    }
    worksheet.getCell(sumFoodCostC).font = {
      name: "Calibri",
      size: 11,
      bold: true,
      color: { argb: "#ffff00" },
    };sumFoodCost
    worksheet.getCell(sumFoodCostC).alignment = { vertical: "middle", horizontal: "right" };

    let fixedCostC = "D" + dataRowCount;
    worksheet.getCell(fixedCostC).value = sumFixedCost.toFixed(2);
    worksheet.getCell(fixedCostC).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      // left: { style: 'thin' },
      // right: { style: 'thin' }
    }
    worksheet.getCell(fixedCostC).font = {
      name: "Calibri",
      size: 11,
      bold: true,
      color: { argb: "#ffff00" },
    };sumFoodCost
    worksheet.getCell(fixedCostC).alignment = { vertical: "middle", horizontal: "right" };


    let totalCost = "E" + dataRowCount;
    worksheet.getCell(totalCost).value = sumTotalCost.toFixed(2);
    worksheet.getCell(totalCost).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      // left: { style: 'thin' },
      // right: { style: 'thin' }
    }
    worksheet.getCell(totalCost).font = {
      name: "Calibri",
      size: 11,
      bold: true,
      color: { argb: "#ffff00" },
    };sumFoodCost
    worksheet.getCell(totalCost).alignment = { vertical: "middle", horizontal: "right" };

    let blankF = "F" + dataRowCount;
    worksheet.getCell(blankF).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      // left: { style: 'thin' },
      // right: { style: 'thin' }
    }

    let scoGuestCost = "G" + dataRowCount;
    worksheet.getCell(scoGuestCost).value = sumScoGuestCost.toFixed(2);
    worksheet.getCell(scoGuestCost).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      // left: { style: 'thin' },
      // right: { style: 'thin' }
    }
    worksheet.getCell(scoGuestCost).font = {
      name: "Calibri",
      size: 11,
      bold: true,
      color: { argb: "#ffff00" },
    };sumFoodCost
    worksheet.getCell(scoGuestCost).alignment = { vertical: "middle", horizontal: "right" };

    let blankH = "H" + dataRowCount;
    worksheet.getCell(blankH).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      // left: { style: 'thin' },
      // right: { style: 'thin' }
    }

    let saraGuestCost = "I" + dataRowCount;
    worksheet.getCell(saraGuestCost).value = sumSaraGuestCost.toFixed(2);
    worksheet.getCell(saraGuestCost).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      // left: { style: 'thin' },
      // right: { style: 'thin' }
    }
    worksheet.getCell(saraGuestCost).font = {
      name: "Calibri",
      size: 11,
      bold: true,
      color: { argb: "#ffff00" },
    };sumFoodCost
    worksheet.getCell(saraGuestCost).alignment = { vertical: "middle", horizontal: "right" };


    let totalGuestCost = "J" + dataRowCount;
    worksheet.getCell(totalGuestCost).value = sumTotalGuestCost.toFixed(2);
    worksheet.getCell(totalGuestCost).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      // left: { style: 'thin' },
      // right: { style: 'thin' }
    }
    worksheet.getCell(totalGuestCost).font = {
      name: "Calibri",
      size: 11,
      bold: true,
      color: { argb: "#ffff00" },
    };sumFoodCost
    worksheet.getCell(totalGuestCost).alignment = { vertical: "middle", horizontal: "right" };
    
    let blankK = "K" + dataRowCount;
    worksheet.getCell(blankK).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      // left: { style: 'thin' },
      // right: { style: 'thin' }
    }

    let saraMealCost = "L" + dataRowCount;
    worksheet.getCell(saraMealCost).value = sumSaraMealCost.toFixed(2);
    worksheet.getCell(saraMealCost).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      // left: { style: 'thin' },
      // right: { style: 'thin' }
    }
    worksheet.getCell(saraMealCost).font = {
      name: "Calibri",
      size: 11,
      bold: true,
      color: { argb: "#ffff00" },
    };sumFoodCost
    worksheet.getCell(saraMealCost).alignment = { vertical: "middle", horizontal: "right" };


    let saraEmp40PercentCont = "M" + dataRowCount;
    worksheet.getCell(saraEmp40PercentCont).value = sumSaraEmp40PercentCont.toFixed(2);
    worksheet.getCell(saraEmp40PercentCont).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      // left: { style: 'thin' },
      // right: { style: 'thin' }
    }
    worksheet.getCell(saraEmp40PercentCont).font = {
      name: "Calibri",
      size: 11,
      bold: true,
      color: { argb: "#ffff00" },
    };sumFoodCost
    worksheet.getCell(saraEmp40PercentCont).alignment = { vertical: "middle", horizontal: "right" };


    let SaraCompanyNet60PercentCont = "N" + dataRowCount;
    worksheet.getCell(SaraCompanyNet60PercentCont).value = sumSaraCompanyNet60PercentCont.toFixed(2);
    worksheet.getCell(SaraCompanyNet60PercentCont).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      // left: { style: 'thin' },
      // right: { style: 'thin' }
    }
    worksheet.getCell(SaraCompanyNet60PercentCont).font = {
      name: "Calibri",
      size: 11,
      bold: true,
      color: { argb: "#ffff00" },
    };sumFoodCost
    worksheet.getCell(SaraCompanyNet60PercentCont).alignment = { vertical: "middle", horizontal: "right" };

    let banO = "O" + dataRowCount;
    worksheet.getCell(banO).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      // left: { style: 'thin' },
      // right: { style: 'thin' }
    }

    let banP = "P" + dataRowCount;
    worksheet.getCell(banP).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      // left: { style: 'thin' },
      // right: { style: 'thin' }
    }

    let bnQ = "Q" + dataRowCount;
    worksheet.getCell(bnQ).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      // left: { style: 'thin' },
      // right: { style: 'thin' }
    }

    let scoMealCost = "R" + dataRowCount;
    worksheet.getCell(scoMealCost).value = sumScoMealCost.toFixed(2);
    worksheet.getCell(scoMealCost).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      // left: { style: 'thin' },
      // right: { style: 'thin' }
    }
    worksheet.getCell(scoMealCost).font = {
      name: "Calibri",
      size: 11,
      bold: true,
      color: { argb: "#ffff00" },
    };sumFoodCost
    worksheet.getCell(scoMealCost).alignment = { vertical: "middle", horizontal: "right" };


    let scoEmp40PercentCont = "S" + dataRowCount;
    worksheet.getCell(scoEmp40PercentCont).value = sumScoEmp40PercentCont.toFixed(2);
    worksheet.getCell(scoEmp40PercentCont).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      // left: { style: 'thin' },
      // right: { style: 'thin' }
    }
    worksheet.getCell(scoEmp40PercentCont).font = {
      name: "Calibri",
      size: 11,
      bold: true,
      color: { argb: "#ffff00" },
    };sumFoodCost
    worksheet.getCell(scoEmp40PercentCont).alignment = { vertical: "middle", horizontal: "right" };

    let scoCompanyNet60PercentCont = "T" + dataRowCount;
    worksheet.getCell(scoCompanyNet60PercentCont).value = sumScoCompanyNet60PercentCont.toFixed(2);
    worksheet.getCell(scoCompanyNet60PercentCont).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      // left: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.getCell(scoCompanyNet60PercentCont).font = {
      name: "Calibri",
      size: 11,
      bold: true,
      color: { argb: "#ffff00" },
    };sumFoodCost
    worksheet.getCell(scoCompanyNet60PercentCont).alignment = { vertical: "middle", horizontal: "right" };


    worksheet.addRow([]);

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, title + ".xlsx");
    });
  }

}
