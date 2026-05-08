import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { TokenService } from "src/app/shared/service/token.service";
import { DatePipe } from "@angular/common";
import { TaskService } from "./task.service";
import { ToastrService } from "ngx-toastr";
import { TreeNode } from "primeng/api";
import { Workbook } from "exceljs";
import * as fs from "file-saver";
import { Company } from "../../merchandising/common-componant/model/company";
import { OrderManagementService } from "../../merchandising/order-management/service/order-management.service";

@Injectable({
    providedIn: "root",
})
export class TaskCommonService {
    constructor(
        private datepipe: DatePipe,
        public taskService: TaskService,
        public toastr: ToastrService,
        public orderManagementService: OrderManagementService,
    ) { }

    //common variable
    selectedTaskId = 0;
    spPendingTaskList: any[] = [];
    spInProgressTaskList: any[] = [];
    spDoneTaskList: any[] = [];
    // teamEmployeeList: any[];
    // teamEmployeeListBackup: any[];
    // teamDepartmentList: any[];
    // teamSetupEmployeeList: any;

    /* #region  */
    //Task priority array
    taskPriority =
        [
            {
                id: 1,
                name: "Low"
            },
            {
                id: 2,
                name: "Medium"
            },
            {
                id: 3,
                name: "High"
            },
        ]
    /* #endregion */


    /* #region common settings methods  */


    // //Get All Task Team Setup Employee List
    // GetAllTaskTeamSetupEmployeeList(){
    //     this.taskService.GetAllTaskTeamSetupEmployeeList().subscribe(
    //         (res: any[]) => {
    //           this.teamEmployeeList = res;
    //           this.teamEmployeeListBackup = res;
    //           this.teamSetupEmployeeList = new Array();
    //           //this.GatePassEmployeeList.push({ label: "Select", value: null });
    //           for (var i = 0; i < this.teamEmployeeList.length; i++) {
    //             this.teamSetupEmployeeList.push({
    //               label:
    //                 this.teamEmployeeList[i].employeeName +
    //                 "-" +
    //                 this.teamEmployeeList[i].employeeId +
    //                 "-" +
    //                 this.teamEmployeeList[i].department +
    //                 "-" +
    //                 this.teamEmployeeList[i].section,
    //               value: this.teamEmployeeList[i].employeeId,
    //             });
    //           }
    //         },
    //         (error) => {
    //           this.toastr.warning("Failed To Load Data", "Employee List");
    //         }
    //       );
    // }


    //company wise department list
    departments: any[] = [];
    departmentsAdmin: any[] = [];
    GetDepartmentCompanyWise() {
        this.taskService.GetDepartmentByCompany().subscribe((res: any[]) => {
            this.departments = res;
            this.departmentsAdmin = this.departments.filter(x => x.departmentName == "Admin");
        }, error => {
            this.departments = [];
            this.departmentsAdmin = [];
        }
        )
    }


    //all department list
    allDepartments: any[] = [];
    GetAllDepartmentCompanyWise() {
        this.taskService.GetDepartmentByCompany().subscribe((res: any[]) => {
            this.allDepartments = res;
        }, error => {
            this.allDepartments = [];
        })
    }

    

    //all department list
    CompanySelectedList: any[] = [];
    LoadCompanyForTask() {
        this.orderManagementService.GetCompanyWithSara().subscribe((data: Company[]) => {
            this.CompanySelectedList = data;
        }, error => {
            this.CompanySelectedList = [];
        })
    }


    //department wise section

    sections: any[] = [];
    sectionsAdmin: any[] = [];
    GetSectionsByDepartment(departmentName: any) {
        this.taskService.GetSectionsByDepartment(encodeURIComponent(departmentName)).subscribe((res: any[]) => {
            this.sections = res;
            this.sectionsAdmin = this.sections.filter(x => x.sectionName == "Admin");
        }, error => {
            this.sections = [];
            this.sectionsAdmin = [];
        })
    }
    /* #endregion */

    //department wise all section
    allSections: any[] = [];
    GetAllSectionsByDepartment(departmentName: any) {
        this.taskService.GetSectionsByDepartment(encodeURIComponent(departmentName)).subscribe((res: any[]) => {
            this.allSections = res;
        }, error => {
            this.allSections = [];
        })
    }
    /* #endregion */


