import { BomEntryManualModel } from "./bom-entry-manual.model";

export class BomEntryManualMaster {
      seasonId: number;
      yearId: number;
      buyerId: number;
      styleId: number;
      styleName: string;
    bomEntryManualItemList:BomEntryManualModel[];
}