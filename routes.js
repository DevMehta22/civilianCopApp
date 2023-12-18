const express = require('express')
const router = express.Router()
const dbOperations = require('./db/dataOperations')

router.get('/cops',async(req,res)=>{
    const {latitude,longitude} = req.body;
    
        try{
            const data=await dbOperations.fetchNearestCops([longitude,latitude],2000);
            res.status(200).json({'message':'Success','code':"OK",'data':data})
            }catch(err){
                console.log("Error in getting cops : ", err);
                res.status(500).send({'message':'Internal Server Error','errorCode':'IS_500'});
                }
               
})

router.get('/cop.html',(req,res)=>{
    res.render('cop.html',{
        userId: req.query.userId
    });
})

router.get('/civilian.html',(req,res)=>{
    res.render('civilian.html',{
        userId: req.query.userId
    });
})

router.get('/cops/info',async(req,res)=>{
    const userId=req.query.userId;
    const copDetails = await dbOperations.fetchCopDetails(userId);

    res.json({
        copDetails: copDetails
    });
})

module.exports = router