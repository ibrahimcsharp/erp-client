import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { ToastrService } from "ngx-toastr";
import { SelectItem } from "primeng/api";
import { Observable, throwError } from "rxjs";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { RoleService } from "../../admin/Services/role.service";
import { TimeAndActionService } from "../../time-and-action/service/time-and-action.service";
import { BomListDropdownModel } from "../BOM/model/bom-list-dropdown.model";
import { BookPayModeModel } from "../BOM/model/book-paymode-dropdown.model";
import { ItemListDropdownForBOMFileModel } from "../BOM/model/item-list-bom-approval.model";
import { TenorDropdownModel } from "../BOM/model/tenor-dropdown.model";
import { TenorTypeModel } from "../BOM/model/tenor-type-dropdown.model";
import { TermOfDeliveryModel } from "../BOM/model/term-delivery.model";
import { BOMService } from "../BOM/service/bom.service";
import { Company } from "../common-componant/model/company";
import { CostingMasterModel } from "../Costing/model/costing-model";
import { CostingMasterService } from "../Costing/service/costing-master.service";
import { FabricLibraryMain } from "../fabric-library/model/fabric-library-model/fabric-library-main";
import { BasicType } from "../fabric-library/model/setting-model/basic-type";
import { FabricBasicName } from "../fabric-library/model/setting-model/fabric-basic-name";
import { MillName } from "../fabric-library/model/setting-model/fabric-mill";
import { Refference } from "../fabric-library/model/setting-model/refference";
import { UnitTypeModel } from "../fabric-library/model/setting-model/unit-type";
import { UnitItems } from "../fabric-library/model/setting-model/UnitItems";
import { FabricBasicNameService } from "../fabric-library/services/fabric-basic-name.service";
import { ForecastService } from "../forecast/forecast-file-upload/service/forecast.service";
import { Year } from "../forecast/forecast-setup/model/year";
import { Brand } from "../models/brand";
import { Buyer } from "../models/buyer";
import { BuyerDepartment } from "../models/BuyerDepartment";
import { BuyerSizeSet } from "../models/BuyerSizeSet";
import { Category } from "../models/category";
import { CommonFiles } from "../models/common-files.model";
import { GatePassEmployeeType } from "../models/gatePassEmployeeModel";
import { Gmtitem } from "../models/gmtitem.model";
import { Item } from "../models/item";
import { SampleType } from "../models/sampleType";
import { Season } from "../models/seasonmodel";
import { StCodeModel } from "../models/stCode.model";
import { StyleFabricHead } from "../order-management/model/style-fabric-head.model";
import { StyleInfo } from "../order-management/model/style-info";
import { StylePartSetup } from "../order-management/model/style-part-setup.model";
import { StylePart } from "../order-management/model/style-part.model";
import { OrderManagementService } from "../order-management/service/order-management.service";
import { Country } from "../purchase-order/model/setting-model/country";
import { DeliveryPlace } from "../purchase-order/model/setting-model/delivery-place";
import { LandingPort } from "../purchase-order/model/setting-model/landing-port";
import { ShippedType } from "../purchase-order/model/setting-model/shipped-type";
import { PoSettingService } from "../purchase-order/service/po-setting.service";
import { BrandService } from "../services/brand.service";
import { BuyerDepartmentService } from "../services/buyerDepartment.service";
import { BuyerSizeSetService } from "../services/buyerSizeSet.service";
import { CategoryService } from "../services/category.service";
import { GmtitemService } from "../services/gmtitem.service";
import { ItemService } from "../services/item.service";
import { SampleDevService } from "../services/sampleDev.service";
import { SampleTypeService } from "../services/sampleType.service";
import { TrimsLibraryService } from "../trims-library/trims-library.service";
import { catchError } from "rxjs/operators";
import { TaskService } from "../../task-management/services/task.service";
import { Router } from "@angular/router";
import { EVoteService } from "../../e-vote/services/e-vote.service";

@Injectable({
  providedIn: "root",
})
export class CommonServiceService {
  baseUrl = environment.apiUrl + "merchandising/";
  baseUrlErrorLog = environment.apiUrl + "ErrorLog/";

  minioBaseUrl = environment.minioApiUrl;// + "file-management-controller/";

  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");

  baseUrlErLog_ = this.baseUrlErrorLog.replace(/[?&]$/, "");

  minioBaseUrl_ = this.minioBaseUrl.replace(/[?&]$/, "");

  baseUrl2 = environment.apiUrl + "accounting/";
  baseUrl2_ = this.baseUrl2.replace(/[?&]$/, "");
  BasicTypeSelectList: any;
  FabricNameSelectList: any;
  UnitTypeList: any;
  unitTypeTexList: any[] = [];
  poColorList: any[] = [];
  MillNameSelectList: any;
  RefferenceSelectList: any;
  CurrencySelectList: any;
  CountrySelectList: any;
  SupplierSelectList: any;
  ItemCategorySelectList: any;
  BuyerSelectList: any[] = [];
  threadMktDDLList: any[] = [];
  YearSelectList: any[];
  SeasonSelectList: any;
  POSelectList: any;
  SizeWiseGroupList: any;
  SeasonSelectList2: any;
  SampleTypeSelectList: any[];
  GatePassEmployeeList: any;
  GatePassEmployeeDepartmentList: any;
  GatePassSectionListByDept: any[];
  StyleSelectList: any = [];
  StyleSelectListForBomBackup: any = [];
  StyleSelectListForBom: any = [];
  DescriptionSelectList: any = [];
  FabricDescriptionSelectedList: any = [];
  CostingStyleSelectList: any = [];
  CostingStyleSelectComparisonList: any = [];
  CostingStyleSelectComparisonList2: any = [];
  BookingSalesContractSelectList: any = [];
  BomList: BomListDropdownModel[];
  BookPayModeList: BookPayModeModel[];
  BookPayModeSelectList: any = [];
  BookTenorList: TenorDropdownModel[];
  BookTenorSelectList: any = [];
  BookTypeTenorList: TenorTypeModel[];
  BookTypeTenorSelectList: any = [];
  BookTermofDeliveryList: TermOfDeliveryModel[];
  BookTermofDeliverySelectList: any = [];
  BomSelectList: any = [];
  ItemListForBomFile: ItemListDropdownForBOMFileModel[];
  ItemListForBomFileSelectList: any = [];
  datePickerConfig: Partial<BsDatepickerConfig>;
  LandingPortSelectList: any;
  DeliveryPlaceSelectList: any;
  CompanySelectedList: any;
  HSCategorySelectedList: any;
  BranchListByCurrentUser: any[];
  FabricHeadSelectedList: any;
  StylePartSelectedList: any;
  StylePartSetupSelectedList: any;
  StyleFabricSelectedList: any;
  BookinCadFabricSelectedList: any;
  ALLFabricSelectedList: any;
  SizeSelectList: any = [];
  SizeSelectedList: any = [];
  BuyerWiseSizeSelectedList: any = [];
  CostMasterSelectList: any;
  BuyerDepartmentSelectList: any;
  BuyerWiseDepartmentSelectList: any;
  BrandSelectedList: any;
  SCBrandSelectedList: any;
  ShippedTypeSelectedList: any;
  PriceModeSelectedList: any;
  ItemSelectList: any[] = [];
  ProcessItemSelectList: any[] = [];
  ItemFabSelectList: any[] = [];
  ItemLHSelectList: any[] = [];
  ItemPackagingList: any[] = [];
  ItemProcessList: any[] = [];
  ComponentSelectList: any[] = [];
  LoadedComponentSelectList: any[] = [];

  StCodeSelectList: any[] = [];
  StCodeDescriptionSelectList: any[] = [];
  statuses: SelectItem[];
  ShipmentModeSelectedList: any;
  PaymentModeSelectedList: any;
  PartialShipmentSelectedList: any;
  TransShipmentSelectedList: any;
  ShippingTermsSelectedList: any;
  FabricBasicNameSelectList: any;
  CategorySelectList: any;
  FabricCategorySelectList: any;
  ProcessCategorySelectList: any;
  UnitItemmsList: UnitItems[] = [];
  MeasurementMethodList: any;
  commonFilesList: CommonFiles[] = [];
  cadConsumptionMstList: any[] = [];
  hoConsumptionMstList: any[] = [];
  cadConsumptionDetailsList: any[] = [];
  hoConsumptionDetailsList: any[] = [];
  commonCadFilesList: CommonFiles[] = [];
  commonConsFilesList: CommonFiles[] = [];
  stopDelete: boolean = false;
  GmtItemSelectList: any;
  allUnitTypeList: UnitTypeModel[];
  gatePassEmployeeList: GatePassEmployeeType[];
  gatePassEmployeeListBackup: GatePassEmployeeType[];
  gatePassDepartmentList: GatePassEmployeeType[];
  gatePassSectionListByDepartment: GatePassEmployeeType[];
  buyerCodeForFabricLibrary: any[];
  buyerCodeForFabricLibraryBackup: any[]
  supplierCodeForFabricLibrary: any[];
  supplierCodeForFabricLibraryBackup: any[];
  ImporterCodeForFabricLibrary: any[];
  ImporterCodeForFabricLibraryBackup: any[];
  ImporterNameForFabricLibrary: any[];
  ImporterNameForFabricLibraryBackup: any[];
  IHSSnowtexForFabricLibraryBackup: any[];
  IHSSnowtexForFabricLibrary: any[];
  bomSeasonList: BomListDropdownModel[];
  piSeasonList: BomListDropdownModel[];
  bomStyleList: BomListDropdownModel[];
  tamplateList: any;
  logReqList: any[];
  logReqListBackup: any[];
  contractualBuyerList: any[] = [];
  gmtSubTypeInfoList: any[] = [];
  teamEmployeeList: any[];
  teamEmployeeListBackup: any[];
  teamDepartmentList: any[];
  TeamSetupEmployeeList: any;
  quationBackup: any[];
  quationList: any[];
  quationBackup2: any[];
  quationList2: any[];
  quationBackupBom: any[];
  quationListBom: any[];
  colorNameBackupBom: any[];
  colorNameListBom: any[];
  r3VersionList: any[] = [];
  blockingSetupList: any[] = [];

  constructor(
    public service: FabricBasicNameService,
    private toastr: ToastrService,
    public poService: PoSettingService,
    public itemService: ItemService,
    public sampleDevService: SampleDevService,
    public SampleTypeService: SampleTypeService,
    public forecastService: ForecastService,
    public orderManagementService: OrderManagementService,
    public BomService: BOMService,
    public brandService: BrandService,
    public poSettingService: PoSettingService,
    public costMasterService: CostingMasterService,
    public buyerDepartmentService: BuyerDepartmentService,
    public buyerSizeSetServices: BuyerSizeSetService,
    public categoryServices: CategoryService,
    private http: HttpClient,
    private token: TokenService,
    public gmtTtemService: GmtitemService,
    public roleService: RoleService,
    public trimsLibraryService: TrimsLibraryService,
    public timeAndActionService: TimeAndActionService,
    public taskService: TaskService,
    public flService: FabricBasicNameService,
    private router: Router,
    public evoteService: EVoteService
  ) { }

