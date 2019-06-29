import { Component, OnInit } from '@angular/core';
import { AdmindashboardComponent } from '../admindashboard/admindashboard.component';
import {FormBuilder,Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ExamserviceService} from '../examservice.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-editcourse',
  templateUrl: './editcourse.component.html',
  styleUrls: ['./editcourse.component.css']
})
export class EditcourseComponent implements OnInit {

category:any
data:any
data1:any
status:any
submitted=false;

  constructor(private fb:FormBuilder,private http:HttpClient,private service:ExamserviceService,private rt:Router) {
this.data=this.service.data
   } 

  ngOnInit() {
  	this.category=this.fb.group({
  		cid:[''],
  		cname:['',[Validators.required,Validators.maxLength(100)]]
  	})

    	this.data1=JSON.parse(localStorage.getItem('data'))

    	this.category.setValue({
    		cid:this.data1[0].course_id,
    		cname:this.data1[0].course_name
    	})
  }

  get f() { return this.category.controls; }

  editcategorydata(){

    this.submitted = true;

        // stop here if form is invalid
        if (this.category.invalid) {
           Swal.fire({title:'Warning',text:'Please enter the required field',type:"warning"})
            return;
        }
        
  	const url="http://localhost:3000/api/updatecoursedata"

    const httpoption={headers:new HttpHeaders ({'content-type':'application/json'}) };
    this.http.post(url,this.category.value,httpoption).subscribe(res=>{
    	this.status=res;
    	  if(this.status.status == true){
       Swal.fire({title:'Success',text:'Course updated succesfully',type:"success"})
       this.rt.navigate(['/categorylist'])
     }
     else{
        Swal.fire({title:'Error',text:'Course updation failed',type:"error"})
     }
        })
  }


}
