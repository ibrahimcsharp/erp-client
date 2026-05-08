import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { AccidentModel } from '../../model/accident.model';
import { AccidentManagementService } from '../../service/accident-management.service';
import { VehicleDocumentService } from '../../service/vehicle-document.service';
import { VehicleManageService } from '../../service/vehicle-manage.service';
import { TmsCommonService } from '../../service/tms-common.service';

@Component({
  selector: 'app-accident',
  templateUrl: './accident.component.html',
  styleUrls: ['./accident.component.scss']
})

export class AccidentComponent implements OnInit {
@Output()accidentExpenseList = new EventEmitter();
  AccidentExpenseForm: FormGroup;
  AccidentModel: AccidentModel;
  ButtonName:string;
  fileTypeData: any;
  AllAccidentList: AccidentModel[]= new Array();

  noResult:boolean;
  AllVehicleList: any = new Array();
  AllVehicleListDropdown: any;
  AllBudgetCodeDropdown: any;
  AllVehicleDropdown:any;
  AllAccidentTypeList:any = new Array();
  allAccidentTypeDropdown:any;
  VehicleRegistrationModelList: any = new Array();
  constructor(public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: VehicleManageService,
    public documentService: VehicleDocumentService,
    public accidentTypeService : AccidentManagementService,
    private toastr: ToastrService,
    public tmsService:  TmsCommonService,
    ) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.LoadBudgetCodes();
    this.InitializeFormFromParent();
    this.tmsService.LoadVehicle();
    this.LoadAccidentType();
  }



  InitializeFormFromParent(){
    if(this.AccidentModel){
      this.AccidentExpenseForm =this.fb.group({
      vehicleId: ["", Validators.required],
      accidentDate:["", Validators.required],
      accidentLocation:["", Validators.required],
      typeId:["", Validators.required],
      involveWith:["", Validators.required],
      amountStatus: 0,
      totalAmount: 0.00,
      insuranceClaim:0,
      insuranceRecovered:0,
      odometer: "",
      budgetCode : [ "", Validators.required],
      remarks: [""]


      });
      this.ButtonName = "Update";
    }
    else{
      this.InitializeForm();
    }
  }





  InitializeForm(){
    debugger;
    this.AccidentExpenseForm =this.fb.group({
      vehicleId: [0, Validators.required],
      accidentDate:["", Validators.required],
      accidentLocation:["", Validators.required],
      typeId:[0, Validators.required],
      involveWith:["", Validators.required],
      amountStatus:0,
      totalAmount: 0.00,
      insuranceClaim:0,
      insuranceRecovered:0,
      odometer: 0,
      budgetCode : [ "", Validators.required],
      remarks: [""],
      status:0
    });
    this.ButtonName = "Save";
  }

  // Accident Type Start

  LoadAccidentType() {
    this.accidentTypeService.GetAllTypeList().subscribe(
        (data: any[]) => {
          //data => { this.accidentTypeService = data.json();
            console.log(data);
            this.AllAccidentTypeList = data;
            this.allAccidentTypeDropdown = new Array();
            for (var i = 0; i < this.AllAccidentTypeList.length; i++) {
                this.allAccidentTypeDropdown.push({
                    label: this.AllAccidentTypeList[i].typeName,
                    value: this.AllAccidentTypeList[i].typeId,
                });
            }
            console.log(this.AllAccidentTypeList);
  
        },
        (error) => {
            this.toastr.warning("Failed To Load Data", "Accident Types");
  
        }
    );
  }


 


// onSelectaccidenttype(event: TypeaheadMatch): void {
//   this.AccidentExpenseForm.patchValue({
//     typeId: event.item.value,
//     typeName: event.item.label
//   });

// }
//style No result found
// typeaheadNoResultsForAccidentType(event: boolean): void {
//   this.noResult = event;
//   if (this.noResult == true) {
//     this.AccidentExpenseForm.patchValue({
//       typeName: "",
//       typeId: null
//     });
//     const control = this.AccidentExpenseForm.get('typeId');
//     control.markAsTouched({ onlySelf: true });
//   }
// }

// Accident Type End
  LoadBudgetCodes(){
    this.AllBudgetCodeDropdown = new Array();
    this.AllBudgetCodeDropdown.push({ label: "--Select One--", value: "" });
    this.AllBudgetCodeDropdown.push({
      label: "Police Cost-001",
      value: "Police Cost-001",
    });

    console.log(this.AllBudgetCodeDropdown);

}


OnSubmit(){
  if(this.AccidentExpenseForm.valid){
    this.AccidentModel = this.AccidentExpenseForm.value;
    this.AccidentModel.status = parseInt(this.AccidentExpenseForm.value.status);

  }
  else{
    this.toastr.warning("Please Enter Accident Type Name");
  }

}

// LoadVehicleRegistration(){
//   this.documentService.GetVehicleRegistrationList().subscribe(
//     (data: any[]) => {
//       console.log(data);
//       this.VehicleRegistrationModelList=data;
//       console.log(this.VehicleRegistrationModelList);
//     },
//     (error) => {
//       this.toastr.warning("No Data Found", "Vehicle Registration");
//     }
//   );
// }

EditAccident(rowData:AccidentModel){
  const datepipe: DatePipe = new DatePipe('en-US')
  this.AccidentExpenseForm.patchValue({
    accidentExpenseId: rowData.accidentExpenseId,
    vehicleId: rowData.vehicleId,
    accidentDate: datepipe.transform(rowData.accidentDate,'yyyy-MM-ddThh:mm' ),
    //    documentType:rowData.documentType,
    accidentLocation: rowData.accidentLocation,
    typeId: rowData.typeId,
    involveWith:rowData.involveWith,
    amountStatus:rowData.amountStatus,
    totalAmount:rowData.totalAmount,
    insuranceClaim:rowData.insuranceClaim,
    insuranceRecovered:rowData.insuranceRecovered,
    odometer: rowData.odometer,
    budgetCode : rowData.budgetCodeId,
    remarks:rowData.remarks
  });
  this.ButtonName = "Update";
}

// FileViewVehicleRegistration(rowData:VehicleRegistrationModel){
// }

Clear(){
  this.AccidentExpenseForm =this.fb.group({
    vehicleId: [0, Validators.required],
    accidentDate:["", Validators.required],
    accidentLocation:["", Validators.required],
    typeId:[0, Validators.required],
    involveWith:["", Validators.required],
    amountStatus:0,
    totalAmount: 0.00,
    insuranceClaim:0,
    insuranceRecovered:0,
    odometer: 0,
    budgetCode : [ "", Validators.required],
    remarks: [""],
    status:0
  });
  this.ButtonName = "Save";
}



// getFileDetails(e) {
//   this.fileTypeData = new FormData();
//   for (var i = 0; i < e.target.files.length; i++) {
//     this.fileTypeData.append(e.target.files[i].name, e.target.files[i]);
//   }
// }
// filePath= "";
// fileComment= "";
// fileName= "";
// uploadFiles() {
//   let event = "TMS";
//   let objectId = 50;
//   var refId =this.VehicleRegistrationForm.value.registrationNumber;
//   var fileComment =this.VehicleRegistrationForm.value.documentType;
//   var fileRevised ="";
//   this.commonService.FileUpload(refId,fileComment,fileRevised,event,objectId,this.fileTypeData).subscribe(
//       (res) => {
//         this.toastr.success("Approval", "File Uploded Successfully");
//         this.filePath= "",
//         this.fileComment="",
//         this.fileName=""
//       },
//       (error) => { }
//     );
// }

}

