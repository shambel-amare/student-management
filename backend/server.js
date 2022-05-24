const express=require('express')
const dotenv=require('dotenv').config()
const{ errorHandler}=require('./middlewares/error.middleware')
const port=process.env.PORT
const app = express()

app.use('/api/register', require('./routes/students.routes')
)

// bodyParser middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
// errorHandler middleware

app.use(errorHandler)

app.listen(port, ()=>{console.log(`listening on port : ${port}`)})