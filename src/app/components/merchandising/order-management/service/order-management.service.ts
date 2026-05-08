import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as moment from "moment";
import { Observable } from "rxjs";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { Company } from "../../common-componant/model/company";
import { DeleteStyleInfo } from "../model/delete-style-info";
import { OrderManagementColors } from "../model/order-management-colors";
import { OrderManagementDetail } from "../model/order-management-detail";
import { OrderManagementMaster } from "../model/order-management-master";
import { OrderManagementSize } from "../model/order-management-size";
import { OrderSummeryForProduction } from "../model/order-summery-for-production.model";
import { PoReport } from "../model/po-report";
import { SizeRatio } from "../model/size-ratio.model";
import { StyleFabricHead } from "../model/style-fabric-head.model";
import { StyleInfo } from "../model/style-info";
import { StylePartSetup } from "../model/style-part-setup.model";
import { StylePart } from "../model/style-part.model";
import { FabricDetailModel } from "../../models/FabircDetailModel";

@Injectable({
  providedIn: "root",
})
export class OrderManagementService {
  baseUrl = environment.apiUrl + "merchandising/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
  commonUrl = environment.apiUrl.replace(/[?&]$/, "");

  orderManagementColorsList: OrderManagementColors[] = new Array();
  orderManagementSizesList: OrderManagementSize[] = new Array(); //All list for sizes
  orderManagementTrackWiseSizeList: OrderManagementSize[] = new Array(); //Track wise size list
  PurchaseOrderColorList: OrderManagementColors[] = []; //For display  color list
  PurchaseOrderSizeList: OrderManagementSize[] = []; //For display  size list
  OrederSummeryForProductionList: OrderSummeryForProduction[];
  MonthlyOrederFollowUpList: any[];

  //PurchaseOrderList: OrderManagementMaster[] = []; //for displat puchase order maser list
  PurchaseOrderList: any[] = []; //for displat puchase order maser list
  trackNo: number = 0; //FOR increament purpose
  checkTrackNo: number = 0; //for check track number when click

  orderManagementDetailList: OrderManagementDetail[] = [];
  companyList: Company[] = [];
  fabricHeadList: StyleFabricHead[] = [];
  stylePartList: StylePart[] = [];
  styleFabricList: StyleInfo[] = [];
  stylePartSetupList: StylePartSetup[] = [];

  constructor(private http: HttpClient, private token: TokenService) { }

  styleInfoList: StyleInfo[];
  bookingSalesContractList: any[];
  confirmedStyleList: StyleInfo[];
  developmentStyleList: StyleInfo[];
  descriptionList: any;

