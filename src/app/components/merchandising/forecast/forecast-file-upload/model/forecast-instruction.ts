export class ForecastInstruction {
    forecastInsId: number;
    spl: string;
    style: string;
    fgModel: string;
    rdswbooking: number;// /Received During size wise booking
    bidswgiving: number////Booking Instruction During size wise giving
    stock: number;
    percentage: number;
    needToBook: number;
    prevRecv: number;
    prevBooking: number;
    gapOfRecv: number;
    gapOfBooking: number;
    comment: string;
    seasonId: number;
    seasonName: string;

}