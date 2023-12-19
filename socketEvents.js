const { Socket } = require('socket.io')
const dbOperations = require('./db/dataOperations')
const mongoose = require('mongoose')

function initialize(server){
    const io = require('socket.io')(server);

    io.on('connection',(socket)=>{
        console.log("A user connected");
        socket.on('join',(data)=>{
            socket.join(data.userId);
            console.log(`User joined room:${data.userId}`);
        });
        
        socket.on('request-for-help',async(eventData)=>{
            //save request from civilian to database
            const requestTime = new Date();
            const requestId = new mongoose.Types.ObjectId();
            const location={
                coordinates:[
                    eventData.location.longitude,
                    eventData.location.latitude
                ],
                address:eventData.location.address   
            }
            await dbOperations.saveRequest(requestId,requestTime,location,eventData.civilianId,'waiting');
        
            //fetch nearby cops from civilain's location 
            const nearestCops = await dbOperations.fetchNearestCops(location.coordinates,2000);
            eventData.requestId = requestId
            
            //fire a 'request-for-help'  event to all cops nearby
            for (let i = 0; i < nearestCops.length; i++) {
                io.sockets.in(nearestCops[i].userId).emit('request-for-help',eventData)         
           }

        })
        //updates the request accepted by cop and fires an event to civilian
        socket.on('request-accepted',async(eventData)=>{ 
            const status = 'engaged'
            const requestId = new mongoose.Types.ObjectId(eventData.requestDetails.requestId)
            const copId = eventData.copDetails.copId
            await dbOperations.updateRequest(requestId,copId,status)
            io.sockets.in(eventData.requestDetails.civilianId).emit('request-accepted',eventData.copDetails)
        })
    })
}

exports.initialize = initialize;