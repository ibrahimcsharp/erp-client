import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from '../../merchandising/Common-Services/common-service.service';
import { AccountCreateModel } from '../model/account.model';
import { AccountManagementService } from '../service/account-management.service';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {  
  @Output() AccountList = new EventEmitter();
  AccountForm: FormGroup;
  ButtonName:string;
  AllAccountList: AccountCreateModel[]= new Array();
  AccountModel: AccountCreateModel;
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: AccountManagementService,
    private toastr: ToastrService

  ){}

  ngOnInit(): void {
    this.InitializeFormFromParent();
  }


  InitializeFormFromParent(){
    if(this.AccountModel){
      this.AccountForm =this.fb.group({
        //glId : this.AccountModel.glId,
        glNumber: this.AccountModel.glNumber,
        glHead: this.AccountModel.glHead,
        status: this.AccountModel.status,
        remarks: this.AccountModel.remarks
      });
    }
    else{
      this.InitializeForm();
    }
  }

  InitializeForm(){
    this.AccountForm =this.fb.group({
      
      glNumber: [0, Validators.required],
      glHead:["", Validators.required],
      status: 1,
      remarks: [""]
    });
    this.ButtonName = "Save";
  }
  
  Onsubmit(){
    if(this.AccountForm.valid){
      this.AccountModel = this.AccountForm.value;
      this.AccountModel.status = parseInt(this.AccountForm.value.status);
        this.service.CreateGLAccount(this.AccountModel).subscribe(
          (res) => {
            this.toastr.success(res.message);
            this.AccountList.emit();
            this.AccountModel=null;
            console.log(res);
            this.ButtonName = "Save";
          },
          (error) => {
            this.toastr.error("Failed To Save GL");
            console.log(error);
          }
        );
    }
    else{
      this.toastr.warning("Please Enter GL Head Name");
    }

  }

clear(){
  this.AccountForm =this.fb.group({
    glNumber: 0,
    glHead: [""],
    status: null,
    remarks: [""]
  })

}
}

