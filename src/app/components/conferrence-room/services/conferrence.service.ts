import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/shared/service/token.service';
import { environment } from 'src/environments/environment';
import { ConferenceRoomModel } from '../model/conference-room.model';
import { ConferenceRoomBookModel } from '../model/conference-room-book.model';
import { ConferenceRoomBookListModel } from '../model/conference-book-list.model';
import { participantsModel } from '../model/participant.model';

@Injectable({
  providedIn: 'root'
})
export class ConferrenceService {
  baseUrl = environment.apiUrl;
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
  datepipe: any;
  constructor(private http: HttpClient, private token: TokenService) { }

  GatAllRoomListList(bookDate:Date,startTime:Date,endTime:Date,companyId:number) {
    //alert(companyId);
    return this.http.get<any>(this.baseUrl_ + "ConferenceRoom/GetAllConferenceRoomList?bookDate=" +
    bookDate +
    "&startTime=" +
    startTime +
    "&endTime=" +
    endTime +
    "&companyId=" +
    companyId, {
      headers: this.token.headerToken(),
    });
  }

  GatDateWiseAllRoomBookList(bookDate:Date,companyId:number) {
    return this.http.get<any>(this.baseUrl_ + "ConferenceRoom/GetAllDateWiseConferenceRoomBookingList?bookDate=" +
    bookDate+
    "&companyId=" +
    companyId, {
      headers: this.token.headerToken(),
    });
  }

  GatDateWiseAllRoomBookListView(bookDate:Date,companyId:number) {
    return this.http.get<any>(this.baseUrl_ + "ConferenceRoom/DateWiseConferenceRoomBookingListView?bookDate=" +
    bookDate+
    "&companyId=" +
    companyId, {
      headers: this.token.headerToken(),
    });
  }

  GatBookRoomInfoView(bookDate:Date,companyId:number , slot:string , roomId:number) {
    return this.http.get<any>(this.baseUrl_ + "ConferenceRoom/DateWiseBookInfo?bookDate=" +
    bookDate+
    "&companyId=" +
    companyId+
    "&slot=" +
    slot+
    "&roomId=" +
    roomId, {
      headers: this.token.headerToken(),
    });
  }

  GatAllRoomBookList() {
    return this.http.get<any>(this.baseUrl_ + "ConferenceRoom/GetAllConferenceRoomBookingList", {
      headers: this.token.headerToken(),
    });
  }

  GatAllRoomBookListByUser() {
    return this.http.get<any>(this.baseUrl_ + "ConferenceRoom/GetAllConferenceRoomBookingListByUser", {
      headers: this.token.headerToken(),
    });
  }

  

  ConferenceBookingCreate(conferenceBookingcreate: ConferenceRoomBookModel, roomList: ConferenceRoomModel[], participantList:participantsModel[]) {    
    var body = {
        ...conferenceBookingcreate,
        RoomList: roomList,
        ParticipantList:participantList
      }
      console.log(JSON.stringify(body));
      return this.http.post<any>(this.baseUrl_ + "ConferenceRoom/CreateConferenceRoomBook", body, {
      headers: this.token.headerToken(),
    });
}

ConferenceBookingCancel(conferenceBookingcreate: ConferenceRoomBookListModel) {    
  var body = {
      ...conferenceBookingcreate
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "ConferenceRoom/CancelConferenceRoomBook", body, {
    headers: this.token.headerToken(),
  });
}


GatEmployeeBookingStatus(bookDate:string, participantId:string , startTime:string , endTime:string) {
  return this.http.get<any>(this.baseUrl_ + "ConferenceRoom/EmployeeBookStatus?bookDate=" +
  bookDate+
  "&participantId=" +
  participantId+
  "&startTime=" +
  startTime+
  "&endTime=" +
  endTime, {
    headers: this.token.headerToken(),
  });
}

GatEmployeeWiseMeetingList() {
  return this.http.get<any>(this.baseUrl_ + "ConferenceRoom/EmployeeWiseMMeetingList", {
    headers: this.token.headerToken(),
  });
}

GatEmployeeWiseMeetingListMaster() {
  return this.http.get<any>(this.baseUrl_ + "ConferenceRoom/EmployeeWiseMMeetingListMaster", {
    headers: this.token.headerToken(),
  });
}

GatMeetingParticipantList(meetingId:number) {
  return this.http.get<any>(this.baseUrl_ + "ConferenceRoom/MeetingWisePArticipantList?meetingId=" +
  meetingId, {
    headers: this.token.headerToken(),
  });
}

GatMeetingParticipantListForFeedback(meetingId:number) {
  return this.http.get<any>(this.baseUrl_ + "ConferenceRoom/MeetingWisePArticipantList?meetingId=" +
  meetingId, {
    headers: this.token.headerToken(),
  });
}

AddParticipantToMeeting(participantList:participantsModel[]) {    
  var body = {
      ParticipantList:participantList
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "ConferenceRoom/AddParticiantToMeeting", body, {
    headers: this.token.headerToken(),
  });
}

FreeEmployeeFromMeeting(employee: participantsModel) {    
    console.log(JSON.stringify(employee));
    return this.http.post<any>(this.baseUrl_ + "ConferenceRoom/FreeEmployeeFromMeeting", employee, {
    headers: this.token.headerToken(),
  });
}

submitMeetingFeedback(meetingMinutes:string,participantList:participantsModel[]) {    
  var body = {
      MeetingMinutes:meetingMinutes,
      ParticipantList:participantList
    }
    console.log(JSON.stringify(body));
    return this.http.post<any>(this.baseUrl_ + "ConferenceRoom/MeetingFeedback", body, {
    headers: this.token.headerToken(),
  });
}


}
