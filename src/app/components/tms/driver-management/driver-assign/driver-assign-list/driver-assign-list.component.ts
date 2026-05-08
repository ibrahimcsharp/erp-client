import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { DriverAssignedModel } from '../../../model/driver-assigned.model';
import { VehicleManageService } from '../../../service/vehicle-manage.service';
import { DriverAssignCreateComponent } from '../driver-assign-create/driver-assign-create.component';

@Component({
  selector: 'app-driver-assign-list',
  templateUrl: './driver-assign-list.component.html',
  styleUrls: ['./driver-assign-list.component.scss']
})
export class DriverAssignListComponent implements OnInit {
  @ViewChild("CreateTmsDriverAssign") child: DriverAssignCreateComponent;
  ButtonName: string;
  AllDriverAssignmentList: DriverAssignedModel[] = new Array();
  DriverAssignModel: DriverAssignedModel;
  displayCreate: boolean;

  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: VehicleManageService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.LoadDriverAssignment();
    this.cols = [
      { field: 'driverName', header: 'Driver' },
      { field: 'vehicleName', header: 'Vehicle' },
      { field: 'assignFromDate', header: 'Assign From' },
      { field: 'assignToDate', header: 'Assign To' }
    ];

    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
  }

  LoadDriverAssignment() {
    this.service.GetDriverAssignmentList().subscribe(
      (data: any[]) => {
        console.log(data);
        this.AllDriverAssignmentList = data;
        console.log(this.AllDriverAssignmentList);

      },
      (error) => {
        this.toastr.warning("No Data Found", "Driver");
      }
    );
  }

  OpenNew() {
    this.displayCreate = true;
  }

  edit(tmsDriverAssign: DriverAssignedModel) {
    this.child.DriverAssignModel = tmsDriverAssign;
    this.child.InitializeFormFromParent();
    this.child.ButtonName = "Update";
    this.displayCreate = true;
  }
  onChildSubmit() {
    this.displayCreate = false;
  }

  cols: any[];

  exportColumns: any[];

  exportPdf() {
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(this.exportColumns, this.AllDriverAssignmentList);
        doc.save('primengTable.pdf');
      })
    })
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.AllDriverAssignmentList);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "primengTable");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }





}
