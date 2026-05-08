import { BomSetupColorDetailsModel } from "./bom-setup-colors-details.model";
import { BomSetupSizeDetailsModel } from "./bom-setupitem-size.model";

 export class BomSetupItemModel {
    id: number;
    categoryId: number;
    category: string;
    itemName: string;
    description: string;
    itemPlacement : string;
    itemCode: string;
    consumption: number;
    quotationNumber : string;
    costQtMstId : number;
    itemRowIdentifier : string;  
    itemColorSetup: BomSetupColorDetailsModel[]; 
    itemSizeSetup: BomSetupSizeDetailsModel[];
}