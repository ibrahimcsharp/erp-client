import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../Services/role.service';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-buyer-wise-ui-list-permission',
  templateUrl: './buyer-wise-ui-list-permission.component.html',
  styleUrls: ['./buyer-wise-ui-list-permission.component.scss']
})
export class BuyerWiseUiListPermissionComponent implements OnInit {

  constructor(
    private roleService: RoleService,
    private toastr: ToastrService,
    public commonService: CommonServiceService,
    private spinner: NgxSpinnerService,
  ) { }
  userId = 0;
  userName = "";
  buyersWisePermissionList: any[] = [];
  selectedBuyerList: any[] = [];
  filteredText: string;

  ngOnInit(): void {
    this.commonService.LoadBuyerList();
  }

  GetBuyerWiseUIListPermissionByUserId(id: number, userName: string) {
    this.spinner.show();
    this.roleService.GetBuyerWiseUIListPermissionByUserId(id, userName).subscribe(
      (res: any[]) => {
        this.buyersWisePermissionList = res;
        this.filteredList = res;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }
  menuCheck(event: any, obj: any) {
    debugger
    if (event.target.checked == true) {
      obj.status = true;
    }
    else {
      obj.status = false;
    }

  }
  onSubmit() {
    this.spinner.show();
    this.roleService.CreateBuyersWiseMenuListPermission(this.buyersWisePermissionList).subscribe(
      (res) => {
        this.spinner.hide();
        this.toastr.success("Saved Successfully", "Buyers Wise Menu List Permission");
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error("Failed to save", "Buyers Wise Menu List Permission");
      }
    );
  }

  allBuyerCheck(event: any, obj: any, fullObj: any) {
    debugger
    if (event.target.checked == true) {
      for (var item of fullObj.buyerList) {
        item.status = true;
      }
    }
    else {
      for (var item of fullObj.buyerList) {
        item.status = false;
      }
    }
  }
  filteredList: any[] = [];
  filterText(event) {
    debugger
    var ss = event.target.value;
    var filterData = this.buyersWisePermissionList.filter(element => element.menuName?.toUpperCase().includes(event.target.value?.toUpperCase()));
    if (filterData.length > 0) {
      this.filteredList = [];
      this.filteredList = filterData;
    }
  }

  BuyerEvent(event) {
    debugger
    this.filteredText = "";
    this.filteredList;
    this.buyersWisePermissionList;
    this.selectedBuyerList;
    this.roleService.GetBuyerWiseUIListPermissionByUserId(this.userId, this.userName).subscribe(
      (res: any[]) => {
        this.buyersWisePermissionList = res;
        this.filteredList = res;
        if (this.selectedBuyerList.length > 0) {
          for (var item of this.buyersWisePermissionList) {
            item.buyerList = item.buyerList.filter(o1 => this.selectedBuyerList.some(o2 => o1.buyerId === o2.value));  //Compare 2 List    
          }
        }
      },
      (error) => { }
    );
  }

}
