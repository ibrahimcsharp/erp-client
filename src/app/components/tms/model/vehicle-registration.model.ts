export class VehicleRegistrationModel {
    registrationId: number;
    vehicleId: number;
    registrationSeries: string;
    registrationNumber: string;
    effectiveDate: Date;
    expiryDate: Date;
    documentType: number;
    documentTypeName: string;
    daysToRemind: number;
    expense: number;
    otherExpense: number;
    odometer: string;
    budgetCode: string;
    budgetCodeName: string;
    remarks: string;
}