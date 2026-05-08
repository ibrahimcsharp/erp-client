import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { FabricBasicName } from "../../../model/setting-model/fabric-basic-name";
import { FabricBasicNameService } from "../../../services/fabric-basic-name.service";

@Component({
  selector: "app-fabric-basic-name-create",
  templateUrl: "./fabric-basic-name-create.component.html",
  styleUrls: ["./fabric-basic-name-create.component.scss"],
})
export class FabricBasicNameCreateComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public service: FabricBasicNameService
  ) {}
  fabricBasicNameForm: FormGroup;
  fabricBasicName: FabricBasicName;
  saveButtonTitle = "Save";
  //@Input('master') masterName: string;
  @Output() fabricBasicNameToCreate = new EventEmitter();

  ngOnInit() {
    this.CreateFabricBasicNameForm();
  }

  //Create fabric libary form funtion
  CreateFabricBasicNameForm() {
    if (this.fabricBasicName) {
      this.fabricBasicNameForm = this.fb.group({
        id: [this.fabricBasicName.id],
        fabricBasicName: [
          this.fabricBasicName.fabricBasicName,
          Validators.required,
        ],
      });
    } else {
      this.onClear();
    }
  }

  //Clear input form
  onClear(): void {
    this.fabricBasicNameForm = this.fb.group({
      id: [0],
      fabricBasicName: [null, Validators.required],
    });
  }
  //Save button function
  onSubmit() {
    //console.log(this.orderTypeForm.value);
    this.service
      .CreateFabricBasicName(this.fabricBasicNameForm.value)
      .subscribe(
        (res) => {
          this.fabricBasicName = null;
          this.onClear();
          this.toastr.success("Fabric Basic Name", "Saved Successfully");
          this.fabricBasicNameToCreate.emit();
          this.saveButtonTitle = "Save";
          // this.masterName.displayBasic2 = false;
          //console.log(res);
        },
        (err) => {
          this.fabricBasicName = null;
          this.onClear();
          //console.log(err);
          this.toastr.error(err.error.error);
          this.fabricBasicNameToCreate.emit();
          this.saveButtonTitle = "Save";
        }
      );
  }

  BtnClear() {
    this.fabricBasicName = null;
    this.CreateFabricBasicNameForm();
    this.saveButtonTitle = "SAVE";
  }
}
