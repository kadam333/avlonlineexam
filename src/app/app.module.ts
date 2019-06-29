import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CollegeinfoComponent } from './collegeinfo/collegeinfo.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { StudentloginComponent } from './studentlogin/studentlogin.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { CategoryComponent } from './category/category.component';
import { CategorylistComponent } from './categorylist/categorylist.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { SubcategorylistComponent } from './subcategorylist/subcategorylist.component';
import { StudentsComponent } from './students/students.component';
import { SetexamComponent } from './setexam/setexam.component';
import { ShowexamComponent } from './showexam/showexam.component';
import { SetquestionComponent } from './setquestion/setquestion.component';
import { EditcourseComponent } from './editcourse/editcourse.component';
import { EditsubjectComponent } from './editsubject/editsubject.component';
import { EditexamComponent } from './editexam/editexam.component';
import { EditquestionComponent } from './editquestion/editquestion.component';
import { ViewquestionComponent } from './viewquestion/viewquestion.component';
import { QuestionSetComponent } from './question-set/question-set.component';
import { ExamQuestionsComponent } from './exam-questions/exam-questions.component';
import { ExpireexamComponent } from './expireexam/expireexam.component';
import { StudentdashboardComponent } from './studentdashboard/studentdashboard.component';
import { MaintestComponent } from './maintest/maintest.component';
import { QuizquestionComponent } from './quizquestion/quizquestion.component';
import { ExpireexamsComponent } from './expireexams/expireexams.component';
import { ShowStudentComponent } from './show-student/show-student.component';
import { ShowIncompleteComponent } from './show-incomplete/show-incomplete.component';
import { CommondashboardComponent } from './commondashboard/commondashboard.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { NoticeComponent } from './notice/notice.component';
import { ShowfacultyComponent } from './showfaculty/showfaculty.component'

const Root:Routes =[
  {path:'',component: HomeComponent},
  {path:'collegeinfo',component:CollegeinfoComponent},
  {path:'register',component:RegistrationComponent},
  {path:'login',component:LoginComponent},
  {path:'studentlogin',component:StudentloginComponent},
  {path:'admindashboard',component:AdmindashboardComponent,canActivate:[AuthGuard]},
  {path:'category',component:CategoryComponent,canActivate:[AuthGuard]},
  {path:'categorylist',component:CategorylistComponent,canActivate:[AuthGuard]},
  {path:'subcategory',component:SubcategoryComponent,canActivate:[AuthGuard]},
  {path:'subcategorylist',component:SubcategorylistComponent,canActivate:[AuthGuard]},
  {path:'studentlist',component:StudentsComponent,canActivate:[AuthGuard]},
  {path:'setexam',component:SetexamComponent,canActivate:[AuthGuard]},
  {path:'showsetexam',component:ShowexamComponent,canActivate:[AuthGuard]},
  {path:'setquestions1',component:QuestionSetComponent,canActivate:[AuthGuard]},
  {path:'editcourse',component:EditcourseComponent,canActivate:[AuthGuard]},
  {path:'editsubject',component:EditsubjectComponent,canActivate:[AuthGuard]},
  {path:'editexam',component:EditexamComponent,canActivate:[AuthGuard]},
  {path:'editquestion',component:EditquestionComponent,canActivate:[AuthGuard]},
  {path:'viewquestion',component:ViewquestionComponent,canActivate:[AuthGuard]},
  {path:'examquestion',component:ExamQuestionsComponent,canActivate:[AuthGuard]},
  {path:'expireexam',component:ExpireexamComponent,canActivate:[AuthGuard]},
  {path:'studentdashboard',component:StudentdashboardComponent,canActivate:[AuthGuard]},
  {path:'maintest',component:MaintestComponent},
  {path:'quizquestion',component:QuizquestionComponent},
  {path:'studentdata',component:ShowStudentComponent,canActivate:[AuthGuard]},
  {path:'incompleteexam',component:ShowIncompleteComponent,canActivate:[AuthGuard]}, 
  {path:'commondashboard',component: CommondashboardComponent,canActivate:[AuthGuard]},
  {path:'facultydata',component: ShowfacultyComponent,canActivate:[AuthGuard]},
    
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CollegeinfoComponent,
    RegistrationComponent,
    LoginComponent,
    StudentloginComponent,
    AdmindashboardComponent,
    CategoryComponent,
    CategorylistComponent,
    SubcategoryComponent,
    SubcategorylistComponent,
    StudentsComponent,
    SetexamComponent,
    ShowexamComponent,
    SetquestionComponent,
    EditcourseComponent,
    EditsubjectComponent,
    EditexamComponent,
    EditquestionComponent,
    ViewquestionComponent,
    QuestionSetComponent,
    ExamQuestionsComponent,
    ExpireexamComponent,
    StudentdashboardComponent,
    MaintestComponent,
    QuizquestionComponent,
    ExpireexamsComponent,
    ShowStudentComponent,
    ShowIncompleteComponent,
    CommondashboardComponent,
    NoticeComponent,
    ShowfacultyComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Root),ReactiveFormsModule,FormsModule,HttpClientModule
  ],
  providers: [AuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
