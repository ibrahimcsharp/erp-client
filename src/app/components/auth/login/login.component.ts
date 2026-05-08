import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MustMatch } from "src/app/shared/custom-validators";
import { AlertifyService } from "src/app/shared/service/alertify.service";
import { AuthService } from "src/app/shared/service/auth.service";
import { SpinnerService } from "src/app/shared/service/spinner.service";
//import { ChartOfAccountService } from "../../accounting/chart-of-account/service/chart-of-account.service";
import { RoleService } from "../../admin/Services/role.service";
import { CommonServiceService } from "../../merchandising/Common-Services/common-service.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public registerFormData: FormGroup;
  public finYear: any[] = [];
  companyList: any[] = [];
  model: any = {};

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private spinner: SpinnerService,
    public commonService: CommonServiceService,
    public roleService: RoleService,
    //private accountingService: ChartOfAccountService
  ) { }

  GetCompanyList() {
    this.roleService.GetBranchUsersByUsername(this.loginForm.value.userName).subscribe((res: any[]) => {
      this.companyList = res;
      if (this.companyList.length == 1) {
        this.loginForm.patchValue({
          branchOfficeId: this.companyList[0].branchOfficeId,
        });
      } else {
        this.loginForm.patchValue({
          branchOfficeId: "",
        });
      }
      //console.log(this.companyList);
    },
      (error) => {
        this.companyList = [];
        this.loginForm.patchValue({
          branchOfficeId: "",
        });
      }
    );
  }

  owlcarousel = [
    {
      title: "Welcome to Snowtex ERP",
      // desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy.',
    },
    {
      title: "Welcome to Snowtex ERP",
      // desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy.',
    },
    {
      title: "Welcome to Snowtex ERP",
      // desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy.',
    },
  ];
  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true,
  };

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: ["", Validators.required],
      password: ["", Validators.required],
      branchOfficeId: ["", Validators.required],
      finYearId: ["", Validators.required],
      //companyId: ["", Validators.required],
    });
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group(
      {
        employeeId: [null, Validators.required],
        password: ["", Validators.required],
        confirmPassword: ["", Validators.required],
        branchOfficeId: [0, Validators.required],
      },
      {
        validator: MustMatch("password", "confirmPassword"),
      }
    );
  }

  submitted = false;

  ngOnInit() {
    this.commonService.LoadCompany();
    this.commonService.GetFinYear().subscribe((res: any[]) => {
      this.finYear = res;
      var yearNO = this.finYear.filter((e) => e.defaultYear == 1);
      this.loginForm.patchValue({
        finYearId: yearNO[0].yearNo,
      });
    },
      (error) => {
        this.finYear = [];
        this.loginForm.patchValue({
          finYearId: "",
        });
      }
    );
    if (this.authService.loggedIn()) {
      this.router.navigate(["/dashboard/default/"]);
    }
    this.createLoginForm();
    this.createRegisterForm();
  }

  login() {
    if (this.loginForm.valid) {
      this.spinner.showSpinner();
      this.authService.login(this.loginForm.value).subscribe(
        (next) => {
          this.alertify.success("Login successfully!");
        },
        (error) => {
          this.alertify.error("Failed to login!");
          this.spinner.hideSpinner();
        },
        () => {
          this.spinner.hideSpinner();
          this.router.navigate(["/dashboard/default/"]);
          window.location.reload();
        }
      );
    } else {
      this.commonService.ValidationShow(this.loginForm);
    }
  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    //this.submitted = true;
    // this.registerFormData=this.formBuilder.group({
    //   employeeId:this.registerForm.get('employeeId').value,
    //   password:this.registerForm.get('password').value
    // })
    this.spinner.showSpinner();
    //console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value).subscribe((next) => {
      console.log(next);
      //console.log("res "+next);
      this.alertify.success("Registered successfully!");
      this.createRegisterForm();
      window.location.reload();
    },
      (error) => {
        console.log(error);
        console.log(error.error[0]);
        this.alertify.error(error.error[0]);
        this.spinner.hideSpinner();
      },
      () => {
        this.spinner.hideSpinner();
        this.router.navigate(["/dashboard/default/"]);
      }
    );
  }
}
