export class CostFabric {
  id: number;
  costMasterId: number;
  costNumber: number;
  fabricId: number;
  fabricName: string;
  category: string;
  categoryId: number;
  refCode: string;
  febDescription: string;
  nominationStatus: string;
  nominationName: string;
  supplierId: number;
  supplierName: string;
  consumption: number;
  measurementUnitId: number;
  unitName: string;
  wastagePercentage: number;
  totalConsumption: number;
  rate: number;
  currencyId: number;
  currencyName: string;
  currencyConversion: number;
  finCostPc: number;
  value: number;

  //New
  itemCode: string;
  countryId: number;
  countryName: string;
  cuttAbleWidth: number;
  itemPlacement: string;
  fabricComment: string;
  mkuId: number;
  mkuName: string;
  marketRelation: number;
  priceMoodId: number;
  priceMoodName: string;
  isEditable: boolean = false;
  isFinCostPc: number;
  updateFrom: string;
  component: string;
  isChange: string;
  itemId: number;
  itemName: string;
  coloumColor: string;
  rowColor: string;
  bookingConsConsumptionPc: string;
  modelCode: string;
  dsmCode: string;
  itemColor: string;

  //new 2
  //pdmCode:string;
}
