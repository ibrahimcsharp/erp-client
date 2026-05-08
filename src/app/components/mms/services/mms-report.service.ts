import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { Workbook } from "exceljs";
import * as fs from "file-saver";
import * as moment from "moment";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: "root",
})
export class MmsReportService {
  generalMenuList: any[];
  healthlyMenuList: any[];

  constructor(private datePipe: DatePipe) { }

  async CashBookStatement(
    receiveList: any[],
    gSco: any[],
    hSco: any[],
    gSara: any[],
    hSara: any[],
    lunchTakenInfo: any[],
    guestInfo: any[],
    tokenCancelEmpList: any[],
    currentDate: any,
    action: string
  ) {
    //console.log(receiveList);
    this.generalMenuList = receiveList.filter((e) => e.mealOption == "G");
    this.healthlyMenuList = receiveList.filter((e) => e.mealOption == "H");

    let docDefinition = {
      footer: function (currentPage, pageCount) {
        return currentPage.toString() + " of " + pageCount;
      },

      content: [
        {
          columns: [
            {
              text: "Snowtex Corporate Office",
              alignment: "center",
              margin: [0, 0, 0, 0],
              fontSize: 16,
            },
          ],
        },
        {
          columns: [
            [
              {
                text: "Meal Enlisted Employees",
                fontSize: 14,
                bold: true,
                alignment: "center",
                decoration: "underline",
                color: "skyblue",
              },
              {
                text:
                  "Date : " +
                  this.datePipe.transform(currentDate, "dd/MM/yyyy"),
                fontSize: 12,
                alignment: "center",
              },
              {
                text: "Total Employees : " + (receiveList.length + guestInfo.length) + " Persons",
                fontSize: 12,
                alignment: "center",
              },
              {
                text: "General Menu (SCO) : " + gSco.length + " Persons",
                fontSize: 12,
                alignment: "center",
              },
              {
                text: "Special Menu (SCO) : " + hSco.length + " Persons",
                fontSize: 12,
                alignment: "center",
              },
              {
                text: "General Menu (SaRa) : " + gSara.length + " Persons",
                fontSize: 12,
                alignment: "center",
              },
              {
                text: "Special Menu (SaRa) : " + hSara.length + " Persons",
                fontSize: 12,
                alignment: "center",
              },
              {
                text: "Lunch Taken Without Punch : " + lunchTakenInfo.length + " Persons",
                fontSize: 12,
                alignment: "center",
              },
              {
                text: "Total Guests : " + guestInfo.length + " Persons",
                fontSize: 12,
                alignment: "center",
              },
              {
                text: "Total Meal Token Cancel: " + tokenCancelEmpList.length + " Persons",
                fontSize: 12,
                alignment: "center",
              },
            ],
          ],
        },

        {
          text: "Employees Details For General Menu (SCO)",
          style: "sectionHeader",
        },
        {
          margin: [0, 0, 0, 5],
          table: {
            headerRows: 1,
            widths: ["*", "auto", "auto"],
            body: [
              [
                {
                  text: "Employee Id",
                  alignment: "left",
                },
                {
                  text: "Employee Name",
                  alignment: "left",
                },
                {
                  text: "Token Number",
                  alignment: "right",
                },
              ],
              ...gSco.map((p) => [
                {
                  text: p.employeeId,
                  alignment: "left",
                },
                {
                  text: p.employeeName,
                  alignment: "left",
                },

                {
                  text: p.tokenNumber,
                  alignment: "right",
                },
              ]),
            ],
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return rowIndex == 0 ? "#CCCCCC" : null;
            },
          },
        },
        {
          text: "Employees Details For Special Menu (SCO)",
          style: "sectionHeader",
        },
        {
          margin: [0, 0, 0, 5],
          table: {
            headerRows: 1,
            widths: ["*", "auto", "auto"],
            body: [
              [
                {
                  text: "Employee Id",
                  alignment: "left",
                },
                {
                  text: "Employee Name",
                  alignment: "left",
                },
                {
                  text: "Token Number",
                  alignment: "right",
                },
              ],
              ...hSco.map((p) => [
                {
                  text: p.employeeId,
                  alignment: "left",
                },
                {
                  text: p.employeeName,
                  alignment: "left",
                },

                {
                  text: p.tokenNumber,
                  alignment: "right",
                },
              ]),
            ],
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return rowIndex == 0 ? "#CCCCCC" : null;
            },
          },
        },
        {
          text: "Employees Details For General Menu (SaRa)",
          style: "sectionHeader",
        },
        {
          margin: [0, 0, 0, 5],
          table: {
            headerRows: 1,
            widths: ["*", "auto", "auto"],
            body: [
              [
                {
                  text: "Employee Id",
                  alignment: "left",
                },
                {
                  text: "Employee Name",
                  alignment: "left",
                },
                {
                  text: "Token Number",
                  alignment: "right",
                },
              ],
              ...gSara.map((p) => [
                {
                  text: p.employeeId,
                  alignment: "left",
                },
                {
                  text: p.employeeName,
                  alignment: "left",
                },

                {
                  text: p.tokenNumber,
                  alignment: "right",
                },
              ]),
            ],
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return rowIndex == 0 ? "#CCCCCC" : null;
            },
          },
        },
        {
          text: "Employees Details For Special Menu (SaRa)",
          style: "sectionHeader",
        },
        {
          margin: [0, 0, 0, 5],
          table: {
            headerRows: 1,
            widths: ["*", "auto", "auto"],
            body: [
              [
                {
                  text: "Employee Id",
                  alignment: "left",
                },
                {
                  text: "Employee Name",
                  alignment: "left",
                },
                {
                  text: "Token Number",
                  alignment: "right",
                },
              ],
              ...hSara.map((p) => [
                {
                  text: p.employeeId,
                  alignment: "left",
                },
                {
                  text: p.employeeName,
                  alignment: "left",
                },

                {
                  text: p.tokenNumber,
                  alignment: "right",
                },
              ]),
            ],
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return rowIndex == 0 ? "#CCCCCC" : null;
            },
          },
        },
        {
          text: "Employees Details Those Are Taken Lunch Without Punch",
          style: "sectionHeader",
        },
        {
          margin: [0, 0, 0, 5],
          table: {
            headerRows: 1,
            widths: ["*", "auto", "auto"],
            body: [
              [
                {
                  text: "Employee Id",
                  alignment: "left",
                },
                {
                  text: "Employee Name",
                  alignment: "left",
                },
                {
                  text: "Token Number",
                  alignment: "right",
                },
              ],
              ...lunchTakenInfo.map((p) => [
                {
                  text: p.employeeId,
                  alignment: "left",
                },
                {
                  text: p.employeeName,
                  alignment: "left",
                },

                {
                  text: p.tokenNumber,
                  alignment: "right",
                },
              ]),
            ],
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return rowIndex == 0 ? "#CCCCCC" : null;
            },
          },
        },
        {
          text: "Guests Details",
          style: "sectionHeader",
        },
        {
          margin: [0, 0, 0, 5],
          table: {
            headerRows: 1,
            widths: ["*", "auto", "auto"],
            body: [
              [
                {
                  text: "Employee Id",
                  alignment: "left",
                },
                {
                  text: "Employee Name",
                  alignment: "left",
                },

                {
                  text: "Guest Type",
                  alignment: "right",
                },
              ],
              ...guestInfo.map((g) => [
                {
                  text: g.employeeId,
                  alignment: "left",
                },
                {
                  text: g.employeeName,
                  alignment: "left",
                },
                {
                  text: g.tokenTypeDes,
                  alignment: "right",
                },
              ]),
            ],
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return rowIndex == 0 ? "#CCCCCC" : null;
            },
          },
        },

        {
          text: "Meal Token Cancel List",
          style: "sectionHeader",
        },
        {
          margin: [0, 0, 0, 5],
          table: {
            headerRows: 1,
            widths: ["*", "auto", "auto"],
            body: [
              [
                {
                  text: "Employee Id",
                  alignment: "left",
                },
                {
                  text: "Employee Name",
                  alignment: "left",
                },

                {
                  text: "Token Number",
                  alignment: "right",
                },
              ],
              ...tokenCancelEmpList.map((tc) => [
                {
                  text: tc.employeeId,
                  alignment: "left",
                },
                {
                  text: tc.employeeName,
                  alignment: "left",
                },
                {
                  text: tc.tokenNumber,
                  alignment: "right",
                },
              ]),
            ],
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return rowIndex == 0 ? "#CCCCCC" : null;
            },
          },
        },

        // {
        //   text: "Employees Details For Healthy Menu",
        //   style: "sectionHeader",
        // },
        // {
        //   margin: [0, 0, 0, 5],
        //   table: {
        //     headerRows: 1,
        //     widths: ["*", "auto", "auto"],
        //     body: [
        //       [
        //         {
        //           text: "Employee Id",
        //           alignment: "left",
        //         },
        //         {
        //           text: "Employee Name",
        //           alignment: "left",
        //         },
        //         {
        //           text: "Token Number",
        //           alignment: "right",
        //         },
        //       ],
        //       ...this.healthlyMenuList.map((p) => [
        //         {
        //           text: p.employeeId,
        //           alignment: "left",
        //         },
        //         {
        //           text: p.employeeName,
        //           alignment: "left",
        //         },

        //         {
        //           text: p.tokenNumber,
        //           alignment: "right",
        //         },
        //       ]),
        //     ],
        //   },
        //   layout: {
        //     fillColor: function (rowIndex, node, columnIndex) {
        //       return rowIndex == 0 ? "#CCCCCC" : null;
        //     },
        //   },
        // },

        {
          margin: [0, 50, 0, 0],
          columns: [
            [
              {
                text: "--------------------------",
                alignment: "right",
                italics: true,
              },
            ],
          ],
        },
        {
          columns: [[{ text: "Signature", alignment: "right", italics: true }]],
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: "underline",
          fontSize: 14,
          margin: [0, 20, 0, 10],
        },
        address: {
          fontSize: 8,
        },

        header: {
          fontSize: 14,
          bold: true,
          alignment: "left",
          margin: [100, 0, 0, 0],
        },
        subheader: {
          fontSize: 10,
          italics: true,
        },
        superMargin: {
          margin: [20, 0, 40, 0],
          fontSize: 15,
        },
      },
    };

    if (action === "download") {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === "print") {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }
  }

  DailyMealCostReport(
    receiveList: any[],
    monthName: any,
    yearName: any,
    action: string
  ) {
    let docDefinition = {
      footer: function (currentPage, pageCount) {
        return currentPage.toString() + " of " + pageCount;
      },

      content: [
        {
          columns: [
            {
              text: "Snowtex Corporate Office",
              alignment: "center",
              margin: [0, 0, 0, 0],
              fontSize: 16,
            },
          ],
        },
        {
          columns: [
            [
              {
                text: "Daily Meal Cost",
                fontSize: 14,
                bold: true,
                alignment: "center",
                decoration: "underline",
                color: "skyblue",
              },
              {
                text:
                  "Month : " + monthName[0].monthName + "'" + yearName[0].label,
                fontSize: 12,
                alignment: "center",
              },
            ],
          ],
        },

        {
          text: "Meal Cost Items",
          style: "sectionHeader",
        },
        {
          margin: [0, 0, 0, 5],
          table: {
            headerRows: 1,
            widths: ["*", "auto", "auto"],
            body: [
              [
                {
                  text: "Item Name",
                  alignment: "left",
                },
                {
                  text: "Entry Date",
                  alignment: "left",
                },
                {
                  text: "Amount",
                  alignment: "right",
                },
              ],
              ...receiveList.map((p) => [
                {
                  text: p.itemName,
                  alignment: "left",
                },
                {
                  text: this.datePipe.transform(p.entryDate, "dd/MM/yyyy"),
                  alignment: "left",
                },

                {
                  text: p.costAmount,
                  alignment: "right",
                },
              ]),
              [
                { text: "Total Cost", colSpan: 2, alignment: "left" },
                {},
                {
                  text: receiveList
                    .reduce((sum, p) => sum + p.costAmount, 0)
                    .toFixed(2),
                  alignment: "right",
                },
              ],
            ],
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return rowIndex == 0 ? "#CCCCCC" : null;
            },
          },
        },

        {
          margin: [0, 50, 0, 0],
          columns: [
            [
              {
                text: "--------------------------",
                alignment: "right",
                italics: true,
              },
            ],
          ],
        },
        {
          columns: [[{ text: "Signature", alignment: "right", italics: true }]],
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: "underline",
          fontSize: 14,
          margin: [0, 20, 0, 10],
        },
        address: {
          fontSize: 8,
        },

        header: {
          fontSize: 14,
          bold: true,
          alignment: "left",
          margin: [100, 0, 0, 0],
        },
        subheader: {
          fontSize: 10,
          italics: true,
        },
        superMargin: {
          margin: [20, 0, 40, 0],
          fontSize: 15,
        },
      },
    };

    if (action === "download") {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === "print") {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }
  }
  MonthlyMealCostReport(
    receiveList: any[],
    monthName: any,
    yearName: any,
    action: string
  ) {
    let docDefinition = {
      footer: function (currentPage, pageCount) {
        return currentPage.toString() + " of " + pageCount;
      },

      content: [
        {
          columns: [
            {
              text: "Snowtex Corporate Office",
              alignment: "center",
              margin: [0, 0, 0, 0],
              fontSize: 16,
            },
          ],
        },
        {
          columns: [
            [
              {
                text: "Monthly Meal Cost",
                fontSize: 14,
                bold: true,
                alignment: "center",
                decoration: "underline",
                color: "skyblue",
              },
              {
                text:
                  "Month : " + monthName[0].monthName + "'" + yearName[0].label,
                fontSize: 12,
                alignment: "center",
              },
            ],
          ],
        },

        {
          text: "Meal Cost Items",
          style: "sectionHeader",
        },
        {
          margin: [0, 0, 0, 5],
          table: {
            headerRows: 1,
            widths: ["*", "auto", "auto"],
            body: [
              [
                {
                  text: "Item Name",
                  alignment: "left",
                },
                {
                  text: "Entry Date",
                  alignment: "left",
                },
                {
                  text: "Amount",
                  alignment: "right",
                },
              ],
              ...receiveList.map((p) => [
                {
                  text: p.itemName,
                  alignment: "left",
                },
                {
                  text: this.datePipe.transform(p.entryDate, "dd/MM/yyyy"),
                  alignment: "left",
                },

                {
                  text: p.costAmount,
                  alignment: "right",
                },
              ]),
              [
                { text: "Total Cost", colSpan: 2, alignment: "left" },
                {},
                {
                  text: receiveList
                    .reduce((sum, p) => sum + p.costAmount, 0)
                    .toFixed(2),
                  alignment: "right",
                },
              ],
            ],
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return rowIndex == 0 ? "#CCCCCC" : null;
            },
          },
        },

        {
          margin: [0, 50, 0, 0],
          columns: [
            [
              {
                text: "--------------------------",
                alignment: "right",
                italics: true,
              },
            ],
          ],
        },
        {
          columns: [[{ text: "Signature", alignment: "right", italics: true }]],
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: "underline",
          fontSize: 14,
          margin: [0, 20, 0, 10],
        },
        address: {
          fontSize: 8,
        },

        header: {
          fontSize: 14,
          bold: true,
          alignment: "left",
          margin: [100, 0, 0, 0],
        },
        subheader: {
          fontSize: 10,
          italics: true,
        },
        superMargin: {
          margin: [20, 0, 40, 0],
          fontSize: 15,
        },
      },
    };

    if (action === "download") {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === "print") {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }
  }

  //Date wise meal cost report
  DateWiseMealCostReport(obj: any, date: any, action: string) {
    let docDefinition = {
      footer: function (currentPage, pageCount) {
        return currentPage.toString() + " of " + pageCount;
      },

      content: [
        {
          columns: [
            {
              text: "Snowtex Corporate Office",
              alignment: "center",
              margin: [0, 0, 0, 0],
              fontSize: 16,
            },
          ],
        },
        {
          columns: [
            [
              {
                text: "Daily Food Menu & Costing Report",
                fontSize: 14,
                bold: true,
                alignment: "center",
                decoration: "underline",
                color: "skyblue",
              },
              {
                text: "Date : " + date,
                fontSize: 12,
                alignment: "center",
              },
            ],
          ],
        },

        {
          text: "Daily Meal Cost Items",
          style: "sectionHeader",
        },
        {
          margin: [0, 0, 0, 5],
          table: {
            headerRows: 1,
            widths: ["*", "auto", "auto"],
            body: [
              [
                {
                  text: "Item Name",
                  alignment: "left",
                },
                {
                  text: "Entry Date",
                  alignment: "left",
                },
                {
                  text: "Amount",
                  alignment: "right",
                },
              ],
              ...obj.dailyCostList.map((p) => [
                {
                  text: p.itemName,
                  alignment: "left",
                },
                {
                  text: this.datePipe.transform(p.entryDate, "dd/MM/yyyy"),
                  alignment: "left",
                },

                {
                  text: p.costAmount,
                  alignment: "right",
                },
              ]),
              [
                { text: "Total Cost", colSpan: 2, alignment: "left" },
                {},
                {
                  text: obj.dailyCostList
                    .reduce((sum, p) => sum + p.costAmount, 0)
                    .toFixed(2),
                  alignment: "right",
                },
              ],
            ],
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return rowIndex == 0 ? "#CCCCCC" : null;
            },
          },
        },
        {
          text: "Daily Meal Cost Summary",
          style: "sectionHeader",
        },
        {
          margin: [0, 0, 0, 5],
          table: {
            headerRows: 1,
            widths: ["*", "auto", "auto", "auto"],
            body: [
              [
                {
                  text: "Items",
                  alignment: "left",
                },
                {
                  text: "Total Cost",
                  alignment: "left",
                },
                {
                  text: "Total Meal",
                  alignment: "right",
                },
                {
                  text: "Per Meal Rate",
                  alignment: "right",
                },
              ],
              [
                {
                  text: "Food Cost",
                  alignment: "left",
                },
                {
                  text: obj.dailyCostList
                    .reduce((sum, p) => sum + p.costAmount, 0)
                    .toFixed(2),
                  alignment: "right",
                },

                {
                  text: obj.currentMealQty,
                  alignment: "right",
                },
                {
                  text: (
                    obj.dailyCostList.reduce(
                      (sum, p) => sum + p.costAmount,
                      0
                    ) / obj.currentMealQty
                  ).toFixed(2),
                  alignment: "right",
                },
              ],
              ...obj.monthlyCostList.map((p) => [
                {
                  text: p.itemName,
                  alignment: "left",
                },

                {
                  text: p.costAmount.toFixed(2),
                  alignment: "right",
                },
                {
                  text: obj.currentMealQty,
                  alignment: "right",
                },
                {
                  text: (p.costAmount / obj.currentMealQty / 30).toFixed(2),
                  alignment: "right",
                },
              ]),
              [
                { text: "Total Per Meal Rate", colSpan: 3, alignment: "left" },
                {},
                {},
                {
                  text: (
                    Number(
                      obj.dailyCostList.reduce(
                        (sum, p) => sum + p.costAmount,
                        0
                      ) / obj.currentMealQty
                    ) +
                    Number(
                      obj.monthlyCostList.reduce(
                        (sum, p) => sum + p.costAmount,
                        0
                      ) / obj.currentMealQty
                    ) /
                    30
                  ).toFixed(2),
                  alignment: "right",
                },
              ],
              [
                {
                  text: "Company Contribution - 60%",
                  colSpan: 3,
                  alignment: "left",
                },
                {},
                {},
                {
                  text: (
                    ((Number(
                      obj.dailyCostList.reduce(
                        (sum, p) => sum + p.costAmount,
                        0
                      ) / obj.currentMealQty
                    ) +
                      Number(
                        obj.monthlyCostList.reduce(
                          (sum, p) => sum + p.costAmount,
                          0
                        ) / obj.currentMealQty
                      ) /
                      30) *
                      60) /
                    100
                  ).toFixed(2),
                  alignment: "right",
                },
              ],
              [
                {
                  text: "Person Contribution - 40%",
                  colSpan: 3,
                  alignment: "left",
                },
                {},
                {},
                {
                  text: (
                    ((Number(
                      obj.dailyCostList.reduce(
                        (sum, p) => sum + p.costAmount,
                        0
                      ) / obj.currentMealQty
                    ) +
                      Number(
                        obj.monthlyCostList.reduce(
                          (sum, p) => sum + p.costAmount,
                          0
                        ) / obj.currentMealQty
                      ) /
                      30) *
                      40) /
                    100
                  ).toFixed(2),
                  alignment: "right",
                },
              ],
            ],
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return rowIndex == 0 ? "#CCCCCC" : null;
            },
          },
        },

        {
          margin: [0, 50, 0, 0],
          columns: [
            [
              {
                text: "--------------------------",
                alignment: "right",
                italics: true,
              },
            ],
          ],
        },
        {
          columns: [[{ text: "Signature", alignment: "right", italics: true }]],
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: "underline",
          fontSize: 14,
          margin: [0, 20, 0, 10],
        },
        address: {
          fontSize: 8,
        },

        header: {
          fontSize: 14,
          bold: true,
          alignment: "left",
          margin: [100, 0, 0, 0],
        },
        subheader: {
          fontSize: 10,
          italics: true,
        },
        superMargin: {
          margin: [20, 0, 40, 0],
          fontSize: 15,
        },
      },
    };

    if (action === "download") {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === "print") {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }
  }
  exportExcel(excelData) {
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers;
    console.log(header);
    const data = excelData.data;
    console.log(data);

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Monthly Employee Wise Meal Report");
    const stockHeader = [
      "Month",
      "Year",
      "Meal Date",
      "Employee Id",
      "Employee Name",
      "Unit",
      "Total Meal",
      "Monthly Meal Rate",
      "Per Employee Payable",
      "Per Day Cost",
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
    EmployeeNameRow.value = header.employeeId;
    EmployeeNameRow.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "#ffff00" },
    };
    EmployeeNameRow.alignment = { vertical: "middle", horizontal: "center" };

    worksheet.mergeCells("A3", "J3");
    let MonthRow = worksheet.getCell("A3");
    MonthRow.value = header.monthName + "'" + header.yearName;
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
  exportExcel2(excelData) {
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers;
    const data = excelData.data;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(
      "Monthly Per Employee Wise Meal Report"
    );
    const stockHeader = [
      "Month",
      "Year",
      "Employee Id",
      "Employee Name",
      "Unit",
      "Total Meal Without Official Guest",
      "Personal Guest",
      "Official Guest",
      "Monthly Meal Rate",
      "Per Employee Payable",
    ];

    let d = new Date();
    let date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

    worksheet.mergeCells("A1", "H1");
    let companyRow = worksheet.getCell("A1");
    companyRow.value = "Monthly Per Employee Wise Meal Report";
    companyRow.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "#ffff00" },
    };
    companyRow.alignment = { vertical: "middle", horizontal: "center" };

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
  exportDailyFoodInfo(excelData) {
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers;
    const data = excelData.data;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(
      "Daily Food Declaration Info"
    );
    const stockHeader = [
      "Create Date",
      "Food Type",
      "Food Description",
      "Token Generate Start Date",
      "Token Generate End Date",
      "Remarks",
    ];

    let d = new Date();
    let date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

    worksheet.mergeCells("A1", "H1");
    let companyRow = worksheet.getCell("A1");
    companyRow.value = "Daily Food Declaration Info";
    companyRow.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "#ffff00" },
    };
    companyRow.alignment = { vertical: "middle", horizontal: "center" };

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
  ExportMealItems(excelData) {
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers;
    const data = excelData.data;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(
      "Meal Items"
    );
    const stockHeader = [
      "Categoty Name",
      "Item Name",
      "Remarks",
    ];

    let d = new Date();
    let date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

    worksheet.mergeCells("A1", "H1");
    let companyRow = worksheet.getCell("A1");
    companyRow.value = "Daily Food Declaration Info";
    companyRow.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "#ffff00" },
    };
    companyRow.alignment = { vertical: "middle", horizontal: "center" };

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


  exportExcelSummaryReport(excelData) {

    const title = excelData.title;
    const header = excelData.headers;
    const data = excelData.data;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(
      "Monthly Meal Cost Summary Report"
    );
    const stockHeader = [
      "Name Or Type",
      "No. of Meal",
      "Monthly Food Cost",
      "Monthly Fixed Cost",
      "Total Monthly Meal Cost",
      "Payable Amount",
      "Comment",
    ];

    let d = new Date();
    let date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

    worksheet.mergeCells("A1", "G1");
    let companyRow = worksheet.getCell("A1");
    companyRow.value = "Monthly Meal Cost Summary Report (" + date + ")";
    companyRow.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "#ffff00" },
    };
    companyRow.alignment = { vertical: "middle", horizontal: "center" };

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


  exportExcelEmployeeMealSummaryReport(excelData) {
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers;
    console.log(header);
    const data = excelData.data;
    console.log(data);

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Monthly Employee Wise Meal Report");
    const stockHeader = [
      "Month",
      "Year",
      "Meal Date",
      "Employee Id",
      "Employee Name",
      "Daily Food Cost",
      "Daily Total Token",
      "Food Rate",
      "Meal Fixed Cost",
      "Total Meal",
      "Per Meal Fixed Cost",
      "Per Meal Total Cost",
      "Per Emp Payable"
    ];

    let d = new Date();
    let date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

    worksheet.mergeCells("A1", "M1");
    let companyRow = worksheet.getCell("A1");
    companyRow.value = header.unitName;
    companyRow.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "#ffff00" },
    };
    companyRow.alignment = { vertical: "middle", horizontal: "center" };

    worksheet.mergeCells("A2", "M2");
    let EmployeeNameRow = worksheet.getCell("A2");
    EmployeeNameRow.value = header.employeeId;
    EmployeeNameRow.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "#ffff00" },
    };
    EmployeeNameRow.alignment = { vertical: "middle", horizontal: "center" };

    worksheet.mergeCells("A3", "J3");
    let MonthRow = worksheet.getCell("A3");
    MonthRow.value = header.monthName + "'" + header.yearName;
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


  exportExcel12(excelData) {
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers;
    const data = excelData.data;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(
      "Monthly Per Employee Wise Meal Report"
    );
    const stockHeader = [
      "Month",
      "Year",
      "Employee Id",
      "Employee Name",
      "Unit",
      "Total Meal This Month",
      "Monthly Total Food Cost",
      "Meal Fixed Cost",
      "Total Meal",
      "Monthly Per Emp Total Cost",
      "Monthly Per Emp Payable"
    ];

    let d = new Date();
    let date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

    worksheet.mergeCells("A1", "H1");
    let companyRow = worksheet.getCell("A1");
    companyRow.value = "Monthly Per Employee Wise Meal Report";
    companyRow.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "#ffff00" },
    };
    companyRow.alignment = { vertical: "middle", horizontal: "center" };

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

  async GetDailyMealRecReportExcel(
    receiveList: any[],
    gSco: any[],
    hSco: any[],
    gSara: any[],
    hSara: any[],
    lunchTakenInfo: any[],
    guestInfo: any[],
    tokenCancelEmpList: any[],
    action: string
  ) {
    const title = "Daily Meal Receiver List";
    const reportTitle = "Snowtex Corporate Office";
    const reportSubTitle = "Meal Enlisted Employees";

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet();
    let date = moment(new Date()).format('DD/MM/yyyy');



    const employeeHeader = [
      "Employee Id",
      "Employee Name",
      "Token Number",
    ];

    for (let i = 1; i <= 12; i++) {
      worksheet.mergeCells("A" + i, "C" + i);
    }

    worksheet.getColumn('A').width = 30;
    worksheet.getColumn('B').width = 40;
    worksheet.getColumn('C').width = 30;

    let reportTitleRow = worksheet.getCell("A1");
    reportTitleRow.value = reportTitle;
    reportTitleRow.font = {
      name: "Calibri",
      size: 17,
      bold: true,
      color: { argb: "#ffff00" },
    };
    reportTitleRow.alignment = { vertical: "middle", horizontal: "center" };

    let reportSubTitleRows = worksheet.getCell("A2");
    reportSubTitleRows.value = reportSubTitle;
    reportSubTitleRows.font = {
      name: "Calibri",
      size: 15,
      bold: true,
      color: { argb: "#ffff00" },
    };
    reportSubTitleRows.alignment = { vertical: "middle", horizontal: "center" };

    let dateRow = worksheet.getCell("A3");
    dateRow.value = "DATE: " + date;
    dateRow.font = {
      name: "Calibri",
      size: 13,
      bold: true,
      color: { argb: "#ffff00" },
    };
    dateRow.alignment = { vertical: "middle", horizontal: "center" };


    let totalEmpRow = worksheet.getCell("A4");
    totalEmpRow.value = "Total Meal: " + (receiveList.length + guestInfo.length ) + " Persons";
    totalEmpRow.font = {
      name: "Calibri",
      size: 13,
      bold: false,
      color: { argb: "#ffff00" },
    };
    totalEmpRow.alignment = { vertical: "middle", horizontal: "center" };

    let gMenuScoRow = worksheet.getCell("A5");
    gMenuScoRow.value = "General Menu (SCO): " + gSco.length + " Persons";
    gMenuScoRow.font = {
      name: "Calibri",
      size: 13,
      bold: false,
      color: { argb: "#ffff00" },
    };
    gMenuScoRow.alignment = { vertical: "middle", horizontal: "center" };

    let sMenuScoRow = worksheet.getCell("A6");
    sMenuScoRow.value = "Special Menu (SCO): " + hSco.length + " Persons";
    sMenuScoRow.font = {
      name: "Calibri",
      size: 13,
      bold: false,
      color: { argb: "#ffff00" },
    };
    sMenuScoRow.alignment = { vertical: "middle", horizontal: "center" };


    let gMenuSaraRow = worksheet.getCell("A7");
    gMenuSaraRow.value = "General Menu (SaRa): " + gSara.length + " Persons";
    gMenuSaraRow.font = {
      name: "Calibri",
      size: 13,
      bold: false,
      color: { argb: "#ffff00" },
    };
    gMenuSaraRow.alignment = { vertical: "middle", horizontal: "center" };


    let sMenuSaraRow = worksheet.getCell("A8");
    sMenuSaraRow.value = "Special Menu (SaRa): " + hSara.length + " Persons";
    sMenuSaraRow.font = {
      name: "Calibri",
      size: 13,
      bold: false,
      color: { argb: "#ffff00" },
    };
    sMenuSaraRow.alignment = { vertical: "middle", horizontal: "center" };

    let lunchTakenRow = worksheet.getCell("A9");
    lunchTakenRow.value = "Lunch Taken Without Punch: " + lunchTakenInfo.length + " Persons";
    lunchTakenRow.font = {
      name: "Calibri",
      size: 13,
      bold: false,
      color: { argb: "#ffff00" },
    };
    lunchTakenRow.alignment = { vertical: "middle", horizontal: "center" };

    let totalGuestRow = worksheet.getCell("A10");
    totalGuestRow.value = "Total Guests: " + guestInfo.length + " Persons";
    totalGuestRow.font = {
      name: "Calibri",
      size: 13,
      bold: false,
      color: { argb: "#ffff00" },
    };
    totalGuestRow.alignment = { vertical: "middle", horizontal: "center" };

    let totalCancelMealRow = worksheet.getCell("A11");
    totalCancelMealRow.value = "Total Meal Token Cancel: " + tokenCancelEmpList.length + " Persons";
    totalCancelMealRow.font = {
      name: "Calibri",
      size: 13,
      bold: false,
      color: { argb: "#ffff00" },
    };
    totalCancelMealRow.alignment = { vertical: "middle", horizontal: "center" };


    // //------------------------------------------------------------------------------
    // //=========================== SCO General Menu =================================
    let tableTitleRow = worksheet.getCell("A12");
    tableTitleRow.value = "Employees Details For General Menu (SCO)";
    tableTitleRow.font = {
      name: "Calibri",
      size: 13,
      bold: true,
      color: { argb: "#000000" },
    };
    tableTitleRow.alignment = { vertical: "middle", horizontal: "left" };

    let headerRow = worksheet.addRow(employeeHeader);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "CCCCCC" },
        bgColor: { argb: "" },
      };
      cell.font = {
        name: "Calibri",
        bold: true,
        color: { argb: "000000" },
        size: 12,
      };
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
    });
    headerRow.alignment = { vertical: "middle", horizontal: "center" };

    var empDataRowCount = 14;
    if (gSco.length > 0) {
      debugger
      for (var emp of gSco) {
        let empIdCell = "A" + empDataRowCount;
        worksheet.getCell(empIdCell).value = emp.employeeId;
        worksheet.getCell(empIdCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(empIdCell).alignment = { vertical: "middle", horizontal: "left" };

        let empNameCell = "B" + empDataRowCount;
        worksheet.getCell(empNameCell).value = emp.employeeName;
        worksheet.getCell(empNameCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(empNameCell).alignment = { vertical: "middle", horizontal: "left" };

        let empTokenCell = "C" + empDataRowCount;
        worksheet.getCell(empTokenCell).value = emp.tokenNumber;
        worksheet.getCell(empTokenCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(empTokenCell).alignment = { vertical: "middle", horizontal: "left" };

        empDataRowCount++;
      }
    }

    // //------------------------------------------------------------------------------
    // //=========================== SCO Special Menu =================================
    let table2TitleRow = worksheet.getCell("A" + (empDataRowCount + 1));
    table2TitleRow.value = "Employees Details For Special Menu (SCO)";
    table2TitleRow.font = {
      name: "Calibri",
      size: 13,
      bold: true,
      color: { argb: "#000000" },
    };
    table2TitleRow.alignment = { vertical: "middle", horizontal: "left" };

    let headerRow2 = worksheet.addRow(employeeHeader);
    headerRow2.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "CCCCCC" },
        bgColor: { argb: "" },
      };
      cell.font = {
        name: "Calibri",
        bold: true,
        color: { argb: "000000" },
        size: 12,
      };
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
    });
    headerRow2.alignment = { vertical: "middle", horizontal: "center" };

    var empHScoDataRowCount = empDataRowCount + 3;
    if (hSco.length > 0) {
      for (var emp of hSco) {
        let empIdCell = "A" + empHScoDataRowCount;
        worksheet.getCell(empIdCell).value = emp.employeeId;
        worksheet.getCell(empIdCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(empIdCell).alignment = { vertical: "middle", horizontal: "left" };

        let empNameCell = "B" + empHScoDataRowCount;
        worksheet.getCell(empNameCell).value = emp.employeeName;
        worksheet.getCell(empNameCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(empNameCell).alignment = { vertical: "middle", horizontal: "left" };

        let empTokenCell = "C" + empHScoDataRowCount;
        worksheet.getCell(empTokenCell).value = emp.tokenNumber;
        worksheet.getCell(empTokenCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(empTokenCell).alignment = { vertical: "middle", horizontal: "left" };

        empHScoDataRowCount++;
      }
    }


    // //------------------------------------------------------------------------------
    // //=========================== SaRa General Menu ================================
    let table3TitleRow = worksheet.getCell("A" + (empHScoDataRowCount + 1));
    table3TitleRow.value = "Employees Details For General Menu (SaRa)";
    table3TitleRow.font = {
      name: "Calibri",
      size: 13,
      bold: true,
      color: { argb: "#000000" },
    };
    table3TitleRow.alignment = { vertical: "middle", horizontal: "left" };

    let headerRow3 = worksheet.addRow(employeeHeader);
    headerRow3.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "CCCCCC" },
        bgColor: { argb: "" },
      };
      cell.font = {
        name: "Calibri",
        bold: true,
        color: { argb: "000000" },
        size: 12,
      };
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
    });
    headerRow3.alignment = { vertical: "middle", horizontal: "center" };

    var empSaraDataRowCount = empHScoDataRowCount + 3;
    if (gSara.length > 0) {
      for (var emp of gSara) {
        let empIdCell = "A" + empSaraDataRowCount;
        worksheet.getCell(empIdCell).value = emp.employeeId;
        worksheet.getCell(empIdCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(empIdCell).alignment = { vertical: "middle", horizontal: "left" };

        let empNameCell = "B" + empSaraDataRowCount;
        worksheet.getCell(empNameCell).value = emp.employeeName;
        worksheet.getCell(empNameCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(empNameCell).alignment = { vertical: "middle", horizontal: "left" };

        let empTokenCell = "C" + empSaraDataRowCount;
        worksheet.getCell(empTokenCell).value = emp.tokenNumber;
        worksheet.getCell(empTokenCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(empTokenCell).alignment = { vertical: "middle", horizontal: "left" };

        empSaraDataRowCount++;
      }
    }


    // //------------------------------------------------------------------------------
    // //=========================== SaRa Special Menu ================================
    let table4TitleRow = worksheet.getCell("A" + (empSaraDataRowCount + 1));
    table4TitleRow.value = "Employees Details For Special Menu (SaRa)";
    table4TitleRow.font = {
      name: "Calibri",
      size: 13,
      bold: true,
      color: { argb: "#000000" },
    };
    table4TitleRow.alignment = { vertical: "middle", horizontal: "left" };

    let headerRow4 = worksheet.addRow(employeeHeader);
    headerRow4.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "CCCCCC" },
        bgColor: { argb: "" },
      };
      cell.font = {
        name: "Calibri",
        bold: true,
        color: { argb: "000000" },
        size: 12,
      };
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
    });
    headerRow4.alignment = { vertical: "middle", horizontal: "center" };

    var empSaraSpDataRowCount = empSaraDataRowCount + 3;
    if (hSara.length > 0) {
      for (var emp of hSara) {
        let empIdCell = "A" + empSaraSpDataRowCount;
        worksheet.getCell(empIdCell).value = emp.employeeId;
        worksheet.getCell(empIdCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(empIdCell).alignment = { vertical: "middle", horizontal: "left" };

        let empNameCell = "B" + empSaraSpDataRowCount;
        worksheet.getCell(empNameCell).value = emp.employeeName;
        worksheet.getCell(empNameCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(empNameCell).alignment = { vertical: "middle", horizontal: "left" };

        let empTokenCell = "C" + empSaraSpDataRowCount;
        worksheet.getCell(empTokenCell).value = emp.tokenNumber;
        worksheet.getCell(empTokenCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(empTokenCell).alignment = { vertical: "middle", horizontal: "left" };

        empSaraSpDataRowCount++;
      }
    }

    // //------------------------------------------------------------------------------
    // //=============== Taken Lunch Without Punch (SCO & SaRa) =======================
    let table5TitleRow = worksheet.getCell("A" + (empSaraSpDataRowCount + 1));
    table5TitleRow.value = "Employees Details Those Are Taken Lunch Without Punch";
    table5TitleRow.font = {
      name: "Calibri",
      size: 13,
      bold: true,
      color: { argb: "#000000" },
    };
    table5TitleRow.alignment = { vertical: "middle", horizontal: "left" };

    let headerRow5 = worksheet.addRow(employeeHeader);
    headerRow5.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "CCCCCC" },
        bgColor: { argb: "" },
      };
      cell.font = {
        name: "Calibri",
        bold: true,
        color: { argb: "000000" },
        size: 12,
      };
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
    });
    headerRow5.alignment = { vertical: "middle", horizontal: "center" };

    var empLunchTakenDataRowCount = empSaraSpDataRowCount + 3;
    if (lunchTakenInfo.length > 0) {
      for (var emp of lunchTakenInfo) {
        let empIdCell = "A" + empLunchTakenDataRowCount;
        worksheet.getCell(empIdCell).value = emp.employeeId;
        worksheet.getCell(empIdCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(empIdCell).alignment = { vertical: "middle", horizontal: "left" };

        let empNameCell = "B" + empLunchTakenDataRowCount;
        worksheet.getCell(empNameCell).value = emp.employeeName;
        worksheet.getCell(empNameCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(empNameCell).alignment = { vertical: "middle", horizontal: "left" };

        let empTokenCell = "C" + empLunchTakenDataRowCount;
        worksheet.getCell(empTokenCell).value = emp.tokenNumber;
        worksheet.getCell(empTokenCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(empTokenCell).alignment = { vertical: "middle", horizontal: "left" };

        empLunchTakenDataRowCount++;
      }
    }

    // //------------------------------------------------------------------------------
    // //====================== Lunch Data for Guests =================================
    let table6TitleRow = worksheet.getCell("A" + (empLunchTakenDataRowCount + 1));
    table6TitleRow.value = "Guests Details";
    table6TitleRow.font = {
      name: "Calibri",
      size: 13,
      bold: true,
      color: { argb: "#000000" },
    };
    table6TitleRow.alignment = { vertical: "middle", horizontal: "left" };

    const employeeGHeader = [
      "Employee Id",
      "Employee Name",
      "Guest Type",
    ];
    let headerRow6 = worksheet.addRow(employeeGHeader);
    headerRow6.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "CCCCCC" },
        bgColor: { argb: "" },
      };
      cell.font = {
        name: "Calibri",
        bold: true,
        color: { argb: "000000" },
        size: 12,
      };
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
    });
    headerRow6.alignment = { vertical: "middle", horizontal: "center" };

    var empGuestsDataRowCount = empLunchTakenDataRowCount + 3;
    if (guestInfo.length > 0) {
      for (var emp of guestInfo) {
        let empIdCell = "A" + empGuestsDataRowCount;
        worksheet.getCell(empIdCell).value = emp.employeeId;
        worksheet.getCell(empIdCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(empIdCell).alignment = { vertical: "middle", horizontal: "left" };

        let empNameCell = "B" + empGuestsDataRowCount;
        worksheet.getCell(empNameCell).value = emp.employeeName;
        worksheet.getCell(empNameCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(empNameCell).alignment = { vertical: "middle", horizontal: "left" };

        let empTokenCell = "C" + empGuestsDataRowCount;
        worksheet.getCell(empTokenCell).value = emp.tokenTypeDes;
        worksheet.getCell(empTokenCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(empTokenCell).alignment = { vertical: "middle", horizontal: "left" };

        empGuestsDataRowCount++;
      }
    }


    // //------------------------------------------------------------------------------
    // //====================== Lunch Token Cancel Data ===============================
    let table7TitleRow = worksheet.getCell("A" + (empGuestsDataRowCount + 1));
    table7TitleRow.value = "Meal Token Cancel List";
    table7TitleRow.font = {
      name: "Calibri",
      size: 13,
      bold: true,
      color: { argb: "#000000" },
    };
    table7TitleRow.alignment = { vertical: "middle", horizontal: "left" };

 
    let headerRow7 = worksheet.addRow(employeeHeader);
    headerRow7.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "CCCCCC" },
        bgColor: { argb: "" },
      };
      cell.font = {
        name: "Calibri",
        bold: true,
        color: { argb: "000000" },
        size: 12,
      };
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
    });
    headerRow7.alignment = { vertical: "middle", horizontal: "center" };

    var empCancelMealDataRowCount = empGuestsDataRowCount + 3;
    if (tokenCancelEmpList.length > 0) {
      for (var emp of tokenCancelEmpList) {
        let empIdCell = "A" + empCancelMealDataRowCount;
        worksheet.getCell(empIdCell).value = emp.employeeId;
        worksheet.getCell(empIdCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(empIdCell).alignment = { vertical: "middle", horizontal: "left" };

        let empNameCell = "B" + empCancelMealDataRowCount;
        worksheet.getCell(empNameCell).value = emp.employeeName;
        worksheet.getCell(empNameCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(empNameCell).alignment = { vertical: "middle", horizontal: "left" };

        let empTokenCell = "C" + empCancelMealDataRowCount;
        worksheet.getCell(empTokenCell).value = emp.tokenNumber;
        worksheet.getCell(empTokenCell).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
        worksheet.getCell(empTokenCell).alignment = { vertical: "middle", horizontal: "left" };

        empCancelMealDataRowCount++;
      }
    }

    worksheet.addRow([]);

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, title + ".xlsx");
    });

  }

}
