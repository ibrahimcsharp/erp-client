import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { Season } from "../models/seasonmodel";

@Injectable({
  providedIn: "root",
})
export class SeasonService {
  baseUrl = environment.apiUrl + "merchandising/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
  seasons: Season[];

  constructor(private http: HttpClient, private token: TokenService) {}

  getSeason(): Observable<any> {
    return this.http.get<Season[]>(this.baseUrl_ + "season", {
      headers: this.token.headerToken(),
    });
  }

  createSeason(season: Season): Observable<any> {
    return this.http.post<any>(this.baseUrl_ + "season", season, {
      headers: this.token.headerToken(),
    });
  }

  deleteSeason(id: number): Observable<any> {
    return this.http.delete(this.baseUrl_ + "season/" + id, {
      headers: this.token.headerToken(),
    });
  }
  getSeasonById(id: number): Observable<any> {
    return this.http.get<Season[]>(
      this.baseUrl_ + "season/" + id,
      {
        headers: this.token.headerToken(),
      }
    );
  }
}
