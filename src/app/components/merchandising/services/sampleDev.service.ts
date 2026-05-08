import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { DateformatterService } from "src/app/shared/service/Dateformatter.service";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { ActivitySampleDevelopmentModel } from "../models/ActivitySampleDevelopmentModel";
import { Brand } from "../models/brand";
import { Buyer } from "../models/buyer";
import { FinishGoodsItem } from "../models/FinishGoodsItem";
import { SampleSize } from "../models/sample-size";
import { SampleDevelopmentDetailModel } from "../models/SampleDevelopmentDetailModel";
import { SampleDevelopmentMasterModel } from "../models/SampleDevelopmentMasterModel";
import { Sampleroomcomments } from "../models/sampleroomcomments";
import { SampleType } from "../models/sampleType";
import { Season } from "../models/seasonmodel";
import { FabricDetailModel } from "../models/FabircDetailModel";

@Injectable({
  providedIn: "root",
})
export class SampleDevService {
  buyerForm: Buyer;
  formData: SampleDevelopmentMasterModel;
  sdDetailList: SampleDevelopmentDetailModel[];
  sdMasterList: SampleDevelopmentMasterModel[];
  sdMasterCommonList: SampleDevelopmentMasterModel[];
  sdMasterSampleRoomList: SampleDevelopmentMasterModel[];
  sampleTotalQty = 0;
  brandList: Brand[];
  seasonList: Season[];
  poList: any[];
  SizeSelectList: SampleSize[];
  buyerList: Buyer[];
  sampleTypeList: SampleType[];
  finishGoodsList: FinishGoodsItem[];
  sampleRoomComntList: Sampleroomcomments[];
  ship = null;
  Ok = null;
  NotOk = null;
  activityFormData: ActivitySampleDevelopmentModel;
  baseUrl = environment.apiUrl + "merchandising/";
  helperUrl = environment.apiUrl;
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
  helperUrl_ = this.helperUrl.replace(/[?&]$/, "");

  totalQty = 0;
  dtTrigger = new Subject();
  auth_token = null;
  constructor(
    private http: HttpClient,
    private dateformatterService: DateformatterService,
    private datePipe: DatePipe,
    private token: TokenService
  ) { }

