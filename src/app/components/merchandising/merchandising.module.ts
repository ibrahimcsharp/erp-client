import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatNativeDateModule } from "@angular/material/core";
import { NgbTypeaheadModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { CountToModule } from "angular-count-to";
import { DataTablesModule } from "angular-datatables";
import { ChartistModule } from "ng-chartist";
import { ChartsModule } from "ng2-charts";
import { Ng2GoogleChartsModule } from "ng2-google-charts";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ModalModule } from "ngx-bootstrap/modal";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { PopoverModule } from "ngx-bootstrap/popover";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { TagInputModule } from "ngx-chips";
import {
  DropzoneConfigInterface,
  DropzoneModule,
  DROPZONE_CONFIG,
} from "ngx-dropzone-wrapper";
import { NgxPaginationModule } from "ngx-pagination";
import { ToastrModule } from "ngx-toastr";
import { AccordionModule } from "primeng/accordion";
import { AutoCompleteModule } from "primeng/autocomplete";
import { ButtonModule } from "primeng/button";

import { CardModule } from "primeng/card";
import { ChartModule } from "primeng/chart";
import { CheckboxModule } from "primeng/checkbox";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { FieldsetModule } from "primeng/fieldset";
import { FileUploadModule } from "primeng/fileupload";
import { GalleriaModule } from "primeng/galleria";
import { InputSwitchModule } from "primeng/inputswitch";
import { InputTextareaModule } from "primeng/inputtextarea";
import { MultiSelectModule } from "primeng/multiSelect";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { PanelModule } from "primeng/panel";
import { PanelMenuModule } from "primeng/panelmenu";
import { ProgressBarModule } from "primeng/progressbar";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { RadioButtonModule } from "primeng/radiobutton";
import { SidebarModule } from "primeng/sidebar";
import { SplitButtonModule } from "primeng/splitbutton";
import { TableModule } from "primeng/table";
import { TabViewModule } from "primeng/tabview";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { TooltipModule } from "primeng/tooltip";
import { TreeModule } from "primeng/tree";
import { MaterialModule } from "src/app/material/material.module";
import { SharedModule } from "src/app/shared/shared.module";
import { ConferrenceModule } from "../conferrence-room/conferrence.module";
import { FormComponent } from "./common-design/form/form.component";
import { HomeComponent } from "./common-design/home/home.component";
import { BasicTypeCreateComponent } from "./fabric-library/components/setting-components/basic-type-create/basic-type-create.component";
import { BasicTypeListComponent } from "./fabric-library/components/setting-components/basic-type-list/basic-type-list.component";
import { FabricBasicNameCreateComponent } from "./fabric-library/components/setting-components/fabric-basic-name-create/fabric-basic-name-create.component";
import { FabricBasicNameListComponent } from "./fabric-library/components/setting-components/fabric-basic-name-list/fabric-basic-name-list.component";
import { MillNameCreateComponent } from "./fabric-library/components/setting-components/mill-name-create/mill-name-create.component";
import { MillNameListComponent } from "./fabric-library/components/setting-components/mill-name-list/mill-name-list.component";
import { RefferenceCreateComponent } from "./fabric-library/components/setting-components/refference-create/refference-create.component";
import { RefferenceListComponent } from "./fabric-library/components/setting-components/refference-list/refference-list.component";
import { UnitTypeCreateComponent } from "./fabric-library/components/setting-components/unit-type-create/unit-type-create.component";
import { UnitTypeListComponent } from "./fabric-library/components/setting-components/unit-type-list/unit-type-list.component";

import { MerchandisingRoutingModule } from "./merchandising-routing.module";
import { CompositionSetupComponent } from './fabric-library/components/setting-components/composition-setup/composition-setup.component';

import { PlaningBoardComponent } from './factory-menu/planing-board/planing-board.component';
import { BuyerWisePlaningBoardComponent } from './factory-menu/buyer-wise-planing-board/buyer-wise-planing-board.component';
import { SumPipe } from "src/app/shared/pipe/sum.pipe";

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 50,
  url: "https://httpbin.org/post",
};

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MerchandisingRoutingModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    MaterialModule,
    MatNativeDateModule,
    BsDatepickerModule.forRoot(),
    PaginationModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    DataTablesModule,
    PopoverModule.forRoot(),
    TableModule,
    MultiSelectModule,
    ButtonModule,
    CheckboxModule,
    DropdownModule,
    DynamicDialogModule,
    InputTextareaModule,
    ButtonModule,
    InputSwitchModule,
    MatBadgeModule,
    FileUploadModule,
    ToastModule,
    CardModule,
    ProgressBarModule,
    AutoCompleteModule,
    RadioButtonModule,
    TabViewModule,
    ToolbarModule,
    DialogModule,
    FieldsetModule,
    ConfirmDialogModule,
    TooltipModule,
    ProgressSpinnerModule,
    OverlayPanelModule,
    AccordionModule,
    PanelModule,
    SplitButtonModule,
    ChartModule,
    SidebarModule,
    NgbTypeaheadModule,
    TypeaheadModule.forRoot(),
    TagInputModule,
    DropzoneModule,
    CommonModule,
    CountToModule,
    SharedModule,
    ChartsModule,
    Ng2GoogleChartsModule,
    NgxChartsModule,
    ChartistModule,
    GalleriaModule,
    PanelMenuModule,
    TreeModule,
    //TreeviewModule.forRoot(),

    // SplitterModule,
  ],
  declarations: [
   
    FabricBasicNameCreateComponent,
    FabricBasicNameListComponent,
    MillNameCreateComponent,
    MillNameListComponent,
    UnitTypeCreateComponent,
    UnitTypeListComponent,
    BasicTypeListComponent,
    BasicTypeCreateComponent,
    RefferenceCreateComponent,
    RefferenceListComponent,   
    FormComponent,
    HomeComponent,
    CompositionSetupComponent,
    PlaningBoardComponent,
    BuyerWisePlaningBoardComponent,
    SumPipe

  ],
  entryComponents: [    
    FabricBasicNameCreateComponent,
  ],
  exports: [
    CommonModule,
    SharedModule,
    MerchandisingRoutingModule,
    ModalModule,
    ToastrModule,
    MaterialModule,
    MatNativeDateModule,
    BsDatepickerModule,
    PaginationModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    DataTablesModule,
    PopoverModule,
    TableModule,
    MultiSelectModule,
    ButtonModule,

    CheckboxModule,
    DropdownModule,
    DynamicDialogModule,
    InputTextareaModule,
    ButtonModule,
    InputSwitchModule,
    MatBadgeModule,
    FileUploadModule,
    ToastModule,
    CardModule,
    ProgressBarModule,
    AutoCompleteModule,
    RadioButtonModule,
    TabViewModule,
    ToolbarModule,
    DialogModule,
    FieldsetModule,
    ConfirmDialogModule,
    TooltipModule,
    ProgressSpinnerModule,
    OverlayPanelModule,
    AccordionModule,
    PanelModule,
    SplitButtonModule,
    ChartModule,
    SidebarModule,
    NgbTypeaheadModule,
    TypeaheadModule,
    TagInputModule,
    DropzoneModule,
    CountToModule,
    SharedModule,
    ChartsModule,
    Ng2GoogleChartsModule,
    NgxChartsModule,
    ChartistModule,
    PanelMenuModule,
    TreeModule,
    //TreeviewModule,
    CollapseModule,
    BsDropdownModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    // KontoorService,
    // RichluService,
    // AbContractService,
    // StmConService,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG,
    },
  ],
})
export class MerchandisingModule { }
