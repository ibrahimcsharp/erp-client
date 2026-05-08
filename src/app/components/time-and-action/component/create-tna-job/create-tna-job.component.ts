import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, Message } from 'primeng/api';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { Buyer } from 'src/app/components/merchandising/models/buyer';
import { SampleDevService } from 'src/app/components/merchandising/services/sampleDev.service';
import { TaskEntryModel } from '../../model/task-enry.model';
import { TimeAndActionService } from '../../service/time-and-action.service';

@Component({
  selector: 'app-create-tna-job',
  templateUrl: './create-tna-job.component.html',
  styleUrls: ['./create-tna-job.component.scss']
})
export class CreateTnaJobComponent implements OnInit {
  jobTemplateForm: FormGroup;
  saveButtonTitle = "Save";
  position: string;
  msgs: Message[] = [];
  taskList:TaskEntryModel[];
  TaskSelectList: any[] = [];
  // TemplateMaster:TemplateEntryMasterModel;
  // TemplateItemList: TemplateEntryItemModel[] = [];
  BuyerSelectList: any[] = [];
  currentDate:string;
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    public taskService: TimeAndActionService,
    private confirmationService: ConfirmationService,
    public sampleDevService: SampleDevService,
  ) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.LoadBuyerList();
  }

  InitializeForm() {
      var today = new Date();
      today.setHours(today.getHours() + 6);
      this.currentDate= today.toISOString().slice(0, 16);
      this.jobTemplateForm = this.fb.group({
      buyerId: [null, Validators.required],
      jobNo: [""],
      jobDate:[this.currentDate, Validators.required],
      leadTime: [0],
      TnaTaskSetupId: [null],
      DeadlineDays: [0],
      ExecutionDays: [0],
      NoticeBefore: [0],
      Source: [""],
      DependentTaskId: [null],
      ResponsibleDept: [""],
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

        var buyerId =this.BuyerSelectList[1].value;
        if (buyerId > 0) {
          this.jobTemplateForm.patchValue({
            buyerId: buyerId
          });
        }
        
      },
      (error) => {
        this.toaster.warning("Failed To Load Data", "Buyer List");
      }
    );
  }


}
