import { Injectable } from "@angular/core";
import { HttpClient } from "@aspnet/signalr";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";

@Injectable()
export class NotificationService {
  headers = {};
  baseUrl = environment.apiUrl + "Notification/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");

  auth_token = null;
  constructor(private http: HttpClient, private token: TokenService) {}
}
