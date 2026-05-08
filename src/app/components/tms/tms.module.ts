import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmsRoutingModule } from './tms-routing.module';
import { MerchandisingModule } from '../merchandising/merchandising.module';
import { VehicleManageService } from './service/vehicle-manage.service';
import { VehicleEntryComponent } from './vehicle-management/vehicle-entry/vehicle-entry.component';
import { BrandCreateComponent } from './vehicle-management/brand-create/brand-create.component';
import { ModelCreateComponent } from './vehicle-management/model-create/model-create.component';
import { VehicleFitnessComponent } from './vehicle-document/vehicle-fitness/vehicle-fitness.component';
import { VehicleTaxTokenComponent } from './vehicle-document/vehicle-tax-token/vehicle-tax-token.component';
import { VehicleRoadPermitComponent } from './vehicle-document/vehicle-road-permit/vehicle-road-permit.component';
import { VehicleAitComponent } from './vehicle-document/vehicle-ait/vehicle-ait.component';
import { VehicleInsuranceComponent } from './vehicle-document/vehicle-insurance/vehicle-insurance.component';
import { VehicleRegistrationComponent } from './vehicle-document/vehicle-registration/vehicle-registration.component';
import { VehicleTypeComponent } from './vehicle-management/vehicle-type/vehicle-type.component';
import { RentalComponent } from './Rental Management/rental/rental.component';
import { VehicleAssignmentComponent } from './vehicle-management/vehicle-assignment/vehicle-assignment.component';
import { BrandCreateListComponent } from './vehicle-management/brand-create-list/brand-create-list.component';
import { ModelCreateListComponent } from './vehicle-management/model-create-list/model-create-list.component';
import { VehicleTypeListComponent } from './vehicle-management/vehicle-type-list/vehicle-type-list.component';
import { VehicleManagementSetupComponent } from './vehicle-management/vehicle-management-setup/vehicle-management-setup.component';
import { DriverDisciplinaryCreateComponent } from './driver-management/driver-disciplinary/driver-disciplinary-create/driver-disciplinary-create.component';
import { DriverDisciplinaryListComponent } from './driver-management/driver-disciplinary/driver-disciplinary-list/driver-disciplinary-list.component';
import { DriverInfoCreateComponent } from './driver-management/driver-info/driver-info-create/driver-info-create.component';
import { DriverInfoListComponent } from './driver-management/driver-info/driver-info-list/driver-info-list.component';
import { DiverListComponent } from './driver-management/diver/diver-list/diver-list.component';
import { RequisitionPassengersComponent } from './vehicle-requisition/requisition-passengers/requisition-passengers.component';
import { RequisitionLogisticsComponent } from './vehicle-requisition/requisition-logistics/requisition-logistics.component';
import { ApproveLogisticsComponent } from './vehicle-requisition/approve-logistics/approve-logistics.component';
import { ApprovePassengersComponent } from './vehicle-requisition/approve-passengers/approve-passengers.component';
import { DriverAssignCreateComponent } from './driver-management/driver-assign/driver-assign-create/driver-assign-create.component';
import { DriverAssignListComponent } from './driver-management/driver-assign/driver-assign-list/driver-assign-list.component';
import { TmsDashboardComponent } from './dashboard/tms-dashboard/tms-dashboard.component';
import { GoogleMapComponent } from './dashboard/google-map/google-map.component';
import { GMapModule } from 'primeng/gmap';
import { DriverLogBookListComponent } from './driver-management/driver-log-book/driver-log-book-list/driver-log-book-list.component';
import { DriverLogBookCreateComponent } from './driver-management/driver-log-book/driver-log-book-create/driver-log-book-create.component';
import { AccidentalManagementComponent } from './accidental-management/accidental-management.component';
import { AccidentTypeComponent } from './accidental-management/accident-type/accident-type.component';
import { AccidentTypeListComponent } from './accidental-management/accident-type-list/accident-type-list.component';
import { AccidentComponent } from './accidental-management/accident/accident.component';
import { AccidentListComponent } from './accidental-management/accident-list/accident-list.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { AccountListComponent } from './account-list/account-list.component';
// import { MultiSelectModule } from 'primeng/multiselect';
import { PendingPassengersComponent } from './vehicle-requisition/pending-passengers/pending-passengers.component';
import { PendingLogisticsComponent } from './vehicle-requisition/pending-logistics/pending-logistics.component'
import { AssignmentPassengersComponent } from './vehicle-requisition/assignment-passengers/assignment-passengers.component';
import { AssignmentLogisticsComponent } from './vehicle-requisition/assignment-logistics/assignment-logistics.component';
import { TripCompletedComponent } from './vehicle-requisition/trip-completed/trip-completed.component';
import { AssignComponent } from './vehicle-requisition/assign/assign.component';
import { TripCompletePassengersComponent } from './vehicle-requisition/trip-complete-passengers/trip-complete-passengers.component';
import { TripCompleteTransactionComponent } from './vehicle-requisition/trip-complete-transaction/trip-complete-transaction.component';
import { RequisitionPassengersViewComponent } from './vehicle-requisition/requisition-passengers-view/requisition-passengers-view.component';
import { RequisitionCancelComponent } from './vehicle-requisition/requisition-cancel/requisition-cancel.component';
import { SchedulerCalenderComponent } from './dashboard/scheduler-calender/scheduler-calender.component';
import { RouteCreateComponent } from './vehicle-management/route-create/route-create.component';
import { RouteCreateListComponent } from './vehicle-management/route-create-list/route-create-list.component';
import { RequisitionComponent } from './vehicle-requisition/requisition/requisition.component';
import { CostingFormComponent } from './challan-management/costing-form/costing-form.component';
import { ChallanformComponent } from './challan-management/challanform/challanform.component';
import { ImportChallanListComponent } from './challan-management/import-challan-list/import-challan-list.component';
import { ExportChallanListComponent } from './challan-management/export-challan-list/export-challan-list.component';
import { LocalChallanListComponent } from './challan-management/local-challan-list/local-challan-list.component';
import { ArrivalFormComponent } from './challan-management/arrival-form/arrival-form.component';
import { CostSubmitExportListComponent } from './challan-management/cost-submit-export-list/cost-submit-export-list.component';
import { CostSubmitImportListComponent } from './challan-management/cost-submit-import-list/cost-submit-import-list.component';
import { CostSubmitLocalListComponent } from './challan-management/cost-submit-local-list/cost-submit-local-list.component';
import { CostingFormImportComponent } from './challan-management/costing-form-import/costing-form-import.component';
import { AuditListComponent } from './challan-management/audit-list/audit-list.component';
import { BillReportComponent } from './challan-management/bill-report/bill-report.component';