    /* #region  task list display with tree */
    taskList: any[] = [];
    treeNodes = [];
    treefydata: object[];
    public data: TreeNode[];
    public data2: any;
    GetTaskList() {
        this.treeNodes = [];
        this.taskService.GetTaskSubmissionList().subscribe((res: any[]) => {
            if (res) {
                this.taskList = res;
                //console.log(res);
                //this.treefydata = this.TreeWithChildren(res, "id", "parentId", "children");
                //console.log(JSON.stringify(this.treefydata));
                for (let obj of res) {
                    if (obj.parentId == 0) {
                        this.treeNodes.push(this.convertListToTree(res, obj, res));
                    }
                }

                this.data = this.treeNodes;
                //console.log(JSON.stringify(this.data));
            }
        }, error => {
            this.taskList = [];
            this.toastr.error("Failed to load", "Task Submission Info");

        })
    }

    //task pending list
    taskPendingList: any[] = [];
    pendingData: TreeNode[];
    GetPendingTaskList() {
        this.taskPendingList = [];
        this.taskService.GetPendingTaskList().subscribe((res: any[]) => {
            if (res) {
                this.taskPendingList = res;
                // for (let obj of res) {
                //     if (obj.parentId == 0) {
                //         this.taskPendingList.push(this.convertListToTree(res, obj, res));
                //     }
                // }
                // this.pendingData=this.taskPendingList;
            }
        }, error => {
            this.taskPendingList = [];
            this.toastr.error("Failed to load", "Task Submission Info");

        })
    }

    taskSPForwardedList: any[] = [];
    GettaskSPForwardedList() {
        this.taskSPForwardedList = [];
        this.taskService.GetSpForwardedTaskInfo().subscribe((res: any[]) => {
            if (res) {
                this.taskSPForwardedList = res;
            }
        }, error => {
            this.taskSPForwardedList = [];
            this.toastr.error("Failed to load", "Task forwared list");

        })
    }

    //task done list
    taskDoneList: any[] = [];
    public doneTaskData: TreeNode[];
    GetDoneTaskList() {
        this.taskDoneList = [];
        this.taskService.GetDoneTaskInfo().subscribe((res: any[]) => {
            if (res) {
                this.taskDoneList = res;
                // for (let obj of res) {
                //     if (obj.parentId == 0) {
                //         this.taskDoneList.push(this.convertListToTree(res, obj, res));
                //     }
                // }
                // this.doneTaskData=this.taskDoneList;
            }
        }, error => {
            this.taskDoneList = [];
            this.toastr.error("Failed to load", "Task Submission Info");

        })
    }

    //to-do list
    taskToDOList: any[] = [];
    public toDoData: TreeNode[];
    GetToDoTaskList() {
        this.taskToDOList = [];
        this.taskService.GetToDoTaskList().subscribe((res: any[]) => {
            if (res) {
                this.taskToDOList = res;
                // for (let obj of res) {
                //     if (obj.parentId == 0) {
                //         this.taskToDOList.push(this.convertListToTree(res, obj, res));
                //     }
                // }
                // this.toDoData=this.taskToDOList;
            }
        }, error => {
            this.taskToDOList = [];
            this.toastr.error("Failed to load", "Task Submission Info");

        })
    }

    //to-do list1
    taskToDOList1: any[] = [];
    public toDoData1: TreeNode[];
    GetToDoTaskList1() {
        this.taskToDOList1 = [];
        this.taskService.GetToDoTaskList().subscribe((res: any[]) => {
            if (res) {
                this.taskToDOList1 = res;
                // for (let obj of res) {
                //     if (obj.parentId == 0) {
                //         this.taskToDOList.push(this.convertListToTree(res, obj, res));
                //     }
                // }
                // this.toDoData=this.taskToDOList;
            }
        }, error => {
            this.taskToDOList1 = [];
            this.toastr.error("Failed to load", "Task Submission Info");

        })
    }

    //add to do list
    AddToDoList(model: any) {
        this.taskService.AddToDOList(model).subscribe((res: any) => {
            this.toastr.success(res.message);
            this.GetPendingTaskList();
            this.GetToDoTaskList();
            this.GetDoneTaskList();
            this.GettaskSPForwardedList();
        }, error => {
            this.toastr.error(error[0]);
            this.GetPendingTaskList();
            this.GetToDoTaskList();
            this.GetDoneTaskList();
            this.GettaskSPForwardedList();
        })
    }

