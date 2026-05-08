import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { MmsService } from '../../../services/mms.service';

@Component({
  selector: 'app-meal-item',
  templateUrl: './meal-item.component.html',
  styleUrls: ['./meal-item.component.scss']
})
export class MealItemComponent implements OnInit {
  reactiveForm: FormGroup;
  title: string;
  spinnerName = "createSpinner";
  @Output() ToCreate = new EventEmitter();
  model: any = null;
  categoryList: any[];
  constructor(public fb: FormBuilder,
    public bsModalRef: BsModalRef,
    public commonService: CommonServiceService,
    public mmsService: MmsService
  ) { }

  ngOnInit(): void {
    this.GetCategoryList();
    this.CreateForm();
   
  }

  CreateForm() {
    if (this.model != null) {
      this.reactiveForm = this.fb.group({
        id: [this.model.id],
        itemCategoryId: [this.model.itemCategoryId, Validators.required],
        itemName: [this.model.itemName, Validators.required],
        remarks: [this.model.remarks],
      });
    } else {
      this.OnClear();
    }


  }

  GetCategoryList() {
    this.mmsService.GetMealCategory().subscribe((res:any) => {
      this.categoryList=res;

    }, error => {
      this.categoryList=[];

    })

  }

  OnClear(): void {
    this.reactiveForm = this.fb.group({
      id: [0],
      itemCategoryId: ["", Validators.required],
      itemName: ["", Validators.required],
      remarks: [""],

    });
  }

  onSubmit() {
    if (this.reactiveForm.valid) {
      this.ToCreate.emit(this.reactiveForm.value);
      this.bsModalRef.hide();
    } else {
      this.commonService.ValidationShow(this.reactiveForm);
    }
  }
}