  //get Order Summery For Production list
  GetOrderSummeryForProductionData(
    buyerId: number,
    seasonId: number,
    yearId: number,
    fromDate: string,
    toDate: string
  ) {
    if (fromDate != "") fromDate = moment(fromDate).format("DD-MMM-YYYY");
    if (toDate != "") toDate = moment(toDate).format("DD-MMM-YYYY");
    return this.http.get<OrderSummeryForProduction[]>(
      this.baseUrl_ +
      "GetPoProductionReport?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&fromDelDate=" +
      fromDate +
      "&toDelDate=" +
      toDate,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  //get Monthly Order Follow Up list
  GetMonthlyOrderFollowUpData(
    buyerId: number,
    seasonId: number,
    yearId: number
  ) {
    return this.http.get<OrderSummeryForProduction[]>(
      this.baseUrl_ +
      "GetOrderFollowupReportDataList?buyerId=" +
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

  //get Order management po details list
  GetPurchaseOrderDetailsData() {
    return this.http.get<OrderManagementDetail[]>(
      this.baseUrl_ + "OrderManagementMaster/GetOrderManagementDetailsList",
      {
        headers: this.token.headerToken(),
      }
    );
  }
  //for company
  CreateCompany(company: Company) {
    return this.http.post<any>(
      this.baseUrl_ + "Company/CreateCompany",
      company,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetCompany(): Observable<any> {

    return this.http.get<Company[]>(this.baseUrl_ + "Company/GetCompanyList", {
      headers: this.token.headerToken(),
    });
  }

  getCategoryName(): Observable<any> {
    return this.http.get<Company[]>(this.baseUrl_ + "Company/getCategoryName", {
      headers: this.token.headerToken(),
    });
  }

  GetCompanyWithSara(): Observable<any> {

    return this.http.get<Company[]>(this.baseUrl_ + "Company/GetCompanyListWithSara", {
      headers: this.token.headerToken(),
    });
  }

  GetCompanyOnlySnowtexAndSara(): Observable<any> {

    return this.http.get<Company[]>(this.baseUrl_ + "Company/GetCompanyListOnlySnowtexAndSara", {
      headers: this.token.headerToken(),
    });
  }

  //for style info
  // styleProcessDetailList: StyleInfo[]
  CreateStyleInfo(styleInfo: StyleInfo, notificationDepartments: any[], fullAccessoriesList: any[], newFabricHeadList: StyleFabricHead[], stylePartList: StylePart[], newSizeRatioList: SizeRatio[], r3CodeVersionList: any[], bestsellerblockingList: any[], loadedSizeRatioListHaddad: any[]): Observable<any> {
    debugger
    var body = {
      ...styleInfo,
      notificationDepartments: notificationDepartments,
      styleProcesses: fullAccessoriesList,
      styleFabricProcess: newFabricHeadList,
      StylePartInfos: stylePartList,
      SizeRatios: newSizeRatioList,
      r3CodeVersion: r3CodeVersionList,
      blocking: bestsellerblockingList,
      sizeRangeList: loadedSizeRatioListHaddad
    };
    console.log(JSON.stringify(body));
    return this.http.post<any>(
      this.baseUrl_ + "StyleSetting/CreateStyleFullSave",
      body,
      { headers: this.token.headerToken() }
    );
  }

  //save changed Style name
  SaveChangedStyle(styleChange: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + "StyleSetting/SaveChangedStyle", styleChange, {
      headers: this.token.headerToken(),
    });
  }



  GetStyleWiseZipperDetailsById(Id: number) {
    return this.http.get<any[]>(
      this.baseUrl_ + "Item/GetStyleWiseZipperDetailsById?Id=" + Id,
      {
        headers: this.token.headerToken(),
      }
    );
  }

 async GetStyleWiseZipperDetails(styleId: number) {
    return this.http.get<any[]>(
      this.baseUrl_ + "Item/GetStyleWiseZipperDetail?styleId=" + styleId,
      {
        headers: this.token.headerToken(),
      }
    ).toPromise();
  }

  CheckDuplicateDescription(obj: any): Observable<any> {
    debugger
    var body = {
      ...obj
    }
    return this.http.post<any>(
      this.baseUrl_ + "Item/CheckDuplicateDescription", body,

      { headers: this.token.headerToken(), }
    );
  }

  CreateStyleWiseZipper(obj: any, newFabricHeadList: any, selectedSizeList: any) {
    // console.log(JSON.stringify(bookingitemcreate));        
    debugger
    var body = {
      ...obj,
      ZipperDescriptionList: newFabricHeadList,
      SizeMesurementList: selectedSizeList
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "Item/CreateStyleWiseZipper", body, {
      headers: this.token.headerToken(),
    });
  }

  CreateStyleWiseFabricColorSave(obj: any, newFabricHeadList: any, selectedSizeList: any) {
    // console.log(JSON.stringify(bookingitemcreate));
    var body = {
      ...obj,
      ZipperDescriptionList: newFabricHeadList,
      ColorList: selectedSizeList
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "Item/CreateStyleWiseFabricColorSave", body, {
      headers: this.token.headerToken(),
    });
  }

  GetStyleWiseZipperList() {
    return this.http.get<any[]>(this.baseUrl_ + "Item/GetAllStyleWiseZipperList", { headers: this.token.headerToken() });
  }
  GetZipperList() {
    return this.http.get<any[]>(this.baseUrl_ + "Item/GetAllZipperList", { headers: this.token.headerToken() });
  }
  GetZipperListtoPromise() {
    return this.http.get<any[]>(this.baseUrl_ + "Item/GetAllZipperList", { headers: this.token.headerToken() }).toPromise();
  }
  GetStyleWiseZipperDetailsList() {
    return this.http.get<any[]>(this.baseUrl_ + "Item/GetAllStyleWiseZipperDetailsList", { headers: this.token.headerToken() });
  }

  // PostCadFactoryData(obj: FormData, customer: any) {
  //   console.log(obj);

  //   return this.http.post<any>(
  //     this.baseUrl_ + "StyleSetting/PostCADData",
  //     obj,
  //     { headers: this.token.headerToken() }
  //   );
  // }

  GetStyleInfo(): Observable<any> {
    return this.http.get<StyleInfo[]>(
      this.baseUrl_ + "StyleSetting/GetStyleList",
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetStyleList(status: string, buyerId: number, seasonId: number, yearId: number) {
    //debugger
    return this.http.get<StyleInfo[]>(
      this.baseUrl_ + "StyleSetting/GetStyleByBuyerSeasonYearId?status=" + status + "&buyerId=" + buyerId + "&seasonId=" + seasonId + "&yearId=" + yearId,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  // style to load in the confirm style dropdown (Style Those costing complete)
  GetStyleListForConfirmStyle(status: string, buyerId: number, seasonId: number, yearId: number) {
    //debugger
    return this.http.get<StyleInfo[]>(
      this.baseUrl_ + "StyleSetting/GetStyleByBuyerSeasonYearIdForConfirmStyle?status=" + status + "&buyerId=" + buyerId + "&seasonId=" + seasonId + "&yearId=" + yearId,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetStyleListForBom(status: string, buyerId: number, seasonId: number, yearId: number) {
    //debugger
    return this.http.get<StyleInfo[]>(
      this.baseUrl_ + "StyleSetting/GetStyleByBuyerSeasonYearIdForBomSetup?status=" + status + "&buyerId=" + buyerId + "&seasonId=" + seasonId + "&yearId=" + yearId,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetStyleListToPromise(status: string, buyerId: number, seasonId: number, yearId: number) {
    return this.http.get<StyleInfo[]>(
      this.baseUrl_ + "StyleSetting/GetStyleByBuyerSeasonYearId?status=" + status + "&buyerId=" + buyerId + "&seasonId=" + seasonId + "&yearId=" + yearId,
      {
        headers: this.token.headerToken(),
      }).toPromise();
  }

  GetStyleForSampleReq(status: string, buyerId: number, seasonId: number, yearId: number) {
    //debugger
    return this.http.get<StyleInfo[]>(
      this.baseUrl_ + "StyleSetting/GetStyleForSampleReq?status=" + status + "&buyerId=" + buyerId + "&seasonId=" + seasonId + "&yearId=" + yearId,
      {
        headers: this.token.headerToken(),
      }
    );
  }



  GetDescriptionList(styleId: number, itemId: number) {
    return this.http.get<any[]>(
      this.baseUrl_ + "StyleSetting/GetDescriptionByStyleIdItemId?styleId=" + styleId + "&itemId=" + itemId,
      {
        headers: this.token.headerToken(),
      }
    );
  }

 async GetDescriptionListToPromise(styleId: number, itemId: number) {
    return this.http.get<any[]>(
      this.baseUrl_ + "StyleSetting/GetDescriptionByStyleIdItemId?styleId=" + styleId + "&itemId=" + itemId,
      {
        headers: this.token.headerToken(),
      }
    ).toPromise();
  }

  GetDevelopmentStyleList(): Observable<any> {
    return this.http.get<StyleInfo[]>(
      this.baseUrl_ + "StyleSetting/GetDevelopmentStyleList",
      {
        headers: this.token.headerToken(),
      }
    );
  }
  GetConfirmStyleList(): Observable<any> {
    return this.http.get<StyleInfo[]>(
      this.baseUrl_ + "StyleSetting/GetConfirmStyleList",
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetPendingStyleByDept(dept: string, currentUrl: string) {
    return this.http.get<any[]>(
      this.baseUrl_ + "StyleSetting/GetStylePendingListByDept?dept=" + dept + "&currnetUrl=" + currentUrl,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  async GetPendingStyleByDeptToPromise(dept: string, currentUrl: string) {
    return this.http.get<any[]>(
      this.baseUrl_ + "StyleSetting/GetStylePendingListByDept?dept=" + dept + "&currnetUrl=" + currentUrl,
      {
        headers: this.token.headerToken(),
      }
    ).toPromise();
  }



  GetConsBasedCostingSize() {
    return this.http.get<any[]>(
      this.baseUrl_ + "StyleSetting/GetConsBasedCostingSize",
      {
        headers: this.token.headerToken(),
      }
    );
  }
  GetConfirmStylePendingListByDept(dept: string) {
    return this.http.get<any[]>(
      this.baseUrl_ + "StyleSetting/GetConfirmStylePendingListByDept?dept=" + dept,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  //GetStyleProcessByStyleId(styleId: number): Observable<any> {
  GetStyleProcessByPartId(stylePartInfoId: number): Observable<any> {
    return this.http.get<StyleInfo[]>(
      this.baseUrl_ +
      "StyleSetting/GetStyleProcess?stylePartId=" +
      stylePartInfoId,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetStyleProcessByPartIdForSample(stylePartInfoId: number): Observable<any> {
    return this.http.get<FabricDetailModel[]>(
      this.baseUrl_ +
      "StyleSetting/GetStyleProcess?stylePartId=" +
      stylePartInfoId,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetStyleProcessByStyleIdForSample(styleId: number): Observable<any> {
    return this.http.get<FabricDetailModel[]>(
      this.baseUrl_ +
      "StyleSetting/GetStyleProcessByStyleIdForSample?styleId=" +
      styleId,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  GetStyleProcessByStyleIdForSampleToPromise(styleId: number) {
    return this.http.get<any[]>(
      this.baseUrl_ + "StyleSetting/GetStyleProcessByStyleIdForSample?styleId=" + styleId,
      {
        headers: this.token.headerToken(),
      }).toPromise();
  }

  GetStyleFabricByPartId(stylePartInfoId: number): Observable<any> {
    return this.http.get<StyleFabricHead[]>(
      //this.baseUrl_ + "StyleSetting/GetStyleFabricListByStyleId?styleId=" + styleId + "&stylePartId=" + stylePartInfoId,
      this.baseUrl_ + "StyleSetting/GetStyleFabricListByStyleId?stylePartId=" +
      stylePartInfoId,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  async GetStyleFabricByPartIdToPromise(stylePartInfoId: number) {
    return this.http
      .get<any[]>(this.baseUrl_ + "StyleSetting/GetStyleFabricListByStyleId?stylePartId=" + stylePartInfoId, {
        headers: this.token.headerToken(),
      }).toPromise();
  }

  GetStyleFabricByPartIdForSample(stylePartInfoId: number): Observable<any> {
    return this.http.get<FabricDetailModel[]>(
      //this.baseUrl_ + "StyleSetting/GetStyleFabricListByStyleId?styleId=" + styleId + "&stylePartId=" + stylePartInfoId,
      this.baseUrl_ + "StyleSetting/GetStyleFabricListByStyleId?stylePartId=" +
      stylePartInfoId,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  GetStyleFabricByStyleIdForSample(styleId: number): Observable<any> {
    return this.http.get<FabricDetailModel[]>(
      //this.baseUrl_ + "StyleSetting/GetStyleFabricListByStyleId?styleId=" + styleId + "&stylePartId=" + stylePartInfoId,
      this.baseUrl_ + "StyleSetting/GetStyleFabricByStyleIdForSample?styleId=" +
      styleId,
      {
        headers: this.token.headerToken(),
      }
    );
  }


  GetBookinCadFabricListByStyleId(styleId: number, stylePartId: number): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ + "StyleSetting/GetBookinCadFabricListByStyleId?styleId=" + styleId + "&stylePartId=" + stylePartId,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  GetBookinCadFabricStyleListByStyleId(styleId: number, stylePartId: number, dataFrom: string): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ + "StyleSetting/GetBookinCadFabricStyleListByStyleId?styleId=" + styleId + "&stylePartId=" + stylePartId + "&dataFrom=" + dataFrom,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  // GetBookinCadFabricListByStyleIdToPromis(styleId: number, stylePartId: number){
  //   debugger
  //   return this.http.get<any[]>(      
  //     this.baseUrl_ + "StyleSetting/GetBookinCadFabricListByStyleId?styleId=" + styleId + "&stylePartId=" + stylePartId,
  //     {
  //       headers: this.token.headerToken(),
  //     }
  //   ).toPromise();
  // } 

  GetStyleFabricByStyleId(styleId: number, stylePartInfoId: number): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ + "StyleSetting/GetStyleFabricListByStyleId?styleId=" + styleId + "&stylePartId=" + stylePartInfoId,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  GetBookingPatternFabricByStyleId(styleId: number, stylePartInfoId: number): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ + "StyleSetting/GetBookingPatternFabricListByStyleId?styleId=" + styleId + "&stylePartId=" + stylePartInfoId,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetStyleFabricByOnlyStyleId(styleId: number): Observable<any> {
    debugger
    return this.http.get<any[]>(
      this.baseUrl_ + "StyleSetting/GetStyleFabricByOnlyStyleId?styleId=" + styleId,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetStylePartList(): Observable<any> {
    return this.http.get<StyleInfo[]>(
      this.baseUrl_ + "StyleSetting/GetStylePartList",
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetStyleInfoByBuyerId(buyerId: number): Observable<any> {
    return this.http.get<StyleInfo[]>(
      this.baseUrl_ + "StyleSetting/GetStyleListByBuyer?buyerId=" + buyerId,
      { headers: this.token.headerToken() }
    );
  }

  GetConfirmStyleInfoByBuyerId(buyerId: number): Observable<any> {
    return this.http.get<StyleInfo[]>(
      this.baseUrl_ + "StyleSetting/GetConfirmedStyleListByBuyer?buyerId=" + buyerId,
      { headers: this.token.headerToken() }
    );
  }

  GetConfirmedStyleListByBuyerForRepeatStyle(buyerId: number): Observable<any> {
    debugger
    return this.http.get<StyleInfo[]>(
      this.baseUrl_ + "StyleSetting/GetConfirmedStyleListByBuyerForRepeatStyle?buyerId=" + buyerId,
      { headers: this.token.headerToken() }
    );
  }

  GetBookingSalesContractByBuyerId(buyerId: number): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ +
      "BookingItemList/GetAllSalesContractBuyerwiseList?buyerId=" +
      buyerId,
      { headers: this.token.headerToken() }
    );
  }

  GetBookingSalesContractByBuyerSeasonYear(buyerId: number, seasonId: number, yearId: number, styleId: number): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ +
      "BookingItemList/GetAllSalesContractBuyerSeasonYearwiseList?buyerId=" +
      buyerId + "&seasonId=" + seasonId + "&yearId=" + yearId + "&styleId=" + styleId,
      { headers: this.token.headerToken() }
    );
  }
  GetBookingSalesContractByBuyerSeasonYearToPromise(buyerId: number, seasonId: number, yearId: number, styleId: number) {
    return this.http.get<any[]>(
      this.baseUrl_ +
      "BookingItemList/GetAllSalesContractBuyerSeasonYearwiseList?buyerId=" +
      buyerId + "&seasonId=" + seasonId + "&yearId=" + yearId + "&styleId=" + styleId,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  GetSalesContractByBuyerSeasonYearForBooking(buyerId: number, seasonId: number, yearId: number, styleId: number): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ +
      "BookingItemList/GetAllSalesContractBuyerSeasonYearwiseListForBooking?buyerId=" +
      buyerId + "&seasonId=" + seasonId + "&yearId=" + yearId + "&styleId=" + styleId,
      { headers: this.token.headerToken() }
    );
  }

  //Get purchase order size data
  GetPurchaseOrderSizeData(id: number) {
    return this.http.get<OrderManagementSize[]>(
      this.baseUrl_ +
      "OrderManagementMaster/GetOrderManagementSizeList?id=" +
      id,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  //Get purchase order colors data
  GetPurchaseOrderColorData(id: number) {
    return this.http.get<OrderManagementColors[]>(
      this.baseUrl_ +
      "OrderManagementMaster/GetOrderManagementColorList?id=" +
      id,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  //get purchase order master data
  GetPurchaseOrderMasterData() {
    return this.http.get<OrderManagementMaster[]>(
      this.baseUrl_ + "OrderManagementMaster/GetOrderManagementMasterList",
      {
        headers: this.token.headerToken(),
      }
    );
  }




  PurchaseOrderSaveData(
    orderManagementMaster: OrderManagementMaster
  ): Observable<any> {
    var body = {
      ...orderManagementMaster,
      orderManagementColorsList: this.orderManagementColorsList,
      orderManagementSizesList: this.orderManagementSizesList,
    };
    return this.http.post<any>(
      this.baseUrl_ + "OrderManagementMaster/CreateOrderManagementMaster",
      body,
      { headers: this.token.headerToken() }
    );
  }

  //Get track wise size list
  GetTrackWiseSizeList(trackNo: number) {
    {
      this.orderManagementTrackWiseSizeList = [];
      if (this.orderManagementSizesList.length > 0) {
        for (
          let index = 0;
          index < this.orderManagementSizesList.length;
          index++
        ) {
          if (this.orderManagementSizesList[index].trackNo == trackNo) {
            this.orderManagementTrackWiseSizeList.push(
              this.orderManagementSizesList[index]
            );
          }
        }
      }
    }
  }

  //Merchandising Delete Style
  DeleteStyleList(styleSelectedForDelete: StyleInfo[]) {
    var deleteStyle = new DeleteStyleInfo();
    deleteStyle.deleteStyleSettings = [];
    deleteStyle.deleteStyleSettings = styleSelectedForDelete;
    // console.log(JSON.stringify(deleteStyle));
    return this.http.post(
      this.baseUrl_ + "StyleSetting/DeleteStyleMultiple",
      deleteStyle,
      { headers: this.token.headerToken() }
    );
  }

  //Get mismatch style
  GetMismatchStyle(buyerId: number): Observable<any> {
    return this.http.get<StyleInfo[]>(
      this.baseUrl_ + "StyleSetting/GetMismatchStyles?buyerId=" + buyerId,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetMonthWisePo() {
    return this.http.get<PoReport[]>(this.baseUrl_ + "GetPoReport", {
      headers: this.token.headerToken(),
    });
  }
  GetPoSummaryReport() {
    return this.http.get(this.baseUrl_ + "GetPoSummaryReport", {
      headers: this.token.headerToken(),
    });
  }
  GetMonthWisePoWithBuyerID(buyerId: number) {
    return this.http.get<PoReport[]>(
      this.baseUrl_ + "GetPoReportByBuyer?buyerId=" + buyerId,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  GetMonthWisePoStyle() {
    return this.http.get<PoReport[]>(this.baseUrl_ + "GetPoStyleInfoReport", {
      headers: this.token.headerToken(),
    });
  }

  //zahid-17-4-2023
  GetBuyerWiseDeliveryQtyReport() {
    return this.http.get<PoReport[]>(this.baseUrl_ + "GetBuyerWiseDeliveryQtyReport", {
      headers: this.token.headerToken(),
    });
  }

  GetPOBuyerWise(buyerId: number, yearId: number, seasonId: number) {
    return this.http.get<OrderManagementMaster[]>(
      this.baseUrl_ +
      "Projection/GetSelectionByBSY?buyerId=" +
      buyerId +
      "&yearId=" +
      yearId +
      "&seasonId=" +
      seasonId,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  ///New po info format

  GetPoInfoForContract(buyerId: number, yearId: number, seasonId: number) {
    return this.http.get<any[]>(
      this.baseUrl_ +
      "OrderManagementMaster/GetOrderMasterForContract?buyerId=" +
      buyerId +
      "&yearId=" +
      yearId +
      "&seasonId=" +
      seasonId,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  GetSelectionInfoForContract(buyerId: number, yearId: number, seasonId: number) {
    return this.http.get<any[]>(
      this.baseUrl_ +
      "OrderManagementMaster/GetSelectionInfoForContract?buyerId=" +
      buyerId +
      "&yearId=" +
      yearId +
      "&seasonId=" +
      seasonId,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  async GetStyleWiseDataMargeDKTToPromise(PoList: any) {
    var body = {
      PoList: PoList,
    };
    return this.http.post<any>(
      this.baseUrl_ + "OrderManagementMaster/GetStyleWiseDataMargeDKT", body,
      { headers: this.token.headerToken(), }
    ).toPromise();
  }
  GetPoInfoForContractNew(contractId: number, buyerId: number) {
    return this.http.get<any[]>(
      this.baseUrl_ +
      "OrderManagementMaster/GetOrderMasterForContractNew?contractId=" +
      contractId +
      "&buyerId=" +
      buyerId,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  async GetPreviousPoDecreaseQty(PoList: any) {
    var body = {
      PreviousPoList: PoList,
    };
    return this.http.post<any>(
      this.baseUrl_ + "OrderManagementMaster/GetPreviousPoDecreaseQty", body,
      { headers: this.token.headerToken(), }
    ).toPromise();
  }
  async GetColorCodeWiseDataMargeToPromise(PoList: any) {
    var body = {
      PoList: PoList,
    };
    return this.http.post<any>(
      this.baseUrl_ + "OrderManagementMaster/GetColorCodeWiseDataMarge", body,
      { headers: this.token.headerToken(), }
    ).toPromise();
  }
  async GetStyleChangeToPromise(PoList: any) {
    var body = {
      PoList: PoList,
    };
    return this.http.post<any>(
      this.baseUrl_ + "OrderManagementMaster/GetStyleChange", body,
      { headers: this.token.headerToken(), }
    ).toPromise();
  }
  async GetStyleChangeCheckToPromise(PoList: any) {
    var body = {
      PoList: PoList,
    };
    return this.http.post<any>(
      this.baseUrl_ + "OrderManagementMaster/GetStyleChangeCheck", body,
      { headers: this.token.headerToken(), }
    ).toPromise();
  }


  //Get Pre Approved Cost Master List
  GetApprovedPreCostingListForNotification(): Observable<any> {
    debugger
    return this.http.get<any[]>(
      this.baseUrl_ + "Costing/GetApprovedPreCostingList",
      {
        headers: this.token.headerToken(),
      }
    );
  }
  //end
  //Get Pre Approved Cost Master List
  async GetApprovedPreCostingListForStyleCheck() {
    debugger
    return this.http.get<any[]>(
      this.baseUrl_ + "Costing/GetApprovedPreCostingList",
      {
        headers: this.token.headerToken(),
      }
    ).toPromise();
  }
  //end

  //end
  //Get Pre Approved Cost Master List
  async GetBomDataListForStyleCheck(styleId: number) {
    debugger
    return this.http.get<any[]>(
      this.baseUrl_ + "Costing/GetBomDataListForStyleCheck?styleId=" + styleId,
      {
        headers: this.token.headerToken(),
      }
    ).toPromise();
  }
  //end

  GetPOStyleInfo(poNo: string[]) {
    var poNoStr = "";
    for (var i = 0; i < poNo.length; i++) {
      poNoStr += "'" + poNo[i] + "'";
      if (i != poNo.length - 1) {
        poNoStr += ",";
      }
    }
    return this.http.get(
      this.baseUrl_ +
      "OrderManagementMaster/GetStylePoContractList?poNo=" +
      poNoStr,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  // Get All Style Fabric Head Data
  GetFabricHead(id: number): Observable<any> {
    return this.http.get<StyleFabricHead[]>(
      this.baseUrl_ + "StyleSetting/GetStyleFabricHeadList?id=" + id,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  //Merchandising Delete Style Fabric
  DeleteStyleFabric(id: number) {
    return this.http.post(
      this.baseUrl_ + "StyleSetting/DeleteStyleFabricById?id=" + id,
      { headers: this.token.headerToken() }
    );
  }
  //Get Style Part Data
  GetStylePartByStyleId(styleId: number) {
    return this.http.get<any[]>(
      this.baseUrl_ + "StyleSetting/PartListByStyleId?styleId=" + styleId,
      { headers: this.token.headerToken() }
    );
  }

  //Get Style Part Data Promise
  GetStylePartByStyleIdPromise(styleId: number) {
    return this.http.get<any[]>(
      this.baseUrl_ + "StyleSetting/PartListByStyleId?styleId=" + styleId,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  //Get R3 Data
  Getr3CodeVersionByStyleId(styleId: number) {
    return this.http.get<any[]>(
      this.baseUrl_ + "StyleSetting/Getr3CodeVersionByStyleId?styleId=" + styleId,
      { headers: this.token.headerToken() }
    );
  }
  //Get blocking
  GetBestsellerBlockingByStyleId(styleId: number) {
    return this.http.get<any[]>(
      this.baseUrl_ + "StyleSetting/GetBestsellerBlockingByStyleId?styleId=" + styleId,
      { headers: this.token.headerToken() }
    );
  }
  GetMultiSizeRangeByStyleId(styleId: number) {
    return this.http.get<any[]>(
      this.baseUrl_ + "StyleSetting/GetMultiSizeRangeByStyleId?styleId=" + styleId,
      { headers: this.token.headerToken() }
    );
  }
  GetStylePartByStyleIdToPromise(styleId: number) {
    return this.http.get<any[]>(
      this.baseUrl_ + "StyleSetting/PartListByStyleId?styleId=" + styleId,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  GetStyleFabricById(styleFabricId: number): Observable<any> {
    return this.http.get<StyleInfo[]>(
      this.baseUrl_ +
      "StyleSetting/GetSingleStyleFabricById?fabricId=" +
      styleFabricId,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  //Get Style Part Data
  GetStyleParSetup() {
    return this.http.get<any[]>(
      this.baseUrl_ + "StyleSetting/GetStylePartSetupList",
      { headers: this.token.headerToken() }
    );
  }

  DeleteStylePartById(id: number) {
    return this.http.post(
      this.baseUrl_ + "StyleSetting/DeleteStylePartById?id=" + id,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  // DeleteStylePartByPartId(id: number){
  //   return this.http.post
  // }

  //Get Size Ratio Data By Size Range Id
  GetSizeRatioBySizeRangeId(sizeRangeId: number, StyleID: number) {
    return this.http.get<any[]>(
      this.baseUrl_ +
      "StyleSetting/GetStyleSizeListBySizeRangeID?sizeRangeId=" +
      sizeRangeId + '&StyleID=' + StyleID,
      { headers: this.token.headerToken() }
    );
  }
  //Get Size Ratio Data By Style Id
  GetSizeRatioByStyleId(styleId: number) {
    return this.http.get<any[]>(
      this.baseUrl_ +
      "StyleSetting/GetStyleSizeListByStyleSettingID?styleSettingId=" +
      styleId,
      { headers: this.token.headerToken() }
    );
  }
  GetSizeRatioQtyBySizeRange(styleId: number, sizeRangeId: number) {
    return this.http.get<any[]>(
      this.baseUrl_ +
      "StyleSetting/GetSizeRatioQtyBySizeRange?styleId=" + styleId + "&sizeRangeId=" + sizeRangeId,
      { headers: this.token.headerToken() }
    );
  }


  //Get r3 Code Version By StyleId For Costing Cad
  Getr3CodeVersionByStyleIdForCostingCad(styleId: number) {
    return this.http.get<any[]>(
      this.baseUrl_ +
      "StyleSetting/Getr3CodeVersionByStyleIdForCostingCad?styleId=" +
      styleId,
      { headers: this.token.headerToken() }
    );
  }

  //Delete Size Ratio By Id
  DeleteSizeRatioById(id: number) {
    return this.http.post(
      this.baseUrl_ + "StyleSetting/DeleteSizeRatioById?id=" + id,
      { headers: this.token.headerToken() }
    );
  }

  //Merchandising Delete Style Process
  // DeleteStyleProcessById(id: number) {
  //   return this.http.post(
  //     this.baseUrl_ + "StyleSetting/DeleteStyleProcessById?id=" + id,
  //     { headers: this.token.headerToken() }
  //   );
  // }

  DeleteStyleProcessById(id: number) {
    return this.http.post(
      this.baseUrl_ + "StyleSetting/DeleteStyleProcessById?id=" + id,
      { Headers: this.token.headerToken() }
    );
  }

  GetCostingStatusByStyleId(styleId: number) {
    debugger
    return this.http.get<any[]>(this.baseUrl_ + "Costing/GetCostingStatusByStyleId?styleId=" + styleId, { headers: this.token.headerToken() });
  }

  GetCostMasterIdByStyleId(styleId: number, partId: number): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ + "Costing/GetCostMasterIdByStyleId?styleId=" + styleId + "&partId=" + partId,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  GetZipperListByCostMasterId(quotationNumber: string): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ + "Costing/GetZipperListByCostMasterId?quotationNumber=" + quotationNumber,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  GetOthersZipperList(buyerId: number, seasonId: number, yearId: number, styleId: number): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ + "Costing/GetOthersZipperList?buyerId=" +
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
  GetZipperUpdateData(quotationNumber: string, buyerId: number, styleId: number, yearId: number, seasonId: number): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ + "Costing/GetZipperUpdateData?quotationNumber=" + quotationNumber +
      "&buyerId=" + buyerId +
      "&styleId=" + styleId +
      "&yearId=" + yearId +
      "&seasonId=" + seasonId,
      {
        headers: this.token.headerToken(),
      }
    );
  }


  CheckUserIdWisePermissionForOpenCosting(): Observable<any> {
    debugger
    return this.http.get<any[]>(
      this.baseUrl_ + "Costing/CheckUserIdWisePermissionForOpenCosting",
      {
        headers: this.token.headerToken(),
      }
    );
  }
  // async ShowBomPoSizeDetail(styleId: number) {
  //   return this.http.get<any[]>(
  //     this.baseUrl_ + "Item/GetStyleWiseZipperDetail?styleId=" + styleId,
  //     {
  //       headers: this.token.headerToken(),
  //     }
  //   ).toPromise();
  // }

}
