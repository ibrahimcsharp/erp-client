import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { BrandCreateModel } from "../model/brand-create.model";
import { DepartmentModel, DivisionModel, EmployeeModel } from "../model/common.model";
import { DriverInfoCreateModel } from "../model/driver-info.model";
import { FuelTypeCreateModel } from "../model/fuel-type.model";
import { RequisitionLogModel } from "../model/Requisition-log.model";
import { RouteCreateModel } from "../model/route-create.model";
import { TmsModel } from "../model/tms-model.model";
import { VehicleCreateModel } from "../model/vehicle-entry.model";
import { TypeCreateModel } from "../model/vehicle-type.model";
import { VehicleManageService } from "./vehicle-manage.service";

@Injectable({
  providedIn: 'root'
})

export class TmsCommonService {

  allBrandList: BrandCreateModel[] = new Array();
  allBrandListDropdown: any;
  allVehicleList: VehicleCreateModel[];
  allModelList: TmsModel[] = new Array();
  allModelListDropdown: any;
  allTypeList: TypeCreateModel[] = new Array();
  allTypeListDropdown: any;
  allFuelTypeList: FuelTypeCreateModel[] = new Array();
  allFuelTypeListDropdown: any;
  AllDriverModelList: DriverInfoCreateModel[] = new Array();
  driverIdSelectList: any;
  selectedEmployees: any;
  allVehicleDropdown: any;
  departmentSelectList: any;
  divisionSelectList: any;
  companySelectList: any;
  AllRequisitionLogList: RequisitionLogModel[] = new Array();
  allEmployeeList: EmployeeModel[] = new Array();
  allEmployeeListDropdown: any;
  allDepartmentList: DepartmentModel[] = new Array();
  allDepartmentListDropdown: any;
  allDivisionList: DivisionModel[] = new Array();
  allDivisionListDropdown: any;

  allRoadRoutesListDropdown: any;

  baseUrl = environment.apiUrl;
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
  datepipe: any;

  constructor(
    public service: VehicleManageService,
    private toastr: ToastrService,
    private http: HttpClient, private token: TokenService
  ) { }


  LoadDrivers() {

    this.service.GetDriverInfoList().subscribe(
      (data: any[]) => {
        debugger
        this.AllDriverModelList = data.filter(x => x.employeeStatus == 'Active');
        this.driverIdSelectList = new Array();
        this.driverIdSelectList.push({ label: "===Select One===", value: "" });
        for (var i = 0; i < this.AllDriverModelList.length; i++) {
          this.driverIdSelectList.push({
            label: this.AllDriverModelList[i].employeeName,
            value: this.AllDriverModelList[i].infoId,
          });
        }

      },
      (error) => {
        this.toastr.warning("No Data Found", "Driver");
      }
    );

  }

  LoadRoadRoutes() {

    this.allRoadRoutesListDropdown = new Array();
    this.allRoadRoutesListDropdown.push({ label: "Sadarghat", value: "Sadarghat" });
    this.allRoadRoutesListDropdown.push({ label: "Ray Saheb Bazar", value: "Ray Saheb Bazar" });
    this.allRoadRoutesListDropdown.push({ label: "Naya Bazar", value: "Naya Bazar" });
    this.allRoadRoutesListDropdown.push({ label: "Banani ", value: "Banani" });


  }

  LoadEmployee() {

    this.service.GetEmployeeList().subscribe(
      (data: any[]) => {
        this.allEmployeeList = data;
        this.allEmployeeListDropdown = new Array();
        for (var i = 0; i < this.allEmployeeList.length; i++) {
          this.allEmployeeListDropdown.push({
            label: this.allEmployeeList[i].employeeName,
            value: this.allEmployeeList[i].employeeId,
          });
        }


      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Employee");

      }
    );
  }
  LoadDepartment() {
    this.service.GetDepartmentList().subscribe(
      (data: any[]) => {

        this.allDepartmentList = data;
        this.allDepartmentListDropdown = new Array();
        for (var i = 0; i < this.allDepartmentList.length; i++) {
          this.allDepartmentListDropdown.push({
            label: this.allDepartmentList[i].departmentName,
            value: this.allDepartmentList[i].departmentId,
          });
        }


      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Department");

      }
    );
  }

  LoadDivision() {
    this.service.GetDivisionList().subscribe(
      (data: any[]) => {

        this.allDivisionList = data;
        this.allDivisionListDropdown = new Array();
        this.allDivisionListDropdown.push({ label: "===Select One===", value: "" });
        for (var i = 0; i < this.allDivisionList.length; i++) {
          this.allDivisionListDropdown.push({
            label: this.allDivisionList[i].divisionName,
            value: this.allDivisionList[i].divisionId,
          });
        }


      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Division");

      }
    );

  }