  //Load Shipment mode for dropdown
  shipmentMode = 42;
  LoadShipmentMode() {
    this.service.GetCurrency(this.shipmentMode).subscribe(
      (data: Refference[]) => {
        this.service.refferenceList = data;
        this.ShipmentModeSelectedList = new Array();
        //this.ShipmentModeSelectedList.push({ label: "==Select One==", value: 0 });
        for (var i = 0; i < this.service.refferenceList.length; i++) {
          this.ShipmentModeSelectedList.push({
            label: this.service.refferenceList[i].name,
            value: this.service.refferenceList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Refference Type");
      }
    );
  }
  //Load Price mode for dropdown
  priceMode = 82;
  LoadPriceMode() {
    this.service.GetCurrency(this.priceMode).subscribe(
      (data: Refference[]) => {
        this.service.refferenceList = data;
        this.PriceModeSelectedList = new Array();
        this.PriceModeSelectedList.push({ label: "Select", value: 0 });
        for (var i = 0; i < this.service.refferenceList.length; i++) {
          this.PriceModeSelectedList.push({
            label: this.service.refferenceList[i].name,
            value: this.service.refferenceList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Price Mood");
      }
    );
  }

  //Load payment mode fro dropdown
  paymentMode = 3;
  LoadPaymentMode() {
    this.service.GetCurrency(this.paymentMode).subscribe(
      (data: Refference[]) => {
        this.service.refferenceList = data;
        this.PaymentModeSelectedList = new Array();
        //this.PaymentModeSelectedList.push({ label: "==SELECT ONE==", value: 0 });
        for (var i = 0; i < this.service.refferenceList.length; i++) {
          this.PaymentModeSelectedList.push({
            label: this.service.refferenceList[i].name,
            value: this.service.refferenceList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Refference Type");
      }
    );
  }

  //Load partial shipment for ddropdown
  partialShipment = 43;
  LoadPartialShipment() {
    this.service.GetCurrency(this.partialShipment).subscribe(
      (data: Refference[]) => {
        this.service.refferenceList = data;
        this.PartialShipmentSelectedList = new Array();
        this.PartialShipmentSelectedList.push({ label: "Select", value: null });
        for (var i = 0; i < this.service.refferenceList.length; i++) {
          this.PartialShipmentSelectedList.push({
            label: this.service.refferenceList[i].name,
            value: this.service.refferenceList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Refference Type");
      }
    );
  }

  //Load trasshipment for dropdown
  transShipment = 44;
  LoadTransShipment() {
    this.service.GetCurrency(this.transShipment).subscribe(
      (data: Refference[]) => {
        this.service.refferenceList = data;
        this.TransShipmentSelectedList = new Array();
        this.TransShipmentSelectedList.push({ label: "Select", value: null });
        for (var i = 0; i < this.service.refferenceList.length; i++) {
          this.TransShipmentSelectedList.push({
            label: this.service.refferenceList[i].name,
            value: this.service.refferenceList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Refference Type");
      }
    );
  }

  //Load shipping terms
  shippingterms = 45;
  LoadShippingTerms() {
    this.service.GetCurrency(this.shippingterms).subscribe(
      (data: Refference[]) => {
        this.service.refferenceList = data;
        this.ShippingTermsSelectedList = new Array();
        this.ShippingTermsSelectedList.push({ label: "Select", value: null });
        for (var i = 0; i < this.service.refferenceList.length; i++) {
          this.ShippingTermsSelectedList.push({
            label: this.service.refferenceList[i].name,
            value: this.service.refferenceList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Refference Type");
      }
    );
  }

  //Load Measurement method
  id = 62;
  LoadMeasurementMethod() {
    this.service.GetCurrency(this.id).subscribe(
      (data: Refference[]) => {
        this.service.refferenceList = data;
        this.MeasurementMethodList = new Array();
        this.MeasurementMethodList.push({ label: "Select", value: null });
        for (var i = 0; i < this.service.refferenceList.length; i++) {
          this.MeasurementMethodList.push({
            label: this.service.refferenceList[i].name,
            value: this.service.refferenceList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Refference Type");
      }
    );
  }

  //Load company by user permission
  GetCompanyByCurrentUser() {
    this.BranchListByCurrentUser = [];
    this.roleService.GetCompanyByCurrentUser().subscribe(
      (res) => {
        this.BranchListByCurrentUser = res;
      },
      (error) => {
        this.BranchListByCurrentUser = [];
      }
    );
  }

  //Load compnay name dropdown
  CompanySelectedListForBilling: any;
  LoadCompany() {
    this.orderManagementService.GetCompany().subscribe((data: Company[]) => {
      this.orderManagementService.companyList = data;
      this.CompanySelectedList = new Array();
      this.CompanySelectedList.push({
        label: "Select",
        value: null,
      });
      for (var i = 0; i < this.orderManagementService.companyList.length; i++) {
        this.CompanySelectedList.push({
          label: this.orderManagementService.companyList[i].shortForm,
          value: this.orderManagementService.companyList[i].id,
        });
      }

      //code for billing address without SCO and C&F
      this.CompanySelectedListForBilling = new Array();
      for (var i = 0; i < this.CompanySelectedList.length; i++) {
        let obj = this.CompanySelectedList[i]
        if (this.CompanySelectedList[i].value != 1 && this.CompanySelectedList[i].value != 6) {
          this.CompanySelectedListForBilling.push(obj);
        }
      }
    });
  }


  //Load Template name dropdown
  LoadTemplate() {
    this.timeAndActionService.GetAllTemplateList().subscribe((data: any[]) => {
      this.timeAndActionService.allTepList = data;
      this.tamplateList = new Array();
      this.tamplateList.push({
        label: "Select",
        value: null,
      });
      for (var i = 0; i < this.timeAndActionService.allTepList.length; i++) {
        this.tamplateList.push({
          label: this.timeAndActionService.allTepList[i].template,
          value: this.timeAndActionService.allTepList[i].id,
        });
      }
    });
  }

  //Load compnay name dropdown
  LoadHSCategory() {
    this.itemService.GetHSCategoriesList().subscribe((data: Company[]) => {
      this.itemService.hsCategoriesList = data;
      this.HSCategorySelectedList = new Array();
      this.HSCategorySelectedList.push({
        label: "Select",
        value: 0,
      });
      for (var i = 0; i < this.itemService.hsCategoriesList.length; i++) {
        this.HSCategorySelectedList.push({
          label: this.itemService.hsCategoriesList[i].categoryName,
          value: this.itemService.hsCategoriesList[i].id,
        });
      }
    });
  }

  //Load compnay with SaRa Showroom name dropdown
  LoadCompanyWithSara() {
    this.orderManagementService
      .GetCompanyWithSara()
      .subscribe((data: Company[]) => {
        this.orderManagementService.companyList = data;
        this.CompanySelectedList = new Array();
        this.CompanySelectedList.push({
          label: "Select",
          value: 0,
        });
        for (
          var i = 0;
          i < this.orderManagementService.companyList.length;
          i++
        ) {
          this.CompanySelectedList.push({
            label: this.orderManagementService.companyList[i].branchOfficeName,
            value: this.orderManagementService.companyList[i].id,
          });
        }
      });
  }

  // LoadCompanyForTask() {
  //   this.orderManagementService.GetCompanyWithSara().subscribe((data: Company[]) => {
  //     this.CompanySelectedList = data;
  //     // this.orderManagementService.companyList = data;
  //     // this.CompanySelectedList = new Array();

  //     // this.CompanySelectedList.push({
  //     //   location: "Select",
  //     //   value: 0,
  //     // });

  //     // for (var i = 0; i < this.orderManagementService.companyList.length; i++) {
  //     //   this.CompanySelectedList.push({
  //     //     location: this.orderManagementService.companyList[i].branchOfficeName,
  //     //     value: this.orderManagementService.companyList[i].id,
  //     //   });
  //     // }
  //   });
  // }

  LoadCompanyOnlySnowtexAndSara() {
    this.orderManagementService
      .GetCompanyOnlySnowtexAndSara()
      .subscribe((data: Company[]) => {
        this.orderManagementService.companyList = data;
        this.CompanySelectedList = new Array();
        this.CompanySelectedList.push({
          label: "Select",
          value: 0,
        });
        for (
          var i = 0;
          i < this.orderManagementService.companyList.length;
          i++
        ) {
          this.CompanySelectedList.push({
            label: this.orderManagementService.companyList[i].shortForm,
            value: this.orderManagementService.companyList[i].id,
          });
        }
      });
  }

  //Load compnay name By Own Id
  LoadCompanyById(companyId: number) {
    // this.salesContactServices
    //   .GetCompany(companyId)
    //   .subscribe((data: Company[]) => {
    //     this.orderManagementService.companyList = data;
    //     this.CompanySelectedList = new Array();
    //     if (data.length > 1) {
    //       this.CompanySelectedList.push({ label: "Select", value: null });
    //     }
    //     for (
    //       var i = 0;
    //       i < this.orderManagementService.companyList.length;
    //       i++
    //     ) {
    //       this.CompanySelectedList.push({
    //         label: this.orderManagementService.companyList[i].branchOfficeName,
    //         value: this.orderManagementService.companyList[i].id,
    //       });
    //     }
    //   });
  }

  //load basic type dropdown
  LoadBasicType() {
    this.service.getBasicType().subscribe(
      (data: BasicType[]) => {
        this.service.basicTypeList = data;
        this.BasicTypeSelectList = new Array();
        this.BasicTypeSelectList.push({ label: "Select", value: null });
        for (var i = 0; i < this.service.basicTypeList.length; i++) {
          this.BasicTypeSelectList.push({
            label: this.service.basicTypeList[i].keyName,
            value: this.service.basicTypeList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Basic Type");
      }
    );
  }

  //DropDown Load Fabric basic name
  LoadFabricBasicName() {
    this.service.getFabricBasicName().subscribe(
      (data: FabricBasicName[]) => {
        this.service.fabricNameList = data;
        this.FabricBasicNameSelectList = new Array();
        this.FabricBasicNameSelectList.push({ label: "Select", value: 0 });
        for (var i = 0; i < this.service.fabricNameList.length; i++) {
          this.FabricBasicNameSelectList.push({
            label: this.service.fabricNameList[i].fabricBasicName,
            value: this.service.fabricNameList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Fabric Basic Name");
      }
    );
  }
  //DropDown Load Fabric basic name
  LoadFabricMain() {
    this.service.getFabricLibraryMain().subscribe(
      (data: FabricLibraryMain[]) => {
        this.service.fabricLibraryMainList = data;
        this.FabricNameSelectList = new Array();
        this.FabricNameSelectList.push({ label: "Select", value: 0 });
        for (var i = 0; i < this.service.fabricLibraryMainList.length; i++) {
          this.FabricNameSelectList.push({
            label: this.service.fabricLibraryMainList[i].supByrDescription,
            value: this.service.fabricLibraryMainList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Fabric Basic Name");
      }
    );
  }

  //dropdown unit type
  LoadUnitType() {
    this.service.getUnitTypeName().subscribe(
      (data: UnitTypeModel[]) => {
        this.allUnitTypeList = data;
        this.service.unitTypeList = data;
        this.UnitTypeList = new Array();
        this.UnitTypeList.push({ label: "Select", value: 0 });
        for (var i = 0; i < this.service.unitTypeList.length; i++) {
          this.UnitTypeList.push({
            label: this.service.unitTypeList[i].unitName,
            value: this.service.unitTypeList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Unit Type");
      }
    );
  }

  //dropdown unit type with Tex
  LoadUnitTypeWithTex(styleId: number, stylePartId: number) {
    this.service.getUnitTypeWithTex(styleId, stylePartId).subscribe(
      (data: any[]) => {
        this.unitTypeTexList = new Array();
        this.unitTypeTexList.push({ label: "Select", value: 0 });
        for (var i = 0; i < data.length; i++) {
          this.unitTypeTexList.push({
            label: data[i].unitName,
            value: data[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Unit Type");
      }
    );
  }
  //dropdown unit type with Tex
  async LoadPOColor(styleId: number) {
    var poColorListForCosting = await this.costMasterService.GetPOColorList(styleId);
    if (poColorListForCosting.length > 0) {
      this.poColorList = new Array();
      //this.poColorList.push({ label: "Select", value: "" });
      for (var i = 0; i < poColorListForCosting.length; i++) {
        this.poColorList.push({
          label: poColorListForCosting[i].colorType,
          value: poColorListForCosting[i].colorType,
        });
      }
    }
    else {
      this.poColorList = [];
    }
  }

  //dropdown for mill name
  LoadMillName() {
    this.service.getMilleName().subscribe(
      (data: MillName[]) => {
        this.service.millNameList = data;
        this.MillNameSelectList = new Array();
        this.MillNameSelectList.push({ label: "Select", value: null });
        for (var i = 0; i < this.service.millNameList.length; i++) {
          this.MillNameSelectList.push({
            label: this.service.millNameList[i].millName,
            value: this.service.millNameList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Unit Type");
      }
    );
  }

  //dropdown for refference
  LoadRefference() {
    this.service.getRefference().subscribe(
      (data: Refference[]) => {
        this.service.refferenceList = data;
        this.RefferenceSelectList = new Array();
        this.RefferenceSelectList.push({ label: "Select", value: 0 });
        for (var i = 0; i < this.service.refferenceList.length; i++) {
          this.RefferenceSelectList.push({
            label: this.service.refferenceList[i].name,
            value: this.service.refferenceList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Refference Type");
      }
    );
  }

  currencyId = 2; // This ID for only Currency Dropdown purpose from Basic Type
  //dropdown for Currency
  LoadCurrency() {
    this.service.GetCurrency(this.currencyId).subscribe(
      (data: Refference[]) => {
        this.service.refferenceList = data;
        this.CurrencySelectList = new Array();
        this.CurrencySelectList.push({ label: "Select", value: "" });
        for (var i = 0; i < this.service.refferenceList.length; i++) {
          this.CurrencySelectList.push({
            label: this.service.refferenceList[i].name,
            value: this.service.refferenceList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Refference Type");
      }
    );
  }

  //country dropdown
  LoadCountry() {
    this.poService.GetCountryList().subscribe(
      (data: Country[]) => {
        this.poService.countryList = data;
        this.CountrySelectList = new Array();
        this.CountrySelectList.push({ label: "==Select One==", value: 0 });
        for (var i = 0; i < this.poService.countryList.length; i++) {
          this.CountrySelectList.push({
            label: this.poService.countryList[i].countryName,
            value: this.poService.countryList[i].countryId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "country name");
      }
    );
  }
  //dropdown supplier
  //Get Supplier list

  defaultBuyer = 0;
  async LoadBuyerList() {
    await this.sampleDevService.GetBuyerList().subscribe(
      (data: Buyer[]) => {
        this.sampleDevService.buyerList = data;
        this.BuyerSelectList = new Array();
        this.BuyerSelectList.push({ label: "Select", value: null });
        for (var i = 0; i < this.sampleDevService.buyerList.length; i++) {
          this.BuyerSelectList.push({
            label: this.sampleDevService.buyerList[i].shortName,
            value: this.sampleDevService.buyerList[i].buyerId,
            defaultBuyer: this.sampleDevService.buyerList[i].defaultBuyer,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Buyer List");
      }
    );
  }
  async LoadBuyerListWithDefault() {
    const res = await this.sampleDevService
      .GetBuyerListWithDefault()
      .then((res: Buyer[]) => {
        this.sampleDevService.buyerList = res;
        this.BuyerSelectList = new Array();
        this.BuyerSelectList.push({ label: "Select", value: null });
        for (var i = 0; i < this.sampleDevService.buyerList.length; i++) {
          if (this.sampleDevService.buyerList[i].defaultBuyer == 1) {
            this.defaultBuyer = this.sampleDevService.buyerList[i].buyerId;
          }
          this.BuyerSelectList.push({
            label: this.sampleDevService.buyerList[i].shortName,
            value: this.sampleDevService.buyerList[i].buyerId,
            defaultBuyer: this.sampleDevService.buyerList[i].defaultBuyer,
          });
        }
      })
      .catch((err) => { });
  }

  async LoadBuyerListWithoutPermissionCheck() {
    const res = await this.sampleDevService
      .GetBuyerListWithoutPermissionCheck()
      .then((res: Buyer[]) => {
        this.sampleDevService.buyerList = res;
        this.BuyerSelectList = new Array();
        this.BuyerSelectList.push({ label: "Select", value: null });
        for (var i = 0; i < this.sampleDevService.buyerList.length; i++) {
          if (this.sampleDevService.buyerList[i].defaultBuyer == 1) {
            this.defaultBuyer = this.sampleDevService.buyerList[i].buyerId;
          }
          this.BuyerSelectList.push({
            label: this.sampleDevService.buyerList[i].shortName,
            value: this.sampleDevService.buyerList[i].buyerId,
            defaultBuyer: this.sampleDevService.buyerList[i].defaultBuyer,
          });
        }
      })
      .catch((err) => { });
  }

  LoadTnaTaskList() {
    this.sampleDevService.GetBuyerList().subscribe(
      (data: Buyer[]) => {
        this.sampleDevService.buyerList = data;
        this.BuyerSelectList = new Array();
        this.BuyerSelectList.push({ label: "Select", value: null });
        for (var i = 0; i < this.sampleDevService.buyerList.length; i++) {
          this.BuyerSelectList.push({
            label: this.sampleDevService.buyerList[i].shortName,
            value: this.sampleDevService.buyerList[i].buyerId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Buyer List");
      }
    );
  }

  LoadTrainingTypeList() {
    this.sampleDevService.GetBuyerList().subscribe(
      (data: Buyer[]) => {
        this.sampleDevService.buyerList = data;
        this.BuyerSelectList = new Array();
        this.BuyerSelectList.push({ label: "Select", value: null });
        for (var i = 0; i < this.sampleDevService.buyerList.length; i++) {
          this.BuyerSelectList.push({
            label: this.sampleDevService.buyerList[i].shortName,
            value: this.sampleDevService.buyerList[i].buyerId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Buyer List");
      }
    );
  }

  //Year dropdown list
  defaultYearId = 0;
  LoadYearList() {
    this.forecastService.GetYearDataList().subscribe(
      (data: Year[]) => {
        this.forecastService.yearList = data.sort(
          (a: any, b: any) => a.yearId - b.yearId
        );
        //debugger
        this.YearSelectList = new Array();
        this.YearSelectList.push({ label: "Select", value: null });
        for (var i = 0; i < this.forecastService.yearList.length; i++) {
          this.YearSelectList.push({
            label: this.forecastService.yearList[i].yearName,
            value: this.forecastService.yearList[i].yearId,
          });
        }
        this.defaultYearId = this.YearSelectList.filter(
          (e) => e.label == new Date().getFullYear()
        )[0].value;
      },
      (error) => {
        //debugger
        this.toastr.warning("Failed To Load Data", "Year List");
      }
    );
  }

  //Season dropdown list
  LoadSeasonList(buyerId: number) {
    this.sampleDevService.GetSeasonList(buyerId).subscribe(
      (res: Season[]) => {
        this.sampleDevService.seasonList = res;
        this.SeasonSelectList = new Array();
        this.SeasonSelectList.push({ label: "Select", value: null });
        for (var i = 0; i < this.sampleDevService.seasonList.length; i++) {
          this.SeasonSelectList.push({
            label: this.sampleDevService.seasonList[i].seasonName,
            value: this.sampleDevService.seasonList[i].seasonId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Season List");
      }
    );
  }

  //PO dropdown list
  LoadPOList(buyerId: number, seasonId: number, yearId: number, styleId: number) {
    this.sampleDevService.GetPurchaseOrderList(buyerId, seasonId, yearId, styleId).subscribe(
      (res: Season[]) => {
        this.sampleDevService.poList = res;
        this.POSelectList = new Array();
        this.POSelectList.push({ label: "Select", value: null });
        for (var i = 0; i < this.sampleDevService.poList.length; i++) {
          this.POSelectList.push({
            label: this.sampleDevService.poList[i].orderNo,
            value: this.sampleDevService.poList[i].orderNo,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Season List");
      }
    );
  }


  LoadSizeWiseGroupList() {
    this.sampleDevService.GetSizeWiseGroupList().subscribe(
      (res: any) => {
        this.SizeWiseGroupList = new Array();
        this.SizeWiseGroupList.push({ label: "Select", value: null });
        for (var i = 0; i < res.length; i++) {
          this.SizeWiseGroupList.push({
            label: res[i].groupName,
            value: res[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Size Wise Group List");
      }
    );
  }



  //Season dropdown list
  LoadSeasonList2(buyerId: number) {
    this.sampleDevService.GetSeasonList(buyerId).subscribe(
      (res: Season[]) => {
        this.sampleDevService.seasonList = res;
        this.SeasonSelectList2 = new Array();
        this.SeasonSelectList2.push({ label: "Select", value: null });
        for (var i = 0; i < this.sampleDevService.seasonList.length; i++) {
          this.SeasonSelectList2.push({
            label: this.sampleDevService.seasonList[i].seasonName,
            value: this.sampleDevService.seasonList[i].seasonId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Season List");
      }
    );
  }

  sdColorList: any[];
  sdColorListBackUp: any[];
  sdSizeList: any[];
  sdSizeListBackUp: any[];
  //Color dropdown list For Sample
  LoadColorListForSampleReq(buyerId: number) {
    // debugger
    buyerId = (buyerId == null) ? 0 : buyerId;
    this.sampleDevService.GetColorNameForSampleReq(buyerId).subscribe(
      (res: Season[]) => {
        this.sdColorListBackUp = res;
        this.sdColorList = new Array();
        this.sdColorList.push({ label: "Select", value: null });
        for (var i = 0; i < this.sdColorListBackUp.length; i++) {
          this.sdColorList.push({
            // label: this.sdColorListBackUp[i].sampleColor + '-' + this.sdColorListBackUp[i].colorCode,
            label: this.sdColorListBackUp[i].sampleColor,
            value: this.sdColorListBackUp[i].sampleColor,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Color List");
      }
    );
  }

  LoadBomColorListForSampleReq(quotationNo: string, buyDate: string) {
    // debugger
    quotationNo = (quotationNo == null) ? "" : quotationNo;
    this.sampleDevService.GetBomColorListForSampleReq(quotationNo, buyDate).subscribe(
      (res: Season[]) => {
        if (res.length == 0) {
          this.toastr.warning("Color Not Found in Bom-Po!");
        }
        this.sdColorListBackUp = res;
        this.sdColorList = new Array();
        if (res.length > 0) {
          //this.sdColorList.push({ label: "Select", value: null });
          for (var i = 0; i < this.sdColorListBackUp.length; i++) {
            this.sdColorList.push({
              // label: this.sdColorListBackUp[i].sampleColor + '-' + this.sdColorListBackUp[i].colorCode,
              label: this.sdColorListBackUp[i].sampleColor,
              value: this.sdColorListBackUp[i].sampleColor,
            });
          }
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Color List");
      }
    );
  }

  //Size dropdown list For Sample
  LoadSizeNameForSampleReq(buyerId: number, sizeRangeId: number) {
    // debugger
    this.sampleDevService.GetSizeNameForSampleReq(buyerId, sizeRangeId).subscribe(
      (res: Season[]) => {
        this.sdSizeListBackUp = res;
        this.sdSizeList = new Array();
        this.sdSizeList.push({ label: "Select", value: null });
        for (var i = 0; i < this.sdSizeListBackUp.length; i++) {
          this.sdSizeList.push({
            label: this.sdSizeListBackUp[i].sizeName,
            value: this.sdSizeListBackUp[i].sizeId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Size List");
      }
    );
  }

  LoadBomSizeNameForSampleReq(costingId: number, buyDate: string) {
    // debugger
    this.sampleDevService.GetBomSizeNameForSampleReq(costingId, buyDate).subscribe(
      (res: Season[]) => {
        if(res.length>0){
          this.sdSizeListBackUp = res;
          this.sdSizeList = new Array();
          this.sdSizeList.push({ label: "Select", value: null });
          for (var i = 0; i < this.sdSizeListBackUp.length; i++) {
            this.sdSizeList.push({
              label: this.sdSizeListBackUp[i].sizeName,
              value: this.sdSizeListBackUp[i].sizeId,
            });
          }
        }
        else{
          this.toastr.warning("Bom Size Not Found!");
        }
       
      },
      (error) => {
        this.toastr.error("Failed To Load Data", "Size List");
      }
    );
  }



  //Quation dropdown list
  async LoadQuationList(buyerId: number, styleId: number, seasonId: number, yearId: number) {
    this.quationBackup = await this.costMasterService.GetQuationNoByBuyerStyleSeasonYear(buyerId, styleId, seasonId, yearId);
    this.quationList = new Array();
    this.quationList.push({ label: "Select", value: null });

    if (this.quationBackup.length == 1) {
      this.quationList.push({
        label: this.quationBackup[0].quotationNumber,
        value: this.quationBackup[0].quotationNumber,
      });
    }
    else {
      for (var i = 0; i < this.quationBackup.length; i++) {
        this.quationList.push({
          label: this.quationBackup[i].quotationNumber,
          value: this.quationBackup[i].quotationNumber,
        });
      }

    }
  }


  //Quation dropdown list For Bom
  async LoadQuationListForBom(buyerId: number, styleId: number, seasonId: number, yearId: number) {
    this.quationBackupBom = await this.BomService.GetQuationNoByBuyerStyleSeasonYearForBom(buyerId, styleId, seasonId, yearId);
    this.quationListBom = new Array();
    this.quationListBom.push({ label: "Select", value: null });

    if (this.quationBackupBom.length == 1) {
      this.quationListBom.push({
        label: this.quationBackupBom[0].quotationNumber,

        value: this.quationBackupBom[0].costingId,
      });
    }
    else {
      for (var i = 0; i < this.quationBackupBom.length; i++) {
        this.quationListBom.push({
          label: this.quationBackupBom[i].quotationNumber,
          value: this.quationBackupBom[i].costingId,
        });
      }

    }
  }


  //GetColorNameForBomSetup
  async GetColorNameForBomSetup(buyerId: number) {
    this.colorNameBackupBom = await this.BomService.GetColorNameForBomSetup(buyerId);
    this.colorNameListBom = new Array();
    this.colorNameListBom.push({ label: "Select", value: null });

    if (this.colorNameBackupBom.length == 1) {
      this.colorNameListBom.push({
        label: this.colorNameBackupBom[0].gmtColor + '-' + this.colorNameBackupBom[0].colorCode,

        value: this.colorNameBackupBom[0].gmtColor,
      });
    }
    else {
      for (var i = 0; i < this.colorNameBackupBom.length; i++) {
        this.colorNameListBom.push({
          label: this.colorNameBackupBom[i].gmtColor + '-' + this.colorNameBackupBom[i].colorCode,
          value: this.colorNameBackupBom[i].gmtColor,
        });
      }

    }
  }


  //Quation dropdown list
  async LoadQuationList2(buyerId: number, styleId: number, seasonId: number, yearId: number) {
    this.quationBackup2 = await this.costMasterService.GetQuationNoByBuyerStyleSeasonYear(buyerId, styleId, seasonId, yearId);
    this.quationList2 = new Array();
    this.quationList2.push({ label: "Select", value: null });

    if (this.quationBackup2.length == 1) {
      this.quationList2.push({
        label: this.quationBackup2[0].quotationNumber,
        value: this.quationBackup2[0].quotationNumber,
      });
    }
    else {
      for (var i = 0; i < this.quationBackup2.length; i++) {
        this.quationList2.push({
          label: this.quationBackup2[i].quotationNumber,
          value: this.quationBackup2[i].quotationNumber,
        });
      }

    }
  }

  /*load sample type by zahid*/
  LoadSampleTypeList(buyerId: number) {
    this.SampleTypeService.getSampleTypeData(buyerId).subscribe(
      (res: SampleType[]) => {
        this.SampleTypeService.sampleTypeList = res;
        this.SampleTypeSelectList = new Array();
        this.SampleTypeSelectList.push({ label: "Select", value: null });
        for (var i = 0; i < this.SampleTypeService.sampleTypeList.length; i++) {
          this.SampleTypeSelectList.push({

            label: this.SampleTypeService.sampleTypeList[i].sampleTypeName,
            value: this.SampleTypeService.sampleTypeList[i].sampleTypeId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Sample Type  List");
      }
    );
  }

  LoadBrand(buyerId: number) {
    this.brandService.getBrandData(buyerId).subscribe((data: Brand[]) => {
      this.brandService.brandList = data;
      this.BrandSelectedList = new Array();
      this.BrandSelectedList.push({
        label: "Select",
        value: 0,
      });
      for (var i = 0; i < this.brandService.brandList.length; i++) {
        this.BrandSelectedList.push({
          label: this.brandService.brandList[i].brandName,
          value: this.brandService.brandList[i].brandId,
        });
      }
    });
  }
 

  LoadBrandForPOSalesContact(buyerId: number) {
    this.sampleDevService.GetSCBrandList(buyerId).subscribe((data: any[]) => {
      this.SCBrandSelectedList = new Array();
      this.SCBrandSelectedList.push({ label: "Select", value: 0 });
      console.log('Data', data);

      for (var i = 0; i < data.length; i++) {
        this.SCBrandSelectedList.push({
          label: data[i].brandName,
          value: data[i].parentId,
        });
      }
    });
  }

  LoadShipmentTypeByBuyerId() {
    this.poService.getShippedType().subscribe((data: ShippedType[]) => {
      this.poService.shippedTypeList = data;
      this.ShippedTypeSelectedList = new Array();
      this.ShippedTypeSelectedList.push({
        label: "Select",
        value: 0,
      });
      for (var i = 0; i < this.poService.shippedTypeList.length; i++) {
        this.ShippedTypeSelectedList.push({
          label: this.poService.shippedTypeList[i].shippedTypeName,
          value: this.poService.shippedTypeList[i].shippedTypeId,
        });
      }
    });
  }

  //Style dropdown list
  LoadStyleList() {
    this.orderManagementService.GetStyleInfo().subscribe(
      (data: StyleInfo[]) => {
        this.orderManagementService.styleInfoList = data;
        // console.log("LoadStyleList",data) 
        this.StyleSelectList = new Array();
        this.StyleSelectList.push({ label: "Select", value: 0 });
        for (
          var i = 0;
          i < this.orderManagementService.styleInfoList.length;
          i++
        ) {
          this.StyleSelectList.push({
            label: this.orderManagementService.styleInfoList[i].styleName,
            value: this.orderManagementService.styleInfoList[i].styleId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Style List");
      }
    );
  }
  GetSizeListNew(): Observable<any> {

    return this.http.get<any[]>(this.baseUrl_ + "SizeSetup/GetSizeList", {
      headers: this.token.headerToken(),
    });
  }
  //Style dropdown list by Buyer, Seasin, Year wise
  LoadStyleListByBuyerSeasonYearwise(status: string, buyerId: number, seasonId: number, yearId: number) {
    this.orderManagementService.GetStyleList(status, buyerId, seasonId, yearId).subscribe((data: StyleInfo[]) => {
      this.orderManagementService.styleInfoList = data;
      this.StyleSelectList = new Array();
      this.StyleSelectList.push({ label: "Select", value: 0 });
      //For Costing only
      this.CostingStyleSelectList = new Array();
      this.CostingStyleSelectList.push({ label: "Select", value: 0 });
      //End
      for (
        var i = 0;
        i < this.orderManagementService.styleInfoList.length;
        i++
      ) {
        this.StyleSelectList.push({
          label: this.orderManagementService.styleInfoList[i].styleName,
          value: this.orderManagementService.styleInfoList[i].styleId,
        });
        //For Costing only
        this.CostingStyleSelectList.push({
          label: this.orderManagementService.styleInfoList[i].styleName,
          value: this.orderManagementService.styleInfoList[i].styleId,
        });
        //End  
      }
    },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Style List");
      }
    );
  }

  //Style dropdown list by Buyer, Seasin, Year wise For Bom
  LoadStyleListByBuyerSeasonYearwiseForBom(status: string, buyerId: number, seasonId: number, yearId: number) {
    this.orderManagementService.GetStyleListForBom(status, buyerId, seasonId, yearId).subscribe((data: StyleInfo[]) => {
      this.StyleSelectListForBomBackup = data;
      this.StyleSelectListForBom = new Array();
      this.StyleSelectListForBom.push({ label: "Select", value: 0 });
      for (var i = 0; i < this.StyleSelectListForBomBackup.length; i++) {
        this.StyleSelectListForBom.push({
          label: this.StyleSelectListForBomBackup[i].styleName,
          value: this.StyleSelectListForBomBackup[i].styleId,
        });
      }
    },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Style List");
      }
    );
  }




  //Style dropdown list for CCS
  LoadStyleListByBuyerSeasonYearwiseCCS(status: string, buyerId: number, seasonId: number, yearId: number) {
    this.orderManagementService.GetStyleList(status, buyerId, seasonId, yearId).subscribe((data: StyleInfo[]) => {
      this.orderManagementService.styleInfoList = data;
      this.CostingStyleSelectComparisonList = new Array();
      this.CostingStyleSelectComparisonList.push({ label: "Select", value: 0 });
      for (
        var i = 0;
        i < this.orderManagementService.styleInfoList.length;
        i++
      ) {
        //For Costing comparison sheet
        this.CostingStyleSelectComparisonList.push({
          label: this.orderManagementService.styleInfoList[i].styleName + "-" + this.orderManagementService.styleInfoList[i].seasonYear,
          value: this.orderManagementService.styleInfoList[i].styleId,
        });
        //End     
      }
    },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Style List");
      }
    );
  }


  //Style dropdown list for CCS2
  LoadStyleListByBuyerSeasonYearwiseCCS2(status: string, buyerId: number, seasonId: number, yearId: number) {
    this.orderManagementService.GetStyleList(status, buyerId, seasonId, yearId).subscribe((data: StyleInfo[]) => {
      this.orderManagementService.styleInfoList = data;
      this.CostingStyleSelectComparisonList2 = new Array();
      this.CostingStyleSelectComparisonList2.push({ label: "Select", value: 0 });
      for (
        var i = 0;
        i < this.orderManagementService.styleInfoList.length;
        i++
      ) {
        //For Costing comparison sheet
        this.CostingStyleSelectComparisonList2.push({
          label: this.orderManagementService.styleInfoList[i].styleName + "-" + this.orderManagementService.styleInfoList[i].seasonYear,
          value: this.orderManagementService.styleInfoList[i].styleId,
        });
        //End     
      }
    },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Style List");
      }
    );
  }



  LoadStyleListByBuyerSeasonYearwiseForSampleReq(status: string, buyerId: number, seasonId: number, yearId: number) {
    this.orderManagementService.GetStyleForSampleReq(status, buyerId, seasonId, yearId).subscribe((data: StyleInfo[]) => {
      this.orderManagementService.styleInfoList = data;
      this.StyleSelectList = new Array();
      this.StyleSelectList.push({ label: "Select", value: 0 });
      //For Costing only
      this.CostingStyleSelectList = new Array();
      this.CostingStyleSelectList.push({ label: "Select", value: 0 });
      //End
      for (
        var i = 0;
        i < this.orderManagementService.styleInfoList.length;
        i++
      ) {
        this.StyleSelectList.push({
          label: this.orderManagementService.styleInfoList[i].styleName,
          value: this.orderManagementService.styleInfoList[i].styleId,
        });
        //For Costing only
        this.CostingStyleSelectList.push({
          label: this.orderManagementService.styleInfoList[i].styleName,
          value: this.orderManagementService.styleInfoList[i].styleId,
        });
        //End        
      }
    },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Style List");
      }
    );
  }


  //Style dropdown list by Buyer, Seasin, Year wise
  async LoadStyleListByBuyerSeasonYearwiseToPromise(status: string, buyerId: number, seasonId: number, yearId: number) {
    var styleDevelopmentList = await this.orderManagementService.GetStyleListToPromise(status, buyerId, seasonId, yearId);
    if (styleDevelopmentList.length > 0) {
      this.orderManagementService.styleInfoList = styleDevelopmentList;
      this.StyleSelectList = new Array();
      this.StyleSelectList.push({ label: "Select", value: 0 });
      for (var i = 0; i < this.orderManagementService.styleInfoList.length; i++) {
        this.StyleSelectList.push({
          label: this.orderManagementService.styleInfoList[i].styleName,
          value: this.orderManagementService.styleInfoList[i].styleId,
        });
      }
    }
    else {
      this.toastr.warning("Failed To Load Data", "Style List");
    }
  }



  LoadDescriptionListByStyleItim(styleId: number, itemId: number) {
    this.orderManagementService.GetDescriptionList(styleId, itemId).subscribe((data: any[]) => {
      this.orderManagementService.descriptionList = data;      
      this.DescriptionSelectList = new Array();
      this.DescriptionSelectList.push({ label: "Select", value: "Select" });
      for (var i = 0; i < this.orderManagementService.descriptionList.length; i++) {
        {
          this.DescriptionSelectList.push({
            label: this.orderManagementService.descriptionList[i].description,
            value: this.orderManagementService.descriptionList[i].description,
          });
        }
        //End
      }
    },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Style List");
      }
    );
  }



  //Get pending style by dept.

  GetPendingStyleByDept(dept: string) { }

  GetStyleInfoByBuyerId(buyerId: number) {
    this.orderManagementService.GetStyleInfoByBuyerId(buyerId).subscribe(
      (data: StyleInfo[]) => {
        this.orderManagementService.styleInfoList = data;
        this.StyleSelectList = new Array();
        this.StyleSelectList.push({ label: "Select", value: null });
        for (var i = 0; i < this.orderManagementService.styleInfoList.length; i++) {
          this.StyleSelectList.push({
            label: this.orderManagementService.styleInfoList[i].styleName,
            value: this.orderManagementService.styleInfoList[i].styleId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Style List");
      }
    );
  }

  GetStyleInfoByBuyerIdForZipper(buyerId: number) {
    this.orderManagementService.GetStyleInfoByBuyerId(buyerId).subscribe(
      (data: StyleInfo[]) => {
        this.orderManagementService.styleInfoList = data;
        this.StyleSelectList = new Array();
        this.StyleSelectList.push({ label: "Select", value: null });
        for (var i = 0; i < this.orderManagementService.styleInfoList.length; i++) {
          this.StyleSelectList.push({
            label: this.orderManagementService.styleInfoList[i].styleName,
            value: this.orderManagementService.styleInfoList[i].styleName,

          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Style List");
      }
    );
  }


  GetConfirmStyleInfoByBuyerId(buyerId: number) {
    this.orderManagementService.GetConfirmStyleInfoByBuyerId(buyerId).subscribe(
      (data: StyleInfo[]) => {
        this.orderManagementService.styleInfoList = data;
        var styleListDistinct = this.orderManagementService.styleInfoList.filter((a, i) => this.orderManagementService.styleInfoList.findIndex((s) => a.styleId === s.styleId) === i); // Distinct by StyleId
        this.StyleSelectList = new Array();
        this.StyleSelectList.push({ label: "Select", value: null });
        for (
          var i = 0;
          i < styleListDistinct.length;
          i++
        ) {
          this.StyleSelectList.push({
            label: styleListDistinct[i].styleName,
            value: styleListDistinct[i].styleId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Style List");
      }
    );
  }

  // bytt for repeat style create
  GetConfirmStyleInfoForRepeatStyleByBuyerId(buyerId: number) {
    this.orderManagementService.GetConfirmedStyleListByBuyerForRepeatStyle(buyerId).subscribe(
      (data: StyleInfo[]) => {
        var tempoList = data.filter(x => x.isOnlyConfirm == null || x.isOnlyConfirm == "");
        this.orderManagementService.styleInfoList = tempoList;
        var styleListDistinct = this.orderManagementService.styleInfoList.filter((a, i) => this.orderManagementService.styleInfoList.findIndex((s) => a.styleId === s.styleId) === i); // Distinct by StyleId
        console.log("data", data)
        console.log("styleListDistinct", styleListDistinct)
        this.StyleSelectList = new Array();
        this.StyleSelectList.push({ label: "Select", value: null });
        for (
          var i = 0;
          i < styleListDistinct.length;
          i++
        ) {
          this.StyleSelectList.push({
            label: styleListDistinct[i].styleName,
            value: styleListDistinct[i].styleId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Style List");
      }
    );
  }

  // bytt for confirmed repeat style create
  GetConfirmStyleInfoForConfirmedRepeatStyleByBuyerId(buyerId: number) {
    this.orderManagementService.GetConfirmedStyleListByBuyerForRepeatStyle(buyerId).subscribe(
      (data: StyleInfo[]) => {
        this.orderManagementService.styleInfoList = data;
        var tempoList = this.orderManagementService.styleInfoList.filter((a, i) => this.orderManagementService.styleInfoList.findIndex((s) => a.styleId === s.styleId) === i); // Distinct by StyleId
        var styleListDistinct = tempoList.filter(x => x.status == "Confirmed");
        console.log("data", data)
        console.log("styleListDistinct", styleListDistinct)
        this.StyleSelectList = new Array();
        this.StyleSelectList.push({ label: "Select", value: null });
        for (
          var i = 0;
          i < styleListDistinct.length;
          i++
        ) {
          this.StyleSelectList.push({
            label: styleListDistinct[i].styleName,
            value: styleListDistinct[i].styleId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Style List");
      }
    );
  }

  GetBookingSalesContractByBuyerId(buyerId: number) {
    this.orderManagementService
      .GetBookingSalesContractByBuyerId(buyerId)
      .subscribe(
        (data: any[]) => {
          this.orderManagementService.bookingSalesContractList = data;
          this.BookingSalesContractSelectList = new Array();
          this.BookingSalesContractSelectList.push({
            label: "Select",
            value: null,
          });
          for (
            var i = 0;
            i < this.orderManagementService.bookingSalesContractList.length;
            i++
          ) {
            this.BookingSalesContractSelectList.push({
              label:
                this.orderManagementService.bookingSalesContractList[i]
                  .contractNo,
              value:
                this.orderManagementService.bookingSalesContractList[i]
                  .contractId,
            });
          }
        },
        (error) => {
          this.toastr.warning("Failed To Load Data", "Style List");
        }
      );
  }

  GetBookingSalesContractByBuyerIdSeasonIdYearId(buyerId: number, seasonId: number, yearId: number) {
    this.orderManagementService
      .GetBookingSalesContractByBuyerSeasonYear(buyerId, seasonId, yearId, 0) // 0 means styleId
      .subscribe(
        (data: any[]) => {
          this.orderManagementService.bookingSalesContractList = data;
          this.BookingSalesContractSelectList = new Array();
          this.BookingSalesContractSelectList.push({
            label: "Select",
            value: null,
          });
          for (
            var i = 0;
            i < this.orderManagementService.bookingSalesContractList.length;
            i++
          ) {
            this.BookingSalesContractSelectList.push({
              label:
                this.orderManagementService.bookingSalesContractList[i]
                  .contractNo,
              value:
                this.orderManagementService.bookingSalesContractList[i]
                  .contractId,
            });
          }
        },
        (error) => {
          this.toastr.warning("Failed To Load Data", "Style List");
        }
      );
  }

  //Season BOM dropdown list
  LoadBOMSeasonList(buyerId: number, yearId: number) {
    this.BomService.GetSeasonList(buyerId, yearId).subscribe((res: any[]) => {
      this.bomSeasonList = res;
      this.SeasonSelectList = new Array();
      this.SeasonSelectList.push({ label: "Select", value: null });
      for (var i = 0; i < this.bomSeasonList.length; i++) {
        this.SeasonSelectList.push({
          label: this.bomSeasonList[i].seasonName,
          value: this.bomSeasonList[i].seasonId,
        });
      }
    },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Season List");
      }
    );
  }
  GetSeasonList(buyerId: number, yearId: number): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    return this.http.get<any[]>(
      this.baseUrl_ + "BookingItemList/GetPiSeasonDropDown?buyerId=" + buyerId + "&yearId=" + yearId,
      { headers: this.token.headerToken() }
    );
  }

  //Season PI Entry dropdown list
  LoadPISeasonList(buyerId: number, yearId: number) {
    this.GetSeasonList(buyerId, yearId).subscribe((res: any[]) => {
      this.piSeasonList = res;
      this.SeasonSelectList = new Array();
      this.SeasonSelectList.push({ label: "Select", value: null });
      for (var i = 0; i < this.piSeasonList.length; i++) {
        this.SeasonSelectList.push({
          label: this.piSeasonList[i].seasonName,
          value: this.piSeasonList[i].seasonId,
        });
      }
    },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Season List");
      }
    );
  }

  //Season Manual BOM dropdown list
  LoadManualBOMSeasonList(buyerId: number, yearId: number) {
    this.BomService.GetManualSeasonList(buyerId, yearId).subscribe(
      (res: any[]) => {
        this.bomSeasonList = res;
        this.SeasonSelectList = new Array();
        this.SeasonSelectList.push({ label: "Select", value: null });
        for (var i = 0; i < this.bomSeasonList.length; i++) {
          this.SeasonSelectList.push({
            label: this.bomSeasonList[i].seasonName,
            value: this.bomSeasonList[i].seasonId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Season List");
      }
    );
  }

  GetBOMStyleInfo(buyerId: number, yearId: number, seasonId) {
    this.BomService.GetStyleList(buyerId, yearId, seasonId).subscribe(
      (data: any[]) => {
        this.bomStyleList = data;
        this.StyleSelectList = new Array();
        this.StyleSelectList.push({ label: "Select", value: null });
        for (var i = 0; i < this.bomStyleList.length; i++) {
          this.StyleSelectList.push({
            label: this.bomStyleList[i].styleName,
            value: this.bomStyleList[i].styleId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Style List");
      }
    );
  }

  GetBomList(
    buyerId: number,
    yearId: number,
    seasonId: number,
    styleId: number
  ) {
    this.BomService.GetStyleInfoByBomNo(
      buyerId,
      yearId,
      seasonId,
      styleId
    ).subscribe(
      (data: BomListDropdownModel[]) => {
        this.BomList = data;
        this.BomSelectList = new Array();
        this.BomSelectList.push({ label: "Select", value: null });
        for (var i = 0; i < this.BomList.length; i++) {
          this.BomSelectList.push({
            label: this.BomList[i].bomNo,
            value: this.BomList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Bom List");
      }
    );
  }

  //date load
  Date() {
    this.datePickerConfig = Object.assign(
      {},
      {
        dateInputFormat: "DD/MMM/YYYY",
        containerClass: "theme-dark-blue",
        showWeekNumbers: false,
      }
    );
  }

  //Load landing port Name
  LoadLandingPortList() {
    this.poSettingService.GetLandingPort().subscribe(
      (data: LandingPort[]) => {
        this.poSettingService.landingPortList = data;
        this.LandingPortSelectList = new Array();
        //this.LandingPortSelectList.push({ label: "Select", value: null });
        for (var i = 0; i < this.poSettingService.landingPortList.length; i++) {
          this.LandingPortSelectList.push({
            label: this.poSettingService.landingPortList[i].landingPortName,
            value: this.poSettingService.landingPortList[i].landingPortId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Landing Port Name");
      }
    );
  }

  //Load delivery place name
  LoadDeliveryPlaceList() {
    this.poSettingService.GetDeliveryPlace().subscribe(
      (data: DeliveryPlace[]) => {
        this.poSettingService.deliveryPlaceList = data;
        this.DeliveryPlaceSelectList = new Array();
        this.DeliveryPlaceSelectList.push({ label: "Select", value: null });
        for (
          var i = 0;
          i < this.poSettingService.deliveryPlaceList.length;
          i++
        ) {
          this.DeliveryPlaceSelectList.push({
            label: this.poSettingService.deliveryPlaceList[i].deliveryPlaceName,
            value: this.poSettingService.deliveryPlaceList[i].deliveryPlaceId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Delivery Place Name");
      }
    );
  }

  //for group by a function
  GroupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  //Group by a array
  GroupByArray(array, f) {
    var groups = {};
    array.forEach(function (o) {
      var group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
      return groups[group];
    });
  }

  //Cost Master dropdown
  LoadCostMasterList() {
    this.costMasterService.GetCostingMasterList().subscribe(
      (data: CostingMasterModel[]) => {
        this.costMasterService.costingList = data;
        this.CostMasterSelectList = new Array();
        this.CostMasterSelectList.push({ label: "Select", value: null });
        for (var i = 0; i < this.costMasterService.costingList.length; i++) {
          this.CostMasterSelectList.push({
            label: this.costMasterService.costingList[i].costNumber,
            value: this.costMasterService.costingList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Cost Master");
      }
    );
  }

  BuyerDepartmentList() {
    this.buyerDepartmentService.GetBuyerDepartmentList().subscribe(
      (data: BuyerDepartment[]) => {
        this.buyerDepartmentService.buyerDepartmentList = data;
        this.BuyerDepartmentSelectList = new Array();
        this.BuyerDepartmentSelectList.push({ label: "Select", value: null });
        for (
          var i = 0;
          i < this.buyerDepartmentService.buyerDepartmentList.length;
          i++
        ) {
          this.BuyerDepartmentSelectList.push({
            label: this.buyerDepartmentService.buyerDepartmentList[i].name,
            value: this.buyerDepartmentService.buyerDepartmentList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Buyer Department");
      }
    );
  }

  BuyerDepartmentListByBuyerId(id: number) {
    this.buyerDepartmentService.GetBuyerDepartmentListByBuyerId(id).subscribe(
      (data: BuyerDepartment[]) => {
        this.buyerDepartmentService.buyerWiseDepartmentList = data;
        this.BuyerWiseDepartmentSelectList = [];
        this.BuyerWiseDepartmentSelectList = new Array();
        this.BuyerWiseDepartmentSelectList.push({
          label: "Select",
          value: null,
        });
        for (
          var i = 0;
          i < this.buyerDepartmentService.buyerWiseDepartmentList.length;
          i++
        ) {
          this.BuyerWiseDepartmentSelectList.push({
            label: this.buyerDepartmentService.buyerWiseDepartmentList[i].name,
            value: this.buyerDepartmentService.buyerWiseDepartmentList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Buyer Department");
      }
    );
  }

  BuyerSizeSetList() {
    this.buyerSizeSetServices.GetBuyerSizeSetList().subscribe(
      (data: BuyerSizeSet[]) => {
        this.buyerSizeSetServices.buyerSizeSetList = data;
        this.SizeSelectList = new Array();
        this.SizeSelectList.push({ label: "Select", value: null });
        for (
          var i = 0;
          i < this.buyerSizeSetServices.buyerSizeSetList.length;
          i++
        ) {
          this.SizeSelectList.push({
            label: this.buyerSizeSetServices.buyerSizeSetList[i].sizeRange,
            value: this.buyerSizeSetServices.buyerSizeSetList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Buyer Size Range");
      }
    );
  }
  LoadSizeList() {
    this.buyerSizeSetServices.GetSizeList().subscribe(
      (data: any[]) => {
        this.buyerSizeSetServices.sizeList = data;
        this.SizeSelectedList = new Array();
        this.SizeSelectedList.push({ label: "Select", value: null });
        for (var i = 0; i < this.buyerSizeSetServices.sizeList.length; i++) {
          this.SizeSelectedList.push({
            label: this.buyerSizeSetServices.sizeList[i].sizeName,
            value: this.buyerSizeSetServices.sizeList[i].sizeId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", " Size List");
      }
    );
  }

  BuyerSizeSetListByBuyerID(buyerId: number) {
    this.buyerSizeSetServices.GetBuyerSizeSetByBuyerId(buyerId).subscribe(
      (data: BuyerSizeSet[]) => {
        this.buyerSizeSetServices.buyerSizeSetList = data;
        this.SizeSelectList = new Array();
        this.SizeSelectList.push({ label: "Select", value: 0 });
        for (
          var i = 0;
          i < this.buyerSizeSetServices.buyerSizeSetList.length;
          i++
        ) {
          this.SizeSelectList.push({
            label: this.buyerSizeSetServices.buyerSizeSetList[i].sizeRange,
            value: this.buyerSizeSetServices.buyerSizeSetList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Buyer Size Range");
      }
    );
  }


  /*Zahid*/
  LoadSizeListbyBuyerId(buyerId: number) {
    this.buyerSizeSetServices.GetSizeListBybuyerId(buyerId).subscribe(
      (data: any[]) => {
        this.buyerSizeSetServices.sizeList = data;
        this.BuyerWiseSizeSelectedList = new Array();
        this.BuyerWiseSizeSelectedList.push({ label: "Select", value: null });
        for (var i = 0; i < this.buyerSizeSetServices.sizeList.length; i++) {
          this.BuyerWiseSizeSelectedList.push({
            label: this.buyerSizeSetServices.sizeList[i].sizeName,
            value: this.buyerSizeSetServices.sizeList[i].sizeId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", " Size List");
      }
    );
  }
  GetStyleInfo(id: number) {
    return this.http.get<any>(
      this.baseUrl_ + "StyleSetting/GetStyleListById?styleId=" + id,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  GetStyleInfoToPromise(id: number) {
    return this.http.get<any>(
      this.baseUrl_ + "StyleSetting/GetStyleListById?styleId=" + id,
      {
        headers: this.token.headerToken(),
      }
    ).toPromise();
  }

  /*Zahid-5-4-23 */
  GetStyleById(id: number) {
    return this.http.get<any>(
      this.baseUrl_ + "StyleSetting/GetStyleById?styleId=" + id,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetBuyerDepartmentInfo(id: number) {
    return this.http.get<BuyerDepartment>(
      this.baseUrl_ + "Helper/GetBuyerDepartmentListById?id=" + id,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  //Get Item list
  LoadItemData(processType: string) {
    this.itemService.GetItemList(processType).subscribe((data: Item[]) => {
      this.itemService.itemList = data;
      this.ItemSelectList = new Array();
      this.ItemSelectList.push({ label: "Select", value: 0 });
      for (var i = 0; i < this.itemService.itemList.length; i++) {
        this.ItemSelectList.push({
          label: this.itemService.itemList[i].itemName,
          value: this.itemService.itemList[i].id,
        });
      }
    },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Item name");
      }
    );
  }

  async LoadItemDataTpPromise(processType: string) {
    var ItemListCategoryWise = await this.itemService.GetItemList(processType).toPromise();
    if (ItemListCategoryWise.length > 0) {
      this.itemService.itemList = ItemListCategoryWise;
      this.ItemSelectList = new Array();
      this.ItemSelectList.push({ label: "Select", value: null });
      for (var i = 0; i < this.itemService.itemList.length; i++) {
        this.ItemSelectList.push({
          label: this.itemService.itemList[i].itemName,
          value: this.itemService.itemList[i].id,
        });
      }
    }
  }

  async LoadProcessItemDataToPromise(processType: string) {
    var ItemListCategoryWise = await this.itemService.GetItemList(processType).toPromise();
    if (ItemListCategoryWise.length > 0) {
      this.itemService.processItemList = ItemListCategoryWise;
      this.ProcessItemSelectList = new Array();
      this.ProcessItemSelectList.push({ label: "Select", value: null });
      for (var i = 0; i < this.itemService.itemList.length; i++) {
        this.ProcessItemSelectList.push({
          label: this.itemService.itemList[i].itemName,
          value: this.itemService.itemList[i].id,
        });
      }
    }
  }

  async LoadItemDataFabricPromise(processType: string) {
    var ItemListCategoryWise = await this.itemService.GetItemList(processType).toPromise();
    if (ItemListCategoryWise.length > 0) {
      this.itemService.itemList = ItemListCategoryWise;
      this.ItemFabSelectList = new Array();
      this.ItemFabSelectList.push({ label: "Select", value: null });
      for (var i = 0; i < this.itemService.itemList.length; i++) {
        this.ItemFabSelectList.push({
          label: this.itemService.itemList[i].itemName,
          value: this.itemService.itemList[i].id,
        });
      }
    }
  }


  async LoadItemDataLHPromise(processType: string) {
    var ItemListCategoryWise = await this.itemService.GetItemList(processType).toPromise();
    if (ItemListCategoryWise.length > 0) {
      this.itemService.itemList = ItemListCategoryWise;
      this.ItemLHSelectList = new Array();
      this.ItemLHSelectList.push({ label: "Select", value: null });
      for (var i = 0; i < this.itemService.itemList.length; i++) {
        this.ItemLHSelectList.push({
          label: this.itemService.itemList[i].itemName,
          value: this.itemService.itemList[i].id,
        });
      }
    }
  }


  async LoadItemDataPackagingPromise(processType: string) {
    var ItemListCategoryWise = await this.itemService.GetItemList(processType).toPromise();
    if (ItemListCategoryWise.length > 0) {
      this.itemService.itemList = ItemListCategoryWise;
      this.ItemPackagingList = new Array();
      this.ItemPackagingList.push({ label: "Select", value: null });
      for (var i = 0; i < this.itemService.itemList.length; i++) {
        this.ItemPackagingList.push({
          label: this.itemService.itemList[i].itemName,
          value: this.itemService.itemList[i].id,
        });
      }
    }
  }


  async LoadItemDataProcessPromise(processType: string) {
    var ItemListCategoryWise = await this.itemService.GetItemList(processType).toPromise();
    if (ItemListCategoryWise.length > 0) {
      this.itemService.itemList = ItemListCategoryWise;
      this.ItemProcessList = new Array();
      this.ItemProcessList.push({ label: "Select", value: null });
      for (var i = 0; i < this.itemService.itemList.length; i++) {
        this.ItemProcessList.push({
          label: this.itemService.itemList[i].itemName,
          value: this.itemService.itemList[i].id,
        });
      }
    }
  }



  //Get Component Dropdown list
  async LoadComponentData(processType: string) {
    var ItemListCategoryWise = await this.itemService.GetItemList(processType).toPromise();
    if (ItemListCategoryWise.length > 0) {
      this.itemService.itemList = ItemListCategoryWise;
      this.ComponentSelectList = new Array();
      this.ComponentSelectList.push({ label: "Select", value: null });
      for (var i = 0; i < this.itemService.itemList.length; i++) {
        this.ComponentSelectList.push({
          label: this.itemService.itemList[i].itemName,
          value: this.itemService.itemList[i].id,
        });
      }
      this.LoadedComponentSelectList = this.ComponentSelectList;
      console.log('fabric', this.ComponentSelectList);

    }
    // this.itemService.GetItemList(processType).subscribe(
    //   (data: Item[]) => {
    //     this.itemService.itemList = data;
    //     this.ComponentSelectList = new Array();
    //     this.ComponentSelectList.push({ label: "Select", value: 0 });
    //     for (var i = 0; i < this.itemService.itemList.length; i++) {
    //       this.ComponentSelectList.push({
    //         label: this.itemService.itemList[i].itemName,
    //         value: this.itemService.itemList[i].id,
    //       });
    //     }
    //   },
    //   (error) => {
    //     this.toastr.warning("Failed To Load Data", "Item name");
    //   }
    // );
  }

  async LoadComponentDataForStyle(processType: string) {
    var ItemListCategoryWise = await this.itemService.GetItemListForStyle(processType).toPromise();
    if (ItemListCategoryWise.length > 0) {
      this.itemService.itemList = ItemListCategoryWise;
      this.ComponentSelectList = new Array();
      this.ComponentSelectList.push({ label: "Select", value: 0, styleItemSl: 0 });
      for (var i = 0; i < this.itemService.itemList.length; i++) {
        this.ComponentSelectList.push({
          label: this.itemService.itemList[i].itemName,
          value: this.itemService.itemList[i].id,
          styleItemSl: this.itemService.itemList[i].styleItemSl
        });
      }
      this.LoadedComponentSelectList = this.ComponentSelectList;
    }
  }

  LoadComponentDataForZipper(processType: string) {
    this.itemService.GetItemList(processType).subscribe(
      (data: Item[]) => {
        this.itemService.itemList = data;
        //this.itemService.itemList = this.itemService.itemList.filter(x=> x.id == 106);
        this.ComponentSelectList = new Array();
        this.ComponentSelectList.push({ label: "Select", value: 0 });
        for (var i = 0; i < this.itemService.itemList.length; i++) {
          this.ComponentSelectList.push({
            label: this.itemService.itemList[i].itemName,
            value: this.itemService.itemList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Item name");
      }
    );
  }

  LoadComponentDataForZipperAndFabric() {
    this.itemService.GetItemListForZipperEntry().subscribe(
      (data: Item[]) => {
        this.itemService.itemList = data;
        this.ComponentSelectList = new Array();
        this.ComponentSelectList.push({ label: "Select", value: 0 });
        for (var i = 0; i < this.itemService.itemList.length; i++) {
          this.ComponentSelectList.push({
            label: this.itemService.itemList[i].itemName,
            value: this.itemService.itemList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Item name");
      }
    );
  }



  LoadDescriptionData() {
    this.itemService.GetDescriptionListDropDown().subscribe(
      (data: StCodeModel[]) => {
        this.itemService.stCodeDropDownList = data;
        this.StCodeDescriptionSelectList = new Array();
        this.StCodeDescriptionSelectList.push({ label: "Select", value: 0 });
        for (var i = 0; i < this.itemService.stCodeDropDownList.length; i++) {
          this.StCodeDescriptionSelectList.push({
            label: this.itemService.stCodeDropDownList[i].description,
            value: this.itemService.stCodeDropDownList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "ST Code Description");
      }
    );
  }

  LoadStCodeData() {
    this.itemService.GetSTCodeListDropDown().subscribe(
      (data: StCodeModel[]) => {
        this.itemService.stCodeDropDownList = data;
        this.StCodeSelectList = new Array();
        this.StCodeSelectList.push({ label: "Select", value: 0 });
        for (var i = 0; i < this.itemService.stCodeDropDownList.length; i++) {
          this.StCodeSelectList.push({
            label: this.itemService.stCodeDropDownList[i].stCode,
            value: this.itemService.stCodeDropDownList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "ST Code");
      }
    );
  }

  LoadStCodeDataByBuyerAndItem(buyerId: number, itemId: number) {
    this.itemService
      .GetSTCodeListDropDownByBuyerAndItemId(buyerId, itemId)
      .subscribe(
        (data: StCodeModel[]) => {
          this.itemService.stCodeDropDownList = data;
          this.StCodeSelectList = new Array();
          this.StCodeSelectList.push({ label: "Select", value: 0 });
          for (var i = 0; i < this.itemService.stCodeDropDownList.length; i++) {
            this.StCodeSelectList.push({
              label: this.itemService.stCodeDropDownList[i].stCode,
              value: this.itemService.stCodeDropDownList[i].id,
            });
          }
        },
        (error) => {
          //this.toastr.warning("Failed To Load Data", "ST Code");
        }
      );
  }

  LoadDescriptionDataByBuyerAndItem(buyerId: number, itemId: number) {
    this.itemService
      .GetSTCodeListDropDownByBuyerAndItemId(buyerId, itemId)
      .subscribe(
        (data: StCodeModel[]) => {
          this.itemService.stCodeDropDownList = data;
          this.StCodeDescriptionSelectList = new Array();
          this.StCodeDescriptionSelectList.push({ label: "Select", value: 0 });
          for (var i = 0; i < this.itemService.stCodeDropDownList.length; i++) {
            this.StCodeDescriptionSelectList.push({
              label: this.itemService.stCodeDropDownList[i].description,
              value: this.itemService.stCodeDropDownList[i].id,
            });
          }
        },
        (error) => {
          //this.toastr.warning("Failed To Load Data", "ST Code Description");
        }
      );
  }

  //Get Item list by Category Id
  LoadItemByCategoryId(id: number) {
    this.itemService.GetItemByCategoryId(id).subscribe(
      (data: Item[]) => {
        this.itemService.itemList = data;
        this.ItemSelectList = new Array();
        this.ItemSelectList.push({ label: "Select", value: null });
        for (var i = 0; i < this.itemService.itemList.length; i++) {
          this.ItemSelectList.push({
            label: this.itemService.itemList[i].itemName,
            value: this.itemService.itemList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Item name");
      }
    );
  }

  //Get Item list by Category Group
  LoadItemByCategoryGroup(categoryGroup: string) {
    this.itemService.GetItemByCategoryGroup(categoryGroup).subscribe(
      (data: Item[]) => {
        this.itemService.itemList = data;
        this.ItemSelectList = new Array();
        this.ItemSelectList.push({ label: "Select", value: null });
        for (var i = 0; i < this.itemService.itemList.length; i++) {
          this.ItemSelectList.push({
            label: this.itemService.itemList[i].itemName,
            value: this.itemService.itemList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Item name");
      }
    );
  }

  //load buyer wise po
  LoadBuyerWisePO() { }

  //get Fabric Name
  GetFabricNameFromArray(id: number) {
    var FabricName = this.FabricNameSelectList.find((e) => e.value == id).label;

    return FabricName;
  }

  //Get Supplier Id
  GetSupplierIdFromArray(name: string) {
    var id = this.SupplierSelectList.find(e => e.label == name).value;
    return id;
  }

  //Get Supplier Name
  GetSupplierFromArray(id: number) {
    var supplierName = this.SupplierSelectList.find(
      (e) => e.value == Number(id)
    ).label;
    return supplierName;
  }
  //Get Category Name
  GetCategoryFromArray(id: number) {
    var categoryName = this.CategorySelectList.find(
      (e) => e.value == Number(id)
    ).label;
    return categoryName;
  }

  //Get Style Name
  GetStyleNameFromArray(id: number) {
    var styleName = this.StyleSelectList.find(
      (e) => e.value == Number(id)
    ).label;
    return styleName;
  }
  //Get Process Category Name
  GetProcessCategoryFromArray(id: number) {
    var categoryName = this.ProcessCategorySelectList.find(
      (e) => e.value == Number(id)
    ).label;
    return categoryName;
  }
  //Get Fabric Category Name
  GetFabricCategoryFromArray(id: number) {
    var categoryName = this.FabricCategorySelectList.find(
      (e) => e.value == Number(id)
    ).label;
    return categoryName;
  }

  //get Unit name from unit arrar
  GetUnitNameFromArray(id: number) {
    var unitName = this.UnitTypeList.find((e) => e.value == Number(id)).label;
    return unitName;
  }
  //get Unit name from unit arrar
  GetUnitNameWithTexFromArray(id: number) {
    var unitName = this.unitTypeTexList.find((e) => e.value == Number(id)).label;
    return unitName;
  }
  //Country Name from array
  GetCountryNameFromArray(id: number) {
    var countryName = this.CountrySelectList.find(
      (e) => e.value == Number(id)
    ).label;
    return countryName;
  }

  //get currency name from array
  GetCorrencyNameFromArray(id: number) {
    var currencyName = this.CurrencySelectList.find(
      (e) => e.value == Number(id)
    ).label;
    return currencyName;
  }

  //Get Nomination status
  GetNominationStatus(name: string) {
    return this.statuses.find((e) => e.value == name).label;
  }

  //get Item Accessories name from array
  GetItemNameFromArray(id: number) {
    var itemName = this.ItemSelectList.find((e) => e.value == Number(id)).label;
    return itemName;
  }
  //get Item name from array
  GetComponentItemName(id: number) {
    var itemName = this.ComponentSelectList.find(
      (e) => e.value == Number(id)
    ).label;
    return itemName;
  }
  GetProcessItemName(id: number) {
    var itemName = this.ItemSelectList.find((e) => e.value == Number(id)).label;
    return itemName;
  }

  GetCountryFromArray(id: number) {
    var countryName = this.CountrySelectList.find(
      (e) => e.value == Number(id)
    ).label;
    return countryName;
  }
  GetPriceMoodFromArray(id: number) {
    var priceMoodName = this.PriceModeSelectedList.find(
      (e) => e.value == Number(id)
    ).label;
    return priceMoodName;
  }

  LoadNominationStatus() {
    this.statuses = [
      { label: "Nominated", value: "N" },
      { label: "Own Source", value: "O" },
    ];
  }

  //Load Category name dropdown
  LoadCategory(categoryType) {
    this.categoryServices
      .getCategoryData(categoryType)
      .subscribe((data: Category[]) => {
        this.categoryServices.categoryList = data;
        this.CategorySelectList = new Array();
        this.CategorySelectList.push({ label: "Select", value: null });
        for (var i = 0; i < this.categoryServices.categoryList.length; i++) {
          this.CategorySelectList.push({
            label: this.categoryServices.categoryList[i].categoryName,
            value: this.categoryServices.categoryList[i].id,
          });
        }
      });
  }
  LoadCategoryWithOutFabricProcess(categoryType) {
    this.categoryServices
      .getCategoryData(categoryType)
      .subscribe((data: Category[]) => {
        this.categoryServices.categoryList = data;
        this.CategorySelectList = new Array();
        this.CategorySelectList.push({ label: "Select", value: null });
        for (var i = 0; i < data.length; i++) {
          this.CategorySelectList.push({
            label: data[i].categoryName,
            value: data[i].id,
          });
        }
      });
  }
  //Load Fabric Category name dropdown
  LoadFabricCategory(categoryType) {
    this.categoryServices
      .getCategoryData(categoryType)
      .subscribe((data: Category[]) => {
        this.categoryServices.categoryList = data;
        this.FabricCategorySelectList = new Array();
        this.FabricCategorySelectList.push({ label: "Select", value: 0 });
        for (var i = 0; i < this.categoryServices.categoryList.length; i++) {
          this.FabricCategorySelectList.push({
            label: this.categoryServices.categoryList[i].categoryName,
            value: this.categoryServices.categoryList[i].id,
          });
        }
      });
  }
  //Load Category name for costing process dropdown
  LoadProcessCategory(categoryType) {
    this.categoryServices
      .getCategoryData(categoryType)
      .subscribe((data: Category[]) => {
        this.categoryServices.categoryList = data;
        this.ProcessCategorySelectList = new Array();
        this.ProcessCategorySelectList.push({ label: "Select", value: null });
        for (var i = 0; i < this.categoryServices.categoryList.length; i++) {
          this.ProcessCategorySelectList.push({
            label: this.categoryServices.categoryList[i].categoryName,
            value: this.categoryServices.categoryList[i].id,
          });
        }
      });
  }
  async LoadProcessCategoryToPromise(categoryType) {
    var categoryList = await this.categoryServices.getCategoryDataToPromise(categoryType);
    if (categoryList.length > 0) {
      this.categoryServices.categoryList = categoryList;
      this.ProcessCategorySelectList = new Array();
      this.ProcessCategorySelectList.push({ label: "Select", value: null });
      for (var i = 0; i < this.categoryServices.categoryList.length; i++) {
        this.ProcessCategorySelectList.push({
          label: this.categoryServices.categoryList[i].categoryName,
          value: this.categoryServices.categoryList[i].id,
        });
      }
    }
  }

  //get Cost Master List  by BuyerId, SeasonId, YearId
  CostMasterList(buyerId: number, seasonId: number, yearId: number) {
    return this.http.get<CostingMasterModel[]>(
      this.baseUrl_ +
      "Costing/GetCostingMasterListByBSY?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetSampleFileByFormIdandFileType(fileType: any, id: number): Observable<any> {
    return this.http.get<CommonFiles[]>(
      this.baseUrl_ +
      "File/GetSampleFileListByFileTypeandId?fileType=" + fileType + "&id=" + id,
      { headers: this.token.headerToken() }
    );
  }
  async GetSampleFileByFormIdandFileTypeProm(fileType: any, id: number) {
    return this.http.get<CommonFiles[]>(
      this.baseUrl_ +
      "File/GetSampleFileListByFileTypeandId?fileType=" + fileType + "&id=" + id,
      { headers: this.token.headerToken() }
    ).toPromise();
  }
  //Get UnitItem List
  GetUnitItemList() {
    return this.http.get<UnitItems[]>("http://localhost:50297/api/Unit", {
      headers: this.token.headerToken(),
    });
  }

  GetStyleImageByRefId(refId: number, fileObjectId: number): Observable<any> {
    return this.http.get<CommonFiles[]>(
      this.baseUrl_ + "File/GetFileByRef?refId=" + refId + "&fileObjectId=" + fileObjectId,
      { headers: this.token.headerToken() }
    );
  }
  async GetStyleImageByRefIdProm(refId: number, fileObjectId: number) {
    return this.http.get<CommonFiles[]>(
      this.baseUrl_ + "File/GetFileByRef?refId=" + refId + "&fileObjectId=" + fileObjectId,
      { headers: this.token.headerToken() }
    ).toPromise();
  }


  GetSampleFileByFileTypeId(sampleDevelopmentId: number): Observable<any> {
    return this.http.get<CommonFiles[]>(
      this.baseUrl_ +
      "File/GetSampleFileList?sampleDevelopmentId=" + sampleDevelopmentId,
      { headers: this.token.headerToken() }
    );
  }

  GetPIFileByPIDtlId(piDtlId: number, piVersionNo: number): Observable<any> {
    return this.http.get<CommonFiles[]>(
      this.baseUrl_ +
      "File/GetPIFileByPIDtlId?PiDtlId=" + piDtlId + "&VersionNo=" + piVersionNo,
      { headers: this.token.headerToken() }
    );
  }

  GetPIFileByPIMstId(piMstId: number, piVersionNo: number): Observable<any> {
    return this.http.get<CommonFiles[]>(
      this.baseUrl_ +
      "File/GetPIFileByPIMstId?PiMstId=" + piMstId + "&VersionNo=" + piVersionNo,
      { headers: this.token.headerToken() }
    );
  }


  FileUpload(refId: number, fileComment: string, fileRevised: string, event: string, objectId: number, frmData: FormData): Observable<any> {
    frmData.append("refId", refId.toString());
    frmData.append("fileName", event.toString());
    frmData.append("fileComment", fileComment.toString());
    frmData.append("fileRevised", fileRevised.toString());
    frmData.append("fileObjectId", objectId.toString());
    return this.http.post<any>(this.baseUrl_ + "File/CreateFile", frmData, {
      headers: this.token.headerToken(),
    }).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error);
    })
    )
  }

  UploadPOFile(frmData: FormData): Observable<any> {
    return this.http.post<any>(this.minioBaseUrl_ + "api/uploadFile", frmData, {
      headers: this.token.headerToken(),
    }).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error);
    }));
    //return this.httpClient.post(`${this.url}/uploadFile`, fromData)
  }

  GetUploadedPOFileData(styleId: number): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "File/GetUploadedPOFileData?styleId=" + styleId, {
      headers: this.token.headerToken(),
    });
  }

  GetUploadedPOFileFromMinio(fileUrl: string, bucketName: string) {
    return this.http.get<any>(this.minioBaseUrl_ + "api/getFile?url=" + fileUrl + "&bucketName=" + bucketName, {
      headers: this.token.headerToken(),
    });
  }


  FileUploadThroughMinIO(refId: number, fileComment: string, fileRevised: string, event: string, objectId: number, frmData: FormData): Observable<any> {
    frmData.append("refId", refId.toString());
    frmData.append("fileName", event.toString());
    frmData.append("fileComment", fileComment.toString());
    frmData.append("fileRevised", fileRevised.toString());
    frmData.append("fileObjectId", objectId.toString());
    return this.http.post<any>(this.baseUrl_ + "File/CreateFile", frmData, {
      headers: this.token.headerToken(),
    }).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error);
    })
    )
  }

  FileUploadForStyle(refId: number, fileComment: string, fileRevised: string, event: string, objectId: number, frmData: FormData, saveButtonTitle: string): Observable<any> {
    frmData.append("refId", refId.toString());
    frmData.append("fileName", event.toString());
    frmData.append("fileComment", fileComment.toString());
    frmData.append("fileRevised", fileRevised.toString());
    frmData.append("fileObjectId", objectId.toString());
    frmData.append("saveButtonTitle", saveButtonTitle.toString());
    return this.http.post<any>(this.baseUrl_ + "File/CreateFileForStyle", frmData, {
      headers: this.token.headerToken(),
    }).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error);
    })
    )
  }


  CreateFileForTask(refId: number, fileComment: string, fileRevised: string, event: string, objectId: number, frmData: FormData): Observable<any> {
    frmData.append("refId", refId.toString());
    frmData.append("fileName", event.toString());
    frmData.append("fileComment", fileComment.toString());
    frmData.append("fileRevised", fileRevised.toString());
    frmData.append("fileObjectId", objectId.toString());
    return this.http.post<any>(this.baseUrl_ + "File/CreateFileForTask", frmData, {
      headers: this.token.headerToken(),
    }).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error);
    })
    )
  }

  CreateFileForIDMTraining(refId: number, fileComment: string, fileRevised: string, event: string, objectId: number, frmData: FormData): Observable<any> {
    frmData.append("refId", refId.toString());
    frmData.append("fileName", event.toString());
    frmData.append("fileComment", fileComment.toString());
    frmData.append("fileRevised", fileRevised.toString());
    frmData.append("fileObjectId", objectId.toString());
    return this.http.post<any>(this.baseUrl_ + "File/CreateFileForIDMTraining", frmData, {
      headers: this.token.headerToken(),
    }).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error);
    })
    )
  }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.status === 0) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     console.error(
  //       `Backend returned code ${error.status}, body was: `, error.error);
  //   }
  //   // Return an observable with a user-facing error message.
  //   return throwError(() => new Error('Something bad happened; please try again later.'));
  // }

  FileUploadByProcedure(
    fileName: string,
    fileComment: string,
    fileRevised: string,
    objectId: number,
    frmData: FormData
  ): Observable<any> {
    frmData.append("fileName", fileName.toString());
    frmData.append("fileComment", fileComment.toString());
    frmData.append("fileRevised", fileRevised.toString());
    frmData.append("fileObjectId", objectId.toString());
    return this.http.post<any>(
      this.baseUrl_ + "File/CreateFileByProcedure",
      frmData,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  FileUploadForGatepass(

    refId: number,
    fileComment: string,
    fileRevised: string,
    event: string,
    objectId: number,
    frmData: FormData
  ): Observable<any> {
    frmData.append("refId", refId.toString());
    frmData.append("fileName", event.toString());
    frmData.append("fileComment", fileComment.toString());
    frmData.append("fileRevised", fileRevised.toString());
    frmData.append("fileObjectId", objectId.toString());
    return this.http.post<any>(
      this.baseUrl_ + "File/CreateGatepassFile",
      frmData,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  FileUploadForLeftOver(
    refId: number,
    fileComment: string,
    fileRevised: string,
    event: string,
    objectId: number,
    frmData: FormData
  ): Observable<any> {
    frmData.append("refId", refId.toString());
    frmData.append("fileName", event.toString());
    frmData.append("fileComment", fileComment.toString());
    frmData.append("fileRevised", fileRevised.toString());
    frmData.append("fileObjectId", objectId.toString());
    return this.http.post<any>(
      this.baseUrl_ + "File/CreateLeftoverFile",
      frmData,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  FileUploadForPI(
    refId: number,
    fileComment: string,
    fileRevised: string,
    event: string,
    objectId: number,
    frmData: FormData
  ): Observable<any> {
    frmData.append("refId", refId.toString());
    frmData.append("fileName", event.toString());
    frmData.append("fileComment", fileComment.toString());
    frmData.append("fileRevised", fileRevised.toString());
    frmData.append("fileObjectId", objectId.toString());
    return this.http.post<any>(
      this.baseUrl_ + "File/CreatePIFile",
      frmData,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  deleteFile(id: number): Observable<any> {
    return this.http.delete(this.baseUrl_ + "File/DeleteFile?id=" + id, {
      headers: this.token.headerToken(),
    });
  }

  deleteSampleFile(sampleDevelopmentId: number): Observable<any> {
    return this.http.delete(this.baseUrl_ + "File/DeleteFile?sampleDevelopmentId=" + sampleDevelopmentId, {
      headers: this.token.headerToken(),
    });
  }


  LoadGMTItemList() {
    this.gmtTtemService.GetGMTItemList().subscribe(
      (data: Gmtitem[]) => {
        this.gmtTtemService.gmtItemList = data;
        this.GmtItemSelectList = new Array();
        this.GmtItemSelectList.push({ label: "Select", value: null });
        for (var i = 0; i < this.gmtTtemService.gmtItemList.length; i++) {
          this.GmtItemSelectList.push({
            label: this.gmtTtemService.gmtItemList[i].gmtName,
            value: this.gmtTtemService.gmtItemList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "GMT Item");
      }
    );
  }
  LoadStyleWiseGMTItemByList() {
    //this.gmtTtemService.GetStyleWiseGMTItemList(styleId).subscribe(
    this.gmtTtemService.GetGMTItemList().subscribe(
      (data: Gmtitem[]) => {
        this.gmtTtemService.gmtItemList = data;
        this.GmtItemSelectList = new Array();
        this.GmtItemSelectList.push({ label: "Select", value: null });
        for (var i = 0; i < this.gmtTtemService.gmtItemList.length; i++) {
          this.GmtItemSelectList.push({
            label: this.gmtTtemService.gmtItemList[i].itemName,
            value: this.gmtTtemService.gmtItemList[i].itemId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "GMT Item");
      }
    );
  }

  //Load Style Fabric Head Data for dropdown
  LoadFabricHead(id: number) {
    this.orderManagementService.GetFabricHead(id).subscribe((data: StyleFabricHead[]) => {
      this.orderManagementService.fabricHeadList = data;
      this.FabricHeadSelectedList = new Array();
      this.FabricHeadSelectedList.push({ label: "Select", value: 0 });
      for (
        var i = 0;
        i < this.orderManagementService.fabricHeadList.length;
        i++
      ) {
        this.FabricHeadSelectedList.push({
          label: this.orderManagementService.fabricHeadList[i].headName,
          value: this.orderManagementService.fabricHeadList[i].id,
        });
      }
    });
  }

  //Load Style Part Data for dropdown
  LoadStylePart(styleId: number) {
    this.orderManagementService.GetStylePartByStyleId(styleId).subscribe((data: StylePart[]) => {
      this.orderManagementService.stylePartList = data;
      this.StylePartSelectedList = new Array();
      this.StylePartSelectedList.push({ label: "Select", value: null });
      for (var i = 0; i < this.orderManagementService.stylePartList.length; i++) {
        this.StylePartSelectedList.push({
          label: this.orderManagementService.stylePartList[i].partName,
          value: this.orderManagementService.stylePartList[i].id,
        });
      }
    });
  }

  //Load Style Part Data for dropdown by promise
  async LoadStylePartPromise(styleId: number) {
    //this.orderManagementService.GetStylePartByStyleId(styleId).subscribe((data: StylePart[]) => {
    this.orderManagementService.stylePartList = await this.orderManagementService.GetStylePartByStyleIdPromise(styleId);
    this.StylePartSelectedList = new Array();
    this.StylePartSelectedList.push({ label: "Select", value: null });
    for (var i = 0; i < this.orderManagementService.stylePartList.length; i++) {
      this.StylePartSelectedList.push({
        label: this.orderManagementService.stylePartList[i].partName,
        value: this.orderManagementService.stylePartList[i].id,
      });
    }
    //});
  }


  //Load Style Part Setup Data for dropdown
  LoadStylePartSetup() {
    this.orderManagementService
      .GetStyleParSetup()
      .subscribe((data: StylePartSetup[]) => {
        this.orderManagementService.stylePartSetupList = data;
        this.StylePartSetupSelectedList = new Array();
        this.StylePartSetupSelectedList.push({ label: "Select", value: 0 });
        for (
          var i = 0;
          i < this.orderManagementService.stylePartSetupList.length;
          i++
        ) {
          this.StylePartSetupSelectedList.push({
            label: this.orderManagementService.stylePartSetupList[i].partName,
            value: this.orderManagementService.stylePartSetupList[i].id,
          });
        }
      });
  }

  //Load Style Fabric Data By Part Id for dropdown
  LoadStyleFabricList(stylePartId: number) {
    this.orderManagementService.GetStyleFabricByPartId(stylePartId).subscribe((data: StyleInfo[]) => {
      this.orderManagementService.styleFabricList = data;
      this.StyleFabricSelectedList = new Array();
      this.StyleFabricSelectedList.push({ label: "Select", value: null });
      for (
        var i = 0;
        i < this.orderManagementService.styleFabricList.length;
        i++
      ) {
        this.StyleFabricSelectedList.push({
          label: this.orderManagementService.styleFabricList[i].description,
          value: this.orderManagementService.styleFabricList[i].id,
        });
      }
    });
  }

  LoadStyleFabricDescriptionList(stylePartId: number) {
    this.orderManagementService.GetStyleFabricByPartId(stylePartId).subscribe((data: StyleInfo[]) => {
      this.orderManagementService.styleFabricList = data;
      this.FabricDescriptionSelectedList = new Array();
      this.FabricDescriptionSelectedList.push({ label: "Select", value: null });
      for (var i = 0; i < this.orderManagementService.styleFabricList.length; i++) {
        this.FabricDescriptionSelectedList.push({
          label: this.orderManagementService.styleFabricList[i].description,
          value: this.orderManagementService.styleFabricList[i].id,
        });
      }
    });
  }
  GetAllSizePOByStyleId(buyerId: number, seasonId: number, yearId: number, styleId: number): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "BookingCad/GetAllSizePOByStyleId?buyerId=" + buyerId + "&seasonId=" + seasonId +  "&yearId=" + yearId +  "&styleId=" + styleId, {
      headers: this.token.headerToken(),
    });
  }

  GetAllSizePOByBuyDate(buyerId: number, seasonId: number, yearId: number, styleId: number, buyDates: string): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "BookingCad/GetAllSizePOByBuyDate?buyerId=" + buyerId + "&seasonId=" + seasonId +  "&yearId=" + yearId +  "&styleId=" + styleId +  "&buyDates=" + buyDates,  {
      headers: this.token.headerToken(),
    });
  }


  
  GetCategoryName(id: number): string {
    return this.orderManagementService.fabricHeadList.find((x) => x.id == id)
      .categoryName;
  }

  ValidationShow(customForm: FormGroup) {
    Object.keys(customForm.controls).forEach((field) => {
      const control = customForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
  //GatePassEmplyeeDepartmentList
  LoadGatePassEmplyeeDepartmentList() {
    debugger
    this.evoteService.GetGatePassEmployeeDepartmentList().subscribe(
      (res: GatePassEmployeeType[]) => {
        debugger
        this.gatePassDepartmentList = res;
        this.GatePassEmployeeDepartmentList = new Array();
        this.GatePassEmployeeDepartmentList.push({
          label: "Select",
          value: null,
        });
        for (var i = 0; i < this.gatePassDepartmentList.length; i++) {
          this.GatePassEmployeeDepartmentList.push({
            label: this.gatePassDepartmentList[i].department,
            value: this.gatePassDepartmentList[i].department,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Employee List");
      }
    );
  }

  //GatePassEmplyeeList
  LoadGatePassEmplyeeList() {
    this.evoteService.GetGatePassEmployeeList().subscribe(
      (res: GatePassEmployeeType[]) => {
        this.gatePassEmployeeList = res;
        this.gatePassEmployeeListBackup = res;
        this.GatePassEmployeeList = new Array();
        //this.GatePassEmployeeList.push({ label: "Select", value: null });
        for (var i = 0; i < this.gatePassEmployeeList.length; i++) {
          this.GatePassEmployeeList.push({
            label:
              this.gatePassEmployeeList[i].employeeName +
              "-" +
              this.gatePassEmployeeList[i].employeeId +
              "-" +
              this.gatePassEmployeeList[i].department,
            value: this.gatePassEmployeeList[i].employeeId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Employee List");
      }
    );
  }


  //GatePass ReqNo List
  GatePassReqNoList() {
    this.evoteService.GatePassReqNoListLoad().subscribe(
      (res: any[]) => {
        this.logReqList = res;
        this.logReqListBackup = res;
        this.logReqList = new Array();
        for (var i = 0; i < this.logReqListBackup.length; i++) {
          this.logReqList.push({
            label: this.logReqListBackup[i].reqNo,
            value: this.logReqListBackup[i].reqNo,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Left over Req List");
      }
    );
  }


  //Get All Task Team Setup Employee List
  LoadSetupEmployeeList() {
    this.taskService.GetAllTaskTeamSetupEmployeeList().subscribe(
      (res: any[]) => {
        this.teamEmployeeList = res;
        this.teamEmployeeListBackup = res;
        this.TeamSetupEmployeeList = new Array();
        //this.GatePassEmployeeList.push({ label: "Select", value: null });
        for (var i = 0; i < this.teamEmployeeList.length; i++) {
          this.TeamSetupEmployeeList.push({
            label:
              this.teamEmployeeList[i].employeeName +
              "-" +
              this.teamEmployeeList[i].employeeId +
              "-" +
              this.teamEmployeeList[i].department +
              "-" +
              this.teamEmployeeList[i].section,
            value: this.teamEmployeeList[i].employeeId,
          });
        }
        console.log(this.TeamSetupEmployeeList);
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Employee List");
      }
    );
  }


  GetItemListForBomFile(
    buyerId: number,
    yearId: number,
    seasonId: number,
    styleId: number
  ) {
    this.BomService.GetItemInfoForBomApprovalFile(
      buyerId,
      yearId,
      seasonId,
      styleId
    ).subscribe(
      (data: ItemListDropdownForBOMFileModel[]) => {
        this.ItemListForBomFile = data;
        this.ItemListForBomFileSelectList = new Array();
        this.ItemListForBomFileSelectList.push({
          label: "Select",
          value: null,
        });
        for (var i = 0; i < this.ItemListForBomFile.length; i++) {
          this.ItemListForBomFileSelectList.push({
            label: this.ItemListForBomFile[i].itemName,
            value: this.ItemListForBomFile[i].materialId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Bom List");
      }
    );
  }

  GetBookPayModeDropdown() {
    this.BomService.GetBookPayModeDropDown().subscribe(
      (data: BookPayModeModel[]) => {
        this.BookPayModeList = data;
        this.BookPayModeSelectList = new Array();
        //this.BookPayModeSelectList.push({ label: "SELECT", value: null });
        for (var i = 0; i < this.BookPayModeList.length; i++) {
          this.BookPayModeSelectList.push({
            label: this.BookPayModeList[i].paymodeName,
            value: this.BookPayModeList[i].paymodeId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Pay Mode List");
      }
    );
  }

  GetBookTenorDropdown() {
    this.BomService.GetTenorDropDown().subscribe(
      (data: TenorDropdownModel[]) => {
        this.BookTenorList = data;
        this.BookTenorSelectList = new Array();
        //this.BookTenorSelectList.push({ label: "SELECT", value: null });
        for (var i = 0; i < this.BookTenorList.length; i++) {
          this.BookTenorSelectList.push({
            label: this.BookTenorList[i].tenorName,
            value: this.BookTenorList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Tenor List");
      }
    );
  }

  GetBookTenorTypeDropdown() {
    this.BomService.GetTenorTypeDropDown().subscribe(
      (data: TenorTypeModel[]) => {
        this.BookTypeTenorList = data;
        this.BookTypeTenorSelectList = new Array();
        //this.BookTypeTenorSelectList.push({ label: "SELECT", value: null });
        for (var i = 0; i < this.BookTypeTenorList.length; i++) {
          this.BookTypeTenorSelectList.push({
            label: this.BookTypeTenorList[i].tenorType,
            value: this.BookTypeTenorList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Tenor Type List");
      }
    );
  }

  GetBookTermofDeliveryDropdown() {
    this.BomService.GetTermofdeliveryDropDown().subscribe(
      (data: TermOfDeliveryModel[]) => {
        this.BookTermofDeliveryList = data;
        this.BookTermofDeliverySelectList = new Array();
        /*this.BookTermofDeliverySelectList.push({
          label: "SELECT",
          value: null,
        });*/
        for (var i = 0; i < this.BookTermofDeliveryList.length; i++) {
          this.BookTermofDeliverySelectList.push({
            label: this.BookTermofDeliveryList[i].deliveryName,
            value: this.BookTermofDeliveryList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Term Of Delivery List");
      }
    );
  }

  LoadBuyerListForLog() {
    this.sampleDevService.GetBuyerListForLeftOver().subscribe(
      (data: Buyer[]) => {
        this.sampleDevService.buyerList = data;
        this.BuyerSelectList = new Array();
        for (var i = 0; i < this.sampleDevService.buyerList.length; i++) {
          this.BuyerSelectList.push({
            label: this.sampleDevService.buyerList[i].shortName,
            value: this.sampleDevService.buyerList[i].buyerId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Buyer List");
      }
    );
  }

  LoadBuyerListForLeftOver() {
    this.sampleDevService.GetBuyerList().subscribe(
      (data: Buyer[]) => {
        this.sampleDevService.buyerList = data;
        this.BuyerSelectList = new Array();
        for (var i = 0; i < this.sampleDevService.buyerList.length; i++) {
          this.BuyerSelectList.push({
            label: this.sampleDevService.buyerList[i].shortName,
            value: this.sampleDevService.buyerList[i].buyerId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Buyer List");
      }
    );
  }
  GetStyleInfoByBuyerIdForLog(buyerId: number, index: number) {
    this.orderManagementService.GetStyleInfoByBuyerId(buyerId).subscribe(
      (data: StyleInfo[]) => {
        for (var item of data) {
          item.styleNameYear = item.styleName + " - (" + item.yearName + ")";
        }
        this.orderManagementService.styleInfoList = data;
        var queryList = data.map(element => (({ styleId, styleName, seasonName, yearName }) => ({ styleId, styleName, seasonName, yearName }))(element));
        var distinctList = queryList.filter((a, i) => queryList.findIndex((s) => a.styleId === s.styleId) === i); // Distinct by StyleId
        this.StyleSelectList[index] = new Array();
        for (
          var i = 0;
          i < distinctList.length;
          i++
        ) {
          this.StyleSelectList[index].push({
            label: distinctList[i].styleName + "- (" + distinctList[i].seasonName + "-" + distinctList[i].yearName + ")",
            value: distinctList[i].styleId,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Style List");
      }
    );
  }

  LoadItemCategoryData() {
    this.trimsLibraryService.GetItemCategoryList().subscribe((data: any[]) => {
      this.trimsLibraryService.trimsLibraryList = data;
      this.ItemCategorySelectList = new Array();
      this.ItemCategorySelectList.push({ label: "Select", value: 0 });
      for (var i = 0; i < this.trimsLibraryService.trimsLibraryList.length; i++) {
        this.ItemCategorySelectList.push({
          label: this.trimsLibraryService.trimsLibraryList[i].itemCategoryName,
          value: this.trimsLibraryService.trimsLibraryList[i].id,
        });
      }
    },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Item Category name");
      }
    );
  }


  //GatePassEmplyeeSectionListByDepartment
  LoadGatePassEmplyeeSectionListByDepartment(dept: string) {
    this.evoteService.GetGatePassEmployeeSectionListByDept(dept).subscribe(
      (res: any[]) => {
        this.gatePassSectionListByDepartment = res;
        this.GatePassSectionListByDept = new Array();
        for (var i = 0; i < this.gatePassSectionListByDepartment.length; i++) {
          this.GatePassSectionListByDept.push({
            label: this.gatePassSectionListByDepartment[i].section,
            value: this.gatePassSectionListByDepartment[i].section,
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Section List");
      }
    );
  }


  //Get Buyer Code ForFabric Library
  GetBuyerCodeForFabricLibrary() {
    this.flService.GetBuyerCodeForFabricLibrary().subscribe((res: any[]) => {
      this.buyerCodeForFabricLibraryBackup = res;
      console.log("Buyer", this.buyerCodeForFabricLibraryBackup);
      this.buyerCodeForFabricLibrary = new Array();
      for (var i = 0; i < this.buyerCodeForFabricLibraryBackup.length; i++) {
        this.buyerCodeForFabricLibrary.push({
          label: this.buyerCodeForFabricLibraryBackup[i].fabLibraryBuyerCode,
          value: this.buyerCodeForFabricLibraryBackup[i].fabLibraryBuyerCode,
        });
      }
    },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Section List");
      }
    );
  }

  //Get Supplier Code For Fabric Library
  GetSupplierCodeForFabricLibrary() {
    this.flService.GetSupplierCodeForFabricLibrary().subscribe((res: any[]) => {
      this.supplierCodeForFabricLibraryBackup = res;
      this.supplierCodeForFabricLibrary = new Array();
      for (var i = 0; i < this.supplierCodeForFabricLibraryBackup.length; i++) {
        this.supplierCodeForFabricLibrary.push({
          label: this.supplierCodeForFabricLibraryBackup[i].supplierCode,
          value: this.supplierCodeForFabricLibraryBackup[i].supplierCode,
        });
      }
    },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Section List");
      }
    );
  }


  //Get Importer  Code For Fabric Library
  GetImporterCodeForFabricLibrary() {
    this.flService.GetAprrovelHsTemplatesList().subscribe((res: any[]) => {
      this.ImporterCodeForFabricLibraryBackup = res;
      this.ImporterCodeForFabricLibrary = new Array();
      for (var i = 0; i < this.ImporterCodeForFabricLibraryBackup.length; i++) {
        this.ImporterCodeForFabricLibrary.push({
          label: this.ImporterCodeForFabricLibraryBackup[i].companyCode,
          value: this.ImporterCodeForFabricLibraryBackup[i].companyCode,
        });
      }
    },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Section List");
      }
    );
  }

  //Get Importer  Name For Fabric Library
  GetImporterNameForFabricLibrary() {
    this.flService.GetAprrovelHsTemplatesList().subscribe((res: any[]) => {
      this.ImporterNameForFabricLibraryBackup = res;
      this.ImporterNameForFabricLibrary = new Array();
      for (var i = 0; i < this.ImporterNameForFabricLibraryBackup.length; i++) {
        this.ImporterNameForFabricLibrary.push({
          label: this.ImporterNameForFabricLibraryBackup[i].branchOfficeName,
          value: this.ImporterNameForFabricLibraryBackup[i].id,
        });
      }
    },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Section List");
      }
    );
  }


  //GetHSSnowtexListFabricLib
  GetHSSnowtexListFabricLib() {
    this.flService.GetHSSnowtexList().subscribe((res: any[]) => {
      this.IHSSnowtexForFabricLibraryBackup = res;
      this.IHSSnowtexForFabricLibrary = new Array();
      for (var i = 0; i < this.IHSSnowtexForFabricLibraryBackup.length; i++) {
        this.IHSSnowtexForFabricLibrary.push({
          label: this.IHSSnowtexForFabricLibraryBackup[i].hsCode,
          value: this.IHSSnowtexForFabricLibraryBackup[i].hsCode,
        });
      }
    },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Section List");
      }
    );
  }



  FileUploadForTrainer(

    refId: number,
    fileComment: string,
    fileRevised: string,
    event: string,
    objectId: number,
    frmData: FormData
  ): Observable<any> {
    frmData.append("refId", refId.toString());
    frmData.append("fileName", event.toString());
    frmData.append("fileComment", fileComment.toString());
    frmData.append("fileRevised", fileRevised.toString());
    frmData.append("fileObjectId", objectId.toString());
    return this.http.post<any>(
      this.baseUrl_ + "File/CreateTrainerFile",
      frmData,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  GetTrainingFilesByRefId(refId: number, fileObjectId: number): Observable<any> {
    return this.http.get<any>(
      this.baseUrl_ +
      "File/GetFilesForTrainingByRef?refId=" +
      refId +
      "&fileObjectId=" +
      fileObjectId,
      { headers: this.token.headerToken() }
    );
  }
  GetVehicleFilesByRefId(refId: any, fileObjectId: number): Observable<any> {
    return this.http.get<any>(
      this.baseUrl_ +
      "File/GetFilesForVehicleByRef?refId=" +
      refId +
      "&fileObjectId=" +
      fileObjectId,
      { headers: this.token.headerToken() }
    );
  }
  LoadContractualBuyer() {
    this.poService.GetContractualBuyerInfo().subscribe((data: any[]) => {
      var tempolist = data;
      this.contractualBuyerList.push({ label: "--Select Contractual Buyer--", value: 0 });
      for (var i = 0; i < tempolist.length; i++) {
        this.contractualBuyerList.push({
          label: tempolist[i].contractualBuyerName,
          value: tempolist[i].id,
        });
      }
    }, error => {
      this.toastr.warning("Failed To Load Data", "Contractual Buyer List");
    });
  }
  LoadGmtCategoryWizeSubCategory(category: string) {
    this.gmtSubTypeInfoList = [];
    this.poService.GetgmtSubTypeInfo().subscribe((data: any[]) => {
      data;
      var tempGmtSubCat = data.filter(x => x.gmtTypeName.toUpperCase() == category.toUpperCase());
      this.gmtSubTypeInfoList.push({ label: "--Select GMT Sub Category--", value: 0 });
      for (var i = 0; i < tempGmtSubCat.length; i++) {
        this.gmtSubTypeInfoList.push({
          label: tempGmtSubCat[i].gmtSubTypeName,
          value: tempGmtSubCat[i].id,
        });
      }
    }, error => {
      this.toastr.warning("Failed To Load Data", "GMT Sub Category List");
    });
  }
  LoadGmtCategoryWizeSubCategoryForThread(categoryId: number) {
    this.gmtSubTypeInfoList = [];
    this.poService.GetgmtSubTypeInfo().subscribe((data: any[]) => {
      data;
      var tempGmtSubCat = data.filter(x => x.GmtTypeId == categoryId);
      this.gmtSubTypeInfoList.push({ label: "--Select GMT Sub Category--", value: 0 });
      for (var i = 0; i < data.length; i++) {
        this.gmtSubTypeInfoList.push({
          label: data[i].gmtSubTypeName,
          value: data[i].id,
        });
      }
    }, error => {
      this.toastr.warning("Failed To Load Data", "GMT Sub Category List");
    });
  }


  //dropdown r3 version type
  LoadR3Version() {
    this.r3VersionList = [];
    this.poService.GetR3Version().subscribe((data: any[]) => {
      data;
      this.r3VersionList.push({ label: "--Select R3 Version Category--", value: 0 });
      for (var i = 0; i < data.length; i++) {
        this.r3VersionList.push({
          label: data[i].versionNo,
          value: data[i].id,
        });
      }
    }, error => {
      this.toastr.warning("Failed To Load Data", "R3 Version List");
    });
  }


  //Bestseller Blocking Setup
  LoadBestsellerBlocking() {
    this.blockingSetupList = [];
    this.poService.GetBestsellerBlocking().subscribe((data: any[]) => {
      data;
      this.blockingSetupList.push({ label: "--Select Bestseller Blocking Option--", value: 0 });
      for (var i = 0; i < data.length; i++) {
        this.blockingSetupList.push({
          label: data[i].blocking,
          value: data[i].id,
        });
      }
    }, error => {
      this.toastr.warning("Failed To Load Data", "Bestseller Blocking Setup");
    });
  }

  GetFinYear() {
    return this.http.get(this.baseUrl2_ + "FinYear/GetFinYearList", {
      headers: this.token.headerToken(),
    });
  }

  GetLocationsByUserId(userId: number) {
    return this.http.get(
      this.baseUrl2_ + "Location/GetLocationsByUserId?userId=" + userId,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  CreateLocationForUser(obj: any) {
    console.log(obj);
    return this.http.post(
      this.baseUrl2_ + "Location/CreateLocationForUser",
      obj,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetErrorLogList(): Observable<any> {
    return this.http.get<any[]>(this.baseUrlErLog_ + "GetAllErrorLogsList", {
      headers: this.token.headerToken(),
    });
  }


  GetHoConsumptionMasterData(buyerId: number, yearId: number, seasonId: number, styleId: number): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ + "ThreeStepChecking/GetHoConsumptionMasterData?buyerId=" + buyerId + "&yearId=" + yearId + "&seasonId=" + seasonId + "&styleId=" + styleId,
      { headers: this.token.headerToken() }
    );
  }

  GetHoConsumptionDetailsData(buyerId: number, yearId: number, seasonId: number, styleId: number, poNoBuydtMarge: string, poBuydateColorGroup: string, masterGroupName, versionNo: number): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ + "ThreeStepChecking/GetHoConsumptionDetailsData?buyerId=" + buyerId + "&yearId=" + yearId + "&seasonId=" + seasonId + "&styleId=" + styleId + "&poBuyDateMarge=" + poNoBuydtMarge + "&poBuydateColorGroup=" + poBuydateColorGroup + "&masterGroupName=" + masterGroupName + '&versionNo=' + versionNo,
      { headers: this.token.headerToken() }
    );
  }

  // GetHoConsumptionDetailsData(bookingCadMasterId: number): Observable<any> {
  //   return this.http.get<any[]>(
  //     this.baseUrl_ + "ThreeStepChecking/GetHoConsumptionDetailsData?bookingCadMasterId=" + bookingCadMasterId,
  //     { headers: this.token.headerToken() }
  //   );
  // }

  GetCadConsumptionMasterData(buyerId: number, yearId: number, seasonId: number, styleId: number): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ + "ThreeStepChecking/GetCadConsumptionMasterData?buyerId=" + buyerId + "&yearId=" + yearId + "&seasonId=" + seasonId + "&styleId=" + styleId,
      { headers: this.token.headerToken() }
    );
  }

  GetCadConsumptionDetailsData(buyerId: number, yearId: number, seasonId: number, styleId: number, poBuyDateGroup: string, poBuydateColorGroup: string, masterGroupName): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ + "ThreeStepChecking/GetCadConsumptionDetailsData?buyerId=" + buyerId + "&yearId=" + yearId + "&seasonId=" + seasonId + "&styleId=" + styleId + "&poBuyDateGroup=" + poBuyDateGroup + "&poBuydateColorGroup=" + poBuydateColorGroup + "&masterGroupName=" + masterGroupName,
      { headers: this.token.headerToken() }
    );
  }
}

