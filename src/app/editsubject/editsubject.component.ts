import { Component, OnInit } from '@angular/core';
import { AdmindashboardComponent } from '../admindashboard/admindashboard.component';
import {FormBuilder,Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ExamserviceService} from '../examservice.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-editsubject',
  templateUrl: './editsubject.component.html',
  styleUrls: ['./editsubject.component.css']
})
export class EditsubjectComponent implements OnInit {

data:any
data1:any
subject:any
status:any
coursedata:any
submitted=false;


  constructor(private http:HttpClient,private service:ExamserviceService,private rt:Router,private fb:FormBuilder) {
  	this.data=this.service.subjectdata
  }

  ngOnInit() {

   this.subject=this.fb.group({
   	cname:['',[Validators.required]],
   	sid:[''],
   	sname:['',[Validators.required,Validators.maxLength(100)]]
   })

  this.service.showcourse().subscribe(res=>{
        this.coursedata=res;
      })
  this.data1=JSON.parse(localStorage.getItem('data'))

   this.subject.setValue({
   	cname:this.data1[0].course_name,
   	sid:this.data1[0].subject_id,
   	sname:this.data1[0].subject_name
   })
  }
  
  get f() { return this.subject.controls; }

  //updatesubject
  editsubjectdata(){
  
  this.submitted = true;

        // stop here if form is invalid
        if (this.subject.invalid) {
           Swal.fire({title:'Warning',text:'Please enter the required field',type:"warning"})
            return;
        }

  	const url='http://localhost:3000/api/updatesubject'

  	const httpoption={headers:new HttpHeaders ({'content-type':'application/json'}) };

  	this.http.post(url,this.subject.value,httpoption).subscribe(res=>{
  		this.status=res;
  		if(this.status.status==true){
  			Swal.fire({title:'Success',text:'subject updated succesfully',type:"success"})
       this.rt.navigate(['/subcategorylist'])
  		}
  		else
  		{
  			Swal.fire({title:'Error',text:'subject updation failed',type:"error"})
  		}
  	})
  }

}
