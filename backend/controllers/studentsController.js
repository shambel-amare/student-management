// express-async-handler lets us work with the async await without the need for try catch block
const asyncHandler=require('express-async-handler');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
// import our student model

const {Student, Course} = require('../models/studentsModel')

//@desc Register Student
//@route POST /api/register
//@access private

const registerStudent= asyncHandler(async (req, res)=>{  

  const{first_name, last_name, email, password} = req.body

  if(!first_name||!last_name||!email||!password){
    res.status(400)
    throw new Error('Please fill all the fields')
  }
    const studentExists = await Student.findOne({email})

    if(studentExists){
      res.status(400)
      throw new Error('Student already exists')
    }
    //hash the password
    const salt=await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(password, salt )

    //create student
      const student = await Student.create({first_name, last_name, email, password:hashPassword});
   if (student){
     res.status(201).json({
       _id: student._id,
      name: student.first_name,
      email:student.email,
      token: generateToken(student._id),
     })
   }else{
     res.status(400).json("Invalid User data");

   }
    
})

const loginStudent= asyncHandler(async (req, res)=>{  
  const { email, password } = req.body

  // Check for user email
  const student = await Student.findOne({ email })
  
  const isauthenticated=await bcrypt.compare(password, student.password)
  if (student && isauthenticated) {
    res.json({
      _id: student._id,
      name: student.first_name,
      email: student.email,
      token: generateToken(student._id),
    })
  } else {
    res.status(400).json({message:'Invalid student credentials', student:student.last_name})
  }
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

const getAllStudents= async (req, res)=>{  
    
  try {
    const students= Student.find({},{"first_name":1},()=>{
      res.json(students);

    })
  } catch (error) {
    res.status(500).json(error);
  }
}

const deleteStudent= async (req, res)=>{  
    
  try {
    const student= Student.deleteOne({_id:req.params.id },() =>{
      res.json({message: "Student deleted"});
    })
  } catch (error) {
    res.status(500).json(error);
  }
}
const getStudent= async (req, res)=>{  
    
  try {
    const student= Student.findOne({_id:req.params.id },() =>{
      res.json({message: "Student found",name: student.first_name});
    })
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
      const newCourse = await Course.create(req.body)
      newCourse.save();
      newid=newCourse._id
    }
    const id = course._id

    const student = await Student.findOneAndUpdate({first_name:req.body.first_name},{$push:{courses:newid?newid:id}})
    res.status(200).json({message:"course added to student",name:student.first_name})

  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {registerStudent,loginStudent,getAllStudents,  getStudent,assignCourse,deleteStudent}