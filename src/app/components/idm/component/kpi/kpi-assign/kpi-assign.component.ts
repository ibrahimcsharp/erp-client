import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { IdmService } from '../../../service/idm.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-kpi-assign',
  templateUrl: './kpi-assign.component.html',
  styleUrls: ['./kpi-assign.component.scss']
})
export class KpiAssignComponent implements OnInit {
  KpiAssignForm: FormGroup;
  noResult= false;
 kpiDepartmentList: any[];
 kpiNameList: any[];
 kpiFormatList: any[];
 kpiList: any[];
 kpiListbydept: any[];
 GatePassEmployeeDepartmentList:any[];
 showKpiList: boolean = false;
 AllNewKpiAssignList: any = [];
 

  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: IdmService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.InitializeForm();
    this.commonService.LoadGatePassEmplyeeList();
    this.LoadAllKpiList();

  }

  InitializeForm() {
    this.KpiAssignForm =this.fb.group({ 
      id:[0],
      departmentName:[""],
      // kpiCode:[""],
      kpiName:[""],
      employeeId:[0],
      employeeName:[""],
      weightNumber:[""],
      targetNumber:[""],
      ytdValue:[""],
      typeName:[""],
      formatTypeName:[""],
      leaderName:[""],
      leaderId:[0],
      coLeaderName:[""],
      coLeaderId:[0], 

      doubleTypeColOne:[""],
      doubleTypeColTwo:[""],
      tripleTypeColThree:[""],
      tripleTypeColTwo:[""],
      tripleTypeColOne:[""],

      avgKpiOneTitle:[""],
      avgKpiTwoTitle:[""],      
    })
  }
 
//DepartmentList load
LoadAllKpiList() {
  this.service.GetAllKpiList().subscribe(
    (res: any[]) => {
      this.kpiList = res;
     // console.log("we kpi list",this.kpiList)
      this.kpiDepartmentList = new Array();
      this.kpiDepartmentList.push({
        label: "Select",
        value: null,
      });
      for (var i = 0; i < this.kpiList.length; i++) {
        this.kpiDepartmentList.push({
          label: this.kpiList[i].department,
          value: this.kpiList[i].department,
        });
      }
    },
    (error) => {
      this.toastr.warning("Failed To Load Data", "KPI List");
    }
  );
}

//SELECT employee DROP DOWN
onSelectEmployee(event: TypeaheadMatch): void {
  this.KpiAssignForm.patchValue({
    employeeId: event.item.value,
    employeeName: event.item.label
  });
 // this.LoadEmployeeList(); loading list
}  
//employee No result found
typeaheadNoResultsEmployee(event: boolean): void {
  this.noResult = event;
  if (this.noResult == true) {
    this.KpiAssignForm.patchValue({
      employeeName: "",
      employeeId: null
    });
    const control = this.KpiAssignForm.get('employeeName');            // {2}
    control.markAsTouched({ onlySelf: true });       // {3}
  }
}

//SELECT leader DROP DOWN
onSelectLeader(event: TypeaheadMatch): void {
  this.KpiAssignForm.patchValue({
    leaderId : event.item.value,
    leaderName: event.item.label
  });
 // this.LoadEmployeeList(); loading list
}  
//leader No result found
typeaheadNoResultsLeader(event: boolean): void {
  this.noResult = event;
  if (this.noResult == true) {
    this.KpiAssignForm.patchValue({
      leaderName: "",
      leaderId: null
    });
    const control = this.KpiAssignForm.get('leaderName');            // {2}
    control.markAsTouched({ onlySelf: true });       // {3}
  }
}

//SELECT coLeader DROP DOWN
onSelectCoLeader(event: TypeaheadMatch): void {
  this.KpiAssignForm.patchValue({
    coLeaderId: event.item.value,
    coLeaderName: event.item.label
  });
 // this.LoadEmployeeList(); loading list
}  
//coLeader No result found
typeaheadNoResultsCoLeader(event: boolean): void {
  this.noResult = event;
  if (this.noResult == true) {
    this.KpiAssignForm.patchValue({
      coLeaderName: "",
      coLeaderId: null
    });
    const control = this.KpiAssignForm.get('coLeaderName');            // {2}
    control.markAsTouched({ onlySelf: true });       // {3}
  }
}

