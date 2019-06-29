import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ExamserviceService} from '../examservice.service';
import Swal from 'sweetalert2';
import { Router} from '@angular/router';
import { MustMatch } from '../must-match.validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
facultyregister:any
submitted=false; 
submitted1=false; 
status:any
loginForm:any
result:any
email:any

mailstatus:any
sendstatus:any
  constructor(private fb:FormBuilder,private http:HttpClient,private service:ExamserviceService,private rt:Router) {
    // this.count()
   }

  ngOnInit() {
      if(localStorage.getItem('isLoggedin') == 'true'){
      this.rt.navigate(['admindashboard'])
    }
  	 this.facultyregister = this.fb.group({
  	 	    email: ['', [Validators.required, Validators.email]],
            name: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            cpassword: ['', Validators.required]
        }, 
        {
            validator: MustMatch('password', 'cpassword')
        });

  	 this.loginForm=this.fb.group({
  	 	 email: ['', [Validators.required, Validators.email]],
  	 	 password: ['', [Validators.required]],
  	 })
  }

   get f() { return this.facultyregister.controls; }


// register faculty
onRegister(){ 
	 this.submitted = true;

	   if (this.facultyregister.invalid) {
	   	 Swal.fire({title:'Error',text:'Please enter the required field',type:"error"})
            return;
        }
   this.service.Post("registerfaculty",this.facultyregister.value).subscribe(res=>{
   	this.status=res;
   	 if(this.status.status == true){
         this.mailstatus=this.status.status
         console.log(this.mailstatus)
         this.mailsending()
       Swal.fire({title:'Success',text:'Registration succesfull',type:"success"})
       this.facultyregister.reset()
     }
     else{
        Swal.fire({title:'Error',text:'Registration failed',type:"error"})
     }
   })
        
}


// login Faculty 
onLogin(){
 this.submitted1 = true;
 if (this.loginForm.invalid) {
 	  Swal.fire({title:'Error',text:'Please enter the required field',type:"error"})
            return;
        }
         
        this.service.Post("login",this.loginForm.value).subscribe(res=>{
        	this.result=res;
          console.log(this.result,this.result.data[0].faculty_id,this.result.status)
          if(this.result.status == true){
            
           localStorage.setItem('logindata',JSON.stringify(this.result))
          localStorage.setItem('id',this.result.data[0].faculty_id)
          localStorage.setItem('email',this.result.data[0].email_id)
          localStorage.setItem('isLoggedin','true')
        	
        
         Swal.fire({title:'Success',text:''+this.result.msg+'',type:"success"})
           this.rt.navigate(['/admindashboard'])
          }
          else{
              Swal.fire({title:'Error',text:''+this.result.msg+'',type:"error"})
               this.rt.navigate(['/login'])
          }
         
        })

}

mailsending(){
  // console.log(this.facultyregister.value)
  const url="http://localhost:3000/api/mailing"
  const httpoption={headers:new HttpHeaders ({'content-type':'application/json'}) };

  this.http.post(url,this.facultyregister.value,httpoption).subscribe(res=>{
  this.email=res

  if(this.email.sent == true){
  this.sendstatus=this.email.sent
  this.mailstatus=false
console.log(this.sendstatus)
     Swal.fire({title:'Success',text:'Registration successfull Email Sent ',type:"success"})
  }
  else{
        Swal.fire({title:'Error',text:'Registration failed',type:"error"})
     }
  console.log(this.email)
  })
}
          


}
