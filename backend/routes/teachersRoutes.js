const express = require('express');

const {registerTeacher,registerCourse,getTeacher,assignTeacherToCourse, assignTestToCourse,getAllTeachers, loginTeacher,deleteTeacher}=require('../controllers/teachersController')
const { protectTeacher } = require('../middlewares/auth.middleware')

const router = express.Router();

router.post('/api/teacher/register', registerTeacher)
router.post('/api/teacher/login', loginTeacher)

router.get('/api/teachers/', getAllTeachers)
router.delete('/api/teacher/:id/', getTeacher)
router.post('/api/course/', registerCourse)
router.delete('/api/teacher/:id/', deleteTeacher)
router.post('/api/course/teacher/', assignTeacherToCourse)
router.post('/api/course/test/', protectTeacher, assignTestToCourse)


module.exports = router;