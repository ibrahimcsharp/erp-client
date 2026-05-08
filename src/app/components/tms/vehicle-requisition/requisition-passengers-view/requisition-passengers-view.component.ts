import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { ReferenceModel } from '../../model/common.model';
import { RequisitionLogModel } from '../../model/Requisition-log.model';
import { VehicleRequisitionModel } from '../../model/vehicle-requisition.model';
import { TmsCommonService } from '../../service/tms-common.service';
import { VehicleManageService } from '../../service/vehicle-manage.service';

@Component({
  selector: 'app-requisition-passengers-view',
  templateUrl: './requisition-passengers-view.component.html',
  styleUrls: ['./requisition-passengers-view.component.scss']
})
export class RequisitionPassengersViewComponent implements OnInit {
  RequisitionPasserngersViewForm: FormGroup;
  noResult: boolean;
  isBuyer: boolean = false;
  isCompany: boolean = false;
  isDepartment: boolean = false;
  isDivision: boolean = false;
  isEmployee: boolean = false;
  isCustomer: boolean = false;
  VehicleRequisitionModel: VehicleRequisitionModel;
  selectedEmployees: any[];
  selectedDepartments: any[];
  allReferenceList: ReferenceModel[] = new Array();
  AllRequisitionLogList: RequisitionLogModel[] = new Array();
  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: VehicleManageService,
    private toastr: ToastrService,
    public tmsService: TmsCommonService,) { }

  ngOnInit(): void {
    this.InitializeForm();
    this.commonService.LoadBuyerList();
    this.tmsService.LoadEmployee();
    this.tmsService.LoadDepartment();
    this.commonService.LoadCompany();
    this.tmsService.LoadVehicleTypes();
  }

  InitializeForm() {

    this.RequisitionPasserngersViewForm = this.fb.group({
      requisitionId: 0,
      departmentId: "",
      companyId: 0,
      employeeId: "",
      buyerId: "",
      vehicleId: "",
      vehicleTypeId: "",
      requiredFor: [""],
      requisitionFor: [""],
      usedType: [""],
      purpose: [""],
      customerName: [""],
      pickupLocation: [""],
      dropLocation: [""],
      noOfPerson: [""],
      startTime: [""],
      endTime: [""],
      remarks: [""],
      mobileNo: [""],
      registrationNumber: [""],
      employeeName: [""],
      fromDate: [""],
      buyerPersonName: [""],
      buyerPersonMobileNo: [""],
      participantName: [""],
      supervisorRejectReason: [""],
      transportDptRejectReason: [""],
    });
    this.assignedFor("1");
    this.selectedEmployees = null;
    this.selectedDepartments = null;
  }

  InitializeFormFromParent() {
    this.InitializeForm();
    if (this.VehicleRequisitionModel) {
      console.log("Loaded Data",this.VehicleRequisitionModel);
      const datepipe: DatePipe = new DatePipe('en-US')
      this.RequisitionPasserngersViewForm.patchValue({
        requisitionId: this.VehicleRequisitionModel.requisitionId,
        departmentId: "",
        companyId: this.VehicleRequisitionModel.companyId,
        employeeId: "",
        buyerId: this.VehicleRequisitionModel.buyerId,
        vehicleTypeId: this.VehicleRequisitionModel.vehicleTypeId,
        requisitionFor: this.VehicleRequisitionModel.requisitionFor,
        requiredFor: this.VehicleRequisitionModel.requiredFor,
        usedType: this.VehicleRequisitionModel.usedType,
        purpose: this.VehicleRequisitionModel.purpose,
        customerName: this.VehicleRequisitionModel.customerName,
        pickupLocation: this.VehicleRequisitionModel.pickupLocation,
        dropLocation: this.VehicleRequisitionModel.dropLocation,
        startTime: datepipe.transform(this.VehicleRequisitionModel.startTime, 'yyyy-MM-ddThh:mm'),
        endTime: datepipe.transform(this.VehicleRequisitionModel.endTime, 'yyyy-MM-ddThh:mm'),
        noOfPerson: this.VehicleRequisitionModel.noOfPerson,
        remarks: this.VehicleRequisitionModel.remarks,
        mobileNo: this.VehicleRequisitionModel.mobileNo,
        registrationNumber: this.VehicleRequisitionModel.registrationNumber,
        employeeName: this.VehicleRequisitionModel.employeeName,
        fromDate: datepipe.transform(this.VehicleRequisitionModel.fromDate, 'yyyy-MM-ddThh:mm'),
        buyerPersonName: this.VehicleRequisitionModel.buyerPersonName,
        buyerPersonMobileNo: this.VehicleRequisitionModel.buyerPersonMobileNo,
        participantName: this.VehicleRequisitionModel.participantName,
        supervisorRejectReason: this.VehicleRequisitionModel.supervisorRejectReason,
      });
      this.assignedFor(String(this.VehicleRequisitionModel.requisitionFor));
      this.setRefaranceDate(this.VehicleRequisitionModel.requisitionId, (this.VehicleRequisitionModel.requisitionFor));
      this.LoadRequisitionLogList(this.VehicleRequisitionModel.requisitionId);
    }

  }


  setRefaranceDate(refaranceId: number, requisitionFor: number) {
    this.service.GetTMSReferenceList().subscribe(
      (data: any[]) => {
        console.log(data);
        let vfilter = { 'referenceType': ['Requisition Employee', 'Requisition Department'], "referenceSourceId": [String(refaranceId)] }
        this.allReferenceList = data;
        this.selectedEmployees = new Array();
        this.selectedDepartments = new Array();
        this.allReferenceList = this.allReferenceList.filter(item => {
          return Object.keys(vfilter)
            .filter(_ => vfilter.hasOwnProperty(_))
            .every(key => {
              if (!item[key]) return true; // matches undefined value
              const arrayValues = vfilter[key] as any[];
              return arrayValues.some(_ => _ === item[key]);
            });
        });
        for (var i = 0; i < this.allReferenceList.length; i++) {
          if (requisitionFor == 6) {

            this.selectedEmployees.push({
              label: this.allReferenceList[i].referenceNumberName,
              value: this.allReferenceList[i].referenceNumber,
            });
          }
          if (requisitionFor == 3 || requisitionFor == 1) {
            this.selectedDepartments.push({
              label: this.allReferenceList[i].referenceNumberName,
              value: this.allReferenceList[i].referenceNumber,
            });
          }

        }

      },
      (error) => {
        this.toastr.error("Failed To Get Vehicle Requisition Department/Employee");
        console.log(error);
      }
    );
  }

  assignedFor(event: string) {
    this.isBuyer = false;
    this.isCompany = false;
    this.isDepartment = false;
    this.isDivision = false;
    this.isEmployee = false;
    this.isCustomer = false;
    console.log(event);
    if (event == '1') {
      this.isBuyer = true;
    } else if (event == '6') {
      this.isEmployee = true;
      this.isCompany = true;
    } else if (event == '3') {
      this.isDepartment = true;
    } else if (event == '4') {
      this.isDivision = true;
    } else if (event == '5') {
      this.isCompany = true;
    } else if (event == '7') {
      this.isCustomer = true;
    }

  }

  LoadRequisitionLogList(value: number) {
    this.service.GetRequisitionLogList().subscribe(
      (data: any[]) => {
        this.AllRequisitionLogList = data;
        this.AllRequisitionLogList = this.AllRequisitionLogList.filter(s => s.requisitionId == value);
        console.log("Detail data", this.AllRequisitionLogList);
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Vehicle Requisition Log");
      }
    );
  }

}
