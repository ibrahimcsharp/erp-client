import { NgModule } from "@angular/core";
import { ModalModule } from "ngx-bootstrap/modal";

import { GalleriaModule } from "primeng/galleria";
import { MerchandisingModule } from "../merchandising/merchandising.module";
import { DailyTokenProcessComponent } from "./component/daily-token-process/daily-token-process.component";
import { GenTokenFromGateComponent } from "./component/gen-token-from-gate/gen-token-from-gate.component";
import { DailyMealCostListComponent } from "./component/meal-cost/daily-meal-cost-list/daily-meal-cost-list.component";
import { DailyMealCostComponent } from "./component/meal-cost/daily-meal-cost/daily-meal-cost.component";
import { MealItemCategoryListComponent } from "./component/meal-cost/meal-item-category-list/meal-item-category-list.component";
import { MealItemCategoryComponent } from "./component/meal-cost/meal-item-category/meal-item-category.component";
import { MealItemListComponent } from "./component/meal-cost/meal-item-list/meal-item-list.component";
import { MealItemComponent } from "./component/meal-cost/meal-item/meal-item.component";
import { MonthlyMealCostListComponent } from "./component/meal-cost/monthly-meal-cost-list/monthly-meal-cost-list.component";
import { MonthlyMealCostComponent } from "./component/meal-cost/monthly-meal-cost/monthly-meal-cost.component";
import { MealCostReportComponent } from "./component/meal-cost/report/meal-cost-report/meal-cost-report.component";
import { MealOptionPostComponent } from "./component/meal-options/meal-option-post/meal-option-post.component";
import { MealOptionsListComponent } from "./component/meal-options/meal-options-list/meal-options-list.component";
import { MealReceiverListComponent } from "./component/meal-receiver/meal-receiver-list/meal-receiver-list.component";
import { MealReceiverSetupComponent } from "./component/meal-receiver/meal-receiver-setup/meal-receiver-setup.component";
import { MyMealDashboardComponent } from "./component/my-meal-dashboard/my-meal-dashboard.component";
import { MyMealComponent } from "./component/my-meal/my-meal.component";
import { EmployeeWiseMealCostReportComponent } from "./component/report/employee-wise-meal-cost-report/employee-wise-meal-cost-report.component";
import { MonthWiseMealCostReportComponent } from "./component/report/month-wise-meal-cost-report/month-wise-meal-cost-report.component";
import { MmsRoutingModule } from "./mms-routing.module";
import { MySnackDashboardComponent } from "./snacks/component/dashboard/my-snack-dashboard/my-snack-dashboard.component";
import { AvailableSnacksItemsComponent } from "./snacks/component/order/available-snacks-items/available-snacks-items.component";
import { SnacksCartManualComponent } from "./snacks/component/order/snacks-cart-manual/snacks-cart-manual.component";
import { SnacksOrderDetailsComponent } from "./snacks/component/order/snacks-order-details/snacks-order-details.component";
import { SnacksOrderHistoryComponent } from "./snacks/component/order/snacks-order-history/snacks-order-history.component";
import { SnacksReceivedHistoryComponent } from "./snacks/component/order/snacks-received-history/snacks-received-history.component";
import { SnaksCartItemsComponent } from "./snacks/component/order/snaks-cart-items/snaks-cart-items.component";
import { SnackIndStatementPayableComponent } from "./snacks/component/report/snack-ind-statement-payable/snack-ind-statement-payable.component";
import { SnackIndStatementComponent } from "./snacks/component/report/snack-ind-statement/snack-ind-statement.component";
import { SnackMealStatementComponent } from "./snacks/component/report/snack-meal-statement/snack-meal-statement.component";
import { SnacksMonthSummaryComponent } from "./snacks/component/report/snacks-month-summary/snacks-month-summary.component";
import { ReadySnackItemListComponent } from "./snacks/component/settings/ready-snack-item-list/ready-snack-item-list.component";
import { ReadySnackItemComponent } from "./snacks/component/settings/ready-snack-item/ready-snack-item.component";
import { SnackCurrentStockComponent } from "./snacks/component/settings/snack-current-stock/snack-current-stock.component";
import { SnackDamageDeclareComponent } from "./snacks/component/settings/snack-damage-declare/snack-damage-declare.component";
import { SnackDamageListComponent } from "./snacks/component/settings/snack-damage-list/snack-damage-list.component";
import { SnacksItemCategoryListComponent } from "./snacks/component/settings/snacks-item-category-list/snacks-item-category-list.component";
import { SnacksItemCategoryComponent } from "./snacks/component/settings/snacks-item-category/snacks-item-category.component";
import { SnacksItemListComponent } from "./snacks/component/settings/snacks-item-list/snacks-item-list.component";
import { SnacksItemComponent } from "./snacks/component/settings/snacks-item/snacks-item.component";
import { SnacksDeliveryComponent } from "./snacks/component/snacks-dinning-manage/snacks-delivery/snacks-delivery.component";
import { SnacksManualSaleComponent } from "./snacks/component/snacks-dinning-manage/snacks-manual-sale/snacks-manual-sale.component";
import { MealReceiverDeactivatedListComponent } from './component/meal-receiver-deactivated-list/meal-receiver-deactivated-list.component';
import { MealReciverInactivedComponent } from "./component/meal-reciver-inactived/meal-reciver-inactived.component";
import { MonthlyMealCostSummaryComponent } from './component/report/monthly-meal-cost-summary/monthly-meal-cost-summary.component';
import { EmployeeMonthlyMealCostSummaryComponent } from './component/report/employee-monthly-meal-cost-summary/employee-monthly-meal-cost-summary.component';
import { AllEmployeeMonthlyMealCostSummaryComponent } from './component/report/all-employee-monthly-meal-cost-summary/all-employee-monthly-meal-cost-summary.component';
import { AllEmployeeSyncComponent } from './component/all-employee-sync/all-employee-sync.component';
import { AdminDashboardComponent } from "./component/admin-dashboard/admin-dashboard.component";
import { SnacksSummaryReportComponent } from "./snacks/component/report/snacks-summary-report/snacks-summary-report.component";
import { MealCostSummaryReportComponent } from "./component/report/meal-cost-summary-report/meal-cost-summary-report.component";

