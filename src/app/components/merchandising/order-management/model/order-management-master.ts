export class OrderManagementMaster {
  id: number;
  yearId: number;
  yearName: string;
  styleId: number;
  styleName: string;
  poNo: string;
  poType: string;
  delDate: Date;
  delDate2: Date;
  seasonId: number;
  seasonName: string;
  buyerName: string;
  buyerId: number;
  unitPrice: number;
  globalSelectionQty: number;
  contractGmtQty: number;
  missMatchQty: number;
  prefix: string;
  totalValue: number;
  gmtQty: number;
  cQty: number; ///manually input
  contractFob: number;
  missmatchFob: number;
  orderQty: number;
  mrcntComment: string;
  orderNo: string;
  isUpdate: number = 0;
}
