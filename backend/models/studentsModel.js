const mongoose=require('mongoose')
let Schema = mongoose.Schema;


// course schema, each course has teacher and test
const courseSchema = new Schema({
    course_name: {type:String},
    course_credit: {type:Number},
    teacher:[{first_name: {type:String},last_name: {type:String}}],
    tests:[{test_type: {type:String},test_result: {type:Number}}]

})
const Course=mongoose.model('Course', courseSchema)

const studentSchema= new Schema({
    first_name: {type:String, required:true},
    last_name: {type:String, required:true}, 
    birth_date: {type:Date, default:Date.now(),}, 
    gender: {type: String, enum: ["Male", "Female"]},
    courses:[{type:Schema.Types.ObjectId, ref:'Course'}],
    class_room: {type:String},

},{
    timestamps:true
})

const Student=mongoose.model('Student', studentSchema)

module.exports={Student, Course}