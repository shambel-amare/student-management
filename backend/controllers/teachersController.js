// express-async-handler lets us work with the async await without the need for try catch block
const asyncHandler=require('express-async-handler');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
// import our Teacher model

const { Student,Course} = require('../models/studentsModel')
const { Teacher} = require('../models/teachersModel')
//@desc Register Student
//@route POST /api/register
//@access private

const registerTeacher= asyncHandler(async (req, res)=>{  
    
    const{first_name, last_name, email, password} = req.body

    if(!first_name||!last_name||!email||!password){
      res.status(400)
      throw new Error('Please fill all the fields')
    }
      const teacherExists = await Teacher.findOne({email})
  
      if(teacherExists){
        res.status(400)
        throw new Error('teacher already exists')
      }
      //hash the password
      const salt=await bcrypt.genSalt(12)
      const hashPassword = await bcrypt.hash(password, salt )
  
      //create teacher
        const teacher = await Teacher.create({first_name, last_name, email, password:hashPassword});
     if (teacher){
       res.status(201).json({
         _id: teacher._id,
        name: teacher.first_name,
        email:teacher.email,
  
       })
     }else{
       res.status(400).json("Invalid User data");
  
     }
})
// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }
const loginTeacher= asyncHandler(async (req, res)=>{  
    
    const { email, password } = req.body

  // Check for user email
  const teacher = await Teacher.findOne({ email })

  if (teacher && (await bcrypt.compare(password, teacher.password))) {
    res.json({
      _id: teacher._id,
      name: teacher.first_name,
      email: teacher.email,
      token: generateToken(teacher._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})


const getAllTeachers= asyncHandler(async (req, res)=>{  
    
  try {
    const teachers= Teacher.find({},{"first_name":1},()=>{
      res.json(teachers);

    })
  } catch (error) {
    res.status(500).json(error);
  }
})


const getTeacher= asyncHandler(async (req, res)=>{  

      const teacher= await Teacher.deleteOne({_id:req.params.id },() =>{
        res.json({message: "Teacher data", name:teacher.first_name});
      })
    
      res.status(500)
      throw new Error("Invalid User");
  })

const deleteTeacher=asyncHandler( async (req, res)=>{  
    
    const teacher= await Teacher.deleteOne({_id:req.params.id },() =>{
      res.json({message: "Teacher deleted", name: teacher.first_name});
    })
    res.status(500)
    throw new Error("Invalid User")
})

//Asign teacher to a course
const assignTeacherToCourse= asyncHandler(async (req, res)=>{
  
    const course=await Course.findOne(
       { course_name:req.body.course_name } )
      
     const teacher=await Teacher.findOne(
        { first_name:req.body.first_name } )
    if(teacher&&course){
        const newCourseTeacher = await Course.findOneAndUpdate({_id:course._id},{$push:{teachers:teacher._id}})
        res.status(200).json({message:"new teacher added to course",Teacher_name:newCourseTeacher.first_name})
    }
    else{
        res.status(400)
        throw new Error('Could not assign Teacher To Course')
    }

}
)
const assignTestToCourse= asyncHandler(async (req, res)=>{

   const course=await Course.findOne(
      { course_name:req.body.course_name } )
    
    const id = course._id
    const test = await Course.findOneAndUpdate({_id:id},{$push:{tests:{test_type:req.body.test_type, test_result:req.body.test_result}}})
    res.status(200).json({message:"new test added", test:test.test_type})

  
    res.status(500).json(error);
  
})


const registerCourse= async (req, res)=>{  
    
    try {
      const course= await Course.create( req.body);
      res.json(course);
    } catch (error) {
      res.status(500).json(error);
    }
  }
module.exports = {assignTestToCourse,assignTeacherToCourse,registerTeacher,getAllTeachers, getTeacher,deleteTeacher,loginTeacher,registerCourse}