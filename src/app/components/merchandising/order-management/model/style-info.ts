export class StyleInfo {
  styleId: number;
  styleNameYear: string;
  styleName: string;
  styleYear: string;
  buyerId: number;
  contractualBuyerId:number;
  gmtSubTypeId:number;
  seasonId: number;
  yearId: number;
  yearName: string;
  buyerName: string;
  description: string;
  shortDescription: string;
  smv: number;
  buyerDepartment: string;
  brandId: number;
  brandName: string;
  targetFOB: number;
  gmtItemId: number;
  item: string;
  buyerDepartmentId: number;
  sizeRangeId: number;
  sizeRange: string;
  stylePart: string;
  stylePartSetupId: number;
  partId: number;
  partName: string;
  refStyleId: number;
  status: string;
  previousStyleName: string;
  colorType: string;
  noOfColor: number;
  proposedQuantity: number;
  r3WiseProposedQuantity: number;
  createDate: Date;
  createBy: string;
  updateDate: string;
  updateBy: string;
  updateFrom: string;
  seasonName: string;
  colorLot: string;
  cadFactoryDate: Date;
  seasonYear: string;
  sizeQtyCount: number;
  fileCount: number;
  cadStatus: string;
  index: string;
  isMarkerSample: string;
  sampleTypeId: number;

  // For Style Process
  //styleProcess: string;
  styleType: string;
  instruction: string;
  sL: number;
  itemId: number;
  itemName: string;
  filePath: string;
  categoryId: number;
  categoryName: string;
  categoryGroup: string;

  // File
  fileComment: string;
  fileName: string;
  revised: string;;

  //For Style Fabric
  id: number;
  fabricSL: number;
  stylePartInfoId: number;
  headName: string;

  //Tracking
  isIe: string;
  isCostingCad: string;
  isCadConsumption: string;
  isCostMaster: string;
  isStyleConfirm: string;
  isSupplyChainCosting: string;
  isCuttingCad: string;
  isBookingCad: string; 
  isBookingConsumption: string; 
  isPreCosting: string; 
  isThread: string; 
  isBom: string;
  isPoUpload: string;
  isOnlyConfirm:string;

  materialInHouseDate: Date;
  trimCardSubmissionDate: Date;
  isHanger: string;
  actualStyle: string;

  costCategoryGroup : string;
  placement: string;
  itemCode: string;
  nominationStatus: string;
  supplierId: number;
  supplierName: string;
  countryId: number;
  uomId: number;
  wastagePercentage: number;
  consumption: number;
  remarks: string;

// For R3 CODE Table Manage
r3Code:string;
modelCode:string;
r3VersionId:number; 
  itemColor: string;
  // For Bestseller Blocking Table Manage
  blockingSetupId:number; 
  blockingName: string;
  ieDevNtfComments: string;

}
