//@desc Register Student
//@route POST /api/register
//@access private

const registerStudent=(req, res)=>{     
    if(!req.body){
    res.status(404)
    throw new Error("Please provide all forms")
}
    res.status(200).json({message:"Get registration"});
}
//@desc Register Student
//@route POST /api/register
//@access private

const getStudents=(req, res)=>{
    
    res.status(200).json({message:"Get students"});
}
const updateStudent=(req, res)=>{
    res.status(200).json({message:`Update student ${req.params.id}`});
}
const deleteStudent=(req, res)=>{
    res.status(200).json({message:`Delete student ${req.params.id}`});
}

module.exports = {registerStudent, getStudents, updateStudent, deleteStudent}