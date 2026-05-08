import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { CommonServiceService } from "src/app/components/merchandising/Common-Services/common-service.service";
import { Refference } from "../../../model/setting-model/refference";
import { UnitItems } from "../../../model/setting-model/UnitItems";
import { FabricBasicNameService } from "../../../services/fabric-basic-name.service";

@Component({
  selector: "app-refference-create",
  templateUrl: "./refference-create.component.html",
  styleUrls: ["./refference-create.component.scss"],
})
export class RefferenceCreateComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public service: FabricBasicNameService,
    public commonService: CommonServiceService
  ) {}
  refferenceForm: FormGroup;
  refferenceModel: Refference;
  saveButtonTitle = "Save";
  @Output() refferenceToCreate = new EventEmitter();
  ngOnInit() {
    this.CreateRefferenceForm();
    this.commonService.LoadBasicType();
    this.GetDefaultUnit();
  }

  CreateRefferenceForm() {
    if (this.refferenceModel) {
      this.refferenceForm = this.fb.group({
        id: [this.refferenceModel.id],
        basicTypeId: [this.refferenceModel.basicTypeId, Validators.required],
        code: [this.refferenceModel.code, Validators.required],
        name: [this.refferenceModel.name, Validators.required],
        defaultUnit: [this.refferenceModel.defaultUnit],
        remarks: [this.refferenceModel.remarks],
      });
    } else {
      this.onClear();
    }
  }

  //Clear input form
  onClear(): void {
    this.refferenceForm = this.fb.group({
      id: [0],
      basicTypeId: ["", Validators.required],
      code: [null, Validators.required],
      name: [null, Validators.required],
      defaultUnit: [0],
      remarks: [""],
    });
  }
  //Save button function
  onSubmit() {
    //console.log(this.orderTypeForm.value);
    this.service.CreateRefference(this.refferenceForm.value).subscribe(
      (res) => {
        this.refferenceModel = null;
        this.onClear();
        this.toastr.success("Refference Name", "Saved Successfully");
        this.refferenceToCreate.emit();
        this.saveButtonTitle = "Save";
        // this.masterName.displayBasic2 = false;
        //console.log(res);
      },
      (err) => {
        this.refferenceModel = null;
        this.onClear();
        //console.log(err);
        this.toastr.error(err.error.error);
        this.refferenceToCreate.emit();
        this.saveButtonTitle = "Save";
      }
    );
  }

  BtnClear() {
    this.refferenceModel = null;
    this.CreateRefferenceForm();
    this.saveButtonTitle = "SAVE";
  }

  //Get default unit from unit table
  GetDefaultUnit() {
    this.commonService.GetUnitItemList().subscribe(
      (res: UnitItems[]) => {
        if (res) {
          this.commonService.UnitItemmsList = res;
          //console.log(res);
        }
      },
      (error) => {
        this.toastr.error("Error to load unit items data");
      }
    );
  }
}
