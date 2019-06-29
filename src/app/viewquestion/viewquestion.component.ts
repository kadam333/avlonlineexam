import { Component, OnInit } from '@angular/core';
import { AdmindashboardComponent } from '../admindashboard/admindashboard.component';
import {FormBuilder,Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ExamserviceService} from '../examservice.service';
import Swal from 'sweetalert2';
import {Router,ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-viewquestion',
  templateUrl: './viewquestion.component.html',
  styleUrls: ['./viewquestion.component.css']
})
export class ViewquestionComponent implements OnInit {
examdetails:any
  constructor(private http:HttpClient,private fb:FormBuilder,private service:ExamserviceService,private rt:Router) { }


  ngOnInit() {
  	this.service.completeexam().subscribe(res=>{
  		this.examdetails=res
  		console.log(this.examdetails)
  	})
  }

 // gettingexamcode
 sendexamcode(examcode){
 console.log(examcode) 
 this.service.qexamcode(examcode).subscribe(res=>{
   
 })
 }



}
