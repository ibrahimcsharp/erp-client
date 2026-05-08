export class VehicleRoadPermitModel {
    permitId: number;
    vehicleId: number;
    registrationNumber: string;
    permitNo: string;
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