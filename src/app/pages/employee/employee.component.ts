import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { EmployeeData} from './employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  formValue!: FormGroup;
  allEmployeeData: any;
  employeeModel: EmployeeData = new EmployeeData;


  constructor(private formBuilder:FormBuilder, private api:ApiService) { }


  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      username: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      birthDate: [''],
      basicSalary: [''],
      status: [''],
      group: [''],
      description: ['']
    })
    this.getAllData()
  }

  getAllData(){
    this.api.getData().subscribe(res=>{
      this.allEmployeeData = res;
    })
  }

  addData(){
    this.employeeModel.username = this.formValue.value.username;
    this.employeeModel.firstName = this.formValue.value.firstName;
    this.employeeModel.lastName = this.formValue.value.lastName;
    this.employeeModel.email = this.formValue.value.email;
    this.employeeModel.birthDate = this.formValue.value.birthDate;
    this.employeeModel.basicSalary = this.formValue.value.basicSalary;
    this.employeeModel.status = this.formValue.value.status;
    this.employeeModel.group = this.formValue.value.group;
    this.employeeModel.description = this.formValue.value.description;

    this.api.postData(this.employeeModel).subscribe(res=>{
      console.log(res);
      alert("data berhasil di input");
      this.formValue.reset()
      this.getAllData()
    },
    err=>{
      alert("data gagal di input");
    })
  }


  deleteData(data:any){
    this.api.deleteData(data.id).subscribe(res=>{
      alert("data berhasil di hapus");
      this.getAllData()
    })
  }

}
