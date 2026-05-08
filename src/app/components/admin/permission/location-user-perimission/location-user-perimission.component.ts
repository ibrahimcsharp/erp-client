import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { CommonServiceService } from "src/app/components/merchandising/Common-Services/common-service.service";
//import { ChartOfAccountService } from "src/app/components/accounting/chart-of-account/service/chart-of-account.service";

@Component({
  selector: "app-location-user-perimission",
  templateUrl: "./location-user-perimission.component.html",
  styleUrls: ["./location-user-perimission.component.css"],
})
export class LocationUserPerimissionComponent implements OnInit {
  res: any[] = [];
  userId = 0;
  title: string;
  constructor(
    public bsModalRef: BsModalRef,
    //public accountingService: ChartOfAccountService,
    public toastr: ToastrService,
    public commonService: CommonServiceService,
  ) {}

  ngOnInit() {}

  CheckAll(event) {
    if (event.target.checked) {
      for (var i = 0; i < this.res.length; i++) {
        this.res[i].isSelected = true;
      }
      //alert("true");
    } else {
      for (var i = 0; i < this.res.length; i++) {
        this.res[i].isSelected = false;
      }
    }
    //console.log(event);
  }

  SaveChanges() {
    var body = {
      userId: this.userId,
      list: this.res,
    };

    this.commonService.CreateLocationForUser(body).subscribe(
      (res: any) => {
        this.toastr.success("Saved Successfully");
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.error[0]);
      }
    );
  }
}
