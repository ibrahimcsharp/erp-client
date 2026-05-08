import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { JobDescriptionModel } from '../../../model/job-description.model';
import { IdmService } from '../../../service/idm.service';
import { EmployeePersonalInfoModel } from '../../../model/employee-personal-info.model';
import { GatePassEmployeeType } from 'src/app/components/merchandising/models/gatePassEmployeeModel';


import { NgxSpinnerService } from 'ngx-spinner';
import { Message } from 'primeng/api';
import * as XLSX from 'xlsx';
import { EVoteService } from 'src/app/components/e-vote/services/e-vote.service';

@Component({
  selector: 'app-job-des-entry',
  templateUrl: './job-des-entry.component.html',
  styleUrls: ['./job-des-entry.component.scss']
})
export class JobDesEntryComponent implements OnInit {
  jobDesEntryForm: FormGroup;
  supervisor:string;
  supervisorName:string;
  employee:string;
  employeeId:string;
  employeeDept:string;
  section:string;
  jdInfo:JobDescriptionModel;
  file: File;
  AllEmployeeList: any[]= new Array();
  showJD:boolean=false;
  myJobSummary:string;
  jobDescriptionListByEmployee:JobDescriptionModel[]= new Array();
  jobSummaryListByEmployee:JobDescriptionModel[]= new Array();
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: IdmService,
    private toastr: ToastrService,
    private authService: AuthService,
    public evoteService: EVoteService,
  ) { }
  ngOnInit(): void {
    this.initializeForm();
    this.loadEmployeeInfo();
  }
  initializeForm() {
    this.jobDesEntryForm = this.fb.group({
      jobDescription:[""],
      jobSummary:[""],
      file: [""],
    });
  }
  loadEmployeeInfo() {                                            // All Employee List
      this.evoteService.GetGatePassEmployeeList().subscribe(
        (res: GatePassEmployeeType[]) => {
          this.AllEmployeeList = res;
          console.log("employee", this.AllEmployeeList);
      },(error) => {this.toastr.warning("Failed To Load Data", "Employee List");});
  }
  viewJd(rowData:any){
    var chars = rowData.employeeName.split('-');
    this.employee=chars[0];
    this.employeeId = rowData.employeeId;
    this.employeeDept = rowData.department;
    this.section = rowData.section;
    this.loadJSByEmployee();
    this.loadJDByEmployee();
  }
  loadJSByEmployee(){
    this.service.GetJobSummaryByEmployeeId(this.employeeId).subscribe(
      (res: JobDescriptionModel[]) => {
        this.jobSummaryListByEmployee = res;
        if(this.jobSummaryListByEmployee!=null && this.jobSummaryListByEmployee.length>0){
          this.myJobSummary = this.jobSummaryListByEmployee[0].jobSummary;
        }
        else{
          this.myJobSummary = "";
        }
        this.showJD = true;
      },(error) => {this.toastr.warning("Failed To Load Data", "Job Summary");});
  }
  loadJDByEmployee(){
    this.service.GetJobDesByEmployeeId(this.employeeId).subscribe(
      (res: JobDescriptionModel[]) => {
        this.jobDescriptionListByEmployee = res;
        this.showJD = true;
      },
      (error) => {this.toastr.warning("Failed To Load Data", "Job Description");});
  }
  addJobdescription(){
    this.jdInfo = new JobDescriptionModel();
    this.jdInfo.employeeId = this.employeeId;
    this.jdInfo.employeeName = this.employee;
    this.jdInfo.department = this.employeeDept;
    this.jdInfo.jobDes = this.jobDesEntryForm.value.jobDescription;
    if(this.jobDesEntryForm.value.jobDescription!=undefined && this.jobDesEntryForm.value.jobDescription!=null && this.jobDesEntryForm.value.jobDescription!=""){
      this.service.JdCreate(this.jdInfo).subscribe(
        (res) => {
          let message = res.message;
          this.toastr.success("JD Saved Successful");
          this.jobDesEntryForm.patchValue({
            jobDescription: ""
          });
          this.employeeId = this.jdInfo.employeeId;
          this.loadJDByEmployee();
          this.loadJSByEmployee();
        },
        (error) => {
          this.toastr.error("Failed To Saved JD");
        });
    }
    else{
      this.toastr.warning("Please Enter Jod Description");
    }
  }
  addJobSummary(){
    this.jdInfo = new JobDescriptionModel();
    this.jdInfo.employeeId = this.employeeId;
    this.jdInfo.employeeName = this.employee;
    this.jdInfo.department = this.employeeDept;
    this.jdInfo.jobSummary = this.jobDesEntryForm.value.jobSummary;
    if(this.jobDesEntryForm.value.jobSummary!=undefined && this.jobDesEntryForm.value.jobSummary!=null && this.jobDesEntryForm.value.jobSummary!=null){
      this.service.JSCreate(this.jdInfo).subscribe(
        (res) => {
          let message = res.message;
          this.toastr.success("Job Summary Saved Successful");
          this.jobDesEntryForm.patchValue({
            jobSummary: ""
          });
          this.loadJSByEmployee();
          this.loadJDByEmployee();
        },
        (error) => {
          this.toastr.error("Failed To Saved Job Summary");
        });
    }
    else{this.toastr.warning("Please Enter Jod Summary");}
  }

  
  deleteJobdescription(rowdata:JobDescriptionModel){
    this.service.JdDelete(rowdata.id).subscribe(
        (res) => {
          let message = res.message;
          this.toastr.success("JD Delete Successful");
          this.loadJDByEmployee();
        },
        (error) => {
          
          this.toastr.error("Failed To Delete JD");
        }
      );
  }
  formatTextWithLineBreaks(text: string): string {
    // Split the text at full stops and join with <br> tags
    const lines = text.split('.').join('.<br>');
    return lines;
  }

  onUpload(event) {
    this.file = event.target.files[0];
  }

  
dataListTemp: any[] = [];
arrayBuffer: any;
dataList: any[] = [];
msgs: Message[] = [];
showDataFromExcel() {
  debugger  
  let fileReader = new FileReader();
  fileReader.readAsArrayBuffer(this.file);
  try {
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary", cellDates: true, cellNF: false, cellText: false });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.dataList = [];
      this.dataList = arraylist;
      console.log("dataList",this.dataList);
      for (var item of this.dataList) {
            item.jobDes = item.JD
            item.employeeId = this.employeeId;
            item.employeeName = this.employee;
            item.department = this.employeeDept;
            item.section= this.section;
           
      }
    };
  }
  catch (error) {
    this.msgs = [
      {
        severity: "warn",
        summary: "file: ",
        detail: error,
      },
    ];
  }
}

uploadJdList(){
  this.service.JdListSave(this.jdInfo,this.dataList).subscribe(
    (res) => {
      this.toastr.success("JD Upload Successful");
      this.loadJDByEmployee();
      this.loadJSByEmployee();
      this.dataList=[];
    },
    (error) => {
      this.toastr.warning("Please Refresh and Try again ");
    }
  );
}
}
