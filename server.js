require('dotenv').config()
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const consolidate = require("consolidate")
const app = express();
const router = require('./routes')
const socketEvents = require('./socketEvents')

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json({
    limit: '5mb'
}))

app.set('views','views');
app.use(express.static('./public'));
app.set('view engine','html');
app.engine('html',consolidate.handlebars);
app.use('/',router)

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MongoDB Connected Successfully");
    const port = process.env.PORT || 3300;
    const server = http.Server(app);
    server.listen(port, (err) => {
        if (err) throw err
        console.log(`Server is running on ${port}`)
        socketEvents.initialize(server)
    })
}).catch((err)=>{
    console.log(err);
})
