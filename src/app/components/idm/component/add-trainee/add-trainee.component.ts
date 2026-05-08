import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { EmployeePersonalInfoModel } from '../../model/employee-personal-info.model';
import { TrainingEntryModel } from '../../model/trainingEntry.model';
import { TrainingListModel } from '../../model/trainingList.model';
import { TrainingTypeModel } from '../../model/trainingType.model';
import { IdmService } from '../../service/idm.service';
import { EVoteService } from 'src/app/components/e-vote/services/e-vote.service';

@Component({
  selector: 'app-add-trainee',
  templateUrl: './add-trainee.component.html',
  styleUrls: ['./add-trainee.component.scss']
})
export class AddTraineeComponent implements OnInit {
  trainingReqForm: FormGroup;
  noResult = false;
  GatePassEmployeeList: any = [];
  AllNewTrainingList: TrainingListModel[]= new Array();
  TrainingTypeList: any[]= new Array();
  TrainingEntrySectionList: any = [];
  TrainingTypeListDropDown: any[]= new Array();
  TrainingInfo: TrainingEntryModel;
  TrainingInfoList: TrainingEntryModel[];
  TrainingInfoListForRequisition: any[]= new Array();
  displayOthers:boolean = false;
  myId:string;
  employeeSection:string;
  emplyPrevTrainingList:any[];   //previous training list
  employeeInfo:EmployeePersonalInfoModel[]= new Array();
  masterSelected:boolean=false;
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: IdmService,
    private toastr: ToastrService,
    private authService: AuthService,
    
    public evoteService: EVoteService
  ) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.commonService.LoadGatePassEmplyeeList();
    this.commonService.LoadGatePassEmplyeeDepartmentList();
    this.LoadTrainingTypeList();
  }

  InitializeForm() {
    this.trainingReqForm = this.fb.group({
      trainerName:[""],
      departmentName:[""],
      typeId:[0],
      trainingName:[""],
      sectionName:[""],
      otherTypeId:[0],
      employeeName: [""],
      employeeId:[0]
      
    });
    this.employeeSection = "";
  }

//SELECT EMPLOYEE DROP DOWN
onSelectEmployee(event: TypeaheadMatch): void {  
  this.trainingReqForm.patchValue({
    employeeId: event.item.value,
    employeeName: event.item.label
  });
  this.service.PersonalByMyId(event.item.value).subscribe(
    (data: EmployeePersonalInfoModel) => {
      this.employeeSection=data.section;
    },
    (error) => {
      this.toastr.warning("No Data Found", "Personal Info");
      this.employeeSection = "";
    }
  );

  this.service.GetAllRequitionListByEmpolyeeId(event.item.value).subscribe(
    (res: any[]) => {
      this.emplyPrevTrainingList = res;
      console.log('emplyPrevTrainingList',this.emplyPrevTrainingList);
    },
    (error) => {
      this.toastr.error("Failed to Load Visions");
      this.emplyPrevTrainingList = [];
    }
  );
} 

