const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')

router.get('/protected',requireLogin,(req,res)=>{
    res.send("hello user")
})

// router.get('/',(req,res)=>{
//     res.send("hellooo")
// })

router.post('/signup',(req,res)=>{
    // console.log(req.body.name)
    const {name,email,password} = req.body
    if(!email || !password || !name){
       return res.status(422).json({error:"please add all field"})
    }
    // res.json({message:"successfully posted"})
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"existing user"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword =>{
            const user = new User({
                email,
                password:hashedpassword,
                name
            })
            user.save()
            .then(user=>{
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
       
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/signin',(req,res)=>{
    // console.log(req.body.name)
    const {email,password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"please add all field"})
    }
    // res.json({message:"successfully posted"})
    User.findOne({email:email})
    .then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error:"invalid mail or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch =>{
            if(doMatch){
                // res.json({message: "successful"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email} = savedUser
                res.json({token,user:{_id,name,email}})
            }
            else{
                return res.status(422).json({error:"invalid"})
            }
        })
        .catch(err=>{
            console.log(err)
        })       
    })
    .catch(err=>{
        console.log(err)
    })
})



module.exports = router