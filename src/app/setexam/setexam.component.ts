import { Component, OnInit } from '@angular/core';
import { AdmindashboardComponent } from '../admindashboard/admindashboard.component';
import {FormBuilder,Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ExamserviceService} from '../examservice.service';
import {Router,ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-setexam',
  templateUrl: './setexam.component.html',
  styleUrls: ['./setexam.component.css']
})
export class SetexamComponent implements OnInit {

examdata:any
examcode:any;
submitted=false;
status:any
coursedata:any
searchsubject:any
minDate=new Date()
  constructor(private http:HttpClient,private fb:FormBuilder,private service:ExamserviceService,private rt:Router) { 

  }

  ngOnInit() {
  this.examcodecount()

  this.examdata=this.fb.group({
  	course:['',],
  	subject:[''],
  	examcode:[''],   
  	date:['',[Validators.required]],
  	totalquestion:['',[Validators.required,Validators.maxLength(2)]],
  	timeduration:['',[Validators.required,Validators.maxLength(2)]],
  	examname:['',[Validators.required,Validators.maxLength(100)]],
  	passingmarks:['',[Validators.required,Validators.maxLength(2)]]
  })
  }
 
  get f() { return this.examdata.controls; }

// examcodecount
  examcodecount(){
  	const url="http://localhost:3000/api/codecount"

  	this.http.get(url).subscribe(res=>{
  		this.examcode=res;
    console.log(this.examcode[0].EID)

    //showcourse
    this.service.showcourse().subscribe(res=>{
    this.coursedata=res;
    })
  		this.examdata.patchValue({
  			examcode:this.examcode[0].EID,
  		});
  	});
  }//end


 // examdata
 setexamdata(){
 	// console.log(this.examdata.value)
 	this.submitted = true;

 	 // stop here if form is invalid
        if (this.examdata.invalid) {
           swal.fire({title:'Warning',text:'Please enter the required field',type:"warning"})
            return;
        } //ENDING

        this.service.insertsetexam(this.examdata.value).subscribe(res=>{
        	this.status=res;

        	// condition
        	if (this.status.status == true) {
        		swal.fire({title:'Success',text:'exam created succesfully',type:"success"})
            this.rt.navigateByUrl('', {skipLocationChange: true}).then(()=>
            this.rt.navigate(['showsetexam'])); 
        	}

        	else{
        		swal.fire({title:'Error',text:'Exam creation failed',type:"error"})
        	}
        })
 }//end
 

//searchsubject
 getvalue(data){
   console.log(data)
  this.service.seachsubject(data).subscribe(res=>{
    // this.searchsubject=this.service.subjectsearch
    this.searchsubject=res;
    // console.log(this.searchsubject)
  // this.searchsubject=resthis.data1[0].course_name
  })

 } 
}
 