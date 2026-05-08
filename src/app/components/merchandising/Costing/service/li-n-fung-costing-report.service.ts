import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Workbook } from "exceljs";
import * as fs from "file-saver";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { TokenService } from "src/app/shared/service/token.service";
import { environment } from "src/environments/environment";
import { CostAccessories } from "../model/costing-accessories.model";
import { CostFabric } from "../model/costing-fabric-model";
import { CostingMasterModel } from "../model/costing-model";

@Injectable({
    providedIn: "root",
})
export class LiNFungCostingReportService {
    NewCostAccessoriesList: CostAccessories[] = [];
    formData: CostAccessories;
    costingAccessoriesList: CostAccessories[];
    headers = {};
    baseUrl = environment.apiUrl + "merchandising/";
    baseUrl_ = this.baseUrl.replace(/[?&]$/, "");
    totalVal = 0;
    rowGroupMetadata: any;
    GroupWiseCostInfo: any;
    auth_token = null;
    totalCostInfo: any = [];
    newButtonshow = true;
    constructor(private http: HttpClient, private token: TokenService) { }

    async imageUrlToBase64(urL: string) {
        debugger
        return this.http
            .get(urL, { observe: "body", responseType: "arraybuffer" })
            .pipe(
                take(1),
                map((arrayBuffer) =>
                    btoa(
                        Array.from(new Uint8Array(arrayBuffer))
                            .map((b) => String.fromCharCode(b))
                            .join("")
                    )
                )
            ).toPromise();
    }

    //------ Image Url To Base64 Converter------//
    toDataURL = async (url) => {
        console.log("Downloading image...");
        var res = await fetch(url);
        var blob = await res.blob();

        const result = await new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.addEventListener("load", function () {
                resolve(reader.result);
            }, false);

            reader.onerror = () => {
                return reject(this);
            };
            reader.readAsDataURL(blob);
        })
        return result
    };


    async exportLiNFungExcelReport(excelData) 
    {
      // WILLL BE DONE IN FUTURE.....................
    }



}