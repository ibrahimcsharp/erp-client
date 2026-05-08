import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { IdmService } from '../../../service/idm.service';
import { ToastrService } from 'ngx-toastr';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { EVoteService } from 'src/app/components/e-vote/services/e-vote.service';

@Component({
  selector: 'app-kpi-entry',
  templateUrl: './kpi-entry.component.html',
  styleUrls: ['./kpi-entry.component.scss']
})
export class KpiEntryComponent implements OnInit {



  kpiEntryForm: FormGroup;
   KpiEntrySectionList: any = [];
  noResult = false;
  GatePassEmployeeList: any = [];
  AllNewKpiList: any = [];
 KpiInfo: any=[];
 showKpiList: boolean = false;
 showUpdateButton: boolean = false;
 KpiList:any=[];

  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: IdmService,
    private toastr: ToastrService,
    public evoteService: EVoteService,
  ) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.commonService.LoadGatePassEmplyeeList();
    this.commonService.LoadGatePassEmplyeeDepartmentList();


  }
  InitializeForm() {
    this.kpiEntryForm = this.fb.group({
      id: 0,
      departmentName: ["", Validators.required],
      sectionName: ["", Validators.required],
      kpiCode: null,
      kpiName: [""],
      formatTypeName: [""],
    });

  }

  //FOR dept select load
  typeaheadNoResultsForDepartment(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.kpiEntryForm.patchValue({
        departmentName: ""
      });
    }
  }
    //FOR dept select load
  sectiontrue:boolean=false;
  onSelectEmployeeDepartment(event: TypeaheadMatch): void {
    this.kpiEntryForm.patchValue({
      departmentName: event.item.value,
    });
    let department = this.kpiEntryForm.value.departmentName;
    if (department != null && department != undefined && department != "") {
      this.commonService.LoadGatePassEmplyeeSectionListByDepartment(this.kpiEntryForm.value.departmentName);
      this.sectiontrue=true;
    }
    else {
      this.toastr.warning("Select Dept First");
    } 
  }
  //FOR SECTION load
  typeaheadNoResultsForSection(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.kpiEntryForm.patchValue({
        sectionName: ""
      });
    }
  }
  //FOR SECTION load
  onSelectEmployeeSection(event: TypeaheadMatch): void {
    this.showKpiList = true;
    // this.kpiEntryForm.patchValue({
    //   sectionName: event.item.value,
      
    // });
    let department = this.kpiEntryForm.controls["departmentName"].value;
    let section = this.kpiEntryForm.controls["sectionName"].value;
 

    if (department != undefined && department != null && department != "") {
      this.service.GetKpiListByDept(department).subscribe(
        (res: any[]) => {
        this.KpiList = res;
         console.log(this.KpiList);
        },
        (error) => {
          this.toastr.warning("Failed To Load Data", "KPI List");
        }
      );
    }
    else {
      this.toastr.warning("Select Dept and section First");

    }
  }

  //clear button
  clearForm() {
    this.kpiEntryForm.reset();
    this.kpiEntryForm.value.id = 0;

  }

//add kpi form info in a temporary table 
showNewkpiList:boolean=false;
  addkpiToList(){
    this.showNewkpiList = true;
    if (this.kpiEntryForm.valid) 
    {
      if(this.kpiEntryForm.value.kpiName!=undefined && this.kpiEntryForm.value.kpiName!=null && this.kpiEntryForm.value.kpiName!="" && 
         this.kpiEntryForm.value.formatTypeName!=undefined && this.kpiEntryForm.value.formatTypeName!=null && this.kpiEntryForm.value.formatTypeName!=""
      )
      {
        var dublicate = this.AllNewKpiList.find(x=>x.kpiCode == this.kpiEntryForm.value.kpiCode);
        if(dublicate!=undefined && dublicate!=null)
        {
          this.toastr.warning("Duplicate KPI Code found. please change the code");
        }
        else
        {
          if(this.kpiEntryForm.value.id == null)
          {
            debugger
            this.kpiEntryForm.value.id = 0;
          }
          else
          {
            console.log("id", this.kpiEntryForm.value.id);
          }
          this.AllNewKpiList.push(this.kpiEntryForm.value);
          
          console.log("new",this.AllNewKpiList);
        }
      }
      else
      {
        this.toastr.error("Please Select All Required Field");
      }    
    }
    else{
      this.toastr.error("Please Select All Required Field");
    }
}

deleteItem(obj: any) {
  const index: number = this.AllNewKpiList.indexOf(obj);
  if (index !== -1) {
      this.AllNewKpiList.splice(index, 1);
  }        
}

//for save kpi to database 
createKpi(){
    if(this.kpiEntryForm.valid){
        this.KpiInfo = this.kpiEntryForm.value;
        console.log("whats saving",this.KpiInfo);
        this.service.KpiEntryCreate(this.KpiInfo).subscribe(
          (res) => {
            let message = res.message;
            // console.log("Message from Procedure: "+ message);
            this.toastr.success("KPI Saved Successful");
            this.AllNewKpiList= null;
            this.AllNewKpiList= [];
           // this.clearForm();
             this.showKpiList = false;
             this.showvalue();
            // this.clickOnType();
          },
          (error) => {
            this.toastr.error("Failed To Saved KPI");
            // console.log(error);
          }
        );
      }
  else{
    this.toastr.warning("Please fill up all required data!");
  }
  
  }
//its only loading the table at the right side to show that entry have ben added to the table
  showvalue(){
    this.showKpiList = true;
    let department = this.kpiEntryForm.controls["departmentName"].value;
    let section = this.kpiEntryForm.controls["sectionName"].value;
    if (department != undefined && department != null && department != "") {
      this.service.GetKpiListByDept(department).subscribe(
        (res: any[]) => {
        this.KpiList = res;
         console.log(this.KpiList);
        },
        (error) => {
          this.toastr.warning("Failed To Load Data", "KPI List");
        }
      );
    }
    else {
      this.toastr.warning("Select Dept and section First");
    }
  }

//for edit kpi 
editKpiInfo(obj: any) {
    
    this.showUpdateButton = true;

      this.kpiEntryForm.patchValue({
        id: obj.id,
        departmentName:obj.department,
        sectionName:obj.section,
        kpiCode:obj.code,
        kpiName:obj.kpiName,
        formatTypeName:obj.formatTypeName
    
      
      });  
    
  }

  deleteKpiInfo(id: number,mstId:number) {
    if (id > 0 && mstId>0) {
      console.log("id",id);
      console.log("mstId",mstId);
      this.service.DeleteKpi(id,mstId).subscribe(res => {
  
          this.toastr.success(res.message)
          this.showvalue();
      },
        err => {
          this.toastr.error("Delete failed!");
        }
      );
    }
    else {
      this.toastr.error("Didn't find KPI Id!");
    }

  }


  //THIS IS FOR FILTERING SECTION
async filterSectionListByDepartment() {
  if (this.kpiEntryForm.value.departmentName == undefined || this.kpiEntryForm.value.departmentName == "" || this.kpiEntryForm.value.departmentName == null) {
    this.KpiEntrySectionList = [];
    this.KpiEntrySectionList = this.commonService.GatePassSectionListByDept;
  }
  else {
    var sectionList = await this.evoteService.GetGatePassEmployeeSectionListByDept(this.kpiEntryForm.value.departmentName).toPromise();
    this.KpiEntrySectionList = [];
    
    var employeeSectionList = sectionList.filter((item, i) => sectionList.findIndex((t) => t.section === item.section) === i);
    for (var i = 0; i < employeeSectionList.length; i++) {
     this.KpiEntrySectionList.push({
       label: employeeSectionList[i].section,
       value: employeeSectionList[i].section,
      });
     }
  }
}


}
