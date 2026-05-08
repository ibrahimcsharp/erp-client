import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { TrainingEntryModel } from '../../../model/trainingEntry.model';
import { TrainingListModel } from '../../../model/trainingList.model';
import { TrainingTypeModel } from '../../../model/trainingType.model';
import { IdmService } from '../../../service/idm.service';

import { EVoteService } from 'src/app/components/e-vote/services/e-vote.service';

@Component({
  selector: 'app-training-entry',
  templateUrl: './training-entry.component.html',
  styleUrls: ['./training-entry.component.scss']
})
export class TrainingEntryComponent implements OnInit {
  trainingEntryForm: FormGroup;
  noResult = false;
  GatePassEmployeeList: any = [];
  TrainingEntrySectionList: any = [];
  AllNewTrainingList: TrainingListModel[]= new Array();
  TrainingTypeList: any[]= new Array();
  TrainingTypeListDropDown: any[]= new Array();
  TrainingInfo: TrainingEntryModel;
  TrainingInfoList: TrainingEntryModel[];
  fileTypeData: any = [];
  showUploadButton: boolean = false;
  showUpdateButton: boolean = false;
  showNewTrainingList: boolean = false;
  showTrainingList: boolean = false;
  @ViewChild('inputFile') myInputVariable: ElementRef;
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: IdmService,
    private toastr: ToastrService,
    public evoteService: EVoteService
  ) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.commonService.LoadGatePassEmplyeeList();
    this.commonService.LoadGatePassEmplyeeDepartmentList();
    this.LoadTrainingTypeList();
    
  }
  InitializeForm() {
    this.trainingEntryForm = this.fb.group({
      id: 0,
      trainerName:[""],
      departmentName:["", Validators.required],
      typeId:[null],
      trainingName:[""],
      sectionName:[""],
      trainerType:[""],
      trainerNameExternal:[""],
      trainingCode:["", Validators.required]
    });

  }

  addUserToList(){
    this.showNewTrainingList = true;
    if (this.trainingEntryForm.valid) {
      if(this.trainingEntryForm.value.trainingName!=undefined && this.trainingEntryForm.value.trainingName!=null && this.trainingEntryForm.value.trainingName!=""){
        var dublicate = this.AllNewTrainingList.find(x=>x.trainingCode == this.trainingEntryForm.value.trainingCode);
        if(dublicate!=undefined && dublicate!=null){
          this.toastr.warning("Duplicate Training Code found. please change the code");
        }
        else{
          this.AllNewTrainingList.push(this.trainingEntryForm.value);
          
        }
        
      }
      else{
        this.toastr.error("Please Write Trainning Title");
      }    
    }
    else{
      this.toastr.error("Please Select All Required Field");
    }
}


  editTrainingInfo(obj: TrainingEntryModel) {
    
    this.showUpdateButton = true;
    this.showUploadButton = true;
      this.trainingEntryForm.patchValue({
        id: obj.id, 
        trainingName: obj.trainingName.split("-")[0],
        trainerName: obj.trainerName+"-"+ obj.trainerId,
        trainerNameExternal: obj.trainerNameExternal,
        trainerType : obj.trainerType,
        trainingCode:obj.trainingCode
      });
      if(obj.trainerType == 'I'){
        this.internalType = true;
      }
      if(obj.trainerType == 'E'){
        this.externalType = true;
      }
      this.clickOnType();
      
      
  }
  
  DeleteTraining(id: number) {
    if (id > 0) {
      this.service.DeleteTraining(id).subscribe(res => {
         
          if(res.message=='DELETED SUCCESSFULLY'){
            this.toastr.success(res.message)
          }
          else{
            this.toastr.warning(res.message)
          }
          this.clickOnType();
      },
        err => {
          this.toastr.error("Delete failed!");
        }
      );
    }
    else {
      this.toastr.error("Didn't find Training Id!");
    }

  }

  clickMethod(id: number) {
    if(confirm("Confirm Delete Training ! ")) {
      this.DeleteTraining(id);
    }
  }

  // deleteTraining(id:number) {
  //   console.log(id)
  //   this.service.deleteTraining(id).subscribe(
     
  //     (data) => {
  //       this.toastr.warning("Training", "Deleted Successfully");
  //       this.ngOnInit();
  //       console.log(data);
  //      }
  //   )
  // }

  
