import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { CommonServiceService } from "src/app/components/merchandising/Common-Services/common-service.service";
import { Refference } from "../../../model/setting-model/refference";
import { UnitTypeModel } from "../../../model/setting-model/unit-type";
import { FabricBasicNameService } from "../../../services/fabric-basic-name.service";

@Component({
  selector: "app-unit-type-create",
  templateUrl: "./unit-type-create.component.html",
  styleUrls: ["./unit-type-create.component.scss"],
})
export class UnitTypeCreateComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public service: FabricBasicNameService,
    public commonService: CommonServiceService
  ) {}

  unitTypeForm: FormGroup;
  unitTypeMdel: UnitTypeModel;
  saveButtonTitle = "Save";
  defaultUnitLabel: any = "";
  Ref: any = "";
  model: Refference[];
  //@Input('master') masterName: string;
  @Output() unitTypeToCreate = new EventEmitter();

  ngOnInit(): void {
    this.CreateUnitTypeForm();
    this.commonService.LoadMeasurementMethod();
  }

  CreateUnitTypeForm() {
    if (this.unitTypeMdel) {
      this.unitTypeForm = this.fb.group({
        id: [this.unitTypeMdel.id],
        unitName: [this.unitTypeMdel.unitName, Validators.required],
        shortName: [this.unitTypeMdel.shortName, Validators.required],
        methodId: [this.unitTypeMdel.methodId, Validators.required],
        defaultValue: [this.unitTypeMdel.defaultValue, Validators.required],
        remarks: [this.unitTypeMdel.remarks],
        type: [this.unitTypeMdel.type, Validators.required],
      });
    } else {
      this.onClear();
    }
  }

  //Clear input form
  onClear(): void {
    this.unitTypeForm = this.fb.group({
      id: [0],
      unitName: [null, Validators.required],
      shortName: ["", Validators.required],
      methodId: ["", Validators.required],
      defaultValue: [0, Validators.required],
      remarks: [""],
      type: ["", Validators.required],
    });
  }
  //Save button function
  onSubmit() {
    //console.log(this.orderTypeForm.value);
    this.service.CreateUnitTypeName(this.unitTypeForm.value).subscribe(
      (res) => {
        this.unitTypeMdel = null;
        this.onClear();
        this.toastr.success("Unit Name", "Saved Successfully");
        this.unitTypeToCreate.emit();
        this.saveButtonTitle = "Save";
        // this.masterName.displayBasic2 = false;
        //console.log(res);
      },
      (err) => {
        this.unitTypeMdel = null;
        this.onClear();
        //console.log(err);
        this.toastr.error(err.error.error);
        this.unitTypeToCreate.emit();
        this.saveButtonTitle = "Save";
      }
    );
  }

  BtnClear() {
    this.unitTypeMdel = null;
    this.CreateUnitTypeForm();
    this.saveButtonTitle = "SAVE";
  }

  GetDefaultUnit() {
    var id = this.unitTypeForm.controls["methodId"].value;
    if (id != null) {
      this.service.GetReferenceById(id).subscribe(
        (res: Refference[]) => {
          if (res) {
            console.log(res);
            this.model = res;
            this.defaultUnitLabel = this.model[0].unitName;
            console.log(this.defaultUnitLabel);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  GetName() {
    this.Ref = this.unitTypeForm.controls["unitName"].value;
  }
}
