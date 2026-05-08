import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { Week } from "../../forecast-setup/model/week";
import { Year } from "../../forecast-setup/model/year";
import { Forecast } from "../model/forecast";
import { ForecastInstruction } from "../model/forecast-instruction";

@Injectable({
  providedIn: "root",
})
export class ForecastService {
  forecastList: Forecast[];
  model: any = {};
  forecastBookingSummary = [];
  weekList: Week[];
  yearList: Year[];
  baseUrl = environment.apiUrl + "merchandising/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
  commonUrl = environment.apiUrl.replace(/[?&]$/, "");

  constructor(private http: HttpClient, private token: TokenService) {}

  //get week list
  getWeekList(): Observable<any> {
    return this.http.get<Week[]>(this.baseUrl_ + "Week", {
      headers: this.token.headerToken(),
    });
  }

  //Get year data
  GetYearDataList(): Observable<any> {
    return this.http.get<Year[]>(this.baseUrl_ + "year", {
      headers: this.token.headerToken(),
    });
  }

  // Post forecast list
  PostForecastList(forecasts: Forecast): Observable<any> {
    return this.http.post<any>(this.baseUrl_ + "CreateForecast", forecasts, {
      headers: this.token.headerToken(),
      reportProgress: true,
      observe: "events",
    });
  }

  //get forecast list
  ForecastList(
    buyerId: number,
    seasonId: number,
    seasonYearId: number,
    yearId: number,
    weekId: number,
    dataYearId: number
  ): Observable<any> {
    return this.http.get<Forecast[]>(
      this.baseUrl_ +
        "GetForecastList?buyerId=" +
        buyerId +
        "& seasonId=" +
        seasonId +
        "& seasonYearId=" +
        seasonYearId +
        "& yearId=" +
        yearId +
        "& weekId=" +
        weekId +
        "& dataYearId=" +
        dataYearId,
      { headers: this.token.headerToken() }
    );
  }

  //Booking Instruction to forecast instruction proccess
  BIToFIPorccess(model: any): Observable<any> {
    //console.log(model);
    return this.http.post<any>(this.baseUrl_ + "CreateBItoFIProcess", model, {
      headers: this.token.headerToken(),
      reportProgress: true,
      observe: "events",
    });
  }

  //Get forecast instruction list
  ForecastInstructionList(
    buyerId: number,
    seasonId: number,
    seasonYearId: number
  ) {
    return this.http.get<ForecastInstruction[]>(
      this.baseUrl_ +
        "GetBIToFIProcessList?seasonId=" +
        seasonId +
        "&buyerId=" +
        buyerId +
        "&seasonYearid=" +
        seasonYearId,
      { headers: this.token.headerToken() }
    );
  }
  //Update forecast Instruction update
  ForecastInstructionUpdate(fi: ForecastInstruction): Observable<any> {
    return this.http.put(this.baseUrl_ + "UpdateForecastIns", fi, {
      headers: this.token.headerToken(),
      reportProgress: true,
      observe: "events",
    });
  }

  ForecastBooking(
    seasonId: number,
    yearId: number,
    weekId: number
  ): Observable<any> {
    return this.http.get(
      this.baseUrl_ +
        "GetForecastList?seasonId=" +
        seasonId +
        "&yearId=" +
        yearId +
        "&weekId=" +
        weekId +
        "&weekId=" +
        weekId,
      { headers: this.token.headerToken() }
    );
  }
  //Forecast Booking Process pos method
  ForecastBookingProcess(model: any): Observable<any> {
    return this.http.post(this.baseUrl_ + "CreateForecastBookingList", model, {
      headers: this.token.headerToken(),
    });
  }

  //Forecast booking summary list
  GetForecastBookingSummaryList(
    seasonId: number,
    yearId: number,
    weekId: number
  ) {
    return this.http.get(
      this.baseUrl_ +
        "GetForecastBookingDetailsSummaryList?seasonId=" +
        seasonId +
        "&yearId=" +
        yearId +
        "&weekId=" +
        weekId,
      { headers: this.token.headerToken() }
    );
  }


  
  CreateForecastNew(MasterData: any, ItemList: any[]) {
    // console.log(JSON.stringify(bookingitemcreate));     
    var body = {
        ...MasterData,
        ForecastList: ItemList
      }
      console.log("Forecast Data Submitted to API");
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "CreateForecastDktNew", body, {
      headers: this.token.headerToken(),
    });
  }

  UpdateForecastNew(MasterData: any, ItemList: any[]) {
    // console.log(JSON.stringify(bookingitemcreate));     
    var body = {
        ...MasterData,
        ForecastList: ItemList
      }
      console.log("Forecast Data Submitted to API");
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "UpdateForecastDktNew", body, {
      headers: this.token.headerToken(),
    });
  }

  ForecastErrorList(
    buyerId: number,
    seasonId: number,
    yearId: number
  ): Observable<any> {
    return this.http.get(
      this.baseUrl_ +
        "GetForecastErrorList?buyerId=" +
        buyerId +
        "&seasonId=" +
        seasonId +
        "&yearId=" +
        yearId,
      { headers: this.token.headerToken() }
    );
  }

  ForecastSizesList(
    styleId: number
  ): Observable<any> {
    if(styleId==null){
      styleId = 0;
    }
    return this.http.get(
      this.baseUrl_ +
        "GetForecastSizesList?styleId=" +
        styleId ,
      { headers: this.token.headerToken() }
    );
  }

    //get forecast list
    ForecastNewList(
      buyerId: number,
      seasonId: number,
      seasonYearId: number,
      currentYear: number,
      nextYear: number
    ): Observable<any> {
      return this.http.get<Forecast[]>(
        this.baseUrl_ +
          "GetForecastListNew?buyerId=" +
          buyerId +
          "&seasonId=" +
          seasonId +
          "&seasonYearId=" +
          seasonYearId +
          "&currentYear=" +
          currentYear +
          "&nextYear=" +
          nextYear ,
        { headers: this.token.headerToken() }
      );
    }


}
