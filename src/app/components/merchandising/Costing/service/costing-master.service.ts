import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Workbook } from "exceljs";
import * as fs from "file-saver";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { CostAccessories } from "../model/costing-accessories.model";
import { CostFabric } from "../model/costing-fabric-model";
import { CostingMasterModel } from "../model/costing-model";

//import {DeleteBuyerInfo} from "../models/DeleteBuyerInfo"

@Injectable({
  providedIn: "root",
})
export class CostingMasterService {
  formData: CostingMasterModel;
  costingList: CostingMasterModel[];

  costingCompleteList: CostingMasterModel[];
  previouscostingList: CostingMasterModel[];
  costingCheckedList: CostingMasterModel[];
  costingApprovedList: CostingMasterModel[];
  preCostingCompleteList: CostingMasterModel[];
  preCostingCheckedList: CostingMasterModel[];
  preCostingApprovedList: CostingMasterModel[];

  headers = {};
  baseUrl = environment.apiUrl + "merchandising/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");

  auth_token = null;
  constructor(private http: HttpClient, private token: TokenService) {}

  CreateCostingMaster(
    costing: CostingMasterModel,
    fabricList: CostFabric[],
    accessoriesList: CostAccessories[]
  ) {
    debugger
    costing.costAccessoriesList = accessoriesList;
    costing.costingFabricsList = fabricList;
    console.log(JSON.stringify(costing));
    return this.http.post<any>(
      this.baseUrl_ + "Costing/CreateCostFullSave",
      costing,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  CreateSupplyChainCosting(costing: CostingMasterModel,fabricList: CostFabric[],accessoriesList: CostAccessories[]) 
  {
    costing.costAccessoriesList = accessoriesList;
    costing.costingFabricsList = fabricList;
    console.log(JSON.stringify(costing));
    return this.http.post<any>(
      this.baseUrl_ + "Costing/CreateSupplyChainCosting",
      costing,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  CreatePreCostingDataUpload(costingModel: any) 
  {       
    console.log(JSON.stringify(costingModel));
    return this.http.post<any>(
      this.baseUrl_ + "Costing/CreatePreCostingDataUpload",
      costingModel,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  CreateOpenCostingDataUpload(costingModel: any) 
  {   
    console.log(JSON.stringify(costingModel));
    return this.http.post<any>(
      this.baseUrl_ + "Costing/CreateOpenCostingDataUpload",
      costingModel,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  
  GetCostingMasterList(): Observable<any> {
    return this.http.get<CostingMasterModel[]>(
      this.baseUrl_ + "Costing/GetCostingMasterList",
      {
        headers: this.token.headerToken(),
      }
    );
  }
  
  GetOpenApproveCostingByStyleId(costingStatus: string,status: string,styleId: number): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ +"Costing/GetOpenApproveCostingByStyleId?costingStatus=" +costingStatus + "&status=" +status +"&styleId=" +styleId,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetGStarOpenCostingUploadData(styleId: number, costPartId: number): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ + "Costing/GetGStarOpenCostingUploadData?styleId="+ styleId +
      "&costPartId="+ costPartId,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  GetGStarPreCostingUploadDataByStyle(styleId: number, costPartId: number): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ + "Costing/GetGStarPreCostingUploadDataByStyle?styleId="+ styleId +
      "&costPartId="+ costPartId,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  GetGStarOpenCostingUploadDataByBuyerSeasonYear(buyerId: number, seasonId: number, yearId: number): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ + "Costing/GetGStarOpenCostingUploadDataByBuyerSeasonYear?buyerId="+ buyerId +
      "&seasonId="+ seasonId + "&yearId=" + yearId,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  GetGStarOpenCostingUploadDataByBuyerSeasonYearToPrommis(buyerId: number, seasonId: number, yearId: number){
    return this.http.get<any[]>(
      this.baseUrl_ + "Costing/GetGStarOpenCostingUploadDataByBuyerSeasonYear?buyerId="+ buyerId +
      "&seasonId="+ seasonId + "&yearId=" + yearId,
      {
        headers: this.token.headerToken(),
      }
    ).toPromise();
  }

  GetGStarPreCostingUploadDataByBuyerSeasonYear(buyerId: number, seasonId: number, yearId: number): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ + "Costing/GetGStarPreCostingUploadDataByBuyerSeasonYear?buyerId="+ buyerId +
      "&seasonId="+ seasonId + "&yearId=" + yearId,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  GetGStarPreCostingUploadDataByBuyerSeasonYearToPrommis(buyerId: number, seasonId: number, yearId: number){
    return this.http.get<any[]>(
      this.baseUrl_ + "Costing/GetGStarPreCostingUploadDataByBuyerSeasonYear?buyerId="+ buyerId +
      "&seasonId="+ seasonId + "&yearId=" + yearId,
      {
        headers: this.token.headerToken(),
      }
    ).toPromise();
  }
  DeletePreCostingStyle(deletedObj: any) {    
   
    return this.http.post(
      this.baseUrl_ + "Costing/DeletePreCostingStyle",
      deletedObj,
      { headers: this.token.headerToken() }
    );
  }
  DeleteOpenCostingStyle(deletedObj: any) {    
   
    return this.http.post(
      this.baseUrl_ + "Costing/DeleteOpenCostingStyle",
      deletedObj,
      { headers: this.token.headerToken() }
    );
  }

  async GetPOColorList(styleId: number){

    return this.http.get<any[]>(
      this.baseUrl_ + "Costing/GetPOColorListByStyleId?styleId=" + styleId,
      {headers: this.token.headerToken()}).toPromise();
  }
 
  GetCostingMasterListByStyleId(id: number): Observable<any> {
    return this.http.get<CostingMasterModel[]>(
      this.baseUrl_ + "Costing/GetCostingMasterListByStyleId?Id=" + id,
      {
        headers: this.token.headerToken(),
      });
  }

  GetCostingListByStyleId(styleId: number, styleName: string): Observable<any> {    
    return this.http.get<CostingMasterModel[]>(
      this.baseUrl_ + "Costing/GetCostingListByStyleId?styleId=" + styleId + "&styleName=" + styleName,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  //Get Costing Master data by id
  getCostingMasterListById(id: number) {
    return this.http.get<CostingMasterModel>(
      this.baseUrl_ +
        "Costing/GetFabricAndAccessoriesListByCostingMaster?id=" +
        id,
      { headers: this.token.headerToken() }
    );
  }

  //Get Supply Chain Costing data by id
  getSupplyChainCostingInfoById(id: number) {
    return this.http.get<any>(
      this.baseUrl_ + "Costing/GetSupplyChainCostingDetailsById?id=" + id, 
      { headers: this.token.headerToken() });
  }
  
  //Get Supply Chain Costing data by Style, Quotation Number
  // getSupplyChainCostingInfoByQuotationNumber(id: number) {
  //   return this.http.get<any>(
  //     this.baseUrl_ + "Costing/GetSupplyChainCostingDetailsById?styleId=" + id, 
  //     { headers: this.token.headerToken() });
  // }
  
  //Get Costing Master data by id
  getCostingMasterListByPartId(id: number, costPartId: number) {
    return this.http.get<any>(
      this.baseUrl_ +
        "Costing/GetCostingAllInfoByPartId?id=" + id + "&costPartId=" + costPartId,
      { headers: this.token.headerToken() }
    );
  }
  getCostingMasterListByPartIdToPromise(id: number, costPartId: number) {
    return this.http.get<any>(
      this.baseUrl_ +
        "Costing/GetCostingAllInfoByPartId?id=" + id + "&costPartId=" + costPartId,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  //Copy New Costing Master data by id
  copyNewCostingMasterById(id: number) {
    var obj = {
      id: id,
    };
    return this.http.post<any>(
      this.baseUrl_ + "Costing/CostReviseProcess", obj,
      { headers: this.token.headerToken() }
    );
  }

  //Copy New Costing Master data by id
  copyNewCosting(styleId: number, quotationNumber: string) {
    var obj = {
      styleId: styleId,
      quotationNumber: quotationNumber
    };
    return this.http.post<any>(
      this.baseUrl_ + "Costing/CostReviseProcess", obj,
      { headers: this.token.headerToken() }
    );
  }

  StyleImageUpload(file: File, styleId: string): Observable<HttpEvent<void>> {
    const command: FormData = new FormData();
    command.append("file", file, file.name);
    command.append("styleId", styleId);
    return this.http.request(
      new HttpRequest(
        "POST",
        this.baseUrl_ + "StyleImage/CreateStyleImage",
        command,
        {
          reportProgress: true,
          headers: this.token.headerToken(),
        }
      )
    );
  }

  //Get Costing Master data by Quotation Number
  getCostingMasterListByQuotationNumber(quotationNumber: string) {
    return this.http.get<CostingMasterModel[]>(
      this.baseUrl_ +
        "Costing/GetCostMasterByQuotationList?quotationNumber=" +
        quotationNumber,
      { headers: this.token.headerToken() }
    );
  }
  //Get All Cost Master List
  GetCostingMasterAllList(costingStatus: string, status: string, currentUrl: string): Observable<any> {
    return this.http.get<CostingMasterModel[]>(
      this.baseUrl_ + "Costing/GetCostingMasterAllList?costingStatus=" + costingStatus + "&status=" + status + "&currentUrl=" + currentUrl,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetOpenApprovedCostingMasterListByStyleId(costingStatus: string, status: string, buyerId, seasonId, yearId, styleId): Observable<any> {
    return this.http.get<CostingMasterModel[]>(
      this.baseUrl_ + "Costing/GetOpenApprovedCostingMasterListByStyleId?costingStatus=" + costingStatus + "&status=" + status + "&buyerId=" + buyerId+ "&seasonId=" + seasonId+ "&yearId=" + yearId + "&styleId=" + styleId,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  GetGStarSFCList(styleId: Number): Observable<any> {
    return this.http.get<CostingMasterModel[]>(
      this.baseUrl_ + "Costing/GetGStarSFCList?styleId=" + styleId + "",
      {
        headers: this.token.headerToken(),
      }
    );
  }

  GetGStarOpenCostingSFCList(styleId: Number): Observable<any> {
    return this.http.get<CostingMasterModel[]>(
      this.baseUrl_ + "Costing/GetGStarOpenCostingSFCList?styleId=" + styleId + "",
      {
        headers: this.token.headerToken(),
      }
    );
  }
  //Get All Supply Chain Cost List
  GetSupplyChainCostingList(): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ + "Costing/GetSupplyChainCostingList",
      {
        headers: this.token.headerToken(),
      }
    );
  }
  //Get All Supply Chain Cost List
  GetSupplyChainCostingListToPromise(){
    return this.http.get<any[]>(this.baseUrl_ + "Costing/GetSupplyChainCostingList",
      { headers: this.token.headerToken() }).toPromise();
  }
  //Get Open Draft Cost Master List
  GetDraftOpenCostingList(currentUrl: string): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ + "Costing/GetDraftOpenCostingList?currentUrl=" + currentUrl,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  async GetDraftOpenCostingListToPromise(currentUrl: string){
    return this.http.get<any[]>(
      this.baseUrl_ + "Costing/GetDraftOpenCostingList?currentUrl=" + currentUrl,
      {
        headers: this.token.headerToken(),
      }).toPromise();
  }

  //Get Open Complete Cost Master List
  GetCompleteOpenCostingList(currentUrl: string): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ + "Costing/GetCompleteOpenCostingList?currentUrl=" + currentUrl,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  //Get Open Checked Cost Master List
  GetCheckedOpenCostingList(currentUrl: string): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ + "Costing/GetCheckedOpenCostingList?currentUrl=" + currentUrl,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  //Get Open Approved Cost Master List
  GetApprovedOpenCostingList(currentUrl: string): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ + "Costing/GetApprovedOpenCostingList?currentUrl=" + currentUrl,
      {
        headers: this.token.headerToken(),
      }
    );
  }

    //Get Open Approved Cost Master List for check
  async  StyleCheckForConfirmFromApprovedCosting(styleId : number) {
      return this.http.get<any[]>(
        this.baseUrl_ + "Costing/StyleCheckForConfirmFromApprovedCosting?styleId=" +styleId,
        {
          headers: this.token.headerToken(),
        }
      ).toPromise();
    }

  //Get Pre Draft Cost Master List
  GetDraftPreCostingList(currentUrl: string): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ + "Costing/GetDraftPreCostingList?currentUrl=" + currentUrl,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  //Get Pre Complete Cost Master List
  GetCompletePreCostingList(currentUrl: string): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ + "Costing/GetCompletePreCostingList?currentUrl=" + currentUrl,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  //Get Pre Checked Cost Master List
  GetCheckedPreCostingList(currentUrl: string): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ + "Costing/GetCheckedPreCostingList?currentUrl=" + currentUrl,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  //Get Pre Approved Cost Master List
  GetApprovedPreCostingList(currentUrl: string ): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ + "Costing/GetApprovedPreCostingList?currentUrl=" + currentUrl,
      {
        headers: this.token.headerToken(),
      }
    );
  }


  PreCostingStatusUpadate(obj: any) {
    debugger
    return this.http.post<any>(
      this.baseUrl_ + "Costing/PreCostingStatusUpadate",
      obj,
      { headers: this.token.headerToken() }
    );
  }


  PreCostingApprovedForBom(quotationNumber: any) {
    debugger
    var obj = {
      quotationNumber: quotationNumber,
    };
    return this.http.post<any>(
      this.baseUrl_ + "Costing/PreCostingApprovedForBom",
      obj,
      { headers: this.token.headerToken() }
    );
  }
  CostingSummaryUpdate(obj: any) {    
    
    return this.http.post<any>(
      this.baseUrl_ + "Costing/CostingSummaryUpdate",
      obj,
      { headers: this.token.headerToken() }
    );
  }

  //Get All Bom Data fetch and save
  GetBOMAllList(seasonId: number, yearId: number, buyerId: number, styleId: number): Observable<any> {
    if (buyerId == null) {
      buyerId = 0;
    }
    if (seasonId == null) {
      seasonId = 0;
    }
    if (yearId == null) {
      yearId = 0;
    }

    return this.http.post<any>(
      this.baseUrl_ +
        "Costing/GetAllBomDataAndSave?buyerId=" +
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
  base64Image: string;

 async imageUrlToBase64(urL: string) {
    return this.http
      .get(urL, { observe: "body", responseType: "arraybuffer" })
      .pipe(
        take(1),
        map((arrayBuffer) =>
          btoa(
            Array.from(new Uint8Array(arrayBuffer))
              .map((b) => String.fromCharCode(b))
              .join("")
          )
        )
      ).toPromise();
  }

  //Copy New Costing for Option data by id
  copyCostingForOptinnMasterById(id: number) {
    var obj = {
      id: id,
    };
    return this.http.post<any>(
      this.baseUrl_ + "Costing/CostingForOption",
      obj,
      { headers: this.token.headerToken() }
    );
  }

  //Copy New Costing for Option data by id
  copyCostingForOption(styleId: number, quotationNumber: string) {
    var obj = {
      styleId: styleId,
      quotationNumber: quotationNumber
    };
    return this.http.post<any>(
      this.baseUrl_ + "Costing/CostingForOption",
      obj,
      { headers: this.token.headerToken() }
    );
  }

  GetCostingList(costingStatus: string, status: string): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ +
        "Costing/GetCostingListByFormated?costingStatus=" +
        costingStatus +
        "&status=" +
        status,
      {
        headers: this.token.headerToken(),
      }
    );
  }


  GetCostingListByRevised(
    costingStatus: string,
    status: string,
    buyerId: number,
    styleId: number,
    seasonId: number,
    quotationNo: string,
    revisedNo: string
  ): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ +
        "Costing/GetCostingList?costingStatus=" +
        costingStatus +
        "&status=" +
        status +
        "&buyerId=" +
        buyerId +
        "&seasonId=" +
        seasonId +
        "&styleId=" +
        styleId +
        "&quotationNo=" +
        quotationNo +
        "&revisedNo=" +
        revisedNo,
      {
        headers: this.token.headerToken(),
      }
    );
  }
  
  // For Excel
 async exportExcel(excelData) {
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers;
    const data = excelData.data; // Fabric Date
    const data1 = excelData.data1; // Accessories Data
    const data2 = excelData.data2; // Cost Master Date
    const data3 = excelData.data3; // Cost Calculation Data
    const data4 = excelData.data4; // Cost Accessories Label Data
    const data5 = excelData.data5; // Cost Accessories Packging Data
    const data6 = excelData.data6; // Cost Accessories Process Data

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Costing Data Sheet");
    const fabricHeader = [
      "Category",
      "Component/Item",
      "Description",
      "ST Code",
      "Item Placement",
      "Item Code",
      "Nomination Status",
      "Supplier",
      "Country",
      "Cutt Able Width",
      "UoM",
      "Consumption",
      "Market Unit",
      "Con. Value",
      "Price",
      "Price Mood Name",
      "Wastage Percentage",
      "Fin Cost",
      "%",
      "Value",
      "Comment",
    ];
    const AccessoriesHeader = [
      "Category",
      "Component/Item",
      "Description",
      "St Code",
      "Placement ",
      "Ref.Code",
      "Nomination Status",
      "Supplier",
      "Country",
      "UoM",
      "Consumption",
      "Wastage Percentage",
      "Market Unit",
      "Con. Value",
      "Price",
      "FinCost",
      "%",
      "Value",
      "Comment",
    ];
    const LabelHeader = [
      "Category",
      "Component/Item",
      "Description",
      "St Code",
      "Placement ",
      "Ref.Code",
      "Nomination Status",
      "Supplier",
      "Country",
      "UoM",
      "Consumption",
      "Wastage Percentage",
      "Market Unit",
      "Con. Value",
      "Price",
      "FinCost",
      "%",
      "Value",
      "Comment",
    ];
    const PackgingHeader = [
      "Category",
      "Component/Item",
      "Description",
      "St Code",
      "Placement ",
      "Ref.Code",
      "Nomination Status",
      "Supplier",
      "Country",
      "UoM",
      "Consumption",
      "Wastage Percentage",
      "Market Unit",
      "Con. Value",
      "Price",
      "FinCost",
      "%",
      "Value",
      "Comment",
    ];
    const ProcessHeader = [
      "Process",
      "Ref(Where Applicable)",
      "Description",
      "St Code",
      "Placement ",
      "Ref.Code",
      "Nomination Status",
      "Supplier",
      "Country",
      "UoM",
      "Consumption",
      "Wastage Percentage",
      "Market Unit",
      "Con. Value",
      "Price",
      "FinCost",
      "%",
      "Value",
      "Comment",
    ];

    worksheet.mergeCells("A1", "B1");
    let titleRow = worksheet.getCell("A1");
    titleRow.value = title;
    titleRow.font = {
      name: "Calibri",
      size: 16,
      underline: "single",
      bold: true,
      color: { argb: "0085A3" },
    };
    titleRow.alignment = { vertical: "middle", horizontal: "center" };

    let part = worksheet.getCell("A2");
    part.value = "Part Name";

    let partValue = worksheet.getCell("B2");
    partValue.value = data2.partName;
    // Create 2 blank row
    worksheet.addRow([]);
    worksheet.addRow([]);

    // add Buyer Info Title
    let buyerTitle = worksheet.getCell("A4");
    buyerTitle.value = "Buyer Info";
    buyerTitle.font = {
      name: "Calibri",
      size: 15,
      underline: "single",
      bold: true,
      color: { argb: "0085A3" },
    };
    // Buyer for Label
    let date = worksheet.getCell("A5");
    date.value = "Date";
    date.font = { bold: true };
    let buyerName = worksheet.getCell("A6");
    buyerName.value = "Buyer";
    buyerName.font = { bold: true };
    let dgnRef = worksheet.getCell("A7");
    dgnRef.value = "Design Reference";
    dgnRef.font = { bold: true };
    let department = worksheet.getCell("A8");
    department.value = "Department";
    department.font = { bold: true };
    let cPerson = worksheet.getCell("A9");
    cPerson.value = "Contact Person";
    cPerson.font = { bold: true };
    let factory = worksheet.getCell("A10");
    factory.value = "Factory";
    factory.font = { bold: true };
    let styleRef = worksheet.getCell("A11");
    styleRef.value = "Style Reference";
    styleRef.font = { bold: true };

    // Buyer Value
    let dateValue = worksheet.getCell("B5");
    dateValue.value = data2.initialDate;
    let buyerNameValue = worksheet.getCell("B6");
    buyerNameValue.value = data2.buyerName;
    let buyerDesignValue = worksheet.getCell("B7");
    buyerDesignValue.value = data2.buyerDesign;
    let deptNameValue = worksheet.getCell("B8");
    deptNameValue.value = data2.deptName;
    let buyerCPValue = worksheet.getCell("B9");
    buyerCPValue.value = data2.buyerCP;
    let branchOfficeNameValue = worksheet.getCell("B10");
    branchOfficeNameValue.value = data2.branchOfficeName;
    let styleNoValue = worksheet.getCell("B11");
    styleNoValue.value = data2.styleNo;

    // add Style Info Title
    let styleTitle = worksheet.getCell("D4");
    styleTitle.value = "Style Info";
    styleTitle.font = {
      name: "Calibri",
      size: 15,
      underline: "single",
      bold: true,
      color: { argb: "0085A3" },
    };
    // Style for Label
    let style = worksheet.getCell("D5");
    style.value = "Style";
    style.font = { bold: true };
    let styleDes = worksheet.getCell("D6");
    styleDes.value = "Style Description";
    styleDes.font = { bold: true };
    let gmtItem = worksheet.getCell("D7");
    gmtItem.value = "GMT Item";
    gmtItem.font = { bold: true };
    let season = worksheet.getCell("D8");
    season.value = "Season";
    season.font = { bold: true };
    let brand = worksheet.getCell("D9");
    brand.value = "Brand";
    brand.font = { bold: true };
    let sizeRange = worksheet.getCell("D10");
    sizeRange.value = "Size Range";
    sizeRange.font = { bold: true };
    let costingSize = worksheet.getCell("D11");
    costingSize.value = "Costing Size";
    costingSize.font = { bold: true };

    let option = worksheet.getCell("G5");
    option.value = "Option";
    option.font = { bold: true };
    let color = worksheet.getCell("G6");
    color.value = "Color";
    color.font = { bold: true };
    let ofColor = worksheet.getCell("G7");
    ofColor.value = "Of Color";
    ofColor.font = { bold: true };

    // Style Value
    let styleValue = worksheet.getCell("E5");
    styleValue.value = data2.styleName;
    let styleDesValue = worksheet.getCell("E6");
    styleDesValue.value = data2.description;
    let gmtItemValue = worksheet.getCell("E7");
    gmtItemValue.value = data2.item;
    let seasonValue = worksheet.getCell("E8");
    seasonValue.value = data2.seasonName;
    let brandValue = worksheet.getCell("E9");
    brandValue.value = data2.brandName;
    let sizeRangeValue = worksheet.getCell("E10");
    sizeRangeValue.value = data2.sizeRange;
    let costingSizeValue = worksheet.getCell("E11");
    costingSizeValue.value = data2.costSize;

    let optionValue = worksheet.getCell("H5");
    optionValue.value = data2.costOption;
    let colorValue = worksheet.getCell("H6");
    colorValue.value = data2.colorType;
    let ofColorValue = worksheet.getCell("H7");
    ofColorValue.value = data2.noOfColor;

    // add Commission Title
    let commissionTitle = worksheet.getCell("J4");
    commissionTitle.value = "Finance";
    commissionTitle.font = {
      name: "Calibri",
      size: 15,
      underline: "single",
      bold: true,
      color: { argb: "0085A3" },
    };
    //Label  for Commission
    let sMood = worksheet.getCell("J5");
    sMood.value = "Shipped Mood";
    sMood.font = { bold: true };
    let currency = worksheet.getCell("J6");
    currency.value = "Currency";
    currency.font = { bold: true };
    let foreign = worksheet.getCell("J7");
    foreign.value = "Foreign(%)";
    foreign.font = { bold: true };
    let local = worksheet.getCell("J8");
    local.value = "Local(%)";
    local.font = { bold: true };
    let special = worksheet.getCell("J9");
    special.value = "Special(%)";
    special.font = { bold: true };
    let moq = worksheet.getCell("J10");
    moq.value = "MOQ";
    moq.font = { bold: true };
    let mcq = worksheet.getCell("J11");
    mcq.value = "MCQ";
    mcq.font = { bold: true };

    // Commission Value
    let sMoodValue = worksheet.getCell("K5");
    sMoodValue.value = data2.shippedTypeName;
    let currencyValue = worksheet.getCell("K6");
    currencyValue.value = data2.currencyName;
    let foreignValue = worksheet.getCell("K7");
    foreignValue.value = data2.foreignCommPc;
    let localValue = worksheet.getCell("K8");
    localValue.value = data2.localCommPc;
    let specialValue = worksheet.getCell("K9");
    specialValue.value = data2.specialCommPc;
    let moqValue = worksheet.getCell("K10");
    moqValue.value = data2.moq;
    let mcqValue = worksheet.getCell("K11");
    mcqValue.value = data2.mcq;

    // add CM Title
    let cmTitle = worksheet.getCell("M4");
    cmTitle.value = "CM";
    cmTitle.font = {
      name: "Calibri",
      size: 15,
      underline: "single",
      bold: true,
      color: { argb: "0085A3" },
    };
    //Label  for CM
    let cpm = worksheet.getCell("M5");
    cpm.value = "CPM";
    let ppm = worksheet.getCell("M6");
    ppm.value = "PPM";
    ppm.font = { bold: true };
    let smv = worksheet.getCell("M7");
    smv.value = "SMV";
    smv.font = { bold: true };
    let effiency = worksheet.getCell("M8");
    effiency.value = "Effciency(%)";
    effiency.font = { bold: true };
    let cmpc = worksheet.getCell("M9");
    cmpc.value = "CM/PC";
    cmpc.font = { bold: true };
    let fobpc = worksheet.getCell("M10");
    fobpc.value = "FOB/PC";
    fobpc.font = { bold: true };
    let targetFob = worksheet.getCell("M11");
    targetFob.value = "Target FOB";
    targetFob.font = { bold: true };
    let pqty = worksheet.getCell("M12");
    pqty.value = "Proposed Qty";
    pqty.font = { bold: true };

    // CM Value
    let cpmValue = worksheet.getCell("N5");
    cpmValue.value = data2.cpm;
    let ppmValue = worksheet.getCell("N6");
    ppmValue.value = data2.ppm;
    let smvValue = worksheet.getCell("N7");
    smvValue.value = data2.smv;
    let effiencyValue = worksheet.getCell("N8");
    effiencyValue.value = data2.efficency;
    let cmpcValue = worksheet.getCell("N9");
    cmpcValue.value = data2.cmPC;
    let fobpcValue = worksheet.getCell("N10");
    fobpcValue.value = data3.fobPc;
    let targetFobValue = worksheet.getCell("N11");
    targetFobValue.value = data2.targetFOB;
    let pqtyValue = worksheet.getCell("N12");
    pqtyValue.value = data2.poq;

    // add Summary Title
    let summaryTitle = worksheet.getCell("P4");
    summaryTitle.value = "Summary";
    summaryTitle.font = {
      name: "Calibri",
      size: 15,
      underline: "single",
      bold: true,
      color: { argb: "0085A3" },
    };

    //Label  for Summary
    let blankTitle = worksheet.getCell("P5");
    blankTitle.value = "";
    let mCost = worksheet.getCell("P6");
    mCost.value = "Material Cost";
    mCost.font = { bold: true };
    let cm = worksheet.getCell("P7");
    cm.value = "CM";
    cm.font = { bold: true };
    let factoryCost = worksheet.getCell("P8");
    factoryCost.value = "Factory Cost";
    factoryCost.font = { bold: true };
    let profit = worksheet.getCell("P9");
    profit.value = "Profit";
    profit.font = { bold: true };
    let commission = worksheet.getCell("P10");
    commission.value = "Commission(%)";
    commission.font = { bold: true };
    let others = worksheet.getCell("P11");
    others.value = "Others";
    others.font = { bold: true };
    let netFOB = worksheet.getCell("P12");
    netFOB.value = "Net FOB";
    netFOB.font = { bold: true };

    // Summary Value for Percentage
    let percentageTitle = worksheet.getCell("Q5");
    percentageTitle.value = "%";
    percentageTitle.alignment = { vertical: "middle", horizontal: "center" };
    let mCostValue = worksheet.getCell("Q6");
    mCostValue.value = data3.metarialCostPercentage;
    let cmValue = worksheet.getCell("Q7");
    cmValue.value = data3.finalCMPercentage;
    let factoryCostValue = worksheet.getCell("Q8");
    factoryCostValue.value = data3.factorialCostPercentage;
    factoryCostValue.font = {bold: true,color: { argb: "0085A3" }};
    let profitValue = worksheet.getCell("Q9");
    profitValue.value = data2.surPlusPercentage;
    profitValue.font = {bold: true,color: { argb: "0085A3" }};
    let commissionValue = worksheet.getCell("Q10");
    commissionValue.value = data3.finalCommissionPercentage;
    let othersValue = worksheet.getCell("Q11");
    othersValue.value = data3.othersPercentage;
    let netFOBValue = worksheet.getCell("Q12");
    netFOBValue.value = "";

    // Summary Value for Piece
    let pieceTitle = worksheet.getCell("R5");
    pieceTitle.value = "Pc";
    pieceTitle.alignment = { vertical: "middle", horizontal: "center" };
    let mCostValue1 = worksheet.getCell("R6");
    mCostValue1.value = data3.metarialCostPc;
    let cmValue1 = worksheet.getCell("R7");
    cmValue1.value = data3.finalCMPc;
    let factoryCostValue1 = worksheet.getCell("R8");
    factoryCostValue1.value = data3.factorialCostPc;
    factoryCostValue1.font = {bold: true, color: { argb: "0085A3" }};
    let profitValue1 = worksheet.getCell("R9");
    profitValue1.value = data3.surPlusPc;
    profitValue1.font = {bold: true,color: { argb: "0085A3" }};
    let commissionValue1 = worksheet.getCell("R10");
    commissionValue1.value = data3.finalCommissionPc;
    let othersValue1 = worksheet.getCell("R11");
    othersValue1.value = data2.otherPc;
    let netFOBValue1 = worksheet.getCell("R12");
    netFOBValue1.value = data3.netFOBPc;

    // Summary Value for Dozen
    let dozenTitle = worksheet.getCell("S5");
    dozenTitle.value = "Dz";
    dozenTitle.alignment = { vertical: "middle", horizontal: "center" };
    let mCostValue2 = worksheet.getCell("S6");
    mCostValue2.value = data3.metarialCost;
    let cmValue2 = worksheet.getCell("S7");
    cmValue2.value = data3.finalCMDZ;
    let factoryCostValue2 = worksheet.getCell("S8");
    factoryCostValue2.value = data3.factorialCostDz;
    factoryCostValue2.font = {bold: true, color: { argb: "0085A3" }};
    let profitValue2 = worksheet.getCell("S9");
    profitValue2.value = data3.surPlus;
    profitValue2.font = {bold: true, color: { argb: "0085A3" }};
    let commissionValue2 = worksheet.getCell("S10");
    commissionValue2.value = data3.finalCommission;
    let othersValue2 = worksheet.getCell("S11");
    othersValue2.value = data3.otherDz;
    let netFOBValue2 = worksheet.getCell("S12");
    netFOBValue2.value = data3.netFOB;

    // add Image Title
    let imageTitle = worksheet.getCell("V4");
    imageTitle.value = "Image";
    imageTitle.font = {
      name: "Calibri",
      size: 15,
      underline: "single",
      bold: true,
      color: { argb: "0085A3" },
    };

    var url = environment.fileUrl + data2.filePath;

    if(data2.filePath != null){
     var  image = await this.imageUrlToBase64(url);

      let myLogoImage = workbook.addImage({
        base64: image,
        extension: 'png',
      });

      worksheet.mergeCells("V5:X11");
      worksheet.addImage(myLogoImage, 'V5:X11');
    }
  
    //Add Image
    // let myLogoImage = workbook.addImage({
    //   base64: image,
    //   extension: 'png',
    // });



    //Blank Row
    worksheet.addRow([]);
    // Fabric Name
    let fabricTitle = worksheet.getCell("A13");
    fabricTitle.value = "Fabric";

    fabricTitle.font = {
      name: "Calibri",
      size: 16,
      underline: "single",
      bold: true,
      color: { argb: "0085A3" },
    };
    //Add Header Row
    let headerRow = worksheet.addRow(fabricHeader);
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF00" },
        bgColor: { argb: "FF0000FF" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Show Data For Fabric in excel
    data.forEach((d) => {

      let row = worksheet.addRow(d);

      //let categoryName = row.getCell(1).address;
      //worksheet.getCell(categoryName).value = d[0];
      //let categoryName1 = row.getCell(2).address;
      //worksheet.getCell(categoryName1).value = "";


     // let categoryName:any = row.getCell(15);
      //let sales = row.getCell(6);
    });

    // data.map((p) => [ // PDF
    //   // this.datepipe.transform(p.buyDate),
    //   {
    //     text: p.description,
    //     alignment: "center",
    //   },
    //   {
    //     text: p.categoryName,
    //     alignment: "center",
    //   },
    // ]);

    var fabricValue = data.reduce((sum, fabric) => sum + fabric[19], 0);
    let fabrictitle = worksheet.addRow([
      "Value:  " + " " + fabricValue.toFixed(4),
    ]);
    fabrictitle.getCell(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {},
    };
    fabrictitle.font = { bold: true };
    fabrictitle.alignment = { vertical: "middle", horizontal: "right" };
    worksheet.mergeCells(`A${fabrictitle.number}:T${fabrictitle.number}`);

    worksheet.addRow([]);

    let accessoriesTitle = "Accessories";
    let accessoriesheaderRow1 = worksheet.addRow([accessoriesTitle]);
    accessoriesheaderRow1.font = {
      name: "Calibri",
      size: 16,
      underline: "single",
      bold: true,
      color: { argb: "0085A3" },
    };

    let accessoriesheaderRow = worksheet.addRow(AccessoriesHeader);
    // Cell Style : Fill and Border
    accessoriesheaderRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF00" },
        bgColor: { argb: "FF0000FF" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
    // Show Data For Fabric in Accessories
    data1.forEach((d) => {
      let row = worksheet.addRow(d);
      let sales = row.getCell(6);
    });

    var accessoriesValue = data1.reduce(
      (sum, accessorie) => sum + accessorie[17],
      0
    );
    let accessoriestitle = worksheet.addRow([
      "Value:  " + " " + accessoriesValue.toFixed(4),
    ]);
    accessoriestitle.getCell(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {},
    };
    accessoriestitle.font = { bold: true };
    accessoriestitle.alignment = { vertical: "middle", horizontal: "right" };
    worksheet.mergeCells(
      `A${accessoriestitle.number}:R${accessoriestitle.number}`
    );

    worksheet.addRow([]);

    // Label Name
    let labelTitle = "Labels Hangtag";
    let labelheaderRow1 = worksheet.addRow([labelTitle]);
    labelheaderRow1.font = {
      name: "Calibri",
      size: 16,
      underline: "single",
      bold: true,
      color: { argb: "0085A3" },
    };

    //Add Header Row
    let labelheaderRow = worksheet.addRow(LabelHeader);
    // Cell Style : Fill and Border
    labelheaderRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF00" },
        bgColor: { argb: "FF0000FF" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
    // Show Data For Label
    data4.forEach((d) => {
      let row = worksheet.addRow(d);
      let sales = row.getCell(6);
    });

    var labelValue = data4.reduce((sum, label) => sum + label[17], 0);
    let labeltitle = worksheet.addRow([
      "Value:  " + " " + labelValue.toFixed(4),
    ]);
    labeltitle.getCell(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {},
    };
    labeltitle.font = { bold: true };
    labeltitle.alignment = { vertical: "middle", horizontal: "right" };
    worksheet.mergeCells(`A${labeltitle.number}:R${labeltitle.number}`);

    worksheet.addRow([]);
    // worksheet.addRow([]);

    // Packging Name
    let packgingTitle = "Packging";
    let packgingheaderRow1 = worksheet.addRow([packgingTitle]);
    packgingheaderRow1.font = {
      name: "Calibri",
      size: 16,
      underline: "single",
      bold: true,
      color: { argb: "0085A3" },
    };

    //Add Header Row
    let packgingheaderRow = worksheet.addRow(PackgingHeader);
    // Cell Style : Fill and Border
    packgingheaderRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF00" },
        bgColor: { argb: "FF0000FF" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
    // Show Data For Packging
    data5.forEach((d) => {
      let row = worksheet.addRow(d);
      let sales = row.getCell(6);
    });

    var packgingValue = data5.reduce((sum, packging) => sum + packging[17], 0);
    let packgingtitle = worksheet.addRow([
      "Value:  " + " " + packgingValue.toFixed(4),
    ]);
    packgingtitle.getCell(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {},
    };
    packgingtitle.font = { bold: true };
    packgingtitle.alignment = { vertical: "middle", horizontal: "right" };
    worksheet.mergeCells(`A${packgingtitle.number}:R${packgingtitle.number}`);

    worksheet.addRow([]);
    // worksheet.addRow([]);

    // Packging Name
    let processTitle = "PROCESS AND OTHERS (USE THIS SECTION FOR WASHING,QUILTING, EMBROIDERY, PRINTING, TEST, SMS AND OTHERS)";
    let processheaderRow1 = worksheet.addRow([processTitle]);
    processheaderRow1.font = {
      name: "Calibri",
      size: 16,
      underline: "single",
      bold: true,
      color: { argb: "0085A3" },
    };

    //Add Header Row
    let processheaderRow = worksheet.addRow(ProcessHeader);
    // Cell Style : Fill and Border
    processheaderRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF00" },
        bgColor: { argb: "FF0000FF" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
    // Show Data For Packging
    data6.forEach((d) => {
      let row = worksheet.addRow(d);
      let sales = row.getCell(6);
    });

    var processValue = data6.reduce((sum, process) => sum + process[17], 0);
    let processtitle = worksheet.addRow([
      "Value:  " + " " + processValue.toFixed(4),
    ]);
    processtitle.getCell(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {},
    };
    processtitle.font = { bold: true };
    processtitle.alignment = { vertical: "middle", horizontal: "right" };
    worksheet.mergeCells(`A${processtitle.number}:R${processtitle.number}`);
    worksheet.addRow([]);
    worksheet.addRow([]);

    //Footer Row
    let footerRow = worksheet.addRow([
      "Costing Report Generated from Snowtex Erp",
    ]);
    footerRow.getCell(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFB050" },
    };

    //Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, title + ".xlsx");
    });
  }
  

  CostingReportExcelDownloadByStyleId(costingId: number, styleId: number, buyerId: number, quotationNumber: string): Observable<any> { 

    return this.http.get(this.baseUrl_ + "Costing/CostingReportExcelDownloadByStyleId?costingId="+ costingId + "&styleId=" + styleId + "&buyerId=" + buyerId + "&quotationNumber=" + quotationNumber, 
    {observe: 'response', responseType: 'blob',  headers: this.token.headerToken()})
  }

  MarkerAllFileDownloadByMasterId(id: number): Observable<any> {
    return this.http.get(this.baseUrl_ + "BookingCad/GetAllMarkerReportZipByMasterId?id="+ id, {observe: 'response', responseType: 'blob',  headers: this.token.headerToken()})
    
  }
  MarkerCadConAllFileDownload(masterId: number,masterRefId: number): Observable<any> {
    console.log('Hello Service');
    return this.http.get(this.baseUrl_ + "BookingCad/GetAllBookingConFileZipByMasterId?masterId="+ masterId+"&masterRefId="+masterRefId, {observe: 'response', responseType: 'blob',  headers: this.token.headerToken()})
  }

  GetCostFabricListByCostMasterId (costMasterId: number): Observable<any> {
    return this.http.get<CostFabric[]>(this.baseUrl_ + "Costing/GetCostFabricListByCostMasterId?costMasterId="+ costMasterId, {
      headers: this.token.headerToken(),
    });
  }

  GetCostAccessoriesListByCostMasterId (costMasterId: number): Observable<any> {
    return this.http.get<CostAccessories[]>(this.baseUrl_ + "Costing/GetCostAccessoriesListByCostMasterId?costMasterId="+ costMasterId, {
      headers: this.token.headerToken(),
    });
  }

  async CostingCheckForStyle(styleId: number) {
    return this.http.get<CostingMasterModel[]>(
      this.baseUrl_ + "Costing/GetCostingMasterListByStyleId?Id=" + styleId,
      { headers: this.token.headerToken() }).toPromise();
  }

  async CostingDataCheckForPartWise(quotationNumber: string, styleId: number, costPartId: number) {
    return this.http.get<any>(
      this.baseUrl_ + "Costing/GetCostingMasterInfoByQSC?quotationNumber=" + encodeURIComponent(quotationNumber) + "&styleId=" + styleId + "&costPartId=" + costPartId,
      { headers: this.token.headerToken() }).toPromise();
  }

  async SupplyChainCostingDataCheckForPartWise(quotationNumber: string, styleId: number, costPartId: number) {
    return this.http.get<any>(
      this.baseUrl_ + "Costing/GetSupplyChainCostingMasterInfoByQSC?quotationNumber=" + encodeURIComponent(quotationNumber) + "&styleId=" + styleId + "&costPartId=" + costPartId,
      { headers: this.token.headerToken() }).toPromise();
  }

  async GetCosMstDataByStyleIdQtNo(quotationNumber: string, styleId: number) {
    return this.http.get<any[]>(
      this.baseUrl_ + "Costing/GetCosMstDataByStyleIdQtNo?quotationNumber=" + encodeURIComponent(quotationNumber) + "&styleId=" + styleId,
      { headers: this.token.headerToken() }).toPromise();
  }

  async GetCostingMasterInfoById( costingId: number) {
    return this.http.get<any>(
      this.baseUrl_ + "Costing/GetCostingMasterInfoById?costingId=" + costingId,
      { headers: this.token.headerToken() }).toPromise();
  }

 async  GetCostingMasterInfoByIdWithPart( costingId: number) {
    return this.http.get<any>(
      this.baseUrl_ + "Costing/GetCostingMasterInfoByIdWithPart?costingId=" + costingId,
      { headers: this.token.headerToken() }).toPromise();
  }

 async GetOthersCostingMasterInfoById (costMasterId: number){
    return this.http.get<any>(this.baseUrl_ + "Costing/GetOthersCostingMasterInfoById?costingId="+ costMasterId, {
      headers: this.token.headerToken(),
    }).toPromise();
  }


  async CostingReportExcelDownload(costingId: number,styleId: number, buyerId: number, quotationNumber: string){
    return this.http.get<any[]>(this.baseUrl_ + "Costing/CostingReportExcelDownload?costingId="+ costingId +"&styleId=" + styleId + "&buyerId=" + buyerId + "&quotationNumber=" + quotationNumber, {
      headers: this.token.headerToken(),
    }).toPromise();
  }

  async CostingSummeryReportExcelDownload(styleId: number, buyerId: number, quotationNumber: string){
    return this.http.get<any[]>(this.baseUrl_ + "Costing/CostingSummeryReportExcelDownload?styleId=" + styleId + "&buyerId=" + buyerId + "&quotationNumber=" + quotationNumber, {
      headers: this.token.headerToken(),
    }).toPromise();
  }


  
    //Get Qutaiont Data
    GetQuationNoByBuyerStyleSeasonYear(buyerId: number,styleId:number, seasonId:number, yearId:number) {
      return this.http.get<any[]>(
        this.baseUrl_ + "Costing/GetQuationNoByBuyerStyleSeasonYear?buyerId=" + buyerId + "&styleId=" + styleId + "&seasonId="+ seasonId + "&yearId="+yearId ,
        { headers: this.token.headerToken() }
      ).toPromise();
    }
    
  //Get Qutaiont Data
  GetCostingIdByByQuationNo(buyerId: number,styleId:number, seasonId:number, yearId:number,quotationNumber:string) {
      return this.http.get<any[]>(
         this.baseUrl_ + "Costing/GetCostingIdByByQuationNo?buyerId=" + buyerId + "&styleId=" + styleId + "&seasonId="+ seasonId + "&yearId="+yearId +"&quotationNumber="+ quotationNumber,
          { headers: this.token.headerToken() }
      ).toPromise();
    }


    //GetSuplierFromPiForCosting
    GetSuplierAndPiNoFromPiForCosting(buyerId: number ,seasonId:number, yearId:number, supplierId:number){
      return this.http.get<any[]>(
        this.baseUrl_ + "Costing/GetSuplierFromPiForCosting?buyerId=" + buyerId + "&seasonId="+ seasonId + "&yearId="+yearId +"&supplierId=" +supplierId,
         { headers: this.token.headerToken() }
     ).toPromise();
    }

    // GetPiInfoBySupplyer(buyerId: number ,seasonId:number, yearId:number, supplierId:number){
    //   return this.http.get<any[]>(
    //     this.baseUrl_ + "Costing/GetSuplierFromPiForCosting?buyerId=" + buyerId + "&seasonId="+ seasonId + "&yearId="+yearId +"&supplierId=" +supplierId,
    //      { headers: this.token.headerToken() }
    //  ).toPromise();
    // }


    GetPiNoAndBookRef(PiNoList:any[]) {    
      var body = {
            PiNoList:PiNoList
        }
        console.log(JSON.stringify(body));
        return this.http.post<any>(this.baseUrl_ + "Costing/GetPiNoAndBookRef", body , 
        {headers: this.token.headerToken(), }).toPromise();
    }

    GetContractAndPiDataForCostBreakDown(masterData :any,PiNoList:any[]) {    
      var body = {
            salesContractId: masterData.salesContractId,
            contractNo: masterData.contractNo,
            buyerId: masterData.buyerId,
            seasonId: masterData.seasonId,
            yearId: masterData.yearId,
            supplierId:masterData.supplierId,
            PiNoList:PiNoList
        }
        console.log(JSON.stringify(body));
        return this.http.post<any>(this.baseUrl_ + "Costing/GetContractAndPiDataForCostBreakDown", body , 
        {headers: this.token.headerToken(), }).toPromise();
    }


    SaveCostBreakDown(masterData :any,PiNoList:any[],  costBreakDownDetailsValue : any, PiDetailsDataListForTable:any[]) {    
      debugger
      var body = {
            id: masterData.id,
            salesContractId: masterData.salesContractId,
            buyerId: masterData.buyerId,
            seasonId: masterData.seasonId,
            yearId: masterData.yearId,
            supplierId:masterData.supplierId,
            piNoList:PiNoList,
            costBreakDownValueSummery: [costBreakDownDetailsValue],
            costBreakDownPiDitels:PiDetailsDataListForTable
        }
        console.log(JSON.stringify(body));
        return this.http.post<any>(this.baseUrl_ + "Costing/SaveCostBreakDown", body , 
        {headers: this.token.headerToken(), });
    }

    GetCostBreakDownMstList(){
      return this.http.get<any[]>(
        this.baseUrl_ + "Costing/GetCostBreakDownMstList",
         { headers: this.token.headerToken() }
     )
    }

    GetCostBreakDownAllData(id: number){
      return this.http.get<any[]>(
        this.baseUrl_ + "Costing/GetCostBreakDownAllData?id="+id,
         { headers: this.token.headerToken() }
     )
    }


    //------ Image Url To Base64 Converter------//
    toDataURL = async (url) => {
      console.log("Downloading image...");
      var res = await fetch(url);
      var blob = await res.blob();
  
      const result = await new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.addEventListener("load", function () {
          resolve(reader.result);
        }, false);
  
        reader.onerror = () => {
          return reject(this);
        };
        reader.readAsDataURL(blob);
      })
      return result
    };

 async exportRichluExcelReport(excelData) {

    const title = excelData.title;
    const allData = excelData.finallySubmitData;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(
      "Costing  Report"
    );
    const stockHeaderFabric = [
      "Item",
      "Item Description",
      "Supplier Name",    
      "Qty/Dz",
      "Unit",
      "Unit Price",
      "Total Price",
      "Remarks",
    ];

    const stockHeaderIE = [
      "Buyer",
      "Style",
      "Item",    
      "Order Qty",
      "SMV",
      "Machine",
      "W/Munte",
      "Wanted Eff(%)",
      "Daily Prod'N",
      "Hourly Prod'n",
      "0.036",
      "0.04",
      "0.055",
      "0.059",
      "Remarks"
    ];

    let d = new Date();
    let date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

    worksheet.mergeCells("A1", "E1");
    let companyRow = worksheet.getCell("A1");
    companyRow.value = "Costing Report (" + date + ")";
    companyRow.font = {
      name: "Calibri",
      size: 16,
      bold: true,
      color: { argb: "#ffff00" },
    };
    companyRow.alignment = { vertical: "middle", horizontal: "center" };




if( allData[0].fileName !="" ){
  var url = environment.fileUrl + allData[0].filePath;
  //var  image = await this.imageUrlToBase64(url);
  var image1 = await this.toDataURL(url);
  let myLogoImage = workbook.addImage({
    base64: image1.toString(),
    extension: 'jpeg',
  });

  //worksheet.mergeCells("T2:V8");
  worksheet.addImage(myLogoImage, 'T2:V7');
}



    var partList = allData.filter((a, i) => allData.findIndex((s) => a.stylePartId === s.stylePartId) === i);

    let style = worksheet.getCell("A3");
    style.value = "Style ";
    style.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    };
    style.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    style.alignment = { vertical: "middle", horizontal: "left" };


    let styleName = worksheet.getCell("B3");
    styleName.value = partList[0].styleName;
    styleName.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    };
    styleName.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    styleName.alignment = { vertical: "middle", horizontal: "left" };

    let part = worksheet.getCell("A4");
    part.value = "Part Name ";
    part.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    };
    part.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    part.alignment = { vertical: "middle", horizontal: "left" };


    let partName = worksheet.getCell("B4");
    partName.value = partList[0].partName;
    partName.font = {
      name: "Calibri",
      size: 12,
      bold: true,
      color: { argb: "#ffff00" },
    };
    partName.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    partName.alignment = { vertical: "middle", horizontal: "left" };




    var fabricData1 = allData.filter(x => x.costCategoryGroup == "FABRICS" && x.stylePartId == partList[0].stylePartId);

    var dataForFabric1 = [];
    var dataForExcelFabric1 = [];
    for (var itemFab of fabricData1) {
      var objFabric1 = {
        item: itemFab.itemName,
        itemDescription: itemFab.itemDescription,
        supplierName: itemFab.supplierDescription,
        qtyDz:(itemFab.consumption+(itemFab.wastagePercentage/100))*12,
        unit: itemFab.unitName,
        unitPrice: itemFab.rate,
        totalPrice: itemFab.totalPrice,
        remarks: itemFab.remarks,
        consumption : itemFab.consumption,
        wastagePercentage : itemFab.wastagePercentage,
        marketRelation: itemFab.marketRelation,
        
      };
      dataForFabric1.push(objFabric1);
    }
    //var qtyDz22 = (main.Consumption + (main.Consumption * (main.WastagePercentage / 100))) * 12;
    dataForFabric1.forEach((row: any) => {
      dataForExcelFabric1.push(Object.values(row));
    });


    worksheet.addRow([]);
    let dataTypeFabCell1 = "A" + 6;
    worksheet.getCell(dataTypeFabCell1).value = "FABRICS";
    

    let headerRowFabcric1 = worksheet.addRow(stockHeaderFabric);
    headerRowFabcric1.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      cell.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
    });


    var c = 0
    var fabricFastRow =  7 + c + 1;
    var fabricLastRow = 0
    for (var itemFab of dataForExcelFabric1) {
      var costrowCountitemFeb =  7 + c + 1;       
         let itemCell = "A" + costrowCountitemFeb;// row.getCell(1).address;
         worksheet.getCell(itemCell).value = itemFab[0];
         worksheet.getCell(itemCell).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         let itemDescriptionCellFab = "B" + costrowCountitemFeb;//  row.getCell(2).address;
         worksheet.getCell(itemDescriptionCellFab).value = itemFab[1];
         worksheet.getCell(itemDescriptionCellFab).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         let supplierNameCellFab = "C" + costrowCountitemFeb;// row.getCell(3).address;
         worksheet.getCell(supplierNameCellFab).value = itemFab[2];
         worksheet.getCell(supplierNameCellFab).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         let qtyDzCellFab = "D" + costrowCountitemFeb; //row.getCell(4).address;
         worksheet.getCell(qtyDzCellFab).value = itemFab[3];
         worksheet.getCell(qtyDzCellFab).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         worksheet.getCell(qtyDzCellFab).value ={
          formula: `(${itemFab[8]}+(${itemFab[8]}*(${itemFab[9]}/100)))*12`,
          date1904: false
         } 

         let unitCellFab = "E" + costrowCountitemFeb; //row.getCell(5).address;
         worksheet.getCell(unitCellFab).value = itemFab[4];
         worksheet.getCell(unitCellFab).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         let unitPriceCellFab = "F" + costrowCountitemFeb; //row.getCell(5).address;
         worksheet.getCell(unitPriceCellFab).value = itemFab[5];
         worksheet.getCell(unitPriceCellFab).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         let totalPriceCellFab = "G" + costrowCountitemFeb; //row.getCell(5).address;
         worksheet.getCell(totalPriceCellFab).value = itemFab[6];
         worksheet.getCell(totalPriceCellFab).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }
         worksheet.getCell(totalPriceCellFab).value ={
          formula: `(D${costrowCountitemFeb}*F${costrowCountitemFeb})`,
          date1904: false
         }  
                            
         let remarksCellFab = "H" + costrowCountitemFeb; //row.getCell(5).address;
         worksheet.getCell(remarksCellFab).value = itemFab[7];
         worksheet.getCell(remarksCellFab).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }
         fabricLastRow =  costrowCountitemFeb; 
         c++
       }
 
   
    worksheet.addRow([]);
    var valFabric1 = 8 + c;
    let toalalFabricpriceAscCellQ1 = "F"+ valFabric1 ;
    worksheet.getCell(toalalFabricpriceAscCellQ1).value = "Total Value";
    worksheet.getCell(toalalFabricpriceAscCellQ1).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }
    let toalalFabricpriceAscCell1 = "G"+ valFabric1 ;
    worksheet.getCell(toalalFabricpriceAscCell1).value = 0;
    if(dataForExcelFabric1.length>0){
      worksheet.getCell(toalalFabricpriceAscCell1).value = {
        formula:`SUM(G${fabricFastRow}:G${fabricLastRow})`,
        date1904: false
      };
    }

    worksheet.getCell(toalalFabricpriceAscCell1).border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    }

    var val =  8 + c + 1;
    let dataTypeAscCell1 = "A"+ val ;
    worksheet.getCell(dataTypeAscCell1).value = "ACCESSORIES";

    var accessoriesData1 = allData.filter(x => x.costCategoryGroup == "ACCESSORIES" && x.stylePartId == partList[0].stylePartId);

    var dataForAccessories1 = [];
    var dataForExcelAccessories1 = [];
    for (var itemAsc1 of accessoriesData1) {
      var objAccessories1 = {
        item: itemAsc1.itemName,
        itemDescription: itemAsc1.itemDescription,
        supplierName: itemAsc1.supplierDescription,
        qtyDz: itemAsc1.consumption*12,
        unit: itemAsc1.unitName,
        unitPrice: itemAsc1.rate,
        totalPrice: itemAsc1.totalPrice,
        remarks: itemAsc1.remarks,
        consumption : itemAsc1.consumption,
        wastagePercentage : itemAsc1.wastagePercentage,
        marketRelation: itemAsc1.marketRelation,
        finCostPc:itemAsc1.finCostPc
      };
      dataForAccessories1.push(objAccessories1);
    }

    dataForAccessories1.forEach((row: any) => {
      dataForExcelAccessories1.push(Object.values(row));
    });


    var  rowCountAccessories1 = 0
    var accessoriesFastRow =   rowCountAccessories1 + 8 + c + 2;
    var accessoriesLastRow = 0
    for (var itemAcs1 of dataForExcelAccessories1) {
      var costrowCountAccessories1 = rowCountAccessories1 + 8 + c + 2;           
         let itemCell = "A" + costrowCountAccessories1;// row.getCell(1).address;
         worksheet.getCell(itemCell).value = itemAcs1[0];
         worksheet.getCell(itemCell).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         let itemDescriptionCellAcs1 = "B" + costrowCountAccessories1;//  row.getCell(2).address;
         worksheet.getCell(itemDescriptionCellAcs1).value = itemAcs1[1];
         worksheet.getCell(itemDescriptionCellAcs1).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         let supplierNameCellAcs1 = "C" + costrowCountAccessories1;// row.getCell(3).address;
         worksheet.getCell(supplierNameCellAcs1).value = itemAcs1[2];
         worksheet.getCell(supplierNameCellAcs1).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         let qtyDzCellAcs1 = "D" + costrowCountAccessories1; //row.getCell(4).address;
         worksheet.getCell(qtyDzCellAcs1).value = itemAcs1[3];
         worksheet.getCell(qtyDzCellAcs1).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         worksheet.getCell(qtyDzCellAcs1).value ={
          formula: `(${itemAcs1[8]})*12`,
          date1904: false
         } 

         let unitCellAcs1 = "E" + costrowCountAccessories1; //row.getCell(5).address;
         worksheet.getCell(unitCellAcs1).value = itemAcs1[4];
         worksheet.getCell(unitCellAcs1).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         let unitPriceCellAcs1 = "F" + costrowCountAccessories1; //row.getCell(5).address;
         worksheet.getCell(unitPriceCellAcs1).value = itemAcs1[5];
         worksheet.getCell(unitPriceCellAcs1).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         let totalPriceCellAcs1 = "G" + costrowCountAccessories1; //row.getCell(5).address;
         worksheet.getCell(totalPriceCellAcs1).value = itemAcs1[6];
         worksheet.getCell(totalPriceCellAcs1).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         var flAcs1 ="";
         var finalFLAcs1 = "";
         var qtyDzTempAcs1 = `((D${costrowCountAccessories1} + ( D${costrowCountAccessories1} *(${itemAcs1[9]}%)))/${itemAcs1[10]})*F${costrowCountAccessories1}`;
         if(itemAcs1[10] == 1){

           flAcs1 = `(${qtyDzTempAcs1}  + ${qtyDzTempAcs1}*(${itemAcs1[11]}/100))`;

        }
         else{
          flAcs1 = `(${qtyDzTempAcs1} +${itemAcs1[11]})`;
         }

         if(itemAcs1[0] =="CMQ"){
          finalFLAcs1 = `(D${costrowCountAccessories1}*G${costrowCountAccessories1})/12`;

         }
         else{
          finalFLAcs1 =flAcs1;
         }
         worksheet.getCell(totalPriceCellAcs1).value ={
          formula: finalFLAcs1,
          date1904: false
         }


         let remarksCellAcs1 = "H" + costrowCountAccessories1; //row.getCell(5).address;
         worksheet.getCell(remarksCellAcs1).value = itemAcs1[7];
         worksheet.getCell(remarksCellAcs1).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }
         accessoriesLastRow = costrowCountAccessories1;
         rowCountAccessories1++
       }


       worksheet.addRow([]);
       var valAccessories1 =  8 + c + rowCountAccessories1 + 2;
       let toalalAccessoriesPriceAscCellQ1 = "F"+ valAccessories1 ;
       worksheet.getCell(toalalAccessoriesPriceAscCellQ1).value = "Total Value";
       worksheet.getCell(toalalAccessoriesPriceAscCellQ1).border = {
         top: { style: 'thin' },
         bottom: { style: 'thin' },
         left: { style: 'thin' },
         right: { style: 'thin' }
       }
       let toalalAccessoriesPriceAscCell1 = "G"+ valAccessories1 ;
       worksheet.getCell(toalalAccessoriesPriceAscCell1).value =0
       if(dataForExcelAccessories1.length>0){
        worksheet.getCell(toalalAccessoriesPriceAscCell1).value = {
          formula:`SUM(G${accessoriesFastRow}:G${accessoriesLastRow})`,
          date1904: false
        };
       }

       worksheet.getCell(toalalAccessoriesPriceAscCell1).border = {
         top: { style: 'thin' },
         bottom: { style: 'thin' },
         left: { style: 'thin' },
         right: { style: 'thin' }
       }
   
       var val =  8 + c + rowCountAccessories1 + 2+ 1
       let dataTypelableCell1 = "A"+ val ;
       worksheet.getCell(dataTypelableCell1).value = "LABELS";

       var lableData1 = allData.filter(x => x.costCategoryGroup == "LABELS" && x.stylePartId == partList[0].stylePartId);
   
       var dataForLable1 = [];
       var dataForExcelLable1 = [];
       for (var itemLable1 of lableData1) {
         var objLable1 = {
           item: itemLable1.itemName,
           itemDescription: itemLable1.itemDescription,
           supplierName: itemLable1.supplierDescription,
           qtyDz: itemLable1.qtyDz,
           unit: itemLable1.unitName,
           unitPrice: itemLable1.rate,
           totalPrice: itemLable1.totalPrice,
           remarks: itemLable1.remarks,
           consumption : itemLable1.consumption,
           wastagePercentage : itemLable1.wastagePercentage,
           marketRelation: itemLable1.marketRelation,
           finCostPc:itemLable1.finCostPc
         };
         dataForLable1.push(objLable1);
       }
   
       dataForLable1.forEach((row: any) => {
        dataForExcelLable1.push(Object.values(row));
       });


       var  rowCountLable1 = 0
       var lableFastRow =  rowCountLable1 + 8 + c + rowCountAccessories1 + 2 + 2;
       var lableLastRow =  0
       for (var itemLable1 of dataForExcelLable1) {
         var costrowCountLable1 = rowCountLable1 + 8 + c + rowCountAccessories1 + 2 + 2;           
            let itemCellLable1 = "A" + costrowCountLable1;// row.getCell(1).address;
            worksheet.getCell(itemCellLable1).value = itemLable1[0];
            worksheet.getCell(itemCellLable1).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
   
            let itemDescriptionCellLable1 = "B" + costrowCountLable1;//  row.getCell(2).address;
            worksheet.getCell(itemDescriptionCellLable1).value = itemLable1[1];
            worksheet.getCell(itemDescriptionCellLable1).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
   
            let supplierNameCellLable1 = "C" + costrowCountLable1;// row.getCell(3).address;
            worksheet.getCell(supplierNameCellLable1).value = itemLable1[2];
            worksheet.getCell(supplierNameCellLable1).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
   
            let qtyDzCellLable1 = "D" + costrowCountLable1; //row.getCell(4).address;
            worksheet.getCell(qtyDzCellLable1).value = itemLable1[3];
            worksheet.getCell(qtyDzCellLable1).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
            worksheet.getCell(qtyDzCellLable1).value ={
              formula: `${itemLable1[8]}*12`,
              date1904: false
            } 
   
            let unitCellLable1 = "E" + costrowCountLable1; //row.getCell(5).address;
            worksheet.getCell(unitCellLable1).value = itemLable1[4];
            worksheet.getCell(unitCellLable1).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
   
            let unitPriceCellLable1 = "F" + costrowCountLable1; //row.getCell(5).address;
            worksheet.getCell(unitPriceCellLable1).value = itemLable1[5];
            worksheet.getCell(unitPriceCellLable1).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }


   
            let totalPriceCellLable1 = "G" + costrowCountLable1; //row.getCell(5).address;
            worksheet.getCell(totalPriceCellLable1).value = itemLable1[6];
            worksheet.getCell(totalPriceCellLable1).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }

            var flLable1 ="";
            var finalFLLable1 = "";
            var qtyDzTempLable1 = `((D${costrowCountLable1} + ( D${costrowCountLable1} *(${itemLable1[9]}%)))/${itemLable1[10]})*F${costrowCountLable1}`;
            if(itemLable1[10] == 1){
   
              flLable1 = `(${qtyDzTempLable1}  + ${qtyDzTempLable1}*(${itemLable1[11]}/100))`;
   
           }
            else{
             flLable1 = `(${qtyDzTempLable1} +${itemLable1[11]})`;
            }
   
            if(itemLable1[0] =="CMQ"){
             finalFLLable1 = `(D${costrowCountLable1}*G${costrowCountLable1})/12`;
   
            }
            else{
             finalFLLable1 =flLable1;
            }
            worksheet.getCell(totalPriceCellLable1).value ={
             formula: finalFLLable1,
             date1904: false
            }
   
            let remarksCellLable1 = "H" + costrowCountLable1; //row.getCell(5).address;
            worksheet.getCell(remarksCellLable1).value = itemLable1[7];
            worksheet.getCell(remarksCellLable1).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
            lableLastRow = costrowCountLable1;
            rowCountLable1++
          }


      
      worksheet.addRow([]);

      var valLable1 = 8 + c + rowCountAccessories1 +rowCountLable1+ 2 + 2;
      let toalalLablePriceAscCellQ1 = "F"+ valLable1 ;
      worksheet.getCell(toalalLablePriceAscCellQ1).value = "Total Value";
      worksheet.getCell(toalalLablePriceAscCellQ1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      let toalalLablePriceAscCell1 = "G"+ valLable1 ;
      worksheet.getCell(toalalLablePriceAscCell1).value = 0;
      if(dataForExcelLable1.length>0){
        worksheet.getCell(toalalLablePriceAscCell1).value = {
          formula:`SUM(G${lableFastRow}:G${lableLastRow})`,
          date1904: false
        };
      }
      worksheet.getCell(toalalLablePriceAscCell1).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      var val = 8 + c + rowCountAccessories1 +rowCountLable1+ 2 + 2 + 1
      let dataTypePakingCell1 = "A"+ val ;
      worksheet.getCell(dataTypePakingCell1).value = "PACKING";

      var packgingData1 = allData.filter(x => x.costCategoryGroup == "PACKING" && x.stylePartId == partList[0].stylePartId);
   
       var dataForPackging1 = [];
       var dataForExcelPackging1 = [];
       for (var itemPackging1 of packgingData1) {
         var objPackging1 = {
           item: itemPackging1.itemName,
           itemDescription: itemPackging1.itemDescription,
           supplierName: itemPackging1.supplierDescription,
           qtyDz: itemPackging1.qtyDz,
           unit: itemLable1.unitName,
           unitPrice: itemPackging1.rate,
           totalPrice: itemPackging1.totalPrice,
           remarks: itemPackging1.remarks,
           consumption : itemPackging1.consumption,
           wastagePercentage : itemPackging1.wastagePercentage,
           marketRelation: itemPackging1.marketRelation,
           finCostPc:itemPackging1.finCostPc
         };
         dataForPackging1.push(objPackging1);
       }
   
       dataForPackging1.forEach((row: any) => {
        dataForExcelPackging1.push(Object.values(row));
       });


       var  rowCountPackging1 = 0
       var pakingFastRow =   rowCountPackging1 + 8 + c + rowCountAccessories1 +rowCountLable1 + 2 + 2 + 2;
       var pakingLastRow =  0
       for (var itemPackging1 of dataForExcelPackging1) {
         var costrowCountPackging1 = rowCountPackging1 + 8 + c + rowCountAccessories1 +rowCountLable1 + 2 + 2 + 2;           
            let itemCellPackging1 = "A" + costrowCountPackging1;// row.getCell(1).address;
            worksheet.getCell(itemCellPackging1).value = itemPackging1[0];
            worksheet.getCell(itemCellPackging1).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
   
            let itemDescriptionCellPackging1 = "B" + costrowCountPackging1;//  row.getCell(2).address;
            worksheet.getCell(itemDescriptionCellPackging1).value = itemPackging1[1];
            worksheet.getCell(itemDescriptionCellPackging1).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
   
            let supplierNameCellPackging1 = "C" + costrowCountPackging1;// row.getCell(3).address;
            worksheet.getCell(supplierNameCellPackging1).value = itemPackging1[2];
            worksheet.getCell(supplierNameCellPackging1).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
   
            let qtyDzCellPackging1 = "D" + costrowCountPackging1; //row.getCell(4).address;
            worksheet.getCell(qtyDzCellPackging1).value = itemPackging1[3];
            worksheet.getCell(qtyDzCellPackging1).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
            worksheet.getCell(qtyDzCellPackging1).value ={
              formula: `${itemPackging1[8]}*12`,
              date1904: false
            } 
   
            let unitCellPackging1 = "E" + costrowCountPackging1; //row.getCell(5).address;
            worksheet.getCell(unitCellPackging1).value = itemPackging1[4];
            worksheet.getCell(unitCellPackging1).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
   
            let unitPriceCellPackging1 = "F" + costrowCountPackging1; //row.getCell(5).address;
            worksheet.getCell(unitPriceCellPackging1).value = itemPackging1[5];
            worksheet.getCell(unitPriceCellPackging1).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
   
            let totalPriceCellPackging1 = "G" + costrowCountPackging1; //row.getCell(5).address;
            worksheet.getCell(totalPriceCellPackging1).value = itemPackging1[6];
            worksheet.getCell(totalPriceCellPackging1).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }

            var flPackging1 ="";
            var finalFLPackging1 = "";
            var qtyDzTempPackging1 = `((D${costrowCountPackging1} + ( D${costrowCountPackging1} *(${itemPackging1[9]}%)))/${itemPackging1[10]})*F${costrowCountPackging1}`;
            if(itemPackging1[10] == 1){
   
              flPackging1 = `(${qtyDzTempPackging1}  + ${qtyDzTempPackging1}*(${itemPackging1[11]}/100))`;
   
           }
            else{
              flPackging1 = `(${qtyDzTempPackging1} +${itemPackging1[11]})`;
            }
   
            if(itemPackging1[0] =="CMQ"){
              finalFLPackging1 = `(D${costrowCountPackging1}*G${costrowCountPackging1})/12`;
   
            }
            else{
              finalFLPackging1 =flPackging1;
            }
            worksheet.getCell(totalPriceCellPackging1).value ={
             formula: finalFLPackging1,
             date1904: false
            }
   
            let remarksCellPackging1 = "H" + costrowCountPackging1; //row.getCell(5).address;
            worksheet.getCell(remarksCellPackging1).value = itemPackging1[7];
            worksheet.getCell(remarksCellPackging1).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
            pakingLastRow = costrowCountPackging1;
            rowCountPackging1++
          }
      

          worksheet.addRow([]);

          var valPaking1 = 8 + c + rowCountAccessories1 + rowCountLable1+ rowCountPackging1 + 2 + 2 + 2 ;
          let toalalPakingPriceCellQ1 = "F"+ valPaking1 ;
          worksheet.getCell(toalalPakingPriceCellQ1).value = "Total Value";
          worksheet.getCell(toalalPakingPriceCellQ1).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }

          let toalalPakingPriceAscCell1 = "G"+ valPaking1 ;
          worksheet.getCell(toalalPakingPriceAscCell1).value =0;
          if(dataForExcelPackging1.length>0){
            worksheet.getCell(toalalPakingPriceAscCell1).value = {
              formula:`SUM(G${pakingFastRow}:G${pakingLastRow})`,
              date1904: false
            };
          }
          worksheet.getCell(toalalPakingPriceAscCell1).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }

          var val = 8 + c + rowCountAccessories1 + rowCountLable1+ rowCountPackging1 + 2 + 2 + 2 + 1
          let dataTypeProcessCell1 = "A"+ val ;
          worksheet.getCell(dataTypeProcessCell1).value = "PROCESS";




  /////--------process----------------/////

      var processData1 = allData.filter(x => x.costCategoryGroup == "PROCESS" && x.stylePartId == partList[0].stylePartId);
   
       var dataForProcesss1 = [];
       var dataForExcelProcesss1 = [];
       for (var itemProcesss1 of processData1) {
         var objProcesss1 = {
           item: itemProcesss1.itemName,
           itemDescription: itemProcesss1.itemDescription,
           supplierName: itemProcesss1.supplierDescription,
           qtyDz: itemProcesss1.qtyDz,
           unit: itemProcesss1.unitName,
           unitPrice: itemProcesss1.rate,
           totalPrice: itemProcesss1.totalPrice,
           remarks: itemProcesss1.remarks,
           consumption : itemProcesss1.consumption,
           wastagePercentage : itemProcesss1.wastagePercentage,
           marketRelation: itemProcesss1.marketRelation,
           finCostPc:itemProcesss1.finCostPc,

         };
         dataForProcesss1.push(objProcesss1);
       }
   
       dataForProcesss1.forEach((row: any) => {
        dataForExcelProcesss1.push(Object.values(row));
       });


       var  rowCountProcesss1 = 0
       var processFastRow =   rowCountProcesss1 + 8 + c + rowCountAccessories1 + rowCountLable1+ rowCountPackging1 + 2 + 2 + 2 + 2;
       var processLastRow = 0
       for (var itemProcesss1 of dataForExcelProcesss1) {
         var costrowCountProcesss1 = rowCountProcesss1 + 8 + c + rowCountAccessories1 + rowCountLable1+ rowCountPackging1 + 2 + 2 + 2 + 2;           
            let itemCellProcesss1 = "A" + costrowCountProcesss1;// row.getCell(1).address;
            worksheet.getCell(itemCellProcesss1).value = itemProcesss1[0];
            worksheet.getCell(itemCellProcesss1).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
   
            let itemDescriptionCellProcesss1 = "B" + costrowCountProcesss1;//  row.getCell(2).address;
            worksheet.getCell(itemDescriptionCellProcesss1).value = itemProcesss1[1];
            worksheet.getCell(itemDescriptionCellProcesss1).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
   
            let supplierNameCellProcesss1 = "C" + costrowCountProcesss1;// row.getCell(3).address;
            worksheet.getCell(supplierNameCellProcesss1).value = itemProcesss1[2];
            worksheet.getCell(supplierNameCellProcesss1).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
   
            let qtyDzCellProcesss1 = "D" + costrowCountProcesss1; //row.getCell(4).address;
            worksheet.getCell(qtyDzCellProcesss1).value = itemProcesss1[3];
            worksheet.getCell(qtyDzCellProcesss1).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }

            worksheet.getCell(qtyDzCellProcesss1).value ={
              formula: `${itemProcesss1[8]}*12`,
              date1904: false
            } 
   
            let unitCellProcesss1 = "E" + costrowCountProcesss1; //row.getCell(5).address;
            worksheet.getCell(unitCellProcesss1).value = itemProcesss1[4];
            worksheet.getCell(unitCellProcesss1).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
   
            let unitPriceCellProcesss1 = "F" + costrowCountProcesss1; //row.getCell(5).address;
            worksheet.getCell(unitPriceCellProcesss1).value = itemProcesss1[5];
            worksheet.getCell(unitPriceCellProcesss1).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
   
            let totalPriceCellProcesss1 = "G" + costrowCountProcesss1; //row.getCell(5).address;
            worksheet.getCell(totalPriceCellProcesss1).value = itemProcesss1[6];
            worksheet.getCell(totalPriceCellProcesss1).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }

            var flProcesss1 ="";
            var finalFLProcesss1 = "";
            var qtyDzTempProcesss1 = `((D${costrowCountProcesss1} + ( D${costrowCountProcesss1} *(${itemProcesss1[9]}%)))/${itemProcesss1[10]})*F${costrowCountProcesss1}`;
            if(itemProcesss1[10] == 1){
   
              flProcesss1 = `(${qtyDzTempProcesss1}  + ${qtyDzTempProcesss1}*(${itemProcesss1[11]}/100))`;
   
           }
            else{
              flProcesss1 = `(${qtyDzTempProcesss1} +${itemProcesss1[11]})`;
            }
   
            if(itemProcesss1[0] =="CMQ"){
              finalFLProcesss1 = `(D${costrowCountProcesss1}*G${costrowCountProcesss1})/12`;
   
            }
            else{
              finalFLProcesss1 =flProcesss1;
            }
            worksheet.getCell(totalPriceCellProcesss1).value ={
             formula: finalFLProcesss1,
             date1904: false
            }
   
            let remarksCellProcesss1 = "H" + costrowCountProcesss1; //row.getCell(5).address;
            worksheet.getCell(remarksCellProcesss1).value = itemProcesss1[7];
            worksheet.getCell(remarksCellProcesss1).border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }

            // let calculationWithBuyingComm = "I" + costrowCountProcesss1; //row.getCell(5).address;
            // worksheet.getCell(calculationWithBuyingComm).value = 0;
            // worksheet.getCell(calculationWithBuyingComm).border = {
            //   top: { style: 'thin' },
            //   bottom: { style: 'thin' },
            //   left: { style: 'thin' },
            //   right: { style: 'thin' }
            // }
            // if(allData.filter(x => x.itemName == "CMQ" && x.stylePartId == partList[0].stylePartId).length>0){
            //   worksheet.getCell(calculationWithBuyingComm).value = {
            //     formula:`ROUND(I${cmqLastRow}+(I${cmqLastRow}*${partList[0].buyingCommission}),2)` ,
            //     date1904: false
            //   }
            // }      
            processLastRow = costrowCountProcesss1;
            rowCountProcesss1++
        }
      
   
          
       worksheet.addRow([]);
    
       var valProcesss1 =  8 + c + rowCountAccessories1 + rowCountLable1+ rowCountPackging1 + rowCountProcesss1 + 2 + 2 + 2 + 2;
       let totalProcesssPriceCellQ1 = "F"+ valProcesss1 ;
       worksheet.getCell(totalProcesssPriceCellQ1).value = "Total Value";
       worksheet.getCell(totalProcesssPriceCellQ1).border = {
         top: { style: 'thin' },
         bottom: { style: 'thin' },
         left: { style: 'thin' },
         right: { style: 'thin' }
       }
       let totalProcesssPriceCell1 = "G"+ valProcesss1 ;
       worksheet.getCell(totalProcesssPriceCell1).value = 0 ;
       if(dataForExcelProcesss1.length>0){
        worksheet.getCell(totalProcesssPriceCell1).value = {
          formula:`SUM(G${processFastRow}:G${processLastRow})`,
          date1904: false
        };
       }

       worksheet.getCell(totalProcesssPriceCell1).border = {
         top: { style: 'thin' },
         bottom: { style: 'thin' },
         left: { style: 'thin' },
         right: { style: 'thin' }
       }
        var cmqData1 = allData.filter(x => x.itemName == "CMQ" && x.stylePartId == partList[0].stylePartId);

        var dataForCMQ1 = [];
        var dataForExcelCMQ1 = [];
        for (var itemCMQ1 of cmqData1) {
          var objCMQ1 = {
            item: itemCMQ1.itemName,
            itemDescription: itemCMQ1.itemDescription,
            supplierName: itemCMQ1.supplierDescription,
            qtyDz: itemCMQ1.qtyDz,
            unit: itemCMQ1.unitName,
            unitPrice: itemCMQ1.unitPrice,
            totalPrice: itemCMQ1.totalPrice,
            remarks: itemCMQ1.remarks,
            consumption : itemCMQ1.consumption,
            wastagePercentage : itemCMQ1.wastagePercentage,
            marketRelation: itemCMQ1.marketRelation,
            finCostPc:itemCMQ1.finCostPc,
            cmPc :itemCMQ1.cmPc
          };
          dataForCMQ1.push(objCMQ1);
        }
    
        dataForCMQ1.forEach((row: any) => {
          dataForExcelCMQ1.push(Object.values(row));
        });



        var  rowCountCMQ1 = 0
        var  cmqFastRow = rowCountCMQ1 + 8 + c + rowCountAccessories1 + rowCountLable1+ rowCountPackging1 + rowCountProcesss1 + 2 + 2 + 2 + 2 + 2;
        var  cmqLastRow = 0
        for (var itemCMQ1 of dataForExcelCMQ1) {
          var costrowCountCMQ1 =  rowCountCMQ1 + 8 + c + rowCountAccessories1 + rowCountLable1+ rowCountPackging1 + rowCountProcesss1 + 2 + 2 + 2 + 2 + 2 ;           
             let itemCellCMQ1 = "A" + costrowCountCMQ1;// row.getCell(1).address;
             worksheet.getCell(itemCellCMQ1).value = itemCMQ1[0];
             worksheet.getCell(itemCellCMQ1).border = {
               top: { style: 'thin' },
               bottom: { style: 'thin' },
               left: { style: 'thin' },
               right: { style: 'thin' }
             }
    
             let itemDescriptionCellCMQ1 = "B" + costrowCountCMQ1;//  row.getCell(2).address;
             worksheet.getCell(itemDescriptionCellCMQ1).value = itemCMQ1[1];
             worksheet.getCell(itemDescriptionCellCMQ1).border = {
               top: { style: 'thin' },
               bottom: { style: 'thin' },
               left: { style: 'thin' },
               right: { style: 'thin' }
             }
    
             let supplierNameCellCMQ1 = "C" + costrowCountCMQ1;// row.getCell(3).address;
             //worksheet.getCell(supplierNameCellCMQ1).value = itemCMQ1[2];
             worksheet.getCell(supplierNameCellCMQ1).value = "COST FOR MANUFACTURING";
             
             worksheet.getCell(supplierNameCellCMQ1).border = {
               top: { style: 'thin' },
               bottom: { style: 'thin' },
               left: { style: 'thin' },
               right: { style: 'thin' }
             }
    
             let qtyDzCellCMQ1 = "D" + costrowCountCMQ1; //row.getCell(4).address;
             worksheet.getCell(qtyDzCellCMQ1).value = itemCMQ1[3];
             worksheet.getCell(qtyDzCellCMQ1).border = {
               top: { style: 'thin' },
               bottom: { style: 'thin' },
               left: { style: 'thin' },
               right: { style: 'thin' }
             }
 
             worksheet.getCell(qtyDzCellCMQ1).value ={
               formula: `${itemCMQ1[3]}`,
               date1904: false
             } 
    
             let unitCellCMQ1 = "E" + costrowCountCMQ1; //row.getCell(5).address;
             worksheet.getCell(unitCellCMQ1).value = itemCMQ1[4];
             worksheet.getCell(unitCellCMQ1).border = {
               top: { style: 'thin' },
               bottom: { style: 'thin' },
               left: { style: 'thin' },
               right: { style: 'thin' }
             }
    
             let unitPriceCellMQ1 = "F" + costrowCountCMQ1; //row.getCell(5).address;
             worksheet.getCell(unitPriceCellMQ1).value = itemCMQ1[5];
             worksheet.getCell(unitPriceCellMQ1).border = {
               top: { style: 'thin' },
               bottom: { style: 'thin' },
               left: { style: 'thin' },
               right: { style: 'thin' }
             }

             worksheet.getCell(unitPriceCellMQ1).value ={
              formula: `(((${itemCMQ1[12]} *12) * 12)/ 12)`,
              date1904: false
            } 
    
             let totalPriceCellCMQ1 = "G" + costrowCountCMQ1; //row.getCell(5).address;
             worksheet.getCell(totalPriceCellCMQ1).value = itemCMQ1[6];
             worksheet.getCell(totalPriceCellCMQ1).border = {
               top: { style: 'thin' },
               bottom: { style: 'thin' },
               left: { style: 'thin' },
               right: { style: 'thin' }
             }
 
             worksheet.getCell(totalPriceCellCMQ1).value ={
              formula: `(D${costrowCountCMQ1}*F${costrowCountCMQ1})/12`,
              date1904: false
             }
    
             let remarksCellCMQ1 = "H" + costrowCountCMQ1; //row.getCell(5).address;
             worksheet.getCell(remarksCellCMQ1).value = itemCMQ1[7];
             worksheet.getCell(remarksCellCMQ1).border = {
               top: { style: 'thin' },
               bottom: { style: 'thin' },
               left: { style: 'thin' },
               right: { style: 'thin' }
             }
             cmqLastRow = costrowCountCMQ1;
             rowCountCMQ1++
         }




   worksheet.addRow([]);
   var valFinalTotal1 =  cmqLastRow + 1;
   let FinalTotalCellQ1 = "F"+ valFinalTotal1 ;
   worksheet.getCell(FinalTotalCellQ1).value = "Total ";
   worksheet.getCell(FinalTotalCellQ1).border = {
     top: { style: 'thin' },
     bottom: { style: 'thin' },
     left: { style: 'thin' },
     right: { style: 'thin' }
   }
   let FinalTotalCell1 = "G"+ valFinalTotal1 ;
   worksheet.getCell(FinalTotalCell1).value = {
     formula:`SUM(G${valFabric1}+G${valAccessories1}+G${valLable1}+G${valPaking1}+G${valProcesss1}+G${cmqLastRow})`,
     date1904: false
   };
   worksheet.getCell(FinalTotalCell1).border = {
     top: { style: 'thin' },
     bottom: { style: 'thin' },
     left: { style: 'thin' },
     right: { style: 'thin' }
   }

   let FinalTotalCell1Cal = "I"+ valFinalTotal1 ;
   worksheet.getCell(FinalTotalCell1Cal).value = {
    formula:`G${valFinalTotal1}/12`,
    date1904: false
  };
  worksheet.getCell(FinalTotalCell1Cal).border = {
    top: { style: 'thin' },
    bottom: { style: 'thin' },
    left: { style: 'thin' },
    right: { style: 'thin' }
  }


  let cmqCalTotalCell1 = "I"+ cmqLastRow ;
  worksheet.getCell(cmqCalTotalCell1).value = {
   formula:`I${valFinalTotal1}+I${cmqLastRow-1}`,
   date1904: false
 };
 worksheet.getCell(cmqCalTotalCell1).border = {
   top: { style: 'thin' },
   bottom: { style: 'thin' },
   left: { style: 'thin' },
   right: { style: 'thin' }
 }

