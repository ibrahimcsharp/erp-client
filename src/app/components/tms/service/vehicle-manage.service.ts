import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/shared/service/token.service';
import { environment } from 'src/environments/environment';
import { BrandCreateModel } from '../model/brand-create.model';
import { TmsModel } from '../model/tms-model.model';
import { TypeCreateModel } from '../model/vehicle-type.model';
import { VehicleCreateModel } from '../model/vehicle-entry.model';
import { VehicleAssignmentModel } from '../model/vehicle-assignment.model';
import { DriverInfoCreateModel } from '../model/driver-info.model';
import { DriverDisplinaryCreateModel } from '../model/driver-displinary.model';
import { VehicleRequisitionModel } from '../model/vehicle-requisition.model';
import { DriverAssignedModel } from '../model/driver-assigned.model';
import { ReferenceModel } from '../model/common.model';
import { TripCompleteModel } from '../model/trip-complete.model';


@Injectable({
  providedIn: 'root'
})
export class VehicleManageService {
  baseUrl = environment.apiUrl;
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
  datepipe: any;
  constructor(private http: HttpClient, private token: TokenService) { }

  BrandCreate(Brand: BrandCreateModel) {
    // console.log(JSON.stringify(bookingitemcreate));  
    var body = {
      ...Brand,
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "VehicleManagement/CreateBrand", body, {
      headers: this.token.headerToken(),
    });
  }

  GetBrandList() {
    return this.http.get<any>(this.baseUrl_ + "VehicleManagement/GetAllBrandList", {
      headers: this.token.headerToken(),
    });
  }

  TypeCreate(Type: TypeCreateModel) {
    // console.log(JSON.stringify(bookingitemcreate));  
    var body = {
      ...Type,
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "VehicleManagement/CreateType", body, {
      headers: this.token.headerToken(),
    });
  }

  GetTypeList() {
    return this.http.get<any>(this.baseUrl_ + "VehicleManagement/GetAllTypeList", {
      headers: this.token.headerToken(),
    });
  }

  ModelCreate(Model: TmsModel) {
    // console.log(JSON.stringify(bookingitemcreate));  
    var body = {
      ...Model,
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "VehicleManagement/CreateModel", body, {
      headers: this.token.headerToken(),
    });
  }

  GetModelList() {
    return this.http.get<any>(this.baseUrl_ + "VehicleManagement/GetAllModelList", {
      headers: this.token.headerToken(),
    });
  }

  GetFuelTypeList() {
    return this.http.get<any>(this.baseUrl_ + "VehicleEntry/GetAllFuelType", {
      headers: this.token.headerToken(),
    });
  }

  VehicleCreate(vehicle: VehicleCreateModel) {
    console.log(JSON.stringify(vehicle));
    var body = {
      ...vehicle,
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "VehicleEntry/CreateVehicle", body, {
      headers: this.token.headerToken(),
    });
  }

  GetVehicleList() {
    return this.http.get<any>(this.baseUrl_ + "VehicleEntry/GetAllVehicleData", {
      headers: this.token.headerToken(),
    });
  }



  VehicleAssign(vehicleAssign: any, selectedVehicle: any[]) {
    var body = {
      ...vehicleAssign,
      selectedVehicle
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "VehicleManagement/CreateVehicleAssign", body, {
      headers: this.token.headerToken(),
    });
  }

  GetVehicleAssign() {
    return this.http.get<any>(this.baseUrl_ + "VehicleManagement/GetAllVehicleAssignmentList", {
      headers: this.token.headerToken(),
    });
  }

  //Driver Info
  DriverInfoCreate(DriverInfo: DriverInfoCreateModel) {
    var body = {
      ...DriverInfo,
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "DriverManagement/CreateDriverInfo", body, {
      headers: this.token.headerToken(),
    });
  }

  GetDriverInfoList() {
    return this.http.get<any[]>(this.baseUrl_ + "DriverManagement/GetAllDriverInfoList", {
      headers: this.token.headerToken(),
    });
  }

  GetDriverAssignmentList() {
    return this.http.get<any>(this.baseUrl_ + "DriverManagement/DriverAssignmentList", {
      headers: this.token.headerToken(),
    });
  }

