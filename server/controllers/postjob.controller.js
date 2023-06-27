const express = require('express');
const PostJobModel = require('../model/postjob.model');
const postJobRoute = express.Router()


postJobRoute.post("/postjob",async (req, res)=>{
    try {
        const payLoad = req.body
  const newJob = new PostJobModel(payLoad)
  await newJob.save()
  res.status(201).send({
    msg:"Job posted successfully"
  })
    } catch (error) {
       res.status(400).send({
        msg:error.message
       }) 
    }
  
})

module.exports = postJobRoute