kpiNametrue:boolean=false;
//SELECT dept DROP DOWN
onSelectdept(event: TypeaheadMatch): void {
  this.showKpiList = true;

  let department = this.KpiAssignForm.controls["departmentName"].value;

  if (department != undefined && department != null && department != "") 
  {
    this.service.GetKpiListByDept(department).subscribe
    (
      (res: any[]) => {
          this.kpiListbydept = res;
          console.log(this.kpiListbydept);
          this.kpiNameList = new Array();
          this.kpiNameList.push({
            label: "Select",
            value: null,
       });
         for (var i = 0; i < this.kpiListbydept.length; i++) {
         this.kpiNameList.push({
          label: this.kpiListbydept[i].kpiName,
          value: this.kpiListbydept[i].kpiName,
        }); 
        this.kpiNametrue=true;
      }
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
//dept No result found
  typeaheadNoResultsForDepartment(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.KpiAssignForm.patchValue({
        departmentName: ""
      });
    }
  }

  //FOR kpi select load
formatTypeDouble:boolean=false;
formatTypeTriple:boolean=false;
onSelectKpi(event: TypeaheadMatch): void {
  debugger
      this.KpiAssignForm.patchValue({
        kpiName: event.item.value,
      });
      const foundKPI = this.kpiListbydept.find(kpi => kpi.kpiName == event.item.value);
      console.log("foundKPI",foundKPI)
      this.KpiAssignForm.patchValue({
        formatTypeName: foundKPI.formatTypeName
      });
      if(this.KpiAssignForm.value.formatTypeName=='Double'){
        this.formatTypeDouble = true;
        this.formatTypeTriple = false;
      }
      else if(this.KpiAssignForm.value.formatTypeName=='Triple'){
        this.formatTypeTriple = true;
        this.formatTypeDouble = false;
      }
    }
//FOR no  result kpi
typeaheadNoResultsForKpi(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.KpiAssignForm.patchValue({
        kpiName: ""
      });
    }
  }
//add kpi form info in a temporary table 
  saveKpiAssign(){
    if (this.KpiAssignForm.valid) 
    {
      if(this.KpiAssignForm.value.kpiName!=undefined && this.KpiAssignForm.value.kpiName!=null && this.KpiAssignForm.value.kpiName!="")
        {
          this.AllNewKpiAssignList.push(this.KpiAssignForm.value);
          console.log("form value",this.AllNewKpiAssignList);

          this.service.SaveKpiAssign(this.KpiAssignForm.value).subscribe(
            (res) => {
              this.clearForm();
              this.toastr.success("KPI", "Assign Successfully");
              this.ngOnInit();
             
            },
            (err) => {
              this.toastr.error("KPI", "Assign Failed");
              
            }
          );

          
        }
      }
      else
    {
      this.toastr.error("Please Select All Required Field");
    }
  }
  clearForm() {
    this.KpiAssignForm.reset();
    this.showKpiList = false;
    this.kpiNametrue=false;
    this.formatTypeDouble=false;
    this.formatTypeTriple=false;
    this.KpiAssignForm.value.id = 0;
    this.AllNewKpiList= [];
  }
  //add kpi form info in a temporary table 
showNewkpidoubleList:boolean=false;
showNewkpitripleList:boolean=false;
AllNewKpiList: any = [];
addToList(){
  this.AllNewKpiList= [];
  this.showNewkpidoubleList = true;
        this.AllNewKpiList.push(this.KpiAssignForm.value);
        console.log("new",this.AllNewKpiList);
        if(this.KpiAssignForm.value.formatTypeName=='Double'){
          this.showNewkpidoubleList = true;
          this.showNewkpitripleList = false;
        }
        else if(this.KpiAssignForm.value.formatTypeName=='Triple'){
          this.showNewkpidoubleList = false;
          this.showNewkpitripleList = true;
        }
}
}


