import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { BomFileApproveModel } from "../model/bom-attached-file-ref.model";
import { BomColorDetailsModel } from "../model/bom-color-details.model";
import { BomColorSetupDetailsModel } from "../model/bom-color-setup.model";
import { BomEntryManualMaster } from "../model/bom-entry-manual-master.model";
import { BomEntryManualModel } from "../model/bom-entry-manual.model";
import { BomListDropdownModel } from "../model/bom-list-dropdown.model";
import { BomListModel } from "../model/bom-list.model";
import { BomMaterialConsumptionModel } from "../model/bom-material-consumption.model";
import { BomQuotationModel } from "../model/bom-quotation-model";
import { BomQuotationPOModel } from "../model/bom-quotation-po.model";
import { BomSheetDataReconciliationModel } from "../model/bom-reconciliation.model";
import { BomSheetDataModel } from "../model/bom-sheet-data.model";
import { BomSizeDetailsModel } from "../model/bom-size-details.model";
import { BomSizeSetupDetailsModel } from "../model/bom-size-setup.model";
import { BomStringModel } from "../model/bom-string.moel";
import { BomSummaryModel } from "../model/bom-summary.model";
import { BookPayModeModel } from "../model/book-paymode-dropdown.model";
import { ItemWiseBookingDeleteModel } from "../model/ItemWiseBookingDelete.model";
import { PoDataReconciliationModel } from "../model/oerder-reconciliation.model";
import { PreCostingAppStylyListModel } from "../model/pre-costing-app-styleList.model";
import { QuotationwiseBOMStatusModel } from "../model/quotation-wise-bom-status.model";
import { StylewisePOQtyModel } from "../model/style-wise-po-qty.model";
import { BomMaterialSubmitModel } from "../model/submit-form-model";
import { TenorDropdownModel } from "../model/tenor-dropdown.model";
import { TenorTypeModel } from "../model/tenor-type-dropdown.model";
import { TermOfDeliveryModel } from "../model/term-delivery.model";
import { BOMSizeColorUploadModel } from "../../BOM/model/bom-size-color-upload";


