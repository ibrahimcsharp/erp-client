export class PoModelV3 {
  PoNo: string;
  StyleNo: string;
  Color: string;
  ColorCode: string;
  Size: string;
  SizeCode: string;
  UnitPrice: number;
  Qty: number;
  ShipmentDate: string;
  OrderReceivedDate: string;
  //   orderType: string;
  //   cartonMeasurement: string;
  ShippedMode: string;
  PortOfLoading: string;
  ShipToPort: string;
  PurchaseOrders: [];
  BuyerId: number;
  YearId: number;
  SeasonId: number;
  OrderId: number;
  PiecePerBox: number;
  FileTrackNo: number;
  PoStatus: string;
  CompanyId: number;
  CompanyName: string;
  SupplierMaterialCode: string;
  FabricComposition: string;
  RevisionNo: number;
  DONo: string;
  ItemCode: string;
  ETAWH: Date;
  Incoterms: string;
  Forwarder: string;
  SetCode: string;
  SubQuantity: number;
  QtyPerSet: number;
  PickingUnit: number;
  ExFactoryDate: string;
  managementFactory: string;
  remarks: string;
  upc: string;
  //RevisionNo:number;
  qtNumber: string;
  salesContract: string;


  //Added by Izab
  splitOrderNo: string;
  hsCode: string;
  buyerId: number;
  seasonId: number;
  yearId: number;
  poStatus: string;
  companyId: number;
  salesContractSeasonId: number;
  salesContractYearId: number;
  contractId: number;
  brandId: number;

  // added by Ibrahim for all buyers
  packingInstruction: string;
}
