const express=require('express')
const cors=require('cors')

const connectDB=require('./config/db')
const dotenv=require('dotenv').config()
const{ errorHandler}=require('./middlewares/error.middleware')
const port=process.env.PORT
const studentRouter= require('./routes/studentsRoutes')
const teacherRouter= require('./routes/teachersRoutes')

//connect to MongoDB database
connectDB()
const app = express()
// bodyParser middleware
app.use(cors({
    origin: ['https://localhost:5000'],
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(studentRouter)

app.use(teacherRouter)

// Serve frontend
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../frontend/build')))
  
//     app.get('*', (req, res) =>
//       res.sendFile(
//         path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
//       )
//     )
//   } else {
//     app.get('/', (req, res) => res.send('Please set to production'))
//   }
// errorHandler middleware

app.use(errorHandler)

app.listen(port, ()=>{console.log(`listening on port : ${port}`)})