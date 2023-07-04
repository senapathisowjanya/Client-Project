const express = require("express")
const userRoute = require("./controllers/user.controller")
const connectionToDb = require("./config/connection")
const postJobRoute = require("./controllers/postjob.controller")
const app = express()
const cors = require("cors")
const jobeRoute = require("./controllers/jobseeker.controller")

app.use(express.static("public"))
app.use(cors())
app.use(express.json())
app.use("/user", userRoute)
app.use("/jobs", postJobRoute)
app.use("/profile", jobeRoute)


app.listen(8080,async ()=>{
   try {
    await connectionToDb
    console.log("connection to db")
    console.log("connected to server...")
   } catch (error) {
    console.log(error.message)
   }
   
})