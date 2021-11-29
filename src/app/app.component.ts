
import { Component, ViewChild, ElementRef, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Data } from '@angular/router';
import { groupBy } from 'rxjs/internal/operators/groupBy';
import { CommonResponse, StateCity } from './Model/student-service.service';
import { StudentServiceService } from './service/student-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Student';
  studentForm;
  stateForm;
  cityForm;

  States: any[];
  _City: any[];
  sampleform: FormGroup; 
  @ViewChild('closebutton') closebutton;
  constructor(private formBuilder: FormBuilder, private StudentService: StudentServiceService) {
    this. sampleform = formBuilder.group({  
      'StateID': [null]   // will use the property in html page  
      }) 
    this.studentForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      password: [''],
      address: [''],
      stateid: [0],
      statename: [''],
      cityid: [0],
      cityname: [''],
      zipcode: [0],
      checkout: [0],
    });
    this.stateForm = this.formBuilder.group({
      StateName: [''],
    });
    this.cityForm = this.formBuilder.group({
      StateID: [0],
      CityName: [''],
    });
  }
//#region  Student
  get firstname() {
    return this.studentForm.get('firstname');
  }

  get lastname() {
    return this.studentForm.get('lastname');
  }

  get email() {
    return this.studentForm.get('email');
  }

  get password() {
    return this.studentForm.get('password');
  }

  get address() {
    return this.studentForm.get('address');
  }

  get stateid() {
    return this.studentForm.get('stateid');
  }

  get statename() {
    return this.studentForm.get('statename');
  }

  get cityid() {
    return this.studentForm.get('cityid');
  }
  get zipcode() {
    return this.studentForm.get('zipcode');
  }

  get checkout() {
    return this.studentForm.get('checkout');
  }
  //#region state
  get StateName() {
    return this.stateForm.get('StateName');
  }

  //#region  City

  get StateID() {
    return this.cityForm.get('StateID');
  }
  get CityName() {
    return this.cityForm.get('CityName');
  }
  ngOnInit(): void {
    
   this.getstate();
  }
  getstate(){
    this.StudentService.GetState().subscribe(res=>{
      this.States = JSON.parse(JSON.stringify(res));
    });
  }

  onStateChange(StateID:string)
  {
    debugger;
    this.StudentService.GetCity(StateID).subscribe(res=>{
      this._City = JSON.parse(JSON.stringify(res));
    });
  }
  onSubmit() {
    this.StudentService.AddStudent(this.studentForm.value).subscribe(res => {
      if (res.statusCode > 0) {
        this.studentForm.reset();
        this.closebutton.nativeElement.click();
        alert(res.msg);
      }
      else {
        this.studentForm.reset();
        this.closebutton.nativeElement.click();
        alert(res.msg);
      }
    });
  }
  AddState() {
    this.StudentService.AddState(this.stateForm.value).subscribe(res => {
      if (res.statusCode > 0) {
        this.stateForm.reset();
        this.closebutton.nativeElement.click();
        alert(res.msg);
      }
      else {
        alert(res.msg);
      }
    });
  }
  AddCity() {
    this.StudentService.AddCity(this.cityForm.value).subscribe(res => {
      if (res.statusCode > 0) {
        this.cityForm.reset();
        this.closebutton.nativeElement.click();
         document.getElementById("CityModalClose")?.click();
        alert(res.msg);
      }
      else {
        alert(res.msg);
      }
    });
  }

}




