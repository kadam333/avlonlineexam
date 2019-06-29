import { Component, OnInit } from '@angular/core';
import { AdmindashboardComponent } from '../admindashboard/admindashboard.component';
import {FormBuilder,Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ExamserviceService} from '../examservice.service';
import Swal from 'sweetalert2';
import {Router,ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-question-set',
  templateUrl: './question-set.component.html',
  styleUrls: ['./question-set.component.css']
})
export class QuestionSetComponent implements OnInit {
examdata:any
question:any
status:any
submitted=false
public qcount=0;
qcount1:any
status1:any
  constructor(private http:HttpClient,private fb:FormBuilder,private service:ExamserviceService,private rt:Router) {
  this.examdata=this.service.getexamdata
   }

  ngOnInit() {
      this.qcount1=this.examdata[0].total_questions

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
  		coursename:this.examdata[0].course,
  		examcode:this.examdata[0].exam_code,
  		totalquestion:this.examdata[0].total_questions,
  		subjectname:this.examdata[0].subject,
  		examname:this.examdata[0].exam_name,
  		date:this.examdata[0].exam_date
      // leftquestion:this.examdata[0].total_questions
  	})
  }


  // questioncounting
  check(){
    this.qcount++
    console.log(this.qcount)
   if (this.qcount==1) {
      this.incompletestatus()
   }

      else if (this.qcount == this.qcount1) {
        this.questiondata()
        alert("Good Job All Questions Entered")
        this.questionstatus()
        this.updatestatus()
        this.rt.navigate(['/viewquestion'])
      }
  }
  
  
    //validation
    get f() { return this.question.controls; }

   //changethestatus 
   updatestatus(){
      this.service.updateexamstatus(this.question.value).subscribe(res=>{
         this.status1=res;
     })
   } 
  
   //changethestatus=(incomplete)
   incompletestatus(){
      const url="http://localhost:3000/api/icstatus"
      
       const httpoption={headers:new HttpHeaders ({'content-type':'application/json'}) };

       this.http.post(url,this.question.value).subscribe(res=>{

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
// formending
