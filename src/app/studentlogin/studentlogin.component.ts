import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ExamserviceService} from '../examservice.service';
import Swal from 'sweetalert2';
import { Router} from '@angular/router';
import { MustMatch } from '../must-match.validators';
@Component({
  selector: 'app-studentlogin',
  templateUrl: './studentlogin.component.html',
  styleUrls: ['./studentlogin.component.css']
})
export class StudentloginComponent implements OnInit {
coursedata:any
studentregister:any
submitted=false;
status:any
submitted1=false;
loginForm:any
  constructor(private fb:FormBuilder,private http:HttpClient,private service:ExamserviceService,private rt:Router) { }

  ngOnInit() {
  	this.studentregister=this.fb.group({
  		sname:['',Validators.required],
  		email:['',[Validators.required,Validators.email]],
  		course:[''],
  		password:['',[Validators.required, Validators.minLength(6)]],
  		cpassword:['']
  	},
  	{
     validator:MustMatch('password', 'cpassword')
  	});

  	this.service.showcourse().subscribe(res=>{
    this.coursedata=res;
  	})

  	this.loginForm=this.fb.group({
  	 	 email: ['', [Validators.required, Validators.email]],
  	 	 password: ['', [Validators.required]],
  	 })
  }


  get f() { return this.studentregister.controls; }



 // students register
  onregister(){
  	this.submitted = true;

	   if (this.studentregister.invalid) {
	   	 Swal.fire({title:'Error',text:'Please enter the required field',type:"error"})
            return;
        }
        
        this.service.registerstudent(this.studentregister.value).subscribe(res=>{
        	this.status=res
        	console.log(this.status)
           if(this.status.status == true){
			   Swal.fire({title:'Success',text:'Registration successfull',type:"success"})
			   this.studentregister.reset()
            }
     else{
        Swal.fire({title:'Error',text:'Registration failed',type:"error"})
     }
        })
     }

   onLogin(){ 
   	this.submitted1=true

   	 if (this.loginForm.invalid) {
	   	 Swal.fire({title:'Error',text:'Please enter the required field',type:"error"})
            return;
        }

        this.service.loginstudent(this.loginForm.value).subscribe(res=>{
        	
        })
   }
}
