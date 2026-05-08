import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';

@Component({
  selector: 'app-snack-damage-declare',
  templateUrl: './snack-damage-declare.component.html',
  styleUrls: ['./snack-damage-declare.component.scss']
})
export class SnackDamageDeclareComponent implements OnInit {
  reactiveForm: FormGroup;
  title: string;
  spinnerName = "createSpinner";
  @Output() ToCreate = new EventEmitter();
  model: any = null;
  constructor(public fb: FormBuilder,
    public bsModalRef: BsModalRef,
    public commonService: CommonServiceService,) { }

  ngOnInit(): void {
    this.CreateForm();
  }

  CreateForm() {
    console.log(this.model);
    this.OnClear();
  }

  OnClear(): void {
    this.reactiveForm = this.fb.group({
      id: [0],
      itemId: [this.model.itemId],
      damageQty: [this.model.currentStock, Validators.required],
      remarks: ["These snacks are damaged/expired."],
      declareDate:[new Date()]
    });
  }

  onSubmit() {
    if (this.reactiveForm.valid && this.model.currentStock>=this.reactiveForm.value.damageQty && this.reactiveForm.value.damageQty>0) {
      this.ToCreate.emit(this.reactiveForm.value);
      this.bsModalRef.hide();
    } else {
      this.commonService.ValidationShow(this.reactiveForm);
      this.OnClear();
      alert("Make sure damage qty is less than or equal stock qty!");     
    }
  }


}
