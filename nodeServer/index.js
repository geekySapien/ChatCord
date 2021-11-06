const mongoose = require('mongoose');
const express = require('express');
const messages=require('./models/messages')
const connect = require('./connectDB');

const chatRouter = require('./getData');

const io = require("socket.io")(8000);
const users = {};

const app = express();
app.use(express.json());
app.use("/chats", chatRouter);
connect();
//io . on ->socket.io instancce
// socket.on what will happen witjh particular event
io.on("connection", socket => {

  // if someone joins the chat, let other users connectd on server know
  socket.on("new-user-joined", (name) => {
    //console.log('new user', name);
    users[socket.id] = name;
    // users.save().then(() => {
      
    // })
    socket.broadcast.emit('user-joined', name);
  });


  //if someone joins the chat, broadast it to other users
  socket.on("send", message => {
 
      socket.broadcast.emit("recieve", {
        message: message,
        name: users[socket.id],
     
    })
   
      let chatMessage = new messages({ msg: message });
    chatMessage.save();
    
  });

   // if someone leaves the chat, let otthers knoow
  socket.on("disconnect", message => {
    socket.broadcast.emit('left', users[socket.id]);

    delete users[socket.id];
  })
});


app.listen(4000, () => {
  console.log("Server is up and running");
})
