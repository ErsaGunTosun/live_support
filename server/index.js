const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const colors = require('colors/safe');
const app = express();
const socket = require("socket.io");


require("dotenv").config();


app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

// Global Variables
global.onlineUsers = new Map();
global.messagebox = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("login-box", ({userId,box}) => {
    if(!onlineUsers.get(userId)){
      onlineUsers.set(userId, socket.id)
    }
    messagebox.set(box._id,box);
  });

  socket.on("send-msg", (data) => {
    const box = messagebox.get(data.to);
    if(box){
      if(box.user == data.from){
        if(box.admin){
          const sendAdminSocket = onlineUsers.get(box.admin);
          if(sendAdminSocket){
            socket.to(sendAdminSocket).emit("msg-recieve", data.msg);
          }
        }
      }else{
        const sendUserSocket = onlineUsers.get(box.user);
        if(sendUserSocket){
          socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
    
      }
    }
  });

  
});
