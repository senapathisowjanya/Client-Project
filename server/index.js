const express = require("express")
const userRoute = require("./controllers/user.controller")
const connectionToDb = require("./config/connection")
const postJobRoute = require("./controllers/postjob.controller")
const multer = require("multer")
const cors=require("cors")

const app = express()
const cors = require("cors")
const ImageModel = require("./model/jobsekker.model")
const path = require("path")
app.use(express.static("public"))
app.use(cors())
app.use(express.json())
app.use(cors())
app.use("/user", userRoute)
app.use("/jobs", postJobRoute)

//storage
const Storage = multer.diskStorage({
   destination:(req, res, cb)=>{
      cb(null, 'public/Images')
   },
   filename:(req, file, cb)=>{
      cb(null, file.fieldname+ "_" + Date.now()+ path.extname(file.originalname))
   }
})
const upload = multer({
   storage: Storage
})

app.post("/upload", upload.single('file'), async(req, res)=>{
       const newImage = new ImageModel({image: req.file.filename})
       await newImage.save()
       res.status(201).send({
         msg:"upload success"
       })
})


app.listen(8080,async ()=>{
   try {
    await connectionToDb
    console.log("connection to db")
    console.log("connected to server...")
   } catch (error) {
    console.log(error.message)
   }
   
})