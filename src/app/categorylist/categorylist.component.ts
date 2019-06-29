import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ExamserviceService} from '../examservice.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})
export class CategorylistComponent implements OnInit {

coursedata:any
status:any
length:any
current_count:any
lower_limit=0;
upper_limit=5;
  constructor(private http:HttpClient,private service:ExamserviceService,private rt:Router) { }

  ngOnInit() {
   
    this.current_count=0;
       this.service.GET("getlength").subscribe(res=>{
        this.length=res[0].CID;
        console.log("length",this.length)
    })
    this.service.Post("showcourse",{limit:""+this.lower_limit+","+this.upper_limit+""}).subscribe(res=>{
    
       this.coursedata=res;
      
    })
  }

editCourse(data){
this.service.editCourseData(data).subscribe(res=>{ 

})
}



//DELETE COURSE
Deletecourse(value){
  Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.value) {
    const url="http://localhost:3000/api/deletecourse"
    const httpoption={headers:new HttpHeaders ({'content-type':'application/json'}) };
    this.http.post(url,{id:value},httpoption).subscribe(res=>{
          this.status=res

          if (this.status.status == true) {
            Swal.fire(
          'Deleted!',
          'Course has been deleted.',
          'success'
            )
            this.rt.navigateByUrl('', {skipLocationChange: true}).then(()=>
            this.rt.navigate(['categorylist'])); 
          }
          else{
             Swal.fire({title:'Error',text:'Course deletion failed',type:"error"})
          }

    })
  }
})


}//end

NEXT(){
  this.lower_limit=this.lower_limit+this.upper_limit
  this.service.Post("showcourse",{limit:""+this.lower_limit+","+this.upper_limit+""}).subscribe(res=>{
       this.coursedata=res;
       
    })

}
Prevoius(){

        this.lower_limit= this.lower_limit-this.upper_limit

  this.service.Post("showcourse",{limit:""+this.lower_limit+","+this.upper_limit+""}).subscribe(res=>{
       this.coursedata=res;
       
    })
}


}



