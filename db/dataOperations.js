const dataModel = require('./dataModel')
const Cop = dataModel.Cop
const Request = dataModel.request
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

function saveRequest(requestId,requestTime,location,civilianId,status){
    const request = new Request({
        "_id":requestId,
        requestTime:requestTime,
        location:location,
        civilianId:civilianId,
        status:status
    });
    return request.save()
            .catch(err=>{
                console.log(err)
            })
}

function updateRequest(issueId,copId,status){
    return Request.findOneAndUpdate({
        "_id":issueId
    },{
        status:status,
        copId:copId
    }).catch(err=>{
        console.log(err);
    })
}

exports.updateRequest = updateRequest
exports.saveRequest = saveRequest
exports.fetchCopDetails = fetchCopDetails
exports.fetchNearestCops = fetchNearestCops