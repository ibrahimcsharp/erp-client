import { Injectable } from '@angular/core';
import { ShippedType } from '../model/setting-model/shipped-type';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/shared/service/token.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { OrderType } from '../model/setting-model/order-type';
import { LandingPort } from '../model/setting-model/landing-port';
import { Country } from '../model/setting-model/country';
import { DeliveryPlace } from '../model/setting-model/delivery-place';
import { Regions } from '../model/setting-model/regions';
import { Menu } from 'src/app/components/admin/Model/Menu.Model';
import { SubMenu } from 'src/app/components/admin/Model/Sub.Menu.Model';
import { Gmtitem } from '../../models/gmtitem.model';

@Injectable({
    providedIn: 'root',
  })
  export class PoSettingService{
    baseUrl = environment.apiUrl + 'merchandising/';
    baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
    commonUrl=environment.apiUrl.replace(/[?&]$/, "");
    shippedTypeList: ShippedType[];
    orderTypeList:OrderType[];
    landingPortList:LandingPort[];
    regionsList:Regions[];
    gmtItemList:Gmtitem[];
    countryList:Country[];
    menuList:Menu[];
    subMenucountryList:SubMenu[];
  
    deliveryPlaceList:DeliveryPlace[];
   
    auth_token = null;
    constructor(private http: HttpClient,private token:TokenService) {
     
     }
  
     //shipped Type Get data
     getShippedType():Observable<any> {
        //debugger;
        return this.http.get<ShippedType[]>(this.baseUrl_ + 'ShippedType', { headers: this.token.headerToken() });
    }

    GetShippedTypeList(buyerId: number): Observable<any> {
      return this.http.get<ShippedType[]>(
        this.baseUrl_ + "ShippedType?buyerId=" + buyerId,
        { headers: this.token.headerToken() }
      );
    }
//Shipped Type Post Data
    createShippedType(shippedType: ShippedType):Observable<any> {
      //console.log(shippedType);
       
        return this.http.post<any>(this.baseUrl_ + 'ShippedType', shippedType, { headers: this.token.headerToken() });
    }


    //Post order type data
    CreateOrderType(orderType:OrderType):Observable<any>{
      //console.log(orderType);
      return this.http.post<any>(this.baseUrl_ + 'OrderType', orderType, { headers: this.token.headerToken() });
    }

    //Het order type data
    GetOrderType():Observable<any>{
      return this.http.get<OrderType[]>(this.baseUrl_+'OrderType', { headers: this.token.headerToken() });
    }

    //post landing port
    CreateLandingPort(landingPort:LandingPort):Observable<any>{
      return this.http.post<any>(this.baseUrl_ + 'LandingPort', landingPort, { headers: this.token.headerToken() });
    }

    //Region Create
    CreateRegion(region:Regions):Observable<any>{
      return this.http.post<any>(this.baseUrl_ + 'Helper/InsertRegion', region, { headers: this.token.headerToken() });

    }



    //Get landing port
    GetLandingPort():Observable<any>{
      return this.http.get<LandingPort[]>(this.baseUrl_+'LandingPort', { headers: this.token.headerToken() });
    }

    //Get GetAllRegions
    GetAllRegions():Observable<any>{
      return this.http.get<Regions[]>(this.baseUrl_+'Helper/GetRegionsList', { headers: this.token.headerToken() });
    }

    //Get GetAllGMT 
    //bytt
    GetAllGMTItems():Observable<any>{
      return this.http.get<Gmtitem[]>(this.baseUrl_+'Helper/GetGMTItemList', { headers: this.token.headerToken() });
    }
      //Get GetContractualBuyerInfo 
    //bytt
    GetContractualBuyerInfo():Observable<any>{
      return this.http.get<Gmtitem[]>(this.baseUrl_+'Helper/GetContractualBuyerInfo', { headers: this.token.headerToken() });
    }

  
    GetgmtSubTypeInfo():Observable<any>{
      return this.http.get<Gmtitem[]>(this.baseUrl_+'Helper/GetgmtSubTypeInfo', { headers: this.token.headerToken() });
    }

    //GetAllGMT Create
    //bytt
    CreateGMTItems(gmtitem:Gmtitem):Observable<any>{
      return this.http.post<any>(this.baseUrl_ + 'Helper/CreateGMTItems', gmtitem, { headers: this.token.headerToken() });

    }

  //GetAllGMT Create submitGmtSubType
//bytt
submitGmtSubType(gmtSubType:Gmtitem):Observable<any>{
      return this.http.post<any>(this.baseUrl_ + 'Helper/SubmitGmtSubType', gmtSubType, { headers: this.token.headerToken() });

    }
    //Post delivery place
    CreateDeliveryPlace(deliveryPlace:DeliveryPlace):Observable<any>{
      deliveryPlace.countryId=Number(deliveryPlace.countryId);
      return this.http.post<any>(this.baseUrl_+'DeliveryPlace',deliveryPlace,{headers:this.token.headerToken()});
    }

    //Get Delivery Place data
    GetDeliveryPlace():Observable<any>{
      return this.http.get<DeliveryPlace[]>(this.baseUrl_+'DeliveryPlace',{headers:this.token.headerToken()});
    }
    //post Country Info
    CreateCountryInfo(countryinfo:Country):Observable<any>{
      return this.http.post<any>(this.commonUrl + 'Country', countryinfo, { headers: this.token.headerToken() });
    }

    //Get Country List
    GetCountryList():Observable<any>{
      return this.http.get<Country[]>(this.commonUrl+'Country',{headers:this.token.headerToken()});
    }

     //Get r3 version List 
     GetR3Version():Observable<any>{
      return this.http.get<Gmtitem[]>(this.baseUrl_+'Helper/GetR3Version', { headers: this.token.headerToken() });
    }

        //Get Bestseller Blocking
        GetBestsellerBlocking():Observable<any>{
          return this.http.get<Gmtitem[]>(this.baseUrl_+'Helper/GetBestsellerBlocking', { headers: this.token.headerToken() });
        }

  }