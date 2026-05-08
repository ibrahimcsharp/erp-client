import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
})
export class FormComponent implements OnInit {
  myForm: FormGroup;
  isCollapsed = true;
  constructor(private fb: FormBuilder) {}

  addNewCompany() {
    let control = <FormArray>this.myForm.controls.companies;
    control.push(
      this.fb.group({
        company: [""],
        // nested form array, you could also add a form group initially
        projects: this.fb.array([]),
      })
    );
  }

  deleteCompany(index) {
    let control = <FormArray>this.myForm.controls.companies;
    control.removeAt(index);
  }
  ngOnInit(): void {
    // this.service.LoadBuyerList();
    this.myForm = this.fb.group({
      // you can also set initial formgroup inside if you like
      companies: this.fb.array([]),
    });
  }

  addNewProject(control) {
    control.push(
      this.fb.group({
        projectName: [""],
      })
    );
  }

  deleteProject(control, index) {
    control.removeAt(index);
  }

  data = {
    companies: [
      {
        company: "example comany",
        projects: [
          {
            projectName: "example project",
          },
        ],
      },
    ],
  };

  setCompanies() {
    let control = <FormArray>this.myForm.controls.companies;
    this.data.companies.forEach((x) => {
      control.push(
        this.fb.group({
          company: x.company,
          projects: this.setProjects(x),
        })
      );
    });
  }

  setProjects(x) {
    let arr = new FormArray([]);
    x.projects.forEach((y) => {
      arr.push(
        this.fb.group({
          projectName: y.projectName,
        })
      );
    });
    return arr;
  }
}
