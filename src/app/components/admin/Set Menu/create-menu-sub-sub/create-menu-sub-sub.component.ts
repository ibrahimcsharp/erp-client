import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PoSettingService } from 'src/app/components/merchandising/purchase-order/service/po-setting.service';
import { Menu } from '../../Model/Menu.Model';
import { SetMenu } from '../../Model/Set.Menu.Model';

@Component({
  selector: 'app-create-menu-sub-sub',
  templateUrl: './create-menu-sub-sub.component.html',
  styleUrls: ['./create-menu-sub-sub.component.scss']
})
export class CreateMenuSubSubComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public service: PoSettingService,
    private toastr: ToastrService
  ) { }

  setMenuForm: FormGroup;
  setMenu: SetMenu;
  saveButtonTitle = "Save";

  ngOnInit(): void {
    this.InitialiseSubSubMenuForm();
  }
  InitialiseSubSubMenuForm() {
    if (this.setMenu) {
      this.setMenuForm = this.fb.group({
        menuId: [this.setMenu.menuId, Validators.required],
        // menuName: [this.setMenu.menuName],
        subMenuId: [this.setMenu.menuSubId, Validators.required],
        // subMenuName: [this.setMenu.subSubName],
        setMenuId: [this.setMenu.SetMenuId],
        subSubMenuName: [
          this.setMenu.subSubName,
          Validators.required,
        ],
      });
    } else {
      this.onClear();
    }
  }
  onClear() {
    this.setMenuForm = this.fb.group({
      menuId: [0, Validators.required],
      // menuName: [this.setMenu.menuName],
      subMenuId: [0, Validators.required],
      // subMenuName: [this.setMenu.subSubName],
      setMenuId: [0],
      subSubMenuName: [
      "",
        Validators.required,
      ],
    });
  }


  //get countryList\
  LoadCountryData() {
    this.service.GetCountryList().subscribe(
      (data: Menu[]) => {
        this.service.menuList = data;
      },
      (err) => {
        this.toastr.error("Failed To Load Data", "Country Information");
      }
    );
  }

}
