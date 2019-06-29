var express=require('express');
var router=express.Router();
var database=require('../model/database');
var bodyparser=require('body-parser');
var session = require('express-session')
var nodemailer = require("nodemailer");

router.use(bodyparser.json());
router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))



router.get('/',function(req,res,next){
	res.send('root call')
})

//category-count 
router.get('/count',function(req,res){
	database.count(function(err,result){
     res.json(result);
	});
});
 
//examcodecount
router.get('/codecount',function(req,res){
	database.ecount(function(err,result){
    res.json(result);
	});
});

//categoryinsert

router.post('/categorydata', function(req,res){
	var user=req.body;
	database.insertCourse(user,function(err,data){
		if(err){
          return res.json({status:false})
		}
		return res.json({status:true})
	})
})

//showcourse

router.get('/showcourse1',function(req,res){
	database.showcourse1(function(err,result){
     res.json(result);
	});
})

router.post('/showcourse',function(req,res){
	var data=req.body;
	console.log(data)
	database.showcourse(data,function(err,result){
     res.json(result);
	});
})

//editcourse

router.post('/editcoursedata', function(req,res){
	var user=req.body;
	database.editCourse(user,function(err,data){
		if(err){
          return res.json({status:false})
		}
		return res.json(data)
	})
})

//updatecourse 
router.post('/updatecoursedata', function(req,res){
	var user=req.body;
	database.updateCourse(user,function(err,data){
		if(err){
          return res.json({status:false})
		}
		return res.json({status:true})
	})
})

//deletecourse
router.post('/deletecourse', function(req,res){
	var user=req.body;
	database.deleteCourse(user,function(err,data){
		if(err){
          return res.json({status:false})
		}
		return res.json({status:true})
	})
})


//delete exam
router.post('/deleteexam',function(req,res){
	var user=req.body;
	database.deleteexam(user,function(err,data){
		if (err) {
			return res.json({status:false})
		}
		return res.json({status:true})
	})
})


//subjectidcount
router.get('/subjectcount',function(req,res){
	database.subjectcount(function(err,result){
		res.json(result);
	});
});

//insertsubject
router.post('/insertsubject',function(req,res){
	var user=req.body;
	console.log(user);
	database.insertsubject(user,function(err,data){
		if (err) {
			return res.json({status:false})
		}
		return res.json({status:true})
	})
})

//showsubject
router.get('/showsubject',function(req,res){
	database.showsubject(function(err,result){
    res.json(result);
	});
})

//editsubject
router.post('/editsubjectdata', function(req,res){
	var user=req.body;
	database.editsubject(user,function(err,data){
		if(err){
          return res.json({status:false})
		}
		return res.json(data)
	})
})

//updatesubject
router.post('/updatesubject',function(req,res){
	var user=req.body;
	database.updatesubject(user,function(err,result){
		if(err){
			return res.json({status:false})
		}
		return res.json({status:true})
	})
})

//deletesubject
router.post('/deletesubject',function(req,res){
	var user=req.body;
	console.log(user)
	database.deletesubject(user,function(err,result){
		if (err) {
			return res.json({status:false})
		}
		else
			return res.json({status:true})
	})
})

//insertsetexam
router.post('/insertsetexam',function(req,res){
	var user=req.body;
	// console.log(user)
	database.insertexam(user,function(err,result){
		if(err){
			return res.json({status:false})
		}
		else
			return res.json({status:true})
	})
})

//showexam
router.get('/showexamdetails',function(req,res){
	database.showexam(function(err,result){
		res.json(result);
	});	
})

//searchsubject==>setexam
router.post('/searchsubject',function(req,res){
	var user=req.body;

	database.searchsubject(user,function(err,result){
		if (err) {
			return res.json({status:false})
		}
		else
			return res.json(result)
	})
})

//editexam==>showexam
router.post('/editexam',function(req,res){
	var user=req.body;

	database.editexam(user,function(err,result){
		if (err) {
			return res.json({status:false})
		}
		else
			return res.json(result)
	})
})

// updateexam==>
router.post('/updateexam',function(req,res){
	var user=req.body;

	database.updateexam(user,function(err,result){
		if(err){
			return res.json({status:false})
		}
		else
			return res.json({status:true})
	})
})

// getexamdata

