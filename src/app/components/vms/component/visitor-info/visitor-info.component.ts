import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { VisitorManageService } from '../../services/visitor-manage.service';
import { Observable, Subject } from 'rxjs';
import { EventEmitter, Output } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { id } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';



@Component({
  selector: 'app-visitor-info',
  templateUrl: './visitor-info.component.html',
  styleUrls: ['./visitor-info.component.scss']
})
export class VisitorInfoComponent implements OnInit {

  // @HostListener('window:keypress',['$event']) spaceEvent(event:any){
  //   this.submit( )
  // }

  @Output() getAllPendingList = new EventEmitter();
 // @Output() getOnlyApprovedList = new EventEmitter();
  WebcamImage: WebcamImage | undefined
  visitorForm: FormGroup;
  show: boolean = false;
  step: any = 1;
  model: any = null;
  visitorsForm = new FormGroup({
    visitorInfo: new FormGroup({
      employeeNameNew: new FormControl(''),
      employeeNameExternal: new FormControl(''),
      visitorName: new FormControl(''),
      visitorMobileNumber: new FormControl('', Validators.required),
      visitorCompany: new FormControl(''),
      visitorAddress: new FormControl(''),
      // visitorEmail: new FormControl(''),
      visitorPurpose: new FormControl('Official Purpose'),
      //visitorType: new FormControl(''),
      visitorOfficeId: new FormControl('')
    }),
    whom: new FormGroup({
      employeeName: new FormControl(''),
      whommobileNumber: new FormControl(''),
      whomName: new FormControl(''),
      whomDesignation: new FormControl(''),
      whomDepartment: new FormControl(''),
      whomCompany: new FormControl(''),
      visitorImage: new FormControl(''),
    }),
    card: new FormGroup({
      visitorCardNumber: new FormControl(''),
    }),
  });
  VisitorManageService: any;

  employeeList: any[] = [];
  employeeListForDisplay: any[] = [];
  employeeListNew: any[] = [];
  employeeContactList: any[] = [];
  employeeListForExternal: any[] = [];
  companyListofExternal: any[] = [];
  //employeeNameExternal: any[]=[];
  employeeListForDisplayNew: any[] = [];
  employeeListForDisplayExternal: any[] = [];
  companyListofExternalDisplay: any[] = [];
 // router: any;
  imageName: string;
  imageFormat: string;
  type: any;
  myModel = true;
  hideExternal: boolean = false;
  hideInternal: boolean = false;
  externalValue: boolean = false;
  internalValue: boolean = false;
  public buttonDisabled = false;


  hideOfficial: boolean = false;
  hidePersonal: boolean = false;
  officialValue: boolean = false;
  personalValue: boolean = false;


  constructor(
    public commonService: CommonServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public service: VisitorManageService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    // this.InitializeForm();
    // this.onClearonFirstPage() GetALLEmployeeList
    //this.onClear()
    this.myModel = true;
    this.LoadVMSEmplyeeListNewForVisitor();/*info visitor*/
    this.LoadVMSEmplyeeListForWhom();/*Internal for whom visitor*/
    this.LoadVMSEmplyeeContactList();/*HR-contact*/
    this.LoadVMSExternalEmplyeeList();/*External*/
    this.LoadVMSCompanyList();
  }

  submit() {
   // debugger
    if (this.visitorsForm.valid) {
      this.step = this.step + 1;
    }
    else {
      this.checkValidation();
    }
  }

  submit1(event: any) {
    if (this.visitorsForm.valid) {
      this.step = this.step + 1;
    }
    else {
      this.checkValidation();
    }
  }

  /*HR User contact*/
  LoadVMSEmplyeeContactList() {
    this.service.GetVMSUserContactList().subscribe(
      (data: any[]) => {
        this.employeeContactList = data;
        // console.log(data);
      },
      (error) => {
        this.toastr.warning("Failed To Load User Contact Data", "List");
      }
    );
  }
  // changeInternalFlag() {    
  //   this.hideInternal = false;
  //   this.hideExternal = true;
  //   this.internalValue = true;
  //   this.externalValue = false;
  // this.onClearNew('Internal')
  // }

  // changeExternalFlag() {     
  //   this.hideExternal = false;
  //   this.hideInternal = true;
  //   this.externalValue = true;
  //   this.internalValue = false; 
  // this.onClearNew('External')
  // }

  checkValidation() {

    if (this.visitorsForm.value.visitorInfo.visitorMobileNumber == null || this.visitorsForm.value.visitorInfo.visitorMobileNumber == "") {
      this.toastr.warning("Please Enter Mobile Number");
    }
  }

