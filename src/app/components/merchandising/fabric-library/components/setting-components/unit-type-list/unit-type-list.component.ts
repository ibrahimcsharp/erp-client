import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ConfirmationService } from "primeng/api";
import { UnitTypeModel } from "../../../model/setting-model/unit-type";
import { FabricBasicNameService } from "../../../services/fabric-basic-name.service";
import { UnitTypeCreateComponent } from "../unit-type-create/unit-type-create.component";

@Component({
  selector: "app-unit-type-list",
  templateUrl: "./unit-type-list.component.html",
  styleUrls: ["./unit-type-list.component.scss"],
})
export class UnitTypeListComponent implements OnInit {
  @ViewChild("UnitTypeName") child: UnitTypeCreateComponent;
  selectedUnitTypeName: UnitTypeModel[];
  //ref: DynamicDialogRef;
  displayBasic2: boolean;
  //master = "Master";

  constructor(
    private confirmationService: ConfirmationService,
    public service: FabricBasicNameService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.LoadUnitType();
  }
  //Delete multiple fabric basic name
  deleteSelectedFabricBasicName() {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete the selected products?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        // this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        // this.selectedProducts = null;
        // this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      },
    });
  }

  //Open new window to create fabric basic name
  OpenNew() {
    this.displayBasic2 = true;
  }

  //Load fabric Library Basic Name
  LoadUnitType() {
    this.service.getUnitTypeName().subscribe(
      (data: UnitTypeModel[]) => {
        this.service.unitTypeList = data;
        //console.log(this.service.fabricNameList);
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Unit Type");
      }
    );
  }

  editUnitTypeName(unitType: UnitTypeModel) {
    //console.log(orderType);
    this.child.unitTypeMdel = unitType;
    this.child.CreateUnitTypeForm();
    this.child.saveButtonTitle = "Update";
    this.displayBasic2 = true;
  }
}
