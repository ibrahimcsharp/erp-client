import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonServiceService } from 'src/app/components/merchandising/Common-Services/common-service.service';
import { VehicleManageService } from '../../service/vehicle-manage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.scss']
})
export class RentalComponent implements OnInit {

  RentalExpenseForm: FormGroup;
  ButtonName:string;
  noResult:boolean;
  constructor(public commonService: CommonServiceService,
    private fb: FormBuilder,
    public service: VehicleManageService,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.InitializeForm();
  }

  InitializeForm(){
  }

  Onsubmit(){
  }

  clear(){
  }

}
