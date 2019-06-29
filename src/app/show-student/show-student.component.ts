import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ExamserviceService} from '../examservice.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-show-student',
  templateUrl: './show-student.component.html',
  styleUrls: ['./show-student.component.css']
})
export class ShowStudentComponent implements OnInit {

  constructor(private http:HttpClient,private service:ExamserviceService,private rt:Router) { }

studentlist:any
status:any
  ngOnInit() {
  	const url="http://localhost:3000/api/studentlist"
  	this.http.get(url).subscribe(res=>{
   this.studentlist=res;
   console.log(this.studentlist)
  	})
  }


// for activating deactivating status
   studentstatus(sid,status){
   console.log(sid,status)

   if (status==1) {
   	const url="http://localhost:3000/api/sactivate"
   	const httpoption={headers:new HttpHeaders ({'content-type':'application/json'}) };
   
    this.http.post(url,{id:sid},httpoption).subscribe(res=>{
    this.status=res

    if (this.status.status == true) {
            Swal.fire(
          'Activated',
          'Student Activated',
          'success'
            )
            this.rt.navigateByUrl('', {skipLocationChange: true}).then(()=>
            this.rt.navigate(['studentdata'])); 
          }

         else{
             Swal.fire({title:'Error',text:'Activation failed',type:"error"})
          }  
    })
   } 

   else if (status==0) {  
    const url="http://localhost:3000/api/sdeactivate"
   	const httpoption={headers:new HttpHeaders ({'content-type':'application/json'}) };
   
    this.http.post(url,{id:sid},httpoption).subscribe(res=>{
    this.status=res

    if (this.status.status == true) {
            Swal.fire(
          'DEACTIVATED',
          'Student Dectivated',
          'success'
            )
            this.rt.navigateByUrl('', {skipLocationChange: true}).then(()=>
            this.rt.navigate(['studentdata'])); 
          }

         else{
             Swal.fire({title:'Error',text:'Activation failed',type:"error"})
          }  
    })
   }

  }

}