  //Buyer wise sample development data
  GetBuyerWiseSampleDevData(buyerId: number, status: string): Observable<any> {

    return this.http.get<SampleDevelopmentMasterModel[]>(
      this.baseUrl_ +
      "SampleDevelopment/SampleDevelopmentListForAll?buyerId=" +
      buyerId +
      "&status=" +
      status,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  // Development sample List
  GetBuyerWiseSampleDevelopmentData(buyerId: number, status: string): Observable<any> {

    return this.http.get<SampleDevelopmentMasterModel[]>(
      this.baseUrl_ +
      "SampleDevelopment/GetBuyerWiseSampleDevelopmentData?buyerId=" +
      buyerId +
      "&status=" +
      status,
      {
        headers: this.token.headerToken(),
      }
    );
  }

   // Confirm sample List
   GetBuyerWiseSampleConfirmData(buyerId: number, status: string): Observable<any> {

    return this.http.get<SampleDevelopmentMasterModel[]>(
      this.baseUrl_ +
      "SampleDevelopment/GetBuyerWiseSampleConfirmData?buyerId=" +
      buyerId +
      "&status=" +
      status,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  //Buyer wise sample development data
  GetBuyerWiseSampleDevDataSampleroom(buyerId: number, status: string): Observable<any> {

    return this.http.get<SampleDevelopmentMasterModel[]>(
      this.baseUrl_ +
      "SampleDevelopment/SampleDevelopmentListForSampleroom?buyerId=" +
      buyerId +
      "&status=" +
      status,
      {
        headers: this.token.headerToken(),
      }
    );
  }


  //tt
  GetBuyerWiseSampleDevList(): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ + "SampleDevelopment/SampleDevListForAll", {
      headers: this.token.headerToken(),
    });
  }



  //   GetSampleDevData( ): Observable<any> {
  //     debugger;
  //    return this.http.get<SampleDevelopmentMasterModel[]>(
  //      this.baseUrl_ +
  //        "SampleDevelopment/SampleDevelopmentListForAll",       
  //      {
  //        headers: this.token.headerToken(),
  //      }
  //    );
  //  }
  //Get Buyer information
  GetBuyerList(): Observable<any> {
    return this.http.get<Buyer[]>(this.baseUrl_ + "Helper/GetBuyerList", {
      headers: this.token.headerToken(),
    });
  }
  async GetBuyerListWithDefault() {
    return this.http
      .get<Buyer[]>(this.baseUrl_ + "Helper/GetBuyerList", {
        headers: this.token.headerToken(),
      }).toPromise();
  }

  //Get Buyer information for for any employee without permission
  async GetBuyerListWithoutPermissionCheck() {
    return this.http
      .get<Buyer[]>(this.baseUrl_ + "Helper/GetBuyerListWithoutPermissionCheck", {
        headers: this.token.headerToken(),
      }).toPromise();
  }

  //Get Buyer information for leftover
  GetBuyerListForLeftOver(): Observable<any> {
    return this.http.get<Buyer[]>(this.baseUrl_ + "Helper/GetBuyerListForLeftOver", {
      headers: this.token.headerToken(),
    });
  }

  //Get Buyer information
  GetTnaTaskList(): Observable<any> {
    return this.http.get<Buyer[]>(this.baseUrl_ + "Helper/GetBuyerList", {
      headers: this.token.headerToken(),
    });
  }

  //Get season Data
  GetSeasonList(buyerId: number): Observable<any> {
    return this.http.get<Season[]>(
      this.baseUrl_ + "Season?buyerId=" + buyerId,
      { headers: this.token.headerToken() }
    );
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

  //GetColorNameForSampleReq
  GetColorNameForSampleReq(buyerId: number): Observable<any> {    
    return this.http.get<any[]>(
      this.baseUrl_ + "SampleDevelopment/GetColorNameForSampleReq?buyerId=" + buyerId,
      { headers: this.token.headerToken() }
    );
  }
  GetBomColorListForSampleReq(quotationNo: string, buyDate: string){
    return this.http.get<any[]>(
      this.baseUrl_ + "SampleDevelopment/GetBomColorListForSampleReq?quotationNo=" + quotationNo + "&buyDate=" + buyDate,
      { headers: this.token.headerToken() }
    );
  }

  //GetSizeNameForSampleReq
  GetSizeNameForSampleReq(buyerId: number, sizeRangeId: number): Observable<any> {
    debugger
    return this.http.get<any[]>(
      this.baseUrl_ + "SampleDevelopment/GetSizeNameForSampleReq?buyerId=" + buyerId + "&sizeRangeId=" + sizeRangeId,
      { headers: this.token.headerToken() }
    );
  }
  GetBomSizeNameForSampleReq(costingId: number, buyDate: string): Observable<any> {
    debugger
    return this.http.get<any[]>(
      this.baseUrl_ + "SampleDevelopment/GetBomSizeNameForSampleReq?costingId=" + costingId + "&buyDate=" + buyDate,
      { headers: this.token.headerToken() }
    );
  }

  GetSizeWiseGroupList(): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "Helper/GetSizeWiseGroup", {
      headers: this.token.headerToken(),
    });
  }
  CreateSizeWiseGroupSetup(allData: any) {
    var body = {
      ...allData
    };
    //console.log(JSON.stringify(body));       
    return this.http.post<any>(this.baseUrl_ + "Helper/CreateSizeWiseGroupSetup", body, {
      headers: this.token.headerToken(),
    });
  }
  GetSCBrandList(buyerId: number): Observable<any> { //SC means Sales Contact For PO
    return this.http.get<any[]>(this.baseUrl_ + "Helper/GetSCBrandByBuyerId?buyerId=" + buyerId, {
      headers: this.token.headerToken(),
    });
  }

  //Save Sample Development Data
  saveOrUpdateSampleDevelopment(obj: FormData): Observable<any> {
    return this.http.post<any>(
      //this.baseUrl_ + "SampleDevelopment/CreateSampleDevMaster",
      this.baseUrl_ + "SampleDevelopment/CreateSampleDevelopment",
      obj,
      { headers: this.token.headerToken() }
    );
  }

  //varify Sample Development Data
  varifySampleDevelopment(sampleDevelopmentId: any): Observable<any> {
    debugger

    var obj = {
      sampleDevelopmentId: sampleDevelopmentId
    }

    console.log("masrterDataWithDetail", obj);
    return this.http.post<any>(
      //this.baseUrl_ + "SampleDevelopment/CreateSampleDevMaster",
      this.baseUrl_ + "SampleDevelopment/VarifySampleDevelopment",
      obj,
      { headers: this.token.headerToken() }
    );
  }

  //save sample devolopment data for cad&sample(bytt 6/8/23)
  saveOrUpdateSampleDev(obj: FormData): Observable<any> {
    return this.http.post<any>(
      this.baseUrl_ + "SampleDevelopment/CreateSampleCad", obj,
      { headers: this.token.headerToken() }
    );
  }


  // Get Sample dev master data
  GetSampleDevMasterData(): Observable<any> {
    return this.http.get<SampleDevelopmentMasterModel>(
      this.baseUrl_ + "SampleDevelopment/GetSampleDevelopments",
      { headers: this.token.headerToken() }
    );
  }

  //Get Sample Development data by id
  getSampleDevMasterById(id: number) {
    return this.http.get<SampleDevelopmentMasterModel>(
      this.baseUrl_ + "SampleDevelopment/GetSampleDevelopment/" + id,
      { headers: this.token.headerToken() }
    );
  }

  //get file bytt6/6/23
  GetSampleDevelopmentReqDataById(id: number) {
    return this.http.get<any>(
      this.baseUrl_ + "SampleDevelopment/GetSampleDevelopmentReqDataById/" + id,
      { headers: this.token.headerToken() }
    );
  }


  getSampleDevFileTypeListByMstId(id: number) {
    
    return this.http.get<any[]>(
      this.baseUrl_ + "SampleDevelopment/GetSampleDevFileTypeList/" + id,
      { headers: this.token.headerToken() }
    );
  }

  getSampleDevItembyMstId(id: number) {
    
    return this.http.get<any[]>(
      this.baseUrl_ + "SampleDevelopment/GetSampleDevItembyMstId/" + id,
      { headers: this.token.headerToken() }
    );
  }


  SaveOrUpdateActivitySampleDev() {
    return this.http.post<any>(
      this.baseUrl_ + "SampleDevelopment/CreatePostActivitySampleDevelopment",
      this.formData
    );
  }

  CreateAndGetSampleExtraQtyCode(sampleExtraQty: any) {
    var body = {
      ...sampleExtraQty
    };
    return this.http.post<any>(this.baseUrl_ + "SampleDevelopment/CreateAndGetSampleExtraQtyCode", body,
      { headers: this.token.headerToken() }
    );
  }

  UpdateSampleExtraQty(sampleExtraQtyList: any) {
    var body = {
      sampleExtraQtyList: sampleExtraQtyList,
    };
    return this.http.post<any>(
      this.baseUrl_ + "SampleDevelopment/UpdateSampleExtraQty", body,
      { headers: this.token.headerToken() }
    );
  }

  CreateCuttingMakingQty(cuttingMakingList: any) {
    var body = {
      sampleCuttingMakingList: cuttingMakingList,
    };
    return this.http.post<any>(
      this.baseUrl_ + "SampleDevelopment/CreateCuttingMakingQty", body,
      { headers: this.token.headerToken() });
  }

  SaveSampleRoomData(sd: SampleDevelopmentMasterModel) {
    return this.http.post<any>(
      this.baseUrl_ + "SampleDevelopment/PostSampleRoomActivity",
      sd,
      { headers: this.token.headerToken() }
    );
  }

  UnCommentRowDelete(sampleExtraQtyList: any) {
    var body = {
      sampleExtraQtyList: sampleExtraQtyList,
    };
    return this.http.post<any>(
      this.baseUrl_ + "SampleDevelopment/UnCommentRowDelete", body,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  DeleteRequitionNo(sampleDevMstId: number) {
    var body = {
      sampleDevMstId: sampleDevMstId,
    };
    return this.http.post<any>(
      this.baseUrl_ + "SampleDevelopment/DeleteRequitionNo", body,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetSampleExtraQtyListBySDMId(sampleDevelopmentMasterId: number): Observable<any> {

    return this.http.get<any[]>(this.baseUrl_ + "SampleDevelopment/GetSampleExtraQtyListBySDMId?sampleDevelopmentMasterId=" + sampleDevelopmentMasterId,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetOpenCostAprvItemData(styleId: number): Observable<any> {

    return this.http.get<any[]>(this.baseUrl_ + "SampleDevelopment/GetOpenCostAprvItemData?styleId=" + styleId,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetSampleCuttingMakingQtyListBySDMId(sampleDevelopmentMasterId: number): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "SampleDevelopment/GetSampleCuttingMakingQtyListBySDMId?sampleDevelopmentMasterId=" + sampleDevelopmentMasterId,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetHOSampleSizeQtyListForLeftOverBySDMId(sampleDevelopmentMasterId: number): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "SampleDevelopment/GetHOSampleSizeQtyListForLeftOverBySDMId?sampleDevelopmentMasterId=" + sampleDevelopmentMasterId,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  //get sample size total qty
  TotalSampleQty(): void {
    this.totalQty = 0;
    for (var index of this.sdDetailList) {
      this.totalQty = this.totalQty + index.sampleQuantity;
    }
  }

  GetSampleRoomCommentsData(id: number) {
    return this.http.get<Sampleroomcomments[]>(
      this.baseUrl_ + "SampleDevelopment/GetSampleRoomComment/" + id,
      { headers: this.token.headerToken() }
    );
  }

  ProcessData(dataList: any[]) {

    var obj = {
      sampleProcessDataList: dataList
    }

    //console.log('post data: ',JSON.stringify(obj));
    return this.http.post<any>(this.baseUrl_ + "SampleDevelopment/SaveProcessDataUpdate", obj, {
      headers: this.token.headerToken(),
    });
  }


  GetProcessData(): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "SampleDevelopment/GetProcessData",
      {
        headers: this.token.headerToken()
      }
    );
  }

  CreateSampleProjection(sampleProjectionTypeObj: any, sizeList: any[]) {
    var projectionData = {
      ...sampleProjectionTypeObj,
      sizeList: sizeList
    }

    console.log('sample data: ', JSON.stringify(sampleProjectionTypeObj));
    return this.http.post<any>(this.baseUrl_ + "SampleDevelopment/CreateSampleProjection", projectionData, {
      headers: this.token.headerToken(),
    });
  }



  GetSampleProjectionDataById(Id: number): Observable<any> {
    // debugger
    return this.http.get<any[]>(this.baseUrl_ + "SampleDevelopment/GetProcessDataById?Id=" + Id,
      {
        headers: this.token.headerToken()
      }
    );
  }

  GetSampleProjectionSizeById(Id: number): Observable<any> {

    return this.http.get<any[]>(this.baseUrl_ + "SampleDevelopment/GetSizeDetailsDataById?Id=" + Id,
      {
        headers: this.token.headerToken()
      }
    );
  }


  GetSubmitPermissionGroup() {
    return this.http.get<any[]>(this.baseUrl_ + "SampleDevelopment/GetSubmitPermissionGroup", { headers: this.token.headerToken() });
  }


//Get Sample Development color
getSampleDevColorBySampleDevMaster(id: number) {
    return this.http.get<any[]>(
      this.baseUrl_ + "SampleDevelopment/GetSampleDevColorBySampleDevMaster/" + id,
      { headers: this.token.headerToken() }
    );
  }
//Get Approved Costing fabric
  GetApprovedCostingFabricByStyleIdForConfirmSample(styleId: number, quotationNumber:string): Observable<any> {
    return this.http.get<FabricDetailModel[]>(
     this.baseUrl_ + "SampleDevelopment/GetApprovedCostingFabricByStyleIdForConfirmSample?styleId=" +
      styleId + "&quotationNumber=" + encodeURIComponent(quotationNumber),
      {
        headers: this.token.headerToken(),
      }
    );
  }
  GetItemByStyleIdForConfirmSample(styleId: number, quotationNumber:string, buyDate: string): Observable<any> {
    return this.http.get<FabricDetailModel[]>(
     this.baseUrl_ + "SampleDevelopment/GetItemByStyleIdForConfirmSample?styleId=" +
      styleId + "&quotationNumber=" + encodeURIComponent(quotationNumber) + "&buyDate=" + buyDate,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetQuotationWiseBomBuyDate(costingId: number): Observable<any> {
    return this.http.get<FabricDetailModel[]>(
     this.baseUrl_ + "SampleDevelopment/GetQuotationWiseBomBuyDate?costingId=" + costingId,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  //Get Approved Costing other item and process
  GetApprovedCostingAccByStyleIdForConfirmSample(styleId: number, quotationNumber:string): Observable<any> {
    return this.http.get<FabricDetailModel[]>(
     this.baseUrl_ + "SampleDevelopment/GetApprovedCostingAccByStyleIdForConfirmSample?styleId=" +
     styleId + "&quotationNumber=" + encodeURIComponent(quotationNumber),
      {
        headers: this.token.headerToken(),
      }
    );
  }
    //Get Approved Open Costing gQuotation
    GetOpenCostingQuotationForConfirmSample(styleId: number): Observable<any> {
      return this.http.get<any[]>(
       this.baseUrl_ + "SampleDevelopment/GetOpenCostingQuotationForConfirmSample?styleId=" +
        styleId,
        {
          headers: this.token.headerToken(),
        }
      );
    }
    //Get Approved Pre Costing gQuotation
    GetBomQuotationForConfirmSample(styleId: number): Observable<any> {
      return this.http.get<any[]>(
       this.baseUrl_ + "SampleDevelopment/GetBomQuotationForConfirmSample?styleId=" +
        styleId,
        {
          headers: this.token.headerToken(),
        }
      );
    }
     //Check Po by style id for sample
     CheckPOForConfirmSample(styleId: number): Observable<any> {
      return this.http.get<any[]>(
       this.baseUrl_ + "SampleDevelopment/CheckPOForConfirmSample?styleId=" +
        styleId,
        {
          headers: this.token.headerToken(),
        }
      );
    }
}
