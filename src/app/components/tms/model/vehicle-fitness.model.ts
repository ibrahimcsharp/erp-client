export class VehicleFitnessModel {
    fitnessId: number;
    vehicleId: number;
    registrationNumber: string;
    fitnessCertificateNo: string;
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