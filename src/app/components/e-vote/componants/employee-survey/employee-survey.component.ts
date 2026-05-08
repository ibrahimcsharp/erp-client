import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { EVoteService } from '../../services/e-vote.service';
import { GatePassEmployeeType } from 'src/app/components/merchandising/models/gatePassEmployeeModel';
import { flash } from 'ng-animate';
import { element } from 'protractor';
import { Router } from '@angular/router';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-employee-survey',
  templateUrl: './employee-survey.component.html',
  styleUrls: ['./employee-survey.component.scss']
})
export class EmployeeSurveyComponent implements OnInit {
  AllEmployeeList: any[] = [];
  deptartmentList: GatePassEmployeeType[];
  showVotePopup: boolean = false;
  selectedVoteCategories: any[];
  selectedEmployeeForVote: any[] = [];
  voteCategoryFromDb: any[];
  myVoteList: any[];
  myVoteAvailable: number = 0;            //Added by Tamim
  companyList: any[];                     //Added by Tamim
  companyName: string = "";
  departmentName: string = "";            //Added by Tamim
  eVotedepartmentList: any[] = [];        //Added by Tamim
  sectiontList: any[];
  sectionName: string = "";
  showSection: boolean = false;

  @ViewChild('myname') input; 

  constructor(
    private toastr: ToastrService,
    public commonService: CommonServiceService,
    private spinner: NgxSpinnerService,
    public evoteService: EVoteService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    console.log('depart', this.deptartmentList, this.commonService.gatePassDepartmentList);
    this.GetMyVoteCount(this.authService.decodedToken?.unique_name);
    this.loadCompanyInfo();            //Added by Tamim

  }

  ShowEmployeeList(obj: any) {
    if (obj.department != null) {
      this.departmentName = obj.department;
      this.sectiontList = [];
      this.sectionName = "";
      this.AllEmployeeList = [];
      this.input.nativeElement.value ="";
      this.evoteService.GetEVoteEmployeeSectionList( encodeURIComponent(obj.department),this.companyName).subscribe(
        (res: any[]) => {
          this.sectiontList = new Array();
          for (var i = 0; i < res.length; i++) {
            this.sectiontList.push({
              label: res[i].section,
              value: res[i].section,
            });
          }
        }, (error) => { this.toastr.warning("Failed To Load Data", "Section List"); });
    }


  }

  loadEmployeeInfo(section: string) {     
    this.AllEmployeeList = [];                                       // All Employee List
    this.evoteService.GetGatePassEmployeeList().subscribe(
      (res: any[]) => {
        this.AllEmployeeList = res;
        console.log("employee befor", this.AllEmployeeList);
        this.AllEmployeeList = this.AllEmployeeList.filter(x => x.company.toUpperCase() == this.companyName.toUpperCase() && x.department == this.departmentName && x.section == section);
        console.log("employee after", this.AllEmployeeList);
        debugger
        this.AllEmployeeList.forEach(element =>  {
           var check = this.myVoteList.filter(x => x.employeeId == element.employeeId);
           if(check.length>0){
            element.color ='y';
           } 
          }
        );
        console.log("employee after color", this.AllEmployeeList);
      }, (error) => { this.toastr.warning("Failed To Load Data", "Employee List"); });
  }


  GetVoteCategory() {
    this.evoteService.GetVoteCategory().subscribe(
      (res: any[]) => {
        this.voteCategoryFromDb = res;
        this.voteCategoryList = this.voteCategoryFromDb;
      }, (error) => { this.toastr.warning("Failed To Load Data", "Vote Category List"); });
  }

  voteCategoryList = [];
  viewVote(rowData: any) {
    debugger
    this.selectedVoteCategories = [];
    this.evoteService.GetVoteCategory().subscribe(
      (res: any[]) => {
        this.voteCategoryFromDb = res;
        this.voteCategoryList = this.voteCategoryFromDb;

        for (let item of this.voteCategoryList) {
          item.employeeId = rowData.employeeId;
        }
      }, (error) => { this.toastr.warning("Failed To Load Data", "Vote Category List"); });
  }

  viewVote2(rowData: any) {
  }

