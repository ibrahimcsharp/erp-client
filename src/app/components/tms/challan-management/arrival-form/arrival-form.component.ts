import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChallanService } from '../../service/challan.service';
import { DatePipe, formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallanModel } from '../../model/challan';
@Component({
  selector: 'app-arrival-form',
  templateUrl: './arrival-form.component.html',
  styleUrls: ['./arrival-form.component.scss']
})
export class ArrivalFormComponent implements OnInit {
  $challanModel: ChallanModel;
  public challanId = 0;
  challanType: string;
  arrivalForm: FormGroup;
  challanInfo: any;
  challanInfoDets: any;
  ChallanModelList: any[];
  ButtonName: string;
  idWithTag: any;
  parts: any;
  tag: any;

  public datepipe: DatePipe = new DatePipe('en-US');
  constructor(
    private challanService: ChallanService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private currentRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.idWithTag = this.currentRoute.snapshot.paramMap.get("id");
    this.parts = this.idWithTag.split("-");
    this.challanId = parseInt(this.parts[0]);
    this.tag = this.parts.length > 1 ? this.parts[1] : null;
    this.LoadChallan();
  }

  InitializeForm() {
    this.arrivalForm = this.fb.group({
      id: [0],
      challanno: [''],
      challandate: [''],
      deponame: [''],
      depoaddress: [''],
      cnfname: [''],
      cnfcontactno: [''],
      forwardername: [''],
      drivername: [''],
      drivermobileno: [''],
      licenseno: [''],
      covervanno: [''],
      loaddatetime: [''],
      unloaddatetime: [''],
      typeOfGoods: [''],
      transportcompany: [''],
      securitylockno: [''],
      typeOfVehicle: [''],
      tripID: [''],
      departure: [''],
      arrival: ['', Validators.required],
      companyname: [''],
      status: [''],

      factoryInTime: [],
      vehicleInTime: [],
      arrivalDateTime: [null, Validators.required],
      parkingTime: [],
      exitTime: [],
      actualCost: [],
    });
    this.ButtonName = "Save";

  }

  createArrival() {
    if (this.challanInfo) {
      this.challanType = this.challanInfo.status;
      console.log("Challan Type", this.challanType);
      // for export
      if (this.challanType == 'EXPORT') {
        this.arrivalForm.patchValue({
          status: "EXPORT_ARRIVED",
        });
      }
      if (this.challanType == 'EXPORT_ARRIVED') {
        this.ButtonName = "Update";
        this.arrivalForm.patchValue({
          status: "EXPORT_ARRIVED",
        });
      }
      const datepipe: DatePipe = new DatePipe('en-US');

      this.arrivalForm.patchValue({
        id: this.challanId, // this id is for challan id
        challanno: this.challanInfo.challanno,
        challandate: datepipe.transform(this.challanInfo.challandate, 'yyyy-MM-dd'),
        deponame: this.challanInfo.deponame,
        depoaddress: this.challanInfo.depoaddress,
        cnfname: this.challanInfo.cnfname,
        cnfcontactno: this.challanInfo.cnfcontactno,
        forwardername: this.challanInfo.forwardername,
        drivername: this.challanInfo.drivername,
        drivermobileno: this.challanInfo.drivermobileno,
        licenseno: this.challanInfo.licenseno,
        covervanno: this.challanInfo.covervanno,
        loaddatetime: datepipe.transform(this.challanInfo.loaddatetime, 'yyyy-MM-dd'),
        unloaddatetime: datepipe.transform(this.challanInfo.unloaddatetime, 'yyyy-MM-dd'),
        securitylockno: this.challanInfo.securitylockno,
        typeOfGoods: this.challanInfo.typeOfGoods,
        transportcompany: this.challanInfo.transportcompany,
        companyname: this.challanInfo.companyname,
        typeOfVehicle: this.challanInfo.typeOfVehicle,
        tripID: this.challanInfo.typeOfVehicle,
        departure: this.challanInfo.departure,
        arrival: this.challanInfo.arrival,

        factoryInTime: this.challanInfo.factoryInTime,
        vehicleInTime: this.challanInfo.vehicleInTime,
        arrivalDateTime: this.challanInfo.arrivalDateTime,
        parkingTime: this.challanInfo.parkingTime,
        exitTime: this.challanInfo.exitTime,
        actualCost: this.challanInfo.actualCost,
      });
      // set the time to null if the value from DB is null
      if (this.challanInfo.factoryInTime == '0001-01-01T00:00:00') {
        this.arrivalForm.patchValue({
          factoryInTime: datepipe.transform(null)
        });
      }
      if (this.challanInfo.vehicleInTime == '0001-01-01T00:00:00') {
        this.arrivalForm.patchValue({
          vehicleInTime: datepipe.transform(null)
        });
      }
      if (this.challanInfo.arrivalDateTime == '0001-01-01T00:00:00') {
        this.arrivalForm.patchValue({
          arrivalDateTime: datepipe.transform(null)
        });
      }
      if (this.challanInfo.parkingTime == '0001-01-01T00:00:00') {
        this.arrivalForm.patchValue({
          parkingTime: datepipe.transform(null)
        });
      }
      if (this.challanInfo.exitTime == '0001-01-01T00:00:00') {
        this.arrivalForm.patchValue({
          exitTime: datepipe.transform(null)
        });
      }
    }
  }

  LoadChallan() {
    if (this.challanId > 0) {
      this.challanService.getChallanInfo(this.challanId).subscribe(
        (data: any[]) => {
          this.ChallanModelList = data;
          this.challanInfo = this.ChallanModelList[0];
          this.challanInfoDets = this.challanInfo.challanDets;
          this.createArrival();
        },
        (error) => {
          this.toastr.warning("No Data Found", "Challans");
        }
      );
    }
  }

  saveData() {
    if (this.arrivalForm.valid) {
      this.challanService.update(this.arrivalForm.value).subscribe(response => {
        this.toastr.success("Record Updated Successfully");
        this.InitializeForm();
        if (this.challanType == 'EXPORT') {
          this.router.navigate(['/tms/export-challan-list']);
        }
      },
        (error) => {
          this.toastr.warning("Something went wrong!");
        }
      )
    }
    else {
      this.toastr.warning("Please Enter Required Field");
    }
  }
  Clear() {
    this.InitializeForm();
  }
}