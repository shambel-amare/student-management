const express = require('express');

const {registerStudent,loginStudent, assignCourse,getAllStudents, deleteStudent,getStudent}=require('../controllers/studentsController')
//const { protectStudent } = require('../middleware/auth.middleware')
const router = express.Router();

router.post('/api/student/register', registerStudent)
router.post('/api/student/login', loginStudent)

router.get('/api/students/', getAllStudents)
router.get('/api/student/:id/', getStudent)

router.delete('/api/student/:id/', deleteStudent)
router.post('/api/student/course/', assignCourse)



module.exports = router;