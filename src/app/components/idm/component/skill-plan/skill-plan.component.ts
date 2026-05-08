import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { EmployeeSkillPlanModel } from '../../model/employee-skill-plan.model';
import { SkillPlanMaster } from '../../model/skill-plan-master.model';
import { IdmService } from '../../service/idm.service';
import { ChartModule } from 'primeng/chart';
import { EVoteService } from 'src/app/components/e-vote/services/e-vote.service';
@Component({
  selector: 'app-skill-plan',
  templateUrl: './skill-plan.component.html',
  styleUrls: ['./skill-plan.component.scss']
})
export class SkillPlanComponent implements OnInit {
  SkillPlanForm: FormGroup;
  currentDate: string;
  toastr: any;
  SkillPlanSectionList: any = [];
 
  valuegraphData: any;
  valuegraphOptions: any;

  percgraphData: any;
  percgraphOptions: any;
  
  piedata: any;
  pieoptions: any;

    

  showStatistics: boolean=false;
 

  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: IdmService,
    public evoteService: EVoteService
  ) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.commonService.GetCompanyByCurrentUser();
    this.commonService.LoadGatePassEmplyeeDepartmentList();
    this.commonService.LoadGatePassEmplyeeList();
    this.onSearch();
    this.getStatistics();
  }




  InitializeForm() {
    var today = new Date();
    today.setHours(today.getHours() + 6);
    this.currentDate = today.toISOString().slice(0, 16);
    this.SkillPlanForm = this.fb.group({
      companyId: [Number(localStorage.getItem("branchId"))],
      companyName: [{ value: localStorage.getItem("branchName"), disabled: true }],
      departmentName: [""],
      sectionName: [""],
      trainerId: [""],
      trainerName: [""],

    });

  }
  noResult = false;
  typeaheadNoResultsForDepartment(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.SkillPlanForm.patchValue({
        departmentName: ""
      });
    }
  }

  onSelectEmployeeDepartment(event: TypeaheadMatch): void {
    this.SkillPlanForm.patchValue({
      departmentName: event.item.value,
    });
    let department = this.SkillPlanForm.value.departmentName;
    if (department != null && department != undefined && department != "") {
      this.commonService.LoadGatePassEmplyeeSectionListByDepartment(this.SkillPlanForm.value.departmentName);
    }

  }

  typeaheadNoResultsForSection(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.SkillPlanForm.patchValue({
        sectionName: ""
      });
    }
  }

  onSelectEmployeeSection(event: TypeaheadMatch): void {
    this.SkillPlanForm.patchValue({
      sectionName: event.item.value,
    });
  }

  typeaheadNoResultsSupervisor(event: boolean): void {
    this.noResult = event;
    if (this.noResult == true) {
      this.SkillPlanForm.patchValue({
        trainerName: "",
      });
      const control = this.SkillPlanForm.get('trainerName');
      control.markAsTouched({ onlySelf: true });
    }
  }

  onSelectSupervisor(event: TypeaheadMatch): void {
    this.SkillPlanForm.patchValue({
      trainerId: event.item.value,
      trainerName: event.item.label
    });
  }
  SkillPlanListData: SkillPlanMaster;
  employeeSkillList: EmployeeSkillPlanModel[] = [];
  totalTargetCoach: number = 0;
  totalRealizedCoach: number = 0;
  totalTargetAutonomy: number = 0;
  totalRealizedAutonomy: number = 0;
  totalParticipationInTraining: number = 0;
  trainingDonePercentage: number = 0;
  totalCoachPercentage: number = 0;
  totalAutonomyPercentage: number = 0;
  onSearch() {

    this.service.GetSkillPlan(this.SkillPlanForm.value.companyId, this.SkillPlanForm.value.departmentName, this.SkillPlanForm.value.sectionName, this.SkillPlanForm.value.trainerId).subscribe(
      (res: SkillPlanMaster) => {
        this.SkillPlanListData = res;
        this.employeeSkillList = this.SkillPlanListData.skillPlanList;
        console.log('All Skill list');
        console.log(this.employeeSkillList);
        this.totalTargetCoach = this.SkillPlanListData.totalTargetCoach;
        this.totalRealizedCoach = this.SkillPlanListData.totalRealizedCoach;
        this.totalTargetAutonomy = this.SkillPlanListData.totalTargetAutonomy;
        this.totalRealizedAutonomy = this.SkillPlanListData.totalRealizedAutonomy;
        this.totalParticipationInTraining = this.SkillPlanListData.totalParticipationInTraining;
        this.trainingDonePercentage = this.SkillPlanListData.trainingDonePercentage * 100;
        this.totalCoachPercentage = this.SkillPlanListData.totalCoachPercentage * 100;
        this.totalAutonomyPercentage = this.SkillPlanListData.totalAutonomyPercentage * 100;
        this.getStatistics();
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Skill Plan List");
        this.getStatistics();
      }
    );
    
  }

  showTraining: boolean = false;
  showTrainingStatus: string = "";
  trainingList: any = [];
  getTrainingDetails(rowData: any) {
    this.trainingList = [];
    this.service.GetAllRequitionListByEmpolyeeId(rowData.employeeId).subscribe(
      (res: any[]) => {
        this.trainingList = res;
        console.log('Training List');
        console.log(this.trainingList);
        this.showTraining = true;
        if (this.trainingList.length == 0) {
          this.showTrainingStatus = "No Training Requisition Found of this employee";
        }
        else {
          this.showTrainingStatus = null;
        }
      },
      (error) => {
        this.toastr.error("Failed to Load Training Requisition");
        this.trainingList = [];
      }
    );
  }

  closeTrainingList() {
    this.showTraining = false;
  }


  //THIS IS FOR FILTERING SECTION
  async filterSectionListByDepartment() {
    if (this.SkillPlanForm.value.departmentName == undefined || this.SkillPlanForm.value.departmentName == "" || this.SkillPlanForm.value.departmentName == null) {
      this.SkillPlanSectionList = [];
      this.SkillPlanSectionList = this.commonService.GatePassSectionListByDept;
    }
    else {
      var sectionList = await this.evoteService.GetGatePassEmployeeSectionListByDept(this.SkillPlanForm.value.departmentName).toPromise();
      this.SkillPlanSectionList = [];

      var employeeSectionList = sectionList.filter((item, i) => sectionList.findIndex((t) => t.section === item.section) === i);
      for (var i = 0; i < employeeSectionList.length; i++) {
        this.SkillPlanSectionList.push({
          label: employeeSectionList[i].section,
          value: employeeSectionList[i].section,
        });
      }
    }
  }

  // graphView() {
   
  //   const documentStyle = getComputedStyle(document.documentElement);
  //   const textColor = documentStyle.getPropertyValue('--text-color');
  //   const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
  //   const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
  // console.log("val",this.totalTargetAutonomy)
  // console.log("val",this.totalRealizedAutonomy)
  // console.log("val",this.totalAutonomyPercentage)
  //   this.autonomygraphData = {
  //     labels: ['Autonomy'],
  //     datasets: [
  //       {
  //         label: 'Target Autonomy',
  //         backgroundColor: "#8000ff",
  //         borderColor: documentStyle.getPropertyValue('--blue-500'),
  //         data: [this.totalTargetAutonomy]
  //       },
  //       {
  //         label: 'Realized Autonomy',
  //         backgroundColor:"#0040ff",
  //         borderColor: documentStyle.getPropertyValue('--pink-500'),
  //         data: [this.totalRealizedAutonomy]
  //       },
  //       {
  //         label: 'Autonomy Percentage',
  //         backgroundColor: "#40ff00",
  //         borderColor: documentStyle.getPropertyValue('--pink-500'),
  //         data: [this.totalAutonomyPercentage]
  //       }
  //     ]
  //   };
    
  //   this.graphData = {
  //     labels: ['Coach'],
  //     datasets: [
  //       {
  //         label: 'Target Coach',
  //         backgroundColor: "#8000ff",
  //         borderColor: documentStyle.getPropertyValue('--blue-500'),
  //         data: [this.totalTargetCoach]
  //       },
  //       {
  //         label: 'Realized Coach',
  //         backgroundColor:"#0040ff",
  //         borderColor: documentStyle.getPropertyValue('--pink-500'),
  //         data: [this.totalRealizedCoach]
  //       },
  //       {
  //         label: 'Coach Percentage',
  //         backgroundColor: "#40ff00",
  //         borderColor: documentStyle.getPropertyValue('--pink-500'),
  //         data: [this.totalCoachPercentage]
  //       }
  //     ]
  //   };

  //   this.percgraphData = {
  //     labels: ['Percentage %'],
  //     datasets: [
  //       {   type: 'bar',
  //         label: 'Done Percentage',
  //         backgroundColor: "#8000ff",
  //         borderColor: documentStyle.getPropertyValue('--blue-500'),
  //         data: [this.trainingDonePercentage]
  //       },
  //       {   type: 'bar',
  //         label: 'Autonomy Percentage',
  //         backgroundColor:"#0040ff",
  //         borderColor: documentStyle.getPropertyValue('--pink-500'),
  //         data: [this.totalAutonomyPercentage]
  //       },
  //     ]
  //   };

  //   this.graphOptions = {
  //     maintainAspectRatio: false,
  //     aspectRatio: 0.8,
  //     plugins: {
  //       legend: {
  //         labels: {
  //           color: textColor
  //         }
  //       }
  //     },
  //     scales: {
  //       x: {
  //         ticks: {
  //           color: textColorSecondary,
  //           font: {
  //             weight: 500
  //           }
  //         },
  //         grid: {
  //           color: surfaceBorder,
  //           drawBorder: false
  //         }
  //       },
  //       y: {
  //         ticks: {
  //           color: textColorSecondary
  //         },
  //         grid: {
  //           color: surfaceBorder,
  //           drawBorder: false
  //         }
  //       }

  //     }
  //   };
  //   this.percgraphOptions = {
  //     maintainAspectRatio: false,
  //     aspectRatio: 0.8,
  //     plugins: {
  //         tooltips: {
  //             mode: 'index',
  //             intersect: false
  //         },
  //         legend: {
  //             labels: {
  //                 color: textColor
  //             }
  //         }
  //     },
  //     scales: {
  //         x: {
  //             stacked: true,
  //             ticks: {
  //                 color: textColorSecondary
  //             },
  //             grid: {
  //                 color: surfaceBorder,
  //                 drawBorder: false
  //             }
  //         },
  //         y: {
  //             stacked: true,
  //             ticks: {
  //                 color: textColorSecondary
  //             },
  //             grid: {
  //                 color: surfaceBorder,
  //                 drawBorder: false
  //             }
  //         }
  //     }
      
  // };
  // }
 


  getStatistics(){

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
  console.log("val",this.totalTargetAutonomy)
  console.log("val",this.totalRealizedAutonomy)
  console.log("val",this.totalAutonomyPercentage)
 
  this.valuegraphData = {
      labels: ['Training Number'],
      datasets: [
        {
          label: 'Target Autonomy',
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgb(255, 159, 64)',
          borderWidth: 1,
          data: [this.totalTargetAutonomy]
        },
        {
          label: 'Realized Autonomy',
          backgroundColor:'rgba(75, 192, 192, 0.2)',
          borderColor:'rgb(75, 192, 192)',
          borderWidth: 1,
          data: [this.totalRealizedAutonomy]
        },
        {
          label: 'Target Coach',
          backgroundColor:'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1,
          data: [this.totalTargetCoach]
        },
        {
          label: 'Realized Coach',
          backgroundColor:'rgba(153, 102, 255, 0.2)',
          borderColor:'rgb(153, 102, 255)',
          borderWidth: 1,
          data: [this.totalRealizedCoach]
        },
      ]
    };

    this.valuegraphOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }

      }
    };
    
    this.percgraphData = {
      labels: ['Training Percentage %'],
      datasets: [
        {   
          type: 'bar',
          label: 'Training Done Percentage',
          backgroundColor: "#FFB9AE",
          borderColor:"#E65839" ,
          borderWidth: 1,
          data: [this.trainingDonePercentage,]
          
        },
        {   
          type: 'bar',
          label: 'Autonomy Percentage',
          backgroundColor:"#D6FFAE",
          borderColor: "#61D834",
          borderWidth: 1,
          data: [this.totalAutonomyPercentage]
        },
        {   
          type: 'bar',
          label: 'Coach Percentage',
          backgroundColor:"#B3E1FF",
          borderColor: "#359CDF",
          borderWidth: 1,
          data: [this.totalCoachPercentage]
        },
      ]
    };

    this.percgraphOptions = {
      maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }       
          }
      }
      
  };


 
 

  this.piedata = {
      labels: ['Realized Coach', 'Realized Autonomy'],
      datasets: [
          {
              data: [this.totalRealizedCoach,  this.totalRealizedAutonomy],
              backgroundColor: [ 'rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)'],
              borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)'],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
          }
      ]
  };

  this.pieoptions = {
      plugins: {
          legend: {
              labels: {
                  usePointStyle: true,
                  color: textColor
              }
          }
      }
  };
   // this.showStatistics=true; 
  }
}
