import { Component, OnInit } from '@angular/core';
import { AdmindashboardComponent } from '../admindashboard/admindashboard.component';
import {FormBuilder,Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ExamserviceService} from '../examservice.service';
import Swal from 'sweetalert2';
import {Router,ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-editquestion',
  templateUrl: './editquestion.component.html',
  styleUrls: ['./editquestion.component.css']
})
export class EditquestionComponent implements OnInit {

questionid:any
question:any
submitted=false;
status:any
  constructor(private http:HttpClient,private fb:FormBuilder,private service:ExamserviceService,private rt:Router) { }

  ngOnInit() {
  	this.questionid=JSON.parse(localStorage.getItem('data'))
  	console.log(this.questionid)


  	this.question=this.fb.group({
  		examcode:[''],
  		qid:[''],
  		mainquestion:['',[Validators.required,Validators.maxLength(250)]],
  		optionA:['',[Validators.required,Validators.maxLength(40)]],
  		optionB:['',[Validators.required,Validators.maxLength(40)]],
  		optionC:['',[Validators.required,Validators.maxLength(40)]],
  		optionD:['',[Validators.required,Validators.maxLength(40)]],
  		answer:['',[Validators.required]]
  	})

  	this.question.patchValue({
  		examcode:this.questionid[0].exam_code,
  		qid:this.questionid[0].question_id,
  		mainquestion:this.questionid[0].question,
  		optionA:this.questionid[0].option_a,
  		optionB:this.questionid[0].option_b,
  		optionC:this.questionid[0].option_c,
  		optionD:this.questionid[0].option_d,
  		answer:this.questionid[0].answer
  	})
  }

  get f() { return this.question.controls; }

  // updatequestion
  updatequestion(){

    this.submitted = true;

        // stop here if form is invalid
        if (this.question.invalid) {
           Swal.fire({title:'Warning',text:'Please enter the required field',type:"warning"})
            return;
        }
        
  	const url="http://localhost:3000/api/updatequestion"

    const httpoption={headers:new HttpHeaders ({'content-type':'application/json'}) };
    this.http.post(url,this.question.value,httpoption).subscribe(res=>{
    	this.status=res;
    	  if(this.status.status == true){
       Swal.fire({title:'Success',text:'Question updated succesfully',type:"success"})
       this.rt.navigate(['/examquestion'])
     }
     else{
        Swal.fire({title:'Error',text:'Question updation failed',type:"error"})
     }
        })
  }

}
