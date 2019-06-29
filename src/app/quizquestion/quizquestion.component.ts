import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ExamserviceService} from '../examservice.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-quizquestion',
  templateUrl: './quizquestion.component.html',
  styleUrls: ['./quizquestion.component.css']
})
export class QuizquestionComponent implements OnInit {

question:any
ques:any
index:any
  constructor(private http:HttpClient,private service:ExamserviceService) { }

  ngOnInit() {
  	this.question=JSON.parse(localStorage.getItem('data'))
  	console.log(this.question)

    this.ques=this.question
    console.log(this.ques)
  }

  
  qid(data,index){
   console.log(data)
   this.index=index
   const url="http://localhost:3000/api/quid"

    const httpoption={headers:new HttpHeaders ({'content-type':'application/json'}) };
    this.http.post(url,{id:data},httpoption).subscribe(res=>{
      this.ques=res;
      console.log(this.ques)
       })
  }

  answer(value,qid){
  	console.log(value,qid)
  }

}