deleteItem(obj: TrainingListModel) {
    const index: number = this.AllNewTrainingList.indexOf(obj);
    if (index !== -1) {
        this.AllNewTrainingList.splice(index, 1);
    }        
}
onSelectEmployee(event: TypeaheadMatch): void {
  this.trainingEntryForm.patchValue({
    employeeId: event.item.value,
    employeeName: event.item.label
  });
} 
//employee No result found
typeaheadNoResults(event: boolean): void {
  this.noResult = event;
  if (this.noResult == true) {
    this.trainingEntryForm.patchValue({
      employeeName: "",
      employeeId: null
    });
    const control = this.trainingEntryForm.get('employeeName');            // {2}
    control.markAsTouched({ onlySelf: true });       // {3}
  }
}
onSelectSupervisor(event: TypeaheadMatch): void {
  this.trainingEntryForm.patchValue({
    supervisorId: event.item.value,
    trainerName: event.item.label
  });
  this.LoadEmployeeList();
}  
//employee No result found
typeaheadNoResultsSupervisor(event: boolean): void {
  this.noResult = event;
  if (this.noResult == true) {
    this.trainingEntryForm.patchValue({
      trainerName: "",
      supervisorId: null
    });
    const control = this.trainingEntryForm.get('trainerName');
    control.markAsTouched({ onlySelf: true });
  }
}

 //employee No result found
 typeaheadNoResultsForDepartment(event: boolean): void {
  this.noResult = event;
  if (this.noResult == true) {
    this.trainingEntryForm.patchValue({
      departmentName: ""
    });
  }
}

onSelectEmployeeDepartment(event: TypeaheadMatch): void {
  this.trainingEntryForm.patchValue({
    departmentName: event.item.value,
  });
  let department = this.trainingEntryForm.value.departmentName;
  if(department!=null && department!=undefined && department!=""){
    this.commonService.LoadGatePassEmplyeeSectionListByDepartment(this.trainingEntryForm.value.departmentName);
  }
 
}

typeaheadNoResultsForSection(event: boolean): void {
  this.noResult = event;
  if (this.noResult == true) {
    this.trainingEntryForm.patchValue({
      sectionName: ""
    });
  }
}

// onSelectEmployeeSection(event: TypeaheadMatch): void {
//   debugger
//   this.showTrainingList = true;
//   this.trainingEntryForm.patchValue({
//     sectionName: event.item.value,
//   });
//   let type = this.trainingEntryForm.value.typeId;
//   let department = this.trainingEntryForm.value.departmentName;
//   let section = event.item.value;
//   if(type > 0 && department!=undefined && department!=null && department!="" && section!=undefined && section!=null && section!=""){
//     this.service.GetTrainingListByType(type ,department, section ).subscribe(
//       (res: TrainingEntryModel[]) => {
//        this.TrainingInfoList = res;
//        console.log(this.TrainingInfoList);      
//       },
//       (error) => {
//         this.toastr.warning("Failed To Load Data", "Training List");
//       }
//     );
//   }
//   else{
//   }
// }

onSelectEmployeeSection(event: TypeaheadMatch): void {
  this.showTrainingList = true;
  let type = this.trainingEntryForm.value.typeId;
  let department = this.trainingEntryForm.value.departmentName;
 // let section = event.item.value;
  if(type > 0 && department!=undefined && department!=null && department!=""){
    this.service.GetTrainingListByDeptType(type ,department).subscribe(
      (res: TrainingEntryModel[]) => {
       this.TrainingInfoList = res;
       console.log(this.TrainingInfoList);
       
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Training List");
      }
    );
  }
  else{
   
  }
 
}


LoadTrainingTypeList() {
  this.service.GetTrainingTypeList().subscribe(
    (res: TrainingTypeModel[]) => {
      this.TrainingTypeList = res;
      this.TrainingTypeListDropDown = new Array();
      this.TrainingTypeListDropDown.push({
        label: "Select",
        value: null,
      });
      for (var i = 0; i < this.TrainingTypeList.length; i++) {
        this.TrainingTypeListDropDown.push({
          label: this.TrainingTypeList[i].typeName,
          value: this.TrainingTypeList[i].id,
        });
      }
    },
    (error) => {
      this.toastr.warning("Failed To Load Data", "Training Type");
    }
  );
}


clickOnType(){
  this.showTrainingList = true;
  let type = this.trainingEntryForm.value.typeId;
  let department = this.trainingEntryForm.value.departmentName;
  
  if(type > 0 && department!=undefined && department!=null && department!="" ){
    this.service.GetTrainingListByDeptType(type ,department ).subscribe(
      (res: TrainingEntryModel[]) => {
       this.TrainingInfoList = res;
       
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Training List");
      }
    );
  }
  else{
  }

}


LoadEmployeeList(){
  var stringvalue = this.trainingEntryForm.value.supervisorId; 
  // this.service.GatePassListBySupervisor(stringvalue).subscribe(
  //   (data: any[]) => {
  //     console.log(data);
  //     this.AllGatePassEmployeeList=data;
  //     console.log(this.AllGatePassEmployeeList);
  //   },
  //   (error) => {
  //     this.toastr.warning("No Data Found", "Gate Pass Employee");

  //   }
  // );
}

