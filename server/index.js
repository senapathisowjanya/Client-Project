const express = require("express")
const userRoute = require("./controllers/user.controller")
const connectionToDb = require("./config/connection")
const app = express()
app.use(express.json())
app.use("/user", userRoute)


app.listen(8080,async ()=>{
   try {
    await connectionToDb
    console.log("connection to db")
    console.log("connected to server...")
   } catch (error) {
    console.log(error.message)
   }
   
})