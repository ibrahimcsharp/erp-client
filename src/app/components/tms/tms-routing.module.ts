import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiverListComponent } from './driver-management/diver/diver-list/diver-list.component';
import { TmsDashboardComponent } from './dashboard/tms-dashboard/tms-dashboard.component';
import { VehicleAitComponent } from './vehicle-document/vehicle-ait/vehicle-ait.component';
import { VehicleFitnessComponent } from './vehicle-document/vehicle-fitness/vehicle-fitness.component';
import { VehicleInsuranceComponent } from './vehicle-document/vehicle-insurance/vehicle-insurance.component';
import { VehicleRegistrationComponent } from './vehicle-document/vehicle-registration/vehicle-registration.component';
import { VehicleRoadPermitComponent } from './vehicle-document/vehicle-road-permit/vehicle-road-permit.component';
import { VehicleTaxTokenComponent } from './vehicle-document/vehicle-tax-token/vehicle-tax-token.component';
import { BrandCreateListComponent } from './vehicle-management/brand-create-list/brand-create-list.component';
import { ModelCreateListComponent } from './vehicle-management/model-create-list/model-create-list.component';
import { VehicleAssignmentComponent } from './vehicle-management/vehicle-assignment/vehicle-assignment.component';
import { VehicleEntryComponent } from './vehicle-management/vehicle-entry/vehicle-entry.component';
import { VehicleManagementSetupComponent } from './vehicle-management/vehicle-management-setup/vehicle-management-setup.component';
import { VehicleTypeListComponent } from './vehicle-management/vehicle-type-list/vehicle-type-list.component';
import { RequisitionComponent } from './vehicle-requisition/requisition/requisition.component';
import { DriverAssignListComponent } from './driver-management/driver-assign/driver-assign-list/driver-assign-list.component';
import { DriverLogBookListComponent } from './driver-management/driver-log-book/driver-log-book-list/driver-log-book-list.component';
import { AccidentTypeListComponent } from './accidental-management/accident-type-list/accident-type-list.component';
import { AccidentListComponent } from './accidental-management/accident-list/accident-list.component';
import { AccountListComponent } from './account-list/account-list.component';
import { TripCompletedComponent } from './vehicle-requisition/trip-completed/trip-completed.component';
import { PendingPassengersComponent } from './vehicle-requisition/pending-passengers/pending-passengers.component';
import { ApprovePassengersComponent } from './vehicle-requisition/approve-passengers/approve-passengers.component';
import { AssignmentPassengersComponent } from './vehicle-requisition/assignment-passengers/assignment-passengers.component';
import { CostingFormComponent } from './challan-management/costing-form/costing-form.component';
import { ChallanformComponent } from './challan-management/challanform/challanform.component';
import { LocalChallanListComponent } from './challan-management/local-challan-list/local-challan-list.component';
import { ImportChallanListComponent } from './challan-management/import-challan-list/import-challan-list.component';
import { ArrivalFormComponent } from './challan-management/arrival-form/arrival-form.component';
import { ExportChallanListComponent } from './challan-management/export-challan-list/export-challan-list.component';
import { CostSubmitExportListComponent } from './challan-management/cost-submit-export-list/cost-submit-export-list.component';
import { CostSubmitImportListComponent } from './challan-management/cost-submit-import-list/cost-submit-import-list.component';
import { CostSubmitLocalListComponent } from './challan-management/cost-submit-local-list/cost-submit-local-list.component';
import { CostingFormImportComponent } from './challan-management/costing-form-import/costing-form-import.component';
import { AuditListComponent } from './challan-management/audit-list/audit-list.component';
import { BillReportComponent } from './challan-management/bill-report/bill-report.component';


