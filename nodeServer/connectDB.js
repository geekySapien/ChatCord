require('dotenv').config()


const mongoose = require('mongoose');


const connect= async() =>{

    await mongoose.connect(process.env.mongoURL).then(() => {
       console.log("Succesfully connected");
     }).catch(err => console.log(err));
   }
     module.exports = connect;
module.exports = connect;