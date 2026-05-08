import { ChallanDet } from "./challan-det";
//import { TransportModel } from "./transport";

export class ChallanModel {
    id: number;
    challanno: string;
    challandate: Date;
    deponame: string;
    depoaddress: string;
    typeOfGoods: string;
    cnfname: string;
    cnfcontactno: string;
    forwardername: string;
    drivername: string;
    drivermobileno: string;
    licenseno: string;
    covervanno: string;
    loaddatetime: Date;
    unloaddatetime: Date;
    transportcompany: string;
    securitylockno: string;
    companyname: string;
    typeOfVehicle: string;
    tripID: string;
    departure: string;
    arrival: string;
    status: string;
    //---Transport----
    billNo: string;
    billDate: Date;
    typeOfTrip: string;
    billingMonth: string;
    isTruckFairApplicable: boolean;
    isTruckFairPaid: boolean;
    fareAmount: number;
    damageAmount: number;
    warehouseRent: number;
    additionalCharge: number;
    extraCharge: number;
    totalCharge: number;
    //challanDet
    challanDet: ChallanDet[];

}