  LoadVehicle() {
    this.service.GetVehicleList().subscribe(
      (data: any[]) => {
        this.allVehicleList = data;
        this.allVehicleList = this.allVehicleList.filter(s => s.status == "Free");
        console.log("All Vehicle :", this.allVehicleList);
        this.allVehicleDropdown = new Array();
        this.allVehicleDropdown.push({ label: "===Select One===", value: "" });
        for (var i = 0; i < this.allVehicleList.length; i++) {
          this.allVehicleDropdown.push({
            label: this.allVehicleList[i].registrationNumber,
            value: this.allVehicleList[i].vehicleId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Vehicles");

      }
    );
  }

  LoadVehicleBrands() {
    this.service.GetBrandList().subscribe(
      (data: any[]) => {

        this.allBrandList = data;
        this.allBrandList = this.allBrandList.filter(s => s.status == 1);
        this.allBrandListDropdown = new Array();
        this.allBrandListDropdown.push({ label: "===Select One===", value: "" });
        for (var i = 0; i < this.allBrandList.length; i++) {
          this.allBrandListDropdown.push({
            label: this.allBrandList[i].brandName,
            value: this.allBrandList[i].brandId,
          });
        }

      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Vehicle Brands");

      }
    );
  }

  LoadVehicleModels() {
    this.service.GetModelList().subscribe(
      (data: any[]) => {

        this.allModelList = data;
        console.log(data);
        this.allModelList = this.allModelList.filter(s => s.status == 1);
        this.allModelListDropdown = new Array();
        this.allModelListDropdown.push({ label: "===Select One===", value: "" });
        for (var i = 0; i < this.allModelList.length; i++) {
          this.allModelListDropdown.push({
            label: this.allModelList[i].modelName,
            value: this.allModelList[i].modelId,
          });
        }



      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Vehicle Models");

      }
    );
  }

  LoadVehicleModelsByBrand(brandId: string) {
    this.service.GetModelList().subscribe(
      (data: any[]) => {

        this.allModelList = data;
        this.allModelList = this.allModelList.filter(s => s.status == 1);
        this.allModelList = this.allModelList.filter(a => a.brandId == parseInt(brandId));
        console.log(this.allModelList);
        this.allModelListDropdown = new Array();
        this.allModelListDropdown.push({ label: "===Select One===", value: "" });
        for (var i = 0; i < this.allModelList.length; i++) {
          this.allModelListDropdown.push({
            label: this.allModelList[i].modelName,
            value: this.allModelList[i].modelId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Vehicle Models");

      }
    );
  }

  LoadVehicleTypes() {
    this.service.GetTypeList().subscribe(
      (data: any[]) => {
        this.allTypeList = data;
        this.allTypeList = this.allTypeList.filter(s => s.status == 1);
        this.allTypeListDropdown = new Array();
        this.allTypeListDropdown.push({ label: "===Select One===", value: "" });
        for (var i = 0; i < this.allTypeList.length; i++) {
          this.allTypeListDropdown.push({
            label: this.allTypeList[i].typeName,
            value: this.allTypeList[i].typeId,
          });
        }


      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Vehicle Types");

      }
    );
  }

  LoadVehicleFuelTypes() {

    this.service.GetFuelTypeList().subscribe(
      (data: any[]) => {
        this.allFuelTypeList = data;
        this.allFuelTypeList = this.allFuelTypeList.filter(s => s.status == 1);
        this.allFuelTypeListDropdown = new Array();
        this.allFuelTypeListDropdown.push({ label: "===Select One===", value: 0 });
        for (var i = 0; i < this.allFuelTypeList.length; i++) {
          this.allFuelTypeListDropdown.push({
            label: this.allFuelTypeList[i].fuelType,
            value: this.allFuelTypeList[i].typeId,
          });
        }

      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Vehicle Fuel Type");

      }
    );
  }

  GetRequisitionLogList() {
    this.service.GetRequisitionLogList().subscribe(
      (data: any[]) => {
        this.AllRequisitionLogList = data;
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Vehicle Requisition Log");
      }
    );
  }

  RouteCreate(Route: RouteCreateModel) {
    // console.log(JSON.stringify(bookingitemcreate));  
    var body = {
      ...Route,
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "Common/CreateRoute", body, {
      headers: this.token.headerToken(),
    });
  }

  GetRouteList() {
    return this.http.get<any>(this.baseUrl_ + "Common/GetRouteList", {
      headers: this.token.headerToken(),
    });
  }
}

