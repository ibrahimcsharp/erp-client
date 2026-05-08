import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { ProcessOrderManagement } from "../../order-management/model/process-order-management";
import { StyleInfo } from "../../order-management/model/style-info";
import { PoActiveStatus } from "../model/po-model/po-active-status";
import { PoFileInfo } from "../model/po-model/po-file-info";
import { PoModel } from "../model/po-model/po-model";
import { PoModelV2 } from "../model/po-model/po-model-v2";
import { PoModelV3 } from "../model/po-model/po-model-v3";

@Injectable({
  providedIn: "root",
})
export class PoService {
  baseUrl = environment.apiUrl + "merchandising/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
  ProcessPurchaseOrderIdList: ProcessOrderManagement[] = [];
  auth_token = null;
  buyerId: number = 0;
  mismatchStyleList: StyleInfo[] = [];
  misMatchStyleCount: number = 0;
  totalSplitQty: number = 0;
  poSplitMasterList: any[] = [];
  poSplitDataList: any[] = [];
  poSplitRealDataList: any[] = [];
  splitPoSl: number = 0;
  splitBlockSl: number = 1;
  position: string = "";
  sizeSetupList: any[] = [];
  constructor(private http: HttpClient, private token: TokenService) { }

  MulPoUpdate1(mulPo: PoModel[]) {
    var body = {
      MultiplePurchaseOrderData: mulPo
    }
    return this.http.post<any>(this.baseUrl_ + "UpdatePurchaseOrderMultiple", body, {
      headers: this.token.headerToken(),
    });
  }

  //po upload post method for dkt,berne,otcf
  PoUpload(poModel: PoModel): Observable<any> {
    //JSON.stringify(PoModel);
    return this.http.post<any>(this.baseUrl_ + "CreatePurchaseOrder", poModel, {
      headers: this.token.headerToken(),
      reportProgress: true,
      observe: "events",
    });
  }

  //po upload post method for berne,otcf new
  PoUploadNew(poModel: PoModel): Observable<any> {
    debugger
    console.log(JSON.stringify(PoModel));
    return this.http.post<any>(this.baseUrl_ + "CreatePurchaseOrderNew", poModel, {
      headers: this.token.headerToken(),
      //reportProgress: true,
      // observe: "events",
    });
  }

  //po upload post method for otcf with upc
  PoUploadUpc(poModel: PoModel): Observable<any> {
    return this.http.post<any>(this.baseUrl_ + "CreatePurchaseOrderUpc", poModel, {
      headers: this.token.headerToken(),
      //reportProgress: true,
      // observe: "events",
    });
  }

  PoUploadBerne(poModel: PoModel): Observable<any> {
    debugger
    console.log(JSON.stringify(PoModel));
    return this.http.post<any>(this.baseUrl_ + "CreatePurchaseOrderForBerne", poModel, {
      headers: this.token.headerToken(),
      //reportProgress: true,
      // observe: "events",
    });
  }

  //Added by Ibrahim for UPC
  PoUploadBerneWithUpc(poModel: PoModel): Observable<any> {
    //debugger
    console.log(JSON.stringify(PoModel));
    return this.http.post<any>(this.baseUrl_ + "CreatePurchaseOrderForBerneUpc", poModel, {
      headers: this.token.headerToken(),
      //reportProgress: true,
      // observe: "events",
    });
  }

  //po upload post method for dkt
  DKTPoUpload(poModel: PoModel): Observable<any> {
    return this.http.post<any>(this.baseUrl_ + "CreateDKTPurchaseOrder", poModel, {
      headers: this.token.headerToken(),
    });
  }

  //Get Purchase Order Data
  GetPurchaseOrderList(buyerId: number, seasonId: number, yearId: number, styleId: number): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ +
      "GetPurchaseOrderListForCreate?buyerId=" +
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

  //po upload post method for dkt UPC
  DKTPoUploadWithUpc(poModel: PoModel): Observable<any> {
    return this.http.post<any>(this.baseUrl_ + "CreateDKTPurchaseOrderUpc", poModel, {
      headers: this.token.headerToken(),
    });
  }

