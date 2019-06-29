import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router ,CanActivateChild} from '@angular/router';
//import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
//import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import { ExamserviceService } from './examservice.service';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  status:any;
	  constructor(private auth: AuthService, 
    private router: Router,
    private exam: ExamserviceService) {

  }
  canActivate(
     next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      //debugger
      if(this.auth.isLoggedIn()){
      return true;
    }
    else{
      this.router.navigate(["/login"]);
      return false;
    }
   /*    var data={'faculty_id':localStorage.getItem('id'),'email':localStorage.getItem('email')}
     this.exam.Post("isloggedin",data).subscribe(res=>{
       this.status=res
       if(this.status.status == false){
         localStorage.clear();
         this.router.navigate(['/login'])
         return false;
       }
     })*/
     
 /*alert("hello")
      return true;*/
    
  }
}
