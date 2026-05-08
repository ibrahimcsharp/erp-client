import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/shared/service/token.service';
import { environment } from 'src/environments/environment';
import { TaskEntryModel } from '../model/task-enry.model';
import { TemplateEntryMasterModel } from '../model/template-entry-master.model';
import { TemplateEntryItemModel } from '../model/template-entry-item.model';

@Injectable({
  providedIn: 'root'
})
export class TimeAndActionService {
  baseUrl = environment.apiUrl;
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");

  allTepList: any;


  constructor(private http:HttpClient,private token:TokenService) { }

//Task LIST
GetAllTaskList():Observable<any>{     
  return this.http.get<TaskEntryModel[]>(this.baseUrl_+'TaskEntry/GetAllTaskList', { headers: this.token.headerToken() });
}
 //SAVE OR UPDATE Task
 SaveTask(task:TaskEntryModel):Observable<any>{
  return this.http.post<any>(this.baseUrl_+'TaskEntry/CreateTask',task, { headers: this.token.headerToken() });
}

CreateTemplate(TemplateMaster:TemplateEntryMasterModel, TemplateItemList: TemplateEntryItemModel[]) {
  // console.log(JSON.stringify(bookingitemcreate));     
  var body = {
      ...TemplateMaster,
      TaskList: TemplateItemList
    }
    console.log(JSON.stringify(body));
  return this.http.post<any>(this.baseUrl_ + "TemplateEntry/CreateTemplate", body, {
    headers: this.token.headerToken(),
  });
}

 //Get All Master Template
 GetAllMasterTemplateList(buyerId: number): Observable<any> {
  if (buyerId == null) {buyerId = 0;}
  return this.http.get<TemplateEntryMasterModel>(
    this.baseUrl_ + "TemplateEntry/GetAllTemplateMasterData?buyerId=" +
      buyerId ,
    { headers: this.token.headerToken() }
  );
}