  //ab,columbia,ling&fung,stromtech,timberland,napa
  PoUploadv2(poModel: PoModelV2): Observable<any> {
    //console.log(JSON.stringify(poModel));
    //console.log(poModel);
    return this.http.post<any>(
      this.baseUrl_ + "CreatePurchaseOrderV2",
      poModel,
      {
        headers: this.token.headerToken(),
        reportProgress: true,
        observe: "events",
      }
    );
  }

  //ab,columbia,ling&fung,stromtech,timberland,napa new
  PoUploadv2New(poModel: PoModelV2): Observable<any> {
    //console.log(JSON.stringify(poModel));
    //console.log(poModel);
    return this.http.post<any>(
      this.baseUrl_ + "CreatePurchaseOrderV2New",
      poModel,
      {
        headers: this.token.headerToken()//,
        //reportProgress: true,
        //observe: "events",
      }
    );
  }


  //Tendam
  PoUploadTendam(poModel: PoModelV2): Observable<any> {
    return this.http.post<any>(
      this.baseUrl_ + "CreatePurchaseOrderTendam",
      poModel,
      {
        headers: this.token.headerToken()
      }
    );
  }

   //HADDAD
   PoUploadHaddad(poModel: PoModelV2): Observable<any> {
    return this.http.post<any>(
      this.baseUrl_ + "CreatePurchaseOrderHaddad",
      poModel,
      {
        headers: this.token.headerToken()
      
      }
    );
  }

  //ab,columbia,ling&fung,stromtech,timberland,napa new
  PoUploadv2Upc(poModel: PoModelV2): Observable<any> {
    //console.log(JSON.stringify(poModel));
    //console.log(poModel);
    return this.http.post<any>(
      this.baseUrl_ + "CreatePurchaseOrderV2Upc",
      poModel,
      {
        headers: this.token.headerToken()//,
        //reportProgress: true,
        //observe: "events",
      }
    );
  }

  PoUploadv3(poModel: PoModelV3): Observable<any> {
    //console.log(JSON.stringify(poModel));
    //console.log(poModel);
    return this.http.post<any>(
      this.baseUrl_ + "CreatePurchaseOrderV3",
      poModel,
      {
        headers: this.token.headerToken(),
        reportProgress: true,
        observe: "events",
      }
    );
  }

  PoUploadv3New(poModel: PoModelV3): Observable<any> {
    //console.log(JSON.stringify(poModel));
    //console.log(poModel);
    return this.http.post<any>(
      this.baseUrl_ + "CreatePurchaseOrderV3New",
      poModel,
      {
        headers: this.token.headerToken(),
        //reportProgress: true,
        // observe: "events",
      }
    );
  }

  // Get order type data
  GetOrderTypeData() {
    return this.http.get<any[]>(this.baseUrl_ + "GetOrderTypeDataPO", {
      headers: this.token.headerToken(),
    });
  }

  // Get shipped type data
  GetShippedTypeData() {
    return this.http.get<any[]>(this.baseUrl_ + "GetShippedTypeDataPO", {
      headers: this.token.headerToken(),
    });
  }


  //Get po upload current data
  GetCurrentPoData(): Observable<any> {
    return this.http.get<PoModel[]>(this.baseUrl_ + "GetPurchaseOrderCurrent", {
      headers: this.token.headerToken(),
    });
  }

