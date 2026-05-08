import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskCommonService } from '../../../services/task.common.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-task-report',
  templateUrl: './task-report.component.html',
  styleUrls: ['./task-report.component.scss']
})
export class TaskReportComponent implements OnInit {
  reactiveForm: FormGroup;
  constructor(private fb: FormBuilder,
    public datePipe: DatePipe,
    public taskCommonService: TaskCommonService,
    public taskservice: TaskService) { }

  ngOnInit(): void {
    this.taskCommonService.GetDepartmentCompanyWise();
    this.createForm();
  }

  createForm() {
    this.reactiveForm = this.fb.group({
      fromDate: [this.datePipe.transform(new Date(), "yyyy-MM-ddd"), Validators.required],
      toDate: [this.datePipe.transform(new Date(), "yyyy-MM-ddd"), Validators.required],
      employeeId: [""],
      department: [""],
      section: [""]
    });
  }

  OnSelectDepartment(event: TypeaheadMatch): void {
    this.reactiveForm.patchValue({
      department: event.item.departmentName,
    });
    this.taskCommonService.GetSectionsByDepartment(event.item.departmentName);
  }

  noResult = false;
  DepartmentSelectNoResults(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.reactiveForm.patchValue({
        department: "",
      });
      const control = this.reactiveForm.get("department");
      control.markAsTouched({ onlySelf: true });
    }
  }

  OnSelectSection(event: TypeaheadMatch): void {
    this.reactiveForm.patchValue({
      section: event.item.sectionName,
    });
  }

  noResultSection = false;
  SectionSelectNoResults(event: boolean): void {
    this.noResultSection = event;
    if (this.noResultSection == true) {
      this.reactiveForm.patchValue({
        section: "",
      });
      const control = this.reactiveForm.get("section");
      control.markAsTouched({ onlySelf: true });
    }
  }
  resultList: any[];
  Process() {
    //console.log(this.reactiveForm.value);
    this.taskservice.GetTaskReport(this.reactiveForm.value.fromDate,this.reactiveForm.value.toDate,this.reactiveForm.value.department,this.reactiveForm.value.section,this.reactiveForm.value.employeeId).subscribe((res: any[]) => {
      this.resultList = res;
      

    }, error => {
      this.resultList = [];

    })
  }

  dataForExcel = [];
  Data = [];
  exportExcel() {
    //alert("hitted");
    for (var i = 0; i < this.resultList.length; i++) {
      var empInfo = {
        id: this.resultList[i].id,
        title: this.resultList[i].title,
        description: this.resultList[i].description,
        responsibleDeptName: this.resultList[i].responsibleDeptName,
        responsibleSectionName: this.resultList[i].responsibleSectionName,
        taskCreatorName: this.resultList[i].taskCreatorName,
        createDate: this.resultList[i].createDate,
        taskEndDate: this.resultList[i].taskEndDate,
        supervisorName: this.resultList[i].supervisorName,
        serviceProviderName: this.resultList[i].serviceProviderName,
        taskStatusText: this.resultList[i].taskStatusText,
        
      };
      this.Data.push(empInfo);
    }

    this.Data.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row));
    });

    let reportData = {
      title: "Task_Report",
      data: this.dataForExcel,
      headers: this.Data[0],
    };
    this.taskCommonService.exportExcelReport(reportData);
  }

}
