import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { MillName } from "../../../model/setting-model/fabric-mill";
import { FabricBasicNameService } from "../../../services/fabric-basic-name.service";

@Component({
  selector: "app-mill-name-create",
  templateUrl: "./mill-name-create.component.html",
  styleUrls: ["./mill-name-create.component.scss"],
})
export class MillNameCreateComponent implements OnInit {
  fabricMillForm: FormGroup;
  fabricMillModel: MillName;
  saveButtonTitle = "Save";
  @Output() millNameToCreate = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public service: FabricBasicNameService
  ) {}

  ngOnInit(): void {
    this.CreateMillNameForm();
  }
  CreateMillNameForm() {
    if (this.fabricMillModel) {
      this.fabricMillForm = this.fb.group({
        id: [this.fabricMillModel.id],
        millName: [this.fabricMillModel.millName, Validators.required],
      });
    } else {
      this.onClear();
    }
  }

  //Clear input form
  onClear(): void {
    this.fabricMillForm = this.fb.group({
      id: [0],
      millName: [null, Validators.required],
    });
  }
  //Save button function
  onSubmit() {
    //console.log(this.orderTypeForm.value);
    this.service.CreateMillName(this.fabricMillForm.value).subscribe(
      (res) => {
        this.fabricMillModel = null;
        this.onClear();
        this.toastr.success("Fabric Mill Name", "Saved Successfully");
        this.millNameToCreate.emit();
        this.saveButtonTitle = "Save";
        // this.masterName.displayBasic2 = false;
        //console.log(res);
      },
      (err) => {
        this.fabricMillModel = null;
        this.onClear();
        //console.log(err);
        this.toastr.error(err.error.error);
        this.millNameToCreate.emit();
        this.saveButtonTitle = "Save";
      }
    );
  }

  BtnClear() {
    this.fabricMillModel = null;
    this.CreateMillNameForm();
    this.saveButtonTitle = "SAVE";
  }
}
