import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { TaskCommonService } from '../../../services/task.common.service';

@Component({
  selector: 'app-task-progress-update',
  templateUrl: './task-progress-update.component.html',
  styleUrls: ['./task-progress-update.component.scss']
})
export class TaskProgressUpdateComponent implements OnInit {
  reactiveForm: FormGroup;
  title: string;
  spinnerName = "createSpinner";
  @Output() ToCreate = new EventEmitter();
  model: any = null;
  constructor(public taskCommonService: TaskCommonService,
    public fb: FormBuilder,
    public bsModalRef: BsModalRef,
    public commonService: CommonServiceService,
    ) { }

  ngOnInit(): void {
    this.CreateForm();
  }

  CreateForm() {
    //console.log(this.model);
    if (this.model != null) {
      this.reactiveForm = this.fb.group({
        id: [this.model.id],
        title: [this.model.title, [Validators.required,Validators.maxLength(150)]],
        description: [this.model.description, [Validators.required,Validators.maxLength(500)]],
        responsibleDeptId: [this.model.responsibleDeptId, [Validators.required]],
        responsibleDeptName: [this.model.responsibleDeptName, [Validators.required]],
        taskPriority: [this.model.taskPriority, [Validators.required]],
        remarks: [this.model.remarks,[Validators.maxLength(200)]],
        parentId:[this.model.parentId],
        taskProgress:[this.model.taskProgress,[Validators.required,Validators.max(100),Validators.min(0)]]
      });
    } 
    //console.log(this.reactiveForm.value);
  }

  onSubmit() {
    if (this.reactiveForm.valid) {
      this.ToCreate.emit(this.reactiveForm.value);
      this.bsModalRef.hide();
    } else {
      this.commonService.ValidationShow(this.reactiveForm);
    }
  }

}
