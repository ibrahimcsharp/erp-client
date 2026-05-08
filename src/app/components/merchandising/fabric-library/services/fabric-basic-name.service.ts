import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { fabricLibraryDetail } from "../model/fabric-library-model/fabric-library-details";
import { FabricLibraryMain } from "../model/fabric-library-model/fabric-library-main";
import { BasicType } from "../model/setting-model/basic-type";
import { FabricBasicName } from "../model/setting-model/fabric-basic-name";
import { MillName } from "../model/setting-model/fabric-mill";
import { Refference } from "../model/setting-model/refference";
import { UnitTypeModel } from "../model/setting-model/unit-type";

@Injectable({
  providedIn: "root",
})
export class FabricBasicNameService {
  baseUrl = environment.apiUrl + "merchandising/";
  baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
  commonUrl = environment.apiUrl.replace(/[?&]$/, "");
  fabricNameList: FabricBasicName[];
  unitTypeList: UnitTypeModel[];

  millNameList: MillName[];

  basicTypeList: BasicType[];

  refferenceList: Refference[];

  confirmedStyleList: any[];

  fabricLibraryDetail: fabricLibraryDetail[] = new Array();
  fabricLibraryMainList: FabricLibraryMain[];
  auth_token = null;
  constructor(private http: HttpClient, private token: TokenService) {}

  //For fabric basic name service
  //Post
  CreateFabricBasicName(fabricBasicName: FabricBasicName): Observable<any> {
    return this.http.post<any>(
      this.baseUrl_ + "CreateFlBasicName",
      fabricBasicName,
      { headers: this.token.headerToken() }
    );
  }
  //Get
  getFabricBasicName(): Observable<any> {
    return this.http.get<FabricBasicName[]>(this.baseUrl_ + "GetFlBasicName", {
      headers: this.token.headerToken(),
    });
  }

