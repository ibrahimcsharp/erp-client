import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { TaskCommonService } from '../../../services/task.common.service';

@Component({
  selector: 'app-task-comment-create',
  templateUrl: './task-comment-create.component.html',
  styleUrls: ['./task-comment-create.component.scss']
})
export class TaskCommentCreateComponent implements OnInit {

  reactiveForm: FormGroup;
  title: string;
  spinnerName = "createSpinner";
  @Output() ToCreate = new EventEmitter();
  model: any = null;

  maxComments = 500;

  constructor(public taskCommonService: TaskCommonService,
    public fb: FormBuilder,
    public bsModalRef: BsModalRef,
    public commonService: CommonServiceService,
  ) { }

  ngOnInit(): void {
    this.CreateForm();
  }

  CreateForm() {    
      this.OnClear();   
  }

  OnClear(): void {
    this.reactiveForm = this.fb.group({
      id: [0],
      comments: ["", [Validators.required, Validators.maxLength(500)]],
      taskId: [this.taskCommonService.selectedTaskId, [Validators.required]],
    });
  }

  onSubmit() {
    this.reactiveForm.patchValue({
      taskId:this.taskCommonService.selectedTaskId
    })
    //alert(this.reactiveForm.value.taskId);
    if (this.reactiveForm.valid && this.reactiveForm.value.taskId > 0) {
      this.taskCommonService.SaveComments(this.reactiveForm.value);
      this.OnClear();
    } else {
      this.commonService.ValidationShow(this.reactiveForm);
    }

  }

}
