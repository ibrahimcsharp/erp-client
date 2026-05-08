export class VehicleInsuranceModel {
    insurenceId: number;
    vehicleId: number;
    registrationNumber: string;
    insurenceNo: string;
    insurerId: number;
    insurerName: string;
    effectiveDate: Date;
    expiryDate: Date;
    insurenceType: number;
    insurenceTypeName: string;
    daysToRemind: number;
    expense: number;
    otherExpense: number;
    odometer: string;
    budgetCode: string;
    budgetCodeName: string;
    remarks: string;
}