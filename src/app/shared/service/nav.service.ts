import { HostListener, Inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { WINDOW } from "./windows.service";
// Menu
export interface Menu {
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  pendingTask?: number;
  children?: Menu[];
}

@Injectable({
  providedIn: "root",
})
export class NavService {
  constructor(@Inject(WINDOW) private window) {
    this.onResize();
    if (this.screenWidth < 991) {
      this.collapseSidebar = true;
    }
  }
  public screenWidth: any;
  public collapseSidebar = false;

  MENUITEMS: Menu[] = [
    {
      path: "/dashboard/default",
      title: "Dashboard",
      icon: "home",
      type: "link",
      badgeType: "primary",
      active: false,
    },
    {
      path: "/dashboard/newsfeed",
      title: "News Feed",
      // icon: "home",
      // type: "link",
      // badgeType: "primary",
      active: false,
    },
    // {
    //   title: "MMS",
    //   icon: "align-left",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     {
    //       title: "Setting",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         {
    //           path: "/mms/meal-item-category",
    //           title: "Meal Item Category",
    //           type: "link",
    //         },
    //         {
    //           path: "/mms/meal-item",
    //           title: "Meal Item",
    //           type: "link",
    //         },
    //       ],
    //     },
    //     {
    //       title: "Meal Manage",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         {
    //           path: "/mms/meal-receiver",
    //           title: "Meal Receiver",
    //           type: "link",
    //         },
    //         {
    //           path: "/mms/meal-receiver-list",
    //           title: "Meal Receiver List",
    //           type: "link",
    //         },
    //         {
    //           path: "/mms/token-gen-from-date",
    //           title: "Token Manage(Gate)",
    //           type: "link",
    //         },
    //         {
    //           path: "/mms/daily-token-gen",
    //           title: "Daily Token Gen.",
    //           type: "link",
    //         },
    //       ],
    //     },
    //     {
    //       title: "Dinning Manage",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         {
    //           path: "/mms/meal-cost-list",
    //           title: "Monthly Meal Cost",
    //           type: "link",
    //         },
    //         {
    //           path: "/mms/daily-meal-cost-list",
    //           title: "Daily Meal Cost",
    //           type: "link",
    //         },
    //         {
    //           path: "/mms/meal-cost-report",
    //           title: "Meal Cost Report",
    //           type: "link",
    //         },
    //         {
    //           path: "/mms/meal-options",
    //           title: "Meal Options",
    //           type: "link",
    //         },
    //       ],
    //     },

    //     {
    //       path: "/mms/my-meal-dashboard",
    //       title: "My Meal Dashboard",
    //       type: "link",
    //     },
    //   ],
    // },

    // {
    //   title: "Accounting",
    //   icon: "align-left",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     { path: "/accounting/product", title: "Product", type: "link" },
    //   ],
    // },
    // {
    //   title: "Lookup",
    //   icon: "align-left",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     {
    //       title: "hrm",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         { path: "/lookup/hrm/unit", title: "Unit", type: "link" },
    //         {
    //           path: "/lookup/hrm/department",
    //           title: "Department",
    //           type: "link",
    //         },
    //         { path: "/lookup/hrm/section", title: "Section", type: "link" },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: "Merchandising",
    //   icon: "align-left",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     {
    //       title: "Setting",
    //       type: "sub",

    //       active: false,
    //       children: [
    //         {
    //           path: "/merchandising/sample-type",
    //           title: "Sample Type",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/company-list",
    //           title: "Company List",
    //           type: "link",
    //         },
    //         { path: "/merchandising/season", title: "Season", type: "link" },
    //         { path: "/merchandising/brand", title: "Brand", type: "link" },
    //         {
    //           path: "/merchandising/finishgoodsitem",
    //           title: "FG Item",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/shippedtype",
    //           title: "Shipped Type",
    //           type: "link",
    //         },

    //         {
    //           path: "/merchandising/landingport",
    //           title: "Landing Port",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/regions",
    //           title: "Region",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/deliveryplace",
    //           title: "Delivery Place",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/fabric-basic-name-list",
    //           title: "Fabric Basic Name",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/fabric-mill-name-list",
    //           title: "mill-list",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/unit-type-list",
    //           title: "Unit-Type",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/basic-type-list",
    //           title: "basic-Type",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/refference-list",
    //           title: "refference-list",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/buyer-list",
    //           title: "Buyer List",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/buyer-department-list",
    //           title: "Buyer Department List",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/buyer-size-set-list",
    //           title: "Buyer Size Range Info",
    //           type: "link",
    //         },

    //         {
    //           path: "/merchandising/item-list",
    //           title: "Item List",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/supplier",
    //           title: "supplier",
    //           type: "link",
    //         },
    //       ],
    //     },
    //     {
    //       title: "Style Declaration",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         {
    //           path: "/merchandising/style-list",
    //           title: "Style Declaration",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/confirm-style-create",
    //           title: "Confirm Style Declaration",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/confirm-style-info-list",
    //           title: "Confirm Style List",
    //           type: "link",
    //         },
    //       ],
    //     },
    //     {
    //       title: "Sample Requisition",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         {
    //           path: "/merchandising/sampledevelopment",
    //           title: "Requisition",
    //           type: "link",
    //         },
    //         // { path: '/merchandising/activitysamdev', title: 'Activity Sample Dev', type: 'link' },
    //         {
    //           path: "/merchandising/samdevalllist",
    //           title: "Requisition List",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/samdevcommonlist",
    //           title: "Requisition Common List",
    //           type: "link",
    //         },
    //       ],
    //     },
    //     {
    //       title: "IE",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         {
    //           path: "/merchandising/ie-costing-list",
    //           title: "IE",
    //           type: "link",
    //         },
    //       ],
    //     },
    //     {
    //       title: "Consumption",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         {
    //           path: "/merchandising/cad-costing-list",
    //           title: "Consumption",
    //           type: "link",
    //         },
    //       ],
    //     },
    //     {
    //       title: "Purchase Order",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         // {
    //         //   path: "/merchandising/style-list",
    //         //   title: "Style Declaration",
    //         //   type: "link",
    //         // },
    //         {
    //           path: "/merchandising/purchase-order-create",
    //           title: "PO create",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/purchase-order-List",
    //           title: "PO Summary List",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/purchase-order-detail-list",
    //           title: "PO Detail List",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/poupload",
    //           title: "PO Upload",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/po-list",
    //           title: "PO Uploaded List",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/po-revised-list",
    //           title: "PO Revised List",
    //           type: "link",
    //         },
    //         // {
    //         //   path: "/merchandising/order-summery-for-production",
    //         //   title: "Order Summary Production List",
    //         //   type: "link",
    //         // },
    //       ],
    //     },
    //     {
    //       title: "Fabric Library",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         {
    //           path: "/merchandising/fabric-library-list",
    //           title: "Fabric-Library",
    //           type: "link",
    //         },
    //       ],
    //     },
    //     {
    //       title: "Sales Contract",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         {
    //           path: "/merchandising/dkt-contract-create",
    //           title: "contract (DEC)",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/dkt-contract-list",
    //           title: "Contract-List (DEC)",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/sales-contract-create",
    //           title: "contract",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/sales-contract-list",
    //           title: "Contract-List",
    //           type: "link",
    //         },
    //       ],
    //     },
    //     {
    //       title: "Costing",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         {
    //           path: "/merchandising/costing-create",
    //           title: "Open Costing",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/costing-list",
    //           title: "Open Costing List",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/pre-costing-create",
    //           title: "Pre Costing",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/supply-chain-costing-list",
    //           title: "Supply Chain Costing",
    //           type: "link",
    //         },
    //         // {
    //         //   path: "/merchandising/costing-accessories-list",
    //         //   title: "Cost Accessories List",
    //         //   type: "link",
    //         // },

    //         // {
    //         //   path: "/merchandising/costing-master-create",
    //         //   title: "Costing Master Create",
    //         //   type: "link",
    //         // },
    //       ],
    //     },

    //     {
    //       title: "BOM",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         {
    //           path: "/merchandising/bom-entry",
    //           title: "BOM Entry",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/bom-entry-manual",
    //           title: "BOM Manual Entry",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/bom-approval-file",
    //           title: "File Upload",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/bom-list",
    //           title: "Style Wise BOM List",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/bom-list-view",
    //           title: "Bom List",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/bom-list-buyerwise",
    //           title: "Buyer Wise BOM List",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/bom-list-factory",
    //           title: "BOM List Factory",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/bom-reconciliation",
    //           title: "BOM Reconciliation",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/order-reconciliation",
    //           title: "Order Reconciliation",
    //           type: "link",
    //         },
    //       ],
    //     },

    //     {
    //       title: "Central Production",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         // {
    //         //   path: "/merchandising/cad-costing-create",
    //         //   title: "Consumption Create",
    //         //   type: "link",
    //         // },
    //         {
    //           path: "/merchandising/central-production-dashboard",
    //           title: "Central Production",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/order-summery-for-production",
    //           title: "Order Follow Up",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/monthly-order-follow-up",
    //           title: "Monthly Order Follow Up",
    //           type: "link",
    //         },
    //       ],
    //     },
    //     // {
    //     //   title: "Fabric Library",

    //     //   type: "sub",
    //     //   active: false,
    //     //   children: [
    //     //     {
    //     //       title: "Setting",
    //     //       type: "sub",
    //     //       active: false,
    //     //       children: [
    //     //         {
    //     //           path: "/merchandising/fabric-basic-name-list",
    //     //           title: "Fabric Basic Name",
    //     //           type: "link",
    //     //         },
    //     //         {
    //     //           path: "/merchandising/fabric-mill-name-list",
    //     //           title: "mill-list",
    //     //           type: "link",
    //     //         },
    //     //         {
    //     //           path: "/merchandising/unit-type-list",
    //     //           title: "Unit-Type",
    //     //           type: "link",
    //     //         },
    //     //         {
    //     //           path: "/merchandising/basic-type-list",
    //     //           title: "basic-Type",
    //     //           type: "link",
    //     //         },
    //     //         {
    //     //           path: "/merchandising/refference-list",
    //     //           title: "refference-list",
    //     //           type: "link",
    //     //         },
    //     //         // { path: "/merchandising/size", title: "Size", type: "link" },
    //     //         // { path: "/merchandising/impoter", title: "Impoter", type: "link" },
    //     //         // {
    //     //         //   path: "/merchandising/fabricDetails",
    //     //         //   title: "Fabric Details",
    //     //         //   type: "link",
    //     //         // },
    //     //       ],
    //     //     },
    //     //     {
    //     //       title: "Fabric Library Entry",
    //     //       type: "sub",
    //     //       active: false,
    //     //       children: [
    //     //         {
    //     //           path: "/merchandising/fabric-library-list",
    //     //           title: "Fabric-Library-List",
    //     //           type: "link",
    //     //         },
    //     //       ],
    //     //     },
    //     //   ],
    //     // },
    //     // {
    //     //   title: "Purchase Order",
    //     //   type: "sub",
    //     //   active: false,
    //     //   children: [
    //     //     {
    //     //       path: "/merchandising/shippedtype",
    //     //       title: "Shipped Type",
    //     //       type: "link",
    //     //     },
    //     //     {
    //     //       path: "/merchandising/ordertype",
    //     //       title: "Order Type",
    //     //       type: "link",
    //     //     },
    //     //     {
    //     //       path: "/merchandising/landingport",
    //     //       title: "Landing Port",
    //     //       type: "link",
    //     //     },
    //     //     {
    //     //       path: "/merchandising/deliveryplace",
    //     //       title: "Delivery Place",
    //     //       type: "link",
    //     //     },
    //     //     {
    //     //       path: "/merchandising/poupload",
    //     //       title: "PO Upload",
    //     //       type: "link",
    //     //     },
    //     //     { path: "/merchandising/po-list", title: "PO List", type: "link" },
    //     //     {
    //     //       path: "/merchandising/po-inactive-list",
    //     //       title: "PO Inactive List",
    //     //       type: "link",
    //     //     },
    //     //     {
    //     //       path: "/merchandising/booking-instruction",
    //     //       title: "Order Management",
    //     //       type: "link",
    //     //     }, //Booking instruction
    //     //   ],
    //     // },
    //     {
    //       title: "Booking",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         { path: "/merchandising/booking", title: "Booking", type: "link" },
    //         {
    //           path: "/merchandising/booking-item",
    //           title: "Booking-item",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/booking-list",
    //           title: "Booking Create",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/booking-list-master",
    //           title: "Booking List",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/supplier",
    //           title: "supplier",
    //           type: "link",
    //         },
    //         // { path: '/merchandising/ordertype', title: 'Order Type', type: 'link' },
    //         // { path: '/merchandising/landingport', title: 'Landing Port', type: 'link' },
    //         // { path: '/merchandising/deliveryplace', title: 'Delivery Place', type: 'link' },
    //         // { path: '/merchandising/poupload', title: 'PO Upload', type: 'link' },
    //         // { path: '/merchandising/po-list', title: 'PO List', type: 'link' },
    //         // { path: '/merchandising/booking-instruction', title: 'Booking Instruction', type: 'link' },
    //       ],
    //     },
    //     {
    //       title: "Forecast",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         {
    //           path: "/merchandising/forecast-file-upload",
    //           title: "File Upload",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/forecast-list",
    //           title: "Forecast List",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/forecast-instruction",
    //           title: "Forecast Instruction",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/forecast-booking",
    //           title: "Forecast Booking",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/booking-item",
    //           title: "Booking-item",
    //           type: "link",
    //         },
    //         // {
    //         //   path: "/merchandising/booking-instruction",
    //         //   title: "Booking Instruction",
    //         //   type: "link",
    //         // },
    //       ],
    //     },
    //     {
    //       title: "Projection",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         {
    //           path: "/merchandising/projection-create",
    //           title: "Projection",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/projection-list",
    //           title: "Projection List",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/booking-instruction",
    //           title: "Order Management",
    //           type: "link",
    //         }, //Booking instruction
    //       ],
    //     },

    //     {
    //       title: "Tech Pack",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         // {
    //         //   path: "/merchandising/ie-costing-create",
    //         //   title: "IE Create",
    //         //   type: "link",
    //         // },
    //         {
    //           path: "/merchandising/tech-pack-list",
    //           title: "Tech Pack",
    //           type: "link",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: "Cad & Sample",
    //   icon: "align-left",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     {
    //       path: "/merchandising/sampleroom",
    //       title: "Sample Request",
    //       type: "link",
    //     },
    //   ],
    // },
    // {
    //   title: "E-Vote",
    //   icon: "align-left",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     {
    //       path: "/e-vote/e-vote-create",
    //       title: "Vote Issue Create",
    //       type: "link",
    //     },
    //     {
    //       path: "/e-vote/e-vote-list",
    //       title: "Vote Issue List",
    //       type: "link",
    //     },
    //     {
    //       path: "/e-vote/e-vote-list-user",
    //       title: "Issues By Users",
    //       type: "link",
    //     },
    //   ],
    // },
    // {
    //   title: "Gate-Pass",
    //   icon: "align-left",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     {
    //       path: "/gate-pass/gatepass-create",
    //       title: "Gate Pass Create",
    //       type: "link",
    //     },
    //     {
    //       path: "/gate-pass/gate-user",
    //       title: "Gate User",
    //       type: "link",
    //     },
    //     {
    //       path: "/gate-pass/Permission-group",
    //       title: "Permission Group",
    //       type: "link",
    //     },
    //     {
    //       path: "/gate-pass/Approve-Gate-Pass",
    //       title: "Approve Gatepass",
    //       type: "link",
    //     },
    //     {
    //       path: "/gate-pass/Gate-Pass-User",
    //       title: "Gatepass User",
    //       type: "link",
    //     },
    //     {
    //       path: "/gate-pass/Return-Gate-Pass",
    //       title: "Return Gatepass",
    //       type: "link",
    //     },
    //   ],
    // },
    // {
    //   title: "time-and-action",
    //   icon: "align-left",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     {
    //       path: "/time-and-action/task-list",
    //       title: "Create Task",
    //       type: "link",
    //     },
    //   ],
    // },
    // {
    //   title: "Fabric Library",
    //   icon: "align-left",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     {
    //       title: "Setting",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         {
    //           path: "/merchandising/fabric-basic-name-list",
    //           title: "Fabric Basic Name",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/fabric-mill-name-list",
    //           title: "mill-list",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/unit-type-list",
    //           title: "Unit-Type",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/basic-type-list",
    //           title: "basic-Type",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/refference-list",
    //           title: "refference-list",
    //           type: "link",
    //         },
    //         // { path: "/merchandising/size", title: "Size", type: "link" },
    //         // { path: "/merchandising/impoter", title: "Impoter", type: "link" },
    //         // {
    //         //   path: "/merchandising/fabricDetails",
    //         //   title: "Fabric Details",
    //         //   type: "link",
    //         // },
    //       ],
    //     },
    //     {
    //       title: "Fabric Library Entry",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         {
    //           path: "/merchandising/fabric-library-list",
    //           title: "Fabric-Library-List",
    //           type: "link",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: "Order Management",
    //   icon: "align-left",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     {
    //       title: "Setting",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         {
    //           path: "/merchandising/style-list",
    //           title: "Style Info",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/landingport",
    //           title: "Landing Port",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/deliveryplace",
    //           title: "Delivery Place",
    //           type: "link",
    //         },
    //       ],
    //     },
    //     {
    //       title: "Purchase Order",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         {
    //           path: "/merchandising/purchase-order-create",
    //           title: "PO create",
    //           type: "link",
    //         },
    //         {
    //           path: "/merchandising/purchase-order-List",
    //           title: "PO List",
    //           type: "link",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: "Care Level",
    //   icon: "align-left",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     {
    //       title: "Setting",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         { path: "/merchandising/expoter", title: "Expoter", type: "link" },
    //         { path: "/merchandising/style", title: "Style", type: "link" },
    //         { path: "/merchandising/size", title: "Size", type: "link" },
    //         { path: "/merchandising/impoter", title: "Impoter", type: "link" },
    //         {
    //           path: "/merchandising/fabricDetails",
    //           title: "Fabric Details",
    //           type: "link",
    //         },
    //       ],
    //     },
    //     {
    //       title: "Barcode Generate",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         {
    //           path: "/merchandising/barcodeGen",
    //           title: "Barcode Generate",
    //           type: "link",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: "Admin",
    //   type: "sub",
    //   icon: "align-left",
    //   active: false,
    //   children: [
    //     {
    //       title: "Add Menu",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         {
    //           path: "/admin/menu-list",
    //           title: "Menu Create",
    //           type: "link",
    //         },
    //       ],
    //     },
    //     {
    //       title: "Menus Action",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         {
    //           path: "/admin/menu-action-list",
    //           title: "Menus Action",
    //           type: "link",
    //         },
    //       ],
    //     },
    //     {
    //       title: "Users Info",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         {
    //           path: "/admin/users-info",
    //           title: "Users Info",
    //           type: "link",
    //         },
    //       ],
    //     },
    //     {
    //       title: "Role",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         {
    //           path: "/admin/role-list",
    //           title: "Role Create",
    //           type: "link",
    //         },
    //       ],
    //     },
    //     {
    //       title: "Department",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         {
    //           path: "/admin/department-list",
    //           title: "Department Create",
    //           type: "link",
    //         },
    //       ],
    //     },
    //     {
    //       title: "User Data",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         {
    //           path: "/admin/data-permission-list",
    //           title: "Data-Permission",
    //           type: "link",
    //         },
    //       ],
    //     },
    //   ],
    // },
  ];
  // Array
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);

  // Windows width
  @HostListener("window:resize", ["$event"])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }
}
