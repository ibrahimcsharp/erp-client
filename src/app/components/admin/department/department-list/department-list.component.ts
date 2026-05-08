import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Department } from '../../Model/department.model';
import { DepartmentService } from '../../Services/department.service';
import { DepartmentCreateComponent } from '../department-create/department-create.component';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  @ViewChild('department') child: DepartmentCreateComponent;
  constructor(
    private toastr: ToastrService,
    public departmentService: DepartmentService,
  ) { }

  ngOnInit(): void {
    this.LoadRoleData();
  }

  LoadRoleData() {
    this.departmentService.GetDepartmentList().subscribe((data: Department[]) => {
      if (data) {
        this.departmentService.departmentList = data;
        console.log(this.departmentService.departmentList)
      }

    }, error => {
      this.toastr.warning("Failed To Load Data", "Department List");
      this.departmentService.departmentList = null;
    });
  }

  editDepartment(department: Department) {
    this.child.department = department;
    this.child.CreateDepartment();
    this.child.saveButtonTitle = "Update";
  }

  BtnReport() {

    

  //   this.departmentService.MakeReportDepartment().subscribe(res => {
  //     console.log(res);
  //     window.open(res.url, '_blank');

  //   }, error => {
  //     console.log(error);
  //     window.open(error.url, '_blank');
  //   })
  //   // window.open('https://localhost:44334/api/report/get', '_blank');

 }
}
