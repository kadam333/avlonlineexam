import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ExamserviceService} from '../examservice.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {

 courselist:any
 subcount:any
 subject:any
 status:any
 submitted=false;

  constructor(private fb:FormBuilder,private http:HttpClient,private service:ExamserviceService) { }

  ngOnInit() {
  	this.subjectcount()
  	this.showcourse()
    this.subject=this.fb.group({
    	coursename:['',[Validators.required,Validators.maxLength(100)]],
    	subcid:[''],
    	subcname:['',[Validators.required,Validators.maxLength(100)]]
    })
  }
  get f() { return this.subject.controls; }  //validation

  // SHOWCOURSEFORDROPDOWN
  showcourse(){
  	
  	this.service.showcourse().subscribe(res=>{
    this.courselist=res;
    // console.log(this.courselist)
  	})
  }
  
  //coursecountfunction
  url:string="http://localhost:3000/api/subjectcount"
  subjectcount(){
  	this.http.get(this.url).subscribe(res=>{
  		this.subcount=res;
  		// console.log(this.subcount)
     this.subject.patchValue({
      subcid:this.subcount[0].SID,
     });
  	});
  }

  //addsubjectmethod
  subjectdata(){
  	this.submitted = true;
  	 console.log(this.subject.value);
  	if (this.subject.invalid) {
           swal.fire({title:'Warning',text:'Please enter the required field',type:"warning"})
            return;
        }

  	this.service.insertsubject(this.subject.value).subscribe(res=>{
  		this.status=res
  		if(this.status.status == true){
       swal.fire({title:'Success',text:'Course inserted succesfully',type:"success"})
       this.subjectcount()
       
     }
     else{
        swal.fire({title:'Error',text:'Course insertion failed',type:"error"})
     }
  	})
  }
  // closing subjectdata
}
