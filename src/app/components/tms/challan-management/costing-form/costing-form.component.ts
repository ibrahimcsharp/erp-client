import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChallanService } from '../../service/challan.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallanModel } from '../../model/challan';
@Component({
  selector: 'app-costing-form',
  templateUrl: './costing-form.component.html',
  styleUrls: ['./costing-form.component.scss']
})
export class CostingFormComponent implements OnInit {
  $challanModel: ChallanModel;
  public challanId = 0;
  challanType: string;
  costingForm: FormGroup;
  challanInfo: any;
  ChallanModelList: any[];
  ButtonName: string;
  idWithTag: any;
  parts: any;
  tag: any;
  actualCost: number;


  public total = 0.00;
  public totalcbm = 0.00;
  public perCBMPrice = 0.00;
  public BuyerCostPrice = 0.00;
  public BuyerCostPercentage = 0.00;
  public totalBuyerCostPrice = 0.00;
  public totalBuyerCostPercentage = 0.00;


  public datepipe: DatePipe = new DatePipe('en-US');
  constructor(
    private challanService: ChallanService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private currentRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.idWithTag = this.currentRoute.snapshot.paramMap.get("id");
    this.parts = this.idWithTag.split("-");
    this.challanId = parseInt(this.parts[0]);
    this.tag = this.parts.length > 1 ? this.parts[1] : null;
    console.log("Tag", this.tag);
    this.InitializeForm();
    //this.LoadChallan();
  }
  ngAfterViewInit() {
    this.LoadChallan();
  }
  initializeTransportForm() {
    return this.fb.group({
      billNo: ['', Validators.required],
      billDate: ['', Validators.required],
      isTruckFairApplicable: false,
      typeOfTrip: [this.challanType],
      billingMonth: ['', Validators.required],
      isTruckFairPaid: false,
      warehouseRent: [0.00],
      fareAmount: [0.00],
      damageAmount: [0.00],
      additionalCharge: [0.00],
      extraCharge: [0.00],
      totalCharge: [this.total],
    });
  }

  InitializeForm() {
    this.costingForm = this.fb.group({
      id: [0],
      challanno: ['', Validators.required],
      challandate: ['', Validators.required],
      deponame: [],
      depoaddress: [],
      cnfname: [],
      cnfcontactno: [],
      forwardername: [],
      drivername: [],
      drivermobileno: [],
      licenseno: [],
      covervanno: [],
      loaddatetime: [],
      unloaddatetime: [],
      typeOfGoods: [],
      transportcompany: [],
      securitylockno: [],
      typeOfVehicle: [],
      tripID: [],
      departure: [],
      arrival: [],
      companyname: [],
      status: [],
      factoryInTime: [],
      vehicleInTime: [],
      arrivalDateTime: [],
      parkingTime: [],
      exitTime: [],
      auditBillAmount: [],
      auditComment: [],

      Transport: this.fb.array([
        this.initializeTransportForm()
      ]),

      ChallanDets: this.fb.array([])
    });
    this.ButtonName = (this.tag == 'AB') ? "Update" : "Save";
  }

