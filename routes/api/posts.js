const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
//const requireLogin  = require('../middleware/requireLogin')
const Post =  require("../../models/post");


router.get('/allpost',(req,res)=>{
    Post.find()
    .sort('-createdAt')
    .then((posts)=>{
        res.json({posts})
    }).catch(err=>{
        console.log(err)
    })
    
})

router.get('/allposts/:name',(req,res)=> {
    Post.find({"name":req.params.name})
    .sort('-createdAt')
    .then((posts)=>{
        res.json({posts})
    }).catch(err=>{
        console.log(err)
    })
})

router.post('/createpost',(req,res)=>{
    const {title,caption,photo, event_url} = req.body 
     if(!title || !caption || !photo || !event_url){
      return  res.status(422).json({error:"Please add all the fields"})
     }
    const post = new Post({
        title:req.body.title,
        caption:req.body.caption,
        photo:req.body.photo,
        event_url: req.body.event_url,
        name:req.body.name
        // event_url:req.body.event_url
        
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.delete('/deletepost/:postId',(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("organizer","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.organizer._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})

module.exports = router