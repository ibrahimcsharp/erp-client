import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { environment } from 'src/environments/environment';
import { IdmService } from '../../service/idm.service';
import { rowDataBound } from '@syncfusion/ej2-angular-treegrid';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-training-file-upload',
  templateUrl: './training-file-upload.component.html',
  styleUrls: ['./training-file-upload.component.scss']
})
export class TrainingFileUploadComponent implements OnInit {
  currentDate:string;
  displayBasic: boolean;
  url = environment.fileUrl;

  constructor(
    public commonService: CommonServiceService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public service: IdmService,
  ) { }

  ngOnInit(): void {
    this.onLoad();
  }

SkillPlanCourseListData:any[]=[];
onLoad(){
  debugger
      this.service.GetSkillPlanCourses().subscribe(
        (res: any[]) => {
         this.SkillPlanCourseListData = res;
         console.log('All Skill Course list');
         console.log(this.SkillPlanCourseListData);
        },
        (error) => {
          this.toastr.warning("Failed To Load Data", "Skill Plan Course List");
        }
      );
    }



    ShowFiles(obj: any) {
      this.displayBasic = true;
      let fileObjectId = 129;
      this.commonService.GetTrainingFilesByRefId(obj.id, fileObjectId).subscribe((data: any) => {
            if (data) {
              this.commonService.commonFilesList = data;
              console.log("common List : " , this.commonService.commonFilesList);
              
            }
          },
          (error) => {
            this.toastr.warning("Failed To Load Data", "Files");
          }
        );
    }

fileCount =0;
formData: FormData;
fileToUpload: File;
onFileSelect(event , rowData:any) {
  debugger
  this.fileCount = event.target.files.length;
  this.formData = new FormData();
  for (var i = 0; i < event.target.files.length; i++) {
    this.formData.append(event.target.files[i].name, event.target.files[i]);
  }
}
submitFile(rowData: any){
  debugger
  let objectId = 137;
  let event = "IDM Training File";            
  if (this.formData != undefined) {
    this.commonService.CreateFileForIDMTraining(rowData.id,rowData.trainingName,"",event,objectId,this.formData).subscribe(
        (res) => {
          this.toastr.success("File Uploaded Successfully")
          this.formData = undefined;
          this.ngOnInit();
        },
        (error) => {
          this.toastr.error("File Uploaded Failed")
          this.formData = undefined;
          this.ngOnInit();
        }
      );
}   
else if(this.formData == undefined){
  this.toastr.warning("No File Selected !")
}

}
}
