import { Component, OnInit } from '@angular/core';
import { AdmindashboardComponent } from '../admindashboard/admindashboard.component';
import {FormBuilder,Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ExamserviceService} from '../examservice.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-setquestion',
  templateUrl: './setquestion.component.html',
  styleUrls: ['./setquestion.component.css']
})
export class SetquestionComponent implements OnInit {
examdata:any
question:any
status:any
submitted=false;


  constructor(private http:HttpClient,private fb:FormBuilder,private service:ExamserviceService) {
  this.examdata=this.service.getexamdata
   }

  ngOnInit() {
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
  	})

  	this.question.patchValue({
  		coursename:this.examdata[0].course,
  		examcode:this.examdata[0].exam_code,
  		totalquestion:this.examdata[0].total_questions,
  		subjectname:this.examdata[0].subject,
  		examname:this.examdata[0].exam_name,
  		date:this.examdata[0].exam_date
  	})
  }
  
  
   get f() { return this.question.controls; }




  
  questiondata(){
  	console.log(this.question.value)
     
    this.submitted = true;

 	 // stop here if form is invalid
        if (this.question.invalid) {
           Swal.fire({title:'Warning',text:'Please enter the required field',type:"warning"})
            return;
        } //ENDING
         
  	this.service.insertquestion(this.question.value).subscribe(res=>{
    this.status=res
    
    if (this.status.status == true) {
    	Swal.fire({title:'Success',text:'Question Inserted succesfully',type:"success"})
        // this.question.reset();
        this.question=this.fb.group({
        	mainquestion:null,
            optionA:null,
            optionB:null,
            optionC:null,
            optionD:null,
            answer:null

        })

        
    }
    else{
    	Swal.fire({title:'Error',text:'Question Insertion failed',type:"error"})
    }

  	})
  }//ending

}
