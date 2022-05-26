const mongoose = require('mongoose')

const connectDB=async ()=>{
   try {
       const db = await mongoose.connect(process.env.MONGO_URI)
       console.log(`MongoDb database connected: ${db.connection.host}`)
   } catch (error) {
       console.error(error)
       process.exit(1)
   } 
}

module.exports = connectDB