import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TimeAndActionService } from '../../service/time-and-action.service';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { environment } from "src/environments/environment";
import { Data } from 'src/app/components/tms/model/map.model';

@Component({
  selector: 'app-material-tna',
  templateUrl: './material-tna.component.html',
  styleUrls: ['./material-tna.component.scss']
})
export class MaterialTnaComponent implements OnInit {

  MaterialTnaForm: FormGroup;
  materialTnaData: any;
  PO: string;
  style: number;
  materialTnaDataDetails : any;
  materialTnaAccessoriesDetails : any;
  materialTnaLabelsDetails : any;
  materialTnaPackingDetails : any;
  styleImage: any;

  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    public taskService: TimeAndActionService,
    public commonService: CommonServiceService,
    private currentRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.InitializeForm();
    var id = parseInt(this.currentRoute.snapshot.paramMap.get("id"));
    console.log(id);
    if(id>0)
    {
      this.LoadMaterialTnaMasterData(id);
    }
  }

  InitializeForm() {
    this.MaterialTnaForm =  this.fb.group({
      yearName: [""],
      seasonName: [""],
      buyerName: [""],
      styleId: [0],
      styleName:[""],
      leadTime:[0]
    })
  }


  LoadMaterialTnaMasterData(id:number){
    
    this.taskService.GetAllTnaListById(id).subscribe((data : any) =>{
     if(data){
       this.materialTnaData = data;
       this.PO = data[0].poNo;
       this.style = data[0].styleId;
       console.log(this.materialTnaData);


       console.log(this.PO);
       console.log(this.style);
       
       this.taskService.GetMaterialTnaDetailsDataByPO(this.PO).subscribe((data : any) =>{
        for(var item of data){
          item.shortOrExcess = item.bookQty-item.inhouseQty;
          if(item.etdDate == "0001-01-01T00:00:00")
          {
            item.etdDate= null;
          }

          if(item.etaDate == "0001-01-01T00:00:00")
          {
            item.etaDate= null;
          }
        }
        this.materialTnaDataDetails = data;
        console.log(this.materialTnaDataDetails);
         })


         this.taskService.GetMaterialTnaDetailsDataByAccessories(this.PO).subscribe((data : any) =>{
          for(var item of data){
            item.shortOrExcess = item.bookQty-item.inhouseQty;

            if(item.etdDate == "0001-01-01T00:00:00")
            {
              item.etdDate= null;
            }
  
            if(item.etaDate == "0001-01-01T00:00:00")
            {
              item.etaDate= null;
            }
            
          }

          this.materialTnaAccessoriesDetails = data;
          console.log(this.materialTnaAccessoriesDetails);
           }) 


         this.taskService.GetMaterialTnaDetailsDataByLabels(this.PO).subscribe((data : any) =>{
          for(var item of data){
            item.shortOrExcess = item.bookQty-item.inhouseQty;

            if(item.etdDate == "0001-01-01T00:00:00")
            {
              item.etdDate= null;
            }
  
            if(item.etaDate == "0001-01-01T00:00:00")
            {
              item.etaDate= null;
            }            
          }

          this.materialTnaLabelsDetails = data;
          console.log(this.materialTnaLabelsDetails);
           })   

        
       this.taskService.GetMaterialTnaDetailsDataByPacking(this.PO).subscribe((data: any) =>{
        for(var item of data){
          item.shortOrExcess = item.bookQty-item.inhouseQty;
          
          if(item.etdDate == "0001-01-01T00:00:00")
          {
            item.etdDate= null;
          }

          if(item.etaDate == "0001-01-01T00:00:00")
          {
            item.etaDate= null;
          } 
          
        }

         this.materialTnaPackingDetails = data;
         console.log(this.materialTnaPackingDetails);
       })

       this.taskService.GetMaterialTnaWiseStyleImage(this.style).subscribe((data: any) =>{
       
         //this.styleImage = environment.fileUrl+ data.location;
         console.log(data);
        

          if ( data != null) {
          this.styleImage = environment.fileUrl+ data.location; 
          console.log(this.styleImage);
          }
          else {
          this.styleImage  = "./assets/images/dashboard/600px-No_image_available.png";
          }
       })

       this.MaterialTnaForm.patchValue({
        yearName: data[0].yearName,
        seasonName: data[0].seasonName,
        buyerName: data[0].buyerName,
        styleId:data[0].styleId,
        styleName:data[0].styleName,
                               
         
       })
     }
   }, error => {
     this.toaster.warning("Failed To Load Data", "Material TnA List");
     this.materialTnaData = null;
   })
    
    //console.log(this.PO);
   
   
  }

  getColor(value: number) : any {

    if(value<0){
      return 'RGBA(231, 1, 18, 0.91)';
    }
    else if(value>0)
    {
      return 'RGBA(72, 155, 5, 1)';
    }

  }

}
