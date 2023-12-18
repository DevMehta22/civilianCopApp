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
    })
}

exports.initialize = initialize;