router.post('/setexamdata',function(req,res){
	var user=req.body;

	database.setexamdata(user,function(err,result){
		if (err) {
			return res.json({status:false})
		}
		else
			return res.json(result)
	})
})


//insert question 

router.post('/insertquestion',function(req,res){
	var user=req.body;

	database.insertquestion(user,function(err,result){
		if (err) {
			return res.json({status:false})
		}
		else
			return res.json({status:true})
	})
	})

	//length api 
router.get('/getlength',function(req,res){

	database.getLength(function(err,result){
		return res.json(result)
	})
})

   // examstatus
   router.post('/examstatus',function(req,res){
   	var user=req.body;

   	database.examstatus(user,function(err,result){
   		if(err){
   			return res.json({status:false})
   		}
   		else
   			return res.json({status:true})
   	})
   })

   //getcompleteexamdata
   router.get('/completeexam',function(req,res){
   	database.completeexam(function(err,result){
   		return res.json(result)
   	})
   })
   

   // gettingexamcodeforquestion
   router.post('/qexam',function(req,res){
   	var user=req.body

   	database.getquestions(user,function(err,result){
   		if (err) {
   			return res.json({status:false})
   		}

   		else
   			return res.json(result)
   	})
   })

   // editquestionby id
   router.post('/editqu',function(req,res){
   	var user=req.body

   	database.editquestion(user,function(err,result){
   		if (err) {
   			return res.json({status:false})
   		}

   		else
   			return res.json(result)
   	})
   })

   // updatequestion
   router.post('/updatequestion',function(req,res){
   	var user=req.body

   	database.updatequestion(user,function(err,result){
   		if (err) {
   			return res.json({status:false})
   		}

   		else
   			return res.json({status:true})
   	})
   })


   // update expire status
   router.get('/updateexpire',function(req,res){
   	database.expireexam(function(err,result){
   		return res.json(result)
   	})
   })


  // show exam
  router.get('/showexpire',function(req,res){
   	database.showexpireexam(function(err,result){
   		return res.json(result)
   	})
   })

  // Faculty regisetration
  router.post('/registerfaculty',function(req,res){
  	var data=req.body
   	database.registerFaculty(data,function(err,result){
   		if(err){
   			return res.json({status:false}) 
   		}
   		return res.json({status:true})
   	})
   })

    //login api
  router.post('/login',function(req,res){
  	var data=req.body
  	console.log(data)
   	database.login(data,function(err,result){
         console.log(result)
   		if(err){
   			return res.json({status:false})
   		}

       else if(data.email == result[0].email_id && data.password == result[0].password ){
         req.session.faculty_id=result[0].faculty_id
          req.session.email=result[0].email
         console.log(req.session.faculty_id)
   		return res.json({status:true,data:result,msg:"Login succesfull"})
       }
       else if(data.email != result[0].email_id){
         return res.json({status:false,msg:"Please enter correct email"})
       } else if(data.password != result[0].password){
         return res.json({status:false,msg:"Please enter correct password"})
       }
   	})
   })

   // register students
   router.post('/registerstudent',function(req,res){
  	var data=req.body
  	console.log(data)
   	database.registerstudent(data,function(err,result){
   		if(err){
   			return res.json({status:false})
   		}
   		return res.json({status:true})
   	})
   })
   
   // login student
   router.post('/loginstudent',function(req,res){
  	var data=req.body
  	// console.log(data)
   	database.loginstudent(data,function(err,result){
   		if(err){
   			return res.json({status:false})
   		}
   		 return res.json(result)
   	})
   })
   
   // examdatagetting
   router.post('/getexamdata',function(req,res){
  	var data=req.body
  	// console.log(data)
   	database.getexam(data,function(err,result){
   		if(err){
   			return res.json({status:false})
   		}
   		 return res.json(result)
   	})
   })
  
  // allmain exam question
 router.post('/allquesexam',function(req,res){
     var user=req.body
     console.log(user)
     database.questionlist(user,function(err,result){
       if (err) {
         return res.json({status:false})
       }

       else
         return res.json(result)
     })
   })


