import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ExamserviceService} from '../examservice.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-expireexam',
  templateUrl: './expireexam.component.html',
  styleUrls: ['./expireexam.component.css']
})
export class ExpireexamComponent implements OnInit {
examdata:any
  constructor(private http:HttpClient,private service:ExamserviceService,private rt:Router) { }

  ngOnInit() {

  		this.service.showexpireexam().subscribe(res=>{
  		this.examdata=res
  		console.log(this.examdata)
  	})
  }

}
