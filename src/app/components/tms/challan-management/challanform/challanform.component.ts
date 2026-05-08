import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChallanService } from '../../service/challan.service';
import { ChallanModel } from '../../model//challan'
import { DatePipe, formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
@Component({
  selector: 'app-challanform',
  templateUrl: './challanform.component.html',
  styleUrls: ['./challanform.component.scss']
})
export class ChallanformComponent implements OnInit {
  ChallanModelList: ChallanModel[];
  ChallanModel: ChallanModel;
  ButtonName: string;
  challanInfo: any;
  challanForm: FormGroup;
  challanType: string;

  public total = 0.00;
  public totalcbm = 0.00;
  public perCBMPrice = 0.00;
  public BuyerCostPrice = 0.00;
  public BuyerCostPercentage = 0.00;
  public totalBuyerCostPrice = 0.00;
  public totalBuyerCostPercentage = 0.00;
  isCreateMode: boolean = true;
  public challanId = 0;

  constructor(private challanService: ChallanService,
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private currentRoute: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    // var info = this.currentRoute.snapshot.paramMap.get("id");
    // if(info != null){
    //   var chars = info.split(',');
    //   this.challanId = parseInt(chars[0]);
    //   this.challanType = chars[1];
    // }
    // this.challanId = parseInt(this.currentRoute.snapshot.paramMap.get("id"));

    this.InitializeForm();
    this.LoadChallan();
    this.commonService.LoadBuyerList();
  }


  initializeTransportForm() {
    return this.fb.group({
      billNo: [''],
      billDate: [''],
      isTruckFairApplicable: false,
      typeOfTrip: [''],
      billingMonth: [''],
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
    this.challanForm = this.fb.group({
      id: [0],
      challanno: ['', Validators.required],
      challandate: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), Validators.required],
      deponame: [],
      depoaddress: [],
      cnfname: [],
      cnfcontactno: [],
      forwardername: [],
      drivername: ['', Validators.required],
      drivermobileno: ['', Validators.required],
      licenseno: [],
      covervanno: ['', Validators.required],
      loaddatetime: [],
      unloaddatetime: [],
      typeOfGoods: [],
      transportcompany: ['', Validators.required],
      securitylockno: [],
      typeOfVehicle: [],
      tripID: [],
      departure: [],
      arrival: [],
      companyname: [],
      status: [''],

      truckChallanNo: [''],
      goodsReleaseDate: [''],
      cnfAgentName: [''],
      cnfClearingZoneName: [''],
      driverDlNumber: [''],
      truckNumber: [''],
      importId: [0],
      deliveryStoreName: [''],
      beneficiaryName: [''],

      Transport: this.fb.array([
        this.initializeTransportForm()
      ]),
      // Export
      ChallanDets: this.fb.array([]),
      // Import
      ImportDetails: this.fb.array([]),
      // Local
      LocalChallanDets: this.fb.array([]),


    });

    this.ButtonName = "Save";
    this.isCreateMode = true;
    this.calculateTotalcbm();
  }

  get ChallanDets() {
    return this.challanForm.get('ChallanDets') as FormArray;
  }
  get ImportDetails() {
    return this.challanForm.get('ImportDetails') as FormArray;
  }
  get Transport() {
    return this.challanForm.get('Transport') as FormArray;
  }
  get f() {
    return this.challanForm.controls;
  }

  addChallanDetRow() {
    const itemLength = this.ChallanDets.length;
    //console.log(itemLength);
    const newRow = this.fb.group({
      id: [0],
      challanId: [0],
      buyername: [],
      pono: [],
      stylename: [],
      color: [],
      deliverycartonqty: [],
      deliverypcsqty: [],
      unitMeasure: [],
      deliverycbm: [0],
      cost: [0],
      percentage: [0],
      remarks: []
    });
    this.ChallanDets.push(newRow);

  }

  addImportChallanDetRow() {
    const itemLength = this.ImportDetails.length;
    //console.log(itemLength);
    const newRow = this.fb.group({
      id: [0],
      buyerId: [0],
      buyername: [],
      supplierName: [],
      consignment: [],
      invoiceNo: [],
      invoiceDate: [new Date()],
      cbmUnit: [],
      unitMeasure: [],
      deliveryQty: [0],
      cbm: [0],
      cost: [0],
      percentage: [0],
      remarks: []
    });
    this.ImportDetails.push(newRow);

  }
  removeImportchallanDet(index: number) {
    this.ImportDetails.removeAt(index);
    //console.log(index)
    this.calculateTotalcbm();
  }

  removechallanDet(index: number) {
    this.ChallanDets.removeAt(index);
    //console.log(index)
    this.calculateTotalcbm();
  }
  LoadChallan() {
    this.challanService.getBillChallans().subscribe(
      (data: any[]) => {
        this.ChallanModelList = data.filter(x => x.status.includes("PROCESSED"));
        if (this.challanId != null && this.challanId != undefined && this.challanId > 0) {
          this.ChallanModelList = this.ChallanModelList.filter(x => x.id == this.challanId);
          console.log("challan model", this.ChallanModel)
          this.EditChallan(this.ChallanModelList[0]);
        }
      },
      (error) => {
        this.toastr.warning("No Data Found", "Challans");
      }
    );
  }

  EditChallan(rowData: ChallanModel) {
    this.InitializeForm();
    this.challanInfo = rowData;
    this.challanId = rowData.id;
    this.challanType = this.challanInfo.status;
    const datepipe: DatePipe = new DatePipe('en-US')

    this.challanForm.patchValue({
      id: this.challanId,
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
      status: this.challanInfo.status,

    });
    const transportArray = this.challanForm.get('Transport') as FormArray;
    transportArray.clear();

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

    for (var i = 0; i < this.challanInfo.challanDets.length; i++) {
      this.totalcbm = this.totalcbm + parseFloat(this.challanInfo.challanDets[i].deliverycbm);

      (<FormArray>this.challanForm.get('ChallanDets')).push(this.fb.group({
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
        cost: 0,//this.challanInfo.challanDets[i].cost,
        percentage: 0,//this.challanInfo.challanDets[i].percentage,
        remarks: this.challanInfo.challanDets[i].remarks,
      }));
    }

    this.calculateTotal()
    this.ButtonName = "Update";
    this.isCreateMode = false;
  }

  calculateTotalcbm() {
    if (this.challanForm.value.status == 'EXPORT') {
      let $totalcbm = 0.00;
      const challanDetsArray = this.challanForm.get('ChallanDets') as FormArray;

      for (let i = 0; i < challanDetsArray.length; i++) {
        const deliverycbm = challanDetsArray.at(i).get('deliverycbm').value;
        $totalcbm += parseFloat(deliverycbm);
      }

      this.totalcbm = Number($totalcbm.toFixed(2));
      //this.calculateTotal();
    }
    else if (this.challanForm.value.status == 'IMPORT') {
      let $totalcbm = 0.00;
      const challanImpDetsArray = this.challanForm.get('ImportDetails') as FormArray;

      for (let i = 0; i < challanImpDetsArray.length; i++) {
        const cbm = challanImpDetsArray.at(i).get('cbm').value;
        $totalcbm += parseFloat(cbm);
      }

      this.totalcbm = Number($totalcbm.toFixed(2));
      //this.calculateTotal();
    }
  }

  calculateTotal() {
    //this.calculateTotalcbm();
    const warehouseRentT = this.challanForm.get(['Transport', '0', 'warehouseRent']).value;
    const fareAmountT = this.challanForm.get(['Transport', '0', 'fareAmount']).value;
    const damageAmountT = this.challanForm.get(['Transport', '0', 'damageAmount']).value;
    const additionalChargeT = this.challanForm.get(['Transport', '0', 'additionalCharge']).value;
    const extraChargeT = this.challanForm.get(['Transport', '0', 'extraCharge']).value;

    this.total = parseFloat(warehouseRentT) + parseFloat(fareAmountT) + parseFloat(damageAmountT) + parseFloat(additionalChargeT) + parseFloat(extraChargeT);
    this.challanForm.get(['Transport', '0', 'totalCharge']).setValue(this.total);

    this.perCBMPrice = this.total / this.totalcbm;
    let totalCost = 0.00;
    let totalPercentage = 0.00;
    for (let i = 0; i < this.ChallanDets.length; i++) {
      const cbm = this.challanForm.get(['ChallanDets', i, 'deliverycbm']).value;
      this.BuyerCostPrice = Number(cbm) * Number(this.perCBMPrice);
      totalCost = totalCost + Number(this.BuyerCostPrice);
      this.BuyerCostPercentage = (this.BuyerCostPrice * 100 / this.total);
      totalPercentage = totalPercentage + Number(this.BuyerCostPercentage);
      this.challanForm.get(['ChallanDets', i, 'cost']).patchValue(Number(this.BuyerCostPrice).toFixed(2));
      this.challanForm.get(['ChallanDets', i, 'percentage']).patchValue(Number(this.BuyerCostPercentage).toFixed(2));
    }
    this.totalBuyerCostPrice = Math.round(Number(totalCost));
    this.totalBuyerCostPercentage = Math.round(Number(totalPercentage));
  }

  saveData() {
    if (this.challanForm.value.status == 'EXPORT') {
      this.saveExportData();
    }
    else if (this.challanForm.value.status == 'IMPORT') {
      this.saveImportData();
    }
    // else if (this.challanForm.value.status == 'LOCAL') {
    //   this.saveLocalData();
    // }
  }

  saveExportData() {
    if (this.challanForm.valid &&
      this.challanForm.value.challanno != '' &&
      this.challanForm.value.challandate != '' &&
      this.challanForm.value.covervanno != '') {
      this.ChallanDets.controls.forEach((control) => {
        control.get('deliverycartonqty').setValue(parseFloat(control.get('deliverycartonqty').value));
        control.get('deliverypcsqty').setValue(parseFloat(control.get('deliverypcsqty').value));
        control.get('deliverycbm').setValue(parseFloat(control.get('deliverycbm').value));
        control.get('cost').setValue(parseFloat(control.get('cost').value));
        control.get('percentage').setValue(parseFloat(control.get('percentage').value));
      });

      if (this.isCreateMode === true) {
        const { Transport, ...dataWithoutTransport } = this.challanForm.value;
        console.log(dataWithoutTransport);
        this.challanService.post(dataWithoutTransport).subscribe(response => {
          this.toastr.success("Record Saved Successfully");
          this.Clear();
          //this.LoadChallan();
        },
          (error) => {
            this.toastr.warning("Failed To Save Challan");
          }
        );
      }
      else {
        this.Transport.controls.forEach((control) => {
          control.get('fareAmount').setValue(parseFloat(control.get('fareAmount').value));
          control.get('damageAmount').setValue(parseFloat(control.get('damageAmount').value));
          control.get('warehouseRent').setValue(parseFloat(control.get('warehouseRent').value));
          control.get('additionalCharge').setValue(parseFloat(control.get('additionalCharge').value));
          control.get('totalCharge').setValue(parseFloat(control.get('totalCharge').value));
          control.get('extraCharge').setValue(parseFloat(control.get('extraCharge').value));
        });

        this.challanService.update(this.challanForm.value).subscribe(response => {
          this.toastr.success("Record Updated Successfully");
          this.Clear();
          if (this.challanForm.value.status == 'EXPORT') {
            this.router.navigate(['/tms/export-challan-list']);
          }
          //this.LoadChallan();
        },
          (error) => {
            this.toastr.warning("Failed To Update Challan!");
          }
        );
      }
    } else {
      this.toastr.warning("Please Enter Required Field");
    }
  }
  saveImportData() {
    if (this.challanForm.valid &&
      this.challanForm.value.truckChallanNo != '' &&
      this.challanForm.value.truckNumber != '' &&
      this.challanForm.value.goodsReleaseDate != '' &&
      this.challanForm.value.challanType != '') {

      this.ImportDetails.controls.forEach((control) => {
        control.get('consignment').setValue(parseFloat(control.get('consignment').value));
        control.get('deliveryQty').setValue(parseFloat(control.get('deliveryQty').value));
        control.get('cbm').setValue(parseFloat(control.get('cbm').value));
        control.get('cost').setValue(parseFloat(control.get('cost').value));
        control.get('percentage').setValue(parseFloat(control.get('percentage').value));
      });
      console.log(this.challanForm.value)
      this.challanService.createImport(this.challanForm.value).subscribe(response => {
        this.toastr.success("Record Updated Successfully");
        this.InitializeForm();
        this.Clear();
        if (this.challanType == 'IMPORT') {
          this.router.navigate(['/tms/cost-submit-import-list']);
        }
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

  deleteChallan(id: number) {
    var Con = confirm("Are you sure want to delete this?");
    if (Con === true) {
      //console.log(id)
      this.challanService.delete(id).subscribe(response => {
        this.toastr.success("Record deleted Successfully");
        this.LoadChallan();
      },
        (error) => {
          this.toastr.warning("Failed To Delete Data!");
        }
      )
      //console.log(this.challanForm.value)
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

