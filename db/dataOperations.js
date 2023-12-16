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

exports.fetchNearestCops = fetchNearestCops