  //Get unitType all data
  getUnitTypeName(): Observable<any> {
    return this.http.get<UnitTypeModel[]>(this.baseUrl_ + "GetUnitType", {
      headers: this.token.headerToken(),
    });
  }
  //Get unitType With Tex all data
  getUnitTypeWithTex(styleId: number, stylePartId: number): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "GetUoMTypeForThread?styleId=" + styleId + "&stylePartId=" + stylePartId, {
      headers: this.token.headerToken(),
    });
  }
  //Get unit converter all data
  GetUnitConverterData(unitId: number, marketUnitId: number): Observable<any> {
    return this.http.get<any[]>(this.baseUrl_ + "GetUnitConverterData?unitId=" + unitId + "&marketUnitId=" + marketUnitId, {
      headers: this.token.headerToken(),
    });
  }
  //Get unit converter all data
  GetUnitConverterDataToPromise(unitId: number, marketUnitId: number){
    return this.http.get<any>(this.baseUrl_ + "GetUnitConverterData?unitId=" + unitId + "&marketUnitId=" + marketUnitId, {
      headers: this.token.headerToken(),
    }).toPromise();
  }

  CreateUnitTypeName(unitType: UnitTypeModel): Observable<any> {
    console.log(JSON.stringify(unitType));
    return this.http.post<any>(this.baseUrl_ + "CreateUnitType", unitType, {
      headers: this.token.headerToken(),
    });
  }

  //Fabric mill Name
  getMilleName(): Observable<any> {
    return this.http.get<MillName[]>(this.baseUrl_ + "GetFabricMill", {
      headers: this.token.headerToken(),
    });
  }
  
  CreateMillName(millName: MillName): Observable<any> {
    return this.http.post<any>(this.baseUrl_ + "CreateFabricMill", millName, {
      headers: this.token.headerToken(),
    });
  }

  //Basic Type

  getBasicType(): Observable<any> {
    return this.http.get<BasicType[]>(this.baseUrl_ + "GetBasicTypeList", {
      headers: this.token.headerToken(),
    });
  }
  CreateBasicType(basicType: BasicType): Observable<any> {
    return this.http.post<any>(this.baseUrl_ + "CreateBasicType", basicType, {
      headers: this.token.headerToken(),
    });
  }

  //refference
  getRefference(): Observable<any> {
    return this.http.get<Refference[]>(this.baseUrl_ + "GetReferences", {
      headers: this.token.headerToken(),
    });
  }

  //refference
  GetCurrency(basicTypeId: number): Observable<any> {
    return this.http.get<Refference[]>(
      this.baseUrl_ + "GetReferencesByBt?basicTypeId=" + basicTypeId,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  //Get reference by id
  GetReferenceById(id: number): Observable<any> {
    return this.http.get<Refference[]>(
      this.baseUrl_ + "GetReferencesListById?id=" + id,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  CreateRefference(refference: Refference): Observable<any> {
    console.log(JSON.stringify(refference));
    return this.http.post<any>(this.baseUrl_ + "CreateReference", refference, {
      headers: this.token.headerToken(),
    });
  }

  //Fabric library main
  CreateFabricLibrary(fabricLibraryModel: FabricLibraryMain, FabricLibBuyerList : any,FabricLibSupplierList :any,FabricLibApprovalHsCodeList:any): Observable<any> {
   debugger
    console.log(JSON.stringify(fabricLibraryModel));
    var body = {
      ...fabricLibraryModel,
      fabricLibBuyerInfo: FabricLibBuyerList,
      fabricLibSupplierInfo: FabricLibSupplierList,
      fabricLibApprovalHsCode:FabricLibApprovalHsCodeList

    };
    console.log(JSON.stringify(body));
    return this.http.post<any>(
      this.baseUrl_ + "FabricLibraryMain/CreateFabricLibrary",
      body,
      {
        headers: this.token.headerToken(),
      }
    );
  }

  getFabricLibraryMain(): Observable<any> {
    //debugger
    return this.http.get<Refference[]>(
      this.baseUrl_ + "FabricLibraryMain/GetFabricLibraryMainList",
      {
        headers: this.token.headerToken(),
      }
    );
  }
  GetLoadComposition
   //Get GetLoadComposition
   GetComposition(): Observable<any> {
    debugger
    return this.http.get<FabricLibraryMain[]>(this.baseUrl_ + "FabricLibraryMain/GetComposition", {
      headers: this.token.headerToken(),
    });
  }
    //Get Fabric Constrution
    GetFabricConstruction(): Observable<any> {
      //debugger
      return this.http.get<FabricLibraryMain[]>(this.baseUrl_ + "FabricLibraryMain/GetFabricConstruction", {
        headers: this.token.headerToken(),
      });
    }
     // GetweightUnitList
     GetweightUnitList(): Observable<any> {
      //debugger
      return this.http.get<FabricLibraryMain[]>(this.baseUrl_ + "FabricLibraryMain/GetweightUnitList", {
        headers: this.token.headerToken(),
      });
    }
    

     //Get Fabric Constrution
     GetFabricBasedConstruction(): Observable<any> {
      debugger
      return this.http.get<FabricLibraryMain[]>(this.baseUrl_ + "FabricLibraryMain/GetFabricBasedConstruction", {
        headers: this.token.headerToken(),
      });
    }

    //Get Fabric fiver
    GetfabricFiverList(): Observable<any> {
      //debugger
      return this.http.get<FabricLibraryMain[]>(this.baseUrl_ + "FabricLibraryMain/GetfabricFiverList", {
        headers: this.token.headerToken(),
      });
    }

      //Get Fabric type
      GetFabricFiverTypeList(): Observable<any> {
        
        return this.http.get<FabricLibraryMain[]>(this.baseUrl_ + "FabricLibraryMain/GetFabricFiverTypeList", {
          headers: this.token.headerToken(),
        });
      }
       //Get metarial type for composition 
       GetmaterialTypeList(): Observable<any> {
        //debugger
        return this.http.get<FabricLibraryMain[]>(this.baseUrl_ + "FabricLibraryMain/GetmaterialTypeList", {
          headers: this.token.headerToken(),
        });
      }
      

       //GetFinishingList
       GetFinishingList(): Observable<any> {
        
        return this.http.get<FabricLibraryMain[]>(this.baseUrl_ + "FabricLibraryMain/GetFinishingList", {
          headers: this.token.headerToken(),
        });
      }

      //GetdesignList
      GetdesignList(): Observable<any> {
        
        return this.http.get<FabricLibraryMain[]>(this.baseUrl_ + "FabricLibraryMain/GetdesignList", {
          headers: this.token.headerToken(),
        });
      }


       //GetdyeingList
       GetdyeingList(): Observable<any> {
        
        return this.http.get<FabricLibraryMain[]>(this.baseUrl_ + "FabricLibraryMain/GetdyeingList", {
          headers: this.token.headerToken(),
        });
      }

      
      
      
      // SaveComposition(obj:any) {
      //   debugger
      // var body={compositionName:obj}
        
      //   return this.http.post<any>(
      //     this.baseUrl_ + "FabricLibraryMain/SaveComposition/" + body,
      //     {
      //       headers: this.token.headerToken(),
      //     }
      //   );
      // }

      SaveComposition(obj:any): Observable<any> {
        //debugger
        var body={compositionName:obj}
          
       // console.log(JSON.stringify(unitType));
        return this.http.post<any>(this.baseUrl_ + "FabricLibraryMain/SaveComposition/", body, {
          headers: this.token.headerToken(),
        });
      }
      


  GetFabricById(id: number) {
    return this.http.get<FabricLibraryMain>(
      this.baseUrl_ + "FabricLibraryMain/GetFabricLibraryMainbyId/" + id,
      {
        headers: this.token.headerToken(),
      }
    );
  }


  //Get Buyer Code For Fabric Library
  GetBuyerCodeForFabricLibrary(){
    return this.http.get<any>(
      this.baseUrl_ + "FabricLibraryMain/GetBuyerCodeForFabricLibrary" ,
      {
        headers: this.token.headerToken(),
      }
    );
  }

    //Get Supplier Code For Fabric Library
    GetSupplierCodeForFabricLibrary() {
      return this.http.get<any[]>(
        this.baseUrl_ + "FabricLibraryMain/GetSupplierCodeForFabricLibrary" ,
        {
          headers: this.token.headerToken(),
        }
      );
    }


 //GetAprrovelHsTemplatesList
 GetAprrovelHsTemplatesList() {
  return this.http.get<any[]>(
    this.baseUrl_ + "FabricLibraryMain/GetAprrovelHsTemplatesList" ,
    {
      headers: this.token.headerToken(),
    }
  );
 }


 //GetFabLibBuyerList
 GetFabLibBuyerListByMasterId(fabLibMainId:number): Observable<any>{
  return this.http.get<any[]>(
    this.baseUrl_ + "FabricLibraryMain/GetFabLibBuyerList?fabLibMainId="+ fabLibMainId ,
    {
      headers: this.token.headerToken(),
    }
  );
 }

 
 //GetFabLibSupplierList
 GetFabLibSupplierListByMasterId(fabLibMainId:number) : Observable<any>{
  return this.http.get<any[]>(
    this.baseUrl_ + "FabricLibraryMain/GetFabLibSupplierList?fabLibMainId="+ fabLibMainId ,
    {
      headers: this.token.headerToken(),
    }
  );
 }

  //GetAprrovelHsList
  GetAprrovelHsListByMasterId(fabLibMainId:number) : Observable<any>{
    return this.http.get<any[]>(
      this.baseUrl_ + "FabricLibraryMain/GetAprrovelHsList?fabLibMainId="+ fabLibMainId ,
      {
        headers: this.token.headerToken(),
      }
    );
   }


  //GetHSSnowtexList
  GetHSSnowtexList(): Observable<any> {
    return this.http.get<any>(this.baseUrl_ + "Item/GetHSSnowtexList", {
      headers: this.token.headerToken(),
    });
  }


//GetConfimStyleForFabricLibrary
GetConfimStyleForFabricLibrary() {
  return this.http.get<any[]>(
    this.baseUrl_ + "FabricLibraryMain/GetConfimStyleForFabricLibrary" ,
    {
      headers: this.token.headerToken(),
    }
  );
 }


 
    //VerifySpecFileOfComfirmStyle

    VerifySpecFileOfComfirmStyle(obj: any) {
      return this.http.post(this.baseUrl_ + "FabricLibraryMain/VerifySpecFileOfComfirmStyle", obj, {
          headers: this.token.headerToken(),
      });
  }

}
