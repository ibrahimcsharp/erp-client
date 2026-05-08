import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UnSavedChangesGuard } from "src/app/shared/guards/UnSavedChangesGuard";
import { FormComponent } from "./common-design/form/form.component";
import { HomeComponent } from "./common-design/home/home.component";
import { BasicTypeListComponent } from "./fabric-library/components/setting-components/basic-type-list/basic-type-list.component";
import { FabricBasicNameListComponent } from "./fabric-library/components/setting-components/fabric-basic-name-list/fabric-basic-name-list.component";
import { MillNameListComponent } from "./fabric-library/components/setting-components/mill-name-list/mill-name-list.component";
import { RefferenceListComponent } from "./fabric-library/components/setting-components/refference-list/refference-list.component";
import { UnitTypeListComponent } from "./fabric-library/components/setting-components/unit-type-list/unit-type-list.component";

import { CostingFormComponent } from "../tms/challan-management/costing-form/costing-form.component";
import { CompositionSetupComponent } from "./fabric-library/components/setting-components/composition-setup/composition-setup.component";
import { PlaningBoardComponent } from "./factory-menu/planing-board/planing-board.component";
import { BuyerWisePlaningBoardComponent } from "./factory-menu/buyer-wise-planing-board/buyer-wise-planing-board.component";


const routes: Routes = [
  {
    path: "",
    children: [
     
      {
        path: "fabric-basic-name-list",
        component: FabricBasicNameListComponent,
        data: {
          title: "Fabric Basic Name List",
          breadcrumb: "fabric-basic-name-list",
        },
      },
      {
        path: "fabric-mill-name-list",
        component: MillNameListComponent,
        data: {
          title: "Fabric Mill Name List",
          breadcrumb: "fabric-mill-name-list",
        },
      },
      {
        path: "unit-type-list",
        component: UnitTypeListComponent,
        data: {
          title: "Unit Type List",
          breadcrumb: "unit-type-list",
        },
      },
      {
        path: "basic-type-list",
        component: BasicTypeListComponent,
        data: {
          title: "Basic Type List",
          breadcrumb: "basic-type-list",
        },
      },
      {
        path: "refference-list",
        component: RefferenceListComponent,
        data: {
          title: "Refference List",
          breadcrumb: "refference-list",
        },
      },
      

      {
        path: "fabric-composition-setup",
        component: CompositionSetupComponent,
        data: {
          title: "Fabric Composition Setup",
          breadcrumb: "fabric-composition-setup",
        },
      },
      
      
      {
        path: "form",
        component: FormComponent,
        data: {
          title: "Form",
          breadcrumb: "form",
        },
      },



      //New Component IE

      {
        path: "home",
        component: HomeComponent,
        data: {
          title: "Home",
          breadcrumb: "home",
        },
      },
      
      {
        path: "planing-board",
        component: PlaningBoardComponent,
        data: {
          title: "Planning Board",
          breadcrumb: "planing-board",
        },
      },
      {
        path: "buyer-wise-planing-board",
        component: BuyerWisePlaningBoardComponent,
        data: {
          title: "Buyer Wise Planning Board",
          breadcrumb: "buyer-wise-planing-board",
        },
      },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchandisingRoutingModule { }
