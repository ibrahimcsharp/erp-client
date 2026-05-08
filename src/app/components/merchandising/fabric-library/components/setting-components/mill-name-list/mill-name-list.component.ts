import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ConfirmationService } from "primeng/api";
import { MillName } from "../../../model/setting-model/fabric-mill";
import { FabricBasicNameService } from "../../../services/fabric-basic-name.service";
import { MillNameCreateComponent } from "../mill-name-create/mill-name-create.component";

@Component({
  selector: "app-mill-name-list",
  templateUrl: "./mill-name-list.component.html",
  styleUrls: ["./mill-name-list.component.scss"],
})
export class MillNameListComponent implements OnInit {
  @ViewChild("fabricMillName") child: MillNameCreateComponent;
  selectedFabricBasicName: MillName[];
  //ref: DynamicDialogRef;
  displayBasic2: boolean;
  constructor(
    private confirmationService: ConfirmationService,
    public service: FabricBasicNameService,
    public toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.LoadFabricMillName();
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
  //Open new window to create fabric mill
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
  LoadFabricMillName() {
    this.service.getMilleName().subscribe(
      (data: MillName[]) => {
        this.service.millNameList = data;
        //console.log(this.service.millNameList);
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Order Type");
      }
    );
  }

  editMillName(millName: MillName) {
    //console.log(orderType);
    this.child.fabricMillModel = millName;
    this.child.CreateMillNameForm();
    this.child.saveButtonTitle = "Update";
    this.displayBasic2 = true;
  }
}