//employee No result found
typeaheadNoResults(event: boolean): void {
  this.noResult = event;
  if (this.noResult == true) {
    this.trainingReqForm.patchValue({
      employeeName: "",
      employeeId: null
    });
    const control = this.trainingReqForm.get('employeeName');// {2}
    control.markAsTouched({ onlySelf: true });// {3}
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
  typeaheadNoResultsForDepartment(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.trainingReqForm.patchValue({
        departmentName: ""
      });
    }
  }
  onSelectEmployeeDepartment(event: TypeaheadMatch): void {
    this.trainingReqForm.patchValue({
      departmentName: event.item.value,
    });
    let department = this.trainingReqForm.value.departmentName;
    if(department!=null && department!=undefined && department!=""){
      this.commonService.LoadGatePassEmplyeeSectionListByDepartment(this.trainingReqForm.value.departmentName);
    }
  }
  typeaheadNoResultsForSection(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.trainingReqForm.patchValue({
        sectionName: ""
      });
    }
  }
  onSelectEmployeeSection(event: TypeaheadMatch): void {
    this.trainingReqForm.patchValue({
      sectionName: event.item.value,
    });
  }
  otherTypeChange(){
    debugger;
    let typeOther = this.trainingReqForm.value.otherTypeId;
    let departmentOther = this.trainingReqForm.value.departmentName;
    if(typeOther > 0 && departmentOther!=undefined && departmentOther!=null && departmentOther!=""){
      this.service.GetTrainingListByDeptType(typeOther ,departmentOther).subscribe(
        (res: TrainingEntryModel[]) => {
         this.TrainingInfoList = null;
         this.TrainingInfoList = [];
         this.TrainingInfoList = res;
         this.TrainingInfoList.forEach((c) => c.isSelected = false);
        },
        (error) => {
          this.toastr.warning("Failed To Load Data", "Training List");
        }
      );
    }
    else{
    }
  }
  addTrainingRequision(event,index:number,rowData:TrainingEntryModel){
    if (event.target.checked) {
      this.TrainingInfoList[index].isSelected = true;
      //const indexNo: number = this.TrainingInfoListForRequisition.indexOf(rowData);
      const indexNo: number = this.TrainingInfoListForRequisition.findIndex(e => e.trainingName == rowData.trainingName);
      if (indexNo < 0 ) {
        rowData.targetPoint = rowData.achievePoint;
        this.TrainingInfoListForRequisition.push(rowData);
      }  
    }
    else{
      this.TrainingInfoList[index].isSelected = false;
      //const indexNo: number = this.TrainingInfoListForRequisition.indexOf(rowData);
      const indexNo: number = this.TrainingInfoListForRequisition.findIndex(e => e.trainingName == rowData.trainingName);
      if (indexNo !== -1) {
          this.TrainingInfoListForRequisition.splice(indexNo, 1);
      }  
    }
}
allSelect(event){
  if (event.target.checked) {
    //this.TrainingInfoList.forEach((c) => c.isSelected = true);
    for (let index = 0; index < this.TrainingInfoList.length; index++) {
      //const element = this.TrainingInfoList[index];
      this.TrainingInfoList[index].isSelected = true;
      this.TrainingInfoList[index].targetPoint = this.TrainingInfoList[index].achievePoint;
      const indexNo: number = this.TrainingInfoListForRequisition.findIndex(e => e.trainingName == this.TrainingInfoList[index].trainingName);
      if (indexNo < 0 ) {
        this.TrainingInfoListForRequisition.push(this.TrainingInfoList[index]);
      }  
    }
  }
  else{
      for (let index = 0; index < this.TrainingInfoList.length; index++) {
        this.TrainingInfoList[index].isSelected = false;
        const indexNo: number = this.TrainingInfoListForRequisition.findIndex(e => e.trainingName == this.TrainingInfoList[index].trainingName);
        if (indexNo !== -1) {
            this.TrainingInfoListForRequisition.splice(indexNo, 1);
        } 
      }
  }
}
deleteRequision(obj: TrainingEntryModel) {
  const index: number = this.TrainingInfoListForRequisition.indexOf(obj);
  if (index !== -1) {
      this.TrainingInfoListForRequisition.splice(index, 1);
  }        
}
assignPointToRequision(event,index:number,obj: any) {
    let point =this.TrainingInfoListForRequisition[index].targetPoint;
    if(point>0){
      //do nothing
    }
    else{
      this.TrainingInfoListForRequisition[index].targetPoint = 1;
    }     
}
RequisitionMaster:any;
TargetFlag:boolean=false;
onSubmit(){
  debugger
  if (this.TrainingInfoListForRequisition.length > 0 ) {   
    this.TrainingInfoListForRequisition.forEach((element) => {
      if(element.target==undefined || element.target==null || element.target==""){
        this.TargetFlag = true;
      }
    });
    if(this.TargetFlag==false){
      this.RequisitionMaster = this.trainingReqForm.value;
      var chars =  this.RequisitionMaster.employeeName.split('-');
      this.RequisitionMaster.employeeName=chars[0];
      this.RequisitionMaster.employeeId = this.RequisitionMaster.employeeId;
      this.RequisitionMaster.employeeDept = chars[2];
      this.RequisitionMaster.departmentName = chars[2];
      this.RequisitionMaster.sectionName = this.employeeSection;
      //Check wether employee done the same course twice or not
      var tempolist = this.emplyPrevTrainingList.filter(x => x.trainingCode == this.TrainingInfoListForRequisition[0].trainingCode);
      if(tempolist.length > 0)
      {
        this.toastr.warning("Selected Employee Already Completed This Training");
      }
        else{
          this.service.TrainingRequisitionAddTrainee(this.RequisitionMaster, this.TrainingInfoListForRequisition).subscribe(
            (res) => {
              this.toastr.success("Requisition Successful");
              this.employeeSection = "";
              this.trainingReqForm.controls['employeeName'].reset()
              this.trainingReqForm.controls['employeeId'].reset()  
            },
            (error) => {
              this.toastr.error("Failed To Requisition Save");
              this.employeeSection = "";
            });
        }
    }
    else{
      this.toastr.warning('Please Select All Target')
      this.TargetFlag = false;
    }
  } else {
    this.toastr.warning("Please Add Training First!");
  }  
}

//THIS IS FOR FILTERING SECTION
async filterSectionListByDepartment() {
  if (this.trainingReqForm.value.departmentName == undefined || this.trainingReqForm.value.departmentName == "" || this.trainingReqForm.value.departmentName == null) {
    this.TrainingEntrySectionList = [];
    this.TrainingEntrySectionList = this.commonService.GatePassSectionListByDept;
  }
  else {
    var sectionList = await this.evoteService.GetGatePassEmployeeSectionListByDept(this.trainingReqForm.value.departmentName).toPromise();
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
