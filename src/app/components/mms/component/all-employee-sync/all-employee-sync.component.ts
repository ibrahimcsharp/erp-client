import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { MmsService } from '../../services/mms.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-employee-sync',
  templateUrl: './all-employee-sync.component.html',
  styleUrls: ['./all-employee-sync.component.scss']
})
export class AllEmployeeSyncComponent implements OnInit {
  empList: any;
  reactiveForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public commonService: CommonServiceService,
    private mmsService: MmsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.reactiveForm = this.fb.group({
      unitType: ["", Validators.required],
    });
  }

  onSubmit(){
    if (this.reactiveForm.valid) {
      this.spinner.show();

      this.mmsService.GetEmployessFromDataBase(this.reactiveForm.value.unitType).subscribe(
        (res: any[]) => {
          if (res) {
            this.empList = res;
            this.spinner.hide();
          }

          console.log(this.empList);
        },
        (error) => {
          this.empList = [];
          this.spinner.hide();
        }
      );
    } 
    else {
      this.commonService.ValidationShow(this.reactiveForm);
    }
  }

  syncAllEmployeeData(){
    debugger
    this.spinner.show();
    this.mmsService.AllEmpInfoSyncFromApi().subscribe(
      (res: any[]) => {
        if (res) {
          this.empList = res;
          this.spinner.hide();
        }
        console.log(this.empList);
      },
      (error) => {
        this.empList = [];
        this.spinner.hide();
      }
    );
  }

}
