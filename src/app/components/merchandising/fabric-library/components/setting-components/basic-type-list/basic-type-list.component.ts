import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ConfirmationService } from "primeng/api";
import { BasicType } from "../../../model/setting-model/basic-type";
import { FabricBasicNameService } from "../../../services/fabric-basic-name.service";
import { BasicTypeCreateComponent } from "../basic-type-create/basic-type-create.component";

@Component({
  selector: "app-basic-type-list",
  templateUrl: "./basic-type-list.component.html",
  styleUrls: ["./basic-type-list.component.scss"],
})
export class BasicTypeListComponent implements OnInit {
  @ViewChild("basicType") child: BasicTypeCreateComponent;
  selectedBasicType: BasicType[];
  //ref: DynamicDialogRef;
  displayBasic2: boolean;
  constructor(
    private confirmationService: ConfirmationService,
    public service: FabricBasicNameService,
    public toastr: ToastrService
  ) {}

  ngOnInit() {
    this.LoadBasicType();
  }

  deleteSelectedFabricMillName() {
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

  OpenNew() {
    this.displayBasic2 = true;
  }

  LoadBasicType() {
    this.service.getBasicType().subscribe(
      (data: BasicType[]) => {
        this.service.basicTypeList = data;
        //console.log(this.service.millNameList);
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Basic Type");
      }
    );
  }

  editMillName(basicType: BasicType) {
    //console.log(orderType);
    this.child.basicTypeModel = basicType;
    this.child.CreateBasicTypeForm();
    this.child.saveButtonTitle = "Update";
    this.displayBasic2 = true;
  }
}
