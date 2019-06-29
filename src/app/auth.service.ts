import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'
import {ExamserviceService} from './examservice.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 loginStatus:any
   constructor(private http: HttpClient,private rt: Router,private service:ExamserviceService) { }



 /*  let status = false;
   const httpOptions={headers:new HttpHeaders({'Content-Type': 'application/json'})}
   if(localStorage.getItem('isLoggedin') == 'true'){
     status=true;
     var data={'faculty_id':localStorage.getItem('id'),'email':localStorage.getItem('email')}
     this.service.Post("isloggedin",data).subscribe(res=>{
     })
     
   }
   else{
      status=false;
   }
   return status;*/ 
   getToken() {
    return localStorage.getItem("isLoggedin")
  }
  isLoggedIn() {
    return this.getToken() !== null;
 }
}
