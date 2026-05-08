import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/shared/service/token.service';
import { environment } from 'src/environments/environment';
import { VehicleRegistrationModel } from '../model/vehicle-registration.model';
import { VehicleFitnessModel } from '../model/vehicle-fitness.model';
import { VehicleRoadPermitModel } from '../model/vehicle-road-permit.model';
import { VehicleTaxTokenModel } from '../model/vehicle-tax-token.model';
import { VehicleInsuranceModel } from '../model/vehicle-insurance.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleDocumentService {
  baseUrl = environment.apiUrl;
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
  datepipe: any;
  constructor(private http: HttpClient, private token: TokenService) { }


  VehicleRegistration(vehicleRegistration: VehicleRegistrationModel) {
    var body = {
      ...vehicleRegistration,
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "VehicleDocument/CreateVehicleRegistration", body, {
      headers: this.token.headerToken(),
    });
  }

  GetVehicleRegistrationList() {
    return this.http.get<any>(this.baseUrl_ + "VehicleDocument/GetAllVehicleRegistrationList", {
      headers: this.token.headerToken(),
    });
  }

  VehicleFitness(vehicleFitness: VehicleFitnessModel) {
    console.log(JSON.stringify(vehicleFitness));
    var body = {
      ...vehicleFitness,
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "VehicleDocument/CreateVehicleFitness", body, {
      headers: this.token.headerToken(),
    });
  }

  GetVehicleFitnessList() {
    return this.http.get<any>(this.baseUrl_ + "VehicleDocument/GetAllVehicleFitnessList", {
      headers: this.token.headerToken(),
    });
  }

  VehicleRoadPermit(vehicleRoadPermit: VehicleRoadPermitModel) {
    console.log(JSON.stringify(vehicleRoadPermit));
    var body = {
      ...vehicleRoadPermit,
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "VehicleDocument/CreateVehicleRoadPermit", body, {
      headers: this.token.headerToken(),
    });
  }

  GetVehicleRoadPermitList() {
    return this.http.get<any>(this.baseUrl_ + "VehicleDocument/GetAllVehicleRoadPermitList", {
      headers: this.token.headerToken(),
    });
  }

  VehicleTaxToken(vehicleTaxToken: VehicleTaxTokenModel) {
    console.log(JSON.stringify(vehicleTaxToken));
    var body = {
      ...vehicleTaxToken,
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "VehicleDocument/CreateVehicleTaxToken", body, {
      headers: this.token.headerToken(),
    });
  }

  GetVehicleTaxTokenList() {
    return this.http.get<any>(this.baseUrl_ + "VehicleDocument/GetAllVehicleTaxTokenList", {
      headers: this.token.headerToken(),
    });
  }

  VehicleInsurance(vehicleInsurance: VehicleInsuranceModel) {
    console.log(JSON.stringify(vehicleInsurance));
    var body = {
      ...vehicleInsurance,
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "VehicleDocument/CreateVehicleInsurence", body, {
      headers: this.token.headerToken(),
    });
  }

  GetVehicleInsuranceList() {
    return this.http.get<any>(this.baseUrl_ + "VehicleDocument/GetAllVehicleInsurenceList", {
      headers: this.token.headerToken(),
    });
  }
  VehicleAit(vehicleAit: any) {
    console.log(JSON.stringify(vehicleAit));
    var body = {
      ...vehicleAit,
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "VehicleDocument/CreateVehicleAit", body, {
      headers: this.token.headerToken(),
    });
  }

  GetVehicleAitList() {
    return this.http.get<any>(this.baseUrl_ + "VehicleDocument/GetAllVehicleAitList", {
      headers: this.token.headerToken(),
    });
  }

  // GetVehicleRegDataByRegNo(id: any) {
  //   return this.http.get<any>(this.baseUrl_ + "VehicleDocument/GetVehicleRegDataByRegNo?id=" + id, {
  //     headers: this.token.headerToken(),
  //   });
  // }

  // GetVehicleFitDataByFitId(id: any) {
  //   return this.http.get<any>(this.baseUrl_ + "VehicleDocument/GetVehicleFitDataByFitId?id=" + id, {
  //     headers: this.token.headerToken(),
  //   });
  // }

  // GetPermitDataByPermitId(id: any) {
  //   return this.http.get<any>(this.baseUrl_ + "VehicleDocument/GetPermitDataByPermitId?id=" + id, {
  //     headers: this.token.headerToken(),
  //   });
  // }

  // GetTaxTokenDataByTaxTokenId(id: any) {
  //   return this.http.get<any>(this.baseUrl_ + "VehicleDocument/GetTaxTokenDataByTaxTokenId?id=" + id, {
  //     headers: this.token.headerToken(),
  //   });
  // }
}  