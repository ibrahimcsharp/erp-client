import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { environment } from 'src/environments/environment';
import { IdmService } from '../../service/idm.service';

@Component({
  selector: 'app-skill-plan-course',
  templateUrl: './skill-plan-course.component.html',
  styleUrls: ['./skill-plan-course.component.scss']
})
export class SkillPlanCourseComponent implements OnInit {
  currentDate:string;
  toastr: any;
  displayBasic: boolean;
  url = environment.fileUrl;
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: IdmService,
  ) { }

  ngOnInit(): void {
    this.onLoad();
  }
  SkillPlanCourseListData:any[]=[];
  TraineeList:any[]=[];
  onLoad(){
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
    let fileObjectId = 137;
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
  showTrainee:boolean=false;
  traineeList(rowData: any){
    this.service.GetTraineeListByTrainingId(rowData.id).subscribe(
      (res: any[]) => {
       this.TraineeList = res;
       console.log('TraineeList');
       console.log(this.TraineeList);
       this.showTrainee = true;
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Trainee List");
      }
    );
  }
}
