import { Component, OnInit } from '@angular/core';
import { AdmindashboardComponent } from '../admindashboard/admindashboard.component';
import {FormBuilder,Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ExamserviceService} from '../examservice.service';
import Swal from 'sweetalert2'
@Component({ 
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

category:any
cidcount:any 
countid:any 
status:any
submitted=false; 
url:string="http://localhost:3000/api/count"
// readonly URL:string="http://localhost:3000/api/categorydata";

  constructor(private fb:FormBuilder,private http:HttpClient,private service:ExamserviceService) {
    // this.count()
   }




  ngOnInit() {

 this.count()
   
  	this.category=this.fb.group({
  		cid:[''],
  		cname:['',[Validators.required,Validators.maxLength(100)]]
  	})
    
  }
   get f() { return this.category.controls; }
  

  count(){
 this.http.get(this.url).subscribe(res=>{ 
     this.cidcount=res;
     console.log(this.cidcount[0].CIID);
      //set value
    this.category.patchValue({
      cid:this.cidcount[0].CIID,                   
    });
   });
 
  }

     //form data
  categorydata(){
       this.submitted = true;

        // stop here if form is invalid
        if (this.category.invalid) {
           Swal.fire({title:'Warning',text:'Please enter the required field',type:"warning"})
            return;
        }
        
    console.log(this.category.value);
    this.service.categoryinsert(this.category.value).subscribe(res=>{
     this.status=res
     if(this.status.status == true){
       Swal.fire({title:'Success',text:'Course inserted succesfully',type:"success"})
       this.count()
       
     }
     else{
        Swal.fire({title:'Error',text:'Course insertion failed',type:"error"})
     }
    })
  }

  
}
