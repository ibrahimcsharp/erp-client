import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { IdmService } from '../../service/idm.service';
import { EVoteService } from 'src/app/components/e-vote/services/e-vote.service';

@Component({
  selector: 'app-pleasure-displeasure-cmt',
  templateUrl: './pleasure-displeasure-cmt.component.html',
  styleUrls: ['./pleasure-displeasure-cmt.component.scss']
})
export class PleasureDispleasureCmtComponent implements OnInit {
  managercmtForm: FormGroup;
  supervisor:string;
  employee:string;
  employeeId:string;
  employeeDept:string;
  AllEmployeeList: any[]= new Array();
  showSatisfactory:boolean=false;
  showHistory:boolean=false;
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: IdmService,
    private toastr: ToastrService,
    private authService: AuthService,
    public evoteService: EVoteService,
  ) { }

  ngOnInit(): void {
    this.supervisor = this.authService.decodedToken?.unique_name;
    this.initializeForm();
    this.loadEmployeeList();
  }

  initializeForm() {
    this.managercmtForm = this.fb.group({
      jobDescription:[""]
    });
   
  }

  loadEmployeeList(){
    this.service.IdmEmployeeListBySupervisor(this.supervisor).subscribe(
      (data: any[]) => {
        console.log(data);
        this.AllEmployeeList=data;
        console.log(this.AllEmployeeList);
      },
      (error) => {
        this.toastr.warning("No Data Found", "Under this Supervisor");

      }
    );
  }

  viewSatisfactory(rowData:any){
    var chars = rowData.employeeName.split('-');
    this.employee=chars[0];
    this.employeeId = rowData.employeeId;
    this.employeeDept = chars[2];
    this.loadSatisfactoryByEmployee();
  }

  
  viewprevious(rowData:any){
    var chars = rowData.employeeName.split('-');
    this.employee=chars[0];
    this.employeeId = rowData.employeeId;
    this.employeeDept = chars[2];
    this.loadHistorySatisfactoryByEmployee();
  }
  
  loadSatisfactoryByEmployee(){
    this.showSatisfactory = true;
    this.getAllPleasure();
    this. getAllDisPleasure();
  }

  loadHistorySatisfactoryByEmployee(){
    this.showHistory = true;
    this.getAllPleasure();
    this. getAllDisPleasure();
  }

  allPlesureList:any[];
  getAllPleasure(){
    this.service.GetAllPleasureByEmployeeId(this.employeeId).subscribe(
      (res: any[]) => {
        this.allPlesureList = res;        
        console.log('Pleasure List');
        console.log(this.allPlesureList);
      },
      (error) => {
        this.toastr.error("Failed to Fetch Plesure List");
        
      }
    );
  }
  allDisPlesureList:any[];
  getAllDisPleasure(){
    this.service.GetAllDisPleasureByEmployeeId(this.employeeId).subscribe(
      (res: any[]) => {
        this.allDisPlesureList = res;        
        console.log('Displeasure List');
        console.log(this.allDisPlesureList);
      },
      (error) => {
        this.toastr.error("Failed to Fetch Displesure List");
        
      }
    );
  }

  SavePleasureComment(rowdata:any){
    this.service.CreatePleasureCommentSave(rowdata).subscribe(
      (res) => {
        this.toastr.success("Comment Saved Successfully");
        this.getAllDisPleasure();
      },
      (error) => {
        console.log('onsubmit error');
        console.log(error);
        this.toastr.error("Failed To Save Comment");
        
      }
    );

  }

  SaveDisPleasureComment(rowdata:any){
    this.service.CreateDisPleasureCommentSave(rowdata).subscribe(
      (res) => {
        this.toastr.success("Comment Saved Successfully");
        this.getAllPleasure();
      },
      (error) => {
        console.log('onsubmit error');
        console.log(error);
        this.toastr.error("Failed To Save Comment");
        
      }
    );
  }

}
