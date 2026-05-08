import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/shared/service/auth.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  customForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.CreateForm();
  }

  CreateForm() {
    this.customForm = this.fb.group({
      id: ["", Validators.required],
      newPassword: ["", Validators.required],
    });
  }

  ChangePassword() {
    if (this.customForm.valid) {
      this.authService.ChangePassword(this.customForm.value).subscribe(
        (res) => {
          this.toastr.success("Password Reset Successfully");
          this.CreateForm();
        },
        (error) => {
          this.toastr.error("Failed to reset Password");
        }
      );
    }
  }
}