  GetDriverDisplinaryList() {
    return this.http.get<any>(this.baseUrl_ + "DriverManagement/DriverDisplinaryList", {
      headers: this.token.headerToken(),
    });
  }

  GetDisplinaryDropDownList() {
    return this.http.get<any>(this.baseUrl_ + "DriverManagement/GetAllDisplinaryTypeListDropdown", {
      headers: this.token.headerToken(),
    });
  }


  //Driver Displinary
  DriverDisplinaryCreate(DriverDisplinary: DriverDisplinaryCreateModel) {
    var body = {
      ...DriverDisplinary,
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "DriverManagement/CreateDriverDisplinary", body, {
      headers: this.token.headerToken(),
    });
  }

  CancelTripComplete(assignmentId: number, reason: string) {
    var body = {
      assignmentId: assignmentId,
      remarks: reason
    };
    return this.http.post<any>(this.baseUrl_ + "VehicleManagement/CancelTripComplete", body, {
      headers: this.token.headerToken(),
    });
  }

  ReassignTripComplete(assignmentId: number) {
    var body = {
      assignmentId: assignmentId,
    };
    return this.http.post<any>(this.baseUrl_ + "VehicleManagement/ReassignTripComplete", body, {
      headers: this.token.headerToken(),
    });
  }

  CreateTripComplete(tripComplete: TripCompleteModel) {
    return this.http.post<any>(this.baseUrl_ + "VehicleManagement/CreateTripComplete", tripComplete, {
      headers: this.token.headerToken(),
    });
  }

  VehicleRequisition(vehicleRequisition: VehicleRequisitionModel) {
    console.log(JSON.stringify(vehicleRequisition));
    var body = {
      ...vehicleRequisition,
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "VehicleRequisition/CreateVehicleRequisition", body, {
      headers: this.token.headerToken(),
    });
  }

  GetAllVehicleRequisitionList() {
    return this.http.get<any>(this.baseUrl_ + "VehicleRequisition/GetAllVehicleRequisitionList", {
      headers: this.token.headerToken(),
    });
  }

  GetAllVehicleRequisitionListStatus() {
    return this.http.get<any[]>(this.baseUrl_ + "VehicleRequisition/GetAllVehicleRequisitionListStatus", {
      headers: this.token.headerToken(),
    });
  }

  GetAllVehicleRequisitionListForAssing() {
    return this.http.get<any>(this.baseUrl_ + "VehicleRequisition/GetAllVehicleRequisitionListForAssing", {
      headers: this.token.headerToken(),
    });
  }

  //Driver Assignment
  DriverAssignmentCreate(DriverAssignment: DriverAssignedModel) {
    var body = {
      ...DriverAssignment,
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "DriverManagement/CreateDriverAssignment", body, {
      headers: this.token.headerToken(),
    });
  }

  // Common
  GetEmployeeList() {
    return this.http.get<any>(this.baseUrl_ + "Common/GetEmployeeList", {
      headers: this.token.headerToken(),
    });
  }
  GetDepartmentList() {
    return this.http.get<any>(this.baseUrl_ + "Common/GetDepartmentList", {
      headers: this.token.headerToken(),
    });
  }
  GetDivisionList() {
    return this.http.get<any>(this.baseUrl_ + "Common/GetDivisionList", {
      headers: this.token.headerToken(),
    });
  }

  CreateRefference(reference: ReferenceModel) {
    console.log(JSON.stringify(reference));
    return this.http.post<any>(this.baseUrl_ + "Common/CreateTMSReference", reference, {
      headers: this.token.headerToken(),
    });
  }

  GetTMSReferenceList() {
    return this.http.get<any>(this.baseUrl_ + "Common/GetTMSReferenceList", {
      headers: this.token.headerToken(),
    });
  }

  GetSchedulerCalenderList() {
    return this.http.get<any>(this.baseUrl_ + "Common/GetDashboardList", {
      headers: this.token.headerToken(),
    });
  }

  GetRequisitionLogList() {
    return this.http.get<any>(this.baseUrl_ + "VehicleRequisition/GetAllVehicleRequisitionLogList", {
      headers: this.token.headerToken(),
    });
  }

}
