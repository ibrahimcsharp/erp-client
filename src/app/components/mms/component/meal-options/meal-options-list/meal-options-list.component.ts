import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { CommonServiceService } from "src/app/components/merchandising/Common-Services/common-service.service";
import { CommonFiles } from "src/app/components/merchandising/models/common-files.model";
import { SpinnerService } from "src/app/shared/service/spinner.service";
import { environment } from "src/environments/environment";
import { MmsService } from "../../../services/mms.service";
import { MealOptionPostComponent } from "../meal-option-post/meal-option-post.component";

@Component({
  selector: "app-meal-options-list",
  templateUrl: "./meal-options-list.component.html",
  styleUrls: ["./meal-options-list.component.scss"],
})
export class MealOptionsListComponent implements OnInit {
  Items: any[];
  bsModalRef: BsModalRef;
  spinnerName = "listSpinner";
  modalRef?: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private spinner: SpinnerService,
    private toaster: ToastrService,
    public mmsService: MmsService,
    public commonService: CommonServiceService
  ) {}

  ngOnInit(): void {
    this.GetItems();
  }

  GetItems() {
    this.spinner.showSpinner(this.spinnerName);
    this.Items = [];
    this.mmsService.GetMealOptions().subscribe(
      (res: any[]) => {
        this.Items = res;
        this.spinner.hideSpinner(this.spinnerName);
      },
      (error) => {
        this.toaster.error("Failed to load Meal Options");
        this.Items = [];
        this.spinner.hideSpinner(this.spinnerName);
      }
    );
  }

  NewItem() {
    this.bsModalRef = this.modalService.show(MealOptionPostComponent, {
      initialState: {
        title: "Create  Menu for Lunch",
      },
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg",
    });
    this.SaveData();
  }

  SaveData() {
    this.bsModalRef.content.ToCreate.subscribe((model: any) => {
      const ToCreate = model.obj;
      console.log(model.formData);

      if (ToCreate) {
        this.mmsService.SaveMealOptions(ToCreate).subscribe(
          (res: any) => {
            console.log(res);
            if (Number(res.message) > 0) {
              this.toaster.success("Saved Successfully", "Special Meal Info");
              let objectId = 61;
              let event = "Special Meal";
              //console.log(model.formData);
              if (model.formData != undefined) {
                this.commonService
                  .FileUpload(
                    res.message,
                    "",
                    "",
                    event,
                    objectId,
                    model.formData
                  )
                  .subscribe(
                    (res) => {},
                    (error) => {}
                  );
              }

              this.GetItems();
            } else {
              this.toaster.error("Duplicate Record Found!", "Lunch Meal Info");
            }
          },
          (error) => {
            this.toaster.error("Failed to create!", " Meal Info");
          }
        );
      }
    });
  }

  EditItem(model: any) {
    this.bsModalRef = this.modalService.show(MealOptionPostComponent, {
      initialState: {
        title: "Update  Menu For Lunch",
        model,
      },
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-lg",
    });

    this.SaveData();
  }
  url = environment.fileUrl;
  images: any[];
  ShowFile(obj: any, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.images = new Array();
    //console.log(obj);
    let fileObjectId = 61;
    var id = obj.id;
    this.commonService
      .GetStyleImageByRefId(id, fileObjectId)
      .subscribe((data: CommonFiles[]) => {
        // this.commonService.commonFilesList = data;
        for (var i = 0; i < data.length; i++) {
          var ob = {
            previewImageSrc: this.url + data[i].location,
            thumbnailImageSrc: this.url + data[i].location,
            alt: "Description for Image " + i + 1,
            title: "Title " + i + 1,
          };
          this.images.push(ob);
        }

        console.log(JSON.stringify(this.images));
        //return this.url + this.commonService.commonFilesList[0].location;
      });
  }
}
