import { Component, OnInit } from '@angular/core';
import { AdmindashboardComponent } from '../admindashboard/admindashboard.component';
import {FormBuilder,Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ExamserviceService} from '../examservice.service';
import Swal from 'sweetalert2';
import {Router,ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-exam-questions',
  templateUrl: './exam-questions.component.html',
  styleUrls: ['./exam-questions.component.css']
})
export class ExamQuestionsComponent implements OnInit {

ecode:any
questiondata:any
  constructor(private http:HttpClient,private fb:FormBuilder,private service:ExamserviceService,private rt:Router) {
this.questiondata=JSON.parse(localStorage.getItem('data'))
 console.log(this.questiondata)
   }

  ngOnInit() {
  	this.ecode=this.questiondata[0].exam_code
  	console.log(this.ecode)
  }

  editquestion(data){
  this.service.editquestion(data).subscribe(res=>{
    
  })
  }

}
