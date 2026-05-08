import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, Message } from 'primeng/api';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { IdmService } from '../../service/idm.service';

@Component({
  selector: 'app-pleasure-displeasure',
  templateUrl: './pleasure-displeasure.component.html',
  styleUrls: ['./pleasure-displeasure.component.scss']
})
export class PleasureDispleasureComponent implements OnInit {
  PleasureDispleasureForm: FormGroup;
  noResult = false;
  position: string;
  msgs: Message[] = [];
  currentDate:string;
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: IdmService,
    private toastr: ToastrService,
    public datePipe: DatePipe,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.getAllPleasure();
    this.getAllDisPleasure();
  }

  InitializeForm() {
    var today = new Date();
    today.setHours(today.getHours() + 6);
    this.currentDate= today.toISOString().slice(0, 16);
    this.PleasureDispleasureForm = this.fb.group({
      pleasureDispleasureDate :this.currentDate,
      pleasureList: this.fb.array([]),
      displeasureList: this.fb.array([]),
    });
  }
  BlankPlesureForm(): FormGroup {
    return this.fb.group({
      id:[null],
      pleasure:["", Validators.required],
    });
  }
  BlankDispleasureForm(): FormGroup {
    return this.fb.group({
      id:[null],
      displeasure:["",Validators.required],
    });
  }

  get wholeFormControl() {
    return this.PleasureDispleasureForm.controls;
  }
  get plesureFormControl() {
    return this.wholeFormControl.pleasureList as FormArray;
  }
  get displesureFormControl() {
    return this.wholeFormControl.displeasureList as FormArray;
  }


  plesures(): FormArray {
    return this.PleasureDispleasureForm.get("pleasureList") as FormArray;
  }
  displesures(): FormArray {
    return this.PleasureDispleasureForm.get("displeasureList") as FormArray;
  }

  addNewPleasureItem(): void {
    this.plesures().push(this.BlankPlesureForm());
  }
  addNewDispleasureItem(): void {
    this.displesures().push(this.BlankDispleasureForm());
  }

  DeletePlesureRow(index: number) {
    this.position = "top";
    this.confirmationService.confirm({
      message: "Are you sure that you want to delete this row?",
      header: "Delete Task",
      icon: "pi pi-info-circle",
      accept: () => {
        this.plesures().removeAt(index);
      },
      reject: () => {
        this.msgs = [
          {
            severity: "info",
            summary: "Rejected",
            detail: "You have rejected to add item",
          },
        ];
      },
      key: "positionDialog",
    });
  }

  DeleteDisplesureRow(index: number) {
    this.position = "top";
    this.confirmationService.confirm({
      message: "Are you sure that you want to delete this row?",
      header: "Delete Task",
      icon: "pi pi-info-circle",
      accept: () => {
        this.displesures().removeAt(index);
      },
      reject: () => {
        this.msgs = [
          {
            severity: "info",
            summary: "Rejected",
            detail: "You have rejected to add item",
          },
        ];
      },
      key: "positionDialog",
    });
  }

  onSubmit(){
    console.log(this.PleasureDispleasureForm.value);
    if (this.PleasureDispleasureForm.valid) {

      if (this.PleasureDispleasureForm.value.pleasureList.length > 0 || this.PleasureDispleasureForm.value.displeasureList.length>0) {
        this.service.CreatePleasureDisplesure(this.PleasureDispleasureForm.value).subscribe(
          (res) => {
            this.toastr.success("Saved Successfully");
            this.clear();
            this.getAllPleasure();
            this.getAllDisPleasure();
          },
          (error) => {
            console.log('onsubmit error');
            console.log(error);
            this.toastr.error("Failed To Save");
            
          }
        );
      } else {
        this.toastr.error("Please Add Mission first!");
      }
    }
    else {

      this.toastr.error("Please Fill  Pleasure or Displeasure!");
    }
  }

  clear(){
    this.InitializeForm();
    this.plesureFormControl.reset();
    this.plesureFormControl.clear();
    this.displesureFormControl.reset();
    this.displesureFormControl.clear();
  }

  allPlesureList:any[];
  getAllPleasure(){
    this.service.GetAllPleasure().subscribe(
      (res: any[]) => {
        this.allPlesureList = res;        
        console.log('Pleasure List');
        console.log(this.allPlesureList);
      },
      (error) => {
        this.toastr.error("Failed to Fetch Plesure List");
        
      }
    );
  }
  allDisPlesureList:any[];
  getAllDisPleasure(){
    this.service.GetAllDisPleasure().subscribe(
      (res: any[]) => {
        this.allDisPlesureList = res;        
        console.log('Displeasure List');
        console.log(this.allDisPlesureList);
      },
      (error) => {
        this.toastr.error("Failed to Fetch Displesure List");
        
      }
    );
  }

}
