import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { AccidentModel } from '../../model/accident.model';
import { AccidentManagementService } from '../../service/accident-management.service';
import { AccidentComponent } from '../accident/accident.component';

@Component({
  selector: 'app-accident-list',
  templateUrl: './accident-list.component.html',
  styleUrls: ['./accident-list.component.scss']
})
export class AccidentListComponent implements OnInit {
  @ViewChild("CreateAccidentExpense")child:AccidentComponent;
  ButtonName:string;
  AllAccidentList: AccidentModel[]= new Array();
  AccidentModel: AccidentModel;
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
    this.service.GetAllExpenseList().subscribe(
      (data: any[]) => {
        console.log(data);
        this.AllAccidentList=data;
        console.log(this.AllAccidentList);
        
      },
      (error) => {
        this.toastr.warning("No Data Found", "Type");

      }
    );
  }
  EditTypes(rowData:AccidentModel){
    this.child.AccidentModel = rowData;
    this.child.InitializeFormFromParent();
    this.child.ButtonName = "Update";
    this.displayCreate = true;

  }
  OpenNew() {
    this.displayCreate = true;
  }
}

