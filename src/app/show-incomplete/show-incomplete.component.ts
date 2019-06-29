import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ExamserviceService} from '../examservice.service';
import Swal from 'sweetalert2';
import {Router,ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-show-incomplete',
  templateUrl: './show-incomplete.component.html',
  styleUrls: ['./show-incomplete.component.css']
})
export class ShowIncompleteComponent implements OnInit {
examdata:any
data:any
submitted=false
question:any
qcount:any
totalque:any
status:any
status1
  constructor(private http:HttpClient,private fb:FormBuilder,private service:ExamserviceService,private rt:Router) { }

  ngOnInit() {
  	this.examdata=JSON.parse(localStorage.getItem('data'))
  	console.log(this.examdata)

    this.qcount=this.examdata[0].ID
    this.totalque=this.examdata[0].total_questions
  	this.question=this.fb.group({
  		coursename:[''],
  		examcode:[''],
  		totalquestion:[''],
  		subjectname:[''],
  		examname:[''],
  		mainquestion:['',[Validators.required,Validators.maxLength(250)]],
  		date:[''],
  		optionA:['',[Validators.required,Validators.maxLength(40)]],
  		optionB:['',[Validators.required,Validators.maxLength(40)]],
  		optionC:['',[Validators.required,Validators.maxLength(40)]], 
  		optionD:['',[Validators.required,Validators.maxLength(40)]],
  		answer:['',[Validators.required]]
      // leftquestion:['']
  	})

  	this.question.patchValue({
  		coursename:this.examdata[0].course_name,
  		examcode:this.examdata[0].exam_code,
  		totalquestion:this.examdata[0].total_questions,
  		subjectname:this.examdata[0].subject_name,
  		examname:this.examdata[0].exam_name,
  		date:this.examdata[0].exam_date
      // leftquestion:this.examdata[0].total_questions
  	})
  }
 get f() { return this.question.controls; }
  
  
   // questioncounting
  check(){
    this.qcount++
    console.log(this.qcount)
      if (this.qcount > this.totalque) {
        alert("Good Job All Questions Entered")
        this.questionstatus()
        this.updatestatus()
        this.rt.navigate(['/viewquestion'])
      }
  }

  //changethestatus 
   updatestatus(){
      this.service.updateexamstatus(this.question.value).subscribe(res=>{
         this.status1=res;
     })
   } 
   
   // question status=1
     questionstatus(){
      const url="http://localhost:3000/api/qstatus"
      
       const httpoption={headers:new HttpHeaders ({'content-type':'application/json'}) };

       this.http.post(url,this.question.value).subscribe(res=>{

       })
   }

  //formdatainsert
  questiondata(){
     this.submitted = true;
     
    // stop here if form is invalid
        if (this.question.invalid) {
           Swal.fire({title:'Warning',text:'Please enter the required field',type:"warning"})
            return;
        } //ENDING

     this.service.insertquestion(this.question.value).subscribe(res=>{
       this.status=res

       if (this.status.status == true) {
         Swal.fire({title:'Success',text:' Question Added',type:"success"})
         this.question.patchValue({
          mainquestion:null,
            optionA:null,
            optionB:null,
            optionC:null,
            optionD:null,
            answer:null
           
        })
         
       }
       else{
       Swal.fire({title:'Error',text:'Exam creation failed',type:"error"})
       }

     })
   }

}
  