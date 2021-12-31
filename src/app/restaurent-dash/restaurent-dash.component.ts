import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './reataurent.model';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.scss']
})
export class RestaurentDashComponent implements OnInit {

  formValue!: FormGroup
  restaurentModelObj :RestaurantData = new RestaurantData;
  allRestaurantData: any

  constructor(private formBuilder:FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })
    this.getAllData()
  }

  addResto(){
      this.restaurentModelObj.name = this.formValue.value.name;
      this.restaurentModelObj.email = this.formValue.value.email;
      this.restaurentModelObj.mobile = this.formValue.value.mobile;
      this.restaurentModelObj.address = this.formValue.value.address;
      this.restaurentModelObj.services = this.formValue.value.services;

      this.api.postData(this.restaurentModelObj).subscribe(res=>{
        console.log(res);
        alert("data berhasil di input");
        this.formValue.reset()
        this.getAllData()
      },
      err=>{
        alert("data gagal di input");
      }
      )

  }

  getAllData(){
    this.api.getData().subscribe(res=>{
      this.allRestaurantData = res;
    })
  }

  deleteResto(data:any){
    this.api.deleteData(data.id).subscribe(res=>{
      alert("data berhasil di hapus");
      this.getAllData()
    })
  }

  onEditResto(data:any){
    this.restaurentModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }

  updateResto(){
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.updateData(this.restaurentModelObj, this.restaurentModelObj.id).subscribe(res=>{
      alert("data berhasil di update");
      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset();
      this.getAllData();
    })
  }
  

}
