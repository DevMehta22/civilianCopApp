const mongoose = require('mongoose')

const copSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique: true,
        trim:true
    },
    Name:{
        type: String,
        trim:true
    },
    ContactNo:{
        type : String
    },
    EmailID:{
        type: String,
        lowercase: true,
        required:true
    },
    earnedRatings:{
        type:Number
    },
    totalRatings:{
        type:Number
    },
    location:{
        type:{
            type:String,
            required:true,
            default:"Point"
        },
        address:{type:String},
        coordinates:{type:[Number],default:[0,0]}
    }
})

copSchema.index({"location":"2dsphere",userId:1});

const Cop=mongoose.model("Cop",copSchema)
exports.Cop = Cop