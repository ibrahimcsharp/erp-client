import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DailyTokenProcessComponent } from "./component/daily-token-process/daily-token-process.component";
import { GenTokenFromGateComponent } from "./component/gen-token-from-gate/gen-token-from-gate.component";
import { DailyMealCostListComponent } from "./component/meal-cost/daily-meal-cost-list/daily-meal-cost-list.component";
import { MealItemCategoryListComponent } from "./component/meal-cost/meal-item-category-list/meal-item-category-list.component";
import { MealItemListComponent } from "./component/meal-cost/meal-item-list/meal-item-list.component";
import { MonthlyMealCostListComponent } from "./component/meal-cost/monthly-meal-cost-list/monthly-meal-cost-list.component";
import { MonthlyMealCostComponent } from "./component/meal-cost/monthly-meal-cost/monthly-meal-cost.component";
import { MealCostReportComponent } from "./component/meal-cost/report/meal-cost-report/meal-cost-report.component";
import { MealOptionsListComponent } from "./component/meal-options/meal-options-list/meal-options-list.component";
import { MealReceiverListComponent } from "./component/meal-receiver/meal-receiver-list/meal-receiver-list.component";
import { MealReceiverSetupComponent } from "./component/meal-receiver/meal-receiver-setup/meal-receiver-setup.component";
import { MyMealDashboardComponent } from "./component/my-meal-dashboard/my-meal-dashboard.component";
import { EmployeeWiseMealCostReportComponent } from "./component/report/employee-wise-meal-cost-report/employee-wise-meal-cost-report.component";
import { MonthWiseMealCostReportComponent } from "./component/report/month-wise-meal-cost-report/month-wise-meal-cost-report.component";
import { MySnackDashboardComponent } from "./snacks/component/dashboard/my-snack-dashboard/my-snack-dashboard.component";
import { SnackIndStatementPayableComponent } from "./snacks/component/report/snack-ind-statement-payable/snack-ind-statement-payable.component";
import { SnackIndStatementComponent } from "./snacks/component/report/snack-ind-statement/snack-ind-statement.component";
import { SnackMealStatementComponent } from "./snacks/component/report/snack-meal-statement/snack-meal-statement.component";
import { SnacksMonthSummaryComponent } from "./snacks/component/report/snacks-month-summary/snacks-month-summary.component";
import { ReadySnackItemListComponent } from "./snacks/component/settings/ready-snack-item-list/ready-snack-item-list.component";
import { SnackCurrentStockComponent } from "./snacks/component/settings/snack-current-stock/snack-current-stock.component";
import { SnacksItemCategoryListComponent } from "./snacks/component/settings/snacks-item-category-list/snacks-item-category-list.component";
import { SnacksItemListComponent } from "./snacks/component/settings/snacks-item-list/snacks-item-list.component";
import { SnacksDeliveryComponent } from "./snacks/component/snacks-dinning-manage/snacks-delivery/snacks-delivery.component";
import { SnacksManualSaleComponent } from "./snacks/component/snacks-dinning-manage/snacks-manual-sale/snacks-manual-sale.component";
import { MealReceiverDeactivatedListComponent } from "./component/meal-receiver-deactivated-list/meal-receiver-deactivated-list.component";
import { MealReciverInactivedComponent } from "./component/meal-reciver-inactived/meal-reciver-inactived.component";
import { MonthlyMealCostSummaryComponent } from "./component/report/monthly-meal-cost-summary/monthly-meal-cost-summary.component";
import { EmployeeMonthlyMealCostSummaryComponent } from "./component/report/employee-monthly-meal-cost-summary/employee-monthly-meal-cost-summary.component";
import { AllEmployeeMonthlyMealCostSummaryComponent } from "./component/report/all-employee-monthly-meal-cost-summary/all-employee-monthly-meal-cost-summary.component";
import { AllEmployeeSyncComponent } from "./component/all-employee-sync/all-employee-sync.component";
import { AdminDashboardComponent } from "./component/admin-dashboard/admin-dashboard.component";
import { SnacksSummaryReportComponent } from "./snacks/component/report/snacks-summary-report/snacks-summary-report.component";
import { MealCostSummaryReportComponent } from "./component/report/meal-cost-summary-report/meal-cost-summary-report.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "meal-receiver",
        component: MealReceiverSetupComponent,
        data: {
          breadcrumb: "meal-receiver",
        },
      },
      {
        path: "meal-receiver-list",
        component: MealReceiverListComponent,
        data: {
          breadcrumb: "meal-receiver-list",
        },
      },
      {
        path: "meal-cost-setup",
        component: MonthlyMealCostComponent,
        data: {
          breadcrumb: "meal-cost-setup",
        },
      },
      {
        path: "meal-cost-list",
        component: MonthlyMealCostListComponent,
        data: {
          breadcrumb: "meal-cost-list",
        },
      },
      {
        path: "daily-meal-cost-list",
        component: DailyMealCostListComponent,
        data: {
          breadcrumb: "daily-meal-cost-list",
        },
      },
      {
        path: "my-meal-dashboard",
        component: MyMealDashboardComponent,
        data: {
          breadcrumb: "my-meal-dashboard",
        },
      },
      {
        path: "token-gen-from-date",
        component: GenTokenFromGateComponent,
        data: {
          breadcrumb: "token-gen-from-date",
        },
      },
      {
        path: "meal-item-category",
        component: MealItemCategoryListComponent,
        data: {
          breadcrumb: "meal-item-category",
        },
      },
      {
        path: "meal-item",
        component: MealItemListComponent,
        data: {
          breadcrumb: "meal-item",
        },
      },
      {
        path: "admin-dashboard",
        component: AdminDashboardComponent,
        data: {
          breadcrumb: "admin-dashboard",
        },
      },
      {
        path: "daily-token-gen",
        component: DailyTokenProcessComponent,
        data: {
          breadcrumb: "daily-token-gen",
        },
      },
      {
        path: "meal-cost-report",
        component: MealCostReportComponent,
        data: {
          breadcrumb: "meal-cost-report",
        },
      },
      {
        path: "meal-cost-summary-report",
        component: MealCostSummaryReportComponent,
        data: {
          breadcrumb: "meal-cost-summary-report",
        },
      },
      {
        path: "meal-options",
        component: MealOptionsListComponent,
        data: {
          breadcrumb: "meal-options",
        },
      },
      {
        path: "meal-monthly-summary",
        component: MonthWiseMealCostReportComponent,
        data: {
          breadcrumb: "meal-monthly-summary",
        },
      },
      {
        path: "meal-employee-dtl",
        component: EmployeeWiseMealCostReportComponent,
        data: {
          breadcrumb: "meal-employee-dtl",
        },
      },

      {
        path: "snacks-categories",
        component: SnacksItemCategoryListComponent,
        data: {
          breadcrumb: "snacks-categories",
        },
      },
      {
        path: "snacks-items",
        component: SnacksItemListComponent,
        data: {
          breadcrumb: "snacks-items",
        },
      },
      {
        path: "snacks-ready-items",
        component: ReadySnackItemListComponent,
        data: {
          breadcrumb: "snacks-ready-items",
        },
      },
      {
        path: "snacks-current-stock",
        component: SnackCurrentStockComponent,
        data: {
          breadcrumb: "snacks-current-stock",
        },
      },
      {
        path: "my-snacks-dashboard",
        component: MySnackDashboardComponent,
        data: {
          breadcrumb: "my-snacks-dashboard",
        },
      },      
      {
        path: "snacks-delivery",
        component: SnacksDeliveryComponent,
        data: {
          breadcrumb: "snacks-delivery",
        },
      },      
      {
        path: "snacks-ind-statment",
        component: SnackIndStatementComponent,
        data: {
          breadcrumb: "snacks-ind-statment",
        },
      },      
      {
        path: "snacks-ind-statment-payable",
        component: SnackIndStatementPayableComponent,
        data: {
          breadcrumb: "snacks-ind-statment-payable",
        },
      },      
      {
        path: "snacks-meal-ind-statment-payable",
        component: SnackMealStatementComponent,
        data: {
          breadcrumb: "snacks-meal-ind-statment-payable",
        },
      },      
      {
        path: "snacks-month-summary",
        component: SnacksMonthSummaryComponent,
        data: {
          breadcrumb: "snacks-month-summary",
        },
      },      
      {
        path: "snacks-summary-report",
        component: SnacksSummaryReportComponent,
        data: {
          breadcrumb: "snacks-summary-report",
        },
      },      
      {
        path: "snacks-manual-sale",
        component: SnacksManualSaleComponent,
        data: {
          breadcrumb: "snacks-manual-sale",
        },
      },
      
      {
        path: "meal-reciver-inactived",
        component: MealReciverInactivedComponent,
        data: {
          breadcrumb: "meal-reciver-inactived",
        },
      },   

      {
        path: "meal-receiver-deactivated-list",
        component: MealReceiverDeactivatedListComponent,
        data: {
          breadcrumb: "meal-receiver-deactivated-list",
        },
      }, 

      

      {
        path: "monthly-meal-cost-summary",
        component: MonthlyMealCostSummaryComponent,
        data: {
          breadcrumb: "monthly-meal-cost-summary",
        },
      }, 

      {
        path: "employee-monthly-meal-cost-summary",
        component: EmployeeMonthlyMealCostSummaryComponent,
        data: {
          breadcrumb: "employee-monthly-meal-cost-summary",
        },
      }, 


      {
        path: "all-employee-sync",
        component: AllEmployeeSyncComponent,
        data: {
          breadcrumb: "ell-employee-sync",
        },
      }, 


      
      {
        path: "all-employee-monthly-meal-cost-summary",
        component: AllEmployeeMonthlyMealCostSummaryComponent,
        data: {
          breadcrumb: "all-employee-monthly-meal-cost-summary",
        },
      },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MmsRoutingModule {}
