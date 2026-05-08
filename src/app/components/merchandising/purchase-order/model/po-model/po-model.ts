export class PoModel {
  orderId: number;
  orderNo: string;
  styleNo: string;
  model: string;
  item: string;
  color: string;
  sizeId: number;
  sizeValue: string;
  orderQty: number;
  handOverDate: string;
  contractualHandOverDate: string;
  seasonName: string;
  creationDate: string;
  creationDate2: string;
  orderTypeName: string;
  itemDescription: string;
  pcbValue: number;
  ueValue: number;
  packaging: string;
  shippedQty: number;
  remainQty: number;
  unitPrice: number;
  totalPrice: number;
  portOfDestinationId: number;
  portOfDestinationName: string;
  contractualDeliveryDate: string;
  orderReceivedDate: string;
  shippedTypeName: string;
  landingPortName: string;
  LandingPortName: string;
  portOfLandingName: string;
  status: string;
  remarks: string;
  seasonId: number;
  shippedTypeId: number;
  deliveryPlaceId: number;
  landingPortId: number;
  orderTypeId: number;
  purchaseOrders:any[]= [];
  totalOrderQty: number;
  activeStatus: number;
  poIndexNo: number;
  buyerId: number;
  yearId: number;
  buyerName: string;
  fileTrackNo: number;
  poStatus: string;
  companyId: number;
  companyName: string;
  managementFactory: string;
  revisionNo: string;
  doNo: string;
  sizeCode: string;
  setCode: string;
  etawh: Date;
  subQuantity: number;
  qtyPerSet: number;
  incoterms: string;
  forwarder: string;
  pickingUnit: string;
  deliveryPortCode: string;
  warehouse: string;
  warehouseAddress: string;
  personInCharge: string;
  telephoneNo: string;
  brandName: string;
  foc: number;
  lineNo: string;
  colUpdateStatus: number //new column
  rowSl: number;
  tentativeMaterialsInhouseDate: Date;
  r1MRInhouseDate: Date;
  r2MRInhouseDate: Date;
  r3MRInhouseDate: Date;
  plannedDate: Date;
  productionStartDate: Date;
  productionEndDate: Date;
  actualInhouseDate: Date;
  ontimeOrDelayDay: number;
  ontimeStatus: string;
  createBy: string;
  createDate: Date;
  updateBy: string;
  updateDate: Date;

  consignmentNo: string;
  yearName: string;
  styleId: number;

  //delay item reason
  selectedDelayItemReason: any;
  delayItemReason: string;
  delayReason: string;

  //responsible department
  selectedDelayItemDepartment: any;
  delayItemDepartment: string;
  delayDepartment: string;
  id: number;

  qtNumber: any;
  stCategory: any;
  sfc: any;
  eanCode: any;
  inseam: any;
  extractionPo: any;
  orderGroup: any;
  styleGroup: any;
  protoNo: any;
  vasIndicator: any;
  capTypeGroup: any;
  tmrInhouseDate: any;
  salesContract:string;

  //Added by Izab
  splitOrderNo: string;
  poDeliveryStatus: string;
  delayComments: string;
  hsCode: string;
  brandId: number;
  editing: boolean;
  mrcntComment: string;
  salesContractSeasonId: number;
  salesContractYearId: number;
  contractId: number;

  // Added by shuvo
  trunk : string;
  upc : string;
  field1 : string;
  createByName: string;

  plannigStatus: number;
  plannigStatusStr: string;

  cuttingStatus: number;
  cuttingStatusStr: string;
  
  unitPriceEuro: number;
  supplierNo: string;
  orderCountry: string;
  patron: string;
  sizeKey: string;
  orderName: string;

  lineStartDate: string;

  //added by tamim for haddad
  sizeAge: string;
  ageMeasurement: string;

  // added by Ibrahim for all buyers
  packingInstruction: string;
}
