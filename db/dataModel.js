const mongoose = require('mongoose')

const copSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique: true,
        trim:true
    },
    displayName:{
        type: String,
        trim:true
    },
    phone:{
        type : String
    },
    email:{
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

const requestSchema = mongoose.Schema({
    requestTime:{
        type:Date
    },
    location:{
        coordinates:[Number],
        address:String
    },
    civilianId:{
        type:String
    },
    copId:{
        type:String
    },
    status:{
        type:String
    }
})

copSchema.index({"location":"2dsphere",userId:1});

const Cop=mongoose.model("Cop",copSchema)
const request = mongoose.model('Request',requestSchema)
exports.Cop = Cop
exports.request=request