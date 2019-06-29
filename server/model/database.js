var mysql=require('mysql');

//create connection

var conn=mysql.createConnection( 
{
host:'localhost',
user:'root',
password:'',
database:'gaccexam'
});   

conn.connect();

//query

var database=new function(data,callback){
    //categorycount
	this.count=function(callback){
	conn.query('select (COUNT(course_id)+1) as CIID from course',function(err,data){
		callback(err,data);
	})
  }

    //examcode
    this.ecount=function(callback){
    conn.query('select CONCAT("EXAMCODE",(COUNT(exam_code)+1)) as EID from exam_details',function(err,data){
        callback(err,data);
    })
    }

    // insertcourse
	this.insertCourse=function(data,callback){
		var sql="insert into course SET?"
		var formdata={
				course_id:data.cid,
				course_name:data.cname
		}
		conn.query(sql,formdata,function(err,data){
			if(err){
				console.log(err)
			}
			callback(err,data)
		})
	}

    // showcourse
    this.showcourse=function(data,callback){
        var sql="select * from course limit "+data.limit
        // console.log(sql)
    	conn.query(sql,function(err,data){
    		callback(err,data);
    	})
    }

       this.showcourse1=function(callback){
        var sql="select * from course"
        // console.log(sql)
        conn.query(sql,function(err,data){
            callback(err,data);
        })
    }

    // editcourse
    this.editCourse=function(data,callback){
    	var sql="select * from course where course_id="+data.id
    	conn.query(sql,function(err,data){
    		callback(err,data);
    	})
    }
    //editsubject
    this.editsubject=function(data,callback){
        console.log(data)
        var sql='select * from subject where subject_id='+data.id
        conn.query(sql,function(err,data){
            callback(err,data);
        })
    }

    //updatecourse
    this.updateCourse=function(data,callback){
    	console.log(data)
    	var sql="update course SET? where course_id="+data.cid
    	var formdata={
    		course_name:data.cname
    	}
    	conn.query(sql,formdata,function(err,data){
    		callback(err,data);
    	})
    }

    //updatesubject
    this.updatesubject=function(data,callback){
        console.log(data)
        var sql="update subject SET? where subject_id="+data.sid
        
        var formdata={
            course_name:data.cname,
            subject_name:data.sname
        }
        conn.query(sql,formdata,function(err,data){
            callback(err,data);
        })
    }

    //updateexam
    this.updateexam=function(data,callback){
        console.log(data)

        var sql="update exam_details SET? where exam_code='"+data.examcode+"'"

        var formdata={
            exam_date:data.date,
            total_questions:data.totalquestion,
            total_min:data.timeduration,
            exam_name:data.examname,
            passing_marks:data.passingmarks
        }
        conn.query(sql,formdata,function(err,data){
            callback(err,data);
        })
    }

    //deletecoure
      this.deleteCourse=function(data,callback){
    	console.log(data)
    	var sql="delete from course where course_id="+data.id
    	conn.query(sql,function(err,data){
    		callback(err,data);
    	})
    }

    //deletsubject
    this.deletesubject=function(data,callback){
        console.log(data)
        var sql="delete from subject where subject_id="+data.id
        conn.query(sql,function(err,data){
            callback(err,data);
        })
    }

    //subjectidcount
    this.subjectcount=function(callback){
        conn.query('select (COUNT(subject_id)+1) as SID from subject',function(err,data){
            callback(err,data);
        })
    }

    //insertsubject
    this.insertsubject=function(data,callback){
        console.log(data)
        var sql="insert into subject SET?"
        var formdata={
            course_name:data.coursename,
            subject_id:data.subcid,
            subject_name:data.subcname
        }
        conn.query(sql,formdata,function(err,data){
            callback(err,data)
        })
    }

    //show subject
    this.showsubject=function(callback){
        conn.query('select * from subject',function(err,data){
            callback(err,data);
        })
    }

     //insertexam
    this.insertexam=function(data,callback){
        // console.log(data)
        var sql="insert into exam_details SET?"

        var formdata={
            course:data.course,
            subject:data.subject,
            exam_code:data.examcode,
            exam_date:data.date,
            total_questions:data.totalquestion,
            total_min:data.timeduration,
            exam_name:data.examname,
            passing_marks:data.passingmarks
        }
        
         console.log(formdata)
        conn.query(sql,formdata,function(err,data){
            if(err){
                console.log(err)
            }
            callback(err,data)
        })
    }


    //insert question
    this.insertquestion=function(data,callback){
        var sql="insert into questions SET?"

        var formdata={
            course_name:data.coursename,
            subject_name:data.subjectname,
            exam_code:data.examcode,
            exam_date:data.date,
            total_questions:data.totalquestion,
            exam_name:data.examname,
            question:data.mainquestion,
            option_a:data.optionA,
            option_b:data.optionB,
            option_c:data.optionC,
            option_d:data.optionD,
            answer:data.answer
        }
        //console.log(formdata)
        conn.query(sql,formdata,function(err,data){
            if(err){
                console.log(err)
            }
            callback(err,data)
        })
    }
    
    // searchsubject
    this.searchsubject=function(data,callback){
        console.log(data)
    var sql="select * from subject WHERE course_name='"+data.id+"'" 
       console.log(sql)
    conn.query(sql,function(err,data){
        callback(err,data);
    })  
    }

    //allexamdetails
    this.showexam=function(callback){
       conn.query("select * from exam_details WHERE status=0",function(err,data){
           callback(err,data)
       })
    }

    //editexam
    this.editexam=function(data,callback){
        console.log(data)
        var sql="select * from exam_details where exam_code='"+data.id+"'"
        console.log(data)
        conn.query(sql,function(err,data){
            callback(err,data);
        })
    }

    //deleteexam
    this.deleteexam=function(data,callback){

        var sql="delete from exam_details where exam_code='"+data.id+"' "

        conn.query(sql,function(err,data){
            callback(err,data);
        })
    }


    // setexamdata for question
    this.setexamdata=function(data,callback){
        var sql="select * from exam_details where exam_code='"+data.id+"'" 

        conn.query(sql,function(err,data){
            callback(err,data);
        })
    }

     // getcourselength
      this.getLength=function(callback){
        var sql="select (COUNT(course_id)) as CID from course" 

        conn.query(sql,function(err,data){
            callback(err,data);
        })
    }
    
    // examstatus
    this.examstatus=function(data,callback){
        // console.log(data)
    var sql="update exam_details SET status=1 where exam_code='"+data.examcode+"' "
   console.log(sql)
    conn.query(sql,function(err,data){
        callback(err,data)
    })

    }
    
    // change question questions status 
    this.qustatus=function(data,callback){
        // console.log(data)
    var sql="update questions SET status=1 where exam_code='"+data.examcode+"' "
   // console.log(sql)
    conn.query(sql,function(err,data){
        callback(err,data)
    })
    }

    // incompleteexam
     this.incompexam=function(data,callback){
        console.log(data)
    var sql="update exam_details SET status=3 where exam_code='"+data.examcode+"' "
   // console.log(sql)
    conn.query(sql,function(err,data){
        callback(err,data)
    })

    }

    //getcompleteexamdata
    this.completeexam=function(callback){
        var sql="SELECT * FROM  exam_details WHERE status=1"

        conn.query(sql,function(err,data){
            callback(err,data);
        })
    }
     

      // gettingexamcodeforquestion
    this.getquestions=function(data,callback){
        var sql="SELECT * FROM `questions` WHERE exam_code='"+data.id+"' "
       
        conn.query(sql,function(err,data){
            callback(err,data);
        })
    }

    // edit question by id

    this.editquestion=function(data,callback){
        var sql="SELECT * FROM `questions` where question_id="+data.id

        console.log(sql)

        conn.query(sql,function(err,data){
            callback(err,data);
        })
    }
   

   // updatequestion
    this.updatequestion=function(data,callback){
        var sql="update questions SET? where question_id="+data.qid

        var formdata={
            question:data.mainquestion,
            option_a:data.optionA,
            option_b:data.optionB,
            option_c:data.optionC,
            option_d:data.optionD,
            answer:data.answer
        }
        // console.log(sql)
        conn.query(sql,formdata,function(err,data){
            callback(err,data);
        })
    }
    

    // expireexam --->admindashboard
    this.expireexam=function(callback){
        var sql ="update exam_details SET status=2 where curdate()>exam_date"
        console.log(sql)
        conn.query(sql,function(err,data){
            callback(err,data);
        })
    }

    // showexpireexam
    this.showexpireexam=function(callback){
        var sql="select * from exam_details where status=2"

        conn.query(sql,function(err,data){
            callback(err,data);
        })
    }

     // register faculty
    this.registerFaculty=function(data,callback){
        var sql="insert into registerfaculty SET?";
        var formdata={
          email_id:data.email,
          faculty_name:data.name,
          password:data.password
        }

        conn.query(sql,formdata,function(err,data){
            callback(err,data);
        })
    }

       // login
    this.login=function(data,callback){
      console.log("data",data)
        var sql="select * from registerfaculty where email_id= '"+data.email+"' and password='"+data.password+"' "
        console.log(sql)
        conn.query(sql,false,function(err,data){
            callback(err,data);
        })
    }

    // register students
    this.registerstudent=function(data,callback){
        var sql="insert into registerstudent SET?";
        var formdata={
          student_name:data.sname,
          email_id:data.email,
          course_name:data.course,
          password:data.password
        }
        console.log(formdata)
        conn.query(sql,formdata,function(err,data){
            if(err){
                console.log(err)
            }
            callback(err,data)
        })
    }

    // LOGIN STUDENT
    this.loginstudent=function(data,callback){
      // console.log("data",data)
        var sql="select * from registerstudent where status=1 AND email_id= '"+data.email+"'AND password="+data.password 
        console.log(sql)
        conn.query(sql,false,function(err,data){
            callback(err,data);
        })
    }
    
    // getexam by course id for student
    this.getexam=function(data,callback){
      // console.log("data12",data)
        var sql="select * from exam_details where course='"+data[0].course_name+"' and status=1"
        console.log(sql)
        conn.query(sql,false,function(err,data){
            callback(err,data);
        })
    }

     
    this.questionlist=function(data,callback){
        console.log(data)
        var sql="SELECT * FROM `questions` WHERE exam_code='"+data.id+"' "
       
        conn.query(sql,function(err,data){
            callback(err,data);
        })
    }
     
    // for exam question
    this.qbyid=function(data,callback){
        console.log(data)
        var sql="SELECT * FROM `questions` WHERE question_id="+data.id
        console.log(sql)
        conn.query(sql,function(err,data){
            callback(err,data);
        })
    }
    
    // get incomplete exam
    this.examincomplete=function(callback){
        var sql="SELECT DISTINCT exam_code,total_questions FROM `questions` where status=0"
         console.log(sql)
         conn.query(sql,function(err,data){
             callback(err,data)
         })
    }

    // show all students
    this.showstudent=function(callback){
        var sql="SELECT * FROM  registerstudent"

        conn.query(sql,function(err,data){
            callback(err,data)
        })
    }
    
    // activate students
    this.activatestudent=function(data,callback){
        var sql="update registerstudent SET status=1 where student_id="+data.id

        console.log(sql)

        conn.query(sql,function(err,data){
            callback(err,data)
        })
    }
    
   // deactivate students
   this.deactivatestudent=function(data,callback){
        var sql="update registerstudent SET status=0 where student_id="+data.id

        console.log(sql)

        conn.query(sql,function(err,data){
            callback(err,data)
        })
    }

   // show data of incomplete exams.
   this.showincompexam=function(data,callback){
        var sql="select  * ,COUNT(status=0) AS ID from questions where exam_code='"+data.id+"'"

        console.log(sql)

        conn.query(sql,function(err,data){
            callback(err,data)
        })
    }

    // =======================all admindashboard api================================

    this.getstucount=function(callback){
        var sql ="SELECT COUNT(student_id) as COUNT from registerstudent"

        conn.query(sql,function(err,data){
            callback(err,data)
        })
    }
    
    this.getactivecount=function(callback){
        var sql ="SELECT COUNT(student_id) as COUNT from registerstudent where status=1"

        conn.query(sql,function(err,data){
            callback(err,data)
        })
    }
    
     this.getliveexam=function(callback){
        var sql ="SELECT COUNT(exam_code) as COUNT from exam_details where status=0"

        conn.query(sql,function(err,data){
            callback(err,data)
        })
    }
    
    this.tcourse=function(callback){
        var sql ="SELECT COUNT(course_id) as COUNT from course"

        conn.query(sql,function(err,data){
            callback(err,data)
        })
    }
    
    // get faculty
    this.getfaculty=function(callback){
        var sql ="SELECT * FROM registerfaculty where status=1 or status=2"

        conn.query(sql,function(err,data){
            callback(err,data)
        })
    }
    
    // activate faculty
    this.activatefaculty=function(data,callback){
        var sql="update registerfaculty SET status=2 where faculty_id="+data.id

        console.log(sql)

        conn.query(sql,function(err,data){
            callback(err,data)
        })
    }
    
    // deactivate faculty
    this.dactivatefaculty=function(data,callback){
        var sql="update registerfaculty SET status=1 where faculty_id="+data.id

        console.log(sql)

        conn.query(sql,function(err,data){
            callback(err,data)
        })
    }
    
    // update faculty profile

    this.facultyprofile=function(data,callback){
        console.log(data)
        var sql="update registerfaculty SET? where faculty_id="+data.fid
        var formdata={
            faculty_name:data.fname,
            password:data.fpassword
        }
        conn.query(sql,formdata,function(err,data){
            callback(err,data);
        })
    }

}
// ending
module.exports=database;