  previous() {
    this.step = this.step - 1;
  }
  previous1(event: any) {

    this.step = this.step - 1;
  }

  /*info load*/
  LoadVMSEmplyeeListForWhom() {

    this.service.GetVMSEmployeeList().subscribe(
      (data: any[]) => {
        this.employeeList = data;
        //  console.log(data);
        for (let item of data) {
          this.employeeListForDisplay.push({
            text: item.employeeName + '-' + item.employeeId + '-' + item.department,
            value: item.employeeId
          });
        }
      },
      (error) => {
        this.toastr.warning("Failed To Load Data", "List");
      }
    );
  }

  /*whom*/
  onSelectEmployee(event) {

    var _employeeId = event.item.value;

    var contactnumberWhom = this.employeeContactList.find(emp => emp.employeeId == _employeeId);

    var employee = this.employeeList.find(emp => emp.employeeId == _employeeId);
    this.visitorsForm.patchValue({
      whom: {

        whomName: employee.employeeName,
        whomCompany: employee.company,
        whomDesignation: employee.designation,
        whommobileNumber: contactnumberWhom.mobileNo,
        whomDepartment: employee.department,
      },

    });
  }
  combineAllList: any[] = [];
  /**load all internal data as api */
  LoadVMSEmplyeeListNewForVisitor() {
    //GetALLEmployeeList
    // this.service.GetVMSEmployeeListNew().subscribe(
    this.service.GetALLEmployee().subscribe(
      (data: any[]) => {
       // console.log("factory api:", data);
        this.employeeListNew = data;
        this.combineAllList = [...this.employeeListNew, ...this.employeeListForExternal];
        for (let item of data) {
          this.employeeListForDisplayNew.push({
            text: item.employeeName + '-' + item.employeeId + '-' + item.department,
            value: item.employeeId
          });
        }
      },
      (error) => {
        // this.toastr.warning("Failed To Load Data", "Employee List");
      }
    );
  }
  /**load external data */
  LoadVMSExternalEmplyeeList() {
    this.service.GetExternalVisitorInfoList().subscribe(
      (data: any[]) => {
        this.employeeListForExternal = data;
       // console.log("local api:", data);
        
        for (let item of data) {
          this.employeeListForDisplayNew.push({
            text: item.visitorname + '-' + item.visitormobilenumber,
            //text: item.visitorname + '-' + item.visitorcardnumber + '-' + item.visitormobilenumber,
            value: item.id
          });
        }

        //console.log(this.employeeListForDisplayExternal);
      },
      (error) => {
        // this.toastr.warning("Failed To Load Data", "Employee List");
      }
    );
  }
  /*inhouse external visitor load event */
  onSelectEmployeeNewExternal(event) {
    //debugger
    var empId = event.item.value;
    var visitor = this.employeeListForExternal.find(emp => emp.id == empId);
   // console.log(visitor);
    this.visitorsForm.patchValue({
      visitorInfo: {
        visitorName: visitor.visitorname,
        visitorCompany: visitor.visitorcompany,
        visitorMobileNumber: visitor.visitormobilenumber,
        visitorAddress: visitor.visitoraddress,
        //  visitorEmail: visitor.visitoremail,
      },
    });
  }
  /* internal-all  data load event*/
  onSelectEmployeeNew(event) {
   // debugger
    var type = typeof event.item.value === "string"
    //var check= Number(event.item.value);
    if (type == true) {
      var _employeeId = event.item.value;
      var contactnumber = this.employeeContactList.find(emp => emp.employeeId == _employeeId);
      var employee = this.employeeListNew.find(emp => emp.employeeId == _employeeId);
      this.visitorsForm.patchValue({
        visitorInfo: {
          visitorName: employee.employeeName,
          visitorCompany: employee.company,
          visitorMobileNumber: contactnumber.mobileNo,
          visitorAddress:employee.visitorAddress,
          visitorOfficeId: employee.employeeId
        },
      });
    }
    else {
      var empId = event.item.value;
      //var visitor = this.employeeListForExternal.find(emp => emp.id == empId); izab vai
      var visitor = this.companyListofExternal.find(emp => emp.id == empId);
     // console.log(visitor);
      this.visitorsForm.patchValue({
        visitorInfo: {
          visitorName: visitor.visitorname,
          visitorCompany: visitor.visitorcompany,
          visitorMobileNumber: visitor.visitormobilenumber,
          visitorAddress: visitor.visitoraddress,
          //  visitorEmail: visitor.visitoremail,
        },
      });
    }


    //   if(contactnumber='undefined'){

    //     var empId = event.item.value;
    //     var visitor = this.employeeListForExternal.find(emp => emp.id == empId);
    //     console.log(visitor);
    //     this.visitorsForm.patchValue({
    //       visitorInfo: {
    //         visitorName: visitor.visitorname,
    //         visitorCompany: visitor.visitorcompany,
    //         visitorMobileNumber: visitor.visitormobilenumber,
    //         visitorAddress: visitor.visitoraddress,
    //         //  visitorEmail: visitor.visitoremail,
    //       },
    //     });
    //   }
    //   else{
    //     var _employeeId = event.item.value;
    // var contactnumber = this.employeeContactList.find(emp => emp.employeeId == _employeeId);
    // var employee = this.employeeListNew.find(emp => emp.employeeId == _employeeId);
    // this.visitorsForm.patchValue({
    //   visitorInfo: {
    //     visitorName: employee.employeeName,
    //     visitorCompany: employee.company,
    //     visitorMobileNumber: contactnumber.mobileNo,
    //     visitorOfficeId: employee.employeeId
    //   },
    // });
    //   }

    //  // console.log('this.visitorsForm', this.visitorsForm);
  }
  /*load all External*/
  // LoadVMSExternalEmplyeeList() {
  //   debugger
  //   this.service.GetExternalVisitorInfoList().subscribe(
  //     (data: any[]) => {     
  //       this.employeeListForExternal = data;
  //       for (let item of data) {
  //         this.employeeListForDisplayExternal.push({
  //           //text: item.visitorname + '-' + item.visitorcardnumber + '-' + item.visitormobilenumber,
  //           text: item.visitorname + '-' + item.visitormobilenumber,
  //           value: item.id
  //         });
  //       }
  //       console.log(this.employeeListForDisplayExternal);
  //     },
  //     (error) => {
  //       // this.toastr.warning("Failed To Load Data", "Employee List");
  //     }
  //   );
  // }



