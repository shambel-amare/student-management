const express=require('express')
// const cors=require('cors')

const connectDB=require('./config/db')
const dotenv=require('dotenv').config()
// const{ errorHandler}=require('./middlewares/error.middleware')
const port=process.env.PORT
const studentRouter= require('./routes/studentsRoutes')

//connect to MongoDB database
connectDB()
const app = express()
// bodyParser middleware
// app.use(cors)

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(studentRouter)

// errorHandler middleware

// app.use(errorHandler)

app.listen(port, ()=>{console.log(`listening on port : ${port}`)})