import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from '../../merchandising/Common-Services/common-service.service';
import { AccountManagementComponent } from '../account-management/account-management.component';
import { AccountCreateModel } from '../model/account.model';
import { AccountManagementService } from '../service/account-management.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  @ViewChild("CreateAccount")child:AccountManagementComponent;
  ButtonName:string;
  AllAccountList: AccountCreateModel[]= new Array();
  AccountModel: AccountCreateModel;
  displayCreate:boolean;
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: AccountManagementService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.LoadAccounts();
  }
  LoadAccounts(){
    this.service.GetAllAccountList().subscribe(
      (data: any[]) => {
        console.log(data);
        this.AllAccountList=data;
        console.log(this.AllAccountList);
        
      },
      (error) => {
        this.toastr.warning("No Data Found", "Type");

      }
    );
  }
  EditTypes(rowData:AccountCreateModel){
    this.child.AccountModel = rowData;
    this.child.InitializeFormFromParent();
    this.child.ButtonName = "Update";
    this.displayCreate = true;

  }
  OpenNew() {
    this.displayCreate = true;
  }
}