const routes: Routes = [
  {
    path: "tms-dashdoard",
    component: TmsDashboardComponent,
    data: {
      title: "Dashboard",
      breadcrumb: "tms-dashdoard",
    },
  },
  {
    path: "vehicle-setup",
    component: VehicleManagementSetupComponent,
    data: {
      title: "Vehicle Setup",
      breadcrumb: "vehicle-setup",
    },
  },
  {
    path: "vehicle-create",
    component: VehicleEntryComponent,
    data: {
      title: "Vehicle Create",
      breadcrumb: "vehicle-create",
    },
  },
  {
    path: "brand-create",
    component: BrandCreateListComponent,
    data: {
      title: "Brand Create",
      breadcrumb: "brand-create",
    },
  },
  {
    path: "model-create",
    component: ModelCreateListComponent,
    data: {
      title: "Model Create",
      breadcrumb: "model-create",
    },
  },
  {
    path: "vehicle-type-create",
    component: VehicleTypeListComponent,
    data: {
      title: "Vehicle Type Create",
      breadcrumb: "vehicle-type-create",
    },
  },
  {
    path: "vehicle-ait",
    component: VehicleAitComponent,
    data: {
      title: "Vehicle AIT",
      breadcrumb: "vehicle-ait",
    },
  },
  {
    path: "vehicle-fitness",
    component: VehicleFitnessComponent,
    data: {
      title: "Vehicle Fitness",
      breadcrumb: "vehicle-fitness",
    },
  },
  {
    path: "vehicle-insurance",
    component: VehicleInsuranceComponent,
    data: {
      title: "Vehicle Insurance",
      breadcrumb: "vehicle-insurance",
    },
  },
  {
    path: "vehicle-registration",
    component: VehicleRegistrationComponent,
    data: {
      title: "Vehicle Registration",
      breadcrumb: "vehicle-registration",
    },
  },
  {
    path: "vehicle-tax-token",
    component: VehicleTaxTokenComponent,
    data: {
      title: "Vehicle Tax Token",
      breadcrumb: "vehicle-tax-token",
    },
  },
  {
    path: "vehicle-road-permit",
    component: VehicleRoadPermitComponent,
    data: {
      title: "Vehicle Road Permit",
      breadcrumb: "vehicle-road-permit",
    },
  },
  {
    path: "vehicle-assignment",
    component: VehicleAssignmentComponent,
    data: {
      title: "Vehicle Assignment",
      breadcrumb: "vehicle-assignment",
    },
  },
  {
    path: "requisition",
    component: RequisitionComponent,
    data: {
      title: "Vehicle Requisition",
      breadcrumb: "requisition",
    },
  },
  {
    path: "pending-passengers",
    component: PendingPassengersComponent,
    data: {
      title: "Vehicle Pending",
      breadcrumb: "pending-passengers",
    },
  },
  {
    path: "assignment-passengers",
    component: AssignmentPassengersComponent,
    data: {
      title: "Vehicle Assignment",
      breadcrumb: "assignment-passengers",
    },
  },
  {
    path: "trip-completed",
    component: TripCompletedComponent,
    data: {
      title: "Trip Completed",
      breadcrumb: "requisition",
    },
  },
  {
    path: "approve-passengers",
    component: ApprovePassengersComponent,
    data: {
      title: "Vehicle Approve",
      breadcrumb: "approve-passengers",
    },
  },
  {
    path: "Driver",
    component: DiverListComponent,
    data: {
      title: "Driver Setup",
      breadcrumb: "Driver",
    },
  },

  {
    path: "driver-assign",
    component: DriverAssignListComponent,
    data: {
      title: "Driver Assign",
      breadcrumb: "driver-assign",
    },
  },
  {
    path: "driver-log-book",
    component: DriverLogBookListComponent,
    data: {
      title: "Driver Log Book",
      breadcrumb: "driver-log-book",
    },
  },
  {
    path: "accident",
    component: AccidentListComponent,
    data: {
      title: "Accident",
      breadcrumb: "accident-expense",
    },
  },
  {
    path: "accident-type",
    component: AccidentTypeListComponent,
    data: {
      title: "Accident Type",
      breadcrumb: "accident-type",
    },
  },
  {
    path: "account-management",
    component: AccountListComponent,
    data: {
      title: "Account Management",
      breadcrumb: "account-management",
    },
  },
  {
    path: "challan-form",
    children: [
      { path: "", component: ChallanformComponent },
      { path: ":id", component: ChallanformComponent },
    ],
    data: {
      title: "Challan Form",
      breadcrumb: "challan-form",
    },
  },
  {
    path: "costing-form",
    children: [
      { path: "", component: CostingFormComponent },
      { path: ":id", component: CostingFormComponent },
    ],
    data: {
      title: "Export Costing Challan",
      breadcrumb: "costing-form",
    },
  },
  {
    path: "costing-form-import",
    children: [
      { path: "", component: CostingFormImportComponent },
      { path: ":id", component: CostingFormImportComponent },
    ],
    data: {
      title: "Import Costing Challan",
      breadcrumb: "costing-form",
    },
  },
  {
    path: "import-challan-list",
    children: [
      { path: "", component: ImportChallanListComponent },
    ],
    data: {
      title: "Import Challan",
      breadcrumb: "costing-form",

    },
  },
  {
    path: "export-challan-list",
    children: [
      { path: "", component: ExportChallanListComponent },
    ],
    data: {
      title: "Export Challan",
      breadcrumb: "costing-form",
    },
  },
  {
    path: "local-challan-list",
    component: LocalChallanListComponent,
    children: [
      { path: "", component: LocalChallanListComponent },
    ],
    data: {
      title: "Local Challan",
      breadcrumb: "costing-form",
    },
  },
  {
    path: "arrival-form",
    children: [
      { path: "", component: ArrivalFormComponent },
      { path: ":id", component: ArrivalFormComponent },
    ],
    data: {
      title: "Arrival Form",
      breadcrumb: "arrival-form",
    },
  },
  {
    path: "cost-submit-export-list",
    component: CostSubmitExportListComponent,
    data: {
      title: "Cost Submit Export",
      breadcrumb: "cost-submit-export-list",
    },
  },
  {
    path: "cost-submit-import-list",
    component: CostSubmitImportListComponent,
    data: {
      title: "Cost Submit Import",
      breadcrumb: "cost-submit-import-list",
    },
  },
  {
    path: "cost-submit-local-list",
    component: CostSubmitLocalListComponent,
    data: {
      title: "Cost Submit Local",
      breadcrumb: "cost-submit-local-list",
    },
  },
  {
    path: "audit-list",
    component: AuditListComponent,
    data: {
      title: "Audit List",
      breadcrumb: "audit-list",
    },
  },
  {
    path: "bill-report",
    component: BillReportComponent,
    data: {
      title: "Bill Report",
      breadcrumb: "bill-report",
    },
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TmsRoutingModule { }
