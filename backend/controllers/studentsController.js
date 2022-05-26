// express-async-handler lets us work with the async await without the need for try catch block
// const asyncHandler=require('express-async-handler');

// import our student model

const {Student, Course} = require('../models/studentsModel')

//@desc Register Student
//@route POST /api/register
//@access private

const registerStudent= async (req, res)=>{  
    
    try {
      const student = await Student.create(req.body);
     

      res.json(student);
    } catch (error) {
      res.status(500).json(error);
    }
}

const registerCourse= async (req, res)=>{  
    
  try {
    const course= await Course.create( req.body);
    res.json(course);
  } catch (error) {
    res.status(500).json(error);
  }
}

const getStudents= async (req, res)=>{  
    
  try {
    const students= Student.find({},{"first_name":1})
    res.json(students);
  } catch (error) {
    res.status(500).json(error);
  }
}

const deleteStudent= async (req, res)=>{  
    
  try {
    const student= Student.findOne({_id:req.params.id })
    student.delete();
    res.json({message: "Student deleted"});
  } catch (error) {
    res.status(500).json(error);
  }
}
//Asign course to a student
const assignCourse= async (req, res)=>{
  try {
   const course=await Course.findOne(
      { course_name:req.body.course_name } )
      const newid=0;
    if(!course){
      const newCourse = await Course.create()
      newCourse.save();
      newid=newCourse._id
    }
    const id = course._id

    const student = await Student.findOneAndUpdate({first_name:req.body.first_name},{$push:{courses:newid?newid:id}})
    res.status(200).json({message:"new course added"})


  } catch (error) {
    res.status(500).json(error);
  }
}
//Asign teacher to a course
const assignTeacherToCourse= async (req, res)=>{
  try {
    //check of the course already exist
   const course=await Course.findOne(
      { course_name:req.body.course_name } )
      //check if the teacher already exist
    const teacher=await Course.findOne(
        { "teacher.first_name":req.body.first_name } )
        const course_id = course._id
        //if teacher is new
    if(!teacher){
      const newteacher = await Course.findOneAndUpdate({_id:course_id},{$push:{teacher:{first_name:req.body.first_name, last_name:req.body.last_name}}})
      res.status(200).json({message:"new teacher added"})
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

const assignTestToCourse= async (req, res)=>{
  try {
   const course=await Course.findOne(
      { course_name:req.body.course_name } )
    
    const id = course._id
    const test = await Course.findOneAndUpdate({_id:id},{$push:{tests:{test_type:req.body.test_type, test_result:req.body.test_result}}})
    res.status(200).json({message:"new test added"})

  } catch (error) {
    res.status(500).json(error);
  }
}
module.exports = {assignTestToCourse,assignTeacherToCourse,registerStudent, registerCourse, getStudents, assignCourse,deleteStudent}