  /*load company*/
  LoadVMSCompanyList() {
   // debugger
    this.service.GetCompanyList().subscribe(
      (data: any[]) => {
        //console.log("new api:", data);
        this.companyListofExternal = data;
        var distinctData = data.filter((a, i) => data.findIndex((s) => a.visitorcompany === s.visitorcompany) === i); // Distinct by visitor company
        for (let item of distinctData) {
          this.companyListofExternalDisplay.push({
            text: item.visitorcompany,
            value: item.id
          });
        }
      },

      (error) => {
        // this.toastr.warning("Failed To Load Data", "Employee List");
      }
    );

  }

  onSelectCompany(event) {
   // debugger
    var companyName = event.item.text;
    //var visitor = this.employeeListForExternal.find(emp => emp.id == empId);
    //console.log(visitor);
    //var list = this.combineAllList.filter(x => x.visitorcompany == companyName);
    var list = this.companyListofExternal.filter(x => x.visitorcompany == companyName);

  //   this.visitorsForm.patchValue({
  //     visitorInfo: {
        
  //       visitorAddress: list.
  //     },
  // )}
    
    //this.employeeListForDisplayNew= list;

    this.employeeListForDisplayNew = [];
    for (let item of list) {
      this.employeeListForDisplayNew.push({
        // text: item.employeeName + '-' + item.employeeId + '-' + item.department,
        // value: item.employeeId
        text: item.visitorname + '-' + item.visitormobilenumber,
        //text: item.visitorname + '-' + item.visitorcardnumber + '-' + item.visitormobilenumber,
        value: item.id
      });
    }
    // var visitor = this.companyListofExternal.find(emp => emp.id == id);
    // // console.log(visitor);
    //  this.visitorsForm.patchValue({
    //    visitorInfo: {
    //     //  visitorName: visitor.visitorname,
    //     //  visitorCompany: visitor.visitorcompany,
    //     //  visitorMobileNumber: visitor.visitormobilenumber,
    //      visitorAddress: visitor.visitoraddress,
    //      //  visitorEmail: visitor.visitoremail,
    //    },
    //  });

    var empId = event.item.value;
    var visitor = this.employeeListForExternal.find(emp => emp.id == empId);
   // console.log(visitor);
    this.visitorsForm.patchValue({
      visitorInfo: {
        // visitorName: visitor.visitorname,
        // visitorCompany: visitor.visitorcompany,
        // visitorMobileNumber: visitor.visitormobilenumber,
        visitorAddress: visitor.visitoraddress,
        //  visitorEmail: visitor.visitoremail,
      },
    });
    // this.visitorsForm.patchValue({
    //   visitorInfo: {
    //     visitorName: visitor.visitorname,
    //   },
    // });
    // var _employeeId = event.item.value;
    // var contactnumber = this.employeeContactList.find(emp => emp.employeeId == _employeeId);
    // var employee = this.employeeListNew.find(emp => emp.employeeId == _employeeId);
    // this.visitorsForm.patchValue({
    //   visitorInfo: {
    //     visitorName: employee.employeeName,
    //     visitorCompany: employee.company,
    //     visitorMobileNumber: contactnumber.mobileNo,
    //     visitorOfficeId: employee.employeeId
    //   },
    // });

   // console.log('this.visitorsForm', this.visitorsForm);
  }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }
  onClear(): void {
    this.visitorsForm = this.fb.group({

      visitorInfo: this.fb.group({
        employeeNameNew: '',
        employeeNameExternal: '',
        visitorName: '',
        visitorMobileNumber: ['', Validators.required],
        visitorCompany: 'N/A',
        visitorAddress: '',
        // visitorEmail: '',
        visitorPurpose: 'Official Purpose',
        visitorOfficeId: '',
        //visitorType: '',

      }),
      whom: this.fb.group({
        employeeName: '',
        whommobileNumber: '',
        whomName: '',
        whomDesignation: '',
        whomDepartment: '',
        whomCompany: '',
        visitorImage: '',
      }),
      card: this.fb.group({
        visitorCardNumber: '',
      }),


    });



  }
  // onClearNew(visitorType: string): void {
  //   this.visitorsForm = this.fb.group({
  //     visitorInfo: this.fb.group({
  //       employeeNameNew: '',
  //       employeeNameExternal: '',
  //       visitorName: '',
  //       visitorMobileNumber: ['',Validators.required],
  //       visitorCompany: '',
  //       visitorAddress: '',
  //      // visitorEmail: '',
  //       visitorPurpose: 'Official',
  //       visitorOfficeId:'',
  //       visitorType: visitorType,
  //     }),
  //     whom: this.fb.group({
  //       employeeName: '',
  //       whommobileNumber: '',
  //       whomName: '',
  //       whomDesignation: '',
  //       whomDepartment: '',
  //       whomCompany: '',
  //       visitorImage: '',
  //     }),
  //     card: this.fb.group({
  //       visitorCardNumber: '',
  //     }),
  //   });
  // }
  onClearonFirstPage(): void {
    this.visitorsForm = this.fb.group({
      visitorName: '',
      visitormobilenumber: '',
      visitorcompany: 'N/A',
      visitoraddress: '',
      // visitoremail: '',
      visitorpurpose: '',

    });

  }

  onSubmit() {
   // debugger
    this.buttonDisabled = true;
    var formData = this.visitorsForm.value;
    var vmsData = {
      visitorName: '',
      visitormobilenumber: '',
      visitorcompany: '',
      visitoraddress: '',
      // visitoremail: '',
      visitorpurpose: '',
      visitorOfficeId: '',
      visitorcardnumber: '',
      whommobilenumber: '',
      whomname: '',
      whomdesignation: '',
      whomdepartment: '',
      whomcompany: '',
      visitorImage: '',
      // visitorType: ''
    };

    if (this.visitorsForm.valid) {
      vmsData.visitorcardnumber = formData.card.visitorCardNumber.toString();
      vmsData.visitorName = formData.visitorInfo.visitorName.toString();
      vmsData.visitormobilenumber = formData.visitorInfo.visitorMobileNumber.toString();
      vmsData.visitorcompany = formData.visitorInfo.visitorCompany;
      vmsData.visitoraddress = formData.visitorInfo.visitorAddress;
      // vmsData.visitoremail = formData.visitorInfo.visitorEmail;
      vmsData.visitorpurpose = formData.visitorInfo.visitorPurpose;
      vmsData.visitorOfficeId = formData.visitorInfo.visitorOfficeId;
      vmsData.whommobilenumber = formData.whom.whommobileNumber.toString();
      vmsData.whomname = formData.whom.whomName.toString();
      vmsData.whomdesignation = formData.whom.whomDesignation.toString();
      vmsData.whomdepartment = formData.whom.whomDepartment.toString();
      vmsData.whomcompany = formData.whom.whomCompany.toString();
      vmsData.visitorImage = formData.whom.visitorImage.toString();
      // vmsData.visitorType = formData.visitorInfo.visitorType;

      //debugger
      this.service.CreateVMS(vmsData).subscribe(
        (res: any) => {
         // debugger
          
         // window.open("/visitor-manage/visitor-info-list", '_blank');
          this.onClear();
          this.step = 1;
          this.LoadVMSEmplyeeListNewForVisitor();
          this.LoadVMSEmplyeeListForWhom();/*Internal*/
          this.LoadVMSEmplyeeContactList();/*HR-contact*/
          this.LoadVMSExternalEmplyeeList();/*External*/
          //($event.target as HTMLButtonElement).disabled = true;
          //this.getAllPendingList.emit(res);
       //   this.router.navigate(['/visitor-manage/visitor-welcome']);
          this.service.GetOnlyPendingList().subscribe((res: any[]) => {
          //  console.log('data', res);
          //  debugger
            this.getAllPendingList.emit(res);
           // this.router.navigate(['/visitor-manage/visitor-info-list']);
            this.router.navigate(['/visitor-manage/visitor-welcome']);
            //this.service.missionApprove = res;
          });
          this.toastr.success("You have successfully Checked-In");
        
        //  this.getOnlyApprovedList.emit(res);

          //this.getProcessData.emit(res);
        },
        (error) => {
          this.toastr.error("Failed To Save, Please Input Correctly ");
          // this.toastr.error(error.error[0], "Vms Entry");
          //window.open("/merchandising/sampledevelopment/" + res, '_blank');
        }
      );
    }
  }

  // onSubmit1(event: any) {
  //   debugger
  //   var formData = this.visitorsForm.value;
  //   //console.log(formData);
  //   var vmsData = {
  //     visitorName: '',
  //     visitormobilenumber: '',
  //     visitorcompany: '',
  //     visitoraddress: '',
  //    // visitoremail: '',
  //     visitorpurpose: '',
  //     visitorOfficeId:'',
  //     visitorcardnumber: '',
  //     whommobilenumber: '',
  //     whomname: '',
  //     whomdesignation: '',
  //     whomdepartment: '',
  //     whomcompany: '',
  //     visitorImage: '',
  //     visitorType: ''
  //   };

  //   if (this.visitorsForm.valid) {
  //     vmsData.visitorcardnumber = formData.card.visitorCardNumber.toString();
  //     vmsData.visitorName = formData.visitorInfo.visitorName.toString();
  //     vmsData.visitormobilenumber = formData.visitorInfo.visitorMobileNumber.toString();
  //     vmsData.visitorcompany = formData.visitorInfo.visitorCompany.toString();
  //     vmsData.visitoraddress = formData.visitorInfo.visitorAddress.toString();
  //     //vmsData.visitoremail = formData.visitorInfo.visitorEmail.toString();
  //     vmsData.visitorpurpose = formData.visitorInfo.visitorPurpose;
  //     vmsData.visitorOfficeId = formData.visitorInfo.visitorOfficeId;
  //     vmsData.whommobilenumber = formData.whom.whommobileNumber.toString();
  //     vmsData.whomname = formData.whom.whomName.toString();
  //     vmsData.whomdesignation = formData.whom.whomDesignation.toString();
  //     vmsData.whomdepartment = formData.whom.whomDepartment.toString();
  //     vmsData.whomcompany = formData.whom.whomCompany.toString();
  //     vmsData.visitorImage = formData.whom.visitorImage.toString();
  //     vmsData.visitorType = formData.visitorInfo.visitorType;

  //     this.service.CreateVMS(vmsData).subscribe(
  //       (res: any) => {

  //         window.open("/visitor-manage/visitor-info-list", '_blank');
  //         this.onClear();
  //         this.LoadVMSEmplyeeListNewForVisitor();
  //         this.LoadVMSEmplyeeListForWhom();/*Internal*/
  //         this.LoadVMSEmplyeeContactList();/*HR-contact*/
  //         this.LoadVMSExternalEmplyeeList();/*External*/

  //       },
  //       (error) => {
  //         // this.toastr.error(error.error[0], "Vms Entry");
  //         //window.open("/merchandising/sampledevelopment/" + res, '_blank');
  //       }
  //     );
  //   }
  // }
  handleImage(webcamImage: WebcamImage): void {
    this.WebcamImage = webcamImage;
    this.visitorsForm.patchValue({
      whom: {
        visitorImage: webcamImage.imageAsDataUrl
      },

    });
  }

  changeOfficialFlag() {
    // this.hidePersonal = false;
    //this.hideExternal = true;
    // this.officialValue = true;
    //this.personalValue = false; 
  }

  changePersonalFlag() {
    //this.hidePersonal = false;
    //this.hideOfficial = true;
    //this.personalValue = true;
    //this.officialValue = false; 

  }
}

