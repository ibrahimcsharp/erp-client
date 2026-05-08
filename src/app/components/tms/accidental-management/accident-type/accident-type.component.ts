import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { AccidentTypeCreateModel } from '../../model/accident-type.model';
import { AccidentManagementService } from '../../service/accident-management.service';


@Component({
  selector: 'app-accident-type',
  templateUrl: './accident-type.component.html',
  styleUrls: ['./accident-type.component.scss']
})


  export class AccidentTypeComponent implements OnInit {
    @Output () typeAccidentList = new EventEmitter();
    TypeForm: FormGroup;
    ButtonName:string;
    AllTypeList: AccidentTypeCreateModel[]= new Array();
    TypeModel: AccidentTypeCreateModel;
    constructor(
      public commonService: CommonServiceService,
      private fb: FormBuilder,
      public service: AccidentManagementService,
      private toastr: ToastrService,
    ) { }
  
    ngOnInit(): void {
      this.InitializeFormFromParent();
    }
  
    InitializeFormFromParent(){
      if(this.TypeModel){
        this.TypeForm =this.fb.group({
          typeId: this.TypeModel.typeId,
          typeName: this.TypeModel.typeName,
          status: this.TypeModel.status,
          remarks: this.TypeModel.remarks
        });
      }
      else{
        this.InitializeForm();
      }
    }
  
    InitializeForm(){
      this.TypeForm =this.fb.group({
        typeId: 0,
        typeName: ["", Validators.required],
        status: null,
        remarks: [""]
      });
      this.ButtonName = "Save";
    }
  
    Onsubmit(){
      if(this.TypeForm.valid){
        this.TypeModel = this.TypeForm.value;
        this.TypeModel.status = parseInt(this.TypeForm.value.status);
          this.service.TypeCreate(this.TypeModel).subscribe(
            (res) => {
              this.toastr.success(res.message);
              this.typeAccidentList.emit();
              this.TypeModel=null;
              console.log(res);
              this.ButtonName = "Save";
            },
            (error) => {
              this.toastr.error("Failed To Save Type");
              console.log(error);
            }
          );
      }
      else{
        this.toastr.warning("Please Enter Accident Type Name");
      }
  
    }

  clear(){
    this.TypeForm =this.fb.group({
      typeId: 0,
      typeName: [""],
      status: null,
      remarks: [""]
    })

  }
}