 //Get All Master Template Details
 GetAllMasterTemplateListDetails(templateId: number): Observable<any> {
  if (templateId == null) {templateId = 0;}
  return this.http.get<TemplateEntryItemModel>(
    this.baseUrl_ + "TemplateEntry/GetAllTemplateMasterDetailsData?templateId=" +
    templateId ,
    { headers: this.token.headerToken() }
  );
}

//Get Template Master Data By Id
GetTemplateMasterDataById(id: number): Observable<any>
{
  if (id == null) {id = 0;}
  return this.http.get<any>(
    this.baseUrl_ + "TemplateEntry/GetTemplateMasterDataById?Id=" +
      id ,
    { headers: this.token.headerToken() }
  );
}

//GeT TnA List 
GetTnaManualPorcessList():Observable<any>{
  return this.http.get<any>(this.baseUrl_+'TaskEntry/GetTnaManualPorcessList', { headers: this.token.headerToken() });
}

//Get All Template List 
GetAllTemplateList():Observable<any>{
  return this.http.get<any[]>(this.baseUrl_+'TaskEntry/GetAllTemplateList', { headers: this.token.headerToken() });
}

//Get Tna Master Data By PO
GetTnaMasterDataByPO(styleId:number,poNo:string):Observable<any>{
  return this.http.get<any[]>(
    this.baseUrl_ + "TaskEntry/GetTnaMasterDataByPO?StyleId=" +
    styleId+"&PoNo="+ poNo,
    { headers: this.token.headerToken() }
  );
}

//Get Style Wise Process Status
GetStyleWiseProcessStatus(styleId:number):Observable<any>{
  return this.http.get<any[]>(
    this.baseUrl_ + "TaskEntry/GetStyleWiseProcessStatus?StyleId=" +
    styleId,
    { headers: this.token.headerToken() }
  );
}

//Check material Tna
CheckMaterialTnaDetailsData(poNo:string): Observable<any>{
  return this.http.get<any>(this.baseUrl_+'TaskEntry/CheckMaterialTnaDetailsData?PoNo='+poNo, { headers: this.token.headerToken() });
}

// Get Tna Job Details Data
GetTnaJobDetailsData(styleId:number,poNo:string,templateId:number,processType:number):Observable<any>{
  return this.http.get<any[]>(
    this.baseUrl_ + "TaskEntry/GetTnaJobDetailsData?StyleId=" +
    styleId+"&PoNo="+ poNo+"&TnaTempMstId="+ templateId +"&ProcessType="+processType,
    { headers: this.token.headerToken() }
  );
}


//Save Tna Manual Process 
CreateTna(tnaMasterData:any, tnaJobDetails: any[],poNoList:any[]) {
  // console.log(JSON.stringify(bookingitemcreate));     
  var body = {
      ...tnaMasterData,
      TnaJobDetails: tnaJobDetails,
      PoNoList: poNoList
    }
    console.log(JSON.stringify(body));
  return this.http.post<any>(this.baseUrl_ + "TaskEntry/CreateTna", body, {
    headers: this.token.headerToken(),
  });
}


//Get TNA JOB List 
GetAllTnaList(){
  return this.http.get<any>(this.baseUrl_+'TaskEntry/GetTnaList', { headers: this.token.headerToken() });
}

//Get TNA JOB List 
GetTnaListRevised(buyerId:number,styleId:number,yearId:number,seasonId:number,poNo:string): Observable<any>{
  return this.http.get<any>(this.baseUrl_+'TaskEntry/GetTnaListRevised?BuyerId='+buyerId+'&StyleId='+styleId+'&YearId='+yearId+'&SeasonId='+seasonId+'&PoNo='+poNo, { headers: this.token.headerToken() });

}



//Get TNA JOB Revised  List 
GetAllTnaListById(id:number): Observable<any>{
  return this.http.get<any>(this.baseUrl_+'TaskEntry/GetAllTnaListById?Id='+id, { headers: this.token.headerToken() });

}

//Get TNA JOB List Details
GetTnaListDetailsByJobID(id:number): Observable<any>{
  return this.http.get<any>(this.baseUrl_+'TaskEntry/GetTnaListDetailsByJobID?JobId='+id, { headers: this.token.headerToken() });

}

//Get Material TNA details 
GetMaterialTnaDetailsDataByPO(poNo:string): Observable<any>{
  return this.http.get<any>(this.baseUrl_+'TaskEntry/GetMaterialTnaDetailsDataPO?PoNo='+poNo, { headers: this.token.headerToken() });

}

// Get Material Tna Details Data By Accessories
GetMaterialTnaDetailsDataByAccessories(poNo:string): Observable<any>{
  return this.http.get<any>(this.baseUrl_+'TaskEntry/GetMaterialTnaDetailsDataByAccessories?PoNo='+poNo, { headers: this.token.headerToken() });

}

//Get Material Tna Details Data By Labels
GetMaterialTnaDetailsDataByLabels(poNo:string): Observable<any>{
  return this.http.get<any>(this.baseUrl_+'TaskEntry/GetMaterialTnaDetailsDataByLabels?PoNo='+poNo, { headers: this.token.headerToken() });

}

//Get Material Tna Details Data By Packing
GetMaterialTnaDetailsDataByPacking(poNo:string): Observable<any>{
  return this.http.get<any>(this.baseUrl_+'TaskEntry/GetMaterialTnaDetailsDataByPacking?PoNo='+poNo, { headers: this.token.headerToken() });

}

//Get style Imgge for TNA
GetMaterialTnaWiseStyleImage(styleId:number){
  return this.http.get<any>(this.baseUrl_+'TaskEntry/GetMaterialTnaWiseStyleImage?StyleId='+styleId, { headers: this.token.headerToken() });

}

//Get Master Tna Dashboard Data
GetMasterTnaDashboardData(): Observable<any>{
  return this.http.get<any>(this.baseUrl_+'TaskEntry/GetMasterTnaDashboardData', { headers: this.token.headerToken() });
}

}
