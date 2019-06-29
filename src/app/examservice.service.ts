import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {Router,ActivatedRoute} from '@angular/router';
interface isLoggedIn {
  status: boolean
}

interface quoteStatus {
  success: boolean
}

interface logoutStatus {
  status: boolean
}
@Injectable({
  providedIn: 'root'
})
export class ExamserviceService {
data:any
subjectdata:any
subjectsearch:any
editexamdata:any 
getexamdata:any 
allquestion:any
questiondata:any
studentdata:any
questionlist:any
list:any
incompleteexams:any
logindata:any

  constructor(private http:HttpClient,private rt:Router) { }

  

  // /category insert
  categoryinsert(data){
    const url="http://localhost:3000/api/categorydata"
     
    const httpoption={headers:new HttpHeaders ({'content-type':'application/json'}) };
   return this.http.post(url,data,httpoption)
 }

  // insertsubject
  insertsubject(data){
    const url="http://localhost:3000/api/insertsubject"
    const httpoption={headers:new HttpHeaders({'content-type':'application/json'})};
    return this.http.post(url,data,httpoption)
  }

  //insertexam
  insertsetexam(data){
  const url="http://localhost:3000/api/insertsetexam"

  const httpoption={headers:new HttpHeaders ({'content-type' : 'application/json' }) };

  return this.http.post(url,data,httpoption)
  }

  //insertquestion
  insertquestion(data){
    const url="http://localhost:3000/api/insertquestion"

    const httpoption={headers:new HttpHeaders ({'content-type' : 'application/json'}) };

    return this.http.post(url,data,httpoption) 
  }


   // show course
  showcourse(){
  	const url="http://localhost:3000/api/showcourse1"

  	return this.http.get(url)
  }
   
   //show subject
   showsubject(){
     const url="http://localhost:3000/api/showsubject"
      return this.http.get(url);
   }

   //edit course
  editCourseData(value){
    const url="http://localhost:3000/api/editcoursedata"

    const httpoption={headers:new HttpHeaders ({'content-type':'application/json'}) };
     return this.http.post(url,{id:value},httpoption).map(res=>{

     this.data=res
     	this.data=JSON.stringify(res)
    	localStorage.setItem('data',this.data)
      this.rt.navigate(['/editcourse'])
     return this.data
    
   })
  }
  
  //edit_subject
  editsubjectdata(value){
    const url="http://localhost:3000/api/editsubjectdata"

    const httpoption={headers:new HttpHeaders({'content-type':'application/json'}) };
    return this.http.post(url,{id:value},httpoption).map(res=>{
      this.subjectdata=res;
      this.subjectdata=JSON.stringify(res)
      localStorage.setItem('data',this.subjectdata)
      this.rt.navigate(['/editsubject'])
      return this.subjectdata
    })
  }

  

  
  //searchsubject
  seachsubject(data){
  const url="http://localhost:3000/api/searchsubject"

  const httpoption={headers:new HttpHeaders({'content-type' : 'application/json'}) };

  return this.http.post(url,{id:data},httpoption).map(res=>{
    this.subjectsearch=res
    return this.subjectsearch
  })
  }


  //showexamdetails
  showexam(){
    const url="http://localhost:3000/api/showexamdetails"

    return this.http.get(url)
  }
  
  // EXAMMSTATUS=1<--COMPLETED
  completeexam(){
    const url="http://localhost:3000/api/completeexam"

    return this.http.get(url)
  }

  //editexam
  editexam(data){
  const url="http://localhost:3000/api/editexam"

  const httpoption={headers:new HttpHeaders ({'content-type' : 'application/json' }) };

  return this.http.post(url,{id:data},httpoption).map(res=>{
    this.editexamdata=res
    this.rt.navigate(['/editexam'])
    return this.editexamdata
  })
  }

