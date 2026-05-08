import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/shared/service/token.service';
import { Sampleroomcomments } from '../models/sampleroomcomments';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SampleroomService {

  baseUrl = environment.apiUrl + 'merchandising/';
  helperUrl=environment.apiUrl;
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
  helperUrl_=this.helperUrl.replace(/[?&]$/, "");
constructor(private http:HttpClient,  
  private token:TokenService) { }


  SaveSampleRoomComments(comment:Sampleroomcomments){
    return this.http.post(this.baseUrl_+'SampleDevelopment/PostSampleRoomComment',comment, {headers: this.token.headerToken() });
  }

}