@NgModule({
  imports: [
    ModalModule.forRoot(),
    MmsRoutingModule,
    MerchandisingModule,
    GalleriaModule,
  ],
  declarations: [
    MealReceiverSetupComponent,
    MealReceiverListComponent,
    MonthlyMealCostComponent,
    MonthlyMealCostListComponent,
    MyMealComponent,
    MyMealDashboardComponent,
    DailyMealCostComponent,
    DailyMealCostListComponent,
    GenTokenFromGateComponent,
    MealItemCategoryComponent,
    MealItemComponent,
    MealItemCategoryListComponent,
    MealItemListComponent,
    DailyTokenProcessComponent,
    MealCostReportComponent,
    MealCostSummaryReportComponent,
    MealOptionPostComponent,
    MealOptionsListComponent,
    MonthWiseMealCostReportComponent,
    EmployeeWiseMealCostReportComponent,
    SnacksItemCategoryComponent,
    SnacksItemCategoryListComponent,
    SnacksItemComponent,
    SnacksItemListComponent,
    ReadySnackItemComponent,
    ReadySnackItemListComponent,
    SnackCurrentStockComponent,
    AvailableSnacksItemsComponent,
    SnaksCartItemsComponent,
    MySnackDashboardComponent,
    SnacksOrderHistoryComponent,
    SnacksOrderDetailsComponent,
    SnacksDeliveryComponent,
    SnacksManualSaleComponent,
    SnacksReceivedHistoryComponent,
    SnackIndStatementComponent,
    SnackIndStatementPayableComponent,
    SnackMealStatementComponent,
    SnacksMonthSummaryComponent,
    SnacksSummaryReportComponent,
    SnacksCartManualComponent,
    SnackDamageDeclareComponent,
    SnackDamageListComponent,
    MealReceiverListComponent,
    MealReciverInactivedComponent,
    MealReceiverDeactivatedListComponent,
    MonthlyMealCostSummaryComponent,
    EmployeeMonthlyMealCostSummaryComponent,
    AllEmployeeMonthlyMealCostSummaryComponent,
    AllEmployeeSyncComponent,
    AdminDashboardComponent,

  ],
  entryComponents: [
    MealItemCategoryComponent,
    MealItemComponent,
    DailyMealCostComponent,
    MonthlyMealCostComponent,
    MealOptionPostComponent,
    SnacksItemCategoryComponent,
    SnacksItemComponent,
    ReadySnackItemComponent,
    SnacksOrderDetailsComponent,
    SnackDamageDeclareComponent,
    SnackDamageListComponent

  ],
})
export class MmsModule {}