router.post('/quid',function(req,res){
     var user=req.body
     // console.log(user)
     database.qbyid(user,function(err,result){
       if (err) {
         return res.json({status:false})
       }

       else
         return res.json(result)
     })
   })

   // get incomplete exams alert
   router.get('/incompexam',function(req,res){
     database.examincomplete(function(err,result){
       return res.json(result)
     })
   })
  
  // incomplete exam status
   router.post('/icstatus',function(req,res){
     var user=req.body
     // console.log(user)
     database.incompexam(user,function(err,result){
       if (err) {
         return res.json({status:false})
       }

       else
         return res.json(result)
     })
   })

  // change question questions status 
  router.post('/qstatus',function(req,res){
     var user=req.body
     // console.log(user)
     database.qustatus(user,function(err,result){
       if (err) {
         return res.json({status:false})
       }

       else
         return res.json(result)
     })
   })
 

  //show student data 
  router.get('/studentlist',function(req,res){
    database.showstudent(function(err,result){
     return res.json(result)
    })
  })


  // activate student 
   router.post('/sactivate',function(req,res){
    var data=req.body
    // console.log(data)
     database.activatestudent(data,function(err,result){
       if(err){
         return res.json({status:false})
       }
       return res.json({status:true})
     })
   })


  // deactivate students
  router.post('/sdeactivate',function(req,res){
    var data=req.body

    database.deactivatestudent(data,function(err,result){
      if(err){
        return res.json({status:false})
      }
      return res.json({status:true})
    })
  })


  // show data of incomplete exams
  router.post('/incompexams',function(req,res){
     var user=req.body
     // console.log(user)
     database.showincompexam(user,function(err,result){
       if (err) {
         return res.json({status:false})
       }

       else
         return res.json(result)
     })
   })

  // =======================all dashboard api================================
 
router.get('/totalstu',function(req,res){
  database.getstucount(function(err,result){
    return res.json(result)
  })
})

router.get('/activatedstu',function(req,res){
  database.getactivecount(function(err,result){
    return res.json(result)
  })
})

router.get('/liveexm',function(req,res){
  database.getliveexam(function(err,result){
    return res.json(result)
  })
})

router.get('/course',function(req,res){
  database.tcourse(function(err,result){
    return res.json(result)
  })
})
 // =======================end all dashboard api================================

  // session code studentlogin
  router.post("/isloggedin",function(req,res){
    var data=req.body
    if(req.session.faculty_id == data.faculty_id && req.session.email == data.email ){
       return res.json({status:true})
    }
    else{
      return res.json({status:false})
    }
    
       
})

  router.get("/logout",function(req,res){
	req.session.destroy();
	return res.json({status:true})
})

// =======================faculty login end===============================================


// =========faculty list===========
router.get('/facultylist',function(req,res){
  database.getfaculty(function(err,result){
    return res.json(result)
  })
})

// =========faculty list end===========


// =========faculty status activate/deactivate===========
// activate faculty 
   router.post('/factivate',function(req,res){
    var data=req.body
    // console.log(data)
     database.activatefaculty(data,function(err,result){
       if(err){
         return res.json({status:false})
       }
       return res.json({status:true})
     })
   })
   
   router.post('/fdactivate',function(req,res){
    var data=req.body
    // console.log(data)
     database.dactivatefaculty(data,function(err,result){
       if(err){
         return res.json({status:false})
       }
       return res.json({status:true})
     })
   })
   
// =============================mail send api===================
  router.post("/mailing",function(req,res){
  var data=req.body;

  console.log(data)
  
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "mainexamonline69@gmail.com", // generated ethereal user
      pass: "indore123" // generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"mainexamonline69@gmail.com', // sender address
    to:data.email , // list of receivers
    subject: "SUCCESSFUL REGISTRATION FOR ONLINE EXAM", // Subject line
    html: `<h4>${data.name} Thanks for joining with us As Faculty</h4><br>
    <p>once admin will activate your account we will revert you keep in touch with us</p>`
   
  };
  //send mail with defined transport object
  let info = transporter.sendMail(mailOptions,function(err,result){
     if (err) {
       return res.json({status:false})
     }
     else{
       return res.json({sent:true})
       // res.send(info)
     }
     
  })


// console.log(res.send(info))
})

// ============profile update api======================
router.post('/updateprofile',function(req,res){
    var data=req.body
    // console.log(data)
     database.facultyprofile(data,function(err,result){
       if(err){
         return res.json({status:false})
       }
       return res.json({status:true})
     })
   })


module.exports=router;