@NgModule({
  declarations: [VehicleEntryComponent,
    BrandCreateComponent,
    ModelCreateComponent,
    VehicleRegistrationComponent,
    VehicleFitnessComponent,
    VehicleTaxTokenComponent,
    VehicleRoadPermitComponent,
    VehicleAitComponent,
    VehicleInsuranceComponent,
    VehicleTypeComponent,
    RentalComponent,
    VehicleAssignmentComponent,
    BrandCreateListComponent,
    ModelCreateListComponent,
    VehicleTypeListComponent,
    VehicleManagementSetupComponent,
    RequisitionComponent,
    TmsDashboardComponent,
    RequisitionPassengersComponent,
    RequisitionLogisticsComponent,
    ApproveLogisticsComponent,
    ApprovePassengersComponent,
    GoogleMapComponent,
    DiverListComponent,
    DriverAssignListComponent,
    DriverInfoListComponent,
    DriverInfoCreateComponent,
    DriverAssignCreateComponent,
    DriverDisciplinaryListComponent,
    DriverDisciplinaryCreateComponent,
    DriverLogBookCreateComponent,
    DriverLogBookListComponent,
    DriverInfoListComponent,
    DiverListComponent,
    DriverAssignCreateComponent,
    DriverAssignListComponent,
    AccidentalManagementComponent,
    AccidentTypeComponent,
    AccidentTypeListComponent,
    AccidentComponent,
    AccidentListComponent,
    AccountManagementComponent,
    AccountListComponent,
    PendingPassengersComponent,
    PendingLogisticsComponent,
    AssignmentPassengersComponent,
    AssignmentLogisticsComponent,
    TripCompletedComponent,
    AssignComponent,
    TripCompletePassengersComponent,
    TripCompleteTransactionComponent,
    RequisitionPassengersViewComponent,
    RequisitionCancelComponent,
    SchedulerCalenderComponent,
    RequisitionCancelComponent,
    RouteCreateComponent,
    RouteCreateListComponent,
    CostingFormComponent, //add
    ChallanformComponent, //add
    ImportChallanListComponent,
    ExportChallanListComponent,
    LocalChallanListComponent,
    ArrivalFormComponent,
    CostSubmitExportListComponent,
    CostSubmitImportListComponent,
    CostSubmitLocalListComponent,
    CostingFormImportComponent,
    AuditListComponent,
    BillReportComponent
  ],

  imports: [
    CommonModule,
    MerchandisingModule,
    TmsRoutingModule,
    GMapModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [VehicleManageService],
})
export class TmsModule { }