  //getexamdata
  getexam(data){
    const url="http://localhost:3000/api/setexamdata"

    const httpoption={headers:new HttpHeaders ({'content-type' : 'application/json' }) };

    return this.http.post(url,{id:data},httpoption).map(res=>{
      this.getexamdata=res
      this.rt.navigate(['/setquestions1'])
      return this.getexamdata
    })
  }


 // restapi
  Post(URL,data){

 const url="http://localhost:3000/api/"+URL

    const httpoption={headers:new HttpHeaders ({'content-type' : 'application/json' }) };
    return this.http.post(url,data,httpoption)
  }

  GET(URL){
    const url="http://localhost:3000/api/"+URL

    //const httpoption={headers:new HttpHeaders ({'content-type' : 'application/json' }) };
    return this.http.get(url)
  }

  //restapi

  // updateexamstatus
  updateexamstatus(data){
  const url="http://localhost:3000/api/examstatus"
   
  const httpoption={headers:new HttpHeaders ({'content-type' : 'application/json'}) };
  
  return this.http.post(url,data,httpoption).map(res=>{
    
  }) 
  }
  
  // show question according to examcode
  qexamcode(data){
    const url="http://localhost:3000/api/qexam"

    const httpoption={headers:new HttpHeaders ({'content-type' : 'application/json'}) };

    return this.http.post(url,{id:data},httpoption).map(res=>{
     
     this.allquestion=res
     this.allquestion=JSON.stringify(res)
      localStorage.setItem('data',this.allquestion)
     this.rt.navigate(['/examquestion'])

     return this.allquestion
    })
  }

  // getting question by id
 editquestion(data){
   const url="http://localhost:3000/api/editqu"

   const httpoption={headers:new HttpHeaders ({'content-type' : 'application/json'}) };

   return this.http.post(url,{id:data},httpoption).map(res=>{
    this.questiondata=res
    
    this.questiondata=JSON.stringify(res)
      localStorage.setItem('data',this.questiondata)
      
    this.rt.navigate(['/editquestion'])

    return this.questiondata
   })
 }

 // show expire exam
 showexpireexam(){
   const url="http://localhost:3000/api/showexpire"

    return this.http.get(url)
 }

// register student
registerstudent(data){
  const url="http://localhost:3000/api/registerstudent"

  const httpoption={headers:new HttpHeaders ({'content-type' : 'application/json'}) };

   return this.http.post(url,data,httpoption)
} 

// login student
loginstudent(data){
  const url="http://localhost:3000/api/loginstudent"

  const httpoption={headers:new HttpHeaders ({'content-type' : 'application/json'}) };

  return this.http.post(url,data,httpoption).map(res=>{
  this.studentdata=res

  this.rt.navigate(['/studentdashboard'])
  return this.studentdata
  })

}

// allquestionwhich is shown to  students
examqu(data){
  console.log(data)
  const url="http://localhost:3000/api/allquesexam"

  const httpoption={headers:new HttpHeaders ({'content-type' : 'application/json'}) };

  return this.http.post(url,{id:data},httpoption).map(res=>{
    this.list=res

    this.list=JSON.stringify(res)
    localStorage.setItem('data',this.list)

     this.rt.navigate(['/quizquestion'])

    return this.list
  })
}

  // show data of that exam which is incomplete
  incompexam(value){
  const url="http://localhost:3000/api/incompexams"

  const httpoption={headers:new HttpHeaders ({'content-type' : 'application/json'}) };

  return this.http.post(url,{id:value},httpoption).map(res=>{
    this.incompleteexams=res

    this.incompleteexams=JSON.stringify(res)
    localStorage.setItem('data',this.incompleteexams)

     this.rt.navigate(['/incompleteexam'])

    return this.incompleteexams
  })
  }


   isLoggedIn(): Observable<isLoggedIn> {
    return this.http.get<isLoggedIn>('http://localhost:3000/api/isloggedin')
  }

  logout() {
    return this.http.get<logoutStatus>('http://localhost:3000/api/logout')
  }


}
 