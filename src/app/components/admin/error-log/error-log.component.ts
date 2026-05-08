import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../merchandising/Common-Services/common-service.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-error-log',
  templateUrl: './error-log.component.html',
  styleUrls: ['./error-log.component.scss']
})
export class ErrorLogComponent implements OnInit {

  lstErrorLog: any[] = [];
  isExpanded: boolean[] = [];

  constructor(
    public commonService: CommonServiceService,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) { }


  ngOnInit(): void {
    this.GetAllErrorLog();
  }

  GetAllErrorLog() {
    this.commonService.GetErrorLogList().subscribe((res: any[]) => {
      this.lstErrorLog = res;
      for (let i = 0; i < this.lstErrorLog.length; i++) {
        this.isExpanded[i] = false;
      }
      this.lstErrorLog.forEach((erl) => {
        const parsedDate = new Date(erl.createdDate); // Parse if needed
        erl.createdDate = this.datePipe.transform(parsedDate, 'dd-MM-yyyy');

      })

    },
      (error) => {
        this.toastr.error("Can not fetch", "Error Log Info");
      }
    );
  }

  toggleDescription(index: number) {
    this.isExpanded[index] = !this.isExpanded[index];
  }


  // not working code from Izab vae
  maxChars = 50;

  DescriptionExpandedRows: Set<any> = new Set();
  truncateDescription(text: string): string {
    if (text == null) {
      text = "";
    }
    return text.length > this.maxChars ? text.slice(0, this.maxChars) + '...' : text;
  }

  isDescriptionExpanded(item: any): boolean {
    if (item.description != null) {
      return this.DescriptionExpandedRows.has(item);
    }
    else {
      this.DescriptionExpandedRows = new Set();
    }
  }

  toggleDescriptionExpansion(item: any): void {
    if (this.isDescriptionExpanded(item)) {
      this.DescriptionExpandedRows.delete(item);
    } else {
      this.DescriptionExpandedRows.add(item);
    }
  }

}