    //remove from to do list
    RemoveFromToDoList(model: any) {
        this.taskService.RemoveToDOList(model).subscribe((res: any) => {
            this.toastr.success(res.message);
            this.GetPendingTaskList();
            this.GetToDoTaskList();
            this.GetDoneTaskList();
            this.GettaskSPForwardedList();
        }, error => {
            this.toastr.error(error[0]);
            this.GetPendingTaskList();
            this.GetToDoTaskList();
            this.GetDoneTaskList();
            this.GettaskSPForwardedList();
        })
    }
    //remove from to do list
    ReturnTaskToTeamLeader(model: any) {
        this.taskService.ReturnTaskToTeamLeader(model).subscribe((res: any) => {
            this.toastr.success(res.message);
            this.GetPendingTaskList();
            this.GetToDoTaskList();
            this.GetDoneTaskList();
            this.GettaskSPForwardedList();
        }, error => {
            this.toastr.error(error[0]);
            this.GetPendingTaskList();
            this.GetToDoTaskList();
            this.GetDoneTaskList();
            this.GettaskSPForwardedList();
        })
    }

    /* #endregion */


    /* #region tree with child method */

    TreeWithChildren(listValue, idAttr, parentAttr, childrenAttr) {
        if (!idAttr) idAttr = "id";
        if (!parentAttr) parentAttr = "parentId";
        if (!childrenAttr) childrenAttr = "children";

        var defaultTreeList = [];
        var lookupObject = {};
        listValue.forEach(function (obj) {
            lookupObject[obj[idAttr]] = obj;
            obj[childrenAttr] = [];
        });
        listValue.forEach(function (obj) {
            if (obj[parentAttr] != null) {
                if (lookupObject[obj[parentAttr]] !== undefined) {
                    lookupObject[obj[parentAttr]][childrenAttr].push(obj);
                } else {
                    defaultTreeList.push(obj);
                }
            } else {
                defaultTreeList.push(obj);
            }
        });
        return defaultTreeList;
    }

    /* #endregion */

    //tree node for primeng
    convertListToTree(list, current, all) {
        let node = {
            data: {
                id: current.id,
                title: current.title,
                description: current.description,
                taskLocation: current.taskLocation,
                parentId: current.parentId,
                responsibleDeptName: current.responsibleDeptName,
                responsibleSectionName: current.responsibleSectionName,
                taskPriority: current.taskPriority,
                remarks: current.remarks,
                taskStatusText: current.taskStatusText,
                serviceProviderAcceptText: current.serviceProviderAcceptText,
                taskStartDate: current.taskStartDate,
                taskEndDate: current.taskEndDate,
                serviceProvider: current.serviceProvider,
                serviceProviderName: current.serviceProviderName,
                tlAccept: current.tlAccept,
                tlAcceptDate: current.tlAcceptDate,
                tlTaskAssign: current.tlTaskAssign,
                tlTaskAssignName: current.tlTaskAssignName,
                serviceProviderAcceptDate: current.serviceProviderAcceptDate,
                tlEmpId: current.tlEmpId,
                tlName: current.tlName,
                numberOfComments: current.numberOfComments,
                createBy: current.createBy,
                createDate: current.createDate,
                taskCreatorDept: current.taskCreatorDept,
                taskCreatorName: current.taskCreatorName,
                taskProgress: current.taskProgress,
                taskForwaredStatus: current.taskForwaredStatus,
            },
            children: []
        };
        for (let obj of all) {
            if (obj.parentId === current.id) {
                node.children.push(this.convertListToTree(list, obj, all));
            }
        }
        return node;
    }

    //Task comments
    taskCommentList: any[] = [];
    GetTaskCommentByTaskId(taskId: number) {
        this.taskService.GetTaskCommentByTaskId(taskId).subscribe((res: any[]) => {
            this.taskCommentList = res;
        }, error => {
            this.taskCommentList = [];
        })
    }

    //save comments

    SaveComments(obj: any) {
        this.taskService.CreateTaskComment(obj).subscribe((res: any) => {
            this.toastr.success(res.message);
            this.GetTaskCommentByTaskId(this.selectedTaskId);

        }, error => {
            this.toastr.error(error[0]);
        })
    }

