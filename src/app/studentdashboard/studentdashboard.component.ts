import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ExamserviceService} from '../examservice.service';
import Swal from 'sweetalert2';
import { Router} from '@angular/router';
@Component({
  selector: 'app-studentdashboard',
  templateUrl: './studentdashboard.component.html',
  styleUrls: ['./studentdashboard.component.css']
})
export class StudentdashboardComponent implements OnInit {

student:any
studentname:any
data:any
updateexam:any
  constructor(private http:HttpClient,private service:ExamserviceService,private rt:Router) {
   this.student=this.service.studentdata
   this.studentname=this.student[0].student_name
   
   }

  ngOnInit() {
  	this.expireexam()
  }

  
   expireexam(){
  const url="http://localhost:3000/api/updateexpire"

  this.http.get(url).subscribe(res=>{
  this.updateexam=res
  // console.log(this.updateexam)
  })

  }
}
