const mongoose=require('mongoose')
let Schema = mongoose.Schema;


const teacherSchema= new Schema({
    first_name: {type:String, required:true},
    last_name: {type:String, required:true}, 
    email: {type:String, required:true}, 
    password: {type:String, required:true},
    birth_date: {type:Date, default:Date.now(),}, 
    gender: {type: String, enum: ["male", "female"]},
    class_room: [{type:String}]

},{
    timestamps:true
})
const Teacher=mongoose.model('Teacher', teacherSchema)

module.exports={Teacher}