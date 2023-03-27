const express = require('express')
require('dotenv').config()
const cors = require('cors')
const connection = require('./db')
const userRoute = require('./routes/user.route')
const auth = require('./middleware/auth.middle')
const postRoute = require('./routes/posts.route')
const app = express()
app.use(cors())

app.use(express.json())

app.use("/users",userRoute)

app.use(auth)
app.use("/posts",postRoute)
app.listen(process.env.port,async()=>{
    try {
        
        await connection 
        console.log("connected")
    } catch (err) {
        console.log("connection failed!")
    }
    console.log(`server is running at port ${process.env.port}`)
})