  get ChallanDets() {
    return this.costingForm.get('ChallanDets') as FormArray;
  }
  get Transport() {
    return this.costingForm.get('Transport') as FormArray;
  }
  get f() {
    return this.costingForm.controls;
  }
  createCosting() {
    // if (!this.$challanModel) {
    if (this.challanInfo) {
      //this.challanInfo = this.$challanModel;
      //this.challanId = this.$challanModel.id;
      //this.challanType = this.$challanModel.status ? this.challanType : 'Export';

      this.challanType = this.challanInfo.status;
      this.actualCost = this.challanInfo.actualCost;
      if (this.challanType == 'EXPORT_ARRIVED') {
        this.costingForm.patchValue({
          status: "EXPORT_COSTING_PROCESSED",
        });
      }
      if (this.challanType == 'EXPORT_COSTING_PROCESSED') {
        this.costingForm.patchValue({
          status: "EXPORT_COSTING_PROCESSED",
        });
      }
      const datepipe: DatePipe = new DatePipe('en-US');
      this.costingForm.patchValue({
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
        loaddatetime: datepipe.transform(this.challanInfo.loaddatetime, 'MM-DD-YYYY hh:mm'),
        unloaddatetime: datepipe.transform(this.challanInfo.unloaddatetime, 'MM-DD-YYYY hh:mm'),
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
      });

      const transportArray = this.costingForm.get('Transport') as FormArray;
      transportArray.clear();
      if (this.challanInfo.transports != null) {
        transportArray.push(this.fb.group({
          billNo: [this.challanInfo.transports.billNo, Validators.required],
          billDate: [datepipe.transform(this.challanInfo.transports.billDate, 'yyyy-MM-dd'), Validators.required],
          isTruckFairApplicable: [this.challanInfo.transports.isTruckFairApplicable],
          typeOfTrip: [this.challanInfo.transports.typeOfTrip, Validators.required],
          billingMonth: [this.challanInfo.transports.billingMonth, Validators.required],
          isTruckFairPaid: [this.challanInfo.transports.isTruckFairPaid],
          warehouseRent: [this.challanInfo.transports.warehouseRent],
          fareAmount: [this.challanInfo.transports.fareAmount],
          damageAmount: [this.challanInfo.transports.damageAmount],
          additionalCharge: [this.challanInfo.transports.additionalCharge],
          extraCharge: [this.challanInfo.transports.extraCharge],
          totalCharge: [this.challanInfo.transports.totalCharge],
        }));
      }
      else {
        transportArray.push(this.fb.group({
          billNo: ['', Validators.required],
          billDate: ['', Validators.required],
          isTruckFairApplicable: false,
          typeOfTrip: [this.challanType],
          billingMonth: ['', Validators.required],
          isTruckFairPaid: false,
          warehouseRent: [0.00],
          fareAmount: [0.00],
          damageAmount: [0.00],
          additionalCharge: [0.00],
          extraCharge: [0.00],
          totalCharge: [this.total],
        }));
      }
      for (var i = 0; i < this.challanInfo.challanDets.length; i++) {
        this.totalcbm = this.totalcbm + parseFloat(this.challanInfo.challanDets[i].deliverycbm);

        (<FormArray>this.costingForm.get('ChallanDets')).push(this.fb.group({
          //sn: i + 1,
          id: this.challanInfo.challanDets[i].id,
          challanId: this.challanInfo.challanDets[i].challanId,
          buyername: this.challanInfo.challanDets[i].buyername,
          pono: this.challanInfo.challanDets[i].pono,
          stylename: this.challanInfo.challanDets[i].stylename,
          color: this.challanInfo.challanDets[i].color,
          deliverycartonqty: this.challanInfo.challanDets[i].deliverycartonqty,
          deliverypcsqty: this.challanInfo.challanDets[i].deliverypcsqty,
          unitMeasure: this.challanInfo.challanDets[i].unitMeasure,
          deliverycbm: this.challanInfo.challanDets[i].deliverycbm,
          cost: this.challanInfo.challanDets[i].cost,
          percentage: this.challanInfo.challanDets[i].percentage,
          remarks: this.challanInfo.challanDets[i].remarks,
        }));
      }
    }
    this.calculateTotal()
  }

  LoadChallan() {
    this.challanService.getChallanInfo(this.challanId).subscribe(
      (data: any[]) => {
        this.ChallanModelList = data;
        this.challanInfo = this.ChallanModelList[0];
        console.log("Costing Challan Form", this.ChallanModelList);
        this.createCosting();
      },
      (error) => {
        this.toastr.warning("No Data Found", "Challans");
      }
    );
  }

  calculateTotal() {
    //this.calculateTotalcbm();
    const warehouseRentT = this.costingForm.get(['Transport', '0', 'warehouseRent']).value;
    const fareAmountT = this.costingForm.get(['Transport', '0', 'fareAmount']).value;
    const damageAmountT = this.costingForm.get(['Transport', '0', 'damageAmount']).value;
    const additionalChargeT = this.costingForm.get(['Transport', '0', 'additionalCharge']).value;
    const extraChargeT = this.costingForm.get(['Transport', '0', 'extraCharge']).value;

    this.total = parseFloat(warehouseRentT) + parseFloat(fareAmountT) + parseFloat(damageAmountT) + parseFloat(additionalChargeT) + parseFloat(extraChargeT);
    this.costingForm.get(['Transport', '0', 'totalCharge']).setValue(this.total);

    this.perCBMPrice = this.total / this.totalcbm;

    let $totalcost = 0.00;
    let $totalPercentage = 0.00;
    for (let i = 0; i < this.ChallanDets.length; i++) {
      const cbm = this.costingForm.get(['ChallanDets', i, 'deliverycbm']).value;
      this.BuyerCostPrice = Number(cbm) * Number(this.perCBMPrice);
      $totalcost = $totalcost + Number(this.BuyerCostPrice);
      this.BuyerCostPercentage = (this.BuyerCostPrice * 100 / this.total);
      $totalPercentage = $totalPercentage + Number(this.BuyerCostPercentage);
      this.costingForm.get(['ChallanDets', i, 'cost']).patchValue(Number(this.BuyerCostPrice).toFixed(2));
      this.costingForm.get(['ChallanDets', i, 'percentage']).patchValue(Number(this.BuyerCostPercentage).toFixed(2));

    }
    this.totalBuyerCostPrice = Math.round(Number($totalcost));
    this.totalBuyerCostPercentage = Math.round(Number($totalPercentage));

  }

