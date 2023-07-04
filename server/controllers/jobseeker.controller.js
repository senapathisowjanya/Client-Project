const express = require('express');
const JobSeekerModel = require('../model/jobsekker.model');
const UserModel = require('../model/user.model');
const jobeRoute = express.Router()
const path = require("path")
const multer = require("multer")


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

jobeRoute.post("/upload", upload.single('file'), async(req, res)=>{
    const {firstName, lastName, email, phoneNumber} = req.body
    const userCheck = await UserModel.findOne({email})
    const newImage = new JobSeekerModel({firstName, lastName, email, phoneNumber, image: req.file.filename})
    await newImage.save()
    if(userCheck){
        return res.status(400).send({
            msg:"Looks like you already have an account with us"
        })
    }
    res.status(201).send({
      msg:"upload success"
    })
})

module.exports = jobeRoute