  //Get Sales Contract data
  GetSalesContractListByBSYId(buyerId: number, seasonId: number, yearId: number, companyId: number): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "GetContractMasterByBSYId?buyerId=" + buyerId + "&seasonId=" + seasonId + "&yearId=" + yearId + "&companyId=" + companyId, {
      headers: this.token.headerToken(),
    });
  }

  //Get po upload current data
  GetPoListForDropdown(buyerId: number, seasonId: number, yearId: number, styleId: number) {
    return this.http.get<any[]>(this.baseUrl_ + "GetPoListForDropdown?buyerId=" + buyerId + "&seasonId=" + seasonId + "&yearId=" + yearId + "&styleId=" + styleId, {
      headers: this.token.headerToken(),
    }).toPromise();
  }

  //get purchase order summary data
  GetPOSummaryList(buyerId: number, seasonId: number, yearId: number, styleId: number, orderNo: string, model: string) {
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
    if (orderNo == null) {
      orderNo = "";
    }
    if (model == null) {
      model = "";
    }
    return this.http.get<any[]>(
      this.baseUrl_ + "GetPOSummaryList?buyerId=" + buyerId + "&seasonId=" + seasonId + "&yearId=" + yearId +
      "&styleId=" + styleId + "&orderNo=" + orderNo + "&model=" + model,
      {
        headers: this.token.headerToken()
      }).toPromise();
  }

  //Get po all data
  GetPoAllList(buyerId: number, seasonId: number, yearId: number, processStatus: string, sizeStatus: number, brandId: number): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }
    if (brandId == null) {
      brandId = 0;
    }
    if (processStatus == null) {
      processStatus = "";
    }
    return this.http.get<PoModel[]>(
      this.baseUrl_ + "GetPurchaseOrder?buyerId=" + buyerId + "&seasonId=" + seasonId + "&yearId=" + yearId +
      "&processStatus=" + processStatus + "&sizeStatus=" + sizeStatus + "&brandId=" + brandId,
      { headers: this.token.headerToken() }
    );
  }
  GetBuyerWisePoAllListToPrimis(buyerId: number, styleNo: string, processStatus: string) {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (processStatus == null) {
      processStatus = "";
    }
    return this.http.get<any>(
      this.baseUrl_ + "GetBuyerWisePoAllList?buyerId=" + buyerId + "&styleNo=" + styleNo + "&processStatus=" + processStatus,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  GetBuyerSeasonYearWisePOListPromise(buyerId: number, seasonId: number, yearId: number) {
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
      this.baseUrl_ + "GetBuyerSeasonYearWisePOAllList?buyerId=" + buyerId + "&seasonId=" + seasonId + "&yearId=" + yearId,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  GetStyleWisePoAllListToPrimis(buyerId: number, styleId: number, processStatus: string) {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (processStatus == null) {
      processStatus = "";
    }
    return this.http.get<any>(
      this.baseUrl_ + "GetStyleWisePoAllList?buyerId=" + buyerId + "&styleId=" + styleId + "&processStatus=" + processStatus,
      { headers: this.token.headerToken() }
    ).toPromise();
  }
  //Get po all data
  GetChangeData(buyerId: number, seasonId: number, yearId: number, processStatus: string): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }

    if (processStatus == null) {
      processStatus = "";
    }
    return this.http.get<any[]>(
      this.baseUrl_ + "GetChangeData?buyerId=" + buyerId + "&seasonId=" + seasonId + "&yearId=" + yearId +
      "&processStatus=" + processStatus,
      { headers: this.token.headerToken() }
    );
  }

  //Get Extraction PO
  extractionPO(buyerId: number, seasonId: number, yearId: number, processStatus: string) {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }

    if (processStatus == null) {
      processStatus = "";
    }
    return this.http.get<any[]>(
      this.baseUrl_ + "GetExtractionPO?buyerId=" + buyerId + "&seasonId=" + seasonId + "&yearId=" + yearId +
      "&processStatus=" + processStatus,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  //Get po revised data
  GetPoRevisedList(
    buyerId: number,
    seasonId: number,
    yearId: number
  ): Observable<any> {
    return this.http.get<PoModel[]>(
      this.baseUrl_ +
      "GetPurchaseOrder?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId +
      "&poStatus=" +
      "R",
      { headers: this.token.headerToken() }
    );
  }

  GetDeletedPoList(buyerId: number, seasonId: number, yearId: number): Observable<any> {
    return this.http.get<PoModel[]>(
      this.baseUrl_ + "GetPODeletedList?buyerId=" + buyerId + "&seasonId=" + seasonId + "&yearId=" + yearId,
      { headers: this.token.headerToken() }
    );
  }

  GetDKTPOReportDataList(buyerId: number, seasonId: number, yearId: number): Observable<any> {
    return this.http.get<PoModel[]>(
      this.baseUrl_ + "GetDKTPOReportDataList?buyerId=" + buyerId + "&seasonId=" + seasonId + "&yearId=" + yearId,
      { headers: this.token.headerToken() }
    );
  }


  GetDKTPONonEUReportDataList(buyerId: number, seasonId: number, yearId: number): Observable<any> {
    return this.http.get<PoModel[]>(
      this.baseUrl_ + "GetDKTPONonEUReportDataList?buyerId=" + buyerId + "&seasonId=" + seasonId + "&yearId=" + yearId,
      { headers: this.token.headerToken() }
    );
  }

  //Update Po
  UpdatePO(pomodel: PoModel) {
    console.log(JSON.stringify(pomodel));
    return this.http.post(this.baseUrl_ + "UpdatePurchaseOrder", pomodel, {
      headers: this.token.headerToken(),
    });
  }

  PoNotificationListUpdate(poList: any): Observable<any> {
    var body = {
      poList: poList
    }
    return this.http.post(this.baseUrl_ + "PoNotificationListUpdate", body, {
      headers: this.token.headerToken(),
    });
  }

  //Merchandising Delete po
  DeletePOForUser(poActiveStatus: PoActiveStatus): Observable<any> {
    console.log(poActiveStatus);
    return this.http.post<any>(
      this.baseUrl_ + "UpdatePOActiveStatus",
      poActiveStatus,
      { headers: this.token.headerToken() }
    );
  }

  // DeletePOForUser(poList: PoActiveStatus){
  //   debugger
  //   return this.http.post<any>(this.baseUrl_ + "OrderManagementMaster/UpdatePOActiveStatusTest", poList,{
  //     headers: this.token.headerToken()
  //   })
  // }

  //Split new po
  SplitPO(pomodel: any[]) {
    var body = {
      splitPOs: pomodel,
    };
    console.log(JSON.stringify(body));
    return this.http.post(this.baseUrl_ + "CreateSplitPo", body, {
      headers: this.token.headerToken(),
    });
  }

  //Split new po ForColumbia
  CreateColumbiaSplitPo(masterData, splotList: any[]) {
    var body = {
      ...masterData,
      columbiaSplitPOs: splotList,
    };
    console.log(JSON.stringify(body));
    return this.http.post(this.baseUrl_ + "CreateColumbiaSplitPo", body, {
      headers: this.token.headerToken(),
    });
  }

  UpdatePoMenual(obj: any) {
    return this.http.post(this.baseUrl_ + "UpdatePoMenual", obj, {
      headers: this.token.headerToken(),
    });
  }

  async CreatePOFileStyleWise(poFileUploadModel) {
    var body = {
      ...poFileUploadModel,
    };
    return this.http.post<any>(this.baseUrl_ + "CreatePOFileStyleWise", body, {
      headers: this.token.headerToken(),
    }).toPromise();
  }

  POSummaryUpdate(multiplePO: any[]) {
    var body = {
      MultiplePOData: multiplePO
    }
    return this.http.post<any>(this.baseUrl_ + "UpdatePOSummary", body, {
      headers: this.token.headerToken(),
    });
  }

  SendToKafka(selectedPoList: ProcessOrderManagement) {
   
    return this.http.post<any>(this.baseUrl_ + "SendToKafka", selectedPoList, {
      headers: this.token.headerToken(),
    });
  }

  //Save po manually input
  SavePoManually(poModel: PoModel) {
    //console.log(JSON.stringify(poModel));
    return this.http.post(
      this.baseUrl_ + "CreatePurchaseOrderManually",
      poModel,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  //api/merchandising/OrderManagementMaster/ProcessOrderManagement
  ProcessPoToCommonFormat(selectedPoList: ProcessOrderManagement): Observable<any> {
    console.log(JSON.stringify(selectedPoList));
    return this.http.post<any>(
      this.baseUrl_ + "OrderManagementMaster/ProcessOrderManagement",
      selectedPoList,
      {
        headers: this.token.headerToken(),
        //reportProgress: true,
        //observe: "events",
      }
    );
  }

  VerifyPoDataCommonFormat(
    selectedPoList: ProcessOrderManagement
  ): Observable<any> {
    console.log(JSON.stringify(selectedPoList));
    return this.http.post<any>(
      this.baseUrl_ + "OrderManagementMaster/VarifyPOData",
      selectedPoList,
      {
        headers: this.token.headerToken(),
        //reportProgress: true,
        //observe: "events",
      }
    );
  }

  //po file info save and get file track no SavePoFileInfo
  SavePoFileInfo(poFileInfo: PoFileInfo) {
    return this.http.post<any>(this.baseUrl_ + "SavePoFileInfo", poFileInfo, {
      headers: this.token.headerToken(),
    });
  }

  //po file info save and get file track no SavePoFileInfo2
  SavePoFileInfo2(poFileInfo: PoFileInfo) {
    return this.http.post<any>(this.baseUrl_ + "SavePoFileInfo2", poFileInfo, {
      headers: this.token.headerToken(),
    });
  }

  RevisedPO(POList: any[]) {
    var body = {
      replacePurchaseOrders: POList,
    };

    return this.http.post<any>(this.baseUrl_ + "POReplace", body, {
      headers: this.token.headerToken(),
    });
  }

  //Get Purchase Order Follow Summary
  GetPurchaseOrderFollowSummaryList(buyerId: number, seasonId: number, yearId: number): Observable<any> {
    return this.http.get<PoModel[]>(
      this.baseUrl_ +
      "GetPurchaseOrderFollowSummary?buyerId=" +
      buyerId +
      "&seasonId=" +
      seasonId +
      "&yearId=" +
      yearId,
      { headers: this.token.headerToken() }
    );
  }

  //Update Follow UP PO single
  UpdateFollowuUpPO(allData: any) {
    var body = {
      ...allData
    };

    console.log(JSON.stringify(body));

    return this.http.post<any>(this.baseUrl_ + "UpdateFollowUpPurchaseOrder", body, {
      headers: this.token.headerToken(),
    });
  }

  //Update Follow UP PO multiple
  UpdateFollowuUpPOMultiple(mulPo: PoModel[]) {
    var body = {
      MultipleFollowUpPurchaseOrderData: mulPo
    }
    return this.http.post<any>(this.baseUrl_ + "UpdateFollowUpPurchaseOrderMultiple", body, {
      headers: this.token.headerToken(),
    });
  }

  //Get Purchase Order Follow Item List
  GetPurchaseOrderFollowItemList(): Observable<any> {
    return this.http.get<PoModel[]>(
      this.baseUrl_ + "GetPurchaseOrderFollowItem",
      {
        headers: this.token.headerToken()
      }
    );
  }

  //Get Purchase Order Follow Detail List
  GetPurchaseOrderFollowDetailList(id: number): Observable<any> {
    return this.http.get<PoModel[]>(
      this.baseUrl_ +
      "GetPurchaseOrderFollowDetailList?id=" +
      id,
      { headers: this.token.headerToken() }
    );
  }

  //Get Purchase Order Follow Item Reason List
  GetPurchaseOrderFollowItemReasonList(): Observable<any> {
    return this.http.get<PoModel[]>(
      this.baseUrl_ + "GetPurchaseOrderFollowItemReason",
      {
        headers: this.token.headerToken()
      }
    );
  }

  originalPOUpload(originalPoModel: any): Observable<any> {
    console.log(JSON.stringify(originalPoModel));
    return this.http.post<any>(
      this.baseUrl_ + "OriginalPOUpload",
      originalPoModel,
      {
        headers: this.token.headerToken()
      });
  }
}