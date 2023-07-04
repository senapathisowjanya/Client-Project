const express = require("express")
const UserModel = require("../model/user.model")
const userRoute = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

userRoute.post("/register", async(req, res)=>{
    try {
        const {email, password} = req.body
        const userCheck = await UserModel.findOne({email})
        if(userCheck){
            return res.status(401).send({
                msg:"User Already Registered, Please Login !"
            })
        }else{
            bcrypt.hash(password, 5,async (err, hash)=>{
                const newUser = new UserModel({email, password:hash})
                await newUser.save()
        res.status(201).send({
            msg:`User Successfully Registered`
        }) 
            })
        }
    } catch (error) {
        res.status(400).send({
            msg:error.message
        })
    }
  
})

userRoute.post("/login", async(req, res)=>{
    try {
        const {email, password} = req.body
        const userCheck = await UserModel.findOne({email})
        if(userCheck){
              bcrypt.compare(password, userCheck.password, (err, result)=>{
                if(result){
                    const token = jwt.sign({userID: userCheck._id}, process.env.JWT_SECRET, {expiresIn:"2m"})
                    return res.status(200).send({
                        msg:"Login Success",
                        token: token
                    })
                }else{
                    return res.status(401).send({
                        msg:"Invalid password"
                    })
                }
              })
        }else{
            return res.status(401).send({
                msg:"No User Found, Please Register First!"
            })
        }
    } catch (error) {
        return res.status(401).send({
            msg:error.message
        })
    }
})

module.exports = userRoute