  SaveVote(seleclist: any) {
    debugger
    console.log("Data to save", seleclist);
    console.log("Selectde vote list", this.selectedVoteCategories);
    for (let item of seleclist) {
      item.voteStatus = "Y";
    }
    console.log("Data to save ready", seleclist);

    if (this.myVoteList.length < 50) {
      this.evoteService.CreateEmployeeSurveyVote(seleclist).subscribe(
        (res) => {
          this.toastr.success("Voted Successfully");
          //this.router.navigate(["/e-vote/employee-survey-list"]);
          this.loadEmployeeInfo(this.sectionName);
        },
        (error) => {
          this.toastr.error("Failed to Vote");
        }
      );
    }
    else {
      this.toastr.error("Voting Limit Exceeded");
    }
  }



  SaveVoteFromMainTable(seleclist: any) {
    debugger
    this.spinner.show();
    console.log("Data to save", seleclist);
    console.log("Selectde vote list", this.selectedEmployeeForVote);
    for (let item of seleclist) {
      item.categoryId = 1;
      item.categoryName ="Leadership"
      item.voteStatus = "Y";
    }
    console.log("Data to save ready", seleclist);
    
    if (this.myVoteAvailable >= 0) {
      this.evoteService.CreateEmployeeSurveyVote(seleclist).subscribe(
        (res) => {
          this.toastr.success("Voted Successfully");
          //this.router.navigate(["/e-vote/employee-survey-list"]);
          this.loadEmployeeInfo(this.sectionName);
          this.GetMyVoteCount(this.authService.decodedToken?.unique_name);
          this.selectedEmployeeForVote = [];
          this.spinner.hide();
        },
        (error) => {
          this.toastr.error("Failed to Vote");
          this.spinner.hide();
        }
      );
    }
    else {
      this.toastr.error("Voting Limit Exceeded");
      this.spinner.hide();
    }
  }

  myVoteAvailableActual= 0;
  GetMyVoteCount(employeeId: any) {
    this.evoteService.GetMyVoteCount(employeeId).subscribe(
      (res: any[]) => {
        debugger
        this.myVoteList = res;
        this.myVoteAvailable = (50 - this.myVoteList.length);
        this.myVoteAvailableActual = (50 - this.myVoteList.length);
      }, (error) => { this.toastr.warning("Failed To Load Data", "My Vote List"); });
  }

  VoteReCalculation(){
    this.myVoteAvailable = this.myVoteAvailableActual - this.selectedEmployeeForVote.length;
  }









  //Added by Tamim   Start
  loadCompanyInfo() {
    debugger
    this.evoteService.GetCompanyListForEVote().subscribe(
      (res: any[]) => {
        this.companyList = new Array();
        for (var i = 0; i < res.length; i++) {
          this.companyList.push({
            label: res[i].company,
            value: res[i].company,
          });
          this.sectiontList=[];

        }
      }, (error) => { this.toastr.warning("Failed To Load Data", "Employee List"); });
  }

  noResult = false;
  typeaheadNoResultCompany(event: boolean): void {
    debugger
    this.noResult = event;
    if (this.noResult == true) {
      this.companyName = "";
    }
  }

  onSelectCompany(event: TypeaheadMatch): void {
    debugger
    this.companyName = event.item.label;
    this.showSection = true;
    if (this.companyName != "") {
      this.evoteService.GetEVoteEmployeeDepartmentList(this.companyName).subscribe(
        (res: GatePassEmployeeType[]) => {
          debugger
          this.eVotedepartmentList = res;
          this.sectiontList = [];
          this.sectionName = "";
          this.input.nativeElement.value ="";
          this.AllEmployeeList = [];
        },
        (error) => {
          this.toastr.warning("Failed To Load Data", "Employee List");
          this.showSection = false;
        }
      );
    }
    else {
      this.toastr.warning("No Company Found");
    }

  }

  //Added by Tamim End


  onSelectSection(event: TypeaheadMatch): void {
    debugger
    this.sectionName = event.item.label;
    this.loadEmployeeInfo(this.sectionName);
  }


  typeaheadNoResultSection(event: boolean): void {
    debugger
    this.noResult = event;
    if (this.noResult == true) {
      this.sectionName = "";
    }
  }


}
