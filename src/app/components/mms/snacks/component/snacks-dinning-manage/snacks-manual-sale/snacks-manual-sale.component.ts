import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/shared/service/spinner.service';
import { MmsSnackService } from '../../../services/snacks.service';

@Component({
  selector: 'app-snacks-manual-sale',
  templateUrl: './snacks-manual-sale.component.html',
  styleUrls: ['./snacks-manual-sale.component.scss']
})
export class SnacksManualSaleComponent implements OnInit {
  reactiveForm: FormGroup;
  constructor(private modalService: BsModalService,
    private spinner: SpinnerService,
    private toaster: ToastrService,
    public snackService: MmsSnackService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.CreateForm();
    this.snackService.GetEmployeeInfoWithSearch();
  }

  CreateForm() {
    this.reactiveForm = this.fb.group({
      id: [0],
      employeeId:["",Validators.required],
      employeeIdName:["",Validators.required],
      employeeName:[""],
      department:[""],
      section:[""]
    });
  }

  onSelectEmploeeId(event: TypeaheadMatch){
    this.reactiveForm.patchValue({
      employeeName:event.item.employeeName,
      department:event.item.department,
      employeeId:event.item.employeeId,
      section:event.item.section,
      employeeIdName:event.item.employeeIdName
    })
    //console.log(event);
    this.snackService.employeeId=event.item.employeeId;

  }

  empIdNoResults = false;
  empployeeIdNoResults(event: boolean): void {
    this.empIdNoResults = event;
    if(this.empIdNoResults==true){
      this.reactiveForm.patchValue({
        employeeId:"",
        employeeIdName:""
      })
      this.snackService.employeeId="-1";

      const control = this.reactiveForm.get("employeeIdName");
      control.markAsTouched({ onlySelf: true });
    }
    
   
  }
  
  OnClear() {
    this.reactiveForm = this.fb.group({
      id: [0],
      employeeId:["",Validators.required],
      employeeIdName:["",Validators.required],
      employeeName:[""],
      department:[""],
      section:[""]
    });
  }


}
