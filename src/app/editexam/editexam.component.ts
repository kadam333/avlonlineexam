import { Component, OnInit } from '@angular/core';
import { AdmindashboardComponent } from '../admindashboard/admindashboard.component';
import {FormBuilder,Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ExamserviceService} from '../examservice.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-editexam',
  templateUrl: './editexam.component.html',
  styleUrls: ['./editexam.component.css']
})
export class EditexamComponent implements OnInit {
submitted=false;
editdata:any
status:any
exameditdata:any
  constructor(private http:HttpClient,private service:ExamserviceService,private rt:Router,private fb:FormBuilder) {
   this.editdata=this.service.editexamdata

   console.log(this.editdata)
   }

  ngOnInit() {

  	this.exameditdata=this.fb.group({
     course:[''],
     examcode:[''],
     totalquestion:['',[Validators.required,Validators.maxLength(2)]],
     examname:['',[Validators.required,Validators.maxLength(100)]], 
     date:['',[Validators.required]],
     timeduration:['',[Validators.required,Validators.maxLength(2)]],
     passingmarks:['',[Validators.required,Validators.maxLength(2)]],
     subject:['']
  	})

  this.exameditdata.setValue({
    		course:this.editdata[0].course,
    		examcode:this.editdata[0].exam_code,
    		totalquestion:this.editdata[0].total_questions,
    		examname:this.editdata[0].exam_name,
    		date:this.editdata[0].exam_date,
    		timeduration:this.editdata[0].total_min,
    		passingmarks:this.editdata[0].passing_marks,
    		subject:this.editdata[0].subject
   })
  }
  
  get f() { return this.exameditdata.controls; }

  //updateexam
  editexamdata(){
    this.submitted = true;

    // stop here if form is invalid
        if (this.exameditdata.invalid) {
           Swal.fire({title:'Warning',text:'Please enter the required field',type:"warning"})
            return;
        } //ENDING
        
  	const url="http://localhost:3000/api/updateexam"

  	const httpoption={headers:new HttpHeaders ({'content-type':'application/json'}) };

  	this.http.post(url,this.exameditdata.value,httpoption).subscribe(res=>{
  		this.status=res;

  		 if(this.status.status == true){
       Swal.fire({title:'Success',text:'Set Exam updated succesfully',type:"success"})
       this.rt.navigate(['/showsetexam'])
     }
     else{
        Swal.fire({title:'Error',text:'Set Exam updation failed',type:"error"})
     }
  	})
  }
  

  
  

}
