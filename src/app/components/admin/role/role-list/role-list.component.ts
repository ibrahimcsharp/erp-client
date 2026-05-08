import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../../Model/role.model';
import { RoleService } from '../../Services/role.service';
import { RoleCreateComponent } from '../role-create/role-create.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
  
  @ViewChild('role') child: RoleCreateComponent;
 
  constructor(
    private toastr:ToastrService,
    public roleService: RoleService,
    ) { }

  ngOnInit(): void {
    this.LoadRoleData();
  }

  LoadRoleData() {    
    this.roleService.GetRoleList().subscribe((data: Role[]) => {
      this.roleService.roleList = data;    
    }, error => {
      this.toastr.warning("Failed To Load Data","Role List");
    });
  }

  editRole(role:Role){
    this.child.role=role;
    this.child.createRoleForm();
    this.child.saveButtonTitle="Update";
  }

}
