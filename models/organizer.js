const mongoose= require('mongoose')

const organizerSchema = new mongoose.Schema({
    name: {
    type: String,
    trim:true,
    required: true
    },
    email: {
    type: String,
    trim:true,
    required: true
     },
    password: {
    type: String,
    trim:true,
    required: true
    },
    mobileNo:{
        type:Number,
        trim:true, 
    },
    address:{
        type:String,
        trim:true
    },
    pincode:{
        type:Number,
        trim:true
    }
})

module.exports= mongoose.model('organizer',organizerSchema)