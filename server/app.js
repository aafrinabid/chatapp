const express =require('express');
const cors =require('cors')
const mongoose=require('mongoose')
const app=express();
require('dotenv').config();
const socket= require('socket.io')

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('connected with database')
});

// global.onlineUsers = new Map();
// io.on('connection',(socket))

app.listen(process.env.PORT,()=>{
    console.log('hello from the server')
})

const io =require('socket.io')(3001,{
  cors:{
    origin:['http://localhost:3000']
  },
})
  
  // global.onlineUsers = new Map();
  io.on("connection", socket => {
    // global.chatSocket = socket;
    console.log(socket.id)
    socket.on('send-message',msg=>{
     socket.broadcast.emit('recieve-message',msg)
    })
    // socket.on("add-message", (message) => {
    //   onlineUsers.set(userId, socket.id);
    // });
  
    // socket.on("send-msg", (data) => {
    //   const sendUserSocket = onlineUsers.get(data.to);
    //   if (sendUserSocket) {
    //     socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    //   }
    // });
  });