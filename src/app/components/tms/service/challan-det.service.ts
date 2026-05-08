import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ChallanDetService {
  private route = environment.apiUrl + '/ChallanDets';
  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(this.route)
  }

  get(id: any): Observable<any> {
    //console.log(id);
    //console.log(this.route)
    return this.http.get(`${this.route}/${id}`);
  }

  post(data: any) {
    return this.http.post(this.route, data)
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.route}/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.route}/${id}`);
  }
}

