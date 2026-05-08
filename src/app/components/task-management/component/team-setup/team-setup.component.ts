import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { TaskCommonService } from '../../services/task.common.service';
import { TaskService } from '../../services/task.service';
import { EVoteService } from 'src/app/components/e-vote/services/e-vote.service';

@Component({
  selector: 'app-team-setup',
  templateUrl: './team-setup.component.html',
  styleUrls: ['./team-setup.component.scss']
})
export class TeamSetupComponent implements OnInit {
  PermissionForm: FormGroup;
  noResult = false;
  AllGatePassEmployeeList: any[]= new Array();
  AllGatePassNewEmployeeList: any[]= new Array();
  TaskTeamSupervisor : any

  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public taskServise : TaskService,
    private toastr: ToastrService,
    public taskCommonService: TaskCommonService,
    public evoteService: EVoteService

  ) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.commonService.LoadSetupEmployeeList();
    this.commonService.LoadGatePassEmplyeeDepartmentList();
  }
   
    InitializeForm() {
    this.PermissionForm =this.fb.group({
      employeeId: [0],
      employeeName:[""],
      supervisorId: [0],
      supervisorName:[""],
      attentionDept:[""],
      section:[""]
      
    })
  }
  
    addUserToList(){
      if (this.PermissionForm.valid) {

         var data = this.PermissionForm.value;
         const splitData = data.supervisorName.split('-');
         //alert(splitData);
          this.AllGatePassNewEmployeeList.push({
            employeeId: data.supervisorId,
            employeeName: data.supervisorName,
            //department: splitData[2],
            //section: splitData[3],
            department: data.attentionDept,
            section: data.section,
          });
          console.log(this.AllGatePassNewEmployeeList);
      }
      else{
        this.toastr.error("Please Select All Required Field");
      }
  }

  deleteItem(obj: any) {
    const index: number = this.AllGatePassNewEmployeeList.indexOf(obj);
    if (index !== -1) {
        this.AllGatePassNewEmployeeList.splice(index, 1);
    }        
}

  onSelectEmployee(event: TypeaheadMatch): void {
    this.PermissionForm.patchValue({
      employeeId: event.item.value,
      employeeName: event.item.label
    });
  } 
  //employee No result found
  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.PermissionForm.patchValue({
        employeeName: "",
        employeeId: null
      });
      const control = this.PermissionForm.get('employeeName');            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    }
  }
  onSelectSupervisor(event: TypeaheadMatch): void {
    this.PermissionForm.patchValue({
      supervisorId: event.item.value,
      supervisorName: event.item.label
    });
    this.LoadEmployeeList();
  }  
  //employee No result found
  typeaheadNoResultsSupervisor(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.PermissionForm.patchValue({
        supervisorName: "",
        supervisorId: null
      });
      const control = this.PermissionForm.get('supervisorName');            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    }
  }



  typeaheadNoResultsForDepartment(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.PermissionForm.patchValue({
        attentionDept: ""
      });
    }
  }

  onSelectEmployeeDepartment(event: TypeaheadMatch): void {
    this.PermissionForm.patchValue({
      attentionDept: event.item.value,
    });
  }

  typeaheadNoResultsForDepartment1(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.PermissionForm.patchValue({
        section: ""
      });
    }
  }

  onSelectEmployeeDepartment1(event: TypeaheadMatch): void {
    this.PermissionForm.patchValue({
      section: event.item.value,
    });
  }



  onSubmit() {    
    if(this.PermissionForm.valid){
        if (this.AllGatePassNewEmployeeList.length > 0 ) {   
           var dataS = this.PermissionForm.value;
           
           const splitData = dataS.supervisorName.split('-');
           //alert(splitData);
            this.TaskTeamSupervisor ={
              supervisorId: dataS.supervisorId,
              supervisorName: dataS.supervisorName,
              department: splitData[2],
              section: splitData[3],
            };
            console.log(this.TaskTeamSupervisor);
           debugger
          this.taskServise.SaveTaskTeamSetup(this.TaskTeamSupervisor, this.AllGatePassNewEmployeeList).subscribe(
            (res) => {
              this.toastr.success("Permission Successful");
              this.LoadEmployeeList();
              console.log(res); 
              this.clearList();       
            },
            (error) => {              
              this.toastr.error("Permission Failed");
              console.log(error);
            }
          );
        } else {
          this.toastr.error("Please add employee first!");
        }      
    }
    else{
      this.toastr.error("Please fill up all required data!");
    }      
  }


  LoadEmployeeList(){
    var stringvalue = this.PermissionForm.value.supervisorId; 
    this.evoteService.GatePassListBySupervisor(stringvalue).subscribe(
      (data: any[]) => {
        console.log(data);
        this.AllGatePassEmployeeList=data;
        console.log(this.AllGatePassEmployeeList);
      },
      (error) => {
        this.toastr.warning("No Data Found", "Gate Pass Employee");

      }
    );
  }

  clearList(){
    this.AllGatePassNewEmployeeList.length = 0;
  }


}
