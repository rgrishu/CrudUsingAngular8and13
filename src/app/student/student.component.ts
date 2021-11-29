import { ThrowStmt } from '@angular/compiler';

import { Component, ViewChild, ElementRef, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Data } from '@angular/router';
import { groupBy } from 'rxjs/internal/operators/groupBy';
import { CommonResponse, StateCity } from '../Model/student-service.service';
import { StudentServiceService } from '../service/student-service.service';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
 
  Students:any[];
  constructor( private StudentService: StudentServiceService) {
    
   }

  ngOnInit(): void {
   this.getStudent();
   
  }

  getStudent(){
    this.StudentService.GetStudent("0").subscribe(res=>{
      this.Students = JSON.parse(JSON.stringify(res));
    });
  }

  EditStudent(id:string){
      this.StudentService.GetStudent(id).subscribe(res=>{
        
      });
  }
  DeleteStudent(id:string){
    if(confirm("Are you sure to delete ")) {
      this.StudentService.DeleteStudent(id).subscribe(res=>{
        if (res.statusCode > 0) {
          this.getStudent();
          alert(res.msg);
        }
        else {
          alert(res.msg);
        }
      });
    }
  }
 
}
