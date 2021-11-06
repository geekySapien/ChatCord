const express = require("express");
const router = express.Router();
const Chats=require('./models/messages')

router.get("/history",async(req, res) =>  {
    
       await Chats.find({}).then(chat  =>  {
           console.log(chat) ;
           let k = chat;
           for (let i = 0; i < k.length; i++)
               console.log(k[i].msg);
           res.status(201).json(chat);
    });
});

module.exports  =  router;