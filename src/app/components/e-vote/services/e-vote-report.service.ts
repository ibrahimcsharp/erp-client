import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Workbook } from "exceljs";
import * as fs from "file-saver";

@Injectable({
  providedIn: 'root'
})
export class EVoteReportService {

  constructor(private datePipe: DatePipe) { }

  getEmployeeWiseVoteReport(excelData) {
      //Title, Header & Data
      const title = excelData.title;
      const header = excelData.headers;
      console.log(header);
      const data = excelData.data;
      console.log(data);
  
      //Create a workbook with a worksheet
      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet("Employee Wise Vote Report");
      const stockHeader = [
        "EMPLOYEE_ID",
        "EMPLOYEE_NAME",
        "COMPANY_NAME",
        "DEPARTMENT",
        "SECTION",
        "VOTE_BY",
        "CATEGORY_NAME",
        "COMMENTS"
      ];

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
}
