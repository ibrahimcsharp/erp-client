import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FabricBasicNameService } from '../../../services/fabric-basic-name.service';

@Component({
  selector: 'app-composition-setup',
  templateUrl: './composition-setup.component.html',
  styleUrls: ['./composition-setup.component.scss']
})
export class CompositionSetupComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public service: FabricBasicNameService,
    private toastr: ToastrService,
  ) { }
  compositionSetupForm: FormGroup;

  ngOnInit(): void {
    this.SetupForm();
    this.LoadfabricFiverType();
    this.LoadmaterialType();
  }

  SetupForm() {
    this.compositionSetupForm = this.fb.group({
      id: 0,
      materialName: [""],
      materialShortName: [""],
      materialType: [""],
      materialTypeShortName: [""],
      materialUserPerc: null,
      materialTypeName:[0],
      addCompositionNote:[""]

    });

  }


  materialNameList: any[] = [];
  materialNameDropdownList: any[] = [];
  LoadfabricFiverType() {
    debugger
    this.service.GetFabricFiverTypeList().subscribe(
      (data: any[]) => {
        this.materialNameList = data;
        // const filteredData = data.filter(item => item.fiberMstId == fibermstId);
        // this.fabricFiverTypeList = filteredData;  
        console.log("this.fabricConstructionList", this.materialNameList)
        this.materialNameDropdownList = new Array();
        for (var i = 0; i < this.materialNameList.length; i++) {
          this.materialNameDropdownList.push({
            label: this.materialNameList[i].materialComposition,
            value: this.materialNameList[i].id,
          });
        }
      },
      (error) => {
        this.toastr.warning("", "");
      }
    );
  }
  
  materialTypeList: any[] = [];
  materialTypeDropdownList: any[] = [];
  LoadmaterialType() {
    debugger
    this.service.GetmaterialTypeList().subscribe(
      (data: any[]) => {
        this.materialTypeList = data;
        // const filteredData = data.filter(item => item.fiberMstId == fibermstId);
        // this.fabricFiverTypeList = filteredData;  
        console.log("this.fabricConstructionList", this.materialTypeList)
        this.materialTypeDropdownList = new Array();
        for (var i = 0; i < this.materialTypeList.length; i++) {
          this.materialTypeDropdownList.push({
            label: this.materialTypeList[i].materialType,
            value: this.materialTypeList[i].materialType,
          });
        }
      },
      (error) => {
        this.toastr.warning("", "");
      }
    );
  }


  CompositionList: any = [];
  CompositionList2: any = [];

  showCompositionList: boolean = false;
  addCompositionToList() {
    debugger
    this.showCompositionList = true;
    if (this.compositionSetupForm.valid) {
      if (this.compositionSetupForm.value.materialName != "0" && this.compositionSetupForm.value.materialName != "" && this.compositionSetupForm.value.materialShortName != "" && this.compositionSetupForm.value.materialUserPerc != null && this.compositionSetupForm.value.materialUserPerc != 0 && this.compositionSetupForm.value.materialType != "0" && this.compositionSetupForm.value.materialTypeShortName != "0" && this.compositionSetupForm.value.addCompositionNote != "") {
        this.CompositionList.push(this.compositionSetupForm.value);
       
        this.totalUsedPerc = this.CompositionList.reduce((sum, list) => sum + list.materialUserPerc, 0)
        // console.log("totalUsedPerc", this.totalUsedPerc);

        if (this.totalUsedPerc == 100) {
          let result = '';
          for (const item of this.CompositionList) {
            if (item.materialUserPerc) {
              result += item.materialUserPerc + '%' + ' ';
            }

            if (item.materialShortName) {
              result += item.materialShortName + ' ';
            }

            if (item.materialType) {
              result += item.materialType + ' ';
            }

          }
         
          if(this.compositionSetupForm.value.addCompositionNote){
            result += '('+this.compositionSetupForm.value.addCompositionNote + ')'
          }
          this.compositionName = result;
          this.showCompositionName = true;
          // console.log("result", this.compositionName)
          

        }
        else {
          this.toastr.warning(" Userd Percentage not 100% ");
        }
      }
      else{
        this.toastr.error("Please Fill Necessary Fields");
      }
    }
    else {
      this.toastr.error("Please Fill Necessary Fields");
    }
  }


  deleteItem(obj: any) {
    const index: number = this.CompositionList.indexOf(obj);
    if (index !== -1) {
      this.CompositionList.splice(index, 1);
      if (this.CompositionList.length > 0) {
        this.totalUsedPerc = this.CompositionList.reduce((sum, list) => sum + list.materialUserPerc, 0)
        console.log("totalUsedPerc", this.totalUsedPerc);


        if (this.totalUsedPerc == 100) {
          console.log("got now", this.CompositionList)
          let result = '';

          for (const item of this.CompositionList) {
            if (item.materialUserPerc) {
              result += item.materialUserPerc + '%' + ' ';
            }

            if (item.materialShortName) {
              result += item.materialShortName + ' ';
            }

            if (item.materialType) {
              result += item.materialType + ' ';
            }
          }
          console.log("result", result)
          this.compositionName = result;
          this.showCompositionName = false;
          console.log("result", this.compositionName)

        }
        else {
          this.toastr.warning(" Userd Percentage not 100% ");
          this.showCompositionName = false;
        }
      }

    }
  }

  totalUsedPerc: number;
  compositionName: string;
  showCompositionName: boolean = false;
  // //for save kpi to database 
  createComposition(compositionName) {
    debugger
    // this.totalUsedPerc = this.CompositionList.reduce((sum, list) => sum + list.materialUserPerc, 0)
    // console.log("totalQty",this.totalUsedPerc);
    
   
    if (this.totalUsedPerc == 100) {

      this.service.SaveComposition(compositionName).subscribe(
        (res) => {
          
          this.toastr.success("Composition Saved Successful");
          this.CompositionList= null;
          this.CompositionList= [];
         // this.clearForm();
           this.showCompositionList = false;
           //this.showvalue();
          // this.clickOnType();
        },
        (error) => {
          this.toastr.error("Failed To Saved Composition");
          // console.log(error);
        }
      );

      //console.log("got now", this.CompositionList)
    }
    else {
      this.toastr.error(" Userd Percentage not 100% ");
    }

  }

  

  BtnClear(){
    this. SetupForm();
  }
}
