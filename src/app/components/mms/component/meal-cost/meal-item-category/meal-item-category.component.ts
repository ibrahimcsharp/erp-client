import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';

@Component({
  selector: 'app-meal-item-category',
  templateUrl: './meal-item-category.component.html',
  styleUrls: ['./meal-item-category.component.scss']
})
export class MealItemCategoryComponent implements OnInit {
reactiveForm:FormGroup;
title: string;
  spinnerName = "createSpinner";
  @Output() ToCreate = new EventEmitter();
  model: any = null;

  constructor( public fb: FormBuilder,
    public bsModalRef: BsModalRef,
    public commonService: CommonServiceService,
) { }

  ngOnInit(): void {
    this.CreateForm();
  }

  CreateForm() {
    if (this.model != null) {
      this.reactiveForm = this.fb.group({
        id: [this.model.id],
        categoryName: [this.model.categoryName, Validators.required],        
        remarks: [this.model.remarks],
      });
    } else {
      this.OnClear();
    }

    
  }

  OnClear(): void {
    this.reactiveForm = this.fb.group({
      id: [0],
      categoryName: ["", Validators.required],
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
