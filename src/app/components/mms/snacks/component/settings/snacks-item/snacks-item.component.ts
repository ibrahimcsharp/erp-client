import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { MmsSnackService } from '../../../services/snacks.service';

@Component({
  selector: 'app-snacks-item',
  templateUrl: './snacks-item.component.html',
  styleUrls: ['./snacks-item.component.scss']
})
export class SnacksItemComponent implements OnInit {
  reactiveForm: FormGroup;
  title: string;
  spinnerName = "createSpinner";
  @Output() ToCreate = new EventEmitter();
  model: any = null;
  categoryList: any[];
  constructor(public fb: FormBuilder,
    public bsModalRef: BsModalRef,
    public commonService: CommonServiceService,
    public snackService: MmsSnackService) { }

  ngOnInit(): void {
    this.GetCategoryList();
    this.CreateForm();
  }

  GetCategoryList() {
    this.snackService.GetSnacksCategory().subscribe((res: any) => {
      this.categoryList = res;

    }, error => {
      this.categoryList = [];

    })
  }

  CreateForm() {
    if (this.model != null) {
      this.reactiveForm = this.fb.group({
        id: [this.model.id],
        catId: [this.model.catId, Validators.required],
        itemName: [this.model.itemName, Validators.required],
        costPrice: [this.model.costPrice, Validators.required],
        salePrice: [this.model.salePrice, Validators.required],
        remarks: [this.model.remarks],
      });
    } else {
      this.OnClear();
    }
  }
  onSubmit() {
    if (this.reactiveForm.valid) {
      this.ToCreate.emit(this.reactiveForm.value);
      this.bsModalRef.hide();
    } else {
      this.commonService.ValidationShow(this.reactiveForm);
    }
  }

  OnClear(): void {
    this.reactiveForm = this.fb.group({
      id: [0],
      catId: ["", Validators.required],
      itemName: ["", Validators.required],
      costPrice: ["", Validators.required],
      salePrice: ["", Validators.required],
      remarks: [""],

    });
  }
}
