const express = require('express');
const router = express.Router();
const {registerStudent,getStudents, deleteStudent, updateStudent }=require('../controllers/students.controller')
router.route('/').post(registerStudent).get(getStudents)
router.route('/:id').put(updateStudent).delete(deleteStudent)

module.exports = router;