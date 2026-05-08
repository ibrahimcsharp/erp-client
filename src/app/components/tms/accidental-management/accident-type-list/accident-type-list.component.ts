import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { AccidentTypeCreateModel } from '../../model/accident-type.model';

import { AccidentManagementService } from '../../service/accident-management.service';
import { AccidentTypeComponent } from '../accident-type/accident-type.component';

@Component({
  selector: 'app-accident-type-list',
  templateUrl: './accident-type-list.component.html',
  styleUrls: ['./accident-type-list.component.scss']
})

export class AccidentTypeListComponent implements OnInit {
  @ViewChild("CreateTmsAccidentType")child:AccidentTypeComponent;
  ButtonName:string;
  AllTypeList: AccidentTypeCreateModel[]= new Array();
  TypeModel: AccidentTypeCreateModel;
  displayCreate:boolean;
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: AccidentManagementService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.LoadTypes();
  }
  LoadTypes(){
    this.service.GetAllTypeList().subscribe(
      (data: any[]) => {
        console.log(data);
        this.AllTypeList=data;
        console.log(this.AllTypeList);
        
      },
      (error) => {
        this.toastr.warning("No Data Found", "Type");

      }
    );
  }
  EditTypes(rowData:AccidentTypeCreateModel){
    this.child.TypeModel = rowData;
    this.child.InitializeFormFromParent();
    this.child.ButtonName = "Update";
    this.displayCreate = true;

  }
  OpenNew() {
    this.displayCreate = true;
  }
}

