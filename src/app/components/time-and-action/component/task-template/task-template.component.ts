import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, Message } from 'primeng/api';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { Buyer } from 'src/app/components/merchandising/models/buyer';
import { SampleDevService } from 'src/app/components/merchandising/services/sampleDev.service';
import { TaskEntryModel } from '../../model/task-enry.model';
import { TemplateEntryItemModel } from '../../model/template-entry-item.model';
import { TemplateEntryMasterModel } from '../../model/template-entry-master.model';
import { TimeAndActionService } from '../../service/time-and-action.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-template',
  templateUrl: './task-template.component.html',
  styleUrls: ['./task-template.component.scss']
})
export class TaskTemplateComponent implements OnInit {
  templateForm: FormGroup;
  saveButtonTitle = "Save";
  position: string;
  msgs: Message[] = [];
  taskList:TaskEntryModel[];
  TaskSelectList: any[] = [];
  TemplateMaster:TemplateEntryMasterModel;
  TemplateItemList: TemplateEntryItemModel[] = [];
  BuyerSelectList: any[] = [];
  noResult = false;
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    public taskService: TimeAndActionService,
    private confirmationService: ConfirmationService,
    public sampleDevService: SampleDevService,
    private currentRoute: ActivatedRoute,
    
    
  ) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.LoadBuyerList();
    this.LoadTaskData();
    this.commonService.LoadGatePassEmplyeeList();

    var id = parseInt(this.currentRoute.snapshot.paramMap.get("id"));
    console.log(id);
    if(id>0){
      //alert("Edit Templete "+ id);
      this.LoadDataForEdit(id);

    }
    
  }

  LoadTaskData() {
    this.taskService.GetAllTaskList().subscribe((data: any) => {
      if (data) {
        this.taskList = data;
        this.TaskSelectList = new Array();
        this.TaskSelectList.push({ label: "Select", value: null });
        for (var i = 0; i < this.taskList.length; i++) {
          this.TaskSelectList.push({
            label: this.taskList[i].taskName,
            value: this.taskList[i].id,
          });
        }
      }

    }, error => {
      this.toaster.warning("Failed To Load Data", "Task List");
      this.toaster = null;
    });

    
  }

  InitializeForm() {
    this.templateForm = this.fb.group({
      id: [0],
      buyerId: [null, Validators.required],
      template: [""],
      captype:[""],
      leadTime: [0],
      TnaTaskSetupId: [null],
      DeadlineDays: [0],
      ExecutionDays: [0],
      NoticeBefore: [0],
      Source: [""],
      DependentTaskId: [null],
      ResponsibleDept: [""],
      AccountablePerson: [""],
      ConsultedPerson:[""],
      InformedPerson:[""],
      templateTaskList: this.fb.array([]),
    });
  }

  LoadBuyerList() {
    this.sampleDevService.GetBuyerList().subscribe(
      (data: Buyer[]) => {
        this.sampleDevService.buyerList = data;
        this.BuyerSelectList = new Array();
        this.BuyerSelectList.push({ label: "Select", value: null });
        for (var i = 0; i < this.sampleDevService.buyerList.length; i++) {
          this.BuyerSelectList.push({
            label: this.sampleDevService.buyerList[i].shortName,
            value: this.sampleDevService.buyerList[i].buyerId,
          });
        }
        console.log('Buyer list');
        console.log(this.BuyerSelectList);

        var abc =this.BuyerSelectList[1].value;
        if (abc > 0) {
          this.templateForm.patchValue({
            buyerId: abc
          });
        }
        
      },
      (error) => {
        this.toaster.warning("Failed To Load Data", "Buyer List");
      }
    );
  }


  BlanktemplateForm(): FormGroup {
    return this.fb.group({
      TnaTaskSetupId: [null],
      DeadlineDays: [0],
      ExecutionDays: [0],
      NoticeBefore: [0],
      Source: [""],
      DependentTaskId: [null],
      ResponsibleDept: [""],
      AccountablePerson: [""],
      ConsultedPerson:[""],
      InformedPerson:[""],
    });
  }
 
  templates(): FormArray {
    return this.templateForm.get("templateTaskList") as FormArray;
  }

  addNewItem(): void {
    this.templates().push(this.BlanktemplateForm());
    this.LoadTaskData();
  }

  DeleteRow(index: number) {
    this.position = "top";
    this.confirmationService.confirm({
      message: "Are you sure that you want to delete this row?",
      header: "Delete Task",
      icon: "pi pi-info-circle",
      accept: () => {
        this.templates().removeAt(index);
      },
      reject: () => {
        this.msgs = [
          {
            severity: "info",
            summary: "Rejected",
            detail: "You have rejected to add item",
          },
        ];
      },
      key: "positionDialog",
    });
  }

  onSubmit() {
    debugger
    if (this.templateForm.valid) {
      if (this.templateForm.value.templateTaskList.length > 0) {
        this.TemplateMaster = this.templateForm.value;
        this.TemplateItemList = this.templateForm.value.templateTaskList;
        this.taskService.CreateTemplate(this.TemplateMaster, this.TemplateItemList).subscribe(
          (res) => {
            this.toaster.success("Saved Successfully");
          },
          (error) => {
            console.log('onsubmit error');
            console.log(error);
            this.toaster.error("Failed To Save");
            
          }
        );
      } else {
        this.toaster.error("Please add booking item first!");
      }
    }
    else {

      this.toaster.error("Please fill up all required data!");
    }
  }

  
  RemoveZeroForDeadline(index: any) {
    var row;
    row = this.templates().at(index);
    var abc = row.controls["DeadlineDays"].value;
    if (abc == null && abc == undefined) {
      //do nothing
    }
    else {
      if (abc == 0) {
        row.patchValue({
          DeadlineDays: null
        });
      }


    }
          
  }

  UndoZeroForDeadline(index: any) {
    var row;
    row = this.templates().at(index);
    var abc = row.controls["DeadlineDays"].value;
    if (abc == null && abc == undefined) {
      row.patchValue({
        DeadlineDays: 0
      });
    }      
  }

  RemoveZeroForExecutionDays(index: any) {
    var row;
    row = this.templates().at(index);
    var abc = row.controls["ExecutionDays"].value;
    if (abc == null && abc == undefined) {
      //do nothing
    }
    else {
      if (abc == 0) {
        row.patchValue({
          ExecutionDays: null
        });
      }


    }
          
  }

  UndoZeroForExecutionDays(index: any) {
    var row;
    row = this.templates().at(index);
    var abc = row.controls["ExecutionDays"].value;
    if (abc == null && abc == undefined) {
      row.patchValue({
        ExecutionDays: 0
      });
    }      
  }

  RemoveZeroForNoticeBefore(index: any) {
    var row;
    row = this.templates().at(index);
    var abc = row.controls["NoticeBefore"].value;
    if (abc == null && abc == undefined) {
      //do nothing
    }
    else {
      if (abc == 0) {
        row.patchValue({
          NoticeBefore: null
        });
      }


    }
          
  }

  UndoZeroForNoticeBefore(index: any) {
    var row;
    row = this.templates().at(index);
    var abc = row.controls["NoticeBefore"].value;
    if (abc == null && abc == undefined) {
      row.patchValue({
        NoticeBefore: 0
      });
    }      
  }

  RemoveZeroForLeadTime() {
    var abc = this.templateForm.controls["leadTime"].value;
    if (abc == null && abc == undefined) {
      //do nothing
    }
    else {
      if (abc == 0) {
        this.templateForm.patchValue({
          leadTime: null
        });
      }


    }
          
  }

  UndoZeroForLeadTime() {
    var abc = this.templateForm.controls["leadTime"].value;
    if (abc == null && abc == undefined) {
      this.templateForm.patchValue({
        leadTime: 0
      });
    }      
  }



  onSelectEmployee(event: TypeaheadMatch , index: number): void {
    if (this.noResult == true) {
      //alert("x"+index)
      const row = this.templates().at(index);
      row.patchValue({
        ResponsibleDept: event.item.label
      });
      const control = row.get("");
      control.markAsTouched({ onlySelf: true });
    }
    
  }
  typeaheadNoResultsEmployee(event: boolean, index: number): void {
    this.noResult = event;
    if (this.noResult == true) {
      const row = this.templates().at(index);
      row.patchValue({
        ResponsibleDept: ""
      });
      const control = row.get("ResponsibleDept");
      control.markAsTouched({ onlySelf: true });

   
    }
  }


  LoadDataForEdit(id: number)
  {
    debugger
    if (id != null) 
    {
      this.taskService
      .GetTemplateMasterDataById(id).subscribe((data: any) => {
          if (data) {
            this.TemplateMaster = data;
            console.log(this.TemplateMaster);
            this.templateForm.patchValue(
              {
                id: data.id,
                buyerId: data.buyerId,
                leadTime: data.leadTime,
                activeStatus: data.activeStatus,
                template: data.template,
                captype: data.captype,
                
              }
            );

            if (data.id != null) {
              //this.TemplateName = rowData.template;
              //this.LeadTimePeriod = rowData.leadTime;
              this.taskService.GetAllMasterTemplateListDetails(data.id).subscribe(
                  (itemData: any) => {
                    if (itemData) {
                      this.TemplateItemList = itemData;
                      console.log(this.TemplateItemList);
                      
                      for(var item of itemData){
                        this.templates().push(
                          this.fb.group({
                           id: item.id,
                           TnaTaskSetupId: item.tnaTaskSetupId,
                           DeadlineDays: item.deadlineDays,
                           ExecutionDays: item.executionDays,
                           NoticeBefore: item.noticeBefore,
                           Source: item.source,
                           DependentTaskId: item.dependentTaskId,
                           ResponsibleDept: item.responsibleDept,
                           AccountablePerson:item.accountablePerson ,
                           ConsultedPerson: item.consultedPerson,
                           InformedPerson:item.informedPerson,
                         })
                       );
  
                      }
                      
                    }
                    else {
                      console.log('No Template Items Found');
                     
                    }
                  },
                  (error) => {
                    this.toaster.warning("No Manual BOM sheet data Found");
                    
                  }
                );
              console.log('This Is Selected Template Id = ' + data.id);
            } else {
              this.TemplateItemList = [];
              
            }
          }
          else {
            console.log('No Template Master data found');
          }
        },
        (error) => {
          console.log('No Template Master data found');
        }
      );
      console.log('This Is Selected Template Id = ' + id);
    } 
    else 
    {
         
    }
  }

}
