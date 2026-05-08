import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { TemplateEntryItemModel } from '../../model/template-entry-item.model';
import { TemplateEntryMasterModel } from '../../model/template-entry-master.model';
import { TimeAndActionService } from '../../service/time-and-action.service';


@Component({
  selector: 'app-task-template-list',
  templateUrl: './task-template-list.component.html',
  styleUrls: ['./task-template-list.component.scss']
})
export class TaskTemplateListComponent implements OnInit {
  CustomTemplateForm: FormGroup;
  saveButtonTitle = "Save";
  position: string;
  TaskSelectList: any[] = [];
  TemplateMasterList:TemplateEntryMasterModel[] = [];
  TemplateItemList: TemplateEntryItemModel[] = [];
  TemplateName :string;
  LeadTimePeriod:number;
  showItems:boolean;
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public taskService: TimeAndActionService,
    private toaster: ToastrService,
  ) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.commonService.LoadBuyerList();
  }

  InitializeForm() {
    this.CustomTemplateForm = this.fb.group({
      buyerId: [0, Validators.required]
      
    })
  }

  LoadTemplateMasterList(event) {
    if (event != null) {
    this.taskService
    .GetAllMasterTemplateList(event).subscribe(
      (TemplateListData: any) => {
        if (TemplateListData) {
          this.TemplateMasterList = TemplateListData;
          console.log(this.TemplateMasterList);
        }
        else {
          console.log('No Template Master data found');
        }
      },
      (error) => {
        
      }
    );
      console.log('This Is Selected Buyer Id = ' + event);
      } else {
       
      }
  }

    PreviewTemplate(rowData:TemplateEntryMasterModel) {
      if (rowData.id != null) {
        this.TemplateName = rowData.template;
        this.LeadTimePeriod = rowData.leadTime;
      this.taskService
      .GetAllMasterTemplateListDetails(rowData.id).subscribe(
        (MasterItemListData: any) => {
          if (MasterItemListData) {
            this.TemplateItemList = MasterItemListData;
            
            console.log(this.TemplateItemList);
            this.showItems = true;
          }
          else {
            console.log('No Template Items Found');
            this.showItems = false;
          }
        },
        (error) => {
          //this.toastr.warning("No Manual BOM sheet data Found");
          this.showItems = false;
        }
      );
        console.log('This Is Selected Template Id = ' + rowData.id);
        } else {
          this.TemplateItemList = [];
          this.showItems= false;
        }
    }


}
