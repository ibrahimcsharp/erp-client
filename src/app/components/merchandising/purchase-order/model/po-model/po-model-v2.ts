export class PoModelV2 {
  poNo: string;
  styleNo: string;
  color: string;
  colorCode: string;
  size: string;
  sizeCode: string;
  upc: string
  unitPrice: number;
  qty: number;
  exFactoryDate: string;
  shipmentDate: string;
  orderReceivedBuyDate: string;
  orderType: string;
  cartonMeasurement: string;
  shippedMode: string;
  portOfLoading: string;
  destinationDC: string;
  purchaseOrders: [];
  buyerId: number;
  yearId: number;
  seasonId: number;
  salesContractId: number;
  orderId: number;
  piecePerBox: number;
  pcbValue: number;
  fileTrackNo: number;
  poStatus: string;
  companyId: number;
  companyName: string;
  extractionPo: string;
  orderGroup: string;
  styleGroup: string;
  protoNo: string;
  vasIndicator: string;
  capTypeGroup: string;
  stCategory: string;
  eanCode: string;
  poItem: string;
  inseam: string;
  sfc: string;
  item: string;
  qtNumber: string;
  tentativeMatarialsInhouseDate: string;
  salesContract: string;

  //Added by Izab
  splitOrderNo: string;
  hsCode: string;
  itemDescription: string;
  salesContractSeasonId: number;
  salesContractYearId: number;
  contractId: number;
  brandId: number;

  //Added by Ibrahim 
  ioNumber: string;
  barcode: string;
  unitPriceEuro: number;
  supplierNo: string;
  orderCountry: string;
  patron: string;
  sizeKey: string;
  order: string;
  materialStyle: string;
  skuNumber: string;
  manufactureCode: string;
  uvmInstruction: string;
  // added by Ibrahim for all buyers
  packingInstruction: string;
  line: string;
  ean: string;
  procurementModel: string;

  //Added by tamim
  sizeAge: string;
  ageMeasurement: string;

}
