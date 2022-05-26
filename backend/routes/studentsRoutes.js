const express = require('express');

const {registerStudent,registerCourse,assignTeacherToCourse, assignTestToCourse, assignCourse,getStudents, deleteStudent}=require('../controllers/studentsController')

const router = express.Router();

router.post('/api/student/', registerStudent)
router.post('/api/course/', registerCourse)
router.get('/api/students/', getStudents)
router.delete('/api/student/:id/', deleteStudent)
router.post('/api/student/course/', assignCourse)
router.post('/api/course/teacher/', assignTeacherToCourse)
router.post('/api/course/test/', assignTestToCourse)


module.exports = router;