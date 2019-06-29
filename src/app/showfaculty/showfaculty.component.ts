import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ExamserviceService} from '../examservice.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-showfaculty',
  templateUrl: './showfaculty.component.html',
  styleUrls: ['./showfaculty.component.css']
})
export class ShowfacultyComponent implements OnInit {

facultylist:any
status:any

  constructor(private http:HttpClient,private service:ExamserviceService,private rt:Router) { }

  ngOnInit() {
  	const url="http://localhost:3000/api/facultylist"
  	this.http.get(url).subscribe(res=>{
   this.facultylist=res;
   console.log(this.facultylist)
  	})
  }
   

  // ===================activate/deactive student=============================

  facultystatus(fid,status){

   if (status==1) {
   	const url="http://localhost:3000/api/factivate"
   	const httpoption={headers:new HttpHeaders ({'content-type':'application/json'}) };
   
    this.http.post(url,{id:fid},httpoption).subscribe(res=>{
    this.status=res

    if (this.status.status == true) {
            Swal.fire(
          'Activated',
          'Faculty Activated',
          'success'
            )
            this.rt.navigateByUrl('', {skipLocationChange: true}).then(()=>
            this.rt.navigate(['facultydata'])); 
          }

         else{
             Swal.fire({title:'Error',text:'Activation failed',type:"error"})
          }  
    })
   }

    else if(status==2){
    	const url="http://localhost:3000/api/fdactivate"
   	const httpoption={headers:new HttpHeaders ({'content-type':'application/json'}) };
   
    this.http.post(url,{id:fid},httpoption).subscribe(res=>{
    this.status=res

    if (this.status.status == true) {
            Swal.fire(
          'Deactivated',
          'Faculty Activated',
          'success'
            )
            this.rt.navigateByUrl('', {skipLocationChange: true}).then(()=>
            this.rt.navigate(['facultydata'])); 
          }

         else{
             Swal.fire({title:'Error',text:'Activation failed',type:"error"})
          }  
    })
    } 
  }


}
