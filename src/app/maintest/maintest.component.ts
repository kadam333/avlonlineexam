import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ExamserviceService} from '../examservice.service';
import Swal from 'sweetalert2';
import { Router,ActivatedRoute} from '@angular/router';
import {StudentdashboardComponent} from '../studentdashboard/studentdashboard.component';
@Component({
  selector: 'app-maintest',
  templateUrl: './maintest.component.html',
  styleUrls: ['./maintest.component.css']
})
export class MaintestComponent implements OnInit {
sdata:any
examdata:any
  constructor(private http:HttpClient,private service:ExamserviceService,private rt:Router) { }

  ngOnInit() {
  this.sdata=this.service.studentdata

  // console.log(this.sdata)
  this.getdata()
  }

  getdata(){
   	const url="http://localhost:3000/api/getexamdata"

   const httpoption={headers:new HttpHeaders ({'content-type' : 'application/json'}) };

   	this.http.post(url,this.sdata,httpoption).subscribe(res=>{
        this.examdata=res;
        // console.log(this.examdata)
   	})
   }

   sendexamcode(examcode){
    console.log(examcode) 
     this.service.examqu(examcode).subscribe(res=>{
   
        })
      } 
}
