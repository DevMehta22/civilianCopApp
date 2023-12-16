require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const app = express();
const router = require('./routes')

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json({
    limit: '5mb'
}))
app.use(express.json());
app.use('/',router)

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MongoDB Connected Successfully");
    const port = process.env.PORT || 3300;
    app.listen(port, (err) => {
        if (err) throw err
        console.log(`Server is running on ${port}`)
    })
}).catch((err)=>{
    console.log(err);
})
