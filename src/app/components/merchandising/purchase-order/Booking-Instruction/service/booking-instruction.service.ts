import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { BookingInstruction } from "../model/booking-instruction";
import { PoFileInfo } from "../../model/po-model/po-file-info";

@Injectable({
  providedIn: "root",
})
export class BookingInstructionService {
  bookingInstruction: BookingInstruction[] = new Array();
  bookingInstructionUpdate: BookingInstruction[] = new Array();
  bookingInstructionTrash: BookingInstruction[] = new Array();
  finalBookingInstructionList: BookingInstruction[];
  baseUrl = environment.apiUrl + "merchandising/BookingInstruction/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");

  auth_token = null;
  constructor(public http: HttpClient, public token: TokenService) {}

  //Get data by model from booking instruction and purchase order
  GetBookingInstructionList(
    buyerId: number,
    seasonId: number,
    seasonYearId: number
  ): Observable<any> {
    return this.http.get<BookingInstruction[]>(
      this.baseUrl_ +
        "GetBookingInstruction?buyerId=" +
        buyerId +
        "&seasonId=" +
        seasonId +
        "&seasonYearId=" +
        seasonYearId,
      { headers: this.token.headerToken() }
    );
  }

  //PO to BI process data
  PostPoToBiData(buyerId: number, seasonId: number, seasonYearId: number) {
    return this.http.post<any>(
      this.baseUrl_ +
        "CreatePoToBIProcess?seasonId=" +
        seasonId +
        "&seasonYearId=" +
        seasonYearId +
        "&buyerId=" +
        buyerId,
      { headers: this.token.headerToken() }
    );
  }

  //Create or Update BookingInstruction
  CreateOrUpdateBookingInstruction(bi: BookingInstruction): Observable<any> {
    console.log("Booking Instruction Data");
    console.log(JSON.stringify(bi));
    return this.http.post<any>(this.baseUrl_ + "AddBookingInstruction", bi, {
      headers: this.token.headerToken(),
    });
    
  }

  //Update Multiple Selection PO
  UpdateMultipleSelectionPO(mulPo: BookingInstruction[]) {  
    var body = {
      MultipleSelectionPoData: mulPo
    }
    return this.http.post<any>(this.baseUrl_ + "UpdateMultipleBookingInstruction", body, {
      headers: this.token.headerToken(),
    });
  }

  //Delete Single Instruction 
  DeleteBookingInstruction(id: number): Observable<any> {
    return this.http.delete(this.baseUrl_ + "DeleteBookingInstructionById?id=" + id,  {
      headers: this.token.headerToken(),
    });
  }

  //Delete Multiple Instruction 
  DeleteMultipleSelectionPO(mulPo: BookingInstruction[]) {  
      var body = {
        MultipleSelectionDeleteData: mulPo
      }
      return this.http.post<any>(this.baseUrl_ + "DeleteMultipleBookingInstruction", body, {
        headers: this.token.headerToken(),
      });
  }

    //Soft Delete BookingInstruction
    SoftDeleteBookingInstruction(bi: BookingInstruction): Observable<any> {
      return this.http.post<any>(this.baseUrl_ + "SoftDeleteBookingInstruction", bi, {
        headers: this.token.headerToken(),
      });
    }

    //Restore BookingInstruction
    RestoreBookingInstruction(bi: BookingInstruction): Observable<any> {
      return this.http.post<any>(this.baseUrl_ + "RestoreBookingInstruction", bi, {
        headers: this.token.headerToken(),
      });
    }
    
    //Multiple Restore BookingInstruction
    RestoreMultipleBookingInstruction(mulPo: BookingInstruction[]) {  
      var body = {
        MultipleSelectionDeleteData: mulPo
      }
      return this.http.post<any>(this.baseUrl_ + "RestoreMultipleBookingInstruction", body, {
        headers: this.token.headerToken(),
      });
    }

    //Multiple Soft Delete BookingInstruction
    SoftDeleteMultipleSelectionPO(mulPo: BookingInstruction[]) {  
      var body = {
        MultipleSelectionDeleteData: mulPo
      }
      return this.http.post<any>(this.baseUrl_ + "SoftDeleteMultipleBookingInstruction", body, {
        headers: this.token.headerToken(),
      });
    }


    //Get trash data by model from booking instruction and purchase order
    GetBookingInstructionTrashList(
      buyerId: number,
      seasonId: number,
      seasonYearId: number
    ): Observable<any> {
      return this.http.get<BookingInstruction[]>(
        this.baseUrl_ +
          "GetBookingInstructionTrash?buyerId=" +
          buyerId +
          "&seasonId=" +
          seasonId +
          "&seasonYearId=" +
          seasonYearId,
        { headers: this.token.headerToken() }
      );
    }

    SaveSelectionFileInfo(poFileInfo: PoFileInfo) {
      return this.http.post<any>(this.baseUrl_ + "SaveSelectionFileInfo", poFileInfo, {
        headers: this.token.headerToken(),
      });
    }

    SaveSelectionFileData(formData: any,selectionListData:any[]) {
      var body = {
        ...formData,
        SelectionFileDataList: selectionListData
      }
      console.log(JSON.stringify(body));
      return this.http.post<any>(this.baseUrl_ + "SaveSelectionExelFileData", body, {
        headers: this.token.headerToken(),
      });
    }

      
  GetSelectionDataList(
    buyerId: number,
    seasonId: number,
    seasonYearId: number
  ): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ +
        "GetSelectionList?buyerId=" +
        buyerId +
        "&seasonId=" +
        seasonId +
        "&seasonYearId=" +
        seasonYearId,
      { headers: this.token.headerToken() }
    );
  }
  // GetSelectionDataListByStyleIdToPromise(styleId: number){
  //   return this.http.get<any>(
  //     this.baseUrl_ +
  //       "GetSelectionDataListByStyleId?styleId=" + styleId,
  //       { headers: this.token.headerToken() }
  //   ).toPromise();
  // }


  GetSelectionYear() {
    return this.http.get<any>(
      this.baseUrl_ +
        "GetcurrentYear",
      { headers: this.token.headerToken() }
    );
  }

  GetSelectionZonesList() {
    return this.http.get<any[]>(
      this.baseUrl_ +
        "GetSelectionZoneDropdown",
      { headers: this.token.headerToken() }
    );
  }

  SaveSelectionFileDataUpdate(formData: any,selectionListData:any[]) {
    var body = {
      ...formData,
      SelectionUpdateDataList: selectionListData
    }
    console.log("Update Data");
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "UpdateSelectionFileData", body, {
      headers: this.token.headerToken(),
    });
  }

  SaveSelectionFileDataNew(formData: any,selectionListData:any[]) {
    var body = {
      ...formData,
      SelectionUpdateDataList: selectionListData
    }
    console.log("Add New Row Data");
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "AddSelectionNewData", body, {
      headers: this.token.headerToken(),
    });
  }

  GetSelectionPOReceivedList(
    buyerId: number,
    seasonId: number,
    seasonYearId: number,
    model:number,
    iman:number
  ): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ +
        "GetZoneWiseOderReceived?buyerId=" +
        buyerId +
        "&seasonId=" +
        seasonId +
        "&seasonYearId=" +
        seasonYearId+
        "&model=" +
        model+
        "&iman=" +
        iman,
      { headers: this.token.headerToken() }
    );
  }

  GetPOSizeQtyImanModelWise(
    buyerId: number,
    seasonId: number,
    yearId: number,
    iman:number,
    model:number

  ) {
    return this.http.get<any[]>(
      this.baseUrl_ +
        "GetPOSizeQtyImanModelWise?buyerId=" +
        buyerId +
        "&seasonId=" +
        seasonId +
        "&yearId=" +
        yearId+
        "&iman=" +
        iman+
        "&model=" +
        model,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  GetForecastSizeQtyImanModelWise(
    buyerId: number,
    seasonId: number,
    yearId: number,
    iman:number,
    model:number
  ) {
    return this.http.get<any[]>(
      this.baseUrl_ +
        "GetForecastSizeQtyImanModelWise?buyerId=" +
        buyerId +
        "&seasonId=" +
        seasonId +
        "&yearId=" +
        yearId+
        "&iman=" +
        iman+
        "&model=" +
        model,
      { headers: this.token.headerToken() }
    ).toPromise();
  }

  GetSelectionImanList(
    buyerId: number,
    seasonId: number,
    seasonYearId: number
  ): Observable<any> {
    return this.http.get<any[]>(
      this.baseUrl_ +
        "GetSelectionListNotUplodedIman?buyerId=" +
        buyerId +
        "&seasonId=" +
        seasonId +
        "&seasonYearId=" +
        seasonYearId,
      { headers: this.token.headerToken() }
    );
  }

}
