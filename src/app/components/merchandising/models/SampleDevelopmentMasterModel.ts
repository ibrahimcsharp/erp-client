import { SampleDevelopmentDetailModel } from "./SampleDevelopmentDetailModel";

export class SampleDevelopmentMasterModel {
  sampleDevelopmentId: string;
  sampleDevelopmentMstId: number;
  seasonId: string;
  brandId: string;
  brandName: string;
  styleNo: string;
  prvStyleName:string;
  styleDescription: string;
  styleName: string;
  styleId: number;
  mpc: string;
  orderType: string;
  sampleTypeId: string;
  sampleTypeName: string;
  finishGoodsItemId: string;
  finishGoodsItemName: string;
  sampleSize: string;
  sampleQuantity: string;
  sampleRequestDate: Date;
  techpackStatus: string;
  sampleSubmissionDate: Date;
  deleteDetailsItem: string;
  seasonName: string;
  sampleDevelopmentDetailList: SampleDevelopmentDetailModel[];
  materialInHouseDate: Date;
  masterSampleSendDateforTesting: Date;
  masterSampleTestReportNo: string;
  masterSampleTestResult: string;
  sampleSubmittedDate: Date;
  sampleCommentDate: Date;
  sampleStatus: string;
  buyerCommentonSample: string;
  remark: string;
  testRequirement: string;
  lineStartDate: Date;
  productionSampleSendDateforTesting: Date;
  productionTestReportNo: string;
  productionTestResult: string;
  shipmentDate: Date;
  fgModel: string;
  color: string;
  buyerConcern: string;
  sam: string;
  poNo: string;
  totalSampleQuantity: string;
  receivedConfirmation: string;
  sampleRoomComments: string;
  allMaterialReceivedDate: Date;
  trimCardReceivedDate: Date;
  techpackOnSample: string;
  sampleDoneDate: Date;
  fabrication: string;
  description:string;
  wash_OnWash: string;
  process:string;
  dataSheetSendingDate: Date;
  trimCardSubmissionDate: Date;
  buyerName: string;
  buyerId: number;
  yearId: number;
  yearName: string;
  gatePassQty: number;
  leftoverQty: number;
  hoLeftOverQty: number;
  patternDate: Date;
  patternStatus: string;
  itemType: string;
  leftoverStatus: string;
  qtyBalance: number;
  cuttingQty: number;
  makingQty: number;
  hoGetpassQty: number;
  hoBalanceQty: number;
  sizeRangeId: number;
  createDate: Date;
  verificationStatus: string;
  companyId: number;
  requisitionNo: string;
  quotationNo: string;
  gmtTypeId: number;
  gmtTypeName: string;
  gmtSubTypeId: number;
  sampleColor: string;
  sampleColorId: number;
  contractualBuyerId: number;
  costingId: number;
  buyDate: string;
  sampleStylePartDetailsList: any[] = [];
  


 // sizeRangeName: string;
 // fileType:string;

 //Size Range
  //isImgDisable:boolean[]
  //buyerId: string;

  /*
missing 
UpdateBySampleRoom
UpdateDateSampleRoom
PostActivitySampleDevelopmentList
SampleDevelopmentDetailId
*/
}