  calculateCost(index: number) {
    //this.calculateTotalcbm();
    this.calculateTotal();
    if (this.total > 0.00) {

      var cbm = ((this.costingForm.get('ChallanDets') as FormArray).at(index) as FormGroup).get('deliverycbm').value;
      this.BuyerCostPrice = parseFloat(cbm) * Number(this.perCBMPrice);
      this.BuyerCostPercentage = (this.BuyerCostPrice * 100 / this.total);

      ((this.costingForm.get('ChallanDets') as FormArray).at(index) as FormGroup).get('cost').patchValue(this.BuyerCostPrice);
      ((this.costingForm.get('ChallanDets') as FormArray).at(index) as FormGroup).get('percentage').patchValue(Number(this.BuyerCostPercentage).toFixed(2));

      //this.calculateTotalcbm();
      console.log("Total Price:", this.total);
      console.log("totalcbm:", this.totalcbm)
      console.log("perCBMPrice:", this.perCBMPrice)
      console.log("BuyerCostPrice:", this.BuyerCostPrice)
      console.log("BuyerCostPercentage:", this.BuyerCostPercentage)

    }
    else {
      alert("Please insert transport total first");
    }
  }
  calculateTotalcbm() {
    let $totalcbm = 0.00;
    const challanDetsArray = this.costingForm.get('ChallanDets') as FormArray;

    for (let i = 0; i < challanDetsArray.length; i++) {
      const deliverycbm = challanDetsArray.at(i).get('deliverycbm').value;
      $totalcbm += parseFloat(deliverycbm);
    }
    this.totalcbm = Number($totalcbm.toFixed(2));
    this.perCBMPrice = this.total / this.totalcbm;
  }
  saveData() {
    if (this.costingForm.valid || this.tag == 'AB') {
      this.ChallanDets.controls.forEach((control) => {
        control.get('deliverycartonqty').setValue(parseFloat(control.get('deliverycartonqty').value));
        control.get('deliverypcsqty').setValue(parseFloat(control.get('deliverypcsqty').value));
        control.get('deliverycbm').setValue(parseFloat(control.get('deliverycbm').value));
        control.get('cost').setValue(parseFloat(control.get('cost').value));
        control.get('percentage').setValue(parseFloat(control.get('percentage').value));
      });
      this.Transport.controls.forEach((control) => {
        control.get('fareAmount').setValue(parseFloat(control.get('fareAmount').value));
        control.get('damageAmount').setValue(parseFloat(control.get('damageAmount').value));
        control.get('warehouseRent').setValue(parseFloat(control.get('warehouseRent').value));
        control.get('additionalCharge').setValue(parseFloat(control.get('additionalCharge').value));
        control.get('totalCharge').setValue(parseFloat(control.get('totalCharge').value));
        control.get('extraCharge').setValue(parseFloat(control.get('extraCharge').value));
      });
      console.log(this.costingForm.value);
    
      this.challanService.update(this.costingForm.value).subscribe(response => {
        this.toastr.success("Record Updated Successfully");
        this.InitializeForm();
        this.Clear();
        // if(this.challanType == 'EXPORT_ARRIVED'){
        //   this.router.navigate(['/tms/export-challan-list']);
        // }
        // if(this.challanType == 'EXPORT_COSTING_PROCESSED'){
        //   this.router.navigate(['/tms/cost-submit-export-list']);
        // }
        //this.LoadChallan();
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
    this.totalcbm = 0.00;
    this.perCBMPrice = 0.00;
    this.totalBuyerCostPrice = 0.00;
    this.totalBuyerCostPercentage = 0.00;
  }
}