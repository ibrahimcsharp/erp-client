export class DriverLogBookModel {
    id: number;
    driverId: number;
    driverName: string;
    vehicleId: number;
    vehicleName: string;
    assignFromDate: Date;
    assignToDate: Date;
    remarks: string;
}