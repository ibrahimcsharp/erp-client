import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { BasicType } from "../../../model/setting-model/basic-type";
import { FabricBasicNameService } from "../../../services/fabric-basic-name.service";

@Component({
  selector: "app-basic-type-create",
  templateUrl: "./basic-type-create.component.html",
  styleUrls: ["./basic-type-create.component.scss"],
})
export class BasicTypeCreateComponent implements OnInit {
  basicTypeForm: FormGroup;
  basicTypeModel: BasicType;
  saveButtonTitle = "Save";
  @Output() basicTypeToCreate = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public service: FabricBasicNameService
  ) {}

  ngOnInit() {
    this.CreateBasicTypeForm();
  }
  CreateBasicTypeForm() {
    if (this.basicTypeModel) {
      this.basicTypeForm = this.fb.group({
        id: [this.basicTypeModel.id],
        keyName: [this.basicTypeModel.keyName, Validators.required],
      });
    } else {
      this.onClear();
    }
  }

  //Clear input form
  onClear(): void {
    this.basicTypeForm = this.fb.group({
      id: [0],
      keyName: [null, Validators.required],
    });
  }

  //Save button function
  onSubmit() {
    //console.log(this.orderTypeForm.value);
    this.service.CreateBasicType(this.basicTypeForm.value).subscribe(
      (res) => {
        this.basicTypeModel = null;
        this.onClear();
        this.toastr.success("Basic Type", "Saved Successfully");
        this.basicTypeToCreate.emit();
        this.saveButtonTitle = "Save";
        // this.masterName.displayBasic2 = false;
        //console.log(res);
      },
      (err) => {
        this.basicTypeModel = null;
        this.onClear();
        //console.log(err);
        this.toastr.error(err.error.error);
        this.basicTypeToCreate.emit();
        this.saveButtonTitle = "Save";
      }
    );
  }
  BtnClear() {
    this.basicTypeModel = null;
    this.CreateBasicTypeForm();
    this.saveButtonTitle = "SAVE";
  }
}