@Injectable({
  providedIn: "root",
})
export class BOMService {
  headers = {};
  baseUrl = environment.apiUrl + "merchandising/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");

  auth_token = null;
  BookingFormBomList: BomSheetDataModel[];
  BookingItemList: any[] = new Array();
  BookingItemList1 = new BehaviorSubject<any[]>(this.BookingItemList);
  s: Observable<any[]> = this.BookingItemList1.asObservable();
  BookingBasicInfoFromBom: BomListModel;
  FromBom: boolean = false;

  constructor(private http: HttpClient, private token: TokenService) { }

  //Get All BOM Process data
  GetBOMAllProcessList(seasonId: number, yearId: number, buyerId: number, styleId: number, bomId: number, costingId: number, basedOn: string,
    fob: number, startWeek: number, startYear: number, endWeek: number, endYear: number, forecastQty: number, buyDate: string): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costingId == null) {
      costingId = 0;
    }
    if (fob == undefined) {
      fob = 0;
    }
    if (startWeek == null) {
      startWeek = 0;
    }
    if (startYear == null) {
      startYear = 0;
    }
    if (endWeek == null) {
      endWeek = 0;
    }
    if (endYear == null) {
      endYear = 0;
    }
    if (forecastQty == null) {
      forecastQty = 0;
    }
    return this.http.get<any>(
      this.baseUrl_ +
      "BillOfMaterial/BillOfMaterialProcessData?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&bomId=" +
      bomId +
      "&costingId=" +
      costingId +
      "&basedOn=" +
      basedOn +
      "&fob=" +
      fob +
      "&startWeek=" +
      startWeek +
      "&startYear=" +
      startYear +
      "&endWeek=" +
      endWeek +
      "&endYear=" +
      endYear +
      "&forecastQty=" +
      forecastQty +
      "&buyDate=" +
      buyDate,
      { headers: this.token.headerToken() }
    );
  }

  GetBomProjectionAllProcessList(obj:any): Observable<any>{
    console.log('BOM Projection Save', JSON.stringify(obj));
    return this.http.post<any>(
      this.baseUrl_ +
      "BillOfMaterial/BillOfMaterialProjectionProcess", obj,
      { headers: this.token.headerToken() }
    );
  }

  //Get All BOM Process data
  GetBOMAllProcessListToPromise(seasonId: number, yearId: number, buyerId: number, styleId: number, bomId: number, costingId: number, basedOn: string,
    fob: number, startWeek: number, startYear: number, endWeek: number, endYear: number, forecastQty: number, buyDate: string) {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costingId == null) {
      costingId = 0;
    }
    if (fob == undefined) {
      fob = 0;
    }
    if (startWeek == null) {
      startWeek = 0;
    }
    if (startYear == null) {
      startYear = 0;
    }
    if (endWeek == null) {
      endWeek = 0;
    }
    if (endYear == null) {
      endYear = 0;
    }
    if (forecastQty == null) {
      forecastQty = 0;
    }
    return this.http.get<any>(
      this.baseUrl_ +
      "BillOfMaterial/BillOfMaterialProcessData?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&bomId=" +
      bomId +
      "&costingId=" +
      costingId +
      "&basedOn=" +
      basedOn +
      "&fob=" +
      fob +
      "&startWeek=" +
      startWeek +
      "&startYear=" +
      startYear +
      "&endWeek=" +
      endWeek +
      "&endYear=" +
      endYear +
      "&forecastQty=" +
      forecastQty +
      "&buyDate=" +
      buyDate,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

 async StyleSizeSaveForDktBOM(bomId: number,costingId: number, styleSizeList: any[]) {
    var body = {
      BomId: bomId,
      CostingId: costingId,
      StyleSizeList: styleSizeList
    }
    console.log('Style Size Save', JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "BillOfMaterial/StyleSizeSaveForDktBOM", body, {
      headers: this.token.headerToken(),
    }).toPromise();
  }

  //Get All BOM Process data
  GetBOMAllProcessListForColumbia(
    seasonId: number,
    yearId: number,
    buyerId: number,
    styleId: number,
    bomId: number

  ): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (bomId == null) {
      bomId = 0;
    }

    return this.http.get<any>(
      this.baseUrl_ +
      "BillOfMaterial/BillOfMaterialProcessDataForColumbia?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&bomId=" +
      bomId,
      { headers: this.token.headerToken() }
    );
  }

  GetBOMBookDoneListByBuyerId(buyerId:number,  seasonId: number, yearId: number,): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }

    return this.http.get<any>(
      this.baseUrl_ +
        "BookingItemList/GetBOMBookDoneListByBuyerId?buyerId=" +
        buyerId +
        "&seasonId=" +
        seasonId +
        "&yearId=" +
        yearId,
      { headers: this.token.headerToken() }
    );
  }

  GetBOMBookDoneListByBuyerIdToPromise(buyerId:number,  seasonId: number, yearId: number,) {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    return this.http.get<any[]>(
      this.baseUrl_ +
        "BookingItemList/GetBOMBookDoneListByBuyerId?buyerId=" +
        buyerId +
        "&seasonId=" +
        seasonId +
        "&yearId=" +
        yearId,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  //Get All PO Selected data
  GetBOMAllPOSelectionList(
    seasonId: number,
    yearId: number,
    buyerId: number,
    styleId: number,
    basedOn: string,
    costingId: number,
    fob: number
  ): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }

    return this.http.get<any>(
      this.baseUrl_ +
      "BillOfMaterial/BillOfMaterialPOSelectedData?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&basedOn=" +
      basedOn +
      "&costingId=" +
      costingId +
      "&fob=" +
      fob,
      { headers: this.token.headerToken() }
    );
  }

  //BOM Sheet Process data
  BOMSheetProcess(
    seasonId: number,
    yearId: number,
    buyerId: number,
    styleId: number,
    bomNo: string,
    basedOn: string
  ): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    //"BillOfMaterial/BillOfMaterialSheetGenerateProcess?buyerId="
    console.log('From Service bom no is : ' + bomNo);
    return this.http.get<any>(
      this.baseUrl_ + "BillOfMaterial/BillOfMaterialSheetGenerateProcess?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&bomNo=" +
      encodeURIComponent(bomNo) +
      "&basedOn=" +
      basedOn,
      { headers: this.token.headerToken() }
    );
  }

  //BOM Sheet Re Genarate Process data
  BOMSheetProcessReGenarate(
    seasonId: number,
    yearId: number,
    buyerId: number,
    styleId: number,
    bomNo: string,
    basedOn: string
  ): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    return this.http.get<any>(
      this.baseUrl_ + "BillOfMaterial/BillOfMaterialSheetReGenerateProcess?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&bomNo=" +
      encodeURIComponent(bomNo) +
      "&basedOn=" +
      basedOn,
      { headers: this.token.headerToken() }
    );
  }

  //Get Summary
  GetBOMSummary(
    seasonId: number,
    yearId: number,
    buyerId: number,
    styleId: number,
    costingId: number,
    buyDate: string
  ): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costingId == null) {
      costingId = 0;
    }
    return this.http.get<BomSummaryModel>(
      this.baseUrl_ +
      "BillOfMaterial/GetAllBomSummaryData?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costingId=" +
      costingId +
      "&buyDate=" +
      buyDate,
      { headers: this.token.headerToken() }
    );
  }
  //Get Summary Sequence wise
  GetBOMSummaryToPromise(
    seasonId: number,
    yearId: number,
    buyerId: number,
    styleId: number,
    costingId: number,
    buyDate: string
  ) {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costingId == null) {
      costingId = 0;
    }
    return this.http.get<BomSummaryModel>(
      this.baseUrl_ +
      "BillOfMaterial/GetAllBomSummaryData?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costingId=" +
      costingId +
      "&buyDate=" +
      buyDate,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  //Get only Selection Summary Sequence wise
  GetSelectionBOMSummaryToPromise(seasonId: number, yearId: number, buyerId: number, styleId: number, costingId: number) {
    return this.http.get<BomSummaryModel>(
      this.baseUrl_ +
      "BillOfMaterial/GetSelectionBomSummaryData?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costingId=" +
      costingId,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  //Get Summary
  GetBOMSummaryForfactory(
    seasonId: number,
    yearId: number,
    buyerId: number,
    styleId: number
  ): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<BomSummaryModel>(
      this.baseUrl_ +
      "BillOfMaterial/GetAllBomSummaryDataForFactory?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId,
      { headers: this.token.headerToken() }
    );
  }

  //Get ItemList
  GetBOMItemList(
    bomNo: string,
    seasonId: number,
    yearId: number,
    buyerId: number,
    styleId: number,
    costingId: number,
    bomId: number,
  ): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costingId == null) {
      costingId = 0;
    }
    if (bomId == null) {
      bomId = 0;
    }

    return this.http.get<any[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetAllBomItemListData?bomNo=" +
      encodeURIComponent(bomNo) +
      "&buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costingId=" +
      costingId +
      "&bomId=" +
      bomId,
      { headers: this.token.headerToken() }
    );
  }
  //Get ItemList Sequence Wise
  GetBOMItemListToPromise(
    bomNo: string,
    seasonId: number,
    yearId: number,
    buyerId: number,
    styleId: number,
    costingId: number,
    bomId: number,
  ) {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costingId == null) {
      costingId = 0;
    }
    if (bomId == null) {
      bomId = 0;
    }
    return this.http.get<BomMaterialConsumptionModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetAllBomItemListData?bomNo=" +
      encodeURIComponent(bomNo) +
      "&buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costingId=" +
      costingId +
      "&bomId=" +
      bomId,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  //Get BOM Sheet ItemList
  GetBOMSheetItemList(seasonId: number, yearId: number, buyerId: number, styleId: number, costingId: number, buyDate: string): Observable<any> {

    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    //"BillOfMaterial/GetAllBomSheetListData?bomNo="
    return this.http.get<BomSheetDataModel>(
      this.baseUrl_ + "BillOfMaterial/GetAllBomSheetListData?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costingId=" +
      costingId +
      "&buyDate=" +
      buyDate,
      { headers: this.token.headerToken() }
    );
  }

  GetStyleWiseCombinedBomSheet(
    buyerId: number,
    yearId: number,
    seasonId: number,
    styleId: number
  ) {
    return this.http.get<BomSheetDataModel>(
      this.baseUrl_ + "BillOfMaterial/GetAllBomSheetCombinedData?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId,
      { headers: this.token.headerToken() }
    );
  }


  //Get BOM Sheet Data
  GetBOMSheetItemListData(bomId: number, seasonId: number, yearId: number, buyerId: number, styleId: number): Observable<any> {

    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<BomSheetDataModel>(
      this.baseUrl_ + "BillOfMaterial/GetAllBomSheetListDataForSheetGenerate?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&bomId=" +
      bomId,
      { headers: this.token.headerToken() }
    );
  }



  DeleteBOMSheetItemList(seasonId: number, yearId: number, buyerId: number, styleId: number, costingId: number, buyDate: string): Observable<any> {

    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<any>(
      this.baseUrl_ + "BillOfMaterial/DeleteBomSheetListData?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costingId=" +
      costingId +
      "&buyDate=" +
      buyDate,
      { headers: this.token.headerToken() }
    );
  }

  //Get BOM Sheet ItemList Factory
  GetManualBOMSheetItemListFactory(bomNo: string, seasonId: number, yearId: number, buyerId: number, styleId: number): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    //"BillOfMaterial/GetAllBomSheetListData?bomNo="
    return this.http.get<BomSheetDataModel>(
      this.baseUrl_ + "BillOfMaterial/GetAllManualBomSheetListData?bomNo=" +
      bomNo +
      "&buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId,
      { headers: this.token.headerToken() }
    );
  }


  //Get BOM Sheet ItemList For Approval
  GetBOMSheetItemListForApproveFile(bomId: number, seasonId: number, yearId: number, buyerId: number, styleId: number): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    //"BillOfMaterial/GetAllBomSheetListData?bomNo="
    return this.http.get<BomSheetDataModel>(
      this.baseUrl_ + "BillOfMaterial/GetAllBomSheetApprovalListData?bomId=" +
      bomId +
      "&buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId,
      { headers: this.token.headerToken() }
    );
  }

  //Get BOM Sheet ItemList Manual Entry
  GetManualBOMSheetItemList(seasonId: number, yearId: number, buyerId: number, styleId: number): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    //"BillOfMaterial/GetAllBomSheetListData?bomNo="
    return this.http.get<BomSheetDataModel>(
      this.baseUrl_ + "BillOfMaterial/GetAllBomSheetManualListData?seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&buyerId=" +
      buyerId +
      "&styleId=" +
      styleId,
      { headers: this.token.headerToken() }
    );
  }

  //Get BOM Sheet ItemList
  GetBOMSheetItemListForBooking(bomNo: string, seasonId: number, yearId: number, buyerId: number, styleId: number, supplierId: number): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (supplierId == null) {
      supplierId = 0;
    }
    return this.http.get<BomSheetDataModel>(
      this.baseUrl_ +
      "BillOfMaterial/GetAllBomSheetListDataForBooking?bomNo=" +
      encodeURIComponent(bomNo) +
      "&buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&supplierId=" +
      supplierId,
      { headers: this.token.headerToken() }
    );
  }

  //Get ColorList
  GetBOMColorDetails(
    bomNo: number,
    seasonId: number,
    yearId: number,
    buyerId: number,
    styleId: number
  ): Observable<any> {

    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<BomColorDetailsModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetAllBomColorItemListData?bomNo=" +
      encodeURIComponent(bomNo) +
      "&buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId,
      { headers: this.token.headerToken() }
    );
  }

  //Get ColorList
  GetBOMColorDetailsForfactory(
    seasonId: number,
    yearId: number,
    buyerId: number,
    styleId: number
  ): Observable<any> {

    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<BomColorDetailsModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetAllBomColorItemListDataForFactory?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId,
      { headers: this.token.headerToken() }
    );
  }

  //Get SizeList
  GetBOMSizeDetails(
    bomNo: number,
    seasonId: number,
    yearId: number,
    buyerId: number,
    styleId: number
  ): Observable<any> {

    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<BomSizeDetailsModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetAllBomSizeItemListData?bomNo=" +
      encodeURIComponent(bomNo) +
      "&buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId,
      { headers: this.token.headerToken() }
    );
  }

  //Get SizeList
  GetBOMSizeDetailsToPromicse(bomNo: string, seasonId: number, yearId: number, buyerId: number, styleId: number) {
    return this.http.get<BomSizeDetailsModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetAllBomSizeItemListData?bomNo=" +
      encodeURIComponent(bomNo) +
      "&buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  //Get SizeList
  GetBOMDktSizeDetailsShowToPromise(bomId: number, seasonId: number, yearId: number, buyerId: number, styleId: number) {
    return this.http.get<BomSizeDetailsModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetBOMSizeDetailsForDktShow?bomId=" +
      bomId +
      "&buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  //Get Froecast BOM Size List
  GetForecastBOMSizeDetails(bomId: number) {
    if (bomId == null) {
      bomId = 0;
    }
    return this.http.get<any[]>(this.baseUrl_ + "BillOfMaterial/GetForecastBOMSizeDetails?bomId=" + bomId,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  //Get Forecast Size List
  GetForecastSizeDetails(costingId: number) {
    if (costingId == null) {
      costingId = 0;
    }
    return this.http.get<any[]>(this.baseUrl_ + "BillOfMaterial/GetForecastSizeDetails?costingId=" + costingId,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  //Get PO Size List
  GetPOSizeDetails(costingId: number, styleId: number) {
    return this.http.get<any[]>(this.baseUrl_ + "BillOfMaterial/GetPOSizeDetails?costingId=" + costingId +
      "&styleId=" +
      styleId,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  //Get SizeList for factory
  GetBOMSizeDetailsForFactory(
    seasonId: number,
    yearId: number,
    buyerId: number,
    styleId: number
  ): Observable<any> {

    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<BomSizeDetailsModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetAllBomSizeItemListDataForFactory?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId,
      { headers: this.token.headerToken() }
    );
  }
  //Get Size Setup List
  GetBOMSizeSetUpDetails(
    bomNo: string, id: number

  ): Observable<any> {
    if (id == null) {
      id = 0;
    }
    return this.http.get<BomSizeSetupDetailsModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetAllBomItemSizeSetupListData?id=" +
      id +
      "&bomNo=" +
      encodeURIComponent(bomNo),
      { headers: this.token.headerToken() }
    );
  }

  //Get zipper Size Setup List
  ItemSizeModel: BomMaterialConsumptionModel = new BomMaterialConsumptionModel();
  GetBOMZipperSizeSetUpDetails(
    buyerId: number, styleName: string,
    bomNo: string,
    id: number,
    styleId: number,
    description: string,
    placement: string,
    partId: number,
    partName: string,
    bomItemId: number,
    bomId: number,
    callFrom: string,
    isSizeBomSetup: number,
  ): Observable<any> {
    if (id == null) { id = 0; }
    this.ItemSizeModel.id = id;
    this.ItemSizeModel.bomNo = bomNo;
    this.ItemSizeModel.styleId = styleId;
    this.ItemSizeModel.description = description;
    this.ItemSizeModel.itemPlacement = placement;
    this.ItemSizeModel.stylePartId = partId;
    this.ItemSizeModel.bomItemId = bomItemId;
    this.ItemSizeModel.buyerId = buyerId;
    this.ItemSizeModel.styleName = styleName;
    this.ItemSizeModel.stylePart = partName;
    this.ItemSizeModel.bomId = bomId;
    this.ItemSizeModel.callFrom = callFrom;
    this.ItemSizeModel.isSizeBomSetup = isSizeBomSetup;
    console.log(JSON.stringify(this.ItemSizeModel));

    return this.http.post<BomSizeSetupDetailsModel[]>(this.baseUrl_ + "BillOfMaterial/GetAllBomItemZipperSizeSetupListData", this.ItemSizeModel, { headers: this.token.headerToken() }
    );
  }

  //Get color Setup List 11
  GetBOMColorSetUpDetails(bomNo: string, id: number, partId: number, itemId: number, mkuId: number, styleId: number, buyerId: number): Observable<any> {
    if (id == null) {
      id = 0;
    }
    if (partId == null) {
      partId = 0;
    }
    return this.http.get<BomColorSetupDetailsModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetAllBomItemColorSetupListData?id=" +
      id +
      "&bomNo=" +
      encodeURIComponent(bomNo) +
      "&partId=" +
      partId +
      "&itemId=" +
      itemId +
      "&mkuId=" +
      mkuId +
      "&styleId=" +
      styleId+"&buyerId="+buyerId,
      { headers: this.token.headerToken() }
    );
  }

  //Get color Setup List For Dkt
  async GetBOMColorSetUpDetailsForDkt(bomNo: string, id: number, partId: number, itemId: number, mkuId: number, styleId: number, StylePartId: number, bomId: number) {
    if (bomId == null) {
      bomId = 0;
    }
    if (id == null) {
      id = 0;
    }
    if (partId == null) {
      partId = 0;
    }
    return this.http.get<BomColorSetupDetailsModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetAllBomItemColorSetupListForDkt?id=" +
      id +
      "&bomNo=" +
      encodeURIComponent(bomNo) +
      "&partId=" +
      partId +
      "&itemId=" +
      itemId +
      "&mkuId=" +
      mkuId +
      "&styleId=" +
      styleId +
      "&stylePartId=" +
      StylePartId +
      "&bomId=" +
      bomId,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  GetBOMColorSetUpDetailsForColorCode(
    bomNo: string, id: number, itemId: number, styleId: number, partId: number, mkuId: number, itemType: string, callFrom: string, isColorBomSetup: number
  ): Observable<any> {
    if (id == null) {
      id = 0;
    }
    if (itemId == null) {
      itemId = 0;
    }
    if (partId == null) {
      partId = 0;
    }
    if (mkuId == null) {
      mkuId = 0;
    }
    if (isColorBomSetup == null) {
      isColorBomSetup = 0;
    }
    return this.http.get<BomColorSetupDetailsModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetAllBomItemColorSetupListDataForColorCode?id=" +
      id +
      "&bomNo=" +
      encodeURIComponent(bomNo) +
      "&item=" +
      itemId +
      "&styleId=" +
      styleId +
      "&partId=" +
      partId +
      "&mkuId=" +
      mkuId +
      "&itemType=" +
      itemType +
      "&callFrom=" +
      callFrom +
      "&isColorBomSetup=" +
      isColorBomSetup,
      { headers: this.token.headerToken() }
    );
  }

  //po Setup
  GetBOMPoSetUpDetails(buyerId: number,
    bomNo: string, id: number, bomId: number): Observable<any> {
    if (id == null) {
      id = 0;
    }
    return this.http.get<any[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetAllBomItemPoListData?id=" +
      id +
      "&bomNo=" +
      encodeURIComponent(bomNo)
      + "&buyerId=" + buyerId
      + "&bomId=" + bomId,
      { headers: this.token.headerToken() }
    );
  }

  //Confirm BOM
  BOMConfirmCreate(bomCreate: BomMaterialSubmitModel, bomCreateList: BomMaterialConsumptionModel[]) {
    var body = {
      ...bomCreate,
      BomCreateList: bomCreateList
    }
    console.log('Confirm json Data');
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "BillOfMaterial/CreateBomItemFullSave", body, {
      headers: this.token.headerToken(),
    });
  }
  //New Item Save in BOM List
 async CreateNewItemForBOM(bomItemCreate: any) {
    console.log('New Item For BOM', JSON.stringify(bomItemCreate));
    return this.http.post<any>(this.baseUrl_ + "BillOfMaterial/CreateNewItemForBOM", bomItemCreate, {
      headers: this.token.headerToken(),
    }).toPromise();
  }

  //Confirm BOM
  async BOMConfirmCreateToPromise(bomCreate: BomMaterialSubmitModel, bomCreateList: BomMaterialConsumptionModel[]) {
    var body = {
      ...bomCreate,
      BomCreateList: bomCreateList
    }
    console.log('Confirm json Data');
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "BillOfMaterial/CreateBomItemFullSave", body, {
      headers: this.token.headerToken(),
    }).toPromise();
  }

  //Item Color Setup
  BOMItemColorSetupCreate(bomColorSetupCreate: BomMaterialSubmitModel, bomColorSetupDetails: BomColorSetupDetailsModel[]) {
    var body = {
      ...bomColorSetupCreate,
      BomCreateItemColorSetup: bomColorSetupDetails
    }
    console.log('color Data', JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "BillOfMaterial/CreateBomItemColorSetupData", body, {
      headers: this.token.headerToken(),
    });
  }

  async UpdateColorFact(obj: any){
    return this.http.post<any>(this.baseUrl_ + "BillOfMaterial/UpdateColorFact", obj, { headers: this.token.headerToken() }
    ).toPromise();
  }
  async UpdateSizeFact(obj: any){
    return this.http.post<any>(this.baseUrl_ + "BillOfMaterial/UpdateSizeFact", obj, { headers: this.token.headerToken() }
    ).toPromise();
  }
  async UpdatePOFact(obj: any){
    return this.http.post<any>(this.baseUrl_ + "BillOfMaterial/UpdatePOFact", obj, { headers: this.token.headerToken() }
    ).toPromise();
  }

  //Item Size Setup
  BOMItemSizeSetupCreate(bomSizeSetupCreate: BomMaterialSubmitModel, bomSizeSetupDetails: BomSizeSetupDetailsModel[]) {
    var body = {
      ...bomSizeSetupCreate,
      BomCreateItemSizeSetup: bomSizeSetupDetails
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "BillOfMaterial/CreateBomItemSizeSetupData", body, {
      headers: this.token.headerToken(),
    });
  }
  GetSeasonList(buyerId: number, yearId: number): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    return this.http.get<BomListDropdownModel[]>(
      this.baseUrl_ + "BillOfMaterial/GetBomSeasonDropDown?buyerId=" + buyerId + "&yearId=" + yearId,
      { headers: this.token.headerToken() }
    );
  }

  GetManualSeasonList(buyerId: number, yearId: number): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    return this.http.get<BomListDropdownModel[]>(
      this.baseUrl_ + "BillOfMaterial/GetManualBomSeasonDropDown?buyerId=" + buyerId + "&yearId=" + yearId,
      { headers: this.token.headerToken() }
    );
  }

  GetStyleList(buyerId: number, yearId: number, seasonId: number): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    return this.http.get<BomListDropdownModel[]>(
      this.baseUrl_ + "BillOfMaterial/GetBomStyleDropDown?buyerId=" + buyerId + "&yearId=" + yearId + "&seasonId=" + seasonId,
      { headers: this.token.headerToken() }
    );
  }

  GetStyleInfoByBomNo(
    buyerId: number,
    yearId: number,
    seasonId: number,
    styleId: number): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<BomListDropdownModel[]>(
      this.baseUrl_ + "BillOfMaterial/GetBomNoListDropDown?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId,
      { headers: this.token.headerToken() }
    );
  }

  //Get BOM Reconciliation
  GetBOMItemListReconciliation(
    bomNo: number,
    seasonId: number,
    yearId: number,
    buyerId: number,
    styleId: number
  ): Observable<any> {

    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<BomSheetDataReconciliationModel>(
      this.baseUrl_ +
      "BillOfMaterial/GetAllBomSheetListDataReconciliation?bomNo=" +
      bomNo +
      "&buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId,
      { headers: this.token.headerToken() }
    );
  }

  //Get Order Reconciliation
  GetPoItemListReconciliation(
    bomNo: number,
    seasonId: number,
    yearId: number,
    buyerId: number,
    styleId: number
  ): Observable<any> {

    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<PoDataReconciliationModel>(
      this.baseUrl_ +
      "BillOfMaterial/GetAllPOListDataReconciliation?bomNo=" +
      bomNo +
      "&buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId,
      { headers: this.token.headerToken() }
    );
  }

  //Get BOM Sheet ItemList
  GetBOMList(): Observable<any> {
    return this.http.get<BomListModel>(
      this.baseUrl_ +
      "BillOfMaterial/GetAllBOMList",
      { headers: this.token.headerToken() }
    );
  }

  GetBOMMasterList(buyerId: number, seasonId: number, yearId: number, styleId: number, costingId: number, buyDate: string): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costingId == null) {
      costingId = 0;
    }
    if (buyDate == null || buyDate == undefined) {
      buyDate = "";
    }


    return this.http.get<BomListDropdownModel[]>(
      this.baseUrl_ + "BillOfMaterial/GetBuyerwiseBomMasterData?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costingId=" +
      costingId +
      "&buyDate=" +
      buyDate,
      { headers: this.token.headerToken() }
    );
  }

  GetManualBOMMasterList(buyerId: number, seasonId: number, yearId: number): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }

    return this.http.get<BomListDropdownModel[]>(
      this.baseUrl_ + "BillOfMaterial/GetBuyerwiseManualBomMasterData?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId,
      { headers: this.token.headerToken() }
    );
  }


  GetBOMFollowupDailyWorkList(buyerId: number, seasonId: number, yearId: number): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }

    return this.http.get<BomListDropdownModel[]>(
      this.baseUrl_ + "BillOfMaterial/GetBOMFollowupDailyWorkList?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId,
      { headers: this.token.headerToken() }
    );
  }

  

  GetBOMFollowupVersionDataList(buyerId: number, seasonId: number, yearId: number, followupId: number): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }

    if (followupId == null) {
      followupId = 0;
    }

    return this.http.get<BomListDropdownModel[]>(
      this.baseUrl_ + "BillOfMaterial/GetBOMFollowupVersionDataList?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&followupId=" +
      followupId,
      { headers: this.token.headerToken() }
    );
  }

  itemBomMasterData: any;
  //Get BOM Sheet ItemList from bom
  GetBOMSheetItemListForBookingFromBom(buyerId: number, selectedItemUrlId: number): Observable<any> {
    var body = {
      ...this.itemBomMasterData,
      urlId: selectedItemUrlId,
      buyerId: buyerId
    }
    console.log(JSON.stringify(body));
    return this.http.post<BomSheetDataModel>(this.baseUrl_ + "BillOfMaterial/GetAllBOMListComesFromBom", body, {
      headers: this.token.headerToken(),
    });
  }
  
  // GetBOMSheetItemListForBookingFromBom_Old(itemIdList: string): Observable<any> {
  //   var body = {
  //     ...this.itemBomMasterData,
  //     ItemIdList: itemIdList
  //   }
  //   console.log(JSON.stringify(body));
  //   return this.http.post<BomSheetDataModel>(this.baseUrl_ + "BillOfMaterial/GetAllBOMListComesFromBom", body, {
  //     headers: this.token.headerToken(),
  //   });
  // }

  //Get Buyer Wise BOM Master
  GetBuyerwiseBOMList(): Observable<any> {
    return this.http.get<BomListModel>(
      this.baseUrl_ +
      "BillOfMaterial/GetAllBuyerwiseBOMList",
      { headers: this.token.headerToken() }
    );
  }

  //Get Buyer Wise BOM Sheet ItemList
  GetBuyerwiseBOMSheetItemList(buyerId: number, seasonId: number, yearId: number): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    return this.http.get<any[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetAllBuyerwiseBomSheetListData?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId,
      { headers: this.token.headerToken() }
    );
  }


  GetShortOrExtraByItemCode(styleName : string, modelCode : string, itemName : string, gmtSize : string, dsmCode : string, refCode : string, itemColor : string, itemSize : string): Observable<any> {
    return this.http.get<any>(
      this.baseUrl_ +
      "BillOfMaterial/GetShortOrExtraByItemCode?StyleName=" +
      styleName +
      "&ModelCode=" +
      modelCode +
      "&ItemName=" +
      itemName +
      "&GmtSize=" +
      gmtSize+
      "&DsmCode=" +
      dsmCode +
      "&RefCode=" +
      refCode+
      "&ItemColor=" +
      itemColor  +
      "&ItemSize=" +
      itemSize,
      { headers: this.token.headerToken() }
    );
  }

  BomManualCreate(bomItemMaster: BomEntryManualMaster, bomItemList: BomEntryManualModel[]) {
    // console.log(JSON.stringify(bookingitemcreate));     
    var body = {
      ...bomItemMaster,
      BomItemList: bomItemList
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "BillOfMaterial/CreateBOMFullSave", body, {
      headers: this.token.headerToken(),
    });
  }


  BomFollowUpCreate(BomFollowupItemList: any) {
    var body = {
      BomFollowupItemList: BomFollowupItemList
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "BillOfMaterial/CreateBOMFollowUp", body, {
      headers: this.token.headerToken(),
    });
  }

  GetItemInfoForBomApprovalFile(
    buyerId: number,
    yearId: number,
    seasonId: number,
    styleId: number): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<BomListDropdownModel[]>(
      this.baseUrl_ + "BillOfMaterial/GetBomItemListDropDownForApprovalFile?seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&buyerId=" +
      buyerId +
      "&styleId=" +
      styleId,
      { headers: this.token.headerToken() }
    );
  }

  //BOM Attached File Refference Save
  BOMFileUploadRefferenceSave(fileRefference: BomFileApproveModel) {
    var body = {
      ...fileRefference
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "BillOfMaterial/CreateBomApproveFileRefferenceSave", body, {
      headers: this.token.headerToken(),
    });
  }


  GetBookPayModeDropDown(): Observable<any> {
    return this.http.get<BookPayModeModel[]>(this.baseUrl_ + "BillOfMaterial/GetBookPayModeDropDown", { headers: this.token.headerToken() });
  }

  GetTenorDropDown(): Observable<any> {
    return this.http.get<TenorDropdownModel[]>(this.baseUrl_ + "BillOfMaterial/GetTenorDropDown", { headers: this.token.headerToken() });
  }

  GetTenorTypeDropDown(): Observable<any> {
    return this.http.get<TenorTypeModel[]>(this.baseUrl_ + "BillOfMaterial/GetTenorTypeDropDown", { headers: this.token.headerToken() });
  }

  GetTermofdeliveryDropDown(): Observable<any> {
    return this.http.get<TermOfDeliveryModel[]>(this.baseUrl_ + "BillOfMaterial/GetDeliveryTermDropDown", { headers: this.token.headerToken() });
  }

  //Get BOM Sheet ItemList For Factory Manual BOM
  GetBOMSheetItemListForFactory(seasonId: number, yearId: number, buyerId: number, styleId: number): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    //"BillOfMaterial/GetAllBomSheetListData?bomNo="
    return this.http.get<BomSheetDataModel>(
      this.baseUrl_ + "BillOfMaterial/GetAllBomSheetListDataFirFactory?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId,
      { headers: this.token.headerToken() }
    );
  }

  //Get BOM Sheet ItemList For Factory Manual BOM
  GetBOMSheetItemListForFactoryEdit(seasonId: number, yearId: number, buyerId: number, styleId: number): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    //"BillOfMaterial/GetAllBomSheetListData?bomNo="
    return this.http.get<BomEntryManualModel>(
      this.baseUrl_ + "BillOfMaterial/GetAllFactoryBomSheetListDataForEdit?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId,
      { headers: this.token.headerToken() }
    );
  }


  getbomsTreeFormatedData(): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "BillOfMaterial/GetBomsTreeFormatedData", {
      headers: this.token.headerToken(),
    });
  }


  //Get Quotation
  GetBOMQuotation(
    buyerId: number,
    seasonId: number,
    yearId: number,
    styleId: number
  ): Observable<any> {

    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<BomQuotationModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetStyleWiseQuotationData?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId,
      { headers: this.token.headerToken() }
    );
  }
  //Get Quotation
  GetBOMQuotationToPromise(
    buyerId: number,
    seasonId: number,
    yearId: number,
    styleId: number
  ) {

    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<BomQuotationModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetStyleWiseQuotationData?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId,
      { headers: this.token.headerToken() }
    ).toPromise();
  }



  //Get Quotation Bom Done
  GetBOMQuotationBomComplete(
    seasonId: number,
    yearId: number,
    styleId: number
  ): Observable<any> {
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<BomQuotationModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetStyleWiseQuotationDataBomComplete?seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId,
      { headers: this.token.headerToken() }
    );
  }

  //Get Quotation PO by multiple Buy Date
  GetBOMQuotationPO(
    buyerId: number,
    seasonId: number,
    yearId: number,
    styleId: number,
    costId: number,
    buyDateString: string
  ): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costId == null) {
      costId = 0;
    }
    // alert(costId);
    return this.http.get<BomQuotationModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetStyleWiseQuotationPOData?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costId=" +
      costId +
      "&buyDateString=" +
      buyDateString,
      { headers: this.token.headerToken() }
    );
  }

  GetBernePODataForBOMReCalculate(
    buyerId: number,
    seasonId: number,
    yearId: number,
    styleId: number,
    costId: number
  ): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costId == null) {
      costId = 0;
    }

    return this.http.get<any[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetBernePODataForBOMReCalculate?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costId=" +
      costId,
      { headers: this.token.headerToken() }
    );
  }




  //Get Quotation PO for Kontoor
  GetBOMQuotationPOForKontoor(
    buyerId: number,
    seasonId: number,
    yearId: number,
    styleId: number,
    costId: number
  ): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costId == null) {
      costId = 0;
    }
    // alert(costId);
    return this.http.get<BomQuotationPOModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetStyleWiseQuotationPODataForKontoor?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costId=" +
      costId,
      { headers: this.token.headerToken() }
    );
  }

  GetBOMQuotationPOForRichlu(
    buyerId: number,
    contractNo: number,
    yearId: number,
    styleId: number,
    costId: number
  ): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (contractNo == null) {
      contractNo = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costId == null) {
      costId = 0;
    }
    // alert(costId);
    return this.http.get<BomQuotationModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetStyleWiseQuotationPOForRichluData?buyerId=" +
      buyerId +
      "&contractNo=" +
      contractNo +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costId=" +
      costId,
      { headers: this.token.headerToken() }
    );
  }

  GetBOMQuotationPOForLevis(buyerId: number,contractNo: number,yearId: number,styleId: number,costId: number,buyDate: string): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (contractNo == null) {
      contractNo = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costId == null) {
      costId = 0;
    }
    // alert(costId);
    return this.http.get<BomQuotationModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetStyleWiseQuotationPOForLevisData?buyerId=" +
      buyerId +
      "&contractNo=" +
      contractNo +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costId=" +
      costId +
      "&buyDate="+buyDate,
      { headers: this.token.headerToken() }
    );
  }

  GetStyleWiseQuotationPOForOthers(
    buyerId: number,
    contractNo: number,
    yearId: number,
    styleId: number,
    costId: number
  ): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (contractNo == null) {
      contractNo = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costId == null) {
      costId = 0;
    }
    // alert(costId);
    return this.http.get<BomQuotationModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetStyleWiseQuotationPOForOthers?buyerId=" +
      buyerId +
      "&contractNo=" +
      contractNo +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costId=" +
      costId,
      { headers: this.token.headerToken() }
    );
  }

  GetStyleWiseQuotationPOForGStar(
    buyerId: number,
    contractNo: number,
    yearId: number,
    styleId: number,
    costId: number
  ): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (contractNo == null) {
      contractNo = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costId == null) {
      costId = 0;
    }
    // alert(costId);
    return this.http.get<BomQuotationModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetStyleWiseQuotationPOForGStar?buyerId=" +
      buyerId +
      "&contractNo=" +
      contractNo +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costId=" +
      costId,
      { headers: this.token.headerToken() }
    );
  }

  GetStyleWiseQuotationPOForKontoor(
    buyerId: number,
    contractNo: number,
    yearId: number,
    styleId: number,
    costId: number
  ): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (contractNo == null) {
      contractNo = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costId == null) {
      costId = 0;
    }
    // alert(costId);
    return this.http.get<BomQuotationModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetStyleWiseQuotationPOForKontoor?buyerId=" +
      buyerId +
      "&contractNo=" +
      contractNo +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costId=" +
      costId,
      { headers: this.token.headerToken() }
    );
  }

  GetExistAndOthersBOMQuotationPOForRichlu(
    buyerId: number,
    contractNo: number,
    yearId: number,
    styleId: number,
    costId: number): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (contractNo == null) {
      contractNo = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costId == null) {
      costId = 0;
    }
    return this.http.get<BomQuotationModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetExistAndOthersBOMQuotationPOForRichlu?buyerId=" +
      buyerId +
      "&contractNo=" +
      contractNo +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costId=" +
      costId,
      { headers: this.token.headerToken() }
    );
  }

  GetExistAndOthersBOMQuotationPOForLevis(buyerId: number,contractNo: number,yearId: number,styleId: number,costId: number, buyDate: string): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (contractNo == null) {
      contractNo = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costId == null) {
      costId = 0;
    }
    return this.http.get<BomQuotationModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetExistAndOthersBOMQuotationPOForLevis?buyerId=" +
      buyerId +
      "&contractNo=" +
      contractNo +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costId=" +
      costId+
      "&buyDate="+ buyDate,
      { headers: this.token.headerToken() }
    );
  }

  GetExistAndOthersBOMQuotationPOForOthers(
    buyerId: number,
    contractNo: number,
    yearId: number,
    styleId: number,
    costId: number): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (contractNo == null) {
      contractNo = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costId == null) {
      costId = 0;
    }
    // alert(costId);
    return this.http.get<BomQuotationModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetExistAndOthersBOMQuotationPOForOthers?buyerId=" +
      buyerId +
      "&contractNo=" +
      contractNo +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costId=" +
      costId,
      { headers: this.token.headerToken() }
    );
  }

  GetExistAndOthersBOMQuotationPOForGStar(
    buyerId: number,
    contractNo: number,
    yearId: number,
    styleId: number,
    costId: number): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (contractNo == null) {
      contractNo = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costId == null) {
      costId = 0;
    }
    // alert(costId);
    return this.http.get<BomQuotationModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetExistAndOthersBOMQuotationPOForGStar?buyerId=" +
      buyerId +
      "&contractNo=" +
      contractNo +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costId=" +
      costId,
      { headers: this.token.headerToken() }
    );
  }

  GetExistAndOthersBOMQuotationPOForKontoor(
    buyerId: number,
    contractNo: number,
    yearId: number,
    styleId: number,
    costId: number): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (contractNo == null) {
      contractNo = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costId == null) {
      costId = 0;
    }
    // alert(costId);
    return this.http.get<BomQuotationModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetExistAndOthersBOMQuotationPOForKontoor?buyerId=" +
      buyerId +
      "&contractNo=" +
      contractNo +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costId=" +
      costId,
      { headers: this.token.headerToken() }
    );
  }

  GetExistAndOthersBOMQuotationPOForConsKontoor(
    buyerId: number,
    contractNo: number,
    yearId: number,
    styleId: number,
    costId: number): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (contractNo == null) {
      contractNo = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costId == null) {
      costId = 0;
    }
    // alert(costId);
    return this.http.get<BomQuotationModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetExistAndOthersBOMQuotationPOForConsKontoor?buyerId=" +
      buyerId +
      "&contractNo=" +
      contractNo +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costId=" +
      costId,
      { headers: this.token.headerToken() }
    );
  }

  // Richlu PO change Check
  async GetBOMQuotationPOIsExistsForRichlu(buyerId: number, seasonId: number, yearId: number, styleId: number) {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<BomQuotationModel[]>(this.baseUrl_ + "BillOfMaterial/GetBOMQuotationPOIsExistsForRichlu?buyerId=" + buyerId +
      "&seasonId=" + seasonId + "&yearId=" + yearId + "&styleId=" + styleId,
      { headers: this.token.headerToken() }).toPromise();
  }

  // Levis PO change Check
  async GetBOMQuotationPOIsExistsForLevis(buyerId: number, seasonId: number, yearId: number, styleId: number, buyDate: string) {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<BomQuotationModel[]>(this.baseUrl_ + "BillOfMaterial/GetBOMQuotationPOIsExistsForLevis?buyerId=" + buyerId +
      "&seasonId=" + seasonId + "&yearId=" + yearId + "&styleId=" + styleId +"&buyDate="+buyDate,
      { headers: this.token.headerToken() }).toPromise();
  }

  async GetBOMQuotationPOIsExistsForOthers(buyerId: number, seasonId: number, yearId: number, styleId: number) {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<BomQuotationModel[]>(this.baseUrl_ + "BillOfMaterial/GetBOMQuotationPOIsExistsForOthers?buyerId=" + buyerId +
      "&seasonId=" + seasonId + "&yearId=" + yearId + "&styleId=" + styleId,
      { headers: this.token.headerToken() }).toPromise();
  }
  async GetBOMQuotationPOIsExistsForGStar(buyerId: number, seasonId: number, yearId: number, styleId: number) {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<BomQuotationModel[]>(this.baseUrl_ + "BillOfMaterial/GetBOMQuotationPOIsExistsForGStar?buyerId=" + buyerId +
      "&seasonId=" + seasonId + "&yearId=" + yearId + "&styleId=" + styleId,
      { headers: this.token.headerToken() }).toPromise();
  }

  async GetBOMQuotationPOIsExistsForKontoor(buyerId: number, seasonId: number, yearId: number, styleId: number) {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<BomQuotationModel[]>(this.baseUrl_ + "BillOfMaterial/GetBOMQuotationPOIsExistsForKontoor?buyerId=" + buyerId +
      "&seasonId=" + seasonId + "&yearId=" + yearId + "&styleId=" + styleId,
      { headers: this.token.headerToken() }).toPromise();
  }

  async GetPurchaseOrderPOIsExistsForRichlu(buyerId: number, seasonId: number, yearId: number, styleId: number) {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<BomQuotationModel[]>(this.baseUrl_ + "BillOfMaterial/GetPurchaseOrderPOIsExistsForRichlu?buyerId=" + buyerId +
      "&seasonId=" + seasonId + "&yearId=" + yearId + "&styleId=" + styleId,
      { headers: this.token.headerToken() }).toPromise();
  }

  async GetPOIsExistsForLevis(buyerId: number, seasonId: number, yearId: number, styleId: number, buyDate: string) {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<BomQuotationModel[]>(this.baseUrl_ + "BillOfMaterial/GetPOIsExistsForLevis?buyerId=" + buyerId +
      "&seasonId=" + seasonId + "&yearId=" + yearId + "&styleId=" + styleId + "&buyDate=" + buyDate,
      { headers: this.token.headerToken() }).toPromise();
  }

  async GetPOIsExistsForOthers(buyerId: number, seasonId: number, yearId: number, styleId: number) {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<BomQuotationModel[]>(this.baseUrl_ + "BillOfMaterial/GetPOIsExistsForOthers?buyerId=" + buyerId +
      "&seasonId=" + seasonId + "&yearId=" + yearId + "&styleId=" + styleId,
      { headers: this.token.headerToken() }).toPromise();
  }

  async GetPOIsExistsForGStar(buyerId: number, seasonId: number, yearId: number, styleId: number) {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<BomQuotationModel[]>(this.baseUrl_ + "BillOfMaterial/GetPOIsExistsForGStar?buyerId=" + buyerId +
      "&seasonId=" + seasonId + "&yearId=" + yearId + "&styleId=" + styleId,
      { headers: this.token.headerToken() }).toPromise();
  }

  //Po Load For Columbia
  GetBOMQuotationPOOnlyForColumbia(Master: any, quotationList: any[]) {
    var body = {
      ...Master,
      SelectedQuotationList: quotationList
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "BillOfMaterial/GetStyleWiseQuotationPODataOnlyForColumbia", body, {
      headers: this.token.headerToken(),
    });
  }

  //Po Load For Re-Calculate BOM List View.(Columbia) 
 async GetPOQtWiseForColumbiaToPromise(Master: any, quotationList: any[]) {
    var body = {
      ...Master,
      SelectedQuotationList: quotationList
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "BillOfMaterial/GetQtWisePOForReCalculationColumbia", body, {
      headers: this.token.headerToken(),
    }).toPromise();
  }

  //Assign PO Wise Quotation
  BOMPOWiseQuotationAssign(BomModel: BomMaterialSubmitModel, quotationDetails: BomQuotationPOModel[]) {
    var body = {
      ...BomModel,
      QuotationList: quotationDetails
    }
    console.log('PO Selection Save', JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "BillOfMaterial/AssignPOWiseQuotationData", body, {
      headers: this.token.headerToken(),
    });
  }

  //Get ItemList Sequence Wise
  GetBOMItemListWithCostingToPromise(buyerId: number,styleId: number, bomId: number,costingId: number) {
    if (bomId == null) {
      bomId = 0;
    }
    return this.http.get<BomMaterialConsumptionModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetBOMItemListWithCosting?bomId=" + bomId + "&buyerId= "+ buyerId + "&styleId= "+ styleId+ "&costingId= "+ costingId,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  MultipleQuotationSaveForColumbia(Master: any, quotationList: any[]) {
    var body = {
      ...Master,
      SelectedQuotationList: quotationList
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "BillOfMaterial/MultipleQuotationDataSave", body, {
      headers: this.token.headerToken(),
    });
  }

  GetQuotationWiseBOMStatus(
    seasonId: number,
    yearId: number,
    buyerId: number,
    styleId: number,
    costingId: number,
    buyDate: string
  ): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<QuotationwiseBOMStatusModel>(
      this.baseUrl_ +
      "BillOfMaterial/GetQuotationWiseBOMStatus?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costingId=" +
      costingId
      +
      "&buyDate=" +
      buyDate,
      { headers: this.token.headerToken() }
    );
  }
  GetQuotationWiseBOMProjectionStatus(
    seasonId: number,
    yearId: number,
    buyerId: number,
    styleId: number,
    costingId: number,
    buyDate: string
  ): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<QuotationwiseBOMStatusModel>(
      this.baseUrl_ +
      "BillOfMaterial/GetQuotationWiseBOMProjectionStatus?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costingId=" +
      costingId
      +
      "&buyDate=" +
      buyDate,
      { headers: this.token.headerToken() }
    );
  }

  GetStylewisePOQty(
    seasonId: number,
    yearId: number,
    buyerId: number,
    styleId: number
  ): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<StylewisePOQtyModel>(
      this.baseUrl_ +
      "BillOfMaterial/GetStyleWisePOQty?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId,
      { headers: this.token.headerToken() }
    );
  }

  GetStylewisePOAndForecastQty(
    seasonId: number,
    yearId: number,
    buyerId: number,
    styleId: number,
    costingId: number,
  ): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costingId == null) {
      costingId = 0;
    }
    return this.http.get<StylewisePOQtyModel>(
      this.baseUrl_ +
      "BillOfMaterial/GetStyleWisePOAndForcastQty?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costingId=" +
      costingId,
      { headers: this.token.headerToken() }
    );
  }

  GetStylewisePOAndForecastQtyToPromise(
    seasonId: number,
    yearId: number,
    buyerId: number,
    styleId: number,
    costingId: number,
  ) {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costingId == null) {
      costingId = 0;
    }
    return this.http.get<StylewisePOQtyModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetStyleWisePOAndForcastQty?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costingId=" +
      costingId,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  //SUPPLIER LIST
  GetSupplierList(): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + 'Supplier/GetSupplier', { headers: this.token.headerToken() });
  }

  GetPreCostingApprovedStyleList(buyerId: number, seasonId: number, yearId: number): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }

    return this.http.get<PreCostingAppStylyListModel[]>(
      this.baseUrl_ + "BillOfMaterial/GetPreCostingApprovedStyleList?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId,
      { headers: this.token.headerToken() }
    );
  }

  //Get  PO All Rates
  GetStylewisePOAllRate(
    buyerId: number,
    seasonId: number,
    yearId: number,
    styleId: number
  ): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }

    // alert(costId);
    return this.http.get<BomQuotationModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetStyleWisePOAllRates?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId,

      { headers: this.token.headerToken() }
    );
  }

  //Get  PO All Size
  GetStylewisePOAllSize(
    buyerId: number,
    seasonId: number,
    yearId: number,
    styleId: number
  ): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }

    // alert(costId);
    return this.http.get<BomQuotationModel[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetStyleWisePOAllSizes?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId,

      { headers: this.token.headerToken() }
    );
  }
  //Get  Style Size For DKT BOM
 async GetStyleSizeForDKTBOM(buyerId: number,seasonId: number,yearId: number,styleId: number){
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<any[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetStyleSizeForDKTBOM?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  GetBuyDateDropDown(
    buyerId: number,
    seasonId: number,
    yearId: number,
    styleId: number,
    costingId: number
  ): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costingId == null) {
      costingId = 0;
    }
    return this.http.get<any>(this.baseUrl_ + "BillOfMaterial/GetAllBuyDateDropdown?buyerId=" + buyerId + "&seasonId=" + seasonId + "&yearId=" + yearId + "&styleId=" + styleId + "&cosingId=" + costingId, { headers: this.token.headerToken() });
  }

  GetBuyDateDropDownBomComplete(
    buyerId: number,
    seasonId: number,
    yearId: number,
    styleId: number,
    costingId: number
  ): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costingId == null) {
      costingId = 0;
    }
    return this.http.get<any>(this.baseUrl_ + "BillOfMaterial/GetAllBuyDateDropdownBomComplete?buyerId=" + buyerId + "&seasonId=" + seasonId + "&yearId=" + yearId + "&styleId=" + styleId + "&cosingId=" + costingId, { headers: this.token.headerToken() });
  }

  GetBOMStringFromDb(id: number): Observable<any> {
    return this.http.get<BomStringModel>(
      this.baseUrl_ +
      "BillOfMaterial/GetBOMStringFromBom?id=" +
      id,
      { headers: this.token.headerToken() }
    );
  }

  createGoForBookingString(itemsFromBom: BomStringModel) {
    console.log(JSON.stringify(itemsFromBom));
    return this.http.post<any>(this.baseUrl + "BillOfMaterial/StroreBOMString", itemsFromBom, { headers: this.token.headerToken() });
  }

  GetBOMSheetItemListForBomList(bomId: number, versionNo: number, callFrom): Observable<any> {
    if (bomId == null) {
      bomId = 0;
    }
    if (versionNo == null) {
      versionNo = 0;
    }
    return this.http.get<BomSheetDataModel>(
      this.baseUrl_ + "BillOfMaterial/GetAllBomSheetListDataForBomList?bomId=" +
      bomId + "&versionNo=" + versionNo + "&callFrom=" + callFrom,
      { headers: this.token.headerToken() }
    );
  }

  GetBomPoDetail(buyerId:number, seasonId:number, yearId:number, styleId:number, poNo:string,bomId:number, versionNo:number): Observable<any> {
    return this.http.get<any>(
      this.baseUrl_ + "BillOfMaterial/GetBomPoDetail?buyerId=" +
      buyerId + "&seasonId=" + seasonId + "&yearId=" + yearId + "&styleId=" + styleId+ "&poNo=" + poNo+ "&bomId=" + bomId + "&versionNo=" + versionNo,
      { headers: this.token.headerToken() }
    );
  }

  DeleteBom(bomId: number, deleteReason: string) :Observable<any> {
    return this.http.delete(this.baseUrl + "BillOfMaterial/DeleteBom?bomId="+ bomId + "&deleteReason=" + deleteReason, { headers: this.token.headerToken() });
  }
  DeleteBomProjection(bomId: number, deleteReason: string) :Observable<any> {
    return this.http.delete(this.baseUrl + "BillOfMaterial/DeleteBomProjection?bomId="+ bomId + "&deleteReason=" + deleteReason, { headers: this.token.headerToken() });
  }

 async DeleteBomItem(bomItemId: number) {
    return this.http.delete<any>(this.baseUrl + "BillOfMaterial/DeleteBomItem?bomItemId="+ bomItemId, { headers: this.token.headerToken() }).toPromise();
  }

  EditBom(bomitem: BomSheetDataModel) {
    // var body = {
    //     ...bomCreate,
    //     BomItem: bomitem
    //   }
    console.log('Confirm json Data');
    console.log(JSON.stringify(bomitem));
    return this.http.post<any>(this.baseUrl_ + "BillOfMaterial/EditBOMItem", bomitem, {
      headers: this.token.headerToken(),
    });
  }

  GetSelectionMode(bomId: number): Observable<any> {
    if (bomId == null) {
      bomId = 0;
    }
    return this.http.get<BomSheetDataModel>(
      this.baseUrl_ + "BillOfMaterial/GetBomSelectionMode?bomId=" +
      bomId,
      { headers: this.token.headerToken() }
    );
  }

  DeleteBooking(deleteInfo: ItemWiseBookingDeleteModel) {
    var body = {
      ...deleteInfo
    }
    console.log("Delete Info");
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "BillOfMaterial/DeleteItemBooking", body, {
      headers: this.token.headerToken(),
    });
  }


  GetBOMQuotationCheck(
    buyerId: number,
    seasonId: number,
    yearId: number,
    styleId: number,
    costingId: number,
    buyDate: string
  ): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costingId == null) {
      costingId = 0;
    }
    // alert(costId);
    return this.http.get<any[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetBomCompletedQuotationCheckForColumbia?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costingId=" +
      costingId +
      "&buyDate=" +
      buyDate,
      { headers: this.token.headerToken() }
    );
  }

  GetIncompleteBOMList(
    buyerId: number
  ): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    //console.log('token', this.token.auth_token);
    return this.http.get<any>(
      this.baseUrl_ +
      "BillOfMaterial/GetBuyerwiseIncompleteBomMasterData?buyerId=" +
      buyerId,
      { headers: this.token.headerToken() }
    );
  }

  IncompleteBOMDelete(bomList: any[]) {
    // console.log(JSON.stringify(bookingitemcreate));     
    var body = {
      BomList: bomList
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "BillOfMaterial/DeleteIncompleteBomList", body, {
      headers: this.token.headerToken(),
    });
  }

  //Item Color Setup
  //BOMItemPoSetupCreate(obj: any, bomPoSetupCreate: BomMaterialSubmitModel, bomPoSetupDetails: BomColorSetupDetailsModel[]) {
  BOMItemPoSetupCreate(obj: any) {
    // var body = {
    //   ...bomPoSetupCreate,
    //   BomCreateItemPoSetup: bomPoSetupDetails
    // }
    //console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "BillOfMaterial/CreateBomItemPoSetupData", obj, {
      headers: this.token.headerToken(),
    });
  }

  GetDktQoutationWiseWeek(
    buyerId: number,
    seasonId: number,
    yearId: number,
    styleId: number,
    costingId: number
  ): Observable<any[]> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<any[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetQuotationWiseDktWeek?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costingId=" +
      costingId,
      { headers: this.token.headerToken() }
    );
  }

  GetDktQoutationWiseWeekToPromise(
    buyerId: number,
    seasonId: number,
    yearId: number,
    styleId: number,
    costingId: number
  ) {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    return this.http.get<any[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetQuotationWiseDktWeek?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&costingId=" +
      costingId,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  GetBOMWisePOQty(bomId: number): Observable<any[]> {
    if (bomId == null) {
      bomId = 0;
    }
    return this.http.get<any[]>(
      this.baseUrl_ +
      "BillOfMaterial/GetBOMWisePOQty?bomId=" +
      bomId,
      { headers: this.token.headerToken() }
    );
  }

  BOMCopy(bomId: number): Observable<any> {
    if (bomId == null) {
      bomId = 0;
    }
    return this.http.get<any>(
      this.baseUrl_ + "BillOfMaterial/BOMCopy?bomId=" +
      bomId,
      { headers: this.token.headerToken() }
    );
  }
  BOMCopyToPromise(bomId: number){
    if (bomId == null) {
      bomId = 0;
    }
    return this.http.get<any>(
      this.baseUrl_ + "BillOfMaterial/BOMCopy?bomId=" +
      bomId,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  GetBOMRecalculation(
    seasonId: number,
    yearId: number,
    buyerId: number,
    styleId: number,
    bomId: number,
    costingId: number
  ): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costingId == null) {
      costingId = 0;
    }

    return this.http.get<any>(
      this.baseUrl_ +
      "BillOfMaterial/BOMRecalculationPO?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&bomId=" +
      bomId +
      "&costingId=" +
      costingId,
      { headers: this.token.headerToken() }
    );
  }
  GetBOMRecalculationToPromise(
    seasonId: number,
    yearId: number,
    buyerId: number,
    styleId: number,
    bomId: number,
    costingId: number
  ){
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (styleId == null) {
      styleId = 0;
    }
    if (costingId == null) {
      costingId = 0;
    }

    return this.http.get<any>(
      this.baseUrl_ +
      "BillOfMaterial/BOMRecalculationPO?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId +
      "&bomId=" +
      bomId +
      "&costingId=" +
      costingId,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  async GetPOChangeForBOMReCalculation(bomId: number) {
    if (bomId == null) {
      bomId = 0;
    }
    return this.http.get<any[]>(this.baseUrl_ + "BillOfMaterial/GetPOChangeForBOMReCalculation?bomId=" + bomId,
      { headers: this.token.headerToken() }).toPromise();
  }
  async GetBOMListForStyle(buyerId: number, seasonId: number, yearId: number, styleId: number) {
    return this.http.get<any[]>(
      this.baseUrl_ + "BillOfMaterial/GetBOMListForStyle?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&styleId=" +
      styleId,
      {
        headers: this.token.headerToken(),
      }
    ).toPromise();
  }



  //Bom Setup  Buyer Wise
  BomSetupBuyerWise(bomModel: any, bomSetupDetails: any[], allColorSetup: any[]) {
    var body = {
      ...bomModel,
      bomSetupItemDetails: bomSetupDetails,
      allColorSetup: allColorSetup
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "BillOfMaterial/BomSetupBuyerWise", body, {
      headers: this.token.headerToken(),
    });
  }

  //Get Qutaiont Data For Bom
  GetQuationNoByBuyerStyleSeasonYearForBom(buyerId: number, styleId: number, seasonId: number, yearId: number) {
    return this.http.get<any[]>(
      this.baseUrl_ + "BillOfMaterial/GetQuationNoByBuyerStyleSeasonYearForBom?buyerId=" + buyerId + "&styleId=" + styleId + "&seasonId=" + seasonId + "&yearId=" + yearId,
      { headers: this.token.headerToken() }
    ).toPromise();
  }


  //Get Qutaiont Data form bom
  GetCostingDataByQuationNo(buyerId: number, styleId: number, seasonId: number, yearId: number, costingId: string) {
    return this.http.get<any[]>(
      this.baseUrl_ + "BillOfMaterial/GetCostingDataByQuationNo?buyerId=" + buyerId + "&styleId=" + styleId + "&seasonId=" + seasonId + "&yearId=" + yearId + "&costingId=" + costingId,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  //Get Item Size Data form bom
  GetSizeByStyleIdForBom(styleId: number) {
    return this.http.get<any[]>(
      this.baseUrl_ + "BillOfMaterial/GetSizeByStyleIdForBom?styleId=" + styleId,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  //GetColorNameForBomSetup
  GetColorNameForBomSetup(buyerId: number) {
    return this.http.get<any[]>(
      this.baseUrl_ + "BillOfMaterial/GetColorNameForBomSetup?buyerId=" + buyerId,
      { headers: this.token.headerToken() }
    ).toPromise();
  }


  //Get Master Data form bom
  GetBomSetupBuyerWiseList() {
    return this.http.get<any[]>(
      this.baseUrl_ + "BillOfMaterial/GetBomSetupBuyerWiseList",
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  //Get All Data form bom
  GetBomSetupBuyerWiseListById(id: number) {
    return this.http.get<any[]>(
      this.baseUrl_ + "BillOfMaterial/GetBomSetupBuyerWiseListById?Id=" + id,
      { headers: this.token.headerToken() }
    ).toPromise();
  }


  //Delete Bom Setup Color
  DeleteBomSetupColor(id: number) {
    return this.http.get<any>(this.baseUrl_ + "BillOfMaterial/DeleteBomSetupColor?Id=" + id,
      {
        headers: this.token.headerToken(),
      }).toPromise();;
  }



  getCarsMedium() {
    return this.http.get<any>('assets/customers-medium.json')
      .toPromise()
      .then(res => <any[]>res.data)
      .then(data => { return data; });
  }

  SaveBOMSizeColor(bomSizeColorIploadForm: any, convertedBOMColSizeUploadList: BOMSizeColorUploadModel[]){
    var body = {
      ...bomSizeColorIploadForm,
       BOMColSizeUploadList: convertedBOMColSizeUploadList
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "BillOfMaterial/SaveBOMSizeColor", body, {
      headers: this.token.headerToken(),
    });
  } 
  DeleteBOMSizeColor(buyerId: number,yearId: number, seasonId: number) {
    return this.http.get<any>(this.baseUrl_ + "BillOfMaterial/DeleteBOMSizeColor?BuyerId=" + buyerId + "&YearId=" + yearId + "&SeasonId=" + seasonId,
      {
        headers: this.token.headerToken(),
      }).toPromise();
  }

    GetBOMSizeColor(buyerId: number, seasonId: number, yearId: number): Observable<any> {
      return this.http.get<any[]>(
        this.baseUrl_ + "BillOfMaterial/GetBOMSizeColor?buyerId="+ buyerId +
        "&seasonId="+ seasonId + "&yearId=" + yearId,
        {
          headers: this.token.headerToken(),
        }
      );
    }

    //Get BOM Deleted Data
    GetBomDeletedData(): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ + "BillOfMaterial/BomDeletedList",
      { headers: this.token.headerToken() }
    );
  }

  BomSendToKafkaManually(bomId:number): Observable<any>{
    var obj = {
      bomId
    }
    console.log('BOM Send ID ', JSON.stringify(obj));
    return this.http.post<any>(
      this.baseUrl_ +
      "BillOfMaterial/BomSendToKafkaManually", obj,
      { headers: this.token.headerToken() }
    );
  }

  async ShowBomPoSizeDetail(bomId: number, versionNo: number) {
    return this.http.get<any[]>(
      this.baseUrl_ + "BillOfMaterialSecond/ShowBomPoSizeDetail?bomId=" + bomId + "&versionNo" +versionNo ,
      {
        headers: this.token.headerToken(),
      }
    ).toPromise();
  }
}