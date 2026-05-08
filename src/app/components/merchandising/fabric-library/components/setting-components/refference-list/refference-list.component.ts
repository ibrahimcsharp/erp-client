import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ConfirmationService } from "primeng/api";
import { Refference } from "../../../model/setting-model/refference";
import { FabricBasicNameService } from "../../../services/fabric-basic-name.service";
import { RefferenceCreateComponent } from "../refference-create/refference-create.component";

@Component({
  selector: "app-refference-list",
  templateUrl: "./refference-list.component.html",
  styleUrls: ["./refference-list.component.scss"],
})
export class RefferenceListComponent implements OnInit {
  @ViewChild("refference") child: RefferenceCreateComponent;
  //selectedUnitTypeName: UnitTypeModel[];
  //ref: DynamicDialogRef;
  displayBasic2: boolean;
  //master = "Master";

  constructor(
    private confirmationService: ConfirmationService,
    public service: FabricBasicNameService,
    public toastr: ToastrService
  ) {}

  ngOnInit() {
    this.LoadRefference();
  }
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

  LoadRefference() {
    this.service.getRefference().subscribe(
      (data: Refference[]) => {
        this.service.refferenceList = data;
        //console.log(this.service.fabricNameList);
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "Refference");
      }
    );
  }

  editRefference(refference: Refference) {
    console.log(refference);
    this.child.refferenceModel = refference;
    this.child.CreateRefferenceForm();
    this.child.saveButtonTitle = "Update";
    this.displayBasic2 = true;
  }
}
