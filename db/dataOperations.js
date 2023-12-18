const dataModel = require('./dataModel')
const Cop = dataModel.Cop
function fetchNearestCops(coordinates,maxDistance){
    console.log(coordinates)
    return Cop.find({
        location: {
            $near:{
                $geometry:{
                    type:"Point",
                    coordinates:coordinates
                },
                $maxDistance: maxDistance
            }
        }
    })
    .exec()
    .catch((err)=>{console.log(err)})
}

function fetchCopDetails(userId){
    return Cop.findOne({
        userId : userId
    },{
        userId: 1,
        displayName: 1,
        phone:1,
        location: 1
    })
    .exec()
    .catch((err)=>{
        console.log(err);
    })
}

exports.fetchCopDetails = fetchCopDetails
exports.fetchNearestCops = fetchNearestCops