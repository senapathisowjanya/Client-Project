const express = require('express');
const PostJobModel = require('../model/postjob.model');
const auth = require('../middleware/auth.middleware');
const postJobRoute = express.Router()


postJobRoute.post("/postjob",auth, async (req, res)=>{
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

postJobRoute.get("/alljobs", auth, async (req, res)=>{
  console.log(req.body.userID)
  const data = await PostJobModel.find({userID: req.body.userID});
  res.status(200).send({
    msg:data
  })
})

module.exports = postJobRoute