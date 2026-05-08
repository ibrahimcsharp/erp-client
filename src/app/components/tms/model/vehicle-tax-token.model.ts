export class VehicleTaxTokenModel {
    taxTokenId: number;
    vehicleId: number;
    registrationNumber: string;
    taxTokenNo: string;
    effectiveDate: Date;
    expiryDate: Date;
    remindAt: Date;
    daysToRemind: number;
    expense: number;
    otherExpense: number;
    odometer: string;
    budgetCode: string;
    budgetCodeName: string;
    remarks: string;
}