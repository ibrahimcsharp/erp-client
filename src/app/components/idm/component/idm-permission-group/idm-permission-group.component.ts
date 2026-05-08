import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { GatePassEmployeeType } from 'src/app/components/merchandising/models/gatePassEmployeeModel';
import { IdmService } from '../../service/idm.service';
import { IdmSupervisorModel } from '../../model/idm-supervisor.model';

@Component({
  selector: 'app-idm-permission-group',
  templateUrl: './idm-permission-group.component.html',
  styleUrls: ['./idm-permission-group.component.scss']
})
export class IdmPermissionGroupComponent implements OnInit {
  PermissionForm: FormGroup;
  datePickerConfig: Partial<BsDatepickerConfig>;
  noResult = false;
  AllIdmNewEmployeeList: any[]= new Array();
  AllIdmEmployeeList: any[]= new Array();
  IdmSupervisor : IdmSupervisorModel;
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
 
    public service: IdmService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.commonService.LoadGatePassEmplyeeList();
  }
  InitializeForm() {
    this.PermissionForm =this.fb.group({
      employeeId: [0],
      employeeName:[""],
      supervisorId: [0],
      supervisorName:[""]
      
    })
  }


  addUserToList(){
      if (this.PermissionForm.valid) {
          this.AllIdmNewEmployeeList.push(this.PermissionForm.value);
          console.log(this.AllIdmNewEmployeeList);
      }
      else{
        this.toastr.error("Please Select All Required Field");
      }
  }

  deleteItem(obj: GatePassEmployeeType) {
      const index: number = this.AllIdmNewEmployeeList.indexOf(obj);
      if (index !== -1) {
          this.AllIdmNewEmployeeList.splice(index, 1);
      }        
  }




//SELECT EMPLOYEE DROP DOWN
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



//SELECT SUPERVISOR DROP DOWN
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


//MAIN SUBMIT BUTTON
  onSubmit() {    
    if(this.PermissionForm.valid){
      debugger
        if (this.AllIdmNewEmployeeList.length > 0 ) {   
          this.IdmSupervisor = this.PermissionForm.value;
          this.service.IdmPermission(this.IdmSupervisor, this.AllIdmNewEmployeeList).subscribe(
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


  //LOAD EMPLOYEE UNDER LIST SHOW AT RIGHT SIDE TABLE
  LoadEmployeeList(){
    var stringvalue = this.PermissionForm.value.supervisorId; 
    this.service.IdmEmployeeListBySupervisor(stringvalue).subscribe(
      (data: any[]) => {
        console.log(data);
        this.AllIdmEmployeeList=data;
        console.log(this.AllIdmEmployeeList);
      },
      (error) => {
        this.toastr.warning("No Data Found", "Gate Pass Employee");

      }
    );
  }

  clearList(){
    this.AllIdmNewEmployeeList.length = 0;
  }

  clickMethod(id: number) {
    if(confirm("Confirm Remove Employee ! ")) {
      this.removeEmloyee(id);
    }
  }
 
  removeEmloyee(id: number) {
    
    
    if (id > 0) {
      var id_S = id.toString()
      console.log("toString",id_S);

      console.log("id",id);
      this.service.RemoveIdmEmployee(id_S).subscribe(res => {
  
          this.toastr.success(res.message)
          this.LoadEmployeeList();
          //this.showvalue();
      },
        err => {
          this.toastr.error("Delete failed!");

        }
      );
    }
    else {
      this.toastr.error("Didn't find Employee Id!");
    }

  }


}