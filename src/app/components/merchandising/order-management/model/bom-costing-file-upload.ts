export class BomCostingFileUploadModel {
    id: number;
    buyerId: number;
    seasonId: number;
    yearId: number;
    styleNo: string;
    supplierId: number;
    supplierName: string;
    itemId: number;    
    itemName: string;
    categoryName: string;
    categoryGroup: string;
    costCategoryGroup: string
    itemCode: string;    
    description: string;
    placement: string;
    nominationStatus: string;
    cuttableWidth: number;
    uomId: number;
    uom:string;
    wastage: number;
    consumption: number;
    comment: string;     
    instruction: string;
    countryId: string;
    wastagePercentage: number;
    remarks: string;
    dsmCode: string;
    modelCode: string;
    fabricWidth: number;
    mesurementUnitId: number;
    fabricComment: string;
    categoryId: number;
    itemColor: string;
    measurement: string;
    unitPrice: number;
    originalList: [];
}