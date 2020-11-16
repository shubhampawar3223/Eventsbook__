const express= require('express');
const router= express.Router();
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const keys = require("../../config/keys");
const passport = require("passport");
const organizer= require("../../models/organizer")

const validateRegisterInput= require("../../validation/register")
const validateLoginInput= require("../../validation/login")
const validateOrgProfileInput =require("../../validation/organizer_profile")
router.post('/register',(req,res)=> {

const {errors, isValid}= validateRegisterInput(req.body);
if(!isValid){
    return res.status(400).json(errors);
}
organizer.findOne({email: req.body.email}).then(user=> {
    if(user){
         return res.status(400).json({email: "Email already exist!"})
    }
    else{
        const newOrganiser= new organizer({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        });
        bcrypt.genSalt(10,(err, salt)=> {
            bcrypt.hash(newOrganiser.password, salt,(err,hash) => {
                if(err) throw err;
                newOrganiser.password= hash;
                newOrganiser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err))

            })
        })
    }
})
})

router.get("/profile/:email",(req,res)=>{
    //console.log("profile");
    organizer.findOne({"email":req.params.email},function(err, profileInfo){
              if(err){
                next(err)
              }else{
                res.json({status: "successfull" , message:"Here is your info..." , data:{userdata: profileInfo}})
              }
    })
  })

router.get('/username/:email',(req,res)=> {
    organizer.findOne({"email": req.params.email}, function(err, info){
      if(err){
        next(err)
      }else{
        console.log(info)
        res.json({status:"Successful", message:"Here is your username" , data:{userdata: info}})
      }
    })
})

router.put("/profile/:email",(req,res)=>{
  
    const {error, isValid}= validateOrgProfileInput(req.body)     
    
    if (!isValid) {
      console.log("abb")
     return res.status(400).json(errors);
   }else{
     console.log("updateprofile");
     organizer.findOneAndUpdate({"email":req.params.email},{name:req.body.name, email:req.body.email, password:req.body.password, mobileNo:req.body.mobileNo, address: req.body.address, pincode:req.body.pincode},function(err,result){
     if(err){
       next(err)
     }else{
       res.json({status:"successful", message:"Info Updated successfully..", data:null})
     }
 
     })
   }
  })
 

router.post('/login', (req,res)=> {
    
    const {errors, isValid} = validateLoginInput(req.body);
    
    if(!isValid){
        return status(400).json(errors);
    }

     email= req.body.email,
     password= req.body.password
     
    organizer.findOne({email}).then(user =>{
    
    if(!user){
        return res.status(400).json({email: "User not found"});
    }
    else{
       bcrypt.compare(password, user.password).then(isMatch => {
           if(isMatch){
               const payload ={
                   id: user.id,
                   name: user.name
               }
            jwt.sign(
                payload,
                keys.secretOrKey,
                {
                    expiresIn: 31556926
                },
                (err, token) => {
                    res.json({
                        success: true,
                        token: "bearer" + token
                    })
                } 
            )
           }
           else{
                return res.status(400).json({passwordIncorrect: "Password is Incorrect" });
           }

       }) 
    }
    })
})

module.exports= router;