    //Get All task List
    allTaskList: any[] = [];
    GetAllTaskList() {
        this.taskService.GetAllTaskList().subscribe((res: any[]) => {
            this.allTaskList = res;
            this.TotalProjectStatus();
        }, error => {
            this.allTaskList = [];
        })
    }

    totalProject = 0;
    pendingProject = 0;
    doneProject = 0;
    TotalProjectStatus() {
        this.pendingProject = this.allTaskList.filter(e => e.taskStatus == 0).length;
        this.doneProject = this.allTaskList.filter(e => e.taskStatus == 1).length;
        this.totalProject = this.allTaskList.length;

    }

    //update task status

    UpdateTaskStatus(obj: any) {
        this.taskService.UpdateTaskStatus(obj).subscribe((res: any) => {
            this.toastr.success(res.message);
            this.GetPendingTaskList();
            this.GetToDoTaskList();
            this.GetDoneTaskList();

        }, error => {
            this.toastr.error(error[0]);
            this.GetPendingTaskList();
            this.GetToDoTaskList();
            this.GetDoneTaskList();
        })
    }


    //department dashboard

    //
    departmentPendingTask: TreeNode[];
    departmentPendingTaskArray = [];
    GetDepartmentPendingTaskInfo() {
        this.departmentPendingTaskArray = [];
        this.taskService.GetDepartmentPendingTaskInfo().subscribe((res: any[]) => {
            if (res) {
                // for (let obj of res) {
                //     if (obj.parentId == 0) {
                //         this.departmentPendingTaskArray.push(this.convertListToTree(res, obj, res));
                //     }
                // }

                this.departmentPendingTaskArray = res;
            }
        }, error => {
            this.toastr.error("Failed to get department pending task info");
            this.departmentPendingTaskArray = [];
        })
    }
    departmentForwardedTask: TreeNode[];
    departmentForwardedTaskArray = [];
    GetDepartmentForwardedTaskInfo() {
        this.departmentForwardedTaskArray = [];
        this.taskService.GetDepartmentForwardingTaskInfo().subscribe((res: any[]) => {
            if (res) {
                // for (let obj of res) {
                //     if (obj.parentId == 0) {
                //         this.departmentPendingTaskArray.push(this.convertListToTree(res, obj, res));
                //     }
                // }

                this.departmentForwardedTaskArray = res;
            }
        }, error => {
            this.toastr.error("Failed to get department forwared task info");
            this.departmentForwardedTaskArray = [];
        })
    }
    departmentOnGoingTask: TreeNode[];
    departmentOnGoingTaskArray = [];
    GetDepartmentOnGoingTaskInfo() {
        this.departmentOnGoingTaskArray = [];
        this.taskService.GetDepartmentOnGoingTaskInfo().subscribe((res: any[]) => {
            if (res) {
                // for (let obj of res) {
                //     if (obj.parentId == 0) {
                //         this.departmentOnGoingTaskArray.push(this.convertListToTree(res, obj, res));
                //     }
                // }
                this.departmentOnGoingTaskArray = res;

            }
        }, error => {
            this.toastr.error("Failed to get department on going task info");
            this.departmentOnGoingTask = [];
        })
    }

    departmentOnGoingTask1: TreeNode[];
    departmentOnGoingTaskArray1 = [];
    GetDepartmentOnGoingTaskInfo1() {
        this.departmentOnGoingTaskArray1 = [];
        this.taskService.GetDepartmentOnGoingTaskInfo().subscribe((res: any[]) => {
            if (res) {
                // for (let obj of res) {
                //     if (obj.parentId == 0) {
                //         this.departmentOnGoingTaskArray.push(this.convertListToTree(res, obj, res));
                //     }
                // }
                this.departmentOnGoingTaskArray1 = res;

            }
        }, error => {
            this.toastr.error("Failed to get department on going task info");
            this.departmentOnGoingTask1 = [];
        })
    }

    departmentDoneTask: TreeNode[];
    departmentDoneTaskArray = [];
    GetDepartmentDoneTaskInfo() {
        this.departmentDoneTaskArray = [];
        this.taskService.GetDepartmentDoneTaskInfo().subscribe((res: any[]) => {
            if (res) {
                // for (let obj of res) {
                //     if (obj.parentId == 0) {
                //         this.departmentDoneTaskArray.push(this.convertListToTree(res, obj, res));
                //     }
                // }
                this.departmentDoneTaskArray = res;
            }
        }, error => {
            this.toastr.error("Failed to get department done task info");
            this.departmentDoneTask = [];
        })
    }


