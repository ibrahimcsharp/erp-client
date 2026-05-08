import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, Message } from 'primeng/api';
import { TaskEntryModel } from '../../model/task-enry.model';
import { TimeAndActionService } from '../../service/time-and-action.service';

@Component({
  selector: 'app-task-entry',
  templateUrl: './task-entry.component.html',
  styleUrls: ['./task-entry.component.scss']
})
export class TaskEntryComponent implements OnInit {
  TaskEntryModel: TaskEntryModel;
  taskForm: FormGroup;
  saveButtonTitle = "Save";
  position: string;
  msgs: Message[] = [];
  @Output() LoadTask = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    public taskService: TimeAndActionService,
    private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
   this.InitializeFormFromParent();
  }

   InitializeFormFromParent() {
    if (this.TaskEntryModel) {
     this.taskForm = this.fb.group({
       id: [this.TaskEntryModel.id],
       taskName: [this.TaskEntryModel.taskName, Validators.required],
     });
   } else {
     this.InitializeForm();
   }
 }

onSubmit() {
 this.position = "top";
 this.confirmationService.confirm({
   message: "Are you sure that you want to perform this action?",
   header: "Save Task",
   icon: "pi pi-info-circle",
   accept: () => {
     this.taskService.SaveTask(this.taskForm.value).subscribe(
       res => {
         this.InitializeForm();
         this.toaster.success("Saved Successfully", "Task");
         this.saveButtonTitle = "SAVE";
         this.LoadTask.emit();
       }, err => {
         this.InitializeForm();
         this.toaster.error(err.error.error);
         this.saveButtonTitle = "SAVE";
       }
     )
   },
   reject: () => {
     this.msgs = [
       {
         severity: "info",
         summary: "error",
         detail: "Something is wrong!",
       },
     ];
   },
   key: "positionDialog",
 });
}

 //reset form
 InitializeForm() {
   this.taskForm = this.fb.group({
     id: [0],
     taskName: [null, Validators.required],
   });
 }

 BtnClear() {
   this.InitializeForm();
   this.saveButtonTitle = "SAVE";
 }



}
