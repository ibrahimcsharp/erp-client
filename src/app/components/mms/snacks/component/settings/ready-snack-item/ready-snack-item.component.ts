import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { MmsSnackService } from '../../../services/snacks.service';

@Component({
  selector: 'app-ready-snack-item',
  templateUrl: './ready-snack-item.component.html',
  styleUrls: ['./ready-snack-item.component.scss']
})
export class ReadySnackItemComponent implements OnInit {

  reactiveForm: FormGroup;
  title: string;
  spinnerName = "createSpinner";
  @Output() ToCreate = new EventEmitter();
  model: any = null;
  Items: any[];
  constructor(public fb: FormBuilder,
    public bsModalRef: BsModalRef,
    public commonService: CommonServiceService,
    public snackService: MmsSnackService,
    private toaster: ToastrService,private datepipe:DatePipe) { }

  ngOnInit(): void {
    this.GetItems();
    this.CreateForm();
  }
  CreateForm() {
    if (this.model != null) {
      this.reactiveForm = this.fb.group({
        id: [this.model.id],
        itemId: [this.model.itemId, Validators.required],
        declareDate: [this.datepipe.transform(this.model.declareDate,"yyyy-MM-dd"), Validators.required],
        qty: [this.model.qty, Validators.required],
        damageQty: [this.model.damageQty, Validators.required],
        previousSaleQty: [this.model.previousSaleQty],
        remarks: [this.model.remarks],
      });
    } else {
      this.OnClear();
    }
  }
  OnClear(): void {
    this.reactiveForm = this.fb.group({
      id: [0],
      itemId: ["", Validators.required],
      declareDate: [this.datepipe.transform(new Date(),"yyyy-MM-dd"), Validators.required],
      qty: ["", Validators.required],
      damageQty: [0, Validators.required],
      previousSaleQty: [0],
      remarks: [""],
    });
  }

  GetItems() {
    this.Items = [];
    this.snackService.GetSnacksItems().subscribe((res: any[]) => {
      this.Items = res;

    }, error => {
      this.toaster.error("Failed to load Snack Item");
      this.Items = [];
    })
  }

  onSubmit() {
    if (this.reactiveForm.valid) {
      if(this.reactiveForm.value.damageQty > this.reactiveForm.value.qty){
        this.toaster.error("Damaged quantity can't exceed ready quantity!");
      } else if(this.reactiveForm.value.damageQty > 0 && (this.reactiveForm.value.remarks == null || this.reactiveForm.value.remarks === "")){
        this.toaster.error("Damage reason is mendatory!");
      } else{
        this.ToCreate.emit(this.reactiveForm.value);
        this.bsModalRef.hide();        
      }
    } else {
      this.commonService.ValidationShow(this.reactiveForm);
    }
  }
}
