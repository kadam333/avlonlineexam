import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder,Validators} from '@angular/forms';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ExamserviceService} from '../examservice.service';
import Swal from 'sweetalert2';
import {Router,ActivatedRoute} from '@angular/router'
import { MustMatch } from '../must-match.validators';
@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']

})
export class AdmindashboardComponent implements OnInit {

  constructor(private http:HttpClient,private service:ExamserviceService,private rt:Router,private fb:FormBuilder) { }
coursedata:any
exams:any
length:any
logdata:any
updateprofile:any 
submitted=false; 
status:any
accountstatus:any
// ===========end logindata var==============
fname:any
fmail:any
fstatus:any
// ===========end logindata var==============

// ===========dashboard variables==============
stucount:any
stcount:any

stuactive:any
activated:any

liveexam:any
examlive:any

course:any
tcourse:any

// ===========dashboard end variables==============
  ngOnInit() {
    if(localStorage.getItem('isLoggedin') == 'true'){
      this.rt.navigate(['admindashboard'])
    }
  
  this.logdata=JSON.parse(localStorage.getItem('logindata'))
  console.log(this.logdata)

  this.fstatus=this.logdata.data[0].status
  console.log(this.fstatus)
  
  this.fname=this.logdata.data[0].faculty_name
  this.fmail=this.logdata.data[0].email_id

  this.check()
  this.expireexam()
  this.totalstudents()
  this.totalactivated()
  this.livesexams()
  this.totalcourse()

   this.updateprofile = this.fb.group({
             fid:[''],
             femail: [''],
            fname: ['', Validators.required],
            fpassword: ['', [Validators.required, Validators.minLength(6)]],
            fcpassword: ['', Validators.required]
        }, 
        {
            validator: MustMatch('fpassword', 'fcpassword')
        });

   this.updateprofile.setValue({
        fid:this.logdata.data[0].faculty_id,
        femail:this.logdata.data[0].email_id,
         fname:this.logdata.data[0].faculty_name,
        fpassword:this.logdata.data[0].password,
        fcpassword:this.logdata.data[0].password
      })

  }// ngonit end 
  
  get f() { return this.updateprofile.controls; }
  // ========update profile============= 

  onupdate(){
  this.submitted = true;

     if (this.updateprofile.invalid) {
        Swal.fire({title:'Error',text:'Please enter the required field',type:"error"})
            return;
        }
     
    const url="http://localhost:3000/api/updateprofile"

    const httpoption={headers:new HttpHeaders ({'content-type':'application/json'}) };

    this.http.post(url,this.updateprofile.value,httpoption).subscribe(res=>{
      this.status=res;

        if(this.status.status == true){

       Swal.fire({title:'Success',text:'profile updated succesfully',type:"success"})

       this.rt.navigateByUrl('', {skipLocationChange: true}).then(()=>
       this.rt.navigate(['admindashboard'])); 
     }

     else{
        Swal.fire({title:'Error',text:'profile updation failed',type:"error"})
     }

      })

  }
  
  // ========end update profile=============

  expireexam(){
  const url="http://localhost:3000/api/updateexpire" 

  this.http.get(url).subscribe(res=>{
  this.coursedata=res

   // console.log(this.coursedata)
  })    
  }



  check(){
    const url="http://localhost:3000/api/incompexam"

    this.http.get(url).subscribe(res=>{
    this.exams=res
    // alert(this.exams.exam_code)
    // console.log(this.exams)
   
    // console.log(Object.keys(this.exams).length)
    this.length=Object.keys(this.exams).length 
    // console.log(this.length)
   
    if (Object.keys(this.exams).length > 0) {
      alert('Check Dashboard you have incomplete exams' )
    }
    })
  }
  
  // getting icomplete exam code
  getcode(value){
    this.service.incompexam(value).subscribe(res=>{

    })
  }
  
  // get total students for=>dashboard
  totalstudents(){
    const url="http://localhost:3000/api/totalstu"

    this.http.get(url).subscribe(res=>{
    this.stucount=res 
    this.stcount=this.stucount[0].COUNT
    // console.log(this.stcount)
    })
  }
  
  // get activated students for=>dashboard
  totalactivated(){
    const url="http://localhost:3000/api/activatedstu"

    this.http.get(url).subscribe(res=>{
    this.stuactive=res 
    this.activated=this.stuactive[0].COUNT
    // console.log(this.stcount)
    })
  }
  
   // get live exams for=>dashboard

  livesexams(){
    const url="http://localhost:3000/api/liveexm"

    this.http.get(url).subscribe(res=>{
    this.liveexam=res 
    this.examlive=this.liveexam[0].COUNT

    })
  }

  // get live exams for=>dashboard
   totalcourse(){
    const url="http://localhost:3000/api/course"

    this.http.get(url).subscribe(res=>{
    this.course=res 
    this.tcourse=this.course[0].COUNT

    })
  }

  Logout(){
    this.service.GET("logout").subscribe(res=>{
      localStorage.clear();
      this.rt.navigate(['/login'])
    })
  }

}
