import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChallanService } from '../../service/challan.service';
import { DatePipe, formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallanModel } from '../../model/challan';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
@Component({
  selector: 'app-costing-form-import',
  templateUrl: './costing-form-import.component.html',
  styleUrls: ['./costing-form-import.component.scss']
})
export class CostingFormImportComponent implements OnInit {
  $challanModel: ChallanModel;
  public challanId = 0;
  challanType: string;
  costingForm: FormGroup;
  challanInfo: any;
  ChallanModelList: any[];
  ButtonName: string;

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
    public commonService: CommonServiceService,
  ) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.challanId = parseInt(this.currentRoute.snapshot.paramMap.get("id"));
    this.commonService.LoadBuyerList();
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
      truckChallanNo: ['', Validators.required],
      goodsReleaseDate: ['', Validators.required],
      cnfAgentName: [],
      cnfClearingZoneName: [],
      driverDlNumber: [],
      truckNumber: [],
      importId: [],
      status: [],
      deliveryStoreName: [],
      beneficiaryName: [],
      transportName: [],
      ImportTransport: this.fb.array([
        this.initializeTransportForm()
      ]),

      ImportDetails: this.fb.array([
      ])
    });
    this.ButtonName = "Save";
  }

  get ImportDetails() {
    return this.costingForm.get('ImportDetails') as FormArray;
  }
  get ImportTransport(): FormArray {
    return this.costingForm.get('ImportTransport') as FormArray;
  }
  get f() {
    return this.costingForm.controls;
  }

  createCosting() {
    if (this.challanInfo) {

      this.challanType = this.challanInfo.status;

      if (this.challanType == 'IMPORT') {
        this.costingForm.patchValue({
          status: "IMPORT_COSTING_PROCESSED",
        });
      }
      const datepipe: DatePipe = new DatePipe('en-US');

      this.costingForm.patchValue({
        id: this.challanId, // this id is for challan id
        truckChallanNo: this.challanInfo.truckChallanNo,
        goodsReleaseDate: datepipe.transform(this.challanInfo.goodsReleaseDate, 'yyyy-MM-dd'),
        cnfAgentName: this.challanInfo.cnfAgentName,
        cnfClearingZoneName: this.challanInfo.cnfClearingZoneName,
        driverDlNumber: this.challanInfo.driverDlNumber,
        truckNumber: this.challanInfo.truckNumber,
        importId: this.challanInfo.importId,
        deliveryStoreName: this.challanInfo.deliveryStoreName,
        beneficiaryName: this.challanInfo.beneficiaryName,
        typeofTrip: this.challanType,
        transportName: this.challanInfo.transportName,
      });

      for (var i = 0; i < this.challanInfo.ImportDetails.length; i++) {
        this.totalcbm = this.totalcbm + parseFloat(this.challanInfo.ImportDetails[i].cbm);
        (<FormArray>this.costingForm.get('ImportDetails')).push(this.fb.group({
          //sn: i + 1,
          id: this.challanInfo.ImportDetails[i].id,
          importChallanMstId: this.challanInfo.ImportDetails[i].importChallanMstId,
          buyerId: this.challanInfo.ImportDetails[i].buyerId,
          buyerName: this.challanInfo.ImportDetails[i].buyerName,
          btblcNo: this.challanInfo.ImportDetails[i].btblcNo,
          consignment: this.challanInfo.ImportDetails[i].consignment,
          contractNo: this.challanInfo.ImportDetails[i].contractNo,
          deliveryQty: this.challanInfo.ImportDetails[i].deliveryQty,
          invoiceDate: datepipe.transform(this.challanInfo.ImportDetails[i].invoiceDate, 'yyyy-MM-dd'),
          invoiceNo: this.challanInfo.ImportDetails[i].invoiceNo,
          supplierName: this.challanInfo.ImportDetails[i].supplierName,
          cbm: this.challanInfo.ImportDetails[i].cbm,
          cbmUnit: this.challanInfo.ImportDetails[i].cbmUnit,
          cost: this.challanInfo.ImportDetails[i].cost,
          percentage: this.challanInfo.ImportDetails[i].percentage,
          remarks: this.challanInfo.ImportDetails[i].remarks,
        }));
      }
    }
    this.calculateTotal();
  }

  LoadChallan() {
    this.challanService.getImportChallanInfo(this.challanId).subscribe(
      (data: any[]) => {
        //console.log(data);
        this.ChallanModelList = data;
        this.challanInfo = this.ChallanModelList[0];
        this.challanInfo.ImportDetails = this.challanInfo.importDetails;
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
    const warehouseRentT = this.costingForm.get(['ImportTransport', '0', 'warehouseRent']).value;
    const fareAmountT = this.costingForm.get(['ImportTransport', '0', 'fareAmount']).value;
    const damageAmountT = this.costingForm.get(['ImportTransport', '0', 'damageAmount']).value;
    const additionalChargeT = this.costingForm.get(['ImportTransport', '0', 'additionalCharge']).value;
    const extraChargeT = this.costingForm.get(['ImportTransport', '0', 'extraCharge']).value;

    this.total = parseFloat(warehouseRentT) + parseFloat(fareAmountT) + parseFloat(damageAmountT) + parseFloat(additionalChargeT) + parseFloat(extraChargeT);
    this.costingForm.get(['ImportTransport', '0', 'totalCharge']).setValue(this.total);
    if (this.totalcbm != 0.00) {
      this.perCBMPrice = this.total / this.totalcbm;
      let $totalcost = 0.00;
      let $totalPercentage = 0.00;
      for (let i = 0; i < this.ImportDetails.length; i++) {
        const cbm = this.costingForm.get(['ImportDetails', i, 'cbm']).value;
        this.BuyerCostPrice = Number(cbm) * Number(this.perCBMPrice);
        $totalcost = $totalcost + Number(this.BuyerCostPrice);
        this.BuyerCostPercentage = (this.BuyerCostPrice * 100 / this.total);
        $totalPercentage = $totalPercentage + Number(this.BuyerCostPercentage);
        this.costingForm.get(['ImportDetails', i, 'cost']).patchValue(Number(this.BuyerCostPrice).toFixed(2));
        this.costingForm.get(['ImportDetails', i, 'percentage']).patchValue(Number(this.BuyerCostPercentage).toFixed(2));
      }

      this.totalBuyerCostPrice = Math.round(Number($totalcost));
      this.totalBuyerCostPercentage = Math.round(Number($totalPercentage));
    }
  }

  calculateCost(index: number) {
    //this.calculateTotalcbm();
    this.calculateTotal();
    if (this.total > 0.00) {

      var cbm = ((this.costingForm.get('ImportDetails') as FormArray).at(index) as FormGroup).get('cbm').value;
      this.BuyerCostPrice = parseFloat(cbm) * Number(this.perCBMPrice);
      this.BuyerCostPercentage = (this.BuyerCostPrice * 100 / this.total);

      ((this.costingForm.get('ImportDetails') as FormArray).at(index) as FormGroup).get('cost').patchValue(this.BuyerCostPrice);
      ((this.costingForm.get('ImportDetails') as FormArray).at(index) as FormGroup).get('percentage').patchValue(Number(this.BuyerCostPercentage).toFixed(2));
    }
    else {
      alert("Please insert ImportTransport total first");
    }
  }
  //   calculateTotalcbm() {
  //     let $totalcbm = 0.00;
  //     const ImportDetailsArray = this.costingForm.get('ImportDetails') as FormArray;

  //     for (let i = 0; i < ImportDetailsArray.length; i++) {
  //       const deliverycbm = ImportDetailsArray.at(i).get('deliverycbm').value;
  //       $totalcbm += parseFloat(deliverycbm);
  //     }
  //     this.totalcbm = Number($totalcbm.toFixed(2));
  //     this.perCBMPrice = this.total / this.totalcbm;
  //   }
  saveData() {
    if (this.costingForm.valid) {
      this.ImportDetails.controls.forEach((control) => {
        control.get('consignment').setValue(parseFloat(control.get('consignment').value));
        control.get('deliveryQty').setValue(parseFloat(control.get('deliveryQty').value));
        control.get('cbm').setValue(parseFloat(control.get('cbm').value));
        control.get('cost').setValue(parseFloat(control.get('cost').value));
        control.get('percentage').setValue(parseFloat(control.get('percentage').value));
      });
      this.ImportTransport.controls.forEach((control) => {
        control.get('fareAmount').setValue(parseFloat(control.get('fareAmount').value));
        control.get('damageAmount').setValue(parseFloat(control.get('damageAmount').value));
        control.get('warehouseRent').setValue(parseFloat(control.get('warehouseRent').value));
        control.get('additionalCharge').setValue(parseFloat(control.get('additionalCharge').value));
        control.get('totalCharge').setValue(parseFloat(control.get('totalCharge').value));
        control.get('extraCharge').setValue(parseFloat(control.get('extraCharge').value));
      });
      console.log(this.costingForm.value)

      this.challanService.createImport(this.costingForm.value).subscribe(response => {
        this.toastr.success("Record Updated Successfully");
        this.InitializeForm();
        this.Clear();
        // if(this.challanType == 'IMPORT'){
        //   this.router.navigate(['/tms/cost-submit-import-list']);
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