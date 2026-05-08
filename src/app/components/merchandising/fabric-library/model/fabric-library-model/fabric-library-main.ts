import { NumberCardComponent } from "@swimlane/ngx-charts";

export class FabricLibraryMain {
  
 
  //new
  id: number;
  stCode: string;
  
  buyerId: number;
  buyerName: string;
  buyerFabName:string; 
  buyerFabCode:string; 
  buyerFabColorName:string;
  buyerFabColorCode:string; 

  
  supplierName: string;
  impoterHsCode:string;
  supplierType: string;
  supplierId: number;
  supplierHsCode:string;



  fabricConstruction:number; // for Basic Fabric (Fabric Basic Construction)
  //fabricConstructionType:number; //Types of Fabric based on Basic Construction 	
  //Table filed change
  fabricLibraryTypeId: number; //Types of Fabric based on Basic Construction 
  density:string;
  yarnCount:string;
  weight: number;
  weightUnit:number; //unit of weight
  weightUnitId:number; //unit of weight
  weightUnitName:string; //unit of weight
  design: number;
  designId: number;
  designName: string;
  dyeing: number;
  dyeingId: number;
  dyingProcess: string;
  composition: number;
  compositionId: number;
  compositionName: number;
  certification: string;
  finishing: number;
  finishingId: number;
  finishName: string;










  fabricBasicNameId: number;
  fabricBasicName: string;
  fabricTypeId: number;
  fabricTypeName: string;
  construction: string;
  count: string;
  supByrModelCode: number;
  supByrDescription: string;
  originName: string;
  fabricMillId: number;
  fabricMillName: string;
  currencyName: string;
  unitId: number;
  unitTypeName: string;
  unitName: string;
  modeId: number; //shipping mode
  modeName: string;
  fabricDropdown: string;


  //new column
  paymentModeId: number;
  priceValidityDate: Date;
  mcq: number;
  mcqUpcharge: number;
  color: string;
  colorCode: string;
  colorDescription: string;
  styleName: string;
  seasonId: number;
  seasonName: string;
  buy: Date;
  yearId: number;
  yearName: string;
  weaving: string;

  
  


  fabricWidth: number;
  cuttableWidth: number;
  unitTypeId: number;


  fabricBasedFiber:number;
  fabricBasedFiberType:NumberCardComponent;
  unitPrice: number;
  currencyId: number;



 
  originId: number;
  moq: number;
  moqUpcharge: number;
  nominationStatus: string;


  fabricLibraryMstId:string;
  materialComposition:string;
  fiberMstId:number;

  fabLibraryMstId:number; // for Basic Fabric (Fabric Basic Construction)
  fabLibraryTypeId:number; //Types of Fabric based on Basic Construction 	
  fabricName:string; // for Basic Fabric (Fabric Basic Construction)
  typeName:string; //Types of Fabric based on Basic Construction 	
  shortName:string;
  fiberName:string;

  countryName:string;
  suplierName:string;
  fabLibraryFiberId:number;
  fabLibraryMatrlId:number;
//new 
  fabLibraryBuyerCode: string;
  supplierCode : string;
  supplierFabricCode : string;



    

}
