import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { TaskCommonService } from 'src/app/components/task-management/services/task.common.service';
import { TaskService } from 'src/app/components/task-management/services/task.service';

@Component({
  selector: 'app-task-submission-create',
  templateUrl: './task-submission-create.component.html',
  styleUrls: ['./task-submission-create.component.scss']
})
export class TaskSubmissionCreateComponent implements OnInit {
  reactiveForm: FormGroup;
  spinnerName = "createSpinner";
  @Output() TaskToCreate = new EventEmitter();
  model: any = null;
  maxTitleChars = 150;
  maxDescriptionChars = 500;
  maxRemarksChars = 200;
  saveButtonTitle = "Save";

  constructor(public taskCommonService: TaskCommonService,
    public fb: FormBuilder,
    public bsModalRef: BsModalRef,
    public commonService: CommonServiceService,
    public taskservice: TaskService,
    public toastr: ToastrService) { }


  ngOnInit(): void {
    this.maxTitleChars = 150;
    this.maxDescriptionChars = 500;
    this.maxRemarksChars = 200;
    this.taskCommonService.GetAllDepartmentCompanyWise();
    this.taskCommonService.LoadCompanyForTask();
    this.CreateForm();
  }
  CreateForm() {
    //console.log(this.model);
    if (this.model != null) {
      this.reactiveForm = this.fb.group({
        id: [this.model.id],
        title: [this.model.title, [Validators.required, Validators.maxLength(150)]],
        description: [this.model.description, [Validators.required, Validators.maxLength(500)]],
        taskLocation: [this.model.taskLocation, [Validators.required]],
        responsibleDeptName: [this.model.responsibleDeptName, [Validators.required]],
        responsibleSectionName: [this.model.responsibleSectionName, [Validators.required]],
        taskPriority: [this.model.taskPriority, [Validators.required]],
        remarks: [this.model.remarks, [Validators.maxLength(200)]],
        parentId: [this.model.parentId],
      });
    } else {
      this.OnClear();
    }
    //console.log(this.reactiveForm.value);
  }

  OnClear(): void {
    this.reactiveForm = this.fb.group({
      id: [0],
      title: ["", [Validators.required, Validators.maxLength(150)]],
      description: ["", [Validators.required, Validators.maxLength(500)]],
      taskLocation: ["", [Validators.required]],
      responsibleDeptName: ["", [Validators.required]],
      responsibleSectionName: ["", [Validators.required]],
      taskPriority: ["", [Validators.required]],
      remarks: ["", [Validators.maxLength(200)]],
      parentId: [0],
      taskProgress: [0]
    });
  }

  OnSelectDepartment(event: TypeaheadMatch): void {
    this.reactiveForm.patchValue({
      responsibleDeptName: event.item.departmentName,
    });
    this.taskCommonService.GetAllSectionsByDepartment(event.item.departmentName);
  }

  noResult = false;
  DepartmentSelectNoResults(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.reactiveForm.patchValue({
        responsibleDeptName: "",
      });
      const control = this.reactiveForm.get("responsibleDeptName");
      control.markAsTouched({ onlySelf: true });
    }
  }

  OnSelectSection(event: TypeaheadMatch): void {
    this.reactiveForm.patchValue({
      responsibleSectionName: event.item.sectionName,
    });
  }

  noResultLocation = false;
  LocationSelectNoResults(event: boolean): void {
    this.noResultLocation = event;
    if (this.noResultLocation == true) {
      this.reactiveForm.patchValue({
        taskLocation: "",
      });
      const control = this.reactiveForm.get("taskLocation");
      control.markAsTouched({ onlySelf: true });
    }
  }

  OnSelectLocation(event: TypeaheadMatch): void {
    this.reactiveForm.patchValue({
      taskLocation: event.item.branchOfficeName,
    });
  }


  noResultSection = false;
  SectionSelectNoResults(event: boolean): void {
    this.noResultSection = event;
    if (this.noResultSection == true) {
      this.reactiveForm.patchValue({
        responsibleSectionName: "",
      });
      const control = this.reactiveForm.get("responsibleSectionName");
      control.markAsTouched({ onlySelf: true });
    }
  }

  onSubmit() {
    if (this.reactiveForm.valid) {
      console.log(this.reactiveForm.value);
      this.taskservice.SaveTaskSubmission(this.reactiveForm.value).subscribe((res: any) => {
        if (Number(res.message) > 0) {
          let objectId = 129;
          let event = "Task File";
          if (this.formData != undefined) {
            this.commonService.CreateFileForTask(res.message, "", "", event, objectId, this.formData).subscribe((res) => {

            },
              (error) => { }
            );
          }
        }

        //this.TaskToCreate.emit();
        this.taskCommonService.GetTaskList();
        this.OnClear();
        this.toastr.success("Saved successfully", "Task Submission");
        this.saveButtonTitle = "Save";
      },
        (error) => {
          this.toastr.error("Failed to create!", "Task Submission");
        }
      );
    } else {
      this.commonService.ValidationShow(this.reactiveForm);
    }
  }

  url: any = "./assets/images/dashboard/600px-No_image_available.png";
  formData: FormData;
  fileToUpload: File;
  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.formData = new FormData();
      this.formData.append(event.target.files[0].name, event.target.files[0]);
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }

}