createTraining(){
  debugger
  if(this.trainingEntryForm.valid){
    if(this.AllNewTrainingList.length >= 0){
      this.TrainingInfo = this.trainingEntryForm.value;
      if(this.trainingEntryForm.value.trainerType=="E"){
        this.trainingEntryForm.value.trainerName = this.trainingEntryForm.value.trainerNameExternal;
      }
      this.service.TrainingCreate(this.TrainingInfo, this.AllNewTrainingList).subscribe(
        (res) => {
          let message = res.message;
          // console.log("Message from Procedure: "+ message);
          this.toastr.success("Training Saved Successful");
          this.AllNewTrainingList= null;
          this.AllNewTrainingList= [];
          this.clickOnType();
        },
        (error) => {
          
          this.toastr.error("Failed To Saved Training");
          // console.log(error);
        }
      );


    }
    else {
      this.toastr.warning("Please add training first!");
    }
}
else{
  this.toastr.warning("Please fill up all required data!");
}

}
updateTrainer(){
  if(this.trainingEntryForm.valid){
    
      this.TrainingInfo = this.trainingEntryForm.value;
      
      this.service.TrainerUpdate(this.TrainingInfo).subscribe(
        (res) => {
          let message = res.message;
          // console.log("Message from Procedure: "+ message);
          this.toastr.success("Updated Successfully");
          this.clickOnType();
          this.uploadFiles(this.trainingEntryForm.value.id);
          this.TrainingInfo.departmentName = this.trainingEntryForm.value.departmentName;
          this.TrainingInfo.sectionName = this.trainingEntryForm.value.sectionName;
          this.TrainingInfo.typeId = this.trainingEntryForm.value.typeId;
          this.trainingEntryForm.patchValue({
            trainerName: "",
            trainingName: "",
          })
          this.myInputVariable.nativeElement.value = '';
        },
        (error) => {
          
          this.toastr.error("Failed To Update");
          // console.log(error);
        }
      );
}
else{
  this.toastr.warning("Please fill up all required data!");
}

}
getFileDetails(e) {
  this.fileTypeData = new FormData();
  for (var i = 0; i < e.target.files.length; i++) {
    this.fileTypeData.append(e.target.files[i].name, e.target.files[i]);
  }
  
}
filePath= "";
fileComment= "";
fileName= "";
uploadFiles(id:number) {
  let event = "TrainerDocument";
  let objectId = 129;
  var refId = id;
  var fileComment = "";
  var fileRevised = "";
  this.commonService.FileUploadForTrainer(refId,fileComment,fileRevised,event,objectId,this.fileTypeData).subscribe(
      (res) => {
        this.toastr.success("Approval", "File Uploded Successfully");
        this.filePath= "",
        this.fileComment="",
        this.fileName=""
      },
      (error) => { }
    );
}
internalType:boolean=false;
externalType:boolean=false;
changeTrainerType(){

  if(this.trainingEntryForm.value.trainerType=="I"){
    this.internalType = true;
    this.externalType = false;

  }
  else if(this.trainingEntryForm.value.trainerType=="E"){
    this.externalType = true;
    this.internalType = false;
  }
  else{
    this.internalType = false;
    this.externalType = false;
  }
}
clearForm(){
  //this.ngOnInit();
  this.trainingEntryForm.reset();
  this.trainingEntryForm.value.id = 0;
  this.showUpdateButton = false;
  this.showUploadButton = false;
  this.showNewTrainingList = false;
  this.showTrainingList = false;
  this.internalType = false;
  this.externalType = false;
  this.AllNewTrainingList= [];
  this.fileTypeData = [];
  this.TrainingInfoList = [];
  this.ngOnInit();

}
//THIS IS FOR FILTERING SECTION
async filterSectionListByDepartment() {
  if (this.trainingEntryForm.value.departmentName == undefined || this.trainingEntryForm.value.departmentName == "" || this.trainingEntryForm.value.departmentName == null) {
    this.TrainingEntrySectionList = [];
    this.TrainingEntrySectionList = this.commonService.GatePassSectionListByDept;
  }
  else {
    var sectionList = await this.evoteService.GetGatePassEmployeeSectionListByDept(this.trainingEntryForm.value.departmentName).toPromise();
    this.TrainingEntrySectionList = [];
    
    var employeeSectionList = sectionList.filter((item, i) => sectionList.findIndex((t) => t.section === item.section) === i);
    for (var i = 0; i < employeeSectionList.length; i++) {
     this.TrainingEntrySectionList.push({
       label: employeeSectionList[i].section,
       value: employeeSectionList[i].section,
      });
     }
  }
}

}
  