    departmentDoneTask1: TreeNode[];
    departmentDoneTaskArray1 = [];
    GetDepartmentDoneTaskInfo1() {
        this.departmentDoneTaskArray1 = [];
        this.taskService.GetDepartmentDoneTaskInfo().subscribe((res: any[]) => {
            if (res) {
                // for (let obj of res) {
                //     if (obj.parentId == 0) {
                //         this.departmentDoneTaskArray.push(this.convertListToTree(res, obj, res));
                //     }
                // }
                this.departmentDoneTaskArray1 = res;
            }
        }, error => {
            this.toastr.error("Failed to get department done task info");
            this.departmentDoneTask1 = [];
        })
    }

    //emloyees
    employeeList: any[]
    GetEmployeeInfo() {
        this.employeeList = [];
        this.taskService.GetEmployeeInfo().subscribe(
            (res: any[]) => {
                this.employeeList = res;
                this.toastr.success("Employees Info Loaded Successfully");
            },
            (error) => {
                this.employeeList = [];
                this.toastr.error("Failed to load employee info");
            }
        );
    }


    //create task assign

    CreateTaskAssign(obj: any) {
        this.taskService.CreateTaskAssign(obj).subscribe((res: any) => {
            this.toastr.success(res.message);
            this.GetDepartmentPendingTaskInfo();
            this.GetDepartmentOnGoingTaskInfo();
            this.GetDepartmentDoneTaskInfo();
            this.GetDepartmentForwardedTaskInfo();
        }, error => {
            this.toastr.error(error[0]);
        })
    }
    CreateTaskAssignAnotherDept(obj: any) {
        this.taskService.CreateTaskAssignAnotherDept(obj).subscribe((res: any) => {
            this.toastr.success(res.message);
            this.GetDepartmentPendingTaskInfo();
            this.GetDepartmentOnGoingTaskInfo();
            this.GetDepartmentDoneTaskInfo();
            this.GetDepartmentForwardedTaskInfo();
        }, error => {
            this.toastr.error(error[0]);
        })
    }

    exportExcelReport(excelData) {
        //alert("fired");
        //Title, Header & Data
        const title = excelData.title;
        const header = excelData.headers;
        const data = excelData.data;

        //Create a workbook with a worksheet
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet("Task_Report");
        const stockHeader = [
            "Task No",
            "Title",
            "Description",
            "Department",
            "Section",
            "Create By",
            "Create Date",
            "Done Date",
            "Team Leader",
            "Service Provider", "Status"

        ];

        let d = new Date();
        let date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

        worksheet.mergeCells("A1", "J1");
        let companyRow = worksheet.getCell("A1");
        companyRow.value = header.unitName;
        companyRow.font = {
            name: "Calibri",
            size: 16,
            bold: true,
            color: { argb: "#ffff00" },
        };
        companyRow.alignment = { vertical: "middle", horizontal: "center" };

        worksheet.mergeCells("A2", "J2");
        let EmployeeNameRow = worksheet.getCell("A2");
        EmployeeNameRow.value = "Task Report";
        EmployeeNameRow.font = {
            name: "Calibri",
            size: 16,
            bold: true,
            color: { argb: "#ffff00" },
        };
        EmployeeNameRow.alignment = { vertical: "middle", horizontal: "center" };

        worksheet.mergeCells("A3", "J3");
        let MonthRow = worksheet.getCell("A3");
        //MonthRow.value = header.monthName + "'" + header.yearName;
        MonthRow.font = {
            name: "Calibri",
            size: 16,
            bold: true,
            color: { argb: "#ffff00" },
        };
        MonthRow.alignment = { vertical: "middle", horizontal: "center" };

        worksheet.addRow([]);

        let headerRow = worksheet.addRow(stockHeader);
        headerRow.eachCell((cell, number) => {
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "4167B8" },
                bgColor: { argb: "" },
            };
            cell.font = {
                bold: true,
                color: { argb: "FFFFFF" },
                size: 12,
            };
        });

        data.forEach((d) => {
            let row = worksheet.addRow(d);
        });

        worksheet.addRow([]);

        workbook.xlsx.writeBuffer().then((data) => {
            let blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            fs.saveAs(blob, title + ".xlsx");
        });
    }





}