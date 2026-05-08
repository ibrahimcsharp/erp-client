import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ConfirmationService, MessageService } from "primeng/api";
import { FabricBasicName } from "../../../model/setting-model/fabric-basic-name";
import { FabricBasicNameService } from "../../../services/fabric-basic-name.service";
import { FabricBasicNameCreateComponent } from "../fabric-basic-name-create/fabric-basic-name-create.component";

@Component({
  selector: "app-fabric-basic-name-list",
  templateUrl: "./fabric-basic-name-list.component.html",
  styleUrls: ["./fabric-basic-name-list.component.scss"],
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  providers: [MessageService, ConfirmationService],
})
export class FabricBasicNameListComponent implements OnInit {
  @ViewChild("fabricBasicName") child: FabricBasicNameCreateComponent;
  selectedFabricBasicName: FabricBasicName[];
  //ref: DynamicDialogRef;
  displayBasic2: boolean;
  master = "Master";
  constructor(
    private confirmationService: ConfirmationService,
    public service: FabricBasicNameService,
    public toastr: ToastrService
  ) {}

  ngOnInit() {
    this.LoadFabricLibrary();
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
    // this.ref = this.dialogService.open(FabricBasicNameCreateComponent, {
    //   header: "Fabric Basic Name",
    //   width: "70%",
    //   contentStyle: { "max-height": "700px", overflow: "auto" },
    //   baseZIndex: 10000,
    //   //data: { id: id },
    // });
  }

  //Load fabric Library Basic Name
  LoadFabricLibrary() {
    this.service.getFabricBasicName().subscribe(
      (data: FabricBasicName[]) => {
        this.service.fabricNameList = data;
        console.log(this.service.fabricNameList);
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Order Type");
      }
    );
  }

  editFabricBasicName(fabricBasicName: FabricBasicName) {
    //console.log(orderType);
    this.child.fabricBasicName = fabricBasicName;
    this.child.CreateFabricBasicNameForm();
    this.child.saveButtonTitle = "Update";
    this.displayBasic2 = true;
  }
}