//  var valuePline1 = cmqLastRow-3
 var valuePline1 = cmqLastRow-2
 let cmqCalTotalCell11 = "I"+ valuePline1 ;
 worksheet.getCell(cmqCalTotalCell11).value = {
  formula:`I${cmqLastRow}+(I${cmqLastRow}*${partList[0].buyingCommission})`,
  date1904: false
};
worksheet.getCell(cmqCalTotalCell11).border = {
  top: { style: 'thin' },
  bottom: { style: 'thin' },
  left: { style: 'thin' },
  right: { style: 'thin' }
}


//var valueUperPline1 = cmqLastRow-5
var valueUperPline1 = cmqLastRow-4
let cmqCalTotalCell111 = "I"+ valueUperPline1 ;
worksheet.getCell(cmqCalTotalCell111).value = {
// formula:`(I${cmqLastRow-4}-I${cmqLastRow+1})`,
 formula:`(I${cmqLastRow-3}-I${cmqLastRow+1})`,
 date1904: false
};
worksheet.getCell(cmqCalTotalCell111).border = {
 top: { style: 'thin' },
 bottom: { style: 'thin' },
 left: { style: 'thin' },
 right: { style: 'thin' }
}
 


  


       

         
              

///---------------double part--------------///

    if(partList.length>1)
    {   
      let style2 = worksheet.getCell("K3");
      style2.value = "Style ";
      style2.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      style2.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      style2.alignment = { vertical: "middle", horizontal: "left" };
  
  
      let styleName2 = worksheet.getCell("L3");
      styleName2.value = partList[0].styleName;
      styleName2.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      styleName2.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      styleName2.alignment = { vertical: "middle", horizontal: "left" };

      let part2 = worksheet.getCell("K4");
      part2.value = "Part Name ";
      part2.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      part2.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      part2.alignment = { vertical: "middle", horizontal: "left" };
  
  
      let partName2 = worksheet.getCell("L4");
      partName2.value = partList[1].partName;
      partName2.font = {
        name: "Calibri",
        size: 12,
        bold: true,
        color: { argb: "#ffff00" },
      };
      partName2.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
      partName2.alignment = { vertical: "middle", horizontal: "left" };


      var fabricData2 = allData.filter(x => x.costCategoryGroup == "FABRICS" && x.stylePartId == partList[1].stylePartId);


      var dataForFabric2 = [];
      var dataForExcelFabric2 = [];
      for (var itemFab of fabricData2) {
      var objFabric2 = {
        item: itemFab.itemName,
        itemDescription: itemFab.itemDescription,
        supplierName: itemFab.supplierDescription,
        qtyDz:  (itemFab.consumption+(itemFab.wastagePercentage/100))*12,
        unit: itemFab.unitName,
        unitPrice:itemFab.rate ,
        totalPrice: itemFab.totalPrice,
        remarks:itemFab.remarks,
        consumption : itemFab.consumption,
        wastagePercentage : itemFab.wastagePercentage,
        marketRelation: itemFab.marketRelation,
        finCostPc:itemFab.finCostPc
      };
      dataForFabric2.push(objFabric2);
    }

      dataForFabric2.forEach((row: any) => {
        dataForExcelFabric2.push(Object.values(row));
      });

      let dataTypeFabCell2 = "K" + 6;
      worksheet.getCell(dataTypeFabCell2).value = "FABRICS";

        var costRowCount = 7;

            let f1 = worksheet.getCell("K" + costRowCount);
            f1.value = "Item";
            f1.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "4167B8" },
              bgColor: { argb: "" },
            };
            f1.font = {
              bold: true,
              color: { argb: "FFFFFF" },
              size: 12,
            };

            let f2 = worksheet.getCell("L" + costRowCount);
            f2.value = "Item Description";
            f2.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "4167B8" },
              bgColor: { argb: "" },
            };
            f2.font = {
              bold: true,
              color: { argb: "FFFFFF" },
              size: 12,
            };

            let f3 = worksheet.getCell("M" + costRowCount);
            f3.value = "Supplier Name";
            f3.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "4167B8" },
              bgColor: { argb: "" },
            };
            f3.font = {
              bold: true,
              color: { argb: "FFFFFF" },
              size: 12,
            };

            let f4 = worksheet.getCell("N" + costRowCount);
            f4.value = "Qty/Dz";
            f4.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "4167B8" },
              bgColor: { argb: "" },
            };
            f4.font = {
              bold: true,
              color: { argb: "FFFFFF" },
              size: 12,
            };

            let f5 = worksheet.getCell("O" + costRowCount);
            f5.value = "Unit";
            f5.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "4167B8" },
              bgColor: { argb: "" },
            };
            f5.font = {
              bold: true,
              color: { argb: "FFFFFF" },
              size: 12,
            };

            let f6 = worksheet.getCell("P" + costRowCount);
            f6.value = "Unit Price";
            f6.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "4167B8" },
              bgColor: { argb: "" },
            };
            f6.font = {
              bold: true,
              color: { argb: "FFFFFF" },
              size: 12,
            };

            let f7 = worksheet.getCell("Q" + costRowCount);
            f7.value = "Total Price";
            f7.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "4167B8" },
              bgColor: { argb: "" },
            };
            f7.font = {
              bold: true,
              color: { argb: "FFFFFF" },
              size: 12,
            };

            let f8 = worksheet.getCell("R" + costRowCount);
            f8.value = "Remarks";
            f8.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "4167B8" },
              bgColor: { argb: "" },
            };
            f8.font = {
              bold: true,
              color: { argb: "FFFFFF" },
              size: 12,
            };

            
    var  rowCount = 0
    var fabricFastRow2 =  rowCount + 7 + 1;
    var fabricLastRow2 = 0
     for (var itemFab2 of dataForExcelFabric2) {
          var costRowCount2 = rowCount + 7 + 1;           
          let itemCell = "K" + costRowCount2;// row.getCell(1).address;
          worksheet.getCell(itemCell).value = itemFab2[0];
          worksheet.getCell(itemCell).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }

          let itemDescriptionCell = "L" + costRowCount2;//  row.getCell(2).address;
          worksheet.getCell(itemDescriptionCell).value = itemFab2[1];
          worksheet.getCell(itemDescriptionCell).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }

          let supplierNameCell = "M" + costRowCount2;// row.getCell(3).address;
          worksheet.getCell(supplierNameCell).value = itemFab2[2];
          worksheet.getCell(supplierNameCell).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }

          let qtyDzCell = "N" + costRowCount2; //row.getCell(4).address;
          worksheet.getCell(qtyDzCell).value = itemFab2[3];
          worksheet.getCell(qtyDzCell).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }

          worksheet.getCell(qtyDzCell).value ={
            formula: `(${itemFab2[8]}+(${itemFab2[8]}*(${itemFab2[9]}/100)))*12`,
            date1904: false
           } 

          let unitCell = "O" + costRowCount2; //row.getCell(5).address;
          worksheet.getCell(unitCell).value = itemFab2[4];
          worksheet.getCell(unitCell).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }

          let unitPriceCell = "P" + costRowCount2; //row.getCell(5).address;
          worksheet.getCell(unitPriceCell).value = itemFab2[5];
          worksheet.getCell(unitPriceCell).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }

          let totalPriceCell = "Q" + costRowCount2; //row.getCell(5).address;
          worksheet.getCell(totalPriceCell).value = itemFab2[6];
          worksheet.getCell(totalPriceCell).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }

          worksheet.getCell(totalPriceCell).value ={
            formula: `(N${costRowCount2}*P${costRowCount2})`,
            date1904: false
           } 
           

          let remarksCell = "R" + costRowCount2; //row.getCell(5).address;
          worksheet.getCell(remarksCell).value = itemFab2[7];
          worksheet.getCell(remarksCell).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          fabricLastRow2 = costRowCount2;
          rowCount++
        }

        worksheet.addRow([]);
       var valFabric2 = 8 + rowCount;
       let toalalFabricpriceAscCellQ2 = "P" + valFabric2;
       worksheet.getCell(toalalFabricpriceAscCellQ2).value = "Total Value";
       worksheet.getCell(toalalFabricpriceAscCellQ2).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
       }
       let toalalFabricpriceAscCell2 = "Q" + valFabric2;
       worksheet.getCell(toalalFabricpriceAscCell2).value = 0;
       if (dataForExcelFabric2.length > 0) {
        worksheet.getCell(toalalFabricpriceAscCell2).value = {
          formula: `SUM(Q${fabricFastRow2}:Q${fabricLastRow2})`,
          date1904: false
        };
       }
       worksheet.getCell(toalalFabricpriceAscCell2).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
       }     
        var val =  8 + rowCount + 1
        let dataTypeAscCell2 = "K"+ val ;
        worksheet.getCell(dataTypeAscCell2).value = "ACCESSORIES";
 
        var accessoriesData2 = allData.filter(x => x.costCategoryGroup == "ACCESSORIES" && x.stylePartId == partList[1].stylePartId);

        var dataForAccessories2 = [];
        var dataForExcelAccessories2 = [];
        for (var itemAsc2 of accessoriesData2) {
          var objAccessories2 = {
            item: itemAsc2.itemName,
            itemDescription: itemAsc2.itemDescription,
            supplierName: itemAsc2.supplierDescription,
            qtyDz: itemAsc2.qtyDz,
            unit: itemAsc2.unitName,
            unitPrice: itemAsc2.rate,
            totalPrice: itemAsc2.totalPrice,
            remarks: itemAsc2.remarks,
            consumption : itemAsc2.consumption,
            wastagePercentage : itemAsc2.wastagePercentage,
            marketRelation: itemAsc2.marketRelation,
            finCostPc:itemAsc2.finCostPc
          };
          dataForAccessories2.push(objAccessories2);
        }
    
        dataForAccessories2.forEach((row: any) => {
          dataForExcelAccessories2.push(Object.values(row));
        });

        var  rowCountAccessories2 = 0
        var accessoriesFastRow2 =   rowCountAccessories2 + 8 + rowCount + 2 ;
        var accessoriesLastRow2 = 0
        for (var itemAcs2 of dataForExcelAccessories2) {
          var costrowCountAccessories2 = rowCountAccessories2 + 8 + rowCount + 2 ;           
             let itemCell = "K" + costrowCountAccessories2;// row.getCell(1).address;
             worksheet.getCell(itemCell).value = itemAcs2[0];
             worksheet.getCell(itemCell).border = {
               top: { style: 'thin' },
               bottom: { style: 'thin' },
               left: { style: 'thin' },
               right: { style: 'thin' }
             }
    
             let itemDescriptionCellAcs2 = "L" + costrowCountAccessories2;//  row.getCell(2).address;
             worksheet.getCell(itemDescriptionCellAcs2).value = itemAcs2[1];
             worksheet.getCell(itemDescriptionCellAcs2).border = {
               top: { style: 'thin' },
               bottom: { style: 'thin' },
               left: { style: 'thin' },
               right: { style: 'thin' }
             }
    
             let supplierNameCellAcs2 = "M" + costrowCountAccessories2;// row.getCell(3).address;
             worksheet.getCell(supplierNameCellAcs2).value = itemAcs2[2];
             worksheet.getCell(supplierNameCellAcs2).border = {
               top: { style: 'thin' },
               bottom: { style: 'thin' },
               left: { style: 'thin' },
               right: { style: 'thin' }
             }
    
             let qtyDzCellAcs2 = "N" + costrowCountAccessories2; //row.getCell(4).address;
             worksheet.getCell(qtyDzCellAcs2).value = itemAcs2[3];
             worksheet.getCell(qtyDzCellAcs2).border = {
               top: { style: 'thin' },
               bottom: { style: 'thin' },
               left: { style: 'thin' },
               right: { style: 'thin' }
             }
             worksheet.getCell(qtyDzCellAcs2).value ={
              formula: `${itemAcs2[8]}*12`,
              date1904: false
             } 
    
             let unitCellAcs2 = "O" + costrowCountAccessories2; //row.getCell(5).address;
             worksheet.getCell(unitCellAcs2).value = itemAcs2[4];
             worksheet.getCell(unitCellAcs2).border = {
               top: { style: 'thin' },
               bottom: { style: 'thin' },
               left: { style: 'thin' },
               right: { style: 'thin' }
             }
    
             let unitPriceCellAcs2 = "P" + costrowCountAccessories2; //row.getCell(5).address;
             worksheet.getCell(unitPriceCellAcs2).value = itemAcs2[5];
             worksheet.getCell(unitPriceCellAcs2).border = {
               top: { style: 'thin' },
               bottom: { style: 'thin' },
               left: { style: 'thin' },
               right: { style: 'thin' }
             }
    
             let totalPriceCellAcs2 = "Q" + costrowCountAccessories2; //row.getCell(5).address;
             worksheet.getCell(totalPriceCellAcs2).value = itemAcs2[6];
             worksheet.getCell(totalPriceCellAcs2).border = {
               top: { style: 'thin' },
               bottom: { style: 'thin' },
               left: { style: 'thin' },
               right: { style: 'thin' }
             }

             var flAcs2 ="";
             var finalFLAcs2 = "";
             var qtyDzTempAcs2 = `((N${costrowCountAccessories2} + ( N${costrowCountAccessories2} *(${itemAcs2[9]}%)))/${itemAcs2[10]})*P${costrowCountAccessories2}`;
             if(itemAcs2[10] == 1){
    
               flAcs2 = `(${qtyDzTempAcs2}  + ${qtyDzTempAcs2}*(${itemAcs2[11]}/100))`;
    
            }
             else{
              flAcs2 = `(${qtyDzTempAcs2} +${itemAcs2[11]})`;
             }
    
             if(itemAcs2[0] =="CMQ"){
              finalFLAcs2 = `(N${costrowCountAccessories2}*P${costrowCountAccessories2})/12`;
    
             }
             else{
              finalFLAcs2 =flAcs2;
             }
             worksheet.getCell(totalPriceCellAcs2).value ={
              formula: finalFLAcs2,
              date1904: false
             }
    
             let remarksCellAcs2 = "R" + costrowCountAccessories2; //row.getCell(5).address;
             worksheet.getCell(remarksCellAcs2).value = itemAcs2[7];
             worksheet.getCell(remarksCellAcs2).border = {
               top: { style: 'thin' },
               bottom: { style: 'thin' },
               left: { style: 'thin' },
               right: { style: 'thin' }
             }
             accessoriesLastRow2 = costrowCountAccessories2;
             rowCountAccessories2++
           }




           worksheet.addRow([]);

           var valAccessories2 =  8 + rowCount + rowCountAccessories2 + 2;
           let toalalAccessoriesPriceAscCellQ2 = "P"+ valAccessories2;
           worksheet.getCell(toalalAccessoriesPriceAscCellQ2).value = "Total Value";
           worksheet.getCell(toalalAccessoriesPriceAscCellQ2).border = {
             top: { style: 'thin' },
             bottom: { style: 'thin' },
             left: { style: 'thin' },
             right: { style: 'thin' }
           }
           let toalalAccessoriesPriceAscCell2 = "Q"+ valAccessories2 ;
           worksheet.getCell(toalalAccessoriesPriceAscCell2).value = 0
           if(dataForExcelAccessories2.length>0){
            worksheet.getCell(toalalAccessoriesPriceAscCell2).value = {
              formula:`SUM(Q${accessoriesFastRow2}:Q${accessoriesLastRow2})`,
              date1904: false
            };
           }    
           worksheet.getCell(toalalAccessoriesPriceAscCell2).border = {
             top: { style: 'thin' },
             bottom: { style: 'thin' },
             left: { style: 'thin' },
             right: { style: 'thin' }
           }

           var val =   8 + rowCount + rowCountAccessories2 + 2 + 1
           let dataTypeLableCell2 = "K"+ val ;
           worksheet.getCell(dataTypeLableCell2).value = "LABELS";

           var lableData2 = allData.filter(x => x.costCategoryGroup == "LABELS" && x.stylePartId == partList[1].stylePartId);
       
           var dataForLable2 = [];
           var dataForExcelLable2 = [];
           for (var itemLable2 of lableData2) {
             var objLable2 = {
               item: itemLable2.itemName,
               itemDescription: itemLable2.itemDescription,
               supplierName: itemLable2.supplierDescription,
               qtyDz: itemLable2.qtyDz,
               unit: itemLable2.unitName,
               unitPrice: itemLable2.rate,
               totalPrice: itemLable2.totalPrice,
               remarks: itemLable2.remarks,
               consumption : itemLable2.consumption,
               wastagePercentage : itemLable2.wastagePercentage,
               marketRelation: itemLable2.marketRelation,
               finCostPc:itemLable2.finCostPc
             };
             dataForLable2.push(objLable2);
           }
       
           dataForLable2.forEach((row: any) => {
            dataForExcelLable2.push(Object.values(row));
           });
    
    
           var  rowCountLable2 = 0

           var lableFastRow2 =  rowCountLable2 + 8 + rowCount + rowCountAccessories2 +2+ 2;
           var lableLastRow2 =  0
           for (var itemLable2 of dataForExcelLable2) {
             var costrowCountLable2 = rowCountLable2 + 8 + rowCount + rowCountAccessories2 +2+ 2;           
                let itemCellLable2 = "K" + costrowCountLable2;// row.getCell(1).address;
                worksheet.getCell(itemCellLable2).value = itemLable2[0];
                worksheet.getCell(itemCellLable2).border = {
                  top: { style: 'thin' },
                  bottom: { style: 'thin' },
                  left: { style: 'thin' },
                  right: { style: 'thin' }
                }
       
                let itemDescriptionCellLable2 = "L" + costrowCountLable2;//  row.getCell(2).address;
                worksheet.getCell(itemDescriptionCellLable2).value = itemLable2[1];
                worksheet.getCell(itemDescriptionCellLable2).border = {
                  top: { style: 'thin' },
                  bottom: { style: 'thin' },
                  left: { style: 'thin' },
                  right: { style: 'thin' }
                }
       
                let supplierNameCellLable2 = "M" + costrowCountLable2;// row.getCell(3).address;
                worksheet.getCell(supplierNameCellLable2).value = itemLable2[2];
                worksheet.getCell(supplierNameCellLable2).border = {
                  top: { style: 'thin' },
                  bottom: { style: 'thin' },
                  left: { style: 'thin' },
                  right: { style: 'thin' }
                }
       
                let qtyDzCellLable2 = "N" + costrowCountLable2; //row.getCell(4).address;
                worksheet.getCell(qtyDzCellLable2).value = itemLable2[3];
                worksheet.getCell(qtyDzCellLable2).border = {
                  top: { style: 'thin' },
                  bottom: { style: 'thin' },
                  left: { style: 'thin' },
                  right: { style: 'thin' }
                }

                worksheet.getCell(qtyDzCellLable2).value ={
                  formula: `${itemLable2[8]}*12`,
                  date1904: false
                } 
       
                let unitCellLable2 = "O" + costrowCountLable2; //row.getCell(5).address;
                worksheet.getCell(unitCellLable2).value = itemLable2[4];
                worksheet.getCell(unitCellLable2).border = {
                  top: { style: 'thin' },
                  bottom: { style: 'thin' },
                  left: { style: 'thin' },
                  right: { style: 'thin' }
                }
       
                let unitPriceCellLable2 = "P" + costrowCountLable2; //row.getCell(5).address;
                worksheet.getCell(unitPriceCellLable2).value = itemLable2[5];
                worksheet.getCell(unitPriceCellLable2).border = {
                  top: { style: 'thin' },
                  bottom: { style: 'thin' },
                  left: { style: 'thin' },
                  right: { style: 'thin' }
                }
       
                let totalPriceCellLable2 = "Q" + costrowCountLable2; //row.getCell(5).address;
                worksheet.getCell(totalPriceCellLable2).value = itemLable2[6];
                worksheet.getCell(totalPriceCellLable2).border = {
                  top: { style: 'thin' },
                  bottom: { style: 'thin' },
                  left: { style: 'thin' },
                  right: { style: 'thin' }
                }

                
            var flLable2 ="";
            var finalFLLable2 = "";
            var qtyDzTempLable2 = `((N${costrowCountLable2} + ( N${costrowCountLable2} *(${itemLable2[9]}%)))/${itemLable2[10]})*P${costrowCountLable2}`;
            if(itemLable2[10] == 1){
   
              flLable2 = `(${qtyDzTempLable2}  + ${qtyDzTempLable2}*(${itemLable2[11]}/100))`;
   
           }
            else{
             flLable2 = `(${qtyDzTempLable2} +${itemLable2[11]})`;
            }
   
            if(itemLable2[0] =="CMQ"){
             finalFLLable2 = `(N${costrowCountLable2}*P${costrowCountLable2})/12`;
   
            }
            else{
             finalFLLable2 =flLable2;
            }
            worksheet.getCell(totalPriceCellLable2).value ={
             formula: finalFLLable2,
             date1904: false
            }
       
                let remarksCellLable2 = "R" + costrowCountLable2; //row.getCell(5).address;
                worksheet.getCell(remarksCellLable2).value = itemLable2[7];
                worksheet.getCell(remarksCellLable2).border = {
                  top: { style: 'thin' },
                  bottom: { style: 'thin' },
                  left: { style: 'thin' },
                  right: { style: 'thin' }
                }
                lableLastRow2 = costrowCountLable2;
                rowCountLable2++
          }
              
       worksheet.addRow([]);

       var valLable2 = 8 + rowCount + rowCountAccessories2 +rowCountLable2+ 2 + 2;
       let toalalLablePriceAscCellQ2 = "P"+ valLable2 ;
       worksheet.getCell(toalalLablePriceAscCellQ2).value = "Total Value";
       worksheet.getCell(toalalLablePriceAscCellQ2).border = {
         top: { style: 'thin' },
         bottom: { style: 'thin' },
         left: { style: 'thin' },
         right: { style: 'thin' }
       }
       let toalalLablePriceAscCell2 = "Q"+ valLable2 ;
       worksheet.getCell(toalalLablePriceAscCell2).value = 0;
       if(dataForExcelLable2.length>0){
         worksheet.getCell(toalalLablePriceAscCell2).value = {
           formula:`SUM(Q${lableFastRow2}:Q${lableLastRow2})`,
           date1904: false
         };
       }
       worksheet.getCell(toalalLablePriceAscCell2).border = {
         top: { style: 'thin' },
         bottom: { style: 'thin' },
         left: { style: 'thin' },
         right: { style: 'thin' }
       }
       var val =   8 + rowCount + rowCountAccessories2 +rowCountLable2+ 2 + 2+ 1
       let dataTypePakingCell1 = "K"+ val ;
       worksheet.getCell(dataTypePakingCell1).value = "PACKING";



      var packgingData2 = allData.filter(x => x.costCategoryGroup == "PACKING" && x.stylePartId == partList[1].stylePartId);
   
      var dataForPackging2 = [];
      var dataForExcelPackging2 = [];
      for (var itemPackging2 of packgingData2) {
        var objPackging2 = {
          item: itemPackging2.itemName,
          itemDescription: itemPackging2.itemDescription,
          supplierName: itemPackging2.supplierDescription,
          qtyDz: itemPackging2.qtyDz,
          unit: itemPackging2.unitName,
          unitPrice: itemPackging2.rate,
          totalPrice: itemPackging2.totalPrice,
          remarks: itemPackging2.remarks,
          consumption : itemPackging2.consumption,
          wastagePercentage : itemPackging2.wastagePercentage,
          marketRelation: itemPackging2.marketRelation,
          finCostPc:itemPackging2.finCostPc
        };
        dataForPackging2.push(objPackging2);
      }
  
      dataForPackging2.forEach((row: any) => {
       dataForExcelPackging2.push(Object.values(row));
      });


      var  rowCountPackging2 = 0
      var pakingFastRow2 =  rowCountPackging2 + 8 + rowCount + rowCountAccessories2 +rowCountLable2+ 2 + 2 + 2;
      var pakingLastRow2 =  0
      for (var itemPackging2 of dataForExcelPackging2) {
        var costrowCountPackging2 = rowCountPackging2 + 8 + rowCount + rowCountAccessories2 +rowCountLable2+ 2 + 2 + 2;           
           let itemCellPackging2 = "K" + costrowCountPackging2;// row.getCell(1).address;
           worksheet.getCell(itemCellPackging2).value = itemPackging2[0];
           worksheet.getCell(itemCellPackging2).border = {
             top: { style: 'thin' },
             bottom: { style: 'thin' },
             left: { style: 'thin' },
             right: { style: 'thin' }
           }
  
           let itemDescriptionCellPackging2 = "L" + costrowCountPackging2;//  row.getCell(2).address;
           worksheet.getCell(itemDescriptionCellPackging2).value = itemPackging2[1];
           worksheet.getCell(itemDescriptionCellPackging2).border = {
             top: { style: 'thin' },
             bottom: { style: 'thin' },
             left: { style: 'thin' },
             right: { style: 'thin' }
           }
  
           let supplierNameCellPackging2 = "M" + costrowCountPackging2;// row.getCell(3).address;
           worksheet.getCell(supplierNameCellPackging2).value = itemPackging2[2];
           worksheet.getCell(supplierNameCellPackging2).border = {
             top: { style: 'thin' },
             bottom: { style: 'thin' },
             left: { style: 'thin' },
             right: { style: 'thin' }
           }
  
           let qtyDzCellPackging2 = "N" + costrowCountPackging2; //row.getCell(4).address;
           worksheet.getCell(qtyDzCellPackging2).value = itemPackging2[3];
           worksheet.getCell(qtyDzCellPackging2).border = {
             top: { style: 'thin' },
             bottom: { style: 'thin' },
             left: { style: 'thin' },
             right: { style: 'thin' }
           }
           worksheet.getCell(qtyDzCellPackging2).value ={
            formula: `${itemPackging2[8]}*12`,
            date1904: false
          } 
  
           let unitCellPackging2 = "O" + costrowCountPackging2; //row.getCell(5).address;
           worksheet.getCell(unitCellPackging2).value = itemPackging2[4];
           worksheet.getCell(unitCellPackging2).border = {
             top: { style: 'thin' },
             bottom: { style: 'thin' },
             left: { style: 'thin' },
             right: { style: 'thin' }
           }
  
           let unitPriceCellPackging2 = "P" + costrowCountPackging2; //row.getCell(5).address;
           worksheet.getCell(unitPriceCellPackging2).value = itemPackging2[5];
           worksheet.getCell(unitPriceCellPackging2).border = {
             top: { style: 'thin' },
             bottom: { style: 'thin' },
             left: { style: 'thin' },
             right: { style: 'thin' }
           }
  
           let totalPriceCellPackging2 = "Q" + costrowCountPackging2; //row.getCell(5).address;
           worksheet.getCell(totalPriceCellPackging2).value = itemPackging2[6];
           worksheet.getCell(totalPriceCellPackging2).border = {
             top: { style: 'thin' },
             bottom: { style: 'thin' },
             left: { style: 'thin' },
             right: { style: 'thin' }
           }

           var flPackging2 ="";
           var finalFLPackging2 = "";
           var qtyDzTempPackging2 = `((N${costrowCountPackging2} + ( N${costrowCountPackging2} *(${itemPackging2[9]}%)))/${itemPackging2[10]})*P${costrowCountPackging2}`;
           if(itemPackging2[10] == 1){
  
             flPackging2 = `(${qtyDzTempPackging2}  + ${qtyDzTempPackging2}*(${itemPackging2[11]}/100))`;
  
          }
           else{
             flPackging2 = `(${qtyDzTempPackging2} +${itemPackging2[11]})`;
           }
  
           if(itemPackging2[0] =="CMQ"){
             finalFLPackging2 = `(N${costrowCountPackging2}*P${costrowCountPackging2})/12`;
  
           }
           else{
             finalFLPackging2 =flPackging2;
           }
           worksheet.getCell(totalPriceCellPackging2).value ={
            formula: finalFLPackging2,
            date1904: false
           }
  
           let remarksCellPackging2 = "R" + costrowCountPackging2; //row.getCell(5).address;
           worksheet.getCell(remarksCellPackging2).value = itemPackging2[7];
           worksheet.getCell(remarksCellPackging2).border = {
             top: { style: 'thin' },
             bottom: { style: 'thin' },
             left: { style: 'thin' },
             right: { style: 'thin' }
           }
           pakingLastRow2 = costrowCountPackging2;
           rowCountPackging2++
         }
     
         worksheet.addRow([]);

         var valPaking2 = 8 + rowCount + rowCountAccessories2 + rowCountLable2+ rowCountPackging2 + 2 + 2 + 2 ;
         let toalalPakingPriceCellQ2 = "P"+ valPaking2 ;
         worksheet.getCell(toalalPakingPriceCellQ2).value = "Total Value";
         worksheet.getCell(toalalPakingPriceCellQ2).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         let toalalPakingPriceAscCell2 = "Q"+ valPaking2 ;
         worksheet.getCell(toalalPakingPriceAscCell2).value =0;
         if(dataForExcelPackging2.length>0){
           worksheet.getCell(toalalPakingPriceAscCell2).value = {
             formula:`SUM(Q${pakingFastRow2}:Q${pakingLastRow2})`,
             date1904: false
           };
         }

         worksheet.getCell(toalalPakingPriceAscCell2).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }


         var val = 8 + rowCount + rowCountAccessories2 + rowCountLable2+ rowCountPackging2 + 2 + 2 + 2 + 1
         let dataTypeProcessCell1 = "K"+ val ;
         worksheet.getCell(dataTypeProcessCell1).value = "PROCESS";



         
  /////--------process----------------/////

      var processData2 = allData.filter(x => x.costCategoryGroup == "PROCESS" && x.stylePartId == partList[1].stylePartId);
   
      var dataForProcesss2 = [];
      var dataForExcelProcesss2 = [];
      for (var itemProcesss2 of processData2) {
        var objProcesss2 = {
          item: itemProcesss2.itemName,
          itemDescription: itemProcesss2.itemDescription,
          supplierName: itemProcesss2.supplierDescription,
          qtyDz: itemProcesss2.qtyDz,
          unit: itemProcesss2.unitName,
          unitPrice: itemProcesss2.rate,
          totalPrice: itemProcesss2.totalPrice,
          remarks: itemProcesss2.remarks,
          consumption : itemProcesss2.consumption,
          wastagePercentage : itemProcesss2.wastagePercentage,
          marketRelation: itemProcesss2.marketRelation,
          finCostPc:itemProcesss2.finCostPc
        };
        dataForProcesss2.push(objProcesss2);
      }
  
      dataForProcesss2.forEach((row: any) => {
       dataForExcelProcesss2.push(Object.values(row));
      });


      var  rowCountProcesss2 = 0
      var processFastRow2 =   rowCountProcesss2 + 8 + rowCount + rowCountAccessories2 + rowCountLable2+ rowCountPackging2 + 2 + 2 + 2 + 2;
      var processLastRow2 = 0
      for (var itemProcesss2 of dataForExcelProcesss2) {
        var costrowCountProcesss2 = rowCountProcesss2 + 8 + rowCount + rowCountAccessories2 + rowCountLable2+ rowCountPackging2 + 2 + 2 + 2 + 2;           
           let itemCellProcesss2 = "K" + costrowCountProcesss2;// row.getCell(1).address;
           worksheet.getCell(itemCellProcesss2).value = itemProcesss2[0];
           worksheet.getCell(itemCellProcesss2).border = {
             top: { style: 'thin' },
             bottom: { style: 'thin' },
             left: { style: 'thin' },
             right: { style: 'thin' }
           }
  
           let itemDescriptionCellProcesss2 = "L" + costrowCountProcesss2;//  row.getCell(2).address;
           worksheet.getCell(itemDescriptionCellProcesss2).value = itemProcesss2[1];
           worksheet.getCell(itemDescriptionCellProcesss2).border = {
             top: { style: 'thin' },
             bottom: { style: 'thin' },
             left: { style: 'thin' },
             right: { style: 'thin' }
           }
  
           let supplierNameCellProcesss2 = "M" + costrowCountProcesss2;// row.getCell(3).address;
           worksheet.getCell(supplierNameCellProcesss2).value = itemProcesss2[2];
           worksheet.getCell(supplierNameCellProcesss2).border = {
             top: { style: 'thin' },
             bottom: { style: 'thin' },
             left: { style: 'thin' },
             right: { style: 'thin' }
           }
  
           let qtyDzCellProcesss2 = "N" + costrowCountProcesss2; //row.getCell(4).address;
           worksheet.getCell(qtyDzCellProcesss2).value = itemProcesss2[3];
           worksheet.getCell(qtyDzCellProcesss2).border = {
             top: { style: 'thin' },
             bottom: { style: 'thin' },
             left: { style: 'thin' },
             right: { style: 'thin' }
           }
           worksheet.getCell(qtyDzCellProcesss2).value ={
            formula: `${itemProcesss2[8]}*12`,
            date1904: false
          } 
  
           let unitCellProcesss2 = "O" + costrowCountProcesss2; //row.getCell(5).address;
           worksheet.getCell(unitCellProcesss2).value = itemProcesss2[4];
           worksheet.getCell(unitCellProcesss2).border = {
             top: { style: 'thin' },
             bottom: { style: 'thin' },
             left: { style: 'thin' },
             right: { style: 'thin' }
           }
  
           let unitPriceCellProcesss2 = "P" + costrowCountProcesss2; //row.getCell(5).address;
           worksheet.getCell(unitPriceCellProcesss2).value = itemProcesss2[5];
           worksheet.getCell(unitPriceCellProcesss2).border = {
             top: { style: 'thin' },
             bottom: { style: 'thin' },
             left: { style: 'thin' },
             right: { style: 'thin' }
           }
  
           let totalPriceCellProcesss2 = "Q" + costrowCountProcesss2; //row.getCell(5).address;
           worksheet.getCell(totalPriceCellProcesss2).value = itemProcesss2[6];
           worksheet.getCell(totalPriceCellProcesss2).border = {
             top: { style: 'thin' },
             bottom: { style: 'thin' },
             left: { style: 'thin' },
             right: { style: 'thin' }
           }

           var flProcesss2 ="";
           var finalFLProcesss2 = "";
           var qtyDzTempProcesss2 = `((N${costrowCountProcesss2} + ( N${costrowCountProcesss2} *(${itemProcesss2[9]}%)))/${itemProcesss2[10]})*P${costrowCountProcesss2}`;
           if(itemProcesss2[10] == 1){
  
             flProcesss2 = `(${qtyDzTempProcesss2}  + ${qtyDzTempProcesss2}*(${itemProcesss2[11]}/100))`;
  
          }
           else{
             flProcesss2 = `(${qtyDzTempProcesss2} +${itemProcesss2[11]})`;
           }
  
           if(itemProcesss2[0] =="CMQ"){
             finalFLProcesss2 = `(N${costrowCountProcesss2}*P${costrowCountProcesss2})/12`;
  
           }
           else{
             finalFLProcesss2 =flProcesss2;
           }
           worksheet.getCell(totalPriceCellProcesss2).value ={
            formula: finalFLProcesss2,
            date1904: false
           }
  
           let remarksCellProcesss2 = "R" + costrowCountProcesss2; //row.getCell(5).address;
           worksheet.getCell(remarksCellProcesss2).value = itemProcesss2[7];
           worksheet.getCell(remarksCellProcesss2).border = {
             top: { style: 'thin' },
             bottom: { style: 'thin' },
             left: { style: 'thin' },
             right: { style: 'thin' }
           }
           processLastRow2 = costrowCountProcesss2;
           rowCountProcesss2++
         }
     
         worksheet.addRow([]);
         var valProcesss2 =   8 + rowCount + rowCountAccessories2 + rowCountLable2+ rowCountPackging2 + rowCountProcesss2 + 2 + 2 + 2 + 2 ;
         let totalProcesssPriceCellQ2 = "P"+ valProcesss2 ;
         worksheet.getCell(totalProcesssPriceCellQ2).value = "Total Value";
         worksheet.getCell(totalProcesssPriceCellQ2).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }
         let totalProcesssPriceCell2 = "Q"+ valProcesss2 ;
         worksheet.getCell(totalProcesssPriceCell2).value = 0 ;
         if(dataForExcelProcesss2.length>0){
          worksheet.getCell(totalProcesssPriceCell2).value = {
            formula:`SUM(Q${processFastRow2}:Q${processLastRow2})`,
            date1904: false
          };
         }
         worksheet.getCell(totalProcesssPriceCell2).border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }


         //worksheet.addRow([]);
    
         var cmqData2 = allData.filter(x => x.itemName == "CMQ" && x.stylePartId == partList[1].stylePartId);
 
         var dataForCMQ2 = [];
         var dataForExcelCMQ2 = [];
         for (var itemCMQ2 of cmqData2) {
           var objCMQ2 = {
             item: itemCMQ2.itemName,
             itemDescription: itemCMQ2.itemDescription,
             supplierName: itemCMQ2.supplierDescription,
             qtyDz: itemCMQ2.qtyDz,
             unit: itemCMQ2.unitName,
             unitPrice: itemCMQ2.unitPrice,
             totalPrice: itemCMQ2.totalPrice,
             remarks: itemCMQ2.remarks,
             consumption : itemCMQ2.consumption,
             wastagePercentage : itemCMQ2.wastagePercentage,
             marketRelation: itemCMQ2.marketRelation,
             finCostPc:itemCMQ2.finCostPc,
             cmPc :itemCMQ2.cmPc
           };
           dataForCMQ2.push(objCMQ2);
         }
     
         dataForCMQ2.forEach((row: any) => {
          dataForExcelCMQ2.push(Object.values(row));
         });
 
 
 
         var  rowCountCMQ2 = 0
         var  cmqFastRow2 = rowCountCMQ2 + 8 + rowCount + rowCountAccessories2 + rowCountLable2+ rowCountPackging2 + rowCountProcesss2 + 2 + 2 + 2 + 2 + 2;
         var  cmqLastRow2 = 0
         for (var itemCMQ2 of dataForExcelCMQ2) {
           var costrowCountCMQ2 =  rowCountCMQ2 + 8 + rowCount + rowCountAccessories2 + rowCountLable2+ rowCountPackging2 + rowCountProcesss2 + 2 + 2 + 2 + 2 + 2 ;           
              let itemCellCMQ2 = "K" + costrowCountCMQ2;// row.getCell(1).address;
              worksheet.getCell(itemCellCMQ2).value = itemCMQ2[0];
              worksheet.getCell(itemCellCMQ2).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
              }
     
              let itemDescriptionCellCMQ2 = "L" + costrowCountCMQ2;//  row.getCell(2).address;
              //worksheet.getCell(itemDescriptionCellCMQ2).value = itemCMQ2[1];
              worksheet.getCell(itemDescriptionCellCMQ2).value = "COST FOR MANUFACTURING";
              worksheet.getCell(itemDescriptionCellCMQ2).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
              }
     
              let supplierNameCellCMQ2 = "M" + costrowCountCMQ2;// row.getCell(3).address;
              worksheet.getCell(supplierNameCellCMQ2).value = itemCMQ2[2];
              worksheet.getCell(supplierNameCellCMQ2).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
              }
     
              let qtyDzCellCMQ2 = "N" + costrowCountCMQ2; //row.getCell(4).address;
              worksheet.getCell(qtyDzCellCMQ2).value = itemCMQ2[3];
              worksheet.getCell(qtyDzCellCMQ2).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
              }
  
              worksheet.getCell(qtyDzCellCMQ2).value ={
                formula: `=${itemCMQ2[3]}`,
                date1904: false
              } 
     
              let unitCellCMQ2 = "O" + costrowCountCMQ2; //row.getCell(5).address;
              worksheet.getCell(unitCellCMQ2).value = itemCMQ2[4];
              worksheet.getCell(unitCellCMQ2).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
              }
     
              let unitPriceCellMQ2 = "P" + costrowCountCMQ2; //row.getCell(5).address;
              worksheet.getCell(unitPriceCellMQ2).value = itemCMQ2[5];
              worksheet.getCell(unitPriceCellMQ2).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
              }
 
              worksheet.getCell(unitPriceCellMQ2).value ={
               formula: `(((${itemCMQ2[12]} *12) * 12)/ 12)`,
               date1904: false
             } 
     
              let totalPriceCellCMQ2 = "Q" + costrowCountCMQ2; //row.getCell(5).address;
              worksheet.getCell(totalPriceCellCMQ2).value = itemCMQ2[6];
              worksheet.getCell(totalPriceCellCMQ2).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
              }
  
              worksheet.getCell(totalPriceCellCMQ2).value ={
               formula: `(N${costrowCountCMQ2}*P${costrowCountCMQ2})/12`,
               date1904: false
              }
     
              let remarksCellCMQ2 = "R" + costrowCountCMQ2; //row.getCell(5).address;
              worksheet.getCell(remarksCellCMQ2).value = itemCMQ2[7];
              worksheet.getCell(remarksCellCMQ2).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
              }
              cmqLastRow2 = costrowCountCMQ2;
              rowCountCMQ2++
          }

          var valFinalTotal2 =  cmqLastRow2 + 1;
          let FinalTotalCellQ1 = "P"+ valFinalTotal2 ;
          worksheet.getCell(FinalTotalCellQ1).value = "Total ";
          worksheet.getCell(FinalTotalCellQ1).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
          let FinalTotalCell2 = "Q"+ valFinalTotal2 ;
          worksheet.getCell(FinalTotalCell2).value = {
            formula:`SUM(Q${valFabric2}+Q${valAccessories2}+Q${valLable2}+Q${valPaking2}+Q${valProcesss2}+Q${cmqLastRow2})`,
            date1904: false
          };
          worksheet.getCell(FinalTotalCell2).border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
       
          let FinalTotalCell1Cal2 = "S"+ valFinalTotal2 ;
          worksheet.getCell(FinalTotalCell1Cal2).value = {
           formula:`Q${valFinalTotal2}/12`,
           date1904: false
         };
         worksheet.getCell(FinalTotalCell1Cal2).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }
      
        let cmqCalTotalCell2 = "S"+ cmqLastRow2 ;
        worksheet.getCell(cmqCalTotalCell2).value = {
         formula:`S${valFinalTotal2}+S${cmqLastRow2-1}`,
         date1904: false
       };
       worksheet.getCell(cmqCalTotalCell2).border = {
         top: { style: 'thin' },
         bottom: { style: 'thin' },
         left: { style: 'thin' },
         right: { style: 'thin' }
       }
       
      // var valuePline2 = cmqLastRow2-3;
      var valuePline2 = cmqLastRow2-2
       let cmqCalTotalCell22 = "S"+ valuePline2 ;
       worksheet.getCell(cmqCalTotalCell22).value = {
        formula:`S${cmqLastRow2}+(S${cmqLastRow2}*${partList[1].buyingCommission})`,
        date1904: false
      };
      worksheet.getCell(cmqCalTotalCell22).border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }

      // var valueUperPline2 = cmqLastRow2-5
      var valueUperPline2 = cmqLastRow2-4
      let cmqCalTotalCell222 = "S"+ valueUperPline2 ;
      worksheet.getCell(cmqCalTotalCell222).value = {
       formula:`(S${cmqLastRow2-3}-S${cmqLastRow2+1})`,
       date1904: false
     };
     worksheet.getCell(cmqCalTotalCell222).border = {
       top: { style: 'thin' },
       bottom: { style: 'thin' },
       left: { style: 'thin' },
       right: { style: 'thin' }
     }
            
    }







  //---------IE data --------//

  if(cmqLastRow>cmqLastRow2){
    var val = 8 + c + rowCountAccessories1 + rowCountLable1+ rowCountPackging1 + rowCountProcesss1 + rowCountCMQ1 + 2 + 2 + 2 + 2 + 2 + 1;
  }
  else if(partList.length>1 && cmqLastRow<cmqLastRow2){
    var val = 8 + rowCount + rowCountAccessories2 + rowCountLable2+ rowCountPackging2 + rowCountProcesss2 + rowCountCMQ2 + 2 + 2 + 2 + 2 + 2 + 1;
  }
  else{
    var val = 8 + c + rowCountAccessories1 + rowCountLable1+ rowCountPackging1 + rowCountProcesss1 + rowCountCMQ1 + 2 + 2 + 2 + 2 + 2 + 1;
  }

   //var val = 8 + c + rowCountAccessories1 + rowCountLable1+ rowCountPackging1 + rowCountProcesss1 + rowCountCMQ1 + 2 + 2 + 2 + 2 + 2 + 1
   let dataTypeIEPartCell1 = "A"+ val ;
   worksheet.getCell(dataTypeIEPartCell1).value = partList[0].partName;



    var IEDdata1 = allData[0].iedEtailsList;
    //var IEDdata1 = IEDdata[0];


    let headerRowIE = worksheet.addRow(stockHeaderIE);
    headerRowIE.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      cell.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
    });


    var  rowCountIE1 = 0
    for (var itemIE1 of IEDdata1) {
      if(cmqLastRow>cmqLastRow2){
        var costrowCountIE1 = rowCountIE1 + 8 + c + rowCountAccessories1 + rowCountLable1+ rowCountPackging1 + rowCountProcesss1 + rowCountCMQ1 + 2 + 2 + 2 + 2 + 2 + 2 +  1; 
      }
      else if(partList.length>1 && cmqLastRow<cmqLastRow2){
        var costrowCountIE1 = rowCountIE1 + 8 + rowCount + rowCountAccessories2+ rowCountLable2+ rowCountPackging2 + rowCountProcesss2 + rowCountCMQ2 + 2 + 2 + 2 + 2 + 2 + 2 +  1; 
      }
      else{
        var costrowCountIE1 = rowCountIE1 + 8 + c + rowCountAccessories1 + rowCountLable1+ rowCountPackging1 + rowCountProcesss1 + rowCountCMQ1 + 2 + 2 + 2 + 2 + 2 + 2 +  1;    
      }

      //var costrowCountIE1 = rowCountIE1 + 8 + c + rowCountAccessories1 + rowCountLable1+ rowCountPackging1 + rowCountProcesss1 + rowCountCMQ1 + 2 + 2 + 2 + 2 + 2 + 2 +  1;           
         let buyerCellIE1 = "A" + costrowCountIE1;// row.getCell(1).address;
         worksheet.getCell(buyerCellIE1).value = itemIE1.buyerName;
         worksheet.getCell(buyerCellIE1).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         let styleCellIE1 = "B" + costrowCountIE1;//  row.getCell(2).address;
         worksheet.getCell(styleCellIE1).value = itemIE1.styleName;
         worksheet.getCell(styleCellIE1).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         let itemNameCellIE1 = "C" + costrowCountIE1;// row.getCell(3).address;
         worksheet.getCell(itemNameCellIE1).value = itemIE1.gmtName;
         worksheet.getCell(itemNameCellIE1).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         let orderQtyCellIE1 = "D" + costrowCountIE1; //row.getCell(4).address;
         worksheet.getCell(orderQtyCellIE1).value = itemIE1.moq;
         worksheet.getCell(orderQtyCellIE1).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         let smvCellIE1 = "E" + costrowCountIE1; //row.getCell(5).address;
         worksheet.getCell(smvCellIE1).value = itemIE1.smv;;
         worksheet.getCell(smvCellIE1).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         let machineCellIE1 = "F" + costrowCountIE1; //row.getCell(5).address;
         worksheet.getCell(machineCellIE1).value = itemIE1.lineMp
         worksheet.getCell(machineCellIE1).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         let wMunteCellIE1 = "G" + costrowCountIE1; //row.getCell(5).address;
         worksheet.getCell(wMunteCellIE1).value =  itemIE1.targetWorkingHour * 60;
         worksheet.getCell(wMunteCellIE1).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         let wantedEffCellIE1 = "H" + costrowCountIE1; //row.getCell(5).address;
         worksheet.getCell(wantedEffCellIE1).value = `${itemIE1.averageEfficiencyPercentage}%`;
         worksheet.getCell(wantedEffCellIE1).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         let dailyProductionNCellIE1 = "I" + costrowCountIE1; //row.getCell(5).address;
         worksheet.getCell(dailyProductionNCellIE1).value =itemIE1.averagePph ;
         worksheet.getCell(dailyProductionNCellIE1).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         let hourlyProductionNCellIE1 = "J" + costrowCountIE1; //row.getCell(5).address;
         worksheet.getCell(hourlyProductionNCellIE1).value = (itemIE1.averagePph/ itemIE1.targetWorkingHour) * 10;;
         worksheet.getCell(hourlyProductionNCellIE1).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }
         let CPM1CellIE1 = "K" + costrowCountIE1; //row.getCell(5).address;
         worksheet.getCell(CPM1CellIE1).value = 0;
         worksheet.getCell(CPM1CellIE1).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         worksheet.getCell(CPM1CellIE1).value ={
          //formula: `ROUND( E${costrowCountIE1} * K${dataTypeIEPartCell1+1} /H ${costrowCountIE1}* 12, 2)`,
          formula: `E${costrowCountIE1} * 0.036 /H${costrowCountIE1}* 12`,
          date1904: false
         }
         let CPMC2ellIE1 = "L" + costrowCountIE1; //row.getCell(5).address;
         worksheet.getCell(CPMC2ellIE1).value = 0;
         worksheet.getCell(CPMC2ellIE1).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         worksheet.getCell(CPMC2ellIE1).value ={
          formula: `E${costrowCountIE1} * 0.040 /H${costrowCountIE1}* 12`,
          date1904: false
         }
         let PPM1CellIE1 = "M" + costrowCountIE1; //row.getCell(5).address;
         worksheet.getCell(PPM1CellIE1).value = 0;
         worksheet.getCell(PPM1CellIE1).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         worksheet.getCell(PPM1CellIE1).value ={
          //formula: `ROUND( E${costrowCountIE1} * M${dataTypeIEPartCell1+1} / H${costrowCountIE1}* 12, 2)`,
          formula: `E${costrowCountIE1} *  0.055 / H${costrowCountIE1}* 12`,
          date1904: false
         }
         let PPM2CellIE1 = "N" + costrowCountIE1; //row.getCell(5).address;
         worksheet.getCell(PPM2CellIE1).value = 0;
         worksheet.getCell(PPM2CellIE1).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }
         worksheet.getCell(PPM2CellIE1).value ={
          //formula: `ROUND( E${costrowCountIE1} * N${dataTypeIEPartCell1+1} /H${costrowCountIE1}* 12, 2)`,
          formula: `E${costrowCountIE1} *0.059 / H${costrowCountIE1}* 12`,
          date1904: false
         }

         let remarksCellIE1 = "O" + costrowCountIE1; //row.getCell(5).address;
         worksheet.getCell(remarksCellIE1).value = "";
         worksheet.getCell(remarksCellIE1).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }
         rowCountIE1++
       }

      //  var profitrow1 =  costrowCountIE1+1;
      //  let profitName1 = "G"+ profitrow1;
      //  worksheet.getCell(profitName1).value = "Profit";
      //  worksheet.getCell(profitName1).border = {
      //    top: { style: 'thin' },
      //    bottom: { style: 'thin' },
      //    left: { style: 'thin' },
      //    right: { style: 'thin' }
      //  }
      //  let profit1 = "H"+ profitrow1;
      //  worksheet.getCell(profit1).value = "";
      //  worksheet.getCell(profit1).border = {
      //    top: { style: 'thin' },
      //    bottom: { style: 'thin' },
      //    left: { style: 'thin' },
      //    right: { style: 'thin' }
      //  }
      //  worksheet.getCell(profit1).value ={
      //   formula: `(M${costrowCountIE1} - K${costrowCountIE1})/12`,
      //   date1904: false
      //  }



       

  if(partList.length>1){

   worksheet.addRow([]);
   if(cmqLastRow>cmqLastRow2){
    var val1 =  8 + c + rowCountAccessories1 + rowCountLable1+ rowCountPackging1 + rowCountProcesss1 + rowCountIE1 + rowCountCMQ1 + 2 + 2 +2 + 2 + 2 + 2 + 2;
  }
  else if(cmqLastRow<cmqLastRow2){
    var val1 =  8 + rowCount + rowCountAccessories2 + rowCountLable2+ rowCountPackging2 + rowCountProcesss2 + rowCountIE1 + rowCountCMQ2 + 2 + 2 +2 + 2 + 2 + 2 + 2;
  }
   //var val =  8 + c + rowCountAccessories1 + rowCountLable1+ rowCountPackging1 + rowCountProcesss1 + rowCountIE1 + rowCountCMQ1 + 2 + 2 +2 + 2 + 2 + 2 + 2;
   let dataTypeIEPartCell2 = "A"+ val1 ;
   worksheet.getCell(dataTypeIEPartCell2).value = partList[1].partName;

    var IEDdata2 = allData[1].iedEtailsList;

    let headerRowIE2 = worksheet.addRow(stockHeaderIE);
    headerRowIE2.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4167B8" },
        bgColor: { argb: "" },
      };
      cell.font = {
        bold: true,
        color: { argb: "FFFFFF" },
        size: 12,
      };
    });



    var  rowCountIE2 = 0
    for (var itemIE2 of IEDdata2) {
      if(cmqLastRow>cmqLastRow2){
        var costrowCountIE2 = rowCountIE2+  8 + c + rowCountAccessories1 + rowCountLable1+ rowCountPackging1 + rowCountProcesss1 + rowCountIE1 + + rowCountCMQ1 + 2 + 2 +2 + 2 + 2 + 2 + 2 +2; 
      }
      else if(cmqLastRow<cmqLastRow2){
        var costrowCountIE2 =rowCountIE2+  8 + rowCount + rowCountAccessories2 + rowCountLable2 + rowCountPackging2 + rowCountProcesss2 + rowCountIE1 + + rowCountCMQ2 + 2 + 2 +2 + 2 + 2 + 2 + 2 +2; 
      }
      //var costrowCountIE2 =rowCountIE2+  8 + c + rowCountAccessories1 + rowCountLable1+ rowCountPackging1 + rowCountProcesss1 + rowCountIE1 + + rowCountCMQ1 + 2 + 2 +2 + 2 + 2 + 2 + 2 +2;           
         let buyerCellIE2 = "A" + costrowCountIE2;// row.getCell(1).address;
         worksheet.getCell(buyerCellIE2).value = itemIE2.buyerName;
         worksheet.getCell(buyerCellIE2).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         let styleCellIE2 = "B" + costrowCountIE2;//  row.getCell(2).address;
         worksheet.getCell(styleCellIE2).value = itemIE2.styleName;
         worksheet.getCell(styleCellIE2).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         let itemNameCellIE2 = "C" + costrowCountIE2;// row.getCell(3).address;
         worksheet.getCell(itemNameCellIE2).value = itemIE2.gmtName;
         worksheet.getCell(itemNameCellIE2).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         let orderQtyCellIE2 = "D" + costrowCountIE2; //row.getCell(4).address;
         worksheet.getCell(orderQtyCellIE2).value = itemIE2.moq;
         worksheet.getCell(orderQtyCellIE2).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         let smvCellIE2 = "E" + costrowCountIE2; //row.getCell(5).address;
         worksheet.getCell(smvCellIE2).value = itemIE2.smv;
         worksheet.getCell(smvCellIE2).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         let machineCellIE2 = "F" + costrowCountIE2; //row.getCell(5).address;
         worksheet.getCell(machineCellIE2).value = itemIE2.lineMp;
         worksheet.getCell(machineCellIE2).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         let wMunteCellIE2 = "G" + costrowCountIE2; //row.getCell(5).address;
         worksheet.getCell(wMunteCellIE2).value = itemIE2.targetWorkingHour * 60;;
         worksheet.getCell(wMunteCellIE2).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         let wantedEffCellIE2 = "H" + costrowCountIE2; //row.getCell(5).address;
         worksheet.getCell(wantedEffCellIE2).value = `${itemIE2.averageEfficiencyPercentage}%`;
         worksheet.getCell(wantedEffCellIE2).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }


         let dailyProductionNCellIE2 = "I" + costrowCountIE2; //row.getCell(5).address;
         worksheet.getCell(dailyProductionNCellIE2).value = itemIE2.averagePph;
         worksheet.getCell(dailyProductionNCellIE2).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }


         let hourlyProductionNCellIE2 = "J" + costrowCountIE2; //row.getCell(5).address;
         worksheet.getCell(hourlyProductionNCellIE2).value = (itemIE2.averagePph/ itemIE2.targetWorkingHour) * 10;
         worksheet.getCell(hourlyProductionNCellIE2).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }
         let CPM1CellIE2 = "K" + costrowCountIE2; //row.getCell(5).address;
         worksheet.getCell(CPM1CellIE2).value = 0;
         worksheet.getCell(CPM1CellIE2).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         worksheet.getCell(CPM1CellIE2).value ={
          //formula: `ROUND( E${costrowCountIE1} * K${dataTypeIEPartCell1+1} /H ${costrowCountIE1}* 12, 2)`,
          formula: `E${costrowCountIE2} * 0.036 /H${costrowCountIE2}* 12`,
          date1904: false
         }


         let CPMC2ellIE2 = "L" + costrowCountIE2; //row.getCell(5).address;
         worksheet.getCell(CPMC2ellIE2).value = 0;
         worksheet.getCell(CPMC2ellIE2).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         worksheet.getCell(CPMC2ellIE2).value ={
          formula: `E${costrowCountIE2} * 0.040 /H${costrowCountIE2}* 12`,
          date1904: false
         }

         let PPM1CellIE2 = "M" + costrowCountIE2; //row.getCell(5).address;
         worksheet.getCell(PPM1CellIE2).value = itemIE1.cmCPM;
         worksheet.getCell(PPM1CellIE2).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         worksheet.getCell(PPM1CellIE2).value ={
          //formula: `ROUND( E${costrowCountIE1} * N${dataTypeIEPartCell1+1} /H${costrowCountIE1}* 12, 2)`,
          formula: `E${costrowCountIE2} *0.059 / H${costrowCountIE2}* 12`,
          date1904: false
         }


         let PPM2CellIE2 = "N" + costrowCountIE2; //row.getCell(5).address;
         worksheet.getCell(PPM2CellIE2).value = itemIE2.cmCPM;
         worksheet.getCell(PPM2CellIE2).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }

         worksheet.getCell(PPM2CellIE2).value ={
          //formula: `ROUND( E${costrowCountIE1} * N${dataTypeIEPartCell1+1} /H${costrowCountIE1}* 12, 2)`,
          formula: `E${costrowCountIE2} *0.059 / H${costrowCountIE2}* 12`,
          date1904: false
         }

         let remarksCellIE2 = "O" + costrowCountIE2; //row.getCell(5).address;
         worksheet.getCell(remarksCellIE2).value = "";
         worksheet.getCell(remarksCellIE2).border = {
           top: { style: 'thin' },
           bottom: { style: 'thin' },
           left: { style: 'thin' },
           right: { style: 'thin' }
         }
         rowCountIE2++
       }

      //  var profitrow2 =  costrowCountIE2 + 1;
      //  let profitName2 = "G"+ profitrow2;
      //  worksheet.getCell(profitName2).value = "Profit";
      //  worksheet.getCell(profitName2).border = {
      //    top: { style: 'thin' },
      //    bottom: { style: 'thin' },
      //    left: { style: 'thin' },
      //    right: { style: 'thin' }
      //  }
      //  let profit2 = "H"+ profitrow2;
      //  worksheet.getCell(profit2).value = "";
      //  worksheet.getCell(profit2).border = {
      //    top: { style: 'thin' },
      //    bottom: { style: 'thin' },
      //    left: { style: 'thin' },
      //    right: { style: 'thin' }
      //  }
      //  worksheet.getCell(profit2).value ={
      //   formula: `(M${costrowCountIE2} - K${costrowCountIE2})/12`,
      //   date1904: false
      //  }
  }

    

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, title + ".xlsx");
    });
 

  }




}
